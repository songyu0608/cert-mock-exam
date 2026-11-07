---
분류: 데이터·인프라
파트: [2, 5]
도메인: D2
중요도: 중
aliases: [Inferentia, Trainium, Graviton, AWS Inferentia, AWS Trainium]
tags: [서비스, 분류/인프라]
---
# AWS AI 칩

> [!summary] 한 줄 정의
> AWS가 설계한 ML 전용 칩: **Trainium은 훈련**, **Inferentia는 추론**용으로 비용 효율과 에너지 효율이 높다

## 시험 트리거
- "훈련 비용 절감" → **Trainium**
- "추론 비용 절감, 고성능 저비용 추론" → **Inferentia**
- "CPU 기반 추론" → **Graviton3**
- "환경 영향(탄소) 줄이기"

## 주요 기능
- Trainium(Trn1) → 모델 훈련
- Inferentia(Inf2) → 딥 러닝 추론
- Graviton3 → CPU 추론
- EC2 Trn 인스턴스(Trainium), Inf 인스턴스(Inferentia)
- GPU 대비 비용·전력 효율

## 헷갈리는 서비스
| 비교 대상 | 차이 |
|---|---|
| [[SageMaker Neo]] | 모델을 하드웨어에 맞게 최적화(소프트웨어) |

## 관련
- 이론: [[P02 ML 수명 주기와 MLOps]]
- 덱: 29, 34번 슬라이드

## 셀프 체크
> [!question]- 추론용 칩과 훈련용 칩은?
> 딥 러닝 추론 Inferentia, 훈련 Trainium (CPU 추론은 Graviton)
