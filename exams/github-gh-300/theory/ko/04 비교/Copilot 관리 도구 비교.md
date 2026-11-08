---
aliases: ["Admin tools comparison"]
tags: ["gh-300", "비교", "도메인2"]
---
# Copilot 관리 도구 비교

| 필요 | 도구 |
|---|---|
| 기능 on/off, 모델, MCP 허용 | [[조직 Copilot 정책]](Settings → Copilot → Policies·Models) |
| 특정 파일·리포지토리 제외 | [[콘텐츠 제외]] |
| 누가 언제 정책·라이선스를 바꿨나 | [[Copilot 감사 로그]](`action:copilot`, 180일) |
| 좌석 부여·취소 자동화, 좌석 활동 조회 | [[Copilot 사용자 관리 REST API]] |
| 사용·수락 현황 | 사용 데이터(사용량 지표), Learn의 지표 API |
| 개인이 바꾸는 설정 | [[개인 Copilot 설정]] |

> [!question]- 인사 시스템 입사 이벤트에 맞춰 Copilot 좌석을 자동 부여하고 싶다.
> REST API `POST /orgs/{org}/copilot/billing/selected_users`.

> [!question]- 지난달 누가 Copilot 정책을 바꿨는지 알고 싶다.
> 감사 로그(`action:copilot`).

← [[비교 노트 목록]]
