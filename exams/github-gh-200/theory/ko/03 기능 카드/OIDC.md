---
aliases: ["OpenID Connect", "id-token: write", "OIDC 페더레이션", "워크로드 ID 페더레이션"]
tags: ["gh-200", "기능카드", "도메인5"]
도메인: 5
목표: ["5.5"]
중요도: "상"
---
# OIDC

> [!summary] 한 줄 정의
> OIDC를 쓰면 워크플로가 클라우드 공급자에게서 작업 하나에만 유효한 단기 토큰을 직접 받는다. 장기 클라우드 자격 증명을 GitHub 비밀로 저장할 필요가 없다.

**English** OpenID Connect for cloud deployments

## 시험 트리거
- "AWS 액세스 키를 비밀에 저장하지 않고 배포"
- "특정 리포의 production 환경만 클라우드 역할을 받게"

## 핵심
- 권한 필수: `permissions: id-token: write`(checkout하면 contents: read도). id-token: write는 OIDC 토큰 발급만 허용하고 다른 리소스 쓰기 권한을 주지 않는다.
- 발급자(iss): https://token.actions.githubusercontent.com. aud 기본은 리포 소유자 URL(변경 가능).
- sub 클레임 예: repo:octo-org/octo-repo:environment:prod. 클라우드의 신뢰 조건이 sub 등 클레임과 비교한다. 신뢰 조건을 최소 하나 둬야 신뢰할 수 없는 리포가 토큰을 못 받는다.
- sub 형식은 조직·리포 관리자가 REST API로 사용자 지정(전체 sub 형식이 바뀜). 2026-07-15 이후 생성 리포는 소유자·리포 ID를 포함한 불변 기본 sub 형식(GHES 제외, 변동 정보).
- 재사용 워크플로는 job_workflow_ref 클레임으로 식별.
- 지원 예: AWS, Azure, Google Cloud, HashiCorp Vault, PyPI 등. 액션은 core.getIDToken(), 또는 ACTIONS_ID_TOKEN_REQUEST_URL·TOKEN 환경 변수.

## 오답 함정
> [!warning] 오답이 되기 쉬운 선택지
> - id-token: write가 리포지토리 쓰기 권한도 준다는 선택지 → OIDC 토큰 발급만
> - OIDC를 쓰려면 클라우드 키를 GitHub 비밀에 저장한다는 선택지 → 장기 비밀이 필요 없다

## 관련
- [[GITHUB_TOKEN]] · [[환경과 배포 보호 규칙]] · [[아티팩트 증명]] · [[토큰과 인증 방식 비교]]

**공식 목표**: [[5 자동화 보안과 최적화#목표 5.5|5.5]]  
**근거**: [OpenID Connect](https://docs.github.com/en/actions/concepts/security/openid-connect) · [OpenID Connect reference](https://docs.github.com/en/actions/reference/security/oidc)

## 셀프 체크
> [!question]- OIDC 토큰을 요청하려면 필요한 권한은?
> id-token: write

> [!question]- GitHub OIDC 발급자(iss)는?
> https://token.actions.githubusercontent.com

> [!question]- 클라우드가 워크플로 출처를 확인하는 주 클레임은?
> sub
