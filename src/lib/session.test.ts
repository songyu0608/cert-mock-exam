import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { crossCheck, examSchema, inHiddenSet, questionsFileSchema } from '../data/schema.ts';
import { flattenAll, flattenQuestion, itemSummary } from './items.ts';
import {
  allocate,
  createSession,
  finishSession,
  mockMinutes,
  pickMockQuestions,
  pickScenarioMock,
  pickSetMock,
  sessionLabel,
  toggleStrike,
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

describe('시나리오형 실전 출제(anthropic-ccar-f)', () => {
  const { exam, questions } = load('anthropic-ccar-f');
  const per = exam.mock.questions / exam.mock.scenarios!;

  it('형식 검사를 통과한다', () => {
    expect(crossCheck(exam, questions)).toEqual([]);
  });

  it('고정 회차: 정해진 시나리오에서 시나리오마다 같은 수, 시나리오 순서대로 묶는다', () => {
    for (const st of exam.sets.filter((s) => s.scenarios)) {
      const { questions: picked, scenarios } = pickScenarioMock(exam, questions, st.id);
      expect(scenarios).toEqual(st.scenarios);
      // 시나리오를 적게 고정한 회차(S1 · A 등)는 그만큼 짧다.
      expect(picked).toHaveLength(per * st.scenarios!.length);
      expect(picked.every((q) => q.set === st.id)).toBe(true);
      expect(picked.map((q) => q.scenarioId)).toEqual(
        st.scenarios!.flatMap((id) => Array<string>(per).fill(id)),
      );
      expect(new Set(picked.map((q) => q.id)).size).toBe(picked.length);
    }
  });

  it('시나리오를 적게 고정한 회차: 문항 수에 비례한 시간, 범위를 벗어나면 검사에서 걸린다', () => {
    const short = exam.sets.find((s) => s.scenarios?.length === 1)!;
    const { questions: picked } = pickScenarioMock(exam, questions, short.id);
    expect(picked).toHaveLength(per);
    expect(mockMinutes(exam, picked.length)).toBe(exam.mock.minutes / exam.mock.scenarios!);
    const over = {
      ...exam,
      sets: exam.sets.map((s) =>
        s.id === short.id ? { ...s, scenarios: ['1', '2', '3', '4', '5'] } : s,
      ),
    };
    expect(crossCheck(over, questions).some((e) => e.includes('시나리오가 5개입니다'))).toBe(true);
    const dup = {
      ...exam,
      sets: exam.sets.map((s) => (s.id === short.id ? { ...s, scenarios: ['1', '1'] } : s)),
    };
    expect(crossCheck(dup, questions)).toContain(`회차 ${short.id}: 시나리오가 중복됩니다`);
  });

  it('무작위 회차: 시나리오 수만큼 고르고 매번 달라질 수 있다', () => {
    const seen = new Set<string>();
    for (let i = 0; i < 20; i++) {
      const { questions: picked, scenarios } = pickScenarioMock(exam, questions, '1');
      expect(scenarios).toHaveLength(exam.mock.scenarios!);
      expect(scenarios).toEqual([...scenarios].sort((a, b) => Number(a) - Number(b)));
      expect(picked).toHaveLength(exam.mock.questions);
      expect(picked.every((q) => q.set === '1' && scenarios.includes(q.scenarioId!))).toBe(true);
      seen.add(scenarios.join(','));
    }
    expect(seen.size).toBeGreaterThan(1);
  });

  it('세션 이름에 회차와 시나리오를 붙인다', () => {
    const s = createSession(exam, questions.slice(0, 2), 'mock', { label: '2회 · 시나리오 1·2' });
    expect(sessionLabel(s)).toBe('실전 모의고사 · 2회 · 시나리오 1·2');
    expect(sessionLabel({ mode: 'practice' })).toBe('연습');
  });

  it('시나리오 문항 수가 모자라면 형식 검사가 알려 준다', () => {
    const broken = questions.filter((q) => !(q.set === '2' && q.scenarioId === '1')).slice();
    expect(crossCheck(exam, broken).join('\n')).toContain('회차 2: 시나리오 1의 문항이 0개');
  });

  it('숨긴 회차(1~5회)를 알아보고, 모든 회차를 숨기면 검사에서 걸린다', () => {
    expect(inHiddenSet(exam, '1')).toBe(true);
    expect(inHiddenSet(exam, '6')).toBe(false);
    expect(inHiddenSet(exam, undefined)).toBe(false);
    const allHidden = { ...exam, sets: exam.sets.map((s) => ({ ...s, hidden: true })) };
    expect(crossCheck(allHidden, questions)).toContain('모든 회차가 숨겨져 있습니다(hidden)');
  });

  it('6회 장문 문항은 3문단이고 해설과 요약이 있다', () => {
    const set6 = questions.filter((q) => q.set === '6');
    expect(set6).toHaveLength(exam.mock.questions);
    for (const q of set6) {
      expect(q.stem.split('\n\n')).toHaveLength(3);
      expect(q.explanation).toBeTruthy();
      expect(q.summary).toBeTruthy();
    }
  });
});

describe('고정 회차 실전 출제(anthropic-ccar-p, 시나리오 없음)', () => {
  const { exam, questions } = load('anthropic-ccar-p');

  it('형식 검사를 통과하고, 회차마다 실전 문항 수만큼 있다', () => {
    expect(crossCheck(exam, questions)).toEqual([]);
    for (const st of exam.sets)
      expect(questions.filter((q) => q.set === st.id)).toHaveLength(exam.mock.questions);
  });

  it('그 회차의 문항을 모두 섞어서 낸다', () => {
    for (const st of exam.sets) {
      const picked = pickSetMock(exam, questions, st.id);
      expect(picked).toHaveLength(exam.mock.questions);
      expect(picked.every((q) => q.set === st.id)).toBe(true);
      expect(new Set(picked.map((q) => q.id)).size).toBe(picked.length);
    }
    expect(mockMinutes(exam, exam.mock.questions)).toBe(exam.mock.minutes);
    expect(() => pickSetMock(exam, questions, '9')).toThrow();
  });

  it('시나리오 없는 시험의 회차에 scenarios를 쓰면 검사에서 걸린다', () => {
    const bad = { ...exam, sets: [{ id: '1', name: '1회', scenarios: ['1'] }] };
    expect(
      crossCheck(
        bad,
        questions.filter((q) => q.set === '1'),
      ),
    ).toContain('회차 1: mock.scenarios가 없는 시험은 scenarios를 쓸 수 없습니다');
  });
});

describe('시나리오형 실전 화면(SplitSession)의 보조 기능', () => {
  const { exam, questions } = load('anthropic-ccar-f');

  it('CCAR-F는 모든 문항에 レビュー용 한 줄 요약이 있다', () => {
    expect(questions.every((q) => q.summary && q.summary.length <= 60)).toBe(true);
    const item = flattenQuestion(questions[0]!)[0]!;
    expect(itemSummary(item)).toBe(questions[0]!.summary);
  });

  it('요약이 없으면 본문의 첫 문장을 쓰고, 길면 자른다', () => {
    const q = { ...questions[0]!, summary: undefined };
    const item = flattenQuestion(q)[0]!;
    expect(itemSummary(item)).toBe(
      '監査の結果、エージェントが会話の約2%で get_customer による本人確認を行わずに process_refu…',
    );
    expect(itemSummary({ ...item, body: { ...item.body, stem: '**짧은** 문장. 다음 문장' } })).toBe(
      '짧은 문장.',
    );
  });

  it('취소선을 그으면 그 보기의 선택을 풀고, 다시 누르면 걷는다', () => {
    const multi = questions.find((q) => q.type === 'multi')!;
    const s0 = createSession(exam, [questions[0]!, multi], 'mock', { minutes: 120 });
    const [k1, k2] = s0.itemKeys as [string, string];
    let s = { ...s0, answers: { ...s0.answers, [k1]: { type: 'single' as const, choice: 2 } } };
    s = toggleStrike(s, k1, 2);
    expect(s.struck).toEqual({ [k1]: [2] });
    expect(s.answers[k1]).toEqual({ type: 'single', choice: null });
    s = toggleStrike(s, k1, 0);
    expect(s.struck![k1]).toEqual([0, 2]);
    s = toggleStrike(toggleStrike(s, k1, 0), k1, 2);
    expect(s.struck).toEqual({});

    s = { ...s, answers: { ...s.answers, [k2]: { type: 'multi' as const, choices: [0, 1] } } };
    s = toggleStrike(s, k2, 1);
    expect(s.answers[k2]).toEqual({ type: 'multi', choices: [0] });
    // 고르지 않은 보기에 그으면 답은 그대로
    s = toggleStrike(s, k2, 3);
    expect(s.answers[k2]).toEqual({ type: 'multi', choices: [0] });
  });
});
