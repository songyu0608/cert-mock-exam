---
분류: 보안·거버넌스
파트: [5, 10]
도메인: D5
중요도: 상
aliases: [KMS, Key Management Service, 고객 관리형 키, CMK]
tags: [서비스, 분류/보안]
---
# AWS KMS

> [!summary] 한 줄 정의
> 데이터 **암호화 키를 생성·관리**하는 서비스. 저장 데이터 암호화의 기본

## 시험 트리거
| 문제 속 표현 | 정답 |
|---|---|
| 저장 데이터 암호화, 키를 직접 통제 | **KMS 고객 관리형 키** |
| Bedrock 사용자 지정 모델·S3 훈련 데이터 암호화 | **KMS** (SSE-KMS) |
| 전송 중 암호화용 인증서 | AWS Certificate Manager(ACM) |

## 주요 기능
- AWS 관리형 키, 고객 관리형 키(CMK)
- S3, Bedrock, SageMaker, Personalize 등 대부분의 서비스와 통합
- 심층 방어 1층(데이터 보호): KMS, ACM, Private CA, PrivateLink, Network Firewall

## 헷갈리는 서비스
| 비교 대상 | 차이 |
|---|---|
| [[Amazon Macie]] | 민감 데이터 **탐지**. KMS는 **암호화** |
| [[AWS PrivateLink]] | 네트워크 경로 보호 |

## 관련
- 비교: [[비교 - 보안 서비스]]
- 이론: [[P10 보안·거버넌스·규정 준수]], [[P05 파운데이션 모델과 Bedrock]]
- 덱: 92, 160~161번 슬라이드

## 셀프 체크
> [!question]- 저장 시 암호화 vs 전송 중 암호화 대표 서비스는?
> 저장 시 KMS, 전송 중 TLS·ACM
