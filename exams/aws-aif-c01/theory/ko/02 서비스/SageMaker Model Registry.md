---
분류: ML 개발(SageMaker)
파트: 2
도메인: D1
중요도: 상
aliases: [Model Registry, 모델 레지스트리]
tags: [서비스, 분류/SageMaker, MLOps]
---
# SageMaker Model Registry

> [!summary] 한 줄 정의
> 모델 버전을 관리하고 각 버전의 승인 상태를 기록하는 모델 거버넌스 도구

## 시험 트리거
- "모델 버전 관리와 승인 상태 기록"
- "승인된 모델만 배포"
- "문제가 생기면 이전 모델 버전으로 롤백"

## 주요 기능
- 모델 버전 카탈로그, 승인·거부 상태
- [[SageMaker Pipelines]]의 평가 단계와 연결
- 데이터 중독 대응 시 이전 버전으로 롤백 ([[SageMaker Feature Store]]와 함께)

## 헷갈리는 서비스
| 비교 대상 | 차이 |
|---|---|
| [[SageMaker ML Lineage Tracking]] | 모델이 어떤 데이터·작업에서 만들어졌는지 **이력 추적** |
| [[SageMaker 모델 카드]] | 모델의 용도·위험을 **문서화** |

## 관련
- 이론: [[P02 ML 수명 주기와 MLOps]]
- 덱: 25, 27, 33번 슬라이드

## 셀프 체크
> [!question]- 모델 버전과 승인 상태를 관리하는 기능은?
> SageMaker Model Registry
