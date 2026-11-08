---
aliases: ["Copilot policies", "Copilot 정책", "조직 전체 Copilot 정책", "모델 정책"]
tags: ["gh-900", "기능카드", "도메인6"]
도메인: 6
목표: ["6.3", "4.3"]
중요도: "상"
---
# Copilot 정책 관리

> [!summary] 한 줄 정의
> Copilot Business·Enterprise 조직의 소유자가 Copilot 기능, 모델, MCP 서버, 미리 보기 기능을 조직 전체에 켜고 끄는 정책. 엔터프라이즈 정책이 우선한다.

**English** Organization-wide Copilot policy management

## 시험 트리거
- "회사가 특정 AI 모델 사용을 막고 싶다"
- "미리 보기 기능을 조직에서 쓰지 않게"
- "엔터프라이즈 설정과 조직 설정이 충돌"

## 핵심
- 누가: Copilot Business 또는 Enterprise 요금제 조직의 소유자.
- Settings > Copilot > Policies: 기능 가용성과 개인정보 관련 정책.
- Settings > Copilot > Models: 기본 모델 외 모델 접근 허용(추가 비용 가능).
- MCP 서버 정책, 미리 보기·피드백 수집 참여 여부.
- 엔터프라이즈 소유자가 정책을 정하면(전체 허용, 전체 차단, 선택 조직만 허용) 조직 소유자는 덮어쓸 수 없다.
- 클라우드 에이전트도 Business·Enterprise에서는 관리자가 정책을 켜야 쓸 수 있다.

## 헷갈리는 개념
| 개념 | 차이 |
|---|---|
| [[GitHub Copilot 요금제]] | 요금제 차이 vs 그 요금제에서 쓰는 관리 기능 |

## 오답 함정
> [!warning] 오답이 되기 쉬운 선택지
> - 조직 소유자가 엔터프라이즈 정책을 무시하고 기능을 켤 수 있다는 선택지 → 엔터프라이즈 정책이 우선
> - 개인용 Copilot Pro 사용자의 설정을 조직 정책으로 관리한다는 선택지 → 조직 정책은 Business·Enterprise 좌석 대상

## 관련
- [[GitHub Copilot 요금제]] · [[GitHub Copilot 기능]] · [[EMU(Enterprise Managed Users)]] · [[조직 역할]]

**공식 목표**: [[6 개인정보 보호, 보안, 관리 이해#목표 6.3|6.3]] · [[4 최신 개발 방식 적용#목표 4.3|4.3]]  
**근거**: [Managing Copilot policies for an organization](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-organization/manage-policies) · [About Copilot cloud agent](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-cloud-agent)

## 셀프 체크
> [!question]- Copilot 조직 정책을 설정할 수 있는 사람은?
> Copilot Business·Enterprise 조직의 소유자

> [!question]- 엔터프라이즈 정책과 조직 정책이 다르면?
> 엔터프라이즈 정책이 우선(조직이 덮어쓸 수 없음)
