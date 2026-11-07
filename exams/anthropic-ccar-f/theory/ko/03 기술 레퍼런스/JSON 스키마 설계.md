---
aliases: ["JSON Schema", "required", "enum", "strict mode"]
tags: ["ccar-f", "레퍼런스", "도메인4"]
도메인: 4
태스크: ["4.3"]
중요도: "중"
---
# JSON 스키마 설계

> [!summary] 한 줄 정의
> 추출 스키마 설계 요소: 필수 vs 선택 필드, nullable, enum, "other" + 상세 문자열, 엄격 모드.

**English** JSON Schema design

## 시험 트리거
- "추출 스키마를 어떻게 설계하나"

## 핵심
- 필수 vs 선택: 원문에 없을 수 있으면 **선택(nullable)**. → [[nullable 필드와 할루시네이션 방지]]
- enum: 모호하면 **"unclear"**, 확장 가능하면 **"other" + 상세**.
- 엄격 모드는 구문 오류를 없앤다. 의미 오류는 따로 검증.

## 관련
- [[tool_use 구조화된 출력]] · [[Pydantic 검증]]

**공식 태스크**: [[4.3 도구 사용과 JSON 스키마]]

## 셀프 체크
> [!question]- 모호한 값을 담는 enum 값의 예는?
> "unclear"
