---
aliases: ["개인 계정", "Personal account", "조직", "Organization", "엔터프라이즈", "Enterprise account", "관리형 사용자 계정"]
tags: ["gh-900", "개념카드", "도메인1"]
도메인: 1
목표: ["1.4", "6.5"]
중요도: "상"
---
# GitHub 계정 유형

> [!summary] 한 줄 정의
> 사용자 계정(사람의 신원), 조직 계정(여러 사람의 공유 공간), 엔터프라이즈 계정(여러 조직의 정책·결제를 중앙 관리) 세 가지.

**English** Types of GitHub accounts

## 시험 트리거
- "회사 프로젝트를 여러 팀이 함께 관리"
- "여러 조직의 정책과 결제를 한곳에서"
- "조직 계정으로 로그인"

## 핵심
- 사용자 계정: 모든 사람은 사용자 계정으로 로그인하고, 활동은 그 계정에 기록된다. 개인 계정은 GitHub Free 또는 Pro. 자동화용 "머신 사용자"도 가능.
- 관리형 사용자 계정: GitHub Enterprise Cloud에서 엔터프라이즈가 만든다 → [[EMU(Enterprise Managed Users)]].
- 조직 계정: 여러 프로젝트에서 협업하는 공유 계정. 조직에는 로그인할 수 없고, 구성원은 각자의 사용자 계정으로 로그인한다. 한 사람이 여러 조직에 다른 역할로 속할 수 있다.
- 조직은 리포지토리를 최대 100,000개 소유할 수 있다. 중첩 팀으로 구조를 표현한다 → [[팀]].
- 엔터프라이즈 계정: GitHub Enterprise Cloud·Server에서 여러 조직의 정책과 결제를 중앙 관리하고, 조직 간 이너소싱을 가능하게 한다.

## 헷갈리는 개념
| 개념 | 차이 |
|---|---|
| [[GitHub 요금제]] | 계정 유형 vs 그 계정에 붙는 요금제 |
| [[조직 역할]] | 조직 안의 권한 구분 |

## 오답 함정
> [!warning] 조직 계정에 직접 로그인해 작업한다는 선택지 → 조직에는 로그인할 수 없다

## 관련
- [[GitHub 요금제]] · [[조직 역할]] · [[팀]] · [[EMU(Enterprise Managed Users)]]

**공식 목표**: [[1 Git과 GitHub 기본 이해#목표 1.4|1.4]] · [[6 개인정보 보호, 보안, 관리 이해#목표 6.5|6.5]]  
**근거**: [Types of GitHub accounts](https://docs.github.com/en/get-started/learning-about-github/types-of-github-accounts)

## 셀프 체크
> [!question]- 조직 계정에 로그인할 수 있나?
> 없다. 구성원은 각자의 사용자 계정으로 로그인한다

> [!question]- 여러 조직의 정책·결제를 중앙에서 관리하는 계정은?
> 엔터프라이즈 계정
