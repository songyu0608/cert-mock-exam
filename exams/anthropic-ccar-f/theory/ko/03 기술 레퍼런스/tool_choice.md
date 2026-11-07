---
aliases: ["tool choice", "\"auto\"", "\"any\"", "강제 도구 선택", "forced tool selection"]
tags: ["ccar-f", "레퍼런스", "도메인2"]
도메인: 2
태스크: ["2.3", "4.3"]
중요도: "상"
---
# tool_choice

> [!summary] 한 줄 정의
> 모델이 도구를 호출할지, 어떤 도구를 호출할지 정하는 API 설정. "auto", "any", 강제 선택 세 가지.

**English** tool_choice

## 시험 트리거
- "모델이 가끔 도구 대신 텍스트로 답한다"
- "추출 스키마가 여러 개인데 문서 유형을 모른다"
- "이 도구를 먼저 실행해야 한다"

## 핵심

| 값 | 동작 | 쓰는 때 |
|---|---|---|
| "auto" | 도구를 쓸지 모델이 결정. 텍스트만 반환할 수 있음 | 기본값 |
| "any" | **반드시 도구 호출**, 어떤 도구인지는 모델이 선택 | 스키마가 여러 개이고 문서 유형을 모를 때 |
| {"type": "tool", "name": "..."} | **지정한 도구를 반드시 호출** | 특정 단계를 먼저 실행(예: extract_metadata를 보강보다 먼저) |

- 강제 선택으로 첫 도구를 실행한 뒤 이후 단계는 **후속 턴**에서 처리한다.

## 오답 함정
> [!warning] 구조화된 출력을 반드시 받아야 하는데 "auto" 유지 → 텍스트로 답할 수 있음

## 관련
- [[tool_use 구조화된 출력]] · [[도구 배분과 최소 권한]] · [[tool_choice 세 가지 비교]]

**공식 태스크**: [[2.3 도구 배분과 tool_choice]] · [[4.3 도구 사용과 JSON 스키마]]

## 셀프 체크
> [!question]- 모델이 반드시 어떤 도구든 호출하게 하는 tool_choice 값은?
> "any"

> [!question]- extract_metadata를 가장 먼저 실행시키려면?
> tool_choice: {"type": "tool", "name": "extract_metadata"}
