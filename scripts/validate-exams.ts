// exams/ 아래 모든 시험을 형식 검사한다. 하나라도 틀리면 종료 코드 1(빌드 실패).
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { basename, join } from 'node:path';
import { crossCheck, examSchema, questionsFileSchema } from '../src/data/schema.ts';

export function validateExamDir(dir: string): string[] {
  const read = (f: string): unknown => JSON.parse(readFileSync(join(dir, f), 'utf8'));
  const errors: string[] = [];
  const exam = examSchema.safeParse(read('exam.json'));
  const questions = questionsFileSchema.safeParse(read('questions.json'));
  const fmt = (file: string, issues: { path: PropertyKey[]; message: string }[]) =>
    issues.map((i) => `${file} ${i.path.map(String).join('.')}: ${i.message}`);
  if (!exam.success) errors.push(...fmt('exam.json', exam.error.issues));
  if (!questions.success) errors.push(...fmt('questions.json', questions.error.issues));
  if (exam.success && questions.success) errors.push(...crossCheck(exam.data, questions.data));
  if (exam.success && exam.data.id !== dir.split(/[\\/]/).pop())
    errors.push(`exam.json id(${exam.data.id})가 폴더 이름과 다릅니다`);
  if (exam.success) {
    const ids = new Set<string>();
    for (const g of exam.data.guides) {
      if (ids.has(g.id)) errors.push(`exam.json guides: id(${g.id})가 겹칩니다`);
      ids.add(g.id);
      if (!existsSync(join(dir, 'guides', `${g.id}.html`)))
        errors.push(`exam.json guides: guides/${g.id}.html 파일이 없습니다`);
    }
    if (exam.data.theory) errors.push(...checkTheory(join(dir, 'theory'), exam.data.theory.home));
  }
  return errors;
}

/** 이론 노트: 폴더가 있고, 노트 이름([[링크]] 대상)이 겹치지 않고, 첫 화면 노트가 있어야 한다. */
function checkTheory(dir: string, home: string): string[] {
  if (!existsSync(dir)) return ['exam.json theory: theory 폴더가 없습니다'];
  const errors: string[] = [];
  const names = new Map<string, string>();
  for (const f of readdirSync(dir, { recursive: true, encoding: 'utf8' })) {
    if (!f.endsWith('.md')) continue;
    const name = basename(f, '.md').toLowerCase();
    const prev = names.get(name);
    if (prev) errors.push(`theory: 노트 이름이 겹칩니다(${prev}, ${f})`);
    names.set(name, f);
  }
  if (!names.has(home.toLowerCase()))
    errors.push(`exam.json theory: 첫 화면 노트(${home}.md)가 없습니다`);
  return errors;
}

const root = process.argv[2] ?? 'exams';
const dirs = readdirSync(root)
  .map((d) => join(root, d))
  .filter((d) => statSync(d).isDirectory());
let failed = false;
for (const dir of dirs) {
  const errors = validateExamDir(dir);
  if (errors.length) {
    failed = true;
    console.error(`✗ ${dir}`);
    for (const e of errors.slice(0, 50)) console.error(`  ${e}`);
  } else console.log(`✓ ${dir}`);
}
if (!dirs.length) {
  console.error(`${root}에 시험이 없습니다`);
  failed = true;
}
process.exit(failed ? 1 : 0);
