---
파트: 4
도메인: D1
덱: 50~68
tags: [이론, 파트/P04]
aliases: [Part 4, SageMaker]
---
# P04 Amazon SageMaker

> [!abstract] 이 파트에서 배우는 것
> SageMaker의 훈련·배포 구조 → Studio, Autopilot, Canvas, Data Wrangler, Feature Store, 계보 추적 → 안전한 배포 → 기본 제공 알고리즘 17종
> 관련 시험 도메인: **D1**
> 서비스 하나하나의 정리는 [[Amazon SageMaker]] 카드에서 시작해 링크를 따라가면 된다.

---

## 1. SageMaker가 다루는 범위
**ML 워크플로 전체**: 데이터 가져오기·정제·준비 → 모델 훈련·평가 → 배포·운영 중 결과 평가

### 훈련과 배포의 구조
```
S3 훈련 데이터 + ECR 훈련 코드 이미지 → 모델 훈련 → S3 모델 아티팩트
S3 모델 아티팩트 + ECR 추론 코드 이미지 → 배포·호스팅 → 엔드포인트 ↔ 클라이언트 앱
```

## 2. 노트북, 데이터 준비, 처리 작업
- 노트북 인스턴스(EC2 기반)가 전체를 지휘. S3 접근, scikit-learn·Spark·TensorFlow, 훈련 인스턴스 생성, 배포
- 데이터는 보통 **S3**에서. 알고리즘에 따라 **RecordIO/Protobuf** 형식이 흔함. Athena, EMR, Redshift, Keyspaces에서도 수집
- **SageMaker Processing**: S3에서 복사 → 처리 컨테이너 실행 → S3로 출력

## 3. 훈련하기
훈련 작업에 지정하는 4가지: **훈련 데이터 S3 URL, 컴퓨팅 리소스, 결과 저장 S3 URL, 훈련 코드 ECR 경로**

훈련 방법: 기본 제공 알고리즘, Spark MLlib, 사용자 코드(TensorFlow, MXNet, PyTorch, scikit-learn, RLEstimator, XGBoost, Hugging Face, Chainer), 자체 Docker 이미지, AWS Marketplace 알고리즘

## 4. 배포하기 → [[SageMaker 추론 옵션]]
- **영구 엔드포인트**: 개별 예측을 즉시 · **배치 변환**: 데이터 세트 전체를 한 번에
- 추가: 추론 파이프라인, [[SageMaker Neo]](엣지), Elastic Inference, 자동 확장, 섀도 테스트

| 추론 옵션 | 언제 |
|---|---|
| 실시간 | 짧은 지연 시간, 즉시 응답 |
| 서버리스 | 간헐적 트래픽, 콜드 스타트 감수 |
| 비동기 | 큰 페이로드, 긴 처리 시간(최대 수 분), 대기열 |
| 배치 변환 | 대량 데이터 오프라인 처리, 엔드포인트 불필요 |

## 5. SageMaker Studio와 주변 도구
- **Studio**: ML용 시각적 IDE. 대부분 기능이 여기에 통합
- 노트북: Jupyter를 만들고 공유, 관리할 인프라 없음
- [[SageMaker Experiments]]: ML 작업 기록·비교·검색
- Studio 안: Autopilot, Model Monitor, Experiments, [[SageMaker Debugger]], 자동 모델 튜닝

## 6. SageMaker Autopilot (AutoML) → [[SageMaker Autopilot]]
- 자동화: **알고리즘 선택, 데이터 전처리, 모델 튜닝, 인프라**
- 흐름: S3 데이터 로드 → 대상 열 선택 → 자동 생성 → 노트북으로 확인 → **모델 리더보드**에서 선택 → 배포
- Clarify 통합 설명 가능성: **SHAP(섀플리 값)** 으로 특징 중요도
- 문제 유형: 이진·다중 클래스 분류, 회귀 · 데이터: **테이블 형식 CSV 또는 Parquet만**
- 알고리즘: Linear Learner, XGBoost, 딥 러닝(MLP), 앙상블

| 훈련 모드 | 동작 |
|---|---|
| **HPO** | 최대 100회 시도. 100MB 미만 베이지안, 이상 다중 충실도 최적화. 나쁜 시도 조기 중지 |
| **앙상블** | AutoGluon으로 10회 시도, 스태킹 앙상블 |
| **자동** | 100MB 초과 HPO, 미만 앙상블. 크기를 못 읽으면 HPO |

## 7. 안전한 배포
- **배포 가드레일(블루/그린)**: 한 번에 전부 / **카나리**(일부 먼저) / **선형**(같은 간격) + **자동 롤백**
- **섀도 테스트**: 새 모델(섀도 변형)을 운영 모델과 비교, 콘솔에서 승격 시점 결정

## 8. 그 밖의 주요 기능
- [[SageMaker JumpStart]]: 모델 허브, 150개 이상 오픈 소스 모델을 클릭 한 번으로
- [[SageMaker Data Wrangler]]: Studio 안에서 데이터 가져오기·변환·분석·내보내기
- [[SageMaker Feature Store]]: 특징 찾기·공유, 온라인·오프라인 모드
- SageMaker Edge Manager: 엣지 장치 에이전트, Neo로 최적화한 모델 사용
- 비동기 추론 엔드포인트

> [!tip] 시험 포인트
> 사전 훈련된 오픈 소스 모델로 빠르게 시작 → **JumpStart**

## 9. Feature Store → [[SageMaker Feature Store]]
- **특징** = 모델 훈련에 쓰는 속성 (고객 이탈: 가입 기간, 월 사용량, 문의 횟수)
- 구조: 특징 저장소 → **특징 그룹** → 레코드(식별자, 특징 이름, 이벤트 시간)
- 수집: Kinesis, MSK(Kafka), Spark, Data Wrangler (스트리밍·배치)
- **온라인 스토어**: PutRecord/GetRecord로 저지연 실시간 · **오프라인 스토어(S3)**: Athena 등으로 배치, Glue Data Catalog 자동 생성
- 보안: 암호화, KMS 고객 관리형 키, IAM, PrivateLink

## 10. ML Lineage Tracking → [[SageMaker ML Lineage Tracking]]
- ML 워크플로 기록·저장, 모델 이력, **감사와 규정 준수**
- AWS RAM으로 계정 간 공유, LineageQuery API로 조회
- 엔터티: Trial component(작업), Trial(모델), Experiment(Trial 묶음), Context, Action, Artifact, Association

## 11. Data Wrangler → [[SageMaker Data Wrangler]]
- Studio 안의 시각적 데이터 준비: 가져오기 → 미리 보기 → 시각화 → 변환 → Quick Model → 내보내기
- 원본: S3, Athena, Redshift, Lake Formation, Feature Store, JDBC
- **300가지 이상 기본 변환** + pandas·PySpark 사용자 변환
- 내보내기: Processing, Pipelines, Feature Store, 노트북

## 12. Canvas → [[SageMaker Canvas]]
- **비즈니스 분석가용 노코드 ML**: CSV 업로드 → 예측할 열 선택 → 빌드 → 예측
- 분류·회귀, 자동 데이터 정리(결측값, 이상치, 중복), Studio와 공유

> [!warning] 헷갈리는 세 도구 → [[비교 - SageMaker 노코드·자동화 도구]]
> - **Canvas**: 코드 없이 예측 (비즈니스 분석가)
> - **Autopilot**: 알고리즘 선택·튜닝 자동화(AutoML), 코드 사용 가능
> - **Data Wrangler**: 훈련 **전** 데이터 준비·변환

---

## 13. 기본 제공 알고리즘 → [[기본 제공 알고리즘 표]]
### 표 형식·추천
| 알고리즘 | 하는 일 | 방식 |
|---|---|---|
| **Linear Learner** | 직선을 맞춰 회귀·분류 | 지도 |
| **XGBoost** | 부스팅한 의사 결정 트리. 표 형식 데이터의 강력한 기본 선택 | 지도 |
| **KNN** | 가장 가까운 K개로 분류(다수결)·회귀(평균) | 지도 |
| **Factorization Machines** | **희소 데이터**(클릭 예측, 추천), 쌍별 상호 작용 | 지도 |

### 텍스트·시퀀스·시계열
| 알고리즘 | 하는 일 | 방식 |
|---|---|---|
| **Seq2Seq** | 시퀀스→시퀀스: 번역, 요약, 음성→텍스트 | 지도 |
| **DeepAR** | 1차원 **시계열 예측**(RNN), 관련 시계열로 한 모델 | 지도 |
| **BlazingText** | 텍스트 분류 / **Word2vec**(단어 임베딩) | 분류는 지도 |
| **Object2Vec** | 임의 객체의 저차원 임베딩 | - |
| **Neural Topic Model** | 문서를 주제별로. 주제 이름은 못 붙임 | 비지도 |
| **LDA** | 주제 모델링(딥 러닝 아님) | 비지도 |

### 이미지
| 알고리즘 | 결과 |
|---|---|
| **이미지 분류** | 무엇이 있는지 (어디인지는 모름) |
| **객체 탐지** | **경계 상자** + 클래스 + 신뢰도 |
| **시맨틱 분할** | **픽셀 단위** 분할 마스크 (자율 주행, 의료 영상) |

### 비지도: 이상 탐지·군집·차원 축소
| 알고리즘 | 하는 일 |
|---|---|
| **Random Cut Forest(RCF)** | **이상 탐지**, 이상 점수. Amazon 개발 |
| **IP Insights** | IP 사용 패턴으로 **수상한 로그인** 탐지 |
| **K-Means** | K개 그룹으로 군집화 (유클리드 거리) |
| **PCA** | **차원 축소**. 첫 번째 성분의 변동성이 가장 큼 |

---

## 파트 핵심 요약
> [!summary] 시험 직전 체크
> - 노코드 예측 → Canvas · AutoML → Autopilot · 데이터 준비 → Data Wrangler · 사전 훈련 모델 → JumpStart
> - 즉시 → 실시간 · 간헐적 → 서버리스 · 큰 입력·긴 처리 → 비동기 · 대량 일괄 → 배치 변환
> - 블루/그린(한 번에·카나리·선형) + 자동 롤백 · 운영 모델과 비교 → 섀도 테스트
> - 특징 저장·공유 → Feature Store · 감사용 이력 → ML Lineage Tracking
> - 번역·요약 → Seq2Seq · 시계열 → DeepAR · 단어 임베딩 → BlazingText · 주제 → NTM·LDA
> - 경계 상자 → 객체 탐지 · 픽셀 → 시맨틱 분할 · 이상 → RCF · 희소 추천 → Factorization Machines

## 이어서 보기
- 비교: [[비교 - SageMaker 노코드·자동화 도구]], [[비교 - 배포 전략과 추론 옵션]]
- 암기: [[플래시카드 P04]], [[기본 제공 알고리즘 표]]
- 이전: [[P03 AI 활용 사례와 프롬프트]] · 다음: [[P05 파운데이션 모델과 Bedrock]]
