---
파트: 2
도메인: D1
덱: 21~34
tags: [이론, 파트/P02, MLOps]
aliases: [Part 2, ML 수명 주기, MLOps]
---
# P02 ML 수명 주기와 MLOps

> [!abstract] 이 파트에서 배우는 것
> AWS가 정의한 ML 설계 원칙 10가지 → ML 수명 주기 6단계와 단계별 모범 사례·AWS 서비스 → Well-Architected ML 렌즈 → MLOps
> 관련 시험 도메인: **D1 AI 및 ML 기초**
> 이 파트는 **"이 모범 사례에는 어떤 서비스?"** 를 묻는 문제의 재료다. 서비스 이름이 많이 나오니 표 위주로 익힌다.

---

## 1. ML 설계 원칙 10가지
1. **소유권 지정**: 각 단계·자산마다 책임자
2. **보호**: 보안 제어 적용
3. **복원력**: 내결함성과 복구 가능성
4. **재사용성**
5. **재현성**: 버전 관리로 같은 결과를 다시 만들 수 있게
6. **리소스 최적화**
7. **비용 절감**
8. **자동화**: CI/CD와 **CT(지속적 훈련)**
9. **지속적 개선**: 모니터링과 분석
10. **환경 영향 최소화**: 관리형 서비스, 효율적인 하드웨어·소프트웨어

---

## 2. ML 수명 주기 6단계
```
① 비즈니스 목표 식별 → ② ML 문제 구성 → ③ 데이터 처리 → ④ 모델 개발 → ⑤ 배포 → ⑥ 모니터링
                                   ↑___________ 피드백 루프 ___________|
```
- 모니터링 결과는 데이터 처리와 모델 개발로 돌아간다. 직선이 아니라 **순환**

> [!tip] 시험 포인트
> 단계 순서를 맞추는 **순서 배열** 문제로 나올 수 있다.

---

## 3. ① 비즈니스 목표 식별
- 적절한 기술을 갖춘 인력, 책임과 권한 부여
- **설명 가능성 수준 합의** → [[SageMaker Clarify]]
- 규정 준수 모니터링 계획, 드리프트 측정 방법
- ML 데이터의 사용 권한·개인정보·라이선스 검증
- **KPI** 결정, **ROI와 기회비용** 정의
- 관리형 서비스로 **TCO(총소유비용)** 절감
- 환경 영향 정의

## 4. ② ML 문제 구성
먼저 따질 질문:
- **ML이 정말 맞는 해법인가?** 규칙으로 충분하면 ML은 필요 없다
- 평가 지표를 미리 정의
- 사용자 지정 훈련 vs 사전 훈련 모델의 트레이드오프
- **AI 서비스·사전 훈련 모델 우선**: 대형 모델 훈련은 자원·에너지를 많이 쓴다
- 지속 가능한 리전 선택, ML 프로필 템플릿

| 모범 사례 | AWS 서비스 |
|---|---|
| 역할과 책임 정의 | [[SageMaker Role Manager]] |
| 모델 개선 전략 | [[SageMaker Experiments]], 하이퍼파라미터 최적화, AutoML |
| 계보 추적 시스템 | [[SageMaker ML Lineage Tracking]], [[SageMaker Pipelines]], Studio, [[SageMaker Feature Store]], [[SageMaker Model Registry]] |
| 단계 간 피드백 루프 | [[SageMaker Model Monitor]], [[Amazon CloudWatch]], [[Amazon Augmented AI]] |
| 공정성·설명 가능성 검토 | [[SageMaker Clarify]] |
| 데이터 암호화·난독화 설계 | [[AWS Glue]] DataBrew |
| API로 모델 변경을 앱과 분리 | SageMaker + Amazon API Gateway |
| ML 마이크로서비스 | AWS Lambda, AWS Fargate |
| 목적별 AI·ML 서비스 | [[Amazon SageMaker]], [[SageMaker JumpStart]], AWS Marketplace |

## 5. ③ 데이터 처리
| 모범 사례 | AWS 서비스 |
|---|---|
| 데이터 프로파일링으로 품질 개선 | [[SageMaker Data Wrangler]], [[AWS Glue]], Athena, Redshift, [[Amazon QuickSight]] |
| 관련 데이터만 보관(PII 제거) | [[Amazon Comprehend]], [[Amazon Transcribe]], Athena |
| 추적과 버전 관리 | [[SageMaker Model Registry]], 노트북은 Git, [[SageMaker Experiments]] |
| 데이터 카탈로그 | [[AWS Glue]] Data Catalog |
| 최소 권한, 안전한 분석 환경 | [[AWS IAM]], [[AWS KMS]], Secrets Manager, VPC·[[AWS PrivateLink]] |
| 데이터 파이프라인 | [[SageMaker Pipelines]] |
| 민감 데이터 개인정보 보호 | [[Amazon Macie]] |
| 관리형 데이터 레이블링 | [[SageMaker Ground Truth]] |
| 데이터 계보 | [[SageMaker ML Lineage Tracking]] |
| 대화형 분석, 관리형 처리 | [[SageMaker Data Wrangler]], SageMaker Processing |
| 특징 재사용 | [[SageMaker Feature Store]] |

지속 가능성: 유휴 리소스 최소화, 데이터 수명 주기 정책, 지속 가능한 스토리지

## 6. ④ 모델 개발
### 자동화·보안·품질
| 모범 사례 | AWS 서비스 |
|---|---|
| MLOps·CI/CD 자동화 | CloudFormation, CDK, [[SageMaker Pipelines]], Step Functions |
| 승인된 공개 라이브러리 패키징 | Amazon ECR, AWS CodeArtifact |
| 클러스터 노드 간 통신 보호 | SageMaker 노드 간 암호화, EMR 전송 중 암호화 |
| **데이터 중독** 위협 방어 | [[SageMaker Clarify]], Model Registry·Feature Store로 롤백 |
| 훈련·추론 간 특징 일관성 | [[SageMaker Feature Store]] |
| 관련 데이터로 모델 검증 | [[SageMaker Experiments]], [[SageMaker Model Monitor]] |
| 데이터 편향 탐지·완화 | [[SageMaker Clarify]] |
| 전이 학습 시 성능 문제 탐지 | [[SageMaker Debugger]] |

### 효율·비용·지속 가능성
- 성능 트레이드오프: 정확도 vs 복잡성, 편향 vs 공정성, 편향 vs 분산, 정밀도 vs 재현율
- AutoML → [[SageMaker Autopilot]] · 관리형 훈련 → Training Compiler, **관리형 스팟 인스턴스** · 분산 훈련 라이브러리
- 미사용 리소스 중지(결제 경보, Studio 자동 종료), 작은 데이터 세트부터, 웜 스타트·체크포인트
- 하이퍼파라미터 최적화 → SageMaker 자동 모델 튜닝 · 비용 추적 → 태그, AWS Budgets, Cost Explorer · 디버깅 → [[SageMaker Debugger]], CloudWatch
- 지속 가능성: "어느 정도 정확하면 충분한가" 정하고 **조기 중지**, 불필요한 아티팩트 삭제, 무작위·그리드 대신 **베이지안·Hyperband** 튜닝

## 7. ⑤ 배포
- 지표 수립 → CloudWatch, EventBridge, SNS · 적대적 활동 방어 → [[SageMaker Model Monitor]]
- 클라우드 vs 엣지 → [[SageMaker Neo]], IoT Greengrass · 적정 크기 → Inference Recommender, Auto Scaling
- SLA와 지속 가능성 조율: 지연 시간 요구에 따라 서버리스·배치·비동기 선택
- 추론 최적화 → Neo, Treelite, Hugging Face Infinity · 한 엔드포인트에 여러 모델 → 추론 파이프라인
- 배포 전략: **블루/그린, A/B, 선형, 카나리** · 클라우드 배포 옵션: **실시간, 서버리스, 비동기, 배치** → [[SageMaker 추론 옵션]]

> [!tip] 효율적인 칩 (외우기) → [[AWS AI 칩]]
> **Graviton3** → CPU 추론 · **Inferentia(Inf2)** → 딥 러닝 추론 · **Trainium(Trn1)** → 모델 훈련

## 8. ⑥ 모니터링
| 모범 사례 | AWS 서비스 |
|---|---|
| 모델 관찰 가능성과 추적 | Model Monitor, CloudWatch, Clarify, 모델 카드, 계보 추적 |
| 설명 가능성·데이터 드리프트, 성능 저하 탐지 | [[SageMaker Clarify]], [[SageMaker Model Monitor]] |
| 자동 재훈련 | [[SageMaker Pipelines]], Step Functions, Jenkins |
| 재훈련용 데이터 검토 | [[SageMaker Data Wrangler]] |
| **휴먼 인 더 루프** 모니터링 | [[Amazon Augmented AI]] |
| 데이터 이상 활동 감시 | 로깅, [[Amazon GuardDuty]], [[Amazon Macie]] |
| ML 활동별 비용 | 태그, AWS Budgets · ROI 시각화 → QuickSight |
| 훈련 스토리지 | S3 대신 Amazon FSx for Lustre 고려 |

- 지속 가능성: **필요할 때만 재훈련**(허용 정확도를 벗어날 때만)
- Model Monitor가 감시하는 4가지: **데이터 품질, 모델 품질, 편향 드리프트, 특징 기여도 드리프트**

---

## 9. Well-Architected ML 렌즈
- 설계 원칙과 모범 사례를 **AWS Well-Architected Tool의 사용자 지정 렌즈(JSON)** 로 제공
- 인터뷰식 질문으로 현재 상태를 점검하고 개선 권장
- Well-Architected 6원칙: 운영 우수성, 보안, 안정성, 성능 효율성, 비용 최적화, 지속 가능성

## 10. MLOps
- ML을 위한 DevOps. 사람·프로세스·기술이 만나는 지점
- 핵심: 모델 개발 **자동화**, **버전 관리**, **CI/CD/CT**, **모델 거버넌스**(테스트·승인 절차)

```
데이터 준비(Data Wrangler·Feature Store) → 훈련·실험(Experiments) → 등록·승인(Model Registry)
→ 배포(엔드포인트) → 모니터링(Model Monitor) → 재훈련      ※ 전체 자동화: SageMaker Pipelines
```

> [!warning] 헷갈림 주의
> - [[SageMaker Clarify]]는 **편향·설명 가능성**, [[SageMaker Model Monitor]]는 **운영 중 품질·드리프트**
> - [[Amazon Augmented AI]]는 **운영 중 결과의 사람 검토**, [[SageMaker Ground Truth]]는 **훈련 데이터 레이블링**
> - [[SageMaker Model Registry]]는 **모델 버전·승인**, [[SageMaker Feature Store]]는 **특징 저장·공유**

---

## 파트 핵심 요약
> [!summary] 시험 직전 체크
> - 순서: 비즈니스 목표 → 문제 구성 → 데이터 처리 → 모델 개발 → 배포 → 모니터링
> - 편향·설명 가능성 → Clarify · 운영 중 드리프트 → Model Monitor
> - 사람 검토 → A2I · 레이블링 → Ground Truth · 민감 데이터 → Macie
> - 특징 → Feature Store · 버전·승인 → Model Registry · 자동화 → Pipelines
> - Trainium 훈련 · Inferentia 딥 러닝 추론 · Graviton CPU 추론
> - 비용·지속 가능성: 사전 훈련 모델 재사용, 스팟 인스턴스, 베이지안 튜닝, 필요할 때만 재훈련

## 이어서 보기
- 비교: [[비교 - 품질·편향·사람 검토 도구]], [[비교 - 배포 전략과 추론 옵션]]
- 암기: [[플래시카드 P02]], [[시험 트리거 역색인]]
- 이전: [[P01 AI·ML 기초]] · 다음: [[P03 AI 활용 사례와 프롬프트]]
