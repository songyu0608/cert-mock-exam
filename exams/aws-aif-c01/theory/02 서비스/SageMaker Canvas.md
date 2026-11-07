---
분류: ML 개발(SageMaker)
파트: 4
도메인: D1
중요도: 상
aliases: [Canvas]
tags: [서비스, 분류/SageMaker]
---
# SageMaker Canvas

> [!summary] 한 줄 정의
> 비즈니스 분석가가 코드 없이 예측 모델을 만드는 노코드 ML 도구

## 시험 트리거
- "ML 경험이 없는 비즈니스 분석가가 코드 없이 예측"
- "CSV를 올려서 열 하나를 예측하고 싶다"

## 주요 기능
- CSV 업로드 → 예측할 열 선택 → 빌드 → 예측
- 데이터 세트 조인 가능
- 분류와 회귀
- 결측값·이상치·중복을 자동 정리
- 만든 모델과 데이터 세트를 SageMaker Studio와 공유
- Amazon Bedrock과도 연동

## 헷갈리는 서비스
| 비교 대상 | 차이 |
|---|---|
| [[SageMaker Autopilot]] | AutoML 엔진. 코드로도 쓰고 사람이 과정을 들여다봄. Canvas는 완전 노코드 |
| [[SageMaker Data Wrangler]] | 훈련 전 데이터 준비 도구. 예측 모델을 만드는 도구가 아님 |

## 관련
- 비교: [[비교 - SageMaker 노코드·자동화 도구]]
- 이론: [[P04 Amazon SageMaker]]
- 덱: 63번 슬라이드

## 셀프 체크
> [!question]- "코드 없이, ML 지식 없이 예측 모델"이면 어떤 서비스?
> SageMaker Canvas
