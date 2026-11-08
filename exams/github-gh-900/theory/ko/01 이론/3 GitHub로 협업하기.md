---
aliases: ["도메인 3", "Domain 3", "Collaborate using GitHub", "GitHub를 사용하여 공동 작업"]
tags: ["gh-900", "이론", "도메인3"]
도메인: 3
목표: ["3.1", "3.2", "3.3", "3.4"]
---
# 도메인 3　GitHub로 협업하기

**English** Domain 3: Collaborate using GitHub  
**한국어 공식 안내서** GitHub를 사용하여 공동 작업

도메인 3 (10–15%) · 목표 4개

이슈·풀 리퀘스트·디스커션으로 협업하는 방법, PR과 이슈 연결, 템플릿·필터·할당, 알림 설정, Gist·위키·Pages로 문서를 공유하는 방법을 다룬다.

> [!abstract] 협업 도구
> Collaboration tools · 공동 작업 도구

## 목표 3.1

**협업에 이슈, 풀 리퀘스트, 디스커션을 쓰는 방법을 설명한다**

> [!quote]- 공식 원문 (English / 한국어 공식 안내서)
> Describe how to use issues, pull requests, and discussions for collaboration
>
> 협업을 위해 문제, 끌어오기 요청 및 토론을 사용하는 방법 설명

이슈는 작업 추적, 풀 리퀘스트는 코드 변경 제안·리뷰·병합, 디스커션은 질문·아이디어·공지 같은 열린 대화에 쓴다.

관련 카드: [[이슈]] · [[풀 리퀘스트]] · [[디스커션]]

## 목표 3.2

**풀 리퀘스트를 이슈에 연결하고 템플릿, 필터, 할당을 관리하는 방법을 설명한다**

> [!quote]- 공식 원문 (English / 한국어 공식 안내서)
> Explain how to link pull requests to issues and manage templates, filters, and assignments
>
> 끌어오기 요청을 문제에 연결하고 템플릿, 필터 및 할당을 관리하는 방법을 설명합니다.

PR 본문에 Closes·Fixes·Resolves #번호를 쓰면 기본 브랜치로 병합될 때 이슈가 닫힌다. 이슈·PR 템플릿(.github), 필터·검색 한정자(is:, label:, assignee:), 담당자(최대 10명)를 관리한다.

관련 카드: [[PR과 이슈 연결]] · [[이슈·PR 템플릿]] · [[이슈·PR 필터와 검색]] · [[담당자]]

## 목표 3.3

**알림의 목적과 워크플로 관리를 위한 알림 설정 방법을 식별한다**

> [!quote]- 공식 원문 (English / 한국어 공식 안내서)
> Identify the purpose of notifications and how to configure them for workflow management
>
> 알림의 목적 및 워크플로 관리를 위해 알림 구성 방법 식별

참여·멘션·할당·워치로 알림이 구독되고, 받은편지함·이메일·Mobile로 전달된다. Done·Save·구독 해제와 필터로 정리한다.

관련 카드: [[알림]] · [[팔로우와 워치]]

## 목표 3.4

**Gist, 위키, GitHub Pages로 정보를 문서화하고 공유하는 방법을 설명한다**

> [!quote]- 공식 원문 (English / 한국어 공식 안내서)
> Describe how to use Gists, Wikis, and GitHub Pages to document and share information
>
> Gists, Wikis 및 GitHub Pages를 사용하여 정보를 문서화하고 공유하는 방법을 설명합니다.

Gist는 코드 조각 공유(공개·비밀), 위키는 리포지토리의 긴 문서, GitHub Pages는 리포지토리에서 정적 웹사이트를 호스팅한다.

관련 카드: [[Gist]] · [[위키]] · [[GitHub Pages]]

## 요약
- 이슈 = 할 일, PR = 코드 변경, 디스커션 = 열린 대화.
- 연결 키워드 9개(close·fix·resolve 변형)는 기본 브랜치 대상 PR에서만 자동으로 닫는다.
- 비밀 gist는 비공개가 아니다.
- 위키는 리포지토리당 하나, Pages는 웹사이트.

## 이 도메인의 카드
- [[이슈]] — 버그, 기능 아이디어, 작업을 계획·논의·추적하는 단위. 레이블·마일스톤·담당자·프로젝트와 연결된다.
- [[풀 리퀘스트]] — 브랜치의 변경을 다른 브랜치(보통 기본 브랜치)에 병합하자고 제안하고, 리뷰·토론·자동 검사를 거쳐 병합하는 협업 단위.
- [[디스커션]] — 프로젝트 방향, 질문, 아이디어처럼 바로 실행할 작업이 아닌 열린 대화를 나누는 커뮤니티 공간.
- [[PR과 이슈 연결]] — PR 본문의 닫기 키워드(Closes #10 등)나 Development 사이드바로 PR과 이슈를 연결해, PR이 병합되면 이슈가 자동으로 닫히게 한다.
- [[이슈·PR 템플릿]] — 이슈·PR을 만들 때 필요한 정보를 미리 채워 넣게 하는 양식. 이슈 템플릿은 .github/ISSUE_TEMPLATE, PR 템플릿은 pull_request_template.md.
- [[이슈·PR 필터와 검색]] — is:, author:, assignee:, label:, review: 같은 한정자로 이슈·PR 목록을 좁히는 검색 문법.
- [[알림]] — 구독한 대화와 활동 소식을 웹 알림함, 이메일, GitHub Mobile로 받고, Done·Save·구독 해제로 정리하는 기능.
- [[Gist]] — 코드 조각이나 메모를 공유하는 작은 Git 리포지토리. 공개(Discover·검색에 노출)와 비밀(URL을 아는 사람은 열람)이 있다.
- [[위키]] — 리포지토리마다 하나씩 있는 긴 프로젝트 문서 공간. README보다 긴 사용 설명·설계 문서를 둔다.
- [[GitHub Pages]] — 리포지토리의 HTML·CSS·JavaScript를 그대로(또는 빌드해서) 정적 웹사이트로 게시하는 호스팅 서비스.
