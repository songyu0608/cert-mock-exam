---
aliases: ["Pull request summaries", "풀 리퀘스트 요약", "Copilot PR 요약", "커밋 메시지 생성"]
tags: ["gh-300", "기능카드", "도메인2"]
도메인: 2
목표: ["2.11"]
중요도: "중"
---
# PR 요약

> [!summary] 한 줄 정의
> PR의 변경 내용, 영향받는 파일, 리뷰어가 볼 점을 Copilot이 요약해 설명이나 코멘트에 넣는 기능.

**English** Copilot pull request summaries

## 시험 트리거
- "PR 설명을 빨리 쓰고 싶다"
- "리뷰어가 변경 요지를 빨리 파악"

## 핵심
- PR 설명 또는 코멘트 입력란 → 헤더의 Copilot 아이콘 → Summary.
- Copilot Free에서는 제공되지 않는다.
- 기존 설명 내용은 고려하지 않으므로 빈 설명에서 시작하는 것이 좋다.
- 생성된 요약은 검토하고 필요한 맥락을 보탠 뒤 게시한다.
- 관련: GitHub Desktop에서 Copilot으로 커밋 메시지·설명 생성.

## 헷갈리는 개념
| 개념 | 차이 |
|---|---|
| [[Copilot 코드 리뷰]] | 변경 요약 vs 문제 지적 |

## 오답 함정
> [!warning] 오답이 되기 쉬운 선택지
> - PR 요약이 기존 설명을 반영해 보완한다는 선택지 → 기존 설명은 고려하지 않는다
> - Copilot Free에서도 PR 요약을 쓴다는 선택지 → Free 미제공

## 관련
- [[Copilot 코드 리뷰]] · [[AI 출력 검증]]

**공식 목표**: [[2 GitHub Copilot 기능 사용#목표 2.11|2.11]]  
**근거**: [Creating a pull request summary with GitHub Copilot](https://docs.github.com/en/copilot/how-tos/use-copilot-for-common-tasks/create-a-pr-summary) · [GitHub Copilot features](https://docs.github.com/en/copilot/get-started/features)

## 셀프 체크
> [!question]- PR 요약을 만드는 위치는?
> PR 설명·코멘트 입력란 헤더의 Copilot 아이콘 → Summary
