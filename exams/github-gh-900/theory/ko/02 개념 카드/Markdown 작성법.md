---
aliases: ["Markdown", "GitHub Flavored Markdown", "마크다운", "작업 목록", "Task list", "멘션", "알림 블록"]
tags: ["gh-900", "개념카드", "도메인1"]
도메인: 1
목표: ["1.6"]
중요도: "상"
---
# Markdown 작성법

> [!summary] 한 줄 정의
> 이슈·PR·코멘트·README에서 제목, 목록, 코드, 링크, 작업 목록, 멘션, 참조를 쓰는 GitHub의 서식 문법.

**English** Basic writing and formatting syntax

## 시험 트리거
- "다른 사람을 호출해 알림을 보내고 싶다"
- "체크박스로 할 일 목록"
- "다른 이슈를 본문에서 참조"

## 핵심
- 제목 # ~ ######, 굵게 **텍스트**, 기울임 *텍스트*, 취소선 ~~텍스트~~, 인용 >, 인라인 코드 `코드`, 코드 블록 ``` .
- 링크 [텍스트](URL), 상대 링크 [텍스트](docs/FILE.md), 이미지 ![대체 텍스트](URL).
- 목록 - / 1., 작업 목록 - [ ] / - [x].
- 멘션 @사용자 또는 @조직/팀(알림 발생), 이슈·PR 참조 #123, 이모지 :+1:, 각주 [^1].
- 경고 블록 > [!NOTE] / [!TIP] / [!IMPORTANT] / [!WARNING] / [!CAUTION]. 숨김 주석 <!-- -->.

## 헷갈리는 개념
| 개념 | 차이 |
|---|---|
| [[저장된 답글]] | 서식 문법 vs 자주 쓰는 답글 재사용 |

## 오답 함정
> [!warning] #123이 제목 서식이라는 선택지 → # 뒤에 공백 없이 숫자가 오면 이슈·PR 참조

## 관련
- [[이슈]] · [[풀 리퀘스트]] · [[README]] · [[알림]]

**공식 목표**: [[1 Git과 GitHub 기본 이해#목표 1.6|1.6]]  
**근거**: [Basic writing and formatting syntax](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax)

## 셀프 체크
> [!question]- 작업 목록(체크박스) 문법은?
> - [ ] 할 일 / - [x] 완료

> [!question]- 팀 전체를 멘션하는 문법은?
> @조직이름/팀이름

> [!question]- 경고 블록 5종은?
> NOTE, TIP, IMPORTANT, WARNING, CAUTION
