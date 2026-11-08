---
aliases: ["if 조건", "Conditional logic", "상태 확인 함수", "always()"]
tags: ["gh-200", "개념카드", "도메인1"]
도메인: 1
목표: ["1.4", "1.11"]
중요도: "상"
---
# 조건 실행(if)

> [!summary] 한 줄 정의
> 작업이나 단계의 `if:`에 식을 적어 조건이 참일 때만 실행한다. 기본 조건은 `success()`다.

**English** Conditional logic with if

## 시험 트리거
- "main 브랜치일 때만 배포"
- "앞 단계가 실패해도 알림 단계는 실행"
- "if에 비밀을 써서 조건을 걸고 싶다"

## 핵심
- `if:`에서는 `${{ }}`를 생략할 수 있다. 단, 식이 `!`로 시작하면 감싸야 한다(YAML 예약 표기).
- 상태 함수: success()(기본), always()(취소돼도 실행), failure()(앞 단계·작업 실패 시), cancelled().
- 작업 수준 if에서 쓸 수 있는 컨텍스트는 github, needs, vars, inputs. secrets는 쓸 수 없다 → 비밀을 env로 옮긴 뒤 단계 if에서 확인.
- 작업 수준 if는 매트릭스가 적용되기 전에 평가된다.

## 오답 함정
> [!warning] 오답이 되기 쉬운 선택지
> - if에서 secrets 컨텍스트를 바로 참조한다는 선택지 → 직접 참조 불가(env 경유)
> - `if: !startsWith(...)`를 그대로 쓴다는 선택지 → `!`로 시작하면 ${{ }}로 감싸야 한다

## 관련
- [[식과 평가 시점]] · [[컨텍스트]] · [[작업 종속성(needs)]]

**공식 목표**: [[1 워크플로 작성과 관리#목표 1.4|1.4]] · [[1 워크플로 작성과 관리#목표 1.11|1.11]]  
**근거**: [Workflow syntax for GitHub Actions](https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax) · [Evaluate expressions in workflows and actions](https://docs.github.com/en/actions/reference/workflows-and-actions/expressions) · [Contexts reference](https://docs.github.com/en/actions/reference/workflows-and-actions/contexts)

## 셀프 체크
> [!question]- 단계의 기본 상태 조건은?
> success()

> [!question]- 앞 작업 결과와 관계없이 항상 실행하려면?
> if: always()
