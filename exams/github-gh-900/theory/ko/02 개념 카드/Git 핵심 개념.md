---
aliases: ["리포지토리", "Repository", "커밋", "Commit", "브랜치", "Branch", "분기", "클론", "Clone", "병합", "Merge", "Git 명령"]
tags: ["gh-900", "개념카드", "도메인1"]
도메인: 1
목표: ["1.3", "2.2"]
중요도: "상"
---
# Git 핵심 개념

> [!summary] 한 줄 정의
> 리포지토리(파일 + 전체 이력), 커밋(특정 시점의 스냅샷), 브랜치(독립된 작업 줄기), 클론(로컬 사본), 병합(줄기 합치기).

**English** Key Git concepts: repository, commit, branch

## 시험 트리거
- "특정 시점의 프로젝트 상태를 저장"
- "메인 코드에 영향 없이 기능을 개발"
- "원격 프로젝트를 내 컴퓨터로 복사"

## 핵심
- 리포지토리: 프로젝트의 파일·폴더와 전체 변경 이력.
- 커밋: 특정 시점의 프로젝트 스냅샷. 브랜치: 별도의 개발 줄기로 작업을 분리한다.
- 클론: 원격 프로젝트의 파일·이력·브랜치를 포함한 로컬 사본. 포크: 내 계정 아래 GitHub 사본 → [[포크]].
- 병합(merge): 서로 다른 개발 줄기를 합친다(예: 기능 브랜치 → main).
- 기본 명령: git init(새 리포지토리), git clone(원격 복사), git add(스테이징), git commit(스냅샷 저장), git status(상태 확인), git branch(브랜치 목록), git merge(병합), git pull(원격 변경 가져와 적용), git push(로컬 커밋 업로드).
- 한국어 공식 안내서는 브랜치를 "분기"로 표기한다.

## 헷갈리는 개념
| 개념 | 차이 |
|---|---|
| [[포크]] | 클론은 로컬 사본, 포크는 GitHub 위의 내 계정 사본 |

## 오답 함정
> [!warning] 오답이 되기 쉬운 선택지
> - git commit이 원격 리포지토리에 업로드한다는 선택지 → 업로드는 git push
> - git add가 변경을 저장(스냅샷)한다는 선택지 → add는 스테이징, 저장은 commit

## 관련
- [[Git과 GitHub의 차이]] · [[포크]] · [[GitHub 플로]] · [[파일 추가와 관리]]

**공식 목표**: [[1 Git과 GitHub 기본 이해#목표 1.3|1.3]] · [[2 GitHub 리포지토리 다루기#목표 2.2|2.2]]  
**근거**: [About Git](https://docs.github.com/en/get-started/using-git/about-git)

## 셀프 체크
> [!question]- 스테이징한 변경을 이력에 스냅샷으로 저장하는 명령은?
> git commit

> [!question]- 로컬 커밋을 원격 브랜치로 올리는 명령은?
> git push

> [!question]- 원격 변경을 가져와 현재 브랜치에 적용하는 명령은?
> git pull
