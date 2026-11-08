---
aliases: ["Cloud agent", "Coding agent", "코딩 에이전트", "Copilot에 이슈 할당", "Agents 탭"]
tags: ["gh-300", "기능카드", "도메인2"]
도메인: 2
목표: ["2.10", "2.9"]
중요도: "중"
---
# Copilot 클라우드 에이전트

> [!summary] 한 줄 정의
> GitHub에서 백그라운드로 리포지토리를 조사하고 계획을 세운 뒤 브랜치에서 코드를 바꾸는 자율 에이전트(이전 이름 코딩 에이전트). 결과는 PR로 검토한다.

**English** Copilot cloud agent

## 시험 트리거
- "이슈를 Copilot에 할당해 PR을 받고 싶다"
- "IDE를 켜지 않고 작업을 위임"
- "팀원이 에이전트 작업 로그를 확인"

## 핵심
- 시작: Copilot 홈, 파일·이슈·PR의 Copilot 패널, 대시보드, 리포지토리의 Agents 탭, 이슈를 Copilot에 할당 등.
- GitHub Actions 기반의 임시 환경에서 실행된다. 세션 로그로 작업과 도구 사용을 확인한다.
- 로그는 사람의 리뷰·테스트를 대신하지 않는다.
- GitHub MCP·Playwright MCP 서버가 기본 구성. 사용자 지정 에이전트와 에이전트 스킬로 특화.
- 유료 요금제에서 제공. Business·Enterprise는 관리자가 정책으로 켠다(변동 정보).

## 헷갈리는 개념
| 개념 | 차이 |
|---|---|
| [[에이전트 모드]] | GitHub 백그라운드 vs IDE 로컬 |

## 오답 함정
> [!warning] 클라우드 에이전트가 기본 브랜치에 바로 병합한다는 선택지 → 브랜치에서 작업하고 사람이 diff·PR을 검토

## 관련
- [[에이전트 모드]] · [[하위 에이전트와 에이전트 세션]] · [[Copilot 코드 리뷰]] · [[MCP]] · [[Copilot 요금제]]

**공식 목표**: [[2 GitHub Copilot 기능 사용#목표 2.10|2.10]] · [[2 GitHub Copilot 기능 사용#목표 2.9|2.9]]  
**근거**: [About GitHub Copilot cloud agent](https://docs.github.com/en/copilot/concepts/agents/coding-agent/about-coding-agent) · [GitHub Copilot features](https://docs.github.com/en/copilot/get-started/features) · [About Model Context Protocol (MCP)](https://docs.github.com/en/copilot/concepts/context/mcp)

## 셀프 체크
> [!question]- 클라우드 에이전트의 결과를 검토하는 방법은?
> 브랜치의 diff와 풀 리퀘스트 리뷰
