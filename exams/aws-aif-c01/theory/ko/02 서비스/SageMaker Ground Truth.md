---
분류: ML 개발(SageMaker)
파트: [2, 8]
도메인: [D1, D3]
중요도: 상
aliases: [Ground Truth]
tags: [서비스, 분류/SageMaker]
---
# SageMaker Ground Truth

> [!summary] 한 줄 정의
> 사람 작업자를 관리해 훈련 데이터에 레이블을 붙이는 관리형 데이터 레이블링 서비스

## 시험 트리거
- "대량의 이미지·텍스트에 레이블을 붙여야 한다"
- "RLHF를 위해 사람이 모델 응답의 순위를 매겨야 한다"

## 주요 기능
- 사내 인력·외부 작업자로 레이블링 워크플로 운영
- **RLHF용 데이터 주석 도구**: 응답의 순위 매기기·분류
- 인간 중심 설계(HCD)의 대표 예인 RLHF 구현에 쓰임

## 헷갈리는 서비스
| 비교 대상 | 차이 |
|---|---|
| [[Amazon Augmented AI]] | **운영 중** 모델 결과를 사람이 검토. Ground Truth는 **훈련 데이터** 레이블링 |
| [[SageMaker Clarify]] | 편향 분석 |

## 관련
- 비교: [[비교 - 품질·편향·사람 검토 도구]]
- 이론: [[P02 ML 수명 주기와 MLOps]], [[P08 미세 조정과 평가 지표]]
- 덱: 26, 133번 슬라이드

## 셀프 체크
> [!question]- RLHF 데이터 수집에 쓰는 AWS 서비스는?
> SageMaker Ground Truth
