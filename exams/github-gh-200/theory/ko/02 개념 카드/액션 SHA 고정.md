---
aliases: ["Pinning actions to a full-length commit SHA", "SHA 고정", "버전 고정", "@main 피하기"]
tags: ["gh-200", "개념카드", "도메인5"]
도메인: 5
목표: ["5.6", "1.10"]
중요도: "상"
---
# 액션 SHA 고정

> [!summary] 한 줄 정의
> 타사 액션을 `uses: owner/repo@<40자 커밋 SHA>`로 참조하면 태그가 옮겨지거나 리포가 침해돼도 검토한 코드만 실행된다.

**English** Pinning third-party actions

## 시험 트리거
- "인기 액션의 태그가 악성 커밋으로 옮겨진 공급망 공격"
- "조직이 SHA 고정을 강제"
- "@main으로 써도 되나"

## 핵심
- 전체 길이 SHA만(축약 SHA 불가). 포크가 아닌 원래 리포의 SHA인지 확인.
- 태그(@v4): 읽기 쉽고 업데이트를 받지만 유지 관리자가 옮기거나 지울 수 있다 → 신뢰하는 작성자만.
- 브랜치(@main): 항상 최신, 깨지는 변경·악성 변경 위험. 근거 없이 쓰지 않는다.
- SHA는 자동 업데이트가 없다 → Dependabot 버전 업데이트로 SHA 갱신 PR(단, SHA 고정 액션에는 취약점 알림이 생성되지 않음). 주석으로 버전을 적어 두는 관례〔해석〕.
- 조직 정책 "Require actions to be pinned to a full-length commit SHA"로 강제 가능(재사용 워크플로는 태그 허용).
- 문서는 워크플로 의존성 lockfile이 SHA 고정보다 강하다(전이 의존성까지 잠금)고 소개한다(2026 신규·변동 정보).

## 오답 함정
> [!warning] 오답이 되기 쉬운 선택지
> - 7자리 축약 SHA로도 충분하다는 선택지 → 전체 길이 SHA
> - SHA 고정이면 보안 수정이 자동 반영된다는 선택지 → 자동 업데이트 없음

## 관련
- [[불변 액션과 불변 릴리스]] · [[액션 버전 관리와 릴리스]] · [[조직 Actions 정책]] · [[신뢰할 수 있는 Marketplace 액션]] · [[액션 참조 방식 비교]]

**공식 목표**: [[5 자동화 보안과 최적화#목표 5.6|5.6]] · [[1 워크플로 작성과 관리#목표 1.10|1.10]]  
**근거**: [Secure use reference](https://docs.github.com/en/actions/reference/security/secure-use) · [Finding and customizing actions](https://docs.github.com/en/actions/how-tos/write-workflows/choose-what-workflows-do/find-and-customize-actions) · [Disabling or limiting GitHub Actions for your organization](https://docs.github.com/en/organizations/managing-organization-settings/disabling-or-limiting-github-actions-for-your-organization)

## 셀프 체크
> [!question]- 가장 안전한 액션 참조 방식은?
> 전체 길이 커밋 SHA

> [!question]- SHA 고정 액션에 Dependabot 취약점 알림이 생기나?
> 아니요
