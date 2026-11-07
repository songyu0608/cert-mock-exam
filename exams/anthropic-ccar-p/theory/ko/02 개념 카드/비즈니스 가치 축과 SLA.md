---
aliases: ["Business value pillars", "ビジネス価値の柱", "가치 축", "SLA"]
tags: ["ccar-p", "개념카드", "도메인1"]
도메인: 1
목표: ["1.6", "6.3"]
중요도: "상"
---
# 비즈니스 가치 축과 SLA

> [!summary] 한 줄 정의
> 솔루션을 효율성·변혁·생산성·비용·성능 SLA라는 가치 축에 맞춰 설계하고 설명한다(안내서의 5개 축).

**日本語** ビジネス価値の柱　·　**English** Business value pillars (efficiency, transformation, productivity, cost, performance SLAs)

## 시험 트리거
- "경영진에게 투자 가치를 설명"
- "어떤 가치 축을 우선할지"
- "응답 시간 SLA를 약속해야 한다"

## 핵심
- 안내서가 든 가치 축 5개: 효율성(efficiency), 변혁(transformation), 생산성(productivity), 비용(cost), 성능 SLA(performance SLAs).
- 〔해석〕 효율성·생산성은 같은 일을 더 빠르게, 변혁은 이전에 불가능했던 일을 가능하게 하는 쪽이다.
- 〔해석〕 비용 축은 모델 선택·캐싱·배치 같은 기술 레버와 연결된다 → [[비용·지연 최적화 레버]].
- 〔해석〕 성능 SLA는 측정 가능한 지표(지연, 가용성, 처리량)로 정한다. LLM 출력 품질은 비결정적이므로 평가 지표 기반으로 합의한다 → [[기대치 정렬과 SLA 관리]].
- Message Batches API의 24시간은 만료 시한이지 SLA가 아니다(공식 문서) → [[Message Batches API]].

## 헷갈리는 개념
| 개념 | 차이 |
|---|---|
| [[기대치 정렬과 SLA 관리]] | 가치 축은 설계 방향, SLA 관리는 이해관계자와의 합의·운영 |

## 오답 함정
> [!warning] 가치 축을 하나만 극대화하는 선택지(예: 비용만 최소화) → 성능 SLA나 품질을 해치면 오답

## 관련
- [[기대치 정렬과 SLA 관리]] · [[비용·지연 최적화 레버]] · [[비즈니스 문제 정의와 성공 기준]]

**공식 목표**: [[1 솔루션 설계와 아키텍처#목표 1.6|1.6]] · [[6 이해관계자 커뮤니케이션과 라이프사이클 관리#목표 6.3|6.3]]  
**근거**: CCAR-P 시험 가이드 v1.0 · [Batch processing](https://platform.claude.com/docs/en/build-with-claude/batch-processing)

## 셀프 체크
> [!question]- 안내서가 든 비즈니스 가치 축 5개는?
> 효율성, 변혁, 생산성, 비용, 성능 SLA
