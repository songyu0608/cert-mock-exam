---
aliases: ["CLAUDE.md", "memory file", "구성 계층"]
tags: ["ccar-f", "레퍼런스", "도메인3"]
도메인: 3
태스크: ["3.1", "3.6"]
중요도: "상"
---
# CLAUDE.md 계층

> [!summary] 한 줄 정의
> Claude Code에 지시를 주는 CLAUDE.md는 사용자·프로젝트·디렉터리 세 수준이 있다.

**English** CLAUDE.md hierarchy

## 시험 트리거
- "새 팀원에게만 지시가 적용되지 않는다"
- "팀 표준을 모두에게 적용"

## 핵심

| 수준 | 위치 | 공유 |
|---|---|---|
| 사용자 | ~/.claude/CLAUDE.md | **본인만**(버전 관리 안 됨) |
| 프로젝트 | .claude/CLAUDE.md 또는 루트 CLAUDE.md | 팀 공유 |
| 디렉터리 | 하위 디렉터리 CLAUDE.md | 그 디렉터리 작업 시 |

- "새 팀원이 지시를 못 받는다" → 지시가 **사용자 수준**에 있는 경우가 많다. 프로젝트 수준으로 옮긴다.
- 로드된 메모리 파일 확인은 **/memory**.
- CI에서도 CLAUDE.md가 프로젝트 컨텍스트(테스트 표준, 픽스처, 리뷰 기준)를 전달한다.

## 헷갈리는 개념
| 개념 | 차이 |
|---|---|
| [[경로별 규칙과 .claude rules]] | 파일 경로에 따라 조건부 로드 |

## 관련
- [[@import]] · [[memory와 compact]] · [[3.1 CLAUDE.md 구성]] · [[프로젝트 범위 vs 사용자 범위]]

**공식 태스크**: [[3.1 CLAUDE.md 구성]] · [[3.6 CI CD 통합]]

## 셀프 체크
> [!question]- ~/.claude/CLAUDE.md의 지시가 팀원에게 적용되나?
> 아니다. 사용자 수준이라 본인에게만 적용된다

> [!question]- 어떤 메모리 파일이 로드됐는지 확인하는 명령은?
> /memory
