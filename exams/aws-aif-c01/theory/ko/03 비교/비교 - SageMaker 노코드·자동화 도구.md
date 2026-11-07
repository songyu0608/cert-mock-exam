---
파트: [2, 4]
tags: [비교]
---
# 비교 - SageMaker 노코드·자동화 도구

> [!summary] 한 줄로
> **누가 쓰나**(분석가 / 데이터 과학자)와 **무엇을 자동화하나**(모델 / 데이터 / 파이프라인)로 구분한다.

| 도구 | 대상 사용자 | 하는 일 | 코드 |
|---|---|---|---|
| [[SageMaker Canvas]] | **비즈니스 분석가** | 노코드로 예측 모델 만들고 예측 | 없음 |
| [[SageMaker Autopilot]] | 데이터 과학자·개발자 | **AutoML**: 알고리즘 선택·전처리·튜닝, 리더보드 | 선택 |
| [[SageMaker Data Wrangler]] | 데이터 과학자 | 훈련 **전** 데이터 준비·변환(300개 이상), 편향 보정 | 선택 |
| [[SageMaker JumpStart]] | 누구나 | **사전 훈련 모델** 허브, 클릭 한 번 배포 | 선택 |
| [[SageMaker Pipelines]] | MLOps | ML 워크플로 **CI/CD 자동화** | 있음 |
| [[SageMaker Feature Store]] | 데이터 과학자 | 특징 저장·공유(온라인·오프라인) | 있음 |
| [[SageMaker Experiments]] | 데이터 과학자 | 실험 기록·비교 | 있음 |
| [[Amazon Bedrock]] | 개발자 | 서버리스 FM API | 있음 |

## 문제 속 표현 → 정답
| 표현 | 정답 |
|---|---|
| ML 경험 없는 분석가, 코드 없이 예측 | Canvas |
| 알고리즘 선택과 튜닝을 자동으로, 리더보드 | Autopilot |
| 결측값 처리·인코딩 등 시각적으로 데이터 준비 | Data Wrangler |
| 오픈 소스 사전 훈련 모델로 빠르게 시작 | JumpStart |
| 훈련·배포 단계를 자동으로 반복 | Pipelines |
| 여러 팀이 같은 특징 재사용, 훈련·추론 일관성 | Feature Store |

> [!warning] 함정
> Autopilot도 "코드 없이" 쓸 수 있지만, 시험에서 **비즈니스 분석가 + 노코드**는 Canvas. Autopilot은 **AutoML** 키워드.
> JumpStart는 **모델을 직접 배포·관리**, Bedrock은 **서버리스 API**.

## 관련
- 이론: [[P04 Amazon SageMaker]]
