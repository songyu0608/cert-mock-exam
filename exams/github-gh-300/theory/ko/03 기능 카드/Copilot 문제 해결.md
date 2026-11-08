---
aliases: ["Troubleshooting", "문제 해결", "제안이 안 나옴", "콘텐츠 제외 문제", "속도 제한"]
tags: ["gh-300", "기능카드", "도메인6"]
도메인: 6
목표: ["6.4"]
중요도: "상"
---
# Copilot 문제 해결

> [!summary] 한 줄 정의
> 제안이 안 나오거나 이상할 때는 서비스 상태, 확장 버전, 로그인, 정책, 콘텐츠 제외를 순서대로 확인한다.

**English** Troubleshooting suggestions and content exclusions

## 시험 트리거
- "갑자기 제안이 전혀 안 나온다"
- "특정 파일에서만 제안이 없다"
- "제외 규칙을 바꿨는데 반영이 안 된다"

## 핵심
- 서비스 장애: githubstatus.com 확인.
- 확장 업데이트: 오래된 클라이언트는 서버와 통신하지 못한다.
- 특정 파일만 안 됨: 콘텐츠 제외일 수 있다. 상태 표시줄 아이콘에 대각선이 보이고, 마우스를 올리면 적용된 설정이 보인다.
- 제외 변경 미반영: 최대 30분. VS Code "Developer: Reload Window"로 다시 불러오기.
- 제외했는데 쓰이는 듯함: 타입 정보 등 간접 정보, Edit·Agent 모드, 심볼릭 링크·원격 파일 시스템, 서드파티 MCP는 제외가 완전하지 않다.
- 로그인 오류("could not connect to server. Extension activation failed"): Copilot 요금제 없음 또는 토큰 요청 실패 → 로그아웃·재로그인, Reload Window.
- 채팅·에이전트 모드가 안 보임: 최신 VS Code인지, 조직이 정책으로 껐는지 확인.
- 속도 제한: 기다리거나 요금제 변경. 이상한 출력: 에이전트 중지, 변경 되돌리기, 다시 요청, 다른 모델, 지침 추가.

## 헷갈리는 개념
| 개념 | 차이 |
|---|---|
| [[콘텐츠 제외]] | 설정 방법 vs 문제 원인 진단 |

## 오답 함정
> [!warning] 제외 규칙 변경 직후 제안이 계속 나오면 설정이 잘못된 것이라는 선택지 → 반영에 최대 30분, 다시 불러오기 먼저

## 관련
- [[콘텐츠 제외]] · [[IDE에서 Copilot 활성화와 편집기 설정]] · [[조직 Copilot 정책]] · [[Copilot Chat]]

**공식 목표**: [[6 개인정보 보호, 콘텐츠 제외, 보호 장치 구성#목표 6.4|6.4]]  
**근거**: [Troubleshooting common issues with GitHub Copilot](https://docs.github.com/en/copilot/how-tos/troubleshoot-copilot/troubleshoot-common-issues) · [Excluding content from GitHub Copilot](https://docs.github.com/en/copilot/how-tos/configure-content-exclusion/exclude-content-from-copilot) · [Content exclusion for GitHub Copilot](https://docs.github.com/en/copilot/concepts/context/content-exclusion)

## 셀프 체크
> [!question]- 특정 파일에서만 제안이 안 나오면 먼저 의심할 것은?
> 콘텐츠 제외(상태 표시줄 아이콘의 대각선)

> [!question]- Copilot이 전체적으로 안 될 때 먼저 볼 곳은?
> githubstatus.com과 확장 버전
