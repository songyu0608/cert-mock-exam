// 답안 형식, 화면 배치(섞은 순서), 채점.
import type { Item, ItemBody } from './items.ts';

export type Rng = () => number;

export function shuffle<T>(arr: readonly T[], rng: Rng = Math.random): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j]!, a[i]!];
  }
  return a;
}

const range = (n: number) => Array.from({ length: n }, (_, i) => i);

/**
 * 한 item을 화면에 놓는 방식. 세션을 만들 때 한 번 정하고 저장해서,
 * 새로고침해도 보기 순서가 바뀌지 않게 한다.
 */
export type View =
  | { type: 'single' | 'multi'; order: number[] }
  /** choices: 보기 id(i0.. 정답 항목, d0.. 오답 항목)를 보여 줄 순서 */
  | { type: 'ordering'; choices: string[] }
  /** responses: 보기 key를 보여 줄 순서 */
  | { type: 'matching'; responses: string[] }
  | { type: 'yesno' | 'solution' };

export type Answer =
  | { type: 'single'; choice: number | null }
  | { type: 'multi'; choices: number[] }
  /** slots[i] = i번째 자리에 놓은 보기 id */
  | { type: 'ordering'; slots: (string | null)[] }
  /** picks[i] = i번째 prompt에 고른 response key */
  | { type: 'matching'; picks: (string | null)[] }
  | { type: 'yesno'; values: (boolean | null)[] }
  | { type: 'solution'; value: boolean | null };

/** 보기가 섞이지 않은 채로 시작하면 풀이가 너무 쉬워지므로, 정답 순서와 다르게 섞는다. */
function shuffleAwayFromIdentity(n: number, rng: Rng): number[] {
  if (n < 2) return range(n);
  for (let t = 0; t < 20; t++) {
    const p = shuffle(range(n), rng);
    if (p.some((x, i) => x !== i)) return p;
  }
  return [...range(n).slice(1), 0];
}

export function makeView(body: ItemBody, rng: Rng = Math.random): View {
  switch (body.type) {
    case 'single':
    case 'multi':
      return {
        type: body.type,
        order: body.shuffle ? shuffle(range(body.options.length), rng) : range(body.options.length),
      };
    case 'ordering': {
      const ids = [
        ...body.items.map((_, i) => `i${i}`),
        ...body.distractors.map((_, i) => `d${i}`),
      ];
      const perm = shuffleAwayFromIdentity(ids.length, rng);
      return { type: 'ordering', choices: perm.map((i) => ids[i]!) };
    }
    case 'matching':
      return {
        type: 'matching',
        responses: shuffle(
          body.responses.map((r) => r.key),
          rng,
        ),
      };
    case 'yesno':
    case 'solution':
      return { type: body.type };
  }
}

/** 순서 배열에 오답 항목이 없으면 화면에서 위/아래로 옮기는 방식, 있으면 자리마다 고르는 방식 */
export function orderingUsesSlots(body: Extract<ItemBody, { type: 'ordering' }>): boolean {
  return body.distractors.length > 0;
}

export function blankAnswer(body: ItemBody, view: View): Answer {
  switch (body.type) {
    case 'single':
      return { type: 'single', choice: null };
    case 'multi':
      return { type: 'multi', choices: [] };
    case 'ordering':
      // 위/아래 방식은 섞인 순서 그대로가 시작 답안
      return {
        type: 'ordering',
        slots: orderingUsesSlots(body)
          ? body.items.map(() => null)
          : view.type === 'ordering'
            ? [...view.choices]
            : body.items.map((_, i) => `i${i}`),
      };
    case 'matching':
      return { type: 'matching', picks: body.prompts.map(() => null) };
    case 'yesno':
      return { type: 'yesno', values: body.statements.map(() => null) };
    case 'solution':
      return { type: 'solution', value: null };
  }
}

/** 채점할 수 있을 만큼 답했는가(부분 답은 미완료) */
export function isComplete(answer: Answer | undefined): boolean {
  if (!answer) return false;
  switch (answer.type) {
    case 'single':
      return answer.choice !== null;
    case 'multi':
      return answer.choices.length > 0;
    case 'ordering':
      return answer.slots.every((s) => s !== null);
    case 'matching':
      return answer.picks.every((p) => p !== null);
    case 'yesno':
      return answer.values.every((v) => v !== null);
    case 'solution':
      return answer.value !== null;
  }
}

/** 위/아래 방식 순서 배열은 아무것도 안 건드려도 "답"이 있으므로, 사용자가 손댔는지 따로 본다. */
export function isTouched(answer: Answer | undefined, view: View | undefined): boolean {
  if (!answer) return false;
  if (answer.type === 'ordering' && view?.type === 'ordering') {
    const untouched =
      answer.slots.length === view.choices.length &&
      answer.slots.every((s, i) => s === view.choices[i]);
    return !untouched && answer.slots.some((s) => s !== null);
  }
  return isComplete(answer);
}

export function correctCount(body: ItemBody): number {
  return body.type === 'multi' ? body.options.filter((o) => o.correct).length : 1;
}

/**
 * 0~1 점수. all-or-nothing은 전부 맞아야 1.
 * partial은 맞힌 비율(복수 선택은 오답을 하나라도 고르면 0).
 */
export function scoreItem(
  item: Item,
  answer: Answer | undefined,
  mode: 'all-or-nothing' | 'partial' = 'all-or-nothing',
): number {
  const body = item.body;
  if (!answer || answer.type !== body.type) return 0;
  const ratio = (hit: number, total: number) =>
    mode === 'partial' ? hit / total : hit === total ? 1 : 0;
  switch (body.type) {
    case 'single': {
      const a = answer as Extract<Answer, { type: 'single' }>;
      return a.choice !== null && body.options[a.choice]?.correct ? 1 : 0;
    }
    case 'multi': {
      const a = answer as Extract<Answer, { type: 'multi' }>;
      const chosen = new Set(a.choices);
      if ([...chosen].some((i) => !body.options[i]?.correct)) return 0;
      return ratio(chosen.size, correctCount(body));
    }
    case 'ordering': {
      const a = answer as Extract<Answer, { type: 'ordering' }>;
      const hit = body.items.filter((_, i) => a.slots[i] === `i${i}`).length;
      return ratio(hit, body.items.length);
    }
    case 'matching': {
      const a = answer as Extract<Answer, { type: 'matching' }>;
      const hit = body.prompts.filter((p, i) => a.picks[i] === p.answer).length;
      return ratio(hit, body.prompts.length);
    }
    case 'yesno': {
      const a = answer as Extract<Answer, { type: 'yesno' }>;
      const hit = body.statements.filter((s, i) => a.values[i] === s.answer).length;
      return ratio(hit, body.statements.length);
    }
    case 'solution': {
      const a = answer as Extract<Answer, { type: 'solution' }>;
      return a.value === body.meetsGoal ? 1 : 0;
    }
  }
}
