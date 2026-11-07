---
aliases: ["Expectation alignment", "期待値の調整", "SLA", "Stakeholder feedback", "フィードバックループ"]
tags: ["ccar-p", "개념카드", "도메인6"]
도메인: 6
목표: ["6.3", "1.6"]
중요도: "상"
---
# 기대치 정렬과 SLA 관리

> [!summary] 한 줄 정의
> LLM의 확률적 특성을 이해관계자와 미리 공유하고, 측정 가능한 지표로 SLA를 합의하며, 피드백을 정기적으로 반영한다.

**日本語** フィードバックループと期待値の調整（SLAを含む）　·　**English** Stakeholder feedback loops and expectation alignment (including SLAs)

## 시험 트리거
- "100% 정확해야 한다는 요구"
- "배치 처리를 24시간 SLA로 약속하려 한다"
- "사용자 불만이 개선에 반영되지 않는다"

## 핵심
- 할루시네이션은 완화 기법으로도 완전히 없앨 수 없다(공식 문서) → 무오류 약속 대신 허용 오류율·사람 검토 범위를 합의한다.
- Message Batches API의 24시간은 처리가 끝나지 않으면 만료되는 시한이다. 대부분 1시간 안에 끝나지만 수요에 따라 느려질 수 있다 → 보장 SLA로 쓰면 안 된다.
- 〔해석〕 SLA 후보: 지연(p95), 가용성, 처리량, 평가 지표 기준 품질. 각 지표의 측정 방법을 함께 적는다.
- 〔해석〕 피드백 루프: 사용자 피드백·모니터링 결과 → 평가셋 추가 → 개선 → 이해관계자 보고를 주기적으로 돈다.

## 헷갈리는 개념
| 개념 | 차이 |
|---|---|
| [[비즈니스 가치 축과 SLA]] | 설계 방향 vs 합의·운영 |

## 오답 함정
> [!warning] 오답이 되기 쉬운 선택지
> - 배치 API의 24시간을 처리 완료 보장으로 고객에게 약속하는 선택지 → 만료 시한이지 SLA가 아니다
> - "할루시네이션 0%"를 약속하는 선택지 → 공식 문서상 완전 제거는 불가

## 관련
- [[비즈니스 가치 축과 SLA]] · [[Message Batches API]] · [[할루시네이션 완화]] · [[관측 가능성과 모니터링]]

**공식 목표**: [[6 이해관계자 커뮤니케이션과 라이프사이클 관리#목표 6.3|6.3]] · [[1 솔루션 설계와 아키텍처#목표 1.6|1.6]]  
**근거**: [Batch processing](https://platform.claude.com/docs/en/build-with-claude/batch-processing) · [Reduce hallucinations](https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations)

## 셀프 체크
> [!question]- Batches API의 24시간은 무엇인가?
> 처리가 끝나지 않으면 배치가 만료되는 시한(완료 보장 SLA가 아님)
