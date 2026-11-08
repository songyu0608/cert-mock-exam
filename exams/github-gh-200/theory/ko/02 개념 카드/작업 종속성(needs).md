---
aliases: ["needs", "Job dependencies", "작업 의존성"]
tags: ["gh-200", "개념카드", "도메인1"]
도메인: 1
목표: ["1.5"]
중요도: "상"
---
# 작업 종속성(needs)

> [!summary] 한 줄 정의
> `needs:`에 다른 작업 ID를 적으면 그 작업이 성공한 뒤에 실행된다. 작업 실행 순서와 데이터 흐름을 만든다.

**English** Implementing dependencies between jobs

## 시험 트리거
- "빌드 후 테스트, 테스트 후 배포"
- "앞 작업이 실패했는데도 정리 작업은 돌아야 한다"
- "앞 작업의 출력을 쓰고 싶다"

## 핵심
- needs 없으면 작업은 병렬. `needs: [build, test]`는 둘 다 끝나야 실행.
- 앞 작업이 실패하거나 건너뛰면 종속 작업은 건너뛴다. 계속하려면 `if: always()` 등 상태 함수.
- `needs.<job_id>.outputs.<name>`, `needs.<job_id>.result`(success, failure, cancelled, skipped)로 결과를 읽는다.

## 오답 함정
> [!warning] needs로 연결한 작업은 같은 러너에서 실행된다는 선택지 → 순서만 정한다. 러너는 따로

## 관련
- [[작업과 단계 구조]] · [[작업 간 데이터 전달]] · [[조건 실행(if)]]

**공식 목표**: [[1 워크플로 작성과 관리#목표 1.5|1.5]]  
**근거**: [Workflow syntax for GitHub Actions](https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax) · [Contexts reference](https://docs.github.com/en/actions/reference/workflows-and-actions/contexts)

## 셀프 체크
> [!question]- needs 대상이 실패해도 작업을 실행하려면?
> if: always() (또는 failure() 등)

> [!question]- needs 컨텍스트로 읽을 수 있는 것은?
> 대상 작업의 outputs와 result
