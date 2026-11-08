---
aliases: ["PR trigger comparison"]
tags: ["gh-200", "비교", "도메인1", "도메인5"]
---
# pull_request vs pull_request_target vs workflow_run

| | pull_request | pull_request_target | workflow_run |
|---|---|---|---|
| 실행 컨텍스트 | PR 병합 커밋(refs/pull/N/merge) | base 리포 기본 브랜치 | 기본 브랜치 워크플로, 앞 워크플로 완료 후 |
| 포크 PR 비밀 | 전달 안 됨 | 접근 가능 | 접근 가능 |
| 포크 PR 토큰 | 읽기 전용 | 쓰기 가능 | 쓰기 가능 |
| 병합 충돌 시 | 실행 안 됨 | 실행됨 | — |
| 위험 | 낮음 | PR 코드 체크아웃·실행 시 높음 | 아티팩트를 신뢰하면 위험 |
| 용도 | 빌드·테스트 | 라벨·댓글(코드 실행 없이) | 권한 분리(테스트 → 권한 작업) |

관련: [[포크 PR 워크플로 보안]] · [[워크플로 트리거와 이벤트]]

> [!question]- 포크 PR 테스트 결과를 PR 댓글로 달고 싶다. 테스트는 PR 코드를 실행한다.
> pull_request로 테스트하고 결과를 아티팩트로 남긴 뒤 workflow_run 워크플로가 댓글을 단다.

← [[비교 노트 목록]]
