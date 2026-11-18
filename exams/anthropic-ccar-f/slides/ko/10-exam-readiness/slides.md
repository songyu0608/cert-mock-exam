# CCAR-F 섹션 10. 시험 준비 (전 도메인) (한국어판)

원본 아티팩트: https://claude.ai/artifact/JkHnpgveSYsBKsuqkUTSAR

슬라이드 HTML(`slides/`)에서 화면 글자와 발표자 노트(`<aside>`, 영어 원문)를 뽑은 텍스트다. 자동 생성 파일이므로 고칠 때는 슬라이드 HTML을 기준으로 한다.

## 표지 (`cover`)

슬라이드
Claude Certified Architect – Foundations:
전체 강좌
섹션 10. 시험 준비 (전 도메인)
99~101강, 슬라이드 41장

> 노트: 원문: Claude Certified Architect Foundations: Complete Course / Section 10. Exam Readiness (All Domains) / Lectures 99-101, 41 slides.

## 99강. 핵심 구분: 에이전트, 도구, 컨텍스트 (`l99`)

99강
핵심 구분: 에이전트, 도구, 컨텍스트
슬라이드 15장

> 노트: 원문: LECTURE 99 · Key Distinctions: Agents, Tools and Context · 15 slides

### 3. `l99-01`

돌아보기
시험의 눈으로 돌아본다
ShopAssist
구축 완료
리뷰 봇
이것도 완료
시험의 눈
전부 돌아보기
구분
에이전트, 도구, 컨텍스트
오답 선택지가 엉뚱한 경우는 드뭅니다. 각각 실제 기법이지만 레이어가 틀렸습니다.

> 노트: 원문 제목: We look back with the exam's eyes (LOOKING BACK). ShopAssist (Built and complete) → Review bot (Also complete) → The exam's eyes (Look back at all of it) → Distinctions (Agents, tools, context). 하단: Wrong options are rarely silly: each is a real technique at the wrong layer.

### 4. `l99-02`

세 그룹
신중해 보이는 쪽이 아니라 고치는 쪽을 고른다
루프
그리고 그 규칙
도구
설명과 오류
에스컬레이션
컨텍스트와 출처
각 쌍에서 한 선택지는 신중해 보이고, 다른 선택지는 원인을 고칩니다.

> 노트: 원문 제목: Pick the fix, not the careful one (THREE GROUPS). The loop (And its rules) / The tools (Descriptions and errors) / Escalation (Context and sources). 하단: In each pair, one option looks careful and the other fixes the cause.

### 5. `l99-03`

첫 번째 그룹: 루프
stop_reason이 루프를 끝낸다
애플리케이션
Claude
도구
request
stop_reason: tool_use
run the tool
tool_result
stop_reason: end_turn
라운드 한도는 안전망일 뿐입니다. 한도에 걸렸다면 뭔가 고장 난 것이니 케이스를 사람에게 넘기세요.

> 노트: 원문 제목: The stop reason ends the loop (FIRST GROUP - THE LOOP). Application → Claude: request / Claude → Application: stop_reason: tool_use / Application → Tool: run the tool / Application → Claude: tool_result / Claude → Application: stop_reason: end_turn. 캡션: A round cap is only a safety net: when it fires, something broke - hand the case to a person.

### 6. `l99-04`

두 번째 쌍
반드시 지켜야 할 규칙은 코드에 둔다
프롬프트
Claude를 이끌지만 가끔 실패함
게이트
순서를 고정: 먼저 고객 확인
훅
도구 호출 하나를 실행 전에 잡음
항상 지켜져야 하는 규칙은 코드에 둡니다.

> 노트: 원문 제목: Rules that must hold go into code (THE SECOND PAIR). A prompt (Guides Claude, but fails sometimes) / A gate (Fixes the order: verify the customer first) / A hook (Catches one tool call before it runs). 하단: A rule that must always hold goes into code.

### 7. `l99-05`

훅
훅은 호출 하나를 막을 수 있다
def post_tool_use(result):
    result["date"] = to_iso(result["date"])
    result["status"] = STATUS_NAMES[result["status"]]
    return result
훅은 호출 하나에 작용합니다. 어떤 도구가 있는지 제한해도 도구의 실행 순서는 바뀌지 않습니다.

> 노트: 원문 제목: A hook can block one call (HOOKS). 코드(영문 유지) 의미: 도구 실행 후 훅이 결과의 date를 ISO 형식으로, status 코드를 이름으로 바꿔 돌려줌. 캡션: A hook acts on one call; limiting which tools exist does not change their order.

### 8. `l99-06`

세 번째 쌍
코디네이터가 모든 것을 라우팅한다
검색 에이전트
코디네이터
종합 에이전트
findings
findings
report
모든 단계를 보고, 오류를 처리하고, 무엇이 어디로 갈지 제어하는 곳이 한 군데 있습니다.

> 노트: 원문 제목: The coordinator routes everything (THE THIRD PAIR). Search agent → Coordinator: findings / Coordinator → Synthesis agent: findings / Synthesis agent → Coordinator: report. 캡션: One place to see every step, handle errors and control what moves where.

### 9. `l99-07`

서브에이전트
도구는 좁게, 프롬프트는 완전하게
prompt
calls
too many
코디네이터
조사 결과를 모두 전달
종합 에이전트
조사 결과를 합침
verify_fact
좁은 도구: 괜찮음
모든 검색 도구
다른 에이전트의 일을 함

> 노트: 원문 제목: Narrow tools, complete prompts (SUBAGENTS). Coordinator (Passes full findings) → prompt → Synthesis agent (Merges the findings) → calls → verify_fact (Narrow tool: fine) / - - too many → Every search tool (Does another agent's job).

### 10. `l99-08`

두 번째 그룹: 도구
도구 설명부터 고친다
get_order = {
    "name": "get_order_status",
    "description": (
        "Looks up one order by ID and returns its status. "
        "Input: order_id, for example ORD-12345678. "
        "Edge case: an unknown ID returns found=false. "
        "For all orders of a customer, use list_orders."
    ),
}
잘못된 첫 단계: few-shot 예시, 라우팅 레이어, 도구 합치기.

> 노트: 원문 제목: Fix tool descriptions first (SECOND GROUP - THE TOOLS). 설명(영문 유지) 의미: ID로 주문 하나를 조회해 상태를 돌려줌. 입력: order_id, 예: ORD-12345678. 엣지 케이스: 알 수 없는 ID는 found=false를 돌려줌. 고객의 모든 주문은 list_orders를 사용. 캡션: Wrong first steps: few-shot examples, a routing layer or a merged tool.

### 11. `l99-09`

설명만으로 부족할 때
그다음 이름 바꾸기, 나누기, 프롬프트 점검
이름 바꾸기
겹치는 도구
나누기
범용 도구
시스템 프롬프트
키워드 트리거 확인
MCP 도구 개선
더 나은 설명
에이전트가 더 나은 MCP 도구 대신 Grep을 고르나요? 그 도구의 설명을 고치세요. Grep은 그대로 둡니다.

> 노트: 원문 제목: Then rename, split, check prompts (WHEN DESCRIPTIONS ARE NOT ENOUGH). Rename (Overlapping tools) → Split (A general tool) → System prompt (Check keyword triggers) → Improve MCP tool (Better description). 하단: The agent prefers Grep over a better MCP tool? Fix that tool's description. Keep Grep.

### 12. `l99-10`

두 번째 쌍
실패가 빈 결과처럼 보여서는 안 된다
failure_report = {
    "type": "timeout",
    "query": "return policy for jackets",
    "partial_results": ["policy-2025.pdf"],
    "alternatives": ["try the help-center search"],
}
일시적 오류만 재시도하고, 비즈니스 오류에는 안전한 설명을 붙이고, 무엇이 실패했는지 항상 밝히세요.

> 노트: 원문 제목: A failure must never look empty (THE SECOND PAIR). 코드(영문 유지) 의미: 유형 timeout, 질의 "재킷 반품 정책", 부분 결과 policy-2025.pdf, 대안 "헬프센터 검색을 시도". 캡션: Retry only transient errors; give a business error a safe explanation; always say what failed.

### 13. `l99-11`

세 번째 그룹: 에스컬레이션
실제 트리거에서만 에스컬레이션한다
지금 에스컬레이션
사람을 요청함, 정책 예외 요청, 정책 공백, 또는 진전이 불가능함.
에스컬레이션하지 않음
화난 말투, 스스로 보고한 신뢰도 점수, 또는 복잡해 보이기만 하는 케이스.

> 노트: 원문 제목: Escalate on real triggers only (THIRD GROUP - ESCALATION). Escalate now: A request for a person, a policy exception, a policy gap, or no progress possible. / Do not escalate: Anger, a self-reported confidence score, or a case that only looks complex.

### 14. `l99-12`

에스컬레이션
명확한 기준으로 에스컬레이션을 고친다
SYSTEM_PROMPT = """
Several customers match? Ask for another identifier.
Escalate if the customer asks for a person,
or asks for a policy exception.
Example: "Let me talk to a person" → escalate
Example: "This is the third time!" → keep helping
"""
별도의 분류 모델이나 감정 분석은 잘못된 해결책입니다.

> 노트: 원문 제목: Fix escalation with clear criteria (ESCALATION). 프롬프트(영문 유지) 의미: 여러 고객이 일치하면 다른 식별자를 요청. 고객이 사람을 요청하거나 정책 예외를 요청하면 에스컬레이션. 예: "사람과 이야기하게 해 주세요" → 에스컬레이션 / 예: "이번이 세 번째예요!" → 계속 도움. 캡션: A separate classifier model or sentiment analysis is the wrong fix.

### 15. `l99-13`

두 번째 쌍
정확한 사실은 요약 밖에 둔다
case_facts = [
    {
        "issue": "refund",
        "order": "ORD-12345678",
        "amount": "74.50 USD",
        "promise": "call before Friday",
    },
]
도구 결과는 중요한 필드만 남기고, 긴 입력에서는 핵심 조사 결과를 맨 앞에 두세요.

> 노트: 원문 제목: Exact facts live outside summaries (THE SECOND PAIR). 코드(영문 유지) 의미: 케이스 정보 — 문제 refund, 주문 ORD-12345678, 금액 74.50 USD, 약속 "금요일 전에 전화". 캡션: Trim tool results to the fields that matter; put key findings at the start of a long input.

### 16. `l99-14`

세 번째 쌍
모든 주장을 출처와 함께 둔다
claims = [
    {"claim": "Return window: 30 days",
     "source": "return-policy.pdf", "date": "2025-03"},
    {"claim": "Return window: 14 days",
     "source": "help-page", "date": "2026-09"},
]
두 값 모두 각자의 출처와 날짜와 함께 남습니다. 차이를 어떻게 다룰지는 코디네이터가 정합니다.

> 노트: 원문 제목: Keep every claim with its source (THE THIRD PAIR). 코드(영문 유지) 의미: 주장 "반품 기간 30일"(출처 return-policy.pdf, 2025-03)과 "반품 기간 14일"(출처 help-page, 2026-09). 캡션: Both values stay, each with its source and date - the coordinator decides how to handle the difference.

### 17. `l99-15`

기억할 것
실패한 레이어를 고친다
두 가지 질문
어느 레이어가 실패했나? 이 선택지가 그 레이어를 고치나?
stop_reason이 루프를 끝내고, 한도는 버그만 잡음
프롬프트는 이끌고, 게이트와 훅은 강제함
서브에이전트의 모든 메시지는 코디네이터를 거침
잘못된 도구 선택은 설명부터 고침
실패는 절대 빈 결과처럼 보이지 않음
실제 트리거에서만 에스컬레이션, 사실과 출처는 정확히

> 노트: 원문 제목: Fix the layer that failed (WHAT TO REMEMBER). Two questions: Which layer failed? Does this option fix that layer? / The stop reason ends the loop; a cap only catches bugs / Prompts guide; gates and hooks enforce / Every subagent message goes through the coordinator / Wrong tool choices start with the descriptions / A failure never looks like an empty result / Real triggers escalate; facts and sources stay exact.

## 100강. 핵심 구분: Claude Code (`l100`)

100강
핵심 구분: Claude Code
슬라이드 13장

> 노트: 원문: LECTURE 100 · Key Distinctions: Claude Code · 13 slides

### 19. `l100-01`

현재 위치
오답 선택지는 실제 파일을 쓴다
설정
팀을 위한 Claude Code
CI로 이동
파이프라인 안으로
제품 리뷰
시험의 눈으로 봄
이번 강의
도구를 같은 눈으로 봄
오답 선택지는 실제 파일과 플래그를 이름으로 대지만, 엉뚱한 자리에 둡니다.

> 노트: 원문 제목: Wrong options use real files (WHERE WE ARE). Set up (Claude Code for the team) → Moved to CI (Into the pipeline) → Product review (Seen with the exam's eyes) → This lesson (Same look at the tools). 하단: The wrong options name real files and flags - but put them in the wrong place.

### 20. `l100-02`

핵심 아이디어
매번 두 가지를 묻는다
설정이라면
누가 필요로 하나? 언제 로드되나?
작업이라면
얼마나 큰가? 어떤 컨텍스트가 필요한가? 누가 지켜보나?
두 그룹: 먼저 구성, 그다음 워크플로.

> 노트: 원문 제목: Ask two questions every time (THE KEY IDEA). For a setting: Who needs it? When does it load? / For a task: How big is it? What context does it need? Who is watching? 하단: Two groups: configuration first, then workflows.

### 21. `l100-03`

구성 1
홈 파일은 나에게만 닿는다
나만
홈 CLAUDE.md
버전 관리로 공유되지 않음
나
나만 받음
모두
프로젝트 CLAUDE.md
리포지토리 안에 있음
[이미지: 책상에서 일하는 개발자 일러스트]
새 팀원
클론하거나 pull함

> 노트: 원문 제목: A home file reaches only you (CONFIGURATION 1). Home CLAUDE.md (Never shared by version control) → only you → You (Only you get it). / Project CLAUDE.md (Lives in the repository) → everyone → New teammate (Clones or pulls).

### 22. `l100-04`

구성 1
프로젝트 파일에서 고친다
현재 제품: /memory는 메모리 파일을 열고, /context는 무엇이 로드됐는지 보여 줍니다.
/memory 실행
로드된 파일 확인
빈틈 찾기
팀 규칙이 사용자 수준에 있음
옮기기
프로젝트 파일로
팀원에게 사본을 보내는 것은 오답입니다. 사본은 점점 서로 달라집니다.

> 노트: 원문 제목: Fix it in the project file (CONFIGURATION 1). 부제: Current product: /memory opens the memory files, /context shows what is loaded. (원문 그대로이며 확인하지 않았습니다) Run /memory (See the loaded files) → Spot the gap (Team rules sit at user level) → Move them (Into the project file). 하단: Sending the teammate a copy is wrong: copies drift apart.

### 23. `l100-05`

구성 2
경로 규칙은 어느 폴더에나 닿는다
이 폴더
디렉터리 CLAUDE.md
한 폴더에 속함
한 폴더
자체 규칙
일치하는 모든 곳
경로 범위 규칙
paths: **/*.test.ts
일치하는 파일
어느 폴더에 있든

> 노트: 원문 제목: Path rules reach any folder (CONFIGURATION 2). Directory CLAUDE.md (Belongs to one folder) → this folder → One folder (Its own conventions). / Path-scoped rule (paths: **/*.test.ts) → every match → Matching files (In any folder).

### 24. `l100-06`

구성 2
큰 파일은 나누고 가져온다
큰 파일 하나
너무 커짐
주제별 파일
rules 폴더에 나눔
가져오기(import)
패키지마다 필요한 것만 가져감
오답: 폴더마다 CLAUDE.md, 루트 파일의 섹션, 또는 스킬.

> 노트: 원문 제목: Split a big file, then import (CONFIGURATION 2). One big file (It grows too large) → Topic files (Split in the rules folder) → Imports (Each package takes what it needs). 하단: Wrong: a CLAUDE.md per folder, a root section, or a skill.

### 25. `l100-07`

구성 3
항상 로드 대 필요할 때 로드
항상
필요할 때
세션
Claude Code 작업
CLAUDE.md
항상 로드: 모든 작업
커맨드 또는 스킬
필요할 때: 한 종류의 작업
팀 커맨드
리포지토리의 commands 폴더
개인 커맨드
내 홈 폴더

> 노트: 원문 제목: Always loaded versus on demand (CONFIGURATION 3). Session (A Claude Code task) → always → CLAUDE.md (Always loaded: every task) / - - on demand → Command or skill (On demand: one task kind) → Team command (Repo commands folder) / Personal command (Your home folder).

### 26. `l100-08`

구성 3
스킬에는 트리거 필드가 없다
---
description: Summarise a noisy test run
context: fork
argument-hint: [suite name]
allowed-tools: Read, Bash(npm test *)
# no trigger key: Claude matches the description
---
Run the suite and report only failures.
Keep the output short.
시험: allowed-tools는 스킬을 제한합니다. 현재 제품: 나열된 도구를 미리 승인합니다.

> 노트: 원문 제목: A skill has no trigger field (CONFIGURATION 3). 프런트매터(영문 유지) 의미: 설명 "노이즈가 많은 테스트 실행을 요약", context fork, 인자 힌트 [스위트 이름], 허용 도구 Read와 Bash(npm test *). 주석: 트리거 키는 없고 Claude가 설명을 보고 맞춤. 본문: 스위트를 실행하고 실패만 보고하라, 출력은 짧게. 캡션: Exam: allowed-tools restricts the skill. Current product: it pre-approves the listed tools. (원문 그대로이며 확인하지 않았습니다)

### 27. `l100-09`

워크플로 1
작업 크기가 모드를 고른다
큼
작음
승인
작업
명시된 크기를 읽음
플랜 모드
파일이 많고 접근법이 여러 개
직접 실행
파일 하나, 명확한 스택 트레이스
실행하기
승인된 계획을 실행
Explore 서브에이전트
노이즈가 많은 탐색은 밖에 둠

> 노트: 원문 제목: The task's size picks the mode (WORKFLOWS 1). The task (Read its stated size) → big → Plan mode (Many files, several approaches) → approve → Carry it out (Run the approved plan) / Plan mode - - → Explore subagent (Noisy discovery stays out) / The task → small → Direct execution (One file, clear stack trace).

### 28. `l100-10`

워크플로 2
resume, 포크, 새로 시작 중에 고른다
이름
공유
요약
이전 세션
앞서 한 분석
resume
컨텍스트가 대부분 유효
포크
접근법마다 하나
새로 시작
이전 결과가 낡음
함정
세션 포크는 기록을 유지하고, 스킬 포크는 빈 상태로 시작함

> 노트: 원문 제목: Pick resume, fork or fresh (WORKFLOWS 2). Old session (Earlier analysis) → named → Resume (Context mostly valid) / → shared → Fork (One per approach) / → summary → Start fresh (Old results are stale). Trap: Session fork keeps history; skill fork starts empty. (원문 그대로이며 확인하지 않았습니다) 화살표 라벨: 이름 붙인 세션이면 resume, 공유 기준점이면 포크, 요약을 들고 새로 시작.

### 29. `l100-11`

워크플로 3
CI에서는 -p와 스키마로 실행한다
CI 파이프라인
Claude Code
풀 리퀘스트
claude -p + json schema
JSON findings
post findings
project CLAUDE.md
tests + earlier findings
메모리도 홈 폴더도 없습니다. 리포지토리 파일과 프롬프트만 Claude Code에 닿습니다.

> 노트: 원문 제목: In CI, run with -p and a schema (WORKFLOWS 3). CI pipeline → Claude Code: claude -p + json schema / Claude Code → CI pipeline: JSON findings / CI pipeline → Pull request: post findings / CI pipeline → Claude Code: project CLAUDE.md / tests + earlier findings. 캡션: No memory, no home folder: only the repository file and the prompt reach Claude Code.

### 30. `l100-12`

기억할 것
누가, 언제, 얼마나 큰지 묻는다
팀 대 개인
리포지토리 또는 홈 폴더
경로 범위 규칙
여러 폴더의 파일
항상 대 필요할 때
CLAUDE.md 대 스킬
플랜 또는 직접
명시된 작업 크기
resume, 포크, 새로 시작
무엇이 아직 유효한가
명시된 크기와 이전 컨텍스트가 각 선택을 정합니다.

> 노트: 원문 제목: Ask who, when and how big (WHAT TO REMEMBER). Team vs personal (Repo or home folder) / Path-scoped rule (Files across folders) / Always vs on demand (CLAUDE.md vs skills) / Plan or direct (The stated task size) / Resume, fork, fresh (How much is still true). 하단: The stated size and the old context decide each pick.

### 31. `l100-13`

정리
모든 선택지에 세 가지를 묻는다
CI에서
JSON 출력과 스키마를 붙여 -p로 실행합니다.
누가 필요로 하나?
언제 로드되나?
작업은 자기 자신에 대해 뭐라고 하나?

> 노트: 원문 제목: For every option, ask three things (THE TAKEAWAY). In CI: Use -p with JSON output and a schema. / Who needs it? / When does it load? / What does the task say about itself?

## 101강. 핵심 구분: 프롬프트, 출력 (`l101`)

101강
핵심 구분: 프롬프트, 출력
슬라이드 13장

> 노트: 원문: LECTURE 101 · Key Distinctions: Prompts, Output · 13 slides

### 33. `l101-01`

도메인 4
도메인 4는 시험의 5분의 1이다
프롬프트, 출력, 리뷰
시험이 오답 선택지로 바꾸는 구분들.
신중하게 들리는 함정
오답 선택지는 신중하고 합리적으로 들립니다.

> 노트: 원문 제목: Domain 4 is a fifth of the exam (DOMAIN 4). Prompts, output, review: The distinctions the exam turns into wrong options. / Careful-sounding traps: The wrong options sound careful and sensible. 도메인 4는 프롬프트 엔지니어링과 정형 출력이며 비중 20%.

### 34. `l101-02`

핵심 아이디어
정답 선택지는 구조를 더한다
오답 선택지
강도, 크기, 어조를 바꿈.
정답 선택지
구조를 더함: 이름 붙인 범주, 예시, 스키마, 새 리뷰어.
세 그룹: 프롬프트, 출력, 리뷰.

> 노트: 원문 제목: Right options add structure (THE KEY IDEA). Wrong options: Change the volume, the size or the tone. / Right options: Add structure: named categories, examples, a schema, a fresh reviewer. 하단: Three groups: prompts, output, reviews.

### 35. `l101-03`

프롬프트: 기준
보고할 것과 건너뛸 것을 이름으로 댄다
REVIEW_PROMPT = """
Report: bugs, security problems.
Skip: minor style, local patterns.
Severity (definition + example each):
- critical: query built from user input
- minor: unused import
"""
DISABLED = ["naming"]  # noisy, fix first
모호한 "조심하라"는 Claude가 한계를 추측하게 만듭니다. 명시적 기준이 추측을 없앱니다.

> 노트: 원문 제목: Name what to report and skip (PROMPTS: CRITERIA). 프롬프트(영문 유지) 의미: 보고: 버그, 보안 문제. 건너뛰기: 사소한 스타일, 국지적 패턴. 심각도(각각 정의와 예시): critical은 사용자 입력으로 만든 쿼리, minor는 쓰이지 않는 import. DISABLED: naming 범주는 시끄러우니 먼저 고칠 것. 캡션: Vague caution makes Claude guess the limit. Explicit criteria remove the guess.

### 36. `l101-04`

프롬프트: 예시
더 큰 목소리보다 예시가 낫다
<example name=complete>
  Finding: SQL built from user input
  Severity: critical, fix: parameterised query
</example>
<example name=unclear-case>
  Looks like a bug, but the retry is intended:
  not reported, the other choice is valid.
</example>
<example name=contrast>
  OK: local helper tmp | Problem: unchecked input
추출에는 서로 다른 레이아웃의 예시를 더하세요. 값이 비어서 오거나 지어낸 값으로 오는 일이 멈춥니다.

> 노트: 원문 제목: Examples beat louder instructions (PROMPTS: EXAMPLES). 예시(영문 유지) 의미: complete — 사용자 입력으로 만든 SQL, 심각도 critical, 수정은 파라미터화된 쿼리. unclear-case — 버그처럼 보이지만 재시도는 의도된 것이므로 보고하지 않음, 다른 선택도 타당함. contrast — 괜찮음: 로컬 헬퍼의 tmp / 문제: 검사하지 않은 입력. 캡션: For extraction, add examples of different layouts - values stop coming back empty or invented.

### 37. `l101-05`

출력: 스키마
정중한 부탁보다 스키마가 낫다
# a schema: the shape is enforced
tools = [{
    "name": "record_invoice",
    "strict": True,
    "input_schema": INVOICE_SCHEMA,
}]
시험: JSON 스키마를 쓰는 도구 사용. 현재 코드: strict tool use 또는 structured outputs.

> 노트: 원문 제목: A schema beats a polite request (OUTPUT: SCHEMA). 주석 의미: 스키마가 있으면 형태가 강제됨. 캡션: Exam: tool use with a JSON schema. Current code: strict tool use or structured outputs.

### 38. `l101-06`

출력: tool_choice
시험의 형태, 그다음 실제로 만들 것
# Current code: auto + strict tool + named in the instruction
tool_choice={"type": "auto"},
tools=[{"name": "record_invoice", "strict": True, ...}],
system="Call record_invoice for every document."
시험의 정답: any 또는 강제 도구. 내 코드에서는: auto, strict 도구, 그리고 지침.

> 노트: 원문 제목: Exam form, then what to build (OUTPUT: TOOL CHOICE). 주석 의미: 현재 코드는 auto + strict 도구 + 지침에서 도구 이름을 지정. system 의미: "모든 문서에 record_invoice를 호출하라." 캡션: Exam answer: any or a forced tool. In your code: auto, a strict tool and an instruction. (원문 그대로이며 확인하지 않았습니다)

### 39. `l101-07`

출력: 스키마 설계
스키마는 의미가 아니라 형태를 정한다
INVOICE_SCHEMA = {
    "total": {"type": "number"},
    "po_number": {"type": ["string", "null"]},
    "category": {"enum": ["hardware", "software",
                            "unclear", "other"]},
    "category_detail": {"type": ["string", "null"]},
}
항목 합이 총액과 맞는지는 내 코드가 비교합니다. 없을 수 있는 값은 nullable로, 범주에는 "unclear"나 "other"를 더하세요.

> 노트: 원문 제목: A schema sets shape, not meaning (OUTPUT: SCHEMA DESIGN). 스키마(영문 유지) 의미: total은 숫자, po_number는 문자열 또는 null, category는 hardware/software/unclear/other 중 하나, category_detail은 문자열 또는 null. 캡션: Your code compares the lines with the total. Make missing values nullable; add 'unclear' or 'other'.

### 40. `l101-08`

출력: 재시도
정확한 오류와 함께 재시도한다
retry
내 코드
날짜 필드가 검증에 실패
Claude
형식과 구조를 고침
파일 요청하기
원본에 값이 없음

> 노트: 원문 제목: Retry with the exact error (OUTPUT: RETRY). Your code (Date field fails validation) → retry → Claude (Fixes format and structure) - - → Ask for the file (The source lacks the value). 재시도는 형식과 구조 오류를 고칠 뿐이며, 원본에 없는 값은 파일을 요청해야 함.

### 41. `l101-09`

출력: 배치
아무도 기다리지 않을 때만 배치를 쓴다
밤새
기다림
내 코드
야간 감사
Message Batches
절반 가격, 최대 24시간
일반 호출
바로 응답
[이미지: 책상에서 일하는 개발자 일러스트]
개발자
검사 결과를 기다림

> 노트: 원문 제목: Batch only when nobody waits (OUTPUT: BATCHES). Your code (Overnight audit) → overnight → Message Batches (Half price, up to 24 h) - - → Developer (Waits for the check) / → blocking → Normal call (Answers right away) → Developer.

### 42. `l101-10`

리뷰: 독립성
새 리뷰어가 더 많이 본다
리뷰
작성 세션
자기 추론을 유지하고, 거의 의심하지 않음
새 인스턴스
새 컨텍스트, 공유된 추론 없음

> 노트: 원문 제목: A fresh reviewer sees more (REVIEWS: INDEPENDENCE). Writer session (Keeps its reasoning, rarely questions it) → review → Fresh instance (New context, no shared reasoning).

### 43. `l101-11`

리뷰: 큰 변경
큰 패스는 얕은 리뷰를 낳는다
큰 패스 하나
주의가 얇게 퍼짐: 얕고 서로 충돌하는 코멘트.
더 큰 모델이나 창은 공간을 더할 뿐, 주의를 더하지 않음
풀 리퀘스트를 작게 나누면 일이 개발자에게 넘어감
세 번 중 두 번 일치한 지적 사항만 남기면 실제 버그가 빠짐

> 노트: 원문 제목: Big passes give shallow reviews (REVIEWS: LARGE CHANGES). One big pass: Attention is spread thin: shallow, conflicting comments. / A bigger model or window adds space, not attention / Smaller pull requests move the work to developers / Keeping findings two of three runs agree on drops real bugs.

### 44. `l101-12`

리뷰: 정답 선택지
패스를 나누고, 그다음 통합한다
파일별 패스
한 번에 파일 하나
통합 패스
파일들을 가로질러
검증
지적 사항마다 점수
[이미지: 책상에서 일하는 개발자 일러스트]
개발자
가장 불확실한 것부터

> 노트: 원문 제목: Split passes, then integrate (REVIEWS: THE RIGHT OPTION). Pass per file (One file at a time) → Integration pass (Across the files) → Verification (Score per finding) → Developer (Least certain first).

### 45. `l101-13`

기억할 것
정답 선택지는 구조를 더한다
이름 붙이기
보고할 것과 건너뛸 것
예시
2~4개, 더 큰 목소리가 아님
스키마
형태만, 의미는 내 코드가 검사
nullable + 재시도
정확한 오류, 지어내지 않음
배치
아무도 기다리지 않을 때만
새 리뷰어
큰 변경은 나눔
더 크게, 더 많이, 더 신중하게는 아마 오답입니다. 구조를 더하는 선택지를 고르세요.

> 노트: 원문 제목: The right option adds structure (WHAT TO REMEMBER). Name it (What to report and skip) / Examples (Two to four, not louder words) / Schema (Shape - your code checks meaning) / Nullable + retry (Exact error, never invented) / Batches (Only when nobody waits) / Fresh reviewer (Split large changes). 하단: Louder, bigger or more careful is probably wrong. Choose the option that adds structure.
