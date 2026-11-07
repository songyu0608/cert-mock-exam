---
분류: ML 개발(SageMaker)
파트: [4, 5]
도메인: [D1, D3]
중요도: 중
aliases: [JumpStart]
tags: [서비스, 분류/SageMaker]
---
# SageMaker JumpStart

> [!summary] 한 줄 정의
> 모델 허브의 사전 훈련된 오픈 소스 모델과 알고리즘을 클릭 몇 번으로 가져와 쓰는 기능

## 시험 트리거
- "사전 훈련된 오픈 소스 모델로 빠르게 시작"
- "FM을 직접 배포·관리(인프라 제어)하고 싶다"

## 주요 기능
- NLP, 객체 탐지, 이미지 분류 등 150개가 넘는 오픈 소스 모델
- Studio에서 모델이 로드된 노트북을 바로 열어 시작
- 생성형 AI: Hugging Face 텍스트 생성 모델, Stable Diffusion 등

## 헷갈리는 서비스
| 비교 대상 | 차이 |
|---|---|
| [[Amazon Bedrock]] | 서버리스 API로 FM 사용, 인프라 관리 없음. JumpStart는 모델을 내 계정에 배포·관리 |
| [[SageMaker Autopilot]] | 내 데이터로 모델을 자동 훈련 |

## 관련
- 비교: [[비교 - SageMaker 노코드·자동화 도구]]
- 이론: [[P04 Amazon SageMaker]], [[P05 파운데이션 모델과 Bedrock]]
- 덱: 58, 71번 슬라이드

## 셀프 체크
> [!question]- "인프라 관리 없이 API로 FM" vs "사전 훈련 모델을 내 계정에 배포"
> 앞은 Bedrock, 뒤는 SageMaker JumpStart
