---
aliases: ["Organization Actions policies", "Actions permissions", "Workflow permissions", "조직 사용 정책"]
tags: ["gh-200", "기능카드", "도메인4"]
도메인: 4
목표: ["4.3", "4.2", "5.7", "5.4"]
중요도: "상"
---
# 조직 Actions 정책

> [!summary] 한 줄 정의
> 조직 Settings → Actions → General에서 Actions 사용 리포지토리, 허용할 액션·재사용 워크플로, 포크 PR 실행, GITHUB_TOKEN 기본 권한 등을 정한다.

**English** Configuring organization policies for GitHub Actions

## 시험 트리거
- "조직에서 검증된 액션만 허용"
- "외부 기여자 PR 워크플로는 승인 후 실행"
- "GITHUB_TOKEN 기본을 읽기 전용으로"
- "Actions가 PR을 승인하지 못하게"

## 핵심
- Actions 사용: 모든 리포 / 선택 리포 / 비활성.
- 허용 범위: 모든 액션 / 조직 액션만 / "Allow OWNER, and select non-OWNER, actions and reusable workflows" → Allow actions created by GitHub, Allow Marketplace actions by verified creators, Allow or block specified actions and reusable workflows.
- 지정 목록: `OWNER/REPO@TAG-OR-SHA`, `*` 와일드카드, 쉼표 구분, `!` 접두사로 차단, 최대 1,000개.
- "Require actions to be pinned to a full-length commit SHA"(재사용 워크플로는 태그 참조 가능).
- 포크 PR(공개): Require approval for first-time contributors who are new to GitHub / first-time contributors / all external contributors.
- 비공개 리포 포크: Run workflows from fork pull requests, Send write tokens, Send secrets, Require approval for fork pull request workflows.
- Workflow permissions: 허용형(모든 범위 읽기·쓰기) vs 제한형(contents·packages 읽기). 새 조직 기본은 제한형. "Allow GitHub Actions to create and approve pull requests" 새 조직 기본 차단.
- 상위(엔터프라이즈·조직)에서 끈 정책은 하위(리포)에서 켤 수 없다.

## 오답 함정
> [!warning] 오답이 되기 쉬운 선택지
> - 리포지토리 관리자가 조직에서 막은 액션을 리포 설정으로 허용할 수 있다는 선택지 → 상위 정책이 우선
> - 새 조직의 GITHUB_TOKEN 기본이 읽기·쓰기라는 선택지 → 제한형(읽기)

## 관련
- [[액션 허용·차단 목록]] · [[GITHUB_TOKEN]] · [[포크 PR 워크플로 보안]] · [[조직 내 액션·워크플로 공유]] · [[액션 SHA 고정]]

**공식 목표**: [[4 엔터프라이즈의 GitHub Actions 관리#목표 4.3|4.3]] · [[4 엔터프라이즈의 GitHub Actions 관리#목표 4.2|4.2]] · [[5 자동화 보안과 최적화#목표 5.7|5.7]] · [[5 자동화 보안과 최적화#목표 5.4|5.4]]  
**근거**: [Disabling or limiting GitHub Actions for your organization](https://docs.github.com/en/organizations/managing-organization-settings/disabling-or-limiting-github-actions-for-your-organization)

## 셀프 체크
> [!question]- 허용 목록에서 특정 액션을 차단하는 표기는?
> ! 접두사

> [!question]- 전체 SHA 고정을 강제하는 조직 설정 이름은?
> Require actions to be pinned to a full-length commit SHA

> [!question]- 공개 리포 포크 PR 승인 옵션 3가지는?
> GitHub 신규 첫 기여자 / 첫 기여자 / 모든 외부 기여자
