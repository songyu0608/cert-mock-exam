---
aliases: ["MCP", "Model Context Protocol", "モデルコンテキストプロトコル"]
tags: ["ccar-p", "레퍼런스", "도메인3"]
도메인: 3
목표: ["3.7"]
중요도: "상"
---
# MCP(모델 컨텍스트 프로토콜)

> [!summary] 한 줄 정의
> AI 에이전트를 외부 시스템(도구·데이터)에 연결하는 오픈 표준. 한 번 구현하면 여러 서버·클라이언트와 연결된다.

**日本語** MCP　·　**English** Model Context Protocol (MCP)

## 시험 트리거
- "사내 시스템 여러 개를 여러 AI 앱에 연결"
- "통합마다 맞춤 코드를 쓰느라 중복이 많다"

## 핵심
- 공식 글: 에이전트-도구 조합마다 맞춤 통합을 만들던 파편화를 줄이는 범용 프로토콜이다.
- Building effective agents: MCP는 증강 LLM을 구현하는 한 방법으로, 서드파티 도구 생태계와 간단한 클라이언트 구현으로 연결한다.
- 연결 방식: Messages API의 MCP 커넥터(원격 HTTP 서버), Claude Code의 MCP 설정(로컬 stdio·원격 서버) → [[MCP 커넥터]] · [[Claude Code MCP 범위]].
- 도구가 많아지면 도구 정의가 컨텍스트를 차지한다 → [[도구 검색 도구]] · [[코드 실행과 MCP]].

## 헷갈리는 개념
| 개념 | 차이 |
|---|---|
| [[통합 메커니즘 선택(MCP·API·CLI·A2A)]] | MCP는 선택지 중 하나 |

## 오답 함정
> [!warning] MCP 연결 자체가 권한 통제를 제공한다는 선택지 → 인가·도구 범위는 별도로 설계

## 관련
- [[통합 메커니즘 선택(MCP·API·CLI·A2A)]] · [[MCP 커넥터]] · [[Claude Code MCP 범위]] · [[증강 LLM]]

**공식 목표**: [[3 통합#목표 3.7|3.7]]  
**근거**: [Code execution with MCP](https://www.anthropic.com/research/code-execution-with-mcp) · [Building effective AI agents](https://www.anthropic.com/research/building-effective-agents)

## 셀프 체크
> [!question]- MCP의 한 줄 정의(공식 글)는?
> AI 에이전트를 외부 시스템에 연결하는 오픈 표준
