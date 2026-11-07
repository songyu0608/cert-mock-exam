---
aliases: ["Compliance", "コンプライアンス", "GDPR", "HIPAA", "FedRAMP", "규제 대응"]
tags: ["ccar-p", "개념카드", "도메인5"]
도메인: 5
목표: ["5.4"]
중요도: "상"
---
# 규제 준수(GDPR·HIPAA·FedRAMP)

> [!summary] 한 줄 정의
> 데이터 종류와 규제에 맞는 배포 경로·보존 방식·기능을 고른다. 기능마다 적용 범위가 다르므로 기능 단위로 확인한다.

**日本語** 規制へのコンプライアンス　·　**English** Regulatory compliance (GDPR, HIPAA, FedRAMP)

## 시험 트리거
- "PHI(보호 대상 건강 정보)를 처리한다"
- "정부 기관용 FedRAMP 환경이 필요하다"
- "EU 개인정보를 다룬다"

## 핵심
- HIPAA: 서명된 BAA와 HIPAA 활성 조직이 필요하다. 베타 기능은 명시적으로 적격이 아니면 BAA 대상이 아니고, Claude Code는 HIPAA 준비 범위에 포함되지 않는다.
- PHI는 메시지 내용에만 두고 JSON 스키마 정의(속성 이름, enum 등)에는 넣지 않는다(스키마는 별도로 캐시됨).
- ZDR: 승인된 조직에서 응답 후 프롬프트·응답을 저장하지 않는다. 기능별로 적격 여부가 다르다 → [[데이터 보존(ZDR·HIPAA 준비)]].
- FedRAMP: 공공 부문 FAQ(2026-11 확인) 기준 Anthropic 직접 Claude API는 FedRAMP 인가가 아니므로 FedRAMP 환경이 필요하면 Amazon Bedrock(GovCloud)이나 Google Vertex(Assured Workloads)를 쓴다(변동 정보).
- 〔해석〕 GDPR: 데이터 최소화, 목적 제한, 보존 기간·삭제 요청 대응, 처리 위치를 설계에 반영한다. Anthropic의 GDPR 세부 조항은 이번에 확인하지 못했다.

## 헷갈리는 개념
| 개념 | 차이 |
|---|---|
| [[데이터 보존(ZDR·HIPAA 준비)]] | 규제 판단 vs 보존 기능 세부 |

## 오답 함정
> [!warning] 오답이 되기 쉬운 선택지
> - HIPAA 대상 데이터를 베타 기능으로 처리해도 BAA가 적용된다는 선택지 → 명시된 적격 기능만 대상
> - FedRAMP가 필요한데 직접 API를 그대로 쓰는 선택지 → FedRAMP 인가된 클라우드 경로를 써야 한다(2026-11 기준)

## 관련
- [[데이터 보존(ZDR·HIPAA 준비)]] · [[편향·공정성·투명성]] · [[인증과 인가의 공백]]

**공식 목표**: [[5 거버넌스, 안전, 리스크 관리#목표 5.4|5.4]]  
**근거**: [API and data retention](https://platform.claude.com/docs/en/manage-claude/api-and-data-retention) · [Public sector FAQs](https://support.claude.com/en/articles/13756069-public-sector-faqs)

## 셀프 체크
> [!question]- PHI를 넣으면 안 되는 곳(공식 문서)은?
> JSON 스키마 정의(속성 이름, enum, const, pattern)

> [!question]- FedRAMP 환경이 필요할 때의 경로(2026-11 공공 부문 FAQ)는?
> Amazon Bedrock(GovCloud) 또는 Google Vertex(Assured Workloads)
