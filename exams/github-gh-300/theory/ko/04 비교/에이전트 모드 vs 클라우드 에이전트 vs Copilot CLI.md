---
aliases: ["Agent mode vs cloud agent vs CLI"]
tags: ["gh-300", "비교", "도메인2"]
---
# 에이전트 모드 vs 클라우드 에이전트 vs Copilot CLI

| | [[에이전트 모드]] | [[Copilot 클라우드 에이전트]] | [[Copilot CLI]] |
|---|---|---|---|
| 실행 위치 | IDE(로컬) | GitHub(Actions 기반 임시 환경, 백그라운드) | 터미널(로컬) |
| 시작 | 채팅의 Agent 선택 | Agents 탭, Copilot 패널, 이슈를 Copilot에 할당 등 | `copilot`(대화형), `copilot -p`(1회) |
| 승인 | 편집·터미널 명령을 사용자가 승인 | 결과를 브랜치 diff·PR로 검토 | 도구별 승인(once·session), --allow-tool / --deny-tool |
| 결과 | 작업 영역 파일 변경(Keep·Undo, 체크포인트) | 브랜치 변경, PR | 로컬 파일 변경, 명령 실행, PR 생성 가능 |
| 맞는 상황 | 지금 보고 있는 코드를 같이 고침 | 잘 정의된 이슈를 맡기고 다른 일 | IDE 없이 터미널·스크립트에서 |

공통: MCP로 도구 확장, 사용자 지정 지침·에이전트로 특화, 사람의 검토 필요.

> [!question]- 잘 정의된 버그 이슈를 맡기고 결과를 PR로 받고 싶다. IDE는 열지 않는다.
> 클라우드 에이전트(이슈를 Copilot에 할당).

> [!question]- CI 스크립트 안에서 Copilot에 한 번 요청하고 끝내야 한다.
> Copilot CLI 프로그래밍 모드(`copilot -p`).

← [[비교 노트 목록]]
