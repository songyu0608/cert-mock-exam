---
aliases: ["Integration mechanism", "統合メカニズム", "MCP vs API", "Agent-to-agent", "エージェント間", "A2A"]
tags: ["ccar-p", "개념카드", "도메인3"]
도메인: 3
목표: ["3.7"]
중요도: "상"
---
# 통합 메커니즘 선택(MCP·API·CLI·A2A)

> [!summary] 한 줄 정의
> 외부 시스템을 Claude에 연결할 때 재사용·표준화(MCP), 직접 제어(API/CLI 도구), 에이전트 간 위임(A2A) 중 요구에 맞는 것을 고른다.

**日本語** 統合メカニズム（MCP、API/CLI、エージェント間）　·　**English** Selecting the integration mechanism (MCP, API/CLI, agent-to-agent)

## 시험 트리거
- "여러 에이전트·앱에서 같은 사내 시스템을 쓴다"
- "일회성 스크립트에서 API 하나만 호출"
- "다른 팀의 에이전트에게 작업을 넘긴다"

## 핵심
- MCP: AI 에이전트를 외부 시스템에 연결하는 오픈 표준. 한 번 구현하면 여러 클라이언트·서버와 연결되어 조합마다 맞춤 통합을 만들 필요가 줄어든다.
- Messages API의 MCP 커넥터는 공개 HTTP(Streamable HTTP·SSE) 서버만 연결하고, MCP 기능 중 도구 호출만 지원한다. 로컬 STDIO 서버는 직접 연결할 수 없다 → [[MCP 커넥터]].
- API/CLI: 앱 코드가 직접 API를 호출하거나 사용자 정의 도구로 감싼다. 호출마다 검증·게이트를 코드로 넣기 쉽다. Claude Code에서는 -p로 CLI 자동화 → [[헤드리스 모드(-p)]].
- 〔해석〕 에이전트 간(A2A): 다른 에이전트에게 작업을 위임. 신뢰 경계·인증·결과 검증을 설계해야 한다. Anthropic 공식 문서에서 A2A 세부는 이번에 확인하지 못했다.
- 〔해석〕 판단 축: 재사용 범위, 배포 위치(원격/로컬), 보안 경계, 운영 부담, 지원되는 MCP 기능(도구 외 리소스·프롬프트 필요 여부).

## 헷갈리는 개념
| 개념 | 차이 |
|---|---|
| [[MCP(모델 컨텍스트 프로토콜)]] | 프로토콜 자체 vs 메커니즘 선택 판단 |

## 오답 함정
> [!warning] 오답이 되기 쉬운 선택지
> - 로컬 STDIO MCP 서버를 Messages API MCP 커넥터에 바로 연결한다는 선택지 → 공개 HTTP 서버만 가능
> - "MCP를 쓰면 인가 설계가 필요 없다" → 연결 표준일 뿐, 권한 범위는 따로 설계

## 관련
- [[MCP(모델 컨텍스트 프로토콜)]] · [[MCP 커넥터]] · [[Claude Code MCP 범위]] · [[헤드리스 모드(-p)]] · [[MCP vs API 직접 호출 vs 에이전트 간]]

**공식 목표**: [[3 통합#목표 3.7|3.7]]  
**근거**: [Code execution with MCP](https://www.anthropic.com/research/code-execution-with-mcp) · [MCP connector](https://platform.claude.com/docs/en/agents-and-tools/mcp-connector) · [Claude Code: Run programmatically](https://code.claude.com/docs/en/headless)

## 셀프 체크
> [!question]- Messages API MCP 커넥터의 두 가지 제한은?
> MCP 기능 중 도구 호출만 지원, 공개 HTTP 서버만 연결(로컬 STDIO 불가)
