---
aliases: ["Actions", "CI/CD", "워크플로", "Workflow", "러너", "Runner", ".github/workflows"]
tags: ["gh-900", "기능카드", "도메인4"]
도메인: 4
목표: ["4.1"]
중요도: "상"
---
# GitHub Actions

> [!summary] 한 줄 정의
> 리포지토리 이벤트(푸시, PR, 이슈 생성 등)나 일정·수동 실행으로 YAML 워크플로를 돌려 빌드·테스트·배포와 각종 자동화를 하는 CI/CD 플랫폼.

**English** GitHub Actions

## 시험 트리거
- "PR마다 테스트를 자동으로 실행"
- "새 이슈에 레이블을 자동으로 붙이고 싶다"
- "매일 밤 정해진 시간에 작업 실행"

## 핵심
- 워크플로: .github/workflows 폴더의 YAML 파일. 이벤트, 수동, 일정(schedule)으로 실행.
- 이벤트 예: push, pull_request, 이슈 열림, schedule, REST API 호출, 수동 실행.
- 잡(job): 같은 러너에서 도는 단계 묶음. 기본은 병렬, 의존성을 주면 순차. 매트릭스로 OS·언어 버전 조합마다 실행.
- 스텝(step): 셸 스크립트 또는 액션. 같은 러너에서 순서대로 실행돼 데이터를 공유.
- 액션(action): 재사용 단위(체크아웃, 도구 설치 등). 직접 만들거나 Marketplace에서 찾는다 → [[GitHub Marketplace]].
- 러너: GitHub 호스팅(Ubuntu, Windows, macOS, 대형 러너) 또는 자체 호스팅. 공개 리포지토리의 표준 GitHub 호스팅 러너와 자체 호스팅 러너는 무료, 비공개 리포지토리는 요금제별 포함 사용량(변동 정보).

## 헷갈리는 개념
| 개념 | 차이 |
|---|---|
| [[GitHub Projects]] | Projects의 내장 워크플로는 프로젝트 필드 자동화, Actions는 범용 자동화 |
| [[GitHub Copilot 기능]] | 정해진 자동화 vs AI 지원 |

## 오답 함정
> [!warning] 오답이 되기 쉬운 선택지
> - 워크플로 파일을 리포지토리 루트의 workflows 폴더에 둔다는 선택지 → .github/workflows
> - Actions는 코드 빌드·배포에만 쓴다는 선택지 → 이슈 레이블 지정 같은 리포지토리 자동화도 가능

## 관련
- [[GitHub Marketplace]] · [[GitHub Codespaces]] · [[오픈 소스 지원 기능]] · [[GitHub Pages]]

**공식 목표**: [[4 최신 개발 방식 적용#목표 4.1|4.1]]  
**근거**: [Understanding GitHub Actions](https://docs.github.com/en/actions/get-started/understand-github-actions) · [GitHub Actions billing](https://docs.github.com/en/billing/concepts/product-billing/github-actions)

## 셀프 체크
> [!question]- 워크플로 파일 위치는?
> .github/workflows 폴더의 YAML 파일

> [!question]- 잡의 기본 실행 방식은?
> 병렬(의존성을 설정하면 순차)

> [!question]- 공개 리포지토리에서 표준 GitHub 호스팅 러너 비용은?
> 무료
