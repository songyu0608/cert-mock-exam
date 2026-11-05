// 기기 간 기록 동기화. 비밀키가 있으면 결과 기록을 Worker(/api)로 올리고 받는다.
// 키가 없으면 아무것도 하지 않고 기록은 이 브라우저에만 남는다.
import type { Attempt } from './session.ts';
import {
  applyReset,
  clearSynced,
  loadResetAt,
  markSynced,
  mergeRemote,
  pendingAttempts,
  pendingResets,
  read,
  write,
} from './storage.ts';

interface SyncConfig {
  key?: string;
  /** 서버 기록의 마지막 순번. 다음에는 그 뒤만 받는다. */
  cursor?: number;
  lastOk?: number;
}

export type SyncStatus =
  | { state: 'off' }
  | { state: 'running' }
  | { state: 'ok'; at: number; pulled: number; pushed: number }
  | { state: 'error'; message: string; unauthorized?: boolean };

const loadConfig = () => read<SyncConfig>('sync', {});
const saveConfig = (c: SyncConfig) => write('sync', c);

// ---- 비밀키 ----

const ALPHABET = 'ABCDEFGHJKMNPQRSTVWXYZ0123456789'; // 헷갈리는 I, L, O, U 제외(32자)

/** 무작위 128비트 키. 사람이 옮겨 적기 쉽게 4자씩 끊는다. */
export function generateKey(rand: (n: number) => Uint8Array = randomBytes): string {
  const bytes = rand(16);
  let bits = 0;
  let value = 0;
  let out = '';
  for (const b of bytes) {
    value = (value << 8) | b;
    bits += 8;
    while (bits >= 5) {
      out += ALPHABET[(value >>> (bits - 5)) & 31];
      bits -= 5;
    }
    value &= (1 << bits) - 1;
  }
  if (bits > 0) out += ALPHABET[(value << (5 - bits)) & 31];
  return `cme-${out.match(/.{1,4}/g)!.join('-')}`;
}

function randomBytes(n: number): Uint8Array {
  return crypto.getRandomValues(new Uint8Array(n));
}

/** 붙여 넣은 키의 공백·대소문자 차이를 없앤다. 형식이 틀리면 null. */
export function normalizeKey(input: string): string | null {
  const body = input.trim().toUpperCase().replace(/^CME/, '').replace(/[\s-]/g, '');
  if (body.length !== 26 || [...body].some((c) => !ALPHABET.includes(c))) return null;
  return `cme-${body.match(/.{1,4}/g)!.join('-')}`;
}

/** 등록 코드 = 키의 SHA-256(16진수). 서버는 이 값만 알고 키 원문은 모른다. */
export async function keyHash(key: string): Promise<string> {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(key));
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

export const getKey = () => loadConfig().key ?? null;

/** 키를 이 기기에 저장한다. 다음 동기화에서 이 기기의 기존 기록을 모두 올린다. */
export function setKey(key: string): void {
  saveConfig({ key });
  clearSynced();
  emit({ state: 'off' });
}

export function forgetKey(): void {
  saveConfig({});
  emit({ state: 'off' });
}

// ---- 상태 알림 ----

let status: SyncStatus = { state: 'off' };
const listeners = new Set<(s: SyncStatus) => void>();
function emit(s: SyncStatus) {
  status = s;
  for (const l of listeners) l(s);
}
export const getStatus = () => status;
export function subscribe(l: (s: SyncStatus) => void): () => void {
  listeners.add(l);
  return () => listeners.delete(l);
}
export const lastSyncedAt = () => loadConfig().lastOk ?? null;

// ---- 서버와 주고받기 ----

export interface RemoteAttempt {
  seq: number;
  examId: string;
  id: string;
  finishedAt: number;
  scores: Record<string, number>;
  body: Attempt | null;
}
interface PullResponse {
  attempts: RemoteAttempt[];
  resets: { examId: string; at: number }[];
  cursor: number;
  more: boolean;
}

/** 동기화 도중 키가 바뀌거나 지워졌다. 새 키의 기록을 건드리지 않고 멈춘다(새 키는 다음 실행이 맡는다). */
class KeyChanged extends Error {}

class SyncError extends Error {
  readonly unauthorized: boolean;
  constructor(message: string, unauthorized = false) {
    super(message);
    this.unauthorized = unauthorized;
  }
}

async function api<T>(key: string, path: string, init?: RequestInit): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`/api/${path}`, {
      ...init,
      headers: {
        Authorization: `Bearer ${key}`,
        ...(init?.body ? { 'Content-Type': 'application/json' } : {}),
      },
    });
  } catch {
    throw new SyncError('서버에 연결하지 못했습니다(인터넷 연결 확인).');
  }
  if (res.status === 401) throw new SyncError('등록되지 않은 비밀키입니다.', true);
  if (!res.ok) throw new SyncError(`서버 오류(${res.status})`);
  return (await res.json()) as T;
}

const PUSH_BATCH = 20;
const STORAGE_FULL =
  '받은 기록을 이 브라우저에 저장하지 못했습니다(저장 공간 부족). 공간을 정리한 뒤 다시 동기화하세요.';
let running: Promise<SyncStatus> | null = null;
let queued: Promise<SyncStatus> | null = null;

/**
 * 올릴 기록을 올리고 새 기록을 받는다. 이미 돌고 있으면 그 실행이 이번 변경을 놓쳤을 수 있으므로
 * 끝난 뒤 한 번 더 돈다(그사이 여러 번 불려도 한 번으로 모은다).
 */
export function syncNow(): Promise<SyncStatus> {
  if (!running) {
    running = run().finally(() => {
      running = null;
    });
    return running;
  }
  queued ??= running.then(() => {
    queued = null;
    return syncNow();
  });
  return queued;
}

async function run(): Promise<SyncStatus> {
  const config = loadConfig();
  const key = config.key;
  if (!key) {
    emit({ state: 'off' });
    return status;
  }
  emit({ state: 'running' });
  // 서버 응답을 기다린 뒤 이 기기 기록을 바꾸기 전에 매번 확인한다.
  const sameKey = () => {
    if (loadConfig().key !== key) throw new KeyChanged();
  };
  try {
    for (const { examId, at } of pendingResets()) {
      await api(key, 'reset', { method: 'POST', body: JSON.stringify({ examId, at }) });
      sameKey();
      markSynced(examId, [], at);
    }

    let pushed = 0;
    const pending = pendingAttempts();
    for (let i = 0; i < pending.length; i += PUSH_BATCH) {
      const attempts = pending.slice(i, i + PUSH_BATCH);
      await api(key, 'attempts', { method: 'POST', body: JSON.stringify({ attempts }) });
      sameKey();
      const byExam = new Map<string, string[]>();
      for (const a of attempts) byExam.set(a.examId, [...(byExam.get(a.examId) ?? []), a.id]);
      for (const [examId, ids] of byExam) markSynced(examId, ids);
      pushed += attempts.length;
    }

    let pulled = 0;
    let cursor = config.cursor ?? 0;
    for (;;) {
      const res = await api<PullResponse>(key, `sync?since=${cursor}`);
      sameKey();
      for (const r of res.resets) {
        applyReset(r.examId, r.at);
        if (loadResetAt(r.examId) < r.at) throw new SyncError(STORAGE_FULL);
        markSynced(r.examId, [], r.at);
      }
      const byExam = new Map<string, RemoteAttempt[]>();
      for (const a of res.attempts) byExam.set(a.examId, [...(byExam.get(a.examId) ?? []), a]);
      for (const [examId, rows] of byExam) {
        const r = mergeRemote(
          examId,
          rows.map((x) => ({ id: x.id, at: x.finishedAt, scores: x.scores, body: x.body })),
        );
        // 받은 기록을 저장하지 못했으면 커서를 앞으로 옮기지 않는다(다음에 다시 받는다).
        if (!r.saved) throw new SyncError(STORAGE_FULL);
        pulled += r.added;
      }
      cursor = res.cursor;
      // 페이지마다 커서를 남겨, 중간에 실패해도 받은 데까지는 다시 받지 않는다.
      saveConfig({ ...loadConfig(), cursor });
      if (!res.more) break;
    }

    const at = Date.now();
    saveConfig({ key, cursor, lastOk: at });
    emit({ state: 'ok', at, pulled, pushed });
  } catch (e) {
    // 키를 바꾸거나 끊었으면 예전 키의 오류는 알리지 않는다(상태는 바꿀 때 이미 알렸다).
    if (e instanceof KeyChanged || loadConfig().key !== key) return status;
    const err = e instanceof SyncError ? e : new SyncError(String(e));
    emit({ state: 'error', message: err.message, unauthorized: err.unauthorized });
  }
  return status;
}

/** 앱을 열 때, 다시 볼 때(탭 전환·화면 켜짐), 켜 둔 동안 5분마다 동기화한다. 너무 잦지 않게 1분 간격을 둔다. */
export function startAutoSync(): () => void {
  let last = 0;
  const tick = () => {
    if (!getKey() || Date.now() - last < 60_000) return;
    last = Date.now();
    void syncNow();
  };
  const onVisible = () => {
    if (document.visibilityState === 'visible') tick();
  };
  tick();
  document.addEventListener('visibilitychange', onVisible);
  // 화면을 계속 켜 두고 쓰는 동안에도 다른 기기의 기록을 받도록 5분마다 확인한다.
  const timer = setInterval(onVisible, 5 * 60_000);
  return () => {
    document.removeEventListener('visibilitychange', onVisible);
    clearInterval(timer);
  };
}
