---
분류: ML 개발(SageMaker)
파트: [2, 9, 10]
도메인: [D4, D5]
중요도: 중
aliases: [Role Manager]
tags: [서비스, 분류/SageMaker, 거버넌스]
---
# SageMaker Role Manager

> [!summary] 한 줄 정의
> 데이터 과학자, MLOps 등 ML 페르소나별 IAM 역할과 권한을 만들고 관리하는 기능

## 시험 트리거
- "ML 역할과 책임 정의"
- "역할별 최소 권한 부여"

## 주요 기능
- 페르소나 예: 데이터 과학자, MLOps, SageMaker 컴퓨팅
- SageMaker ML 거버넌스 도구 중 하나 (모델 카드, 모델 대시보드와 함께)

## 헷갈리는 서비스
| 비교 대상 | 차이 |
|---|---|
| [[AWS IAM]] | 범용 권한 관리. Role Manager는 ML 페르소나용 역할을 쉽게 만들어 줌 |

## 관련
- 이론: [[P09 책임 있는 AI]], [[P10 보안·거버넌스·규정 준수]]
- 덱: 149, 163번 슬라이드

## 셀프 체크
> [!question]- ML 페르소나 기반 IAM 역할은 어떤 기능으로?
> SageMaker Role Manager
