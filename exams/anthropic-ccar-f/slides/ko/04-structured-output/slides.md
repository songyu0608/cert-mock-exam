# CCAR-F 섹션 4. 구조화된 출력과 추출 (한국어판)

원본 아티팩트: https://claude.ai/artifact/P69huibgrQ8LnZD9fE2am3

슬라이드 HTML(`slides/`)에서 화면 글자와 발표자 노트(`<aside>`, 영어 원문)를 뽑은 텍스트다. 자동 생성 파일이므로 고칠 때는 슬라이드 HTML을 기준으로 한다.

## 표지 (`cover`)

슬라이드
Claude Certified Architect – Foundations:
전체 강좌
섹션 4. 구조화된 출력과 추출
25~36강, 슬라이드 109장

> 노트: 원문: Claude Certified Architect Foundations: Complete Course / Section 4. Structured Output and Extraction / Lectures 25-36, 109 slides. 원문에는 26, 28, 29강이 없습니다.

## 25강. 함수, JSON, 스키마 (비개발자용) (`l25`)

25강
함수, JSON, 스키마 (비개발자용)
슬라이드 12장

> 노트: 원문: LECTURE 25 · Functions, JSON and Schemas (for nondevelopers) · 12 slides

### 3. `l25-01`

이 강의를 하는 이유
ShopAssist는 이제 행동해야 한다
프로그램이 읽을 수 있는 데이터
각 값이 제자리에 있다.
요청할 수 있는 행동
이름이 있고, 입력이 명확하다.

> 노트: 원문 제목: ShopAssist now needs to act (WHY THIS LESSON). Data a program can read: Each value sits in its own place. / Actions it can ask for: Named, with clear inputs.

### 4. `l25-02`

세 가지
스키마는 계약이다
1. JSON
데이터의 형식
2. 스키마
데이터의 규칙
3. 도구
행동
스키마는 양쪽 모두에게 데이터가 어떤 모양이어야 하는지 알려 줍니다.

> 노트: 원문 제목: A schema is a contract (THREE THINGS). 1. JSON: The format for the data / 2. Schemas: The rules for the data / 3. Tools: The actions. 하단: It tells both sides what the data must look like.

### 5. `l25-03`

첫째, JSON
프로그램에는 라벨이 붙은 데이터가 필요하다
“지난 주문의 재킷을 반품하고 싶어요. 단추 하나가 망가졌어요.”
[이미지: 노트북으로 채팅하는 고객 일러스트]
Alex
고객
애플리케이션
각 값을 라벨이 붙은 자리에 받아야 함

> 노트: 원문 제목: A program needs labeled data (FIRST, JSON). 인용: "I want to return the jacket from my last order. One button is broken." Alex (Customer) → Application (Needs each piece in its own labeled place).

### 6. `l25-04`

Alex의 요청을 JSON으로
JSON은 이름이 붙은 필드와 값이다
{
  "customer": "Alex",
  "item": "jacket",
  "reason": "broken button",
  "refund_requested": true
}
중괄호는 객체를 나타냅니다: 각각 이름과 값을 가진 필드의 묶음입니다.

> 노트: 원문 제목: JSON is named fields with values (ALEX'S REQUEST AS JSON). JSON(영문 유지) 의미: 고객 Alex, 품목 재킷, 사유 단추 고장, 환불 요청 true. 캡션: Braces mark an object: a group of fields, each with a name and a value.

### 7. `l25-05`

값의 타입
모든 값에는 타입이 있다
{
  "reason": "broken button",
  "price": 89.9,
  "refund_requested": true,
  "problems": ["broken button", "missing belt"]
}
따옴표 안의 텍스트, 따옴표 없는 숫자, true 또는 false, 그리고 대괄호 안의 목록.

> 노트: 원문 제목: Every value has a type (VALUE TYPES). JSON(영문 유지) 의미: reason = 문자열, price = 숫자 89.9, refund_requested = true/false(불리언), problems = 목록(배열) ["단추 고장", "벨트 누락"]. 캡션: Text in quotes, a number without quotes, true or false, and a list in square brackets.

### 8. `l25-06`

의외의 세부 사항
식별자는 항상 문자열이다
문자열로 저장
ORD-0417에는 문자와 대시가 있다.
숫자로 저장하지 않음
식별자로는 계산하지 않고, 0417은 417이 되어 버린다.
주문 번호와 고객 ID는 문자열입니다.

> 노트: 원문 제목: Identifiers are always strings (A SURPRISING DETAIL). Store as a string: ORD-0417 has letters and a dash. / Not as a number: No math is done on it, and 0417 would become 417. 하단: Order numbers and customer IDs are strings.

### 9. `l25-07`

둘째, 스키마
스키마는 데이터의 규칙을 정한다
{
  "type": "object",
  "properties": {
    "reason": {"type": "string"},
    "refund_requested": {"type": "boolean"},
    "comment": {"type": "string"}
  },
  "required": ["reason", "refund_requested"]
}
스키마에는 고객 데이터가 없습니다 - 모든 요청이 갖춰야 할 모양만 있습니다.

> 노트: 원문 제목: A schema sets the rules for data (SECOND, THE SCHEMA). 스키마(영문 유지) 의미: 객체 타입이며 reason(문자열), refund_requested(불리언), comment(문자열) 필드를 가짐. reason과 refund_requested는 필수. 캡션: The schema holds no customer data - only the shape every request must have.

### 10. `l25-08`

스키마가 돕는 이유
스키마가 있으면 코드가 답을 검사할 수 있다
Claude
답을 작성
애플리케이션
값을 저장해야 함
스키마 검사
필드와 타입
스키마는 데이터의 모양을 검사할 뿐, 사실이 맞는지는 검사하지 않습니다.

> 노트: 원문 제목: A schema lets code check answers (WHY A SCHEMA HELPS). Claude (Writes the answer) → Application (Must store the values) → Schema check (Fields and types). 하단: A schema checks the shape of the data, not whether the facts are right.

### 11. `l25-09`

셋째, 함수
함수는 이름이 붙은 행동이다
입력
주문 번호와 확인된 고객 ID
lookup_order
이름이 붙은 행동
출력: 주문
품목, 상태, 배송일

> 노트: 원문 제목: A function is a named action (THIRD, FUNCTIONS). Inputs (Order number and verified customer ID) → lookup_order (A named action) → Output: the order (Items, status, delivery date).

### 12. `l25-10`

Claude에게 도구를 설명한다
Claude는 도구 설명을 읽는다
{
  "name": "lookup_order",
  "description": "Find an order by its number. Use it for order questions.",
  "input_schema": {
    "type": "object",
    "properties": {
      "order_number": {"type": "string"}
    },
    "required": ["order_number"]
  }
}
도구는 세 부분으로 이루어집니다: 이름, 설명, 입력 스키마.

> 노트: 원문 제목: Claude reads a tool description (A TOOL IS DESCRIBED TO CLAUDE). 도구 정의(영문 유지) 의미: 이름 lookup_order / 설명 "주문 번호로 주문을 찾는다. 주문 관련 질문에 사용한다." / 입력 스키마: order_number(문자열, 필수). 캡션: A tool has three parts: a name, a description, and an input schema.

### 13. `l25-11`

도구 호출
Claude가 요청하고, 앱이 일을 한다
Claude
애플리케이션
lookup_order
도구 설명
lookup_order 호출
함수 실행
주문
도구 결과
Claude는 도구 뒤의 코드를 보지 못합니다 - 설명만 봅니다.

> 노트: 원문 제목: Claude asks, the app does the work (CALLING A TOOL). Application → Claude: tool description / Claude → Application: call lookup_order / Application → lookup_order: run function / lookup_order → Application: the order / Application → Claude: tool result. 캡션: Claude never sees the code behind the tool - only its description.

### 14. `l25-12`

핵심 정리
합의를 스키마로 적어 둔다
JSON
이름과 값을 가진 필드
값의 타입
문자열, 숫자, true 또는 false, 배열
식별자
주문 번호는 문자열
스키마
필드, 타입, 필수 여부
도구
이름, 설명, 입력 스키마
Claude와 애플리케이션이 합의해야 할 것이 있으면 스키마로 적어 두세요.

> 노트: 원문 제목: Write the agreement as a schema (MAIN POINTS). JSON: Fields with names and values / Value types: String, number, true or false, array / Identifiers: Order numbers are strings / Schema: Fields, types, required / Tool: Name, description, input schema. 하단: When Claude and your application must agree, write it down as a schema.

## 27강. tool_choice: auto, any, 강제 지정 (`l27`)

27강
tool_choice: auto, any, 강제 지정
슬라이드 13장

> 노트: 원문: LECTURE 27 · tool_choice: auto, any and Forced · 13 slides

### 16. `l27-01`

도구 선택
설정 하나가 도구 호출을 결정한다
요청
ShopAssist 앱
요청을 만든다
Claude
텍스트인가, 도구 호출인가?
Claude가 텍스트로 답해도 되는가, 반드시 도구를 호출해야 하는가, 아니면 지정된 도구 하나를 호출해야 하는가?

> 노트: 원문 제목: One setting decides tool calls (TOOL CHOICE). ShopAssist app (Builds the request) —request→ Claude (Text or tool call?). 하단: May Claude answer in text, must it call a tool, or one named tool?

### 17. `l27-02`

장면
추출에는 도구 호출이 필요하다
문서
필드
[이미지: 노트북으로 채팅하는 고객 일러스트]
고객
첨부 파일이 있는 이메일
ShopAssist
각 첨부 파일을 읽는다
extract_invoice
스키마 = 저장할 필드

> 노트: 원문 제목: Extraction needs a tool call (THE SCENE). Customer (Email with an attachment) —document→ ShopAssist (Reads each attachment) —fields→ extract_invoice (Schema = fields to save).

### 18. `l27-03`

세 가지 설정
선택, 필수, 고정
auto
도구 호출은 선택
any
도구 호출은 필수
강제 도구
지정된 도구 하나로 고정

> 노트: 원문 제목: Optional, required or fixed (THE THREE SETTINGS). auto: A tool call is optional / any: A tool call is required / A forced tool: One named tool is fixed.

### 19. `l27-04`

첫째 설정: auto
auto에서는 Claude가 도구를 건너뛸 수 있다
질문
텍스트
호출
[이미지: 노트북으로 채팅하는 고객 일러스트]
Alex
지원 채팅
Claude
tool_choice: auto
텍스트 답변
지침에 따라
lookup_order
재킷은 어디에 있나요?

> 노트: 원문 제목: Auto lets Claude skip the tool (FIRST SETTING: AUTO). Alex (Support chat) —asks→ Claude (tool_choice: auto) —text→ Text answer (From its instructions) / —call→ lookup_order (Where is the jacket?).

### 20. `l27-05`

둘째 설정: any
any는 호출을 강제하고, 도구는 Claude가 고른다
문서
[이미지: 서류를 든 사람 일러스트]
첨부 파일
유형을 모름
Claude
tool_choice: any
extract_invoice
청구서 필드
extract_return
반품 양식 필드
extract_delivery
배송 전표 필드

> 노트: 원문 제목: Any forces a call, Claude picks (SECOND SETTING: ANY). Attachment (Type unknown) —document→ Claude (tool_choice: any) → extract_invoice (Invoice fields) / extract_return (Return form fields) / extract_delivery (Delivery note fields).

### 21. `l27-06`

셋째 설정: 강제 도구
강제: 지정된 도구를 먼저
문서
그다음
[이미지: 서류를 든 사람 일러스트]
첨부 파일
어떤 문서든
Claude
강제된 도구 호출
extract_metadata
유형, 날짜, 주문
lookup_order
보강, 나중에

> 노트: 원문 제목: Forced: one named tool first (THIRD SETTING: A FORCED TOOL). Attachment (Any document) —document→ Claude (Forced tool call) → extract_metadata (Type, date, order) —then→ lookup_order (Enrichment, later). 보강(enrichment)은 시험 가이드의 용어.

### 22. `l27-07`

요청 하나에만
요청마다 각자의 선택을 정한다
ShopAssist
Claude
extract_metadata
요청 1 - 강제 도구
tool_use
실행
필드
요청 2 - 자체 선택
시험의 형식: tool_choice = {"type": "tool", "name": "extract_metadata"}

> 노트: 원문 제목: Each request sets its own choice (ONE REQUEST ONLY). ShopAssist → Claude: request 1 - forced tool / Claude → ShopAssist: tool_use / ShopAssist → extract_metadata: run it / extract_metadata → ShopAssist: fields / ShopAssist → Claude: request 2 - its own choice. 캡션: The exam's form: tool_choice = {"type": "tool", "name": "extract_metadata"}

### 23. `l27-08`

후속 요청
강제는 첫 단계만 고정한다
요청 1
강제: extract_metadata
요청 2
auto: lookup_order 또는 답변
이후 요청
auto, Claude가 답할 때까지
넷째 값 none: Claude는 어떤 도구도 호출할 수 없습니다.

> 노트: 원문 제목: Forcing fixes only the first step (FOLLOW-UP REQUESTS). Request 1: forced: extract_metadata → Request 2: auto: lookup_order or answer → Later requests: auto, until Claude answers. 하단: A fourth value, none: Claude may not call any tool.

### 24. `l27-09`

현재 제품
현재 모델은 any와 강제를 거부한다
tool_choice
내 요청
시험의 정답: any, 강제 도구
Opus, Sonnet, Fable
claude-opus-5-5, claude-sonnet-5-5, claude-fable-5-1

> 노트: 원문 제목: Current models reject any, forced (THE CURRENT PRODUCT). Your request (Exam answers: any, forced tool) —tool_choice→ Opus, Sonnet, Fable (claude-opus-5-5, claude-sonnet-5-5, claude-fable-5-1). 원문 슬라이드의 주장을 그대로 옮김(다음 슬라이드: 현재 모델에서는 400 오류).

### 25. `l27-10`

현재 코드, 방법 1
auto와 strict 도구 조합이 동작한다
extract_metadata = {
    "name": "extract_metadata",
    "strict": True,
    "input_schema": METADATA_SCHEMA}
response = client.messages.create(
    model=MODEL, max_tokens=1024,
    system="Call extract_metadata for every attachment.",
    tools=[extract_metadata],
    tool_choice={"type": "auto"},
    messages=messages)
auto에서는 여전히 텍스트 답변이 나올 수 있습니다 - tool_use 블록이 돌아왔는지 확인하세요.

> 노트: 원문 제목: Auto plus a strict tool works (CURRENT CODE, OPTION 1). 코드(영문 유지) 의미: strict 옵션을 켠 extract_metadata 도구를 정의하고, 시스템 프롬프트로 "모든 첨부 파일에 extract_metadata를 호출하라"고 지시하며, tool_choice는 auto로 둔다. 캡션: A text reply is still possible with auto - check that a tool_use block came back.

### 26. `l27-11`

현재 코드, 방법 2
또는 답이 스키마를 따르게 한다
# The exam's form - not for current models
tool_choice={"type": "any"}
# current models: 400 error
시험 정답: any 또는 강제 도구. 현재 코드: strict 도구와 auto, 또는 structured outputs.

> 노트: 원문 제목: Or let the answer follow a schema (CURRENT CODE, OPTION 2). 코드(영문 유지) 의미: 시험의 형식이며 현재 모델용이 아님 / tool_choice={"type": "any"} / 현재 모델에서는 400 오류. 캡션: Exam answer: any or a forced tool. Current code: auto with a strict tool, or structured outputs. structured outputs는 답 자체가 스키마를 따르게 하는 API 기능 이름이라 영문 유지.

### 27. `l27-12`

정리
요청마다 선택은 하나
요청 단위
각 요청이 자신의 도구 선택을 정한다.
auto - 텍스트 또는 도구 호출
any - 도구 호출, 도구는 Claude가 고름
강제 - 지정된 도구를 먼저

> 노트: 원문 제목: One choice for every request (RECAP). Per request: Each request sets its own tool choice. / auto - text or a tool call / any - a tool call, Claude picks / forced - one named tool first.

### 28. `l27-13`

시험 vs 코드
시험의 정답과 현재 코드
시험에서는
any 또는 강제 도구로 답한다.
현재 코드에서는
strict 도구와 그 도구를 지정하는 지침을 auto와 함께 쓰거나, structured outputs를 쓴다.
요청마다: Claude가 말해도 되는가, 아무 도구나 호출해야 하는가, 아니면 이 도구인가?

> 노트: 원문 제목: Exam answer versus current code (EXAM VERSUS CODE). On the exam: Answer any or a forced tool. / In current code: Auto with a strict tool and an instruction that names it, or structured outputs. 하단: Per request: may Claude talk, call some tool, or this one?

## 30강. 검증 오류를 담아 재시도하기 (`l30`)

30강
검증 오류를 담아 재시도하기
슬라이드 12장

> 노트: 원문: LECTURE 30 · Retry with the Validation Error · 12 slides

### 30. `l30-01`

재시도가 통하는 이유
재시도는 가끔만 통한다
검증 코드
모든 필드를 검사
Claude
추출 결과를 작성

> 노트: 원문 제목: A retry works only sometimes (WHY A RETRY WORKS). Validation code (Checks every field) → Claude (Writes the extraction).

### 31. `l30-02`

ShopAssist의 현재 상황
대부분의 양식은 통과하지만, 몇몇은 끝내 실패한다
양식
채움
[이미지: 노트북으로 채팅하는 고객 일러스트]
고객
반품 양식을 첨부
ShopAssist
extract_return_form을 채움
우리 코드
모든 필드를 검사
다섯 필드
주문, 품목, 날짜, 사유

> 노트: 원문 제목: Most forms pass; a few never do (WHERE SHOPASSIST STANDS). Customer (Attaches a return form) —form→ ShopAssist (Fills extract_return_form) —fills→ Our code (Checks every field) / ShopAssist → Five fields (order, item, dates, reason).

### 32. `l30-03`

살펴볼 것
재시도는 작성만 고친다
두 종류의 오류
모양과 의미
좋은 재시도
요청에 담는 것
재시도의 한계
데이터가 없을 때
재시도는 Claude가 데이터를 쓴 방식은 고칠 수 있지만, 원본에 없는 데이터를 찾아낼 수는 없습니다.

> 노트: 원문 제목: Retry fixes the writing only (WHAT WE LOOK AT). Two kinds of error: Shape and meaning / A good retry: What the request carries / Where retry stops: When the data is absent. 하단: A retry can fix how Claude wrote the data. It cannot find data the source does not contain.

### 33. `l30-04`

첫째: 두 종류의 오류
스키마 오류는 모양의 문제다
스키마 오류
JSON의 모양이 틀렸다.
필수 필드가 빠짐
숫자가 텍스트로 옴
값이 허용 목록에 없음
시험: 스키마를 쓴 도구 사용이 이것을 없앤다. 현재 API: strict 도구 사용 또는 structured outputs.

> 노트: 원문 제목: A schema error is about shape (FIRST: TWO KINDS OF ERROR). Schema error: The JSON has the wrong shape. / A required field is missing / A number arrives as text / A value is not in the allowed list. 하단: Exam: tool use with a schema removes these. Current API: strict tool use or structured outputs.

### 34. `l30-05`

첫째: 두 종류의 오류
의미 오류는 의미의 문제다
의미 오류
모양은 맞고, 값이 틀렸다.
숫자의 합이 맞지 않음
맞는 값이 틀린 필드에 들어감
스키마는 이것을 보지 못합니다. 모든 필드의 타입이 유효하니까요. 의미는 코드가 검사합니다.

> 노트: 원문 제목: A semantic error is about meaning (FIRST: TWO KINDS OF ERROR). Semantic error: Right shape, wrong value. / The numbers do not add up / The right value sits in the wrong field. 하단: The schema cannot see it: every field has a valid type. Your code checks the meaning.

### 35. `l30-06`

예시: Alex의 재킷
타입이 유효해도 틀릴 수 있다
extraction = {
    "order_number": "ORD-12345678",
    "item": "jacket",
    "order_date": "2026-09-12",
    "delivery_date": "Sept 3rd",
    "reason": "wrong size",
}
# check 1: delivery_date is before order_date → FAIL
# check 2: delivery_date is not YYYY-MM-DD → FAIL
날짜가 서로 바뀌었고 하나는 형식이 틀렸습니다. 스키마는 둘 다 받아들이고, 우리 검사만 이것을 잡아냅니다.

> 노트: 원문 제목: Valid types can still be wrong (EXAMPLE: ALEX'S JACKET). 코드(영문 유지) 의미: 추출 결과 - 주문일 2026-09-12, 배송일 "Sept 3rd", 사유 사이즈 불일치. 검사 1: 배송일이 주문일보다 앞섬 → 실패 / 검사 2: 배송일이 YYYY-MM-DD 형식이 아님 → 실패. 캡션: The dates are swapped and one is badly written. The schema accepts both; only our own checks catch it.

### 36. `l30-07`

둘째: 재시도 요청
재시도에는 모든 것이 담겨야 한다
원래 양식
Alex의 반품 양식
실패한 추출
delivery_date: Sept 3rd
검증 오류
delivery_date가 유효하지 않음
재시도 요청
매번 셋 다
Claude
아무것도 기억하지 못함

> 노트: 원문 제목: A retry must carry everything (SECOND: THE RETRY REQUEST). Original form (Alex's return form) / Failed extraction (delivery_date: Sept 3rd) / Validation error (delivery_date is not valid) → Retry request (All three, every time) → Claude (Remembers nothing).

### 37. `l30-08`

둘째: 재시도 요청
오류가 Claude에게 무엇을 고칠지 알려 준다
{
  "order_date": "2026-09-03",
  "delivery_date": "2026-09-12"
}
Claude는 데이터를 갖고 있었는데 잘못 썼으므로 피드백으로 고쳐집니다. 재시도 횟수는 한두 번으로 제한하세요.

> 노트: 원문 제목: The error tells Claude what to fix (SECOND: THE RETRY REQUEST). 재시도 후 결과(영문 유지): 주문일 2026-09-03, 배송일 2026-09-12. 캡션: Claude had the data and wrote it wrong - so feedback fixes it. Keep the retry bounded: one or two attempts.

### 38. `l30-09`

셋째: 한계
재시도는 없는 데이터를 찾지 못한다
[이미지: 노트북으로 채팅하는 고객 일러스트]
고객
양식을 작성
반품 양식
order_number: 비어 있음
확인 이메일
ShopAssist로 전송되지 않음
Claude
받은 것만 읽음

> 노트: 원문 제목: Retry cannot find absent data (THIRD: THE LIMIT). Customer (Writes the form) → Return form (order_number: empty) → Claude (Reads only what it gets) / Customer ⇢ Confirmation email (Never sent to ShopAssist) ⇢ Claude(점선: 전달되지 않음).

### 39. `l30-10`

재시도 전에
먼저 묻는다: 원본에 있는가?
예
아니요
원본에 있는가?
재시도 전마다 확인
오류를 담아 재시도
모양이나 필드가 틀린 경우
재시도 중단
order_number: null, 누락
[이미지: 노트북으로 채팅하는 고객 일러스트]
Alex
번호를 다시 물어봄

> 노트: 원문 제목: Ask first: is it in the source? (BEFORE ANY RETRY). In the source? (Ask before every retry) —yes→ Retry with the error (Wrong shape or wrong field) / —no→ Stop retrying (order_number: null, missing) → Alex (Asked for the number).

### 40. `l30-11`

재시도가 통하는 곳
재시도는 형식을 고칠 뿐, 없는 것은 못 고친다
재시도가 성공
형식 문제, 구조 오류, 틀린 필드에 들어간 값.
재시도가 실패
정보가 없을 때. 예를 들어 아무도 제공하지 않은 문서에만 있는 값.

> 노트: 원문 제목: Retry fixes format, not absence (WHERE A RETRY WORKS). A retry succeeds: On format problems, structural errors and values in the wrong field. / A retry fails: When the information is absent - for example, a value that lives only in a document nobody provided.

### 41. `l30-12`

복습
오류를 담아 재시도하거나, 멈추고 묻는다
빠진 조각은 어디에 있는가?
문서에 있다: 오류를 담아 재시도. 없다: 멈추고 묻는다.
스키마 오류는 모양의 문제 - strict 도구가 없앤다
의미 오류는 의미의 문제 - 코드가 검사한다
좋은 재시도: 양식, 실패한 추출, 오류
재시도는 형식과 구조를 고칠 뿐, 없는 정보는 고치지 못한다

> 노트: 원문 제목: Retry the error, or stop and ask (REVIEW). Where is the missing piece? In the document: retry with the error. Not there: stop and ask. / Schema errors are about shape - strict tools remove them / Semantic errors are about meaning - your code checks them / A good retry: the form, the failed extraction, the error / Retries fix format and structure, never absent information.

## 31강. 오류를 드러내는 필드 (`l31`)

31강
오류를 드러내는 필드
슬라이드 11장

> 노트: 원문: LECTURE 31 · Fields That Expose Errors · 11 slides

### 43. `l31-01`

문제
유효한 데이터도 틀릴 수 있다
Claude
우리 검증
스토어 시스템
total: 110
모든 검사 통과
이제 틀린 값이 안에 있음
출력 필드를 추가하면 숨은 오류가 코드에 보이게 됩니다.

> 노트: 원문 제목: Valid data can still be wrong (THE PROBLEM). Claude → Our validation: total: 110 / Our validation → Store systems: all checks passed / Store systems → Our validation: wrong value now inside. 캡션: Extra output fields make hidden errors visible to our code.

### 44. `l31-02`

현재 위치
모양은 맞고, 값은 틀리다
이메일
필드
[이미지: 노트북으로 채팅하는 고객 일러스트]
고객
청구서가 첨부된 이메일
ShopAssist
추출 도구를 채움
우리 코드
모든 필드를 검증
Claude에게 답만 요청하지 말고, 문제의 증거도 함께 요청하세요.

> 노트: 원문 제목: Right shape, wrong value (WHERE WE ARE). Customer (Email with an invoice) —email→ ShopAssist (Fills the extraction tool) —fields→ Our code (Validates every field). 하단: Ask Claude for the evidence of a problem, not only for the answer.

### 45. `l31-03`

오늘의 필드
세 필드가 숨은 오류를 드러낸다
두 개의 합계
명시된 값 옆에 계산한 값
충돌 플래그
원본이 스스로 모순됨
감지된 패턴
리뷰 지적 사항마다

> 노트: 원문 제목: Three fields expose hidden errors (TODAY'S FIELDS). Two totals: Calculated next to stated / Conflict flag: The source disagrees with itself / Detected pattern: On each review finding.

### 46. `l31-04`

첫째, 합계
합계 필드가 하나면 차이가 숨는다
품목
하나
[이미지: 서류를 든 사람 일러스트]
Alex의 청구서
품목 $100, 합계 $110
Claude
합계 필드가 하나뿐
total: ?
110, 또는 조용히 100

> 노트: 원문 제목: One total field hides the gap (FIRST, THE TOTALS). Alex's invoice (Items $100, total $110) —items→ Claude (Has one total field) —one→ total: ? (110, or quietly 100).

### 47. `l31-05`

필드 둘, 비교 하나
두 합계가 차이를 드러낸다
extraction = {
    "stated_total": 110.00,      # printed on the document
    "calculated_total": 100.00,  # sum of the line items
}
# our code compares the two
if extraction["stated_total"] ≠ extraction["calculated_total"]:
    flag_for_review(extraction)  # flagged, not saved
두 값 모두 스키마를 통과합니다 - 비교해야만 오류가 보입니다.

> 노트: 원문 제목: Two totals expose the gap (TWO FIELDS, ONE COMPARISON). 코드(영문 유지) 의미: stated_total = 문서에 인쇄된 합계 110.00 / calculated_total = 품목 금액의 합 100.00 / 코드가 둘을 비교해 다르면 검토 대상으로 표시하고 저장하지 않음. 캡션: Both values pass the schema - only the comparison shows the error.

### 48. `l31-06`

둘째, 충돌 플래그
양식 하나, 서로 다른 두 답
환불 칸에 체크됨
양식은 환불을 요청한다.
의견란
“그냥 새것으로 보내 주세요.”
깔끔한 답이 진짜 질문을 숨깁니다: 환불인가, 교환인가?

> 노트: 원문 제목: One form, two different answers (SECOND, THE CONFLICT FLAG). The refund box is ticked: The form asks for a refund. / The comment line: "Please just send me a new one." 하단: A clean answer hides a real question: refund or replacement?

### 49. `l31-07`

충돌 필드
플래그가 조용한 추측을 막는다
extraction = {
    "conflict_detected": True,
    "conflict_note": "Form: refund. Comment: replacement",
}
if extraction["conflict_detected"]:
    # no refund is started
    ask_customer(extraction["conflict_note"])
플래그가 환불을 멈추고, 결정은 고객이 합니다.

> 노트: 원문 제목: A flag stops a silent guess (THE CONFLICT FIELDS). 코드(영문 유지) 의미: conflict_detected = True / conflict_note = "양식: 환불. 의견: 교환" / 충돌이 감지되면 환불을 시작하지 않고 conflict_note로 고객에게 물어봄. 캡션: The flag stops the refund, and the customer decides.

### 50. `l31-08`

셋째, 감지된 패턴
무시된 코멘트에는 패턴 이름이 필요하다
리뷰 봇 (CI 작업)
Claude
개발자
풀 리퀘스트 diff
지적 사항
PR 코멘트
무시됨
+ detected_pattern
패턴 예: “빈 목록을 반환하는 검색”.

> 노트: 원문 제목: Dismissals need a pattern name (THIRD, THE DETECTED PATTERN). Review bot (CI job) → Claude: pull request diff / Claude → Review bot: findings / Review bot → Developer: comments on the PR / Developer → Review bot: dismissed / Claude → Review bot: + detected_pattern. 캡션: Example pattern: "a search that returns an empty list".

### 51. `l31-09`

패턴이 돕는 이유
무시된 코멘트를 패턴별로 센다
필드가 있으면
무시된 지적 사항 40개 중 30개가 같은 패턴이다.
필드가 없으면
자유 텍스트로 된 코멘트 30개가 따로따로 있을 뿐이다.
그 패턴 하나의 기준만 고치고, 봇의 나머지는 그대로 두세요.

> 노트: 원문 제목: Count dismissals by pattern (WHY THE PATTERN HELPS). With the field: 30 of 40 dismissed findings share one pattern. / Without the field: Thirty separate comments in free text. 하단: Fix the criteria for that one pattern and leave the rest of the bot alone.

### 52. `l31-10`

한계 하나
필드는 오류를 보여 주고, 잡는 것은 코드다
Claude가 추출
답과 증거 필드
코드가 검사
비교, 플래그, 집계
필드가 Claude를 정확하게 만들지는 않습니다. 오류를 보이게 만들 뿐입니다.

> 노트: 원문 제목: Fields show errors, code catches (ONE LIMIT). Claude extracts (Answer plus evidence fields) → Your code checks (Compares, flags, counts). 하단: The fields do not make Claude correct. They make errors visible.

### 53. `l31-11`

기억할 것
필드를 추가하고, 비교는 코드에 맡긴다
두 개의 합계
명시 vs 계산: 다르면 플래그
충돌 감지
아무것도 조용히 고르지 않음
감지된 패턴
무시된 지적 사항을 패턴별로 분석
유효한 데이터 안에 오류가 숨을 수 있다면, 그것을 드러내는 필드를 추가하세요.

> 노트: 원문 제목: Add a field, let code compare (WHAT TO REMEMBER). Two totals: Stated vs calculated: when they differ, flag it / Conflict detected: Nothing is chosen silently / Detected pattern: Study dismissed findings by pattern. 하단: When an error can hide inside valid data, add a field that exposes it.

## 32강. 신뢰도 캘리브레이션과 사람의 검토 (`l32`)

32강
신뢰도 캘리브레이션과 사람의 검토
슬라이드 14장

> 노트: 원문: LECTURE 32 · Confidence Calibration and Human Review · 14 slides

### 55. `l32-01`

사람의 검토
사람이 확인할 것을 고른다
지난 강의
숨은 오류를 드러내는 필드: 충돌 플래그와 계산한 합계.
이번 강의
어떤 추출 결과를 사람이 확인해야 하는지 정하기.
사람의 시간은 부족하고, 모델이 자기 작업에 내린 평가는 증거가 아닙니다.

> 노트: 원문 제목: Choose what a person must check (HUMAN REVIEW). Last lesson: Fields that expose hidden errors: a conflict flag and a calculated total. / This lesson: Deciding which extractions a person must check. 하단: People have little time - and the model's opinion of its own work is not proof.

### 56. `l32-02`

상황
문서 800건, 검토 시간 1시간
고객 문서
하루 약 800건
ShopAssist
도구를 채우고, 코드가 검증
[이미지: 헤드셋을 쓴 지원팀 담당자 일러스트]
지원팀
하루 1시간: 약 40건 확인

> 노트: 원문 제목: 800 documents, one hour of review (THE SITUATION). Customer documents (About 800 a day) → ShopAssist (Fills the tool, code validates) → Support team (1 hour a day: about 40 checks).

### 57. `l32-03`

핵심 아이디어
신뢰도는 주장이지, 증거가 아니다
Claude의 신뢰도
주장일 뿐이다. 레이블이 있는 데이터가 그것을 증거로 바꾼다.
필드별 신뢰도를, 정답을 아는 데이터로 확인
자동화 전에 그룹별 정확도 측정
출시 후에도 계속 측정하는 무작위 샘플

> 노트: 원문 제목: Confidence is a claim, not proof (THE KEY IDEA). Claude's confidence: Only a claim. Labeled data turns it into evidence. / Confidence for each field, checked on known answers / Accuracy for each group, before automating / Random samples that keep measuring after launch.

### 58. `l32-04`

필드별 신뢰도
양식 전체가 아니라 필드마다 점수를 매긴다
{
  "order_number": {"value": "ORD-48213", "confidence": 0.98},
  "return_reason": {"value": "not as expected", "confidence": 0.52},
  "refund_amount": {"value": "59.90", "confidence": 0.90},
  "delivery_date": {"value": "2026-09-30", "confidence": 0.84}
}
반품 양식 하나: 필드마다 각자의 의심이 있습니다 - 하지만 그 점수는 Claude 자신의 추정일 뿐입니다.

> 노트: 원문 제목: Score every field, not the form (CONFIDENCE FOR EACH FIELD). JSON(영문 유지) 의미: 주문 번호 ORD-48213(신뢰도 0.98), 반품 사유 "기대와 다름"(0.52), 환불 금액 59.90(0.90), 배송일 2026-09-30(0.84). 캡션: One return form: each field carries its own doubt - but the score is only Claude's own estimate.

### 59. `l32-05`

캘리브레이션, 1단계
정답을 아는 데이터로 점수를 시험한다
문서
정답 값
답
레이블이 있는 검증 세트
모든 필드의 정답 값을 사람이 적어 둠
ShopAssist
같은 문서를 추출
비교
높게 매긴 필드 중 몇 개가 맞았는가?

> 노트: 원문 제목: Test the scores on known answers (CALIBRATION, STEP ONE). Labeled validation set (A person wrote the correct value of every field) —documents→ ShopAssist (Extracts the same documents) / validation set —known values→ Compare / ShopAssist —answers→ Compare (Of all fields rated high, how many were right?).

### 60. `l32-06`

캘리브레이션, 2단계
필드마다 자체 임계값을 둔다
주문 번호
높은 점수: 100건 중 99건 정답
반품 사유
높은 점수: 100건 중 85건 정답
임계값
기준 점수: 그 아래면 사람이 확인
확인 없이 저장
높은 점수면 충분
더 엄격하게, 또는 사람
더 높은 기준, 또는 검토

> 노트: 원문 제목: Each field gets its own threshold (CALIBRATION, STEP TWO). Order number (High scores: right 99 in 100) / Return reason (High scores: right 85 in 100) → Threshold (Cut-off score: below it, a person checks) → Save unchecked (High score is enough) / Stricter or a person (Higher cut-off, or review).

### 61. `l32-07`

한 시간 계획하기
오류 비용이 큰 곳에 한 시간을 쓴다
충돌 플래그
원본이 스스로 모순됨
금액 또는 신원
낮은 신뢰도: 환불, 주문 번호
작은 의심
나중을 위해 대기열에서 대기
신뢰도는 검토를 어디로 보낼지 정할 뿐, 무엇이 맞는지 정하지 않습니다.

> 노트: 원문 제목: Spend the hour where errors cost (PLANNING THE HOUR). Conflict flag: The source disagrees with itself → Money or identity: Low confidence: refund, order number → Smaller doubts: Wait in a queue for later. 하단: Confidence decides where the review goes - not what is correct.

### 62. `l32-08`

그룹별 정확도
전체 97%가 약점을 숨길 수 있다
검증 세트
전체 정확도 97%
반품 양식
대부분의 문서 - 거의 항상 정답
[이미지: 상자를 실은 배송 트럭 일러스트]
배송 전표
20건 중 1건 - 배송일 정답률 70%

> 노트: 원문 제목: 97% overall can hide a weak spot (ACCURACY FOR EACH GROUP). Validation set (97% accurate overall) → Return forms (Most documents - almost always right) / Delivery notes (1 in 20 - delivery date right 70%).

### 63. `l32-09`

세그먼트
검증된 세그먼트만 자동화한다
약함
신뢰할 수 있음
배송 전표: 날짜
정답률 70% - 30일 반품 기간을 결정
사람 검토
실패하는 레이아웃의 few-shot 예시로 고칠 때까지 유지
반품 양식: 주문 번호
세그먼트별로 정확도 측정
자동화
세그먼트의 신뢰성이 입증됨

> 노트: 원문 제목: Automate only proven segments (SEGMENTS). Delivery note: date (70% right - decides the 30-day window) —weak→ Human review (Keep it while few-shot examples of failing layouts fix it) / Return form: order number (Accuracy measured per segment) —reliable→ Automate (The segment proved reliable).

### 64. `l32-10`

무작위 샘플
확신에 찬 오류는 눈에 띄지 않는다
ShopAssist
모든 필드를 추출하고 점수를 매김
스토어 시스템
높은 신뢰도: 아무도 보지 않음
[이미지: 헤드셋을 쓴 지원팀 담당자 일러스트]
지원팀
Claude가 의심하는 것만 봄

> 노트: 원문 제목: Confident errors go unseen (RANDOM SAMPLES). ShopAssist (Extracts and scores every field) → Store systems (High confidence: nobody looks) / Support team (Sees only what Claude doubts).

### 65. `l32-11`

층화 무작위 샘플링
모든 그룹에서 무작위로 샘플을 뽑는다
하루의 추출 결과
각 건은 정확히 한 그룹에 속함
그룹
문서 유형 x 신뢰도: 높음, 중간, 낮음
무작위 샘플
그룹마다 몇 건씩, 예: 40건 확인 중 5건

> 노트: 원문 제목: Sample every group at random (STRATIFIED RANDOM SAMPLING). Daily extractions (Every one lands in exactly one group) → Groups (Document type x confidence: high, medium, low) → Random sample (A few from each group, e.g. 5 of the 40 checks).

### 66. `l32-12`

샘플이 주는 것
실제 오류율과 조기 경보
배송 파트너
ShopAssist
스토어 시스템
일일 샘플
새 전표 레이아웃
높은 점수, 틀린 날짜
무작위 확인
틀린 날짜 발견
아무도 확인하지 않는 출력의 실제 오류율 - 그리고 틀린 기록 수천 건이 저장되기 전에 받는 경고.

> 노트: 원문 제목: A real error rate, an early alarm (WHAT THE SAMPLE GIVES). Shipping partner → ShopAssist: New note layout / ShopAssist → Store systems: High score, wrong date / Daily sample → Store systems: Random check / Store systems → Daily sample: Wrong dates caught. 캡션: A real error rate for output nobody checks - and a warning before thousands of wrong records are saved.

### 67. `l32-13`

기억할 것
확인할 것을 고르는 네 가지 규칙
증거가 결정한다
모델이 자기 작업에 내린 평가가 아니라.
문서 단위가 아니라 필드 단위 신뢰도 점수
레이블이 있는 세트로 점수를 확인하고, 필드마다 임계값 하나
충돌, 그리고 신뢰도가 낮은 금액이나 신원이 먼저
전체 숫자 하나가 아니라 문서 유형과 필드별 정확도

> 노트: 원문 제목: Four rules for choosing checks (WHAT TO REMEMBER). Evidence decides: Not the model's opinion of its own work. / A confidence score for each field, not each document / Check scores on a labeled set; one threshold per field / Conflicts and low-confidence money or identity go first / Accuracy by document type and field, not one overall number.

### 68. `l32-14`

핵심 메시지
자기 평가보다 증거
증거
레이블이 있는 세트, 세그먼트 정확도, 모든 그룹의 무작위 샘플.
Claude 자신의 의견
측정되기 전까지는 주장일 뿐.
검토자의 시간을 어디에 쓸지는 증거가 정하게 하세요.

> 노트: 원문 제목: Evidence beats self-assessment (THE TAKEAWAY). Evidence: A labeled set, segment accuracy, random samples from every group. / Claude's own opinion: A claim until it is measured. 하단: Let evidence decide where reviewers spend their time.

## 33강. 배치 처리: 언제 맞는가 (`l33`)

33강
배치 처리: 언제 맞는가
슬라이드 12장

> 노트: 원문: LECTURE 33 · Batch Processing: When It Fits · 12 slides

### 70. `l33-01`

현재 위치
고객은 실시간 답변을 기다린다
[이미지: 노트북으로 채팅하는 고객 일러스트]
고객
질문하고, 문서를 첨부
ShopAssist
지원 어시스턴트
Claude API
일반 API 호출

> 노트: 원문 제목: Customers wait for live answers (WHERE WE ARE). Customer (Asks, attaches documents) → ShopAssist (Support assistant) → Claude API (A normal API call).

### 71. `l33-02`

새로운 작업
야간 감사는 한 번 더 살펴보는 것이다
사람?
종료된 채팅
그날의 모든 대화
야간 감사
한 번 더 살펴봄
정책이 맞았나?
올바르게 적용되었는가?
사람이 필요한가?
누군가 이 건을 확인해야 하는가?

> 노트: 원문 제목: A nightly audit is a second look (THE NEW JOB). Closed chats (All of the day's conversations) → Nightly audit (A second look) → Policy right? (Was it applied correctly?) / —person?→ Person needed? (Should someone check the case?).

### 72. `l33-03`

핵심 아이디어
배치는 더 싸지만 더 느리다
가격과 대기
비용은 절반, 최대 24시간
도구
배치 안에서는 도구가 실행되지 않음
빈도
제출 주기와 마감 시한
아무도 답을 기다리지 않을 때만 배치를 쓰세요.

> 노트: 원문 제목: A batch is cheaper but slower (THE KEY IDEA). Price and waiting: Half the cost, up to 24 h / Tools: No tool runs in a batch / How often: Submissions and the deadline. 하단: Use a batch only when nobody is waiting for the answer.

### 73. `l33-04`

1 - 가격과 대기 시간
배치는 비용이 절반이지만 시간이 걸린다
내 애플리케이션
요청을 많이 보냄
Message Batches API
Claude가 백그라운드에서 처리
가격은 약 절반
일반 호출과 비교해
최대 24시간
지연 시간 보장 없음

> 노트: 원문 제목: A batch costs half but takes time (1 - PRICE AND WAITING TIME). Your application (Sends many requests) → Message Batches API (Claude works in the background) → About half the price (Compared with normal calls) / Up to 24 hours (No latency guarantee).

### 74. `l33-05`

두 작업 비교
감사는 아무도 기다리지 않는다
야간 감사
스토어가 문을 닫은 동안 실행
[이미지: 헤드셋을 쓴 지원팀 담당자 일러스트]
지원팀
다음 날 아침 결과를 읽음
배치에 적합
주간 보고서와 테스트 생성도

> 노트: 원문 제목: Nobody waits for the audit (TWO JOBS COMPARED). Nightly audit (Runs while the store is closed) → Support team (Reads results next morning) → Fits a batch (Weekly reports and test generation too).

### 75. `l33-06`

두 작업 비교
머지를 막는 검사는 동기 방식으로 남는다
개발자
리뷰 봇
Claude API
풀 리퀘스트 열림
리뷰 요청
답변, 같은 호출
보고: 머지 허용
개발자가 기다리고 있고, “대개 빠르다”는 약속이 아닙니다 - 머지를 막는 검사에는 배치를 쓰지 않습니다.

> 노트: 원문 제목: A blocking check stays synchronous (TWO JOBS COMPARED). Developer → Review bot: pull request opened / Review bot → Claude API: review request / Claude API → Review bot: answer, same call / Review bot → Developer: report: merge allowed. 캡션: The developer waits, and usually fast is not a promise - no batch for a blocking check.

### 76. `l33-07`

2 - 배치 안의 도구
도구는 우리 코드가 실행한다
애플리케이션
Claude
lookup_order
요청 + 도구
tool_use: lookup_order
lookup_order 실행
주문 데이터
새 요청 + 결과
실시간 채팅에서는 새 요청으로 루프가 이어집니다.

> 노트: 원문 제목: Our code runs the tool (2 - TOOLS INSIDE A BATCH). Application → Claude: request + tools / Claude → Application: tool_use: lookup_order / Application → lookup_order: run lookup_order / lookup_order → Application: order data / Application → Claude: new request + result. 캡션: In a live chat, the loop goes on with a new request.

### 77. `l33-08`

2 - 배치 안의 도구
배치는 도구 요청에서 멈춘다
배치 요청
lookup_order를 정의
Claude
tool_use로 답함
여기서 멈춤
도구는 실행되지 않음. 계속하려면 새 요청이 필요

> 노트: 원문 제목: A batch stops at the tool request (2 - TOOLS INSIDE A BATCH). Batch request (Defines lookup_order) → Claude (Answers with tool_use) → Stops here (No tool runs. Going on needs a new request.)

### 78. `l33-09`

2 - 배치 안의 도구
사실을 각 요청에 넣는다
[이미지: 서버와 데이터 상자 일러스트]
주문 시스템
ORD-12345678
반품 정책
스토어의 규칙
ShopAssist 코드
먼저 읽고, 그다음 요청을 만듦
배치 요청
대화 + 주문 + 정책

> 노트: 원문 제목: Put the facts into each request (2 - TOOLS INSIDE A BATCH). ShopAssist code (Reads first, then builds the request) ← Order system (ORD-12345678) / Return policy (The store's rules); ShopAssist code → Batch request (Conversation + order + policy).

### 79. `l33-10`

3 - 제출 빈도
SLA가 마감 시한을 정한다
채팅 종료
감사 시계가 시작됨
다음 제출
채팅이 다음 배치에 합류
배치 실행
최대 24시간
결과 마감
30시간 이내
SLA: 서비스 수준 협약(service level agreement) - 약속된 마감 시한.

> 노트: 원문 제목: The SLA sets the deadline (3 - HOW OFTEN TO SUBMIT). Chat closes: The audit clock starts → Next submission: Chats join the next batch → Batch runs: Up to 24 hours → Result due: Within 30 hours. 하단: SLA: a service level agreement - a promised deadline.

### 80. `l33-11`

3 - 제출 빈도
주기 + 24시간이 SLA 안에 들어가야 한다
SLA = 30
BATCH_MAX = 24
interval = 4           # submit every 4 hours
worst_case = 4 + 24     # 28 hours: fits, 2 h spare
interval = 24          # one batch a night
worst_case = 24 + 24    # almost 48 hours: too late
최악의 경우 = 주기 + 24시간 - 이 값이 SLA 안에 있어야 합니다.

> 노트: 원문 제목: Interval plus 24 hours must fit (3 - HOW OFTEN TO SUBMIT). 코드(영문 유지) 의미: SLA 30시간, 배치 최대 처리 24시간. 4시간마다 제출하면 최악의 경우 28시간으로 들어맞고 2시간 여유가 남는다. 하룻밤에 한 번(24시간 주기) 제출하면 거의 48시간으로 너무 늦다. 캡션: Worst case = interval + 24 h - it must stay inside the SLA.

### 81. `l33-12`

정리
물어라: 누가 기다리고 있는가?
가격은 절반
24시간, 지연 시간 보장 없음
아무도 기다리지 않음
야간 및 주간 작업
사실을 먼저
배치 안에서는 도구가 실행되지 않음
제출 계획
주기 + 24시간이 SLA 안에
작업을 배치로 옮기기 전에: 누군가 이 답을 기다리고 있는가?

> 노트: 원문 제목: Ask: is anyone waiting? (RECAP). Half the price: 24 h, no latency guarantee / Nobody waiting: Overnight and weekly jobs / Facts first: No tool runs in a batch / Plan submissions: Interval + 24 h fits the SLA. 하단: Before you move a job to batches: is anyone waiting for this answer?

## 34강. 배치 실행: custom_id, 실패, 샘플 (`l34`)

34강
배치 실행: custom_id, 실패, 샘플
슬라이드 10장

> 노트: 원문: LECTURE 34 · Running a Batch: custom_id, Failures and Samples · 10 slides

### 83. `l34-01`

야간 작업
야간 배치가 모든 채팅을 감사한다
[이미지: 노트북으로 채팅하는 고객 일러스트]
종료된 채팅
그날의 대화
야간 감사
배치: 가격은 절반
정책이 맞았나?
올바르게 적용되었는가
사람이 확인
사람이 볼 필요가 있음

> 노트: 원문 제목: A nightly batch audits every chat (THE NIGHTLY JOB). Closed chats (The day's conversations) → Nightly audit (A batch: half the price) → Policy right? (Was it applied correctly) / Person check? (Needs a human look).

### 84. `l34-02`

현재 위치
모든 요청에는 각자의 라벨이 있다
우리 코드
요청을 하나씩 만듦
[이미지: 서버와 데이터 상자 일러스트]
Message Batches API
결과는 나중에 옴

> 노트: 원문 제목: Every request has its own label (WHERE WE ARE). Our code (Builds each request) → Message Batches API (Results come later).

### 85. `l34-03`

세 가지 습관
배치를 싸게 유지하는 세 가지 습관
ID로 짝짓기
각 결과의 custom ID를 사용
실패만 다시 제출
먼저 고치고, 그것만 보냄
샘플로 시험
전체 배치 전에

> 노트: 원문 제목: Three habits keep a batch cheap (THREE HABITS). Match by ID: Use the custom ID of each result / Resubmit failures: Fix them first, send only those / Test a sample: Before the full batch.

### 86. `l34-04`

첫째 습관: 짝짓기
결과에는 같은 custom ID가 붙어 있다
{
  "custom_id": "audit-conv-0412",
  "result": {
    "type": "succeeded",
    "message": {"content": ["..."]}
  }
}
직접 고른 라벨이 붙은 요청과, 같은 라벨이 붙은 그 결과.

> 노트: 원문 제목: Results carry the same custom ID (FIRST HABIT: MATCHING). JSON(영문 유지) 의미: custom_id "audit-conv-0412"인 요청의 결과 - 유형 succeeded(성공), 메시지 내용. 캡션: A request with a label you choose, and its result with the same label.

### 87. `l34-05`

첫째 습관: 짝짓기
위치가 아니라 ID로 짝짓는다
결과
보낸 순서와 다를 수 있음
우리 코드
각 custom ID를 읽음
기록
대화마다 하나

> 노트: 원문 제목: Match by ID, never by position (FIRST HABIT: MATCHING). Results (Any order, not as sent) → Our code (Reads each custom ID) → Records (One per conversation).

### 88. `l34-06`

둘째 습관: 실패
각 결과는 성공 여부를 알려 준다
{"custom_id": "audit-conv-0411", "result": {"type": "succeeded"}}
{"custom_id": "audit-conv-0412", "result": {"type": "succeeded"}}
{"custom_id": "audit-conv-0413", "result": {"type": "errored", "error": {
    "type": "invalid_request_error", "message": "prompt is too long"}}}
{"custom_id": "audit-conv-0414", "result": {"type": "succeeded"}}
실패한 결과에는 custom ID와 이유가 적혀 있습니다.

> 노트: 원문 제목: Each result says if it succeeded (SECOND HABIT: FAILURES). JSON(영문 유지) 의미: 0411, 0412, 0414는 succeeded(성공). 0413은 errored(실패) - 오류 유형 invalid_request_error, 메시지 "prompt is too long"(프롬프트가 너무 김). 캡션: A failed result names its custom ID and the reason.

### 89. `l34-07`

둘째 습관: 실패
고친 실패만 다시 제출한다
결과
전체를 다시 보내지 않음
실패한 ID
conv-0413
먼저 고침
긴 채팅을 분할
작은 배치
0413-a, 0413-b

> 노트: 원문 제목: Resubmit only the fixed failures (SECOND HABIT: FAILURES). Results (Never resend all) → Failed IDs (conv-0413) → Fix first (Split long chat) → Small batch (0413-a, 0413-b).

### 90. `l34-08`

셋째 습관: 샘플
약한 프롬프트는 조용히 실패한다
모두 성공
모든 요청이 돌아옴
모양은 정상
매번 유효한 결과
틀린 감사
30일 반품 기간을 잘못 계산
전부 다시 실행
비용을 두 번 냄
성공한 배치도 틀릴 수 있습니다.

> 노트: 원문 제목: A weak prompt fails quietly (THIRD HABIT: THE SAMPLE). All succeed: Every request returns → Right shape: Valid result every time → Wrong audits: 30-day window miscounted → Run all again: Paid twice. 하단: A batch that succeeds can still be wrong.

### 91. `l34-09`

셋째 습관: 샘플
작은 샘플로 먼저 시험한다
샘플 채팅 50개
다양한 유형
작은 배치
프롬프트 실행
[이미지: 체크리스트를 작성하는 테스터 일러스트]
사람
결과를 읽음
고치고 다시 실행
프롬프트, 스키마, 검사
전체 배치
제대로 보일 때만

> 노트: 원문 제목: Test a small sample first (THIRD HABIT: THE SAMPLE). 50 sample chats (Different kinds) → Small batch (Run the prompt) → A person (Reads the results) → Fix and rerun (Prompt, schema, checks) ⇢ Small batch(다시 실행) / Fix and rerun → Full batch (Only when it looks right).

### 92. `l34-10`

핵심 정리
라벨, 작은 시험, 실패만 재전송
custom ID
위치가 아니라 ID로 짝짓기
고친 뒤 다시 제출
실패한 요청만
샘플 먼저
작은 배치로 프롬프트를 다듬기
작은 샘플로 시험하고, 모든 요청에 라벨을 붙이고, 실패한 것에만 다시 비용을 내세요.

> 노트: 원문 제목: Label, test small, resend failures (MAIN POINTS). Custom ID: Match by ID, never by position / Fix, then resubmit: Only the failed requests / Sample first: Refine the prompt on a small batch. 하단: Test on a small sample, label every request, and pay again only for what failed.

## 35강. 추출 사례: 유효한 필드 (`l35`)

35강
추출 사례: 유효한 필드
슬라이드 14장

> 노트: 원문: LECTURE 35 · Extraction Case: Valid Fields · 14 slides

### 94. `l35-01`

추출 시나리오
추출된 필드에 필요한 세 가지
매번 파싱됨
유효한 JSON, 다른 텍스트 없음
지어내지 않음
출처 없는 값은 없음
하나의 형식
모든 기록이 같은 모양

> 노트: 원문 제목: Three needs for extracted fields (THE EXTRACTION SCENARIO). Parse every time: Valid JSON, no extra text / Never invented: No value without a source / One format: The same shape in every record.

### 95. `l35-02`

우리 스토어의 작업
야간 가져오기가 회계 시스템에 데이터를 넣는다
[이미지: 서류를 든 사람 일러스트]
공급업체 청구서
재킷, 램프, 헤드폰
가져오기 프로그램
매일 밤 실행
Claude
필드를 반환
회계 시스템
읽을 수 없는 기록 하나가 가져오기를 멈춤

> 노트: 원문 제목: A nightly import feeds accounting (OUR STORE'S JOB). Supplier invoices (Jackets, lamps, headphones) → Import program (Runs every night) → Claude (Returns the fields) / Accounting system (One unreadable record stops the import).

### 96. `l35-03`

결정 1 - 파싱
JSON을 요청한다고 보장되지는 않는다
# About 2 answers in 100 cannot be parsed
Sure! Here are the invoice fields:
{"supplier": "Nordic Lamps", "total": 420}
{"supplier": "Nordic Lamps", "total": 420
# The prompt: Return the fields as JSON.
가져오기는 모든 기록을 읽어야 하므로, 첫 단계가 아니라 보장이 필요합니다.

> 노트: 원문 제목: Asking for JSON is no guarantee (DECISION 1 - PARSING). 코드(영문 유지) 의미: 답변 100개 중 약 2개는 파싱할 수 없다. 예 1: JSON 앞에 "물론이죠! 청구서 필드는 다음과 같습니다:"라는 텍스트가 붙음. 예 2: 닫는 중괄호가 빠짐. 프롬프트: 필드를 JSON으로 반환하라. 캡션: The import must read every record, so it needs a guarantee, not a first step.

### 97. `l35-04`

결정 1 - 파싱
여전히 깨지는 두 가지 해결책
더 강한 표현
“유효한 JSON만 반환하고, 다른 것은 쓰지 마라.” Claude는 지침을 대부분 따르지만, 매번 따르지는 않는다.
파싱이 실패하면 재시도
오류가 일어난 뒤에야 잡는다. 두 번째 호출 비용을 내야 하고, 다음 청구서도 깨질 수 있다.

> 노트: 원문 제목: Two fixes that still break (DECISION 1 - PARSING). Louder wording: "Return only valid JSON, nothing else." Claude follows an instruction most of the time, not every time. / Retry when parsing fails: It catches the error only after it happens. We pay for a second call, and the next invoice can break too.

### 98. `l35-05`

결정 1 - 파싱
도구 스키마가 파싱을 보장한다
tool = {
    "name": "record_invoice",
    "strict": True,
    "input_schema": {
        "type": "object",
        "properties": {"supplier": {"type": "string"},
                      "total": {"type": "number"}},
        "required": ["supplier", "total"],
        "additionalProperties": False,
    },
}
strict 도구 사용: Claude가 청구서 스키마를 채웁니다. structured outputs도 같은 보장을 줍니다.

> 노트: 원문 제목: A tool schema guarantees parsing (DECISION 1 - PARSING). 코드(영문 유지) 의미: strict를 켠 record_invoice 도구. supplier(문자열)와 total(숫자)이 필수이고, 그 밖의 필드는 허용하지 않음(additionalProperties: False). 캡션: Strict tool use: Claude fills the invoice schema. Structured outputs give the same guarantee.

### 99. `l35-06`

결정 1 - 의미
모양이 유효해도 틀릴 수 있다
record = {
    "items": [120, 150, 140],
    "stated_total": 420,       # printed on the invoice
    "calculated_total": 410,   # sum of the items
}
if record["stated_total"] ≠ record["calculated_total"]:
    hold_for_review(record)
스키마는 모양을 보장하고, 의미는 코드가 검사합니다.

> 노트: 원문 제목: Valid shape can still be wrong (DECISION 1 - MEANING). 코드(영문 유지) 의미: 품목 120, 150, 140 / 청구서에 인쇄된 합계 420 / 품목의 합 410. 두 합계가 다르면 기록을 검토 대기로 보류. 캡션: The schema guarantees the shape, and your code checks the meaning.

### 100. `l35-07`

결정 2 - 지어낸 값
필수 필드는 추측을 부른다
[이미지: 서류를 든 사람 일러스트]
소규모 공급업체 청구서
PO 번호가 인쇄되지 않음
Claude
po_number가 필수
저장된 기록
PO-48213 - 발행된 적 없음

> 노트: 원문 제목: A required field invites a guess (DECISION 2 - INVENTED VALUES). Small supplier invoice (No PO number printed) → Claude (po_number is required) → Saved record (PO-48213 - never issued). PO는 구매 주문(purchase order).

### 101. `l35-08`

결정 2 - 지어낸 값
재시도로는 데이터를 만들어 낼 수 없다
가져오기 프로그램
po_number는 여전히 필수
Claude
청구서에 번호가 없음
채워진 필드가 정확한 필드는 아닙니다.

> 노트: 원문 제목: Retrying cannot create the data (DECISION 2 - INVENTED VALUES). Import program (po_number is still required) → Claude (The invoice has no number). 하단: A filled field is not a correct field.

### 102. `l35-09`

결정 2 - 지어낸 값
필드를 비워 두게 한다
# Example 3: invoice without a PO number
Invoice: Nordic Lamps, 3 lamps, total 410.00
Answer: {
  "supplier": "Nordic Lamps",
  "po_number": null,
  "category": "equipment",
  "total": 410.00
}
원본이 비어 있으면, 필드도 비어 있습니다.

> 노트: 원문 제목: Let the field stay empty (DECISION 2 - INVENTED VALUES). 예시(영문 유지) 의미: 예시 3 - PO 번호가 없는 청구서. 청구서: Nordic Lamps, 램프 3개, 합계 410.00 / 답: supplier "Nordic Lamps", po_number null(값 없음), category "equipment", total 410.00. 캡션: When the source is empty, the field stays empty.

### 103. `l35-10`

결정 3 - 형식
날짜는 하나의 형식으로 와야 한다
# Three suppliers, three date styles
03/09/2026
9 March 2026
2026 March 9
# The accounting system expects
2026-03-09
모든 기록에 하나의 형식, 재시도는 가능한 한 적게.

> 노트: 원문 제목: Dates must arrive in one format (DECISION 3 - FORMATS). 코드(영문 유지) 의미: 공급업체 세 곳, 날짜 표기 세 가지(03/09/2026, 9 March 2026, 2026 March 9). 회계 시스템이 기대하는 형식은 2026-03-09. 캡션: One format for every record, with as few retries as possible.

### 104. `l35-11`

결정 3 - 형식
“다시 시도”가 아니라 형식을 보여 준다
# Normalization rule in the prompt
Write every date as YYYY-MM-DD.
Example:
  Invoice date: "9 March 2026"
  Answer:       "2026-03-09"
프롬프트에 넣은 정규화 규칙을 엄격한 스키마와 함께 씁니다.

> 노트: 원문 제목: Show the format, not 'try again' (DECISION 3 - FORMATS). 코드(영문 유지) 의미: 프롬프트의 정규화 규칙 - 모든 날짜를 YYYY-MM-DD로 쓴다. 예시: 청구서 날짜 "9 March 2026" → 답 "2026-03-09". 캡션: A normalization rule in the prompt, next to the strict schema.

### 105. `l35-12`

결정 3 - 형식
정확한 오류를 담아 재시도한다
가져오기 프로그램
invoice_date가 검사에 실패
Claude
청구서, 기록, 오류를 받음
재시도는 형식과 구조를 고칠 뿐, 빠진 정보를 되살리지는 못합니다.

> 노트: 원문 제목: Retry with the exact error (DECISION 3 - FORMATS). Import program (invoice_date failed the check) → Claude (Gets the invoice, the record and the error). 하단: A retry fixes format and structure - it never recovers missing information.

### 106. `l35-13`

핵심 정리
안전한 필드를 위한 다섯 가지 습관
스키마 사용
JSON은 요청이고, 스키마는 보장
의미 확인
합계는 코드로 비교
빈 값 허용
nullable, unclear, 다양한 예시
정규화
예측 가능한 형식을 위한 규칙 하나
오류를 담아 재시도
필드와 형식을 명시

> 노트: 원문 제목: Five habits for safe fields (MAIN POINTS). Use a schema: JSON is a request, a schema is a guarantee / Check meaning: Compare totals in code / Allow empty: Nullable, unclear, varied examples / Normalize: One rule for predictable formats / Retry with error: Name the field and the format. unclear는 판단할 수 없을 때 고르는 선택지로 보임(다음 강의 참고).

### 107. `l35-14`

같은 규칙, 다른 곳
같은 규칙이 CI에서도 통한다
CI 작업
Claude Code
줄 확인
풀 리퀘스트
diff + JSON 스키마
파싱되는 지적 사항
그 줄이 diff에 있는가?
아니요 - 건너뜀
유효한 코멘트 게시
스키마는 모양을 보장합니다. 의미는 코드가 검사합니다.

> 노트: 원문 제목: The same rule works in CI (THE SAME RULE ELSEWHERE). CI job → Claude Code: diff + JSON schema / Claude Code → CI job: findings that parse / CI job → Line check: is the line in the diff? / Line check → CI job: no - skip it / CI job → Pull request: post valid comments. 캡션: The schema guarantees the shape. Your code checks the meaning.

## 36강. 추출 사례: 타입과 검토 (`l36`)

36강
추출 사례: 타입과 검토
슬라이드 11장

> 노트: 원문: LECTURE 36 · Extraction Case: Types and Review · 11 slides

### 109. `l36-01`

추출, 두 번째 점검
규모를 키우기 전에 내릴 결정 두 가지
매번 도구 호출
섞여 있는 문서 수천 건이 모두 필드를 만들어 내야 한다.
사람이 얼마나 확인할지
사람의 검토를 어디까지 안전하게 줄일 수 있는지 정한다.

> 노트: 원문 제목: Two decisions come before scale (EXTRACTION, SECOND CHECKPOINT). A tool call every time: Thousands of mixed documents must all produce fields. / How much people check: Decide what human review can safely shrink.

### 110. `l36-02`

첫째 결정
어떤 문서는 도구 호출을 받지 못한다
읽기
요청
[이미지: 서류를 든 사람 일러스트]
첨부 파일
청구서, 양식, 전표
ShopAssist 코드
도구 호출 필드를 저장
Claude
추출 도구 3개, auto

> 노트: 원문 제목: Some documents get no tool call (FIRST DECISION). Attachments (Invoices, forms, notes) —read→ ShopAssist code (Saves tool-call fields) —request→ Claude (3 extraction tools, auto).

### 111. `l36-03`

그럴듯한 해결책 두 가지
두 가지 빠른 해결책 모두 실패한다
프롬프트로 요청
Claude는 대부분 따르지만, 매번 따르지는 않는다.
청구서 도구를 강제
반품 양식이 청구서 필드에 틀린 값으로 들어간다.

> 노트: 원문 제목: Both quick fixes fail (TWO FIXES THAT LOOK REASONABLE). Ask in the prompt: Claude follows it most of the time, not every time. / Force the invoice tool: A return form lands in invoice fields, with wrong values.

### 112. `l36-04`

시험의 정답
모르는 유형에는 any, 첫 단계에는 강제
# The exam's form of tool_choice (fragment)
# 1. Unknown document type: Claude must call a tool
tool_choice = {"type": "any"}
# 2. Metadata must run first: force that one tool
tool_choice = {"type": "tool", "name": "extract_metadata"}
# 3. Follow-up requests, enrichment
tool_choice = {"type": "auto"}
모르는 유형에는 도구 호출을 필수로, 첫 추출은 강제하고, 그다음 auto로 돌아갑니다.

> 노트: 원문 제목: Any for unknown, forced for first (THE EXAM'S ANSWER). 코드(영문 유지) 의미: 시험 형식의 tool_choice(일부). 1. 문서 유형을 모름: 반드시 도구를 호출 → any / 2. 메타데이터를 먼저 실행: 그 도구 하나를 강제 / 3. 후속 요청, 보강 → auto. 캡션: Required tool call for unknown types; force the first extraction, then go back to auto.

### 113. `l36-05`

제품 관련 참고
코드에서는: auto, strict, 그리고 확인
MODEL = "claude-sonnet-5-5"
# any / forced tool: 400 error on current models
response = client.messages.create(
    model=MODEL, max_tokens=1024, messages=messages,
    system="Extract the fields by calling extract_invoice.",
    tools=TOOLS,  # each tool defined with "strict": true
    tool_choice={"type": "auto"},
)
if not any(b.type == "tool_use" for b in response.content):
    handle_missing_tool_call(response)
시험: 호출은 필수. 코드: strict 도구를 쓰고, 호출이 없으면 잡아내야 할 실패로 처리.

> 노트: 원문 제목: In code: auto, strict, then check (THE PRODUCT NOTE). 코드(영문 유지) 의미: any와 강제 도구는 현재 모델에서 400 오류(원문의 주장). tool_choice는 auto로 두고, 각 도구는 strict로 정의하며, 시스템 프롬프트로 extract_invoice 호출을 지시. 응답에 tool_use 블록이 없으면 누락된 도구 호출로 처리. 캡션: Exam: the call is required. Code: a strict tool, and a missing call is a failure you catch.

### 114. `l36-06`

둘째 결정
97%는 관리자에게 안전하게 들린다
확인됨
수치
추출 결과
매번 들어옴
지원팀
직접 손으로 확인
[이미지: 태블릿을 든 관리자 일러스트]
관리자
97%: 검토를 그만둘까?

> 노트: 원문 제목: 97 % sounds safe to a manager (SECOND DECISION). Extractions (Arrive every time) —checked→ Support team (Checks them by hand) —numbers→ Manager (97 %: stop review?).

### 115. `l36-07`

그럴듯한 해결책 두 가지
두 가지 지름길 모두 오류를 숨긴다
전체 평균 하나
배송일은 70%만 맞을 수도 있는데, 아무도 그것을 보지 못한다.
날것의 신뢰도
모델 자신의 주장이고, 확신에 찬 오류는 빠져나간다.

> 노트: 원문 제목: Both shortcuts hide the errors (TWO FIXES THAT LOOK REASONABLE). One overall average: Delivery dates may be right only 70 % of the time, and nobody sees it. / Raw confidence: It is the model's own claim, and the confident errors slip through.

### 116. `l36-08`

가장 좋은 방법
측정하고, 점수를 매기고, 샘플을 뽑는다
세그먼트 측정
문서 유형별, 필드별
필드 점수
캘리브레이션하고, 낮은 것은 사람에게
층화 샘플
모든 그룹, 확신에 찬 출력도
샘플은 실제 오류율을 보여 주고 새로운 종류의 오류를 잡아냅니다.

> 노트: 원문 제목: Measure, score, then sample (THE BEST MOVE). Measure segments: By document type and by field → Score fields: Calibrate, send low ones to a person → Stratified sample: Every group, even confident output. 하단: The sample shows the real error rate and catches new kinds of errors.

### 117. `l36-09`

계획 참고 하나
배치에는 12시간 주기가 필요하다
약속
36시간 이내 결과
배치 하나
최대 24시간 소요
주기
12시간마다 새 배치
36시간 약속에서 24시간 배치를 빼면 12시간이 남습니다.

> 노트: 원문 제목: A batch needs a 12-hour rhythm (ONE PLANNING NOTE). The promise: Results within 36 hours / One batch: Takes up to 24 hours / The rhythm: A new batch every 12 hours. 하단: A 36-hour promise minus a 24-hour batch leaves 12 hours.

### 118. `l36-10`

규칙과 핵심 정리
사람이 볼 곳은 증거가 정한다
세그먼트마다 측정
측정된 증거가 안전하다고 입증한 곳에서만 검토를 줄인다.
모르는 유형: tool_choice any (시험)
첫 추출은 강제, 그다음 후속 요청
코드에서는: auto와 strict 도구, 또는 structured outputs
전체 97%가 약한 세그먼트를 숨길 수 있다
캘리브레이션된 신뢰도가 검토를 배분하고, 샘플링이 나머지를 지켜본다

> 노트: 원문 제목: Evidence decides where people look (THE RULE AND THE MAIN POINTS). Measure each segment: Cut review only where measured evidence proves it safe. / Unknown type: tool choice any (exam) / First extraction forced, then follow-ups / In code: auto, strict tool, or structured outputs / 97 % overall can hide a weak segment / Calibrated confidence routes review; sampling watches the rest.

### 119. `l36-11`

CI 시나리오의 같은 규칙
무시된 코멘트를 범주별로 센다
지적 사항
무시됨
리뷰 봇
전체로는 정확해 보임
[이미지: 책상에서 일하는 개발자 일러스트]
개발자들
일부 지적 사항을 무시
범주별
한 범주는 대부분 틀림

> 노트: 원문 제목: Count dismissals per category (THE SAME RULE IN THE CI SCENARIO). Review bot (Looks accurate overall) —findings→ Developers (Dismiss some findings) —dismissed→ Per category (One category mostly wrong).
