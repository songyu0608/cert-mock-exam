---
분류: ML 개발(SageMaker)
파트: [4, 10]
도메인: [D1, D5]
중요도: 중
aliases: [Lineage Tracking, 계보 추적]
tags: [서비스, 분류/SageMaker, 거버넌스]
---
# SageMaker ML Lineage Tracking

> [!summary] 한 줄 정의
> ML 워크플로의 이력을 저장해, 모델이 어떤 데이터와 작업에서 만들어졌는지 추적하는 기능

## 시험 트리거
- "감사·규정 준수를 위해 모델의 출처 추적"
- "데이터 계보(lineage)와 출처(provenance)"

## 주요 기능
- 모델의 이력을 계속 기록, 자동 또는 수동 추적 엔터티
- 엔터티: Trial component(처리·훈련·변환 작업), Trial, Experiment, Context, Action, Artifact(S3 버킷, ECR 이미지), Association(ContributedTo, AssociatedWith, DerivedFrom, Produced, SameAs)
- AWS RAM으로 계정 간 계보 공유
- SageMaker Python SDK의 LineageQuery API로 조회

## 헷갈리는 서비스
| 비교 대상 | 차이 |
|---|---|
| [[SageMaker Model Registry]] | 버전·승인 관리 |
| [[AWS Glue]] | Glue Data Catalog도 데이터 계보 도구로 소개됨 |
| [[SageMaker 모델 카드]] | 모델 정보 문서화 |

## 관련
- 이론: [[P04 Amazon SageMaker]], [[P10 보안·거버넌스·규정 준수]]
- 덱: 61, 164번 슬라이드

## 셀프 체크
> [!question]- 데이터 계보 도구 3가지는?
> ML Lineage Tracking, Glue Data Catalog, SageMaker 모델 카드
