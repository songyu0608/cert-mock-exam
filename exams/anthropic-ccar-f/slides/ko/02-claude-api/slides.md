# CCAR-F 섹션 2. Claude API 활용 (한국어판)

원본 아티팩트: https://claude.ai/artifact/UizUJtBEtyVnfsrvmbMKtn

슬라이드 HTML(`slides/`)에서 화면 글자와 발표자 노트(`<aside>`, 영어 원문)를 뽑은 텍스트다. 자동 생성 파일이므로 고칠 때는 슬라이드 HTML을 기준으로 한다.

## 표지 (`cover`)

슬라이드
Claude Certified Architect – Foundations:
전체 강좌
섹션 2. Claude API 활용
15~16강, 슬라이드 22장

> 노트: 원문: Claude Certified Architect Foundations: Complete Course / Section 2. Working with the Claude API / Lectures 15-16, 22 slides.

## 15강. 모델, effort, max_tokens (`l15`)

15강
모델, effort, max_tokens
슬라이드 12장

> 노트: 원문: LECTURE 15 · Model, Effort and max_tokens · 12 slides

### 3. `l15-01`

설정 세 가지
모든 요청에는 설정 3가지가 담긴다
ShopAssist 앱
설정을 고른다
Claude
요청을 실행한다

> 노트: 원문 제목: Every request carries 3 settings (THREE SETTINGS). ShopAssist app (Chooses the settings) → Claude (Runs the request).

### 4. `l15-02`

ShopAssist의 현재 상태
ShopAssist는 고객과 채팅한다
chat
request
[이미지: 노트북으로 채팅하는 고객 일러스트]
고객
스토어 채팅에 글을 쓴다
ShopAssist 앱
대화를 유지하고 규칙을 검사
Claude
답을 작성

> 노트: 원문 제목: ShopAssist chats with customers (WHERE SHOPASSIST IS NOW). Customer (Writes in the store chat) —chat→ ShopAssist app (Keeps the chat, checks rules) —request→ Claude (Writes the reply).

### 5. `l15-03`

첫 주가 지난 뒤
첫 주에 문제 두 개가 드러났다
조용한 문제
두 줄짜리 로그 요약이 가장 성능 높은 모델에서 실행된다. 느리고 비싸다.
눈에 띄는 문제
Alex가 주문 두 건에 대해 물었다. 답이 문장 중간에서 끊겼다.

> 노트: 원문 제목: Week one found two problems (AFTER THE FIRST WEEK). A quiet problem: Two-line log summaries run on the most capable model: slow and costly. / An easy-to-see problem: Alex asked about two orders. The reply stopped mid-sentence.

### 6. `l15-04`

핵심 개념
각 설정은 애플리케이션이 고른다
모델 계열
어떤 모델이 이 단계를 실행하는가
Effort
얼마나 신중하게 일하는가
Max tokens
답의 길이 한도
그리고 애플리케이션은 모든 답이 어떻게 끝났는지 검사합니다.

> 노트: 원문 제목: Your app chooses each setting (THE MAIN IDEA). Model family: Which model runs the step / Effort: How carefully it works / Max tokens: A ceiling on the reply. 하단: And your application checks how every reply ended.

### 7. `l15-05`

첫째: 모델 계열
역할에 따라 모델 계열을 고른다
Opus
가장 어려운 추론, 에이전트 작업
Sonnet
프로덕션용으로 균형 잡힌 기본값
Haiku
빠르고 저렴, 여러 번 실행
Fable
프리미엄 최상위 등급
단계가 얼마나 어려운지, 얼마나 빨라야 하는지, 얼마나 자주 실행되는지로 정하세요.

> 노트: 원문 제목: Pick the model family by role (FIRST: THE MODEL FAMILY). Opus: Hardest reasoning, agentic work / Sonnet: Balanced default for production / Haiku: Fast, cheap, runs many times / Fable: Premium top tier. 하단: Decide by how hard the step is, how fast it must be, how often it runs.

### 8. `l15-06`

단계마다 맞는 모델
모델 ID는 한 곳에서 한 번만 정한다
# Easy, runs after every chat: Haiku
SUMMARY_MODEL = "claude-haiku-5-5"
# Needs judgment: Sonnet
CHAT_MODEL = "claude-sonnet-5-5"
reply = client.messages.create(
    model=CHAT_MODEL,
    max_tokens=1024,
    messages=messages,
)
단계마다 모델을 고르는 한 가지 방법입니다. 새 모델이 나오면 한 줄만 바꾸면 됩니다.

> 노트: 원문 제목: Set each model ID once (RIGHT MODEL PER STEP). 코드(영문 유지) 주석 의미: 쉬운 일, 채팅마다 실행되므로 Haiku / 판단이 필요하므로 Sonnet. 캡션: One way to choose a model per step: a new model changes one line.

### 9. `l15-07`

둘째: EFFORT
effort를 낮추면 비용이 줄어든다
# A plain 'it has shipped' answer: lower effort
reply = client.messages.create(
    model=CHAT_MODEL,
    max_tokens=1024,
    output_config={"effort": "low"},
    messages=messages,
)
effort가 높으면 더 신중하게 일합니다. 낮으면 더 빠르고, 더 짧고, 도구 호출이 줄어듭니다.

> 노트: 원문 제목: Lower the effort to spend less (SECOND: THE EFFORT). 코드(영문 유지) 주석 의미: “발송되었습니다” 같은 단순한 답에는 낮은 effort. 캡션: Higher effort: more careful work. Lower effort: faster, shorter, fewer tool calls.

### 10. `l15-08`

셋째: MAX TOKENS
잘린 답은 max_tokens라고 알려 준다
ShopAssist 앱
max_tokens: 300으로 설정
Claude API
한도에 닿으면 멈춤

> 노트: 원문 제목: A cut-off reply says max_tokens (THIRD: MAX TOKENS). ShopAssist app (Sets max_tokens: 300) → Claude API (Stops at the ceiling).

### 11. `l15-09`

ALEX에게 일어난 일
stop_reason부터 확인한다
client.messages.create(
    model=CHAT_MODEL,
    max_tokens=1024,
    stop_sequences=["###"],
    messages=messages,
)
잘린 답을 처리하는 한 가지 방법: 보내기 전에 stop_reason(중지 사유)을 확인합니다.

> 노트: 원문 제목: Check the stop reason first (WHAT HAPPENED TO ALEX). 코드는 원문 그대로. 캡션: One way to handle a cut-off reply: check stop_reason before sending.

### 12. `l15-10`

짧은 메모 하나
예전 설정은 이제 거부된다
Temperature
현재 모델은 거부함
Top p, top k
현재 모델은 거부함
프리필(prefill)
현재 모델은 거부함
시험에서는 다루지 않습니다. 쓰지 마세요.

> 노트: 원문 제목: Old settings are rejected now (ONE SHORT NOTE). Temperature / Top p, top k / Reply start: 모두 “Rejected by current models”. 하단: The exam does not test them. Leave them out. “Reply start”는 답의 앞부분을 미리 채워 넣는 설정(흔히 prefill이라 부름)을 가리키는 것으로 보이며, 이 해석은 번역자 추정입니다.

### 13. `l15-11`

다시 두 문제로
두 문제 모두 해결되었다
로그 요약
Haiku에서 실행됩니다. 빠르고 저렴합니다.
대화
Sonnet에서 실행되며, effort는 케이스에 맞게 설정합니다.
stop_reason 검사가 잘린 답을 Alex가 보기 전에 잡아냅니다.

> 노트: 원문 제목: Both problems are fixed (BACK TO THE TWO PROBLEMS). Log summaries: They run on Haiku: fast and cheap. / The conversation: It runs on Sonnet, with effort set to fit the case. 하단: The stop reason check catches a cut-off reply before Alex sees it.

### 14. `l15-12`

정리
단계마다 고르고, 그다음 검사한다
모델 계열
난이도, 속도, 실행량으로 결정
Effort
얼마나 신중하게 일하는가
Max tokens
목표가 아니라 한도
stop_reason
고객이 보기 전에 확인
잘린 답은 stop_reason이 max_tokens로 나타납니다.

> 노트: 원문 제목: Choose per step, then check (RECAP). Model family: By difficulty, speed, volume / Effort: How carefully it works / Max tokens: A ceiling, not a target / Stop reason: Check before the customer sees. 하단: A cut-off reply shows up as the stop reason max_tokens.

## 16강. 같은 질문, 다른 답 (`l16`)

16강
같은 질문, 다른 답
슬라이드 10장

> 노트: 원문: LECTURE 16 · Same Question, Different Answers · 10 slides

### 16. `l16-01`

왜 중요한가
고객에게는 같은 답이 필요하다
[이미지: 노트북으로 채팅하는 고객 일러스트]
고객
웹사이트에서 채팅
ShopAssist
맞는 모델, 맞는 effort
시스템 프롬프트
30일 반품 규칙

> 노트: 원문 제목: Customers need the same answer (WHY IT MATTERS). Customer (Chats on the website) → ShopAssist (Right model, right effort) ← System prompt (30-day return rule).

### 17. `l16-02`

로그에서 발견한 이상한 패턴
같은 질문, 다른 답
[이미지: 노트북으로 채팅하는 고객 일러스트]
고객
5주 전에 산 재킷
ShopAssist
같은 스토어, 같은 모델
월요일
거절: 30일 기간
화요일
상담원 연결을 제안

> 노트: 원문 제목: Same question, different answers (A STRANGE PATTERN IN THE LOGS). Customer (Jacket, 5 weeks ago) → ShopAssist (Same store, same model) → Monday (Says no: 30-day window) / Tuesday (Offers a human agent).

### 18. `l16-03`

살펴볼 세 가지
대부분은 불명확한 규칙 때문이다
진짜 원인
답이 바뀌는 이유
두 개의 층
프롬프트와 애플리케이션
가짜 해결책 세 가지
그럴듯해 보이지만 아니다
답이 달라진다면 대개 운이 나빠서가 아니라 규칙이 불명확하다는 뜻입니다.

> 노트: 원문 제목: Unclear rules cause most of this (THREE THINGS TO LOOK AT). The real cause: Why the answers change / Two layers: Prompt and application / Three false fixes: They look right, they are not. 하단: Different answers usually point to an unclear rule, not to bad luck.

### 19. `l16-04`

첫째, 원인
프롬프트가 두 가지로 읽힌다
규칙 A
30일 이내 반품
규칙 B
어려운 케이스는 사람을 연결
Claude
가능성 높은 텍스트를 예측
월요일
정책으로 읽음
화요일
어려운 케이스로 읽음

> 노트: 원문 제목: The prompt allows two readings (FIRST, THE CAUSE). Rule A (Returns within 30 days) / Rule B (Offer a human for hard cases) → Claude (Predicts likely text) → Monday (Reads it as policy) / Tuesday (Reads it as a hard case).

### 20. `l16-05`

해결책
결정을 가르는 기준을 명시한다
Customer: "Can a jacket delivered 5 weeks ago be returned?"
→ plain question: explain the 30-day window
Customer: "Please accept the return anyway."
→ request for an exception: hand off to a human
기준이 명확하면 메시지 종류마다 해석이 하나만 남습니다.

> 노트: 원문 제목: State the criterion that decides (THE FIX). 프롬프트 예시(영문 유지) 의미: 고객 “5주 전에 배송된 재킷을 반품할 수 있나요?” → 단순 질문: 30일 기간을 설명한다. / 고객 “그래도 반품을 받아 주세요.” → 예외 요청: 사람에게 넘긴다. 캡션: A clear criterion leaves one reading for each kind of message.

### 21. `l16-06`

둘째, 두 개의 층
프롬프트는 유도하고, 코드는 보장한다
프롬프트
지침, 기준, 예시
Claude
유도될 뿐, 보장되지 않음
애플리케이션
스키마: 필드와 타입

> 노트: 원문 제목: Prompts steer, code guarantees (SECOND, THE TWO LAYERS). The prompt (Instructions, criteria, examples) → Claude (Steered, not promised) → The application (Schema: fields and types).

### 22. `l16-07`

스키마는 사실 검사가 아니다
스키마는 사실이 아닌 형식을 검사한다
Claude
내 코드
주문 데이터
유효한 JSON, 틀린 날짜
배송일은?
배송 완료 2026-09-09
35일 경과: 반품 기간 종료
고객에게 설명
Claude는 설명하고, 코드는 확인합니다.

> 노트: 원문 제목: A schema checks shape, not facts (A SCHEMA IS NOT A FACT CHECK). Claude → Your code: valid JSON, wrong date / Your code → Order data: delivery date? / Order data → Your code: delivered 2026-09-09 / Your code → Claude: 35 days: window closed / Claude → Your code: explains to customer. 캡션: Claude explains, and the code confirms.

### 23. `l16-08`

셋째, 시험이 오답으로 보는 것
도움이 안 되는 해결책 세 가지
더 큰 모델
여전히 두 가지로 읽는다
더 긴 컨텍스트
텍스트는 늘어도 빈틈은 그대로
더 강한 표현
대문자 강조는 대부분의 경우에만 통한다
어느 것도 두 번째 해석을 없애지 못합니다.

> 노트: 원문 제목: Three fixes that do not help (THIRD, WHAT THE EXAM REJECTS). Bigger model: Still sees two readings / Larger context: More text, same gap / Louder words: Capitals work most of the time. 하단: None of them removes the second reading.

### 24. `l16-09`

대신 해야 할 일
무엇이든 고치기 전에 진단한다
예
다른 답
같은 질문
판단의 문제인가?
규칙이 두 가지로 읽힘
매번 지켜져야 하는가?
놓쳐도 될 여지가 없음
프롬프트를 고친다
더 명확한 기준이나 예시
검사를 추가한다
코드 안에

> 노트: 원문 제목: Diagnose before you fix anything (WHAT TO DO INSTEAD). Different answers (Same question) → Judgment problem? (The rule has two readings) → Fix the prompt (Clearer criterion or example) / Must hold every time? (No room for a miss) —yes→ Add a check (In your code).

### 25. `l16-10`

정리
원인은 대개 불명확한 규칙이다
불명확한 규칙을 찾아라
두 가지 해석 중 하나를 고르게 하는 기준을 명시하세요.
프롬프트는 유도한다: 지침, 기준, 예시
애플리케이션은 보장한다: 형식은 스키마로, 사실은 코드로
더 큰 모델, 더 긴 컨텍스트, 더 강한 표현: 해결책이 아니다
판단의 문제면 프롬프트를 고치고, 매번 지켜져야 하면 검사를 추가한다

> 노트: 원문 제목: An unclear rule is the usual cause (RECAP). Find the unclear rule: State the criterion that decides between the two readings. / The prompt steers: instructions, criteria, examples / The application guarantees: schema for shape, code for facts / Bigger model, more context, louder words: no fix / Judgment: fix the prompt. Every time: add a check.
