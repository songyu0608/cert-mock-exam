---
aliases: ["Actions REST API", "REST API 보존", "actions/caches API"]
tags: ["gh-200", "기능카드", "도메인2"]
도메인: 2
목표: ["2.5", "2.6", "1.13", "5.9"]
중요도: "중"
---
# Actions REST API(로그·아티팩트·캐시)

> [!summary] 한 줄 정의
> GitHub REST API로 워크플로 실행·로그·아티팩트·캐시를 조회·삭제하고 보존 설정을 바꾼다. 정리 작업과 정책을 자동화할 때 쓴다.

**English** REST API for Actions logs, artifacts, and caches

## 시험 트리거
- "오래된 아티팩트를 매주 자동 삭제"
- "리포지토리 캐시 사용량 확인"
- "보존 기간을 코드로 일괄 설정"

## 핵심
- 아티팩트: 목록(리포·실행), 조회, 삭제, zip 다운로드. 응답의 expired, expires_at, size_in_bytes.
- 로그: 실행 로그 삭제 `DELETE /repos/{owner}/{repo}/actions/runs/{run_id}/logs`.
- 캐시: `GET .../actions/cache/usage`, `GET .../actions/caches`, `DELETE .../actions/caches?key=`, `DELETE .../actions/caches/{cache_id}`, `retention-limit`, `storage-limit`(조직·엔터프라이즈 수준도).
- 보존·포크 PR 승인 등 Actions 설정 API: 2025-07-31 변경 로그에서 엔터프라이즈·조직·리포 수준으로 추가.
- 인증: GITHUB_TOKEN 또는 PAT·GitHub App 토큰. GITHUB_TOKEN API 한도는 리포지토리당 시간당 1,000(Enterprise Cloud 15,000).

## 관련
- [[보존 정책]] · [[로그와 아티팩트 찾기(UI·API)]] · [[의존성 캐싱]] · [[비밀·변수 REST API]]

**공식 목표**: [[2 워크플로 사용과 문제 해결#목표 2.5|2.5]] · [[2 워크플로 사용과 문제 해결#목표 2.6|2.6]] · [[1 워크플로 작성과 관리#목표 1.13|1.13]] · [[5 자동화 보안과 최적화#목표 5.9|5.9]]  
**근거**: [REST API endpoints for GitHub Actions artifacts](https://docs.github.com/en/rest/actions/artifacts) · [REST API endpoints for GitHub Actions cache](https://docs.github.com/en/rest/actions/cache) · [Using workflow run logs](https://docs.github.com/en/actions/how-tos/monitor-workflows/use-workflow-run-logs) · [Changelog: New APIs and windows-latest migration notice (2025-07-31)](https://github.blog/changelog/2025-07-31-github-actions-new-apis-and-windows-latest-migration-notice/) · [Actions limits](https://docs.github.com/en/actions/reference/limits)

## 셀프 체크
> [!question]- 캐시 키로 삭제하는 엔드포인트는?
> DELETE /repos/{owner}/{repo}/actions/caches?key=

> [!question]- GITHUB_TOKEN의 REST API 시간당 한도는?
> 리포지토리당 1,000(Enterprise Cloud 15,000)
