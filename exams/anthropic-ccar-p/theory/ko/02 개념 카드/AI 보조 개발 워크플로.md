---
aliases: ["AI-assisted developer workflow", "AI支援ツール", "Developer productivity", "開発者の生産性"]
tags: ["ccar-p", "개념카드", "도메인7"]
도메인: 7
목표: ["7.2"]
중요도: "중"
---
# AI 보조 개발 워크플로

> [!summary] 한 줄 정의
> Claude Code를 대화형 작업뿐 아니라 CI·스크립트(-p), 훅(자동 포맷·차단), 스킬·서브에이전트로 팀의 반복 작업에 연결한다.

**日本語** AI支援ツールによる開発者のワークフロー改善　·　**English** Improving developer workflows with AI-assisted tooling

## 시험 트리거
- "PR마다 자동 리뷰를 돌리고 싶다"
- "편집 후 항상 포매터를 실행"
- "반복되는 팀 절차를 재사용"

## 핵심
- 비대화형 실행: claude -p "..." --allowedTools "Read,Edit,Bash" → CI·스크립트에서 사용 → [[헤드리스 모드(-p)]].
- --output-format json/stream-json으로 결과를 파싱한다. json 출력에는 total_cost_usd가 포함된다(클라이언트 추정치).
- 훅: PostToolUse(Edit|Write)로 편집 후 Prettier 실행, PreToolUse에서 종료 코드 2로 보호 파일 편집 차단 → [[Claude Code 훅]].
- 스킬: 반복 절차를 SKILL.md로 묶어 필요할 때만 로드 → [[Agent Skills]].
- 〔해석〕 사람이 리뷰할 지점(PR 승인 등)은 남겨 두고 반복 작업을 자동화한다.

## 헷갈리는 개념
| 개념 | 차이 |
|---|---|
| [[팀용 Claude Code 구성]] | 환경 구성 vs 워크플로 자동화 |

## 오답 함정
> [!warning] CI에서 대화형 세션을 띄우는 선택지 → 비대화형 -p 모드를 쓴다

## 관련
- [[헤드리스 모드(-p)]] · [[Claude Code 훅]] · [[Agent Skills]] · [[팀용 Claude Code 구성]] · [[디버깅과 운영 문제 해결 지원]]

**공식 목표**: [[7 개발자 생산성과 운영 지원#목표 7.2|7.2]]  
**근거**: [Claude Code: Run programmatically](https://code.claude.com/docs/en/headless) · [Claude Code: Hooks guide](https://code.claude.com/docs/en/hooks-guide) · [Agent Skills](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview)

## 셀프 체크
> [!question]- Claude Code를 비대화형으로 실행하는 플래그는?
> -p(--print)

> [!question]- 편집 후 포매터를 자동 실행하는 훅 이벤트는?
> PostToolUse(Edit|Write 매처)
