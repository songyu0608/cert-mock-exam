---
aliases: ["도메인 4", "Domain 4", "Manage GitHub Actions for the enterprise", "엔터프라이즈용 GitHub Actions 관리"]
tags: ["gh-200", "이론", "도메인4"]
도메인: 4
목표: ["4.1", "4.2", "4.3", "4.4", "4.5", "4.6", "4.7", "4.8", "4.9"]
---
# 도메인 4　엔터프라이즈의 GitHub Actions 관리

**English** Domain 4: Manage GitHub Actions for the enterprise  
**한국어 공식 안내서** 엔터프라이즈용 GitHub Actions 관리

도메인 4 (20–25%) · 목표 9개

엔터프라이즈·조직 차원에서 액션과 워크플로를 배포·통제하고(재사용 구성 요소, 접근 제어, 사용 정책), 러너를 대규모로 관리하며(호스팅·자체 호스팅·네트워크·그룹·소프트웨어), 비밀과 변수를 관리하는 능력을 다룬다(20–25%).

> [!abstract] 액션과 워크플로 배포·거버넌스
> Distribute and govern actions and workflows · 작업 및 워크플로 배포 및 관리

## 목표 4.1

**재사용 가능한 구성 요소와 템플릿을 정의·관리한다**

> [!quote]- 공식 원문 (English / 한국어 공식 안내서)
> Define and manage reusable components and templates
>
> 재사용 가능한 구성 요소 및 템플릿 정의 및 관리

재사용 워크플로, 복합 액션, 조직 워크플로 템플릿(.github/workflow-templates)을 만들어 표준을 배포하고 버전으로 관리한다.

관련 카드: [[재사용 워크플로]] · [[워크플로 템플릿]] · [[비공개 조직 워크플로 템플릿]] · [[복합 액션]] · [[조직 내 액션·워크플로 공유]]

## 목표 4.2

**엔터프라이즈 안에서 액션과 워크플로에 대한 접근을 제어한다**

> [!quote]- 공식 원문 (English / 한국어 공식 안내서)
> Control access to actions and workflows within the enterprise
>
> 엔터프라이즈 내 작업 및 워크플로에 대한 액세스 제어

비공개 리포의 액션·재사용 워크플로는 Access 설정으로 조직에 공유하고, 조직 정책 허용 목록으로 쓸 수 있는 액션을 제한한다.

관련 카드: [[액션 배포 모델]] · [[조직 내 액션·워크플로 공유]] · [[조직 Actions 정책]]

## 목표 4.3

**조직 사용 정책을 구성한다**

> [!quote]- 공식 원문 (English / 한국어 공식 안내서)
> Configure organizational use policies
>
> 조직 사용 정책 구성

조직 Settings → Actions → General: 사용 리포, 허용 액션(GitHub 제작·검증된 작성자·지정 목록), SHA 고정 강제, 포크 PR 승인, Workflow permissions 기본값.

관련 카드: [[조직 Actions 정책]] · [[액션 허용·차단 목록]]

> [!abstract] 러너 대규모 관리
> Manage runners at scale · 러너를 대규모로 관리

## 목표 4.4

**GitHub 호스팅 러너와 자체 호스팅 러너를 구성하고 모니터링한다**

> [!quote]- 공식 원문 (English / 한국어 공식 안내서)
> Configure and monitor GitHub-hosted and self-hosted runners
>
> GitHub 호스팅 및 자체 호스팅 실행기 구성 및 모니터링

호스팅 러너(작업마다 새 VM, 6시간), 더 큰 러너(Team·Enterprise Cloud), 자체 호스팅 러너(리포·조직·엔터프라이즈, 5일, 30일 내 업데이트)를 구성하고 상태(Idle·Active·Offline)를 모니터링한다. ARC로 자동 확장.

관련 카드: [[GitHub 호스팅 러너]] · [[더 큰 러너]] · [[자체 호스팅 러너]] · [[자체 호스팅 러너 문제 해결]] · [[Actions Runner Controller]] · [[사용 한도와 과금]]

## 목표 4.5

**IP 허용 목록과 네트워크 설정을 적용한다**

> [!quote]- 공식 원문 (English / 한국어 공식 안내서)
> Apply IP allow lists and networking settings
>
> IP 허용 목록 및 네트워킹 설정 적용

IP 허용 목록 사용 시 자체 호스팅 러너 IP 추가. 호스팅 러너 IP(GET /meta)는 허용 목록용으로 권장되지 않으므로 정적 IP 더 큰 러너나 자체 호스팅을 쓴다. 자체 호스팅은 아웃바운드 HTTPS 443.

관련 카드: [[더 큰 러너]] · [[자체 호스팅 러너]] · [[러너 네트워크와 IP 허용 목록]]

## 목표 4.6

**러너 그룹을 관리하고 러너 문제를 해결한다**

> [!quote]- 공식 원문 (English / 한국어 공식 안내서)
> Manage runner groups and troubleshoot runner issues
>
> 실행기 그룹 관리 및 실행기 문제 해결

러너 그룹(기본 그룹, 한 러너 한 그룹, 리포 접근 정책)을 관리하고, --check·_diag 로그·서비스 상태·Docker 설치로 러너 문제를 해결한다.

관련 카드: [[러너 그룹]] · [[자체 호스팅 러너 문제 해결]]

## 목표 4.7

**GitHub 호스팅 러너에 미리 설치된 소프트웨어·도구 버전(이미지 릴리스 정보, 도구 캐시)을 확인하고, 런타임에 추가 소프트웨어를 설치한다(setup-* 액션, 패키지 관리자, 캐싱, 컨테이너 이미지, 사용자 지정 자체 호스팅 이미지)**

> [!quote]- 공식 원문 (English / 한국어 공식 안내서)
> Identify preinstalled software/tool versions on GitHub-hosted runners (image release notes, toolcache) and install additional software at runtime (setup-* actions, package managers, caching, container images, custom self-hosted images)
>
> GitHub 호스팅 실행기(이미지 릴리스 정보, 도구 캐시)에서 미리 설치된 소프트웨어/도구 버전을 식별하고 런타임에 추가 소프트웨어 설치(setup-* 작업, 패키지 관리자, 캐싱, 컨테이너 이미지, 사용자 지정 자체 호스팅 이미지)

로그의 Runner Image → Included Software와 actions/runner-images(매주 갱신), RUNNER_TOOL_CACHE로 확인하고, setup-* 액션·패키지 관리자·캐싱·컨테이너 이미지·사용자 지정 이미지로 설치한다.

관련 카드: [[러너 이미지 변경]] · [[의존성 캐싱]] · [[GitHub 호스팅 러너]] · [[사전 설치 소프트웨어와 런타임 설치]]

> [!abstract] 암호화된 비밀과 변수 관리
> Manage encrypted secrets and variables · 암호화된 비밀 및 변수 관리

## 목표 4.8

**조직·리포지토리·환경 수준에서 암호화된 비밀과 변수를 정의하고 범위를 정한다**

> [!quote]- 공식 원문 (English / 한국어 공식 안내서)
> Define and scope encrypted secrets and variables at the organization, repository, and environment levels
>
> 조직, 리포지토리 및 환경 수준에서 암호화된 비밀 및 변수 정의 및 범위 지정

비밀·변수를 조직·리포·환경 수준에 정의한다. 우선순위는 환경 > 리포 > 조직. 조직 비밀은 모든·비공개·선택 리포로 범위를 정한다.

관련 카드: [[비밀(secrets)]] · [[구성 변수(vars)]]

## 목표 4.9

**워크플로와 액션에서 비밀과 변수에 접근해 사용하고, REST API로 프로그래밍 방식으로 관리한다**

> [!quote]- 공식 원문 (English / 한국어 공식 안내서)
> Access and use secrets and variables in workflows and actions; manage secrets and variables programmatically via REST APIs
>
> 워크플로 및 작업에서 비밀 및 변수 액세스 및 사용 REST API를 통해 프로그래밍 방식으로 비밀 및 변수 관리

secrets.X·vars.X로 읽고, 액션에는 입력·env로 넘긴다. REST는 공개 키 + LibSodium 암호화 후 PUT, 목록은 값을 반환하지 않는다.

관련 카드: [[비밀(secrets)]] · [[구성 변수(vars)]] · [[비밀·변수 REST API]] · [[비밀 유출 방지]]

## 요약
- 조직에서 끈 정책은 리포에서 못 켠다.
- 허용 목록: ! = 차단, 최대 1,000.
- 호스팅 6시간 · 자체 호스팅 5일 · 대기 24시간.
- 러너는 한 그룹만 · 새 러너는 기본 그룹.
- 비밀 48 KB · 리포 100 · 조직 1,000 · 환경 > 리포 > 조직.

## 이 도메인의 카드
- [[조직 내 액션·워크플로 공유]] — 비공개 리포지토리의 액션·재사용 워크플로를 조직의 다른 리포지토리에서 쓰게 하려면 그 리포의 Actions 접근(Access) 설정을 연다.
- [[조직 Actions 정책]] — 조직 Settings → Actions → General에서 Actions 사용 리포지토리, 허용할 액션·재사용 워크플로, 포크 PR 실행, GITHUB_TOKEN 기본 권한 등을 정한다.
- [[GitHub 호스팅 러너]] — GitHub가 관리하는 러너로, 작업마다 새 가상 머신(VM)이 제공된다. Ubuntu, Windows, macOS 이미지를 라벨(ubuntu-latest 등)로 고른다.
- [[더 큰 러너]] — GitHub가 관리하는 호스팅 러너 중 RAM·CPU·디스크가 더 큰 머신이다. Team·Enterprise Cloud에서 쓰며 정적 IP, Azure 사설 네트워크, GPU 같은 고급 기능을 준다.
- [[자체 호스팅 러너]] — 직접 배포·관리하는 머신(물리·가상·컨테이너, 온프레미스·클라우드)에 러너 애플리케이션을 설치해 작업을 실행한다. 리포·조직·엔터프라이즈 수준에 등록한다.
- [[러너 네트워크와 IP 허용 목록]] — 조직·엔터프라이즈가 IP 허용 목록을 쓰거나 사내 리소스에 방화벽이 있으면, 러너의 나가는 IP와 GitHub로의 통신 경로를 맞춰 설정해야 한다.
- [[러너 그룹]] — 러너 그룹은 러너를 묶어 어느 조직·리포지토리(·워크플로)가 쓸 수 있는지 제한하는 보안 경계다.
- [[자체 호스팅 러너 문제 해결]] — 러너 상태(Idle·Active·Offline)를 확인하고, 네트워크 점검(--check), _diag 로그, 서비스 상태, Docker 설치 여부로 원인을 찾는다.
- [[Actions Runner Controller]] — ARC는 Kubernetes에서 자체 호스팅 러너를 컨테이너로 실행하고 작업 수에 따라 자동 확장하는 오퍼레이터다.
- [[사전 설치 소프트웨어와 런타임 설치]] — 호스팅 러너 이미지에는 많은 도구가 미리 설치돼 있다. 정확한 목록은 실행 로그와 이미지 릴리스 정보에서 확인하고, 필요한 버전은 setup-* 액션 등으로 실행 중에 설치한다.
- [[비밀(secrets)]] — 비밀은 조직·리포지토리·환경 수준에 암호화해 저장하는 민감 값이다. 워크플로에서 `${{ secrets.NAME }}`으로 읽고 로그에서 자동으로 가려진다.
- [[구성 변수(vars)]] — 구성 변수는 민감하지 않은 설정값을 조직·리포지토리·환경 수준에 저장하고 `${{ vars.NAME }}`으로 읽는 기능이다.
- [[비밀·변수 REST API]] — REST API로 비밀·변수를 만들고 바꾼다. 비밀은 먼저 공개 키를 받아 LibSodium으로 암호화한 값을 보낸다.
