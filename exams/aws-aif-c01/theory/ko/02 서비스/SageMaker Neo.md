---
분류: ML 개발(SageMaker)
파트: [2, 4]
도메인: D1
중요도: 중
aliases: [Neo]
tags: [서비스, 분류/SageMaker]
---
# SageMaker Neo

> [!summary] 한 줄 정의
> 훈련한 모델을 엣지 장치 등에서 효율적으로 실행되도록 최적화하는 기능

## 시험 트리거
- "모델을 엣지 장치에 배포"
- "추론용으로 모델 최적화", "비용 효율적인 하드웨어"

## 주요 기능
- 엣지 배포용 모델 최적화 (IoT Greengrass와 함께 클라우드 vs 엣지 평가)
- SageMaker Edge Manager가 Neo로 최적화한 모델을 사용
- 추론 최적화 도구로 Treelite, Hugging Face Infinity와 함께 소개됨

## 헷갈리는 서비스
| 비교 대상 | 차이 |
|---|---|
| [[SageMaker 추론 옵션]] | 클라우드 배포 방식(실시간·서버리스·비동기·배치) |
| [[AWS AI 칩]] | Inferentia 등 추론용 하드웨어 |

## 관련
- 이론: [[P02 ML 수명 주기와 MLOps]]
- 덱: 29, 53번 슬라이드

## 셀프 체크
> [!question]- 엣지 장치용 모델 최적화 기능은?
> SageMaker Neo
