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

/**
 * 최근 것부터 MAX_ATTEMPTS개까지 저장한다. 공간이 모자라면 오래된 것부터 뺀다.
 * keepId는 끝난 시각과 무관하게 남긴다. 기기 시계가 달라 다른 기기 기록이 더 최근으로 보여도,
 * 방금 제출한 결과가 밀려나 결과 화면에서 사라지지 않게 하기 위해서다.
 */
function writeAttempts(examId: string, list: Attempt[], keepId?: string): boolean {
  const sorted = [...list].sort((a, b) => b.finishedAt - a.finishedAt);
  let rest = sorted.slice(0, MAX_ATTEMPTS);
  const keep = keepId === undefined ? undefined : sorted.find((a) => a.id === keepId);
  if (keep && !rest.includes(keep)) rest = [...rest.slice(0, MAX_ATTEMPTS - 1), keep];
  while (rest.length > 0) {
    if (write(`attempts:${examId}`, rest)) return true;
    const drop = rest.findLastIndex((a) => a !== keep);
    if (drop < 0) return false;
    rest = rest.toSpliced(drop, 1);
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
  // 같은 id가 이미 저장돼 있으면(같은 세션을 두 탭에서 제출) 처음 것을 그대로 둔다.
  // 결과 기록은 바꾸지 않는다: 점수 기록과 서버(INSERT OR IGNORE)도 처음 것을 유지한다.
  if (loadScores(a.examId).some((e) => e.id === a.id)) return true;
  const list = [a, ...read<Attempt[]>(`attempts:${a.examId}`, [])];
  if (!writeAttempts(a.examId, list, a.id)) return false;
  addScores(a.examId, [toScoreEntry(a)]);
  notify(a.examId);
  return true;
}

/**
 * 이 기기에서 지운 시각을 남기고 기록을 지운다. 동기화하면 다른 기기에서도 지워진다.
 * 지운 시각을 저장하지 못하면(저장 공간 부족) 아무것도 지우지 않고 false를 돌려준다.
 */
export function resetExam(examId: string, now = Date.now()): boolean {
  applyReset(examId, now);
  if (loadResetAt(examId) < now) return false;
  clearActive(examId);
  return true;
}

/**
 * 지운 시각을 적용한다. 더 이른 시각이면 무시한다.
 * 지운 시각을 먼저 저장하고, 저장하지 못하면 기록을 지우지 않는다. 시각 없이 지우면 다른 기기에
 * 전해지지 않고, 나중에 서버에서 다시 받을 때 지운 기록이 되살아나기 때문이다.
 */
export function applyReset(examId: string, at: number): boolean {
  if (at <= loadResetAt(examId)) return false;
  if (!write(`reset:${examId}`, at)) return false;
  write(
    `attempts:${examId}`,
    read<Attempt[]>(`attempts:${examId}`, []).filter((a) => a.finishedAt > at),
  );
  write(
    `scores:${examId}`,
    read<ScoreEntry[]>(`scores:${examId}`, []).filter((e) => e.at > at),
  );
  write(`stats:${examId}`, null);
  const left = new Set(read<ScoreEntry[]>(`scores:${examId}`, []).map((e) => e.id));
  const synced = loadSynced(examId);
  write(`synced:${examId}`, { ...synced, ids: synced.ids.filter((id) => left.has(id)) });
  notify(examId);
  return true;
}

/**
 * 다른 기기에서 받은 결과를 합친다. 이미 있는 id는 건너뛴다.
 * body가 없으면(서버에도 점수 요약만 있는 오래된 기록) 점수 기록에만 넣는다.
 * saved가 false면 점수 기록을 저장하지 못한 것이다(저장 공간 부족). 이때는 같은 기록을 다시 받아야 한다.
 * 답안(body)은 공간이 모자라면 오래된 것부터 빠질 수 있지만, 통계는 점수 기록으로 유지된다.
 */
export function mergeRemote(
  examId: string,
  rows: { id: string; at: number; scores: Record<string, number>; body: Attempt | null }[],
): { added: number; saved: boolean } {
  const resetAt = loadResetAt(examId);
  const fresh = rows.filter((r) => r.at > resetAt);
  if (!fresh.length) return { added: 0, saved: true };
  loadScores(examId);
  const before = read<ScoreEntry[]>(`scores:${examId}`, []).length;
  const saved = addScores(
    examId,
    fresh.map((r) => ({ id: r.id, at: r.at, s: r.scores })),
  );
  const added = read<ScoreEntry[]>(`scores:${examId}`, []).length - before;
  if (!saved) return { added: 0, saved: false };
  markSynced(
    examId,
    fresh.map((r) => r.id),
  );
  const local = read<Attempt[]>(`attempts:${examId}`, []);
  const ids = new Set(local.map((a) => a.id));
  const bodies = fresh.flatMap((r) => (r.body && !ids.has(r.id) ? [r.body] : []));
  if (bodies.length) writeAttempts(examId, [...local, ...bodies]);
  if (added || bodies.length) notify(examId);
  return { added, saved: true };
}

// ---- 서버와 맞춘 상태 ----
// 올릴 목록을 따로 저장하지 않는다. 서버에 있다고 확인한 것(synced)만 저장하고, 이 기기 기록과의
// 차이를 올린다. synced 저장에 실패해도 같은 기록을 한 번 더 올릴 뿐(서버는 같은 id를 무시한다),
// 이 기기에 저장된 결과가 올릴 대상에서 빠지는 일은 없다.

interface Synced {
  /** 서버에 있는 결과 id */
  ids: string[];
  /** 서버에 있는 지운 시각 */
  reset: number;
}
const loadSynced = (examId: string) => read<Synced>(`synced:${examId}`, { ids: [], reset: 0 });

/** 이 기기 저장소에서 kinds 중 하나로 기록이 있는 시험 id */
function storedExamIds(kinds: readonly string[]): string[] {
  const pattern = new RegExp(`^${PREFIX}:(?:${kinds.join('|')}):(.+)$`);
  const ids = new Set<string>();
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const m = pattern.exec(localStorage.key(i) ?? '');
      if (m?.[1]) ids.add(m[1]);
    }
  } catch {
    // 저장소를 읽지 못하면 올릴 것도 없다.
  }
  return [...ids];
}
const examIdsWithRecords = () => storedExamIds(['attempts', 'scores', 'reset']);

/** 서버에 있다고 확인한 결과 id와 지운 시각을 남긴다. */
export function markSynced(examId: string, ids: readonly string[], reset = 0): void {
  const s = loadSynced(examId);
  write(`synced:${examId}`, {
    ids: [...new Set([...s.ids, ...ids])],
    reset: Math.max(s.reset, reset),
  });
}

/** 키를 바꾸면 새 키의 서버에는 아무것도 없다고 보고 이 기기 기록을 모두 다시 올린다. */
export function clearSynced(): void {
  for (const examId of storedExamIds(['synced'])) write(`synced:${examId}`, null);
}

/** 서버에 올릴 결과: 결과 기록이 남아 있으면 답안까지, 밀려났으면 점수 요약만 */
export function pendingAttempts() {
  return examIdsWithRecords().flatMap((examId) => {
    const done = new Set(loadSynced(examId).ids);
    const bodies = read<Attempt[]>(`attempts:${examId}`, []);
    return loadScores(examId)
      .filter((e) => !done.has(e.id))
      .map((e) => {
        const body = bodies.find((a) => a.id === e.id) ?? null;
        return {
          examId,
          id: e.id,
          finishedAt: body?.finishedAt ?? e.at,
          scores: body?.itemScores ?? e.s,
          body,
        };
      });
  });
}

/** 서버에 올릴 지운 시각 */
export function pendingResets(): { examId: string; at: number }[] {
  return examIdsWithRecords().flatMap((examId) => {
    const at = loadResetAt(examId);
    return at > loadSynced(examId).reset ? [{ examId, at }] : [];
  });
}

/** 마지막으로 풀었을 때 틀린 item */
export function wrongKeys(stats: Stats): string[] {
  return Object.entries(stats)
    .filter(([, s]) => s.last < 1)
    .map(([k]) => k);
}
