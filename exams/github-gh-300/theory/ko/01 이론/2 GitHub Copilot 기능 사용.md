---
aliases: ["도메인 2", "Domain 2", "Use GitHub Copilot features", "GitHub Copilot 기능 사용"]
tags: ["gh-300", "이론", "도메인2"]
도메인: 2
목표: ["2.1", "2.2", "2.3", "2.4", "2.5", "2.6", "2.7", "2.8", "2.9", "2.10", "2.11", "2.12", "2.13", "2.14", "2.15"]
---
# 도메인 2　GitHub Copilot 기능 사용

**English** Domain 2: Use GitHub Copilot features  
**한국어 공식 안내서** GitHub Copilot 기능 사용

도메인 2 (25–30%) · 목표 15개

비중이 가장 큰 도메인(25–30%). IDE 사용, Copilot CLI, 에이전트 모드·Edits·MCP·하위 에이전트, 코드 리뷰, Spaces·Spark·PR 요약·지침, Chat 명령·프롬프트 파일, 조직 정책·감사 로그·REST API를 다룬다. 학습 가이드의 "Skills at a glance"에는 "GitHub Copilot features (25–30%)" 줄이 하나 더 있지만 세부 목표가 없어 이 볼트는 중복 표기로 보고 6개 도메인으로 정리했다.

> [!abstract] IDE에서 GitHub Copilot 사용
> Use GitHub Copilot in the IDE · IDE에서 GitHub Copilot 사용

## 목표 2.1

**IDE에서 Copilot을 활성화한다**

> [!quote]- 공식 원문 (English / 한국어 공식 안내서)
> Enable Copilot in the IDE
>
> IDE에서 Copilot 사용

확장을 설치하고 GitHub로 로그인해 켠다. 편집기 설정으로 인라인 제안, 다음 편집 제안, 언어별 사용(github.copilot.enable)을 조정한다.

관련 카드: [[IDE에서 Copilot 활성화와 편집기 설정]] · [[Copilot 요금제]]

## 목표 2.2

**인라인 제안, 채팅, CLI, 에이전트 모드로 Copilot을 실행한다**

> [!quote]- 공식 원문 (English / 한국어 공식 안내서)
> Trigger Copilot through inline suggestions, chat, CLI, and agent mode
>
> 인라인 제안, 채팅, CLI 및 에이전트 모드를 통해 Copilot을 실행

인라인 제안(Tab 수락, Alt+] 다음), 채팅(Ask·Plan·Agent, 인라인 채팅 Ctrl+I), CLI(`copilot`), 에이전트 모드로 Copilot을 실행한다.

관련 카드: [[인라인 제안과 다음 편집 제안]] · [[Copilot Chat]] · [[에이전트 모드]] · [[Copilot CLI]]

## 목표 2.3

**특정 파일이나 리포지토리에 콘텐츠 제외를 구성한다(앱 지식)**

> [!quote]- 공식 원문 (English / 한국어 공식 안내서)
> Configure content exclusions for specific files or repositories (app knowledge)
>
> 특정 파일 또는 리포지토리에 대한 콘텐츠 제외 구성(앱 지식)

리포지토리·조직·엔터프라이즈 설정의 Copilot → Content exclusion에 경로나 리포지토리를 넣는다. 반영은 최대 30분.

관련 카드: [[콘텐츠 제외]]

> [!abstract] GitHub Copilot CLI 사용
> Use GitHub Copilot CLI · GitHub Copilot CLI 사용

## 목표 2.4

**GitHub Copilot CLI가 무엇이고 개발자에게 어떤 이점이 있는지 정의한다**

> [!quote]- 공식 원문 (English / 한국어 공식 안내서)
> Define GitHub Copilot CLI and how it benefits developers
>
> GitHub Copilot CLI 및 개발자에게 혜택 제공 방법 정의

Copilot CLI는 터미널에서 질문·코드 작성·디버그·GitHub 작업을 대신 수행한다. 모든 Copilot 요금제, 조직은 CLI 정책이 켜져 있어야 한다.

관련 카드: [[Copilot CLI]]

## 목표 2.5

**GitHub Copilot CLI 설치 단계를 식별한다**

> [!quote]- 공식 원문 (English / 한국어 공식 안내서)
> Identify the steps for installing GitHub Copilot CLI
>
> GitHub Copilot CLI 설치 단계 식별

npm(`@github/copilot`, Node.js 22+), WinGet, Homebrew, 설치 스크립트로 설치하고 `/login` 또는 PAT로 인증한다.

관련 카드: [[Copilot CLI]]

## 목표 2.6

**GitHub Copilot CLI의 주요 기능과 명령을 설명한다**

> [!quote]- 공식 원문 (English / 한국어 공식 안내서)
> Describe key GitHub Copilot CLI features and commands
>
> 주요 GitHub Copilot CLI 기능 및 명령 설명

슬래시 명령(/model, /context, /compact, /mcp, /permissions 등), 계획 모드(Shift+Tab), 도구 승인 옵션(--allow-tool, --deny-tool)을 안다.

관련 카드: [[Copilot CLI 명령과 세션]]

## 목표 2.7

**GitHub Copilot CLI를 대화형으로, 세션 단위로 사용한다**

> [!quote]- 공식 원문 (English / 한국어 공식 안내서)
> Use GitHub Copilot CLI interactively and in sessions
>
> 대화형 및 세션에서 GitHub Copilot CLI 사용

`copilot`으로 대화형 세션, `-p`로 1회 실행. 세션을 재개하면 승인을 다시 받는다. 신뢰할 수 있는 디렉터리에서 실행한다.

관련 카드: [[Copilot CLI 명령과 세션]]

## 목표 2.8

**GitHub Copilot CLI로 스크립트를 생성하고 파일을 관리한다**

> [!quote]- 공식 원문 (English / 한국어 공식 안내서)
> Generate scripts and manage files with GitHub Copilot CLI
>
> GitHub Copilot CLI를 사용하여 스크립트 생성 및 파일 관리

자연어로 스크립트 작성·파일 생성·수정을 요청하고, 도구 승인을 거쳐 실행한다.

관련 카드: [[Copilot CLI 명령과 세션]]

> [!abstract] GitHub Copilot 기능과 역량 사용
> Use GitHub Copilot features and capabilities · GitHub Copilot 기능 및 기능 사용

## 목표 2.9

**에이전트 모드, Copilot Edits, MCP로 개발과 워크플로를 강화하고, 에이전트 세션을 관리하며, 컨텍스트 사용을 최적화하도록 하위 에이전트에 작업을 위임한다**

> [!quote]- 공식 원문 (English / 한국어 공식 안내서)
> Use Agent Mode, Copilot Edits, and MCP for enhanced development and workflows; manage Agent Sessions and delegate tasks to Sub‑Agents for optimized context usage
>
> 향상된 개발 및 워크플로를 위해 에이전트 모드, Copilot 편집 및 MCP를 사용하고, 에이전트 세션을 관리하고, 최적화된 컨텍스트 사용을 위해 하위 에이전트에 작업을 위임합니다.

에이전트 모드는 파일 선택·편집·명령을 승인받으며 반복, Copilot Edits는 여러 파일 편집 제안, MCP는 외부 도구 연결, 하위 에이전트는 별도 컨텍스트에서 위임 작업을 해 메인 컨텍스트를 아낀다.

관련 카드: [[에이전트 모드]] · [[Copilot Edits]] · [[하위 에이전트와 에이전트 세션]] · [[MCP]] · [[Copilot 클라우드 에이전트]]

## 목표 2.10

**코드 리뷰와 코딩 지원에 Copilot을 사용한다**

> [!quote]- 공식 원문 (English / 한국어 공식 안내서)
> Use Copilot for code review and coding assistance
>
> 코드 검토 및 코딩 지원을 위해 Copilot 사용

PR 리뷰어로 Copilot을 지정하거나 자동 리뷰를 켠다. 기본 리뷰는 Comment라 필수 승인에 포함되지 않는다.

관련 카드: [[Copilot 클라우드 에이전트]] · [[Copilot 코드 리뷰]]

## 목표 2.11

**Spaces, Spark, 풀 리퀘스트 요약, 지침 파일을 통한 맞춤 리뷰 기준을 활용한다**

> [!quote]- 공식 원문 (English / 한국어 공식 안내서)
> Utilize Spaces, Spark, Pull Request summaries, and customizable review standards via instructions files
>
> 지침 파일을 통해 Spaces, Spark, Pull Request 요약 및 사용자 정의 가능한 검토 기준을 활용합니다.

Spaces(컨텍스트 묶음), Spark(자연어 앱 생성, 2026년 8월 지원 종료 공지), PR 요약, copilot-instructions.md·*.instructions.md로 리뷰 기준을 맞춘다.

관련 카드: [[Copilot 코드 리뷰]] · [[사용자 지정 지침]] · [[Copilot Spaces]] · [[GitHub Spark]] · [[PR 요약]]

## 목표 2.12

**GitHub Copilot Chat의 한계, 옵션, 피드백, 명령을 이해하고, 일관된 응답을 위한 프롬프트 파일 재사용을 포함한다**

> [!quote]- 공식 원문 (English / 한국어 공식 안내서)
> Understand the limits, options, feedback, and commands of GitHub Copilot Chat; include prompt file reuse for consistent responses
>
> GitHub Copilot 채팅의 제한, 옵션, 피드백 및 명령을 이해합니다. 일관된 응답에 대한 프롬프트 파일 재사용 포함

Chat 모드·명령(/explain, /fix, /tests)·참가자(@terminal)·변수(#file), 엄지 피드백, 속도 제한·정책 제한을 알고, *.prompt.md로 프롬프트를 재사용한다.

관련 카드: [[Copilot Chat]] · [[채팅 명령, 참가자, 변수]] · [[프롬프트 파일]]

> [!abstract] 조직 전체 설정과 정책 관리
> Manage organization-wide settings and policies · 조직 전체 설정 및 정책 관리

## 목표 2.13

**조직 전체 정책 관리를 구성하고, Copilot 코드 리뷰 정책을 켜고, IDE와 github.com에서 기능 사용 가능 여부를 관리한다**

> [!quote]- 공식 원문 (English / 한국어 공식 안내서)
> Configure organization-wide policy management; enable Copilot Code Review policies and manage feature availability across IDEs and github.com
>
> 조직 전체 정책 관리 구성; Copilot 코드 검토 정책을 사용하도록 설정하고 IDE 및 github.com 기능 가용성을 관리합니다.

조직 Settings → Copilot → Policies·Models에서 기능·모델·MCP를 관리하고 Copilot 코드 리뷰를 켠다. 엔터프라이즈 정책이 우선한다.

관련 카드: [[Copilot 코드 리뷰]] · [[조직 Copilot 정책]] · [[Copilot 요금제]]

## 목표 2.14

**감사 로그 이벤트를 활용한다**

> [!quote]- 공식 원문 (English / 한국어 공식 안내서)
> Utilize audit log events
>
> 감사 로그 이벤트 활용

감사 로그에서 `action:copilot`으로 설정·정책·라이선스 변경을 본다. 프롬프트 같은 클라이언트 데이터는 없다. 180일 보존.

관련 카드: [[Copilot 감사 로그]]

## 목표 2.15

**REST API로 구독을 관리한다**

> [!quote]- 공식 원문 (English / 한국어 공식 안내서)
> Manage subscriptions using the REST API
>
> REST API를 사용하여 구독 관리

REST API로 구독 정보와 좌석을 조회하고, 사용자·팀 좌석을 부여·취소한다(조직 소유자, manage_billing:copilot).

관련 카드: [[Copilot 사용자 관리 REST API]]

## 요약
- IDE: 인라인 제안 · Chat(Ask/Plan/Agent) · 에이전트 모드.
- CLI: `copilot` 대화형, `-p` 1회, --deny-tool 우선.
- 코드 리뷰 기본 = Comment(필수 승인 아님).
- 지침 우선순위: 개인 > 리포지토리 > 조직.
- 감사 로그 action:copilot, 180일 · REST API 좌석 관리.

## 이 도메인의 카드
- [[IDE에서 Copilot 활성화와 편집기 설정]] — 확장을 설치하고 GitHub 계정으로 로그인해 Copilot을 켜고, 편집기 설정으로 인라인 제안·다음 편집 제안·언어별 사용 여부를 조정한다.
- [[인라인 제안과 다음 편집 제안]] — 편집기에서 입력하는 동안 회색 글자(고스트 텍스트)로 보이는 자동 완성 제안. 다음 편집 제안은 다음에 고칠 위치까지 예측해 제안한다.
- [[Copilot Chat]] — 코딩 관련 질문을 대화로 묻고 답과 코드 제안을 받는 인터페이스. GitHub, GitHub Mobile, 지원 IDE, Windows Terminal에서 쓸 수 있다.
- [[채팅 명령, 참가자, 변수]] — 채팅에서 / 명령으로 작업 종류를, @ 참가자로 영역을, # 변수로 컨텍스트를 지정한다.
- [[에이전트 모드]] — IDE에서 Copilot이 자율적으로 작업하는 모드. 필요한 파일을 고르고 편집과 터미널 명령을 제안해 승인받으며, 결과를 보고 반복한다.
- [[Copilot Edits]] — 지정한 파일(작업 세트)에 걸친 편집을 Copilot이 제안하고 사용자가 검토해 수락·취소하는 편집 경험. 학습 가이드에 명시된 용어다.
- [[하위 에이전트와 에이전트 세션]] — 하위 에이전트는 자기 컨텍스트에서 위임받은 작업을 하고 결과만 메인 에이전트에 돌려줘 메인 컨텍스트를 아낀다. 에이전트 세션은 에이전트 작업의 대화와 활동 단위다.
- [[MCP]] — LLM 애플리케이션이 외부 데이터·도구와 컨텍스트를 주고받는 방식을 정한 개방형 표준. Copilot은 MCP 서버로 외부 도구·데이터에 접근한다.
- [[Copilot CLI]] — 터미널에서 Copilot을 쓰는 명령줄 인터페이스. 질문에 답하고, 코드를 작성·디버그하고, GitHub.com과 상호 작용하며 사용자를 대신해 작업한다.
- [[Copilot CLI 명령과 세션]] — Copilot CLI는 대화형 세션과 한 번 실행하고 끝나는 프로그래밍 모드로 쓰고, 슬래시 명령과 도구 승인 옵션으로 동작을 통제한다.
- [[Copilot 클라우드 에이전트]] — GitHub에서 백그라운드로 리포지토리를 조사하고 계획을 세운 뒤 브랜치에서 코드를 바꾸는 자율 에이전트(이전 이름 코딩 에이전트). 결과는 PR로 검토한다.
- [[Copilot 코드 리뷰]] — Copilot을 PR 리뷰어로 지정해 AI 리뷰 코멘트를 받는 기능. 리포지토리 지침 파일로 리뷰 기준을 맞춘다.
- [[사용자 지정 지침]] — Copilot에 선호·도구·요구사항을 미리 알려 응답을 맞추는 지침. 개인, 리포지토리 전체, 경로별, 에이전트, 조직 단위가 있다.
- [[프롬프트 파일]] — 자주 쓰는 프롬프트 지시를 `*.prompt.md` Markdown 파일로 작업 영역에 저장해 채팅에서 재사용하는 기능. 팀이 일관된 응답을 얻는다.
- [[Copilot Spaces]] — Copilot이 답할 때 쓸 컨텍스트(리포지토리, 코드, PR, 이슈, 메모, 이미지, 파일)를 한곳에 모아 정리하고 공유하는 기능.
- [[GitHub Spark]] — 자연어로 아이디어를 동작하는 앱으로 빠르게 만들도록 돕던 GitHub 도구. 2026년 8월 github.com의 Spark 경험은 지원 종료가 공지되었다.
- [[PR 요약]] — PR의 변경 내용, 영향받는 파일, 리뷰어가 볼 점을 Copilot이 요약해 설명이나 코멘트에 넣는 기능.
- [[조직 Copilot 정책]] — 조직 소유자가 Settings > Copilot에서 기능 사용 여부, 개인정보 관련 동작, 모델, MCP 등을 정책으로 정하는 것. 엔터프라이즈 정책이 우선한다.
- [[Copilot 감사 로그]] — 엔터프라이즈 감사 로그에서 Copilot 설정·정책 변경, 라이선스 부여·회수, 에이전트 활동을 조회하는 기능. 로컬 프롬프트 같은 클라이언트 세션 데이터는 없다.
- [[Copilot 사용자 관리 REST API]] — 조직 소유자가 REST API로 Copilot 구독 정보를 보고, 사용자·팀에 좌석을 부여·취소하는 기능.
- [[Copilot 요금제]] — 개인용(Free, Pro, Pro+, Max 등)은 개인이, Business·Enterprise는 조직·엔터프라이즈가 좌석 단위로 구매해 중앙 관리·정책을 쓴다.
