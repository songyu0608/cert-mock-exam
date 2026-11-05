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
    }),
    types: z.array(z.enum(QUESTION_TYPES)).min(1),
    scoring: z.enum(['all-or-nothing', 'partial']).default('all-or-nothing'),
    facts: z.array(z.object({ value: text, label: text })).default([]),
    sources: z
      .array(z.object({ label: text, url: z.url(), checked: z.iso.date().optional() }))
      .default([]),
    notes: z.string().optional(),
  })
  .strict();
export type Exam = z.infer<typeof examSchema>;

const base = {
  id: z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/),
  domain: z.string().regex(/^\d+(\.\d+)*$/),
  stem: text,
  explanation: z.string().optional(),
  origin: z.enum(['claude', 'user']),
  note: z.string().optional(),
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
  return errors;
}
