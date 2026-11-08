---
aliases: ["REST API", "Copilot user management API", "좌석 관리", "Seat management", "구독 관리"]
tags: ["gh-300", "기능카드", "도메인2"]
도메인: 2
목표: ["2.15"]
중요도: "중"
---
# Copilot 사용자 관리 REST API

> [!summary] 한 줄 정의
> 조직 소유자가 REST API로 Copilot 구독 정보를 보고, 사용자·팀에 좌석을 부여·취소하는 기능.

**English** Managing Copilot subscriptions with the REST API

## 시험 트리거
- "인사 시스템과 연동해 입사자에게 Copilot 좌석 자동 부여"
- "좌석별 최근 활동 확인"

## 핵심
- GET /orgs/{org}/copilot/billing: 구독 정보, 좌석 현황, 기능 정책.
- GET /orgs/{org}/copilot/billing/seats: 좌석 목록과 최근 활동.
- POST·DELETE /orgs/{org}/copilot/billing/selected_users: 사용자 좌석 부여·취소(취소는 "pending cancellation"으로 표시).
- POST·DELETE /orgs/{org}/copilot/billing/selected_teams: 팀 구성원 전체 좌석 부여·취소.
- GET /orgs/{org}/members/{username}/copilot: 한 구성원의 좌석·사용 정보.
- 권한: 조직 소유자만. 클래식 토큰 범위 manage_billing:copilot(또는 읽기 read:org, 쓰기 admin:org). Business·Enterprise 구독 필요. 팀으로 부여된 좌석은 사용자 단위로 취소할 수 없다.
- 이 엔드포인트들은 공개 미리 보기로 표시되어 있다(변동 정보).

## 헷갈리는 개념
| 개념 | 차이 |
|---|---|
| [[Copilot 감사 로그]] | 조회·변경 실행 vs 변경 이력 |

## 오답 함정
> [!warning] 오답이 되기 쉬운 선택지
> - DELETE 호출 즉시 좌석이 사라진다는 선택지 → pending cancellation으로 표시
> - 팀으로 받은 좌석을 사용자 단위로 취소한다는 선택지 → 불가, 팀에서 빼야 한다〔해석〕

## 관련
- [[조직 Copilot 정책]] · [[Copilot 감사 로그]] · [[Copilot 요금제]]

**공식 목표**: [[2 GitHub Copilot 기능 사용#목표 2.15|2.15]]  
**근거**: [REST API endpoints for Copilot user management](https://docs.github.com/en/rest/copilot/copilot-user-management)

## 셀프 체크
> [!question]- 사용자에게 Copilot 좌석을 부여하는 엔드포인트는?
> POST /orgs/{org}/copilot/billing/selected_users

> [!question]- Copilot 좌석 관리에 필요한 클래식 토큰 범위는?
> manage_billing:copilot
