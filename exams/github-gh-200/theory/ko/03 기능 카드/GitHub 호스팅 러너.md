---
aliases: ["GitHub-hosted runners", "호스팅 러너", "runs-on 라벨", "실행기"]
tags: ["gh-200", "기능카드", "도메인4"]
도메인: 4
목표: ["4.4", "4.7"]
중요도: "상"
---
# GitHub 호스팅 러너

> [!summary] 한 줄 정의
> GitHub가 관리하는 러너로, 작업마다 새 가상 머신(VM)이 제공된다. Ubuntu, Windows, macOS 이미지를 라벨(ubuntu-latest 등)로 고른다.

**English** GitHub-hosted runners

## 시험 트리거
- "러너 관리 없이 바로 빌드"
- "sudo로 패키지 설치"
- "작업이 6시간 넘으면 취소"

## 핵심
- 작업마다 깨끗한 새 VM(단일 CPU ubuntu-slim은 공유 VM의 컨테이너). 작업이 끝나면 폐기.
- 표준 사양(2026-11 문서): 공개 리포 Linux·Windows 4 CPU·16 GB, 비공개 리포 2 CPU·8 GB(변동 정보).
- Linux·macOS는 비밀번호 없는 sudo, Windows는 관리자·UAC 비활성.
- 작업 최대 6시간. 동시 작업 수는 요금제별(Free 20, Pro 40, Team 60, Enterprise 500, 변동 정보).
- 공개 리포의 표준 러너는 무료, 비공개는 포함 사용량 이후 과금.
- 이미지는 actions/runner-images, 소프트웨어는 매주 업데이트 → [[사전 설치 소프트웨어와 런타임 설치]].
- Azure VM은 인바운드 ICMP 차단(ping 불가). 경로는 HOME, GITHUB_WORKSPACE 등 환경 변수로 만든다(고정 경로 아님).

## 헷갈리는 개념
| 개념 | 차이 |
|---|---|
| [[더 큰 러너]] | 고정 사양·무료(공개) vs 더 많은 코어·GPU·정적 IP, 항상 과금 |
| [[자체 호스팅 러너]] | 매번 새 VM vs 직접 관리, 깨끗한 환경 보장 없음 |

## 오답 함정
> [!warning] 오답이 되기 쉬운 선택지
> - 호스팅 러너가 작업 간에 상태를 유지한다는 선택지 → 작업마다 새 VM
> - 호스팅 러너 작업 최대 시간이 5일이라는 선택지 → 6시간(5일은 자체 호스팅)

## 관련
- [[러너 이미지 변경]] · [[사전 설치 소프트웨어와 런타임 설치]] · [[더 큰 러너]] · [[자체 호스팅 러너]] · [[러너 유형 비교]]

**공식 목표**: [[4 엔터프라이즈의 GitHub Actions 관리#목표 4.4|4.4]] · [[4 엔터프라이즈의 GitHub Actions 관리#목표 4.7|4.7]]  
**근거**: [GitHub-hosted runners](https://docs.github.com/en/actions/concepts/runners/github-hosted-runners) · [GitHub-hosted runners reference](https://docs.github.com/en/actions/reference/runners/github-hosted-runners) · [Actions limits](https://docs.github.com/en/actions/reference/limits) · [GitHub Actions billing and usage](https://docs.github.com/en/actions/concepts/billing-and-usage)

## 셀프 체크
> [!question]- 호스팅 러너 작업 최대 실행 시간은?
> 6시간

> [!question]- 호스팅 Linux 러너의 관리자 권한 방식은?
> 비밀번호 없는 sudo
