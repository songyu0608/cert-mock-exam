// 브라우저(localStorage)에 기록을 저장한다.
// 2단계에서 기기 간 동기화(D1)를 붙일 때 이 모듈의 함수만 바꾸면 되도록 화면 코드는 여기만 쓴다.
import type { Attempt, Session } from './session.ts';

const PREFIX = 'cme:v1';
const MAX_ATTEMPTS = 30;

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

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(`${PREFIX}:${key}`);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown): boolean {
  try {
    if (value === null) localStorage.removeItem(`${PREFIX}:${key}`);
    else localStorage.setItem(`${PREFIX}:${key}`, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

export const loadActive = (examId: string) => read<Session | null>(`active:${examId}`, null);
export const saveActive = (s: Session) => write(`active:${s.examId}`, s);
export const clearActive = (examId: string) => write(`active:${examId}`, null);

export const loadAttempts = (examId: string) => read<Attempt[]>(`attempts:${examId}`, []);
export const loadStats = (examId: string) => read<Stats>(`stats:${examId}`, {});

export function loadAttempt(examId: string, id: string): Attempt | undefined {
  return loadAttempts(examId).find((a) => a.id === id);
}

/** 결과를 저장하고 문항별 통계를 갱신한다. 저장 공간이 모자라면 오래된 기록부터 지운다. */
export function saveAttempt(a: Attempt): boolean {
  const stats = loadStats(a.examId);
  for (const [key, score] of Object.entries(a.itemScores)) {
    const s = stats[key] ?? { n: 0, sum: 0, last: 0, at: 0 };
    stats[key] = { n: s.n + 1, sum: s.sum + score, last: score, at: a.finishedAt };
  }
  write(`stats:${a.examId}`, stats);
  let list = [a, ...loadAttempts(a.examId).filter((x) => x.id !== a.id)].slice(0, MAX_ATTEMPTS);
  while (list.length > 0) {
    if (write(`attempts:${a.examId}`, list)) return true;
    if (list.length === 1) break;
    list = list.slice(0, -1);
  }
  return false;
}

/** 마지막으로 풀었을 때 틀린 item */
export function wrongKeys(stats: Stats): string[] {
  return Object.entries(stats)
    .filter(([, s]) => s.last < 1)
    .map(([k]) => k);
}

export function resetExam(examId: string): void {
  for (const k of ['active', 'attempts', 'stats']) write(`${k}:${examId}`, null);
}
