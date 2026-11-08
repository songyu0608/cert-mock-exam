---
aliases: ["이너소스", "내부 소스", "Inner source", "방화벽 안의 오픈 소스"]
tags: ["gh-900", "개념카드", "도메인7"]
도메인: 7
목표: ["7.5"]
중요도: "상"
---
# InnerSource

> [!summary] 한 줄 정의
> 조직 내부의 독점 소프트웨어를 오픈 소스 방식(공개적 협업, 리뷰, 문서화)으로 개발하는 관행. "방화벽 안의 오픈 소스".

**English** InnerSource

## 시험 트리거
- "다른 팀의 코드를 재사용하고 기여하고 싶다"
- "팀 간 사일로를 없애고 싶다"
- "코드를 외부에 공개하지 않고 오픈 소스처럼"

## 핵심
- 정의: 오픈 소스 관행을 독점(사내) 소프트웨어에 적용. 코드를 외부에 공개할 필요는 없다.
- 이점: 더 많은 리뷰로 오류를 일찍 발견, 재사용으로 비용·종속(lock-in) 감소, 비동기·문서화된 협업, 사일로 감소, 개방성.
- 역할: 메인테이너, 기여자, 커뮤니티 구성원. 조직의 누구나 볼 수 있되 기여는 통제한다.
- GitHub 구현: 내부(internal) 공개 범위 리포지토리(엔터프라이즈 구성원 전원 읽기) → [[리포지토리 공개 범위]], CONTRIBUTING·CODEOWNERS·풀 리퀘스트 리뷰.
- 엔터프라이즈 계정은 InnerSource를 지원한다 → [[GitHub 계정 유형]].

## 헷갈리는 개념
| 개념 | 차이 |
|---|---|
| [[오픈 소스와 GitHub Sponsors]] | 외부 공개 vs 조직 안에서만 공개 |
| [[리포지토리 공개 범위]] | internal은 InnerSource를 구현하는 설정이지 InnerSource 자체가 아님 |

## 오답 함정
> [!warning] 오답이 되기 쉬운 선택지
> - InnerSource를 하려면 코드를 public으로 공개해야 한다는 선택지 → 조직 안에서만 공개(internal)
> - InnerSource는 외부 기여자를 받는 방식이라는 선택지 → 조직 구성원 간 협업

## 관련
- [[리포지토리 공개 범위]] · [[GitHub 계정 유형]] · [[CODEOWNERS]] · [[커뮤니티 상태 파일]] · [[풀 리퀘스트]] · [[포크·템플릿·검색 가능성 비교]]

**공식 목표**: [[7 GitHub 커뮤니티 살펴보기#목표 7.5|7.5]]  
**근거**: [What is innersource?](https://github.com/resources/articles/innersource) · [Setting repository visibility](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/managing-repository-settings/setting-repository-visibility) · [Types of GitHub accounts](https://docs.github.com/en/get-started/learning-about-github/types-of-github-accounts)

## 셀프 체크
> [!question]- InnerSource를 한 줄로?
> 조직 내부 소프트웨어에 오픈 소스 관행 적용("방화벽 안의 오픈 소스")

> [!question]- 엔터프라이즈 구성원 전원이 읽을 수 있게 하는 공개 범위는?
> 내부(internal)
