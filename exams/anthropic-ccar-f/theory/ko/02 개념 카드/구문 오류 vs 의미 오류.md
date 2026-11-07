---
aliases: ["semantic error", "syntax error", "의미 검증"]
tags: ["ccar-f", "개념카드", "도메인4"]
도메인: 4
태스크: ["4.3", "4.4"]
중요도: "상"
---
# 구문 오류 vs 의미 오류

> [!summary] 한 줄 정의
> 도구 사용 + 엄격한 스키마는 JSON 구문 오류를 없애지만, 합계 불일치·필드 위치 오류 같은 의미 오류는 막지 못한다.

**English** Syntax errors vs semantic errors

## 시험 트리거
- "스키마는 통과했는데 항목 합계가 총액과 다르다"
- "값이 엉뚱한 필드에 들어갔다"

## 핵심
- 구문 오류: 괄호·따옴표 등 → tool_use로 **제거**.
- 의미 오류: 값의 합이 안 맞음, 잘못된 필드 → **별도 검증 필요**(Pydantic 등) → [[검증-재시도 루프]].
- 자체 교정 설계: stated_total과 함께 **calculated_total**을 추출해 불일치 표시, 원문끼리 안 맞으면 **conflict_detected**.

## 관련
- [[tool_use 구조화된 출력]] · [[검증-재시도 루프]] · [[Pydantic 검증]]

**공식 태스크**: [[4.3 도구 사용과 JSON 스키마]] · [[4.4 검증·재시도·피드백 루프]]

## 셀프 체크
> [!question]- 엄격한 JSON 스키마로도 막을 수 없는 오류는?
> 의미 오류(합계 불일치, 잘못된 필드 배치)

> [!question]- 총액 불일치를 스스로 찾게 하려면 어떤 필드를 함께 추출하나?
> stated_total과 calculated_total
