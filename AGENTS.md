# AGENTS.md — AI 작업자 공통 규칙

이 저장소에서 일하는 모든 AI 에이전트(Claude Code, ChatGPT Codex 등)가 작업 전에 읽는 규칙의 원본이다.
`CLAUDE.md`는 이 파일을 가리키기만 하며, 규칙은 여기만 고친다.

## 1. 프로젝트

choi(GitHub: `songyu0608`)가 혼자 쓰는 자격증 모의고사 사이트. 시험을 고르고 실전 모의고사, 연습, 오답 다시 풀기로 풀고 채점한다.

- 화면 문구, 저장소 문서, 커밋 메시지, PR 설명: 한국어. 기술 용어는 영어 그대로
  - 예외: 일본어 시험(`lang: ja`)의 시나리오형 실전 화면(`SplitSession`)은 실제 시험처럼 조작 문구도 일본어(レビュー, フラグ, 前の問題 등)로 쓴다(choi 결정, PR #21)
- 스택: Vite + React + TypeScript(strict), Cloudflare Workers 정적 배포
- 계획·결정 기록: [PR #1](https://github.com/songyu0608/cert-mock-exam/pull/1) 설명과 `README.md`

## 2. 교차 리뷰 (Claude ↔ Codex)

1. **한쪽이 구현하면 다른 쪽이 리뷰한다.** Claude가 연 PR은 Codex가, Codex가 연 PR은 Claude가 리뷰한다.
2. 구현한 AI는 PR을 연 뒤 리뷰를 요청한다.
   - Claude 구현 → PR에 `@codex review` 코멘트로 Codex 리뷰 요청
   - Codex 구현 → 사용자가 Claude에게 PR 리뷰를 맡긴다
3. 리뷰 절차·확인 항목·결과 작성 기준은 [`docs/REVIEW.md`](docs/REVIEW.md)를 따른다.
4. 지적 사항은 구현한 AI가 고치고, 리뷰한 AI가 다시 확인한다.
5. AI의 승인만으로 merge하지 않는다. CI 통과와 주요 지적 해결을 확인한 뒤 **최종 merge는 사용자(choi)가 결정한다.**
6. 같은 브랜치를 두 AI가 동시에 고치지 않는다. 리뷰하는 AI는 코드를 직접 고치지 않고 리뷰로 남긴다(사용자가 수정을 맡긴 경우는 예외).

## 3. 작업 흐름

1. `main`을 최신화하고 브랜치를 만든다. 이름: `<agent>/<slug>` (예: `claude/github-exams`, `codex/d1-sync`). 실행 환경이 이름을 정하면 그것을 쓴다.
2. 작업 1개 = 브랜치 1개 = PR 1개.
3. PR 전에 모든 검사를 통과시킨다: `pnpm format:check && pnpm lint && pnpm check && pnpm test && pnpm build && pnpm test:e2e`
4. PR 본문은 `.github/pull_request_template.md`를 따른다.
5. PR을 열면 §2대로 리뷰를 요청한다.

## 4. 코드 규칙

- 문항 데이터: `exams/<id>/exam.json`, `questions.json`. 형식은 `docs/data-format.md`, 기준 코드는 `src/data/schema.ts`.
- 문항 `id`는 기록과 연결되므로 기존 문항의 id를 바꾸거나 재사용하지 않는다. 새 문항은 이어지는 번호를 쓴다.
- 문항을 추가·수정하면 `pnpm validate`를 돌린다.
- 모든 유형 견본 시험은 `tests/fixtures/exams/`에 있고 e2e 빌드(`--mode e2e`)에만 들어간다.
- 기록 저장은 `src/lib/storage.ts`만 거친다. 기기 간 동기화는 `src/lib/sync.ts`(브라우저)와 `worker/`(API), `migrations/`(D1 테이블).
- 결과 기록은 한 번 만들면 바꾸지 않는다(합집합으로 합치므로). 문항별 통계는 저장하지 않고 점수 기록에서 계산한다.
- D1 테이블을 바꿀 때는 기존 migration을 고치지 않고 새 파일(`migrations/000N_….sql`)을 추가한다.
- 저장소는 Public이다. API 토큰 등 비밀 값은 커밋하지 않는다. 배포 비밀 값은 GitHub Actions 시크릿에 둔다.
