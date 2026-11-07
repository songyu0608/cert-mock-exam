---
분류: 업무용 AI(Q·Quick)
파트: 6
도메인: D2
중요도: 중
aliases: [Quick, Amazon Quick Suite, Quick Suite, Quick Flows, Quick Automate, Quick Research]
tags: [서비스, 분류/Q]
---
# Amazon Quick

> [!summary] 한 줄 정의
> 채팅, 리서치, BI, 자동화, 노코드 앱을 **한 서비스에서** 쓰는 업무 사용자용 에이전틱 AI. QuickSight에서 진화했다

## 시험 트리거
| 문제 속 표현 | 정답 |
|---|---|
| 채팅·리서치·BI·자동화·노코드 앱을 한곳에 | **Amazon Quick** |
| 개인·팀의 짧은 반복 업무 자동화 | **Quick Flows** |
| 전사 차원의 대량·장기 프로세스 (케이스 관리, 휴먼 인 더 루프) | **Quick Automate** (Enterprise 전용) |
| 여러 출처를 조사해 인용 달린 보고서 | **Quick Research** |
| 팀·도메인 범위로 묶은 공유 맥락 | **스페이스** |

## 주요 기능
**5개 계층**
- 채팅(입구) → 에이전트(지침·지식·도구) → 스페이스(맥락) → 통합(지식 기반·커넥터·확장) → 기능(Sight, Flows, Automate, Research, Apps)
- 제공 채널: 웹, 데스크톱, Chrome, Slack, Teams, Microsoft 365

**핵심 특징**
- 답변은 **사용자가 원래 볼 수 있는 범위**로 제한
- Quick Index: S3, SharePoint, OneDrive, Google Drive, Confluence, 웹 크롤러를 색인. Q Business 인덱스·Bedrock 지식 기반 가져오기 가능
- 커넥터 약 50개(대부분 작업 전용), MCP·OpenAPI로 직접 연결
- Apps in Quick: 자연어로 노코드 웹 앱 생성

**보안**
- IAM, IAM Identity Center, SAML 2.0, MFA, SSO
- VPC 비공개 연결, Direct Connect, VPN, KMS 고객 관리형 키
- 행 수준 보안, CloudTrail 감사, 고객 데이터는 모델 훈련에 안 씀

**요금제(강의 기준)**
- Free $0 / Plus $20 / Professional $20 / Enterprise $40 (사용자당 월)
- Automate, 대시보드 작성은 Enterprise 전용

## 헷갈리는 서비스
| 비교 대상 | 차이 |
|---|---|
| [[Amazon QuickSight]] | Quick 안의 BI 기능(Quick Sight)으로 계속 제공 |
| [[Amazon Q Business]] | 사내 지식 채팅 도우미 |
| [[Bedrock Flows]] | 개발자용 생성형 AI 워크플로 |

## 관련
- 비교: [[비교 - Amazon Q 계열]]
- 이론: [[P06 Amazon Q와 Quick]]
- 덱: 102~113번 슬라이드

## 셀프 체크
> [!question]- Quick Flows와 Quick Automate의 차이는?
> Flows는 개인·팀의 짧은 작업(모든 요금제), Automate는 전사 대량·장기 프로세스(Enterprise 전용)

> [!question]- 스페이스를 공유하면 안의 자산 접근 권한도 생기나?
> 아니다. 자동으로 생기지 않는다
