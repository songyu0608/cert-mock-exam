---
aliases: [".mcp.json", "MCP scope", "MCPサーバーのスコープ"]
tags: ["ccar-p", "레퍼런스", "도메인7"]
도메인: 7
목표: ["7.1", "3.7"]
중요도: "중"
---
# Claude Code MCP 범위

> [!summary] 한 줄 정의
> Claude Code의 MCP 서버는 로컬·프로젝트·사용자 3개 범위에 설정하고, 팀 공유는 프로젝트 범위(.mcp.json)로 한다.

**日本語** MCPサーバーのスコープ　·　**English** Claude Code MCP installation scopes

## 시험 트리거
- "팀 전원이 같은 MCP 서버를 써야 한다"
- "개인용 MCP 서버를 모든 프로젝트에서"

## 핵심
- 로컬: 현재 프로젝트만, 공유 안 함, ~/.claude.json(기본값).
- 프로젝트: 현재 프로젝트, 버전 관리로 팀 공유, 프로젝트 루트의 .mcp.json.
- 사용자: 모든 프로젝트, 공유 안 함, ~/.claude.json.
- 같은 이름이 여러 범위에 있으면 로컬 > 프로젝트 > 사용자 > 플러그인 > claude.ai 커넥터 순으로 하나만 쓰며, 필드는 합쳐지지 않는다.
- 관리자는 관리형 MCP 구성으로 모든 사용자에게 서버를 배포·제한할 수 있다.

## 헷갈리는 개념
| 개념 | 차이 |
|---|---|
| [[MCP 커넥터]] | Claude Code 설정 vs Messages API 기능 |
| [[Claude Code 설정 우선순위]] | 설정은 관리형이 최상위, MCP 이름 충돌은 로컬이 최상위 |

## 오답 함정
> [!warning] 팀 공유용 MCP 서버를 사용자 범위에 두는 선택지 → 공유되지 않는다. 프로젝트 범위(.mcp.json)

## 관련
- [[팀용 Claude Code 구성]] · [[MCP(모델 컨텍스트 프로토콜)]] · [[Claude Code 설정 우선순위]]

**공식 목표**: [[7 개발자 생산성과 운영 지원#목표 7.1|7.1]] · [[3 통합#목표 3.7|3.7]]  
**근거**: [Claude Code: MCP](https://code.claude.com/docs/en/mcp)

## 셀프 체크
> [!question]- 팀과 공유되는 MCP 범위와 파일은?
> 프로젝트 범위, 프로젝트 루트의 .mcp.json

> [!question]- MCP 범위의 기본값은?
> 로컬
