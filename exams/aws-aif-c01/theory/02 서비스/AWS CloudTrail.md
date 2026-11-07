---
분류: 보안·거버넌스
파트: 10
도메인: D5
중요도: 상
aliases: [CloudTrail, API 호출 기록]
tags: [서비스, 분류/보안, 거버넌스]
---
# AWS CloudTrail

> [!summary] 한 줄 정의
> 콘솔·CLI·SDK·API에서 사용자·역할·서비스가 한 **모든 작업(API 호출)을 기록**하는 감사 서비스

## 시험 트리거
- "누가 언제 어떤 API를 호출했나"
- "누가 무엇을 망가뜨렸나 추적"
- "운영·위험 감사"

## 주요 기능
- 모든 API 호출 기록
- SageMaker, Bedrock, Personalize, Quick 등의 감사 로깅

## 헷갈리는 서비스
| 비교 대상 | 차이 |
|---|---|
| [[Amazon CloudWatch]] | **성능 지표**·로그 모니터링. CloudTrail은 **API 활동** 기록 |
| [[AWS Config]] | 리소스 **구성**의 변화 추적 |
| Bedrock 모델 호출 로깅 | 프롬프트·응답 **내용** 기록 (CloudWatch Logs, S3) |

## 관련
- 비교: [[비교 - 감사·거버넌스 서비스]]
- 이론: [[P10 보안·거버넌스·규정 준수]]
- 덱: 169번 슬라이드

## 셀프 체크
> [!question]- CloudTrail vs Config
> API 호출(누가 무엇을)은 CloudTrail, 리소스 구성 변화는 Config
