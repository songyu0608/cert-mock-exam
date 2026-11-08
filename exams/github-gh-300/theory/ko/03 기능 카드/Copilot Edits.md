---
aliases: ["Copilot 편집", "편집 모드", "Edit mode", "작업 세트", "Working set"]
tags: ["gh-300", "기능카드", "도메인2"]
도메인: 2
목표: ["2.9"]
중요도: "중"
---
# Copilot Edits

> [!summary] 한 줄 정의
> 지정한 파일(작업 세트)에 걸친 편집을 Copilot이 제안하고 사용자가 검토해 수락·취소하는 편집 경험. 학습 가이드에 명시된 용어다.

**English** Copilot Edits

## 시험 트리거
- "여러 파일을 한 번에 고치되 내가 범위를 정하고 싶다"
- "제안된 편집을 파일별로 수락하거나 되돌리기"

## 핵심
- 학습 가이드는 "에이전트 모드, Copilot Edits, MCP"를 함께 언급한다.
- 2026-11 현재 GitHub Copilot 기능 문서에는 Copilot Edits나 편집 모드 항목이 없고, VS Code 채팅 모드는 Agent·Plan·Ask로 안내된다.
- VS Code의 작업 세트(working set)는 추적된 편집을 모아 Keep·Undo로 검토한다(실험 기능).
- 콘텐츠 제외 문서는 "Edit 및 Agent 모드"에서 제외가 지원되지 않는다고 쓴다.
- 〔해석〕 Copilot Edits는 여러 파일 편집 제안(편집 모드)에서 시작해 에이전트 경험으로 통합되는 중으로 보인다. 시험에서는 "여러 파일에 걸친 편집 제안·검토"로 이해하면 된다.

## 헷갈리는 개념
| 개념 | 차이 |
|---|---|
| [[에이전트 모드]] | 사용자가 범위를 정한 편집 제안 vs 파일 선택·명령 실행까지 자율 반복〔해석〕 |

## 오답 함정
> [!warning] Edit 모드에서는 콘텐츠 제외가 적용된다는 선택지 → Edit·Agent 모드 모두 지원되지 않는다

## 관련
- [[에이전트 모드]] · [[콘텐츠 제외]] · [[Copilot Chat]]

**공식 목표**: [[2 GitHub Copilot 기능 사용#목표 2.9|2.9]]  
**근거**: [GH-300 학습 가이드(2026년 8월 7일 기준)](https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/gh-300) · [VS Code: Review and manage edits](https://code.visualstudio.com/docs/copilot/chat/copilot-edits) · [Content exclusion for GitHub Copilot](https://docs.github.com/en/copilot/concepts/context/content-exclusion) · [GitHub Copilot features](https://docs.github.com/en/copilot/get-started/features)

## 셀프 체크
> [!question]- 콘텐츠 제외가 지원되지 않는 Copilot Chat 모드 2가지는?
> Edit 모드와 Agent 모드
