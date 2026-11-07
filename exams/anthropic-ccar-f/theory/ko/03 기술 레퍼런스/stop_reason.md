---
aliases: ["stop reason", "\"tool_use\"", "\"end_turn\""]
tags: ["ccar-f", "레퍼런스", "도메인1"]
도메인: 1
태스크: ["1.1"]
중요도: "상"
---
# stop_reason

> [!summary] 한 줄 정의
> Claude API 응답이 왜 멈췄는지 알려 주는 값. 에이전트 루프의 계속·종료 판단 기준.

**English** stop_reason

## 시험 트리거
- "루프를 언제 끝내나"

## 핵심
- "tool_use" → 모델이 도구 호출을 요청 → 도구 실행 후 결과를 붙여 **계속**.
- "end_turn" → 모델이 답을 마침 → **종료**.
- 가이드 부록은 max_tokens도 시험 범위의 API 개념으로 든다(응답 길이 상한).

## 관련
- [[에이전트 루프]] · [[루프 종료 안티패턴]]

**공식 태스크**: [[1.1 에이전트 루프 설계와 구현]]

## 셀프 체크
> [!question]- stop_reason "tool_use"와 "end_turn"의 처리는?
> tool_use면 도구 실행 후 계속, end_turn이면 종료
