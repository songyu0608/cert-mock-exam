---
aliases: ["공유 vs 개인"]
tags: ["ccar-f", "비교", "도메인2", "도메인3"]
---
# 프로젝트 범위 vs 사용자 범위

| 대상 | 프로젝트 범위(팀 공유, 버전 관리) | 사용자 범위(본인만) |
|---|---|---|
| 지시 | .claude/CLAUDE.md 또는 루트 CLAUDE.md | ~/.claude/CLAUDE.md |
| 슬래시 명령 | .claude/commands/ | ~/.claude/commands/ |
| 스킬 | .claude/skills/ | ~/.claude/skills/ (개인 변형은 다른 이름으로) |
| MCP 서버 | .mcp.json (${ENV} 확장) | ~/.claude.json |
| 경로별 규칙 | .claude/rules/ | - |

**판별**: "모든 팀원이", "clone하면", "버전 관리" → 프로젝트 범위. "개인", "실험" → 사용자 범위.

관련: [[CLAUDE.md 계층]], [[사용자 지정 슬래시 명령]], [[스킬과 SKILL.md frontmatter]], [[MCP 서버 범위]]

> [!question]- 새로 합류한 개발자만 코딩 규칙을 적용받지 못한다. 가장 흔한 원인은?
> 규칙이 기존 개발자의 ~/.claude/CLAUDE.md(사용자 수준)에 있어서 공유되지 않았다.

← [[비교 노트 목록]]
