---
aliases: ["concurrency", "cancel-in-progress", "동시 실행 제한"]
tags: ["gh-200", "기능카드", "도메인1"]
도메인: 1
목표: ["1.2", "5.10"]
중요도: "중"
---
# 동시성 제어(concurrency)

> [!summary] 한 줄 정의
> `concurrency.group`이 같은 실행·작업을 한 번에 하나만 돌게 하고, `cancel-in-progress`로 진행 중인 것을 취소할 수 있다.

**English** Using concurrency

## 시험 트리거
- "같은 브랜치에 연달아 푸시하면 이전 빌드는 취소"
- "프로덕션 배포가 동시에 두 개 돌면 안 된다"

## 핵심
- 워크플로 수준 또는 작업 수준에 둔다. 그룹 이름은 대소문자를 구분하지 않는다.
- 기본 동작: 같은 그룹에 새 실행이 대기열에 들어오면 이전의 대기(pending) 실행이 취소된다. 진행 중인 실행은 유지.
- `cancel-in-progress: true`면 진행 중인 실행도 취소.
- 예: `group: ${{ github.workflow }}-${{ github.ref }}`.

## 오답 함정
> [!warning] concurrency 기본값이 진행 중인 실행을 취소한다는 선택지 → cancel-in-progress: true가 필요

## 관련
- [[환경과 배포 보호 규칙]] · [[워크플로 최적화 전략]]

**공식 목표**: [[1 워크플로 작성과 관리#목표 1.2|1.2]] · [[5 자동화 보안과 최적화#목표 5.10|5.10]]  
**근거**: [Workflow syntax for GitHub Actions](https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax)

## 셀프 체크
> [!question]- 같은 그룹에서 진행 중인 실행까지 취소하려면?
> cancel-in-progress: true
