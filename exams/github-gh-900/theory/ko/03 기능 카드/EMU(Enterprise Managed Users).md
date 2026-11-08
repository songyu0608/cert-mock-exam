---
aliases: ["EMU", "Enterprise Managed Users", "관리형 사용자", "Managed user accounts", "IdP", "SCIM"]
tags: ["gh-900", "기능카드", "도메인6"]
도메인: 6
목표: ["6.3", "1.4"]
중요도: "상"
---
# EMU(Enterprise Managed Users)

> [!summary] 한 줄 정의
> 엔터프라이즈가 외부 IdP로 GitHub 사용자 계정의 생성·인증·프로필·조직 멤버십·리포지토리 접근을 직접 관리하는 Enterprise Cloud 기능.

**English** Enterprise Managed Users

## 시험 트리거
- "퇴사자 계정을 IdP에서 끄면 GitHub 접근도 즉시 끊기게"
- "회사 계정이 외부 공개 활동을 못 하게"
- "사용자 이름과 프로필을 회사가 관리"

## 핵심
- IdP가 사용자 계정을 프로비저닝하고, 사용자는 IdP로 로그인해 엔터프라이즈 리소스에 접근.
- IdP가 사용자 이름, 프로필, 조직 멤버십, 리포지토리 접근을 관리. 사용자는 GitHub에서 프로필 이름·이메일을 바꿀 수 없다.
- 제약: 관리형 계정은 공개 콘텐츠를 만들 수 없고 엔터프라이즈 밖과 협업할 수 없다(비공개 리포지토리는 만들 수 있음).
- 지원 파트너 IdP: Entra ID, Okta, PingFederate. OIDC SSO면 IdP 조건부 접근 정책(CAP)을 확인.
- GitHub Enterprise Cloud 요금제 기능 → [[GitHub 요금제]].

## 헷갈리는 개념
| 개념 | 차이 |
|---|---|
| [[GitHub 계정 유형]] | 개인 계정(스스로 생성) vs 관리형 사용자 계정(엔터프라이즈가 생성) |
| [[Copilot 정책 관리]] | 6.3의 다른 축: 계정 통제 vs AI 도구 통제 |

## 오답 함정
> [!warning] 오답이 되기 쉬운 선택지
> - EMU 사용자가 오픈 소스 공개 리포지토리에 기여할 수 있다는 선택지 → 엔터프라이즈 밖 협업과 공개 콘텐츠 생성 불가
> - EMU를 Team 요금제에서 쓴다는 선택지 → Enterprise Cloud

## 관련
- [[GitHub 계정 유형]] · [[GitHub 요금제]] · [[Copilot 정책 관리]] · [[2단계 인증과 패스키]]

**공식 목표**: [[6 개인정보 보호, 보안, 관리 이해#목표 6.3|6.3]] · [[1 Git과 GitHub 기본 이해#목표 1.4|1.4]]  
**근거**: [About Enterprise Managed Users](https://docs.github.com/en/enterprise-cloud@latest/admin/managing-iam/understanding-iam-for-enterprises/about-enterprise-managed-users) · [Types of GitHub accounts](https://docs.github.com/en/get-started/learning-about-github/types-of-github-accounts) · [GitHub's plans](https://docs.github.com/en/get-started/learning-about-github/githubs-plans)

## 셀프 체크
> [!question]- EMU에서 계정을 만들고 관리하는 주체는?
> 외부 ID 공급자(IdP)

> [!question]- EMU 관리형 계정이 할 수 없는 것 2가지는?
> 공개 콘텐츠 생성, 엔터프라이즈 밖 협업
