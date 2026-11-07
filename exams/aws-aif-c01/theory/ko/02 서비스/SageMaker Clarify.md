---
분류: ML 개발(SageMaker)
파트: [2, 4, 9]
도메인: [D1, D4]
중요도: 상
aliases: [Clarify]
tags: [서비스, 분류/SageMaker, 책임있는AI]
---
# SageMaker Clarify

> [!summary] 한 줄 정의
> 데이터와 모델의 **편향을 탐지**하고, 예측에 어떤 특징이 영향을 줬는지 **설명**해 주는 도구

## 시험 트리거
- "특정 연령·성별 집단에 불리한지 확인" → 편향 탐지
- "왜 이런 예측이 나왔는지 설명" → 설명 가능성
- "공정성과 설명 가능성 검토"
- FM 평가(정확도, 견고성, 유해성)도 지원

## 주요 기능
- 확인할 특징(나이, 성별 등)을 지정 → 편향을 분석·보고 (균형 맞추기는 [[SageMaker Data Wrangler]])
- **훈련 전 편향 지표**: 클래스 불균형(CI), 레이블 비율 차이(DPL), KL·JS 발산, Lp 노름, 총 변동 거리(TVD), KS, 조건부 인구 통계 격차(CDD)
- **설명**: SHAP(섀플리 값 근사), 시계열은 비대칭 섀플리 값, 부분 의존도 플롯(PDP)
- 온라인 설명 가능성, [[SageMaker Autopilot]]·[[SageMaker Experiments]]와 연동
- [[SageMaker Model Monitor]]와 함께 운영 중 편향 드리프트 감시

## 헷갈리는 서비스
| 비교 대상 | 차이 |
|---|---|
| [[SageMaker Model Monitor]] | 운영 중 품질·드리프트를 **계속 감시**. Clarify는 편향 분석·설명 |
| [[Amazon Augmented AI]] | 사람이 결과를 검토 |
| [[SageMaker Data Wrangler]] | 편향 데이터의 균형을 **맞춤** |

## 관련
- 비교: [[비교 - 품질·편향·사람 검토 도구]]
- 이론: [[P09 책임 있는 AI]]
- 덱: 25, 146~148번 슬라이드

## 셀프 체크
> [!question]- "집단 간 승인 비율 차이"를 보는 Clarify 지표는?
> 레이블 비율 차이(DPL). 표본 수 차이는 클래스 불균형(CI)
