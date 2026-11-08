---
aliases: ["GITHUB_TOKEN", "permissions 키", "github.token", "워크플로 토큰"]
tags: ["gh-200", "기능카드", "도메인5"]
도메인: 5
목표: ["5.4", "1.2"]
중요도: "상"
---
# GITHUB_TOKEN

> [!summary] 한 줄 정의
> GITHUB_TOKEN은 작업마다 자동 생성되는 GitHub App 설치 액세스 토큰이다. 워크플로가 있는 리포지토리로 범위가 한정되고 작업이 끝나면 만료된다. `permissions:`로 권한을 줄인다.

**English** GITHUB_TOKEN and permissions

## 시험 트리거
- "워크플로에서 이슈에 댓글"
- "토큰 권한을 최소로"
- "다른 리포지토리에 푸시해야 한다"
- "자동 생성 PR의 워크플로가 안 돈다"

## 핵심
- 작업 시작 시 생성, 작업 종료(또는 최대 수명)에 만료. 호스팅 러너는 작업 최대 6시간이라 그만큼, 자체 호스팅은 토큰 갱신이 24시간까지.
- `secrets.GITHUB_TOKEN` 또는 `github.token`으로 사용.
- `permissions:` 워크플로·작업 수준. 지정한 범위 외 나머지는 none. `read-all`, `write-all`, `{}`(전부 없음).
- 기본 권한: 조직·리포 설정 Workflow permissions(허용형 읽기·쓰기 / 제한형 contents·packages 읽기). 새 조직 기본은 제한형.
- GITHUB_TOKEN으로 만든 이벤트는 새 실행을 만들지 않는다(workflow_dispatch, repository_dispatch 예외). pull_request는 approval-required 상태로 생성.
- 포크 PR에서는 읽기 전용.
- PAT·GitHub App 토큰이 필요한 경우: 다른 리포지토리 접근, 생성한 PR·푸시가 워크플로를 트리거해야 할 때, 24시간 넘는 자체 호스팅 작업.

## 헷갈리는 개념
| 개념 | 차이 |
|---|---|
| PAT | 사용자에 묶인 장기 토큰, 여러 리포 가능 vs 작업 단위 임시 토큰, 한 리포 |
| [[OIDC]] | 클라우드 공급자 인증 vs GitHub API 인증 |

## 오답 함정
> [!warning] 오답이 되기 쉬운 선택지
> - GITHUB_TOKEN이 조직의 모든 리포지토리에 접근한다는 선택지 → 워크플로가 있는 리포만
> - permissions에 contents: read만 적으면 나머지는 기본값 유지라는 선택지 → 나머지는 none

## 관련
- [[조직 Actions 정책]] · [[OIDC]] · [[포크 PR 워크플로 보안]] · [[워크플로 트리거와 이벤트]] · [[토큰과 인증 방식 비교]]

**공식 목표**: [[5 자동화 보안과 최적화#목표 5.4|5.4]] · [[1 워크플로 작성과 관리#목표 1.2|1.2]]  
**근거**: [GITHUB_TOKEN](https://docs.github.com/en/actions/concepts/security/github_token) · [Workflow syntax for GitHub Actions](https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax) · [Disabling or limiting GitHub Actions for your organization](https://docs.github.com/en/organizations/managing-organization-settings/disabling-or-limiting-github-actions-for-your-organization)

## 셀프 체크
> [!question]- GITHUB_TOKEN의 정체는?
> GitHub App 설치 액세스 토큰

> [!question]- permissions에 일부만 적으면 나머지 범위는?
> none

> [!question]- 워크플로가 만든 PR에서 CI가 돌게 하려면 어떤 토큰?
> GitHub App 토큰 또는 PAT
