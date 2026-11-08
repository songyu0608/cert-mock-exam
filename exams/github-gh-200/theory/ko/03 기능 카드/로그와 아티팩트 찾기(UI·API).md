---
aliases: ["Locating logs and artifacts", "로그 다운로드", "gh run", "Actions 탭"]
tags: ["gh-200", "기능카드", "도메인2"]
도메인: 2
목표: ["2.5", "2.6"]
중요도: "중"
---
# 로그와 아티팩트 찾기(UI·API)

> [!summary] 한 줄 정의
> Actions 탭(워크플로 → 실행 → 작업)과 REST API·GitHub CLI로 워크플로, 로그, 아티팩트를 찾고 내려받거나 삭제한다.

**English** Locating workflows, logs, and artifacts

## 시험 트리거
- "지난주 실행의 로그를 스크립트로 수집"
- "실행 로그를 모두 지우고 싶다"
- "아티팩트를 API로 다운로드"

## 핵심
- UI: 공개 리포지토리도 실행 정보를 보려면 로그인이 필요. 실행 요약 하단 Artifacts 영역, 작업 로그 우측 메뉴 Download log archive.
- 부분 재실행한 실행의 로그 아카이브에는 재실행한 작업만 들어 있다.
- Delete all logs(UI) 또는 `DELETE /repos/{owner}/{repo}/actions/runs/{run_id}/logs`. write 권한 필요.
- 아티팩트 REST: `GET /repos/{owner}/{repo}/actions/artifacts`, `GET .../actions/runs/{run_id}/artifacts`, `GET .../actions/artifacts/{id}/zip`(302, URL 1분 유효, 만료 시 410), `DELETE .../actions/artifacts/{id}`.
- GitHub CLI 예: `gh run list`, `gh run view --log`, `gh run download`〔해석: CLI 명령은 이 볼트에서 문서 원문 확인 안 함〕.

## 관련
- [[Actions REST API(로그·아티팩트·캐시)]] · [[워크플로 아티팩트]] · [[실패한 실행 진단]]

**공식 목표**: [[2 워크플로 사용과 문제 해결#목표 2.5|2.5]] · [[2 워크플로 사용과 문제 해결#목표 2.6|2.6]]  
**근거**: [Using workflow run logs](https://docs.github.com/en/actions/how-tos/monitor-workflows/use-workflow-run-logs) · [REST API endpoints for GitHub Actions artifacts](https://docs.github.com/en/rest/actions/artifacts)

## 셀프 체크
> [!question]- 아티팩트 다운로드 REST의 응답 코드는?
> 302 리디렉션(만료 시 410)

> [!question]- 실행 로그를 삭제하는 데 필요한 권한은?
> 리포지토리 write
