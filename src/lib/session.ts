// 풀이 세션: 출제(문항 고르기), 진행 상태, 결과 계산.
import type { Exam, Question } from '../data/schema.ts';
import { flattenQuestion, type Item } from './items.ts';
import {
  blankAnswer,
  makeView,
  scoreItem,
  shuffle,
  type Answer,
  type Rng,
  type View,
} from './scoring.ts';

export type Mode = 'mock' | 'practice' | 'review';

export const MODE_LABEL: Record<Mode, string> = {
  mock: '실전 모의고사',
  practice: '연습',
  review: '오답 다시 풀기',
};

export interface Session {
  id: string;
  examId: string;
  mode: Mode;
  /** 회차·시나리오 등 출제 범위 설명(예: "2회 · 시나리오 1·2·4·6") */
  label?: string;
  itemKeys: string[];
  views: Record<string, View>;
  answers: Record<string, Answer>;
  /** 연습·오답 모드에서 "정답 확인"을 누른 item */
  checked: Record<string, true>;
  flagged: Record<string, true>;
  /** 돌아갈 수 없게 잠긴 item(문제-해결 세트) */
  locked: Record<string, true>;
  current: number;
  startedAt: number;
  /** 실전 모드 제한 시각(ms) */
  deadline?: number;
  /** 시나리오형 실전 화면: 취소선을 그어 고를 수 없게 한 보기(item key → 원래 보기 번호) */
  struck?: Record<string, number[]>;
  /** 시나리오형 실전 화면: 남은 시간을 숨겼는지 */
  timerHidden?: boolean;
}

export interface DomainResult {
  total: number;
  score: number;
}

export interface Attempt {
  id: string;
  examId: string;
  mode: Mode;
  startedAt: number;
  finishedAt: number;
  /** 채점한 item 수(연습 모드는 정답 확인한 item만) */
  total: number;
  score: number;
  percent: number;
  /** 실전 모드만 */
  passed?: boolean;
  timedOut?: boolean;
  byDomain: Record<string, DomainResult>;
  /** item key → 점수(0~1) */
  itemScores: Record<string, number>;
  /** 결과 화면에서 다시 보기 위한 세션 사본 */
  session: Session;
}

export function newId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

/** 도메인 비중대로 n개를 나눈다(큰 나머지 방식). */
export function allocate(
  n: number,
  weights: { id: string; weight: number }[],
): Record<string, number> {
  const sum = weights.reduce((s, w) => s + w.weight, 0);
  const raw = weights.map((w) => ({ id: w.id, exact: (n * w.weight) / sum }));
  const out = Object.fromEntries(raw.map((r) => [r.id, Math.floor(r.exact)]));
  let left = n - Object.values(out).reduce((s, x) => s + x, 0);
  const byRemainder = [...raw].sort(
    (a, b) => b.exact - Math.floor(b.exact) - (a.exact - Math.floor(a.exact)),
  );
  for (const r of byRemainder) {
    if (left <= 0) break;
    out[r.id]! += 1;
    left -= 1;
  }
  return out;
}

/**
 * 실전 모드 출제. 도메인 비중대로 문항을 고르고, 문항 순서를 섞는다.
 * 사례 연구처럼 여러 item인 문항은 통째로 넣는다. 도메인에 문항이 모자라면 다른 도메인에서 채운다.
 */
export function pickMockQuestions(
  exam: Exam,
  questions: Question[],
  n: number,
  rng: Rng = Math.random,
): Question[] {
  const quota = allocate(n, exam.domains);
  const size = (q: Question) => flattenQuestion(q).length;
  const picked: Question[] = [];
  const rest: Question[] = [];
  let count = 0;
  for (const d of exam.domains) {
    const pool = shuffle(
      questions.filter((q) => q.domain.split('.')[0] === d.id),
      rng,
    );
    let got = 0;
    for (const q of pool) {
      const s = size(q);
      if (got + s <= quota[d.id]!) {
        picked.push(q);
        got += s;
      } else rest.push(q);
    }
    count += got;
  }
  for (const q of shuffle(rest, rng)) {
    if (count >= n) break;
    const s = size(q);
    if (count + s <= n) {
      picked.push(q);
      count += s;
    }
  }
  return shuffle(picked, rng);
}

export function sessionLabel(s: Pick<Session, 'mode' | 'label'>): string {
  return s.label ? `${MODE_LABEL[s.mode]} · ${s.label}` : MODE_LABEL[s.mode];
}

/**
 * 시나리오형 시험의 실전 출제. 회차를 주면 그 회차의 문항만 쓴다.
 * 회차에 시나리오가 정해져 있으면 그대로(mock.scenarios개보다 적으면 그만큼 짧은 세트),
 * 없으면 mock.scenarios개를 무작위로 고른다.
 * 시나리오마다 같은 수의 문항을 고르고, 시나리오 순서대로 묶는다(묶음 안에서는 섞는다).
 */
export function pickScenarioMock(
  exam: Exam,
  questions: Question[],
  setId?: string,
  rng: Rng = Math.random,
): { questions: Question[]; scenarios: string[] } {
  const pick = exam.mock.scenarios;
  if (!pick) throw new Error(`${exam.id}: mock.scenarios가 없습니다`);
  const set = setId === undefined ? undefined : exam.sets.find((s) => s.id === setId);
  if (setId !== undefined && !set) throw new Error(`${exam.id}: 회차 ${setId}이 없습니다`);
  const pool = set ? questions.filter((q) => q.set === set.id) : questions;
  const order = exam.scenarios.map((s) => s.id);
  const chosen = set?.scenarios
    ? [...set.scenarios]
    : shuffle(
        order.filter((id) => pool.some((q) => q.scenarioId === id)),
        rng,
      ).slice(0, pick);
  chosen.sort((a, b) => order.indexOf(a) - order.indexOf(b));
  const per = Math.floor(exam.mock.questions / pick);
  const picked = chosen.flatMap((id) =>
    shuffle(
      pool.filter((q) => q.scenarioId === id),
      rng,
    ).slice(0, per),
  );
  return { questions: picked, scenarios: chosen };
}

/** 시나리오 없는 시험의 고정 회차: 그 회차의 문항을 모두 섞어서 낸다. */
export function pickSetMock(
  exam: Exam,
  questions: Question[],
  setId: string,
  rng: Rng = Math.random,
): Question[] {
  if (!exam.sets.some((s) => s.id === setId))
    throw new Error(`${exam.id}: 회차 ${setId}이 없습니다`);
  return shuffle(
    questions.filter((q) => q.set === setId),
    rng,
  );
}

/** 문항 수를 고르는 시험은 시간을 문항 수에 비례해 정한다. */
export function mockMinutes(exam: Exam, n: number): number {
  return Math.round((exam.mock.minutes * n) / exam.mock.questions);
}

export function createSession(
  exam: Exam,
  questions: Question[],
  mode: Mode,
  opts: {
    now?: number;
    minutes?: number;
    rng?: Rng;
    onlyKeys?: Set<string>;
    label?: string;
  } = {},
): Session {
  const rng = opts.rng ?? Math.random;
  const now = opts.now ?? Date.now();
  const items = questions
    .flatMap(flattenQuestion)
    .filter((i) => !opts.onlyKeys || opts.onlyKeys.has(i.key));
  const views: Record<string, View> = {};
  const answers: Record<string, Answer> = {};
  for (const it of items) {
    const v = makeView(it.body, rng);
    views[it.key] = v;
    answers[it.key] = blankAnswer(it.body, v);
  }
  return {
    id: newId(),
    examId: exam.id,
    mode,
    ...(opts.label ? { label: opts.label } : {}),
    itemKeys: items.map((i) => i.key),
    views,
    answers,
    checked: {},
    flagged: {},
    locked: {},
    current: 0,
    startedAt: now,
    ...(mode === 'mock' && opts.minutes ? { deadline: now + opts.minutes * 60_000 } : {}),
  };
}

/**
 * 보기 하나에 취소선을 긋거나 걷는다(시나리오형 실전 화면). option은 원래 보기 번호.
 * 취소선을 그은 보기는 고를 수 없으므로, 이미 골랐다면 선택도 푼다.
 */
export function toggleStrike(session: Session, key: string, option: number): Session {
  const now = session.struck?.[key] ?? [];
  const striking = !now.includes(option);
  const next = striking ? [...now, option].sort((a, b) => a - b) : now.filter((o) => o !== option);
  const struck = { ...session.struck };
  if (next.length) struck[key] = next;
  else delete struck[key];
  let answer = session.answers[key];
  if (striking && answer?.type === 'single' && answer.choice === option)
    answer = { type: 'single', choice: null };
  if (striking && answer?.type === 'multi' && answer.choices.includes(option))
    answer = { type: 'multi', choices: answer.choices.filter((c) => c !== option) };
  return {
    ...session,
    struck,
    answers: answer ? { ...session.answers, [key]: answer } : session.answers,
  };
}

/** 연습·오답 모드에서 채점 대상인 item(정답 확인한 것), 실전 모드는 전부 */
export function gradedKeys(session: Session): string[] {
  return session.mode === 'mock'
    ? session.itemKeys
    : session.itemKeys.filter((k) => session.checked[k]);
}

export function finishSession(
  exam: Exam,
  itemsByKey: Map<string, Item>,
  session: Session,
  opts: { now?: number; timedOut?: boolean } = {},
): Attempt {
  const now = opts.now ?? Date.now();
  const keys = gradedKeys(session);
  const itemScores: Record<string, number> = {};
  const byDomain: Record<string, DomainResult> = Object.fromEntries(
    exam.domains.map((d) => [d.id, { total: 0, score: 0 }]),
  );
  let score = 0;
  for (const k of keys) {
    const item = itemsByKey.get(k);
    if (!item) continue;
    const s = scoreItem(item, session.answers[k], exam.scoring);
    itemScores[k] = s;
    score += s;
    const d = (byDomain[item.topDomain] ??= { total: 0, score: 0 });
    d.total += 1;
    d.score += s;
  }
  const total = Object.keys(itemScores).length;
  const percent = total ? Math.round((score / total) * 1000) / 10 : 0;
  return {
    id: session.id,
    examId: exam.id,
    mode: session.mode,
    startedAt: session.startedAt,
    finishedAt: now,
    total,
    score,
    percent,
    ...(session.mode === 'mock' ? { passed: percent >= exam.mock.passPercent } : {}),
    ...(opts.timedOut ? { timedOut: true } : {}),
    byDomain,
    itemScores,
    session,
  };
}
