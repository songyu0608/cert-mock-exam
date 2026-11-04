import { describe, expect, it } from 'vitest';
import { questionSchema, type Question } from '../data/schema.ts';
import { flattenQuestion } from './items.ts';
import { blankAnswer, isComplete, isTouched, makeView, scoreItem, type Answer } from './scoring.ts';

const q = (raw: unknown): Question => questionSchema.parse(raw);
const one = (raw: unknown) => flattenQuestion(q(raw))[0]!;
const base = { id: 't-1', domain: '1.1', stem: '문제', origin: 'claude' };

describe('scoreItem', () => {
  it('single: 정답 보기를 고르면 1', () => {
    const item = one({
      ...base,
      type: 'single',
      options: [
        { text: 'A', correct: false },
        { text: 'B', correct: true },
      ],
    });
    expect(scoreItem(item, { type: 'single', choice: 1 })).toBe(1);
    expect(scoreItem(item, { type: 'single', choice: 0 })).toBe(0);
    expect(scoreItem(item, { type: 'single', choice: null })).toBe(0);
  });

  const multi = one({
    ...base,
    type: 'multi',
    options: [
      { text: 'A', correct: true },
      { text: 'B', correct: true },
      { text: 'C', correct: false },
      { text: 'D', correct: false },
    ],
  });
  it('multi: 전부 맞아야 1, 하나만 맞으면 0', () => {
    expect(scoreItem(multi, { type: 'multi', choices: [1, 0] })).toBe(1);
    expect(scoreItem(multi, { type: 'multi', choices: [0] })).toBe(0);
    expect(scoreItem(multi, { type: 'multi', choices: [0, 1, 2] })).toBe(0);
  });
  it('multi partial: 맞힌 비율, 오답 포함 시 0', () => {
    expect(scoreItem(multi, { type: 'multi', choices: [0] }, 'partial')).toBe(0.5);
    expect(scoreItem(multi, { type: 'multi', choices: [0, 2] }, 'partial')).toBe(0);
  });

  it('ordering: 자리마다 정답 항목이어야 1', () => {
    const item = one({ ...base, type: 'ordering', items: ['1', '2', '3'], distractors: ['x'] });
    expect(scoreItem(item, { type: 'ordering', slots: ['i0', 'i1', 'i2'] })).toBe(1);
    expect(scoreItem(item, { type: 'ordering', slots: ['i0', 'd0', 'i2'] })).toBe(0);
    expect(scoreItem(item, { type: 'ordering', slots: ['i0', 'd0', 'i2'] }, 'partial')).toBeCloseTo(
      2 / 3,
    );
  });

  it('matching: 모든 연결이 맞아야 1', () => {
    const item = one({
      ...base,
      type: 'matching',
      prompts: [
        { text: 'p1', answer: 'a' },
        { text: 'p2', answer: 'b' },
      ],
      responses: [
        { key: 'a', text: 'A' },
        { key: 'b', text: 'B' },
        { key: 'c', text: 'C' },
      ],
    });
    expect(scoreItem(item, { type: 'matching', picks: ['a', 'b'] })).toBe(1);
    expect(scoreItem(item, { type: 'matching', picks: ['a', 'c'] })).toBe(0);
  });

  it('yesno, 문제-해결: 문장·해결책 판단', () => {
    const yn = one({
      ...base,
      type: 'yesno',
      statements: [
        { text: 's1', answer: true },
        { text: 's2', answer: false },
      ],
    });
    expect(scoreItem(yn, { type: 'yesno', values: [true, false] })).toBe(1);
    expect(scoreItem(yn, { type: 'yesno', values: [true, true] })).toBe(0);
    const ps = flattenQuestion(
      q({
        ...base,
        type: 'problem-solution',
        scenario: '상황',
        goal: '목표',
        solutions: [
          { text: '해결책 1', meetsGoal: true },
          { text: '해결책 2', meetsGoal: false },
        ],
      }),
    );
    expect(ps.map((i) => i.key)).toEqual(['t-1#1', 't-1#2']);
    expect(ps.every((i) => i.noReturn)).toBe(true);
    expect(scoreItem(ps[1]!, { type: 'solution', value: false })).toBe(1);
  });

  it('유형이 다른 답안은 0', () => {
    const item = one({ ...base, type: 'ordering', items: ['1', '2'] });
    const wrong: Answer = { type: 'single', choice: 0 };
    expect(scoreItem(item, wrong)).toBe(0);
  });
});

describe('view와 빈 답안', () => {
  it('순서 배열(오답 항목 없음)은 정답 순서와 다르게 섞고, 섞인 순서를 시작 답안으로 쓴다', () => {
    const item = one({ ...base, type: 'ordering', items: ['1', '2', '3', '4'] });
    for (let t = 0; t < 30; t++) {
      const v = makeView(item.body);
      if (v.type !== 'ordering') throw new Error();
      expect(v.choices).not.toEqual(['i0', 'i1', 'i2', 'i3']);
      const a = blankAnswer(item.body, v);
      expect(isComplete(a)).toBe(true);
      expect(isTouched(a, v)).toBe(false);
    }
  });
  it('shuffle: false면 보기 순서 유지', () => {
    const item = one({
      ...base,
      type: 'single',
      shuffle: false,
      options: [
        { text: 'A', correct: true },
        { text: 'B', correct: false },
        { text: '모두 해당', correct: false },
      ],
    });
    expect(makeView(item.body)).toEqual({ type: 'single', order: [0, 1, 2] });
  });
});

describe('스키마', () => {
  it('단일 선택 정답이 2개면 거부', () => {
    expect(() =>
      q({
        ...base,
        type: 'single',
        options: [
          { text: 'A', correct: true },
          { text: 'B', correct: true },
        ],
      }),
    ).toThrow();
  });
  it('연결 문항의 답 key가 보기에 없으면 거부', () => {
    expect(() =>
      q({
        ...base,
        type: 'matching',
        prompts: [
          { text: 'p1', answer: 'a' },
          { text: 'p2', answer: 'z' },
        ],
        responses: [
          { key: 'a', text: 'A' },
          { key: 'b', text: 'B' },
        ],
      }),
    ).toThrow(/responses에 없는 key/);
  });
});
