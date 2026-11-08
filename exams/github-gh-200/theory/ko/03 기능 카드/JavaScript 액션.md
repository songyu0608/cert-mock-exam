---
aliases: ["JavaScript action", "node20", "node24", "@actions/core", "pre post"]
tags: ["gh-200", "기능카드", "도메인3"]
도메인: 3
목표: ["3.1", "3.3", "3.4"]
중요도: "상"
---
# JavaScript 액션

> [!summary] 한 줄 정의
> Node.js로 실행되는 액션이다. action.yml의 `runs.using: node20` 또는 `node24`와 `main` 파일로 정의한다.

**English** JavaScript actions

## 시험 트리거
- "모든 OS에서 빠르게 도는 액션"
- "작업 시작 전 준비, 끝난 뒤 정리 단계가 필요"

## 핵심
- runs: using(node20|node24, 필수), main(필수), pre, post, pre-if, post-if(기본 always()).
- `pre`는 로컬 액션(같은 리포 ./path)에서 지원되지 않는다.
- 입력은 환경 변수 `INPUT_<이름 대문자>`로 전달(툴킷 core.getInput이 읽음).
- 출력·실패·마스킹은 워크플로 명령(GITHUB_OUTPUT, ::error::, ::add-mask::)이나 툴킷 함수로.
- 의존성(node_modules)을 커밋하거나 번들링해 함께 배포한다〔해석: 일반적인 배포 관행, 이 볼트에서 문서 원문 확인 안 함〕.

## 오답 함정
> [!warning] runs.using에 node만 적는다는 선택지 → node20 또는 node24처럼 버전 포함

## 관련
- [[사용자 지정 액션 유형]] · [[액션 메타데이터(action.yml)]] · [[워크플로 명령]] · [[액션 문제 해결]]

**공식 목표**: [[3 액션 작성과 유지 관리#목표 3.1|3.1]] · [[3 액션 작성과 유지 관리#목표 3.3|3.3]] · [[3 액션 작성과 유지 관리#목표 3.4|3.4]]  
**근거**: [Metadata syntax reference](https://docs.github.com/en/actions/reference/workflows-and-actions/metadata-syntax) · [About custom actions](https://docs.github.com/en/actions/concepts/workflows-and-actions/custom-actions)

## 셀프 체크
> [!question]- JS 액션의 runs.using 값 예는?
> node20, node24

> [!question]- 작업이 끝난 뒤 정리 코드를 실행하는 키는?
> runs.post
