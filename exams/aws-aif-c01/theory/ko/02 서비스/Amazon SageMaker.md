---
분류: ML 개발(SageMaker)
파트: 4
도메인: D1
중요도: 상
aliases: [SageMaker, 세이지메이커]
tags: [서비스, 분류/SageMaker]
---
# Amazon SageMaker

> [!summary] 한 줄 정의
> 데이터 준비부터 훈련, 배포, 모니터링까지 ML 워크플로 전체를 다루는 완전 관리형 서비스

## 시험 트리거
- "직접 ML 모델을 만들고 훈련·배포해야 한다" (API로 FM만 쓰면 [[Amazon Bedrock]])
- "훈련 인프라를 관리하지 않고 대규모로 훈련하고 싶다"

## 기본 구조
- 훈련 데이터는 **S3**, 훈련·추론 코드는 컨테이너 이미지로 **ECR**
- 훈련 결과(모델 아티팩트)는 S3에 저장 → 추론 코드와 묶어 **엔드포인트**로 배포
- 훈련 작업에 지정하는 4가지: 훈련 데이터 S3 URL, ML 컴퓨팅 리소스, 출력 S3 URL, 훈련 코드 ECR 경로
- 훈련 방법: 기본 제공 알고리즘, Spark MLlib, TensorFlow·PyTorch·scikit-learn·XGBoost·Hugging Face, 자체 Docker 이미지, AWS Marketplace 알고리즘
- 데이터 준비: S3(흔히 RecordIO/Protobuf), Athena·EMR·Redshift·Keyspaces에서도 수집, SageMaker Processing 작업으로 전처리

## 주요 기능 지도
| 단계 | 기능 |
|---|---|
| 개발 환경 | Studio(시각적 IDE), 노트북, [[SageMaker Experiments]] |
| 데이터 | [[SageMaker Data Wrangler]], [[SageMaker Feature Store]], [[SageMaker Ground Truth]] |
| 모델 만들기 | [[SageMaker Autopilot]], [[SageMaker Canvas]], [[SageMaker JumpStart]] |
| 품질·책임 | [[SageMaker Clarify]], [[SageMaker Debugger]], [[SageMaker Model Monitor]] |
| MLOps | [[SageMaker Pipelines]], [[SageMaker Model Registry]], [[SageMaker ML Lineage Tracking]] |
| 배포 | [[SageMaker 추론 옵션]], [[SageMaker Neo]] |
| 거버넌스 | [[SageMaker Role Manager]], [[SageMaker 모델 카드]] |

## 관련
- 이론: [[P04 Amazon SageMaker]]
- 알고리즘: [[기본 제공 알고리즘 표]]
- 덱: 50~53번 슬라이드

## 셀프 체크
> [!question]- SageMaker에서 훈련 코드 이미지는 어디에 두나요?
> Amazon ECR. 훈련 데이터와 모델 아티팩트는 S3에 둡니다.
