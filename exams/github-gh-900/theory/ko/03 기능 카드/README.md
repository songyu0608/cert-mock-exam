---
aliases: ["README.md", "추가 정보", "프로필 README"]
tags: ["gh-900", "기능카드", "도메인2"]
도메인: 2
목표: ["2.1"]
중요도: "상"
---
# README

> [!summary] 한 줄 정의
> 리포지토리를 방문한 사람에게 프로젝트가 무엇이고, 왜 유용하며, 어떻게 시작하는지 알려 주는 첫 문서. GitHub가 자동으로 표시한다.

**English** README

## 시험 트리거
- "방문자가 프로젝트 사용법을 바로 알아야 한다"
- "프로필 페이지에 자기소개를 보이고 싶다"
- "README가 여러 위치에 있다"

## 핵심
- 위치: .github, 루트, docs 디렉터리. 여러 개면 .github → 루트 → docs 순으로 하나를 표시.
- 내용: 프로젝트가 하는 일, 유용한 이유, 시작 방법, 도움받는 곳, 관리·기여하는 사람.
- 프로필 README: 사용자 이름과 같은 이름의 공개 리포지토리 루트에 두면 프로필에 표시.
- 제목으로 목차가 자동 생성된다(Outline 메뉴). 500KiB를 넘는 내용은 잘린다. 긴 문서는 위키로 → [[위키]].
- 한국어 공식 안내서는 README를 "추가 정보"로 옮겼다.

## 헷갈리는 개념
| 개념 | 차이 |
|---|---|
| [[커뮤니티 상태 파일]] | README는 소개, CONTRIBUTING은 기여 방법, SECURITY는 취약점 보고 |

## 오답 함정
> [!warning] README가 루트에만 있어야 인식된다는 선택지 → .github, 루트, docs 모두 가능

## 관련
- [[LICENSE]] · [[커뮤니티 상태 파일]] · [[CODEOWNERS]] · [[리포지토리 모범 사례]] · [[위키]]

**공식 목표**: [[2 GitHub 리포지토리 다루기#목표 2.1|2.1]]  
**근거**: [About READMEs](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-readmes)

## 셀프 체크
> [!question]- README가 여러 위치에 있을 때 우선순위는?
> .github → 루트 → docs

> [!question]- 프로필 README를 만드는 방법은?
> 사용자 이름과 같은 이름의 공개 리포지토리 루트에 README 작성
