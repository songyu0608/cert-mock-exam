---
aliases: ["Limitations of LLMs", "LLM 한계", "Copilot 한계", "컨텍스트 창", "Context window", "LoRA", "파인튜닝", "Fine-tuning"]
tags: ["gh-300", "개념카드", "도메인3"]
도메인: 3
목표: ["3.5"]
중요도: "상"
---
# LLM과 Copilot의 한계

> [!summary] 한 줄 정의
> LLM은 방대한 데이터로 학습해 맥락에 맞는 텍스트를 생성하지만, 제한된 컨텍스트, 학습 데이터의 편향·노후화, 그럴듯한 오류 같은 한계가 있다.

**English** Limitations of LLMs and Copilot

## 시험 트리거
- "큰 코드베이스 전체를 이해하지 못한다"
- "최신 라이브러리 API를 잘못 쓴다"
- "그럴듯하지만 존재하지 않는 함수"

## 핵심
- LLM: 사람의 언어를 이해·생성하도록 학습한 AI 모델. 특징: 방대한 학습 데이터, 맥락 이해, 수많은 파라미터, 다양한 작업에 맞춤 가능(Learn).
- Copilot은 현재 파일뿐 아니라 열린 파일·탭을 고려해 제안한다(Learn).
- 파인튜닝: 사전 학습 모델을 작은 작업별 데이터로 추가 학습. GitHub는 LoRA(Low-Rank Adaptation)를 썼다: 각 층에 작은 학습 가능 부분을 더하고 원래 모델은 그대로 둔다(Learn).
- 한계: 맥락 오해, 고수준 설계 판단 부족, 새 문제에 대한 창의성 한계, 학습 데이터의 편향·오래된 관행, 새롭거나 드문 기술에서 정확도 저하, 보안 문제, 오류 가능성, 언어별 성능 차이, 저작권 우려(Learn).
- 컨텍스트 창 크기 제한: 한 번에 볼 수 있는 코드 양이 한정된다. 구체 수치는 모델·버전마다 다르다(변동 정보).
- 구체적인 컨텍스트 제공·작업 분할·검증으로 한계를 줄인다 → [[프롬프트 엔지니어링 모범 사례]].

## 헷갈리는 개념
| 개념 | 차이 |
|---|---|
| [[생성형 AI의 위험과 한계]] | 기술적 한계 vs 윤리·법·보안 위험 |

## 오답 함정
> [!warning] LoRA는 모델 전체 파라미터를 다시 학습하는 방식이라는 선택지 → 작은 학습 가능 부분만 추가, 원래 모델은 고정

## 관련
- [[생성형 AI의 위험과 한계]] · [[컨텍스트 결정 방식]] · [[프롬프트 엔지니어링 모범 사례]]

**공식 목표**: [[3 GitHub Copilot 데이터와 아키텍처 이해#목표 3.5|3.5]]  
**근거**: [Learn: GitHub Copilot Large Language Models (LLMs)](https://learn.microsoft.com/en-us/training/modules/introduction-prompt-engineering-with-github-copilot/5-github-copilot-large-language-models) · [Learn: Understand limitations and measure impact](https://learn.microsoft.com/en-us/training/modules/developer-use-cases-for-ai-with-github-copilot/5-understand-limitations-measure-impact) · [Responsible use of Copilot inline suggestions](https://docs.github.com/en/copilot/responsible-use/copilot-code-completion)

## 셀프 체크
> [!question]- GitHub가 Copilot 파인튜닝에 쓴 방법은?
> LoRA(Low-Rank Adaptation)

> [!question]- 새롭거나 드문 기술에서 Copilot의 한계는?
> 제안 정확도·관련성이 낮을 수 있다
