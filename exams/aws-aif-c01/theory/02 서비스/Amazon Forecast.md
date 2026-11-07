---
분류: AI 서비스
파트: 7
도메인: D1
중요도: 중
aliases: [Forecast, 시계열 예측]
tags: [서비스, 분류/AI서비스]
---
# Amazon Forecast

> [!summary] 한 줄 정의
> ML 기반 **시계열 예측** 완전 관리형 서비스 (재고·수요·재무 계획)

## 시험 트리거
- "과거 판매 데이터로 향후 수요 예측"
- "재고 계획, 리소스 계획"

## 주요 기능
- AutoML이 알고리즘 선택: ARIMA, DeepAR, ETS, NPTS, CNN-QR, Prophet
- 관련 시계열(가격, 프로모션, 경제 지표)을 함께 넣어 관계 파악
- 구성: 데이터셋 그룹 → 예측기 → 예측
- 참고: AWS는 2024년 신규 고객 가입 중단을 발표. 시험에는 용도로 나올 수 있음

## 헷갈리는 서비스
| 비교 대상 | 차이 |
|---|---|
| [[Amazon Personalize]] | 사용자별 추천 |
| SageMaker DeepAR | SageMaker 기본 제공 시계열 알고리즘 |

## 관련
- 이론: [[P07 고수준 AI 서비스]]
- 덱: 123번 슬라이드

## 셀프 체크
> [!question]- Forecast가 사용하는 시계열 알고리즘 예 두 가지는?
> DeepAR, ARIMA (그 외 ETS, NPTS, CNN-QR, Prophet)
