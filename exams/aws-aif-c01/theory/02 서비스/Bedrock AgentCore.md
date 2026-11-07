---
분류: 생성형 AI(Bedrock)
파트: 5
도메인: [D2, D3]
중요도: 상
aliases: [AgentCore, 에이전트코어]
tags: [서비스, 분류/Bedrock]
---
# Bedrock AgentCore

> [!summary] 한 줄 정의
> AI 에이전트를 **대규모로 배포·운영**하는 서버리스 서비스. 어떤 프레임워크·모델로 만든 에이전트든 올릴 수 있다

## 시험 트리거
| 문제 속 표현 | 정답 |
|---|---|
| 에이전트를 서버리스로 대규모 배포, 컨테이너 관리 불필요 | **AgentCore 런타임** |
| 기존 API·Lambda를 MCP 도구로 변환 | **AgentCore Gateway** |
| 에이전트 자신의 신원, OAuth로 외부 도구 접근 | **AgentCore Identity** |
| 서버리스 단기·장기 메모리 저장소 | **AgentCore Memory** |
| 격리된 환경에서 코드 실행 / 웹 조작 | **코드 인터프리터 / 브라우저 도구** |
| 도구 호출을 Cedar 정책으로 세밀하게 제어 | **AgentCore 정책** |
| 에이전트의 정확성·유용성·유해성 평가 | **AgentCore 평가** |

## 주요 기능
**구성 요소**
- 런타임: 서버리스 엔드포인트, ECR에 배포 (스타터 툴킷이 CodeBuild로 자동 처리)
- 메모리: 단기(세션·이벤트), 장기(메모리 레코드·전략)
- 게이트웨이: OpenAPI(REST), Smithy, Lambda를 MCP 도구로. OAuth, 시맨틱 도구 선택
- 아이덴티티: 에이전트 아이덴티티 중앙 저장소, OAuth 2.0 (Google, GitHub, Slack, Salesforce 등)
- 기본 도구: 브라우저 도구, 코드 인터프리터(Python·JavaScript·TypeScript)
- 관찰 가능성: CloudWatch "GenAI Observability" 대시보드

**정책·평가**
- 정책: Cedar 언어, 에이전트 코드 바깥에서 평가, **기본 거부**, 적용 모드와 로그 전용 모드
- 평가: 정확성, 유용성, 충실성, 도구 선택 정확도, 유해성, 고정관념 등 기본 평가 + 사용자 지정 평가자

**특징**
- 프레임워크 무관: Strands, LangGraph·LangChain, CrewAI, OpenAI Agents SDK
- `agentcore import-agent`로 Bedrock 에이전트를 코드로 변환해 이전

## 헷갈리는 서비스
| 비교 대상 | 차이 |
|---|---|
| [[Bedrock 에이전트]] | 콘솔에서 에이전트를 구성하는 관리형 기능. AgentCore는 어떤 에이전트든 운영하는 인프라 |
| [[Strands Agents]] | 에이전트를 **만드는** 오픈 소스 SDK. AgentCore는 **운영** |
| [[Amazon Cognito]] | 앱 사용자 인증. AgentCore Identity는 에이전트 자신의 신원 |

## 관련
- 이론: [[P05 파운데이션 모델과 Bedrock]]
- 덱: 93~96번 슬라이드

## 셀프 체크
> [!question]- AgentCore 정책의 기본 동작은?
> 기본 거부 — 명시적으로 허용하지 않으면 모두 거부

> [!question]- API를 MCP 도구로 바꿔 주는 AgentCore 구성 요소는?
> AgentCore Gateway
