---
분류: ML 개발(SageMaker)
파트: 4
도메인: D1
중요도: 상
aliases: [Autopilot, AutoML]
tags: [서비스, 분류/SageMaker]
---
# SageMaker Autopilot

> [!summary] 한 줄 정의
> 표 형식 데이터로 알고리즘 선택, 전처리, 튜닝, 인프라까지 자동화하는 AutoML

## 시험 트리거
- "알고리즘 선택과 하이퍼파라미터 튜닝을 자동화"
- "여러 모델 후보를 비교한 리더보드"

## 주요 기능
- 흐름: S3에서 데이터 로드 → 대상 열 선택 → 모델 자동 생성 → 노트북으로 과정 확인 → **모델 리더보드**에서 선택 → 배포·모니터링
- 문제 유형: 이진 분류, 다중 클래스 분류, 회귀
- 알고리즘: Linear Learner, XGBoost, 딥 러닝(MLP), 앙상블
- 데이터 형식: **테이블 형식 CSV 또는 Parquet만**
- 훈련 모드
  - **HPO**: 최대 100회 시도, 100MB 미만은 베이지안, 이상은 다중 충실도 최적화, 조기 중지
  - **앙상블**: AutoGluon으로 10회 시도, 스태킹
  - **자동**: 100MB 초과면 HPO, 미만이면 앙상블 (크기를 못 읽으면 HPO)
- 설명 가능성: [[SageMaker Clarify]] 통합, SHAP으로 특징 기여도

## 헷갈리는 서비스
| 비교 대상 | 차이 |
|---|---|
| [[SageMaker Canvas]] | 노코드 UI. 비즈니스 분석가용 |
| [[SageMaker JumpStart]] | 사전 훈련된 모델을 가져다 쓰는 것. 자동 훈련이 아님 |

## 관련
- 비교: [[비교 - SageMaker 노코드·자동화 도구]]
- 이론: [[P04 Amazon SageMaker]]
- 덱: 55~56번 슬라이드

## 셀프 체크
> [!question]- Autopilot이 받는 데이터 형식은?
> 테이블 형식의 CSV 또는 Parquet
