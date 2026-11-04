import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { examSchema, questionsFileSchema } from '../data/schema.ts';
import { flattenAll } from './items.ts';
import {
  allocate,
  createSession,
  finishSession,
  mockMinutes,
  pickMockQuestions,
} from './session.ts';

const load = (id: string) => ({
  exam: examSchema.parse(JSON.parse(readFileSync(`exams/${id}/exam.json`, 'utf8'))),
  questions: questionsFileSchema.parse(
    JSON.parse(readFileSync(`exams/${id}/questions.json`, 'utf8')),
  ),
});

describe('allocate', () => {
  it('비중대로 나누고 합이 n', () => {
    const r = allocate(65, [
      { id: '1', weight: 20 },
      { id: '2', weight: 24 },
      { id: '3', weight: 28 },
      { id: '4', weight: 14 },
      { id: '5', weight: 14 },
    ]);
    expect(Object.values(r).reduce((a, b) => a + b, 0)).toBe(65);
    expect(r).toEqual({ '1': 13, '2': 16, '3': 18, '4': 9, '5': 9 });
  });
});

describe('실전 모의고사 출제', () => {
  for (const id of ['aws-aif-c01', 'aws-aib-c01']) {
    it(`${id}: 문항 수와 도메인 비중을 지킨다`, () => {
      const { exam, questions } = load(id);
      const n = exam.mock.questions;
      const picked = pickMockQuestions(exam, questions, n);
      expect(flattenAll(picked)).toHaveLength(n);
      expect(new Set(picked.map((q) => q.id)).size).toBe(picked.length);
      const quota = allocate(n, exam.domains);
      for (const d of exam.domains)
        expect(picked.filter((q) => q.domain.split('.')[0] === d.id)).toHaveLength(quota[d.id]!);
    });
  }
  it('문항 수를 고르는 시험은 시간을 비례해서 정한다', () => {
    const { exam } = load('aws-aib-c01');
    expect(mockMinutes(exam, 65)).toBe(130);
    expect(mockMinutes(exam, 50)).toBe(100);
  });
});

describe('세션 채점', () => {
  it('정답만 고르면 100%, 합격', () => {
    const { exam, questions } = load('aws-aif-c01');
    const picked = questions.slice(0, 40);
    const s = createSession(exam, picked, 'mock', { minutes: 90 });
    const items = flattenAll(picked);
    for (const it of items) {
      const b = it.body;
      if (b.type === 'single')
        s.answers[it.key] = { type: 'single', choice: b.options.findIndex((o) => o.correct) };
      if (b.type === 'multi')
        s.answers[it.key] = {
          type: 'multi',
          choices: b.options.flatMap((o, i) => (o.correct ? [i] : [])),
        };
      if (b.type === 'ordering')
        s.answers[it.key] = { type: 'ordering', slots: b.items.map((_, i) => `i${i}`) };
      if (b.type === 'matching')
        s.answers[it.key] = { type: 'matching', picks: b.prompts.map((p) => p.answer) };
    }
    const a = finishSession(exam, new Map(items.map((i) => [i.key, i])), s);
    expect(a.total).toBe(items.length);
    expect(a.percent).toBe(100);
    expect(a.passed).toBe(true);
    expect(s.deadline! - s.startedAt).toBe(90 * 60_000);
  });
  it('연습 모드는 정답 확인한 문항만 채점', () => {
    const { exam, questions } = load('aws-aib-c01');
    const picked = questions.slice(0, 5);
    const items = flattenAll(picked);
    const s = createSession(exam, picked, 'practice');
    s.checked[items[0]!.key] = true;
    const a = finishSession(exam, new Map(items.map((i) => [i.key, i])), s);
    expect(a.total).toBe(1);
    expect(a.passed).toBeUndefined();
  });
  it('onlyKeys로 틀린 item만 출제', () => {
    const { exam, questions } = load('aws-aib-c01');
    const s = createSession(exam, questions, 'review', {
      onlyKeys: new Set(['aib-0003', 'aib-0100']),
    });
    expect(s.itemKeys).toEqual(['aib-0003', 'aib-0100']);
  });
});
