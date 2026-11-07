---
분류: 업무용 AI(Q·Quick)
파트: 6
도메인: D2
중요도: 상
aliases: [Q Developer, CodeWhisperer, 코드위스퍼러]
tags: [서비스, 분류/Q]
---
# Amazon Q Developer

> [!summary] 한 줄 정의
> 개발자를 위한 **AI 코딩 도우미**(구 CodeWhisperer). IDE에서 코드 제안, 보안 스캔, AWS 관련 질문에 답한다

## 시험 트리거
| 문제 속 표현 | 정답 |
|---|---|
| IDE에서 실시간 코드 제안 | **Q Developer** |
| 코드 취약점 보안 스캔 | **Q Developer** |
| 오픈 소스와 비슷한 제안의 출처 표시 | **참조 추적기** (Q Developer) |
| ML로 코드 리뷰, 성능 문제·리소스 누수 발견 | [[Amazon CodeGuru]] |

## 주요 기능
- 지원 언어(강의 기준): Java, JavaScript, Python, TypeScript, C#
- 지원 환경: Visual Studio, JetBrains, JupyterLab, SageMaker, Lambda
- 주석으로 원하는 내용을 쓰면 코드 블록 제안 (Amazon·오픈 소스 코드 수십억 줄로 훈련)
- 보안 스캔(Java, JavaScript, Python), 참조 추적기, 편향 회피
- EC2, Lambda, S3 등 AWS API 연동 코드 제안
- 사용자 지정: 조직 코드를 참조 자료로 (RAG)
- 보안: TLS 전송, 암호화. 단 **개인 요금제는 Amazon이 데이터를 활용할 수 있음**

## 헷갈리는 서비스
| 비교 대상 | 차이 |
|---|---|
| [[Amazon Q Business]] | 직원용 사내 지식 도우미 |
| [[Amazon CodeGuru]] | ML 기반 자동 코드 리뷰·성능 프로파일링 |

## 관련
- 비교: [[비교 - Amazon Q 계열]]
- 이론: [[P06 Amazon Q와 Quick]]
- 덱: 100번 슬라이드

## 셀프 체크
> [!question]- CodeWhisperer의 현재 이름은?
> Amazon Q Developer

> [!question]- 오픈 소스 코드와 유사한 제안에 출처 정보를 달아 주는 기능은?
> 참조 추적기
