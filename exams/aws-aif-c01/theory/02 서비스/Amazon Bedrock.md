---
분류: 생성형 AI(Bedrock)
파트: 5
도메인: [D2, D3]
중요도: 상
aliases: [Bedrock, 베드록]
tags: [서비스, 분류/Bedrock]
---
# Amazon Bedrock

> [!summary] 한 줄 정의
> 여러 회사의 **파운데이션 모델(FM)을 API 하나로** 쓰는 완전 관리형·서버리스 생성형 AI 서비스

## 시험 트리거
| 문제 속 표현 | 정답 |
|---|---|
| 인프라 관리 없이 API로 여러 FM 사용 | **Amazon Bedrock** |
| 모델을 직접 배포·관리, 인프라 제어 | [[SageMaker JumpStart]] |
| 실시간 응답 불필요, 대량 작업 비용 절감 | **배치 추론** (온디맨드보다 50% 저렴) |
| 안정적인 처리량 보장, 사용자 지정 모델 호출 | **프로비저닝된 처리량** |
| 프롬프트와 응답을 감사·분석용으로 기록 | **모델 호출 로깅** (CloudWatch Logs, S3) |
| 인터넷을 거치지 않고 VPC에서 접근 | [[AWS PrivateLink]] |
| Titan으로 생성된 이미지인지 확인 | **워터마크 탐지** |

## 주요 기능
**모델**
- Anthropic Claude, Meta Llama, AI21 Jurassic, Stability AI, Amazon Titan·Nova, Mistral, Cohere 등
- 기본 모델은 **모델 액세스 요청** 후 사용 (Titan은 즉시, 타사는 몇 분)
- 플레이그라운드(채팅·텍스트·이미지)에서 바로 시험
- 가져온 모델: S3의 Hugging Face 가중치, SageMaker 모델

**API 엔드포인트**
- bedrock: 모델 관리·훈련
- bedrock-runtime: 추론 (Converse, InvokeModel)
- bedrock-agent: 에이전트·지식 기반 관리
- bedrock-agent-runtime: 에이전트·지식 기반 추론 (InvokeAgent, Retrieve, RetrieveAndGenerate)

**기능 묶음**
- 맞춤화: 미세 조정(레이블 있음), 지속적인 사전 훈련(레이블 없음)
- [[Bedrock 지식 기반]] (RAG), [[Bedrock 가드레일]], [[Bedrock 에이전트]], [[Bedrock Flows]], [[Bedrock 프롬프트 관리]]
- 모델 평가: 자동 평가·인적 평가 (Part 8·9)
- Bedrock Studio: 생성형 AI 앱 개발 환경

**요금**
- 온디맨드: 입력·출력 토큰 수 또는 이미지 수
- 배치: 결과를 S3로, **50% 저렴**
- 프로비저닝된 처리량: 1~6개월 약정, 시간 단위 과금
- 모델 사용자 지정: 훈련 토큰 × 에포크 + 모델 저장 비용

**보안**
- 전송 중 TLS 1.2, 저장 시 [[AWS KMS]] 키로 암호화
- VPC, S3 VPC 엔드포인트, IAM·버킷 정책
- [[AWS PrivateLink]]로 비공개 연결
- 고객 데이터는 기반 모델 훈련에 쓰이지 않음

## 헷갈리는 서비스
| 비교 대상 | 차이 |
|---|---|
| [[SageMaker JumpStart]] | 모델을 **직접 배포·관리**(인프라 제어). Bedrock은 서버리스 API |
| [[Amazon SageMaker]] | 모델을 직접 만들고 훈련하는 ML 플랫폼 |
| [[Amazon Q Business]] | 완성된 업무용 도우미. Bedrock은 개발자가 앱을 만드는 기반 |

## 관련
- 비교: [[비교 - 모델 맞춤화 4가지]], [[비교 - 배포 전략과 추론 옵션]]
- 이론: [[P05 파운데이션 모델과 Bedrock]]
- 덱: 70~72, 75, 90~92번 슬라이드

## 셀프 체크
> [!question]- 사용자 지정(미세 조정) 모델을 호출하려면 필요한 요금 방식은?
> 프로비저닝된 처리량

> [!question]- 실시간 응답이 필요 없는 대량 프롬프트 처리 비용을 줄이려면?
> 배치 추론 (최대 50% 저렴, 결과는 S3)

> [!question]- 모델에 보낸 프롬프트·응답을 기록하는 기능과 저장 위치는?
> 모델 호출 로깅 → CloudWatch Logs 또는 S3
