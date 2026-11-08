---
aliases: ["Copilot policies", "조직 정책", "기능 가용성", "Feature availability", "Models 정책", "미리 보기 기능 옵트인"]
tags: ["gh-300", "기능카드", "도메인2"]
도메인: 2
목표: ["2.13"]
중요도: "상"
---
# 조직 Copilot 정책

> [!summary] 한 줄 정의
> 조직 소유자가 Settings > Copilot에서 기능 사용 여부, 개인정보 관련 동작, 모델, MCP 등을 정책으로 정하는 것. 엔터프라이즈 정책이 우선한다.

**English** Organization-wide Copilot policy management

## 시험 트리거
- "조직 구성원이 IDE에서 에이전트 모드를 못 쓰게"
- "Copilot 코드 리뷰를 조직 전체에 켜기"
- "미리 보기 기능 사용 허용"

## 핵심
- 위치: 조직 Settings → Code, planning, and automation → Copilot → Policies(개인정보·기능 가용성), Models(기본 외 모델, 추가 비용 가능).
- 정책 예: MCP servers in Copilot(기본 꺼짐), Copilot in GitHub.com(켜면 사용자 피드백 수집 옵트인, 미리 보기 기능 옵트인 선택 가능).
- Copilot 코드 리뷰를 켜면 라이선스 없는 구성원도 쓸 수 있다 → [[Copilot 코드 리뷰]].
- 관리자가 IDE 채팅·에이전트 모드를 끄면 사용자는 쓸 수 없다.
- 엔터프라이즈 소유자가 정책을 정하면 조직 소유자는 덮어쓸 수 없다.
- Business·Enterprise의 관리 기능: 정책 관리, 접근 관리, 사용 데이터, 감사 로그, 파일 제외.
- 정책 이름과 선택지 세부는 자주 바뀐다(변동 정보).

## 헷갈리는 개념
| 개념 | 차이 |
|---|---|
| [[개인 Copilot 설정]] | 조직이 강제 vs 개인이 선택(조직 좌석이면 상속) |
| [[콘텐츠 제외]] | 기능 on/off vs 파일 제외 |

## 오답 함정
> [!warning] 오답이 되기 쉬운 선택지
> - 조직 소유자가 엔터프라이즈 정책을 조직 수준에서 덮어쓴다는 선택지 → 엔터프라이즈 정책이 우선
> - 개인 Pro 구독자도 조직 정책 화면을 쓴다는 선택지 → 조직 정책은 Business·Enterprise

## 관련
- [[Copilot 코드 리뷰]] · [[MCP]] · [[Copilot 감사 로그]] · [[Copilot 사용자 관리 REST API]] · [[개인 Copilot 설정]] · [[Copilot 요금제]]

**공식 목표**: [[2 GitHub Copilot 기능 사용#목표 2.13|2.13]]  
**근거**: [Managing policies and features for Copilot in your organization](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-organization/manage-policies) · [GitHub Copilot features](https://docs.github.com/en/copilot/get-started/features) · [Using GitHub Copilot code review](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/request-a-code-review/use-code-review) · [About Model Context Protocol (MCP)](https://docs.github.com/en/copilot/concepts/context/mcp) · [Asking GitHub Copilot questions in your IDE](https://docs.github.com/en/copilot/how-tos/chat-with-copilot/chat-in-ide)

## 셀프 체크
> [!question]- 조직 Copilot 정책 위치는?
> 조직 Settings → Copilot → Policies / Models

> [!question]- 엔터프라이즈와 조직 정책이 다르면?
> 엔터프라이즈 정책이 우선
