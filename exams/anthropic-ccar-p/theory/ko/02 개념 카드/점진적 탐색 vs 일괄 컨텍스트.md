---
aliases: ["Progressive discovery", "段階的ディスカバリー", "Monolithic context", "一括型コンテキスト", "Progressive disclosure", "Just-in-time"]
tags: ["ccar-p", "개념카드", "도메인3"]
도메인: 3
목표: ["3.8", "2.4"]
중요도: "상"
---
# 점진적 탐색 vs 일괄 컨텍스트

> [!summary] 한 줄 정의
> 필요한 정보·도구를 실행 중에 찾아 불러오는 점진적 탐색과, 처음부터 모두 컨텍스트에 넣는 일괄 방식 중 데이터 크기·변동성·지연 요구로 고른다.

**日本語** 段階的ディスカバリーと一括型コンテキスト　·　**English** Progressive discovery vs. monolithic context

## 시험 트리거
- "도구 정의만 수만 토큰"
- "참조 문서가 작고 거의 바뀌지 않는다"
- "탐색 단계가 늘어나 느려졌다"

## 핵심
- 컨텍스트 엔지니어링 글: just-in-time 전략은 파일 경로·쿼리 같은 가벼운 참조만 들고 필요할 때 도구로 불러온다. 점진적 공개로 층층이 맥락을 찾는다.
- 같은 글: 하이브리드 전략도 있다. Claude Code는 CLAUDE.md를 처음부터 넣고, glob·grep으로 파일을 그때그때 찾는다.
- 점진적 공개의 공식 구현: Agent Skills(메타데이터 → SKILL.md → 리소스), 도구 검색(필요한 3~5개 도구만), 코드 실행 + MCP(파일 시스템 탐색으로 150,000→2,000토큰, 98.7% 절감).
- 대가: 실행 중 탐색이 사전 계산된 검색보다 느리고, 적절한 도구·휴리스틱이 없으면 헤맬 수 있다.
- 일괄 방식이 맞는 경우: 작고 안정적인 지식(예: 200,000토큰 미만 지식 베이스)은 전체를 넣고 캐싱하는 편이 단순하다.

## 헷갈리는 개념
| 개념 | 차이 |
|---|---|
| [[컨텍스트 엔지니어링]] | 상위 원칙 vs 로딩 시점 전략 |
| [[RAG 파이프라인 설계]] | RAG는 사전 인덱스 검색, 점진적 탐색은 에이전트가 실행 중 탐색 |

## 오답 함정
> [!warning] 오답이 되기 쉬운 선택지
> - "항상 점진적 탐색이 낫다" → 작은 정적 지식은 일괄 + 캐싱이 더 빠르고 단순
> - "모든 MCP 도구 정의를 미리 로드한다" → 도구가 많으면 컨텍스트 비대화와 선택 정확도 저하

## 관련
- [[Agent Skills]] · [[도구 검색 도구]] · [[코드 실행과 MCP]] · [[컨텍스트 엔지니어링]] · [[RAG vs 전체 컨텍스트 투입]]

**공식 목표**: [[3 통합#목표 3.8|3.8]] · [[2 Claude 모델, 프롬프팅, 컨텍스트 엔지니어링#목표 2.4|2.4]]  
**근거**: [Effective context engineering for AI agents](https://www.anthropic.com/research/effective-context-engineering-for-ai-agents) · [Agent Skills](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview) · [Tool search tool](https://platform.claude.com/docs/en/agents-and-tools/tool-use/tool-search-tool) · [Code execution with MCP](https://www.anthropic.com/research/code-execution-with-mcp) · [Contextual retrieval](https://www.anthropic.com/research/contextual-retrieval)

## 셀프 체크
> [!question]- Claude Code의 하이브리드 전략은?
> CLAUDE.md는 처음부터 넣고, 파일은 glob·grep으로 필요할 때 탐색

> [!question]- 코드 실행 + MCP의 점진적 공개로 줄어든 토큰(공식 글 예)은?
> 150,000 → 2,000토큰(98.7% 절감)
