---
aliases: ["ZDR", "Zero data retention", "HIPAA readiness", "BAA", "データ保持"]
tags: ["ccar-p", "레퍼런스", "도메인5"]
도메인: 5
목표: ["5.4"]
중요도: "중"
---
# 데이터 보존(ZDR·HIPAA 준비)

> [!summary] 한 줄 정의
> Claude API는 ZDR(응답 후 저장하지 않음)과 HIPAA 준비(BAA 기반 보호) 두 가지 데이터 처리 방식을 제공하며, 기능마다 적격 여부가 다르다.

**日本語** データ保持（ZDR、HIPAA）　·　**English** API data retention (ZDR, HIPAA readiness)

## 시험 트리거
- "프롬프트를 저장하면 안 되는 고객"
- "PHI를 처리해야 한다"
- "이 기능이 ZDR 대상인가"

## 핵심
- ZDR: 응답 반환 후 프롬프트·응답을 저장하지 않는다. 조직 단위로 영업팀을 통해 활성화하며, 적격 기능만 적용된다(예: 코드 실행은 대상 아님).
- ZDR 조직은 브라우저에서 API를 직접 호출할 수 없다(CORS 거부) → 자체 백엔드 경유.
- HIPAA 준비: 서명된 BAA + HIPAA 활성 조직. 암호화·접근 통제·감사 로그로 PHI를 보호한다. PHI를 다루면 ZDR을 따로 쓸 필요 없다.
- 대상 아님: Claude Code, Console에서 PHI 처리, 명시적으로 적격이 아닌 베타 기능.
- 보존된 데이터는 명시적 허락 없이 모델 학습에 쓰지 않는다(공식 문서의 원칙).

## 헷갈리는 개념
| 개념 | 차이 |
|---|---|
| [[규제 준수(GDPR·HIPAA·FedRAMP)]] | 규제 판단 전체 vs API 보존 방식 |

## 오답 함정
> [!warning] 오답이 되기 쉬운 선택지
> - ZDR이면 모든 API 기능이 저장되지 않는다는 선택지 → 기능별 적격 여부를 확인
> - Claude Code도 HIPAA 준비 범위에 포함된다는 선택지 → 포함되지 않는다

## 관련
- [[규제 준수(GDPR·HIPAA·FedRAMP)]] · [[MCP 커넥터]]

**공식 목표**: [[5 거버넌스, 안전, 리스크 관리#목표 5.4|5.4]]  
**근거**: [API and data retention](https://platform.claude.com/docs/en/manage-claude/api-and-data-retention)

## 셀프 체크
> [!question]- ZDR 조직이 브라우저에서 API를 직접 호출할 수 없는 이유는?
> API가 CORS 요청을 거부한다(백엔드 경유 필요)

> [!question]- HIPAA 준비의 전제 조건은?
> 서명된 BAA와 HIPAA 활성 조직
