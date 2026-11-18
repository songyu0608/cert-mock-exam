# CCAR-F 섹션 6. 지원 에이전트 (한국어판)

원본 아티팩트: https://claude.ai/artifact/PvSY19JVrX4aAh87RN79kH

슬라이드 HTML(`slides/`)에서 화면 글자와 발표자 노트(`<aside>`, 영어 원문)를 뽑은 텍스트다. 자동 생성 파일이므로 고칠 때는 슬라이드 HTML을 기준으로 한다.

## 표지 (`cover`)

슬라이드
Claude Certified Architect – Foundations:
전체 강좌
섹션 6. 지원 에이전트
48~57강, 슬라이드 122장

> 노트: 원문: Claude Certified Architect Foundations: Complete Course / Section 6. The Support Agent / Lectures 48-57, 122 slides.

## 48강. Agent SDK: 같은 루프를 대신 돌려 준다 (`l48`)

48강
Agent SDK: 같은 루프를 대신 돌려 준다
슬라이드 11장

> 노트: 원문: LECTURE 48 · The Agent SDK: the Same Loop, Run for You · 11 slides

### 3. `l48-01`

Claude Agent SDK
Agent SDK가 루프를 대신 돌려 준다
넘겨줌
우리 코드
루프를 직접 돌림
Agent SDK
루프를 대신 돌려 줌
기반
지원 에이전트
리서치 시스템
개발자 도구

> 노트: 원문 제목: The Agent SDK runs the loop for us (THE CLAUDE AGENT SDK). Our own code (Runs the loop by hand) → handed over → Agent SDK (Runs the loop for us) → built on → Support agent / Research system / Developer tool.

### 4. `l48-02`

ShopAssist의 현재 상태
에이전트마다 이 루프 코드를 반복한다
우리 코드
Claude
도구
대화 + 도구
stop_reason: tool_use
lookup_order
주문 데이터
결과 추가 후 다시 호출
모든 에이전트에 똑같은 코드가 필요하고, 스토어 규칙을 둘 자리도 필요합니다.

> 노트: 원문 제목: Every agent repeats this loop code (WHERE SHOPASSIST IS NOW). Our code → Claude: conversation + tools / Claude → Our code: stop_reason: tool_use / Our code → Tool: lookup_order / Tool → Our code: order data / Our code → Claude: result added, call again. 캡션: Every agent needs this same code - plus a place for the store's rules.

### 5. `l48-03`

오늘 다룰 세 가지
SDK는 루프를 돌리고, 규칙은 우리가 정한다
루프
query()가 돌린다
도구
에이전트가 쓸 수 있는 것
훅
항상 지켜지는 규칙
루프는 SDK가 돌립니다. 도구와 규칙은 우리 코드가 정합니다.

> 노트: 원문 제목: SDK runs the loop; you set rules (TODAY'S THREE PARTS). The loop: query() runs it / The tools: What the agent may use / Hooks: Rules that always hold. 하단: The SDK runs the loop. Your code decides the tools and the rules.

### 6. `l48-04`

첫째, 루프
query()가 루프의 일을 한다
우리 코드
query()
Claude
도구
메시지 + 옵션
요청
tool_use
도구 호출
결과
결과 + 대화 기록
end_turn
최종 답변
각 단계는 메시지로도 우리 코드에 전달되므로, 사례 전체를 기록할 수 있습니다.

> 노트: 원문 제목: query() does the loop's work (FIRST, THE LOOP). Your code → query(): message + options / query() → Claude: request / Claude → query(): tool_use / query() → Tool: call tool / Tool → query(): result / query() → Claude: result + history / Claude → query(): end_turn / query() → Your code: final answer. 캡션: Each step also reaches your code as a message, so you can log the whole case.

### 7. `l48-05`

같은 에이전트, 두 가지 방식
루프 코드가 대부분 사라졌다
# With the Agent SDK
async for message in query(
    prompt=customer_message,
    options=options,
):
    log(message)
다음 도구는 여전히 Claude가 고릅니다. SDK는 각 선택 주변의 일만 대신합니다.

> 노트: 원문 제목: Most of the loop code is gone (THE SAME AGENT, WRITTEN BOTH WAYS). 코드(영문 유지) 의미: "Agent SDK 사용". 고객 메시지와 옵션을 넣어 query()를 돌리고, 돌아오는 메시지를 하나씩 기록한다. 앞 강의의 while 루프, stop_reason 확인, 도구 실행, 기록 추가가 모두 SDK 안으로 들어갔다. 캡션: Claude still picks each next tool - the SDK only does the work around each choice.

### 8. `l48-06`

둘째, 도구
ShopAssist는 내장 도구 대신 MCP를 쓴다
연결
필요 없음
ShopAssist 에이전트
Agent SDK 위에서 실행
스토어 MCP 서버
우리 도구 네 개
내장 도구
파일, 검색, 셸

> 노트: 원문 제목: ShopAssist uses MCP, not built-ins (SECOND, THE TOOLS). ShopAssist agent (Runs on the Agent SDK) → connects to → Store MCP server (Our four tools) / not needed → Built-in tools (Files, search, shell).

### 9. `l48-07`

둘째, 도구
작업에 필요한 도구만 허용한다
// TypeScript
const options = { allowedTools: [
  "mcp__store__get_customer", "mcp__store__lookup_order",
  "mcp__store__process_refund", "mcp__store__escalate_to_human",
] };
# Python
options = ClaudeAgentOptions(allowed_tools=[
  "mcp__store__get_customer", "mcp__store__lookup_order",
  "mcp__store__process_refund", "mcp__store__escalate_to_human",
])
지원 에이전트에는 도구 네 개만 줍니다. 환불 대화에 셸은 필요 없고, 도구가 적을수록 Claude가 고르기 쉽습니다.

> 노트: 원문 제목: Allow only the tools the job needs (SECOND, THE TOOLS). 코드(영문 유지) 의미: TypeScript와 Python에서 각각 허용 도구 목록에 스토어 MCP 서버의 도구 네 개(get_customer, lookup_order, process_refund, escalate_to_human)만 넣는다. 도구 이름은 mcp__서버이름__도구이름 형식이다. 캡션: A support agent gets four tools - no shell in a refund conversation, and fewer tools make Claude's choice easier.

### 10. `l48-08`

셋째, 훅
훅은 도구 실행 전후에 돈다
Claude
SDK 루프
우리 훅
도구
tool_use
PreToolUse
허용 / 차단 / 입력 수정
도구 실행
결과
PostToolUse
수정된 결과
결과
훅은 우리가 만든 함수이며, SDK가 루프의 정해진 지점에서 호출합니다.

> 노트: 원문 제목: Hooks run before and after a tool (THIRD, HOOKS). Claude → SDK loop: tool_use / SDK loop → Your hook: PreToolUse / hook → SDK loop: allow / block / edit input / SDK loop → Tool: run tool / Tool → SDK loop: result / SDK loop → hook: PostToolUse / hook → SDK loop: edited result / SDK loop → Claude: result. 캡션: A hook is your own function, called by the SDK at a fixed point in the loop.

### 11. `l48-09`

훅이 중요한 이유
훅이 환불 규칙을 강제한다
$500 이하
$500 초과
Claude
프롬프트: 대부분 지켜짐
환불 훅
코드: 매번 실행
process_refund
허용될 때만 실행
[이미지: 헤드셋을 쓴 지원팀 담당자 일러스트]
사람

> 노트: 원문 제목: A hook enforces the refund rule (WHY HOOKS MATTER). Claude (Prompt: followed most times) → Refund hook (Code: runs every time) → up to $500 → process_refund (Runs when allowed) / over $500 → A person. 프롬프트의 규칙은 대부분 지켜지지만, 훅의 규칙은 코드이므로 매번 실행됩니다.

### 12. `l48-10`

SDK의 두 가지 구성 요소
서브에이전트는 돕고, 세션은 기억한다
시작
보관
메인 에이전트
더 큰 작업을 맡음
서브에이전트
설명과 프롬프트를 가진 서브에이전트
세션
대화를 보관: resume으로 이어 가거나, fork_session으로 복사본을 만듦

> 노트: 원문 제목: Subagents help, sessions remember (TWO MORE PARTS OF THE SDK). Main agent (Has a bigger task) → starts → Subagent (A helper with a description and a prompt) / is kept in → Session (Keeps the conversation: resume, or fork_session for a copy).

### 13. `l48-11`

정리
도구와 규칙은 우리가 고른다
query()
stop_reason 루프를 돌린다
Claude
다음 도구는 여전히 Claude가 고른다
허용 도구
에이전트가 쓸 수 있는 것
훅
프롬프트는 권할 뿐인 것을 강제한다
그 밖에
서브에이전트와 세션
루프는 SDK에 맡기고, 에이전트가 쓸 도구와 지켜야 할 규칙은 우리가 정합니다.

> 노트: 원문 제목: You choose the tools and the rules (RECAP). query(): Runs the stop reason loop / Claude: Still picks each next tool / Allowed tools: What the agent may use / Hooks: Enforce what a prompt only suggests / Also included: Subagents and sessions. 하단: Let the SDK run the loop. You decide the tools the agent may use and the rules it must follow.

## 49강. 코드로 만드는 사전 조건 게이트 (`l49`)

49강
코드로 만드는 사전 조건 게이트
슬라이드 12장

> 노트: 원문: LECTURE 49 · Prerequisite Gates in Code · 12 slides

### 15. `l49-01`

절대 어기면 안 되는 첫 번째 규칙
주문 작업 전에는 반드시 검증한다
검증 없이는 작업도 없다
고객이 검증되기 전에는 주문이나 환불 작업을 하지 않는다.
주문 데이터가 다른 사람에게 갈 수 있다
환불이 엉뚱한 계정으로 갈 수 있다

> 노트: 원문 제목: Verify before any order action (THE FIRST MUST-NEVER RULE). No verification, no action: No order or refund action before the customer is verified. / Order data could reach another person / A refund could go to the wrong account.

### 16. `l49-02`

Agent SDK 위의 ShopAssist
프롬프트 규칙은 10번에 1번 실패한다
get_customer
누가 묻는지 검증
lookup_order
주문 조회
process_refund
환불 처리
escalate_to_human
사람에게 핸드오프
프롬프트에는 먼저 검증하라고 되어 있지만, 대화 10건 중 1건꼴로 검증을 건너뜁니다.

> 노트: 원문 제목: A prompt rule fails 1 time in 10 (SHOPASSIST ON THE AGENT SDK). get_customer: Verify who is asking / lookup_order: Read an order / process_refund: Send money back / escalate_to_human: Hand over to a person. 하단: The prompt says verify first - but about 1 chat in 10 skips it.

### 17. `l49-03`

로그에 남은 것
건너뛴 검증, 엉뚱한 계정
고객
Claude
주문 도구
“저 Alex예요. 재킷 어디 있어요?”
lookup_order + 대화 속 ID
엉뚱한 계정이 나옴
process_refund, 잘못된 ID
고객 ID는 get_customer에서 나온 것이 아니었습니다.

> 노트: 원문 제목: Skipped check, wrong account (WHAT THE LOGS SHOW). Customer → Claude: I'm Alex - where is my jacket? / Claude → Order tools: lookup_order + ID from chat / Order tools → Claude: wrong account found / Claude → Order tools: process_refund, wrong ID. 캡션: The customer ID never came from get_customer.

### 18. `l49-04`

기억할 것
순서를 강제할 수 있는 것은 코드뿐이다
프롬프트
왜 충분하지 않은가
게이트
사전 조건 게이트의 동작 방식
잘못된 해결책
엉뚱한 것을 통제한다
프롬프트는 단계의 순서를 안내할 뿐이고, 강제할 수 있는 것은 코드뿐입니다.

> 노트: 원문 제목: Only code can enforce the order (WHAT TO REMEMBER). The prompt: Why it is not enough / The gate: How a prerequisite gate works / The wrong fix: It controls the wrong thing. 하단: A prompt guides the order of steps, but only code can enforce it.

### 19. `l49-05`

첫째, 프롬프트
프롬프트 규칙은 여전히 실패할 수 있다
프롬프트: 안내
아주 자주 지켜지지만 매번은 아니다. 실패율이 0이 아니다.
코드: 결정적
매번 같은 올바른 결과. 돈이 움직이기 전에는 이것이 필요하다.
대문자나 예시를 더해도, 지킬지는 여전히 Claude의 선택에 달려 있습니다.

> 노트: 원문 제목: A prompt rule can still fail (FIRST, THE PROMPT). Prompt: guidance: Followed very often, not every time. A non-zero failure rate. / Code: deterministic: The same correct result every time. Needed before money moves. 하단: Capital letters and extra examples still depend on Claude choosing to follow them.

### 20. `l49-06`

둘째, 게이트
게이트는 검증된 ID를 기다린다
ID 저장
도구 호출
채워져 있으면
읽기
get_customer
일치 1건: ID 저장
검증된 ID 슬롯
검증 전까지 비어 있음
Claude
도구를 요청
게이트 (우리 코드)
슬롯을 확인
보호되는 도구
lookup_order, process_refund

> 노트: 원문 제목: A gate waits for a verified ID (SECOND, THE GATE). get_customer (One match: save the ID) → saves ID → Verified ID slot (Empty until verified). Claude (Asks for a tool) → tool call → Gate (our code) (Checks the slot) → if filled → Guarded tools (lookup_order, process_refund). Gate → reads → Verified ID slot.

### 21. `l49-07`

흐름 추적
게이트가 이른 조회를 막는다
Claude
게이트 (코드)
MCP 스토어 도구
lookup_order, 미검증 ID
is_error: 먼저 검증할 것
get_customer(Alex의 이메일)
get_customer
고객 1명: CUS-1001
슬롯이 비어 있었으므로 lookup_order는 실행되지 않았습니다. 이어서 게이트가 CUS-1001을 저장합니다.

> 노트: 원문 제목: The gate blocks an early lookup (THE TRACE). Claude → Gate: lookup_order, unverified ID / Gate → Claude: is_error: verify first / Claude → Gate: get_customer(Alex's email) / Gate → Store MCP tools: get_customer / tools → Gate: one customer: CUS-1001. 캡션: The slot was empty, so lookup_order never ran. The gate then saves CUS-1001.

### 22. `l49-08`

흐름 추적, 이어서
검증된 ID가 있으면 호출이 실행된다
Claude
게이트 (코드)
MCP 스토어 도구
lookup_order(CUS-1001)
슬롯 채워짐, ID 일치
주문 상태
lookup_order(CUS-9999)
차단: 검증된 ID가 아님
호출에 들어간 ID는 get_customer가 반환한 바로 그 ID여야 합니다.

> 노트: 원문 제목: With a verified ID, the call runs (THE TRACE, CONTINUED). Claude → Gate: lookup_order(CUS-1001) / Gate → Store MCP tools: slot filled, ID matches / tools → Gate: order status / Claude → Gate: lookup_order(CUS-9999) / Gate → Claude: blocked: not the verified ID. 캡션: The ID in the call must be the one get_customer returned.

### 23. `l49-09`

게이트의 정체
게이트는 너무 이른 단계만 거부한다
도구 코드 안의 검사
프롬프트가 무엇이라 하든, 모든 호출에서 실행된다.
도구를 고르지 않는다. 다음 단계는 Claude가 정한다
너무 일찍 온 단계만 거부한다
SDK 훅도 실행 전에 호출을 가로챌 수 있다
훅은 다음 강의에서 사용합니다.

> 노트: 원문 제목: The gate only refuses early steps (WHAT THE GATE IS). A check in tool code: It runs on every call, whatever the prompt says. / It does not choose tools - Claude decides each next step / It refuses only a step that comes too early / SDK hooks can also intercept a call before it runs. 하단: We use hooks in the next lesson.

### 24. `l49-10`

셋째, 옳아 보이는 해결책
도구를 줄여도 순서는 해결되지 않는다
켬
둘 다 사용 가능
라우팅 분류기
요청마다 읽음
켜진 도구
get_customer + lookup_order
Claude
여전히 lookup_order를 먼저 부를 수 있음

> 노트: 원문 제목: Fewer tools do not fix the order (THIRD, THE FIX THAT LOOKS RIGHT). Routing classifier (Reads each request) → turns on → Tools turned on (get_customer + lookup_order) → both available → Claude (Can still call lookup_order first).

### 25. `l49-11`

정리
규칙은 코드에 둔다
프롬프트는 안내
가끔 실패한다
반드시 지킬 것: 코드
돈보다 신원 확인이 먼저
게이트가 막는다
검증된 ID가 생길 때까지
오류가 알려 준다
Claude가 다음 단계를 안다

> 노트: 원문 제목: Recap: put the rule in code (RECAP). Prompt guides: It fails sometimes → Must-hold: code: Identity before money → Gate blocks: Until a verified ID exists → Error says what: Claude gets the next step.

### 26. `l49-12`

핵심
도구 목록이 아니라 순서에 게이트를 둔다
도구 목록 제한
어떤 도구가 있는지를 통제한다.
코드 안의 게이트
호출의 순서를 통제한다.
순서가 돈이나 데이터를 지킨다면, 더 강하게 부탁하지 말고 코드에 게이트를 두세요.

> 노트: 원문 제목: Gate the order, not the tool set (THE TAKEAWAY). Limit the tool set: Controls which tools exist. / Gate in code: Controls the order of the calls. 하단: Order protects money or data? Do not ask more firmly - put a gate in code.

## 50강. 훅: 도구 호출 가로채기 (`l50`)

50강
훅: 도구 호출 가로채기
슬라이드 14장

> 노트: 원문: LECTURE 50 · Hooks: Intercepting Tool Calls · 14 slides

### 28. `l50-01`

훅
훅은 호출과 결과를 바꾼다
호출 전
훅은 도구 호출이 실행되기 전에 바꿀 수 있다.
호출 후
훅은 Claude가 읽기 전에 도구 결과를 바꿀 수 있다.
ShopAssist 규칙 두 가지가 더, 모든 도구 호출 주변의 코드를 필요로 합니다.

> 노트: 원문 제목: Hooks change calls and results (HOOKS). Before the call: A hook can change a tool call before it runs. / After the call: A hook can change a tool result before Claude reads it. 하단: Two more ShopAssist rules need code around every tool call.

### 29. `l50-02`

지금까지의 ShopAssist
아직 남은 문제 두 가지
get_customer
게이트: 고객을 검증
lookup_order_by_id
주문을 찾음
process_refund
환불 처리
escalate_to_human
사람에게 사례를 넘김
남은 문제: $500를 넘는 환불에는 사람이 필요하고, 날짜 형식이 제각각입니다.

> 노트: 원문 제목: Two problems are still open (SHOPASSIST SO FAR). get_customer: The gate: verifies the customer / lookup_order_by_id: Finds an order / process_refund: Sends money back / escalate_to_human: Hands the case to a person. 하단: Open: refunds above $500 need a person, and date formats differ.

### 30. `l50-03`

두 종류의 훅
훅은 정해진 지점에서 실행된다
Claude가 요청
도구를 부르려 함
호출 전 훅
우리 코드가 호출을 봄
도구 실행
허용된 경우만
호출 후 훅
우리 코드가 결과를 봄
Claude가 읽음
최종 결과를 받음
프롬프트는 대부분 통하고, 훅은 매번 통합니다.

> 노트: 원문 제목: A hook runs at a fixed point (TWO KINDS OF HOOK). Claude asks: Wants to call a tool → Hook before: Your code sees the call → Tool runs: Only if allowed → Hook after: Your code sees the result → Claude reads: Gets the final result. 하단: A prompt works most of the time. A hook works every time.

### 31. `l50-04`

호출 전 훅
훅은 호출이 실행되기 전에 본다
Claude
Agent SDK
우리 훅
도구
도구 요청
이름 + 입력
허용 / 차단 / 수정
실행
시험에서는 이를 도구 호출 가로채기(tool call interception)라고 부릅니다. Agent SDK에서는 PreToolUse 훅입니다.

> 노트: 원문 제목: A hook sees a call before it runs (THE HOOK BEFORE THE CALL). Claude → Agent SDK: tool request / Agent SDK → Your hook: name + input / hook → Agent SDK: allow / block / edit / Agent SDK → Tool: run it. 캡션: The exam calls this tool call interception. In the Agent SDK it is the PreToolUse hook.

### 32. `l50-05`

사례: $620 환불
훅은 호출을 막을 수 있다
고객
Claude
환불 훅
고장 난 기계 + 사진
process_refund: $620
차단: $500 초과
$500 한도를 넘으므로 훅이 호출을 막습니다.

> 노트: 원문 제목: A hook can block the call (A CASE: A $620 REFUND). Customer → Claude: Broken machine + photo / Claude → Refund hook: process_refund: $620 / Refund hook → Claude: Blocked: over $500. 캡션: Over the $500 limit, so the hook blocks the call.

### 33. `l50-06`

방향 전환
막힌 작업은 핸드오프로 바뀐다
환불 훅
process_refund를 차단함
Claude
차단 이유를 읽음
[이미지: 헤드셋을 쓴 지원팀 담당자 일러스트]
지원팀
사례를 넘겨받음

> 노트: 원문 제목: A blocked action becomes a handoff (THE REDIRECT). Refund hook (Blocked process_refund) → Claude (Reads the reason) → Support team (Takes over the case).

### 34. `l50-07`

훅 설정
이 훅은 도구 하나만 지킨다
async def check_refund(input_data, tool_use_id, context):
    if input_data["tool_input"]["amount"] > 500:
        return {"hookSpecificOutput": {
            "hookEventName": "PreToolUse",
            "permissionDecision": "deny",
            "permissionDecisionReason": "Over $500: escalate to a person"}}
    return {}
hooks = {"PreToolUse": [HookMatcher(
    matcher="mcp__store__process_refund", hooks=[check_refund])]}
훅을 도구 하나에만 붙이는 한 가지 방법입니다. 백엔드도 이런 환불은 거부합니다.

> 노트: 원문 제목: The hook guards one tool only (THE HOOK CONFIGURATION). 코드(영문 유지) 의미: check_refund 함수는 도구 입력의 amount가 500을 넘으면 PreToolUse 결과로 permissionDecision "deny"(거부)와 이유 "Over $500: escalate to a person"($500 초과: 사람에게 에스컬레이션)을 반환하고, 아니면 빈 객체를 반환한다. HookMatcher의 matcher로 mcp__store__process_refund 도구에만 이 훅을 연결한다. 캡션: One way to attach a hook to a single tool. The backend also refuses such a refund.

### 35. `l50-08`

도구 고르기
돈에는 프롬프트가 아니라 훅이 필요하다
프롬프트 규칙
“$500 넘게는 절대 환불하지 마세요”는 대부분의 경우에만 통한다.
훅
항상 그렇게 되도록 보장한다.
반드시 지켜야 한다면: 프롬프트 규칙이 아니라 훅을 고르세요.

> 노트: 원문 제목: Money needs a hook, not a prompt (CHOOSING THE TOOL). A prompt rule: "Never refund more than $500" works most of the time. / A hook: Makes sure it always happens. 하단: Guaranteed compliance: choose a hook, not a prompt rule.

### 36. `l50-09`

호출 후 훅
훅은 결과를 다시 쓸 수 있다
도구 완료
가공 전 결과를 반환
우리 훅
PostToolUse: 결과를 다시 씀
Claude
새 결과를 읽음

> 노트: 원문 제목: A hook can rewrite the result (THE HOOK AFTER THE CALL). Tool finished (Returns a raw result) → Your hook (Post tool use: rewrites it) → Claude (Reads the new result).

### 37. `l50-10`

필요한 이유
같은 사실이 세 가지 형태로 온다
주문 서비스
delivered_at: 1760400000, status: 4
배송 서비스
eta: 2026-10-12T09:30:00Z
Claude
아직 30일 기한 안인가?

> 노트: 원문 제목: One fact arrives in three shapes (WHY WE NEED IT). Order service (delivered_at: 1760400000, status: 4) / Shipping service (eta: 2026-10-12T09:30:00Z) → Claude (Still inside the 30-day window?). 유닉스 타임스탬프, 숫자 상태 코드, ISO 날짜가 섞여 있어 Claude가 기한을 판단하기 어렵습니다.

### 38. `l50-11`

매번 같은 형태
Claude는 정리된 데이터만 본다
가공 전 결과
1760400000 · status 4
우리 훅
일반 날짜, 상태는 단어로
Claude가 읽음
2025-10-14 · delivered

> 노트: 원문 제목: Claude only sees the clean data (THE SAME SHAPE EVERY TIME). Raw result (1760400000 · status 4) → Your hook (Plain date, status as a word) → Claude reads (2025-10-14 · delivered).

### 39. `l50-12`

훅이 하지 않는 일
각 단계는 여전히 Claude가 정한다
훅이 하지 않는 일
도구를 고르거나 답변을 쓰는 일.
훅이 하는 일
지나가는 것을 검사하고 바꾸는 일뿐.

> 노트: 원문 제목: Claude still decides each step (WHAT HOOKS DO NOT DO). Hooks do not: Choose tools or write answers. / Hooks only: Check and change what passes through.

### 40. `l50-13`

핵심 정리
훅은 루프 안의 우리 코드다
우리 코드
에이전트 루프의 정해진 지점에서 실행
PreToolUse 훅
호출을 먼저 보고, 막거나 방향을 바꿀 수 있음
우리 환불 훅
$500 초과는 escalate_to_human으로

> 노트: 원문 제목: A hook is your code in the loop (MAIN POINTS). Your code: Runs at a fixed point in the agent loop / Pre tool use: Sees a call first; can block or redirect it / Our refund hook: Over $500 goes to escalate_to_human.

### 41. `l50-14`

핵심 정리
프롬프트는 안내하고, 훅은 강제한다
PostToolUse 훅
Claude가 읽기 전에 도구 결과를 다시 쓴다.
우리 방식: 날짜 형식은 하나, 상태는 단어로
프롬프트는 대부분의 경우 Claude를 안내한다
훅은 매번 강제한다
규칙이나 데이터 형태가 항상 지켜져야 한다면 훅을 쓰세요.

> 노트: 원문 제목: Prompts guide, hooks enforce (MAIN POINTS). Post tool use: Rewrites a tool result before Claude reads it. / Ours: one date format, status as a word / Prompts guide Claude most of the time / Hooks enforce every time. 하단: Use a hook when a rule or a data shape must always hold.

## 51강. 핸드오프와 여러 용건이 섞인 요청 (`l51`)

51강
핸드오프와 여러 용건이 섞인 요청
슬라이드 11장

> 노트: 원문: LECTURE 51 · Handoffs and Multi-Concern Requests · 11 slides

### 43. `l51-01`

오늘의 강의
사례가 사라지는 두 곳
핸드오프
에스컬레이션 후 담당자가 받는 것.
여러 문제
용건이 둘 이상 담긴 메시지 하나.
두 경우 모두 사례의 일부가 소리 없이 사라질 수 있습니다.

> 노트: 원문 제목: Two places a case gets lost (TODAY'S LESSON). A handoff: What the person receives after an escalation. / Several problems: One message that carries more than one concern. 하단: In both, one part of a case can quietly get lost.

### 44. `l51-02`

상황
담당자는 대화를 볼 수 없다
메시지
에스컬레이션
고객
고장 난 커피 머신, $620
ShopAssist
훅이 환불을 막음
[이미지: 헤드셋을 쓴 지원팀 담당자 일러스트]
지원팀
대화에 접근할 수 없음

> 노트: 원문 제목: The person cannot see the chat (THE SITUATION). Customer (Broken coffee machine, $620) → message → ShopAssist (Hook blocked the refund) → escalate → Support team (No access to the chat).

### 45. `l51-03`

첫째, 핸드오프
핸드오프는 대화를 통째로 넘기는 것이 아니다
너무 빈약함
“이 환불 좀 검토해 주세요.” 담당자가 고객과 주문을 직접 찾아야 한다.
너무 김
대화 전체를 붙여 넣음: 사실 몇 개를 찾으려고 40줄을 읽어야 한다.
핸드오프가 빈약하면 고객이 모든 것을 다시 설명해야 합니다.

> 노트: 원문 제목: A handoff is not a chat dump (FIRST, THE HANDOFF). Too thin: "Please review this refund." The agent must find the customer and the order. / Too long: The whole chat pasted in: forty lines to find a few facts. 하단: A thin handoff makes the customer explain everything again.

### 46. `l51-04`

escalate_to_human의 입력
핸드오프에는 사실 네 가지를 담는다
// escalate_to_human - tool input
{
  "customer_id": "CUS-1001",
  "root_cause": "Arrived broken, photo shows damage, order in return window",
  "refund_amount": 620.00,
  "recommended_action": "Approve full refund - above the automatic limit"
}
이 네 필드가 있으면 담당자가 바로 처리할 수 있습니다.

> 노트: 원문 제목: The handoff carries four facts (INPUT OF ESCALATE_TO_HUMAN). JSON(영문 유지) 의미: 고객 ID CUS-1001, 근본 원인 "파손된 채 도착, 사진으로 파손 확인, 반품 기한 내 주문", 환불 금액 620.00, 권장 조치 "전액 환불 승인 - 자동 처리 한도 초과". 캡션: With these four fields, the person can act at once.

### 47. `l51-05`

핸드오프 이후
티켓 ID가 돌아온다
ShopAssist
지원 시스템
고객
escalate_to_human
티켓 ID
담당자가 환불을 마무리합니다
한 에이전트가 다른 에이전트에게 일을 넘길 때도 같은 원칙이 적용됩니다.

> 노트: 원문 제목: A ticket ID comes back (AFTER THE HANDOFF). ShopAssist → Support system: escalate_to_human / Support system → ShopAssist: ticket ID / ShopAssist → Customer: A person will finish the refund. 캡션: The same idea holds when one agent passes work to another agent.

### 48. `l51-06`

둘째, 여러 문제
메시지 하나, 용건 셋
“헤드폰 값이 두 번 결제됐어요. 그리고 제 재킷은 어디 있나요?”
고장 난 기계
$620, 사진 첨부
이중 결제
헤드폰, 두 번 결제됨
사라진 재킷
주문은 어디에?
첫 번째 용건에만 답하거나 전부를 한 사례로 다루면, 무언가를 놓칩니다.

> 노트: 원문 제목: One message, three concerns (SECOND, SEVERAL PROBLEMS). 인용: I was charged twice for my headphones. And where is my jacket? Broken machine: $620, photo attached / Double charge: Headphones, paid twice / Missing jacket: Where is the order? 하단: Answer only the first, or treat it all as one case, and something is lost.

### 49. `l51-07`

메시지 나누기
항목은 셋, 컨텍스트는 하나를 공유한다
고객 메시지
용건 세 가지
커피 머신
고장, $620
이중 결제
헤드폰
재킷
어디 있나?
공유 컨텍스트
CUS-1001, 대화 하나

> 노트: 원문 제목: Three items, one shared context (SPLITTING THE MESSAGE). Customer message (Three concerns) → Coffee machine (Broken, $620) / Double charge (Headphones) / Jacket (Where is it?) → Shared context (CUS-1001, one conversation).

### 50. `l51-08`

항목 조사
조회 한 번, 그다음 세 건을 병렬로
Claude
어떤 도구를 부를지 정함
ShopAssist 코드
도구 호출을 실행

> 노트: 원문 제목: One lookup, then three in parallel (INVESTIGATING THE ITEMS). Claude (Decides which tools to call) → ShopAssist code (Runs the tool calls). 제목대로, 고객 조회를 한 번 한 뒤 세 항목을 병렬로 조사합니다. 도구 선택은 Claude가, 실행은 우리 코드가 합니다.

### 51. `l51-09`

조회 결과
항목마다 따로 답한다
헤드폰
두 번 결제됨 - process_refund
재킷
발송됨, 날짜는 주문 정보에서
커피 머신
사람에게 넘김
사람이 필요한 것은 큰 금액의 환불뿐입니다.

> 노트: 원문 제목: Each item gets its own answer (RESULTS OF THE LOOKUPS). Headphones: Paid twice - process_refund / Jacket: Shipped, date from the order / Coffee machine: Goes to a person. 하단: Only the large refund needs a person.

### 52. `l51-10`

하나의 해결
답장 하나로 세 항목을 모두 다룬다
고객
ShopAssist
지원 담당자
답장 하나, 항목 세 개
이중 결제 환불 완료
재킷은 배송 중
담당자가 환불을 마무리
메모: 나머지 두 항목 완료
그래야 지원 담당자가 이미 끝난 일을 다시 하지 않습니다.

> 노트: 원문 제목: One reply covers all three items (ONE RESOLUTION). ShopAssist → Customer: One reply, three items / Double charge refunded / Jacket is on its way / A person will finish the refund. ShopAssist → Support agent: Note: other two items done. 캡션: So the support agent does not do them again.

### 53. `l51-11`

복습
사실을 넘기고, 모든 항목에 답한다
핸드오프
고객 ID, 근본 원인, 환불 금액, 권장 조치.
여러 문제
항목으로 나누고, 컨텍스트를 공유하고, 병렬로 조사하고, 한 번에 답한다.
모든 용건에 답했나요? 담당자에게 필요한 사실이 모두 있나요?

> 노트: 원문 제목: Hand over facts, answer every item (REVIEW). The handoff: Customer ID, root cause, refund amount, recommended action. / Several problems: Split into items, share context, investigate in parallel, answer once. 하단: Every concern answered? Does the person have every fact?

## 52강. 사람에게 에스컬레이션할 때 (`l52`)

52강
사람에게 에스컬레이션할 때
슬라이드 13장

> 노트: 원문: LECTURE 52 · When to Escalate to a Human · 13 slides

### 55. `l52-01`

핸드오프해야 할 때
두 가지 실수 모두 스토어에 손해다
불필요한 핸드오프
80% 목표에서 감점이 된다.
놓친 핸드오프
사람만 결정할 수 있는 일을 에이전트가 결정한다.

> 노트: 원문 제목: Both mistakes cost the store (WHEN TO HAND OFF). An unneeded handoff: It counts against the eighty percent target. / A missed handoff: The agent decides what only a person may decide.

### 56. `l52-02`

현재 상황
쉬운 사례는 올라가고, 위험한 사례는 남는다
문의
핸드오프
[이미지: 노트북으로 채팅하는 고객 일러스트]
고객
사례를 문의함
ShopAssist
첫 문의에서 55% 해결
지원팀
사진이 있는 파손 상품을 넘겨받음
할인 약속
가격 맞춤을 혼자 결정함

> 노트: 원문 제목: Easy cases go up, risky ones stay (WHERE WE ARE). Customers (Write in with cases) → asks → ShopAssist (Resolves 55% at first contact) → handoff → Support team (Gets a damaged item with a photo) / Discount promised (Price match, decided alone). 사진이 있는 파손 상품처럼 쉬운 사례는 사람에게 넘어가고, 가격 맞춤 할인처럼 위험한 결정은 에이전트가 혼자 내리고 있습니다.

### 57. `l52-03`

규칙
인정되는 이유는 세 가지뿐이다
사람을 요청함
명시적인 요청
예외 또는 공백
정책을 굽히거나, 정책에 없음
진전 없음
에이전트가 막힘
사례가 어려워 보여서가 아니라, 실제 이유가 있을 때 에스컬레이션합니다.

> 노트: 원문 제목: Only three reasons count (THE RULE). Asks for a person: An explicit request / Exception or gap: Policy bent, or silent / No progress: The agent is stuck. 하단: Escalate for a real reason, not because a case looks hard.

### 58. `l52-04`

첫 번째 이유: 명시적 요청
사람을 요청하면 바로 넘긴다
고객
ShopAssist
지원팀
“진짜 사람과 이야기하고 싶어요”
사례를 넘김
핸드오프 + 알고 있는 내용
지원팀이 이어받습니다
주문 조회도, 먼저 질문하기도 하지 않습니다. 고객은 이미 결정했습니다.

> 노트: 원문 제목: Asks for a person: hand over now (FIRST REASON: AN EXPLICIT REQUEST). Customer → ShopAssist: I want a real person / ShopAssist → Support team: Hands the case over / Handoff + what it knows / ShopAssist → Customer: Support will take over. 캡션: No order lookup and no questions first - the customer has already decided.

### 59. `l52-05`

사람 요청이 없을 때
고객의 말이 결정한다
작성
[이미지: 노트북으로 채팅하는 고객 일러스트]
Alex
재킷 소매에 구멍
ShopAssist
정책이 다루는 사례
해결
먼저 제안하고, 해결
명시적인 요청이면 바로 에스컬레이션하고, 단순한 문제면 해결합니다.

> 노트: 원문 제목: The customer's words decide (NO REQUEST FOR A PERSON). Alex (Jacket, hole in the sleeve) → writes → ShopAssist (Policy covers this) → Resolved (Offer, then resolve). 하단: An explicit request means escalate now. A straightforward issue means resolve it.

### 60. `l52-06`

두 번째 이유: 예외
예외는 사람에게 간다
Alex
ShopAssist
지원팀
“램프 아직 반품할 수 있나요?”
30일 기한을 설명
“그래도 반품 받아 주세요”
에스컬레이션: 예외
램프는 45일 전에 배송되었고, 스토어는 30일 이내 반품만 받습니다.

> 노트: 원문 제목: Exceptions go to a person (SECOND REASON: EXCEPTIONS). Alex → ShopAssist: Can I still return the lamp? / ShopAssist → Alex: Explains the 30-day window / Alex → ShopAssist: Accept the return anyway / ShopAssist → Support team: Escalate: exception. 캡션: A lamp delivered 45 days ago; the store allows returns within 30 days.

### 61. `l52-07`

두 번째 이유: 공백
정책에 공백이 있으면 에스컬레이션한다
문의
확인
에스컬레이션
[이미지: 노트북으로 채팅하는 고객 일러스트]
고객
헤드폰이 다른 곳에서 30달러 더 쌈
ShopAssist
추측하지 않음
스토어 정책
스토어 자체의 이전 가격만 해당
지원팀
가격 맞춤 여부를 결정

> 노트: 원문 제목: A policy gap means escalate (SECOND REASON: GAPS). Customer (Headphones, 30 dollars less) → asks → ShopAssist (Does not guess) → checks → Store policy (Only the store's own earlier price) / escalate → Support team (Decides on the price match). 정책은 스토어 자체의 이전 가격만 다루므로, 다른 곳 가격에 맞춰 달라는 요청은 정책의 공백입니다.

### 62. `l52-08`

트리거의 정체
복잡하다는 것은 트리거가 아니다
복잡하지만 정책 안
주문 세 건과 파손 상품: 정책이 모든 부분을 다루므로 해결한다.
예외 또는 공백
요청이 정책 밖에 있으므로 에스컬레이션한다.
$500 환불 한도는 코드 속 훅이며, 절대 Claude의 판단에 맡기지 않습니다.

> 노트: 원문 제목: Complex is not a trigger (WHAT THE TRIGGER IS). Complex but covered: Three orders and a damaged item: the policy covers every part, so resolve. / Exception or gap: The request is outside the policy, so escalate. 하단: The five hundred dollar refund limit is a hook in code, never Claude's judgment.

### 63. `l52-09`

세 번째 이유: 진전 없음
진전이 없으면 에스컬레이션한다
조회
핸드오프
ShopAssist
사례가 막힘
[이미지: 서버와 데이터 상자 일러스트]
주문 서비스
시간 초과
지원팀
무엇을 시도했는지 봄

> 노트: 원문 제목: No progress means escalate (THIRD REASON: NO PROGRESS). ShopAssist (Case is stuck) → lookup → Order service (Times out) / handoff → Support team (Sees what was tried).

### 64. `l52-10`

Claude가 트리거를 따르게 하기
“에스컬레이션을 줄여라”보다 기준이 낫다
# Escalation criteria
Escalate immediately when the customer asks for a person.
Escalate when the customer asks for an exception,
or when the policy does not cover the request.
Escalate when you cannot make meaningful progress.
Resolve everything the policy clearly covers,
including damaged items with a photo.
“심각함”이 어디서 시작되는지 Claude가 추측해야 합니다. 명시적인 기준이 그 추측을 없앱니다.

> 노트: 원문 제목: Criteria beat "escalate less" (MAKING CLAUDE FOLLOW THE TRIGGERS). 프롬프트(영문 유지) 의미: 에스컬레이션 기준. 고객이 사람을 요청하면 즉시 에스컬레이션한다. 고객이 예외를 요청하거나 정책이 요청을 다루지 않으면 에스컬레이션한다. 의미 있는 진전을 낼 수 없으면 에스컬레이션한다. 사진이 있는 파손 상품을 포함해, 정책이 분명히 다루는 것은 모두 해결한다. 캡션: Claude has to guess where "serious" begins - explicit criteria remove the guess.

### 65. `l52-11`

few-shot 예시
예시는 추론 방식을 가르친다
# A case that no example showed
Customer: I want to return a gift. I have no receipt.
Decision: escalate
Reason: the policy says nothing about gifts - the same kind of gap.
예시마다 추론이 담겨 있어, Claude가 새로운 사례도 다룰 수 있습니다.

> 노트: 원문 제목: Examples teach the reasoning (FEW-SHOT EXAMPLES). 예시(영문 유지) 의미: 어떤 예시에도 없던 사례. 고객: 선물을 반품하고 싶은데 영수증이 없어요. 결정: 에스컬레이션. 이유: 정책에 선물에 관한 내용이 없음 - 같은 종류의 공백. 캡션: Each example carries its reasoning, so Claude can handle new cases.

### 66. `l52-12`

어디서 시작할까
불분명한 경계부터 고친다
처음부터 하지 않을 것
별도의 분류 모델, 신뢰도 점수, 감정 분석. 모두 원인을 놓친다.
여기서 시작
명시적인 기준과 예시가 불분명한 결정 경계를 고친다.
기준은 판단을 이끌 뿐 아무것도 보장하지 않습니다. 반드시 지켜야 할 규칙은 코드에 둡니다.

> 노트: 원문 제목: Fix the unclear boundary first (WHERE TO START). Not first: A separate sorting model, a confidence score, sentiment analysis. They miss the cause. / Start here: Explicit criteria and examples fix the unclear decision boundaries. 하단: Criteria guide judgment, they guarantee nothing. Rules that must always hold stay in code.

### 67. `l52-13`

기억할 것
실제 이유가 있을 때만 에스컬레이션한다
사람을 요청함
즉시 에스컬레이션, 조사 없이
단순한 문제
해결을 제안
일반 정책 질문
정책에 따라 답변
예외 요청
사람이 결정
공백 또는 진전 없음
에스컬레이션
명시적 기준
예시와 추론을 함께
실제 이유가 있을 때 에스컬레이션하고, 나머지는 모두 해결합니다.

> 노트: 원문 제목: Escalate for a real reason only (WHAT TO REMEMBER). Asks for a person: Escalate now, no investigation / Straightforward issue: Offer to resolve it / Plain policy question: Answer from the policy / Exception request: A person decides / Gap or no progress: Escalate / Explicit criteria: With examples and reasoning. 하단: Escalate for a real reason, and resolve everything else.

## 53강. 에스컬레이션하지 않을 때 (`l53`)

53강
에스컬레이션하지 않을 때
슬라이드 15장

> 노트: 원문: LECTURE 53 · When Not to Escalate · 15 slides

### 69. `l53-01`

이것이 중요한 이유
잘못된 트리거는 80% 목표를 깎는다
잘못된 트리거
비슷해 보이는 신호
급해 보이지만, 실제로는 아님
[이미지: 헤드셋을 쓴 지원팀 담당자 일러스트]
지원팀
해결할 수 있는 사례를 받음
80% 목표
모든 사례가 감점이 됨

> 노트: 원문 제목: False triggers hit the 80% target (WHY THIS MATTERS). Look-alike signal (Looks urgent, is not) → false trigger → Support team (Gets a solvable case) → 80% target (Every case counts against it).

### 70. `l53-02`

과잉 교정
과잉 교정은 역효과를 낸다
현재의 ShopAssist
Agent SDK, 도구 4개, 명확한 기준
해결률 상승
첫 문의 해결이 좋아짐
팀의 과잉 교정
“화남” 규칙, 신뢰도 점수
다시 지원팀으로
단순한 사례가 다시 팀으로 감
말투나 신뢰도가 아니라, 사례가 필요로 하는 것에 따라 에스컬레이션합니다.

> 노트: 원문 제목: Over-correcting backfires (THE OVER-CORRECTION). ShopAssist today: Agent SDK, 4 tools, clear criteria → Resolution rises: First contact improves → Team over-corrects: Angry rule, confidence score → Back to support: Simple cases reach the team again. 하단: Escalate for what the case needs - not for tone or confidence.

### 71. `l53-03`

세 가지 신호
트리거가 아니다. 기껏해야 질문 하나
불만
트리거가 아님
신뢰도 점수
트리거가 아님
여러 건 일치
질문을 할 이유

> 노트: 원문 제목: Not triggers - at most a question (THREE SIGNALS). Frustration: Not a trigger / Confidence score: Not a trigger / Several matches: A reason to ask a question.

### 72. `l53-04`

첫 번째: 불만
몹시 화난 고객, 단순한 사례
[이미지: 고객 일러스트]
화난 고객
두 번째 실망
파손 상품
사진 있음, 반품 기한 내
표준 사례
정책이 다룸

> 노트: 원문 제목: A furious customer, a simple case (1 - FRUSTRATION). Angry customer (Second time let down) → Damaged item (Photo, in return window) → Standard case (Policy covers it).

### 73. `l53-05`

첫 번째: 불만
감정은 엉뚱한 것을 잰다
몹시 화난 고객
단순한 반품일 수 있다.
차분하고 정중한 고객
정책 예외를 요청할 수 있다.
화난 말투로 에스컬레이션하지 말고, 감정 임계값도 추가하지 않습니다.

> 노트: 원문 제목: Sentiment measures the wrong thing (1 - FRUSTRATION). A furious customer: Can have a simple return. / A calm, polite customer: Can ask for a policy exception. 하단: Do not escalate on angry words, and do not add a sentiment threshold.

### 74. `l53-06`

첫 번째: 불만
공감하고, 제안하고, 그다음 에스컬레이션
고객
ShopAssist
지원팀
한 문장 사과
환불 제안
수락
계정 검증, 해결
“아니요. 사람과 이야기할게요”
에스컬레이션 + 완전한 핸드오프
한 번 제안합니다. 고객이 사람을 원한다고 다시 말하면 사례를 넘깁니다.

> 노트: 원문 제목: Acknowledge, offer, then escalate (1 - FRUSTRATION). ShopAssist → Customer: One-sentence apology / Refund offer. Customer → ShopAssist: Accepts → ShopAssist → Customer: Account verified, resolved. (다른 경우) Customer → ShopAssist: No. A person, please → ShopAssist → Support team: Escalate + full handoff. 캡션: Offer once. If the customer repeats the wish for a person, hand the case over.

### 75. `l53-07`

두 번째: 신뢰도 점수
신뢰도 점수는 트리거가 아니다
# A tempting rule - not a good one
SYSTEM += "Rate your confidence from 1 to 10."
score = reply.confidence   # Claude's own opinion
if score < 6:
    escalate_to_human(case)
else:
    send(reply)
점수는 Claude가 자신에 대해 내린 의견일 뿐이며, 캘리브레이션이 잘 되어 있지 않습니다.

> 노트: 원문 제목: A confidence score is no trigger (2 - CONFIDENCE SCORE). 코드(영문 유지) 의미: 솔깃하지만 좋지 않은 규칙. 시스템 프롬프트에 "신뢰도를 1~10으로 평가하라"를 추가하고, 점수(Claude 자신의 의견)가 6 미만이면 사람에게 에스컬레이션, 아니면 답변을 보낸다. 캡션: The score is only Claude's opinion of itself, and it is poorly calibrated.

### 76. `l53-08`

두 번째: 신뢰도 점수
점수는 양쪽으로 다 틀린다
어려운 사례: 가격 맞춤
줄 수 없는 할인을 약속했고, 신뢰도 높았다. 점수는 높음.
쉬운 사례: 파손 상품
점수가 낮게 나올 수 있어, 단순한 사례가 사람에게 간다.
원시 점수는 아무도 검증하지 않습니다. 해결책은 명시적인 기준과 예시입니다.

> 노트: 원문 제목: The score fails both ways (2 - CONFIDENCE SCORE). Hard case: price match: Promised a discount it could not give - and was confident. Score high. / Easy case: damaged item: Score may come out low, so a simple case goes to a person. 하단: A raw score is never checked. The fix: explicit criteria and examples.

### 77. `l53-09`

두 번째: 신뢰도 점수
환불 한도는 훅이 강제한다
ShopAssist
PreToolUse hook
process_refund
escalate_to_human
process_refund $620
거부됨: $500 초과
사례를 넘김
판단에는 명시적인 기준과 예시를 줍니다. 한도는 코드가 매번 강제합니다.

> 노트: 원문 제목: A hook enforces the refund limit (2 - CONFIDENCE SCORE). ShopAssist → PreToolUse hook: process_refund $620 / hook → ShopAssist: denied: over $500 / hook → escalate_to_human: case handed over. 캡션: Judgment gets explicit criteria and examples. The limit is enforced in code, every time.

### 78. `l53-10`

세 번째: 여러 건 일치
Alex가 두 명, 그래서 주문 작업은 없다
고객
ShopAssist
get_customer
“Alex입니다. 재킷 반품해 주세요”
name: Alex
고객 2명이 일치
검증된 고객 칸은 비어 있음
이메일도 주문 번호도 없으니, 아직 어떤 주문 작업도 실행할 수 없습니다.

> 노트: 원문 제목: Two Alexes, so no order action (3 - SEVERAL MATCHES). Customer → ShopAssist: Alex: return my jacket / ShopAssist → get_customer: name: Alex / get_customer → ShopAssist: 2 customers match / ShopAssist: verified slot stays empty. 캡션: No email, no order number - no order action can run yet.

### 79. `l53-11`

세 번째: 여러 건 일치
추측도 에스컬레이션도 답이 아니다
가장 최근 주문
추측
목록의 첫 번째
추측
에스컬레이션
틀림: 사례는 단순하다
잘못된 추측은 다른 사람의 주문을 열어 버립니다. 이 사례에 필요한 것은 사실 하나뿐입니다.

> 노트: 원문 제목: Guessing and escalating both fail (3 - SEVERAL MATCHES). Most recent order: A guess / First in the list: A guess / Escalate: Wrong: the case is simple. 하단: A wrong guess opens another person's orders. The case only needs one more fact.

### 80. `l53-12`

세 번째: 여러 건 일치
식별자를 하나 더 요청한다
고객
ShopAssist
get_customer
“이메일이나 주문 번호를 알려 주시겠어요?”
alex@example.com
email: alex@example.com
검증된 고객 1명
사례는 계속 진행됩니다. 에스컬레이션은 필요 없습니다.

> 노트: 원문 제목: Ask for one more identifier (3 - SEVERAL MATCHES). ShopAssist → Customer: Email or order number? / Customer → ShopAssist: alex@example.com / ShopAssist → get_customer: email: alex@example.com / get_customer → ShopAssist: 1 verified customer. 캡션: The case continues - no escalation needed.

### 81. `l53-13`

규칙 적어 두기
규칙을 두 곳에 적는다
시스템 프롬프트
에스컬레이션 기준과 짧은 예시 하나.
get_customer 설명
같은 규칙을 도구 바로 옆에.
여러 건이 일치하면 이메일, 전화번호 또는 주문 번호를 묻습니다. 절대 직접 고르지 않습니다.

> 노트: 원문 제목: Write the rule in two places (WRITING IT DOWN). The system prompt: Escalation criteria, with one short example. / The get_customer description: The same rule, right next to the tool. 하단: Several matches: ask for an email, phone number or order number. Never choose one yourself.

### 82. `l53-14`

정리
화난 말투와 점수는 트리거가 아니다
고객의 화
공감하고, 제안하고, 다시 요청하면 에스컬레이션
신뢰도 점수
확신하면서도 틀릴 수 있음
환불 한도
코드 속 훅이 결정
여러 건 일치
다른 식별자를 요청

> 노트: 원문 제목: Anger and scores are not triggers (RECAP). Customer anger: Acknowledge, offer, escalate on repeat / Confidence score: Can be confident and wrong / Refund limit: A hook in code decides / Several matches: Ask for another identifier.

### 83. `l53-15`

핸드오프하기 전 매번
물어라: 사람이 필요한가, 사실 하나가 더 필요한가?
사람이 필요하다
사례가 정말로 사람의 판단이나 권한을 요구한다.
사실 하나가 더 필요하다
고객에게 묻고, 계속 진행한다.
다음: 긴 대화, 그리고 사례의 사실을 정확하게 유지하기.

> 노트: 원문 제목: Ask: a person, or one more fact? (BEFORE EVERY HANDOFF). It needs a person: The case really calls for human judgment or authority. / It needs one more fact: Ask the customer, then carry on. 하단: Next: long conversations, and keeping the facts of a case correct.

## 54강. 긴 대화 속 케이스 정보 (`l54`)

54강
긴 대화 속 케이스 정보
슬라이드 11장

> 노트: 원문: LECTURE 54 · Case Facts in Long Conversations · 11 slides

### 85. `l54-01`

긴 대화
숫자 하나를 잃으면, 환불 하나가 틀린다
ShopAssist
Agent SDK, 도구 4개
Claude
대화 전체를 읽음

> 노트: 원문 제목: One lost number, one wrong refund (LONG CONVERSATIONS). ShopAssist (Agent SDK, four tools) → Claude (Reads the whole chat).

### 86. `l54-02`

점진적 요약
요약이 다시 요약된다
메시지 40개 이상
지금까지의 대화 전체
요약 1
오래된 메시지를 대체
요약 2
요약 1 + 새 메시지
요약 3
요약 2 + 새 메시지
요약의 요약이 계속 반복됩니다. 이것이 점진적 요약입니다.

> 노트: 원문 제목: Summaries get summarized again (PROGRESSIVE SUMMARIZATION). 40+ messages: The whole chat so far → Summary 1: Replaces the older messages → Summary 2: Summary 1 plus newer messages → Summary 3: Summary 2 plus newer messages. 하단: Summaries of summaries, again and again: progressive summarization.

### 87. `l54-03`

Alex의 사례
Alex의 사례: 문제 둘, 대화 하나
[이미지: 노트북으로 채팅하는 고객 일러스트]
Alex
이중 결제, 재킷
ShopAssist
사례를 처리
주문 시스템
배송 날짜

> 노트: 원문 제목: Alex's case: two issues, one chat (ALEX'S CASE). Alex (Double charge, jacket) → ShopAssist (Handles the case) → Order system (Delivery date).

### 88. `l54-04`

요약 세 번 후
요약이 사실을 지운다
Alex가 말한 것
$120 이중 결제. 실제 배송 날짜. 스토어 크레딧이 아닌 카드로 환불.
기록에 남은 것
“고객은 약 100달러의 결제 문제가 있고, 최근 산 재킷을 반품하고 싶어 함.”
대화는 데이터베이스가 아닙니다. 정확한 사실을 요약 안에만 두어서는 안 됩니다.

> 노트: 원문 제목: Summaries erase the facts (THREE SUMMARIES LATER). What Alex told us: $120 charged twice. A real delivery date. Refund to his card, not store credit. / What the history says: "Customer has a billing problem of about a hundred dollars and wants to return a recent jacket." 하단: The conversation is not your database: exact facts must never live only in a summary.

### 89. `l54-05`

오늘의 계획
정확한 사실을 위한 세 가지 아이디어
사실을 잃는 이유
요약은 정확한 값을 버린다
케이스 정보 블록
요약 밖에 둔 정확한 사실
문제별 항목
문제를 서로 분리

> 노트: 원문 제목: Three ideas for exact facts (TODAY'S PLAN). Why facts get lost: Summaries drop exact values / Case facts block: Exact facts outside the summary / Entry per issue: Keep issues apart.

### 90. `l54-06`

첫 번째: 요약이 사실을 잃는 이유
짧아진 글은 정확한 값을 버린다
금액
“$120”이 “약”이 된다
비율
“40%”가 “대부분”이 된다
날짜
날짜가 “최근”이 된다
기대
“카드로 환불”이 “불만”이 된다
더 신중하게 요약해도 소용없습니다. 글을 짧게 만드는 것 자체가 사실을 잃는 방식입니다.

> 노트: 원문 제목: Shorter text drops exact values (1 - WHY SUMMARIES LOSE FACTS). Amounts: "$120" becomes "about" / Percentages: "40%" becomes "most" / Dates: A date becomes "recently" / Expectations: "Refund to card" becomes "unhappy". 하단: A more careful summary does not help: making text shorter is how facts get lost.

### 91. `l54-07`

두 번째: 케이스 정보 블록
코드가 사실을 블록에 기록한다
도구 결과
금액, 날짜, 상태
고객의 말
요청한 내용
우리 코드
사실을 기록함
케이스 정보 블록
정확하고 구조화됨

> 노트: 원문 제목: Code writes facts into a block (2 - THE CASE FACTS BLOCK). Tool results (amount, date, status) + Customer's words (what they asked for) → Our code (writes the facts) → Case facts block (exact, structured).

### 92. `l54-08`

두 번째: 케이스 정보 블록
블록은 모든 요청에 들어간다
케이스 정보 블록
절대 요약하지 않음
짧은 요약
필요한 만큼 짧게
최신 메시지
가장 최근 대화 차례
모든 요청
사실은 별도 섹션에
Claude
$120, 실제 날짜, 카드로 환불

> 노트: 원문 제목: The block goes in every request (2 - THE CASE FACTS BLOCK). Case facts block (never summarized) + Short summary (as short as needed) + Newest messages (the latest turns) → Every request (facts in own section) → Claude ($120, real date, refund to card).

### 93. `l54-09`

세 번째: 문제마다 항목 하나
문제마다 자기 항목을 갖는다
[
  {
    "issue": "double charge", "order": "ORD-20417", "amount": 120.00,
    "status": "refunded", "refund_id": "RF-9031", "next": "none"
  },
  {
    "issue": "jacket return", "order": "ORD-20388",
    "status": "open", "next": "send return label"
  }
]
예시 형태입니다. 문제마다 항목이 하나이므로, 헤드폰 금액이 재킷과 섞이지 않습니다.

> 노트: 원문 제목: Each issue gets its own entry (3 - ONE ENTRY FOR EACH ISSUE). JSON(영문 유지) 의미: 이중 결제 문제(주문 ORD-20417, 금액 120.00, 상태 환불 완료, 환불 ID RF-9031, 다음 단계 없음)와 재킷 반품 문제(주문 ORD-20388, 상태 진행 중, 다음 단계 반품 라벨 발송)를 별도 항목으로 둔다. 캡션: An illustrative shape: one entry per issue, so the headphones amount never mixes with the jacket.

### 94. `l54-10`

기억할 것
사실은 요약 밖에 둔다
두 개의 층
요약은 이야기를 담고, 문제별 항목은 사실을 담습니다.
요약은 정확한 값을 모호한 말로 바꾼다
표현을 다듬은 요약으로는 해결되지 않는다
케이스 정보 블록: 요약 밖에, 모든 요청에
문제가 여럿이면: 항목마다 주문, 금액, 상태를 따로

> 노트: 원문 제목: Keep facts outside the summary (WHAT TO REMEMBER). Two layers: The summary keeps the story. The issue entries keep the facts. / Summaries turn exact values into vague words / A better-worded summary does not fix it / Case facts block: outside the summary, in every request / Several issues: one entry each, with order, amount, status.

### 95. `l54-11`

요약하면
요약은 이야기, 블록은 숫자
요약
대화의 흐름을 담는다.
케이스 정보 블록
숫자, 날짜, 약속을 담는다.
지원 사례에서 이런 세부 사항은 사소하지 않습니다. 그것이 곧 사례입니다.

> 노트: 원문 제목: Summary: story. Block: numbers. (IN SHORT). The summary: Keeps the story of the conversation. / The case facts block: Keeps the numbers, dates and promises. 하단: In a support case, those details are not small. They are the case.

## 55강. 도구 결과 줄이기와 Lost in the Middle (`l55`)

55강
도구 결과 줄이기와 Lost in the Middle
슬라이드 9장

> 노트: 원문: LECTURE 55 · Trimming Tool Results and Lost in the Middle · 9 slides

### 97. `l55-01`

컨텍스트 크기가 중요한 이유
긴 컨텍스트는 비용이 들고 사실을 숨긴다
비용이 늘어난다
요청할 때마다 컨텍스트 전체 비용을 다시 낸다.
사실이 묻힌다
중요한 사실이 그 안에 가라앉을 수 있다.
도구 결과가 나올 때마다 컨텍스트는 계속 커집니다.

> 노트: 원문 제목: A long context costs and hides (WHY CONTEXT SIZE MATTERS). It costs more: Every request pays for the whole context again. / Facts get lost: The facts that matter can sink inside it. 하단: The context still grows with every tool result.

### 98. `l55-02`

문제
조회할 때마다 필드가 40개 이상 늘어난다
lookup_order
ShopAssist 앱
lookup_order 호출
[이미지: 서버와 데이터 상자 일러스트]
주문 서비스
주문당 필드 40개 이상
대화
결과 전체를 받음
중요한 필드 5개
나머지는 노이즈

> 노트: 원문 제목: Each lookup adds 40+ fields (THE PROBLEM). ShopAssist app (Calls lookup_order) → lookup_order → Order service (40+ fields per order). ShopAssist app → Conversation (Gets the whole result). 5 fields matter (The rest is noise).

### 99. `l55-03`

Alex의 사례
노이즈 비용은 라운드마다 다시 낸다
ShopAssist 앱
주문 서비스
Claude
lookup_order x3
40+ fields each
history: 120+ fields
reply
same history again
컨텍스트는 작게 유지하고, 가장 중요한 것은 Claude가 가장 잘 읽는 곳에 둡니다.

> 노트: 원문 제목: Noise is paid for in every round (ALEX'S CASE). ShopAssist app → Order service: lookup_order x3 / Order service → app: 40+ fields each / app → Claude: history: 120+ fields / Claude → app: reply / app → Claude: same history again. 메시지 라벨 의미: lookup_order 3회, 각각 필드 40개 이상, 기록: 필드 120개 이상, 응답, 같은 기록을 다시. 캡션: Keep the context small, and put what matters most where Claude reads best.

### 100. `l55-04`

습관 1/2
모든 결과를 코드에서 줄인다
[이미지: 서버와 데이터 상자 일러스트]
주문 서비스
필드 40개 이상
우리 코드
결과마다 줄임
Claude
필드 5개만 받음

> 노트: 원문 제목: Trim every result in code (HABIT 1 OF 2). Order service (40+ fields) → Our code (Trims each result) → Claude (Gets only 5 fields).

### 101. `l55-05`

실제로 줄이기
줄이기는 필드를 버릴 뿐, 값을 바꾸지 않는다
KEEP = ["status", "items", "amount", "delivered_on", "return_window"]
def post_tool_use(result):
    result = plain_words(result)
    return {k: result[k] for k in KEEP}
PostToolUse 훅의 스케치입니다. 줄여도 모든 값은 그대로이고, 이번 결정에 쓰지 않는 것만 버립니다.

> 노트: 원문 제목: Trimming drops fields, not values (TRIMMING IN PRACTICE). 코드(영문 유지) 의미: 남길 필드(status, items, amount, delivered_on, return_window)를 정하고, post_tool_use에서 결과를 평이한 표현으로 바꾼 뒤 그 필드만 돌려준다. 캡션: A sketch of a PostToolUse hook: trimming leaves every value unchanged and only drops what this decision does not use.

### 102. `l55-06`

습관 2: 위치
모델은 입력의 중간을 놓친다
시작 부분
안정적으로 읽힘
중간 부분
더 자주 놓침
끝부분
안정적으로 읽힘

> 노트: 원문 제목: Models miss the middle of input (HABIT 2: POSITION). The beginning: Read reliably → The middle: Missed more often → The end: Read reliably.

### 103. `l55-07`

Lost in the Middle
핵심 사실이 중간에 가라앉을 수 있다
케이스 정보
정확한 금액, 날짜
주문 결과 3건
조회 세 번
핵심 사실
여기서는 놓치기 쉬움
정책 페이지 2개
적용할 규칙
최근 메시지
가장 최근 대화 차례
컨텍스트 창을 늘려도 해결되지 않습니다. 중간이 더 길어질 뿐입니다.

> 노트: 원문 제목: A key fact can sink in the middle (LOST IN THE MIDDLE). Case facts: Exact amounts, dates / 3 order results: Three lookups / The key fact: Easy to miss here / 2 policy pages: Rules to apply / Recent messages: The latest turns. 하단: A larger context window does not fix this - it only makes the middle longer.

### 104. `l55-08`

입력을 의도적으로 배치하기
핵심 결과는 맨 앞에, 작업은 맨 뒤에
## Key findings
- Jacket: delivered 20 days ago, inside the return window
- Headphones: charged twice, extra $120
## Order: jacket
## Order: headphones
## Return policy
## Task
Decide the next step for Alex's return and refund.
가장 중요한 부분은 양 끝에, 긴 세부 내용은 명확한 제목 아래 중간에 둡니다.

> 노트: 원문 제목: Key findings first, the task last (ARRANGE THE INPUT ON PURPOSE). 입력(영문 유지) 의미: 핵심 결과 - 재킷: 20일 전 배송, 반품 기한 내 / 헤드폰: 이중 결제, 추가 $120. 이어서 재킷 주문, 헤드폰 주문, 반품 정책 섹션. 작업: Alex의 반품과 환불에 대한 다음 단계를 결정하라. 캡션: The most important parts sit at the two ends; the long details sit in the middle, under clear headers.

### 105. `l55-09`

정리
읽을 것은 적게, 사실은 양 끝에
결과가 쌓인다
조회당 필드 40개 이상
코드에서 줄이기
결과가 들어가기 전에
양 끝이 잘 읽힌다
중간은 놓칠 수 있음
요약을 먼저
제목, 그다음 작업
Claude가 읽을 양을 줄이고, 가장 중요한 사실은 가장 잘 읽는 곳에 둡니다.

> 노트: 원문 제목: Less to read, facts at the ends (RECAP). Results pile up: 40+ fields per lookup / Trim in code: Before the result enters / Ends read best: The middle can be missed / Summary first: Headers, then the task. 하단: Give Claude less to read, and put the most important facts where it reads best.

## 56강. 지원 사례: 코드와 도구 (`l56`)

56강
지원 사례: 코드와 도구
슬라이드 13장

> 노트: 원문: LECTURE 56 · Support Case: Code and Tools · 13 slides

### 107. `l56-01`

시험 시나리오: 지원 에이전트
올바른 해결책, 올바른 층
코드에서
매번 지켜야 하는 규칙.
도구 설명에서
Claude가 어떤 도구를 고르는지.
오답은 흔히 올바른 해결책을 잘못된 층에 둡니다.

> 노트: 원문 제목: Right fix, right layer (EXAM SCENARIO: SUPPORT AGENT). In code: Rules that must hold every time. / In a tool description: Which tool Claude picks. 하단: Wrong answers often put the right fix in the wrong layer.

### 108. `l56-02`

첫 번째 결정
신원 확인을 건너뛴 호출
고객
ShopAssist
주문 백엔드
“ORD-1042는 어디 있나요?”
lookup_order(ORD-1042)
다른 계정의 주문
주문 상세
그 호출에 쓰인 고객 ID는 어떤 신원 확인도 거치지 않은 것이었습니다.

> 노트: 원문 제목: A call skipped the identity check (FIRST DECISION). Customer → ShopAssist: Where is ORD-1042? / ShopAssist → Order backend: lookup_order(ORD-1042) / Order backend → ShopAssist: belongs to another account / ShopAssist → Customer: order details. 하단: The customer ID in that call came from no identity check.

### 109. `l56-03`

첫 번째 결정
프롬프트 한 줄은 보장이 아니다
규칙에 필요한 것
$500 초과 환불은 사람에게. 데이터와 돈: 매번 지켜져야 한다.
더 강한 프롬프트 문장
“You MUST call get_customer before any order action.” Claude는 대부분 따른다.
“대부분”이 바로 이 로그를 만들어 냈습니다.

> 노트: 원문 제목: A prompt line is not a guarantee (FIRST DECISION). What the rule needs: Refunds above $500 go to a person. Data and money: it must hold every time. / A stronger prompt line: "You MUST call get_customer before any order action." Claude follows it most of the time. (프롬프트 의미: 어떤 주문 작업보다 먼저 반드시 get_customer를 호출하라.) 하단: "Most of the time" is what produced these logs.

### 110. `l56-04`

첫 번째 결정
코드 게이트가 순서를 강제한다
Claude
사전 조건 게이트
도구
lookup_order(ORD-1042)
error: verify customer first
get_customer(email)
CUS-1001 verified
lookup_order(CUS-1001)
허용됨
프롬프트는 안내하고, 코드는 강제합니다.

> 노트: 원문 제목: A code gate enforces the order (FIRST DECISION). Claude → Prerequisite gate: lookup_order(ORD-1042) / gate → Claude: error: verify customer first (먼저 고객을 검증하라) / Claude → gate: get_customer(email) / gate → Claude: CUS-1001 verified (검증됨) / Claude → gate: lookup_order(CUS-1001) / gate → Tools: allowed. 캡션: The prompt guides, the code enforces.

### 111. `l56-05`

두 번째 결정
상태 질문이 환불을 호출했다
고객
ShopAssist
주문 백엔드
“램프 아직 반품할 수 있나요?”
process_refund(lamp)
거부됨: 반품 기한 밖
같은 호출, 기한 내 주문
실제 환불이 시작됨
반품 관련 질문 약 20건 중 1건꼴로 일어납니다.

> 노트: 원문 제목: A status question called a refund (SECOND DECISION). Customer → ShopAssist: Can I still return the lamp? / ShopAssist → Order backend: process_refund(lamp) / backend → ShopAssist: refused: outside window / ShopAssist → backend: same call, order in window / backend → ShopAssist: real refund started. 캡션: About one question in twenty about returns.

### 112. `l56-06`

두 번째 결정
모호한 설명이 Claude를 오도한다
Claude
도구를 고름
process_refund
환불을 처리함.
lookup_order
주문 상세를 가져옴.
few-shot 예시는 토큰만 늘리고 원인은 그대로 둡니다.

> 노트: 원문 제목: Vague descriptions mislead Claude (SECOND DECISION). Claude (Picks a tool) → process_refund (Handles refunds.) / lookup_order (Gets order details.). 하단: Few-shot examples add tokens and leave the cause in place.

### 113. `l56-07`

두 번째 결정
설명에 인접 도구를 적는다
process_refund:
  Sends money to the customer.
  Never a status check.
  Runs only when the customer asked for a
  refund and the order qualifies.
  For order questions, use lookup_order.
lookup_order:
  Returns status, items, amounts, return window.
  Use for any question about whether an order
  can still be returned or refunded.
  To send a refund, use process_refund.
각 설명은 도구가 하는 일과, 언제 대신 인접 도구를 써야 하는지를 말합니다.

> 노트: 원문 제목: Descriptions name the neighbor (SECOND DECISION). 설명(영문 유지) 의미: process_refund - 고객에게 돈을 보낸다. 상태 확인용이 절대 아니다. 고객이 환불을 요청했고 주문이 조건을 충족할 때만 실행한다. 주문 질문에는 lookup_order를 쓴다. / lookup_order - 상태, 품목, 금액, 반품 기한을 돌려준다. 주문을 아직 반품하거나 환불할 수 있는지에 관한 모든 질문에 쓴다. 환불을 보내려면 process_refund를 쓴다. 캡션: Each description says what the tool does and when to use its neighbor instead.

### 114. `l56-08`

두 번째 결정
키워드가 엉뚱한 도구를 끌어올 수 있다
SYSTEM = """
When the customer asks for money back
and the order qualifies, use process_refund.
When the question is about the return
window, use lookup_order.
"""
도구를 잘못 고르나요? 먼저 설명을 고치고, 그다음 프롬프트에 키워드 트리거가 있는지 확인합니다.

> 노트: 원문 제목: Keywords can pull the wrong tool (SECOND DECISION). 프롬프트(영문 유지) 의미: 고객이 돈을 돌려 달라고 하고 주문이 조건을 충족하면 process_refund를 쓴다. 질문이 반품 기한에 관한 것이면 lookup_order를 쓴다. 캡션: Wrong tool? Fix the descriptions first, then check the prompt for keyword triggers.

### 115. `l56-09`

세 번째 결정
$640는 $500 한도를 넘는다
스피커 + 헤드폰
주문 합계 $640
ShopAssist
주문이 조건 충족
process_refund
한도: $500
돈 한도에는 보장이 필요합니다. 프롬프트 규칙은 대부분의 경우에만 통합니다.

> 노트: 원문 제목: $640 breaks the $500 limit (THIRD DECISION). Speaker + headphones (Order total $640) → ShopAssist (Order qualifies) → process_refund (Limit: $500). 하단: A money limit needs a guarantee - a prompt rule works only most of the time.

### 116. `l56-10`

세 번째 결정
훅이 호출을 막는다
Claude
PreToolUse hook
process_refund
process_refund(640.00)
차단됨: $500 초과, 에스컬레이션
훅은 모든 환불 호출을 실행 전에 봅니다.

> 노트: 원문 제목: A hook blocks the call (THIRD DECISION). Claude → PreToolUse hook: process_refund(640.00) / hook → Claude: blocked: over $500, escalate. 캡션: The hook sees every refund call before it runs.

### 117. `l56-11`

세 번째 결정
핸드오프가 사례를 실어 나른다
{
  "tool": "escalate_to_human",
  "handoff": {
    "customer_id": "CUS-1001",
    "root_cause": "refund above the $500 limit",
    "refund_amount": 640.00,
    "recommended_action": "review and approve"
  }
}
담당자는 대화를 볼 수 없습니다. 이 네 필드가 담당자가 가진 전부입니다.

> 노트: 원문 제목: The handoff carries the case (THIRD DECISION). JSON(영문 유지) 의미: escalate_to_human 도구로 핸드오프하며, 고객 ID CUS-1001, 근본 원인 "$500 한도를 넘는 환불", 환불 금액 640.00, 권장 조치 "검토 후 승인"을 담는다. 캡션: The person cannot see the chat: these four fields are everything they have.

### 118. `l56-12`

핵심 포인트
세 가지 실패, 세 가지 해결책
단계의 순서
더 강한 문구가 아니라 사전 조건 게이트
잘못된 도구
설명이 먼저, 그다음 프롬프트 키워드
호출 하나의 한도
PreToolUse 훅, 그다음 에스컬레이션
few-shot 예시와 더 강한 지침은 원인을 그대로 둡니다.

> 노트: 원문 제목: Three failures, three fixes (MAIN POINTS). Order of steps: Prerequisite gate, not stronger wording / Wrong tool: Descriptions first, then prompt keywords / Limit on one call: PreToolUse hook, then escalate. 하단: Few-shot examples and louder instructions leave the cause in place.

### 119. `l56-13`

개발자 생산성 시나리오
모든 실패를 층별로 분류한다
에이전트
검색이 필요함
Grep
내장 검색 도구
MCP 검색 도구
더 강력함
반드시 지켜야 할 것은 코드로. 도구를 잘못 고르면 설명부터.

> 노트: 원문 제목: Sort every failure by layer (DEVELOPER PRODUCTIVITY SCENARIO). Agent (Needs to search) → Grep (Built-in search tool) / MCP search tool (More capable). 하단: Must always hold: code. Wrong tool: descriptions first.

## 57강. 지원 사례: 에스컬레이션 판단 (`l57`)

57강
지원 사례: 에스컬레이션 판단
슬라이드 13장

> 노트: 원문: LECTURE 57 · Support Case: Escalation Calls · 13 slides

### 121. `l57-01`

체크포인트 2
내려야 할 세 가지 판단
해결
ShopAssist가 스스로 끝내는 사례
핸드오프
사람에게 가는 사례
사실 유지
긴 사례를 정확하게 유지하는 법
여기서 오답은 신중해 보이지만, 스토어의 목표를 깎아 먹습니다.

> 노트: 원문 제목: Three judgment calls to make (CHECKPOINT 2). Resolve: Which cases ShopAssist closes itself / Hand over: Which cases go to a person / Keep facts: How a long case stays exact. 하단: The wrong answers here sound careful - and cost the store its target.

### 122. `l57-02`

어느 오후의 로그
두 가지 실패가 같은 목표를 깎는다
[이미지: 헤드셋을 쓴 지원팀 담당자 일러스트]
지원팀
로그를 읽음
불필요한 핸드오프
배송 날짜만 필요했음
지어낸 할인
어떤 스토어 정책도 허용하지 않음
목표 미달
첫 문의 해결 80% 이상

> 노트: 원문 제목: Two failures hit the same target (ONE AFTERNOON OF LOGS). Support team (Reads the logs) → Needless handoff (Only needed a delivery date) / Invented discount (No store policy allows it) → Target missed (80%+ first-contact resolution).

### 123. `l57-03`

첫 번째 결정
두 사례, 서로 다른 필요
status
[이미지: 고객 일러스트]
화난 고객
세 번째 문의
lookup_order
배송됨, 택배사의 새 날짜
차분한 고객
다른 스토어가 $30 더 쌈

> 노트: 원문 제목: Two cases, two different needs (FIRST DECISION). Angry customer (Third time asking) → status → lookup_order (Shipped, new date from carrier). Calm customer (Another shop is $30 cheaper).

### 124. `l57-04`

잘못된 두 가지 접근
두 지름길 모두 목표를 빗나간다
화난 고객을 에스컬레이션
화는 감정을 보여 줄 뿐, 사례가 얼마나 어려운지는 보여 주지 않는다. 날짜는 이미 주문 정보에 있었다.
안전하게 둘 다 에스컬레이션
불필요한 핸드오프는 모두 80% 목표에서 감점이 되고, 팀의 대기열을 채운다.
진짜 에스컬레이션은 차분한 고객 쪽입니다. 정책에 가격 맞춤에 관한 내용이 없습니다.

> 노트: 원문 제목: Both shortcuts miss the target (TWO WRONG APPROACHES). Escalate the angry one: Anger shows a feeling, not how hard the case is. The date was already in the order. / Escalate both to be safe: Every needless handoff counts against the 80% target and fills the team's queue. 하단: The calm case is the real escalation: the policy says nothing about price match.

### 125. `l57-05`

가장 좋은 선택
하나는 해결하고, 다른 하나는 에스컬레이션한다
[이미지: 고객 일러스트]
화난 고객
커피 머신 배송 지연
ShopAssist
차분하고 구체적인 답변
주문
새 배송 날짜
지원팀
구조화된 핸드오프를 받음

> 노트: 원문 제목: Resolve one, escalate the other (THE BEST MOVE). Angry customer (Coffee machine is late) → ShopAssist (Calm, specific answers) → Order (New delivery date) / Support team (Gets a structured handoff).

### 126. `l57-06`

두 가지 사례 더
말투가 아니라 필요에 따라 에스컬레이션한다
“사람과 이야기하고 싶어요”
조회 없이 즉시 넘긴다.
Alex Kim이라는 고객이 두 명
에스컬레이션도 추측도 없이, 이메일이나 주문 번호를 묻는다.
고객의 말투가 아니라, 사례가 필요로 하는 것에 따라 에스컬레이션합니다.

> 노트: 원문 제목: Escalate for need, not for tone (TWO MORE CASES). "I want a person": Hand over at once, with no lookup first. / Two customers named Alex Kim: No escalation, no guess: ask for an email or an order number. 하단: Escalate for what the case needs, not for how the customer sounds.

### 127. `l57-07`

두 번째 결정, 첫 번째 선택
두 문제를 한 번에 처리한다
Claude
애플리케이션
백엔드
get_customer, once
2 x lookup_order
process_refund: jacket
process_refund: lamp
is_error: business, no retry
고객에게 보여도 되는 메시지
Alex의 메시지 하나: 재킷은 사이즈가 맞지 않고, 램프도 반품하고 싶다.

> 노트: 원문 제목: Two issues, handled in one pass (SECOND DECISION, FIRST MOVE). Claude → Application: get_customer, once (한 번) / 2 x lookup_order (2회) / Application → Backend: process_refund: jacket / process_refund: lamp / Backend → Application: is_error: business, no retry (비즈니스 오류, 재시도 없음) / Application → Claude: customer-safe message. 캡션: Alex's one message: the jacket is the wrong size, and the lamp should go back too.

### 128. `l57-08`

잘못된 두 가지 접근
재시도도, 에스컬레이션도 아니다
환불 재시도
스토어 규칙이 거절했고, 램프는 내일도 여전히 기한 밖이다. 재시도할 때마다 루프가 한도에 가까워진다.
램프 에스컬레이션
Alex는 정책이 답하는 질문을 했다. 예외를 요청하지 않았다.

> 노트: 원문 제목: Neither retry nor escalate (TWO WRONG APPROACHES). Retry the refund: A store rule said no, and the lamp is still outside the window tomorrow. Each retry pushes the loop toward its cap. / Escalate the lamp: Alex asked a question the policy answers. He did not ask for an exception.

### 129. `l57-09`

가장 좋은 선택
한 번 답하고, 예외는 에스컬레이션한다
Alex · ShopAssist 채팅
DEMO
재킷 사이즈가 맞지 않으니 환불해 주세요. 램프도 반품하고 싶어요.
• 재킷 환불이 진행 중입니다.
• 램프는 반품 기한이 지났습니다. 배송된 지 30일이 넘었습니다.
그래도 램프를 받아 주실 수 있나요?
그래도 램프를 받는 것은 예외이므로, 요청을 동료에게 전달하겠습니다.
Claude에게 답장…
비즈니스 오류에는 재시도가 아니라 답변을 합니다.

> 노트: 원문 제목: Answer once, escalate exceptions (THE BEST MOVE). 채팅 예시(원문): Alex: My jacket is the wrong size, so please refund it. I also want to return the lamp. / ShopAssist: Your jacket refund is on its way. The lamp is outside the return window: it was delivered more than 30 days ago. / Alex: Can you take the lamp back anyway? / ShopAssist: Taking the lamp back anyway is an exception, so I am passing your request to a colleague. 캡션: A business error gets an answer, not a retry.

### 130. `l57-10`

두 번째 선택
요약은 정확한 사실을 버린다
[이미지: 노트북으로 채팅하는 고객 일러스트]
Alex
카드로 환불을 원함
기록
메시지 20개, 이후 요약
ShopAssist
카드? 스토어 크레딧?

> 노트: 원문 제목: Summaries drop the exact facts (SECOND MOVE). Alex (Wants the refund on his card) → History (20 messages, then summaries) → ShopAssist (Card or store credit?).

### 131. `l57-11`

코드로 만드는 보장
숫자는 요약 밖에 둔다
case_facts:
  - issue: jacket
    amount: 89.00
    refund_id: REF-4417
    status: refunded
    refund_to: card
  - issue: lamp
    refund: refused
    reason: outside return window
    customer_told: true
요약은 이야기를 담고, 케이스 정보 블록은 숫자를 담습니다.

> 노트: 원문 제목: Keep numbers outside the summary (A GUARANTEE IN CODE). 코드(영문 유지) 의미: case_facts - 재킷(금액 89.00, 환불 ID REF-4417, 상태 환불 완료, 환불 수단 카드), 램프(환불 거절, 사유 반품 기한 밖, 고객에게 안내함). 캡션: The summary keeps the story, and the case-facts block keeps the numbers.

### 132. `l57-12`

핵심 포인트
판단을 위한 다섯 가지 규칙
필요할 때 에스컬레이션
요청, 정책 공백, 예외. 화는 절대 아님
먼저 공감
해결하고, 다시 요청하면 에스컬레이션
식별자 요청
여러 건 일치: 다른 식별자
재시도 없이 답변
비즈니스 오류는 최종
정확한 사실 유지
케이스 정보 블록, 문제마다 항목 하나

> 노트: 원문 제목: Five rules for judgment calls (MAIN POINTS). Escalate on need: Request, policy gap, exception - never anger / Acknowledge first: Resolve it; escalate if asked again / Ask for an ID: Several matches: another identifier / Answer, no retry: A business error is final / Keep exact facts: Case-facts block, one entry per issue.

### 133. `l57-13`

다른 곳의 같은 규칙
실제 사실이 다음 단계를 정한다
검색 서브에이전트
시간 초과인가, 결과 없음인가?
코디네이터
실패 유형이 필요함
구조화된 결과
정확함, 출처, 날짜

> 노트: 원문 제목: Real facts decide the next step (THE SAME RULE ELSEWHERE). Search subagent (Timed out or found nothing?) → Coordinator (Needs the failure type) → Structured result (Exact, sourced, dated).
