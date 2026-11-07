---
aliases: ["CLAUDE.md vs settings vs hooks"]
tags: ["ccar-p", "비교", "도메인7"]
---
# CLAUDE.md vs 설정 vs 훅

| | [[CLAUDE.md 범위\|CLAUDE.md]] | [[Claude Code 설정 우선순위\|설정(settings)]] | [[Claude Code 훅\|훅]] |
|---|---|---|---|
| 성격 | 행동 지침(모델이 읽음) | 기술적 강제(권한·환경) | 시점별 자동 실행 코드 |
| 예 | 코딩 규칙, 아키텍처 설명 | permissions.deny, sandbox.enabled | 편집 후 포매터, 보호 파일 차단 |
| 강제력 | 약함 | 강함 | 강함(종료 코드 2로 차단) |
| 팀 공유 | ./CLAUDE.md | .claude/settings.json | 설정 파일의 hooks 블록 |

**판별 순서**: ① 반드시 막아야 하나? → 설정(deny) 또는 PreToolUse 훅 ② 특정 시점에 항상 실행? → 훅 ③ 모델이 알아야 할 맥락·규칙? → CLAUDE.md

> [!question]- 조직 전체에서 운영 DB 접속 명령을 금지하려 한다.
> 관리형 설정의 permissions.deny. CLAUDE.md는 지침이라 강제가 아니다.

근거: Claude Code 공식 문서(memory, settings, hooks)

← [[비교 노트 목록]]
