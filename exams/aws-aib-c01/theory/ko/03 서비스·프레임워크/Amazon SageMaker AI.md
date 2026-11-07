---
aliases: ["SageMaker AI", "SageMaker", "セージメーカー"]
tags: ["aib-c01", "서비스카드", "도메인2"]
도메인: 2
기술: ["1.3.3", "2.1.2", "2.2.5"]
중요도: "상"
슬라이드: [25, 33, 44, 93]
---
# Amazon SageMaker AI

> [!summary] 한 줄 정의
> 사용자 지정 ML 모델을 구축·학습·배포하는 서비스. 자체 모델이 정말 필요하고 관리형 생성형 AI로 요구를 충족하지 못할 때 고른다.

**일본어** Amazon SageMaker AI　·　**영어** Amazon SageMaker AI

## 시험 트리거
- "자체 모델이 필요하다"
- "고유 데이터로 예측 모델을 처음부터 학습"
- "인스턴스 기반 과금"

## 핵심
- 가격: **인스턴스 기반**(학습·추론 가동 시간), 안정 사용이면 [[절감형 플랜]].
- [[생성형 AI 보안 범위 지정 매트릭스]]의 범위 5(자체 학습 모델) 예시 → 고객 책임 범위가 가장 넓다.
- 이 시험에서는 설정·구현이 아니라 "언제 고르나"만 묻는다.
- 이름: 2024년 말 Amazon SageMaker → **Amazon SageMaker AI**로 바뀌었다. 시험 안내서는 SageMaker AI로 표기.

## 헷갈리는 개념
| 개념 | 차이 |
|---|---|
| [[Amazon Bedrock]] | FM을 API로 사용. 대부분의 생성형 AI 요구는 여기서 먼저 검토 |

## 오답 함정
> [!warning] 범용 업무에 SageMaker AI 자체 모델

## 관련
- [[Bedrock vs SageMaker AI vs Quick vs Marketplace]] · [[미세 조정]] · [[1.3 GenAI 개념과 기법]] · [[2.1 비즈니스 목표에 맞는 AI 전략]] · [[2.2 AI 비즈니스 가치 측정]]

**덱**: [한국어 덱](https://claude.ai/artifact/Wa9gVkmip2DvJG3abjTMxW) 25번, 33번, 44번, 93번 슬라이드 (일본어 덱도 같은 번호)　·　**공식 기술**: 1.3.3, 2.1.2, 2.2.5

## 셀프 체크
> [!question]- SageMaker AI의 대표 가격 구조는?
> 인스턴스 기반
