---
분류: AI 서비스
파트: 7
도메인: D1
중요도: 상
aliases: [Transcribe, Transcribe Medical, Call Analytics, 음성 인식, STT]
tags: [서비스, 분류/AI서비스]
---
# Amazon Transcribe

> [!summary] 한 줄 정의
> **음성을 텍스트로** 바꾸는 자동 음성 인식(ASR) 서비스

## 시험 트리거
| 문제 속 표현 | 정답 |
|---|---|
| 통화·회의 녹음을 텍스트로, 자막 생성 | **Transcribe** |
| 누가 말했는지 구분 | **화자 식별** |
| 상담원과 고객을 따로 전사 | **채널 식별** |
| 고객 통화의 감정, 끼어들기, 특정 문구 탐지 | **Transcribe 통화 분석** |
| 텍스트를 음성으로 | [[Amazon Polly]] |

## 주요 기능
- 입력: FLAC, MP3, MP4, WAV, 스트리밍(HTTP/2, WebSocket)
- 화자 식별, 채널 식별, **자동 언어 식별**
- 사용자 지정 어휘: 어휘 목록 또는 어휘 표(SoundsLike, IPA, DisplayAs)
- 통화 분석: 감정, 말 속도, 끼어들기, 특정 문구
- Transcribe Medical: 의학 용어, HIPAA 적격
- 실시간 자막

## 헷갈리는 서비스
| 비교 대상 | 차이 |
|---|---|
| [[Amazon Polly]] | 반대 방향: 텍스트 → 음성 |
| [[Contact Lens for Amazon Connect]] | Amazon Connect 콜센터의 통화 분석 기능 |

## 관련
- 비교: [[비교 - 언어·음성·문서 서비스]]
- 이론: [[P07 고수준 AI 서비스]]
- 덱: 120번 슬라이드

## 셀프 체크
> [!question]- Transcribe vs Polly
> 음성 → 텍스트는 Transcribe, 텍스트 → 음성은 Polly

> [!question]- 약어나 특수 이름 인식률을 높이려면?
> 사용자 지정 어휘
