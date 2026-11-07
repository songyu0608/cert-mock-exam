---
aliases: ["Hooks", "PreToolUse", "PostToolUse", "フック"]
tags: ["ccar-p", "레퍼런스", "도메인7"]
도메인: 7
목표: ["7.2", "5.1"]
중요도: "중"
---
# Claude Code 훅

> [!summary] 한 줄 정의
> Claude Code 수명주기의 특정 시점(도구 실행 전후, 알림 등)에 셸 명령을 자동 실행하는 기능. 지침이 아니라 결정적으로 실행된다.

**日本語** フック　·　**English** Claude Code hooks

## 시험 트리거
- "파일을 편집할 때마다 포매터 실행"
- ".env 파일 편집을 막고 싶다"
- "Claude가 입력을 기다릴 때 알림"

## 핵심
- PreToolUse: 도구 실행 전. 차단할 수 있다(종료 코드 2 → 차단, stderr 메시지가 Claude에게 피드백으로 전달).
- PostToolUse: 도구 성공 후. 예: Edit|Write 매처로 편집 후 Prettier 실행.
- 여러 훅의 PreToolUse 권한 결정은 가장 제한적인 답이 적용된다(deny > defer > ask > allow).
- 설정 파일(예: .claude/settings.json)의 hooks 블록에 정의한다.
- -p 실행에서는 프로젝트 훅이 실행되지만, --bare 모드에서는 훅을 읽지 않는다 → [[헤드리스 모드(-p)]].

## 헷갈리는 개념
| 개념 | 차이 |
|---|---|
| [[CLAUDE.md 범위]] | 모델이 따를 수도 있는 지침 vs 항상 실행되는 코드 |

## 오답 함정
> [!warning] 보호 파일 차단을 CLAUDE.md 지침으로만 하는 선택지 → 확실한 차단은 PreToolUse 훅(종료 코드 2)이나 권한 규칙

## 관련
- [[AI 보조 개발 워크플로]] · [[CLAUDE.md 범위]] · [[Claude Code 설정 우선순위]] · [[CLAUDE.md vs 설정 vs 훅]]

**공식 목표**: [[7 개발자 생산성과 운영 지원#목표 7.2|7.2]] · [[5 거버넌스, 안전, 리스크 관리#목표 5.1|5.1]]  
**근거**: [Claude Code: Hooks guide](https://code.claude.com/docs/en/hooks-guide) · [Claude Code: Run programmatically](https://code.claude.com/docs/en/headless)

## 셀프 체크
> [!question]- PreToolUse 훅이 도구 실행을 막는 종료 코드는?
> 2

> [!question]- 여러 PreToolUse 훅의 결정이 다를 때는?
> 가장 제한적인 결정(deny > defer > ask > allow)
