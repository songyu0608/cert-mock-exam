---
aliases: ["Claude Code for teams", "チーム向けにClaudeのツールと環境を構成", "Claude Code 팀 설정"]
tags: ["ccar-p", "개념카드", "도메인7"]
도메인: 7
목표: ["7.1"]
중요도: "상"
---
# 팀용 Claude Code 구성

> [!summary] 한 줄 정의
> 팀 공유 지침(CLAUDE.md), 설정·권한(settings), MCP 서버, 인증을 범위별로 나눠 배포하고, 조직 정책은 관리형 설정으로 강제한다.

**日本語** チーム向けのClaudeのツールと環境　·　**English** Configuring Claude tools and environments for teams (e.g., Claude Code)

## 시험 트리거
- "모든 개발자에게 같은 규칙을 적용"
- "특정 명령을 조직 전체에서 금지"
- "팀이 같은 MCP 서버를 쓰게"

## 핵심
- 지침: 관리형 → 사용자(~/.claude/CLAUDE.md) → 프로젝트(./CLAUDE.md, 팀 공유) → 로컬(CLAUDE.local.md) → [[CLAUDE.md 범위]].
- 공식 문서: 기술적 강제는 설정(예: permissions.deny, sandbox.enabled, forceLoginMethod), 행동 지침은 CLAUDE.md로 나눈다.
- 설정 우선순위: 관리형 > 명령줄 > 로컬 프로젝트 > 공유 프로젝트 > 사용자 → [[Claude Code 설정 우선순위]].
- MCP: 프로젝트 범위(.mcp.json)는 버전 관리로 팀과 공유된다 → [[Claude Code MCP 범위]].
- 인증: 대부분의 팀에는 Claude for Teams/Enterprise를 권장. 그 밖에 Console, Bedrock·Vertex·Foundry 등 클라우드 제공자.

## 헷갈리는 개념
| 개념 | 차이 |
|---|---|
| [[AI 보조 개발 워크플로]] | 환경 구성 vs 일상 워크플로 개선 |

## 오답 함정
> [!warning] 보안 규칙을 CLAUDE.md 지침으로만 두는 선택지 → 강제가 필요하면 관리형 설정(permissions.deny 등)

## 관련
- [[CLAUDE.md 범위]] · [[Claude Code 설정 우선순위]] · [[Claude Code MCP 범위]] · [[Claude Code 훅]] · [[CLAUDE.md vs 설정 vs 훅]]

**공식 목표**: [[7 개발자 생산성과 운영 지원#목표 7.1|7.1]]  
**근거**: [Claude Code: How Claude remembers your project](https://code.claude.com/docs/en/memory) · [Claude Code: Settings](https://code.claude.com/docs/en/settings) · [Claude Code: MCP](https://code.claude.com/docs/en/mcp) · [Claude Code: Authentication](https://code.claude.com/docs/en/iam)

## 셀프 체크
> [!question]- 조직 전체에서 특정 도구·명령을 막는 곳(공식 문서)은?
> 관리형 설정의 permissions.deny

> [!question]- 기술적 강제와 행동 지침은 각각 어디에 두나?
> 강제는 설정(settings), 지침은 CLAUDE.md
