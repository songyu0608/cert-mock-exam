// 기존 "실전 모의고사" 아티팩트(HTML 한 파일)를 exams/<id>/ 형식으로 옮긴다.
//
//   pnpm convert <아티팩트.html> <시험 id> <문항 id 접두어> [vendor] [lang]
//   예) pnpm convert ~/aif-c01.html aws-aif-c01 aif aws
//
// 시나리오형 아티팩트(cfg.scenarios, 문항의 sc)는 시나리오를, cfg.sets와 문항의 set은 회차를 옮긴다.
//
// 아티팩트는 <script id="cfg">(시험 설정)와 <script id="data">(문항) 두 JSON을 가진다.
// 정답 규칙은 아티팩트의 채점 코드와 같다.
//   y=s  단일 선택: o[0]이 정답
//   y=m  복수 선택: o의 앞에서 k개가 정답
//   y=o  순서 배열: o의 원래 순서가 정답
//   y=p  연결:     pr[i]의 답은 o[i], dx[]는 답이 아닌 보기
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { examSchema, questionsFileSchema, crossCheck } from '../src/data/schema.ts';
import type { Exam, Question } from '../src/data/schema.ts';

export interface ArtifactCfg {
  code: string;
  name: string;
  level?: string;
  /** 도메인 이름은 n(또는 시나리오형 아티팩트의 ja) */
  domains: { n?: string; ja?: string; w: number }[];
  facts?: [string, string][];
  /** 없으면 examScen × perScen */
  examN?: number;
  /** 시나리오형: 실전에서 고를 시나리오 수와 시나리오당 문항 수 */
  examScen?: number;
  perScen?: number;
  scenarios?: { ja: string; desc: string }[];
  /** 회차. sc가 null이면 시나리오를 무작위로 고른다 */
  sets?: { n: number; sc: number[] | null }[];
  examMin: number;
  examChoices?: number[] | null;
  passPct: number;
  examDesc?: string;
  sourceNote?: string;
}

export interface ArtifactQuestion {
  t: string;
  y: 's' | 'm' | 'o' | 'p';
  q: string;
  o: string[];
  w?: string[];
  k?: number;
  pr?: string[];
  dx?: string[];
  x?: string;
  b?: string;
  /** 시나리오 번호(1부터) */
  sc?: number;
  /** 회차 번호 */
  set?: number;
}

function readJsonScript(html: string, id: string): unknown {
  const m = html.match(new RegExp(`<script[^>]*id="${id}"[^>]*>([\\s\\S]*?)</script>`));
  if (!m?.[1]) throw new Error(`<script id="${id}">를 찾지 못했습니다`);
  return JSON.parse(m[1]);
}

export function convertExam(cfg: ArtifactCfg, examId: string, vendor: string, lang = 'ko'): Exam {
  const sources: Exam['sources'] = [];
  const note = cfg.sourceNote ?? '';
  const checked = note.match(/(\d{4}-\d{2}-\d{2})\s*(?:확인|確認)/)?.[1];
  for (const m of note.matchAll(/<a[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g)) {
    sources.push({ label: m[2]!.trim(), url: m[1]!, ...(checked ? { checked } : {}) });
  }
  return {
    id: examId,
    vendor,
    code: cfg.code,
    name: cfg.name,
    lang,
    ...(cfg.level ? { level: cfg.level } : {}),
    domains: cfg.domains.map((d, i) => ({
      id: String(i + 1),
      name: d.n ?? d.ja ?? '',
      weight: d.w,
    })),
    mock: {
      questions: cfg.examN ?? (cfg.examScen ?? 0) * (cfg.perScen ?? 0),
      minutes: cfg.examMin,
      passPercent: cfg.passPct,
      questionChoices: cfg.examChoices ?? null,
      ...(cfg.scenarios?.length && cfg.examScen ? { scenarios: cfg.examScen } : {}),
    },
    types: [],
    scoring: 'all-or-nothing',
    facts: (cfg.facts ?? []).map(([value, label]) => ({ value, label })),
    sources,
    ...(cfg.examDesc ? { notes: cfg.examDesc } : {}),
    scenarios: (cfg.scenarios ?? []).map((sc, i) => ({
      id: String(i + 1),
      name: sc.ja,
      description: sc.desc,
    })),
    sets: (cfg.sets ?? []).map((st) => ({
      id: String(st.n),
      name: `${st.n}회`,
      ...(st.sc ? { scenarios: st.sc.map(String) } : {}),
    })),
  };
}

export function convertQuestion(src: ArtifactQuestion, id: string): Question {
  const base = {
    id,
    domain: src.t,
    stem: src.q,
    origin: 'claude' as const,
    ...(src.x ? { explanation: src.x } : {}),
    ...(src.b ? { note: src.b } : {}),
    ...(src.sc !== undefined ? { scenarioId: String(src.sc) } : {}),
    ...(src.set !== undefined ? { set: String(src.set) } : {}),
  };
  const why = (i: number) => (src.w?.[i] ? { why: src.w[i] } : {});
  switch (src.y) {
    case 's':
      return {
        ...base,
        type: 'single',
        shuffle: true,
        options: src.o.map((text, i) => ({ text, correct: i === 0, ...why(i) })),
      };
    case 'm': {
      const k = src.k;
      if (!k) throw new Error(`${id}: 복수 선택인데 k가 없습니다`);
      return {
        ...base,
        type: 'multi',
        shuffle: true,
        options: src.o.map((text, i) => ({ text, correct: i < k, ...why(i) })),
      };
    }
    case 'o':
      return { ...base, type: 'ordering', items: [...src.o], distractors: [] };
    case 'p': {
      if (!src.pr || src.pr.length !== src.o.length)
        throw new Error(`${id}: 연결 문항의 pr과 o 길이가 다릅니다`);
      return {
        ...base,
        type: 'matching',
        reuse: false,
        prompts: src.pr.map((text, i) => ({ text, answer: `r${i + 1}` })),
        responses: [
          ...src.o.map((text, i) => ({ key: `r${i + 1}`, text })),
          ...(src.dx ?? []).map((text, i) => ({ key: `x${i + 1}`, text })),
        ],
      };
    }
  }
}

export function convertArtifact(
  html: string,
  examId: string,
  prefix: string,
  vendor: string,
  lang = 'ko',
) {
  const cfg = readJsonScript(html, 'cfg') as ArtifactCfg;
  const data = readJsonScript(html, 'data') as ArtifactQuestion[];
  const questions = data.map((q, i) =>
    convertQuestion(q, `${prefix}-${String(i + 1).padStart(4, '0')}`),
  );
  const exam = convertExam(cfg, examId, vendor, lang);
  const order = ['single', 'multi', 'ordering', 'matching'] as const;
  exam.types = order.filter((t) => questions.some((q) => q.type === t));
  // 형식 검사를 통과하지 못하면 파일을 쓰지 않는다.
  const parsedExam = examSchema.parse(exam);
  const parsedQuestions = questionsFileSchema.parse(questions);
  const errors = crossCheck(parsedExam, parsedQuestions);
  if (errors.length) throw new Error(errors.join('\n'));
  return { exam: parsedExam, questions: parsedQuestions, sourceCount: data.length };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const [file, examId, prefix, vendor = 'aws', lang = 'ko'] = process.argv.slice(2);
  if (!file || !examId || !prefix) {
    console.error(
      '사용법: pnpm convert <아티팩트.html> <시험 id> <문항 id 접두어> [vendor] [lang]',
    );
    process.exit(1);
  }
  const { exam, questions, sourceCount } = convertArtifact(
    readFileSync(file, 'utf8'),
    examId,
    prefix,
    vendor,
    lang,
  );
  const dir = join('exams', examId);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'exam.json'), JSON.stringify(exam, null, 2) + '\n');
  writeFileSync(join(dir, 'questions.json'), JSON.stringify(questions, null, 2) + '\n');
  const byType: Record<string, number> = {};
  for (const q of questions) byType[q.type] = (byType[q.type] ?? 0) + 1;
  console.log(`${dir}: 원본 ${sourceCount}문항 → ${questions.length}문항`, byType);
}
