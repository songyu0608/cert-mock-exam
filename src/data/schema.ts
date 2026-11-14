// 시험·문항 데이터 형식. 형식 설명: docs/data-format.md
// 이 파일은 브라우저 코드와 node 스크립트(scripts/) 양쪽에서 쓴다.
import { z } from 'zod';

const text = z.string().trim().min(1);

export const QUESTION_TYPES = [
  'single',
  'multi',
  'ordering',
  'matching',
  'case',
  'yesno',
  'problem-solution',
] as const;
export type QuestionType = (typeof QUESTION_TYPES)[number];

export const examSchema = z
  .object({
    id: z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, '소문자, 숫자, 하이픈만 씁니다'),
    vendor: z.string().regex(/^[a-z0-9-]+$/),
    code: text,
    name: text,
    lang: z.string().default('ko'),
    level: z.string().optional(),
    domains: z
      .array(z.object({ id: z.string().regex(/^\d+$/), name: text, weight: z.number().positive() }))
      .min(1),
    mock: z.object({
      questions: z.number().int().positive(),
      minutes: z.number().positive(),
      passPercent: z.number().min(0).max(100),
      questionChoices: z.array(z.number().int().positive()).nullable().default(null),
      /** 시나리오형 시험: 실전 모드에서 시나리오를 몇 개 고를지. 문항은 시나리오마다 같은 수로 나눈다. */
      scenarios: z.number().int().positive().optional(),
    }),
    types: z.array(z.enum(QUESTION_TYPES)).min(1),
    scoring: z.enum(['all-or-nothing', 'partial']).default('all-or-nothing'),
    facts: z.array(z.object({ value: text, label: text })).default([]),
    sources: z
      .array(z.object({ label: text, url: z.url(), checked: z.iso.date().optional() }))
      .default([]),
    notes: z.string().optional(),
    /** 문항이 딸린 공통 지문(시나리오). 문항의 scenario가 이 id를 가리킨다. */
    scenarios: z
      .array(z.object({ id: z.string().regex(/^\d+$/), name: text, description: text }).strict())
      .default([]),
    /** 읽기 자료(공식 시험 가이드, 이론 정리). 파일은 exams/<시험 id>/guides/<id>.html */
    guides: z
      .array(
        z
          .object({
            id: z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, '소문자, 숫자, 하이픈만 씁니다'),
            title: text,
            description: z.string().optional(),
          })
          .strict(),
      )
      .default([]),
    /**
     * 이론 정리 노트(Obsidian 보관함). 한 시험에 여러 개(예: 한국어판·일본어판)를 둘 수 있다.
     * 파일은 exams/<시험 id>/theory/<id>/<폴더>/<노트>.md, home은 첫 화면 노트 이름, lang은 노트 본문 언어
     */
    theories: z
      .array(
        z
          .object({
            id: z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, '소문자, 숫자, 하이픈만 씁니다'),
            title: text,
            description: z.string().optional(),
            home: text,
            lang: z.enum(['ko', 'ja', 'en']).default('ko'),
          })
          .strict(),
      )
      .default([]),
    /** 고정된 문항 묶음(회차). 실전 모드는 회차를 골라 시작한다. scenarios가 없으면 무작위로 고른다. */
    sets: z
      .array(
        z
          .object({
            id: z.string().regex(/^\d+$/),
            name: text,
            scenarios: z.array(z.string()).optional(),
            /** true면 목록·연습·오답 다시 풀기에서 뺀다. 문항과 기록은 그대로 둔다. */
            hidden: z.boolean().optional(),
          })
          .strict(),
      )
      .default([]),
  })
  .strict();
export type Exam = z.infer<typeof examSchema>;

/** 숨긴 회차(sets[].hidden)의 문항인지. 회차가 없는 문항은 숨기지 않는다. */
export function inHiddenSet(exam: Exam, set?: string): boolean {
  return set !== undefined && exam.sets.some((s) => s.id === set && s.hidden);
}
export type Theory = Exam['theories'][number];

const base = {
  id: z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/),
  domain: z.string().regex(/^\d+(\.\d+)*$/),
  stem: text,
  /** 문제의 핵심 한 문장. 시나리오형 실전 화면의 レビュー 목록에 쓴다(없으면 본문 앞부분) */
  summary: text.optional(),
  explanation: z.string().optional(),
  origin: z.enum(['claude', 'user']),
  note: z.string().optional(),
  /** exam.json scenarios의 id(사례 연구의 scenario 지문과는 다름) */
  scenarioId: z.string().optional(),
  /** exam.json sets의 id */
  set: z.string().optional(),
};

const option = z.object({ text, correct: z.boolean(), why: z.string().optional() }).strict();

// 사례 연구의 하위 문항과 일반 문항이 같이 쓰는 "답 부분"
const singleBody = {
  type: z.literal('single'),
  shuffle: z.boolean().default(true),
  options: z
    .array(option)
    .min(2)
    .refine((o) => o.filter((x) => x.correct).length === 1, '정답은 정확히 1개여야 합니다'),
};
const multiBody = {
  type: z.literal('multi'),
  shuffle: z.boolean().default(true),
  options: z
    .array(option)
    .min(3)
    .refine((o) => {
      const n = o.filter((x) => x.correct).length;
      return n >= 2 && n < o.length;
    }, '정답은 2개 이상, 선택지 수보다 적어야 합니다'),
};
const orderingBody = {
  type: z.literal('ordering'),
  items: z.array(text).min(2),
  distractors: z.array(text).default([]),
};
const matchingBody = {
  type: z.literal('matching'),
  reuse: z.boolean().default(false),
  prompts: z.array(z.object({ text, answer: z.string().min(1) }).strict()).min(2),
  responses: z.array(z.object({ key: z.string().min(1), text }).strict()).min(2),
};
const yesnoBody = {
  type: z.literal('yesno'),
  statements: z
    .array(z.object({ text, answer: z.boolean(), why: z.string().optional() }).strict())
    .min(1),
};

const subQuestion = z.discriminatedUnion('type', [
  z.object({ stem: text, explanation: z.string().optional(), ...singleBody }).strict(),
  z.object({ stem: text, explanation: z.string().optional(), ...multiBody }).strict(),
  z.object({ stem: text, explanation: z.string().optional(), ...orderingBody }).strict(),
  z.object({ stem: text, explanation: z.string().optional(), ...matchingBody }).strict(),
  z.object({ stem: text, explanation: z.string().optional(), ...yesnoBody }).strict(),
]);
export type SubQuestion = z.infer<typeof subQuestion>;

export const questionSchema = z
  .discriminatedUnion('type', [
    z.object({ ...base, ...singleBody }).strict(),
    z.object({ ...base, ...multiBody }).strict(),
    z.object({ ...base, ...orderingBody }).strict(),
    z.object({ ...base, ...matchingBody }).strict(),
    z.object({ ...base, ...yesnoBody }).strict(),
    z
      .object({
        ...base,
        type: z.literal('case'),
        scenario: text,
        questions: z.array(subQuestion).min(2),
      })
      .strict(),
    z
      .object({
        ...base,
        type: z.literal('problem-solution'),
        scenario: text,
        goal: text,
        solutions: z
          .array(z.object({ text, meetsGoal: z.boolean(), why: z.string().optional() }).strict())
          .min(1),
      })
      .strict(),
  ])
  .superRefine((q, ctx) => {
    const check = (body: { type: string } & Record<string, unknown>, path: (string | number)[]) => {
      if (body.type === 'matching') {
        const m = body as unknown as z.infer<z.ZodObject<typeof matchingBody>>;
        const keys = new Set(m.responses.map((r) => r.key));
        if (keys.size !== m.responses.length)
          ctx.addIssue({
            code: 'custom',
            path: [...path, 'responses'],
            message: 'key가 중복됩니다',
          });
        m.prompts.forEach((p, i) => {
          if (!keys.has(p.answer))
            ctx.addIssue({
              code: 'custom',
              path: [...path, 'prompts', i, 'answer'],
              message: `responses에 없는 key: ${p.answer}`,
            });
        });
        if (!m.reuse) {
          const used = m.prompts.map((p) => p.answer);
          if (new Set(used).size !== used.length)
            ctx.addIssue({
              code: 'custom',
              path: [...path, 'prompts'],
              message: 'reuse가 false인데 같은 답이 두 번 쓰였습니다',
            });
        }
      }
    };
    if (q.type === 'case') q.questions.forEach((s, i) => check(s, ['questions', i]));
    else check(q, []);
  });
export type Question = z.infer<typeof questionSchema>;

export const questionsFileSchema = z.array(questionSchema).min(1);

/** 시험 설정과 문항 목록을 함께 검사한다. 문제가 없으면 빈 배열. */
export function crossCheck(exam: Exam, questions: Question[]): string[] {
  const errors: string[] = [];
  const domainIds = new Set(exam.domains.map((d) => d.id));
  const ids = new Set<string>();
  for (const q of questions) {
    if (ids.has(q.id)) errors.push(`${q.id}: id가 중복됩니다`);
    ids.add(q.id);
    const top = q.domain.split('.')[0] ?? '';
    if (!domainIds.has(top)) errors.push(`${q.id}: 도메인 ${q.domain}이 exam.json에 없습니다`);
    if (!exam.types.includes(q.type))
      errors.push(`${q.id}: 유형 ${q.type}은 이 시험의 types에 없습니다`);
    if (q.type === 'case')
      for (const s of q.questions)
        if (!exam.types.includes(s.type))
          errors.push(`${q.id}: 하위 문항 유형 ${s.type}은 이 시험의 types에 없습니다`);
  }
  for (const d of exam.domains)
    if (!questions.some((q) => q.domain.split('.')[0] === d.id))
      errors.push(`도메인 ${d.id}(${d.name})에 문항이 없습니다`);
  errors.push(...checkScenarios(exam, questions));
  return errors;
}

/** 문항의 채점 단위(item) 수. 사례 연구는 하위 문항 수, 문제-해결 세트는 해결책 수(lib/items.ts와 같은 기준). */
export function itemCount(q: Question): number {
  if (q.type === 'case') return q.questions.length;
  if (q.type === 'problem-solution') return q.solutions.length;
  return 1;
}

/** 크기가 sizes인 묶음들을 나누지 않고 골라 합을 정확히 n으로 만들 수 있는지(부분합). */
export function canFill(sizes: number[], n: number): boolean {
  if (!Number.isInteger(n) || n < 0) return false;
  const reach = Array<boolean>(n + 1).fill(false);
  reach[0] = true;
  for (const size of sizes) for (let t = n; t >= size; t--) if (reach[t - size]) reach[t] = true;
  return reach[n]!;
}

function checkScenarios(exam: Exam, questions: Question[]): string[] {
  const errors: string[] = [];
  const scenIds = new Set(exam.scenarios.map((s) => s.id));
  const setIds = new Set(exam.sets.map((s) => s.id));
  if (scenIds.size !== exam.scenarios.length) errors.push('scenarios의 id가 중복됩니다');
  if (setIds.size !== exam.sets.length) errors.push('sets의 id가 중복됩니다');
  if (exam.sets.length && exam.sets.every((s) => s.hidden))
    errors.push('모든 회차가 숨겨져 있습니다(hidden)');
  for (const q of questions) {
    if (q.scenarioId !== undefined && !scenIds.has(q.scenarioId))
      errors.push(`${q.id}: 시나리오 ${q.scenarioId}이 exam.json에 없습니다`);
    if (q.set !== undefined && !setIds.has(q.set))
      errors.push(`${q.id}: 회차 ${q.set}이 exam.json에 없습니다`);
    if (exam.sets.length && q.set === undefined) errors.push(`${q.id}: 회차(set)가 없습니다`);
    if (exam.mock.scenarios && q.scenarioId === undefined)
      errors.push(`${q.id}: 시나리오(scenarioId)가 없습니다`);
  }
  const pick = exam.mock.scenarios;
  if (!pick) {
    // 시나리오 없는 시험의 회차는 고정 세트다. 실전은 그 회차의 문항을 모두 낸다.
    if (exam.sets.length && exam.mock.questionChoices)
      errors.push('sets와 questionChoices는 함께 쓸 수 없습니다');
    for (const s of exam.sets) {
      if (s.scenarios)
        errors.push(`회차 ${s.id}: mock.scenarios가 없는 시험은 scenarios를 쓸 수 없습니다`);
      if (!questions.some((q) => q.set === s.id)) errors.push(`회차 ${s.id}에 문항이 없습니다`);
    }
    return errors;
  }
  if (exam.mock.questions % pick !== 0)
    errors.push(
      `mock.questions(${exam.mock.questions})가 mock.scenarios(${pick})로 나누어지지 않습니다`,
    );
  if (exam.mock.questionChoices)
    errors.push('mock.scenarios와 questionChoices는 함께 쓸 수 없습니다');
  const per = exam.mock.questions / pick;
  // 실전 모드에서 고를 수 있는 시나리오마다 채점 단위로 per개를 정확히 채울 수 있어야 한다.
  // 사례 연구·문제-해결 세트는 나누지 않으므로, 단위 수가 per 이상이어도 정확히 맞추지 못할 수 있다.
  const groups = exam.sets.length
    ? exam.sets.map((s) => ({
        label: `회차 ${s.id}`,
        pool: questions.filter((q) => q.set === s.id),
        fixed: s.scenarios,
      }))
    : [{ label: '전체', pool: questions, fixed: undefined }];
  for (const g of groups) {
    const ids = g.fixed ?? exam.scenarios.map((s) => s.id);
    if (g.fixed) {
      // 시나리오를 mock.scenarios개보다 적게 고정하면 그만큼 짧은 실전 세트가 된다.
      if (g.fixed.length < 1 || g.fixed.length > pick)
        errors.push(`${g.label}: 시나리오가 ${g.fixed.length}개입니다(1~${pick}개여야 합니다)`);
      if (new Set(g.fixed).size !== g.fixed.length)
        errors.push(`${g.label}: 시나리오가 중복됩니다`);
      for (const id of g.fixed)
        if (!scenIds.has(id)) errors.push(`${g.label}: 시나리오 ${id}이 exam.json에 없습니다`);
    } else if (ids.length < pick) errors.push(`${g.label}: 시나리오가 ${pick}개보다 적습니다`);
    for (const id of ids) {
      const sizes = g.pool.filter((q) => q.scenarioId === id).map(itemCount);
      const n = sizes.reduce((sum, x) => sum + x, 0);
      if (n < per) errors.push(`${g.label}: 시나리오 ${id}의 문항이 ${n}개입니다(${per}개 필요)`);
      // 할당량이 정수가 아니면 위에서 이미 오류를 냈으므로 부분합 검사는 건너뛴다.
      else if (Number.isInteger(per) && !canFill(sizes, per))
        errors.push(
          `${g.label}: 시나리오 ${id}의 문항으로 ${per}문항을 정확히 채울 수 없습니다(사례·문제-해결 세트는 나누지 않음)`,
        );
    }
  }
  return errors;
}
