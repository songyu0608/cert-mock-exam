---
aliases: ["닫기 키워드", "Closing keywords", "Closes #", "Fixes #", "Development 사이드바", "이슈 연결"]
tags: ["gh-900", "기능카드", "도메인3"]
도메인: 3
목표: ["3.2"]
중요도: "상"
---
# PR과 이슈 연결

> [!summary] 한 줄 정의
> PR 본문의 닫기 키워드(Closes #10 등)나 Development 사이드바로 PR과 이슈를 연결해, PR이 병합되면 이슈가 자동으로 닫히게 한다.

**English** Linking a pull request to an issue

## 시험 트리거
- "PR이 병합되면 관련 이슈가 자동으로 닫히게"
- "다른 리포지토리의 이슈를 닫고 싶다"
- "키워드를 썼는데 이슈가 안 닫혔다"

## 핵심
- 키워드 9개: close, closes, closed, fix, fixes, fixed, resolve, resolves, resolved(대문자·콜론 가능).
- 같은 리포지토리: Closes #10. 다른 리포지토리: Fixes 소유자/리포지토리#100. 여러 이슈는 각각 전체 문법으로.
- PR이 기본 브랜치를 대상으로 할 때만 동작한다. 다른 브랜치 대상이면 무시된다.
- 수동 연결: PR 또는 이슈의 오른쪽 Development 사이드바. PR당 최대 10개 이슈. 쓰기 권한 필요.

## 헷갈리는 개념
| 개념 | 차이 |
|---|---|
| [[Markdown 작성법]] | #123은 단순 참조, 키워드 + #123은 자동 종료 연결 |

## 오답 함정
> [!warning] 오답이 되기 쉬운 선택지
> - 기능 브랜치를 대상으로 한 PR에 Closes #5를 쓰면 병합 시 이슈가 닫힌다는 선택지 → 기본 브랜치 대상일 때만
> - "Related to #5"도 이슈를 닫는다는 선택지 → 정해진 9개 키워드만

## 관련
- [[이슈]] · [[풀 리퀘스트]] · [[이슈·PR 템플릿]] · [[이슈·PR 필터와 검색]]

**공식 목표**: [[3 GitHub로 협업하기#목표 3.2|3.2]]  
**근거**: [Linking a pull request to an issue](https://docs.github.com/en/issues/tracking-your-work-with-issues/using-issues/linking-a-pull-request-to-an-issue)

## 셀프 체크
> [!question]- 닫기 키워드가 동작하는 조건은?
> PR이 기본 브랜치를 대상으로 할 때

> [!question]- 다른 리포지토리 이슈를 닫는 문법은?
> Fixes 소유자/리포지토리#번호
