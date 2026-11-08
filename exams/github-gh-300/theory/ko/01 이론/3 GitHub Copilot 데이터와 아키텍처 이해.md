---
aliases: ["도메인 3", "Domain 3", "Understand GitHub Copilot data and architecture", "GitHub Copilot 데이터 및 아키텍처 이해"]
tags: ["gh-300", "이론", "도메인3"]
도메인: 3
목표: ["3.1", "3.2", "3.3", "3.4", "3.5"]
---
# 도메인 3　GitHub Copilot 데이터와 아키텍처 이해

**English** Domain 3: Understand GitHub Copilot data and architecture  
**한국어 공식 안내서** GitHub Copilot 데이터 및 아키텍처 이해

도메인 3 (10–15%) · 목표 5개

Copilot이 데이터를 어떻게 쓰고 보존하는지, 프롬프트가 어떤 단계를 거쳐 제안이 되는지, LLM과 Copilot의 한계를 다룬다.

> [!abstract] 데이터 처리와 흐름 설명
> Describe data handling and flow · 데이터 처리 및 흐름 설명

## 목표 3.1

**데이터 사용, 흐름, 공유를 설명한다**

> [!quote]- 공식 원문 (English / 한국어 공식 안내서)
> Explain data usage, flow, and sharing
>
> 데이터 사용량, 흐름 및 공유 설명

IDE 코드 제안 프롬프트는 제안 후 폐기된다. Business·Enterprise 기본값으로 IDE Chat·CLI는 보존하지 않고, GitHub.com·Mobile은 최대 28일 보존한다. 개인 요금제는 학습 사용 설정이 있다.

관련 카드: [[데이터 사용·보존]] · [[개인 Copilot 설정]]

## 목표 3.2

**입력 처리와 프롬프트 구성을 설명한다**

> [!quote]- 공식 원문 (English / 한국어 공식 안내서)
> Describe input processing and prompt building
>
> 입력 처리 및 프롬프트 빌드 설명

커서 앞뒤 코드, 파일 이름·유형, 열린 탭, 프로젝트 구조, 언어·프레임워크를 모아 Fill-in-the-Middle로 전처리해 프롬프트를 만든다.

관련 카드: [[프롬프트 처리 흐름]]

## 목표 3.3

**프록시 필터링과 후처리를 설명한다**

> [!quote]- 공식 원문 (English / 한국어 공식 안내서)
> Explain proxy filtering and post-processing
>
> 프록시 필터링 및 후처리 설명

프록시가 프롬프트 해킹 시도를 막고, 유해성 필터가 부적절 내용·개인 데이터를 거른다. 생성 후에는 유해성, 코드 품질(XSS·SQL 인젝션), 공개 코드 일치(선택)를 검사한다.

관련 카드: [[프롬프트 처리 흐름]] · [[프록시 필터와 후처리]]

> [!abstract] 수명 주기와 한계 이해
> Understand lifecycle and limitations · 수명 주기 및 제한 사항 이해

## 목표 3.4

**코드 제안 수명 주기를 시각화한다**

> [!quote]- 공식 원문 (English / 한국어 공식 안내서)
> Visualize code suggestion lifecycle
>
> 코드 제안 수명 주기 시각화

입력·컨텍스트 → 프롬프트 → 모델 → 필터 → 표시 → 수락·거절 → 반복. 수락해야만 적용된다.

관련 카드: [[코드 제안 수명 주기]]

## 목표 3.5

**LLM과 Copilot의 한계를 설명한다**

> [!quote]- 공식 원문 (English / 한국어 공식 안내서)
> Describe limitations of LLMs and Copilot
>
> LLM 및 부조종사에 대한 제한 사항 설명

LLM은 방대한 데이터로 학습하지만 맥락 오해, 설계 판단 부족, 편향·노후 관행, 새 기술에서 정확도 저하, 컨텍스트 한계가 있다. GitHub는 LoRA 파인튜닝을 썼다.

관련 카드: [[생성형 AI의 위험과 한계]] · [[LLM과 Copilot의 한계]]

## 요약
- 인바운드: 전송·컨텍스트 → 프록시 → 유해성 → LLM.
- 아웃바운드: 후처리(유해성·품질·공개 코드) → 전달.
- GitHub.com 채팅 보존 최대 28일(Business·Enterprise 기본).
- 공개 코드 비교 약 150자.

## 이 도메인의 카드
- [[데이터 사용·보존]] — Copilot은 제안을 만들 때 코드와 컨텍스트를 프롬프트로 보내고, 보존·학습 사용 여부는 기능과 요금제에 따라 다르다.
- [[프롬프트 처리 흐름]] — 사용자 프롬프트는 안전한 전송과 컨텍스트 수집 → 프록시 필터 → 유해성 필터 → LLM 생성 → 후처리·검증 → 전달의 단계를 거친다(Microsoft Learn 모듈).
- [[프록시 필터와 후처리]] — 프록시는 입력 단계에서 프롬프트 조작·해킹 시도를 막고, 생성 후에는 유해성·코드 품질·공개 코드 일치 검사로 응답을 걸러 낸다.
- [[코드 제안 수명 주기]] — 코드 제안은 사용자의 입력·컨텍스트 → 프롬프트 → 모델 생성 → 필터 → 편집기 표시 → 수락·거절 → 다음 입력으로 반복되는 순환이다.
- [[LLM과 Copilot의 한계]] — LLM은 방대한 데이터로 학습해 맥락에 맞는 텍스트를 생성하지만, 제한된 컨텍스트, 학습 데이터의 편향·노후화, 그럴듯한 오류 같은 한계가 있다.
