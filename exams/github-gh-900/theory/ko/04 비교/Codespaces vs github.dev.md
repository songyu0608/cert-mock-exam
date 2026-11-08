---
aliases: ["Codespaces vs github.dev", "github.dev vs Codespaces"]
tags: ["gh-900", "비교", "도메인4"]
---
# Codespaces vs github.dev

| | [[github.dev]] | [[GitHub Codespaces]] |
|---|---|---|
| 여는 법 | . 키(같은 탭), > 키(새 탭) | Code → Codespaces, 템플릿, 브랜치·커밋 |
| 실행 환경 | 브라우저만(컴퓨팅 없음) | GitHub 호스팅 VM 위 Docker 컨테이너(Linux) |
| 터미널·빌드·디버그 | 불가 | 가능 |
| 확장 | 웹 확장만 | VS Code Marketplace 확장 대부분 |
| 설정 | 없음 | devcontainer.json |
| 비용 | 무료(로그인 필요) | 개인 월 무료 사용량 뒤 과금, 조직이 대신 낼 수 있음 |
| 시작 | 즉시 | 컨테이너 생성 시간 필요 |
| 맞는 상황 | 오타 수정, 여러 파일 가벼운 편집, PR 리뷰 | 실행·테스트·디버그, 팀 공통 환경 |

**전환**: github.dev에서 실행이 필요해지면 "Continue Working on…" → Create New Codespace.

> [!question]- 리뷰 중 PR의 문서 오타 세 곳을 고치고 싶다. 가장 가볍고 비용 없는 방법은?
> github.dev(. 키).

> [!question]- 변경 후 단위 테스트를 돌려야 한다. github.dev로 충분한가?
> 아니다. 컴퓨팅·터미널이 없으므로 Codespaces(또는 로컬)가 필요하다.

← [[비교 노트 목록]]
