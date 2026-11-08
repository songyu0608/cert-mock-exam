---
aliases: ["GitHub Copilot CLI", "copilot 명령", "터미널 Copilot", "Copilot in the CLI"]
tags: ["gh-300", "기능카드", "도메인2"]
도메인: 2
목표: ["2.2", "2.4", "2.5"]
중요도: "상"
---
# Copilot CLI

> [!summary] 한 줄 정의
> 터미널에서 Copilot을 쓰는 명령줄 인터페이스. 질문에 답하고, 코드를 작성·디버그하고, GitHub.com과 상호 작용하며 사용자를 대신해 작업한다.

**English** GitHub Copilot CLI

## 시험 트리거
- "IDE 없이 터미널에서 AI로 작업"
- "Copilot CLI를 설치하려면?"
- "조직에서 받은 Copilot으로 CLI가 안 된다"

## 핵심
- 이점: 터미널을 떠나지 않고 질문·코드 작성·디버그·GitHub 작업. 사용자를 대신해 작업을 빨리 끝낸다.
- 모든 Copilot 요금제에서 사용 가능. 조직에서 Copilot을 받으면 조직 설정에서 Copilot CLI 정책이 켜져 있어야 한다.
- 지원: Linux, macOS, Windows(PowerShell v6 이상 또는 WSL).
- 설치: `npm install -g @github/copilot`(Node.js 22 이상), `winget install GitHub.Copilot`, `brew install --cask copilot-cli`, 설치 스크립트 `curl -fsSL https://gh.io/copilot-install | bash`.
- 인증: 처음 실행 시 `/login`. 또는 Copilot Requests 권한이 있는 세분화된 PAT를 환경 변수로(우선순위 COPILOT_GITHUB_TOKEN > GH_TOKEN > GITHUB_TOKEN).
- 실행: `copilot`(대화형) → [[Copilot CLI 명령과 세션]].

## 헷갈리는 개념
| 개념 | 차이 |
|---|---|
| [[에이전트 모드]] | IDE 안 vs 터미널 |
| [[Copilot 클라우드 에이전트]] | 내 터미널에서 로컬 실행 vs GitHub에서 백그라운드 실행 |

## 오답 함정
> [!warning] 오답이 되기 쉬운 선택지
> - Copilot CLI는 Business·Enterprise 전용이라는 선택지 → 모든 Copilot 요금제
> - Copilot CLI 설치에 Node.js 18이면 충분하다는 선택지 → npm 설치는 Node.js 22 이상

## 관련
- [[Copilot CLI 명령과 세션]] · [[에이전트 모드]] · [[MCP]] · [[조직 Copilot 정책]]

**공식 목표**: [[2 GitHub Copilot 기능 사용#목표 2.2|2.2]] · [[2 GitHub Copilot 기능 사용#목표 2.4|2.4]] · [[2 GitHub Copilot 기능 사용#목표 2.5|2.5]]  
**근거**: [About GitHub Copilot CLI](https://docs.github.com/en/copilot/concepts/agents/about-copilot-cli) · [Installing GitHub Copilot CLI](https://docs.github.com/en/copilot/how-tos/set-up/install-copilot-cli)

## 셀프 체크
> [!question]- npm으로 Copilot CLI를 설치하는 명령은?
> npm install -g @github/copilot (Node.js 22+)

> [!question]- 조직에서 받은 Copilot으로 CLI를 쓰기 위한 조건은?
> 조직 설정에서 Copilot CLI 정책이 켜져 있어야 함
