---
aliases: ["Task tool", "allowedTools", "서브에이전트 생성"]
tags: ["ccar-f", "레퍼런스", "도메인1"]
도메인: 1
태스크: ["1.3"]
중요도: "상"
---
# Task 도구와 allowedTools

> [!summary] 한 줄 정의
> Agent SDK에서 서브에이전트를 생성하는 수단은 Task 도구이며, 코디네이터가 이를 쓰려면 allowedTools에 "Task"가 있어야 한다.

**English** Task tool and allowedTools

## 시험 트리거
- "코디네이터가 서브에이전트를 못 부른다"

## 핵심
- allowedTools에 **"Task"** 포함 필수.
- 한 응답에 Task 호출 여러 개 → 병렬 실행. → [[병렬 서브에이전트 생성]]
- 서브에이전트에 필요한 정보는 Task 호출의 프롬프트에 명시적으로 넣는다. → [[서브에이전트 컨텍스트 전달]]

## 관련
- [[AgentDefinition]] · [[허브 앤 스포크 오케스트레이션]]

**공식 태스크**: [[1.3 서브에이전트 호출과 컨텍스트 전달]]

## 셀프 체크
> [!question]- 코디네이터가 서브에이전트를 호출하려면 allowedTools에 무엇이 있어야 하나?
> "Task"
