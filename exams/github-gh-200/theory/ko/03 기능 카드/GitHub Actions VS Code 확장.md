---
aliases: ["GitHub Actions for VS Code", "VS Code 확장", "편집기 도구"]
tags: ["gh-200", "기능카드", "도메인1"]
도메인: 1
목표: ["1.12"]
중요도: "하"
---
# GitHub Actions VS Code 확장

> [!summary] 한 줄 정의
> GitHub 공식 VS Code 확장으로 편집기 안에서 워크플로 작성(자동 완성·검증)과 실행 관리를 한다.

**English** GitHub Actions extension for VS Code

## 시험 트리거
- "워크플로 YAML 오류를 커밋 전에 잡고 싶다"
- "액션 입력 이름을 자동 완성"

## 핵심
- 워크플로와 실행을 편집기에서 관리, 로그로 실패 조사.
- 워크플로와 Actions 식의 구문 강조, YAML 스키마·식 유효성 검사.
- 식 함수, 이벤트 페이로드, 작업·단계 출력 자동 완성. 참조한 액션·재사용 워크플로의 입력·출력을 읽어 완성·검증.
- 환경, 비밀, 변수 설정 수정.
- GitHub Enterprise Server 지원은 실험적 베타(`use-enterprise` 설정).

## 관련
- [[식과 평가 시점]] · [[재사용 워크플로]]

**공식 목표**: [[1 워크플로 작성과 관리#목표 1.12|1.12]]  
**근거**: [GitHub Actions for VS Code (github/vscode-github-actions)](https://github.com/github/vscode-github-actions)

## 셀프 체크
> [!question]- VS Code 확장이 참조 액션의 무엇을 읽어 자동 완성하나?
> 입력·출력(메타데이터)
