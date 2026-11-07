---
aliases: ["MCP connector", "mcp_servers", "MCPコネクタ"]
tags: ["ccar-p", "레퍼런스", "도메인3"]
도메인: 3
목표: ["3.7", "3.2"]
중요도: "중"
---
# MCP 커넥터

> [!summary] 한 줄 정의
> MCP 클라이언트를 직접 구현하지 않고 Messages API 요청에서 원격 MCP 서버에 연결하는 베타 기능.

**日本語** MCPコネクタ　·　**English** MCP connector (Messages API)

## 시험 트리거
- "API 요청에서 바로 원격 MCP 서버 도구를 쓰고 싶다"
- "특정 MCP 도구만 허용하고 싶다"

## 핵심
- 요청에 mcp_servers와 그에 맞는 mcp_toolset(tools 안)을 넣는다. 베타 헤더가 필요하다(2026-11 기준 베타).
- 도구 전체 허용, 허용 목록(allowlist), 거부 목록(denylist), 도구별 설정이 가능하다. OAuth Bearer 토큰 인증을 지원한다.
- 제한: MCP 사양 중 도구 호출만 지원. 서버는 HTTP(Streamable HTTP·SSE)로 공개되어야 하며 로컬 STDIO 서버는 직접 연결할 수 없다.
- ZDR 적격이 아니다(표준 보존 정책 적용).

## 헷갈리는 개념
| 개념 | 차이 |
|---|---|
| [[Claude Code MCP 범위]] | API 기능 vs Claude Code 설정 |

## 오답 함정
> [!warning] 로컬 STDIO 서버를 MCP 커넥터로 바로 연결하는 선택지 → 불가

## 관련
- [[MCP(모델 컨텍스트 프로토콜)]] · [[통합 메커니즘 선택(MCP·API·CLI·A2A)]] · [[인증과 인가의 공백]] · [[데이터 보존(ZDR·HIPAA 준비)]]

**공식 목표**: [[3 통합#목표 3.7|3.7]] · [[3 통합#목표 3.2|3.2]]  
**근거**: [MCP connector](https://platform.claude.com/docs/en/agents-and-tools/mcp-connector)

## 셀프 체크
> [!question]- MCP 커넥터가 지원하는 MCP 기능은?
> 도구 호출만

> [!question]- MCP 커넥터의 ZDR 적격 여부는?
> 적격 아님(표준 보존 정책)
