---
분류: ML 개발(SageMaker)
파트: 4
도메인: D1
중요도: 중
aliases: [Data Wrangler]
tags: [서비스, 분류/SageMaker]
---
# SageMaker Data Wrangler

> [!summary] 한 줄 정의
> SageMaker Studio 안에서 ML용 데이터를 가져오고, 시각화하고, 변환하는 시각적 데이터 준비 도구

## 시험 트리거
- "코드 없이(적게) 데이터를 정제·변환해 훈련에 쓸 준비"
- "편향된 데이터의 균형을 맞추기(오버·언더샘플링, SMOTE)"

## 주요 기능
- 흐름: 가져오기 → 미리 보기 → 시각화 → 변환 → Quick Model → 데이터 흐름 내보내기
- 300가지 이상의 기본 변환 + pandas·PySpark·PySpark SQL 사용자 변환
- 원본: S3, Athena, Redshift, Lake Formation, Feature Store, JDBC(Databricks, SaaS)
- 내보내기: Processing, [[SageMaker Pipelines]], [[SageMaker Feature Store]], 노트북
- 데이터 균형: 무작위 언더샘플링, 무작위 오버샘플링, **SMOTE**

## 헷갈리는 서비스
| 비교 대상 | 차이 |
|---|---|
| [[SageMaker Clarify]] | 편향을 **찾는** 도구. Data Wrangler는 균형을 **맞추는** 도구 |
| [[AWS Glue]] | 범용 데이터 ETL·카탈로그 |

## 관련
- 이론: [[P04 Amazon SageMaker]], [[P09 책임 있는 AI]]
- 덱: 62, 146번 슬라이드

## 셀프 체크
> [!question]- 소수 클래스 샘플을 최근접 이웃으로 합성하는 기법은?
> SMOTE (Data Wrangler에서 사용)
