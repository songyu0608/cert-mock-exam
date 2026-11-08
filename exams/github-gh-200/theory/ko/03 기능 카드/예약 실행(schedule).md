---
aliases: ["schedule", "cron", "일정 트리거"]
tags: ["gh-200", "기능카드", "도메인1"]
도메인: 1
목표: ["1.1"]
중요도: "중"
---
# 예약 실행(schedule)

> [!summary] 한 줄 정의
> `on: schedule`에 POSIX cron 식을 적어 정해진 시각에 워크플로를 실행한다.

**English** Scheduled events

## 시험 트리거
- "매일 새벽 정기 빌드"
- "예약 워크플로가 몇 분 늦게 돈다"
- "오래된 공개 리포에서 예약 실행이 멈췄다"

## 핵심
- cron 필드 5개(분 시 일 월 요일). 기본 UTC이며 timezone을 선택적으로 지정할 수 있다.
- 기본 브랜치의 최신 커밋에서 실행된다.
- 가장 짧은 간격은 5분. 부하가 높으면 지연되거나 누락될 수 있다.
- 공개 리포지토리에서 60일간 리포지토리 활동이 없으면 예약 워크플로가 자동 비활성화된다.
- 공개 리포지토리를 포크하면 예약 워크플로는 기본 비활성화 상태다.

## 오답 함정
> [!warning] 오답이 되기 쉬운 선택지
> - 예약 실행이 PR 브랜치에서 돈다는 선택지 → 기본 브랜치의 최신 커밋
> - 1분 간격 cron이 가능하다는 선택지 → 최소 5분

## 관련
- [[워크플로 트리거와 이벤트]] · [[워크플로 비활성화와 삭제]]

**공식 목표**: [[1 워크플로 작성과 관리#목표 1.1|1.1]]  
**근거**: [Events that trigger workflows](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows) · [Disabling and enabling a workflow](https://docs.github.com/en/actions/how-tos/manage-workflow-runs/disable-and-enable-workflows)

## 셀프 체크
> [!question]- schedule 이벤트는 어느 커밋에서 실행되나?
> 기본 브랜치의 최신 커밋

> [!question]- 공개 리포지토리 예약 워크플로가 자동 비활성화되는 조건은?
> 60일간 리포지토리 활동 없음
