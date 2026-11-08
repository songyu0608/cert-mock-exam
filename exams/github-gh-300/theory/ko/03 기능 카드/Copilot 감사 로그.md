---
aliases: ["Audit log", "감사 로그 이벤트", "action:copilot"]
tags: ["gh-300", "기능카드", "도메인2"]
도메인: 2
목표: ["2.14"]
중요도: "중"
---
# Copilot 감사 로그

> [!summary] 한 줄 정의
> 엔터프라이즈 감사 로그에서 Copilot 설정·정책 변경, 라이선스 부여·회수, 에이전트 활동을 조회하는 기능. 로컬 프롬프트 같은 클라이언트 세션 데이터는 없다.

**English** Copilot audit log events

## 시험 트리거
- "누가 언제 Copilot 정책을 바꿨나"
- "새 사용자에게 언제 라이선스가 부여됐나"
- "개발자가 입력한 프롬프트를 감사 로그로 보고 싶다"

## 핵심
- 담는 것: Copilot 요금제 관련 설정·정책 변경, 사용자의 라이선스 부여·회수, GitHub 웹의 에이전트 활동.
- 없는 것: 클라이언트 세션 데이터(예: 로컬에서 보낸 프롬프트). 필요하면 별도 솔루션(예: CLI 훅으로 자체 로깅).
- 검색: `action:copilot`(전체), `action:copilot.cfb_seat_assignment_created`(좌석 부여), `actor:Copilot`(에이전트 활동).
- 보존: 최근 180일. 더 길게 보관하려면 SIEM으로 스트리밍.
- 열람: 엔터프라이즈 소유자, "Read enterprise audit logs" 사용자 지정 역할. Business·Enterprise 필요.

## 헷갈리는 개념
| 개념 | 차이 |
|---|---|
| [[Copilot 사용자 관리 REST API]] | 변경 이력 조회 vs 좌석 부여·조회 실행 |

## 오답 함정
> [!warning] 감사 로그에서 개발자의 프롬프트 내용을 볼 수 있다는 선택지 → 클라이언트 세션 데이터는 포함되지 않는다

## 관련
- [[조직 Copilot 정책]] · [[Copilot 사용자 관리 REST API]] · [[데이터 사용·보존]]

**공식 목표**: [[2 GitHub Copilot 기능 사용#목표 2.14|2.14]]  
**근거**: [Reviewing audit logs for Copilot Business](https://docs.github.com/en/enterprise-cloud@latest/copilot/managing-copilot/managing-github-copilot-in-your-organization/reviewing-activity-related-to-github-copilot-in-your-organization/reviewing-audit-logs-for-copilot-business)

## 셀프 체크
> [!question]- Copilot 관련 감사 로그 이벤트를 모두 찾는 검색어는?
> action:copilot

> [!question]- 감사 로그 보존 기간은?
> 최근 180일
