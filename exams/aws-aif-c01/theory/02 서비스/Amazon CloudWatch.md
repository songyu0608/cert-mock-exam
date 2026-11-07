---
분류: 데이터·인프라
파트: [2, 10]
도메인: [D1, D5]
중요도: 중
aliases: [CloudWatch]
tags: [서비스, 분류/인프라, MLOps]
---
# Amazon CloudWatch

> [!summary] 한 줄 정의
> AWS 리소스와 애플리케이션의 **지표, 로그, 경보**를 모니터링하는 서비스

## 시험 트리거
- "지표 모니터링과 경보"
- "Bedrock 모델 호출 로그 저장" → CloudWatch Logs
- "AgentCore 관찰 가능성"

## 주요 기능
- 지표·로그·경보·대시보드
- Bedrock 모델 호출 로깅 대상(CloudWatch Logs 또는 S3)
- Model Monitor, Personalize, AgentCore와 연동

## 헷갈리는 서비스
| 비교 대상 | 차이 |
|---|---|
| [[AWS CloudTrail]] | API 호출 감사 |
| [[SageMaker Model Monitor]] | 모델 품질·드리프트 감시 |

## 관련
- 비교: [[비교 - 감사·거버넌스 서비스]]
- 이론: [[P10 보안·거버넌스·규정 준수]], [[P02 ML 수명 주기와 MLOps]]
- 덱: 90, 164번 슬라이드

## 셀프 체크
> [!question]- Bedrock 모델 호출 로그를 보낼 수 있는 두 곳은?
> CloudWatch Logs, S3
