---
aliases: ["IP allow lists", "Networking for runners", "GET /meta", "방화벽"]
tags: ["gh-200", "개념카드", "도메인4"]
도메인: 4
목표: ["4.5"]
중요도: "상"
---
# 러너 네트워크와 IP 허용 목록

> [!summary] 한 줄 정의
> 조직·엔터프라이즈가 IP 허용 목록을 쓰거나 사내 리소스에 방화벽이 있으면, 러너의 나가는 IP와 GitHub로의 통신 경로를 맞춰 설정해야 한다.

**English** IP allow lists and runner networking

## 시험 트리거
- "IP 허용 목록을 켰더니 자체 호스팅 러너가 안 붙는다"
- "호스팅 러너가 사내 API에 접근해야 한다"
- "프록시 환경의 러너"

## 핵심
- IP 허용 목록 사용 시 자체 호스팅 러너의 IP를 목록에 추가해야 한다.
- 호스팅 러너 IP 범위는 `GET /meta`의 actions 키(매주 갱신). 다만 GitHub는 내부 리소스 허용 목록으로 쓰지 말라고 권한다 → 정적 IP 더 큰 러너 또는 자체 호스팅 러너.
- 일부 Linux 러너는 다중 클라우드에서 실행돼 Azure 범위만 허용하면 막힐 수 있다.
- 자체 호스팅 러너는 아웃바운드 HTTPS 443과 필요한 도메인(github.com, api.github.com, *.actions.githubusercontent.com, codeload.github.com, results-receiver.actions.githubusercontent.com, *.blob.core.windows.net 등) 접근이 필요. 최소 70 kbps.
- 연결 점검: 러너 config 스크립트 `--check`(--url, --pat).
- Azure 사설 네트워크(VNet) 연결은 더 큰 러너 기능.

## 오답 함정
> [!warning] GET /meta의 actions IP 범위를 사내 방화벽 허용 목록으로 쓰는 것을 권장한다는 선택지 → 권장하지 않음

## 관련
- [[자체 호스팅 러너]] · [[더 큰 러너]] · [[자체 호스팅 러너 문제 해결]]

**공식 목표**: [[4 엔터프라이즈의 GitHub Actions 관리#목표 4.5|4.5]]  
**근거**: [GitHub-hosted runners reference](https://docs.github.com/en/actions/reference/runners/github-hosted-runners) · [Self-hosted runners reference](https://docs.github.com/en/actions/reference/runners/self-hosted-runners) · [Larger runners](https://docs.github.com/en/actions/concepts/runners/larger-runners) · [Monitoring and troubleshooting self-hosted runners](https://docs.github.com/en/actions/how-tos/manage-runners/self-hosted-runners/monitor-and-troubleshoot)

## 셀프 체크
> [!question]- 호스팅 러너 IP 범위를 얻는 API는?
> GET /meta의 actions 키

> [!question]- 사내 방화벽에 고정 IP로 허용하려면?
> 정적 IP 더 큰 러너 또는 자체 호스팅 러너
