---
aliases: ["--resume", "fork_session", "named session", "세션 포크"]
tags: ["ccar-f", "레퍼런스", "도메인1"]
도메인: 1
태스크: ["1.7"]
중요도: "중"
---
# 세션 재개와 fork_session

> [!summary] 한 줄 정의
> --resume <session-name>은 이름 붙은 이전 대화를 이어 가고, fork_session은 공통 분석 기준점에서 독립 분기를 만든다.

**English** Session resume and fork_session

## 시험 트리거
- "어제 하던 조사를 이어서"
- "두 리팩터링 방식을 같은 분석에서 비교"

## 핵심
- **--resume <session-name>**: 특정 세션 이어 가기.
- **fork_session**: 같은 기준점에서 갈라져 다른 접근법을 병렬 탐색.
- 재개 시 바뀐 파일을 알려 줘야 한다. 결과가 오래됐으면 요약을 주입한 새 세션. → [[새 세션 vs 세션 재개]]

## 관련
- [[1.7 세션 상태·재개·포크]]

**공식 태스크**: [[1.7 세션 상태·재개·포크]]

## 셀프 체크
> [!question]- 공통 코드베이스 분석에서 두 테스트 전략을 나눠 탐색하려면?
> fork_session
