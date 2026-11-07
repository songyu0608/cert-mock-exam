---
분류: ML 개발(SageMaker)
파트: 4
도메인: D1
중요도: 상
aliases: [Feature Store, 특징 저장소]
tags: [서비스, 분류/SageMaker]
---
# SageMaker Feature Store

> [!summary] 한 줄 정의
> 모델 훈련에 쓰는 특징(feature)을 저장하고 팀 간에 공유하며, 훈련과 추론에서 같은 특징 값을 쓰게 해 주는 저장소

## 시험 트리거
- "여러 팀이 특징을 재사용·공유"
- "훈련과 추론 간 특징 일관성"
- "실시간 추론에서 최신 특징을 짧은 지연 시간으로 조회"

## 주요 기능
- 구조: Feature Store → **특징 그룹** → 레코드(레코드 식별자, 특징 이름, 이벤트 시간)
- **온라인 스토어**: PutRecord/GetRecord, 저지연 → 실시간 추론
- **오프라인 스토어(S3)**: 훈련·배치 추론, Athena 등으로 조회, Glue Data Catalog 자동 생성
- 수집: 스트리밍(Kinesis, MSK) 또는 배치(Spark, Data Wrangler)
- 보안: 저장·전송 중 암호화, KMS, IAM 세분화 제어, PrivateLink

## 헷갈리는 서비스
| 비교 대상 | 차이 |
|---|---|
| [[SageMaker Model Registry]] | 모델 버전 관리. Feature Store는 특징 데이터 관리 |
| [[AWS Glue]] | 데이터 카탈로그. 특징 전용 저장소가 아님 |

## 관련
- 이론: [[P04 Amazon SageMaker]]
- 덱: 59~60번 슬라이드

## 셀프 체크
> [!question]- 실시간 추론에는 온라인·오프라인 중 어느 스토어?
> 온라인 스토어 (오프라인은 훈련·배치용)
