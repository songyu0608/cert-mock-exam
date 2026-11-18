# CCAR-F 섹션 1. 기초 (한국어판)

원본 아티팩트: https://claude.ai/artifact/Me8jggBtyokjDG34K4mfb9

슬라이드 HTML(`slides/`)에서 화면 글자와 발표자 노트(`<aside>`, 영어 원문)를 뽑은 텍스트다. 자동 생성 파일이므로 고칠 때는 슬라이드 HTML을 기준으로 한다.

## 표지 (`cover`)

슬라이드
Claude Certified Architect – Foundations:
전체 강좌
섹션 1. 기초
1~9강, 슬라이드 107장

> 노트: 원문: Claude Certified Architect Foundations: Complete Course / Section 1. Foundations / Lectures 1-9, 107 slides. 원본 PDF에는 2강 슬라이드가 없습니다.

## 1강. 환영합니다: 강좌 개요와 수강 대상 (`l1`)

1강
환영합니다: 강좌 개요와 수강 대상
슬라이드 14장

> 노트: 원문: LECTURE 1 · Welcome: Course Overview and Who This Course Is For · 14 slides

### 3. `l1-01`

환영합니다
이 강좌의 구성
주제 나열식이 아님
인증 가이드에서 서로 관련 없는 주제를 하나씩 떼어 다루는 방식이 아닙니다.
하나의 실제 경로
실제 Claude 애플리케이션이 성장하는 과정을 한 단계씩 따라갑니다.

> 노트: 원문 제목: How this course is organized. 카드: Not a topic list / One real path.

### 4. `l1-02`

학습 경로
프로토타입에서 프로덕션으로
단순한 프로토타입
프롬프트 하나, 호출 한 번
프로덕션 시스템
신뢰성, 도구, 에이전트

> 노트: 원문 제목: From prototype to production. Simple prototype (One prompt, one call) → Production system (Reliable, tools, agents).

### 5. `l1-03`

우리의 프로젝트
ShopAssist AI를 소개합니다
[이미지: 스마트폰 쇼핑 앱 옆에서 상자를 든 고객 일러스트]
고객
ShopAssist AI
고객 지원 어시스턴트
반품·환불
청구·결제
주문 조회
사람에게 에스컬레이션

> 노트: 원문 제목: Meet ShopAssist AI. Customer → ShopAssist AI (Support assistant) → Returns, refunds / Billing / Order lookups / Human escalation.

### 6. `l1-04`

수강 대상
이 강좌는 누구를 위한 것인가
엔지니어와 아키텍트
Claude Certified Architect – Foundations 시험을 준비하거나, Claude로 신뢰할 수 있는 앱을 만들려는 분.
Claude API 사용 경험이 없어도 됩니다
가장 첫 번째 요청부터 시작합니다
기초적인 Python 지식이 있으면 예제 이해에 도움이 됩니다

> 노트: 원문 제목: Who this course is for. Engineers and architects: Preparing for the Claude Certified Architect - Foundations exam, or building reliable apps with Claude. / No Claude API experience needed / We start from the very first request / Basic Python helps with the examples.

### 7. `l1-05`

기본 원리
Claude 호출은 어떻게 작동하는가
내 애플리케이션
대화를 보냄
Claude API
답변을 생성함

> 노트: 원문 제목: How a call to Claude works. Your application (Sends the conversation) → Claude API (Generates the reply).

### 8. `l1-06`

프롬프트 엔지니어링
기준, 예시, 스키마
structured output
criteria = "Approve only if the order is under 30 days old and unused."
examples = [
    {"request": "Unopened kettle, 12 days", "decision": "approve"},
    {"request": "Used blender, 45 days", "decision": "deny"},
]
tool = {"name": "record_decision",
        "input_schema": {"type": "object",
                        "properties": {"decision": {"enum": ["approve", "deny"]}}}}
Claude에게 기준, 예시, 출력 스키마를 전달하는 한 가지 방법입니다.

> 노트: 원문 제목: Criteria, examples, schemas. 캡션 원문: One way to give Claude criteria, examples and an output schema. 코드는 원문 그대로 둡니다. criteria는 "주문 후 30일 미만이고 미사용인 경우에만 승인", 예시는 "미개봉 주전자, 12일 → 승인", "사용한 블렌더, 45일 → 거절"이라는 뜻입니다.

### 9. `l1-07`

신뢰할 수 있는 출력
검증, 재시도, 에스컬레이션
답변 초안
Claude가 환불을 제안함
confidence score
재시도·수락·에스컬레이션 결정
재시도
정확한 오류를 돌려보냄
검증
스키마와 비즈니스 규칙
unsure
사람의 검토
사람이 결정함

> 노트: 원문 제목: Validate, retry, escalate. Draft answer (Claude proposes a refund) → Validate (Schema and business rules) → Retry (Send back the exact error) → 다시 초안. 가운데: confidence score (retry, accept or escalate). Validate에서 unsure(확신 없음)이면 Human review (A person decides).

### 10. `l1-08`

외부 시스템
Claude가 백엔드 도구를 호출한다
ShopAssist 앱
Claude
MCP 서버
질문 + tools
tool_use: lookup_order
lookup_order(ORD-1042)
status: shipped
tool_result
고객에게 줄 답변
MCP는 도구와 리소스를 표준 방식으로 노출합니다.

> 노트: 원문 제목: Claude calls backend tools. 순서: ShopAssist app → Claude: question + tools / Claude → app: tool_use: lookup_order / app → MCP server: lookup_order(ORD-1042) / MCP server → app: status: shipped / app → Claude: tool_result / Claude → app: answer for the customer. 캡션 원문: MCP exposes tools and resources in a standard way.

### 11. `l1-09`

에이전트 시스템
코디네이터와 서브에이전트
코디네이터
케이스를 계획함
케이스 상태
환불 에이전트
정책을 확인함
주문 에이전트
주문을 조회함
청구 에이전트
청구서를 읽음

> 노트: 원문 제목: A coordinator and subagents. Coordinator (Plans the case) → Refund agent (Checks the policy) / Order agent (Looks up orders) / Billing agent (Reads invoices). Coordinator 아래에 Case state.

### 12. `l1-10`

CLAUDE CODE
실제 프로젝트에서의 Claude Code
구성 설정
실제 프로젝트에 맞게 설정
지침
프로젝트 규칙을 한곳에
긴 세션
작업이 궤도를 벗어나지 않게
재사용 가능한 워크플로
반복 작업을 늘 같은 방식으로
CI/CD 리뷰
자동화된 코드 리뷰

> 노트: 원문 제목: Claude Code in real projects. Configuration (Set up for a real project) / Instructions (Project rules in one place) / Long sessions (Keep the work on track) / Reusable workflows (Repeat tasks the same way) / CI/CD reviews (Automated code review).

### 13. `l1-11`

종합하기
프로덕션 관점의 사고
신뢰성
프로덕션에서도 유지되는 패턴
트레이드오프
흔히 마주치는 아키텍처 선택
시험에서의 판단
시험이 바탕으로 삼는 유형의 판단

> 노트: 원문 제목: Production thinking. Reliability (Patterns that hold in production) / Trade-offs (Common architectural choices) / Exam decisions (The kind the exam is built on).

### 14. `l1-12`

최종 도착점
한 단계씩 완성해 가는 ShopAssist
단순한 프롬프트
호출 한 번
신뢰할 수 있는 출력
스키마, 검사
도구 + MCP
실제 백엔드
에이전트
코디네이터, 서브에이전트
프로덕션 앱
실제 사용자

> 노트: 원문 제목: ShopAssist, step by step. Simple prompt (One call) → Reliable output (Schemas, checks) → Tools + MCP (Real backends) → Agents (Coordinator, subagents) → Production app (Real users).

### 15. `l1-13`

시작하기 전에
시나리오 기반 시험
사실을 떠올리기
“이 기능은 무엇인가?”가 문제의 전부인 경우는 드뭅니다.
접근 방식을 선택하기
이 특정 상황에 맞는 아키텍처는 무엇인가?

> 노트: 원문 제목: A scenario-based exam. Recall a fact: "What is this feature?" is rarely the whole question. / Choose an approach: Which architecture fits this particular situation?

### 16. `l1-14`

왜, 그리고 어떻게
이유를 이해하기
‘어떻게’만이 아니라 ‘왜’
모든 아키텍처 결정에는 그 결정의 이유가 함께 제시됩니다.
이 설계가 왜 올바른 선택인지
어떻게 구현하는지
시험에 대비
실제 Claude 애플리케이션에 대비

> 노트: 원문 제목: Understand the reasoning. Why, not only how: Every architectural decision comes with the reasoning behind it. / Why this design is the right choice / How to implement it / Ready for the exam / Ready for real Claude applications.

## 3강. 시험 형식 (`l3`)

3강
시험 형식
슬라이드 16장

> 노트: 원문: LECTURE 3 · Exam Format · 16 slides

### 18. `l3-01`

시험 형식
120분 동안 60문항
60문항
시험 1회, 한 번에 응시
120분
주어지는 전체 시간
약 2분
문항당 평균 시간

> 노트: 원문 제목: 60 questions in 120 minutes. 60 questions (One exam, one sitting) / 120 minutes (Total time available) / About 2 minutes (Average per question).

### 19. `l3-02`

문항 유형
두 가지 문항 유형
단일 선택형 (Multiple choice)
가장 적절한 답 하나를 고릅니다.
복수 선택형 (Multiple response)
답을 두 개 이상 고릅니다. 몇 개를 골라야 하는지는 문항에 항상 명시됩니다.

> 노트: 원문 제목: Two kinds of questions. Multiple choice: Select the single best answer. / Multiple response: Select more than one answer - the question always says how many.

### 20. `l3-03`

시나리오 기반
6개 중 4개 시나리오가 출제된다
고객 지원
해결 에이전트
코드 생성
Claude Code 활용
리서치 시스템
멀티 에이전트
개발자 생산성
Claude 활용
CI 파이프라인
CI에서의 Claude Code
데이터 추출
구조화된 출력
같은 시나리오를 바탕으로 여러 문항이 출제될 수 있습니다.

> 노트: 원문 제목: Four scenarios drawn from six. Customer support (Resolution agent) / Code generation (With Claude Code) / Research system (Multi-agent) / Dev productivity (With Claude) / CI pipeline (Claude Code in CI) / Data extraction (Structured output). 하단: Several questions can be based on the same scenario.

### 21. `l3-04`

암기 시험이 아니다
상황을 읽고, 그다음에 고른다
상황
무슨 일이 일어나고 있는지 이해한다
요구 사항
요구 사항과 제약 조건을 찾아낸다
최선의 해법
가장 적절한 것을 고른다

> 노트: 원문 제목: Read the situation, then choose. Situation (Understand what is going on) → Requirements (Spot the requirements and constraints) → Best solution (Pick the most appropriate one).

### 22. `l3-05`

출제 범위
5개 도메인과 출제 비중
5개 도메인
각 도메인이 전체 시험 문항에서 차지하는 비중.
27% · 에이전트 아키텍처와 오케스트레이션
18% · 도구 설계와 MCP 통합
20% · Claude Code 구성과 워크플로
20% · 프롬프트 엔지니어링과 정형 출력
15% · 컨텍스트 관리와 신뢰성

> 노트: 원문 제목: Five domains, weighted. Five domains: Each domain's share of the exam questions. 27% Agentic Architecture and Orchestration / 18% Tool Design and MCP Integration / 20% Claude Code Configuration and Workflows / 20% Prompt Engineering and Structured Output / 15% Context Management and Reliability. 도메인 명칭은 공식 가이드 한국어판(ccarf-guide-ko.md) 표기를 따름.

### 23. `l3-06`

환산 점수
1,000점 만점에 720점이면 합격
100~1,000
환산 점수의 범위
720점이면 합격
최소 합격 점수
72%가 아님
720은 정답 비율이 아닙니다
점수를 환산하기 때문에 시험 버전이 달라도 결과를 서로 비교할 수 있습니다.

> 노트: 원문 제목: Pass at 720 out of 1,000. 100 to 1,000 (The range of scaled scores) / Pass at 720 (The minimum passing score) / Not 72 percent (720 is not a share of correct answers). 하단: Scaling keeps results comparable across exam versions.

### 24. `l3-07`

성적표
결과를 결정하는 것
합격 또는 불합격
성적표에 표시되는 환산 점수로 결정됩니다.
도메인별 정답률
도메인별 정답 비율은 참고용 피드백일 뿐이며, 결과를 결정하지 않습니다.

> 노트: 원문 제목: What decides the result. Pass or fail: Decided by your scaled score, which the report shows. / Domain percentages: Percent correct per domain - feedback only, they do not decide the result.

### 25. `l3-08`

응시 등록
응시 1회당 125달러
응시자
1회당 125 USD
Partner Academy
여기서 등록 시작
Pearson VUE
시험을 실시함

> 노트: 원문 제목: 125 US dollars per attempt. You (125 USD per attempt) → Partner Academy (Registration begins) → Pearson VUE (Delivers the exam).

### 26. `l3-09`

CLAUDE 파트너 네트워크
회사 이메일로 등록하세요
회사 이메일
자격증이 소속 파트너 조직과 연결됩니다.
개인 이메일
조직과의 연결이 불분명해져 나중에 수정이 필요할 수 있습니다.

> 노트: 원문 제목: Register with your work email (CLAUDE PARTNER NETWORK). Corporate email: Links your certification to your partner organization. / Personal email: The link is less clear and may need corrections later.

### 27. `l3-10`

파트너 가격
결제 전에 확인하세요
파트너 자격
결제 금액이 달라질 수 있음
등급제 파트너
첫 응시 할인
결제 단계
할인이 있으면 여기서 표시됨
먼저 소속 회사와 연결된 계정으로 로그인하세요.

> 노트: 원문 제목: Check before you pay (PARTNER PRICING). Partner status (Can change the price you pay) / Tiered partners (Discount on the first attempt) / At checkout (Any discount shows up here). 하단: Sign in with the account linked to your employer first.

### 28. `l3-11`

일정 예약
Pearson VUE를 통해 예약한다
Pearson VUE 계정
생성하거나 로그인
일정 선택
날짜와 시간을 고름
온라인
원격 감독
시험 센터
응시 가능한 Pearson VUE 시험장

> 노트: 원문 제목: Book through Pearson VUE. Pearson VUE account (Create or access it) → Schedule (Pick a date and time) → Online (Remote proctoring) 또는 Test center (Eligible Pearson VUE site).

### 29. `l3-12`

취소 또는 일정 변경
48시간 규칙
48시간 이상 남음
시험을 취소하거나 일정을 변경할 수 있습니다.
48시간 미만 남음
변경할 수 없습니다. 기한을 놓치면 응시료를 잃을 수 있습니다.

> 노트: 원문 제목: The 48-hour rule (CANCEL OR RESCHEDULE). 48 hours or more: You can still cancel or reschedule the exam. / Less than 48 hours: No changes - missing the deadline can cost the exam fee.

### 30. `l3-13`

재응시
응시 사이의 대기 기간
1차 불합격 후
14일 대기
2차 불합격 후
30일 대기
3차 불합격 후
90일 대기
직전 12개월 동안 최대 4회까지 응시할 수 있으며, 매회 응시료가 부과됩니다.

> 노트: 원문 제목: Waiting periods between attempts (RETAKES). After 1st fail: Wait 14 days → After 2nd fail: Wait 30 days → After 3rd fail: Wait 90 days. 하단: At most 4 attempts in a rolling 12 months - each one paid.

### 31. `l3-14`

합격 후
12개월간 유효
12개월
자격 인증의 유효 기간
기한 내 갱신
무료, 감독 없는 평가
만료되면
전체 시험을 응시료 전액으로 다시 응시

> 노트: 원문 제목: Valid for 12 months (AFTER YOU PASS). 12 months (How long the certification lasts) / Renew on time (Free, non-proctored assessment) / If it expires (Full exam and full fee again).

### 32. `l3-15`

문제 풀이
‘작동할 수도 있다’로는 부족하다
작동할 수도 있음
여러 선택지가 기술적으로는 가능해 보입니다.
시나리오에 들어맞음
시나리오의 요구 사항, 제약 조건, 문제점에 부합합니다.

> 노트: 원문 제목: Could work is not enough (ANSWERING QUESTIONS). Could work: Several choices sound technically possible. / Fits the scenario: Matches its requirements, constraints and problems.

### 33. `l3-16`

문제 풀이
소거한 다음에 고른다
잘못된 원인
실제 근본 원인을 놓침
지나치게 복잡함
불필요한 복잡성을 더함
규칙 위반
명시된 요구 사항을 어김
최적의 답
끝까지 남는 해법
실무적인 아키텍처 판단력이 이 시험의 큰 부분을 차지합니다.

> 노트: 원문 제목: Eliminate, then choose (ANSWERING QUESTIONS). Wrong cause (Misses the actual root cause) → Too complex (Adds unnecessary complexity) → Breaks a rule (Violates a stated requirement) → Best fit (The solution left standing). 하단: Practical architectural judgment is a major part of this exam.

## 4강. LLM은 실제로 무엇을 하는가 (`l4`)

4강
LLM은 실제로 무엇을 하는가
슬라이드 13장

> 노트: 원문: LECTURE 4 · What an LLM Actually Does · 13 slides

### 35. `l4-01`

메커니즘
모델이 실제로 하는 일
모델 그 자체
고객 메시지 하나가 도착했을 때 Claude 내부에서 일어나는 일.
이번에는 다루지 않음
도구, 에이전트, Claude Code는 나중에 나오며, 이 내용 위에 쌓입니다.

> 노트: 원문 제목: What the model actually does (THE MECHANISM). The model itself: What happens inside Claude when one customer message arrives. / Not today: Tools, agents and Claude Code come later and build on this.

### 36. `l4-02`

1단계: 토큰화
텍스트가 토큰으로 잘린다
“I want to return my order”
(주문한 상품을 반품하고 싶어요)
I
want
to
return
my
order
단순하게 보여 주기 위해 단어 하나를 토큰 하나로 표시했습니다. 실제 토크나이저는 단어를 다른 위치에서 자릅니다.

> 노트: 원문 제목: The text is cut into tokens (STEP 1: TOKENIZATION). 예문: "I want to return my order". 하단: To keep it simple, one word is one token. Real tokenizers cut words in other places.

### 37. `l4-03`

2단계: 숫자
토큰이 숫자가 된다
“I want to return my order”
I
want
to
return
my
order
토큰 ID
40
1217
311
471
856
2145
임베딩: 긴 숫자 목록 (처음 4개만 표시)
0.12
-0.84
0.33
0.07
...
0.45
0.10
-0.62
0.28
...
-0.03
0.51
0.19
-0.40
...
0.58
-0.22
0.71
0.15
...
0.09
0.36
-0.14
0.62
...
0.64
-0.51
0.27
0.80
...
예시용 값입니다.

> 노트: 원문 제목: Tokens become numbers (STEP 2: NUMBERS). token id 40 / 1217 / 311 / 471 / 856 / 2145. embedding: a long list of numbers (first 4 shown). Illustrative values.

### 38. `l4-04`

임베딩
의미의 지도
쇼핑
날씨
요리
returns
order
refund
shipping
rain
storm
recipe
oven
지도에서 가까우면 의미도 가깝습니다.

> 노트: 원문 제목: A map of meaning (EMBEDDINGS). SHOPPING 영역: returns, order, refund, shipping / WEATHER 영역: rain, storm / COOKING 영역: recipe, oven. 캡션: Close on the map means close in meaning.

### 39. `l4-05`

컨텍스트
같은 단어, 다른 위치
고객의 구매
식당의 음식 주문
명령
법원의 명령
refund
shipping
return
my
order
order (여기)
menu
waiter
obey
rule
ruling
judge
모든 토큰의 숫자는 주변 토큰에 따라 조정됩니다.

> 노트: 원문 제목: The same word, different places (CONTEXT). A CUSTOMER PURCHASE: refund, shipping, return, my / FOOD IN A RESTAURANT: menu, waiter / A COMMAND: obey, rule / A COURT INSTRUCTION: ruling, judge. 문장 속 order(여기)는 return, my 옆에 있으므로 ‘구매’ 영역으로 이동. 캡션: The numbers of every token are adjusted by the tokens around it.

### 40. `l4-06`

세 가지 개념
라벨, 출발점, 최종 의미
토큰
라벨
임베딩
출발점의 의미
컨텍스트
최종 의미

> 노트: 원문 제목: Label, start, final meaning (THREE IDEAS). The token (The label) → The embedding (The starting meaning) → The context (The final meaning).

### 41. `l4-07`

메시지 읽기
이제 ShopAssist가 읽을 수 있는 것
I
고객
want
의도를 나타냄
return
반품 요청
my order
구매한 상품
종합하면: 이 고객은 아마도 구매한 무언가를 반품하는 데 도움을 원합니다.

> 노트: 원문 제목: What ShopAssist can read now (READING THE MESSAGE). I (The customer) / want (Signals intent) / return (A return request) / my order (A purchase). 하단: Together: this customer probably wants help returning something they bought.

### 42. `l4-08`

3단계: 생성
한 번에 토큰 하나씩
지금까지의 텍스트
I
want
to
return
my
order
and
get
a
refund
.
Sure
,
I
can
help
with
that
.
다음에 올 가능성이 가장 높은 토큰은?
.
70%
!
14%
,
10%
today
6%
예시용 확률입니다. API는 이 값을 보여 주지 않습니다.

> 노트: 원문 제목: One token at a time (STEP 3: GENERATION). the text so far: "I want to return my order and get a refund. Sure, I can help with that" 다음 토큰 후보: . 70% / ! 14% / , 10% / today 6%. 캡션: Illustrative probabilities: the API does not show them.

### 43. `l4-09`

현재 모델 기준
제어할 수 있는 것과 없는 것
플랫폼이 결정한다
가능성 높은 토큰 중 어떤 것이 선택되는지. 현재 모델은 temperature 설정을 거부합니다.
요청은 내가 제어한다
명확한 지침, 좋은 컨텍스트, 구조화된 출력, 그리고 코드에서의 검사.
현재 모델은 추론(reasoning) 토큰을 먼저 작성할 수도 있습니다. 메커니즘은 같습니다. 토큰 다음에 토큰.

> 노트: 원문 제목: What you control, what you do not (ON CURRENT MODELS). The platform decides: How a token is chosen among the likely ones. The current models reject a temperature setting. / You control the request: Clear instructions, good context, structured outputs, and checks in your code. 하단: The current models may also write reasoning tokens first. Same mechanism, token after token.

### 44. `l4-10`

컨텍스트가 결정한다
같은 모델, 같은 요청
메시지만 있을 때
“환불받고 싶어요.”
답변: “네, 주문 번호를 알려 주시겠어요?”
메시지와 컨텍스트가 있을 때
본인 확인된 고객, 어제 배송 완료, 반품 대상, 30일 정책.
답변: “주문하신 상품은 반품 대상입니다. 반품 절차를 시작해 드릴게요.”

> 노트: 원문 제목: Same model, same request (CONTEXT DECIDES). Only the message: I want a refund. Answer: Sure, can you give me your order number? / Message and context: Verified customer, delivered yesterday, eligible, 30-day policy. Answer: Your order is eligible, I can start the return for you.

### 45. `l4-11`

빈틈
Claude가 모르는 것
어떤 주문인가?
메시지에 없음
본인 확인됨?
앱이 확인해야 함
반품 대상?
백엔드가 알고 있음
이미 환불됨?
시스템만 알고 있음
이 모든 것은 애플리케이션이 제공해야 합니다.

> 노트: 원문 제목: What Claude does not know (THE GAP). Which order? (Not in the message) / Verified? (Your app must check) / Eligible? (Your backend knows) / Already refunded? (Only the system knows). 하단: Your application has to provide all of that.

### 46. `l4-12`

프로덕션 아키텍처
누가 무엇을 하는가
모델
언어를 생성
애플리케이션
컨텍스트를 제공
백엔드
실제 시스템과 연결
도구
실제 데이터를 가져옴
코드
규칙을 강제

> 노트: 원문 제목: Who does what (PRODUCTION ARCHITECTURE). The model (Generates language) / The application (Provides context) / The backend (Connects real systems) / Tools (Fetch real data) / Code (Enforces the rules).

### 47. `l4-13`

전체 메커니즘
예측하고, 고르고, 추가하고, 반복한다
토큰
조각으로 잘린 텍스트
숫자
임베딩
컨텍스트
최종 의미
다음 토큰
가장 가능성 높은 것을 선택
텍스트에 추가
토큰 하나 더
답이 완성될 때까지
컨텍스트를 통제하고, 반드시 지켜야 하는 규칙은 모두 코드에 넣으세요.

> 노트: 원문 제목: Predict, choose, add, repeat (THE WHOLE MECHANISM). Tokens (Text cut into pieces) → Numbers (Embeddings) → Context (Final meaning) → Next token (Most likely, chosen) → Add to text (One more token) → 다시 Tokens. 가운데: until the answer is complete. 하단: Control the context, and put every rule that must hold into code.

## 5강. Claude는 요청에서 무엇을 보는가 (비개발자용) (`l5`)

5강
Claude는 요청에서 무엇을 보는가 (비개발자용)
슬라이드 9장

> 노트: 원문: LECTURE 5 · What Claude Sees in a Request (for non-developers) · 9 slides

### 49. `l5-01`

현재 위치
사실이 답을 결정한다
지난 강의
Claude는 가능성 높은 텍스트를 예측합니다. 그 답은 확률적일 뿐, 결코 증명된 것이 아닙니다.
이번 강의
Claude가 고객에게 답할 때 실제로 알고 있는 것.
이미 언어 모델로 개발하고 있나요? 이 강의는 건너뛰어도 됩니다.

> 노트: 원문 제목: Facts decide the answer (WHERE WE ARE). Last lesson: Claude predicts likely text. Its answers are probable, never proven. / This lesson: What Claude actually knows when it answers a customer. 하단: Already building with language models? You can skip this lesson.

### 50. `l5-02`

핵심 개념
Claude가 가진 것은 요청 하나뿐이다
경로
요청 하나를 단계별로
Claude가 보지 못하는 것
고객 정보도, 이력도 없음
세 종류의 정보
지침, 컨텍스트, 입력
Claude는 애플리케이션이 요청 하나에 담아 보낸 것만 압니다.

> 노트: 원문 제목: One request is all Claude has (THE KEY IDEA). The path (One request, step by step) / What Claude can't see (No customer, no history) / Three kinds of facts (Instructions, context, input). 하단: Claude knows only what your application sends in one request.

### 51. `l5-03`

첫째: 경로
Alex는 Claude가 아니라 우리 앱과 대화한다
Alex
ShopAssist 앱
Claude API
“내 주문은 어디쯤 있나요?”
요청 (request)
응답 (response)
API: 한 프로그램이 요청을 보내면, 다른 프로그램이 작업을 수행하고 응답을 돌려보냅니다.

> 노트: 원문 제목: Alex talks to our app, not Claude (FIRST: THE PATH). Alex → ShopAssist app: "Where is my order?" / ShopAssist app → Claude API: request / Claude API → ShopAssist app: response. 캡션: An API: one program sends a request, the other does the work and sends back a response.

### 52. `l5-04`

첫째: 경로
모든 요청에는 비밀 키가 함께 간다
우리 애플리케이션
요청을 보냄
Claude API
요청을 읽고 답을 작성함
API 키
비밀 정보, 비밀번호와 비슷함

> 노트: 원문 제목: Each request carries a secret key (FIRST: THE PATH). Our application (Sends the request) ↔ Claude API (Reads it, writes an answer). API key: A secret - like a password.

### 53. `l5-05`

둘째: CLAUDE가 보지 못하는 것
Alex의 데이터는 요청에 없다
Alex가 누구인지
알려 준 적 없음
주문
요청에 없음
이력
기억하는 것이 없음
데이터베이스
주문 정보에 접근할 수 없음
우리 애플리케이션이 다시 보내 줄 때에만 Claude가 알 수 있습니다.

> 노트: 원문 제목: Alex's data is not in the request (SECOND: WHAT CLAUDE DOES NOT SEE). Who Alex is (Never told) / The order (Not in the request) / History (Nothing remembered) / Database (No access to orders). 하단: Only if our application sends it again does Claude know.

### 54. `l5-06`

둘째: CLAUDE가 보지 못하는 것
도구가 있으면 Claude가 사실을 요청할 수 있다
Claude
우리 애플리케이션
주문 조회
lookup_order 호출을 요청
함수를 실행
status, date
도구 결과 (tool result)
실제 주문 정보가 없으면 Claude는 배송일을 추측할 수밖에 없습니다.

> 노트: 원문 제목: A tool lets Claude ask for facts (SECOND: WHAT CLAUDE DOES NOT SEE). Claude → Our application: asks for lookup_order / Our application → Order lookup: runs the function / Order lookup → Our application: status, date / Our application → Claude: tool result. 캡션: Without the real order, Claude can only guess a delivery date.

### 55. `l5-07`

셋째: 세 종류의 정보
좋은 요청은 세 부분으로 이루어진다
<instructions>
You are ShopAssist. You answer questions about orders.
Never state a delivery date you did not read from the order.
</instructions>
<context>
Order ORD-12345678: shipped, delivery date Oct 20
Shipping policy: standard delivery takes 3-5 days
</context>
<input>Where is my order?</input>
지침(instructions)은 작업을 정의하고, 컨텍스트(context)는 사실을 제공하며, 입력(input)은 질문입니다.

> 노트: 원문 제목: A good request has three parts (THIRD: THREE KINDS OF INFORMATION). 코드는 원문 그대로 둡니다. 뜻: [지침] 당신은 ShopAssist입니다. 주문에 관한 질문에 답합니다. 주문 정보에서 읽지 않은 배송일은 절대 말하지 마십시오. [컨텍스트] 주문 ORD-12345678: 발송됨, 배송일 10월 20일 / 배송 정책: 일반 배송은 3~5일 소요. [입력] 내 주문은 어디 있나요? 캡션 원문: Instructions define the task, context gives the facts, input is the question.

### 56. `l5-08`

정보 고르기
Claude에게 필요한 사실만 보내라
[이미지: 문서가 가득 찬 서류 캐비닛 일러스트]
스토어 문서
수천 페이지
우리 애플리케이션
질문에 필요한 것만 고름
Claude
짧고 라벨이 붙은 요청을 받음

> 노트: 원문 제목: Send only the facts Claude needs (CHOOSING THE FACTS). Store documents (Thousands of pages) → Our application (Picks what the question needs) → Claude (Gets a short, labelled request).

### 57. `l5-09`

정리
답이 틀렸나요? 요청을 확인하세요
Claude가 가진 것은 요청 하나뿐
Claude는 그 요청에 담긴 것만 압니다.
고객은 Claude가 아니라 우리 앱과 대화한다
우리 앱은 비밀 키로 API를 호출한다
기억도 없고 우리 시스템에도 접근할 수 없다. 도구가 제공하지 않는 한
지침, 컨텍스트, 입력. 필요한 사실만 담는다

> 노트: 원문 제목: Wrong answer? Check the request (RECAP). One request is all Claude has: Claude knows only what that request carries. / The customer talks to our app, not to Claude / Our app calls the API with a secret key / No memory, no access to our systems - unless a tool gives it / Instructions, context, input - only the facts needed.

## 6강. Claude 앱, API, Agent SDK, Claude Code, MCP (`l6`)

6강
Claude 앱, API, Agent SDK, Claude Code, MCP
슬라이드 16장

> 노트: 원문: LECTURE 6 · Claude App, API, Agent SDK, Claude Code and MCP · 16 slides

### 59. `l6-01`

Claude에 접근하는 방법
다섯 가지 제품, 다섯 가지 역할
요청 하나
Claude는 요청에 담긴 것만 압니다.
다섯 가지 제품
요청이 Claude에 도달하는 서로 다른 다섯 가지 경로.
시험은 모든 시나리오에서 이 제품들의 이름을 명시합니다.

> 노트: 원문 제목: Five products, five jobs (WAYS TO REACH CLAUDE). One request: Claude knows only what the request carries. / Five products: Five different ways a request can reach Claude. 하단: The exam names these products in every scenario.

### 60. `l6-02`

가장 간단한 판별법
질문 하나로 구별된다
Claude 앱
사람이 채팅
Claude API
내 프로그램
Agent SDK
에이전트 프로그램
Claude Code
개발자가 코딩
MCP
다른 시스템을 연결
누가 일을 하는가?

> 노트: 원문 제목: One question tells them apart (THE SIMPLEST TEST). Claude app (A person chatting) / Claude API (Your program) / Agent SDK (An agent program) / Claude Code (A developer coding) / MCP (Links other systems). 하단: Who does the work?

### 61. `l6-03`

첫째, CLAUDE 앱
앱에서는 사람이 채팅한다
Claude 앱
DEMO
새 채팅
프로젝트
최근 채팅
배송이 늦어진 소포에 대해 짧은 답장을 써 줘
Sam 님, 기다리게 해 드려 죄송합니다. 소포는 배송 중이며 금요일까지 도착할 예정입니다.
Claude에게 답장하기...
Sonnet ⌄
브라우저, 데스크톱, 휴대폰에서 사람이 Claude와 직접 대화합니다.

> 노트: 원문 제목: In the app, a person chats (FIRST, THE CLAUDE APP). 데모 화면: 사용자 "Write a short reply about a late parcel" / Claude "Hi Sam, sorry for the wait. Your parcel is on its way and should arrive by Friday." 캡션: In a browser, on a desktop or on a phone - a person talks to Claude directly.

### 62. `l6-04`

앱에는 프로젝트도 있다
프로젝트는 하나의 주제를 한데 모은다
릴리스 노트 · 프로젝트
DEMO
새 채팅
프로젝트
릴리스 노트
릴리스 노트
지침
릴리스 노트를 쉬운 영어로 작성하세요. 사실 확인에는 파일을 사용하세요. 각 노트는 짧게 쓰세요.
프로젝트 지식
changelog.md
release-plan.pdf
커넥터
Google Drive
Gmail
한 사람의 개인 작업에 적합합니다: 글쓰기, 분석, 리서치.

> 노트: 원문 제목: A Project keeps one topic together (THE APP ALSO HAS PROJECTS). 데모 화면: Release notes · Project / INSTRUCTIONS: Write release notes in plain English. Use the files for facts. Keep each note short. / PROJECT KNOWLEDGE: changelog.md, release-plan.pdf / CONNECTORS: Google Drive, Gmail. 캡션: Good for one person's own work: writing, analysis and research.

### 63. `l6-05`

앱 뒤에는 내 코드가 없다
ShopAssist는 Claude 앱에서 실행되지 않는다
[이미지: 노트북으로 채팅하는 고객 Alex 일러스트]
Alex
스토어 고객
스토어 웹사이트
ShopAssist 채팅 창
Claude 앱
ShopAssist가 실행되는 곳이 아님

> 노트: 원문 제목: ShopAssist does not run in the app (NO CODE OF YOURS BEHIND THE APP). Alex (A store customer) → Store website (The ShopAssist chat window). 점선: Claude app (Not where ShopAssist runs).

### 64. `l6-06`

둘째, CLAUDE API
모든 요청은 내 코드가 보낸다
[이미지: 노트북으로 채팅하는 고객 Alex 일러스트]
Alex
채팅으로 질문
우리 애플리케이션
이력, 계정, 규칙을 관리
Claude API
Claude를 제공

> 노트: 원문 제목: Your code sends every request (SECOND, THE CLAUDE API). Alex (Asks in the chat) → Our application (Keeps history, account, rules) → Claude API (Gives you Claude).

### 65. `l6-07`

셋째, AGENT SDK
에이전트 루프는 끝날 때까지 반복된다
내 코드
Claude
도구
질문 + tools
tool_use
get_customer
tool_result
next: lookup_order
end_turn
SDK는 라이브러리, 즉 내 프로그램에 추가해 쓰는 미리 만들어진 코드입니다.

> 노트: 원문 제목: The agent loop repeats until done (THIRD, THE AGENT SDK). Your code → Claude: question + tools / Claude → Your code: tool_use / Your code → Tool: get_customer / Your code → Claude: tool_result / Claude → Your code: next: lookup_order / Claude → Your code: end_turn. 캡션: An SDK is a library - ready code that you add to your own program.

### 66. `l6-08`

AGENT SDK가 더해 주는 것
SDK가 루프를 대신 실행한다
Agent SDK
일반 API를 쓰면 루프를 직접 작성해야 합니다. SDK는 내 코드를 위해 루프를 실행해 줍니다.
내장 도구: 파일 읽기, 명령 실행
서브에이전트: 한 에이전트를 돕는 보조 에이전트
훅: 도구 호출 전이나 후에 실행되는 내 코드
세션: 대화를 나중에 이어서 진행
MCP 서버: 다른 시스템을 연결

> 노트: 원문 제목: The SDK runs the loop for you (WHAT THE AGENT SDK ADDS). Agent SDK: With the plain API you write the loop yourself. The SDK runs it for your code. / Built-in tools: read files, run commands / Subagents: helper agents for one agent / Hooks: your code before or after a tool call / Sessions: continue a conversation later / MCP servers: connect other systems.

### 67. `l6-09`

넷째, CLAUDE CODE
Claude Code는 내 코드 안에서 일한다
[이미지: 책상에서 노트북으로 코딩하는 개발자 일러스트]
개발자
터미널 또는 IDE
Claude Code
에이전트형 코딩 도구
코드베이스
파일, 테스트, 명령

> 노트: 원문 제목: Claude Code works in your code (FOURTH, CLAUDE CODE). Developer (Terminal or IDE) → Claude Code (Agentic coding tool) → A code base (Files, tests, commands).

### 68. `l6-10`

CI에서의 CLAUDE CODE
CI에서는 Claude Code가 혼자 실행된다
코드 변경
모든 풀 리퀘스트
CI 검사
자동으로 실행
Claude Code
작업 하나, 키보드 앞에는 아무도 없음
결과
출력된 뒤 종료

> 노트: 원문 제목: In CI, Claude Code runs alone (CLAUDE CODE IN CI). Code change (Every pull request) → CI checks (Run automatically) → Claude Code (One task, nobody at the keyboard) → Result (Printed, then it stops).

### 69. `l6-11`

같은 루프, 다른 사람
차이는 누구를 위해 일하느냐다
Agent SDK
내 제품 안에 들어가는 에이전트를 위한 것.
Claude Code
제품을 만드는 사람들을 위한 것.
Claude Code는 ShopAssist가 실행되는 곳이 아닙니다. 팀은 Claude Code로 코드를 작성하고 리뷰합니다.

> 노트: 원문 제목: Who it serves is the difference (SAME LOOP, DIFFERENT PEOPLE). Agent SDK: For agents inside your product. / Claude Code: For the people who build the product. 하단: Claude Code is not where ShopAssist runs. The team uses it to write and review the code.

### 70. `l6-12`

다섯째, MCP
MCP는 공유된 규칙의 집합이다
프로토콜
두 프로그램이 서로 대화하는 방식에 대한 공유된 규칙.
Model Context Protocol
Claude에 도구와 데이터를 연결하는 표준 방식.

> 노트: 원문 제목: MCP is a shared set of rules (FIFTH, MCP). A protocol: A shared set of rules for how two programs talk. / Model Context Protocol: The standard way to connect tools and data to Claude.

### 71. `l6-13`

다섯째, MCP 활용
서버 하나, 여러 클라이언트
MCP 서버
get_customer,
lookup_order
Claude 앱
사람이 채팅
Claude Code
개발자가 코딩
Agent SDK 에이전트
내 제품 안에서 동작

> 노트: 원문 제목: One server, many clients (FIFTH, MCP IN USE). MCP server (get_customer, lookup_order) → Claude app (A person chatting) / Claude Code (A developer coding) / Agent SDK agent (Inside your product).

### 72. `l6-14`

다섯 가지를 한 그림에
다섯 가지 제품, 하나의 시스템
[이미지: 노트북으로 채팅하는 고객 Alex 일러스트]
Alex
웹사이트에서 질문
우리 백엔드
Agent SDK가 루프를 실행
개발자
Claude Code, 작업 환경과 CI
Claude
API를 통해 호출됨
MCP 서버
get_customer,
lookup_order

> 노트: 원문 제목: Five products, one system (ALL FIVE ON ONE PICTURE). Alex (Asks on the website) → Our backend (Agent SDK runs the loop) → Claude (Called through the API) / MCP server (get_customer, lookup_order). Developers (Claude Code, desk and CI) → Our backend (점선).

### 73. `l6-15`

시험도 같은 용어를 쓴다
시험의 각 시나리오는 제품을 명시한다
지원 에이전트
Agent SDK + MCP
코드 생성
Claude Code
리서치 시스템
Agent SDK
개발자 도구
Agent SDK + MCP
CI 파이프라인
Claude Code
추출
Claude API

> 노트: 원문 제목: Each exam scenario names a product (THE EXAM USES THE SAME WORDS). Support agent (Agent SDK + MCP) / Code generation (Claude Code) / Research system (Agent SDK) / Developer tool (Agent SDK + MCP) / CI pipeline (Claude Code) / Extraction (Claude API).

### 74. `l6-16`

핵심 정리
누가 일을 하는지 물어라
누가 일을 하는가?
문제에 제품 이름이 나오면 여기서부터 시작하세요.
사람은 Claude 앱을 쓴다
프로그램은 Claude API를 쓴다
Agent SDK는 에이전트 루프를 실행한다
Claude Code: 개발자용, CI에서도 사용
MCP는 모든 제품에 도구와 데이터를 연결한다

> 노트: 원문 제목: Ask who does the work (THE MAIN POINTS). Who does the work? When a question names a product, start here. / People use the Claude app / Programs use the Claude API / The Agent SDK runs the agent loop / Claude Code: developers, also in CI / MCP connects tools and data to all.

## 7강. 챗봇에서 에이전트로 (`l7`)

7강
챗봇에서 에이전트로
슬라이드 9장

> 노트: 원문 LECTURE 7 · 9 slides. 강의 제목은 강좌 한국어 번역본(claude-course-ko.md) 기준.

### 76. `l7-01`

핵심 개념
챗봇은 답하고, 에이전트는 행동한다
챗봇은 답한다
메시지에 답할 뿐입니다. 그게 전부입니다.
에이전트는 일한다
도구를 통해 한 단계씩 행동하며 목표를 향해 일합니다.
모델은 제안하고, 애플리케이션이 결정하고 실행합니다.

> 노트: 원문 제목: A chatbot answers, an agent acts (THE KEY IDEA). A chatbot answers: It replies to a message. That is all. / An agent works: It works toward a goal, step by step, through tools. 하단: The model proposes; the application decides and executes.

### 77. `l7-02`

1/3단계
1단계: 챗봇은 답만 한다
[이미지: 노트북으로 채팅하는 고객 일러스트]
고객
질문을 함
스토어 앱
요청을 구성
Claude
답을 작성
반품 정책
요청에 추가됨

> 노트: 원문 제목: Step 1: a chatbot only answers (STEP 1 OF 3). Customer (Asks a question) → Store app (Builds the request) → Claude (Writes the answer). Return policy (Added to the request, 점선으로 스토어 앱에 연결).

### 78. `l7-03`

2/3단계
Claude가 요청하고, 앱이 도구를 실행한다
고객
스토어 앱
Claude
lookup_order
“내 주문은 어디쯤 있나요?”
질문
tool_use: lookup_order
lookup_order
shipped
tool_result
“주문하신 상품이 발송되었습니다”
Claude는 다른 시스템의 정보가 필요하다고 판단했고, 그래서 도구를 요청했습니다.

> 노트: 원문 제목: Claude asks, the app runs the tool (STEP 2 OF 3). Customer → Store app: "Where is my order?" / Store app → Claude: question / Claude → Store app: tool_use: lookup_order / Store app → lookup_order: lookup_order / lookup_order → Store app: shipped / Store app → Claude: tool_result / Claude → Store app: "Your order has shipped." 캡션: Claude decided it needed information from another system, so it asked for a tool.

### 79. `l7-04`

3/3단계
도구 호출 한 번으로는 부족하다
“주문한 상품이 파손된 채 도착했어요. 환불받고 싶어요.”
고객 찾기
CUS-1001
주문 찾기
ORD-12345678
규칙 확인
환불 정책
환불 또는 핸드오프
실행하거나 사람에게 요청

> 노트: 원문 제목: One tool call is not enough (STEP 3 OF 3). "My order arrived damaged. I want a refund." Find the customer (CUS-1001) → Find the order (ORD-12345678) → Check the rules (Refund policy) → Refund or hand off (Act, or ask a person).

### 80. `l7-05`

3/3단계
Claude가 모든 결과를 확인한다
스토어 앱
Claude
스토어 도구
tool_result: CUS-1001
tool_use: lookup_order
lookup_order
ORD-12345678
tool_result: damaged
환불, 또는 사람에게 핸드오프
작업이 끝나거나 사람이 넘겨받을 때까지 루프가 반복됩니다.

> 노트: 원문 제목: Claude checks every result (STEP 3 OF 3). Store app → Claude: tool_result: CUS-1001 / Claude → Store app: tool_use: lookup_order / Store app → Store tools: lookup_order / Store tools → Store app: ORD-12345678 / Store app → Claude: tool_result: damaged / Claude → Store app: Refund, or hand to a person. 캡션: The loop repeats until the job is done or a person takes over.

### 81. `l7-06`

에이전트의 구성
도구와 루프가 에이전트를 만든다
모델
이해하고 추론
지침
역할과 규칙
컨텍스트
이번 작업에 필요한 사실
도구
다른 시스템에 접근
루프
여러 단계에 걸쳐 계속 작업
챗봇은 대체로 앞의 세 부분으로 이루어집니다. 에이전트는 여기에 도구와 루프를 더합니다.

> 노트: 원문 제목: Tools and a loop make an agent (THE PARTS OF AN AGENT). Model: Understands and reasons / Instructions: The role and the rules / Context: The facts for this job / Tools: Reach other systems / Loop: Keeps going over many steps. 하단: A chatbot is mostly the first three. An agent adds tools and a loop.

### 82. `l7-07`

중요한 역할 분담
Claude는 제안하고, 코드가 결정한다
Claude
다음 단계를 제안
내 애플리케이션
결정한 뒤 실행
도구
허용된 경우에만 실행
[이미지: 헤드셋을 쓴 지원 담당자 일러스트]
사람
민감한 작업을 승인

> 노트: 원문 제목: Claude proposes, your code decides (AN IMPORTANT SPLIT). Claude (Proposes the next step) → Your application (Decides, then executes) → Tools (Run only if allowed) / People (Approve sensitive actions, 점선).

### 83. `l7-08`

규칙이 놓이는 곳
엄격한 규칙은 코드에 둔다
지침 안에
대부분의 경우 지켜짐
내 코드 안에
매번 지켜짐
항상 지켜져야 하는 규칙은 코드에 둡니다.

> 노트: 원문 제목: Strict rules belong in code (WHERE A RULE LIVES). In the instructions: Followed most of the time / In your code: Followed every time. 하단: If a rule must always hold, put it in code.

### 84. `l7-09`

정리
모든 에이전트에 던질 두 가지 질문
에이전트
도구를 통해 한 단계씩 목표를 향해 일한다.
챗봇은 질문에 답한다
다섯 부분: 모델, 지침, 컨텍스트, 도구, 루프
Claude는 각 단계를 제안한다
애플리케이션이 무엇을 허용할지 결정하고 도구를 실행한다
Claude는 무엇을 제안했고, 코드는 무엇을 허용했는가?

> 노트: 원문 제목: Two questions for every agent (THE MAIN POINTS). An agent: Works toward a goal, step by step, through tools. / A chatbot answers a question / Five parts: model, instructions, context, tools, loop / Claude proposes each step / The application decides what is allowed and runs the tools. 하단: What did Claude propose, and what did the code allow?

## 8강. ShopAssist를 만나다: 도구와 규칙 (`l8`)

8강
ShopAssist를 만나다: 도구와 규칙
슬라이드 13장

> 노트: 원문 LECTURE 8 · 13 slides. 강의 제목은 강좌 한국어 번역본(claude-course-ko.md) 기준.

### 86. `l8-01`

현재 위치
모델은 제안하고, 앱이 결정한다
request
애플리케이션
결정하고 실행
Claude
도구 호출을 제안
이후 거의 모든 강의에서 ShopAssist에 한 조각씩 더해 갑니다.

> 노트: 원문 제목: Model proposes, app decides (WHERE WE ARE). Application (Decides and executes) —request→ Claude (Proposes a tool call). 하단: Almost every later lesson adds one piece to ShopAssist.

### 87. `l8-02`

핵심 개념
두 개의 목록이 ShopAssist를 정의한다
반드시 할 일
판단이 필요한 일. Claude가 내립니다.
절대 하지 말 일
항상 지켜지는 규칙. 하나하나가 우리 코드의 검사입니다.
오늘 다룰 내용: 업무와 도구, 두 목록, 목표치.

> 노트: 원문 제목: Two lists define ShopAssist (THE CORE IDEA). Must do: Judgment calls. Claude makes them. / Must never: Rules that always hold. Each one is a check in our code. 하단: Today: the job and the tools, the two lists, the target.

### 88. `l8-03`

첫째, 업무
고객 지원은 답장 이상이다
message
[이미지: 노트북으로 채팅하는 고객 일러스트]
고객
환불을 요청
ShopAssist
누구인가? 어떤 주문인가? 정책은?
해결됨
케이스 종료
지원팀
케이스를 넘겨받음

> 노트: 원문 제목: Support is more than a reply (FIRST, THE JOB). Customer (Asks for a refund) —message→ ShopAssist (Who? Which order? Policy?) → Resolved (Case closed) / Support team (Gets the case, 점선).

### 89. `l8-04`

구성 방식
도구는 MCP 서버를 통해 들어온다
four tools
ShopAssist
Agent SDK가 루프를 실행
[이미지: 서버와 데이터 블록으로 이루어진 MCP 서버 일러스트]
MCP 서버
스토어의 백엔드

> 노트: 원문 제목: Tools come through an MCP server (HOW IT IS BUILT). ShopAssist (Agent SDK runs the loop) —four tools→ MCP server (The store's backend).

### 90. `l8-05`

네 가지 도구
도구 네 개, 정확한 이름 네 개
get_customer
고객을 찾아 검증된 ID를 반환
lookup_order
검증된 고객의 주문 상세 정보
process_refund
주문 금액을 환불
escalate_to_human
지원팀에 넘길 티켓을 생성
시험에는 정확히 이 이름이 그대로 나옵니다.

> 노트: 원문 제목: Four tools, four exact names (THE FOUR TOOLS). get_customer: Finds a customer, returns a verified ID / lookup_order: Order details for the verified customer / process_refund: Sends money back for an order / escalate_to_human: Creates a ticket for the support team. 하단: The exam uses exactly these names.

### 91. `l8-06`

둘째, 반드시 할 일 목록
다음에 무엇을 할지 Claude가 판단한다
이해하기
고객이 원하는 것
도구 고르기
다음에 호출할 도구
정책 설명하기
쉬운 말로
결정하기
해결 또는 에스컬레이션
판단이 필요한 일은 Claude가 내립니다.

> 노트: 원문 제목: Claude judges what to do next (SECOND, THE MUST-DO LIST). Understand: What the customer wants / Choose a tool: The next one to call / Explain policy: In plain words / Decide: Resolve or escalate. 하단: Judgment calls - Claude makes them.

### 92. `l8-07`

판단의 실제
케이스마다 판단이 다르다
[이미지: 노트북으로 채팅하는 고객 일러스트]
Alex
스토어 고객
ShopAssist
정책을 읽음
재킷
20일째: 반품 시작
램프
45일째: 정책 설명
파손된 상품
사진 있음: 직접 처리

> 노트: 원문 제목: Each case gets its own judgment (JUDGMENT IN ACTION). Alex (A store customer) → ShopAssist (Reads the policy) → Jacket (Day 20 - start the return) / Lamp (Day 45 - explain the policy) / Damaged item (With a photo - handle it).

### 93. `l8-08`

절대 하지 말 일 목록
어떤 규칙은 매번 지켜져야 한다
먼저 검증
고객 검증 전에는 주문 조회나 환불 불가
환불 한도
$500 초과는 사람에게 넘김
구조화된 핸드오프
고객, 원인, 금액, 조치
실제 날짜만
주문에서 읽음. 절대 추측하지 않음
이 규칙들은 매번 지켜져야 합니다.

> 노트: 원문 제목: Some rules must hold every time (THE MUST-NEVER LIST). Verify first: No order or refund before the customer is verified / Refund cap: Above $500 goes to a person / Structured handoff: Customer, cause, amount, action / Real dates only: Read from the order, never guessed. 하단: These rules must hold every time.

### 94. `l8-09`

규칙이 놓이는 곳
Claude는 요청하고, 코드가 결정한다
Claude
ShopAssist 코드
지원팀
process_refund - $800
escalate_to_human
지침은 대부분의 경우 지켜집니다. 코드의 검사는 매번 지켜집니다.

> 노트: 원문 제목: Claude asks, the code decides (WHERE THE RULES LIVE). Claude → ShopAssist code: process_refund - $800 / ShopAssist code → Support team: escalate_to_human. 캡션: Instructions are followed most of the time. A check in code is followed every time.

### 95. `l8-10`

셋째, 목표치
에스컬레이션은 안전한 기본값이 아니다
일반적인 케이스
실제 이유
ShopAssist
케이스마다 처리
첫 문의에서 해결
목표: 80% 이상
[이미지: 노트북 앞에서 헤드셋을 쓴 지원팀 담당자 일러스트]
지원팀
실제 이유가 있을 때만

> 노트: 원문 제목: Escalation is not a safe default (THIRD, THE TARGET). ShopAssist (Handles each case) —standard cases→ Resolved first time (Target: 80 % or more) / —real reason (점선)→ Support team (Real reasons only).

### 96. `l8-11`

계획
ShopAssist는 단계적으로 성장한다
API 호출 한 번
단순한 채팅
도구
스토어에 접근
루프
묻고, 행동하고, 반복
코드의 검사
지켜지는 규칙
여러 에이전트
함께 일함
단순한 채팅에서 프로덕션 수준의 시스템으로.

> 노트: 원문 제목: ShopAssist grows step by step (THE PLAN). One API call (A simple chat) → Tools (Reach the store) → The loop (Ask, act, repeat) → Checks in code (Rules that hold) → Several agents (Working together). 하단: From a simple chat to a production-style system.

### 97. `l8-12`

정리
다섯 가지로 보는 ShopAssist
ShopAssist
Agent SDK로 만든 온라인 스토어용 고객 지원 에이전트.
도구 네 가지: get_customer, lookup_order, process_refund, escalate_to_human
반드시 할 일 목록: 판단이 필요한 일이며, Claude가 내린다
절대 하지 말 일 목록: 우리 코드의 검사
목표: 첫 문의 해결률 80%. 따라서 너무 자주 에스컬레이션하면 실패다

> 노트: 원문 제목: ShopAssist in five points (RECAP). ShopAssist: A support agent for an online store, built with the Agent SDK. / Four tools: get customer, lookup order, process refund, escalate to human / Must-do list: judgment, and Claude makes those calls / Must-never list: checks in our code / Target: 80 % first-contact resolution, so escalating too often is a failure.

### 98. `l8-13`

모든 규칙에 던질 질문 하나
판단은 Claude에게, 규칙은 코드에
판단이 필요한 일
고객이 쓴 내용을 바탕으로 Claude가 결정합니다.
항상 지켜져야 하는 규칙
매번 실행되는 우리 코드의 검사.

> 노트: 원문 제목: Judgment to Claude, rules to code (ONE QUESTION FOR EVERY RULE). A judgment call: Claude decides, based on what the customer wrote. / A rule that must always hold: A check in our code, every time.

## 9강. 6가지 공식 프로덕션 시나리오 (`l9`)

9강
6가지 공식 프로덕션 시나리오
슬라이드 17장

> 노트: 원문 LECTURE 9 · 17 slides. 강의 제목은 강좌 한국어 번역본(claude-course-ko.md) 기준.

### 100. `l9-01`

시험의 구성
시나리오가 먼저, 문제는 그다음
시험
실제 운영 시나리오 6개를 중심으로 구성
시나리오
팀이 Claude로 만드는 시스템
문제
시나리오마다 문제 세트가 이어짐

> 노트: 원문 제목: Scenarios first, then questions (HOW THE EXAM IS BUILT). The exam: Built around six production scenarios → A scenario: A system a team builds with Claude → Questions: A set follows each scenario.

### 101. `l9-02`

시험의 뼈대
시나리오 여섯 개, 그룹 세 개
고객 지원 해결 에이전트
Agent SDK
멀티 에이전트 리서치 시스템
Agent SDK
Claude를 활용한 개발자 생산성
Agent SDK
Claude Code를 활용한 코드 생성
Claude Code
CI/CD를 위한 Claude Code
Claude Code
정형 데이터 추출
문서 파이프라인
시험 당일: 6개 중 4개가 무작위로 출제됩니다. 6개 모두 준비하세요.

> 노트: 원문 제목: Six scenarios, three groups (THE EXAM'S BACKBONE). Customer Support (Agent SDK) / Research System (Agent SDK) / Dev Productivity (Agent SDK) / Code Generation (Claude Code) / Claude Code CI/CD (Claude Code) / Data Extraction (Document pipeline). 하단: Exam day: 4 of the 6 at random - prepare for all six. 시나리오 이름은 공식 가이드 한국어판 기준.

### 102. `l9-03`

시나리오 1 · AGENT SDK
고객 지원 해결 에이전트
[이미지: 휴대폰 쇼핑 앱과 상자를 든 고객 일러스트]
고객
반품, 결제, 계정
지원 에이전트
MCP를 통한 도구
get_customer
lookup_order
process_refund
escalate_to_human

> 노트: 원문 제목: Customer Support Resolution Agent (SCENARIO 1 · AGENT SDK). Customer (Return, billing, account) → Support agent (Tools via MCP) → get_customer / lookup_order / process_refund / escalate_to_human.

### 103. `l9-04`

긴장 관계
언제 에스컬레이션할지 아는 것
너무 자주 에스컬레이션
첫 문의 해결 목표를 놓칩니다.
너무 드물게 에스컬레이션
손대지 말아야 할 케이스까지 처리합니다.
목표: 케이스의 80% 이상을 첫 문의에서 해결

> 노트: 원문 제목: Knowing when to escalate (THE TENSION). Escalates too often: Misses the first-contact target. / Escalates too rarely: Handles cases it should not touch. 하단: Target: resolve at least 80% of cases on first contact.

### 104. `l9-05`

시나리오 2 · AGENT SDK
멀티 에이전트 리서치 시스템
코디네이터
주제를 나눔
웹 검색
출처를 찾음
문서 분석
자료를 읽음
종합
결과를 합침
보고서 작성
모든 주장에 출처를 단다

> 노트: 원문 제목: Multi-Agent Research System (SCENARIO 2 · AGENT SDK). Coordinator (Splits the topic) → Web search (Finds sources) / Document analysis (Reads the papers) / Synthesis (Combines findings) / Report writer (Cites every claim).

### 105. `l9-06`

시나리오 3 · AGENT SDK
Claude를 활용한 개발자 생산성
엔지니어
레거시 코드베이스
내 에이전트
Agent SDK로 구축
Read · Write · Edit
Grep · Glob
Bash
MCP 서버

> 노트: 원문 제목: Developer Productivity with Claude (SCENARIO 3 · AGENT SDK). Engineer (Legacy codebase) → Your agent (Built with Agent SDK) → Read · Write · Edit / Grep · Glob / Bash / MCP servers.

### 106. `l9-07`

긴장 관계
빠져 허우적대지 않고 이해하기
검색
Grep으로 이름 하나를 찾음
읽기
일치하는 파일만
이해하기
그다음 질문을 던짐
한 단계씩
처음부터 모든 파일을 읽지 않음

> 노트: 원문 제목: Understand without drowning (THE TENSION). Search (Grep for one name) → Read (Only the matching files) → Understand (Then ask the next question) → 다시 Search. 가운데: step by step / not every file up front.

### 107. `l9-08`

시나리오 4 · CLAUDE CODE
Claude Code를 활용한 코드 생성
한 팀이 매일 Claude Code를 사용합니다.
생성
요청에 따라 새 코드 작성
리팩터링
기존 코드의 구조를 바꿈
디버깅
실패 원인을 추적하고 수정
문서화
문서와 주석

> 노트: 원문 제목: Code Generation with Claude Code (SCENARIO 4 · CLAUDE CODE). A team uses Claude Code every day. Generate: New code from a request / Refactor: Reshape what exists / Debug: Trace and fix failures / Document: Docs and comments.

### 108. `l9-09`

설정과 워크플로
공유 지침과 단축 명령
모두에게 같은 단축 명령
# /review - a custom slash command for the team
Review the staged changes.
- Check them against the conventions in CLAUDE.md
- Flag missing tests for new functions
- List findings by file and line, most severe first
Focus: $ARGUMENTS
공유 지침은 CLAUDE.md에 두고, 팀원 누구나 실행할 수 있는 단축 명령을 만듭니다.

> 노트: 원문 제목: Shared instructions and shortcuts (CONFIGURATION AND WORKFLOW). 라벨: the same shortcut for everyone. 코드(영문 유지) 의미: /review는 팀용 커스텀 슬래시 커맨드. 스테이징된 변경을 리뷰하라. CLAUDE.md의 컨벤션과 대조하고, 새 함수에 테스트가 없으면 표시하고, 지적 사항을 파일과 줄 단위로 심각한 것부터 나열하라. Focus: $ARGUMENTS. 캡션: Shared instructions in CLAUDE.md, then a shortcut every teammate can run.

### 109. `l9-10`

워크플로 선택
먼저 계획할까, 바로 실행할까?
아키텍처 변경
여러 모듈에 영향
플랜 모드
먼저 계획을 검토
작고 명확한 수정
원인이 하나로 분명함
직접 실행
바로 변경

> 노트: 원문 제목: Plan first, or just do it? (WORKFLOW CHOICE). Architectural change (Touches many modules) → Plan mode (Review the plan first) / Small, clear fix (One obvious cause) → Direct execution (Just make the change).

### 110. `l9-11`

혼동하기 쉬운 것
에이전트를 만드는가, Claude Code를 쓰는가
개발자 생산성
Agent SDK로 자신만의 에이전트를 만듭니다.
코드 생성
팀이 Claude Code 자체를 사용하고 설정합니다.

> 노트: 원문 제목: Build an agent, or use Claude Code (EASY TO CONFUSE). Developer Productivity: You build your own agent with the Agent SDK. / Code Generation: The team uses Claude Code itself and configures it.

### 111. `l9-12`

시나리오 5 · CLAUDE CODE
CI/CD를 위한 Claude Code
개발자
CI 파이프라인
Claude Code
push a change
review this pull request
review + test cases
feedback on the PR
CI/CD: 코드가 바뀔 때마다 실행되는 자동 검사.

> 노트: 원문 제목: Claude Code for CI/CD (SCENARIO 5 · CLAUDE CODE). Developer → CI pipeline: push a change / CI pipeline → Claude Code: review this pull request / Claude Code → CI pipeline: review + test cases / CI pipeline → Developer: feedback on the PR. 캡션: CI/CD: automated checks that run whenever code changes. 메시지 라벨은 영문 유지(의미: 변경 푸시 / 이 풀 리퀘스트를 리뷰 / 리뷰 + 테스트 케이스 / PR에 대한 피드백).

### 112. `l9-13`

파이프라인에서 실행
키보드 앞에는 아무도 없다
# A CI step that runs on every pull request
claude -p "Review this diff. Report only real bugs, with file and line." \
  --output-format json > review.json
# The next step reads the result with a script
jq -r '.result' review.json
질문에 답해 줄 사람이 없는 상태에서 리뷰를 실행하는 한 가지 방법입니다.

> 노트: 원문 제목: Nobody at the keyboard (RUNNING IN A PIPELINE). 코드(영문 유지) 의미: 모든 풀 리퀘스트마다 실행되는 CI 단계. claude -p로 "이 diff를 리뷰하라. 실제 버그만 파일과 줄과 함께 보고하라"를 실행하고 JSON으로 review.json에 저장. 다음 단계는 스크립트(jq)로 결과를 읽음. 캡션: One way to run a review with no one there to answer questions.

### 113. `l9-14`

시나리오 6 · 파이프라인
정형 데이터 추출
문서
스캔한 청구서
추출
vendor, date, total
JSON 스키마
모든 필드를 검사
다른 시스템
청구, ERP

> 노트: 원문 제목: Structured Data Extraction (SCENARIO 6 · PIPELINE). Document (Scanned invoice) → Extract (vendor, date, total) → JSON schema (Checks every field) → Other systems (Billing, ERP).

### 114. `l9-15`

주된 긴장 관계
형식은 맞지만 데이터는 틀리다
{
  "invoice_id": "INV-2041",
  "vendor": "Northwind Supplies",
  "items": [120.00, 80.00],
  "total": 250.00,
  "po_number": null
}
레코드는 스키마와 일치하면서도 틀릴 수 있습니다. (120.00 + 80.00 = 200.00이지만 total은 250.00)

> 노트: 원문 제목: Valid shape, wrong data (THE MAIN TENSION). JSON 레코드(영문 유지). 캡션: A record can match the schema and still be wrong. 괄호 안의 합계 설명은 번역 시 덧붙인 것(원문 슬라이드에는 없음).

### 115. `l9-16`

도메인을 가로질러
도메인 하나에만 대응하는 시나리오는 없다
지원 에이전트
Claude Code CI/CD
에이전트 설계
도구 설계
신뢰성
Claude Code 구성
프롬프트 엔지니어링

> 노트: 원문 제목: No scenario maps to one domain (ACROSS DOMAINS). Support agent → Agent design / Tool design / Reliability. Claude Code CI/CD → Claude Code config / Prompt engineering.

### 116. `l9-17`

시험 당일
문제는 세 단계로 읽는다
도메인을 공부할 때, 그것이 각 시나리오에서 어디에 나타나는지 물어보세요.
시나리오 이름 대기
여섯 개 중 어느 것인가?
핵심 제약 조건
시나리오가 가장 중시하는 것
답 고르기
그 제약 조건을 존중하는 답

> 노트: 원문 제목: Read each question in three steps (ON EXAM DAY). When you study a domain, ask where it shows up in each scenario. Name the scenario (Which of the six is this?) → Key constraint (What it cares about most) → Pick the answer (The one that respects it).
