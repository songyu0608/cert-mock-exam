---
aliases: ["Filters", "필터", "검색 한정자", "is:open", "label:", "assignee:", "review-requested"]
tags: ["gh-900", "기능카드", "도메인3"]
도메인: 3
목표: ["3.2"]
중요도: "중"
---
# 이슈·PR 필터와 검색

> [!summary] 한 줄 정의
> is:, author:, assignee:, label:, review: 같은 한정자로 이슈·PR 목록을 좁히는 검색 문법.

**English** Filtering and searching issues and pull requests

## 시험 트리거
- "나에게 리뷰 요청된 PR만"
- "bug 레이블이 붙은 열린 이슈"
- "담당자가 없는 이슈"

## 핵심
- 상태·종류: is:open, is:closed, is:issue, is:pr.
- 사람: author:, assignee:, involves:, review-requested:, reviewed-by:. 리뷰 상태: review:approved / changes_requested / none.
- 메타데이터: label:"bug", no:project, has:label. 정렬: sort:created-asc. 제외: -author:octocat.
- 불리언: AND(또는 공백), OR, 괄호(5단계까지). label:"bug","wip"는 OR.
- 알림함 필터는 reason:review-requested 등 → [[알림]].

## 오답 함정
> [!warning] label:"bug" label:"wip"가 둘 중 하나라는 선택지 → 둘 다(AND). 쉼표로 묶으면 OR

## 관련
- [[이슈]] · [[풀 리퀘스트]] · [[알림]] · [[레이블과 마일스톤]]

**공식 목표**: [[3 GitHub로 협업하기#목표 3.2|3.2]]  
**근거**: [Filtering and searching issues and pull requests](https://docs.github.com/en/issues/tracking-your-work-with-issues/using-issues/filtering-and-searching-issues-and-pull-requests)

## 셀프 체크
> [!question]- 승인된 PR만 보는 한정자는?
> review:approved

> [!question]- 특정 사용자가 만든 것만 제외하는 문법은?
> -author:사용자
