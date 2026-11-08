---
aliases: ["Custom instructions vs prompt files vs Spaces vs MCP"]
tags: ["gh-300", "비교", "도메인2", "도메인4"]
---
# 지침·프롬프트 파일·Spaces·MCP 비교

| | [[사용자 지정 지침]] | [[프롬프트 파일]] | [[Copilot Spaces]] | [[MCP]] |
|---|---|---|---|---|
| 무엇 | 응답 방식·규칙 | 재사용 작업 프롬프트 | 참고 자료(코드·문서·이슈) 묶음 | 외부 도구·데이터 연결 |
| 적용 | 관련 요청에 자동 | 사용자가 골라 실행 | 그 Space에서 질문할 때 | 에이전트가 도구로 호출 |
| 위치 | .github/copilot-instructions.md, .github/instructions/*.instructions.md, AGENTS.md | *.prompt.md(작업 영역) | GitHub(개인·조직 소유) | MCP 서버 설정 |
| 예 | "테스트는 pytest, AAA 패턴" | "이 형식으로 컴포넌트 생성" | 결제 모듈 설계 문서 + 리포지토리 | 이슈 트래커, DB, 브라우저 |

**판별**: 매번 지켜야 할 규칙 → 지침. 반복 작업 템플릿 → 프롬프트 파일. 근거 자료 묶음 → Spaces. 외부 시스템 조작·조회 → MCP.

> [!question]- 팀원 모두 같은 리뷰 체크리스트 프롬프트를 필요할 때 실행하게 하고 싶다.
> 프롬프트 파일(.prompt.md).

← [[비교 노트 목록]]
