---
aliases: ["workflow_dispatch", "수동 트리거", "Manual trigger", "inputs 컨텍스트"]
tags: ["gh-200", "기능카드", "도메인1"]
도메인: 1
목표: ["1.1", "1.3"]
중요도: "상"
---
# 수동 실행(workflow_dispatch)

> [!summary] 한 줄 정의
> `workflow_dispatch`를 넣으면 Actions 탭, GitHub CLI, REST API로 워크플로를 수동 실행하고 입력값을 넘길 수 있다.

**English** workflow_dispatch event and inputs

## 시험 트리거
- "배포 환경을 골라 수동 실행"
- "버튼으로 실행할 때 파라미터를 받고 싶다"
- "Run workflow 버튼이 보이지 않는다"

## 핵심
- 입력 유형: boolean, choice, number, environment, string. 각 입력에 description, required, default, (choice는) options를 둔다.
- 입력값은 `inputs` 컨텍스트로 읽는다(github.event.inputs도 있음).
- 한도: 최상위 입력 25개, 페이로드 65,535자.
- Run workflow 버튼은 워크플로 파일이 기본 브랜치에 있어야 나타난다. 한 번 실행된 뒤에는 API·CLI로 다른 브랜치나 태그를 지정해 실행할 수 있다.
- GitHub CLI: `gh workflow run`. REST: workflow dispatch 엔드포인트.

## 헷갈리는 개념
| 개념 | 차이 |
|---|---|
| [[재사용 워크플로]]의 workflow_call 입력 | workflow_call 입력 유형은 boolean, number, string뿐. choice·environment는 workflow_dispatch 전용 |

## 오답 함정
> [!warning] 오답이 되기 쉬운 선택지
> - workflow_dispatch 입력 유형에 array가 있다는 선택지 → boolean, choice, number, environment, string
> - 기능 브랜치에만 있는 워크플로도 UI 버튼으로 바로 실행된다는 선택지 → 기본 브랜치에 파일이 있어야 버튼이 보인다

## 관련
- [[워크플로 트리거와 이벤트]] · [[재사용 워크플로]] · [[컨텍스트]]

**공식 목표**: [[1 워크플로 작성과 관리#목표 1.1|1.1]] · [[1 워크플로 작성과 관리#목표 1.3|1.3]]  
**근거**: [Events that trigger workflows](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows) · [Workflow syntax for GitHub Actions](https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax)

## 셀프 체크
> [!question]- workflow_dispatch 입력 유형 5가지는?
> boolean, choice, number, environment, string

> [!question]- workflow_dispatch 최상위 입력 최대 개수는?
> 25개
