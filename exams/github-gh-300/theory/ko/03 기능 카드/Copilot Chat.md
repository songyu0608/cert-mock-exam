---
aliases: ["Copilot 채팅", "Chat", "Ask 모드", "Plan 모드", "인라인 채팅", "Inline chat", "채팅 피드백"]
tags: ["gh-300", "기능카드", "도메인2"]
도메인: 2
목표: ["2.2", "2.12"]
중요도: "상"
---
# Copilot Chat

> [!summary] 한 줄 정의
> 코딩 관련 질문을 대화로 묻고 답과 코드 제안을 받는 인터페이스. GitHub, GitHub Mobile, 지원 IDE, Windows Terminal에서 쓸 수 있다.

**English** GitHub Copilot Chat

## 시험 트리거
- "이 함수가 무엇을 하는지 설명해 줘"
- "파일을 바꾸지 않고 테스트 전략만 묻고 싶다"
- "응답이 도움이 됐는지 피드백"

## 핵심
- VS Code 채팅 모드(에이전트 드롭다운): Agent(자율 작업), Plan(구현 계획 작성), Ask(질문 답변·코드 제안, 파일을 바꾸지 않음).
- 컨텍스트: #(채팅 변수), @(채팅 참가자), 이미지·PDF 드래그 → [[채팅 명령, 참가자, 변수]].
- 인라인 채팅 Ctrl+I(Mac Cmd+I), 빠른 채팅 Ctrl+Shift+Alt+L.
- 피드백: 응답 옆 엄지 위·아래 아이콘.
- 모델을 바꿀 수 있다(요금제·조직 정책에 따라 선택지가 다름).
- 한계: 에이전트 모드 프롬프트는 AI 크레딧을 쓴다. 관리자가 채팅이나 에이전트 모드를 끄면 쓸 수 없다. 속도 제한에 걸리면 기다리거나 요금제를 올린다(변동 정보).
- 일관된 응답을 위해 프롬프트 파일을 재사용한다 → [[프롬프트 파일]].

## 헷갈리는 개념
| 개념 | 차이 |
|---|---|
| [[에이전트 모드]] | Ask는 답만, Agent는 파일 편집·명령 실행까지 |
| [[인라인 제안과 다음 편집 제안]] | 대화 vs 입력 중 자동 완성 |

## 오답 함정
> [!warning] 오답이 되기 쉬운 선택지
> - Ask 모드가 파일을 직접 수정한다는 선택지 → 수정·도구 실행은 Agent 모드
> - 채팅이 안 보이면 반드시 설치 오류라는 선택지 → 조직 소유자가 채팅·에이전트 모드를 정책으로 끈 경우일 수 있다

## 관련
- [[채팅 명령, 참가자, 변수]] · [[에이전트 모드]] · [[프롬프트 파일]] · [[채팅 기록과 체인 프롬프팅]] · [[Copilot 문제 해결]]

**공식 목표**: [[2 GitHub Copilot 기능 사용#목표 2.2|2.2]] · [[2 GitHub Copilot 기능 사용#목표 2.12|2.12]]  
**근거**: [GitHub Copilot features](https://docs.github.com/en/copilot/get-started/features) · [Asking GitHub Copilot questions in your IDE](https://docs.github.com/en/copilot/how-tos/chat-with-copilot/chat-in-ide) · [Troubleshooting common issues with GitHub Copilot](https://docs.github.com/en/copilot/how-tos/troubleshoot-copilot/troubleshoot-common-issues)

## 셀프 체크
> [!question]- VS Code 채팅 모드 3가지는?
> Agent, Plan, Ask

> [!question]- Copilot Chat 응답에 피드백을 주는 방법은?
> 엄지 위·아래 아이콘
