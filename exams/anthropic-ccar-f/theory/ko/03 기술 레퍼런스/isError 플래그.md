---
aliases: ["isError", "MCP error"]
tags: ["ccar-f", "레퍼런스", "도메인2"]
도메인: 2
태스크: ["2.2"]
중요도: "중"
---
# isError 플래그

> [!summary] 한 줄 정의
> MCP 도구가 실패를 에이전트에 알리는 플래그 패턴.

**English** MCP isError flag

## 시험 트리거
- "도구 실패를 에이전트가 알게 하려면"

## 핵심
- 실패 결과에 isError를 표시하고, 함께 **errorCategory·isRetryable·설명**을 돌려준다. → [[오류 범주와 재시도 가능성]]

## 관련
- [[오류 범주와 재시도 가능성]]

**공식 태스크**: [[2.2 MCP 도구의 구조화된 오류 응답]]

## 셀프 체크
> [!question]- MCP 도구가 실패를 에이전트에 알리는 플래그는?
> isError
