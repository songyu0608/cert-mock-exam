---
분류: 생성형 AI(Bedrock)
파트: 5
도메인: [D2, D3]
중요도: 상
aliases: [Knowledge Bases, 지식 기반, RAG]
tags: [서비스, 분류/Bedrock]
---
# Bedrock 지식 기반

> [!summary] 한 줄 정의
> Bedrock에서 **RAG(검색 증강 생성)** 를 관리형으로 구현하는 기능. 문서를 임베딩해 벡터 저장소에 넣고 질의 때 검색해 프롬프트에 붙인다

## 시험 트리거
| 문제 속 표현 | 정답 |
|---|---|
| 재훈련 없이 최신·사내 정보 반영 | **RAG → 지식 기반** |
| 모델 답변에 출처(근거 문서) 제공, 환각 감소 | **지식 기반** |
| 지식 기반의 기본 벡터 저장소 | **Amazon OpenSearch Serverless** |
| 문서를 벡터로 바꾸는 모델 | **임베딩 모델** (Titan, Cohere) |
| 에이전트가 필요할 때 지식 기반을 도구로 사용 | **에이전틱 RAG** |

## 주요 기능
**구성 요소**
- 데이터 원본: S3, 웹 크롤러, Confluence, Salesforce, SharePoint
- 청킹: 문서를 조각으로 나눔 (조각당 토큰 수 조절)
- 임베딩 모델: Amazon Titan, Cohere (모델 액세스 필요, 차원 조절)
- 벡터 저장소: 기본 OpenSearch Serverless / MemoryDB, Aurora(pgvector), MongoDB Atlas, Pinecone, Redis Enterprise Cloud

**RAG 흐름**
- ① 질문 → ② 벡터 저장소 시맨틱 검색 → ③ 컨텍스트 + 질의 = 증강된 프롬프트 → ④ 모델이 근거로 생성
- API: Retrieve(검색만), RetrieveAndGenerate(검색+생성)

**사용 방식**
- 콘솔에서 문서와 채팅
- 에이전트에 연결 (에이전틱 RAG)
- 앱에서 직접 호출

**RAG 장단점**
- 장점: 미세 조정보다 빠르고 저렴, DB만 갱신하면 최신화, 환각 감소
- 한계: 검색 품질·프롬프트 템플릿에 민감, 여전히 환각 가능, 모델을 훈련하는 것이 아님

## 헷갈리는 서비스
| 비교 대상 | 차이 |
|---|---|
| 미세 조정 | 모델 **가중치를 바꿈**. 지식 기반은 가중치 그대로, 검색 결과를 프롬프트에 붙임 |
| [[Amazon OpenSearch Service]] | 벡터 DB 자체. 지식 기반은 그 위의 RAG 관리 기능 |
| [[Amazon Q Business]] | 완성형 사내 검색 도우미(RAG 내장). 지식 기반은 개발자용 구성 요소 |

## 관련
- 비교: [[비교 - 모델 맞춤화 4가지]]
- 이론: [[P05 파운데이션 모델과 Bedrock]]
- 덱: 76~81번 슬라이드

## 셀프 체크
> [!question]- RAG가 미세 조정보다 유리한 상황은?
> 자주 바뀌는 최신 정보·사내 문서를 재훈련 없이 반영해야 할 때

> [!question]- 의미가 비슷한 문서를 찾는 데 쓰는 것은?
> 임베딩 벡터 + 벡터 DB의 시맨틱 검색(K-최근접 이웃)
