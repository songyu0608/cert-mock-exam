// exams/<id>/exam.json 은 시작할 때 모두 읽고, questions.json 은 시험을 열 때 따로 받는다.
import { examSchema, questionsFileSchema, type Exam, type Question } from './schema.ts';

type Json = { default: unknown };
// e2e 모드 빌드에만 모든 유형 견본 시험(tests/fixtures)을 넣는다. 일반 빌드에서는 코드째 빠진다.
const fixtures = import.meta.env.MODE === 'e2e';
const examFiles: Record<string, Json> = {
  ...import.meta.glob<Json>('../../exams/*/exam.json', { eager: true }),
  ...(fixtures
    ? import.meta.glob<Json>('../../tests/fixtures/exams/*/exam.json', { eager: true })
    : {}),
};
const questionFiles: Record<string, () => Promise<Json>> = {
  ...import.meta.glob<Json>('../../exams/*/questions.json'),
  ...(fixtures ? import.meta.glob<Json>('../../tests/fixtures/exams/*/questions.json') : {}),
};

// 가이드 HTML은 그대로 정적 파일로 내보내고 주소만 받는다(iframe으로 연다).
const guideFiles: Record<string, string> = {
  ...import.meta.glob<string>('../../exams/*/guides/*.html', {
    query: '?url',
    import: 'default',
    eager: true,
  }),
  ...(fixtures
    ? import.meta.glob<string>('../../tests/fixtures/exams/*/guides/*.html', {
        query: '?url',
        import: 'default',
        eager: true,
      })
    : {}),
};

const idOf = (path: string) => path.split('/').at(-2) ?? '';

/** 가이드 HTML 주소. 파일이 없으면 undefined */
export function guideUrl(examId: string, guideId: string): string | undefined {
  const suffix = `/${examId}/guides/${guideId}.html`;
  return Object.entries(guideFiles).find(([path]) => path.endsWith(suffix))?.[1];
}

export const exams: Exam[] = Object.entries(examFiles)
  .map(([, mod]) => examSchema.parse(mod.default))
  .sort((a, b) => a.vendor.localeCompare(b.vendor) || a.code.localeCompare(b.code));

export function getExam(id: string): Exam | undefined {
  return exams.find((e) => e.id === id);
}

const cache = new Map<string, Promise<Question[]>>();

export function loadQuestions(id: string): Promise<Question[]> {
  let p = cache.get(id);
  if (!p) {
    const entry = Object.entries(questionFiles).find(([path]) => idOf(path) === id);
    if (!entry) return Promise.reject(new Error(`문항 파일이 없습니다: ${id}`));
    p = entry[1]().then((m) => questionsFileSchema.parse(m.default));
    cache.set(id, p);
  }
  return p;
}

export const VENDOR_LABEL: Record<string, string> = {
  aws: 'AWS',
  github: 'GitHub',
  microsoft: 'Microsoft',
  anthropic: 'Claude',
  sample: '견본',
};
