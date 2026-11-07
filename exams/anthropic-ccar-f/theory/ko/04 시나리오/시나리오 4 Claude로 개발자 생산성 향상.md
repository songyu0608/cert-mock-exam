---
aliases: ["Scenario 4", "Developer Productivity with Claude", "シナリオ4"]
tags: ["ccar-f", "시나리오"]
---
# 시나리오 4 Claude로 개발자 생산성 향상

**English** Scenario 4: Developer Productivity with Claude

> [!abstract] 시나리오 (공식 가이드 번역)
> Claude Agent SDK로 개발자 생산성 도구를 만든다. 에이전트는 엔지니어가 낯선 코드베이스를 탐색하고, 레거시 시스템을 이해하고, 상용구 코드를 만들고, 반복 작업을 자동화하도록 돕는다. 내장 도구(Read, Write, Bash, Grep, Glob)를 쓰고 MCP 서버와 통합한다.

주요 도메인: 2 도구 설계와 MCP 통합, 3 Claude Code 구성과 워크플로, 1 에이전트 아키텍처와 오케스트레이션

## 이 시나리오에서 자주 나오는 판단
- 도구 선택 → [[내장 도구]], [[점진적 코드베이스 탐색]]
- MCP 구성 → [[MCP 서버 범위]], [[MCP 리소스]]
- MCP 도구가 안 쓰임 → [[도구 설명]]
- 열린 작업 분해 → [[동적 적응형 분해]]
- 세션 → [[세션 재개와 fork_session]]

## 공식 샘플 문제
가이드에 이 시나리오의 샘플 문제는 없다.

← [[0 시험 개요와 출제 범위]]
