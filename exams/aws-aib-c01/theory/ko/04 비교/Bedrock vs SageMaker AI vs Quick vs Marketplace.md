---
aliases: ["AWS 서비스 비교", "AWS 선택지 스펙트럼"]
tags: ["aib-c01", "비교", "도메인2"]
---
# Bedrock vs SageMaker AI vs Quick vs Marketplace

| | [[Amazon Quick]] | [[AWS Marketplace]] | [[Amazon Bedrock]] | [[Amazon SageMaker AI]] |
|---|---|---|---|---|
| 한 줄 | 바로 쓰는 AI 어시스턴트·BI | 서드 파티 제품·모델 조달 | FM을 API로 써서 생성형 AI 앱 구축 | 사용자 지정 ML 모델 구축·학습·배포 |
| B/B/P | 구매 | 구매 | 구축(관리형) | 구축(자체 모델) |
| 가격 | 사용자 기반 + 일부 종량 | 제품별 | 사용량 기반, 배치, 프로비저닝 | 인스턴스 기반, 절감형 플랜 |
| 범위 매트릭스 | 2 엔터프라이즈 앱 | - | 3 사전 학습 / 4 미세 조정 | 5 자체 학습 |

**스펙트럼**: Quick → Marketplace → Bedrock → SageMaker AI (왼쪽 = 도입 속도, 오른쪽 = 유연성·필요 역량)

> [!important] 시험 포인트
> 관리형으로 요구를 충족하면 우선한다. SageMaker AI는 자체 모델이 정말 필요할 때만.

← [[비교 노트 목록]]
