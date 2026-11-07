---
aliases: ["CLAUDE.md", "CLAUDE.local.md", "CLAUDE.mdの階層", "@import"]
tags: ["ccar-p", "레퍼런스", "도메인7"]
도메인: 7
목표: ["7.1", "6.4"]
중요도: "상"
---
# CLAUDE.md 범위

> [!summary] 한 줄 정의
> Claude Code가 매 세션 읽는 지침 파일. 관리형·사용자·프로젝트·로컬 범위로 나뉘고, 팀 공유 지침은 프로젝트 CLAUDE.md에 둔다.

**日本語** CLAUDE.md　·　**English** CLAUDE.md scopes

## 시험 트리거
- "팀 코딩 규칙을 모든 세션에 적용"
- "개인 샌드박스 URL은 공유하지 않고 싶다"
- "회사 전체 보안 지침"

## 핵심
- 관리형 정책: 조직 전체(IT 배포). 사용자: ~/.claude/CLAUDE.md(모든 프로젝트). 프로젝트: ./CLAUDE.md 또는 ./.claude/CLAUDE.md(소스 관리로 팀 공유). 로컬: ./CLAUDE.local.md(개인, .gitignore).
- @path/to/import 구문으로 다른 파일을 가져올 수 있다. 다만 가져온 파일도 함께 로드되므로 컨텍스트 비용은 줄지 않는다.
- 파일당 200줄 미만을 권장한다. 일부 코드에만 필요한 지침은 경로 지정 규칙(.claude/rules/, paths)으로 옮긴다.
- 관리형 CLAUDE.md는 claudeMdExcludes로 제외할 수 없다. 강제가 필요한 규칙은 관리형 설정(permissions.deny 등)으로 한다.
- 자동 메모리(auto memory)는 Claude가 스스로 쓰는 노트로, 세션마다 처음 200줄 또는 25KB를 로드한다.

## 헷갈리는 개념
| 개념 | 차이 |
|---|---|
| [[Claude Code 설정 우선순위]] | CLAUDE.md는 행동 지침, 설정은 기술적 강제 |
| [[Agent Skills]] | 매 세션 로드 vs 필요 시 로드 |

## 오답 함정
> [!warning] CLAUDE.md에 "rm -rf 금지"라고 쓰면 강제된다는 선택지 → 지침일 뿐, 강제는 permissions.deny·훅

## 관련
- [[팀용 Claude Code 구성]] · [[Claude Code 설정 우선순위]] · [[Claude Code 훅]] · [[CLAUDE.md vs 설정 vs 훅]]

**공식 목표**: [[7 개발자 생산성과 운영 지원#목표 7.1|7.1]] · [[6 이해관계자 커뮤니케이션과 라이프사이클 관리#목표 6.4|6.4]]  
**근거**: [Claude Code: How Claude remembers your project](https://code.claude.com/docs/en/memory)

## 셀프 체크
> [!question]- 팀과 공유되는 CLAUDE.md 위치는?
> ./CLAUDE.md 또는 ./.claude/CLAUDE.md(소스 관리)

> [!question]- CLAUDE.md 권장 길이는?
> 파일당 200줄 미만
