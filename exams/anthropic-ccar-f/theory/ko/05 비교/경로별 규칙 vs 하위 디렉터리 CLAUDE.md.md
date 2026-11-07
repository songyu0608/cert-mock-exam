---
aliases: ["규칙 적용 방식 비교"]
tags: ["ccar-f", "비교", "도메인3"]
---
# 경로별 규칙 vs 하위 디렉터리 CLAUDE.md

| 방식 | 적용 기준 | 흩어진 파일(테스트 등) | 자동 적용 |
|---|---|---|---|
| [[경로별 규칙과 .claude rules]] (paths glob) | 파일 경로 패턴 | **잘 맞음** | 예 |
| 하위 디렉터리 CLAUDE.md | 디렉터리 | 어려움 | 예(그 디렉터리) |
| 루트 CLAUDE.md에 모두 | Claude의 추론 | 불안정 | 추론 의존 |
| 스킬 | 호출 | - | 아니오(호출 필요) |
| @import | 패키지별 CLAUDE.md에 포함 | - | 포함된 곳에서 |

> [!question]- Button.test.tsx처럼 곳곳에 흩어진 테스트 파일에 같은 규칙을 자동 적용하려면?
> .claude/rules/ 파일의 paths에 **/*.test.tsx.

← [[비교 노트 목록]]
