---
aliases: ["Configuration variables", "vars 컨텍스트", "변수", "Variables"]
tags: ["gh-200", "기능카드", "도메인4"]
도메인: 4
목표: ["4.8", "4.9"]
중요도: "중"
---
# 구성 변수(vars)

> [!summary] 한 줄 정의
> 구성 변수는 민감하지 않은 설정값을 조직·리포지토리·환경 수준에 저장하고 `${{ vars.NAME }}`으로 읽는 기능이다.

**English** Configuration variables

## 시험 트리거
- "배포 대상 URL을 리포 설정으로 관리"
- "환경마다 다른 비민감 값"

## 핵심
- 이름 규칙은 비밀과 같다(GITHUB_·숫자 시작 불가, 대소문자 구분 없음).
- 우선순위: 환경 > 리포지토리 > 조직(낮은 수준이 이김).
- 한도: 변수당 48 KB, 조직 1,000, 리포 500, 환경 100. 실행당 리포+조직 변수 합 256 KB(환경 변수는 제외).
- 재사용 워크플로에서는 호출자 리포지토리의 변수를 쓴다.
- 환경 수준 변수는 작업이 시작된 뒤에만 쓸 수 있다.
- 비밀처럼 마스킹되지 않는다〔해석: 비민감 값용〕 → 민감 값은 비밀로.

## 헷갈리는 개념
| 개념 | 차이 |
|---|---|
| env 키 | 워크플로 파일에 적는 환경 변수 vs 설정에 저장하는 vars |

## 오답 함정
> [!warning] vars 값은 로그에서 자동 마스킹된다는 선택지 → 민감 값은 secrets를 써야 한다〔해석〕

## 관련
- [[비밀(secrets)]] · [[환경 변수와 환경 파일]] · [[비밀·변수 REST API]] · [[비밀 vs 변수 vs 환경 변수]]

**공식 목표**: [[4 엔터프라이즈의 GitHub Actions 관리#목표 4.8|4.8]] · [[4 엔터프라이즈의 GitHub Actions 관리#목표 4.9|4.9]]  
**근거**: [Variables reference](https://docs.github.com/en/actions/reference/workflows-and-actions/variables)

## 셀프 체크
> [!question]- 구성 변수를 읽는 컨텍스트는?
> vars

> [!question]- 리포지토리 변수 최대 개수는?
> 500개
