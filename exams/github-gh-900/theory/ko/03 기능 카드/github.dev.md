---
aliases: ["github.dev 편집기", "웹 기반 편집기", ". 키"]
tags: ["gh-900", "기능카드", "도메인4"]
도메인: 4
목표: ["4.5"]
중요도: "상"
---
# github.dev

> [!summary] 한 줄 정의
> 리포지토리에서 . 키를 누르면 열리는 브라우저 전용 경량 편집기. 무료지만 컴퓨팅이 없어 실행·터미널을 쓸 수 없다.

**English** The github.dev web-based editor

## 시험 트리거
- "오타 몇 개를 빠르게 고쳐 커밋"
- "여러 파일을 브라우저에서 편집"
- "코드를 실행해 테스트해야 한다"

## 핵심
- 여는 법: 리포지토리·PR에서 . 키(같은 탭), > 키(새 탭), 또는 주소의 github.com을 github.dev로 바꾼다.
- 브라우저에서만 동작하는 경량 편집. 파일 탐색, 수정, 커밋 가능.
- 컴퓨팅이 없어 빌드·실행·통합 터미널 불가. 웹에서 도는 확장만.
- GitHub.com 사용자 모두 무료(로그인 필요). 즉시 열린다.
- 실행·디버그가 필요하면 변경을 커밋한 뒤 "Continue Working on…" → Create New Codespace.

## 헷갈리는 개념
| 개념 | 차이 |
|---|---|
| [[GitHub Codespaces]] | 편집·커밋만(무료, 즉시) vs VM에서 실행·디버그(사용량 과금, 시작에 수 분) |

## 오답 함정
> [!warning] 오답이 되기 쉬운 선택지
> - github.dev에서 터미널로 테스트를 돌린다는 선택지 → 컴퓨팅이 없어 불가, Codespaces 필요
> - github.dev가 사용 시간만큼 과금된다는 선택지 → 무료

## 관련
- [[GitHub Codespaces]] · [[Codespaces vs github.dev]] · [[파일 추가와 관리]]

**공식 목표**: [[4 최신 개발 방식 적용#목표 4.5|4.5]]  
**근거**: [The github.dev web-based editor](https://docs.github.com/en/codespaces/the-githubdev-web-based-editor)

## 셀프 체크
> [!question]- github.dev를 여는 단축키는?
> . 키(같은 탭), > 키(새 탭)

> [!question]- github.dev에서 할 수 없는 것은?
> 빌드·실행·디버그, 통합 터미널
