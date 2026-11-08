---
aliases: ["라이선스", "License", "choosealicense.com", "오픈 소스 라이선스"]
tags: ["gh-900", "기능카드", "도메인2"]
도메인: 2
목표: ["2.1", "7.1"]
중요도: "상"
---
# LICENSE

> [!summary] 한 줄 정의
> 다른 사람이 코드를 어떤 조건으로 쓰고 수정·배포할 수 있는지 정하는 파일. 없으면 기본 저작권이 적용되어 재사용 권리가 없다.

**English** Licensing a repository

## 시험 트리거
- "공개 리포지토리인데 라이선스가 없다"
- "다른 사람이 내 코드를 자유롭게 써도 되게 하고 싶다"
- "어떤 라이선스를 고를지 모르겠다"

## 핵심
- 라이선스가 없으면 기본 저작권: 누구도 복제·배포·파생 저작물을 만들 수 없다.
- 단, GitHub 이용 약관에 따라 공개 리포지토리는 다른 사람이 보고 포크할 수 있다.
- 보통 루트에 LICENSE(.txt/.md/.rst) 파일을 둔다. choosealicense.com으로 고른다.
- 라이선스 선택기는 새 리포지토리를 만들 때만 나온다. 기존 리포지토리는 직접 파일을 추가한다.
- LICENSE는 조직 기본 커뮤니티 상태 파일로 지정할 수 없다(리포지토리마다 둔다).

## 헷갈리는 개념
| 개념 | 차이 |
|---|---|
| [[커뮤니티 상태 파일]] | LICENSE는 기본 파일로 공유 불가 |

## 오답 함정
> [!warning] 공개 리포지토리는 라이선스가 없어도 누구나 자유롭게 재사용할 수 있다는 선택지 → 보기·포크만 가능, 재사용 권리는 없다

## 관련
- [[README]] · [[오픈 소스와 GitHub Sponsors]] · [[커뮤니티 상태 파일]]

**공식 목표**: [[2 GitHub 리포지토리 다루기#목표 2.1|2.1]] · [[7 GitHub 커뮤니티 살펴보기#목표 7.1|7.1]]  
**근거**: [Licensing a repository](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/licensing-a-repository) · [Creating a default community health file](https://docs.github.com/en/communities/setting-up-your-project-for-healthy-contributions/creating-a-default-community-health-file)

## 셀프 체크
> [!question]- 라이선스가 없는 공개 리포지토리를 다른 사람이 할 수 있는 것은?
> 보기와 포크(이용 약관). 복제·배포·파생 저작물 권리는 없다
