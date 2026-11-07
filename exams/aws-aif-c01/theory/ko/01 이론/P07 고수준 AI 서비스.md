---
파트: 7
도메인: D1
덱: 117~129
tags: [이론, 파트/P07]
aliases: [Part 7, AI 서비스, 고수준 AI 서비스]
---
# P07 고수준 AI 서비스

> [!abstract] 이 파트에서 배우는 것
> ML 지식 없이 **API 호출만으로** 쓰는 AWS의 완성형 AI 서비스. "이 상황에는 어떤 서비스?"를 맞히는 문제가 많다.
> 관련 시험 도메인: **D1**

---

## 1. 전체 지도
| 영역 | 서비스 | 한 줄 |
|---|---|---|
| 텍스트·언어 | [[Amazon Comprehend]] | 텍스트 분석(감정·엔터티·PII) |
| | [[Amazon Translate]] | 번역 |
| | [[Amazon Textract]] | 문서에서 텍스트·양식·표 추출 |
| 음성 | [[Amazon Transcribe]] | 음성 → 텍스트 |
| | [[Amazon Polly]] | 텍스트 → 음성 |
| | [[Amazon Lex]] | 대화형 챗봇·음성 봇 |
| 비전 | [[Amazon Rekognition]] | 이미지·동영상 분석, 얼굴·객체·텍스트 |
| | Rekognition Custom Labels | 나만의 레이블 |
| 예측·추천 | [[Amazon Forecast]] | 시계열 예측 |
| | [[Amazon Personalize]] | 개인화 추천 |
| 위험·품질 | [[Amazon Fraud Detector]] | 온라인 사기 탐지 |
| | [[Amazon CodeGuru]] | 자동 코드 리뷰 |
| 콜센터·학습 | [[Contact Lens for Amazon Connect]] | 콜센터 통화 분석 |
| | [[AWS DeepRacer]] | 강화 학습 레이싱카 |

---

## 2. Amazon Comprehend: NLP와 텍스트 분석
- 입력: 소셜 미디어, 이메일, 웹 페이지, 문서, 전사본, 의료 기록(**Comprehend Medical**)
- 추출: 핵심 구, **엔터티**, **감정**, 언어, 구문, 주제, 문서 분류, 이벤트 탐지, **PII 식별과 편집**
- **대상 감정**: 특정 엔터티에 대한 감정
- 내 데이터로 사용자 지정 훈련 가능

> [!example] 분석 예시
> "어제 강남점에서 산 노트북이 정말 마음에 들어요."
> 엔터티: 어제(날짜), 강남점(위치), 노트북(상품) · 감정: 긍정 · 언어: 한국어 · 대상 감정: 노트북 → 긍정

## 3. Amazon Translate와 Amazon Polly
### Translate
- 딥 러닝 번역
- **사용자 지정 용어**: **CSV 또는 TMX**. 고유 명사, 브랜드명처럼 번역하면 안 되거나 정해진 번역이 있는 단어

### Polly (뉴럴 TTS)
- **어휘집(Lexicon)**: 특정 단어·구의 발음 지정 (약어를 풀어 읽기)
- **SSML**: 강조, 발음, 호흡, 속삭임, 말하는 속도, 음높이, 쉼
- **음성 마크**: 문장·단어의 시작·끝 위치 → 입 모양 애니메이션 동기화

## 4. Amazon Transcribe: 음성 → 텍스트
- 입력: FLAC, MP3, MP4, WAV, 스트리밍(HTTP/2, WebSocket)
- **화자 식별**: 누가 말했는지 · **채널 식별**: 두 통화자를 따로 전사해 합침 · **자동 언어 식별**
- **사용자 지정 어휘**: 어휘 목록 또는 어휘 표(SoundsLike, IPA, DisplayAs)
- **통화 분석(Call Analytics)**: 고객 서비스·영업 통화. 감정, 말 속도, 끼어들기, "구독 해지해 주세요" 같은 문구 탐지
- **Medical**: 의학 용어, **HIPAA 적격**
- 실시간 자막

## 5. Amazon Rekognition
### 할 수 있는 일
- 객체·장면 탐지, 자체 얼굴 컬렉션
- **이미지 조정(모더레이션)**: 부적절한 이미지 감지
- 얼굴 분석·속성, **유명인 인식**, **얼굴 비교**
- 이미지 속 텍스트(간판·표지판)
- 동영상: 객체·사람·유명인 타임라인, 동선 추적

### 세부 사항
- 이미지는 S3 또는 바이트 (이미 S3에 있으면 S3가 빠름)
- 얼굴 인식 품질: 조명, 각도, 눈 노출, 해상도
- 동영상은 **Kinesis Video Streams** (H.264, 초당 5~30프레임, 프레임보다 해상도 우선)
- Lambda와 연결해 업로드 시 자동 분석

### Rekognition Custom Labels
- 레이블 붙인 **소량의 이미지**로 훈련, 나만의 항목에 나만의 레이블
- 예: 공장 라인 사진의 자사 부품 불량 유형(긁힘, 찍힘, 변색), 매장 선반의 자사 상품 로고

> [!tip] 시험 포인트
> 일반 객체 인식으로 안 되는 "우리 회사만의 물체"를 적은 이미지로 인식 → **Rekognition Custom Labels**

## 6. Amazon Forecast: 시계열 예측
- **AutoML**이 모델 선택: ARIMA, DeepAR, ETS, NPTS, CNN-QR, Prophet
- 가격, 프로모션, 경제 지표 등 관련 데이터를 함께 넣어 관계 파악
- 재고·재무·리소스 계획. 구성: 데이터셋 그룹 → 예측기 → 예측
- 참고: AWS는 2024년 신규 고객 가입 중단을 발표. 시험에는 "수요·재고 예측 서비스"로 나올 수 있다

## 7. Amazon Lex: 자연어 챗봇 엔진
- Alexa의 내부 기술. **인텐트(의도)** 중심
- 배포: AWS Mobile SDK, Facebook Messenger, Slack, Twilio

| 요소 | 예 |
|---|---|
| **발화** | "호텔 예약하고 싶어요" |
| **인텐트** | 호텔 예약 |
| **슬롯** | 체크인 날짜, 숙박 일수, 객실 유형 |
| **이행** | Lambda 함수가 예약 처리 |

- **자동 챗봇 디자이너**: 기존 대화 전사본에서 인텐트·슬롯을 뽑아 봇 설계. Amazon Connect 전사본 연동

## 8. Amazon Personalize
### 추천 엔진과 API
- Amazon이 직접 쓰는 것과 같은 완전 관리형 추천 엔진
- 데이터: 구매, 평점, 노출, 장바구니, 카탈로그, 사용자 인구통계 (S3 또는 API). 스키마는 **Avro**
- **GetRecommendations**: 추천 상품, 유사 항목
- **GetPersonalizedRanking**: 내가 준 목록을 사용자에 맞게 순위 → 편집 통제 가능

### 주요 기능
실시간·배치 추천, **콜드 스타트** 대응, 컨텍스트 추천(기기·시간), 비즈니스 규칙·필터, 프로모션, 개인화 순위, 유사 항목·인기 항목, 비정형 텍스트 입력, 사용자 세분화

### 관련성 유지와 보안
- 증분 가져오기, **PutEvents**로 실시간 행동 입력
- 재훈련 = 새 솔루션 버전. 기본 2시간마다 업데이트, 주 1회 전체 재훈련(trainingMode=FULL)
- 계정 간 공유 없음, KMS·SSE-S3, TLS 1.2, IAM, S3 버킷 정책, CloudWatch·CloudTrail

## 9. 그 밖의 서비스
- **Textract**: 양식, 필드, 표까지 인식하는 OCR
- **DeepRacer**: 강화 학습 1/18 레이싱카 (DeepLens는 지원 종료)
- **Fraud Detector**: 과거 사기 데이터 → 템플릿 → 모델 → API. 신규 계정, 비회원 결제, 체험 악용, 온라인 결제 위험
- **CodeGuru**: ML 코드 리뷰. 성능 저하 코드, 리소스 누수, 경쟁 상태, 보안 취약점 (Java·Python)
- **Contact Lens**: 콜센터 통화·채팅 검색, 감정, 성공 통화 발화, 자동 분류, 말 속도·끼어들기, 테마 탐지

---

## 헷갈리기 쉬운 서비스 짝
> [!warning] 반드시 구분
> | 짝 | 구분 |
> |---|---|
> | Transcribe vs Polly | 음성 → 텍스트는 **Transcribe** · 텍스트 → 음성은 **Polly** |
> | Textract vs Comprehend | 문서 이미지에서 글자·표 뽑기 **Textract** · 뽑은 글의 의미·감정 **Comprehend** |
> | Rekognition vs Textract | 사진 속 사물·얼굴·간판 **Rekognition** · 양식·표가 있는 문서 **Textract** |
> | Lex vs Contact Lens | 챗봇 **만들기 Lex** · 콜센터 통화 **분석 Contact Lens** |
> | Comprehend vs Translate | 언어 감지·감정 **Comprehend** · 다른 언어로 옮기기 **Translate** |
> | Forecast vs Personalize | 수요·수치 예측 **Forecast** · 사용자별 추천 **Personalize** |

## 이어서 보기
- 비교: [[비교 - 언어·음성·문서 서비스]]
- 암기: [[플래시카드 P07]], [[시험 트리거 역색인]]
- 이전: [[P06 Amazon Q와 Quick]] · 다음: [[P08 미세 조정과 평가 지표]]
