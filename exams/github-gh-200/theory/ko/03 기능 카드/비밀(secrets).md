---
aliases: ["Secrets", "암호화된 비밀", "secrets 컨텍스트", "조직 비밀", "환경 비밀"]
tags: ["gh-200", "기능카드", "도메인4"]
도메인: 4
목표: ["4.8", "4.9"]
중요도: "상"
---
# 비밀(secrets)

> [!summary] 한 줄 정의
> 비밀은 조직·리포지토리·환경 수준에 암호화해 저장하는 민감 값이다. 워크플로에서 `${{ secrets.NAME }}`으로 읽고 로그에서 자동으로 가려진다.

**English** Using secrets in GitHub Actions

## 시험 트리거
- "API 키를 워크플로에서 안전하게"
- "같은 이름 비밀이 조직과 리포에 모두 있다"
- "포크 PR에서 비밀이 비어 있다"

## 핵심
- 이름: 문자·숫자·_만, 공백 불가, GITHUB_ 또는 숫자로 시작 불가, 대소문자 구분 없음(대문자로 저장).
- 우선순위: 낮은 수준이 이김 → 환경 > 리포지토리 > 조직.
- 한도: 조직 1,000, 리포 100, 환경 100, 비밀당 48 KB. 리포가 접근 가능한 조직 비밀이 100개를 넘으면 이름순 앞 100개만.
- 조직 비밀 접근 정책: 모든 리포 / 비공개 리포 / 선택 리포(REST visibility all·private·selected).
- 조직·리포 비밀은 실행이 대기열에 들어갈 때, 환경 비밀은 그 환경을 참조한 작업이 시작될 때 읽힌다.
- GITHUB_TOKEN 외 비밀은 포크에서 트리거된 실행에 전달되지 않는다. 재사용 워크플로에는 명시 매핑 또는 secrets: inherit.
- if에서 직접 참조 불가 → env로 옮겨 확인. 액션에는 입력·env로 넘긴다.
- 리포 write 권한자는 모든 리포 비밀을 읽을 수 있다(워크플로로) → 최소 권한 자격 증명.

## 헷갈리는 개념
| 개념 | 차이 |
|---|---|
| [[구성 변수(vars)]] | 민감 값·마스킹 vs 비민감 설정값 |

## 오답 함정
> [!warning] 오답이 되기 쉬운 선택지
> - 조직 비밀이 리포 비밀보다 우선한다는 선택지 → 리포(더 낮은 수준)가 우선
> - 비밀 이름을 GITHUB_로 시작할 수 있다는 선택지 → 불가

## 관련
- [[구성 변수(vars)]] · [[비밀·변수 REST API]] · [[환경과 배포 보호 규칙]] · [[비밀 유출 방지]] · [[비밀 vs 변수 vs 환경 변수]]

**공식 목표**: [[4 엔터프라이즈의 GitHub Actions 관리#목표 4.8|4.8]] · [[4 엔터프라이즈의 GitHub Actions 관리#목표 4.9|4.9]]  
**근거**: [Secrets reference](https://docs.github.com/en/actions/reference/security/secrets) · [REST API endpoints for GitHub Actions secrets](https://docs.github.com/en/rest/actions/secrets) · [Events that trigger workflows](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows) · [Secure use reference](https://docs.github.com/en/actions/reference/security/secure-use)

## 셀프 체크
> [!question]- 같은 이름 비밀의 우선순위는?
> 환경 > 리포지토리 > 조직

> [!question]- 비밀 하나의 최대 크기는?
> 48 KB

> [!question]- 리포지토리 비밀 최대 개수는?
> 100개
