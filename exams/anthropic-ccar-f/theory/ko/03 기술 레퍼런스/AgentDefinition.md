---
aliases: ["agent definition", "에이전트 정의"]
tags: ["ccar-f", "레퍼런스", "도메인1"]
도메인: 1
태스크: ["1.3"]
중요도: "중"
---
# AgentDefinition

> [!summary] 한 줄 정의
> Agent SDK에서 서브에이전트 유형마다 설명, 시스템 프롬프트, 도구 제한을 정의하는 구성.

**English** AgentDefinition

## 시험 트리거
- "서브에이전트마다 쓸 수 있는 도구를 다르게"

## 핵심
- 구성 요소: **설명(description), 시스템 프롬프트, 도구 제한**.
- 도구 제한으로 역할 밖 도구 오용을 막는다. → [[도구 배분과 최소 권한]]

## 관련
- [[Task 도구와 allowedTools]]

**공식 태스크**: [[1.3 서브에이전트 호출과 컨텍스트 전달]]

## 셀프 체크
> [!question]- AgentDefinition에 들어가는 3가지는?
> 설명, 시스템 프롬프트, 도구 제한
