---
aliases: ["도메인 1", "Domain 1", "Understand Git and GitHub basics", "Git 및 GitHub 기본 사항 이해"]
tags: ["gh-900", "이론", "도메인1"]
도메인: 1
목표: ["1.1", "1.2", "1.3", "1.4", "1.5", "1.6", "1.7"]
---
# 도메인 1　Git과 GitHub 기본 이해

**English** Domain 1: Understand Git and GitHub basics  
**한국어 공식 안내서** Git 및 GitHub 기본 사항 이해

도메인 1 (25–30%) · 목표 7개

비중이 가장 큰 도메인(25–30%). 버전 관리와 Git의 기본 개념, GitHub 계정·요금제, GitHub 플로, Markdown, 데스크톱·모바일 앱을 다룬다. 안내서는 이 도메인을 "버전 관리 기초"(1.1–1.3)와 "GitHub 다루기"(1.4–1.7) 두 묶음으로 나눈다.

> [!abstract] 버전 관리 기초
> Version control fundamentals · 버전 제어 기본 사항

## 목표 1.1

**버전 관리의 목적과 이점을 설명한다**

> [!quote]- 공식 원문 (English / 한국어 공식 안내서)
> Describe the purpose and benefits of version control
>
> 버전 제어의 목적 및 이점 설명

버전 관리는 파일의 변경 이력을 기록해 누가·언제·무엇을·왜 바꿨는지 알고 이전 버전으로 되돌릴 수 있게 한다. Git은 분산형이라 각 사용자가 전체 이력의 사본을 가진다.

관련 카드: [[버전 관리]]

## 목표 1.2

**Git과 GitHub의 차이를 설명한다**

> [!quote]- 공식 원문 (English / 한국어 공식 안내서)
> Explain the difference between Git and GitHub
>
> Git과 GitHub의 차이점 설명

Git은 로컬에서 동작하는 버전 관리 도구, GitHub는 Git 리포지토리를 호스팅하고 이슈·풀 리퀘스트·리뷰·Actions 같은 협업 기능을 얹은 플랫폼이다.

관련 카드: [[Git과 GitHub의 차이]]

## 목표 1.3

**리포지토리, 커밋, 브랜치 같은 Git 핵심 개념을 식별한다**

> [!quote]- 공식 원문 (English / 한국어 공식 안내서)
> Identify key Git concepts such as repositories, commits, and branches
>
> 리포지토리, 커밋 및 분기와 같은 주요 Git 개념 식별

리포지토리, 커밋, 브랜치, 클론, 병합과 기본 명령(init, clone, add, commit, status, branch, merge, pull, push)을 구분한다.

관련 카드: [[Git 핵심 개념]]

> [!abstract] GitHub 다루기
> Working with GitHub · GitHub와 함께 작업하기

## 목표 1.4

**GitHub 계정, 조직, 엔터프라이즈 옵션을 설명한다**

> [!quote]- 공식 원문 (English / 한국어 공식 안내서)
> Describe GitHub accounts, organizations, and enterprise options
>
> GitHub 계정, 조직 및 엔터프라이즈 옵션 설명

개인 계정, 조직(로그인 불가, 공유 리포지토리·팀), 엔터프라이즈(GHEC·GHES, 중앙 정책·청구)와 요금제(Free, Pro, Team, Enterprise)의 차이를 안다. 관리형 사용자(EMU)도 계정 유형의 하나다.

관련 카드: [[GitHub 계정 유형]] · [[GitHub 요금제]] · [[EMU(Enterprise Managed Users)]]

## 목표 1.5

**협업을 위한 GitHub Flow를 설명한다**

> [!quote]- 공식 원문 (English / 한국어 공식 안내서)
> Explain the GitHub Flow for collaboration
>
> 공동 작업을 위한 GitHub Flow 설명

브랜치 생성 → 커밋 → 풀 리퀘스트(초안 가능) → 리뷰 반영 → 병합 → 브랜치 삭제의 순서. 브랜치를 지워도 PR·커밋 이력은 남는다.

관련 카드: [[GitHub 플로]] · [[풀 리퀘스트]]

## 목표 1.6

**이슈와 풀 리퀘스트에서 명확한 소통을 위한 Markdown 사용을 식별한다**

> [!quote]- 공식 원문 (English / 한국어 공식 안내서)
> Identify uses of Markdown for clear communication in issues and pull requests
>
> 문제 및 끌어오기 요청에서 명확한 통신을 위해 Markdown의 사용 식별

제목, 강조, 목록, 작업 목록, 코드 블록, 링크, @멘션, #이슈 참조, 경고(alerts) 같은 GitHub Markdown 문법으로 이슈·PR 소통을 명확히 한다.

관련 카드: [[Markdown 작성법]]

## 목표 1.7

**GitHub Desktop과 GitHub Mobile을 언제 쓰는지 안다**

> [!quote]- 공식 원문 (English / 한국어 공식 안내서)
> Recognize when to use GitHub Desktop and GitHub Mobile
>
> GitHub Desktop 및 GitHub Mobile을 사용하는 경우 인식

GitHub Desktop은 Windows·macOS용 무료 GUI로 Git 명령 없이 커밋·브랜치·푸시를 한다. GitHub Mobile은 이동 중 알림 분류, 이슈·PR 리뷰, 2FA 인증에 쓴다.

관련 카드: [[GitHub Desktop]] · [[GitHub Mobile]]

## 요약
- 버전 관리 = 이력·되돌리기·협업, Git = 분산형 도구, GitHub = 호스팅 + 협업 플랫폼.
- 계정 3종: 개인 · 조직 · 엔터프라이즈. 조직에는 직접 로그인하지 않는다.
- GitHub 플로: 브랜치 → 커밋 → PR → 리뷰 → 병합 → 브랜치 삭제.
- Desktop = 데스크톱 GUI(Git 입문), Mobile = 이동 중 알림·리뷰·2FA.

## 이 도메인의 카드
- [[버전 관리]] — 프로젝트의 변경 이력을 기록해, 무엇을·누가·언제·왜 바꿨는지 보고 이전 버전으로 되돌릴 수 있게 하는 시스템.
- [[Git과 GitHub의 차이]] — Git은 버전 관리 도구 자체이고, GitHub는 Git 리포지토리를 호스팅하면서 이슈·풀 리퀘스트·코드 리뷰 같은 협업 기능을 더한 플랫폼이다.
- [[Git 핵심 개념]] — 리포지토리(파일 + 전체 이력), 커밋(특정 시점의 스냅샷), 브랜치(독립된 작업 줄기), 클론(로컬 사본), 병합(줄기 합치기).
- [[GitHub 계정 유형]] — 사용자 계정(사람의 신원), 조직 계정(여러 사람의 공유 공간), 엔터프라이즈 계정(여러 조직의 정책·결제를 중앙 관리) 세 가지.
- [[GitHub 요금제]] — 개인용 Free·Pro, 조직용 Free·Team, Enterprise(Cloud·Server). 상위 요금제일수록 프라이빗 리포지토리 기능, 지원, 보안·인증 통제가 늘어난다.
- [[GitHub 플로]] — 브랜치 생성 → 변경·커밋 → 풀 리퀘스트 → 리뷰 반영 → 병합 → 브랜치 삭제로 이어지는 가벼운 브랜치 기반 협업 흐름.
- [[Markdown 작성법]] — 이슈·PR·코멘트·README에서 제목, 목록, 코드, 링크, 작업 목록, 멘션, 참조를 쓰는 GitHub의 서식 문법.
- [[GitHub Desktop]] — 명령줄 대신 그래픽 화면으로 Git 작업(클론, 브랜치, 커밋, 푸시)을 하는 무료 오픈 소스 데스크톱 앱. Windows·macOS용.
- [[GitHub Mobile]] — iOS·Android 앱으로 알림을 분류하고, 이슈·PR을 읽고 리뷰하며, 2FA·로그인 확인에 쓰는 이동용 도구.
