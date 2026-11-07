---
분류: 생성형 AI(Bedrock)
파트: 5
도메인: D2
중요도: 중
aliases: [Strands, Strands Agents SDK]
tags: [서비스, 분류/Bedrock]
---
# Strands Agents

> [!summary] 한 줄 정의
> Amazon이 오픈 소스로 공개한 **Python 에이전트 SDK**. 몇 줄의 코드로 도구를 쓰는 에이전트를 만든다

## 시험 트리거
- "오픈 소스 에이전트 SDK"
- "몇 줄의 Python 코드로 에이전트 구축"
- "MCP 지원, 멀티 에이전트(스웜)"

## 주요 기능
- 같은 부류: OpenAI Agents SDK, CrewAI, LangGraph, Google ADK
- AWS와 긴밀히 통합(Bedrock, Lambda, Step Functions)되지만 AWS에 묶이지 않음
- 멀티모달, MCP 지원
- 기본 도구: boto3, 지식 기반 RAG·메모리, Python 실행, HTTP, 셸, 파일, 에이전트 스웜, Polly 음성
- `@tool` 데코레이터로 사용자 도구 정의
- 에이전트 루프: 입력 → LLM 추론·도구 선택 → 도구 실행(반복) → 응답

## 헷갈리는 서비스
| 비교 대상 | 차이 |
|---|---|
| [[Bedrock AgentCore]] | 만든 에이전트를 배포·운영하는 서비스 |
| [[Bedrock 에이전트]] | 콘솔 기반 관리형 에이전트 |

## 관련
- 이론: [[P05 파운데이션 모델과 Bedrock]]
- 덱: 97번 슬라이드

## 셀프 체크
> [!question]- Strands로 만든 에이전트를 운영 환경에 대규모로 올릴 곳은?
> Amazon Bedrock AgentCore
