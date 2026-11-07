---
aliases: ["Headless", "-p", "--print", "claude -p", "ヘッドレス", "--bare"]
tags: ["ccar-p", "레퍼런스", "도메인7"]
도메인: 7
목표: ["7.2", "3.7"]
중요도: "중"
---
# 헤드리스 모드(-p)

> [!summary] 한 줄 정의
> claude -p로 Claude Code를 비대화형으로 실행해 CI·스크립트에서 쓰는 방식.

**日本語** ヘッドレスモード　·　**English** Run Claude Code programmatically (-p)

## 시험 트리거
- "CI 파이프라인에서 Claude Code 실행"
- "결과를 JSON으로 받아 파싱"
- "모든 머신에서 같은 결과가 필요"

## 핵심
- claude -p "작업" --allowedTools "Read,Edit,Bash"처럼 자동 승인 도구를 지정한다.
- --output-format: text, json(total_cost_usd 포함, 클라이언트 추정치), stream-json(실시간 줄 단위 JSON).
- --bare: 훅·스킬·MCP 서버·CLAUDE.md·자동 메모리 등의 자동 탐색을 건너뛰어 어느 머신에서도 같은 결과를 낸다. API 키(ANTHROPIC_API_KEY)가 필요하다.
- --bare 없이 -p를 쓰면 프로젝트 .claude/settings.json의 훅과 .mcp.json 서버가 신뢰 확인 대화 없이 실행된다.

## 헷갈리는 개념
| 개념 | 차이 |
|---|---|
| [[Claude Code 훅]] | -p는 실행 방식, 훅은 실행 중 자동 동작 |

## 오답 함정
> [!warning] 신뢰하지 않은 저장소에서 -p를 실행해도 프로젝트 훅이 실행되지 않는다는 선택지 → --bare 없이는 실행된다

## 관련
- [[AI 보조 개발 워크플로]] · [[Claude Code 훅]] · [[통합 메커니즘 선택(MCP·API·CLI·A2A)]]

**공식 목표**: [[7 개발자 생산성과 운영 지원#목표 7.2|7.2]] · [[3 통합#목표 3.7|3.7]]  
**근거**: [Claude Code: Run programmatically](https://code.claude.com/docs/en/headless)

## 셀프 체크
> [!question]- CI에서 매번 같은 결과를 내려고 자동 탐색을 끄는 플래그는?
> --bare

> [!question]- 비용 정보가 포함되는 출력 형식은?
> --output-format json(total_cost_usd)
