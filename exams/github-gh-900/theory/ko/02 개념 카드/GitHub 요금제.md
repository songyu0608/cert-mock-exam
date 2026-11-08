---
aliases: ["Plans", "GitHub Free", "GitHub Pro", "GitHub Team", "GitHub Enterprise", "Enterprise Cloud", "플랜"]
tags: ["gh-900", "개념카드", "도메인1"]
도메인: 1
목표: ["1.4"]
중요도: "중"
---
# GitHub 요금제

> [!summary] 한 줄 정의
> 개인용 Free·Pro, 조직용 Free·Team, Enterprise(Cloud·Server). 상위 요금제일수록 프라이빗 리포지토리 기능, 지원, 보안·인증 통제가 늘어난다.

**English** GitHub's plans

## 시험 트리거
- "프라이빗 리포지토리에서 브랜치 보호를 쓰고 싶다"
- "SAML SSO가 필요하다"
- "internal 리포지토리가 필요하다"

## 핵심
- Free(개인): 공개·비공개 리포지토리 무제한이지만 비공개 리포지토리 기능은 제한, 커뮤니티 지원. Pages는 공개 리포지토리에서만.
- Pro(개인): 비공개 리포지토리에서도 필수 리뷰어, 보호 브랜치, 코드 소유자, 위키, 인사이트 그래프. 이메일 지원.
- Free(조직): 팀 접근 통제. Team: Pro 수준 기능 + 팀 리뷰어, 예약 알림, 보안 개요. 사용자당 과금. GHAS(Code Security·Secret Protection) 추가 구매 가능.
- Enterprise: SAML SSO, SCIM 프로비저닝, internal 리포지토리, 리포지토리 규칙, GitHub Connect. Enterprise Cloud는 99.9% 월간 가동률 SLA, EMU, 감사 로그 스트리밍, IP 허용 목록, 데이터 상주.
- 포함 사용량(Actions·Packages·Codespaces)은 요금제마다 다르고 자주 바뀐다(변동 정보).

## 헷갈리는 개념
| 개념 | 차이 |
|---|---|
| [[GitHub 계정 유형]] | 계정 vs 요금제 |
| [[GitHub Copilot 요금제]] | GitHub 요금제와 Copilot 요금제는 별개 |

## 오답 함정
> [!warning] 오답이 되기 쉬운 선택지
> - GitHub Free 개인 계정의 비공개 리포지토리에서 보호 브랜치·코드 소유자를 쓸 수 있다는 선택지 → Pro 이상(공개 리포지토리는 Free도 가능)
> - SAML SSO를 Team 요금제에서 쓴다는 선택지 → Enterprise

## 관련
- [[GitHub 계정 유형]] · [[브랜치 보호 규칙과 룰셋]] · [[CODEOWNERS]] · [[위키]] · [[GitHub Pages]]

**공식 목표**: [[1 Git과 GitHub 기본 이해#목표 1.4|1.4]]  
**근거**: [GitHub's plans](https://docs.github.com/en/get-started/learning-about-github/githubs-plans) · [Types of GitHub accounts](https://docs.github.com/en/get-started/learning-about-github/types-of-github-accounts)

## 셀프 체크
> [!question]- SAML SSO와 internal 리포지토리를 쓰려면 필요한 요금제는?
> GitHub Enterprise

> [!question]- 99.9% 월간 가동률 SLA와 EMU를 제공하는 요금제는?
> GitHub Enterprise Cloud
