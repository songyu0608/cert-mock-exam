---
aliases: ["Issue templates", "Issue forms", "이슈 양식", "PR template", "pull_request_template.md", "ISSUE_TEMPLATE", "config.yml"]
tags: ["gh-900", "기능카드", "도메인3"]
도메인: 3
목표: ["3.2"]
중요도: "상"
---
# 이슈·PR 템플릿

> [!summary] 한 줄 정의
> 이슈·PR을 만들 때 필요한 정보를 미리 채워 넣게 하는 양식. 이슈 템플릿은 .github/ISSUE_TEMPLATE, PR 템플릿은 pull_request_template.md.

**English** Issue and pull request templates

## 시험 트리거
- "버그 보고에 재현 단계가 늘 빠진다"
- "필수 입력 칸을 만들고 싶다"
- "PR마다 체크리스트를 자동으로"

## 핵심
- 이슈 템플릿: 기본 브랜치의 .github/ISSUE_TEMPLATE 폴더. Markdown(.md) 템플릿 또는 YAML(.yml) 이슈 양식(필수 입력 지정 가능).
- 같은 폴더의 config.yml로 템플릿 선택 화면을 조정한다.
- PR 템플릿: 루트, docs, .github 중 한 곳에 둔다. 내용이 PR 본문에 자동으로 채워진다.
- 둘 다 기본 브랜치에 있어야 한다. 다른 브랜치의 템플릿은 쓸 수 없다.
- 조직·계정 기본 템플릿은 .github 리포지토리의 기본 커뮤니티 상태 파일로 → [[커뮤니티 상태 파일]].

## 헷갈리는 개념
| 개념 | 차이 |
|---|---|
| [[저장된 답글]] | 이슈·PR 본문 양식 vs 코멘트 답글 재사용 |

## 오답 함정
> [!warning] 오답이 되기 쉬운 선택지
> - 기능 브랜치에 만든 이슈 템플릿이 바로 적용된다는 선택지 → 기본 브랜치에 있어야 한다
> - 이슈 양식으로 필수 입력을 강제할 수 없다는 선택지 → YAML 이슈 양식은 필수 입력 지정 가능

## 관련
- [[커뮤니티 상태 파일]] · [[이슈]] · [[풀 리퀘스트]] · [[PR과 이슈 연결]]

**공식 목표**: [[3 GitHub로 협업하기#목표 3.2|3.2]]  
**근거**: [About issue and pull request templates](https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/about-issue-and-pull-request-templates) · [Creating a default community health file](https://docs.github.com/en/communities/setting-up-your-project-for-healthy-contributions/creating-a-default-community-health-file)

## 셀프 체크
> [!question]- 이슈 템플릿 폴더 위치는?
> 기본 브랜치의 .github/ISSUE_TEMPLATE

> [!question]- 필수 입력 칸이 있는 이슈 양식의 파일 형식은?
> YAML(.yml)
