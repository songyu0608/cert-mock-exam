---
aliases: ["GitHub Copilot", "Copilot", "코드 완성", "Copilot Chat", "에이전트 모드", "Agent Mode", "Copilot 에이전트", "클라우드 에이전트", "코딩 에이전트", "다중 모델", "Multi-model"]
tags: ["gh-900", "기능카드", "도메인4"]
도메인: 4
목표: ["4.2"]
중요도: "상"
---
# GitHub Copilot 기능

> [!summary] 한 줄 정의
> AI 코드 제안(완성·다음 편집 제안), Chat, IDE의 에이전트 모드, GitHub 위의 클라우드 에이전트, 코드 리뷰, 여러 모델 선택을 제공하는 AI 개발 도구.

**English** GitHub Copilot features (agents, Agent Mode, multi-model)

## 시험 트리거
- "이슈를 Copilot에 할당해 PR을 받고 싶다"
- "IDE에서 여러 파일 수정과 터미널 명령까지 맡기고 싶다"
- "작업에 맞는 모델을 고르고 싶다"

## 핵심
- 코드 완성·다음 편집 제안: 지원 IDE에서 자동 완성형 제안.
- Copilot Chat: GitHub, GitHub Mobile, IDE, Windows Terminal에서 질문.
- 에이전트 모드(IDE): 바꿀 파일을 스스로 고르고, 편집과 터미널 명령을 제안해 승인을 받으며, 작업이 끝날 때까지 반복.
- 클라우드 에이전트(이전 이름 코딩 에이전트): GitHub Actions 기반 임시 환경에서 리포지토리를 조사·계획하고 브랜치에서 코드를 바꾼 뒤 PR을 만든다. 이슈를 Copilot에 할당, 에이전트 패널, PR에서 @copilot로 시작. 유료 요금제에서 제공(Business·Enterprise는 관리자가 정책을 켜야 함).
- 다중 모델: 요금제에 따라 쓸 수 있는 모델이 다르다(Free는 자동 모델 선택만, 상위 요금제는 프리미엄 모델). 조직 소유자가 기본 외 모델 접근을 정책으로 관리.
- 기타: 코드 리뷰, Copilot CLI, 사용자 지정 지침, MCP 서버 연결, Copilot Spaces. 기능 이름·범위는 자주 바뀐다(변동 정보).

## 헷갈리는 개념
| 개념 | 차이 |
|---|---|
| [[GitHub Copilot 요금제]] | 무엇을 하나 vs 누가 어떤 요금제로 쓰나 |
| [[GitHub Actions]] | 정해진 자동화 vs AI 지원(클라우드 에이전트는 Actions 위에서 실행) |

## 오답 함정
> [!warning] 오답이 되기 쉬운 선택지
> - 에이전트 모드가 사람 승인 없이 GitHub에 직접 병합한다는 선택지 → 편집·명령을 제안해 승인받는다. 클라우드 에이전트도 PR을 만들어 리뷰를 받는다
> - 모든 요금제에서 모든 모델을 고를 수 있다는 선택지 → 요금제·조직 정책에 따라 다르다

## 관련
- [[GitHub Copilot 요금제]] · [[Copilot 정책 관리]] · [[GitHub Actions]] · [[담당자]]

**공식 목표**: [[4 최신 개발 방식 적용#목표 4.2|4.2]]  
**근거**: [GitHub Copilot features](https://docs.github.com/en/copilot/get-started/features) · [About Copilot cloud agent](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-cloud-agent) · [Plans for GitHub Copilot](https://docs.github.com/en/copilot/get-started/plans) · [Managing Copilot policies for an organization](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-organization/manage-policies) · [Assigning issues and pull requests](https://docs.github.com/en/issues/tracking-your-work-with-issues/using-issues/assigning-issues-and-pull-requests-to-other-github-users)

## 셀프 체크
> [!question]- IDE에서 파일 선택·편집·터미널 명령 제안을 반복하며 작업을 끝내는 모드는?
> 에이전트 모드(Agent Mode)

> [!question]- 이슈를 할당받아 브랜치에서 작업하고 PR을 만드는 Copilot 기능은?
> 클라우드 에이전트(이전 이름 코딩 에이전트)
