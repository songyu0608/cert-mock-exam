---
aliases: ["Copilot plans", "Copilot Free", "Copilot Pro", "Copilot Pro+", "Copilot Business", "Copilot Enterprise", "Copilot for Individuals", "개인용 Copilot"]
tags: ["gh-900", "기능카드", "도메인4"]
도메인: 4
목표: ["4.3"]
중요도: "상"
---
# GitHub Copilot 요금제

> [!summary] 한 줄 정의
> 개인용(Free·Pro 등)은 개인이 구독하고, Business는 조직·엔터프라이즈가 사용자별로 구매해 중앙 관리·정책을 쓰며, Enterprise는 GitHub Enterprise Cloud용 상위 요금제다.

**English** Copilot for Individuals vs Business vs Enterprise

## 시험 트리거
- "회사가 직원 Copilot을 중앙에서 관리"
- "개인 개발자가 혼자 구독"
- "Enterprise Cloud 고객이 가장 넓은 기능을 원한다"

## 핵심
- 개인용: Free(무료, 자동 모델 선택, 월 2,000회 완성 제한), Pro($10/월), Pro+($39/월) 등. 조직을 통한 Copilot이 없는 개인이 구독.
- Business: 사용자(좌석)당 $19/월. 조직과 엔터프라이즈가 구매. 조직 구성원의 중앙 관리와 Copilot 정책 제어.
- Enterprise: 좌석당 $39/월. GitHub Enterprise Cloud를 쓰는 엔터프라이즈 대상. 기능별 차이의 세부는 요금제 문서에서 자주 바뀌어 이 볼트는 다루지 않는다.
- 관리 기능(정책, 접근 관리, 사용 데이터, 감사 로그, 파일 제외)은 Business·Enterprise의 조직·엔터프라이즈 소유자용.
- 가격·포함 사용량·요금제 이름은 자주 바뀐다. 위 값은 2026-11 문서 기준(변동 정보). Copilot은 GitHub Enterprise Server에서 제공되지 않는다.

## 헷갈리는 개념
| 개념 | 차이 |
|---|---|
| [[GitHub 요금제]] | GitHub 요금제(Free·Team·Enterprise)와 Copilot 요금제는 별개 |
| [[Copilot 정책 관리]] | 요금제 차이 중 핵심이 중앙 정책 관리 |

## 오답 함정
> [!warning] 오답이 되기 쉬운 선택지
> - 개인용 Pro 구독으로 조직 전체 Copilot 정책을 관리한다는 선택지 → 조직 정책 관리는 Business·Enterprise
> - Copilot Enterprise는 Team 요금제 조직도 쓸 수 있다는 선택지 → GitHub Enterprise Cloud 대상

## 관련
- [[GitHub Copilot 기능]] · [[Copilot 정책 관리]] · [[GitHub 요금제]] · [[Copilot 요금제 비교]]

**공식 목표**: [[4 최신 개발 방식 적용#목표 4.3|4.3]]  
**근거**: [Plans for GitHub Copilot](https://docs.github.com/en/copilot/get-started/plans) · [GitHub Copilot features](https://docs.github.com/en/copilot/get-started/features)

## 셀프 체크
> [!question]- 조직 구성원 Copilot을 중앙 관리·정책 제어하는 최소 요금제는?
> Copilot Business

> [!question]- Copilot Enterprise의 대상은?
> GitHub Enterprise Cloud를 쓰는 엔터프라이즈
