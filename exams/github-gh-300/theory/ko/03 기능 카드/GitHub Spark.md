---
aliases: ["Spark", "스파크"]
tags: ["gh-300", "기능카드", "도메인2"]
도메인: 2
목표: ["2.11"]
중요도: "하"
---
# GitHub Spark

> [!summary] 한 줄 정의
> 자연어로 아이디어를 동작하는 앱으로 빠르게 만들도록 돕던 GitHub 도구. 2026년 8월 github.com의 Spark 경험은 지원 종료가 공지되었다.

**English** GitHub Spark

## 시험 트리거
- "코드 없이 아이디어를 웹 앱으로"

## 핵심
- 목적: 아이디어에서 동작하는 애플리케이션까지 빠르게.
- 2026-08-04부터 신규 사용자·새 앱 생성 중단. 기존 사용자는 2026-08-31까지 앱을 내보낼 수 있다. 이미 배포한 앱은 계속 동작한다(GitHub 변경 로그).
- Spark의 llm() 함수를 받치던 GitHub Models는 2026-07-30 종료. llm()을 쓰는 앱은 다른 추론 제공자로 바꿔야 한다.
- 대안: VS Code, Copilot CLI, GitHub Copilot 앱에서 Copilot으로 앱을 만든다.
- 학습 가이드(2026년 8월 7일 기준)에는 Spark가 여전히 목표 문구에 있다. 시험에 나오면 "자연어로 앱을 만드는 도구"로 이해한다〔해석〕.

## 헷갈리는 개념
| 개념 | 차이 |
|---|---|
| [[Copilot Spaces]] | 앱을 만드는 도구 vs 컨텍스트를 모으는 공간 |

## 오답 함정
> [!warning] Spark 지원 종료 후 이미 배포한 앱이 바로 멈춘다는 선택지 → 배포한 앱은 계속 동작

## 관련
- [[Copilot Spaces]] · [[Copilot CLI]]

**공식 목표**: [[2 GitHub Copilot 기능 사용#목표 2.11|2.11]]  
**근거**: [Upcoming deprecation of GitHub Spark on github.com (changelog 2026-08-04)](https://github.blog/changelog/2026-08-04-upcoming-deprecation-of-github-spark-on-github-com/) · [GH-300 학습 가이드(2026년 8월 7일 기준)](https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/gh-300)

## 셀프 체크
> [!question]- GitHub Spark의 목적은?
> 아이디어를 빠르게 동작하는 앱으로 만드는 것
