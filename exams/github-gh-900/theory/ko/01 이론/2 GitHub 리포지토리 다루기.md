---
aliases: ["도메인 2", "Domain 2", "Work with GitHub repositories", "GitHub 리포지토리 작업"]
tags: ["gh-900", "이론", "도메인2"]
도메인: 2
목표: ["2.1", "2.2", "2.3", "2.4", "2.5"]
---
# 도메인 2　GitHub 리포지토리 다루기

**English** Domain 2: Work with GitHub repositories  
**한국어 공식 안내서** GitHub 리포지토리 작업

도메인 2 (10–15%) · 목표 5개

리포지토리의 구성 파일, 템플릿·브랜치를 이용한 정리, 파일 추가 방법, 가시성을 높이는 인사이트·스타·종속성 정보, 유지 관리 모범 사례를 다룬다.

> [!abstract] 리포지토리 관리
> Repository management · 리포지토리 관리

## 목표 2.1

**GitHub 리포지토리의 구조와 주요 파일(README, LICENSE, CONTRIBUTING, CODEOWNERS, SECURITY)을 설명한다**

> [!quote]- 공식 원문 (English / 한국어 공식 안내서)
> Describe the structure and key files of a GitHub repository (README, LICENSE, CONTRIBUTING, CODEOWNERS, SECURITY)
>
> GitHub 리포지토리의 구조 및 키 파일 설명(추가 정보, 라이선스, 기여, CODEOWNERS, SECURITY)

README(프로젝트 소개), LICENSE(재사용 조건), CONTRIBUTING(기여 방법), CODEOWNERS(리뷰 책임자 자동 요청), SECURITY(취약점 보고 방법)의 역할과 위치(.github, 루트, docs)를 안다.

관련 카드: [[README]] · [[LICENSE]] · [[커뮤니티 상태 파일]] · [[CODEOWNERS]]

## 목표 2.2

**템플릿과 브랜치로 리포지토리를 만들고 정리하고 유지하는 방법을 식별한다**

> [!quote]- 공식 원문 (English / 한국어 공식 안내서)
> Identify how to create, organize, and maintain repositories using templates and branches.
>
> 템플릿 및 분기를 사용하여 리포지토리를 만들고 구성하고 유지 관리하는 방법을 식별합니다.

템플릿 리포지토리로 같은 구조의 리포지토리를 반복해 만들고(이력은 새로 시작), 브랜치로 작업을 나누며, 보호 규칙·보관으로 유지 관리한다.

관련 카드: [[Git 핵심 개념]] · [[템플릿 리포지토리]] · [[리포지토리 모범 사례]] · [[포크]]

## 목표 2.3

**리포지토리에 파일을 추가하고 관리하는 방법을 설명한다**

> [!quote]- 공식 원문 (English / 한국어 공식 안내서)
> Explain how to add and manage files within a repository
>
> 리포지토리 내에서 파일을 추가하고 관리하는 방법 설명

웹에서는 Add file로 만들거나 업로드(파일당 25 MiB, 한 번에 100개)하고, 명령줄에서는 100 MiB까지 푸시한다. 그보다 크면 Git LFS. 기본 브랜치에 바로 커밋하기보다 새 브랜치 + PR을 권장한다.

관련 카드: [[파일 추가와 관리]]

## 목표 2.4

**가시성을 높이는 리포지토리 인사이트, 스타, 기능 미리 보기, 리포지토리 지표 대시보드, 종속성 인사이트를 설명한다**

> [!quote]- 공식 원문 (English / 한국어 공식 안내서)
> Describe repository insights, stars, feature previews, repository metrics dashboards, and dependency insights for improved visibility
>
> 향상된 가시성을 위해 리포지토리 인사이트, 별, 기능 미리 보기, 리포지토리 메트릭 대시보드 및 종속성 인사이트 설명

Insights의 Pulse·기여자·트래픽·커밋 그래프, 스타(북마크·감사·추천), 기능 미리 보기(Feature preview), 종속성 그래프로 리포지토리 상태를 파악한다. "리포지토리 지표 대시보드"가 정확히 어떤 기능을 가리키는지는 공식 문서에서 확인하지 못했다.

관련 카드: [[리포지토리 인사이트]] · [[스타]] · [[기능 미리 보기]] · [[종속성 그래프]]

## 목표 2.5

**리포지토리 유지 관리와 협업의 모범 사례를 안다**

> [!quote]- 공식 원문 (English / 한국어 공식 안내서)
> Recognize best practices for repository maintenance and collaboration
>
> 리포지토리 유지 관리 및 공동 작업에 대한 모범 사례 인식

README·LICENSE·CONTRIBUTING 등 커뮤니티 상태 파일 갖추기, 브랜치 보호, 코드 소유자 리뷰, 작은 PR, 쓰지 않는 리포지토리 보관 같은 관행을 안다.

관련 카드: [[커뮤니티 상태 파일]] · [[리포지토리 보관]] · [[리포지토리 모범 사례]] · [[브랜치 보호 규칙과 룰셋]]

## 요약
- 주요 파일 5개: README · LICENSE · CONTRIBUTING · CODEOWNERS · SECURITY.
- 템플릿 = 새 이력의 뼈대, 포크 = 원본과 이력 공유.
- 파일 크기: 웹 25 MiB, 명령줄 100 MiB, 그 이상 Git LFS.
- 라이선스가 없으면 재사용 권리도 없다.

## 이 도메인의 카드
- [[README]] — 리포지토리를 방문한 사람에게 프로젝트가 무엇이고, 왜 유용하며, 어떻게 시작하는지 알려 주는 첫 문서. GitHub가 자동으로 표시한다.
- [[LICENSE]] — 다른 사람이 코드를 어떤 조건으로 쓰고 수정·배포할 수 있는지 정하는 파일. 없으면 기본 저작권이 적용되어 재사용 권리가 없다.
- [[커뮤니티 상태 파일]] — CONTRIBUTING(기여 방법), SECURITY(취약점 보고 방법), CODE_OF_CONDUCT(행동 강령), SUPPORT 등 건강한 기여를 돕는 표준 파일. 조직 기본값을 .github 리포지토리에 둘 수 있다.
- [[CODEOWNERS]] — 파일·경로별 책임자(사용자·팀)를 지정해, 해당 파일을 바꾸는 PR에 자동으로 리뷰를 요청하는 파일.
- [[템플릿 리포지토리]] — 디렉터리 구조와 파일을 복사해 새 리포지토리를 시작하게 하는 리포지토리. 포크와 달리 원본과 이력이 이어지지 않는다.
- [[파일 추가와 관리]] — 브라우저(Add file > Upload files·새 파일)나 명령줄(git add·commit·push)로 파일을 추가하고, 커밋으로 변경을 기록한다.
- [[리포지토리 인사이트]] — Insights 탭의 Pulse, Contributors, Traffic, Commits, Code frequency, Network 그래프로 리포지토리 활동과 건강도를 본다.
- [[스타]] — 리포지토리를 북마크하고 관리자에게 감사를 표하는 기능. 스타 수는 Explore·순위에 쓰이고 추천에도 반영된다.
- [[기능 미리 보기]] — 공개 미리 보기 상태의 기능을 개인 계정에서 켜고 끄는 메뉴(프로필 사진 > Feature preview).
- [[종속성 그래프]] — 리포지토리가 의존하는 패키지(dependencies)와 이 리포지토리에 의존하는 것(dependents)을 버전·라이선스·취약점과 함께 보여 주는 기능.
- [[리포지토리 보관]] — 더 이상 유지하지 않는 리포지토리를 모든 사용자에게 읽기 전용으로 만드는 기능. 해제할 수 있다.
- [[리포지토리 모범 사례]] — README·LICENSE·CONTRIBUTING 같은 표준 파일, 브랜치와 PR 중심 흐름, 보호 규칙, 레이블·템플릿, 정리(보관)를 갖춰 협업하기 쉬운 리포지토리를 유지한다.
