# cert-mock-exam

자격증 모의고사 사이트. Vite + React + TypeScript, Cloudflare Workers 정적 배포. 사용자는 한국어를 쓰며 혼자 사용한다.

- 문항 데이터: `exams/<id>/exam.json`, `questions.json`. 형식은 `docs/data-format.md`, 기준 코드는 `src/data/schema.ts`.
- 문항 `id`는 기록과 연결되므로 기존 문항의 id를 바꾸거나 재사용하지 않는다. 새 문항은 이어지는 번호를 쓴다.
- 문항을 추가·수정하면 `pnpm validate`를 돌린다.
- 모든 유형 견본 시험은 `tests/fixtures/exams/`에 있고 e2e 빌드(`--mode e2e`)에만 들어간다.
- 기록 저장은 `src/lib/storage.ts`만 거친다(동기화를 붙일 자리).
- PR 전에: `pnpm format:check && pnpm lint && pnpm check && pnpm test && pnpm build && pnpm test:e2e`
