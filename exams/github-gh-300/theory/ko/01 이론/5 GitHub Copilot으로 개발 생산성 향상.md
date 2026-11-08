---
aliases: ["도메인 5", "Domain 5", "Improve developer productivity with GitHub Copilot", "GitHub Copilot를 사용하여 개발자 생산성 향상"]
tags: ["gh-300", "이론", "도메인5"]
도메인: 5
목표: ["5.1", "5.2", "5.3", "5.4", "5.5", "5.6"]
---
# 도메인 5　GitHub Copilot으로 개발 생산성 향상

**English** Domain 5: Improve developer productivity with GitHub Copilot  
**한국어 공식 안내서** GitHub Copilot를 사용하여 개발자 생산성 향상

도메인 5 (10–15%) · 목표 6개

코드 생성·리팩터링·문서화, 학습 가속과 컨텍스트 전환 감소, 샘플 데이터·레거시 현대화, 테스트·엣지 케이스·어설션, 보안·성능 개선 제안을 다룬다.

> [!abstract] 생산성과 코드 품질 향상
> Enhance productivity and code quality · 생산성 및 코드 품질 향상

## 목표 5.1

**코드 생성, 리팩터링, 문서화에 Copilot을 사용한다**

> [!quote]- 공식 원문 (English / 한국어 공식 안내서)
> Use Copilot for code generation, refactoring, and documentation
>
> 코드 생성, 리팩터링 및 설명서에 Copilot 사용

기능 설명에서 코드 구조를 만들고, 보일러플레이트를 생성하며, 리팩터링·언어 변환과 주석·README 작성을 돕는다.

관련 카드: [[코드 생성·리팩터링·문서화]]

## 목표 5.2

**학습을 가속하고 컨텍스트 전환을 줄인다**

> [!quote]- 공식 원문 (English / 한국어 공식 안내서)
> Accelerate learning and reduce context switching
>
> 학습 가속화 및 컨텍스트 전환 감소

편집기 안에서 API 사용법·설명을 받아 외부 검색을 줄이고 흐름을 유지한다. 남의 코드를 이해하고 같은 스타일로 이어 간다.

관련 카드: [[학습 가속과 컨텍스트 전환 감소]]

## 목표 5.3

**샘플 데이터를 생성하고 레거시 코드를 현대화한다**

> [!quote]- 공식 원문 (English / 한국어 공식 안내서)
> Generate sample data and modernize legacy code
>
> 샘플 데이터 생성 및 레거시 코드 현대화

테스트용 현실적 샘플 데이터를 만들고, 레거시 코드를 설명·테스트·리팩터링·변환으로 현대화한다.

관련 카드: [[샘플 데이터와 레거시 현대화]]

> [!abstract] 테스트와 보안 지원
> Support testing and security · 테스트 및 보안 지원

## 목표 5.4

**단위 테스트와 통합 테스트를 생성한다**

> [!quote]- 공식 원문 (English / 한국어 공식 안내서)
> Generate unit and integration tests
>
> 단위 및 통합 테스트 생성

/tests, /setupTests, 자연어 요청으로 단위·통합 테스트를 만든다. Agent 모드는 파일에 쓰고 실행·수정까지 반복한다.

관련 카드: [[단위·통합 테스트 생성]]

## 목표 5.5

**엣지 케이스를 찾고 어설션을 작성한다**

> [!quote]- 공식 원문 (English / 한국어 공식 안내서)
> Identify edge cases and write assertions
>
> 극한 사례 식별 및 어설션 작성

엣지 케이스는 명시적으로 요청하거나 Ask 모드로 시나리오를 먼저 받고, 어설션 관례는 지침 파일로 지정한다.

관련 카드: [[단위·통합 테스트 생성]]

## 목표 5.6

**보안 개선과 성능 최적화를 제안한다**

> [!quote]- 공식 원문 (English / 한국어 공식 안내서)
> Suggest security improvements and performance optimizations
>
> 보안 향상 및 성능 최적화 제안

역할 프롬프팅(보안·성능 전문가)과 /fix로 취약점·병목 개선을 제안받고, 보안 검토로 확인한다.

관련 카드: [[보안·성능 개선 제안]]

## 요약
- /tests = 단위 테스트, /setupTests = 프레임워크 구성.
- 엣지 케이스는 명시적으로 요청.
- 생성 테스트도 검토 필요.

## 이 도메인의 카드
- [[코드 생성·리팩터링·문서화]] — Copilot으로 기능 설명에서 코드를 만들고, 기존 코드를 더 나은 패턴으로 바꾸고(언어 변환 포함), 주석·README 같은 문서를 생성한다.
- [[학습 가속과 컨텍스트 전환 감소]] — Copilot은 편집기 안에서 설명·제안을 줘 새 언어·API를 빨리 익히게 하고, 검색·문서를 오가는 컨텍스트 전환을 줄인다.
- [[샘플 데이터와 레거시 현대화]] — Copilot으로 테스트용 현실적 샘플 데이터를 만들고, 오래된 코드를 이해·설명받아 최신 패턴이나 다른 언어로 옮긴다.
- [[단위·통합 테스트 생성]] — Copilot Chat의 /tests나 자연어 요청으로 단위·통합 테스트를 만들고, 엣지 케이스와 어설션을 명시적으로 요청한다. 생성된 테스트도 검토가 필요하다.
- [[보안·성능 개선 제안]] — Copilot에게 코드의 보안 취약점과 성능 병목을 찾고 개선안을 제안하게 할 수 있다. 제안은 보안 도구와 사람의 검토로 확인한다.
