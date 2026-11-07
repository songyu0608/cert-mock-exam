---
분류: 생성형 AI(Bedrock)
파트: 5
도메인: D2
중요도: 중
aliases: [Flows, Prompt Flows]
tags: [서비스, 분류/Bedrock]
---
# Bedrock Flows

> [!summary] 한 줄 정의
> 프롬프트, 모델, 지식 기반, Lambda 등을 **노드로 연결**해 생성형 AI 워크플로를 시각적으로 만드는 기능

## 시험 트리거
- "프롬프트와 모델을 사슬처럼 연결"
- "시각적 빌더로 생성형 AI 워크플로"
- "조건에 따라 다른 노드로 분기"

## 주요 기능
- 노드와 연결로 구성, 연결은 조건부 가능
- Flow Builder(시각적) 또는 API의 JSON으로 정의
- 저장된 프롬프트([[Bedrock 프롬프트 관리]])를 노드로 사용
- 입력 전처리·출력 후처리 강제
- 예전 "Prompt Flows"가 Flows로 흡수됨

## 헷갈리는 서비스
| 비교 대상 | 차이 |
|---|---|
| [[Bedrock 에이전트]] | LLM이 스스로 단계를 계획. Flows는 사람이 흐름을 정함 |
| [[Amazon Quick]] Flows | 업무 사용자용 노코드 반복 업무 자동화 |

## 관련
- 이론: [[P05 파운데이션 모델과 Bedrock]]
- 덱: 84번 슬라이드

## 셀프 체크
> [!question]- Flows에서 조건 분기를 담당하는 것은?
> 조건 노드(조건부 연결)
