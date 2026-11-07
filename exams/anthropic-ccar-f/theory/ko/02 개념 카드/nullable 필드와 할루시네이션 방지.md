---
aliases: ["optional field", "nullable", "선택 필드"]
tags: ["ccar-f", "개념카드", "도메인4"]
도메인: 4
태스크: ["4.3"]
중요도: "상"
---
# nullable 필드와 할루시네이션 방지

> [!summary] 한 줄 정의
> 원문에 없을 수 있는 정보를 필수 필드로 두면 모델이 값을 지어낸다. 선택(nullable) 필드로 설계해 null을 허용한다.

**English** Nullable fields to prevent fabrication

## 시험 트리거
- "원문에 없는 값이 채워져 있다"
- "필수 필드를 채우려고 지어낸다"

## 핵심
- 없을 수 있는 정보 → **optional / nullable**.
- 모호한 경우 → enum에 **"unclear"** 값.
- 확장 가능한 분류 → enum **"other" + 상세 문자열** 필드.

## 관련
- [[JSON 스키마 설계]] · [[tool_use 구조화된 출력]]

**공식 태스크**: [[4.3 도구 사용과 JSON 스키마]]

## 셀프 체크
> [!question]- 원문에 없는 값을 모델이 지어내는 것을 막는 스키마 설계는?
> 해당 필드를 선택(nullable)으로 설계

> [!question]- 확장 가능한 범주를 enum으로 표현하는 패턴은?
> "other" + 상세 문자열 필드
