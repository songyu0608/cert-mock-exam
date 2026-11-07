---
분류: 데이터·인프라
파트: [2, 10]
도메인: [D1, D5]
중요도: 중
aliases: [Glue, Glue Data Catalog, Glue DataBrew, Glue Data Quality]
tags: [서비스, 분류/인프라]
---
# AWS Glue

> [!summary] 한 줄 정의
> 서버리스 **ETL**(추출·변환·적재)과 데이터 카탈로그 서비스

## 시험 트리거
- "데이터 수집·변환(ETL)"
- "메타데이터 카탈로그, 데이터 계보"
- "데이터 품질 확인" → Glue DataBrew, Glue Data Quality

## 주요 기능
- Glue Data Catalog: 데이터 계보 도구 중 하나
- DataBrew: 노코드 데이터 준비
- Data Quality: 품질 규칙 검사
- 데이터 수명 주기: 수집·ETL(Kinesis, DMS, Glue) → 정제(EMR, Glue) → 품질(DataBrew, Data Quality)

## 헷갈리는 서비스
| 비교 대상 | 차이 |
|---|---|
| [[SageMaker Data Wrangler]] | ML용 데이터 준비·특성 엔지니어링 |
| [[SageMaker ML Lineage Tracking]] | ML 워크플로 계보 |

## 관련
- 이론: [[P10 보안·거버넌스·규정 준수]], [[P02 ML 수명 주기와 MLOps]]
- 덱: 164번 슬라이드

## 셀프 체크
> [!question]- 데이터 계보 도구 3가지는?
> SageMaker ML Lineage Tracking, Glue Data Catalog, SageMaker 모델 카드
