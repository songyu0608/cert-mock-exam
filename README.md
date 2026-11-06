# cert-mock-exam

자격증 모의고사를 풀고 채점하는 개인용 사이트. 시험을 고르고 실전 모의고사, 연습, 오답 다시 풀기 중 하나로 푼다.

- 시험: AWS AIB-C01(183문항), AIF-C01(229문항), Claude CCAR-F(330문항, 일본어, 5회분)
- 가이드: CCAR-F 공식 시험 가이드 v1.0(한국어 번역 / 日本語 공식판 / 한·日 대조 / English)
- 사이트: https://cert-mock-exam.songyu0608.workers.dev
- 기록: 브라우저(localStorage)에 저장. 설정(`/settings`)에서 비밀키를 넣으면 같은 키의 기기끼리 Cloudflare D1로 주고받는다
- 배포: Cloudflare Workers(정적 파일 + `/api/*` 동기화 API, `worker/`). `main`에 push하면 GitHub Actions가 배포

## 작업 방식

Claude Code와 Codex가 함께 작업하며, **한쪽이 구현하면 다른 쪽이 리뷰한다**(교차 리뷰). merge는 사용자가 결정한다.

| 문서                                       | 내용                                                  |
| ------------------------------------------ | ----------------------------------------------------- |
| [AGENTS.md](AGENTS.md)                     | AI 작업자 공통 규칙(Claude, Codex 모두). 작업 전 필독 |
| [docs/REVIEW.md](docs/REVIEW.md)           | 교차 리뷰 절차·확인 항목·결과 작성 기준               |
| [docs/data-format.md](docs/data-format.md) | 문제 데이터 형식                                      |

## 개발

```
pnpm install
pnpm dev          # http://localhost:5173
pnpm test         # 단위 테스트(채점, 출제, 변환)
pnpm test:e2e     # 브라우저 테스트(모든 문항 유형 견본 시험, 로컬 D1로 동기화까지)
pnpm build        # 문항 형식 검사 + 타입 검사 + 빌드
```

## 시험 추가

`exams/<시험 id>/exam.json`과 `questions.json`을 만든다. 형식은 [docs/data-format.md](docs/data-format.md).
`pnpm validate`로 검사한다.

## 배포 설정

저장소 Settings → Secrets and variables → Actions에 다음 두 값을 넣으면 `main` push 때 배포한다. 없으면 배포 단계를 건너뛴다.

- `CLOUDFLARE_API_TOKEN`: Workers 편집 + D1 편집 권한이 있는 API 토큰(배포 전에 D1 테이블 변경을 적용한다)
- `CLOUDFLARE_ACCOUNT_ID`

배포 주소는 `https://cert-mock-exam.<계정 서브도메인>.workers.dev`.

### 기록 동기화(D1)

- D1 데이터베이스 `cert-mock-exam`의 Database ID를 `wrangler.jsonc`의 `database_id`에 넣는다(비밀 값 아님).
- 테이블 정의는 `migrations/`. 배포할 때 CI가 `wrangler d1 migrations apply DB --remote`로 적용한다.
- 동기화를 허용할 키는 `wrangler.jsonc`의 `SYNC_KEY_HASHES`에 **등록 코드**(키의 SHA-256)로 넣는다. 등록 코드는 사이트 설정 화면에 나온다. 키 원문은 저장소에 넣지 않는다.
- 키가 유출되면 등록 코드를 지우고 새 키를 만들어 등록한다.
