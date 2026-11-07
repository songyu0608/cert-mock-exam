---
분류: AI 서비스
파트: 7
도메인: D1
중요도: 상
aliases: [Personalize, 추천]
tags: [서비스, 분류/AI서비스]
---
# Amazon Personalize

> [!summary] 한 줄 정의
> Amazon.com과 같은 기술의 완전 관리형 **개인화 추천** 서비스

## 시험 트리거
| 문제 속 표현 | 정답 |
|---|---|
| 사용자별 상품·콘텐츠 추천 | **Personalize** |
| 편집자가 고른 목록을 사용자별로 재정렬 | **GetPersonalizedRanking** |
| 실시간 사용자 행동 반영 | **PutEvents** |
| 앞으로의 수요 예측 | [[Amazon Forecast]] |

## 주요 기능
**데이터**
- 구매, 평점, 노출, 장바구니, 카탈로그, 사용자 인구통계 (S3 또는 API)
- 스키마는 Avro 형식

**API·기능**
- GetRecommendations(추천·유사 항목), GetPersonalizedRanking(개인화 순위)
- 실시간·배치 추천, **콜드 스타트** 대응, 컨텍스트 추천
- 비즈니스 규칙·필터, 프로모션, 유사 항목·인기 항목, 사용자 세분화

**최신 유지·보안**
- 증분 가져오기, PutEvents, 재훈련 = 새 솔루션 버전 (기본 2시간마다, 주 1회 FULL 권장)
- KMS 암호화, TLS 1.2, IAM, S3 버킷 정책, CloudWatch·CloudTrail

## 헷갈리는 서비스
| 비교 대상 | 차이 |
|---|---|
| [[Amazon Forecast]] | 시계열 수치 예측. Personalize는 사용자별 추천 |

## 관련
- 이론: [[P07 고수준 AI 서비스]]
- 덱: 125~127번 슬라이드

## 셀프 체크
> [!question]- Forecast vs Personalize
> 앞으로의 수요 예측은 Forecast, 사용자별 추천은 Personalize
