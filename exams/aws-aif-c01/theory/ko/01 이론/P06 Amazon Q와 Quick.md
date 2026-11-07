---
파트: 6
도메인: D2
덱: 100~115
tags: [이론, 파트/P06]
aliases: [Part 6, Amazon Q, Amazon Quick]
---
# P06 Amazon Q와 Quick

> [!abstract] 이 파트에서 배우는 것
> 개발자용 코딩 도우미 Q Developer → 조직 데이터 기반 Q Business와 Q Apps → 업무용 에이전틱 AI Amazon Quick → BI 서비스 QuickSight
> 관련 시험 도메인: **D2 생성형 AI 기초**
> 시험에서는 **"누가 쓰는가(개발자/직원/분석가)"** 로 구분하면 쉽다 → [[비교 - Amazon Q 계열]]

---

## 1. Amazon Q Developer (구 CodeWhisperer) → [[Amazon Q Developer]]
AI 코딩 도우미. Java, JavaScript, Python, TypeScript, C# 지원. Visual Studio, JetBrains, JupyterLab, SageMaker, Lambda에서 사용

| 기능 | 내용 |
|---|---|
| 실시간 코드 제안 | 주석으로 원하는 내용을 쓰면 코드 블록 제안. Amazon·오픈 소스 코드 수십억 줄로 훈련 |
| **보안 스캔** | 코드 취약점 분석 (Java, JavaScript, Python) |
| **참조 추적기** | 오픈 소스와 비슷한 제안을 표시하고 출처 표기용 주석 |
| 편향 회피 | 불공정할 수 있는 코드 제안을 걸러냄 |
| AWS 연동 | EC2, Lambda, S3 등 AWS API 코드 제안 |
| 사용자 지정 | 조직 코드를 참조 자료로 (RAG) |
| 보안 | TLS, 암호화. 단 **개인 요금제는 Amazon이 데이터 활용 가능** |

> [!tip] 시험 포인트
> IDE 코드 제안·보안 스캔 → **Q Developer**

## 2. Amazon Q Apps와 Q Business → [[Amazon Q Business]]
### Q Apps
- 조직 데이터를 바탕으로 **나만의 생성형 AI 앱**
- Q Apps Creator에 "…하는 앱을 만들어 줘"
- 모바일 앱이 아니라 **사용자 지정 GPT**에 가까움. 실제로는 대부분 시스템 프롬프트 지정
- 입력·출력 **카드**로 레이아웃, Q Apps 라이브러리에 게시·복사·수정

### Q Business 요금 (강의 기준)
| 항목 | 내용 |
|---|---|
| Lite | 사용자당 월 $3, 채팅만 |
| Pro | 사용자당 월 $20, Q Apps · QuickSight의 Q · 사용자 지정 플러그인 |
| 인덱스 | 단위(문서 2만 개 또는 200MB)당 시간당 과금, 월 100시간 포함 |

> [!warning] 비용 주의
> 금방 커진다. 문서 100만 개 = 50단위 ≈ 월 $9,504, Lite 사용자 4,500명 = 월 $13,500

---

## 3. Amazon Quick → [[Amazon Quick]]
### 무엇인가
- 채팅, 리서치, BI, 자동화, 노코드 앱을 **한 서비스에서** 쓰는 업무용 AI
- **QuickSight에서 진화**: QuickSight는 Quick 안의 Quick Sight로 계속 제공, 기존 API 그대로
- 완전 관리형(인프라·모델·ML 전문 지식 불필요), 내 시스템에 근거, **MCP와 OpenAPI**로 연결
- 웹, 데스크톱 앱, Chrome, Slack, Teams, Microsoft 365 안에서

### 해결하려는 문제와 차별점
| 문제 | Quick이 주는 것 |
|---|---|
| S3, SharePoint, Confluence, Slack, Jira, CRM에 흩어진 지식 | 이미 쓰는 아이덴티티: IAM, IAM Identity Center, SAML 2.0, MFA, SSO |
| 기업 데이터를 못 보는 일반 챗봇 (출처 없음) | **권한 인식 답변**: 사용자가 원래 볼 수 있는 것만 |
| 분석가에게 묶인 BI | Redshift, Athena, S3, SPICE에서 바로 분석 |
| 손으로 하는 리서치 | 비공개 데이터 경로: VPC, Direct Connect, VPN |
| 답만 주고 실행은 사람이 | 내 데이터로 다른 회사 모델을 훈련하지 않음 |
| **섀도 AI**(승인 안 된 도구에 기밀 붙여 넣기) | AWS 계약·청구·리전·규정 준수를 하나로 |

### 5개 계층
1. **채팅**: 모든 요청의 입구
2. **에이전트**: 지침, 지식, 도구
3. **스페이스**: 파일, 대시보드, 데이터셋, 작업
4. **통합**: 지식 기반, 커넥터, 확장
5. **기능**: Sight, Flows, Automate, Research, Apps

### 채팅과 채팅 에이전트
- 답변 범위: 모든 데이터와 앱 / **일반 지식**(모델만) / 특정 데이터와 앱
- 에이전트 선택, 데이터셋 채팅, 웹 검색, 파일 업로드(채팅당 20개), 작업 호출, 플로 실행, 출처 인용, 메모리
- **채팅 에이전트 = 지침 + 지식 소스 + 도구**. 답변은 언제나 호출한 사용자의 권한 범위로 제한
- 시스템 에이전트 "My assistant"(모두 사용, 기본 플래너) / 사용자 지정 채팅 에이전트(관리자가 생성 권한 제어)

### 스페이스와 Quick Index
- **스페이스**: 팀·도메인 범위의 공유 맥락. 파일, 대시보드, 토픽·데이터셋, 지식 기반, 앱 작업을 넣음
- 주의: **스페이스를 공유해도 안의 자산 접근 권한이 자동으로 생기지 않음**
- **Quick Index**: S3, SharePoint Online, OneDrive, Google Drive, Confluence Cloud, 웹 크롤러를 색인 → AI 검색·인용 답변
- 접근 제어는 지식 기반 단위. **Q Business 인덱스나 Bedrock 지식 기반을 가져올 수 있음**

### 커넥터와 통합 (약 50개, 3유형)
- **작업 커넥터**: 외부 서비스 실시간 호출·수정 (Slack, Teams, Jira, Salesforce, ServiceNow, GitHub 등)
- **데이터 액세스 통합**: 외부 앱 데이터 접근, 지식 기반의 토대
- **지식 기반**: AI 검색과 질의응답용 색인
- 직접 만들기: MCP 서버, OpenAPI, REST API
- 대부분 통합은 작업만 지원, 지식 기반 원본 목록은 훨씬 짧다

### Quick Flows vs Quick Automate
- **Quick Flows**: 재사용 단계 묶음. 채팅에서 생성 / 자연어로 설명 / 시각 편집기. 기술 지식 없이 사용
  - 단계 유형: 사용자 입력, AI 응답, 데이터 인사이트, 작업(앱 작업), 흐름 로직

| 구분 | Quick Flows | Quick Automate |
|---|---|---|
| 대상 | **개인·팀** 생산성 | **중앙·전사**, 특정 사용자와 무관 |
| 작업 | 짧은 작업: 보고서, 초안, 티켓 응대 | **오래 걸리는 대량** 작업: 대출 신청, 송장, 공급업체 규정 준수 |
| 사용자 지정 | 간단한 노코드 | 제어 흐름, 케이스 관리, 오류 처리, 사용자 코드, **휴먼 인 더 루프** |
| 요금제 | 모든 요금제 | **Enterprise 전용** |

> [!warning] 헷갈림 주의
> Automate는 한도를 늘린 Flows가 아니라 **별도의 빌더**다.

### Quick Research와 Apps in Quick
- **Research**: 여러 출처(웹, 파일, 스페이스, 지식 기반, 타사 데이터셋)를 깊이 조사해 **인용 달린 구조화 보고서**. Flows 단계로도 사용
- **Apps in Quick**: 자연어로 설명하면 **노코드 웹 앱**을 실시간 생성 → 미리 보기 → 반복 → 게시

### 보안과 거버넌스
| 영역 | 내용 |
|---|---|
| 아이덴티티 | IAM, IAM Identity Center, SAML 2.0, Active Directory, MFA, RBAC, SSO |
| 네트워크 | VPC 비공개 연결, Direct Connect, Site-to-Site VPN, IP·VPC 제한 |
| 암호화 | 전송 중 TLS 1.2 이상, 저장 시 암호화, **KMS 고객 관리형 키**(리소스 생성 전 설정) |
| 데이터 제어 | **행 수준 보안**, 네임스페이스, 도메인 허용 목록, 데이터 주권 |
| 보증 | 가드레일, CloudTrail 감사, 규정 준수 프로그램, **고객 데이터는 모델 훈련에 안 씀** |

### 요금제 (강의 기준)
| | Free | Plus | Professional | Enterprise |
|---|---|---|---|---|
| 사용자당 월 | $0 | $20(연간) | $20 | $40 |
| 가입 | 이메일·소셜 | 이메일·소셜 | AWS 계정 | AWS 계정 |
| 사용자 지정 에이전트·공유 스페이스 | – | 가능 | 가능 | 가능 |
| 대시보드 작성, Automate | – | – | – | **가능** |
| 인덱스 스토리지 | 약 1GB | 10GB | 25GB | 50GB |
- Pro·Enterprise: 계정당 월 $250 인프라 요금, 에이전트 시간 초과분 과금

### 도입 전 제한 사항
- GovCloud는 Quick Sight BI만 (AI 기능 없음) · 스페이스 중첩 불가 · 채팅 파일 20개
- 문서 수준 ACL은 S3, SharePoint, Confluence, Google Drive에서만
- Automate, 대시보드 작성, 자산 인증은 Enterprise 전용

---

## 4. Amazon QuickSight와 QuickSight Q → [[Amazon QuickSight]]
- 서버리스 클라우드 **BI 서비스**. 어떤 기기에서든 시각화, 임시 분석
- 데이터 원본: Redshift, Aurora·RDS, Athena, EC2의 DB, S3·온프레미스 파일(Excel, CSV, TSV), IoT Analytics, Salesforce, JDBC/ODBC. 제한적 ETL
- 사용: 대화형 탐색, **대시보드와 KPI**, 로그 분석
- **QuickSight Q**: NLP로 비즈니스 질문에 답함 ("올해 서울에서 가장 많이 팔린 제품은?")
  - 데이터셋에 연결된 **토픽** 설정, 필드 이름을 NLP 친화적으로, 날짜 처리 정의

> [!tip] 시험 포인트
> 대시보드·BI 시각화 → **QuickSight** · 자연어로 데이터 질문 → **QuickSight Q**(현재는 Quick 안의 기능)

---

## 파트 핵심 요약
> [!summary] 시험 직전 체크
> - 코드 제안·보안 스캔·참조 추적 → **Q Developer**
> - 조직 데이터 기반 채팅·앱 → **Q Business · Q Apps**
> - 채팅·리서치·BI·자동화·노코드 앱을 한곳에 → **Amazon Quick**
> - 사용자가 볼 수 있는 것만 답변 · 데이터는 모델 훈련에 안 씀
> - 개인의 짧은 작업 → Flows · 전사 대량·장기 → Automate(Enterprise)
> - 서버리스 대시보드 → QuickSight · 자연어 질문 → QuickSight Q

## 이어서 보기
- 비교: [[비교 - Amazon Q 계열]]
- 암기: [[플래시카드 P06]]
- 이전: [[P05 파운데이션 모델과 Bedrock]] · 다음: [[P07 고수준 AI 서비스]]
