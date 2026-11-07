---
분류: 데이터·인프라
파트: 5
도메인: D2
중요도: 중
aliases: [OpenSearch, OpenSearch Serverless, 벡터 DB]
tags: [서비스, 분류/인프라]
---
# Amazon OpenSearch Service

> [!summary] 한 줄 정의
> 검색·분석 엔진이자 **벡터 데이터베이스**. Serverless는 Bedrock 지식 기반의 기본 벡터 저장소

## 시험 트리거
- "Bedrock 지식 기반의 기본 벡터 저장소" → **OpenSearch Serverless**
- "벡터 검색, K-최근접 이웃"

## 주요 기능
- 전통적인 텍스트 검색(TF-IDF)과 벡터 검색
- AWS의 다른 벡터 DB: MemoryDB, RDS·Aurora PostgreSQL(pgvector), Kendra 등

## 헷갈리는 서비스
| 비교 대상 | 차이 |
|---|---|
| [[Bedrock 지식 기반]] | RAG 관리 기능. OpenSearch는 저장소 |

## 관련
- 이론: [[P05 파운데이션 모델과 Bedrock]]
- 덱: 78~80번 슬라이드

## 셀프 체크
> [!question]- pgvector를 쓰는 AWS 벡터 저장소는?
> RDS·Aurora PostgreSQL
