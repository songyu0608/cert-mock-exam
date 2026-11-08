---
aliases: ["Job summary", "GITHUB_STEP_SUMMARY", "작업 요약"]
tags: ["gh-200", "기능카드", "도메인1"]
도메인: 1
목표: ["1.15"]
중요도: "중"
---
# 작업 요약(GITHUB_STEP_SUMMARY)

> [!summary] 한 줄 정의
> 단계가 `$GITHUB_STEP_SUMMARY` 파일에 Markdown을 쓰면 실행 요약 페이지에 표시된다. 테스트 결과·커버리지·링크 보고에 쓴다.

**English** Adding a job summary

## 시험 트리거
- "테스트 결과 표를 실행 요약 화면에 보여 주기"

## 핵심
- `echo "### 결과 :rocket:" >> "$GITHUB_STEP_SUMMARY"`. GitHub Flavored Markdown 지원.
- 단계마다 별도 파일. 한 단계 최대 1 MiB, 작업당 요약 20개까지 표시.
- 덮어쓰려면 `>`, 비우려면 `rm`〔해석: 셸 일반 동작〕. 작업 요약은 마스킹 규칙이 적용된다〔해석〕.

## 관련
- [[워크플로 명령]] · [[환경 변수와 환경 파일]]

**공식 목표**: [[1 워크플로 작성과 관리#목표 1.15|1.15]]  
**근거**: [Workflow commands for GitHub Actions](https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-commands)

## 셀프 체크
> [!question]- 작업 요약 Markdown을 쓰는 환경 파일은?
> GITHUB_STEP_SUMMARY

> [!question]- 단계당 요약 크기 한도는?
> 1 MiB
