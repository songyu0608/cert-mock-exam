---
aliases: ["Gists", "공개 Gist", "비밀 Gist", "Secret gist"]
tags: ["gh-900", "기능카드", "도메인3"]
도메인: 3
목표: ["3.4"]
중요도: "중"
---
# Gist

> [!summary] 한 줄 정의
> 코드 조각이나 메모를 공유하는 작은 Git 리포지토리. 공개(Discover·검색에 노출)와 비밀(URL을 아는 사람은 열람)이 있다.

**English** Gists

## 시험 트리거
- "짧은 코드 조각을 빠르게 공유"
- "블로그에 코드 조각을 삽입"
- "비밀 gist면 남이 못 보나"

## 핵심
- 공개 gist: Discover에 나오고 검색된다. 비밀 gist: 목록·검색에 안 나오지만 비공개가 아니다. URL이 있으면 누구나 본다.
- 공개 → 비밀 전환은 불가, 비밀 → 공개는 가능.
- 모든 gist는 Git 리포지토리: 포크, 클론, 전체 이력(diff) 확인.
- 삽입(Embed) URL로 블로그 등에 넣는다. ZIP 다운로드. 비밀 gist도 파트너 비밀 스캔 대상.

## 헷갈리는 개념
| 개념 | 차이 |
|---|---|
| [[위키]] | 작은 조각 공유 vs 프로젝트 문서 |
| [[GitHub Pages]] | 조각 공유 vs 정적 웹사이트 |

## 오답 함정
> [!warning] 오답이 되기 쉬운 선택지
> - 비밀 gist는 비공개라서 본인만 볼 수 있다는 선택지 → URL을 아는 누구나 볼 수 있다
> - 공개 gist를 비밀로 바꿀 수 있다는 선택지 → 불가

## 관련
- [[위키]] · [[GitHub Pages]] · [[문서화 도구 비교]]

**공식 목표**: [[3 GitHub로 협업하기#목표 3.4|3.4]]  
**근거**: [Creating gists](https://docs.github.com/en/get-started/writing-on-github/editing-and-sharing-content-with-gists/creating-gists)

## 셀프 체크
> [!question]- 비밀 gist를 볼 수 있는 사람은?
> URL을 아는 누구나(목록·검색에만 안 나옴)

> [!question]- gist의 정체는?
> 포크·클론·이력이 있는 Git 리포지토리
