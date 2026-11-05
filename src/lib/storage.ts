// 브라우저(localStorage)에 기록을 저장한다. 화면 코드는 기록을 읽고 쓸 때 이 모듈만 쓴다.
// 기기 간 동기화(sync.ts)도 이 모듈의 함수로 기록을 합친다.
//
// 기록은 세 가지다.
// - attempts: 결과 기록 전체(답안 포함). 시험마다 최근 MAX_ATTEMPTS개만 둔다.
// - scores: 결과마다 문항별 점수만 담은 작은 기록. 개수 제한 없이 모두 둔다.
// - reset: 기록을 지운 시각. 이 시각 이전에 끝난 기록은 어느 기기에서 왔든 버린다.
// 문항별 통계(정답률, 오답 목록)는 저장하지 않고 scores에서 계산한다. 누적값을 저장하면
// 두 기기의 값을 합칠 때 같은 풀이를 두 번 세게 되기 때문이다.
import type { Attempt, Session } from './session.ts';

const PREFIX = 'cme:v1';
export const MAX_ATTEMPTS = 30;

export interface ItemStat {
  /** 푼 횟수 */
  n: number;
  /** 점수 합(0~1씩) */
  sum: number;
  /** 마지막 점수 */
  last: number;
  at: number;
}
export type Stats = Record<string, ItemStat>;

/** 결과 하나의 문항별 점수 */
export interface ScoreEntry {
  id: string;
  at: number;
  s: Record<string, number>;
}

export function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(`${PREFIX}:${key}`);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function write(key: string, value: unknown): boolean {
  try {
    if (value === null) localStorage.removeItem(`${PREFIX}:${key}`);
    else localStorage.setItem(`${PREFIX}:${key}`, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

/** 기록이 바뀌면(동기화로 받은 기록 포함) 화면이 다시 읽도록 알린다. */
export const CHANGED_EVENT = 'cme:records-changed';
function notify(examId: string): void {
  try {
    window.dispatchEvent(new CustomEvent(CHANGED_EVENT, { detail: examId }));
  } catch {
    // 테스트(노드) 환경에는 window가 없다.
  }
}

export const loadActive = (examId: string) => read<Session | null>(`active:${examId}`, null);
export const saveActive = (s: Session) => write(`active:${s.examId}`, s);
export const clearActive = (examId: string) => write(`active:${examId}`, null);

export const loadResetAt = (examId: string) => read<number>(`reset:${examId}`, 0);

export function loadAttempts(examId: string): Attempt[] {
  const at = loadResetAt(examId);
  return read<Attempt[]>(`attempts:${examId}`, []).filter((a) => a.finishedAt > at);
}

export function loadAttempt(examId: string, id: string): Attempt | undefined {
  return loadAttempts(examId).find((a) => a.id === id);
}

export const toScoreEntry = (a: Attempt): ScoreEntry => ({
  id: a.id,
  at: a.finishedAt,
  s: a.itemScores,
});

/**
 * 문항 점수 기록. 예전 버전(stats만 저장)에서 넘어온 경우 결과 기록에서 만든다.
 * 결과 기록에 있는데 scores에 빠진 것(scores 저장 실패)도 채운다.
 */
export function loadScores(examId: string): ScoreEntry[] {
  const at = loadResetAt(examId);
  const saved = read<ScoreEntry[] | null>(`scores:${examId}`, null);
  const list = saved ?? [];
  const ids = new Set(list.map((e) => e.id));
  const missing = read<Attempt[]>(`attempts:${examId}`, [])
    .filter((a) => !ids.has(a.id))
    .map(toScoreEntry);
  if (saved === null) {
    // 예전 버전의 누적 통계는 결과 기록에서 다시 만들 수 있으므로 지운다.
    if (write(`scores:${examId}`, missing)) write(`stats:${examId}`, null);
  }
  return [...list, ...missing].filter((e) => e.at > at);
}

export function computeStats(scores: readonly ScoreEntry[]): Stats {
  const stats: Stats = {};
  for (const e of [...scores].sort((a, b) => a.at - b.at)) {
    for (const [key, score] of Object.entries(e.s)) {
      const s = stats[key] ?? { n: 0, sum: 0, last: 0, at: 0 };
      stats[key] = { n: s.n + 1, sum: s.sum + score, last: score, at: e.at };
    }
  }
  return stats;
}

export const loadStats = (examId: string) => computeStats(loadScores(examId));

/** 최근 것부터 MAX_ATTEMPTS개까지 저장한다. 공간이 모자라면 오래된 것부터 뺀다. */
function writeAttempts(examId: string, list: Attempt[]): boolean {
  let rest = [...list].sort((a, b) => b.finishedAt - a.finishedAt).slice(0, MAX_ATTEMPTS);
  while (rest.length > 0) {
    if (write(`attempts:${examId}`, rest)) return true;
    rest = rest.slice(0, -1);
  }
  return list.length === 0 && write(`attempts:${examId}`, []);
}

function addScores(examId: string, entries: ScoreEntry[]): boolean {
  const list = read<ScoreEntry[]>(`scores:${examId}`, []);
  const ids = new Set(list.map((e) => e.id));
  const fresh = entries.filter((e) => !ids.has(e.id));
  return fresh.length === 0 || write(`scores:${examId}`, [...list, ...fresh]);
}

/**
 * 결과를 저장한다. 결과를 저장하지 못하면 false를 돌려준다(다시 제출해도 두 번 세지 않게 id로 거른다).
 * 점수 기록 저장에 실패해도 결과 기록에 남아 있는 동안은 loadScores가 채운다.
 */
export function saveAttempt(a: Attempt): boolean {
  loadScores(a.examId); // 예전 형식이면 먼저 옮긴다.
  const list = [a, ...read<Attempt[]>(`attempts:${a.examId}`, []).filter((x) => x.id !== a.id)];
  if (!writeAttempts(a.examId, list)) return false;
  addScores(a.examId, [toScoreEntry(a)]);
  markPending(a.examId, a.id);
  notify(a.examId);
  return true;
}

/** 이 기기에서 지운 시각을 남기고 기록을 지운다. 동기화하면 다른 기기에서도 지워진다. */
export function resetExam(examId: string, now = Date.now()): void {
  applyReset(examId, now);
  const pending = read<Record<string, number>>('pending:resets', {});
  write('pending:resets', { ...pending, [examId]: Math.max(pending[examId] ?? 0, now) });
  clearActive(examId);
}

/** 지운 시각을 적용한다. 더 이른 시각이면 무시한다. */
export function applyReset(examId: string, at: number): boolean {
  if (at <= loadResetAt(examId)) return false;
  write(`reset:${examId}`, at);
  write(
    `attempts:${examId}`,
    read<Attempt[]>(`attempts:${examId}`, []).filter((a) => a.finishedAt > at),
  );
  write(
    `scores:${examId}`,
    read<ScoreEntry[]>(`scores:${examId}`, []).filter((e) => e.at > at),
  );
  write(`stats:${examId}`, null);
  write(
    'pending:attempts',
    loadPendingAttempts().filter((p) => p.examId !== examId || p.at > at),
  );
  notify(examId);
  return true;
}

/**
 * 다른 기기에서 받은 결과를 합친다. 이미 있는 id는 건너뛴다.
 * body가 없으면(서버에도 점수 요약만 있는 오래된 기록) 점수 기록에만 넣는다.
 */
export function mergeRemote(
  examId: string,
  rows: { id: string; at: number; scores: Record<string, number>; body: Attempt | null }[],
): number {
  const resetAt = loadResetAt(examId);
  const fresh = rows.filter((r) => r.at > resetAt);
  if (!fresh.length) return 0;
  loadScores(examId);
  const before = read<ScoreEntry[]>(`scores:${examId}`, []).length;
  addScores(
    examId,
    fresh.map((r) => ({ id: r.id, at: r.at, s: r.scores })),
  );
  const added = read<ScoreEntry[]>(`scores:${examId}`, []).length - before;
  const local = read<Attempt[]>(`attempts:${examId}`, []);
  const ids = new Set(local.map((a) => a.id));
  const bodies = fresh.flatMap((r) => (r.body && !ids.has(r.id) ? [r.body] : []));
  if (bodies.length) writeAttempts(examId, [...local, ...bodies]);
  if (added || bodies.length) notify(examId);
  return added;
}

/** 아직 서버에 올리지 못한 결과 */
export interface PendingAttempt {
  examId: string;
  id: string;
  at: number;
}
export const loadPendingAttempts = () => read<PendingAttempt[]>('pending:attempts', []);

function markPending(examId: string, id: string): void {
  const list = loadPendingAttempts().filter((p) => p.id !== id);
  const a = read<Attempt[]>(`attempts:${examId}`, []).find((x) => x.id === id);
  write('pending:attempts', [...list, { examId, id, at: a?.finishedAt ?? Date.now() }]);
}

/** 서버에 올릴 결과: 결과 기록이 남아 있으면 답안까지, 밀려났으면 점수 요약만 */
export function pendingPayload(p: PendingAttempt) {
  const body = read<Attempt[]>(`attempts:${p.examId}`, []).find((a) => a.id === p.id) ?? null;
  const entry = read<ScoreEntry[]>(`scores:${p.examId}`, []).find((e) => e.id === p.id);
  const scores = body?.itemScores ?? entry?.s;
  if (!scores) return null;
  return { examId: p.examId, id: p.id, finishedAt: body?.finishedAt ?? p.at, scores, body };
}

export function clearPending(ids: readonly string[]): void {
  const done = new Set(ids);
  write(
    'pending:attempts',
    loadPendingAttempts().filter((p) => !done.has(p.id)),
  );
}

export const loadPendingResets = () => read<Record<string, number>>('pending:resets', {});
export function clearPendingReset(examId: string, at: number): void {
  const pending = loadPendingResets();
  if ((pending[examId] ?? 0) <= at) {
    delete pending[examId];
    write('pending:resets', pending);
  }
}

/** 동기화를 처음 켤 때, 이 기기에 있던 기록을 모두 올릴 목록에 넣는다. */
export function markAllPending(examIds: readonly string[]): void {
  const list = loadPendingAttempts();
  const ids = new Set(list.map((p) => p.id));
  for (const examId of examIds) {
    for (const e of loadScores(examId)) {
      if (!ids.has(e.id)) list.push({ examId, id: e.id, at: e.at });
    }
    const at = loadResetAt(examId);
    if (at) {
      const pending = loadPendingResets();
      write('pending:resets', { ...pending, [examId]: Math.max(pending[examId] ?? 0, at) });
    }
  }
  write('pending:attempts', list);
}

/** 마지막으로 풀었을 때 틀린 item */
export function wrongKeys(stats: Stats): string[] {
  return Object.entries(stats)
    .filter(([, s]) => s.last < 1)
    .map(([k]) => k);
}
