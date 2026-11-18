# CCAR-F 섹션 5. 도구, MCP, 에이전트 루프 (한국어판)

원본 아티팩트: https://claude.ai/artifact/Qan1cM7ncgxwEP5NXr7pLK

슬라이드 HTML(`slides/`)에서 화면 글자와 발표자 노트(`<aside>`, 영어 원문)를 뽑은 텍스트다. 자동 생성 파일이므로 고칠 때는 슬라이드 HTML을 기준으로 한다.

## 표지 (`cover`)

슬라이드
Claude Certified Architect – Foundations:
전체 강좌
섹션 5. 도구, MCP, 에이전트 루프
38~46강, 슬라이드 80장

> 노트: 원문: Claude Certified Architect Foundations: Complete Course / Section 5. Tools, MCP, and Agentic Loop / Lectures 38-46, 80 slides. 원문에는 40, 45강이 없습니다.

## 38강. stop_reason으로 도는 에이전트 루프 (`l38`)

38강
stop_reason으로 도는 에이전트 루프
슬라이드 14장

> 노트: 원문: LECTURE 38 · The Agentic Loop on stop_reason · 14 slides

### 3. `l38-01`

에이전트 루프
도구 호출 한 번으로는 거의 끝나지 않는다
도구 호출 한 번
요청, 실행, 결과 사용
검증된 요청
이메일이 반품 요청이 된다
도구 다음에 또 도구
앱이 Claude를 계속 일하게 한다
작업 완료
그때서야 답변
실제 지원 문의는 도구 호출 한 번으로 끝나는 일이 거의 없습니다.

> 노트: 원문 제목: One tool call is rarely enough (THE AGENTIC LOOP). One tool call: Ask, run, use the result → Checked request: An email becomes a return request → Tool after tool: The app keeps Claude working → Task done: Only then the answer. 하단: A real support case almost never ends after one tool call.

### 4. `l38-02`

사례
메시지 하나, 요청 둘
[이미지: 노트북으로 채팅하는 고객 일러스트]
Alex
고객이 메시지를 보냄
메시지
ShopAssist
Alex에게 답함
도구 4개
고객, 주문, 환불, 상담원 연결

> 노트: 원문 제목: One message, two requests (THE CASE). Alex (A customer writes in) → message → ShopAssist (Replies to Alex) → Four tools (customer, order, refund, human). Alex의 메시지 하나에 재킷과 램프, 두 주문에 관한 요청이 들어 있습니다(다음 슬라이드 참고).

### 5. `l38-03`

사례
각 단계에는 앞 단계의 결과가 필요하다
계정 확인
get_customer: 이메일로 고객 ID를 얻음
두 주문 찾기
lookup_order: 재킷과 램프
환불 결정
process_refund: 두 주문을 모두 확인한 뒤에만
도구를 연달아 여러 번 호출하고, 각 호출은 앞 호출의 결과에 의존합니다.

> 노트: 원문 제목: Each step needs the last result (THE CASE). Verify account: get_customer: email gives a customer ID → Find both orders: lookup_order: jacket and lamp → Decide on refund: process_refund: only with both orders. 하단: Several tool calls in a row - each one depends on the result before it.

### 6. `l38-04`

핵심 아이디어
Claude가 요청하고, 앱이 실행한다
애플리케이션
Claude
도구
요청 + 도구 목록
tool_use: get_customer
get_customer 실행
결과
결과 전달
세 가지가 이 구조를 작동시킵니다: 신호, 대화 기록, 다음 단계.

> 노트: 원문 제목: Claude asks, your app runs (THE KEY IDEA). Your application → Claude: request + tool list / Claude → app: tool_use: get_customer / app → Tool: runs get_customer / Tool → app: result / app → Claude: result sent back. 캡션: Three parts make it work: the signal, the history, the next step.

### 7. `l38-05`

첫째, 신호
stop_reason이 루프를 결정한다
tool_use
Claude가 도구를 요청하고 있으며, 아직 끝나지 않았다.
end_turn
Claude가 이번 턴의 최종 답변을 작성했다.
모든 API 응답에는 stop_reason이 있습니다: Claude가 쓰기를 멈춘 이유입니다.

> 노트: 원문 제목: The stop reason decides the loop (FIRST, THE SIGNAL). tool_use: Claude is asking for a tool and is not finished. / end_turn: Claude wrote its final answer for this turn. 하단: Every API response has a stop_reason: why Claude stopped writing.

### 8. `l38-06`

코드로 본 루프
네 단계를 end_turn까지 반복한다
while True:
    response = client.messages.create(
        model=MODEL, max_tokens=1024, tools=TOOLS, messages=messages,
    )
    if response.stop_reason == "tool_use":
        results = run_tools(response)
        messages += [as_assistant(response), as_user(results)]
    elif response.stop_reason == "end_turn":
        show(response)
        break
보내고, stop_reason을 읽고, 실행하고, 추가하고, 반복합니다.

> 노트: 원문 제목: Four steps, repeat until end_turn (THE LOOP IN CODE). 코드(영문 유지) 의미: 무한 반복 안에서 Claude에 요청을 보낸다. stop_reason이 "tool_use"이면 도구를 실행하고, Claude의 응답 전체와 도구 결과를 메시지 기록에 추가한 뒤 다시 돈다. "end_turn"이면 답변을 보여 주고 루프를 빠져나온다. 캡션: Send, read the stop reason, run, add, repeat.

### 9. `l38-07`

Alex의 사례
1~2라운드: tool_use가 두 번
애플리케이션
Claude
도구
tool_use: get_customer
get_customer(email)
고객 ID 확인됨
tool_use ×2: lookup_order
lookup_order: 재킷
lookup_order: 램프
두 라운드 모두 stop_reason: tool_use로 끝납니다.

> 노트: 원문 제목: Rounds 1 and 2: tool_use twice (ALEX'S CASE). Claude → app: tool_use: get_customer / app → Tool: get_customer(email) / Tool → app: customer ID verified / Claude → app: tool_use x2: lookup_order / app → Tool: lookup_order: jacket / app → Tool: lookup_order: lamp. 캡션: Both rounds end with stop_reason: tool_use.

### 10. `l38-08`

Alex의 사례
3~4라운드에서 사례가 끝난다
애플리케이션
Claude
도구
tool_use: process_refund
process_refund(재킷)
환불 ID
결과: 환불 ID
end_turn: 최종 답변
재킷은 30일 기한 안이고, 램프는 아닙니다. stop_reason: end_turn이 루프를 끝냅니다.

> 노트: 원문 제목: Rounds 3 and 4 finish the case (ALEX'S CASE). Claude → app: tool_use: process_refund / app → Tool: process_refund (jacket) / Tool → app: refund ID / app → Claude: result: refund ID / Claude → app: end_turn: final answer. 캡션: The jacket is inside the 30-day window; the lamp is not. stop_reason: end_turn ends the loop.

### 11. `l38-09`

둘째, 대화 기록
매 라운드마다 대화 기록 전체를 다시 보낸다
messages = [{"role": "user", "content": "My jacket arrived damaged..."}]
response = client.messages.create(
    model=MODEL, max_tokens=1024, tools=TOOLS, messages=messages,
)
# stop_reason is "tool_use": add two messages
messages.append({"role": "assistant", "content": response.content})
messages.append({"role": "user", "content": tool_results})
API는 아무것도 기억하지 않으므로, 모든 호출이 대화 전체를 담아 보냅니다.

> 노트: 원문 제목: Every round resends the history (SECOND, THE HISTORY). 코드(영문 유지) 의미: 사용자 메시지 "My jacket arrived damaged..."(재킷이 파손되어 도착했어요)로 기록을 시작해 요청을 보낸다. 주석 "stop_reason is tool_use: add two messages"는 "stop_reason이 tool_use이면 메시지 두 개를 추가한다"는 뜻으로, Claude의 응답 전체(assistant)와 도구 결과(user)를 차례로 추가한다. 캡션: The API remembers nothing, so every call carries the whole conversation.

### 12. `l38-10`

루프를 망가뜨리는 세부 사항
내용 전체를 ID와 함께 보관한다
messages.append({"role": "assistant", "content": response.content})
messages.append({
    "role": "user",
    "content": [{
        "type": "tool_result",
        "tool_use_id": "toolu_01",
        "content": '{"customer_id": "CUS-1001"}',
    }],
})
응답은 통째로 저장하고, 각 결과에는 해당 요청의 ID를 붙입니다.

> 노트: 원문 제목: Keep the full content, with IDs (A DETAIL THAT BREAKS LOOPS). 코드(영문 유지) 의미: Claude의 응답 content를 잘라내지 않고 그대로 assistant 메시지로 추가한다. 이어지는 user 메시지에는 tool_result 블록을 넣고, tool_use_id "toolu_01"로 어떤 요청에 대한 결과인지 연결한다. 결과 내용은 {"customer_id": "CUS-1001"}. 캡션: Save the full response; each result carries the ID of its request.

### 13. `l38-11`

병렬 도구 호출
요청 둘, 사용자 메시지 하나
애플리케이션
Claude
도구
tool_use ×2: lookup_order
lookup_order: 재킷
lookup_order: 램프
사용자 메시지 1개: 결과 2개
요청이 두 개 든 응답 하나에는, 결과 두 개를 담은 메시지 하나로 답합니다.

> 노트: 원문 제목: Two requests, one user message (PARALLEL TOOL CALLS). Claude → app: tool_use x2: lookup_order / app → Tool: lookup_order: jacket / app → Tool: lookup_order: lamp / app → Claude: 1 user message: 2 results. 캡션: One response with two requests gets one message with two results.

### 14. `l38-12`

셋째, 다음 단계
다음 단계는 매번 Claude가 고른다
모델 주도
Claude가 대화와 최신 결과를 보고 각 단계를 고른다.
고정된 순서
항상 고객 조회, 주문 조회, 환불 처리 순서. 단순한 경우에는 괜찮다.
도구 호출 순서를 우리 코드가 정한 적은 한 번도 없습니다.

> 노트: 원문 제목: Claude picks every next step (THIRD, THE NEXT STEP). Model-driven: Claude chooses each step from the conversation and the latest result. / Fixed sequence: Always get customer, lookup order, process refund. Fine for simple cases. 하단: Our code never decided the order of the tools.

### 15. `l38-13`

복잡한 실제 사례
고정된 순서는 상황에 맞춰 바뀌지 못한다
주문 번호를 받음
조회 단계 하나를 건너뜀
주문을 찾지 못함
Alex에게 질문함
상담원이 필요함
escalate_to_human, 환불 없음
각 호출은 Claude가 제안할 뿐이고, 실행은 우리 코드가 하며 스토어 규칙을 어기는 호출은 거부할 수 있습니다.

> 노트: 원문 제목: A fixed sequence cannot adapt (MESSY REAL CASES). Order number given: Skip a lookup step / Order not found: Ask Alex a question / Needs a human: escalate_to_human, no refund. 하단: Claude proposes each call - your code runs it and can refuse one that breaks a store rule.

### 16. `l38-14`

정리
루프: 보내고, 읽고, 실행하고, 추가한다
에이전트 루프
보내고, stop_reason을 읽고, 실행하고, 추가하고, 반복한다.
Claude는 도구를 요청하고, 애플리케이션이 실행한다
tool_use: 실행하고, 응답 전체와 결과를 추가해 다시 호출
end_turn: 작업 완료
여러 도구를 한 번에: 사용자 메시지 하나, tool_use_id로 짝지음
Claude는 알게 된 내용을 바탕으로 다음 도구를 고른다

> 노트: 원문 제목: The loop: send, read, run, add (RECAP). The agentic loop: Send, read the stop reason, run, add, repeat. / Claude asks for tools, your application runs them / tool_use: run, add the full response and results, call again / end_turn: the task is done / Several tools at once: one user message, matched by tool use ID / Claude picks each next tool from what it has learned.

## 39강. 에이전트 루프가 멈추는 때 (`l39`)

39강
에이전트 루프가 멈추는 때
슬라이드 8장

> 노트: 원문: LECTURE 39 · When the Agentic Loop Stops · 8 slides

### 18. `l39-01`

루프가 멈춰야 할 때
잘못 멈추면 고객이 피해를 본다
너무 일찍 멈춤
고객이 반쪽짜리 답변을 받는다.
너무 늦게 멈춤
요청이 낭비되거나, 영영 끝나지 않는다.
이 강의에서는 루프가 잘못 멈추는 세 가지 방식을 다룹니다.

> 노트: 원문 제목: A wrong stop hurts the customer (WHEN THE LOOP SHOULD STOP). Stops too early: The customer gets half an answer. / Stops too late: Wasted requests, or it never ends. 하단: This lesson covers three wrong ways a loop stops.

### 19. `l39-02`

믿을 수 있는 유일한 신호
믿을 수 있는 것은 stop_reason뿐이다
end_turn
Claude가 끝냈다.
tool_use
Claude가 아직 끝내지 않았다.
잘못된 방식: Claude의 말, 아무 텍스트, 라운드 세기.

> 노트: 원문 제목: Only the stop reason is reliable (THE ONE RELIABLE SIGNAL). end_turn: Claude has finished. / tool_use: Claude has not finished. 하단: Wrong ways: Claude's words, any text, a round count.

### 20. `l39-03`

잘못된 방식 1: 말
Claude의 말은 신호가 아니다
텍스트
신호
Claude
표현은 매번 달라진다
말을 읽는 루프
"끝났어요" 같은 말을 찾음
stop_reason
tool_use: 계속 진행

> 노트: 원문 제목: Claude's words are not a signal (WRONG WAY 1: THE WORDS). Claude (Wording changes every time) → text → Loop reads words (Looks for "I'm done") / → signal → stop_reason (tool_use: keep going).

### 21. `l39-04`

잘못된 방식 2: 아무 텍스트
텍스트가 있다고 답변인 것은 아니다
답변
Claude
텍스트 + lookup_order 블록
루프
텍스트가 있으면 최종 답변으로 봄
[이미지: 노트북으로 채팅하는 고객 일러스트]
Alex
첫 줄만 보게 됨
lookup_order
루프가 실행해 주기를 기다림

> 노트: 원문 제목: Text alone is not the answer (WRONG WAY 2: ANY TEXT). Claude (Text + lookup_order block) → Loop (Any text = final answer) → answer → Alex (Sees only the first line) / 점선 → lookup_order (Waits for the loop). 응답에 텍스트와 tool_use 블록이 함께 들어 있을 수 있으므로, 텍스트가 있다는 사실만으로 끝났다고 보면 도구 요청이 실행되지 않습니다.

### 22. `l39-05`

잘못된 방식 3: 라운드 세기
고정된 한도는 사례를 중간에 끊는다
1라운드
계정 확인
2라운드
두 주문 찾기
3라운드
환불 처리
4라운드
Alex에게 답변
한도가 3이면 답변 전에 멈춥니다. 모든 사례에 맞는 숫자는 없습니다.

> 노트: 원문 제목: A fixed cap cuts cases short (WRONG WAY 3: COUNTING ROUNDS). Round 1: Verify the account → Round 2: Find both orders → Round 3: Make the refund → Round 4: Answer Alex. 하단: A cap of three stops before the answer. No number fits every case.

### 23. `l39-06`

한도의 용도
한도는 버그를 대비한 안전망이다
핸드오프
루프
같은 조회를 계속 반복
한도: 20라운드
정상 사례보다 훨씬 높게
[이미지: 헤드셋을 쓴 지원팀 담당자 일러스트]
사람
사례를 넘겨받음
고객
중간까지 쓴 텍스트는 보여 주지 않음

> 노트: 원문 제목: A cap is a safety net for bugs (WHAT THE CAP IS FOR). Loop (Same lookup, again and again) → Cap: 20 rounds (Far above normal cases) → hand off → A person (Takes over the case) / 점선 → Customer (No partial text shown).

### 24. `l39-07`

시험 범위 밖
시험은 다섯 가지 중 두 가지만 다룬다
end_turn
Claude가 끝냈다
tool_use
도구를 실행하고 계속
max_tokens
한도에서 잘림
pause_turn
일시 정지, 그대로 다시 보냄
refusal
Claude가 거절함

> 노트: 원문 제목: The exam names two of five (BEYOND THE EXAM). end_turn: Claude has finished / tool_use: Run the tool, continue / max_tokens: Cut off at the limit / pause_turn: Paused, send it back / refusal: Claude declined. 시험에서 다루는 것은 end_turn과 tool_use 두 가지입니다.

### 25. `l39-08`

정리
stop_reason이 루프를 끝낸다
API가 결정하게 한다
tool_use이면 계속하고, end_turn이면 끝낸다.
Claude의 말에서 "끝" 같은 단어를 찾지 않는다
tool_use 블록 옆의 텍스트는 답변이 아니다
라운드 한도는 안전망이며, 높게 잡는다
한도에 걸렸다면 그것은 실패다

> 노트: 원문 제목: The stop reason ends the loop (RECAP). Let the API decide: Continue on tool_use, finish on end_turn. / Never search Claude's words for "done" / Text next to a tool_use block is no answer / A round cap is a safety net, set high / When the cap fires, it is a failure.

## 41강. Claude가 도구를 고르는 방식 (`l41`)

41강
Claude가 도구를 고르는 방식
슬라이드 11장

> 노트: 원문: LECTURE 41 · How Claude Chooses a Tool · 11 slides

### 27. `l41-01`

루프 안의 도구 네 개
Claude가 네 도구 중 두 개를 헷갈린다
Claude
도구 하나를 고름
get_customer
고객을 찾는다
lookup_order
주문을 찾는다
process_refund
주문을 환불한다
escalate_to_human
사람에게 넘긴다

> 노트: 원문 제목: Claude mixes up two of four tools (FOUR TOOLS IN THE LOOP). Claude (Picks one tool) → get_customer (Finds a customer), lookup_order (Finds an order), process_refund (Refunds an order), escalate_to_human (Hands off to a person). 강조된 두 도구 get_customer와 lookup_order가 헷갈리는 쌍입니다.

### 28. `l41-02`

살펴볼 세 가지
도구는 설명이 결정한다
Claude가 보는 것
이름, 스키마, 설명
잘못되는 이유
비슷한 설명은 구분이 흐려진다
좋은 설명
담아야 할 네 가지
Claude는 주로 설명을 보고 도구를 고릅니다. 엉뚱한 도구를 고르면 설명부터 고치세요.

> 노트: 원문 제목: The description decides the tool (THREE THINGS TO LOOK AT). What Claude sees: Name, schema, description / Why it goes wrong: Similar descriptions blur / A good description: Four things to include. 하단: Claude chooses a tool mainly from its description. Wrong tool? Fix the description first.

### 29. `l41-03`

Claude가 보는 것
Claude는 세 부분만 본다
{
  "name": "get_customer",
  "input_schema": {
    "type": "object",
    "properties": {"query": {"type": "string"}},
    "required": ["query"]
  },
  "description": "Retrieves customer information."
}
도구가 무엇을 위한 것이고 언제 써야 하는지는 설명만 말해 줍니다.

> 노트: 원문 제목: Claude sees only three parts (WHAT CLAUDE SEES). JSON(영문 유지) 의미: 이름 get_customer, 입력 스키마(문자열 query 하나, 필수), 설명 "Retrieves customer information."(고객 정보를 조회한다). 캡션: Only the description says what the tool is for and when to use it.

### 30. `l41-04`

비슷한 설명이 실패하는 이유
똑같이 들리는 두 도구
get_customer
"Retrieves customer information."
고객 정보를 조회한다.
lookup_order
"Retrieves order details."
주문 상세를 조회한다.
둘 다 한 줄짜리이고 둘 다 텍스트 값을 받으니, Claude에게는 거의 똑같이 들립니다.

> 노트: 원문 제목: Two tools that sound the same (WHY SIMILAR DESCRIPTIONS FAIL). get_customer: Retrieves customer information. / lookup_order: Retrieves order details. 하단: Each is one line, both take a text value - to Claude they sound almost the same.

### 31. `l41-05`

로그에 남은 두 사례
두 호출 모두 엉뚱한 도구로 간다
[이미지: 노트북으로 채팅하는 고객 일러스트]
고객
주문에 대해 문의함
Claude
도구를 고름
get_customer
"Retrieves customer information."
lookup_order
"Retrieves order details."

> 노트: 원문 제목: Both calls go to the wrong tool (TWO CASES FROM THE LOGS). Customer (Asks about an order) → Claude (Picks a tool) → get_customer (Retrieves customer information.) / lookup_order (Retrieves order details.). 두 설명이 비슷해서, 로그의 두 사례 모두 요청이 잘못된 도구로 갔습니다.

### 32. `l41-06`

잘못된 라우팅
설명이 겹치면 Claude가 엉뚱한 도구로 보낸다
잘못된 라우팅
요청이 엉뚱한 도구로 간다.
짧은 설명이 원인이 된다
겹치는 설명이 원인이 된다
시험 예시: 설명이 거의 같은 analyze_content와 analyze_document

> 노트: 원문 제목: Overlap makes Claude misroute (MISROUTING). Misrouting: A request goes to the wrong tool. / Short descriptions cause it / Overlapping descriptions cause it / Exam example: analyze_content and analyze_document, nearly identical descriptions.

### 33. `l41-07`

좋은 설명
설명마다 네 가지에 답한다
하는 일
그리고 반환하는 것
입력 형식
예시 질의와 함께
예외 상황
특이한 경우
인접 도구
대신 그 도구를 써야 할 때

> 노트: 원문 제목: Four answers in each description (A GOOD DESCRIPTION). What it does: And what it returns / Input format: With example queries / Edge cases: Unusual situations / Neighbor tool: When to use it instead.

### 34. `l41-08`

다시 쓴 get_customer
get_customer는 자기 경계를 밝힌다
GET_CUSTOMER_DESCRIPTION = (
    "Finds a customer by email, phone number or full name. "
    "Returns a verified customer ID. "
    "Use at the start of a case, or when the customer is not verified yet. "
    "Example: a customer gives an email and asks about a refund. "
    "If several match, returns all of them; ask for another identifier. "
    "No match returns an empty result, not an error. "
    "Does not accept order numbers - for an order, use lookup_order."
)
확장한 설명: 하는 일과 반환값, 입력, 예외 상황, 그리고 어디까지인지.

> 노트: 원문 제목: get_customer states its boundary (GET_CUSTOMER, REWRITTEN). 설명(영문 유지) 의미: 이메일, 전화번호, 전체 이름으로 고객을 찾는다. 검증된 고객 ID를 반환한다. 사례를 시작할 때나 고객이 아직 검증되지 않았을 때 쓴다. 예: 고객이 이메일을 주고 환불을 문의한다. 여러 명이 일치하면 모두 반환하니, 다른 식별자를 요청한다. 일치하는 고객이 없으면 오류가 아니라 빈 결과를 반환한다. 주문 번호는 받지 않으니, 주문은 lookup_order를 쓴다. 캡션: An expanded description: what it does and returns, inputs, edge cases, and where it ends.

### 35. `l41-09`

다시 쓴 lookup_order
lookup_order는 필요한 입력을 밝힌다
LOOKUP_ORDER_DESCRIPTION = (
    "Returns one order: status, items, amounts, delivery date, return window. "
    "Inputs: order_id (format ORD-12345678, e.g. ORD-10482917) and customer_id. "
    "The verified customer_id comes from get_customer. "
    "Example: 'Where is my jacket?' with the order number given. "
    "An order that belongs to another customer is rejected. "
    "No order number: ask the customer for it. "
    "Does not search by email or name - use get_customer first."
)
두 번째 확장 설명: 입력 두 개, 예외 상황, 그리고 앞 도구를 가리키는 경계.

> 노트: 원문 제목: lookup_order names what it needs (LOOKUP_ORDER, REWRITTEN). 설명(영문 유지) 의미: 주문 하나를 반환한다(상태, 품목, 금액, 배송일, 반품 기한). 입력: order_id(형식 ORD-12345678, 예: ORD-10482917)와 customer_id. 검증된 customer_id는 get_customer에서 얻는다. 예: 주문 번호와 함께 "제 재킷은 어디 있나요?"라고 묻는 경우. 다른 고객의 주문은 거부한다. 주문 번호가 없으면 고객에게 요청한다. 이메일이나 이름으로는 찾지 않으니, 먼저 get_customer를 쓴다. 캡션: A second expanded description: two inputs, edge cases, and a boundary that points back.

### 36. `l41-10`

해결책
인접 도구부터 밝힌다
이것부터 한다
각 설명이 인접 도구를 지목하고, 언제 그쪽으로 바꿔야 하는지 말한다.
첫 단계로는 하지 않는다
긴 few-shot 예시, 라우팅 레이어, 두 도구 합치기.
설명은 선택을 이끌 뿐 아무것도 보장하지 않습니다. 반드시 지켜야 하는 규칙은 코드에 둡니다.

> 노트: 원문 제목: Name the neighbor first (THE FIX). Do this first: Each description names its neighbor and says when to switch. / Not as a first step: Long few-shot examples, a routing layer, or merging both tools. 하단: A description guides the choice but guarantees nothing - a rule that must always hold belongs in code.

### 37. `l41-11`

정리
설명부터 시작한다
설명이 먼저
Claude는 코드가 아니라 설명을 보고 도구를 고른다.
짧거나 겹치는 설명은 도구들을 똑같아 보이게 한다
도구가 하는 일과 반환하는 것을 말한다
입력 형식을 예시 질의와 함께 밝힌다
예외 상황을 다루고 인접 도구를 지목한다

> 노트: 원문 제목: Start with the descriptions (RECAP). Description first: Claude chooses a tool from its description, not from the code. / Short or overlapping descriptions make tools look the same / Say what the tool does and returns / Name input formats, with example queries / Cover edge cases and name the neighbor tool.

## 42강. 이름 바꾸기, 나누기, 키워드 트리거 (`l42`)

42강
이름 바꾸기, 나누기, 키워드 트리거
슬라이드 10장

> 노트: 원문: LECTURE 42 · Renaming, Splitting and Keyword Triggers · 10 slides

### 39. `l42-01`

설명만으로 부족할 때
세 가지 신호가 한 방향을 가리켜야 한다
도구 이름
도구를 부르는 이름
설명
하는 일, 입력과 출력
시스템 프롬프트
Claude에게 주는 지침
Claude
도구를 고름

> 노트: 원문 제목: Three signals must point one way (WHEN DESCRIPTIONS ARE NOT ENOUGH). Tool name (What the tool is called), Description (What it does, in and out), System prompt (Instructions for Claude) → Claude (Picks a tool).

### 40. `l42-02`

시험의 예시
비슷해 보이는 도구는 헷갈린다
해결책 세 가지: 겹치는 도구 이름 바꾸기, 일이 많은 도구 나누기, 시스템 프롬프트 점검.
리서치 에이전트
웹을 검색하고 문서를 읽음
analyze_content
콘텐츠를 분석하고 핵심 결과를 반환
analyze_document
문서를 분석하고 핵심 결과를 반환

> 노트: 원문 제목: Look-alike tools get mixed up (THE EXAM'S EXAMPLE). 부제: Three fixes: rename overlapping tools, split a tool with many jobs, check the system prompt. Research agent (Searches the web, reads documents) → analyze_content (Analyzes content and returns key findings) / analyze_document (Analyzes a document and returns key findings).

### 41. `l42-03`

해결책 1: 이름 바꾸기
정확한 이름이 겹침을 없앤다
웹 결과
검색 페이지의 텍스트
extract_web_results
페이지마다 사실을 페이지 주소와 함께 추출
analyze_content
"콘텐츠"는 문서에도 들어맞음
문서
보고서나 PDF

> 노트: 원문 제목: A precise name removes overlap (FIX 1 - RENAME). Web results (Text of search pages) → extract_web_results (Facts from each page, with the page address). 기존 analyze_content ("Content" fits a document too)에는 웹 결과와 Document (A report or a PDF)가 모두 들어올 수 있었습니다. 웹 결과용 도구 이름을 extract_web_results로 바꾸면 겹침이 사라집니다.

### 42. `l42-04`

해결책 2: 나누기
일이 많은 도구는 나눈다
analyze_document
범용 도구 하나
숫자
값 목록
요약
텍스트 한 문단
판정
뒷받침되는지 여부

> 노트: 원문 제목: Split a tool that does many jobs (FIX 2 - SPLIT). analyze_document (One general tool) → Numbers (A list of values) / Summary (A paragraph of text) / Verdict (Supported or not).

### 43. `l42-05`

해결책 2: 나누기
도구마다 일은 하나
문서
extract_data_points
값 + 위치
문서
summarize_content
짧은 요약
주장 + 출처
verify_claim_against_source
뒷받침 여부 + 본문

> 노트: 원문 제목: Each tool gets one job (FIX 2 - SPLIT). Document → extract_data_points → Values + places / Document → summarize_content → Short summary / Claim + source → verify_claim_against_source → Supported? + text.

### 44. `l42-06`

해결책 2: 나누기
일 단위로 나누되, 잘게 쪼개지는 않는다
숨은 일이 있으면: 나눈다
도구 하나가 여러 일을 하면, 일마다 도구를 따로 준다.
일이 하나면: 그대로 둔다
작은 도구가 많으면 고르기가 더 어려워진다.

> 노트: 원문 제목: Split by job, not into crumbs (FIX 2 - SPLIT). Hidden jobs: split: One tool, several jobs - give each job its own tool. / One job: keep it whole: Many tiny tools make the choice harder.

### 45. `l42-07`

해결책 3: 시스템 프롬프트
키워드 하나가 Claude를 잘못 이끈다
“고객이 주문을 언급하면 lookup_order를 사용하세요.”
Alex
Claude
lookup_order
get_customer
주문 문의 + 이메일
lookup_order(email)
주문 ID + 고객 ID 필요
올바른 첫 단계

> 노트: 원문 제목: One keyword can send Claude wrong (FIX 3 - THE SYSTEM PROMPT). 인용: "When the customer mentions an order, use lookup_order." Alex → Claude: order question + email / Claude → lookup_order: lookup_order(email) / lookup_order → Claude: needs order ID + customer ID / Claude → get_customer: the right first step. "주문"이라는 단어에 묶인 지침 때문에 Claude가 올바른 첫 단계(get_customer) 대신 lookup_order를 부릅니다.

### 46. `l42-08`

키워드 트리거
도구는 단어가 아니라 상황에 묶는다
You are ShopAssist, a support assistant.
Be polite and keep answers short.
Verify the customer with get_customer first,
then look up the order once you have its number.
Never share another customer's data.
키워드 트리거는 도구를 상황이 아니라 단어에 묶습니다. 상황을 기준으로 다시 쓰거나, 지우세요.

> 노트: 원문 제목: Tie tools to situations, not words (KEYWORD TRIGGERS). 시스템 프롬프트(영문 유지) 의미: 당신은 지원 어시스턴트 ShopAssist입니다. 정중하게, 답은 짧게 하세요. 먼저 get_customer로 고객을 검증하고, 주문 번호를 받으면 그때 주문을 조회하세요. 다른 고객의 데이터는 절대 공유하지 마세요. 캡션: A keyword trigger ties a tool to a word, not to a situation. Rewrite it around the situation, or remove it.

### 47. `l42-09`

해결 순서
설명부터, 나머지는 그다음
설명
먼저 확장한다
이름 바꾸기 또는 나누기
그래도 도구가 겹치면
시스템 프롬프트
키워드 트리거를 찾는다
어느 것도 보장은 아닙니다. 반드시 지켜야 하는 규칙은 여전히 코드에 둡니다.

> 노트: 원문 제목: Descriptions first, then the rest (THE ORDER OF FIXES). Descriptions: Expand them first → Rename or split: If tools still overlap → System prompt: Look for keyword triggers. 하단: None of this is a guarantee: a rule that must always hold still lives in code.

### 48. `l42-10`

기억할 것
이름, 설명, 프롬프트를 맞춘다
설명
첫 번째 해결책
이름 바꾸기
두 도구가 겹칠 때
나누기
도구 하나가 일이 많을 때
시스템 프롬프트
키워드 트리거 점검
이름, 설명, 시스템 프롬프트가 같은 이야기를 하게 하세요.

> 노트: 원문 제목: Align name, description, prompt (WHAT TO REMEMBER). Description: The first fix / Rename: When two tools overlap / Split: When one tool has many jobs / System prompt: Check for keyword triggers. 하단: Make the name, the description and the system prompt tell the same story.

## 43강. 구조화된 도구 오류 (`l43`)

43강
구조화된 도구 오류
슬라이드 11장

> 노트: 원문: LECTURE 43 · Structured Tool Errors · 11 slides

### 50. `l43-01`

실패가 중요한 이유
도구는 MCP를 거쳐 ShopAssist에 닿는다
MCP
ShopAssist
Claude가 도구 네 개를 호출
[이미지: 서버와 데이터 상자 일러스트]
스토어 백엔드
주문, 고객, 환불

> 노트: 원문 제목: Tools reach ShopAssist through MCP (WHY FAILURES MATTER). ShopAssist (Claude calls four tools) → MCP → Store backend (Orders, customers, refunds).

### 51. `l43-02`

세부 정보 없는 실패
모호한 오류는 추측을 강요한다
MCP
Claude
재시도? 새 번호? 설명? 핸드오프?
[이미지: 서버와 데이터 상자 일러스트]
스토어 백엔드
방금 호출 하나가 실패함

> 노트: 원문 제목: A vague error forces a guess (A FAILURE WITH NO DETAIL). Claude (Retry? New number? Explain? Hand off?) → MCP → Store backend (A call just failed). 실패 이유를 모르면 Claude는 다시 시도할지, 새 번호를 물을지, 설명할지, 사람에게 넘길지 추측해야 합니다.

### 52. `l43-03`

실패한 호출이 담아야 할 것
실패는 세 필드로 설명한다
오류 플래그
호출이 실패했는가?
오류 범주
어떤 종류의 실패인가?
재시도 플래그
다시 시도하면 도움이 되는가?
실패한 도구 호출은 어떤 종류의 실패인지, 재시도가 도움이 되는지 말해야 합니다.

> 노트: 원문 제목: Three fields describe a failure (WHAT A FAILED CALL MUST CARRY). Error flag: Did the call fail? / Error category: What kind of failure? / Retry flag: Can trying again help? 하단: A failed tool call must say what kind of failure happened and whether a retry can help.

### 53. `l43-04`

플래그 먼저, 그다음 범주
isError는 실패했다는 사실만 말한다
{
  "isError": true,
  "errorCategory": "business",
  "message": "Operation failed"
}
isError는 MCP의 일부이고, errorCategory는 도구와 에이전트 사이에 우리가 정한 약속입니다.

> 노트: 원문 제목: isError says only that it failed (FIRST THE FLAG, THEN THE CATEGORY). JSON(영문 유지) 의미: 오류 여부 true, 오류 범주 "business"(업무 규칙), 메시지 "Operation failed"(작업 실패). 메시지만으로는 무엇을 해야 할지 알 수 없습니다. 캡션: isError is part of MCP; errorCategory is our own contract between tools and agent.

### 54. `l43-05`

오류 범주
일시적 문제인가, 잘못된 입력인가
transient (일시적)
타임아웃이나 잠깐의 서비스 중단. 주문 서비스가 제때 응답하지 않았다.
validation (검증)
입력이 잘못됐다. Alex가 주문 번호를 한 자리 빼고 입력했다.

> 노트: 원문 제목: Temporary problem or wrong input (THE ERROR CATEGORY). Transient: A timeout or a service down for a moment. The order service did not answer in time. / Validation: The input was wrong. Alex typed his order number with a digit missing.

### 55. `l43-06`

오류 범주
스토어 규칙인가, 다른 주인인가
business (업무 규칙)
입력은 문제없지만 규칙이 허락하지 않는다. 램프는 45일 전에 배송되어 30일 기한을 넘겼다.
permission (권한)
이 고객은 그 데이터를 볼 수 없다. 주문의 주인이 다른 고객이다.

> 노트: 원문 제목: A store rule or a different owner (THE ERROR CATEGORY). Business: The input was fine, but a rule says no. The lamp was delivered 45 days ago, outside the 30-day window. / Permission: This customer may not see the data. The order belongs to a different customer.

### 56. `l43-07`

Claude의 다음 행동
범주마다 다른 대응
transient
일시적 문제
기다렸다가 재시도
같은 호출이 성공할 수 있음
validation
잘못된 입력
Alex에게 질문
올바른 번호를 받음
business
스토어 규칙이 거부
설명하거나 핸드오프
Alex가 예외를 원하면
permission
이 고객의 데이터가 아님
아무것도 보여 주지 않음
그 주문의 데이터는 전혀 없음

> 노트: 원문 제목: Each category, a different move (WHAT CLAUDE DOES NEXT). Transient (Temporary problem) → Wait, then retry (The same call can work) / Validation (Wrong input) → Ask Alex (For the right number) / Business (A store rule says no) → Explain or escalate (If Alex wants an exception) / Permission (Not this customer's data) → Show nothing (No data from that order).

### 57. `l43-08`

재시도 플래그
성공할 수 있을 때만 재시도한다
타임아웃
isRetryable: true
같은 호출이 나중에 성공할 수 있다
업무 규칙 오류
isRetryable: false
내일이 되어도 기한 밖이다
검증 오류
isRetryable: false
같은 잘못된 번호는 또 실패한다
isRetryable은 같은 호출을 그대로 다시 했을 때 성공할 수 있는 경우에만 true입니다.

> 노트: 원문 제목: Retry only when it may succeed (THE RETRY FLAG). Timeout: isRetryable: true - the same call may work later / Business error: isRetryable: false - still outside the window tomorrow / Validation error: isRetryable: false - the same wrong number fails again. 하단: isRetryable is true only when the same call, unchanged, may succeed later.

### 58. `l43-09`

무작정 재시도
일시적 오류만 재시도한다
Claude
ShopAssist 앱
스토어 도구
process_refund
process_refund
business, 재시도 불가
같은 호출 다시
같은 오류
스토어 규칙이나 잘못된 입력 뒤의 재시도는 요청만 낭비하다가, 결국 루프의 안전 한도에 걸립니다.

> 노트: 원문 제목: Retry only transient errors (BLIND RETRIES). Claude → ShopAssist app: process_refund / app → Store tool: process_refund / Store tool → app: business, not retryable / app → Store tool: same call again / Store tool → app: same error. 캡션: Retrying after a store rule or bad input only wastes requests, until the loop hits its safety cap.

### 59. `l43-10`

램프 환불
Claude는 재시도하지 않고 설명한다
{
  "isError": true,
  "errorCategory": "business",
  "isRetryable": false,
  "message": "Outside the 30-day return window."
}
Claude는 재시도하지 않고, Alex에게 반품 정책을 설명합니다.

> 노트: 원문 제목: Claude explains and does not retry (THE LAMP REFUND). JSON(영문 유지) 의미: 오류 true, 범주 business(업무 규칙), 재시도 불가 false, 메시지 "Outside the 30-day return window."(30일 반품 기한을 지났습니다). 캡션: Claude does not retry - it explains the return policy to Alex.

### 60. `l43-11`

기억할 것
실패의 종류와 재시도 여부를 밝힌다
isError: true
MCP가 실패한 호출에 표시
오류 범주
transient, validation, business, permission
isRetryable
같은 호출이 성공할 수 있을 때만 true
설명
무엇이 잘못됐고 무엇을 고칠지
에이전트에게 어떤 종류의 실패인지, 다시 시도하면 도움이 되는지 알려 주세요.

> 노트: 원문 제목: Name the failure and the retry (WHAT TO REMEMBER). isError: true: MCP marks a failed call / Error category: Transient, validation, business, permission / isRetryable: True only if the same call may work / Description: What went wrong and what to fix. 하단: Tell the agent what kind of failure happened and whether trying again can help.

## 44강. 고객 메시지와 빈 결과 (`l44`)

44강
고객 메시지와 빈 결과
슬라이드 10장

> 노트: 원문: LECTURE 44 · Customer Messages and Empty Results · 10 slides

### 62. `l44-01`

도구 결과
고객은 도구 결과를 전해 듣는다
도구 결과
플래그, 범주, 재시도 플래그
Claude
답변을 작성
[이미지: 노트북으로 채팅하는 고객 일러스트]
고객
답변만 봄

> 노트: 원문 제목: The customer hears the tool result (TOOL RESULTS). Tool result (Flag, category, retry flag) → Claude (Writes the answer) → Customer (Sees only the answer).

### 63. `l44-02`

핵심 규칙
두 결과를 절대 섞지 않는다
아무것도 찾지 못함
도구가 찾아봤고, 답이 비어 있다.
찾아볼 수 없었음
도구가 데이터에 아예 닿지 못했다.
도구는 이 둘을 절대 섞으면 안 됩니다.

> 노트: 원문 제목: Never mix up two results (THE KEY RULE). Nothing found: The tool looked, and the answer is empty. / Could not look: The tool could not reach the data at all. 하단: A tool must never mix them up.

### 64. `l44-03`

첫째: 메시지
거절된 환불, 재시도 불가
Alex
Claude
process_refund
램프 환불해 주세요
램프, 45일 전
business · retryable: false
Alex에게 뭐라고 할까?
다시 시도해도 소용없습니다: 내일도 램프는 30일 기한 밖입니다.

> 노트: 원문 제목: A refused refund, not retryable (FIRST: THE MESSAGES). Alex → Claude: Refund my lamp / Claude → process_refund: lamp, 45 days ago / process_refund → Claude: business · retryable: false / Claude → Alex: What do we tell Alex? 캡션: Trying again cannot help: tomorrow the lamp is still outside the 30-day window.

### 65. `l44-04`

결과 하나에 메시지 둘
메시지 하나는 Alex에게, 하나는 로그에
{
  "isError": true,
  "errorCategory": "business",
  "isRetryable": false,
  "customerMessage": "Delivered over 30 days ago - outside our return window.",
  "logMessage": "refund-service: rule 30d, delivered 2026-08-29, asked 2026-10-13"
}
첫 번째 메시지는 Claude가 그대로 전합니다. 두 번째는 스토어 로그로 가며, Alex는 보지 못합니다.

> 노트: 원문 제목: One message for Alex, one for logs (TWO MESSAGES IN ONE RESULT). JSON(영문 유지) 의미: 오류 true, 범주 business, 재시도 불가. customerMessage(고객용): "30일도 더 전에 배송되어 반품 기한을 지났습니다." logMessage(로그용): "refund-service: 30일 규칙, 2026-08-29 배송, 2026-10-13 요청". 캡션: Claude passes the first message on. The second goes to the store's logs - Alex never sees it.

### 66. `l44-05`

Claude가 하는 일
이제 Claude는 어떻게 답할지 안다
재시도하지 않음
규칙은 바뀌지 않는다
규칙을 설명
고객에게 보여도 되는 메시지를 쓴다
핸드오프
Alex가 예외를 요청할 때만

> 노트: 원문 제목: Claude now knows how to respond (WHAT CLAUDE DOES). No retry: The rule will not change / Explain the rule: Use the customer-safe message / Escalate: Only if Alex asks for an exception.

### 67. `l44-06`

둘째: 비어 있음 또는 실패
일치 없음도 진짜 답이다
검색
lookup_order
주문 번호로 검색
[이미지: 서버와 데이터 상자 일러스트]
주문 서비스
정상 작동, 그런 주문은 없음
빈 결과
isError: false - 일치 없음
Claude
Alex에게 번호 확인을 요청

> 노트: 원문 제목: No match is a real answer (SECOND: EMPTY OR FAILED). lookup_order (Search by order number) → search → Order service (Works, no such order) / Empty result (isError: false - no match) → Claude (Asks Alex to check the number).

### 68. `l44-07`

둘째: 비어 있음 또는 실패
타임아웃은 찾아볼 수 없었다는 뜻이다
검색
lookup_order
우리 코드가 한 번 재시도할 수 있음
[이미지: 서버와 데이터 상자 일러스트]
주문 서비스
제때 응답하지 않음
접근 실패
isError: true - transient - 재시도 가능
Claude
지금은 주문을 확인할 수 없음

> 노트: 원문 제목: A timeout means we could not look (SECOND: EMPTY OR FAILED). lookup_order (Our code can retry once) → search → Order service (Does not answer in time) / Access failure (isError: true - transient - retryable) → Claude (Cannot check the order now).

### 69. `l44-08`

함정
실패를 빈 결과로 숨기지 않는다
주문 서비스
lookup_order
Claude
Alex
주문 조회
타임아웃
[] - 성공처럼 보임
주문이 존재하지 않습니다
그 뒤의 모든 단계가 잘못된 정보 위에 서게 됩니다.

> 노트: 원문 제목: Never hide a failure as empty (THE TRAP). lookup_order → Order service: look up order / Order service → lookup_order: timeout / lookup_order → Claude: [] - looks like success / Claude → Alex: Your order does not exist. 캡션: Every step after that rests on false information.

### 70. `l44-09`

이후 강의 미리 보기
코디네이터에게는 정직한 보고가 필요하다
코디네이터
서브에이전트
주문 서비스
주문 상태 확인
lookup_order
타임아웃
빈 결과
데이터가 존재하지 않는다고 판단
재시도도, 다른 방법도 없습니다. 모든 보고는 "빈 답"인지 "답을 못 얻음"인지 밝혀야 합니다.

> 노트: 원문 제목: A coordinator needs honest reports (LATER IN THE COURSE). Coordinator → Helper agent: check order status / Helper agent → Order service: lookup_order / Order service → Helper agent: timeout / Helper agent → Coordinator: empty result / Coordinator 자체 판단: the data does not exist. 캡션: No retry, no other way. Every report must say: an empty answer, or no answer at all. 코디네이터와 서브에이전트 구조는 이후 강의에서 다룹니다.

### 71. `l44-10`

정리
모든 결과는 어느 경우인지 밝혀야 한다
업무 규칙 오류
재시도 불가, 고객용 메시지와 로그용 메시지
일치 없음
성공한 빈 결과
타임아웃
접근 실패, 재시도 여부를 판단
찾아봤는데 없었는가, 아니면 찾아볼 수 없었는가.

> 노트: 원문 제목: Every result must say which case (RECAP). Business error: Not retryable - a customer-safe and a log message / No match: A successful empty result / Timeout: An access failure - decide whether to retry. 하단: We looked and found nothing - or we could not look.

## 46강. MCP: 서버, 도구, 리소스 (`l46`)

46강
MCP: 서버, 도구, 리소스
슬라이드 16장

> 노트: 원문: LECTURE 46 · MCP: Servers, Tools and Resources · 16 slides

### 73. `l46-01`

지금까지
제공된 도구는 선택도 받아야 한다
명확한 역할
도구가 하는 일을 설명한다
명확한 실패
에이전트가 이해할 수 있게 실패한다
MCP 서버
실제로 쓰이는 도구
서버에 있어도 선택받지 못하는 도구는 에이전트에게 아무 도움이 되지 않습니다.

> 노트: 원문 제목: Offered tools must also be chosen (WHERE WE ARE). Clear jobs: Tools describe what they do → Clear failures: Tools fail in a way the agent understands → MCP servers: Tools that actually get used. 하단: A tool that sits on a server but never gets chosen gives the agent no help.

### 74. `l46-02`

새로운 바람 두 가지
다른 곳에서도 우리 도구를 써야 한다
같은 도구
읽기
[이미지: 책상에서 일하는 개발자 일러스트]
Claude Code
개발자가 매일 사용
ShopAssist 프로그램
도구 4개, 우리 코드가 실행
정책 문서
ShopAssist가 읽어야 함

> 노트: 원문 제목: Others should use our tools too (TWO NEW WISHES). Claude Code (Developers use it daily) → same tools → ShopAssist program (4 tools, run by our code) → reads → Policy documents (ShopAssist should read them). 바람 1: 개발자가 Claude Code에서도 같은 도구를 쓰는 것. 바람 2: ShopAssist가 정책 문서를 읽는 것.

### 75. `l46-03`

핵심
도구 사용 여부는 설명이 결정한다
서버
표준 연결 하나
도구, 리소스
행동과 콘텐츠
여러 서버
함께 발견됨
만들기 또는 재사용
커뮤니티 또는 직접 제작
MCP는 도구를 쓸 수 있게 해 주지만, 실제로 쓰일지는 설명이 결정합니다.

> 노트: 원문 제목: Description decides tool use (THE MAIN POINT). The server: One standard connection / Tools, resources: Actions and content / Several servers: Discovered together / Build or reuse: Community or custom. 하단: MCP makes tools available, but the description decides whether they get used.

### 76. `l46-04`

첫째, 서버
시스템마다 따로 설정이 필요하다
MCP(Model Context Protocol)는 도구와 데이터를 Claude에 연결하는 표준 방식입니다.
개별 설정
개별 설정
개별 설정
Claude 에이전트
셋 다 필요함
주문 시스템
고객 데이터베이스
정책 문서

> 노트: 원문 제목: Every system needs its own setup (FIRST, THE SERVER). 부제: MCP, the Model Context Protocol, is the standard way to connect tools and data to Claude. Claude agent (Needs all three) → custom setup → Order system / Customer database / Policy documents. MCP가 없으면 시스템마다 연결을 따로 만들어야 합니다.

### 77. `l46-05`

표준 연결 하나
Claude가 요청하고, 서버가 실행한다
클라이언트 예: Claude Code, Claude 앱, Agent SDK 에이전트.
Claude
MCP 클라이언트
MCP 서버
연결
도구 목록
고를 수 있는 도구
요청: lookup_order
lookup_order 실행
서버는 lookup_order를 제공하지만, 주문을 삭제하는 도구는 제공하지 않습니다.

> 노트: 원문 제목: Claude asks, the server runs (ONE STANDARD CONNECTION). 부제: Clients: Claude Code, the Claude app, an Agent SDK agent. MCP client → MCP server: connect / server → client: list of tools / client → Claude: tools to choose from / Claude → client: request: lookup_order / client → server: run lookup_order. 캡션: The server offers lookup_order, but no tool that deletes an order. 서버가 제공하는 도구만 쓸 수 있다는 뜻입니다.

### 78. `l46-06`

둘째, 도구와 리소스
도구는 행동하고, 리소스는 보여 준다
도구는 무언가를 한다
입력을 받아 작업을 실행하고 결과를 반환한다. 예: lookup_order.
리소스는 콘텐츠를 준다
에이전트가 읽을 수 있는 콘텐츠. 흔히 카탈로그, 즉 무엇이 있는지의 목록이다.

> 노트: 원문 제목: Tools act, resources show (SECOND, TOOLS AND RESOURCES). A tool does something: Takes input, runs an operation, returns a result. Example: lookup_order. / A resource gives content: Content the agent can read, often a catalog - a list of what exists.

### 79. `l46-07`

검색 도구만 있을 때
검색만 하는 에이전트는 헤매야 한다
에이전트
검색하고, 열어 보고, 다시 검색
[이미지: 서류 캐비닛과 문서 일러스트]
정책 문서
반품, 배송, 가격 조정, 파손 상품

> 노트: 원문 제목: Search-only agents must explore (SEARCH TOOL ONLY). Agent (Search, open, search again) → Policy documents (Returns, shipping, price adjustments, damaged items).

### 80. `l46-08`

리소스로 제공하는 카탈로그
카탈로그가 탐색을 줄여 준다
도구는 일을 하고, 리소스는 무엇이 있는지 보여 줍니다.
에이전트
무엇이 있는지 먼저 봄
[이미지: 서류 캐비닛과 문서 일러스트]
정책 카탈로그
리소스: 각 문서가 다루는 내용

> 노트: 원문 제목: A catalog saves exploring (CATALOG AS A RESOURCE). 부제: Tools do things, and resources show what is there. Agent (Sees what exists first) → Policy catalog (A resource: what each document covers).

### 81. `l46-09`

셋째, 여러 서버
모든 서버의 도구가 함께 동작한다
[이미지: 서버와 데이터 상자 일러스트]
ShopAssist 백엔드
MCP 서버
Claude Code
내장 도구 + MCP 도구
이슈 트래커
버그용 MCP 서버

> 노트: 원문 제목: All servers' tools work together (THIRD, SEVERAL SERVERS). ShopAssist backend (MCP server) ← Claude Code (Built-in tools plus MCP tools) → Issue tracker (MCP server for bugs).

### 82. `l46-10`

선택받지 못한 도구
Claude Code는 대신 Grep을 골랐다
개발자
Claude Code
lookup_order
Grep (내장)
환불이 왜 거절됐지?
리포지토리 검색
오래된 테스트 파일, 가짜 주문
추측한 답
"Gets order details."
Grep은 목적이 익숙하고 분명합니다. lookup_order는 선택될 기회조차 없었습니다.

> 노트: 원문 제목: Claude Code picked Grep instead (A TOOL THAT LOST). Developer → Claude Code: Why was the refund refused? / Claude Code → Grep (built-in): search the repository / Grep → Claude Code: old test file, fake order / Claude Code → Developer: a guessed answer. lookup_order의 설명은 "Gets order details."(주문 상세를 가져온다) 한 줄뿐이었습니다. 캡션: Grep's purpose is familiar and clear. lookup_order never got a chance.

### 83. `l46-11`

해결책
더 나은 설명이 선택받는다
{
  "name": "lookup_order",
  "description": (
    "Reads live data from the store's order system. "
    "Returns status, items, amounts, delivery date and return window. "
    "Use it for any question about a real customer order. "
    "Files in the repository hold only code and test data."
  ),
}
설명은 도구가 할 수 있는 일, 반환하는 것, 써야 할 때를 말합니다.

> 노트: 원문 제목: A better description wins (THE FIX). 설명(영문 유지) 의미: 스토어 주문 시스템의 실시간 데이터를 읽는다. 상태, 품목, 금액, 배송일, 반품 기한을 반환한다. 실제 고객 주문에 관한 모든 질문에 사용한다. 리포지토리의 파일에는 코드와 테스트 데이터만 있다. 캡션: A description says what the tool can do, what it returns and when to use it.

### 84. `l46-12`

이긴 도구는 없애지 않는다
Grep은 두고, 설명을 고친다
Grep 제거
진짜 원인을 가리고 다른 작업을 망가뜨린다. 개발자는 코드 작업에 여전히 Grep이 필요하다.
설명 개선
진 도구를 고친다: 무엇을 할 수 있고 무엇을 반환하는지.

> 노트: 원문 제목: Keep Grep, fix the description (DO NOT REMOVE THE WINNER). Remove Grep: Hides the real cause and breaks other work. Developers still need it for code. / Improve the description: Fix the tool that lost: what it can do and what it returns.

### 85. `l46-13`

넷째, 커뮤니티 또는 직접 제작
표준 시스템: 서버를 재사용한다
MCP
Claude Code
팀의 클라이언트
커뮤니티 서버
다른 사람들이 이미 최신으로 유지
Jira
널리 쓰는 이슈 트래커

> 노트: 원문 제목: Standard system: reuse a server (FOURTH, COMMUNITY OR CUSTOM). Claude Code (The team's client) → MCP → Community server (Already kept up to date by others) → Jira (A common issue tracker).

### 86. `l46-14`

넷째, 커뮤니티 또는 직접 제작
자체 규칙: 서버를 직접 만든다
이 규칙을 아는 커뮤니티 서버는 없으므로, 이 서버는 직접 만듭니다.
검증된 고객부터
환불 한도 $500
우리의 오류 약속
[이미지: 서버와 데이터 상자 일러스트]
ShopAssist 서버
팀이 직접 만듦

> 노트: 원문 제목: Own rules: build your own server (FOURTH, COMMUNITY OR CUSTOM). 부제: No community server knows these rules, so we build this one ourselves. Verified customer first / $500 refund limit / Our error contract → ShopAssist server (Built by the team).

### 87. `l46-15`

핵심 정리
연결 하나로 모든 시스템을 쓴다
연결 하나
시스템마다 따로 통합할 필요 없음
도구, 리소스
도구는 행동하고, 리소스는 콘텐츠를 준다
카탈로그 리소스
탐색용 호출을 줄여 준다
모든 서버
연결할 때 도구를 발견해 함께 사용

> 노트: 원문 제목: One connection serves every system (MAIN POINTS). One connection: No custom integration per system / Tools, resources: Tools act, resources provide content / Catalog resource: Saves exploratory calls / All servers: Tools found at connection, used together.

### 88. `l46-16`

핵심 정리
설명을 고치고, Grep은 둔다
선택받지 못한 도구?
설명을 개선하고, 내장 도구는 그대로 둔다
커뮤니티 서버
표준 시스템용
직접 만든 서버
우리만의 워크플로용
다른 도구를 빼앗지 마세요. 도구가 무엇을 할 수 있고 무엇을 반환하는지 설명에 쓰세요.

> 노트: 원문 제목: Fix the description, keep Grep (MAIN POINTS). Tool not chosen?: Improve its description, keep the built-in tool / Community server: For standard systems / Custom server: For your own workflows. 하단: Do not take other tools away: make the description say what the tool can do and what it returns.
