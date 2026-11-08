---
aliases: ["Copilot CLI commands", "copilot -p", "프로그래밍 모드", "Plan mode", "--allow-tool", "--deny-tool", "신뢰할 수 있는 디렉터리"]
tags: ["gh-300", "기능카드", "도메인2"]
도메인: 2
목표: ["2.6", "2.7", "2.8"]
중요도: "상"
---
# Copilot CLI 명령과 세션

> [!summary] 한 줄 정의
> Copilot CLI는 대화형 세션과 한 번 실행하고 끝나는 프로그래밍 모드로 쓰고, 슬래시 명령과 도구 승인 옵션으로 동작을 통제한다.

**English** Copilot CLI modes, commands, and sessions

## 시험 트리거
- "스크립트에서 Copilot에 한 번 요청하고 끝내고 싶다"
- "파일 삭제 명령만은 막고 싶다"
- "계획부터 세우고 실행"

## 핵심
- 대화형: `copilot`으로 세션 시작, 대화하며 작업. 프로그래밍 모드: `copilot -p "프롬프트"`(--prompt)로 한 작업만 하고 종료.
- 모드: 기본 질문·실행(ask/execute)과 계획(plan) 모드. Shift+Tab으로 전환.
- 슬래시 명령 예: /login, /model(모델 변경), /context(토큰 사용량), /compact(컨텍스트 압축), /mcp, /permissions, /feedback, /sandbox.
- 도구 승인: 이번만 허용, 세션 동안 허용, 거부. 옵션 --allow-tool, --deny-tool(가장 우선), --allow-all-tools(위험). 예: `--allow-all-tools --deny-tool='shell(rm)'`.
- 세션을 재개하면 승인을 다시 받아야 한다.
- 신뢰할 수 있는 디렉터리에서만 실행한다. 홈 디렉터리에서 실행하지 말 것.
- 스크립트 생성·파일 관리: 자연어로 요청하면 파일 생성·수정·셸 명령을 제안하고 승인 후 실행한다〔해석: 가이드 목표 문구와 도구 승인 구조를 합친 정리〕.
- 사용량: 처리 토큰에 따라 AI 크레딧을 쓴다. 큰 컨텍스트·높은 추론은 더 쓴다(변동 정보). MCP, 사용자 지정 에이전트, 훅, 스킬로 확장.

## 헷갈리는 개념
| 개념 | 차이 |
|---|---|
| [[Copilot CLI]] | 무엇·설치 vs 쓰는 법 |

## 오답 함정
> [!warning] 오답이 되기 쉬운 선택지
> - --allow-tool과 --deny-tool이 충돌하면 allow가 이긴다는 선택지 → --deny-tool이 우선
> - 홈 디렉터리에서 실행하는 것이 안전하다는 선택지 → 신뢰할 수 있는 프로젝트 디렉터리에서 실행

## 관련
- [[Copilot CLI]] · [[MCP]] · [[에이전트 모드]]

**공식 목표**: [[2 GitHub Copilot 기능 사용#목표 2.6|2.6]] · [[2 GitHub Copilot 기능 사용#목표 2.7|2.7]] · [[2 GitHub Copilot 기능 사용#목표 2.8|2.8]]  
**근거**: [About GitHub Copilot CLI](https://docs.github.com/en/copilot/concepts/agents/about-copilot-cli)

## 셀프 체크
> [!question]- Copilot CLI에서 한 번만 실행하고 종료하는 옵션은?
> -p 또는 --prompt

> [!question]- 특정 도구를 확실히 막는 옵션과 우선순위는?
> --deny-tool, 다른 허용 옵션보다 우선

> [!question]- 대화형 세션에서 계획 모드로 전환하는 키는?
> Shift+Tab
