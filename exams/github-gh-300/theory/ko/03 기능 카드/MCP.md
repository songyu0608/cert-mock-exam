---
aliases: ["Model Context Protocol", "모델 컨텍스트 프로토콜", "GitHub MCP 서버", "MCP 서버", "MCP Registry"]
tags: ["gh-300", "기능카드", "도메인2"]
도메인: 2
목표: ["2.9"]
중요도: "상"
---
# MCP

> [!summary] 한 줄 정의
> LLM 애플리케이션이 외부 데이터·도구와 컨텍스트를 주고받는 방식을 정한 개방형 표준. Copilot은 MCP 서버로 외부 도구·데이터에 접근한다.

**English** Model Context Protocol (MCP)

## 시험 트리거
- "에이전트가 이슈 트래커·DB 같은 외부 도구를 쓰게"
- "GitHub 이슈·PR을 에이전트에서 다루고 싶다"
- "조직에서 MCP 사용을 통제"

## 핵심
- IDE, Copilot CLI, GitHub Copilot 앱, GitHub.com의 위임 작업에서 MCP를 쓴다.
- GitHub MCP 서버: GitHub가 제공·관리. VS Code에서는 원격으로 바로, 다른 MCP 호환 편집기에서는 로컬로 실행. Copilot CLI에는 기본 내장.
- 클라우드 에이전트·코드 리뷰: GitHub MCP 서버와 Playwright MCP 서버가 기본 구성.
- GitHub MCP Registry: 파트너·커뮤니티 MCP 서버 목록(공개 미리 보기).
- 조직 정책 "MCP servers in Copilot": 기본 꺼짐, Copilot Business·Enterprise 사용자에게만 적용(Free·Pro·Pro+·Max는 해당 없음).
- 도구 세트(toolsets)는 필요한 것만 켠다: 도구 선택 정확도와 컨텍스트 절약, 보안에 유리.

## 헷갈리는 개념
| 개념 | 차이 |
|---|---|
| [[사용자 지정 지침]] | 외부 도구·데이터 연결 vs 응답 방식 안내 |
| [[Copilot Spaces]] | 도구·데이터 실시간 연결 vs 큐레이션한 컨텍스트 묶음 |

## 오답 함정
> [!warning] 오답이 되기 쉬운 선택지
> - 조직의 MCP 정책이 기본으로 켜져 있다는 선택지 → 기본 꺼짐
> - MCP 정책이 개인 Pro 사용자에게도 적용된다는 선택지 → Business·Enterprise 사용자에게만

## 관련
- [[에이전트 모드]] · [[Copilot CLI]] · [[조직 Copilot 정책]] · [[Copilot Spaces]] · [[Copilot 클라우드 에이전트]]

**공식 목표**: [[2 GitHub Copilot 기능 사용#목표 2.9|2.9]]  
**근거**: [About Model Context Protocol (MCP)](https://docs.github.com/en/copilot/concepts/context/mcp) · [Managing policies and features for Copilot in your organization](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-organization/manage-policies)

## 셀프 체크
> [!question]- 조직 정책 "MCP servers in Copilot"의 기본값은?
> 꺼짐(Disabled)

> [!question]- Copilot CLI에 기본 내장된 MCP 서버는?
> GitHub MCP 서버
