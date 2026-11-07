---
분류: ML 개발(SageMaker)
파트: 2
도메인: D1
중요도: 중
aliases: [Debugger]
tags: [서비스, 분류/SageMaker]
---
# SageMaker Debugger

> [!summary] 한 줄 정의
> **훈련 중** 발생하는 문제를 탐지하고 디버깅·로깅을 돕는 기능

## 시험 트리거
- "전이 학습 시 성능 문제 탐지"
- "훈련 중 문제 디버깅과 로깅"

## 주요 기능
- 훈련 작업의 이상 탐지
- CloudWatch와 함께 디버깅·로깅
- Studio 도구 중 하나

## 헷갈리는 서비스
| 비교 대상 | 차이 |
|---|---|
| [[SageMaker Model Monitor]] | **배포 후** 운영 중 감시. Debugger는 **훈련 중** |
| [[SageMaker Experiments]] | 실험 기록·비교 |

## 관련
- 이론: [[P02 ML 수명 주기와 MLOps]]
- 덱: 27~28번 슬라이드

## 셀프 체크
> [!question]- 훈련 중 문제 vs 운영 중 문제
> 훈련 중은 Debugger, 운영 중은 Model Monitor
