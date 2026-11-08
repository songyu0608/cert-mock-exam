---
aliases: ["Codespaces", "Codespace", "개발 컨테이너", "Dev container", "devcontainer.json", "클라우드 개발 환경"]
tags: ["gh-900", "기능카드", "도메인4"]
도메인: 4
목표: ["4.4", "4.5"]
중요도: "상"
---
# GitHub Codespaces

> [!summary] 한 줄 정의
> GitHub가 호스팅하는 VM 위 Docker 컨테이너에서 도는 클라우드 개발 환경. devcontainer.json으로 모두에게 같은 환경을 준다.

**English** GitHub Codespaces and dev containers

## 시험 트리거
- "새 팀원이 개발 환경 설정에 하루를 쓴다"
- "브라우저에서 코드를 실행·디버그해야 한다"
- "모두 같은 도구·확장으로 작업"

## 핵심
- GitHub 호스팅 VM 위 Docker 컨테이너. 항상 Linux. 브라우저, VS Code, GitHub CLI로 접속. 템플릿이나 임의 브랜치·커밋에서 생성.
- 개발 컨테이너 설정: .devcontainer/devcontainer.json(또는 루트의 .devcontainer.json). 이미지·Dockerfile, 기능(features), VS Code 설정·확장을 지정. 설정이 없으면 기본 Linux 이미지(주요 언어, Git, GitHub CLI 포함).
- 여러 설정은 .devcontainer 하위 폴더에 하나씩. 바뀐 설정은 컨테이너 재빌드로 적용(/workspaces 안은 유지). 쓰기 권한자가 설정 편집.
- 개인화: 공개 dotfiles 리포지토리, Settings Sync. 머신 크기: 2코어·8GB·32GB부터 32코어·128GB·128GB까지.
- 수명 주기: 기본 30분 비활동 시 정지(탭을 닫아도 정지 아님), 최대 12시간 실행, 정지 후 기본 30일 보존 뒤 삭제. 작업은 커밋·푸시해야 영구 보존.
- 비용: 개인 계정(Free·Pro)은 월 무료 사용량, Team·Enterprise 조직은 구성원 사용료를 대신 낼 수 있다. 정지 상태는 저장 비용만.

## 헷갈리는 개념
| 개념 | 차이 |
|---|---|
| [[github.dev]] | 컴퓨팅·터미널 있음(실행·디버그) vs 브라우저 편집만 |

## 오답 함정
> [!warning] 오답이 되기 쉬운 선택지
> - Codespaces에서 Windows 개발 컨테이너를 쓴다는 선택지 → 항상 Linux
> - 브라우저 탭을 닫으면 codespace가 바로 정지된다는 선택지 → 비활동 시간 초과나 직접 정지 전까지 실행
> - codespace를 삭제해도 푸시하지 않은 변경은 남는다는 선택지 → 사라진다

## 관련
- [[github.dev]] · [[Codespaces vs github.dev]] · [[GitHub Actions]]

**공식 목표**: [[4 최신 개발 방식 적용#목표 4.4|4.4]] · [[4 최신 개발 방식 적용#목표 4.5|4.5]]  
**근거**: [What are GitHub Codespaces?](https://docs.github.com/en/codespaces/about-codespaces/what-are-codespaces) · [Introduction to dev containers](https://docs.github.com/en/codespaces/setting-up-your-project-for-codespaces/adding-a-dev-container-configuration/introduction-to-dev-containers) · [Understanding the codespace lifecycle](https://docs.github.com/en/codespaces/about-codespaces/understanding-the-codespace-lifecycle) · [GitHub's plans](https://docs.github.com/en/get-started/learning-about-github/githubs-plans)

## 셀프 체크
> [!question]- 개발 컨테이너 설정 파일 위치는?
> .devcontainer/devcontainer.json 또는 루트의 .devcontainer.json

> [!question]- codespace의 기본 비활동 정지 시간은?
> 30분

> [!question]- 정지된 codespace의 기본 보존 기간은?
> 30일
