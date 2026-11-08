---
aliases: ["Copilot code review", "코드 검토", "AI 코드 리뷰", "자동 리뷰", "리뷰 기준"]
tags: ["gh-300", "기능카드", "도메인2"]
도메인: 2
목표: ["2.10", "2.11", "2.13"]
중요도: "상"
---
# Copilot 코드 리뷰

> [!summary] 한 줄 정의
> Copilot을 PR 리뷰어로 지정해 AI 리뷰 코멘트를 받는 기능. 리포지토리 지침 파일로 리뷰 기준을 맞춘다.

**English** Copilot code review

## 시험 트리거
- "모든 PR에 AI 리뷰를 자동으로"
- "팀 코딩 규칙에 맞춰 리뷰하게"
- "Copilot 리뷰가 필수 승인으로 인정되나"

## 핵심
- 요청: PR의 Reviewers에서 Copilot 옆 Request. VS Code, JetBrains, Visual Studio, Xcode, GitHub Mobile, GitHub CLI(`gh pr edit 번호 --add-reviewer @copilot`)에서도.
- 자동 리뷰: 룰셋 등으로 모든 PR 자동 리뷰. 새 푸시마다 다시 리뷰하려면 "Review new pushes" 선택.
- 리뷰 유형: 기본은 Comment라 필수 승인 수에 포함되지 않는다. 승인 기능은 기본 꺼짐이며 엔터프라이즈·조직·리포지토리에서 켤 수 있다.
- 맞춤 리뷰 기준: `.github/copilot-instructions.md`(리포지토리 전체), `.github/instructions/**/*.instructions.md`(경로별), AGENTS.md. PR의 head 브랜치에서 읽는다 → [[사용자 지정 지침]].
- 피드백: 코멘트의 엄지 위·아래. Copilot은 사람의 답글을 보지 않는다.
- 정책: 관리자가 켜면 Copilot 라이선스가 없는 조직 구성원도 쓸 수 있다. 콘텐츠 제외된 파일은 리뷰하지 않는다.
- 리뷰 강도: Lite(명백한 문제), Balanced(더 깊은 분석).

## 헷갈리는 개념
| 개념 | 차이 |
|---|---|
| [[AI 출력 검증]] | AI 리뷰는 보조, 사람 검토 대체 아님 |

## 오답 함정
> [!warning] 오답이 되기 쉬운 선택지
> - Copilot 리뷰가 기본으로 필수 승인을 충족한다는 선택지 → 기본은 Comment 리뷰
> - 리뷰 코멘트에 답글을 달면 Copilot이 반영한다는 선택지 → Copilot은 답글을 보지 않는다
> - 지침 파일은 base 브랜치에서 읽는다는 선택지 → PR의 head 브랜치

## 관련
- [[사용자 지정 지침]] · [[Copilot 클라우드 에이전트]] · [[조직 Copilot 정책]] · [[콘텐츠 제외]] · [[PR 요약]]

**공식 목표**: [[2 GitHub Copilot 기능 사용#목표 2.10|2.10]] · [[2 GitHub Copilot 기능 사용#목표 2.11|2.11]] · [[2 GitHub Copilot 기능 사용#목표 2.13|2.13]]  
**근거**: [Using GitHub Copilot code review](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/request-a-code-review/use-code-review) · [About customizing GitHub Copilot responses](https://docs.github.com/en/copilot/concepts/prompting/response-customization) · [Content exclusion for GitHub Copilot](https://docs.github.com/en/copilot/concepts/context/content-exclusion)

## 셀프 체크
> [!question]- Copilot 코드 리뷰의 기본 리뷰 유형은?
> Comment(필수 승인에 포함 안 됨)

> [!question]- 리포지토리 전체 리뷰 기준 파일은?
> .github/copilot-instructions.md
