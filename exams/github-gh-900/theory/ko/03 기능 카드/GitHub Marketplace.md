---
aliases: ["Marketplace", "마켓플레이스", "GitHub 마켓플레이스", "GitHub Apps", "OAuth 앱"]
tags: ["gh-900", "기능카드", "도메인7"]
도메인: 7
목표: ["7.4", "4.1"]
중요도: "중"
---
# GitHub Marketplace

> [!summary] 한 줄 정의
> GitHub 워크플로를 확장하는 GitHub Actions와 앱(Apps)을 찾고 설치·구매하는 디렉터리.

**English** GitHub Marketplace

## 시험 트리거
- "CI에 쓸 기존 액션을 찾고 싶다"
- "코드 품질 도구를 GitHub에 연결"
- "우리 앱을 판매하고 싶다"

## 핵심
- 두 종류: Actions(워크플로 단계에 쓰는 재사용 작업)와 Apps(GitHub와 통합되는 도구).
- 액션은 누구나 게시할 수 있다. 일부 파트너는 인증된 제작자(verified creator) 배지가 붙는다.
- 앱은 누구나 무료로 공유할 수 있지만 판매는 조직 소유 앱만 가능하다. 유료 요금제는 게시자 확인(publisher verification)이 필요하다.
- OAuth 앱보다 GitHub Apps가 권장된다(세분화된 권한).
- 〔해석〕 용도: 직접 만들지 않고 검증된 도구로 워크플로를 확장해 개발 시간을 줄인다.

## 헷갈리는 개념
| 개념 | 차이 |
|---|---|
| [[GitHub Actions]] | 자동화 플랫폼 자체 vs 그 액션을 찾는 곳 |
| [[오픈 소스와 GitHub Sponsors]] | 도구 구매 vs 사람 후원 |

## 오답 함정
> [!warning] 오답이 되기 쉬운 선택지
> - 개인 계정 소유의 앱도 Marketplace에서 판매할 수 있다는 선택지 → 판매는 조직 소유 앱만
> - 액션은 GitHub 인증 파트너만 게시할 수 있다는 선택지 → 누구나 게시, 인증 배지는 일부

## 관련
- [[GitHub Actions]] · [[오픈 소스 지원 기능]] · [[오픈 소스와 GitHub Sponsors]]

**공식 목표**: [[7 GitHub 커뮤니티 살펴보기#목표 7.4|7.4]] · [[4 최신 개발 방식 적용#목표 4.1|4.1]]  
**근거**: [About GitHub Marketplace for apps](https://docs.github.com/en/apps/github-marketplace/github-marketplace-overview/about-github-marketplace-for-apps) · [Understanding GitHub Actions](https://docs.github.com/en/actions/get-started/understand-github-actions)

## 셀프 체크
> [!question]- GitHub Marketplace에서 찾을 수 있는 두 가지는?
> Actions와 Apps

> [!question]- Marketplace에서 앱을 판매할 수 있는 소유자는?
> 조직(유료 요금제는 게시자 확인 필요)
