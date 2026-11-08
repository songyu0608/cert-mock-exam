---
aliases: ["Copilot plans", "Copilot Free", "Copilot Pro", "Copilot Pro+", "Copilot Business", "Copilot Enterprise", "AI 크레딧"]
tags: ["gh-300", "기능카드", "도메인2"]
도메인: 2
목표: ["2.13", "2.1"]
중요도: "중"
---
# Copilot 요금제

> [!summary] 한 줄 정의
> 개인용(Free, Pro, Pro+, Max 등)은 개인이, Business·Enterprise는 조직·엔터프라이즈가 좌석 단위로 구매해 중앙 관리·정책을 쓴다.

**English** GitHub Copilot plans

## 시험 트리거
- "회사가 직원 Copilot을 중앙에서 관리"
- "무료로 써 보고 싶다"
- "관리 기능(정책·감사 로그·콘텐츠 제외)이 필요"

## 핵심
- 개인용: Free(월 완성 2,000회 등 제한), Pro($10/월), Pro+($39/월), Max($100/월). 2026-11 문서 기준(변동 정보).
- Business: 좌석당 $19/월, 조직·엔터프라이즈. Enterprise: 좌석당 $39/월, GitHub Enterprise Cloud.
- 관리 기능(정책, 접근 관리, 사용 데이터, 감사 로그, 콘텐츠 제외)은 Business·Enterprise.
- 사용량은 AI 크레딧으로 계산된다(처리 토큰 기준, 변동 정보).
- GitHub Enterprise Server에서는 Copilot을 제공하지 않는다(GH-900 조사 기준).

## 헷갈리는 개념
| 개념 | 차이 |
|---|---|
| [[조직 Copilot 정책]] | 요금제 차이의 핵심은 중앙 관리 |

## 오답 함정
> [!warning] 콘텐츠 제외를 개인 Pro에서 설정한다는 선택지 → Business·Enterprise 관리 기능

## 관련
- [[조직 Copilot 정책]] · [[콘텐츠 제외]] · [[Copilot 감사 로그]] · [[Copilot 사용자 관리 REST API]]

**공식 목표**: [[2 GitHub Copilot 기능 사용#목표 2.13|2.13]] · [[2 GitHub Copilot 기능 사용#목표 2.1|2.1]]  
**근거**: [Plans for GitHub Copilot](https://docs.github.com/en/copilot/get-started/plans) · [GitHub Copilot features](https://docs.github.com/en/copilot/get-started/features) · [About GitHub Copilot CLI](https://docs.github.com/en/copilot/concepts/agents/about-copilot-cli)

## 셀프 체크
> [!question]- 콘텐츠 제외·감사 로그 같은 관리 기능이 있는 요금제는?
> Copilot Business, Copilot Enterprise
