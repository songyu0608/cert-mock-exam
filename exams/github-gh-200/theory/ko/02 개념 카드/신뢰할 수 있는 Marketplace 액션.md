---
aliases: ["Trustworthy actions", "검증된 작성자", "Verified creator", "타사 액션"]
tags: ["gh-200", "개념카드", "도메인5"]
도메인: 5
목표: ["5.2"]
중요도: "상"
---
# 신뢰할 수 있는 Marketplace 액션

> [!summary] 한 줄 정의
> 타사 액션은 내 리포지토리 권한·비밀로 실행되므로, 작성자 신원, 코드, 유지 관리 상태를 확인하고 버전을 고정해 쓴다.

**English** Identifying trustworthy actions

## 시험 트리거
- "Marketplace에서 비슷한 액션 여러 개 중 고르기"
- "검증 배지가 있으면 안전한가"

## 핵심
- 검증된 작성자 배지: GitHub가 작성자를 파트너 조직으로 확인했다는 뜻. 액션의 안전성·유지 관리를 보장하지 않는다.
- 소스 코드 감사: 비밀을 의도하지 않은 호스트로 보내거나 로그에 남기지 않는지 확인.
- 태그는 신뢰하는 작성자일 때만. 그 외에는 전체 커밋 SHA로 고정하고 그 SHA가 포크가 아닌 원래 리포의 것인지 확인.
- Dependabot 버전 업데이트로 액션 참조를 최신으로(SHA 고정 액션에는 알림 없음). OpenSSF Scorecards로 공급망 위험 점검.
- 조직 정책으로 GitHub 제작·검증된 작성자·지정 목록만 허용 → [[액션 허용·차단 목록]].
- Docker Hub 이미지(docker://)는 무결성 확인 권장. 재사용 워크플로에도 같은 주의.

## 오답 함정
> [!warning] 검증된 작성자 배지가 코드 보안 감사를 뜻한다는 선택지 → 작성자 신원 확인일 뿐

## 관련
- [[액션 SHA 고정]] · [[액션 허용·차단 목록]] · [[Marketplace 게시]] · [[조직 Actions 정책]]

**공식 목표**: [[5 자동화 보안과 최적화#목표 5.2|5.2]]  
**근거**: [Finding and customizing actions](https://docs.github.com/en/actions/how-tos/write-workflows/choose-what-workflows-do/find-and-customize-actions) · [Secure use reference](https://docs.github.com/en/actions/reference/security/secure-use) · [Publishing actions in GitHub Marketplace](https://docs.github.com/en/actions/how-tos/create-and-publish-actions/publish-in-github-marketplace)

## 셀프 체크
> [!question]- 검증된 작성자 배지가 의미하는 것은?
> GitHub가 작성자를 파트너 조직으로 확인(안전성 보장 아님)
