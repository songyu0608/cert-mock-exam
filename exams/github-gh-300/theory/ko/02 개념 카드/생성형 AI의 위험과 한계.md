---
aliases: ["Risks and limitations of generative AI", "AI 위험", "생성 AI 위험", "할루시네이션"]
tags: ["gh-300", "개념카드", "도메인1"]
도메인: 1
목표: ["1.1", "3.5"]
중요도: "상"
---
# 생성형 AI의 위험과 한계

> [!summary] 한 줄 정의
> 생성형 AI 도구는 그럴듯하지만 틀린 코드, 편향, 보안 취약점, 공개 코드 일치, 법적 위험을 만들 수 있다. 그래서 사람의 검토가 전제다.

**English** Risks and limitations of generative AI tools

## 시험 트리거
- "Copilot이 만든 코드가 컴파일은 되는데 요구사항과 다르다"
- "AI가 오래된 방식의 코드를 제안한다"
- "생성 코드에 SQL 인젝션 위험"

## 핵심
- 부정확한 코드: 유효해 보이지만 의미상·문법상 틀릴 수 있다(공식 책임 있는 사용 문서).
- 범위 한계: 언어별 학습 데이터 양에 따라 품질이 다르고, 지금 쓰는 코드만 보므로 큰 설계·아키텍처 문제를 놓칠 수 있다.
- 편향: 학습 데이터의 편향과 오류가 제안에 이어질 수 있다. 오래된 관행이 섞일 수 있다(Learn).
- 보안 위험: 민감 정보 노출이나 취약점을 만들 수 있다.
- 공개 코드 일치: 학습 데이터의 코드와 일치하는 제안이 나올 수 있다(확률은 낮음) → [[공개 코드 일치 필터와 코드 참조]].
- 법적 위험: 생성 코드의 보안 취약점·버그·IP 침해 위험은 사용자가 진다 → [[출력의 소유권과 책임]].
- 새롭거나 드문 기술은 제안 정확도가 낮을 수 있다(Learn).

## 헷갈리는 개념
| 개념 | 차이 |
|---|---|
| [[LLM과 Copilot의 한계]] | 생성형 AI 일반 위험(윤리·법·보안) vs 모델 구조에서 오는 기술적 한계(컨텍스트 등) |

## 오답 함정
> [!warning] 오답이 되기 쉬운 선택지
> - Copilot 제안은 GitHub가 검증했으므로 바로 써도 된다는 선택지 → 사용자가 검토·테스트·검증해야 한다
> - Copilot은 아키텍처 수준 문제까지 판단한다는 선택지 → 작성 중인 코드 범위만 보므로 설계 문제를 놓칠 수 있다

## 관련
- [[AI 출력 검증]] · [[책임 있는 AI 원칙 6가지]] · [[AI 피해와 완화 전략]] · [[LLM과 Copilot의 한계]] · [[출력의 소유권과 책임]]

**공식 목표**: [[1 책임감 있는 GitHub Copilot 사용#목표 1.1|1.1]] · [[3 GitHub Copilot 데이터와 아키텍처 이해#목표 3.5|3.5]]  
**근거**: [Responsible use of Copilot inline suggestions](https://docs.github.com/en/copilot/responsible-use/copilot-code-completion) · [Learn: Understand limitations and measure impact](https://learn.microsoft.com/en-us/training/modules/developer-use-cases-for-ai-with-github-copilot/5-understand-limitations-measure-impact)

## 셀프 체크
> [!question]- Copilot 코드가 "유효해 보이지만 틀릴 수 있다"는 한계의 이름은?
> 부정확한 코드(Inaccurate code)

> [!question]- Copilot이 설계 문제를 놓칠 수 있는 이유는?
> 작성 중인 코드 주변만 보기 때문(범위 한계)
