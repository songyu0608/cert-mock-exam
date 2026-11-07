---
분류: ML 개발(SageMaker)
파트: 2
도메인: D1
중요도: 상
aliases: [Pipelines]
tags: [서비스, 분류/SageMaker, MLOps]
---
# SageMaker Pipelines

> [!summary] 한 줄 정의
> 데이터 처리, 훈련, 평가, 등록, 배포 단계를 하나의 워크플로로 묶어 자동 실행하는 MLOps용 CI/CD 서비스

## 시험 트리거
- "ML 워크플로를 자동화·오케스트레이션"
- "CI/CD/CT(지속적 훈련) 파이프라인"
- "엔드포인트 변경을 파이프라인으로 자동화", "자동 재훈련 체계"

## 주요 기능
- 데이터 파이프라인, 성능 평가 파이프라인, 추적 가능한 CI/CD/CT
- [[SageMaker Model Registry]], [[SageMaker Model Monitor]]와 연결해 배포·재훈련 자동화
- 계보 추적 시스템의 일부

## 헷갈리는 서비스
| 비교 대상 | 차이 |
|---|---|
| AWS Step Functions | 범용 워크플로 오케스트레이션 (재훈련 자동화에도 소개됨) |
| [[SageMaker Model Registry]] | 모델 버전·승인 관리. Pipelines는 흐름 자동화 |

## 관련
- 이론: [[P02 ML 수명 주기와 MLOps]]
- 덱: 33번 슬라이드

## 셀프 체크
> [!question]- CI/CD/CT의 CT는?
> 지속적 훈련(Continuous Training)
