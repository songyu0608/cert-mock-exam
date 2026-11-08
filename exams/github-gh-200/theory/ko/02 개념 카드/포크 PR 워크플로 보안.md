---
aliases: ["Fork pull request security", "pull_request_target", "workflow_run", "외부 기여자 승인"]
tags: ["gh-200", "개념카드", "도메인5"]
도메인: 5
목표: ["5.3", "1.2", "5.7"]
중요도: "상"
---
# 포크 PR 워크플로 보안

> [!summary] 한 줄 정의
> 포크에서 온 PR은 신뢰할 수 없는 코드다. pull_request는 제한된 권한으로 돌고, pull_request_target은 base 리포 권한으로 돌기 때문에 PR 코드를 체크아웃해 실행하면 위험하다.

**English** Securing workflows triggered by fork pull requests

## 시험 트리거
- "외부 기여자 PR에 라벨을 다는 워크플로"
- "포크 PR 테스트 결과로 댓글을 달고 싶다"
- "첫 기여자의 PR 워크플로가 대기 중"

## 핵심
- pull_request: PR 병합 커밋(refs/pull/N/merge)에서 실행. 포크 PR이면 GITHUB_TOKEN 읽기 전용, 비밀 미전달. 병합 충돌이 있으면 실행 안 됨.
- pull_request_target: base 리포 기본 브랜치 컨텍스트에서 실행, 비밀·쓰기 토큰 접근 가능. 병합 충돌이 있어도 실행. 신뢰할 수 없는 PR 코드를 명시적으로 체크아웃하지 말 것.
- 권한 분리에는 workflow_run이 낫다: 제한된 pull_request 워크플로가 결과를 아티팩트로 남기고, 권한 있는 workflow_run 워크플로가 처리(아티팩트도 신뢰하지 말고 검증).
- Dependabot PR도 포크처럼 취급된다.
- 승인 정책(공개 리포): GitHub 신규 첫 기여자 / 첫 기여자 / 모든 외부 기여자의 실행에 승인 요구. 비공개 리포는 포크 실행·쓰기 토큰·비밀 전달·승인 요구를 따로 설정.
- 공개 리포지토리에 자체 호스팅 러너를 쓰지 않는다.

## 오답 함정
> [!warning] 오답이 되기 쉬운 선택지
> - pull_request_target에서 PR head를 체크아웃해 빌드하는 것이 안전하다는 선택지 → 비밀·쓰기 권한으로 신뢰할 수 없는 코드 실행
> - 포크 PR의 pull_request 워크플로에 리포 비밀이 전달된다는 선택지 → 전달되지 않는다

## 관련
- [[워크플로 트리거와 이벤트]] · [[GITHUB_TOKEN]] · [[조직 Actions 정책]] · [[스크립트 인젝션]] · [[pull_request vs pull_request_target vs workflow_run]]

**공식 목표**: [[5 자동화 보안과 최적화#목표 5.3|5.3]] · [[1 워크플로 작성과 관리#목표 1.2|1.2]] · [[5 자동화 보안과 최적화#목표 5.7|5.7]]  
**근거**: [Events that trigger workflows](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows) · [Secure use reference](https://docs.github.com/en/actions/reference/security/secure-use) · [Disabling or limiting GitHub Actions for your organization](https://docs.github.com/en/organizations/managing-organization-settings/disabling-or-limiting-github-actions-for-your-organization)

## 셀프 체크
> [!question]- base 리포 권한으로 실행되는 PR 트리거는?
> pull_request_target

> [!question]- 권한 분리를 위해 문서가 권하는 트리거는?
> workflow_run

> [!question]- 포크 PR의 GITHUB_TOKEN 권한은?
> 읽기 전용
