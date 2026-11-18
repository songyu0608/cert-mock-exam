# CCAR-F 섹션 8. Claude Code 설정과 워크플로 (한국어판)

원본 아티팩트: https://claude.ai/artifact/WJ8Zu1JByuvdYitAcnZEad

슬라이드 HTML(`slides/`)에서 화면 글자와 발표자 노트(`<aside>`, 영어 원문)를 뽑은 텍스트다. 자동 생성 파일이므로 고칠 때는 슬라이드 HTML을 기준으로 한다.

## 표지 (`cover`)

슬라이드
Claude Certified Architect – Foundations:
전체 강좌
섹션 8. Claude Code 설정과 워크플로
71~91강, 슬라이드 227장

> 노트: 원문: Claude Certified Architect Foundations: Complete Course / Section 8. Claude Code Configuration and Workflows / Lectures 71-91, 227 slides. (원본에 76강 없음)

## 71강. CLAUDE.md 레벨: 누가 무엇을 받나 (`l71`)

71강
CLAUDE.md 레벨: 누가 무엇을 받나
슬라이드 16장

> 노트: 원문: LECTURE 71 · CLAUDE.md Levels: Who Gets What · 16 slides

### 3. `l71-01`

CLAUDE.md 파일
같은 도구, 다른 결과
[이미지: 노트북 앞에서 회의하는 두 사람 일러스트]
ShopAssist 팀
개발자 두 명
Claude Code
같은 도구, 같은 코드
다른 결과
같은 출력이 아님
사용

> 노트: 원문 제목: Same tool, different results (CLAUDE.MD FILES). ShopAssist team (Two developers) → uses → Claude Code (Same tool, same code) → Different results (Not the same output).

### 4. `l71-02`

상황
Claude Code는 리포지토리 안에서 일한다
ShopAssist 리포지토리
에이전트, 도구, 훅, 많은 테스트
Claude Code
파일을 읽고, 코드를 고치고, 명령을 실행
네이티브 설치: curl -fsSL https://claude.ai/install.sh | bash

> 노트: 원문 제목: Claude Code works inside the repo (THE SCENE). Claude Code (Reads files, edits code, runs commands) → ShopAssist repository (Agent, tools, hooks, many tests). 하단: Native installer: curl -fsSL https://claude.ai/install.sh | bash (명령은 원문 그대로이며, 현재 설치 방법과 같은지는 확인하지 않았습니다).

### 5. `l71-03`

레오의 첫날
레오가 엉뚱한 스타일의 테스트를 받는다
[이미지: 책상에서 일하는 개발자 일러스트]
레오
새로 온 개발자
Claude Code
테스트를 작성
환불 한도 테스트
다른 프레임워크, 실제 결제 서비스
요청
반환

> 노트: 원문 제목: Leo gets a test in the wrong style (LEO'S FIRST DAY). Leo (New developer) → asks → Claude Code (Writes the test) → returns → Refund-limit test (Other framework, real payment service). 팀 규약과 다른 테스트 프레임워크를 쓰고, 가짜가 아닌 실제 결제 서비스를 호출합니다.

### 6. `l71-04`

핵심 개념
파일은 로드될 때만 도움이 된다
세 가지 레벨
누가 어떤 파일을 받나
레오의 문제
팀 규칙이 왜 빠졌나
무엇이 로드됐나
세션을 확인하기
CLAUDE.md 파일은 그 파일을 로드하는 Claude Code를 쓰는 사람에게만 닿습니다.

> 노트: 원문 제목: A file helps only if it is loaded (THE KEY IDEA). Three levels: Who gets which file / Leo's problem: Why team rules are missing / What was loaded: Check a session. 하단: A CLAUDE.md file reaches only the people whose Claude Code loads it.

### 7. `l71-05`

첫째, 레벨
세션 시작 때 한 번 읽는다
읽기
위치
CLAUDE.md
일반 텍스트 지침 - 메모리 파일
Claude Code 세션
처음부터 규칙을 앎
세 가지 레벨
사용자, 프로젝트, 디렉터리

> 노트: 원문 제목: Read once, at session start (FIRST, THE LEVELS). CLAUDE.md (Plain text instructions - a memory file) → read → Claude Code session (Rules known from the start) / ⇢ can live at ⇢ Three levels (User, project, directory).

### 8. `l71-06`

레벨 1: 사용자
사용자 레벨: 나만의 것
개인 선호 - 예를 들어, 짧은 설명
로드됨
리포지토리 밖
사용자 레벨 파일
~/.claude/CLAUDE.md
내 Claude Code
내가 여는 모든 프로젝트
팀원
받지 못함

> 노트: 원문 제목: User level: yours alone (LEVEL 1: USER). 부제: Personal preferences - for example, short explanations. User-level file (~/.claude/CLAUDE.md) → loaded → Your Claude Code (Every project you open) / ⇢ not in repo ⇢ Your teammates (Never receive it).

### 9. `l71-07`

레벨 2: 프로젝트
프로젝트 레벨: 팀 전체
프로젝트 CLAUDE.md
리포지토리 루트 또는 .claude 폴더
리포지토리
다른 파일처럼 커밋됨
[이미지: 노트북 앞에서 회의하는 두 사람 일러스트]
풀하는 모든 사람
팀 전체
커밋
클론, 풀
팀 규약: 테스트 프레임워크, 가짜 결제 서비스, 환불 금액은 주문에서 가져옴.

> 노트: 원문 제목: Project level: the whole team (LEVEL 2: PROJECT). Project CLAUDE.md (Repo root or .claude folder) → commit → Repository (Committed like any file) → clone, pull → Everyone who pulls (The whole team). 하단: Team conventions: test framework, fake payment service, refund amounts from the order.

### 10. `l71-08`

레벨 3: 디렉터리
디렉터리 레벨: 한 폴더
항상
그 폴더에서
프로젝트 CLAUDE.md
리포지토리 전체에 대한 규칙
refund/CLAUDE.md
환불 코드에만 적용되는 규칙
Claude Code
해당하는 파일을 모두 합침. 구체적인 파일이 일반 파일에 더해짐

> 노트: 원문 제목: Directory level: one folder (LEVEL 3: DIRECTORY). Project CLAUDE.md (Rules for the whole repo) → always → Claude Code / refund/CLAUDE.md (Rules only for refund code) → in its folder → Claude Code (Combines all files that apply; specific ones add to general ones).

### 11. `l71-09`

둘째, 레오의 문제
레오의 세션은 파일 하나만 로드한다
> /memory
Memory files loaded in this session:
  Project    ./CLAUDE.md
# Select a file to open it for editing
# The test rules are not in this file
예시 출력: 레오에게 프로젝트 파일은 보이지만, 테스트 규칙은 그 안에 없습니다.

> 노트: 원문 제목: Leo's session loads one file (SECOND, LEO'S PROBLEM). 출력(영문 유지) 의미: /memory 실행 → "이 세션에 로드된 메모리 파일: Project ./CLAUDE.md". 주석: 파일을 선택하면 편집용으로 열림 / 테스트 규칙은 이 파일에 없음. 캡션: Illustrative output: Leo sees the project file, but the test rules are not in it.

### 12. `l71-10`

규칙이 있던 곳
규칙은 개인 파일에 있었다
로드됨
공유 안 됨
풀
사용자 레벨 파일
우리 테스트 규칙, 초기에 작성
예전 노트북
늘 규칙을 따름
리포지토리
파일이 도달한 적 없음
레오의 Claude Code
규칙을 본 적 없음

> 노트: 원문 제목: The rules lived in a personal file (WHERE THE RULES LIVED). User-level file (Our test rules, written at the start) → loaded → Old laptop (Always followed the rules) / ⇢ not shared ⇢ Repository (The file never reached it) → pull → Leo's Claude Code (Has never seen the rules).

### 13. `l71-11`

해결책
팀 규칙을 리포지토리로 옮긴다
사용자 레벨 파일
개인 선호는 그대로 둠
프로젝트 CLAUDE.md
풀 리퀘스트로 변경
[이미지: 노트북 앞에서 회의하는 두 사람 일러스트]
풀하는 모든 사람
다음 신규 입사자 포함
규칙 이동
머지, 풀
팀 규칙은 버전 관리에 둡니다. 레오에게 개인 파일 사본을 보내지 마세요.

> 노트: 원문 제목: Move team rules into the repo (THE FIX). User-level file (Keeps personal preferences) → move rules → Project CLAUDE.md (Changed through a pull request) → merge, pull → Everyone who pulls (Including the next new hire). 하단: Team rules belong in version control. Do not send Leo a copy of the personal file.

### 14. `l71-12`

셋째, 세션마다 다를 때
폴더 규칙은 그 폴더에서 로드된다
/memory 명령은 규칙이 한 세션에서는 통하고 다음 세션에서는 안 통할 때도 도움이 됩니다.
로드됨
refund/CLAUDE.md
금액은 주문에서 가져옴
세션 1: 환불 코드
환불 코드를 고치며 규칙을 따름

> 노트: 원문 제목: A folder rule loads in its folder (THIRD, DIFFERENT SESSIONS). 부제: The memory command also helps when a rule works in one session and not in the next. refund/CLAUDE.md (Amounts come from the order) → loaded → Session 1: refund code (Edits refund code, follows the rule).

### 15. `l71-13`

셋째, 세션마다 다를 때
폴더 파일은 그 폴더에 머문다
세션 2: 결제 코드
규칙이 사라진 것 같음
/memory
환불 파일이 로드되지 않음
프로젝트 CLAUDE.md
모든 곳에 적용할 규칙은 여기에
확인
위로 이동

> 노트: 원문 제목: A folder file stays in its folder (THIRD, DIFFERENT SESSIONS). Session 2: checkout code (The rule seems to be gone) → check → /memory (Refund file not loaded) → move up → Project CLAUDE.md (A rule for everywhere goes here).

### 16. `l71-14`

제품 참고
/memory는 목록을, /context는 전부를 보여 준다
/memory
시험에서 말하는 로드된 메모리 파일 확인 방법. 파일을 나열하고 하나씩 엽니다.
/context
지금 세션에 로드된 모든 것을 보여 줍니다.

> 노트: 원문 제목: /memory lists, /context shows all (ONE PRODUCT NOTE). /memory: The exam's check for loaded memory files. Lists them and opens each one. / /context: Shows everything loaded in the session right now.

### 17. `l71-15`

정리
세 레벨, 세 대상
사용자 레벨
홈 폴더, 나에게만 닿음
프로젝트 파일
리포지토리 안, 팀과 공유
디렉터리 파일
한 폴더, 그곳에서만 로드

> 노트: 원문 제목: Three levels, three audiences (LET'S SUM UP). User level: Home folder, reaches only you / Project file: In the repo, shared with the team / Directory file: One folder, loads only there.

### 18. `l71-16`

팀원이 규칙을 놓칠 때
규칙은 로드되는 곳에 둔다
사용자 레벨 확인
규칙이 거기 있을 수 있음
프로젝트로 이동
프로젝트 파일 안으로
/memory 실행
세션이 무엇을 로드했는지 확인
팀 규칙은 리포지토리에, 내 습관만 홈 폴더에 둡니다.

> 노트: 원문 제목: Put each rule where it is loaded (A TEAMMATE MISSES THE RULES). Check user level: The rules may be there → Move to project: Into the project file → Run /memory: See what a session loaded. 하단: Team rules go in the repository; only your own habits go in your home folder.

## 72강. @import와 rules 폴더 (`l72`)

72강
@import와 rules 폴더
슬라이드 10장

> 노트: 원문: LECTURE 72 · @import and the Rules Folder · 10 slides

### 20. `l72-01`

공유 프로젝트 규칙
공유 파일은 작게 유지한다
[이미지: 노트북 앞에서 회의하는 두 사람 일러스트]
팀
공유 규약
프로젝트 CLAUDE.md
모두가 로드함
Claude Code 세션
매번 전부를 읽음

> 노트: 원문 제목: Keep the shared file small (SHARED PROJECT RULES). The team (Shared conventions) → Project CLAUDE.md (Everyone loads it) → Claude Code session (Reads all of it, every time).

### 21. `l72-02`

1년 후
CLAUDE.md가 600줄로 늘었다
ShopAssist 리포지토리
여러 패키지
환불 서비스
자기 폴더와 역할
채팅 창
상점 웹사이트에 있음
MCP 서버
상점 도구 4개
프로젝트 CLAUDE.md
600줄: 테스트, 배포, API, 채팅 메모가 뒤섞임

> 노트: 원문 제목: The CLAUDE.md grew to 600 lines (A YEAR LATER). ShopAssist repository (Several packages) → Refund service (Its own folder and job) / Chat window (On the store's website) / MCP server (Four store tools) → Project CLAUDE.md (600 lines: tests, deploy, API, chat notes mixed).

### 22. `l72-03`

첫 번째 도구
주제별로 rules 폴더에 나눈다
.claude/
  rules/
    testing.md          # framework, fake payments, test names
    api-conventions.md  # field names, errors
    deployment.md       # release steps
CLAUDE.md               # short overview
파일 하나에 주제 하나. 커밋하므로 팀 전체가 받습니다.

> 노트: 원문 제목: Split by topic into a rules folder (TOOL ONE). 폴더 구조(영문 유지) 의미: .claude/rules/ 아래 testing.md(프레임워크, 가짜 결제, 테스트 이름), api-conventions.md(필드 이름, 오류), deployment.md(릴리스 단계), 루트의 CLAUDE.md(짧은 개요). 캡션: One topic per file - committed, so the whole team gets it.

### 23. `l72-04`

rules 파일이 로드되는 방식
rules 파일은 CLAUDE.md처럼 로드된다
testing.md
테스트 프레임워크
api-conventions.md
필드와 오류
deployment.md
릴리스 단계
Claude Code 세션
모든 규칙을 갖고 시작
루트 CLAUDE.md
짧은 개요: 명령, 핵심 규칙

> 노트: 원문 제목: Rule files load like CLAUDE.md (HOW RULE FILES LOAD). testing.md (Test framework) / api-conventions.md (Fields and errors) / deployment.md (Release steps) → Claude Code session (Starts with every rule) ← Root CLAUDE.md (Short overview: commands, key rules). paths가 없는 rules 파일은 세션 시작 때 함께 로드됩니다.

### 24. `l72-05`

두 번째 도구: import
어떤 표준은 한 패키지에만 맞는다
필요
금액 표준
금액은 센트 단위, 환불 금액은 주문에서
환불 서비스
이 표준이 필요함
채팅 창
필요 없음

> 노트: 원문 제목: Some standards fit one package (TOOL TWO: IMPORTS). Money standard (Amounts in cents; refund amount from the order) → needed → Refund service (Needs the standard). Chat window (Does not need it).

### 25. `l72-06`

@ import 구문
@ 줄이 표준을 가져온다
# CLAUDE.md of the refund service
@standards/money-handling.md
@standards/api-conventions.md
# CLAUDE.md of the chat window
@standards/frontend.md
@ 기호와 경로: Claude Code는 가져온 파일을 CLAUDE.md와 함께 로드합니다.

> 노트: 원문 제목: An @ line imports a standard (THE @ IMPORT SYNTAX). 코드(영문 유지) 의미: 환불 서비스의 CLAUDE.md는 금액 처리 표준과 API 규약 표준을, 채팅 창의 CLAUDE.md는 프런트엔드 표준을 가져옴. 캡션: An at sign and a path: Claude Code loads the imported files with the CLAUDE.md.

### 26. `l72-07`

import는 누가 고르나
담당자가 가져오면 사본이 어긋나지 않는다
[이미지: 책상에서 일하는 개발자 일러스트]
패키지 담당자
자기 코드를 잘 앎
환불 서비스
CLAUDE.md: @금액 표준
다른 패키지
CLAUDE.md: @금액 표준
금액 표준
파일 하나, 한 곳

> 노트: 원문 제목: Owners import, copies never drift (WHO CHOOSES THE IMPORTS). Package maintainers (They know their code) → Refund service (CLAUDE.md: @money standard) / Another package (CLAUDE.md: @money standard) → Money standard (One file, one place).

### 27. `l72-08`

한계
규칙은 안내하고, 코드가 강제한다
컨텍스트
CLAUDE.md 파일은 Claude Code를 안내합니다.
강제
$500 환불 한도는 여전히 코드와 테스트에 있습니다.

> 노트: 원문 제목: Rules guide; code enforces (A LIMIT). Context: CLAUDE.md files guide Claude Code. / Enforcement: The $500 refund limit still lives in code and in tests.

### 28. `l72-09`

정리
주제별로 나누고, 필요한 만큼 가져온다
주제별로 나누기
rules 폴더와 import.
큰 파일 하나는 읽고 검토하기 어렵다
rules 폴더: 주제마다 파일 하나, 매 세션 로드
@경로가 표준을 CLAUDE.md로 가져온다
담당자는 자기 코드에 필요한 것만 가져온다

> 노트: 원문 제목: Split by topic, import by need (MAIN POINTS). Split by topic: Rules folder and imports. / One big file is hard to read and review / Rules folder: one file per topic, loaded every session / @path imports a standard into a CLAUDE.md / Maintainers import only what their code needs.

### 29. `l72-10`

다음 단계
모든 표준은 한 번만 존재한다
rules 폴더
주제마다 파일 하나.
import
각 패키지가 필요한 것을 가리킴.
주제마다 파일을 따로 두고, 각 패키지가 필요한 것을 가져오게 합니다.

> 노트: 원문 제목: Every standard lives once (NEXT STEP). Rules folder: One file for each topic. / Imports: Each package points to what it needs. 하단: Give each topic its own file; let each package import what it needs.

## 73강. glob으로 경로별 규칙 정하기 (`l73`)

73강
glob으로 경로별 규칙 정하기
슬라이드 11장

> 노트: 원문: LECTURE 73 · Path-Scoped Rules with Globs · 11 slides

### 31. `l73-01`

규칙 범위를 정하는 이유
규칙은 필요할 때만 로드돼야 한다
rules 폴더
영역마다 주제 파일 하나
Claude Code 세션
컨텍스트 윈도
토큰 비용
로드된 모든 규칙
노이즈
관련 없는 작업 옆의 규칙

> 노트: 원문 제목: Rules should load only when needed (WHY SCOPE A RULE). Rules folder (One topic file per area) → Claude Code session (Context window) → Token cost (Every loaded rule) / Noise (Rule next to unrelated work).

### 32. `l73-02`

상황
테스트 파일은 곳곳에 흩어져 있다
환불 서비스
코드 옆에 테스트
MCP 서버
코드 옆에 테스트
채팅 창
컴포넌트마다 테스트 하나
테스트 규칙
testing.md가 매 세션 로드됨

> 노트: 원문 제목: Test files are spread everywhere (THE SCENE). Testing rules (testing.md loads in every session) → Refund service (Tests beside the code) / MCP server (Tests beside the code) / Chat window (A test per component).

### 33. `l73-03`

이번 강의
규칙에 적용할 파일을 알려 준다
핵심 개념
rules 파일이 자신이 적용될 파일을 밝히면, Claude Code는 그 파일에 대해서만 규칙을 로드합니다.
1. paths 필드
2. glob 패턴
3. 경로별 규칙인가, 폴더 CLAUDE.md인가

> 노트: 원문 제목: Tell a rule which files it covers (WHAT WE COVER). The key idea: A rule file says which files it applies to. Claude Code loads it only for those files. / 1. The paths field / 2. Glob patterns / 3. Path-scoped rule or folder CLAUDE.md.

### 34. `l73-04`

paths 필드
frontmatter에 paths 필드를 더한다
---
paths:
  - "**/*.test.ts"
  - "**/*.test.tsx"
---
# Testing rules
- Name each test after the behaviour it checks.
- Mock external calls, never the network.
헤더는 파일 맨 위, 대시 세 개로 된 두 줄 사이에 둡니다.

> 노트: 원문 제목: Frontmatter adds a paths field (THE PATHS FIELD). 코드(영문 유지) 의미: paths에 **/*.test.ts, **/*.test.tsx 지정. 본문 "테스트 규칙: 각 테스트에 그것이 확인하는 동작의 이름을 붙인다 / 외부 호출은 목(mock)으로 처리하고, 실제 네트워크는 쓰지 않는다". 캡션: The header sits at the top of the file, between two lines of three dashes.

### 35. `l73-05`

규칙이 로드되는 시점
규칙은 일치할 때만 로드된다
일치: 로드
불일치: 제외
테스트 수정
테스트에 관한 세션
릴리스 단계 변경
릴리스에 관한 세션
테스트 규칙
paths: **/*.test.tsx

> 노트: 원문 제목: The rule loads only on a match (WHEN THE RULE LOADS). Edit a test (Session about tests) → match: loads → Testing rule (paths: **/*.test.tsx). Change release steps (Session about releases) ⇢ no match: stays out.

### 36. `l73-06`

glob 패턴
glob은 파일 유형으로 일치시킨다
*              any part of a file name
**             any folder, at any depth
**/*.test.tsx  any file ending in .test.tsx
chat/Cart.test.tsx        matches
chat/Header.test.tsx      matches
new-folder/Order.test.tsx matches too
패턴은 위치가 아니라 파일 유형으로 파일을 찾습니다.

> 노트: 원문 제목: Globs match files by type (GLOB PATTERNS). 의미: * = 파일 이름의 아무 부분, ** = 깊이와 관계없이 아무 폴더, **/*.test.tsx = .test.tsx로 끝나는 모든 파일. chat/Cart.test.tsx, chat/Header.test.tsx 일치, new-folder/Order.test.tsx도 일치. 캡션: The pattern matches files by type, not by location.

### 37. `l73-07`

glob 패턴
패턴 하나로 한 폴더를 다룰 수도 있다
# testing rule
paths:
  - "**/*.test.tsx"
# deployment rule
paths:
  - "terraform/**/*"
한 패턴은 파일 유형을, 다른 패턴은 한 폴더와 그 아래 전부를 다룹니다.

> 노트: 원문 제목: A pattern can cover one folder (GLOB PATTERNS). 코드(영문 유지) 의미: 테스트 규칙 paths "**/*.test.tsx", 배포 규칙 paths "terraform/**/*". 캡션: One pattern covers a type of file, the other one folder and everything under it.

### 38. `l73-08`

선택
다른 두 방법은 부족하다
루트 CLAUDE.md의 한 섹션
매 세션 로드되고, 어느 섹션이 파일에 맞는지 Claude가 추측해야 합니다.
테스트 폴더마다 CLAUDE.md
사본이 여러 개라 서로 어긋나고, 새 폴더마다 따로 필요합니다.

> 노트: 원문 제목: Two other options fall short (THE CHOICE). A section in root CLAUDE.md: Loads in every session, and Claude must guess which section fits the file. / A CLAUDE.md in every test folder: Many copies that drift apart, and every new folder needs its own.

### 39. `l73-09`

고르는 방법
규칙을 그 범위에 맞춘다
디렉터리 하나
그 디렉터리에 CLAUDE.md를 둡니다. 예: 환불 폴더 자체의 규칙.
한 파일 유형, 여러 폴더
rules 폴더에 경로별 규칙을 둡니다. 예: 모든 테스트 파일.
규칙은 컨텍스트이지 강제가 아닙니다. 반드시 통과해야 하는 테스트는 여전히 CI에서 실행됩니다.

> 노트: 원문 제목: Match the rule to its scope (HOW TO CHOOSE). One directory: Use a CLAUDE.md in that directory, like the refund folder's own rules. / One type of file, many folders: Use a path-scoped rule in the rules folder, like all test files. 하단: Rules are context, not enforcement - a test that must pass still runs in CI.

### 40. `l73-10`

정리
규칙은 적용되는 곳에서만 로드된다
paths 필드
frontmatter에 glob 패턴을 나열
일치할 때 로드
다른 세션은 건너뜀
별 두 개(**)
아무 폴더나 일치

> 노트: 원문 제목: A rule loads only where it applies (RECAP). paths field: Frontmatter lists glob patterns / Loads on match: Other sessions skip it / Two stars: Match any folder.

### 41. `l73-11`

정리
범위를 고른 다음, 그것을 기술한다
디렉터리 CLAUDE.md
한 폴더에 속한 규칙에.
경로별 규칙
여러 폴더에 흩어진 파일에.
규약이 적용되는 곳을 기술하고, Claude Code가 그곳에서만 로드하게 합니다.

> 노트: 원문 제목: Pick the scope, then describe it (RECAP). Directory CLAUDE.md: For rules that belong to one folder. / Path-scoped rule: For files spread across many folders. 하단: Describe where a convention applies, and let Claude Code load it only there.

## 74강. 커맨드와 스킬은 어디에 두나 (`l74`)

74강
커맨드와 스킬은 어디에 두나
슬라이드 11장

> 노트: 원문: LECTURE 74 · Where Commands and Skills Live · 11 slides

### 43. `l74-01`

재사용 워크플로
누가 받을지는 폴더가 정한다
재사용 워크플로
한 번 저장해 두고 Claude Code에서 계속 다시 씁니다.
커스텀 슬래시 커맨드
스킬
같은 파일: 팀 전체 또는 나만

> 노트: 원문 제목: The folder decides who gets it (REUSABLE WORKFLOWS). Reusable workflows: Saved once, used again and again in Claude Code. / Custom commands / Skills / Same file: whole team or only you.

### 44. `l74-02`

상황
요청할 때마다 결과가 다르다
[이미지: 책상에서 일하는 개발자 일러스트]
마리아
풀 리퀘스트 전마다
Claude Code
변경 사항 검토: 환불, 에스컬레이션, 테스트
리뷰
파일, 위험, 수정안 - 그런데 매번 다름
같은 긴 문장

> 노트: 원문 제목: Every request comes out different (THE SCENE). Maria (Before every pull request) → same long text → Claude Code (Review my changes: refunds, escalation, tests) → Reviews (File, risk, fix - but each one differs).

### 45. `l74-03`

핵심 규칙
리포지토리 폴더 = 팀, 홈 = 나
워크플로 파일
커맨드 또는 스킬
리포지토리 .claude/
버전 관리로 공유
홈 ~/.claude/
버전 관리에 들어가지 않음
팀 전체
클론하는 모든 사람
나만
다른 사람은 없음

> 노트: 원문 제목: Repo folder = team, home = you (THE KEY RULE). Workflow file (Command or skill) → Repo .claude/ (Shared by version control) → Whole team (Everyone who clones) / Home ~/.claude/ (Never in version control) → Only you (Nobody else).

### 46. `l74-04`

첫째, 커맨드
팀 커맨드는 리포지토리 파일이다
review.md
일반 텍스트: 파일 이름이 커맨드 이름
리포지토리 commands 폴더
.claude/commands/review.md
[이미지: 노트북 앞에서 회의하는 두 사람 일러스트]
팀 전체
/review - 첫날의 레오도
커밋
클론 / 풀

> 노트: 원문 제목: A team command is a repo file (FIRST, COMMANDS). review.md (Plain text: the file name is the command name) → commit → Repo commands folder (.claude/commands/review.md) → clone / pull → Whole team (/review - even Leo on day one).

### 47. `l74-05`

개인용과 잘못된 위치
개인 커맨드는 나에게만 남는다
개인 커맨드
홈 디렉터리의 commands 폴더. 버전 관리가 보지 못하므로 내 습관에 적합합니다.
커맨드를 두는 곳이 아님
CLAUDE.md는 지침을 담고, 설정 파일에는 커맨드 목록이 없습니다.
팀 커맨드는 리포지토리 commands 폴더에 있는 파일입니다.

> 노트: 원문 제목: Personal commands stay with you (PERSONAL AND WRONG PLACES). Personal command: Commands folder in your home directory. Version control never sees it - good for your own habits. / Not a command home: CLAUDE.md holds instructions, and a config file has no commands list. 하단: A team command is a file in the repository's commands folder.

### 48. `l74-06`

둘째, 스킬
스킬은 SKILL.md가 든 폴더다
# SKILL.md in the skill's own folder
---
description: Review changes before a pull request
---
Review my changes. Focus on refund logic,
escalation and missing tests.
Refund checklist:
- refunds never exceed the amount paid
- each finding: file, risk level, fix
설명이 먼저, 그다음 지침. 필요할 때 로드됩니다: 이름으로 부르거나, 설명이 맞을 때.

> 노트: 원문 제목: A skill is a folder with SKILL.md (SECOND, SKILLS). 코드(영문 유지) 의미: 스킬 자체 폴더의 SKILL.md. description "풀 리퀘스트 전에 변경 사항 검토". 본문: 내 변경 사항을 검토하라. 환불 로직, 에스컬레이션, 빠진 테스트에 집중. 환불 체크리스트 - 환불액은 결제액을 넘지 않는다 / 지적 사항마다 파일, 위험 수준, 수정안. 캡션: Description first, then instructions. Loaded on demand: by name, or when the description fits.

### 49. `l74-07`

같은 폴더 규칙
스킬도 같은 폴더 규칙을 따른다
리포지토리 안
리포지토리 .claude 폴더의 skills 폴더. 팀이 스킬을 받습니다.
홈 폴더 안
나만 스킬을 받습니다.
제품 참고: 이제 커맨드는 스킬로 통합되었고, commands 폴더도 계속 동작합니다. 시험 기준: 팀 커맨드 = 리포지토리 commands 폴더.

> 노트: 원문 제목: Skills follow the same folder rule (SAME FOLDER RULE). In the repository: Skills folder in the repo's .claude folder - the team gets the skill. / In your home folder: Only you get the skill. 하단: Product note: commands now merge into skills, and the commands folder still works. Exam: team command = repo commands folder.

### 50. `l74-08`

레오에게 보안 리뷰가 필요하다
새 이름으로 변형을 추가한다
수정?
생성
[이미지: 책상에서 일하는 개발자 일러스트]
레오
보안만 원함
팀 스킬
review - 리포지토리 안
개인 변형
security-review - 홈 skills 안
다른 모든 사람
같은 체크리스트

> 노트: 원문 제목: Add a variant under a new name (LEO NEEDS A SECURITY REVIEW). Leo (Wants security only) ⇢ edit? ⇢ Team skill (review - in the repo) → Everyone else (Same checklist). Leo → creates → Personal variant (security-review - in home skills). 팀 스킬을 고치지 않고, 홈에 새 이름으로 변형을 만듭니다.

### 51. `l74-09`

셋째, 스킬인가 CLAUDE.md인가
스킬은 한 가지 작업의 워크플로를 담는다
CLAUDE.md
항상 로드됨. 모든 작업의 표준: 테스트 프레임워크, 금액 저장 방식.
스킬
필요할 때 로드됨. 한 종류의 작업: 리뷰나 릴리스 노트 같은 것.
특정 파일을 고칠 때마다 적용할 규칙은 스킬이 아니라 경로별 규칙입니다.

> 노트: 원문 제목: Skills hold one-task workflows (THIRD, SKILL OR CLAUDE.MD). CLAUDE.md: Always loaded. Standards for every task: the test framework, how amounts are stored. / A skill: Loaded on demand. One kind of task, like a review or release notes. 하단: Rules for certain files, every time they are edited: a path-scoped rule, not a skill.

### 52. `l74-10`

정리
팀 것은 리포지토리에, 개인 것은 홈에
폴더를 고른다
폴더가 워크플로를 누가 받을지 정합니다.
팀 커맨드: 리포지토리 commands 폴더
개인 커맨드: 홈 commands 폴더
커맨드 목록을 갖는 설정 파일은 없다
스킬: SKILL.md가 든 자기 폴더, 필요할 때 로드
개인 변형: 홈 skills, 새 이름

> 노트: 원문 제목: Team in the repo, personal at home (RECAP). Pick the folder: It decides who gets the workflow. / Team command: repo commands folder / Personal command: home commands folder / No config file has a commands list / Skill: own folder with SKILL.md, on demand / Personal variant: home skills, new name.

### 53. `l74-11`

워크플로를 저장하기 전에
누구에게 줄지 정하고, 폴더를 고른다
대상 정하기
누가 받아야 하나?
폴더 고르기
리포지토리 또는 홈
그 사람들에게 도달
정확히 그 사람들에게
CLAUDE.md는 모든 작업에 필요한 것을, 스킬은 한 작업에 필요한 것을 담습니다.

> 노트: 원문 제목: Decide who, then pick the folder (BEFORE YOU SAVE A WORKFLOW). Decide who: Who should get it? → Pick the folder: Repo or home → Reaches them: Exactly those people. 하단: CLAUDE.md holds what every task needs; a skill holds what one task needs.

## 75강. 스킬 frontmatter 구성하기 (`l75`)

75강
스킬 frontmatter 구성하기
슬라이드 13장

> 노트: 원문: LECTURE 75 · Configuring a Skill's Frontmatter · 13 slides

### 55. `l75-01`

스킬 frontmatter
frontmatter가 스킬의 실행 방식을 정한다
---
name: map-flow
description: Maps how a support case moves through one part of ShopAssist
---
Trace the flow you are given.
Report where each step happens.
SKILL.md 맨 위의 몇 가지 설정이 스킬의 실행 방식을 정합니다.

> 노트: 원문 제목: Frontmatter sets how a skill runs (SKILL FRONTMATTER). 코드(영문 유지) 의미: name map-flow, description "지원 사례가 ShopAssist의 한 부분을 어떻게 지나가는지 그린다". 본문: 주어진 흐름을 추적하라. 각 단계가 어디서 일어나는지 보고하라. 캡션: A few settings at the top of SKILL.md control how the skill runs.

### 56. `l75-02`

상황
map-flow가 지원 사례를 추적한다
[이미지: 책상에서 일하는 개발자 일러스트]
개발자
ShopAssist의 한 부분을 지정
map-flow
공유 skills 폴더
환불 흐름
확인, 에스컬레이션, 메시지

> 노트: 원문 제목: Map flow traces a support case (THE SCENE). Developer (Names one part of ShopAssist) → map-flow (Shared skills folder) → Refund flow (Checks, escalation, messages).

### 57. `l75-03`

첫 주
첫 주에 생긴 세 가지 문제
대화가 넘침
읽은 파일이 모두 대화에 쌓임
파일을 수정함
읽기만 해야 할 파일을 바꿈
입력을 추측함
인수가 없으면 전부를 그림

> 노트: 원문 제목: Three problems in week one (WEEK ONE). Floods the chat: Every file it reads lands in the conversation / Edits a file: It changed one it should only read / Guesses the input: With no argument, it maps everything.

### 58. `l75-04`

전체 헤더
키 세 개가 세 문제를 고친다
---
name: map-flow
description: Maps how a support case moves through one part of ShopAssist
context: fork
allowed-tools: Read, Grep, Glob
argument-hint: "[flow to map: refund, escalation or a PR number]"
---
스킬이 어디서 실행되는지, 무엇을 쓸 수 있는지, 시작하려면 무엇이 필요한지.

> 노트: 원문 제목: Three keys fix three problems (THE FULL HEADER). 코드(영문 유지) 의미: name map-flow, description "지원 사례가 ShopAssist의 한 부분을 어떻게 지나가는지 그린다", context: fork(별도 컨텍스트에서 실행), allowed-tools: Read, Grep, Glob, argument-hint: "[그릴 흐름: 환불, 에스컬레이션 또는 PR 번호]". 캡션: Where the skill runs, what it may use, what it needs to start.

### 59. `l75-05`

context: fork
fork가 없으면 출력이 쌓인다
map-flow
읽고, 검색하고, 탐색함
메인 세션
읽은 파일을 모두 담음

> 노트: 원문 제목: Without fork, output piles up (CONTEXT: FORK). map-flow (Reads, searches, explores) → Main session (Holds every file it reads).

### 60. `l75-06`

context: fork
fork는 탐색을 서브에이전트에 가둔다
메인 세션
결과만 받음
포크된 서브에이전트
자기 공간: 읽고, 검색하고, 탐색함

> 노트: 원문 제목: Fork keeps discovery in a helper (CONTEXT: FORK). Main session (Gets only the result) → Forked sub-agent (Own space: reads, searches, explores).

### 61. `l75-07`

context: fork
출력이 많은 스킬에는 fork를 쓴다
fork를 쓸 때
출력이 장황할 때(예: 코드베이스 분석), 또는 탐색적인 작업일 때.
프롬프트로는 안 됨
"출력을 짧게 하라"로는 바뀌지 않습니다. 검색은 여전히 메인 대화에서 일어납니다.

> 노트: 원문 제목: Use fork for noisy skills (CONTEXT: FORK). Use fork when: The output is verbose, like codebase analysis, or the work is exploratory. / Not a prompt fix: "Keep your output short" changes nothing: the searching still happens in the main chat.

### 62. `l75-08`

allowed-tools
map-flow는 읽기 전용 도구를 받는다
Read
파일을 엶
Grep
파일 안을 검색
Glob
이름으로 파일을 찾음
시험 기준으로, map-flow는 파일을 고치거나 명령을 실행할 수 없습니다.

> 노트: 원문 제목: Map flow gets read-only tools (ALLOWED-TOOLS). Read: Opens a file / Grep: Searches inside files / Glob: Finds files by name. 하단: In exam terms, map flow cannot edit a file or run a command.

### 63. `l75-09`

allowed-tools
시험의 답: 도구를 제한한다
map-flow
Read, Grep, Glob만. 수정도 명령도 없음.
파일 쓰기 전용 스킬
파일 쓰기만 하므로 폴더를 지울 수 없음.
현재 제품
나열한 도구를 미리 승인함. 다른 도구를 막지는 않음.
시험에서는: allowed-tools가 스킬을 제한합니다.

> 노트: 원문 제목: Exam answer: it restricts tools (ALLOWED-TOOLS). Map flow: Read, Grep, Glob only. No edits, no commands. / Files-only skill: Only writes files, so it cannot delete a folder. / Current product: Pre-approves the listed tools. Does not block others. 하단: On the exam: allowed-tools restricts the skill. (현재 제품 동작에 대한 설명은 원문 그대로이며 확인하지 않았습니다.)

### 64. `l75-10`

argument-hint
포크된 스킬은 빈 상태로 시작한다
[이미지: 책상에서 일하는 개발자 일러스트]
개발자
무엇을 그릴지 앎
map-flow (fork)
돌아볼 대화 기록이 없음

> 노트: 원문 제목: A forked skill starts empty (ARGUMENT-HINT). Developer (Knows what to map) → map-flow (fork) (No chat history to look back at). 그래서 필요한 입력을 인수로 받아야 합니다.

### 65. `l75-11`

argument-hint
힌트가 무엇을 넣을지 보여 준다
● ● ●
스킬 호출
DEMO
/map-flow <the flow to map, such as refund or escalation, or a PR number>
힌트는 입력을 검사하지 않습니다. 필요한 입력을 분명히 보여 줄 뿐입니다.

> 노트: 원문 제목: The hint shows what to provide (ARGUMENT-HINT). 예시 화면(Skill call, DEMO): 입력창에 "/map-flow <그릴 흐름: 환불이나 에스컬레이션 같은 것, 또는 PR 번호>"가 표시됨. 캡션: The hint does not check the input - it only makes the required input clear.

### 66. `l75-12`

하나 더
Claude는 설명을 보고 스킬을 고른다
trigger 필드는 없음
일부 튜토리얼에 나오지만, 존재하지 않습니다.
설명을 다시 쓰기
스킬이 엉뚱한 때 시작하거나 전혀 시작하지 않으면, 설명을 고칩니다.

> 노트: 원문 제목: Claude picks skills by description (ONE MORE POINT). No trigger field: Some tutorials describe one. It does not exist. / Rewrite the description: If a skill starts at the wrong time, or never starts, fix its description.

### 67. `l75-13`

정리
frontmatter부터 고친다
---
name: map-flow
description: Maps how a support case moves through one part of ShopAssist
context: fork
allowed-tools: Read, Grep, Glob
argument-hint: "[flow to map: refund, escalation or a PR number]"
---
대화가 넘치거나, 일을 너무 많이 하거나, 입력 없이 시작한다면? frontmatter를 고칩니다.

> 노트: 원문 제목: Fix the frontmatter first (RECAP). 코드(영문 유지) 의미: name map-flow, description "지원 사례가 ShopAssist의 한 부분을 어떻게 지나가는지 그린다", context: fork(별도 컨텍스트에서 실행), allowed-tools: Read, Grep, Glob, argument-hint: "[그릴 흐름: 환불, 에스컬레이션 또는 PR 번호]". 캡션: Floods the chat, does too much, or starts without its input? Fix the frontmatter.

## 77강. MCP 서버를 안전하게 공유하기 (`l77`)

77강
MCP 서버를 안전하게 공유하기
슬라이드 10장

> 노트: 원문: LECTURE 77 · Sharing MCP Servers Safely · 10 slides

### 69. `l77-01`

MCP 서버와 팀
파일 위치가 누가 받을지를 정한다
리포지토리 안의 파일
팀 전체에 닿습니다.
홈 폴더 안의 파일
나에게만 닿습니다.
비밀 정보는 절대 리포지토리에 들어가면 안 됩니다.

> 노트: 원문 제목: Location decides who gets a file (MCP SERVERS AND THE TEAM). A file in the repository: Reaches the whole team. / A file in your home folder: Reaches only you. 하단: A secret must never reach the repository.

### 70. `l77-02`

상황
모든 개발자에게 서버 두 개가 필요하다
사용
도구
읽기
[이미지: 노트북 앞에서 회의하는 두 사람 일러스트]
팀
Claude Code로 일함
Claude Code
MCP 서버를 사용
ShopAssist 백엔드
상점 도구 4개, 테스트 상점
GitHub 서버
풀 리퀘스트와 이슈

> 노트: 원문 제목: Every developer needs two servers (THE SCENE). The team (Works with Claude Code) → uses → Claude Code (Uses MCP servers) → tools → ShopAssist backend (Four store tools, test store) / reads → GitHub server (Pull requests and issues).

### 71. `l77-03`

이번 강의
설정은 공유하고, 비밀은 공유하지 않는다
프로젝트 파일
팀 서버, 공유
비밀 변수
토큰은 리포지토리 밖에
사용자 파일
개인 서버
서버 설정은 공유하되, 그 비밀은 절대 공유하지 않습니다.

> 노트: 원문 제목: Share the settings, not the secret (WHAT WE LOOK AT). Project file: Team servers, shared / Secret variables: Tokens stay out of the repository / User file: Personal servers. 하단: Share the server's settings, but never its secret.

### 72. `l77-04`

첫째, 프로젝트 파일
팀 서버는 .mcp.json에 둔다
{
  "mcpServers": {
    "shopassist": {
      "command": "shopassist-mcp"
    },
    "github": {
      "command": "npx",
      "args": ["-y", "github-mcp-server"]
    }
  }
}
서버마다 이름과 명령이 있습니다. 파일을 커밋하면 풀하는 모두가 같은 서버를 받습니다.

> 노트: 원문 제목: Team servers live in .mcp.json (FIRST, THE PROJECT FILE). JSON(영문 유지) 의미: mcpServers 아래 shopassist(명령 shopassist-mcp), github(명령 npx, 인수 -y github-mcp-server). 캡션: Each server has a name and a command. Commit the file, and everyone who pulls gets the same servers.

### 73. `l77-05`

둘째, 비밀
붙여 넣은 토큰은 기록에 남는다
[이미지: 책상에서 일하는 개발자 일러스트]
개발자
실제 토큰을 붙여 넣음
리포지토리 기록
나중에 줄을 지워도 남음
접근 권한이 있는 누구나
토큰을 읽을 수 있음
커밋
클론

> 노트: 원문 제목: A pasted token stays in history (SECOND, THE SECRET). Developer (Pastes the real token) → commit → Repository history (Deleting the line later does not remove it) → clone → Anyone with access (Can read the token).

### 74. `l77-06`

둘째, 비밀
토큰이 아니라 이름을 커밋한다
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "github-mcp-server"],
      "env": {
        "GITHUB_TOKEN": "${GITHUB_TOKEN}"
      }
    }
  }
}
파일에는 변수 이름만 있으므로 커밋해도 안전합니다.

> 노트: 원문 제목: Commit the name, not the token (SECOND, THE SECRET). JSON(영문 유지) 의미: github 서버의 env에 GITHUB_TOKEN: "${GITHUB_TOKEN}" - 실제 값이 아니라 환경 변수 이름을 참조. 캡션: The file holds only the variable's name, so it is safe to commit.

### 75. `l77-07`

환경 변수 확장
Claude Code가 값을 채워 넣는다
읽기
자기 값
시작
.mcp.json
${GITHUB_TOKEN}
[이미지: 책상에서 일하는 개발자 일러스트]
개발자
GITHUB_TOKEN을 한 번 설정
Claude Code
이름을 값으로 바꿈
GitHub 서버
실제 토큰으로 시작

> 노트: 원문 제목: Claude Code fills in the value (ENVIRONMENT VARIABLE EXPANSION). .mcp.json (${GITHUB_TOKEN}) → reads → Claude Code; Developer (Sets GITHUB_TOKEN once) → own value → Claude Code (Swaps the name for the value) → starts → GitHub server (Starts with the real token).

### 76. `l77-08`

셋째, 개인 서버
서버는 홈 폴더에서 먼저 써 본다
추가
풀 리퀘스트
공유
[이미지: 책상에서 일하는 개발자 일러스트]
레오
다이어그램 서버를 써 봄
~/.claude.json
다이어그램 서버, 레오만
.mcp.json
팀 서버, 리포지토리 안
팀 전체
파일 안의 모든 서버를 받음

> 노트: 원문 제목: Try servers in your home folder (THIRD, PERSONAL SERVERS). Leo (Tries a diagram server) → adds → ~/.claude.json (Diagram server, only for Leo) ⇢ pull request ⇢ .mcp.json (Team servers, in the repository) → shared → Whole team (Gets every server in it).

### 77. `l77-09`

제품 참고
시험: 두 가지 범위로 답한다
시험에서는
팀용은 프로젝트 파일, 개인 서버는 홈 폴더의 파일.
현재 명령에서는
claude mcp add는 세 번째 범위도 제공합니다: local, 한 프로젝트에서 나만 쓰는 범위.

> 노트: 원문 제목: Exam: answer with two scopes (ONE PRODUCT NOTE). On the exam: Project file for the team, file in your home folder for personal servers. / In the command today: claude mcp add also offers a third scope: local, private to you in one project. (제품 동작 설명은 원문 그대로이며 확인하지 않았습니다.)

### 78. `l77-10`

정리
팀은 설정을 공유하고, 비밀은 공유하지 않는다
팀 서버
리포지토리의 .mcp.json
개인 서버
~/.claude.json, 나만
비밀
파일에는 변수 이름만
서버 설정은 커밋하고, 비밀은 모두 각 개발자의 컴퓨터에 둡니다.

> 노트: 원문 제목: Team shares settings, not secrets (RECAP). Team servers: .mcp.json in the repository / Personal servers: ~/.claude.json, only you / Secrets: Variable name in the file. 하단: Commit the server settings, keep every secret on each developer's own computer.

## 78강. 플랜 모드인가 직접 실행인가 (`l78`)

78강
플랜 모드인가 직접 실행인가
슬라이드 13장

> 노트: 원문: LECTURE 78 · Plan Mode or Direct Execution · 13 slides

### 80. `l78-01`

먼저 계획할까, 바로 할까?
잘못 고르면 시간을 낭비한다
한 줄 수정에 계획 세우기
몇 분을 낭비합니다.
계획 없는 광범위한 변경
며칠을 낭비할 수 있습니다.
오늘의 주제: Claude Code가 실제 작업을 어떻게 시작해야 하는가.

> 노트: 원문 제목: The wrong choice wastes time (PLAN FIRST, OR ACT NOW?). A plan for a one-line fix: Wastes minutes. / A wide change with no plan: Can waste days. 하단: Today: how Claude Code should start a real task.

### 81. `l78-02`

작업 1
버그 하나가 함수 하나를 가리킨다
[이미지: 헤드셋을 쓴 지원팀 담당자 일러스트]
버그 보고
고객에게 오류가 보임
스택 트레이스
오류에 이르기까지의 호출
반품 기간 코드
배송일이 아직 없으면 충돌
포함
가리킴

> 노트: 원문 제목: One bug points to one function (TASK ONE). Bug report (Customers see an error) → includes → Stack trace (The calls that led to the error) → points to → Return-window code (Crashes when no delivery date yet).

### 82. `l78-03`

작업 2
파일 50개에 걸친 큰 마이그레이션
파일 약 50개
간단한 검색으로 찾음
오래된 날짜 라이브러리
아무도 관리하지 않음
새 라이브러리
팀이 원하는 것
사용
교체 대상

> 노트: 원문 제목: A big migration across 50 files (TASK TWO). About 50 files (A quick search finds them) → use → Old date library (Nobody maintains it) → replace with → Newer library (The team wants this one).

### 83. `l78-04`

핵심 규칙
모드는 작업이 알려 준다
범위가 넓거나 방법이 여럿
먼저 계획합니다.
명확하고 작은 변경
바로 실행합니다.
세 가지: 플랜 모드가 하는 일, 고르는 방법, 두 모드를 함께 쓰는 방법.

> 노트: 원문 제목: The task tells you the mode (THE KEY RULE). Wide, or several approaches: Plan first. / A clear, small change: Make it directly. 하단: Three things: what plan mode does, how to choose, how the modes work together.

### 84. `l78-05`

첫째: 플랜 모드
플랜 모드는 읽은 다음 제안한다
나
Claude Code
코드베이스
작업, 플랜 모드로
읽고 검색
파일은 바뀌지 않음
계획: 파일, 순서, 위험
질문 또는 변경
승인
수정은 승인 후에야 시작됩니다. 모드 전환은 Shift+Tab.

> 노트: 원문 제목: Plan mode reads, then proposes (FIRST: PLAN MODE). You → Claude Code: Task, in plan mode / Claude Code → Codebase: Read and search / Codebase → Claude Code: No file is changed / Claude Code → You: Plan: files, order, risks / You → Claude Code: Questions or changes / Approve. 캡션: Edits start only after approval. Switch modes with Shift+Tab.

### 85. `l78-06`

플랜 모드가 도움이 되는 이유
계획은 고치기 싸다
잘못된 계획 고치기
몇 문장이면 됩니다.
파일 30개의 잘못된 수정 고치기
훨씬 오래 걸립니다.
안전하게 탐색하고 방식을 먼저 설계합니다. 비용이 큰 재작업이 없습니다.

> 노트: 원문 제목: A plan is cheap to fix (WHY PLAN MODE HELPS). Fix a wrong plan: A few sentences. / Fix wrong edits in 30 files: Takes much longer. 하단: Explore safely and design the approach first - no costly rework.

### 86. `l78-07`

둘째: 고르는 방법
플랜 모드를 가리키는 네 가지 신호
큰 변경
범위가 큼
많은 파일
여러 부분을 건드림
아키텍처 선택
설계를 좌우함
타당한 방법이 여럿
답이 하나가 아님
예: 우리의 라이브러리 마이그레이션, 또는 큰 앱 하나를 작은 서비스들로 나누기.

> 노트: 원문 제목: Four signals point to plan mode (SECOND: HOW TO CHOOSE). Large change: Big scope / Many files: Touches many parts / Architecture choice: Shapes the design / Several valid ways: More than one answer. 하단: Examples: our library migration, or splitting one large app into small services.

### 87. `l78-08`

플랜 모드 예시
푸시인가 폴링인가? 둘 다 먼저 탐색한다
푸시
또는 매시간 조회
[이미지: 상자를 실은 배송 트럭 일러스트]
배송 파트너
배송 추적 업데이트를 가짐
새 웹 주소
푸시된 업데이트를 받음
큐
업데이트를 보관
ShopAssist 코드
업데이트를 사용

> 노트: 원문 제목: Push or poll? Explore both first (A PLAN-MODE EXAMPLE). Shipping partner (Has the tracking updates) → pushes → New web address (Receives pushed updates) → Queue (Holds the updates) → ShopAssist code (Uses the updates). 또는 ShopAssist code ⇢ asks hourly ⇢ Shipping partner. 인프라가 다른 두 방식 중 고르는 문제이므로 플랜 모드가 맞습니다.

### 88. `l78-09`

직접 실행
작고 명확한 수정은 바로 실행한다
def check_delivery_date(delivery_date, today):
    if delivery_date is None:
        return None
    if delivery_date > today:
        raise ValueError("Delivery date is in the future")
    return delivery_date
명확하고 범위가 정해진 변경: 계획을 세워 봐야 스택 트레이스가 말하는 내용을 되풀이할 뿐입니다.

> 노트: 원문 제목: A small, clear fix goes direct (DIRECT EXECUTION). 코드(영문 유지) 의미: check_delivery_date - 배송일이 None이면 None 반환(충돌 수정), 배송일이 오늘보다 뒤면 "배송일이 미래임" 오류, 그 외에는 배송일 반환. 캡션: A clear, scoped change: a plan would only repeat what the stack trace says.

### 89. `l78-10`

흔한 실수
잘못 시작하는 세 가지 방식
바로 시작
숨은 연결이 늦게 드러나고, 수정이 반쯤 된 채로 남음
어려워지면 그때 계획
파일 50개라는 것만으로 이미 어려운 작업
긴 지침
탐색 전에 구조를 가정함
복잡하다는 것이 처음부터 분명하면, 바로 계획합니다.

> 노트: 원문 제목: Three starts that go wrong (COMMON MISTAKES). Start directly: Hidden links show up late, then half-done edits / Plan only if hard: Fifty files already say it is hard / Long instructions: They assume the structure before exploring. 하단: When the complexity is clear from the start, plan right away.

### 90. `l78-11`

셋째: 두 모드를 함께
조사는 계획하고, 실행은 바로 한다
나
Claude Code
코드베이스
마이그레이션 작업, 플랜 모드
옛 라이브러리 사용처 전부 찾기
종류별로 묶은 사용처
계획: 헬퍼, 환불 서비스, 테스트
계획 승인
단계별로 수정
계획은 조사를 맡고, 직접 실행은 작업을 맡습니다.

> 노트: 원문 제목: Plan the search, then execute (THIRD: BOTH MODES TOGETHER). You → Claude Code: Migration task, plan mode / Claude Code → Codebase: Find every old-library use / Codebase → Claude Code: Uses grouped by kind / Claude Code → You: Plan: helper, refund service, tests / You → Claude Code: Approve the plan / Claude Code → Codebase: Edit step by step. 캡션: Planning covers the investigation, direct execution covers the work.

### 91. `l78-12`

기억할 것
모드를 작업에 맞춘다
플랜 모드
큰 변경, 아키텍처, 타당한 방법이 여럿일 때. 탐색하고 제안하며, 수정은 하지 않음.
직접 실행
명확하고 범위가 정해진 변경. 예: 스택 트레이스가 분명한 한 파일 버그 수정.
이미 분명히 복잡한가요? 문제가 생기길 기다리지 말고 지금 계획하세요.

> 노트: 원문 제목: Match the mode to the task (WHAT TO REMEMBER). Plan mode: Large changes, architecture, several valid approaches. Explores and proposes, no edits. / Direct execution: Clear, scoped changes, like a one-file bug fix with a clear stack trace. 하단: Already clearly complex? Plan now - don't wait for problems.

### 92. `l78-13`

워크플로
작업을 읽고, 그다음 고른다
넓거나 열려 있음
승인된 계획
작고 명확함
작업
먼저 읽기
플랜 모드
조사하고 제안
직접 실행
변경을 적용

> 노트: 원문 제목: Read the task, then choose (THE WORKFLOW). The task (Read it first) → wide or open → Plan mode (Investigate, propose) → approved plan → Direct execution (Make the change). The task → small and clear → Direct execution.

## 79강. 내장 도구: Grep, Glob, Read, Write, Edit (`l79`)

79강
내장 도구: Grep, Glob, Read, Write, Edit
슬라이드 12장

> 노트: 원문: LECTURE 79 · Built-in Tools: Grep, Glob, Read, Write and Edit · 12 slides

### 94. `l79-01`

내장 도구
작업마다 맞는 도구가 있다
Claude Code
플랜 모드 또는 직접 실행
Agent SDK 에이전트
직접 만든 에이전트
내장 도구
Grep, Glob, Read, Write, Edit, Bash

> 노트: 원문 제목: Each job has its own tool (BUILT-IN TOOLS). Claude Code (Plan mode or direct) → Built-in tools (Grep, Glob, Read, Write, Edit, Bash) ⇠ Agent SDK agent (Your own agent). 같은 내장 도구를 Claude Code와 Agent SDK 에이전트가 모두 씁니다.

### 95. `l79-02`

작업
환불이 함수 하나를 쓰게 한다
[이미지: 책상에서 일하는 개발자 일러스트]
개발자
ShopAssist 팀
Claude Code
코드를 고치고 테스트를 실행
환불 코드
round_to_cents() 또는 인라인 반올림

> 노트: 원문 제목: Make refunds use one function (THE TASK). Developer (ShopAssist team) → Claude Code (Edits code, runs tests) → Refund code (round_to_cents() or inline rounding). 환불 코드 일부는 round_to_cents()를 쓰고 일부는 직접 반올림하므로, 모두 한 함수를 쓰게 바꾸는 작업입니다.

### 96. `l79-03`

가장 중요한 것
Grep은 내용을, Glob은 이름을 본다
찾기
Grep과 Glob
파일 바꾸기
Read, Write, Edit
명령 실행
Bash
Grep은 파일 안을 검색합니다. Glob은 이름으로 파일을 찾습니다.

> 노트: 원문 제목: Grep looks inside, Glob at names (THE MOST IMPORTANT THING). Find: Grep and Glob / Change a file: Read, Write, Edit / Run commands: Bash. 하단: Grep searches inside files. Glob finds files by their names.

### 97. `l79-04`

찾기: Grep
Grep은 파일 안의 텍스트를 찾는다
Claude Code
Grep
코드베이스
호출하는 곳 전부 찾기
"round_to_cents"
파일 + 줄 번호마다
파일과 줄
"refund amount mismatch"
해당하는 한 줄
Grep은 파일 내용에서 패턴을 찾습니다: 함수 이름, 오류 메시지, import.

> 노트: 원문 제목: Grep finds text inside files (FIND: GREP). Claude Code → Grep: find all callers / Grep → Code base: "round_to_cents" / each file + line / Grep → Claude Code: files and lines / Claude Code → Grep: "refund amount mismatch"(오류 메시지 검색) / the one line. 캡션: Grep searches file contents for a pattern: a function name, an error message, an import.

### 98. `l79-05`

찾기: Glob
Glob은 이름으로 파일을 찾는다
Claude Code
Glob
파일 경로
모든 컴포넌트 테스트
**/*.test.tsx
일치하는 이름
모든 테스트 파일
Glob은 파일 안을 보지 않습니다. 이름이나 확장자로 경로를 일치시킵니다.

> 노트: 원문 제목: Glob finds files by name (FIND: GLOB). Claude Code → Glob: all component tests / Glob → File paths: **/*.test.tsx / names that match / Glob → Claude Code: every test file. 캡션: Glob never looks inside a file: it matches paths, by name or by extension.

### 99. `l79-06`

헷갈리지 말 것
무엇을 찾는지로 고른다
Grep: 파일 안의 텍스트
함수 호출, 오류 메시지, import를 찾습니다.
Glob: 파일 자체
이름이나 확장자로 파일을 나열합니다. 내용으로는 찾지 않습니다.
물어보세요: 파일 안의 텍스트를 찾는가, 파일 자체를 찾는가?

> 노트: 원문 제목: Pick by what you look for (DO NOT MIX THEM UP). Grep: text inside files: Finds a function call, an error message or an import. / Glob: the files themselves: Lists files by name or extension, never by contents. 하단: Ask: am I looking for text inside files, or for the files themselves?

### 100. `l79-07`

파일 바꾸기
Edit는 한 곳만 바꾼다
Read("refunds.py")                # load the whole file
Write("refunds.py", new_content)   # create it, or replace all of it
Edit("refunds.py",                # change one spot only
     old_text="total = round(amount, 2)",   # the anchor: appears exactly once
     new_text="total = round_to_cents(amount)")
작은 변경에는 Edit. Write로 파일 전체를 다시 쓰면 옮겨 적지 않은 부분을 잃을 위험이 있습니다.

> 노트: 원문 제목: Edit changes one spot only (CHANGE A FILE). 코드(영문 유지) 의미: Read - 파일 전체 로드 / Write - 새로 만들거나 전체를 교체 / Edit - 한 곳만 변경. old_text가 기준점(anchor)이며 파일에 정확히 한 번 나와야 함. 캡션: Small change: use Edit. Rewriting a whole file with Write risks losing what was not copied.

### 101. `l79-08`

Edit가 실패할 때
반복된 줄이 Edit를 깨뜨린다
def refund_item(amount):
    total = round(amount, 2)
    return total
def refund_order(amount):
    total = round(amount, 2)
    return total
Edit(old_text="total = round(amount, 2)")
Error: anchor found 2 times - not unique
같은 줄이 두 함수에 있어서, Edit는 어느 쪽을 뜻하는지 알 수 없습니다.

> 노트: 원문 제목: A repeated line breaks Edit (WHEN EDIT FAILS). 코드(영문 유지) 의미: refund_item과 refund_order 두 함수에 같은 줄 "total = round(amount, 2)"가 있음. Edit 결과 오류: 기준점이 2번 발견됨 - 고유하지 않음. 캡션: The same line sits in two functions, so Edit cannot tell which one is meant.

### 102. `l79-09`

시험의 답
시험의 대안: Read 후 Write
Read
파일 전체
변경
맞는 함수를 고침
Write
파일 전체를 다시 씀
현재 Claude Code의 다른 해결책: 주변 줄을 포함한 더 긴 기준점, 또는 일치하는 곳 모두 바꾸기.

> 노트: 원문 제목: Exam fallback: Read, then Write (THE EXAM'S ANSWER). Read (the full file) → Change (fix the right function) → Write (the whole file back). 하단: Current Claude Code: other fixes - a longer anchor with nearby lines - or replace every match. (현재 제품 동작 설명은 원문 그대로이며 확인하지 않았습니다.)

### 103. `l79-10`

명령 실행: Bash
Bash가 테스트를 실행한다
Claude Code
Bash
테스트 스위트
npm test
테스트 실행
모든 테스트 통과
출력 + 종료 코드

> 노트: 원문 제목: Bash runs the tests (RUN COMMANDS: BASH). Claude Code → Bash: npm test / Bash → Test suite: run the tests / all tests pass / Bash → Claude Code: output + exit code.

### 104. `l79-11`

정리
도구 여섯 개, 분명한 역할 여섯 개
Grep
파일 안의 텍스트
Glob
이름 패턴으로 파일 찾기
Read
파일 전체를 로드
Write
파일을 만들거나 교체
Edit
한 곳, 고유한 기준점
Bash
명령 실행, 예: 테스트

> 노트: 원문 제목: Six tools, six clear jobs (RECAP). Grep: Text in files / Glob: Files by name pattern / Read: Loads a whole file / Write: Creates or replaces a file / Edit: One spot, unique anchor / Bash: Runs commands, like tests.

### 105. `l79-12`

Claude Code가 움직이기 전에
필요한 것을 정하고, 그다음 고른다
파일 안의 텍스트
Grep 사용
이름으로 파일
Glob 사용
작은 변경 하나
Edit 사용
파일 전체
Write 사용
무엇이 필요한지 정한 다음, 그 일에 맞는 도구를 고릅니다.

> 노트: 원문 제목: Decide the need, then pick (BEFORE CLAUDE CODE ACTS). Text in files: Use Grep / Files by name: Use Glob / One small change: Use Edit / A whole file: Use Write. 하단: Decide what it needs, then pick the tool for that job.

## 80강. 코드베이스를 단계별로 탐색하기 (`l80`)

80강
코드베이스를 단계별로 탐색하기
슬라이드 8장

> 노트: 원문: LECTURE 80 · Exploring a Codebase Step by Step · 8 slides

### 107. `l80-01`

코드베이스 탐색
전부 먼저 읽으면 역효과가 난다
모든 파일을 먼저 읽기
Claude Code가 처음 보는 코드베이스를 만났을 때.
느림: 여러 라운드에 걸쳐 읽어야 함
질문과 관련 없는 코드로 컨텍스트가 참
지난 강의의 도구: Grep은 파일 안을 검색, Glob은 이름으로 파일을 찾고, Read는 파일 하나를 로드합니다.

> 노트: 원문 제목: Reading everything first backfires (EXPLORING A CODEBASE). Read every file first: Claude Code meets a code base it has never seen. / Slow: many rounds of reading / The context fills with code unrelated to the question. 하단: Last lesson's tools: Grep searches inside files, Glob finds files by name, Read loads one file.

### 108. `l80-02`

질문
환불액이 몇 센트씩 많이 나온다
[이미지: 책상에서 일하는 개발자 일러스트]
ShopAssist 개발자
환불액은 어디서 나오나?
Claude Code
찾아보라는 요청을 받음
리포지토리
파일 약 2,000개
질문
탐색

> 노트: 원문 제목: Refunds come out a few cents high (THE QUESTION). ShopAssist developer (Where does a refund amount come from?) → asks → Claude Code (Asked to find out) → explores → Repository (About 2,000 files).

### 109. `l80-03`

규칙
단계별로 탐색한다
흐름 따라가기
진입점에서 시작해 import를 따라갑니다.
래퍼를 거쳐 추적하기
래퍼가 내보내는 이름을 나열하고, 이름마다 검색합니다.
먼저 검색하고, 검색이 가리키는 것만 읽습니다.

> 노트: 원문 제목: Explore step by step (THE RULE). Follow the flow: Start at an entry point and follow the imports. / Trace through a wrapper: List what the wrapper exports, then search each name. 하단: Search first, then read only what the search points to.

### 110. `l80-04`

기법 1: 흐름
Grep이 진입점을 찾는다
Grep
Claude Code
Read
process refund tool call
파일 1개: 환불 핸들러
핸들러 열기
2,000개 파일을 먼저 다 읽었다면 여러 라운드가 걸리고 핵심 줄이 묻혔을 것입니다.

> 노트: 원문 제목: Grep finds the entry point (TECHNIQUE ONE: THE FLOW). Claude Code → Grep: process refund tool call / Grep → Claude Code: 1 file: refund handler / Claude Code → Read: open the handler. 캡션: Reading all 2,000 files first would take many rounds and bury the key lines.

### 111. `l80-05`

기법 1: 흐름
2,000개가 아니라 약 5개 파일
환불 핸들러
금액 모듈을 import
금액 모듈
통화 헬퍼를 import
통화 헬퍼
모든 금액을 올림
import
import
파일마다 열 이유가 있었습니다. 원인은 헬퍼입니다.

> 노트: 원문 제목: About five files, not two thousand (TECHNIQUE ONE: THE FLOW). Refund handler (Imports the amount module) → imports → Amount module (Imports the currency helper) → imports → Currency helper (Rounds every amount up). 하단: Each file had a reason to be opened: the helper is the cause.

### 112. `l80-06`

기법 2: 래퍼
래퍼가 라이브러리를 숨긴다
호출
금액 코드
결제 제공자를 직접 호출하지 않음
래퍼 모듈
결제 제공자를 숨김
전액 환불
부분 환불
취소된 청구

> 노트: 원문 제목: A wrapper hides the library (TECHNIQUE TWO: THE WRAPPER). Amount code (Never calls the provider) → calls → Wrapper module (Hides the payment provider) → Full refund / Partial refund / Cancelled charge.

### 113. `l80-07`

기법 2: 래퍼
내보낸 이름마다 Grep한다
Grep
Claude Code
래퍼
only: full refund
호출하는 곳 일부만, 전부가 아님
래퍼 읽기
내보낸 이름 3개
이름마다 검색
호출하는 곳이 모두 나옴
고객에게 돈을 돌려주는 코드는 어디인가? 이름 하나로는 답의 일부만 찾습니다.

> 노트: 원문 제목: Grep every exported name (TECHNIQUE TWO: THE WRAPPER). Claude Code → Grep: only: full refund / Grep → Claude Code: some callers, not all / Claude Code → Wrapper: read the wrapper / 3 exported names / Claude Code → Grep: search each name / every caller appears. 캡션: Which code sends money back to customers? One name finds only part of the answer.

### 114. `l80-08`

정리
무엇을 읽을지는 검색이 정하게 한다
먼저 Grep
진입점 찾기
파일 하나 읽기
import 따라가기
내보낸 이름 나열
래퍼가 제공하는 모든 이름
이름마다 Grep
코드베이스 전체에서
코드베이스 전체를 먼저 읽지 마세요. 다음에 읽을 것은 매 검색이 정하게 합니다.

> 노트: 원문 제목: Let searches choose what you read (RECAP). Grep first: Find the entry point → Read one file: Follow the imports → List exports: Every name a wrapper offers → Grep each name: Across the whole code base. 하단: Never read a whole code base first: let each search decide what to read next.

## 81강. Explore 서브에이전트 (`l81`)

81강
Explore 서브에이전트
슬라이드 8장

> 노트: 원문: LECTURE 81 · The Explore Subagent · 8 slides

### 116. `l81-01`

검색이 일어나는 곳
검색 출력이 컨텍스트를 채운다
검색
맞는 곳을 찾음
파일 읽기
찾은 것만
메인 대화
모든 결과를 담음
실제 작업
밀려남

> 노트: 원문 제목: Search output fills the context (WHERE SEARCHING HAPPENS). Search (Finds the right place) + Read files (Only the ones found) → Main conversation (Keeps every result) ⇢ The real work (Gets pushed out).

### 117. `l81-02`

상황
작업 하나, 단계 셋
탐색
맞는 코드 찾기
설계
무엇을 바꿀지 정하기
변경
수정하기
플랜 모드는 먼저 탐색하지만, 출력에 노이즈가 많은 부분은 탐색 단계입니다.

> 노트: 원문 제목: One task, three phases (THE SCENE). Discovery: Find the right code → Design: Decide what to change → Change: Make the edit. 하단: Plan mode explores first - but discovery is the noisy part.

### 118. `l81-03`

파손 상품
탐색이 설계를 밀어낸다
환불 규칙
적격 여부가 정해지는 곳
고객 답변
답변이 작성되는 곳
테스트
파손 상품을 다루는 테스트
메인 대화
수십 번의 검색, 파일 20~30개
설계
남은 공간이 거의 없음

> 노트: 원문 제목: Discovery crowds out the design (DAMAGED ITEMS). Refund rules (Where eligibility is decided) / Customer reply (Where it is written) / Tests (Which cover damaged items) → Main conversation (Dozens of searches, 20-30 files) ⇢ Design (Little room left).

### 119. `l81-04`

작동 방식
검색은 Explore가 맡는다
메인 대화
Explore (자체 컨텍스트)
ShopAssist 코드
분명한 질문 하나
검색하고 읽기
일치 항목과 파일
짧은 요약
노이즈가 많은 탐색은 Explore에 보내고, 메인 대화에는 그 요약만 남깁니다.

> 노트: 원문 제목: Explore does the searching (HOW IT WORKS). Main conversation → Explore (own context): one clear question / Explore → ShopAssist code: search and read / matches and files / Explore → Main conversation: short summary. 캡션: Send noisy discovery to Explore. Keep only its summary in the main conversation.

### 120. `l81-05`

파손 상품 작업
파일 30개가 들어가고, 몇 줄이 나온다
Ask Explore
1. Where is refund eligibility calculated?
2. Where are customer replies generated?
3. Which tests cover damaged items?
Summary (Explore read about 30 files)
- Refund eligibility: decided in one module
- Customer replies: built in another module
- Tests: two cover damaged items
- Gap: no test for a damaged item without a photo
질문과 짧은 답이 이런 모습일 수 있습니다. 설계 단계에 필요한 것이 모두 들어 있습니다.

> 노트: 원문 제목: Thirty files in, a few lines out (THE DAMAGED-ITEMS TASK). 의미: Explore에 질문 - 1. 환불 적격성은 어디서 계산되나? 2. 고객 답변은 어디서 만들어지나? 3. 파손 상품을 다루는 테스트는? 요약(Explore가 약 30개 파일을 읽음) - 환불 적격성: 한 모듈에서 결정 / 고객 답변: 다른 모듈에서 생성 / 테스트: 두 개가 파손 상품을 다룸 / 빈틈: 사진 없는 파손 상품 테스트가 없음. 캡션: One way the question and the short answer might look - everything the design phase needs.

### 121. `l81-06`

메인 대화에서 검색하지 않는 이유
Explore가 노이즈를 떼어 놓는다
탐색
검색과 파일 읽기
Explore
원시 출력을 자기에게만 둠
메인 대화
결정을 위한 공간

> 노트: 원문 제목: Explore keeps the noise away (WHY NOT SEARCH IN THE MAIN CHAT). Discovery (Searches and file reads) → Explore (Keeps raw output to itself) → Main conversation (Room for decisions). 점선: 탐색을 메인 대화에서 직접 했을 때의 경로.

### 122. `l81-07`

언제 쓰나
노이즈가 많은 탐색에는 Explore를 쓴다
Explore 사용
긴 작업의 노이즈가 많은 탐색. 예: 모듈 지도 그리기, 흐름 추적.
Explore 생략
이미 아는 파일 하나의 작은 변경. 메인 대화가 그냥 읽으면 됩니다.

> 노트: 원문 제목: Use Explore for noisy discovery (WHEN TO USE IT). Use Explore: Noisy discovery in a long task, like mapping a module or tracing a flow. / Skip Explore: A small change in one known file. The main conversation can simply read it.

### 123. `l81-08`

정리
Explore는 메인 컨텍스트를 지킨다
탐색
많은 검색과 읽기
Explore
자기 컨텍스트에서 작업
요약
조사 결과만 돌아옴
남은 공간
설계와 수정을 위해
긴 작업의 노이즈가 많은 탐색 단계에는 Explore를 씁니다.

> 노트: 원문 제목: Explore protects the main context (RECAP). Discovery: Many searches and reads → Explore: Works in its own context → Summary: Only findings come back → Room left: For design and edits. 하단: Use Explore for the noisy discovery phases of long tasks.

## 82강. 다듬기: 예시와 테스트 (`l82`)

82강
다듬기: 예시와 테스트
슬라이드 12장

> 노트: 원문: LECTURE 82 · Refinement: Examples and Tests · 12 slides

### 125. `l82-01`

문제
라운드마다 또 틀린다
내 설명
말로 적은 것
Claude Code
자기 방식대로 읽음

> 노트: 원문 제목: Wrong again, round after round (THE PROBLEM). Your description (Written in words) → Claude Code (Reads it its own way).

### 126. `l82-02`

상황
다시 시도할 때마다 새로운 방식으로 실패한다
[이미지: 책상에서 일하는 개발자 일러스트]
개발자
마이그레이션 스크립트를 요청
Claude Code
스크립트를 작성
환불 레코드
옛 형식에서 새 형식으로

> 노트: 원문 제목: Every retry fails in a new way (THE SCENE). Developer (Asks for a migration script) → Claude Code (Writes the script) ⇢ Refund records (Old format to new format).

### 127. `l82-03`

세 가지 도구
설명을 멈추고, 보여 준다
예시
입력과 출력 쌍
테스트 먼저
코드보다 먼저 작성
정확한 사례 하나
엣지 케이스용
설명이 여러 방식으로 읽힌다면, 설명 대신 보여 주세요.

> 노트: 원문 제목: Stop describing, start showing (THREE TOOLS). Examples: Input and output pairs / Tests first: Written before the code / One exact case: For an edge case. 하단: When a description is read in different ways, show instead of describe.

### 128. `l82-04`

첫째: 예시
우리 말은 두 가지로 읽혔다
# an old refund record
{
  "amount": "12",
  "date": "03/09/2026",
  "status": 7
}
# 3 March or 9 September?
# 12 dollars or 12 cents?
우리에게는 분명한 설명이었지만, 두 가지로 읽을 수 있었습니다.

> 노트: 원문 제목: Our words allowed two readings (FIRST: EXAMPLES). 코드(영문 유지) 의미: 옛 환불 레코드 - amount "12", date "03/09/2026", status 7. 주석: 3월 3일인가 9월 3일인가? 12달러인가 12센트인가? 캡션: The description was clear to us, but it allowed two readings.

### 129. `l82-05`

첫째: 예시
예시는 한 가지로만 읽힌다
# each example: an old record and the exact new record
# 1. the day comes first
{"date": "03/09/2026"} → {"date": "2026-09-03"}
# 2. twelve dollars is 1200 cents
{"amount": "12"} → {"amount_cents": 1200}
# 3. status code 7 is a word
{"status": 7} → {"status": "refunded"}
예시는 두 가지로 읽을 수 없습니다.

> 노트: 원문 제목: An example has only one reading (FIRST: EXAMPLES). 코드(영문 유지) 의미: 각 예시는 옛 레코드와 정확한 새 레코드. 1. 일이 먼저 온다: 03/09/2026 → 2026-09-03 / 2. 12달러는 1200센트: amount "12" → amount_cents 1200 / 3. 상태 코드 7은 단어로: 7 → "refunded". 캡션: An example cannot be read two ways.

### 130. `l82-06`

시험에서는
시험에서는 예시가 정답이다
네 번째, 더 긴 설명
말이 늘어도 같은 빈틈이 남고, 새 빈틈이 생길 수 있습니다.
구체적인 입력·출력 예시
설명이 일관되지 않은 결과를 낼 때 가장 효과적인 해결책입니다.

> 노트: 원문 제목: On the exam: examples win (ON THE EXAM). A fourth, longer description: More words leave the same gaps, and can add new ones. / Concrete input and output examples: The most effective fix when a description gives inconsistent results.

### 131. `l82-07`

둘째: 테스트 먼저
코드보다 테스트를 먼저 쓴다
def test_examples():
    assert convert(OLD_1) == NEW_1
    assert convert(OLD_2) == NEW_2
def test_edge_cases():
    assert convert(ZERO_AMOUNT)["amount_cents"] == 0
    assert convert(UNKNOWN_STATUS)["status"] == "unknown"
def test_ten_thousand_records():
    with max_seconds(5):
        convert_all(SAMPLE_10K)
테스트 스위트가 기대 동작, 엣지 케이스, 성능을 다룹니다. 그다음 Claude Code가 스크립트를 씁니다.

> 노트: 원문 제목: Write the tests before the code (SECOND: TESTS FIRST). 코드(영문 유지) 의미: test_examples - 예시 변환이 기대값과 같음 / test_edge_cases - 금액 0이면 amount_cents 0, 모르는 상태는 "unknown" / test_ten_thousand_records - 레코드 1만 개를 5초 안에 변환. 캡션: A test suite covers expected behavior, edge cases and performance - then Claude Code writes the script.

### 132. `l82-08`

반복
실패는 매번 정확히 공유한다
나
Claude Code
테스트 스위트
스크립트 작성, 테스트 실행
일부 테스트 실패
입력, 기대값, 실제값
수정, 다시 실행
실패한 테스트가 줄어듦
"아직 틀렸어, 고쳐"
"아직 틀렸어"는 실패한 사례를 숨깁니다. 정확한 실패가 정확한 목표가 됩니다.

> 노트: 원문 제목: Share each failure exactly (ITERATING). Claude Code → Test suite: write script, run tests / some tests fail / You → Claude Code: input, expected, actual / Claude Code → Test suite: fix, run again / fewer tests fail / You → Claude Code: "Still wrong, fix it". 캡션: "Still wrong" hides the failing case; an exact failure is an exact target.

### 133. `l82-09`

셋째: 엣지 케이스
null 날짜는 null로 남아야 한다
# an old refund, paid before the item was delivered
{"id": "RF-1042", "delivered_at": null, "amount": "12"}
# what the script wrote
{"id": "RF-1042", "delivered_at": "2026-10-14", "amount_cents": 1200}
# a made-up date: the 30-day return window starts on the wrong day
# "handle missing dates properly" - today? a default? skip the record?
ShopAssist는 주문에서 읽지 않은 배송일을 말하지 않습니다.

> 노트: 원문 제목: A null date must stay null (THIRD: AN EDGE CASE). 코드(영문 유지) 의미: 상품 배송 전에 지급된 옛 환불 RF-1042, delivered_at은 null. 스크립트는 delivered_at에 "2026-10-14"를 써 넣음. 주석: 지어낸 날짜 때문에 30일 반품 기간이 엉뚱한 날 시작됨 / "빠진 날짜를 제대로 처리하라" - 오늘 날짜? 기본값? 레코드 건너뛰기? 캡션: ShopAssist never states a delivery date it did not read from an order.

### 134. `l82-10`

셋째: 엣지 케이스
정확한 테스트 하나가 수정을 고정한다
# one specific test for one edge case
def test_null_delivery_date_stays_null():
    old = {"id": "RF-1042", "delivered_at": None, "amount": "12"}
    expected = {"id": "RF-1042", "delivered_at": None, "amount_cents": 1200}
    assert convert(old) == expected
# run it: the failure shows exactly where the output differs
# fix that one path - the test stays in the suite
테스트가 스위트에 남으므로, 버그가 조용히 되돌아오지 못합니다.

> 노트: 원문 제목: One exact test pins the fix (THIRD: AN EDGE CASE). 코드(영문 유지) 의미: 엣지 케이스 하나를 위한 테스트 - delivered_at이 None인 옛 레코드를 변환하면 delivered_at은 None 그대로, amount_cents는 1200. 주석: 실행하면 실패가 출력이 다른 곳을 정확히 보여 줌 / 그 경로 하나만 고치고, 테스트는 스위트에 남김. 캡션: The test stays in the suite, so the bug cannot quietly come back.

### 135. `l82-11`

복습
보여 주고, 확인하고, 라운드마다
예시
입력·출력 쌍 두세 개
테스트 먼저
동작, 엣지 케이스, 속도
반복
입력, 기대값, 실제값 공유
엣지 케이스
정확한 테스트, 정확한 출력

> 노트: 원문 제목: Show it, check it, round by round (REVIEW). Examples: Two or three input and output pairs → Tests first: Behavior, edge cases, speed → Iterate: Share input, expected, actual → Edge case: One exact test, exact output.

### 136. `l82-12`

핵심
다시 설명하지 않는다
다시 설명하기
라운드가 늘고, 또 잘못 읽힙니다.
보여 주고 확인하기
예시가 정의하고, 테스트가 확인합니다.
다음: 작업을 시작하기 전에 Claude Code가 우리에게 질문합니다.

> 노트: 원문 제목: Don't describe it again (THE TAKEAWAY). Describe again: Another round, another wrong reading. / Show and check: Examples define it, tests check it. 하단: Next: Claude Code asks us questions before the work starts.

## 83강. 인터뷰와 이슈 묶어 처리하기 (`l83`)

83강
인터뷰와 이슈 묶어 처리하기
슬라이드 10장

> 노트: 원문: LECTURE 83 · Interviews and Issue Batching · 10 slides

### 138. `l83-01`

두 가지 다듬기 습관
두 습관이 모든 변경을 좌우한다
누가 질문하나
작업을 시작하기 전에 Claude Code가 나에게 묻습니다.
메시지 하나에 문제 몇 개
연결된 문제는 함께, 독립적인 문제는 따로.
둘 다 변경에 몇 라운드가 걸릴지, 출시 후 놀랄 일이 얼마나 생길지를 정합니다.

> 노트: 원문 제목: Two habits shape every change (TWO REFINEMENT HABITS). Who asks the questions: Claude Code asks you, before the work starts. / How many problems per message: Linked problems together, independent ones apart. 하단: Both decide how many rounds a change takes - and how many surprises come after launch.

### 139. `l83-02`

상황
캐시가 조회를 빠르게 한다
조회
미스 시
ShopAssist
lookup_order를 호출
캐시
데이터의 단기 사본
주문 서비스
바쁜 날에는 느림
[이미지: 책상에서 일하는 개발자 일러스트]
개발자
캐시를 만들어 본 적 없음

> 노트: 원문 제목: A cache makes lookups faster (THE SCENE). ShopAssist (Calls lookup_order) → lookup → Cache (Short-term copy of data) → on a miss → Order service (Slow on busy days). Developer (Never built a cache) → Cache.

### 140. `l83-03`

핵심 규칙
Claude Code는 코드를 쓰기 전에 묻는다
익숙하지 않은 분야에서는
코드를 쓰기 전에 Claude Code가 나에게 질문하게 합니다.
서로 영향을 주는 문제: 메시지 하나로
독립적인 문제: 하나씩

> 노트: 원문 제목: Claude Code asks before it codes (THE KEY RULE). In an unfamiliar area: Let Claude Code ask you questions before it writes any code. / Problems that affect each other: one message / Independent problems: one at a time.

### 141. `l83-04`

습관 1: 인터뷰
Claude Code에게 나를 인터뷰하게 한다
[이미지: 책상에서 일하는 개발자 일러스트]
개발자
캐시를 원함
Claude Code
만들기 전에 질문함

> 노트: 원문 제목: Ask Claude Code to interview you (HABIT ONE: THE INTERVIEW). Developer (Wants a cache) → Claude Code (Asks before it builds). 인터뷰 패턴: 구현 전에 Claude가 질문하게 하여 개발자가 예상하지 못한 고려 사항을 드러냅니다.

### 142. `l83-05`

인터뷰
내가 묻지 않은 질문 세 가지
신선도
사본은 얼마나 최신이어야 하나?
무효화
환불 후 캐시된 주문을 지워야 하나?
장애 모드
캐시가 다운되면?
무효화: 사본이 더는 사실이 아니어서 버려야 하는 시점을 정하는 것.

> 노트: 원문 제목: Three questions you did not ask (THE INTERVIEW). Freshness: How fresh must the copy be? / Invalidation: Remove the cached order after a refund? / Failure modes: What if the cache is down? 하단: Invalidation: deciding when a copy is no longer true and must be thrown away.

### 143. `l83-06`

질문이 중요한 이유
묻지 않은 질문은 추측이 된다
ShopAssist
캐시
주문 서비스
lookup_order ORD-1042
배송 완료 (옛 상태)
캐시 다운
직접 읽기
상태: 환불됨
질문을 건너뛰면 Claude Code가 추측합니다. 답이 코드보다 먼저입니다.

> 노트: 원문 제목: Unasked questions become guesses (WHY THE QUESTIONS MATTER). ShopAssist → Cache: lookup_order ORD-1042 / Cache → ShopAssist: delivered (old status) - 환불 후에도 옛 상태를 돌려줌 / cache is down / ShopAssist → Order service: read directly / status: refunded. 캡션: Skip the questions and Claude Code guesses. Answers come before code.

### 144. `l83-07`

습관 2: 메시지당 문제 수
문제 다섯 개 중 두 개가 연결돼 있다
def lookup_order(order_id, customer_id):
    key = order_id
    if key in cache:
        return cache[key]
    order = order_service.get(order_id)
    check_owner(order, customer_id)
    cache[key] = order
    return order
def on_refund(order_id):
    cache.pop(order_id, None)
리뷰에서 문제 다섯 개가 나왔고, 그중 두 개는 같은 캐시 키를 공유합니다.

> 노트: 원문 제목: Two of five problems are linked (HABIT TWO: PROBLEMS PER MESSAGE). 코드(영문 유지) 의미: lookup_order는 order_id만 캐시 키로 씀. 캐시에 있으면 소유자 확인(check_owner) 없이 바로 반환. on_refund는 order_id 키로 캐시를 지움. 캡션: A review finds five problems - two of them share one cache key.

### 145. `l83-08`

연결된 문제
연결된 문제는 메시지 하나로 보낸다
# Round 1: only the key is fixed
def lookup_order(order_id, customer_id):
    key = (order_id, customer_id)
    cache[key] = order
def on_refund(order_id):
    # still the old key
    cache.pop(order_id, None)
자세한 메시지 하나로 보내지 않으면, 두 번째 라운드는 첫 라운드가 망가뜨린 것을 고치게 됩니다.

> 노트: 원문 제목: Linked problems go in one message (LINKED PROBLEMS). 코드(영문 유지) 의미: 1라운드에서 키만 (order_id, customer_id)로 고침. on_refund는 여전히 옛 키(order_id)로 지우므로 환불 후 캐시가 지워지지 않음. 캡션: One detailed message, or the second round repairs what the first one broke.

### 146. `l83-09`

독립적인 문제
독립적인 수정은 하나씩 한다
로그 오타
로그 메시지에 오타
빠진 import
테스트 파일에 import가 없음
서식
함수 하나의 서식이 틀림
작은 라운드로: 다음 수정 전에 각 수정을 확인합니다. 실패하면 원인이 드러납니다.

> 노트: 원문 제목: Independent fixes go one by one (INDEPENDENT PROBLEMS). Log typo: A log message has a typo / Missing import: A test file lacks an import / Formatting: One function is formatted wrong. 하단: Small rounds: check each fix before the next one - a failure shows its cause.

### 147. `l83-10`

정리
먼저 묻고, 그다음 수정을 묶는다
인터뷰 먼저
코드를 쓰기 전에 Claude Code가 질문
연결된 수정
자세한 메시지 하나, 어떻게 연결되는지 설명
독립적인 수정
하나씩, 변경마다 확인
작업 전에는 Claude Code가 묻게 하고, 리뷰 후에는 서로 영향을 주는지에 따라 문제를 묶습니다.

> 노트: 원문 제목: Ask first, then group the fixes (RECAP). Interview first: Claude Code asks before it writes code / Linked fixes: One detailed message, say how they connect / Independent fixes: One at a time, check each change. 하단: Before the work starts, let Claude Code ask. After a review, group problems by whether they affect each other.

## 84강. 세션: 이어 갈까 새로 시작할까 (`l84`)

84강
세션: 이어 갈까 새로 시작할까
슬라이드 10장

> 노트: 원문: LECTURE 84 · Sessions: Resume or Start Fresh · 10 slides

### 149. `l84-01`

며칠에 걸친 작업
오래된 세션은 낡은 사실을 품을 수 있다
옛 세션 이어 가기
이전 메시지와 결과를 모두 유지합니다.
새 세션 시작하기
옛 사실 없이 깨끗하게 시작합니다.
오래된 세션에는 더 이상 사실이 아닌 내용이 남아 있을 수 있습니다.

> 노트: 원문 제목: Old sessions can hold stale facts (WORK OVER SEVERAL DAYS). Resume the old session: Keep every earlier message and result. / Start a new session: Begin clean, with no old facts. 하단: An old session can hold facts that are no longer true.

### 150. `l84-02`

상황: 금요일
금요일의 작업은 한 세션에 담겨 있다
개발자
Claude Code
환불 코드
환불 흐름을 분석해 줘
검색, 파일 ~20개 읽기
테스트 실행
파일과 테스트 결과
금액, $500 한도, 테스트
세션은 하나의 대화입니다. 작업하는 동안 모든 메시지와 도구 결과가 저장됩니다.

> 노트: 원문 제목: Friday's work lives in one session (THE SCENE: FRIDAY). Developer → Claude Code: Analyze the refund flow / Claude Code → Refund code: Search, read ~20 files / Run the tests / Refund code → Claude Code: Files and test results / Claude Code → Developer: Amounts, $500 limit, tests. 캡션: A session is one conversation: every message and every tool result, saved as you work.

### 151. `l84-03`

월요일: 이어 갈까?
사실이면 이어 가고, 낡았으면 새로 시작한다
규칙
옛 컨텍스트가 대부분 여전히 사실이면 이어 갑니다. 옛 도구 결과가 낡았으면 새로 시작합니다.
1. 이름 붙인 세션 이어 가기
2. 무엇이 바뀌었는지 알려 주기
3. 요약과 함께 새로 시작하기

> 노트: 원문 제목: Resume if true, new if stale (MONDAY: CONTINUE?). The rule: Resume when the old context is still mostly true. Start fresh when old tool results are stale. / 1. Resume a named session / 2. Tell it what changed / 3. Start fresh with a summary.

### 152. `l84-04`

첫째: 이름으로 이어 가기
ID가 아니라 이름으로 이어 간다
# Friday: give the session a name
/rename refund analysis
# Monday: resume it by name
claude --resume "refund analysis"
# Newer versions also accept the ID
claude --resume <session-id>
시험에서 정답은 세션 이름과 함께 쓰는 resume 플래그입니다.

> 노트: 원문 제목: Resume by name, not by ID (FIRST: RESUME BY NAME). 코드(영문 유지) 의미: 금요일에 /rename으로 세션 이름을 "refund analysis"로 붙임. 월요일에 claude --resume "refund analysis"로 이름을 지정해 이어 감. 새 버전은 세션 ID도 받음. 명령 동작은 원문 그대로이며 확인하지 않았습니다. 캡션: On the exam, the answer is the resume flag with the session name.

### 153. `l84-05`

둘째: 무엇이 바뀌었나
이어 간 세션은 변경을 놓친다
머지
[이미지: 책상에서 일하는 개발자 일러스트]
팀원
풀 리퀘스트를 머지함
현재 코드
통화 헬퍼와 환불 테스트가 바뀜
이어 간 세션
옛 파일 버전을 그대로 가짐
잘못된 그림
사라진 코드를 두고 추론함

> 노트: 원문 제목: A resumed session misses changes (SECOND: WHAT CHANGED). Teammate (Merged a pull request) → merged → Code now (Currency helper and refund test changed). Resumed session (Still holds the old file versions) → Wrong picture (Reasons about code that is gone). Code now도 Wrong picture로 이어짐.

### 154. `l84-06`

둘째: 무엇이 바뀌었나
바뀐 파일만 짚어 준다
● ● ●
세션: refund analysis
DEMO
새 채팅
Refund analysis
Pricing review
금요일 이후 통화 헬퍼와 환불 테스트가 바뀌었어. 그 두 파일을 다시 읽어 줘.
통화 헬퍼와 환불 금액 테스트를 다시 읽겠습니다. 금요일 분석의 나머지는 여전히 유효하므로 그대로 유지합니다.
Claude에게 답장…
흐름 전체를 다시 탐색하지도, 아무 말 없이 넘어가지도 말고 바뀐 것을 짚어 주세요.

> 노트: 원문 제목: Name the changed files only (SECOND: WHAT CHANGED). 예시 화면(Session: refund analysis, DEMO). 사이드바: New chat / Refund analysis / Pricing review. 사용자: Since Friday, the currency helper and refund test changed. Re-read those two files. / Claude: I will re-read the currency helper and the refund amount test. The rest of Friday's analysis still holds, so I keep it. 캡션: Do not re-explore the whole flow, and do not stay silent: name the changes.

### 155. `l84-07`

셋째: 새로 시작하기
대부분 낡았다면 새 세션을 시작한다
이동
[이미지: 노트북 앞에서 회의하는 두 사람 일러스트]
팀
환불 코드를 옮김
환불 서비스
대부분의 파일이 옮겨지거나 바뀜
금요일의 결과
사라진 코드를 설명함
뒤섞인 그림
옛것과 새것이 함께 섞임

> 노트: 원문 제목: Mostly stale? Start a new session (THIRD: START FRESH). The team (Moved the refund code) → moved → Refund service (Most files moved or changed). Friday's results (Describe code that is gone) → Mixed picture (Old and new together). Refund service도 Mixed picture로 이어짐.

### 156. `l84-08`

셋째: 요약
짧은 요약이 옛 대화 기록보다 낫다
goal: explain how refund amounts are calculated
findings:
  - amounts are calculated in one place
  - the 500 dollar limit is checked after that
decisions:
  - keep the limit check as it is
open_questions:
  - do partial refunds use the same limit?
next_step: read the refund service and the tests
요약에는 옛 파일 내용이 없습니다. Claude Code는 현재 코드를 읽고, 요약은 방향을 잡아 줍니다.

> 노트: 원문 제목: A short summary beats old history (THIRD: THE SUMMARY). 요약(영문 유지) 의미: goal 환불 금액이 어떻게 계산되는지 설명 / findings 금액은 한 곳에서 계산됨, 500달러 한도는 그 뒤에 확인됨 / decisions 한도 확인은 그대로 둠 / open_questions 부분 환불도 같은 한도를 쓰나? / next_step 환불 서비스와 테스트를 읽기. 캡션: It holds no old file contents: Claude Code reads the current code, and the summary guides it.

### 157. `l84-09`

기억할 것
이름 붙이고, 이어 가고, 변경을 짚는다
이름 붙이기
플래그와 이름으로 이어 감
유효하면 이어 가기
이전 컨텍스트가 대부분 사실
변경 짚기
Claude Code가 그것만 다시 읽음
새로 시작하기
목표, 조사 결과, 결정, 다음 단계

> 노트: 원문 제목: Name it, resume it, name changes (WHAT TO REMEMBER). Name it: Resume with the flag and the name / Resume if valid: Earlier context is mostly true / Name changes: Claude Code re-reads only those / Start fresh: Goal, findings, decisions, next step.

### 158. `l84-10`

옛 작업을 이어 가기 전에
코드가 얼마나 바뀌었는지 묻는다
조금만 바뀜
이어 가고, 바뀐 것을 짚어 줍니다.
많이 바뀜
요약과 함께 새로 시작합니다.
그 뒤로 코드가 얼마나 바뀌었나요?

> 노트: 원문 제목: Ask how much code has changed (BEFORE YOU CONTINUE OLD WORK). Only a little changed: Resume, and name the changes. / A lot changed: Start fresh with a summary. 하단: How much of the code has changed since then?

## 85강. 세션 포크하기 (`l85`)

85강
세션 포크하기
슬라이드 9장

> 노트: 원문: LECTURE 85 · Forking a Session · 9 slides

### 160. `l85-01`

세션 포크하기
포크는 대화의 사본 두 개를 만든다
이름 붙인 세션
하나의 작업 줄기
사본 A
접근법 1
사본 B
접근법 2
공정하게 비교하려면 두 접근법이 같은 사실에서 출발해야 합니다.

> 노트: 원문 제목: A fork makes two copies of a chat (FORKING A SESSION). Named session (One line of work) → Copy A (Approach 1) / Copy B (Approach 2). 하단: A fair comparison needs both approaches to start from the same facts.

### 161. `l85-02`

상황
분석은 하나, 설계 선택지는 둘
[이미지: 노트북 앞에서 회의하는 두 사람 일러스트]
팀
둘 다 보고 싶어 함
환불 분석
흐름을 읽고 테스트를 정리함
제자리에 두기
현재 모듈에 검사를 추가
새 모듈
모든 환불 경로가 호출하는 계산 하나

> 노트: 원문 제목: One analysis, two design options (THE SCENE). The team (Wants to see both) → Refund analysis (Flow read, tests listed) → Keep it in place (Add checks to the current module) / New module (One calculation every refund path calls).

### 162. `l85-03`

세 가지
포크는 지금까지의 대화를 복사한다
왜 포크하나
공정하고 비용이 적은 비교
어떻게 포크하나
플래그, 커맨드, SDK
두 가지 포크
같은 이름, 다른 두 기능
포크는 지금까지의 대화를 복사합니다. 그다음 각 사본은 따로 이어집니다.

> 노트: 원문 제목: A fork copies the chat up to now (THREE THINGS). Why we fork: Fair, cheap comparison / How to fork: Flag, command, SDK / Two forks: Same name, two features. 하단: A fork copies the conversation up to now. Then each copy continues on its own.

### 163. `l85-04`

왜 포크하나
포크가 두 대안보다 낫다
새어 듦
분석
하루 꼬박 걸린 작업
접근법 1
먼저 시도함
접근법 2
설계 1을 기억함
새 세션 1
하루 작업을 통째로 반복
새 세션 2
또 반복
포크
같은 기준선, 서로 섞이지 않음

> 노트: 원문 제목: Forking beats the two alternatives (WHY WE FORK). 대안 1(한 세션에서 차례로): Analysis (A full day of work) → Approach 1 (Tried first) --leaks--> Approach 2 (Remembers design 1). 대안 2(새 세션 두 개): New session 1 (Repeat the whole day) / New session 2 (Repeat it again). 포크: A fork (Shared baseline, no cross-talk).

### 164. `l85-05`

어떻게 포크하나
resume에 플래그를 더하면 포크가 된다
# Agent SDK (Python): resume by ID and fork
options = ClaudeAgentOptions(
    resume=session_id,
    fork_session=True,
)
원래 세션은 그대로 남고, 포크는 새 세션 ID를 받습니다.

> 노트: 원문 제목: Resume plus a flag makes a fork (HOW TO FORK). 코드(영문 유지) 의미: Agent SDK(Python)에서 resume에 세션 ID를 넣고 fork_session=True를 주면 그 세션을 이어 가는 대신 포크합니다. 캡션: The original session stays as it was; the fork gets a new session ID.

### 165. `l85-06`

세부 사항 하나
분기마다 계획하고, 그다음 비교한다
분기 1
계획: 파일, 위험, 테스트
비교
하나만 구현
분기 2
계획: 파일, 위험, 테스트
디스크의 같은 폴더
포크는 파일을 복사하지 않음

> 노트: 원문 제목: Plan in each branch, then compare (ONE DETAIL). Branch 1 (Plan: files, risks, tests) → Compare (Build only one) ← Branch 2 (Plan: files, risks, tests). 두 분기 모두 Same folder on disk (A fork does not copy files)를 공유. 그래서 두 분기에서 바로 구현하면 같은 파일을 건드리게 되므로, 각 분기에서는 계획만 세우고 비교한 뒤 하나만 구현합니다.

### 166. `l85-07`

셋째
두 포크, 정반대의 기록
스킬의 context: fork
기록 없는 서브에이전트에서 실행됩니다. 노이즈가 많은 작업이 밖에 머뭅니다.
세션 포크
기록 전체를 유지합니다. 이미 해 둔 작업에서 출발합니다.
하나는 깨끗하게, 다른 하나는 앞선 내용을 알고 시작합니다.

> 노트: 원문 제목: Two forks, opposite histories (THIRD). Skill: context fork: Runs in a subagent with no history. Noisy work stays out. / Session fork: Keeps the whole history. Starts from work already done. 하단: One starts clean, the other starts informed.

### 167. `l85-08`

핵심 정리
접근법마다 한 번씩 포크한다
이어 가기
한 세션을 계속함
포크
기록을 새 분기로 복사
접근법마다 하나
같은 분석, 서로 섞이지 않음
포크하는 법
resume + 플래그, /branch, 또는 SDK

> 노트: 원문 제목: Fork once per approach (MAIN POINTS). Resume: Continues one session / Fork: Copies history into a new branch / One per approach: Same analysis, no cross-talk / How to fork: Resume + flag, /branch, or SDK. /branch 커맨드는 원문 그대로이며 확인하지 않았습니다.

### 168. `l85-09`

실전 규칙
포크하고, 비교하고, 하나만 만든다
분석을 포크
선택지마다 분기 하나
계획 비교
파일, 위험, 테스트
하나만 구현
고른 것 하나만
스킬 포크는 기록 없이 시작하고, 세션 포크는 기록을 유지합니다.

> 노트: 원문 제목: Fork, compare, build one (THE PRACTICAL RULE). Fork the analysis: One branch per option → Compare the plans: Files, risks, tests → Build one: Only the one you choose. 하단: A skill fork starts without history; a session fork keeps it.

## 86강. 긴 탐색을 또렷하게 유지하기 (`l86`)

86강
긴 탐색을 또렷하게 유지하기
슬라이드 11장

> 노트: 원문: LECTURE 86 · Keeping Long Explorations Sharp · 11 slides

### 170. `l86-01`

문제
긴 세션은 조용히 초점을 잃는다
하나의 긴 세션
몇 시간에 걸친 탐색
확신에 찬 답
여전히 확실하게 들림
과녁을 벗어남
더 이상 내 코드에 대한 답이 아님

> 노트: 원문 제목: Long sessions lose focus quietly (THE PROBLEM). One long session: Hours of exploring → Confident answers: They still sound sure → Off target: No longer about your code.

### 171. `l86-02`

상황
첫 한 시간: 정확한 답
● ● ●
Claude Code 세션 - 1시간째
DEMO
코드에서 환불과 에스컬레이션이 어떻게 동작하는지 탐색해 줘
조사 결과
• 환불 한도는 RefundPolicy에서 확인됨
• 금액은 통화 헬퍼에서 반올림됨
Claude에게 답장…
목표: 사진 없이 도착한 파손 상품을 확인하는 검사.

> 노트: 원문 제목: Hour one: precise answers (THE SCENE). 예시 화면(Claude Code session - hour 1, DEMO). 사용자: Explore how refunds and escalations work in the code / Claude: Findings - The refund limit is checked in RefundPolicy; Amounts are rounded in the currency helper. 캡션: Goal: a check for damaged items that arrive without a photo.

### 172. `l86-03`

두 시간 뒤
나중의 답이 첫 시간의 답과 어긋난다
● ● ●
Claude Code 세션 - 3시간째
DEMO
환불 한도는 RefundPolicy에서 확인됩니다.
새 검사는 어디에 넣어야 해?
검증 로직은 보통 서비스 레이어에 둡니다.
환불 한도는 보통 컨트롤러에서 확인합니다.
Claude에게 답장…
같은 세션, 두 시간과 파일 약 60개를 거친 뒤입니다.

> 노트: 원문 제목: Later answers contradict hour one (TWO HOURS LATER). 예시 화면(Claude Code session - hour 3, DEMO). Claude: The refund limit is checked in RefundPolicy. / 사용자: Where should the new check go? / Claude: Validation logic is typically placed in a service layer. / Claude: The refund limit is usually checked in the controller. 일반론으로 흐르고, 앞서 찾은 사실(RefundPolicy)과도 어긋납니다. 캡션: Same session, two hours and about sixty files later.

### 173. `l86-04`

기억할 것
조사 결과는 대화 밖에 둘 곳이 필요하다
증상과 원인
답이 흐트러지는 이유
스크래치패드 파일
대화 밖에 두는 메모
compact 커맨드
줄여 주지만, 언제?
중요한 조사 결과가 대화 안에만 있어서는 안 됩니다.

> 노트: 원문 제목: Findings need a home outside chat (REMEMBER THIS). Symptoms, cause: Why answers drift / Scratchpad file: Notes outside the chat / Compact command: Shorten, but when? 하단: Important findings must not live only in the conversation.

### 174. `l86-05`

첫째: 증상
컨텍스트 저하에는 두 가지 징후가 있다
답이 일반론이 된다
이 코드베이스에서 앞서 찾은 클래스가 아니라 흔한 패턴을 이야기합니다.
답이 서로 어긋난다
첫 한 시간에 찾은 사실이 세션 후반에 바뀝니다.

> 노트: 원문 제목: Context degradation has two signs (FIRST: THE SYMPTOMS). The answers turn generic: They talk about typical patterns, not the classes found earlier in this code base. / The answers disagree: A fact from the first hour changes later in the session.

### 175. `l86-06`

원인
초기 조사 결과가 묻힌다
초기 조사 결과
환불 한도, 반올림
탐색 출력
검색 결과, 파일
다음 답
내 코드가 아니라 흔한 코드
묻힘
빈틈을 메움
다시 묻거나 "구체적으로"를 덧붙여도 묻힌 내용은 되살아나지 않습니다.

> 노트: 원문 제목: Early findings get buried (THE CAUSE). Early findings (Refund limit, rounding) - buried → Discovery output (Search results, files) - gap filled → Next answer (Typical code, not yours). 하단: Asking again, or adding "be specific", does not dig them out.

### 176. `l86-07`

둘째: 스크래치패드
Claude Code가 디스크에 메모를 남긴다
짧은 항목
Claude Code
코드를 탐색함
스크래치패드 파일
대화 밖의 평범한 메모
항목마다: 클래스나 함수, 파일, 하는 일.

> 노트: 원문 제목: Claude Code keeps notes on disk (SECOND: THE SCRATCHPAD). Claude Code (Explores the code) → short entry → Scratchpad file (Plain notes, outside the chat). 하단: Each entry: the class or function, the file, what it does.

### 177. `l86-08`

스크래치패드
답하기 전에 메모를 읽는다
# Exploration notes
- RefundPolicy: decides eligibility, checks the refund limit
- CurrencyHelper: rounds amounts to the currency
- EscalationRouter: sends large refunds to a human agent
- Open: where do damaged-item claims enter the flow?
## Rule
Before answering a question about the code, read this file first.
디스크에 있으므로 줄어든 대화나 새 세션에서도 살아남습니다.

> 노트: 원문 제목: Read the notes before answering (THE SCRATCHPAD). 메모(영문 유지) 의미: 탐색 메모 - RefundPolicy: 자격을 판단하고 환불 한도를 확인 / CurrencyHelper: 금액을 통화에 맞게 반올림 / EscalationRouter: 큰 환불을 사람 상담원에게 보냄 / 미해결: 파손 상품 청구는 흐름 어디로 들어오나? 규칙: 코드에 관한 질문에 답하기 전에 이 파일을 먼저 읽을 것. 캡션: It lives on disk, so it survives a shortened conversation or a new session.

### 178. `l86-09`

셋째: compact 커맨드
compact는 줄여 주지만 세부를 잃는다
compact
긴 대화
검색 결과, 파일 전체
짧은 요약
이름, 경로, 숫자가 먼저 빠짐
핵심 조사 결과가 대화 안에만 있을 때는 절대 compact하지 마세요.

> 노트: 원문 제목: Compact shortens, and loses detail (THIRD: THE COMPACT COMMAND). Long conversation (Search results, full files) → compact → Short summary (Names, paths, numbers drop first). 하단: Never compact while key findings exist only in the chat.

### 179. `l86-10`

올바른 순서
메모를 갱신하고, 그다음 compact한다
대화
Claude Code
스크래치패드 파일
조사 결과 갱신
/compact
다시 읽기
정확한 조사 결과
compact에 무엇을 남길지 알려 주세요. Claude Code와 Agent SDK 에이전트 모두에서 긴 탐색에 대한 시험 정답입니다.

> 노트: 원문 제목: Update the notes, then compact (THE RIGHT ORDER). Claude Code → Scratchpad file: update findings / Claude Code → Conversation: /compact / Claude Code → Scratchpad file: read it again / Scratchpad file → Claude Code: exact findings. 캡션: Tell compact what to keep. Exam answer for long explorations - in Claude Code and in Agent SDK agents.

### 180. `l86-11`

복습
먼저 적고, 그다음 줄인다
저하
일반론적이고 앞뒤가 맞지 않는 답
스크래치패드
나중 질문 전에 읽음
compact
탐색이 끝난 뒤 공간을 비움
조사 결과를 먼저 적어 두고, 그다음에야 대화가 짧아지게 하세요.

> 노트: 원문 제목: Write it down, then shorten (REVIEW). Degradation: Generic, inconsistent answers → Scratchpad: Read before later questions → Compact: Frees space after discovery. 하단: Write the findings down first, and only then let the conversation get shorter.

## 87강. 단계, 서브에이전트, 매니페스트 (`l87`)

87강
단계, 서브에이전트, 매니페스트
슬라이드 13장

> 노트: 원문: LECTURE 87 · Phases, Subagents and Manifests · 13 slides

### 182. `l87-01`

큰 변경
작업은 나누고, 조사 결과는 저장한다
너무 큼
컨텍스트 하나, 실행 한 번으로는 감당 못 함
나누기
서브에이전트와 단계에 걸쳐
조사 결과 지키기
단계가 바뀌거나 크래시가 나도
하루치 조사 결과를 잃으면 그 하루의 비용을 두 번 치릅니다.

> 노트: 원문 제목: Split the work, save the findings (LARGE CHANGES). Too big: For one context and one run → Split it: Across subagents and phases → Keep findings: Through a phase change or a crash. 하단: Lose a day of findings and you pay for that day twice.

### 183. `l87-02`

과제
세 단계로 환불 코드를 떼어 낸다
탐색
환불 코드를 지도로 그림
설계
서비스가 어디서 시작하고 끝나는지 정함
이전
코드를 부분별로 옮김
환불 처리가 ShopAssist 본 코드에서 빠져나갑니다. 파일 수백 개 규모입니다.

> 노트: 원문 제목: Three phases move refunds out (THE TASK). Discovery: Maps the refund code → Design: Sets where the service starts and ends → Migration: Moves the code part by part. 하단: Refund handling leaves the main ShopAssist code - hundreds of files.

### 184. `l87-03`

누가 무엇을 하나
코디네이터가 전체 그림을 쥔다
코디네이터
작업 전체를 운영
디스크의 파일
살아남아야 할 조사 결과
서브에이전트
세부 작업
서브에이전트
세부 작업

> 노트: 원문 제목: The coordinator keeps the picture (WHO DOES WHAT). Coordinator (Runs the whole job) → Subagent (Detailed work) ×2. Coordinator → Files on disk (Findings that must survive).

### 185. `l87-04`

다룰 내용
긴 작업을 위한 세 가지 습관
초점 있는 질문
서브에이전트마다 질문 하나
단계 요약
한 단계를 다음 단계로 넘겨줌
저장된 상태
크래시 복구용 매니페스트

> 노트: 원문 제목: Three habits for long jobs (WHAT WE COVER). Focused questions: One question per subagent / Phase summary: Carries a phase into the next / Saved state: A manifest for crash recovery.

### 186. `l87-05`

첫째: 초점 있는 질문
큰 그림을 잃는 두 가지 방법
코디네이터
컨텍스트가 검색 출력으로 가득 참
파일 수백 개
환불 코드
모호한 서브에이전트
"Understand the refund code"
긴 보고서
일반론적이고 쓰기 어려움

> 노트: 원문 제목: Two ways to lose the big picture (FIRST: FOCUSED QUESTIONS). 1) Coordinator (Context fills with search output) → Hundreds of files (The refund code): 코디네이터가 직접 읽으면 컨텍스트가 넘침. 2) Coordinator → Vague subagent ("Understand the refund code" = 환불 코드를 이해해 줘) → Long report (General, hard to use).

### 187. `l87-06`

첫째: 초점 있는 질문
서브에이전트마다 질문 하나
코디네이터
테스트 에이전트
의존성 에이전트
환불 파일
환불 테스트 파일 찾기
환불 의존성 추적
파일 수십 개 읽기
이름, 파일, 사실
호출하는 쪽과 호출되는 쪽
원본 출력은 서브에이전트 안에 남고, 코디네이터는 상위 수준의 그림만 유지합니다.

> 노트: 원문 제목: One question per subagent (FIRST: FOCUSED QUESTIONS). Coordinator → Test subagent: Find the refund test files / Coordinator → Dependency subagent: Trace refund dependencies / Test subagent → Refund files: Read dozens of files / Test subagent → Coordinator: Names, files, facts / Dependency subagent → Coordinator: Callers and callees. 캡션: Raw output stays in the subagent - the coordinator keeps only the high-level picture. 테스트 에이전트, 의존성 에이전트는 원문의 Test subagent, Dependency subagent(서브에이전트)입니다.

### 188. `l87-07`

둘째: 단계 요약
서브에이전트는 자기 프롬프트만 안다
탐색
조사 결과를 손에 쥠
코디네이터
요약을 작성
설계 서브에이전트
새로 시작, 기억 없음

> 노트: 원문 제목: Subagents know only their prompt (SECOND: THE PHASE SUMMARY). Discovery (Findings in hand) → Coordinator (Writes a summary) → Design subagents (New, with no memory).

### 189. `l87-08`

둘째: 단계 요약
요약이 모든 프롬프트의 첫머리에 온다
Context from discovery:
modules: refund_service, refund_rules, payouts
depends_on: orders, payments, notifications
tests: refund test files, listed by name
risks: the $500 limit is checked in two places,
       and only one of them has a test
open_questions: who sends the refund emails?
Task: decide where the new service begins and ends.
설계 서브에이전트를 시작하는 한 가지 방법: 탐색 기록 전체가 아니라 요약을 먼저 줍니다.

> 노트: 원문 제목: The summary opens every prompt (SECOND: THE PHASE SUMMARY). 프롬프트(영문 유지) 의미: 탐색 단계의 컨텍스트 - 모듈 refund_service, refund_rules, payouts / 의존 대상 orders, payments, notifications / 테스트 파일 이름 목록 / 위험: $500 한도가 두 곳에서 확인되는데 그중 하나에만 테스트가 있음 / 미해결: 환불 이메일은 누가 보내나? 과제: 새 서비스가 어디서 시작하고 끝나는지 정할 것. 캡션: One way to start a design subagent: the summary first, not the full discovery transcripts.

### 190. `l87-09`

셋째: 크래시
크래시가 작업을 처음으로 되돌려서는 안 된다
부분 1
옮김
부분 2
옮김
부분 3
옮김
부분 4
중단됨
부분 5
시작 안 함
저장된 상태가 없으면 처음부터 다시 하고, 이미 파일을 바꾼 단계를 반복할 수도 있습니다.

> 노트: 원문 제목: A crash should not reset the job (THIRD: CRASHES). Part 1/2/3: Moved / Part 4: Interrupted / Part 5: Not started. 하단: No saved state: start over, and maybe repeat a step that already changed files.

### 191. `l87-10`

셋째: 크래시
에이전트마다 자기 상태를 저장한다
# one state file per agent, in a fixed folder
task: move the payout code
status: in progress
findings: payouts call the refund rules
files_changed: payout.py, payout_rules.py, payout_api.py
next_step: update the payout imports
에이전트는 끝날 때만이 아니라 단계마다 이 파일을 다시 씁니다.

> 노트: 원문 제목: Each agent saves its own state (THIRD: CRASHES). 상태 파일(영문 유지) 의미: 에이전트마다 상태 파일 하나, 정해진 폴더에 둠 / task 지급(payout) 코드 옮기기 / status 진행 중 / findings 지급 코드가 환불 규칙을 호출함 / files_changed 바뀐 파일 / next_step 지급 import 갱신. 캡션: The agent rewrites this file after every step, not only when it finishes.

### 192. `l87-11`

셋째: 크래시
매니페스트는 모든 에이전트를 나열한다
# the manifest: one short file for the whole job
# agent   state file          status
part-1    state/part-1.yaml   done
part-2    state/part-2.yaml   done
part-3    state/part-3.yaml   done
part-4    state/part-4.yaml   in progress
part-5    state/part-5.yaml   not started
# status: done, in progress or not started
코디네이터가 보는 작업 지도입니다. 각 경로는 에이전트 하나의 상태 파일을 가리킵니다.

> 노트: 원문 제목: The manifest lists every agent (THIRD: CRASHES). 매니페스트(영문 유지) 의미: 작업 전체에 대한 짧은 파일 하나. 에이전트, 상태 파일 경로, 상태(done 완료 / in progress 진행 중 / not started 시작 안 함)를 나열. part-1~3 완료, part-4 진행 중, part-5 시작 안 함. 캡션: The coordinator's map of the job: each path points to one agent's state file.

### 193. `l87-12`

크래시 뒤
매니페스트에서 이어 간다
코디네이터
저장된 파일
새 서브에이전트
매니페스트 불러오기
완료된 부분은 완료로 유지
부분 4 상태 파일 읽기
완료 내용, 파일, 다음 단계
저장된 상태로 프롬프트
이어서 진행
옛 대화가 아니라 상태 파일에서 다시 구성하세요. 대화는 크래시로 끊길 수 있습니다.

> 노트: 원문 제목: Resume from the manifest (AFTER A CRASH). Coordinator → Saved files: Load the manifest / Saved files → Coordinator: Done parts stay done / Coordinator → Saved files: Read part 4 state file / Saved files → Coordinator: Done, files, next step / Coordinator → New subagent: Prompt with saved state / New subagent: Continues. 캡션: Rebuild from the state files, not from the old conversation - a crash can cut it off.

### 194. `l87-13`

정리
조사 결과는 디스크에 산다
묻기
구체적인 질문, 읽기는 서브에이전트 안에서
요약하기
핵심 조사 결과가 다음 단계 프롬프트의 첫머리에
저장하기
단계마다 정해진 곳에 상태 저장
이어 가기
매니페스트 먼저, 그다음 저장된 상태를 새 에이전트에
여러 단계와 여러 날에 걸친 작업에서는 조사 결과를 대화에만 두지 말고 디스크에 두세요.

> 노트: 원문 제목: Findings live on disk (RECAP). Ask: Specific questions; the reading stays in the subagent → Summarize: Key findings open the next phase's prompts → Save: State to a known place after every step → Resume: Manifest first, then saved state into new agents. 하단: Over several phases and days, keep findings on disk, not only in a conversation.

## 88강. Claude Code 사례: 팀 설정 (`l88`)

88강
Claude Code 사례: 팀 설정
슬라이드 13장

> 노트: 원문: LECTURE 88 · Claude Code Case: Team Setup · 13 slides

### 196. `l88-01`

점검: Claude Code 설정
한 사람에겐 되고, 나머지에겐 안 된다
개발자 한 명
Claude Code가 팀이 기대하는 대로 동작합니다.
나머지 모두
규칙이 틀리고, 커맨드와 스킬이 없습니다.
시험의 오답은 대개 맞는 설정을 틀린 파일에 넣습니다.

> 노트: 원문 제목: Works for one, fails for the rest (CHECKPOINT: CLAUDE CODE SETUP). One developer: Claude Code does what the team expects. / Everyone else: Wrong conventions, missing commands and skills. 하단: Exam wrong answers often put the right setting in the wrong file.

### 197. `l88-02`

첫 번째 증상
Leo의 테스트가 잘못된 설정을 쓴다
요청
작성
[이미지: 책상에서 일하는 개발자 일러스트]
Leo
가장 최근에 합류한 개발자
Claude Code
옛 결제 코드에 테스트 추가
생성된 테스트
틀린 프레임워크, 실제 결제 서비스
몇 년째 여기서 일한 Maria에게는 이런 일이 일어나지 않습니다.

> 노트: 원문 제목: Leo's tests use the wrong setup (FIRST SYMPTOM). Leo (Newest developer) → asks → Claude Code (Add tests to old billing code) → writes → Generated tests (Wrong framework, real payment service). 하단: For Maria, who has worked here for years, it never happens.

### 198. `l88-03`

그럴듯해 보이는 해결책
파일을 복사해도 해결되지 않는다
복사
어긋남
Maria
자기만의 규칙
[이미지: 책상에서 일하는 개발자 일러스트]
Leo
자기 홈 폴더에 둔 사본
다음 신규 개발자
같은 문제가 또
첫 단계: 규칙이 어디에 있는지 알아냅니다.

> 노트: 원문 제목: Copying the file does not fix it (A FIX THAT LOOKS REASONABLE). Maria (Her own conventions) → copy → Leo (Copy in his home folder) - - drift - -> Next new developer (Same problem again). 하단: First step: find out where the conventions live.

### 199. `l88-04`

memory 커맨드
규칙이 사용자 파일에 들어 있다
로드
로드
풀 리퀘스트
Leo: /memory
프로젝트 파일만
Maria: /memory
프로젝트 + 사용자 파일
프로젝트 CLAUDE.md
git으로 공유
사용자 수준 파일
홈 폴더, 본인만
제품 참고: /context로도 무엇이 로드됐는지 볼 수 있습니다.

> 노트: 원문 제목: The conventions sit in a user file (THE MEMORY COMMAND). Leo: /memory (Project file only) → loads → Project CLAUDE.md (Shared through git). Maria: /memory (Project + user file) → loads → User-level file (Home folder, owner only). User-level file → pull request → Project CLAUDE.md. 하단: Product note: /context also shows what is loaded. (/context 관련 설명은 원문 그대로이며 확인하지 않았습니다.)

### 200. `l88-05`

두 번째 수: 곳곳의 테스트 파일
폴더 40개, 사본 40개
•
billing/
•
refunds/
•
chat window/
•
...about 40 folders
폴더마다 CLAUDE.md
사본 40개, 새 폴더마다 하나씩 더
디렉터리 CLAUDE.md는 폴더 하나에만 속합니다.

> 노트: 원문 제목: Forty folders, forty copies (SECOND MOVE: TEST FILES EVERYWHERE). billing/, refunds/, chat window/, ...about 40 folders(폴더 약 40개) → A CLAUDE.md in each (40 copies, one more for every new folder). 하단: A directory CLAUDE.md belongs to one folder.

### 201. `l88-06`

최선의 수
경로별 규칙 하나가 모든 테스트를 덮는다
# Billing module
@standards/money-handling.md
The shared money standard is imported,
not copied into this file.
Other billing notes go here.
팀 규칙은 프로젝트 파일에 둡니다. 여러 폴더에 흩어진 한 파일 유형의 규칙은 경로별 규칙에 둡니다.

> 노트: 원문 제목: One scoped rule covers every test (THE BEST MOVE). 코드(영문 유지) 의미: 결제 모듈의 CLAUDE.md. @standards/money-handling.md로 공통 금액 처리 표준을 가져옴(복사하지 않음). 나머지 결제 메모는 여기에. 캡션: Team conventions go in the project's files; a convention for one file type spread across folders goes in a path-scoped rule.

### 202. `l88-07`

두 번째 결정: 커맨드
이 커맨드는 Maria만 실행할 수 있다
읽음
초안 작성
머지된 PR
노트의 출처
릴리스 노트
Maria 홈 폴더의 커맨드
노트 초안
릴리스마다 하나
[이미지: 노트북 앞에서 회의하는 두 사람 일러스트]
팀원들
각자 요청을 직접 입력

> 노트: 원문 제목: Only Maria can run this command (SECOND DECISION: A COMMAND). Merged PRs (Source of the notes) → reads → Release notes (Command in Maria's home folder) → drafts → Draft notes (One per release). Teammates (Type their own requests) - - → Release notes: 팀원들은 커맨드가 없어 요청을 직접 입력함.

### 203. `l88-08`

두 번째 결정: 스킬
긴 로그 출력이 대화를 채운다
읽음
출력
결제 오류 로그
스킬이 읽음
로그 분석 스킬
무엇이 실패했는지 설명
메인 대화
남은 공간이 거의 없음
개발자
입력 없이 호출

> 노트: 원문 제목: Long log output fills the chat (SECOND DECISION: A SKILL). Billing error logs (Read by the skill) → reads → Log analysis skill (Explains what failed) → prints → Main conversation (Little room left). Developer (Calls it with no input) - - → Log analysis skill.

### 204. `l88-09`

커맨드 고치기
커맨드를 리포지토리에 커밋한다
커밋
clone / pull
Maria
커맨드의 주인
Maria의 홈 폴더
개인 버전, 다른 이름
리포지토리
.claude/commands/ - 모두가 공유
[이미지: 노트북 앞에서 회의하는 두 사람 일러스트]
팀원들
pull 후 같은 커맨드
홈 폴더의 사본은 서로 어긋나고, 버전 관리에도 잡히지 않습니다.

> 노트: 원문 제목: Commit the command to the repo (FIXING THE COMMAND). Maria (Owns the command) → commit → Repository (.claude/commands/ - shared by everyone) → clone / pull → Teammates (Same command after a pull). Maria - - → Maria's home folder (Own version, other name). 하단: Copies in home folders drift apart, and version control never sees them.

### 205. `l88-10`

스킬 고치기
노이즈가 많은 스킬은 포크에서 실행한다
---
description: Explain errors in the billing logs
context: fork
---
Read the logs and explain what failed.
짧게 출력하라고 해도 소용없습니다. 읽는 내용이 여전히 메인 대화를 채웁니다. 포크는 짧은 결과만 돌려줍니다.

> 노트: 원문 제목: Run the noisy skill in a fork (FIXING THE SKILL). 코드(영문 유지) 의미: description 결제 로그의 오류를 설명 / context: fork로 포크된 서브에이전트에서 실행 / 본문: 로그를 읽고 무엇이 실패했는지 설명할 것. 캡션: Asking for short output does not help: the reading still fills the main conversation. A fork returns only a short result.

### 206. `l88-11`

스킬 고치기
입력은 힌트로 알리고, 도구는 제한한다
---
description: Explain errors in the billing logs
context: fork
argument-hint: "[date range of the logs]"
allowed-tools: Read, Grep
시험 정답: allowed-tools는 스킬을 읽기 전용 도구로 제한합니다. 현재 제품: 그 도구들을 미리 승인할 뿐 아무것도 제한하지 않습니다.

> 노트: 원문 제목: Hint the input, limit the tools (FIXING THE SKILL). 코드(영문 유지) 의미: argument-hint "[로그의 날짜 범위]"로 필요한 입력을 알림 / allowed-tools: Read, Grep. 캡션: Exam answer: allowed-tools restricts the skill to read-only tools. Current product: it pre-approves them and restricts nothing. (제품 동작 설명은 원문 그대로이며 확인하지 않았습니다.)

### 207. `l88-12`

기억할 점
공유는 리포지토리에, 노이즈가 많은 것은 포크로
/memory 확인
사용자 수준 파일에만 있나?
프로젝트 CLAUDE.md
팀 규칙을 여기로 옮김
경로별 규칙
폴더마다 파일 하나가 아니라 paths glob
import
공유 표준마다 파일 하나
팀 커맨드
커밋하고, 개인 사본은 다른 이름으로
노이즈가 많은 스킬
context fork와 argument hint
공유 워크플로는 리포지토리에 두고, 노이즈가 많은 스킬은 포크에서 실행합니다.

> 노트: 원문 제목: Repo for shared, fork for noisy (POINTS TO REMEMBER). Check /memory: Is it only in a user-level file? / Project CLAUDE.md: Move the team's conventions here / Scoped rule: A paths glob, not one file per folder / Imports: One file per shared standard / Team command: Commit it; personal copy, other name / Noisy skill: Context fork and an argument hint. 하단: A shared workflow lives in the repository, and a noisy skill runs in a fork.

### 208. `l88-13`

CI 시나리오에서도 같은 규칙
파이프라인은 리포지토리만 로드한다
로드됨
없음
리포지토리
CLAUDE.md, 규칙, 커맨드, 스킬
파이프라인 머신
claude -p, 키보드 앞에 아무도 없음
내 홈 폴더
개인 습관만

> 노트: 원문 제목: Pipelines load only the repository (THE SAME RULE IN THE CI SCENARIO). Repository (CLAUDE.md, rules, commands, skills) → loaded → Pipeline machine (claude -p, nobody at the keyboard) ← absent - - Your home folder (Personal habits only).

## 89강. Claude Code 사례: 계획하고 반복하기 (`l89`)

89강
Claude Code 사례: 계획하고 반복하기
슬라이드 11장

> 노트: 원문: LECTURE 89 · Claude Code Case: Plan and Iterate · 11 slides

### 210. `l89-01`

코드 생성 시나리오, 2부
내려야 할 결정이 두 가지 더 있다
작업 모드 고르기
먼저 계획할지, 바로 변경할지.
반복되는 실수 고치기
Claude Code가 계속 틀리는 변경.
어떤 오답은 빨라 보이고 어떤 오답은 신중해 보입니다. 둘 다 며칠을 잃게 할 수 있습니다.

> 노트: 원문 제목: Two more decisions to make (CODE GENERATION SCENARIO, PART 2). Choose a working mode: Plan first, or make the change directly. / Fix a repeated mistake: A change Claude Code keeps getting wrong. 하단: Some wrong answers sound fast, others sound careful - both can cost days.

### 211. `l89-02`

첫 번째 증상
과제 둘, 크기는 서로 다르다
[이미지: 책상에서 일하는 개발자 일러스트]
개발자
오전 하나에 과제 둘
이전
옛 결제 라이브러리, 파일 약 45개
버그 리포트
할인 값이 없으면 함수 하나가 죽음

> 노트: 원문 제목: Two tasks, two different sizes (THE FIRST SYMPTOM). Developer (Two tasks, one morning) → Migration (Old payment library in about 45 files) / Bug report (No discount value crashes one function).

### 212. `l89-03`

그럴듯한 첫 대응 두 가지
일괄 습관은 과제 하나에서 실패한다
모두 계획하기
버그에서 실패합니다. 계획은 스택 트레이스를 되풀이할 뿐이고, 한 줄 수정은 괜히 기다립니다.
둘 다 바로 시작하기
이전에서 실패합니다. 숨은 연결이 늦게 드러나고, 반쯤 끝난 수정을 되돌려야 합니다.

> 노트: 원문 제목: Blanket habits fail one task (TWO REASONABLE FIRST FIXES). Plan everything: Fails on the bug: the plan repeats the stack trace, and a one-line fix waits for nothing. / Start both directly: Fails on the migration: hidden links show up late and half-finished edits must be removed.

### 213. `l89-04`

이전 작업의 최선의 수
이전은 계획하고, 그다음 실행한다
개발자
Claude Code
Explore
이전: 플랜 모드
파일 45개 검색
요약만
순서: 공통, 결제, 테스트
승인, 직접 실행
플랜 모드는 파일을 하나도 수정하지 않고 탐색하고 변경을 제안합니다.

> 노트: 원문 제목: Plan the migration, then execute (THE BEST MOVE FOR THE MIGRATION). Developer → Claude Code: migration: plan mode / Claude Code → Explore subagent: search 45 files / Explore → Claude Code: summary only / Claude Code → Developer: order: shared, billing, tests / Developer → Claude Code: approve, run directly. 캡션: Plan mode explores and proposes changes without editing any file.

### 214. `l89-05`

규칙
과제의 크기가 모드를 고른다
범위가 넓거나 접근법이 여럿
먼저 계획합니다.
작고 명확함
null 검사처럼 파일, 줄, 원인을 알면 바로 고칩니다.
모드를 고르기 전에 과제를 읽으세요.

> 노트: 원문 제목: Task size chooses the mode (THE RULE). Wide, or several approaches: Plan first. / Small and clear: Make it directly, like the null check: file, line and cause known. 하단: Read the task before you choose a mode.

### 215. `l89-06`

두 번째 결정
대기 중인 환불이 이제 지급된 것처럼 보인다
def to_ledger(record):
    # the old library returned None while a refund is pending
    settled = record.settled_date or date.today()
    return {
        "status": record.status,
        "settled_date": settled,
    }
예시용 버그: 빈 날짜가 채워져서 대기 중인 환불이 지급된 것처럼 보입니다. 대략 50건 중 1건입니다.

> 노트: 원문 제목: Pending refunds now look paid (SECOND DECISION). 코드(영문 유지) 의미: 옛 라이브러리는 환불이 대기 중일 때 None을 돌려줬음. 새 코드는 settled_date가 없으면 오늘 날짜로 채우므로, 대기 중 환불에 정산일이 생겨 지급된 것처럼 보임. 캡션: An illustrative bug: the empty date is filled in, so pending refunds look paid - about one record in fifty.

### 216. `l89-07`

실패하는 두 가지 답
말을 늘려도 고쳐지지 않는다
더 긴 설명
"올바르게"는 여전히 오늘 날짜, 기본 날짜, 레코드 건너뛰기 중 무엇이든 될 수 있습니다.
"아직 틀렸어, 고쳐 줘"
Claude Code는 어떤 사례가 실패했는지 볼 수 없어서 맞는 코드를 바꿀 수도 있습니다.

> 노트: 원문 제목: More words do not fix it (TWO REPLIES THAT FAIL). A longer description: "Correctly" can still mean today's date, a default date, or skipping the record. / "Still wrong, fix it": Claude Code cannot see which case failed, so it may change correct code.

### 217. `l89-08`

최선의 수
정확한 사례 하나는 의심의 여지를 남기지 않는다
# input: a pending refund record
case_input = {
    "status": "pending",
    "settled_date": None,
}
# expected output: the same record, unchanged
case_expected = {
    "status": "pending",
    "settled_date": None,
}
이런 예시는 두 가지로 읽힐 수 없습니다.

> 노트: 원문 제목: One exact case leaves no doubt (THE BEST MOVE). 코드(영문 유지) 의미: 입력은 대기 중(pending)이고 settled_date가 None인 환불 레코드. 기대 출력은 같은 레코드 그대로(바뀌지 않음). 캡션: An example like this cannot be read two ways.

### 218. `l89-09`

테스트 실패를 보며 반복하기
테스트가 언제 끝났는지 알려 준다
개발자
Claude Code
Bash
테스트를 먼저 작성
테스트 실행
입력, 기대값, 실제값
수정하고 다시 실행
실패하는 테스트가 줄어듦
테스트는 기대 동작과 엣지 케이스를 다룹니다: null 날짜, 0원 금액, 알 수 없는 상태 코드.

> 노트: 원문 제목: Tests tell us when we are done (ITERATE ON TEST FAILURES). Developer → Claude Code: write the tests first / Claude Code → Bash: run the tests / Bash → Claude Code: input, expected, actual / Claude Code → Bash: fix and rerun / Bash → Claude Code: fewer tests fail. 캡션: Tests cover expected behavior and edge cases: a null date, a zero amount, an unknown status code.

### 219. `l89-10`

기억할 요점
크기가 모드를 고르고, 테스트가 고친다
과제 크기에 맞는 모드
파일 45개: Explore와 함께 플랜 모드. 한 줄 수정: 직접 실행.
반복되는 실수
실패하는 사례와 기대 출력을 주고, 테스트 실패를 보며 반복합니다.
정확한 입력과 기대 출력을 보여 주고, 모든 사례를 테스트로 확인하세요.

> 노트: 원문 제목: Size picks the mode, tests fix it (MAIN POINTS TO REMEMBER). Mode from task size: 45 files: plan mode with Explore. One-line fix: direct execution. / Repeated mistake: Give a failing case with its expected output, then iterate on test failures. 하단: Show the exact input and expected output, and check every case with tests.

### 220. `l89-11`

추출 시나리오에서도 같은 규칙
같은 규칙이 추출도 고친다
특이한 문서
필드 하나가 비어 있음
더 강한 표현
같은 빈틈이 그대로 남음
예시와 테스트
정확한 사례가 빈틈을 보여 줌
반복되는 실수는 더 긴 설명이 아니라 정확한 예시와 실패하는 테스트로 고칩니다.

> 노트: 원문 제목: The same rule fixes extraction (THE SAME RULE IN THE EXTRACTION SCENARIO). Unusual documents: One field stays empty → Stronger wording: Leaves the same gaps → Examples and tests: Exact cases show the gap. 하단: Fix repeated mistakes with exact examples and failing tests, not longer descriptions.

## 90강. 개발 에이전트 사례: 코드 탐색 (`l90`)

90강
개발 에이전트 사례: 코드 탐색
슬라이드 13장

> 노트: 원문: LECTURE 90 · Dev Agent Case: Exploring Code · 13 slides

### 222. `l90-01`

개발자 생산성 사례
에이전트를 위한 두 가지 결정
큰 모듈 파악하기
컨텍스트가 바닥나지 않게.
많은 파일 바꾸기
아무것도 깨뜨리지 않게.
두 실패 모두 결과가 틀리게 돌아오기 전까지는 진전처럼 보입니다.

> 노트: 원문 제목: Two decisions for the agent (DEVELOPER PRODUCTIVITY CASE). Learn a big module: Without running out of context. / Change many files: Without breaking them. 하단: Both failures look like progress until the results come back wrong.

### 223. `l90-02`

에이전트
에이전트가 혼자 코드를 다룬다
과제
호출
[이미지: 책상에서 일하는 개발자 일러스트]
개발자
과제를 줌
Agent SDK 에이전트
프로그램, 키보드 앞에 사람 없음
내장 도구
Read, Write, Edit, Bash, Grep, Glob
첫 큰 작업: 옛 결제 모듈.

> 노트: 원문 제목: An agent works on code alone (THE AGENT). Developer (Gives a task) → task → Agent SDK agent (Program, no human at the keys) → calls → Built-in tools (Read, Write, Edit, Bash, Grep, Glob). 하단: Its first big job: the old billing module.

### 224. `l90-03`

첫 번째 결정
전부 읽으면 컨텍스트가 찬다
개발자
에이전트
결제 모듈
청구서 합계는 어떻게 계산돼?
파일 1, 2, 3 ... 읽기
파일 300개 중 ~80개: 컨텍스트 가득
보통은 서비스 레이어
실제 코드의 클래스가 하나도 없는 일반론적인 답이고, 초기 조사 결과도 사라졌습니다.

> 노트: 원문 제목: Reading it all fills the context (FIRST DECISION). Developer → Agent: How are invoice totals calculated? / Agent → Billing module: read file 1, 2, 3 ... / Billing module → Agent: ~80 of 300 files: context full / Agent → Developer: Usually a service layer. 캡션: A generic answer with no class from the real code - and the early finding is lost.

### 225. `l90-04`

첫 번째 결정
뻔한 두 해결책 모두 실패한다
더 큰 컨텍스트 창
텍스트가 늘면 중간만 길어지고, 중간의 사실은 놓칩니다.
다시, 구체적으로 묻기
초기 조사 결과는 같은 탐색 출력 아래 묻힌 채로 남습니다.
필요한 것: 컨텍스트가 차지 않게 하고, 조사 결과를 잃지 않게 하는 것.

> 노트: 원문 제목: Both obvious fixes fail (FIRST DECISION). A larger context window: More text only makes the middle longer, and middle facts get missed. / Ask again, be specific: Early findings stay buried under the same discovery output. 하단: Need: keep the context from filling, and keep the findings from getting lost.

### 226. `l90-05`

첫 번째 결정: 최선의 수
먼저 검색하고, 조사 결과를 적어 둔다
진입점
import
조사 결과
단계 끝
Grep
진입점을 찾음
Read
import를 따라감, 한 번에 파일 하나
결제 모듈
export 목록, 하나씩 검색
단계 요약
다음 단계는 여기서 시작
스크래치패드 파일
클래스, 파일, 사실

> 노트: 원문 제목: Search first, write findings down (FIRST DECISION: THE BEST MOVE). Grep (Finds the entry point) → entry point → Read (Follows imports, one file) → imports → Payment module (List exports, search each) → findings → Scratchpad file (Classes, files, facts) → end of phase → Phase summary (Next phase starts here).

### 227. `l90-06`

첫 번째 결정: 최선의 수
서브에이전트가 노이즈를 떠안는다
에이전트
Explore
코드베이스
스크래치패드
결제 모듈 탐색
여러 파일 검색하고 읽기
짧은 요약
메모 갱신 후 /compact
또는 요약을 들고 새 세션
규칙: 읽기 전에 검색하고, 조사 결과는 디스크에 두고, 노이즈는 서브에이전트가 떠안게 합니다.

> 노트: 원문 제목: A subagent carries the noise (FIRST DECISION: THE BEST MOVE). Agent → Explore subagent: explore the billing module / Explore → Codebase: search and read many files / Explore → Agent: short summary / Agent → Scratchpad: update notes, then /compact / or a fresh session with the summary. 캡션: Rule: search before you read, keep findings on disk, let a subagent carry the noise.

### 228. `l90-07`

두 번째 결정
모든 핸들러가 요청 ID를 로그로 남긴다
def handle_payment_failed(event):
    logger.info("request_id=%s", event.request_id)
    order = load_order(event.order_id)
    if order is None:
        return
    order.mark_payment_failed()
    notify_customer(order)
    save(order)
핸들러 약 40개가 여러 폴더에 흩어져 있습니다. 변경은 빠짐없어야 하고 증명돼야 합니다.

> 노트: 원문 제목: Every handler logs a request ID (SECOND DECISION). 코드(영문 유지) 의미: 결제 실패 핸들러가 첫 줄에서 request_id를 로그로 남기고, 주문을 불러와 없으면 끝냄. 있으면 결제 실패로 표시하고 고객에게 알리고 저장함. 캡션: About forty handlers in many folders; the change must be complete and proven.

### 229. `l90-08`

두 번째 결정
통째로 다시 쓰기도, 건너뛰기도 실패한다
Write로 다시 쓰기
Write는 파일 전체를 바꿉니다. 옮겨 적지 않은 것은 사라집니다.
거부된 파일 건너뛰기
나머지를 완료로 보고하면 어떤 핸들러가 빠졌는지 가려집니다.
필요한 것: 아무것도 깨뜨리지 않는 빠짐없는 변경, 그리고 효과가 있었다는 증거.

> 노트: 원문 제목: Rewriting and skipping both fail (SECOND DECISION). Rewrite with Write: Write replaces the whole file; anything not copied is lost. / Skip refused files: Reporting the rest as done hides which handlers are missing. 하단: Need: a complete change that breaks nothing, and proof that it worked.

### 230. `l90-09`

두 번째 결정: 최선의 수
Glob이 찾고, Edit이 바꾼다
파일 ~40개
시험
그 밖에
Glob
*handler*, 모든 폴더
Edit
앵커: 첫 줄
파일 ~37개 변경
앵커가 유일했음
현재 제품
더 긴 앵커 또는 replace-all
Edit이 거부
파일 3개, 같은 줄이 두 번
Read 후 Write
시험의 정답: 파일 전체

> 노트: 원문 제목: Glob finds, Edit changes (SECOND DECISION: THE BEST MOVE). Glob (*handler*, every folder) → ~40 files → Edit (Anchor: first line) → ~37 files changed (Anchor was unique). Edit → Edit refuses (3 files, same line twice) → exam → Read, then Write (Exam's answer: whole file). Edit refuses - - also - -> Current product (Longer anchor or replace-all). 현재 제품의 대안(더 긴 앵커, replace-all)은 원문 그대로이며 확인하지 않았습니다.

### 231. `l90-10`

두 번째 결정: 최선의 수
끝났는지는 테스트가 정한다
에이전트
핸들러 파일
Bash: 테스트
테스트 실행
실패: 입력, 기대값, 실제값
Edit: 핸들러 수정
테스트 다시 실행
규칙: Glob이 찾고, Edit이 바꾸고, Read와 Write는 앵커가 유일하지 않을 때만 씁니다.

> 노트: 원문 제목: Tests decide when you are done (SECOND DECISION: THE BEST MOVE). Agent → Bash: tests: run the tests / Bash → Agent: failure: input, expected, actual / Agent → Handler files: Edit: fix the handler / Agent → Bash: run the tests again. 캡션: Rule: Glob finds, Edit changes, Read and Write only when the anchor is not unique.

### 232. `l90-11`

하나 더
접근법마다 한 번씩 포크한다
포크
포크
공유 분석
세션 하나, 분석 하나
핸들러마다 로그 한 줄
포크 A
공유 함수 하나
포크 B: 모든 핸들러가 호출

> 노트: 원문 제목: Fork once per approach (ONE MORE POINT). Shared analysis (One session, one analysis) → fork → Log line in each handler (Fork A) / → fork → One shared function (Fork B: every handler calls it).

### 233. `l90-12`

핵심 정리
노이즈는 밖에 두고, 모든 변경을 확인한다
더 큰 창은 아님
어긋남은 다른 해결책이 필요
검색 후 읽기
Grep, Read, export마다
디스크의 메모
스크래치패드, 단계 요약
노이즈는 밖으로
Explore, compact, 새 세션
Glob + Edit
Read와 Write는 대안
Bash로 테스트 실행
끝났는지는 테스트가 정함

> 노트: 원문 제목: Keep noise out, check every change (MAIN POINTS). No bigger window: Drift needs another fix / Search, then read: Grep, Read, each export / Notes on disk: Scratchpad, phase summaries / Noise out: Explore, compact, fresh session / Glob + Edit: Read and Write as backup / Bash runs tests: Tests decide when done.

### 234. `l90-13`

다른 곳에서도 같은 규칙
출처에도 같은 규칙이 통한다
검색 에이전트
전체 페이지 여러 개
종합 에이전트
제한된 컨텍스트 예산
노이즈는 밖에 두고, 조사 결과는 적어 두고, 끝났다고 하기 전에 모든 변경을 확인하세요.

> 노트: 원문 제목: Same rule for sources (THE SAME RULE ELSEWHERE). Search agents (Many full pages) → Synthesis agent (Limited context budget). 하단: Keep noise out, write findings down, check every change before you call it done.

## 91강. 개발 에이전트 사례: MCP 서버 (`l91`)

91강
개발 에이전트 사례: MCP 서버
슬라이드 13장

> 노트: 원문: LECTURE 91 · Dev Agent Case: MCP Servers · 13 slides

### 236. `l91-01`

MCP 서버
MCP 결정 두 가지, 위험 두 가지
더 나은 도구가 무시된다
서버가 제공하는데도 에이전트가 다른 것을 고릅니다.
통합을 공유한다
팀 전체가 같은 설정을 받습니다.
쓰이지 않는 서버는 도움이 안 되고, 잘못 공유한 서버는 비밀 정보를 새게 할 수 있습니다.

> 노트: 원문 제목: Two MCP decisions, two risks (MCP SERVERS). A better tool is ignored: The server offers it, but the agent picks something else. / An integration is shared: The whole team gets the same setup. 하단: An unused server gives no help. A badly shared one can leak a secret.

### 237. `l91-02`

첫 번째 증상
에이전트가 더 나은 도구를 건너뛴다
개발자 에이전트
함수의 호출부를 찾음
코드 검색 도구
설명: "Searches code."
Grep
텍스트만 일치시킴
불완전한 목록
이름이 바뀐 호출을 놓침

> 노트: 원문 제목: The agent skips the better tool (FIRST SYMPTOM). Developer agent (Finds callers of a function) → Code-search tool (Description: "Searches code.") / → Grep (Matches text only) → Incomplete list (Misses renamed calls). 코드 검색 도구의 설명이 너무 짧아(Searches code. = 코드를 검색함) 에이전트가 Grep을 고릅니다.

### 238. `l91-03`

그럴듯해 보이는 해결책
Grep을 없애면 다른 작업이 깨진다
Grep 제거
그러면 에이전트에게 다른 선택지가 없습니다. 이 방법은 실패합니다.
로그의 오류 문구 같은 평범한 텍스트에는 Grep이 여전히 맞습니다
Grep을 없애면 그 작업이 깨집니다
진짜 원인을 가립니다

> 노트: 원문 제목: Removing Grep breaks other work (A FIX THAT LOOKS REASONABLE). Remove Grep: Then the agent has no other choice. This fails. / Grep is still right for plain text, like an error from the logs / Removing it breaks that work / It hides the real cause.

### 239. `l91-04`

최선의 수
더 나은 설명이 이긴다
{
  "name": "find_callers",
  "description": (
    "Finds every place that calls a function or class, "
    "including calls under another name. "
    "Skips comments. "
    "Returns each file, line and calling function. "
    "Use it to find who calls a name; "
    "use Grep for plain text."
  ),
}
도구를 설명하는 한 가지 방법: 무엇을 할 수 있는지, 무엇을 돌려주는지, 언제 쓰는지.

> 노트: 원문 제목: A better description wins (THE BEST MOVE). 설명(영문 유지) 의미: 함수나 클래스를 호출하는 모든 곳을 찾음(다른 이름으로 된 호출 포함). 주석은 건너뜀. 파일, 줄, 호출하는 함수를 돌려줌. 누가 어떤 이름을 호출하는지 찾을 때 쓰고, 평범한 텍스트에는 Grep을 쓸 것. 캡션: One way to describe a tool: what it can do, what it returns, when to use it.

### 240. `l91-05`

두 번째 수
카탈로그가 탐색을 덜어 준다
개발자 에이전트
새 과제를 시작
둘러보기
호출 약 12번: 폴더, 파일, 이름
모듈 카탈로그
리소스: 소유자, 진입점
결제 모듈
진입점으로 곧장

> 노트: 원문 제목: A catalog saves the exploring (THE SECOND MOVE). Developer agent (Starts a new task) - - → Looking around (About 12 calls: folders, files, names). Developer agent → Module catalog (A resource: owner, entry point) → Billing module (Straight to its entry point).

### 241. `l91-06`

규칙
증상 둘, 해결책 둘
더 나은 도구가 무시된다
그 도구의 설명을 개선합니다. 내장 도구는 그대로 둡니다.
에이전트가 탐색만 한다
카탈로그를 리소스로 제공합니다.

> 노트: 원문 제목: Two symptoms, two fixes (THE RULE). A better tool is ignored: Improve that tool's description. Keep the built-in tools. / The agent only explores: Offer a catalog as a resource.

### 242. `l91-07`

두 번째 결정
모두가 Jira가 필요하다, 비밀 정보 없이
[이미지: 노트북 앞에서 회의하는 두 사람 일러스트]
팀
에이전트와 모든 Claude Code
커스텀 Jira 서버
개발자 한 명, 절반만 완성
노트북 설정
설정에 토큰을 붙여 넣음
Jira
이슈 트래커

> 노트: 원문 제목: Everyone needs Jira, no secret (SECOND DECISION). The team (Agent and every Claude Code) → Custom Jira server (One developer, half done) - - → Jira (Issue tracker). The team → Laptop setup (Token pasted in settings) → Jira.

### 243. `l91-08`

그럴듯해 보이는 두 가지 해결책
빠른 해결책 둘 다 실패한다
커스텀 서버 완성하기
커뮤니티 Jira 서버가 이미 있고, 다른 사람들이 최신으로 유지합니다.
설정을 커밋하기
토큰이 기록에 들어갑니다. 리포지토리를 읽는 사람은 누구나 토큰을 읽습니다.
커스텀 서버는 ShopAssist의 스토어 규칙 같은 팀 고유의 워크플로에 맞습니다.

> 노트: 원문 제목: Both quick fixes fail (TWO FIXES THAT LOOK REASONABLE). Finish the custom server: A community Jira server exists, and others keep it up to date. / Commit the settings: The token enters the history. Anyone who reads the repository reads it. 하단: A custom server fits the team's own workflows, like ShopAssist's store rules.

### 244. `l91-09`

최선의 수
토큰이 아니라 파일을 커밋한다
{
  "mcpServers": {
    "jira": {
      "command": "npx",
      "args": ["-y", "community-jira-server"],
      "env": {
        "JIRA_TOKEN": "${JIRA_API_TOKEN}"
      }
    }
  }
}
공유되는 .mcp.json: 파일에는 변수 이름만 들어 있습니다. 개발자는 각자 한 번만 값을 설정합니다.

> 노트: 원문 제목: Commit the file, not the token (THE BEST MOVE). 코드(영문 유지) 의미: .mcp.json에 jira 서버를 npx로 community-jira-server를 실행하도록 등록. JIRA_TOKEN에는 실제 토큰 대신 ${JIRA_API_TOKEN} 환경 변수 참조만 넣음. 패키지 이름 community-jira-server는 원문의 예시입니다. 캡션: A shared .mcp.json: the file holds only the variable's name. Each developer sets it once.

### 245. `l91-10`

누가 파일을 읽나
파일 하나가 사람과 에이전트 모두에게 쓰인다
프로젝트 파일
.mcp.json, 커밋됨
Claude Code
개발자 각자의 것
에이전트
프로젝트 설정을 로드
MCP 서버
Jira 도구 + 코드 검색 도구

> 노트: 원문 제목: One file serves people and agent (WHO READS THE FILE). Project file (.mcp.json, committed) → Claude Code (Each developer's) / The agent (Loads the project's settings) → MCP servers (Jira tools + code-search tool).

### 246. `l91-11`

서버를 어디에 두나
범위에 맞게 공유하고, 비밀 정보는 빼 둔다
프로젝트 범위
.mcp.json, 커밋, 모두가 공유
개인 범위
~/.claude.json, 나에게만 적용
로컬 범위
claude mcp add의 세 번째 선택지: 나, 한 프로젝트
표준 시스템에는 커뮤니티 서버를 쓰고, 프로젝트 파일로 공유하고, 비밀 정보는 변수 이름으로만 둡니다.

> 노트: 원문 제목: Share by scope, keep secrets out (WHERE A SERVER GOES). Project scope: .mcp.json, committed, shared by all / Personal scope: ~/.claude.json, reaches only you / Local scope: Third option of claude mcp add: you, one project. 하단: Community servers for standard systems, shared in the project file, secrets as variable names. 범위별 저장 위치 설명은 원문 그대로이며 확인하지 않았습니다.

### 247. `l91-12`

기억할 점
설명하고, 공유하고, 비밀 정보는 숨긴다
설명
개선하고, 도구는 유지
카탈로그
리소스가 호출을 줄임
서버
커뮤니티 또는 커스텀
비밀 정보
변수 이름만

> 노트: 원문 제목: Describe, share, hide secrets (POINTS TO REMEMBER). Description: Improve it, keep the tools / Catalog: A resource saves calls / Servers: Community or custom / Secrets: Variable names only.

### 248. `l91-13`

고객 지원 시나리오
설명부터 개선한다
ShopAssist
주문에 관한 질문
get_customer
주문 질문에 잘못 선택됨
lookup_order_by_id
더 명확한 설명

> 노트: 원문 제목: Improve the description first (THE SUPPORT SCENARIO). ShopAssist (Question about an order) - - → get_customer (Picked for an order question). ShopAssist → lookup_order_by_id (Clearer description).
