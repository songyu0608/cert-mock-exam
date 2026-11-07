---
aliases: ["settings.json", "managed-settings.json", "permissions", "設定の優先順位"]
tags: ["ccar-p", "레퍼런스", "도메인7"]
도메인: 7
목표: ["7.1", "3.2"]
중요도: "상"
---
# Claude Code 설정 우선순위

> [!summary] 한 줄 정의
> Claude Code 설정은 관리형 > 명령줄 > 로컬 프로젝트 > 공유 프로젝트 > 사용자 순으로 적용된다. 권한 목록은 범위를 넘어 합쳐진다.

**日本語** Claude Codeの設定　·　**English** Claude Code settings precedence

## 시험 트리거
- "조직 정책을 개발자가 덮어쓰지 못하게"
- "팀이 공유할 권한 규칙"
- "개인 설정을 이 프로젝트에만"

## 핵심
- 우선순위(높은 순): 관리형(managed-settings.json·MDM·서버 관리형) → 명령줄(--settings) → 로컬 프로젝트(.claude/settings.local.json) → 공유 프로젝트(.claude/settings.json) → 사용자(~/.claude/settings.json).
- 목록 값(예: permissions.allow)은 덮어쓰지 않고 범위를 넘어 합쳐진다.
- 관리형 설정으로 강제하는 것 예: permissions.deny(도구·명령·경로 차단), sandbox.enabled, env(API 제공자 라우팅), forceLoginMethod·forceLoginOrgUUID.
- 일부 보안 키는 더 엄격한 값이 낮은 범위에 있으면 그것을 따른다.

## 헷갈리는 개념
| 개념 | 차이 |
|---|---|
| [[CLAUDE.md 범위]] | 설정은 강제, CLAUDE.md는 지침 |

## 오답 함정
> [!warning] 사용자 설정이 관리형 설정을 덮어쓴다는 선택지 → 관리형이 최상위

## 관련
- [[팀용 Claude Code 구성]] · [[CLAUDE.md 범위]] · [[Claude Code 훅]] · [[인증과 인가의 공백]]

**공식 목표**: [[7 개발자 생산성과 운영 지원#목표 7.1|7.1]] · [[3 통합#목표 3.2|3.2]]  
**근거**: [Claude Code: Settings](https://code.claude.com/docs/en/settings) · [Claude Code: How Claude remembers your project](https://code.claude.com/docs/en/memory)

## 셀프 체크
> [!question]- Claude Code 설정 우선순위(높은 순)는?
> 관리형 > 명령줄 > 로컬 프로젝트 > 공유 프로젝트 > 사용자

> [!question]- 팀이 소스 관리로 공유하는 설정 파일은?
> .claude/settings.json
