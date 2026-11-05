// 문항을 "채점 단위(item)"로 펼친다.
// 사례 연구는 하위 문항마다, 문제-해결 세트는 해결책마다 하나의 item이 되고 각각 채점한다.
import type { Question, SubQuestion } from '../data/schema.ts';

type Body =
  | Extract<SubQuestion, { type: 'single' }>
  | Extract<SubQuestion, { type: 'multi' }>
  | Extract<SubQuestion, { type: 'ordering' }>
  | Extract<SubQuestion, { type: 'matching' }>
  | Extract<SubQuestion, { type: 'yesno' }>
  | {
      type: 'solution';
      stem: string;
      explanation?: string;
      goal: string;
      text: string;
      meetsGoal: boolean;
      why?: string;
    };

export type ItemBody = Body;
export type ItemType = Body['type'];

export interface Item {
  /** 기록에 쓰는 고유 키. 일반 문항은 문항 id, 펼친 문항은 `id#번호`(1부터) */
  key: string;
  qid: string;
  /** 문항의 세부 도메인(예: 1.3) */
  domain: string;
  /** 최상위 도메인 id(예: 1) */
  topDomain: string;
  body: Body;
  note?: string;
  context?: {
    kind: 'case' | 'problem-solution';
    scenario: string;
    index: number;
    total: number;
  };
  /** 답한 뒤 다음으로 넘어가면 돌아갈 수 없는 문항(문제-해결 세트) */
  noReturn?: boolean;
}

export function flattenQuestion(q: Question): Item[] {
  const common = {
    qid: q.id,
    domain: q.domain,
    topDomain: q.domain.split('.')[0] ?? q.domain,
    ...(q.note ? { note: q.note } : {}),
  };
  if (q.type === 'case') {
    return q.questions.map((sub, i) => ({
      ...common,
      key: `${q.id}#${i + 1}`,
      body: sub,
      context: { kind: 'case', scenario: q.scenario, index: i + 1, total: q.questions.length },
    }));
  }
  if (q.type === 'problem-solution') {
    return q.solutions.map((s, i) => ({
      ...common,
      key: `${q.id}#${i + 1}`,
      body: {
        type: 'solution',
        stem: q.stem,
        goal: q.goal,
        text: s.text,
        meetsGoal: s.meetsGoal,
        ...(s.why ? { why: s.why } : {}),
        ...(q.explanation ? { explanation: q.explanation } : {}),
      },
      context: {
        kind: 'problem-solution',
        scenario: q.scenario,
        index: i + 1,
        total: q.solutions.length,
      },
      noReturn: true,
    }));
  }
  const { id: _id, domain: _d, origin: _o, note: _n, ...body } = q;
  return [{ ...common, key: q.id, body: body as Body }];
}

export function flattenAll(questions: Question[]): Item[] {
  return questions.flatMap(flattenQuestion);
}
