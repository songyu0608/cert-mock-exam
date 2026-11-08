---
aliases: ["Validate AI output", "검증", "과의존", "Overreliance", "책임 있는 Copilot 운영"]
tags: ["gh-300", "개념카드", "도메인1"]
도메인: 1
목표: ["1.4", "1.5"]
중요도: "상"
---
# AI 출력 검증

> [!summary] 한 줄 정의
> Copilot 출력은 적용 전에 사람이 검토·테스트·검증해야 하며, Copilot은 프로그래밍을 대신하는 것이 아니라 돕는 도구로 써야 한다.

**English** Validating AI output and operating Copilot responsibly

## 시험 트리거
- "제안을 그대로 받아들여 배포했다가 버그"
- "보안이 중요한 코드에 Copilot 사용"
- "주니어가 Copilot 코드를 이해 못 하고 커밋"

## 핵심
- 제안은 명시적으로 수락할 때만 파일에 적용된다. 수락 전후 검토가 사용자 책임.
- 권장: 특히 중요·보안 민감 코드는 검토·테스트·검증, 하드코딩 비밀번호·SQL 인젝션 같은 위험을 피하는 보안 코딩, 코드 리뷰.
- 편집기 내용을 코드·코딩 주제로 유지하면 제안 품질이 좋아진다.
- PR 텍스트 제안은 게시 전에 정확성을 확인한다.
- 과의존(overreliance)을 경계하고 Copilot을 보조 도구로 쓴다.
- 확장 업데이트를 최신으로 유지한다(VS Code·Visual Studio·JetBrains는 자동 업데이트가 기본).
- 이용 약관: 출력은 사용 전에 검토·테스트·검증할 책임이 사용자에게 있다 → [[출력의 소유권과 책임]].

## 헷갈리는 개념
| 개념 | 차이 |
|---|---|
| [[Copilot 코드 리뷰]] | AI가 리뷰를 돕는 기능 vs 사람이 AI 출력을 검증하는 책임(대체 불가) |

## 오답 함정
> [!warning] 오답이 되기 쉬운 선택지
> - Copilot 코드 리뷰를 켜면 사람의 리뷰가 필요 없다는 선택지 → 기본 리뷰는 Comment라 필수 승인을 채우지 않고, 사람 검토는 여전히 필요
> - 테스트가 통과했으니 생성 코드를 더 볼 필요 없다는 선택지 → 생성 테스트도 모든 시나리오를 덮지 못한다

## 관련
- [[생성형 AI의 위험과 한계]] · [[출력의 소유권과 책임]] · [[단위·통합 테스트 생성]] · [[Copilot 코드 리뷰]]

**공식 목표**: [[1 책임감 있는 GitHub Copilot 사용#목표 1.4|1.4]] · [[1 책임감 있는 GitHub Copilot 사용#목표 1.5|1.5]]  
**근거**: [Responsible use of Copilot inline suggestions](https://docs.github.com/en/copilot/responsible-use/copilot-code-completion) · [GitHub Terms of Service (J. AI features)](https://docs.github.com/en/site-policy/github-terms/github-terms-of-service) · [Learn: Generate unit tests with the GitHub Copilot Chat view](https://learn.microsoft.com/en-us/training/modules/develop-unit-tests-using-github-copilot-tools/3-generate-unit-tests-chat-view)

## 셀프 체크
> [!question]- Copilot 제안이 파일에 적용되는 조건은?
> 사용자가 명시적으로 수락할 때만

> [!question]- Copilot 출력의 검토·테스트·검증 책임은 누구에게?
> 사용자
