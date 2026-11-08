---
aliases: ["GHAS", "Secret Protection", "Code Security", "비밀 검색", "Secret scanning", "푸시 보호", "Push protection", "코드 스캔", "CodeQL", "Dependabot"]
tags: ["gh-900", "기능카드", "도메인6"]
도메인: 6
목표: ["6.4", "7.2"]
중요도: "중"
---
# GitHub Advanced Security

> [!summary] 한 줄 정의
> 코드 스캔(CodeQL), 비밀 검색, 푸시 보호, 종속성 리뷰 등을 제공하는 보안 제품군. Secret Protection과 Code Security 두 유료 제품으로 나뉘고, 공개 리포지토리는 일부를 무료로 쓴다.

**English** GitHub Advanced Security and security features

## 시험 트리거
- "토큰이 커밋되기 전에 막고 싶다"
- "코드의 보안 취약점을 자동 탐지"
- "공개 오픈 소스 프로젝트의 보안 기능 비용"

## 핵심
- Secret Protection: 비밀 검색, 푸시 보호(비밀이 든 푸시 차단), 사용자 지정 패턴 등.
- Code Security: 코드 스캔(CodeQL 등), Copilot Autofix, 종속성 리뷰, 보안 개요 등.
- 두 제품은 Team·Enterprise Cloud의 유료 추가 기능. 비공개·내부 리포지토리에서 쓰려면 구매 필요.
- 공개 리포지토리: 코드 스캔과 비밀 검색이 기본으로 켜져 있다(무료). 종속성 그래프와 Dependabot 알림은 모든 요금제.

## 헷갈리는 개념
| 개념 | 차이 |
|---|---|
| [[종속성 그래프]] | 의존성 목록·알림(모든 요금제) vs 코드·비밀 스캔(공개 무료, 비공개 유료) |

## 오답 함정
> [!warning] 공개 리포지토리도 비밀 검색에 GHAS 구매가 필요하다는 선택지 → 공개 리포지토리는 기본 무료

## 관련
- [[종속성 그래프]] · [[오픈 소스 지원 기능]] · [[리포지토리 공개 범위]] · [[GitHub 요금제]]

**공식 목표**: [[6 개인정보 보호, 보안, 관리 이해#목표 6.4|6.4]] · [[7 GitHub 커뮤니티 살펴보기#목표 7.2|7.2]]  
**근거**: [About GitHub Advanced Security](https://docs.github.com/en/get-started/learning-about-github/about-github-advanced-security) · [Adding a file to a repository](https://docs.github.com/en/repositories/working-with-files/managing-files/adding-a-file-to-a-repository)

## 셀프 체크
> [!question]- 비밀이 든 커밋의 푸시를 막는 기능은?
> 푸시 보호(Secret Protection)

> [!question]- 공개 리포지토리에서 기본으로 켜진 무료 보안 기능 2가지는?
> 코드 스캔, 비밀 검색
