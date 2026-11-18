# CCAR-F 섹션 7. 멀티 에이전트 시스템 (한국어판)

원본 아티팩트: https://claude.ai/artifact/NCJyFPtL7eJ72vnbvss1rz

슬라이드 HTML(`slides/`)에서 화면 글자와 발표자 노트(`<aside>`, 영어 원문)를 뽑은 텍스트다. 자동 생성 파일이므로 고칠 때는 슬라이드 HTML을 기준으로 한다.

## 표지 (`cover`)

슬라이드
Claude Certified Architect – Foundations:
전체 강좌
섹션 7. 멀티 에이전트 시스템
59~70강, 슬라이드 143장

> 노트: 원문: Claude Certified Architect Foundations: Complete Course / Section 7. Multi-Agent Systems / Lectures 59-70, 143 slides. (원본에 65강 없음)

## 59강. 워크플로인가 에이전트인가: 작업을 나누는 방식 (`l59`)

59강
워크플로인가 에이전트인가: 작업을 나누는 방식
슬라이드 13장

> 노트: 원문: LECTURE 59 · Workflow or Agent: How Work Is Decomposed · 13 slides

### 3. `l59-01`

지금까지
먼저 물어라: 에이전트가 필요한가?
Agent SDK
에이전트를 실행
검증 게이트
행동 전에 확인
훅
코드로 지키는 규칙
케이스 정보
유지되는 사실
핸드오프
구조화된 요약
에이전트는 비용이 더 들고 테스트하기도 더 어렵습니다.

> 노트: 원문 제목: Ask first: does it need an agent? (WHERE WE ARE). Agent SDK: Runs the agent / Verification gate: Checks before acting / Hooks: Rules held in code / Case facts: Facts that persist / Handoffs: Structured summaries. 하단: An agent costs more and is harder to test.

### 4. `l59-02`

핵심 개념
알려진 단계는 고정되고, 계획은 자라난다
워크플로: 고정된 단계
단계를 미리 적어 둘 수 있다. 코드가 정해진 순서대로 실행한다.
에이전트: 자라나는 계획
다음 단계는 직전 단계가 찾은 것에 달려 있다. 작업이 진행되며 계획이 자란다.
시험 용어: 프롬프트 체이닝, 그리고 동적·적응적 분해.

> 노트: 원문 제목: Known steps stay fixed; plans grow (THE CORE IDEA). A workflow: fixed steps: You can write the steps down first. Your code runs them in a fixed order. / An agent: a growing plan: The next step depends on what the last step found. The plan grows as the work goes. 하단: The exam says: prompt chaining and dynamic adaptive decomposition.

### 5. `l59-03`

첫 번째: 고정된 순서
단계마다 별도의 요청이다
[이미지: 노트북으로 채팅하는 고객 일러스트]
반품 양식
고객이 작성
추출
주문, 품목, 사유
분류
사유
답장 초안
고객에게

> 노트: 원문 제목: Each step is its own request (FIRST: THE FIXED SEQUENCE). Return form (Customer fills it in) → Extract (order, item, reason) → Classify (the reason) → Draft reply (to the customer).

### 6. `l59-04`

프롬프트 체이닝
순서는 우리 코드가 정한다
request
우리 코드
순서를 정하고, 결과를 확인
Claude
각 단계 안에서 작업

> 노트: 원문 제목: Our code decides the order (PROMPT CHAINING). Our code (Sets the order, checks results) → request → Claude (Works inside each step).

### 7. `l59-05`

체이닝이 맞는 곳
알려진 단계는 코드에 둔다
프롬프트 체이닝
알려진 단계, 고정된 순서, 코드가 실행.
여러 측면을 예측 가능하게 리뷰
매번 같은 측면을, 같은 순서로
에이전트가 아님: 양식의 단계는 알려져 있음

> 노트: 원문 제목: Known steps belong in code (WHERE CHAINING FITS). Prompt chaining: Known steps, fixed order, run by your code. / Predictable reviews of several aspects / The same aspects, in the same order, every time / Not an agent: the form steps are known.

### 8. `l59-06`

두 번째: 자라나는 계획
아직 아무도 단계를 모른다
[이미지: 노트북 앞에서 회의하는 두 사람 일러스트]
ShopAssist 팀
오래된 모듈을 담당
환불 모듈
레거시, 테스트가 거의 없음
테스트 추가
단계는 아직 모름
담당

> 노트: 원문 제목: Nobody knows the steps yet (SECOND: THE PLAN THAT GROWS). ShopAssist team (Owns the old module) → owns → Refund module (Legacy, almost no tests) → Add tests (Steps unknown yet).

### 9. `l59-07`

미리 써 둔 계획
하드코딩된 계획은 여기서 깨진다
# one hard-coded plan for the module
files = list_all_files("refund_module")
for f in files:
    context.append(read(f))
for f in files:
    write_tests(f)
컨텍스트부터 채우고, 모든 파일을 똑같이 다루며, 방향을 바꿀 수 없습니다.

> 노트: 원문 제목: A hard-coded plan breaks here (A PLAN WRITTEN IN ADVANCE). 코드(영문 유지) 의미: 모듈에 대한 하드코딩된 계획 하나. refund_module의 모든 파일을 나열하고, 모든 파일을 읽어 컨텍스트에 넣은 뒤, 모든 파일에 테스트를 작성한다. 캡션: It fills the context first, treats every file alike and cannot change course.

### 10. `l59-08`

세 가지 움직임
구조를 파악하고, 핵심 지점을 찾고, 계획한다
구조 파악
진입점, 함수, 호출자
영향이 큰 영역
금액 · $500 한도 · 반품 기한
우선순위 계획
가장 중요한 영역부터

> 노트: 원문 제목: Map, find hot spots, then plan (THREE MOVES). Map structure (Entry points, functions, callers) → High-impact areas (Amount · $500 limit · return window) → Prioritized plan (Most important area first).

### 11. `l59-09`

그다음 계획이 바뀐다
새로운 조사 결과가 새 하위 작업을 더한다
환불 금액 테스트
에이전트가 여기서 시작
통화 헬퍼
다른 폴더, 테스트 없음
새 하위 작업
헬퍼부터 테스트
의존
추가

> 노트: 원문 제목: New findings add new subtasks (THEN THE PLAN ADAPTS). Test refund amount (The agent starts here) → depends on → Currency helper (Other folder, no tests) → adds → New subtask (Test the helper first).

### 12. `l59-10`

세 번째: 선택하는 법
예측 가능한 작업에는 체인을
예
아니요
단계를 미리 아는가?
신뢰할 수 있게 정의할 수 있는가?
프롬프트 체이닝
고정된 호출, 안정적인 비용과 대기 시간
적응적 분해
호출이 달라지고, 디버깅이 더 어려움

> 노트: 원문 제목: Predictable work gets a chain (THIRD: HOW TO CHOOSE). Steps known first? (Can they be defined reliably?) → yes → Prompt chaining (Fixed calls, stable cost and wait) / no → Adaptive decomposition (Varying calls, harder to debug).

### 13. `l59-11`

변하지 않는 것
반드시 지켜야 할 규칙은 코드에 남는다
고정된 파이프라인
검증 게이트와 환불 훅
적응적 계획
같은 게이트와 같은 훅
항상 지켜야 하는 규칙은 코드에 남습니다.

> 노트: 원문 제목: Rules that must hold stay in code (WHAT NEVER CHANGES). Fixed pipeline: Verification gate and refund hook / Adaptive plan: The same gate and the same hook. 하단: A rule that must always hold stays in code.

### 14. `l59-12`

정리
알려진 작업은 체인으로, 나머지는 적응적으로
프롬프트 체이닝
알려진 단계, 고정된 순서, 코드가 통제
예측 가능한 작업
추출, 분류, 초안 작성, 고정된 리뷰
적응적 계획
하위 작업은 각 단계가 찾은 것에서 나온다

> 노트: 원문 제목: Chain known work; adapt the rest (RECAP). Prompt chaining: Known steps, fixed order, code in control / Predictable work: Extract, classify, draft; fixed reviews / Adaptive plan: Subtasks come from what each step finds.

### 15. `l59-13`

정리
필요한 만큼만 자유를 준다
구조 파악
진입점과 호출자
영향이 큰 영역
실수의 비용이 가장 큰 곳
바뀌는 계획
새 의존성이 하위 작업을 더한다
작업이 얼마나 예측 가능한지에 따라 선택합니다.

> 노트: 원문 제목: Use only the freedom needed (RECAP). Map structure: Entry points and callers → High-impact areas: Where mistakes cost most → Changing plan: New dependencies add subtasks. 하단: Choose by how predictable the work is.

## 60강. 코디네이터 패턴 (`l60`)

60강
코디네이터 패턴
슬라이드 14장

> 노트: 원문: LECTURE 60 · The Coordinator Pattern · 14 slides

### 17. `l60-01`

멀티 에이전트 시스템
에이전트 하나가 여러 서브에이전트를 부린다
지난 강의
고정된 단계의 순서, 또는 작업이 진행되며 자라나는 계획.
이번 강의
코디네이터 패턴: 가운데의 에이전트 하나가 여러 서브에이전트를 실행한다.
시험의 멀티 에이전트 문제는 이 그림에서 출발합니다.

> 노트: 원문 제목: One agent runs several helpers (MULTI-AGENT SYSTEMS). Last lesson: A fixed sequence of steps, or a plan that grows as the work goes. / This lesson: The coordinator pattern: one agent in the middle runs several helper agents. 하단: The exam's multi-agent questions start from this picture.

### 18. `l60-02`

왜 코디네이터인가
램프 반품에는 많은 출처가 필요하다
ShopAssist
고객 사례를 한 번에 하나씩
[이미지: 태블릿을 든 관리자 일러스트]
스토어 팀
램프는 왜 그렇게 자주 반품될까?
지원 티켓
고객 리뷰
공급업체 보고서
웹
리서치 어시스턴트
Agent SDK로 구축

> 노트: 원문 제목: Lamp returns need many sources (WHY A COORDINATOR). ShopAssist (One customer case at a time) / Store team (Why are lamps returned so often?). Support tickets, Customer reviews, Supplier reports, The web → Research assistant (Built on the Agent SDK).

### 19. `l60-03`

리서치 어시스턴트
서브에이전트 넷, 각자 한 가지 일
웹 검색
기사, 포럼, 공개 리뷰를 찾음
문서 분석
티켓과 공급업체 보고서를 읽음
종합
조사 결과를 결론으로 바꿈
보고서
최종 보고서를 작성
한 프로그램 안의 에이전트 다섯: 서브에이전트 넷과 코디네이터 하나.

> 노트: 원문 제목: Four subagents, one job each (THE RESEARCH ASSISTANT). Web search: Finds articles, forums, public reviews / Document analysis: Reads tickets and supplier reports / Synthesis: Turns findings into conclusions / Report: Writes the final report. 하단: Five agents in one program: four subagents and a coordinator.

### 20. `l60-04`

다섯 번째 에이전트
서브에이전트끼리는 절대 직접 대화하지 않는다
코디네이터
작업을 나누고 결과를 모으는 에이전트.
첫째: 왜 모든 것이 코디네이터를 거치는가
둘째: 코디네이터가 무엇을 결정하는가
셋째: 서브에이전트에게 어떻게 지시하는가
모든 메시지는 코디네이터를 거칩니다.

> 노트: 원문 제목: Subagents never talk to each other (THE FIFTH AGENT). The coordinator: An agent that splits a task and collects the results. / First: why everything passes through it / Second: what it decides / Third: how it briefs a subagent. 하단: Every message goes through the coordinator.

### 21. `l60-05`

첫째: 경로
스포크는 허브에만 연결된다
웹 검색
스포크
문서 분석
스포크
종합
스포크
보고서
스포크
코디네이터
허브

> 노트: 원문 제목: Spokes connect only to the hub (FIRST: THE ROUTING). Coordinator (The hub) ↔ Web search, Document analysis, Synthesis, Report (Spoke).

### 22. `l60-06`

시험이 꼽는 세 가지 이유
허브가 주는 세 가지 이점
관찰 가능성
모든 메시지를 기록하고, 이상한 주장을 추적한다
일관된 오류 처리
시간 초과를 모두 같은 방식으로 처리한다
통제된 흐름
보고서는 원시 페이지 200장이 아니라 결론을 받는다
시스템 전체를 보는 단 하나의 지점입니다.

> 노트: 원문 제목: The hub gives three benefits (THE EXAM NAMES THREE REASONS). Observability: Log every message, trace a strange claim / Consistent errors: A timeout is handled the same way for all / Controlled flow: Report gets conclusions, not 200 raw pages. 하단: One point that sees the whole system.

### 23. `l60-07`

둘째: 결정
코디네이터의 네 가지 일
선택
질문에 필요한 서브에이전트
분해
질문을 부분으로 나눔
위임
각 부분을 서브에이전트에 보냄
취합
결과를 하나의 답으로 합침
램프 질문에는 서브에이전트 넷이 모두 필요합니다.

> 노트: 원문 제목: The coordinator has four jobs (SECOND: THE DECISIONS). Select: Which subagents a question needs → Decompose: Split the question into parts → Delegate: Send each part to a subagent → Aggregate: Merge results into one answer. 하단: The lamp question needs all four subagents.

### 24. `l60-08`

더 작은 질문
단순한 질문에는 서브에이전트 하나
팀원
코디네이터
문서 분석
“지난달 반품된 램프는?”
요청 하나
개수
답
웹 검색도 보고서도 없습니다. 숫자는 스토어 자체 데이터에 있습니다.

> 노트: 원문 제목: Simple question, one subagent (A SMALLER QUESTION). Team member → Coordinator: Lamps returned last month? / Coordinator → Document analysis: one request / Document analysis → Coordinator: the count / Coordinator → Team member: the answer. 캡션: No web search and no report: the number sits in the store's own data.

### 25. `l60-09`

전부 실행하지 말고 선택하라
필요한 서브에이전트만 고른다
질문 분석
얼마나 복잡한가?
출처 확인
어떤 출처가 답할 수 있는가?
서브에이전트 선택
필요한 것만
넷을 모두 거치는 고정 경로는 호출을 낭비하고 노이즈를 더합니다.

> 노트: 원문 제목: Pick only the subagents needed (SELECT, DO NOT RUN EVERYTHING). Analyze the query: How complex is it? → Check the sources: Which ones can answer it? → Pick subagents: Only the ones it needs. 하단: A fixed path through all four wastes calls and adds noise.

### 26. `l60-10`

셋째: 지침
절차는 깨지기 쉽다
# Brief A: a procedure
# for the web search subagent
1. Search for "lamp broken".
2. Open the first five results.
3. Copy the star ratings.
취약함: 상위 다섯 결과는 광고일 수 있고, 진짜 패턴은 포럼에 있을 수 있습니다.

> 노트: 원문 제목: A procedure is fragile (THIRD: THE BRIEF). 지침(영문 유지) 의미: 지침 A - 웹 검색 서브에이전트를 위한 절차. 1. "lamp broken"을 검색한다. 2. 상위 다섯 결과를 연다. 3. 별점을 복사한다. 캡션: Fragile: the first five results may be adverts, and the real pattern may sit in a forum.

### 27. `l60-11`

셋째: 지침
목표는 좋은 결과가 무엇인지 말해 준다
# Brief B: a goal with quality criteria
# for the web search subagent
Goal: find out why customers return our lamps.
Quality criteria:
- Use sources from the last two years.
- Give each finding its source and its date.
- Prefer reports with numbers over single complaints.
- Say clearly what you could not find.
목표는 겨냥할 곳을, 기준은 품질을 정합니다. 단계는 서브에이전트가 고릅니다.

> 노트: 원문 제목: A goal says what good looks like (THIRD: THE BRIEF). 지침(영문 유지) 의미: 지침 B - 웹 검색 서브에이전트를 위한 품질 기준이 있는 목표. 목표: 고객이 왜 우리 램프를 반품하는지 알아낸다. 품질 기준: 최근 2년 이내의 출처를 쓴다. 각 조사 결과에 출처와 날짜를 붙인다. 단발성 불만보다 수치가 있는 보고서를 우선한다. 찾지 못한 것은 분명히 밝힌다. 캡션: The goal fixes the aim, the criteria fix the quality - the subagent chooses the steps.

### 28. `l60-12`

목표가 이기는 이유
목표가 있으면 서브에이전트가 적응한다
코디네이터
목표 지침을 보냄
웹 검색 서브에이전트
목표를 앎
새로운 단서
리뷰 다수: 한 모델의 느슨한 배선
시험의 정답
단계별 지침이 아니라 목표와 품질 기준

> 노트: 원문 제목: With a goal, the subagent adapts (WHY GOALS WIN). Coordinator (Sends the goal brief) → Web search subagent (Knows the goal) → New lead (Many reviews: loose wiring in one model). Exam answer: Goals and quality criteria, not step-by-step instructions.

### 29. `l60-13`

한 가지 더
에이전트가 많다고 항상 좋은 것은 아니다
에이전트마다 비용이 든다
에이전트마다 조율이 늘고, 핸드오프마다 정보를 잃을 수 있다.
필요할 때만 나눈다
부분마다 다른 기술이나 다른 출처가 필요할 때.
ShopAssist의 지원 채팅은 여전히 에이전트 하나로 동작합니다.

> 노트: 원문 제목: More agents are not always better (ONE MORE POINT). Every agent costs: Each agent adds coordination, and each handoff can lose information. / Split only when needed: The parts need different skills or different sources. 하단: ShopAssist's support chat still runs as one agent.

### 30. `l60-14`

정리
코디네이터를 가운데에 둔다
허브 앤 스포크
모든 메시지는 코디네이터를 거친다.
관찰 가능성, 일관된 오류 처리, 통제된 흐름
분해, 위임, 취합
질문마다 필요한 서브에이전트만 선택
단계가 아니라 목표와 품질 기준으로 지시

> 노트: 원문 제목: Keep the coordinator in the middle (RECAP). Hub and spoke: Every message goes through the coordinator. / Observability, consistent errors, controlled flow / Decompose, delegate, aggregate / Select only the subagents each question needs / Brief with a goal and quality criteria, not steps.

## 61강. 빈틈없이 리서치 나누기 (`l61`)

61강
빈틈없이 리서치 나누기
슬라이드 13장

> 노트: 원문: LECTURE 61 · Decomposing Research Without Gaps · 13 slides

### 32. `l61-01`

리서치 어시스턴트
보고서는 영역 전체를 놓칠 수 있다
웹 검색
공개 출처
종합
조사 결과를 결합
문서 분석
내부 문서
보고서
결과를 작성
코디네이터
계획하고 위임

> 노트: 원문 제목: A report can miss whole areas (THE RESEARCH ASSISTANT). Coordinator (Plans and delegates) ↔ Web search (Public sources), Synthesis (Combines findings), Document analysis (Internal documents), Report (Writes the result).

### 33. `l61-02`

상황
보고서가 램프 반품 이유 두 가지를 놓쳤다
질문
누락
[이미지: 태블릿을 든 관리자 일러스트]
팀
질문함
리서치 어시스턴트
모든 서브에이전트 성공
보고서
명확하고, 수치 포함
지원팀
더 많이 앎

> 노트: 원문 제목: The report missed two lamp reasons (THE SCENE). The team (Asks a question) → asks → Research assistant (All subagents succeed) → Report (Clear, with numbers). Support team (Knows more) - missing → Report.

### 34. `l61-03`

핵심 개념
에이전트가 아니라 분할을 점검한다
원인 찾기
보고서가 영역을 놓친 이유
주제 나누기
전체를 덮는 부분들
빈틈 점검
찾아서 채운다
모든 서브에이전트가 성공했는데도 빈틈이 남았다면, 코디네이터가 주제를 어떻게 나눴는지 봅니다.

> 노트: 원문 제목: Check the split, not the agents (THE KEY IDEA). Find the cause: Why the report missed areas → Split the topic: Parts that cover all of it → Check for gaps: Find them, then fill them. 하단: Every subagent succeeded and gaps remain? Look at how the coordinator split the topic.

### 35. `l61-04`

첫째, 원인
서브에이전트는 각자 맡은 일을 했다
코디네이터
질문을 나눔
운송 중 파손
배송
포장 품질
배송
택배사 불만
배송
서브에이전트
요청받은 대로 함

> 노트: 원문 제목: Each subagent did its job (FIRST, THE CAUSE). Coordinator (Splits the question) → Damage in transit / Packaging quality / Carrier complaints (all: Shipping) → Subagents (Did what they were asked).

### 36. `l61-05`

첫째, 원인
원인은 분해에 있다
코디네이터
분해가 너무 좁음
주어진 범위
배송만
웹 검색
쿼리는 제대로 작동
문서 분석
필터는 제대로 작동

> 노트: 원문 제목: The cause is the decomposition (FIRST, THE CAUSE). Coordinator (Decomposition too narrow) → Scope given (Shipping only) → Web search (Queries worked) / Document analysis (Filters worked).

### 37. `l61-06`

둘째, 분할
주제의 영역부터 나열한다
[이미지: 스탠드 램프 일러스트]
램프 반품
주제
배송 중 파손
제조 결함
느슨한 배선
사진과 다름
단순 변심

> 노트: 원문 제목: List the areas of the topic first (SECOND, THE SPLIT). Lamp returns (The topic) → Damaged in shipping / Manufacturing defect (Loose wiring) / Not like the photo / Changed mind.

### 38. `l61-07`

둘째, 분할
서브에이전트마다 자기 몫을 준다
코디네이터
각자의 범위를 줌
이유별로 나누기
이유마다 검색 작업 하나
출처 유형별로 나누기
출처마다 담당 하나
웹 검색
리뷰, 포럼
문서 분석
티켓, 보고서

> 노트: 원문 제목: Give each subagent its own part (SECOND, THE SPLIT). Coordinator (Gives each its scope) → Split by reason (One search task for each) / Split by source type (One owner per source) → Web search (Reviews, forums) / Document analysis (Tickets, reports).

### 39. `l61-08`

둘째, 분할
두 가지 질문으로 계획을 점검한다
겹침 없음
같은 불만을 두 번 세지 않는다.
빈틈 없음
부분을 합치면 전체를 덮는다.
모든 영역에 담당이 있는가? 담당이 둘인 영역은 없는가?

> 노트: 원문 제목: Check each plan with two questions (SECOND, THE SPLIT). No overlap: The same complaint is never counted twice. / No gaps: Together, the parts cover everything. 하단: Does every area have an owner? Does any area have two owners?

### 40. `l61-09`

셋째, 빈틈 점검
코디네이터가 빈틈을 점검한다
종합
코디네이터
계획
웹 검색
문서 분석
1. 결론
2. 영역 비교
3. 표적 쿼리
3. 티켓: 느슨한 배선
4. 기존 + 새 조사 결과
빈틈마다 표적 쿼리 하나, 그다음 종합을 다시 실행합니다.

> 노트: 원문 제목: The coordinator checks for gaps (THIRD, THE GAP CHECK). Synthesis → Coordinator: 1. Conclusions / Coordinator → Plan: 2. Compare areas / Coordinator → Web search: 3. Targeted query / Coordinator → Doc analysis: 3. Tickets: loose wiring / Coordinator → Synthesis: 4. Old + new findings. 캡션: One targeted query per gap, then synthesis runs again.

### 41. `l61-10`

셋째, 빈틈 점검
주제 전체가 아니라 빈틈을 묻는다
전부 다시 실행
끝난 작업을 반복하고, 호출과 시간을 쓴다.
표적 쿼리 하나
빈틈 하나를 지목하고, 그 빈틈만 묻는다.

> 노트: 원문 제목: Query the gap, not the whole topic (THIRD, THE GAP CHECK). Run it all again: Repeats finished work and costs calls and time. / One targeted query: Names one gap and asks only about that gap.

### 42. `l61-11`

셋째, 빈틈 점검
모든 영역에 출처가 생기면 멈춘다
두 번째 라운드
배선과 사진 관련 불만을 추가
세 번째 점검
새 빈틈 없음
보고서
보고서 서브에이전트가 작성
적용 범위가 충분하면 루프가 끝납니다. 라운드 한도는 안전망입니다.

> 노트: 원문 제목: Stop when every area has sources (THIRD, THE GAP CHECK). Second round: Adds wiring and photo complaints → Third check: No new gap found → Report: The report subagent writes it. 하단: The loop ends when coverage is enough. A limit on rounds is the safety net.

### 43. `l61-12`

복습
빈틈은 분해에서 시작된다
원인
하위 작업이 주제 전체를 덮지 못했다
해결
서브에이전트가 아니라 코디네이터에서 시작한다
분할
주제의 부분 또는 출처 유형별로, 각각 담당 하나

> 노트: 원문 제목: Gaps start in the decomposition (REVIEW). The cause: Subtasks never covered the whole topic / The fix: Starts at the coordinator, not the subagents / The split: By topic part or source type, one owner each.

### 44. `l61-13`

복습
보고서를 주제와 대조한다
계획과 비교
종합 후 빈틈을 찾음
표적 쿼리
검색과 분석 쪽으로
다시 종합
적용 범위가 충분할 때까지
완성돼 보이는 보고서도, 그것을 만든 계획이 아니라 주제 전체와 대조합니다.

> 노트: 원문 제목: Check the report against the topic (REVIEW). Compare with plan: Look for gaps after synthesis → Targeted queries: To search and analysis → Synthesis again: Until coverage is enough. 하단: Check a complete-looking report against the full topic, not against the plan that produced it.

## 62강. Task로 서브에이전트 생성하기 (`l62`)

62강
Task로 서브에이전트 생성하기
슬라이드 11장

> 노트: 원문: LECTURE 62 · Spawning Subagents with Task · 11 slides

### 46. `l62-01`

서브에이전트 생성
계획이 있어도 작업이 시작돼야 한다
주제 계획
모든 영역에 몫이 있음
서브에이전트 시작
오늘의 강의
보고서 기다리기
시작 방식에 달려 있음

> 노트: 원문 제목: A plan needs the work to start (SPAWNING SUBAGENTS). Plan the topic: Every area has its part → Start the helpers: Today's lesson → Wait for report: Depends on how they start.

### 47. `l62-02`

지금까지
모든 영역에 담당이 있다
[이미지: 스탠드 램프 일러스트]
램프 반품 질문
코디네이터
계획 준비됨
웹 검색
웹을 읽음
문서 분석
스토어 파일을 읽음
종합
조사 결과를 합침
보고서
보고서를 작성

> 노트: 원문 제목: Every area has an owner (WHERE WE ARE). Lamp returns question → Coordinator (Plan is ready) → Web search (Reads the web) / Document analysis (Reads store files) / Synthesis (Joins the findings) / Report (Writes the report).

### 48. `l62-03`

오늘의 세 가지
서브에이전트는 도구 호출로 시작된다
Task 도구
서브에이전트가 시작되는 방식
에이전트 정의
각 서브에이전트가 무엇인지
병렬 실행
여러 서브에이전트를 한 번에
코디네이터는 도구를 호출해 서브에이전트를 시작합니다.

> 노트: 원문 제목: A subagent starts with a tool call (THREE THINGS TODAY). The Task tool: How a subagent starts / Agent definitions: What each helper is / Parallel runs: Several helpers at once. 하단: The coordinator starts a subagent by calling a tool.

### 49. `l62-04`

첫째: Task 도구
서브에이전트는 도구처럼 보인다
코디네이터
SDK
서브에이전트
자체 도구
Task: agent + prompt
자기 프롬프트로 시작
자체 루프
결과
최종 답
도구 결과
lookup_order와 같은 방식으로 요청하고, 답은 도구 결과로 돌아옵니다.

> 노트: 원문 제목: A subagent looks like a tool (FIRST: THE TASK TOOL). Coordinator → SDK: Task: agent + prompt / SDK → Subagent: start with its prompt / Subagent → Its own tools: own loop / tools → Subagent: results / Subagent → SDK: final answer / SDK → Coordinator: tool result. 캡션: Asked for in the same way as lookup_order - the answer comes back as a tool result.

### 50. `l62-05`

허용 도구
코디네이터에게는 Task 허용이 필요하다
# Exam: "Task". Current SDK releases: "Agent".
MODEL = "claude-sonnet-5-5"
coordinator = ClaudeAgentOptions(
    model=MODEL,
    system_prompt="You coordinate research on lamp returns.",
    allowed_tools=["Task"],
)
allowed_tools에 Task가 없으면, 코디네이터는 계획은 세워도 서브에이전트를 시작할 수 없습니다.

> 노트: 원문 제목: The coordinator needs Task allowed (ALLOWED TOOLS). 코드(영문 유지) 의미: 주석 - 시험에서는 "Task", 현재 SDK 릴리스에서는 "Agent". 코디네이터 옵션: 모델, 시스템 프롬프트 "램프 반품에 관한 리서치를 조율한다", 허용 도구 Task. 캡션: Without Task in allowed_tools, the coordinator can plan but cannot start a subagent. (코드 속 모델명과 API 이름은 원문 그대로이며 검증하지 않음)

### 51. `l62-06`

둘째: 에이전트 정의
서브에이전트마다 정의가 있다
agents = {
    "document-analysis": AgentDefinition(
        description="Reads the store's tickets and supplier reports. "
                    "Use it for facts from the store's own files.",
        prompt="Read the support tickets and supplier reports. "
               "Give every finding its source and its date.",
        tools=["Read", "Grep"],
    ),
}
description, prompt, tools: 에이전트 정의 하나를 이루는 세 부분입니다.

> 노트: 원문 제목: Each helper has a definition (SECOND: AGENT DEFINITIONS). 코드(영문 유지) 의미: document-analysis 에이전트 정의. description - 스토어의 티켓과 공급업체 보고서를 읽는다. 스토어 자체 파일의 사실이 필요할 때 쓴다. prompt - 지원 티켓과 공급업체 보고서를 읽어라. 모든 조사 결과에 출처와 날짜를 붙여라. tools - Read, Grep. 캡션: Description, prompt and tools: three parts of one agent definition.

### 52. `l62-07`

에이전트 정의
필수 필드는 두 개다
필수
description과 prompt
선택
tools와 model
서브에이전트마다 정의 하나, 모두 하나의 도구로 시작합니다.

> 노트: 원문 제목: Two fields are required (AGENT DEFINITION). Required: description and prompt / Optional: tools and model. 하단: One definition per helper - all started through one tool.

### 53. `l62-08`

셋째: 병렬 서브에이전트
독립적인 서브에이전트는 함께 실행된다
코디네이터
웹 검색
문서 분석
Task: web search
Task: document analysis
웹 조사 결과
문서 조사 결과
한 응답 안의 Task 호출 두 개: 두 서브에이전트가 동시에 실행됩니다.

> 노트: 원문 제목: Independent helpers run together (THIRD: PARALLEL SUBAGENTS). Coordinator → Web search: Task: web search / Coordinator → Document analysis: Task: document analysis / Web search → Coordinator: web findings / Document analysis → Coordinator: document findings. 캡션: Two Task calls in one response: both subagents run at the same time.

### 54. `l62-09`

느린 방식
턴을 나누면 기다림이 쌓인다
코디네이터
웹 검색
문서 분석
Task: web search
몇 분 뒤 결과
Task: document analysis
몇 분 뒤 결과
독립적인 서브에이전트는 한 턴에 하나씩이 아니라 하나의 응답 안에 둡니다.

> 노트: 원문 제목: Separate turns add up the waiting (THE SLOW WAY). Coordinator → Web search: Task: web search / Web search → Coordinator: result after minutes / Coordinator → Document analysis: Task: document analysis / Document analysis → Coordinator: result after minutes. 캡션: Independent subagents belong in a single response, not one turn at a time.

### 55. `l62-10`

병렬로 실행할 수 있는 것
의존하는 작업은 차례를 기다린다
웹 검색
1번째 턴, 병렬
문서 분석
1번째 턴, 병렬
종합
이후 턴, 둘 다 필요
보고서
이후 턴, 종합 필요
독립적인 작업은 병렬로 실행합니다. 앞선 결과가 필요한 작업은 기다립니다.

> 노트: 원문 제목: Dependent work waits its turn (WHAT CAN RUN IN PARALLEL). Web search (Turn 1 - in parallel) + Document analysis (Turn 1 - in parallel) → Synthesis (Later turn - needs both) → Report (Later turn - needs synthesis). 하단: Independent work runs in parallel. Work that needs earlier results waits.

### 56. `l62-11`

복습
정의하고, 허용하고, 함께 시작한다
레시피
서브에이전트마다 한 번 정의하고, 코디네이터에게 Task를 주고, 독립적인 서브에이전트를 함께 시작한다.
Task가 서브에이전트를 시작 (현재 SDK에서는 Agent)
허용 도구에 Task가 반드시 포함
서브에이전트마다: description, prompt, tools
한 응답이면 병렬, 별도 턴이면 하나씩

> 노트: 원문 제목: Define, allow, then start together (REVIEW). The recipe: Define each helper once, give the coordinator Task, start independent helpers together. / Task starts a subagent (Agent in current SDKs) / Allowed tools must include Task / Each helper: description, prompt, tools / One response runs in parallel; separate turns run one by one.

## 63강. 에이전트별 도구 범위 정하기 (`l63`)

63강
에이전트별 도구 범위 정하기
슬라이드 12장

> 노트: 원문: LECTURE 63 · Scoping Each Agent's Tools · 12 slides

### 58. `l63-01`

지난 시간에 멈춘 곳
아직 열려 있는 필드 하나: tools
web_search = AgentDefinition(
    description="Finds sources on the web",
    prompt="You search the web and report sources.",
    tools=...,  # left open until now
)
synthesis = AgentDefinition(
    description="Combines the findings it receives",
    prompt="You combine findings into one answer.",
    tools=...,  # left open until now
)
도구가 잘못되면 잘못 고르고, 다른 에이전트의 몫인 일까지 하게 됩니다.

> 노트: 원문 제목: One field is still open: tools (WHERE WE STOPPED). 코드(영문 유지) 의미: web_search 정의(웹에서 출처를 찾음 / 웹을 검색하고 출처를 보고하라)와 synthesis 정의(받은 조사 결과를 결합함 / 조사 결과를 하나의 답으로 합쳐라). 두 정의 모두 tools는 지금까지 비워 둠. 캡션: The wrong tools mean bad picks - and work that belongs to another agent.

### 59. `l63-02`

상황
모든 에이전트가 모든 도구를 가졌다
[이미지: 태블릿을 든 관리자 일러스트]
스토어 관리자
램프는 왜 반품될까?
코디네이터
리서치 어시스턴트
웹 검색
도구 18개
문서 분석
도구 18개
종합
도구 18개
보고서
도구 18개

> 노트: 원문 제목: Every agent had every tool (THE SCENE). Store manager (Why are lamps returned?) → Coordinator (Research assistant) → Web search / Document analysis / Synthesis / Report (18 tools each).

### 60. `l63-03`

규칙
역할에 필요한 도구만, 그 이상은 없다
규칙 하나
각 에이전트는 자기 역할에 필요한 도구만 받는다.
1. 도구를 몇 개, 어떤 것을
2. 범용 도구 대신 좁은 도구
3. 역할을 넘나드는 작은 도구 하나

> 노트: 원문 제목: Tools for the role, nothing more (THE RULE). One rule: Each agent gets only the tools its role needs. / 1. How many tools, and which ones / 2. Narrow tools instead of general ones / 3. One small tool that crosses roles.

### 61. `l63-04`

첫째: 몇 개인가
남는 도구는 혼란을 주고 유혹한다
종합 서브에이전트
모든 도구 설명을 읽음
search_web
출처를 찾음
read_tickets
지원 티켓
write_report
보고서를 작성
search_news
역시 출처를 찾음
+14개 도구
다수가 비슷해 보임

> 노트: 원문 제목: Spare tools confuse and tempt (FIRST: HOW MANY). Synthesis subagent (Reads every tool description) → search_web (Finds sources) / read_tickets (Support tickets) / write_report (Writes the report) / search_news (Also finds sources) / +14 more tools (Many look alike).

### 62. `l63-05`

범위가 정해진 목록
에이전트 넷, 짧은 목록 넷
코디네이터
서브에이전트를 시작
웹 검색
search_web, load_document
문서 분석
read_tickets, read_reports
종합
검색 도구는 전혀 없음
보고서
write_report

> 노트: 원문 제목: Four agents, four short lists (SCOPED LISTS). Coordinator (Starts the subagents) → Web search (search_web, load_document) / Document analysis (read_tickets, read_reports) / Synthesis (No search tools at all) / Report (write_report).

### 63. `l63-06`

둘째: 좁은 도구
범용 도구는 어떤 페이지든 연다
웹 검색 서브에이전트
출처 문서가 필요함
fetch_url
아무 주소나 내려받음
load_document
실제 문서만
임의의 페이지
쇼핑 페이지
램프 내용 없음

> 노트: 원문 제목: A general tool opens any page (SECOND: NARROW TOOLS). Web search subagent (Needs source documents) → fetch_url (Downloads any address) → Random page / Shopping page / No lamp content. → load_document (Real documents only).

### 64. `l63-07`

제약이 있는 도구
좁은 도구는 호출마다 확인한다
ALLOWED_HOSTS = {"reports.supplier.example", "reviews.example"}
def load_document(url: str) -> str:
    host = urlparse(url).hostname
    if host not in ALLOWED_HOSTS:
        # the check lives inside the tool
        raise ValueError("Not a real document address")
    return download(url)
무엇이든 할 수 있는 도구보다, 올바른 일만 할 수 있는 도구를 택합니다.

> 노트: 원문 제목: A narrow tool checks every call (A CONSTRAINED TOOL). 코드(영문 유지) 의미: 허용 호스트 목록을 두고, load_document는 URL의 호스트가 목록에 없으면 "실제 문서 주소가 아님" 오류를 낸다(확인은 도구 안에 있음). 통과하면 내려받는다. 캡션: Prefer a tool that can only do the right thing over a tool that can do anything.

### 65. `l63-08`

셋째: 역할 넘나들기
작은 사실 하나가 긴 우회를 부른다
종합
코디네이터
웹 검색
보고서 날짜가 필요
웹 검색 시작
날짜
종합을 다시 시작
가정: 왕복 2~3회 추가, 40% 더 걸림. 그리고 확인 100건 중 85건은 날짜, 이름, 숫자 하나뿐입니다.

> 노트: 원문 제목: A small fact costs a long detour (THIRD: CROSSING ROLES). Synthesis → Coordinator: needs a report date / Coordinator → Web search: start web search / Web search → Coordinator: the date / Coordinator → Synthesis: start synthesis again. 캡션: Assumed: 2-3 extra round trips, 40% longer. And 85 of 100 checks are only a date, a name or a number.

### 66. `l63-09`

셋째: 역할 넘나들기
범위가 정해진 도구 하나로 해결한다
코디네이터
허브
종합
조사 결과를 결합
verify_fact
주장을 넣으면 판정이 나옴
웹 검색
복잡한 확인

> 노트: 원문 제목: One scoped tool fixes it (THIRD: CROSSING ROLES). Coordinator (The hub) → Synthesis (Combines findings) / Web search (Complex checks). Synthesis → verify_fact (Claim in, verdict out).

### 67. `l63-10`

한 가지 더
도구 목록은 순서가 아니라 범위를 정한다
도구 목록이 통제하는 것
에이전트가 어떤 도구에 닿을 수 있는지.
통제하지 않는 것
단계의 순서.
SDK는 이 목록을 코드로 강제합니다. 에이전트는 받지 않은 도구를 호출할 수 없습니다.

> 노트: 원문 제목: A tool list sets reach, not order (ONE MORE POINT). A tool list controls: Which tools an agent can reach. / It does not control: The order of the steps. 하단: The SDK enforces the list in code: an agent cannot call a tool it was never given.

### 68. `l63-11`

핵심 포인트
정리: 도구 범위를 역할에 맞춘다
역할마다 도구 4~5개
시스템의 모든 도구가 아님
도구는 적게
너무 많으면 선택이 덜 안정적
역할 안에 머물기
남는 도구는 오용된다

> 노트: 원문 제목: Recap: scope tools to the role (MAIN POINTS). 4-5 tools per role: Not every tool in the system / Fewer tools: Too many make selection less reliable / Stay in role: Spare tools get misused.

### 69. `l63-12`

핵심 포인트
범용 도구보다 좁은 도구
제약이 있는 도구
fetch_url이 아니라 load_document
verify_fact
자주 필요한 단순 확인을 위한 좁은 도구 하나
코디네이터 경유
복잡한 경우는 코디네이터를 거친다
에이전트가 자기 일이 아닌 일을 한다면, 먼저 도구 목록을 봅니다.

> 노트: 원문 제목: Prefer narrow tools over general (MAIN POINTS). Constrained tools: load_document, not fetch_url / verify_fact: One narrow tool for frequent, simple needs / Via coordinator: Complex cases go through it. 하단: An agent doing work that is not its job? Look at its tool list first.

## 64강. 에이전트 간 컨텍스트 전달 (`l64`)

64강
에이전트 간 컨텍스트 전달
슬라이드 14장

> 노트: 원문: LECTURE 64 · Passing Context Between Agents · 14 slides

### 71. `l64-01`

서브에이전트가 듣는 것
빠진 사실은 계속 빠져 있다
prompt
코디네이터
작업 전체를 앎
서브에이전트
자기 프롬프트만 앎
프롬프트에서 빠진 사실은 쓸 수 없습니다.

> 노트: 원문 제목: A missing fact stays missing (WHAT A SUBAGENT IS TOLD). Coordinator (Knows the whole task) → prompt → Subagent (Knows only its prompt). 하단: A fact missing from the prompt cannot be used.

### 72. `l64-02`

상황
종합 결과가 모호하게 돌아온다
코디네이터
검색 + 문서
종합 에이전트
“램프는 왜 반품될까?”
두 결과
Task: 조사 결과를 결합
배송 중 파손, 품질 문제
숫자도, 출처도, 날짜도 없습니다. 램프에 관한 어떤 기사라도 같은 말을 할 수 있습니다.

> 노트: 원문 제목: Synthesis returns vague answers (THE SCENE). Coordinator → Web search + documents: why are lamps returned? / → Coordinator: both results / Coordinator → Synthesis subagent: Task: combine the findings / → Coordinator: damaged in shipping, quality problems. 캡션: No numbers, no sources, no dates - any article about lamps could say the same.

### 73. `l64-03`

살펴볼 세 가지
서브에이전트는 빈 상태로 시작한다
빈 시작
기록도 기억도 없음
넘길 것
모든 조사 결과와 목표
형식
구조화되고 작게
서브에이전트는 코디네이터가 프롬프트에 쓴 것만 압니다.

> 노트: 원문 제목: A subagent starts empty (THREE THINGS TO LOOK AT). The empty start: No history, no memory / What to pass: All findings, plus the goal / The form: Structured and small. 하단: It knows only what the coordinator writes into its prompt.

### 74. `l64-04`

첫째, 빈 시작
대화 내용을 전혀 보지 못한다
팀의 질문
램프는 왜 반품될까?
코디네이터의 계획
어떤 에이전트를 실행할지
이전 결과 두 개
검색과 문서
종합 서브에이전트
자체 격리 컨텍스트: 이 중 아무것도 보지 못함

> 노트: 원문 제목: It sees none of the conversation (FIRST, THE EMPTY START). Team question (Why are lamps returned?) / Coordinator's plan (Which agents to run) / Two earlier results (Search and documents). Synthesis subagent (Own isolated context: sees none of it).

### 75. `l64-05`

공유 메모리 없음
실행할 때마다 아무것도 없이 시작한다
코디네이터
종합, 1회차
종합, 2회차
조사 결과를 결합
결론
빈틈 발견: 조사 결과를 결합
그럴듯해 보이는 것
2회차는 1회차를 기억하지 못합니다. “그 조사 결과”가 가리키는 것을 받은 적이 없습니다.

> 노트: 원문 제목: Each run starts from nothing (NO SHARED MEMORY). Coordinator → Synthesis, run 1: combine the findings / run 1 → Coordinator: conclusions / Coordinator → Synthesis, run 2: gap found: combine the findings / run 2 → Coordinator: what sounds likely. 캡션: Run 2 does not remember run 1: "the findings" point to nothing it received.

### 76. `l64-06`

둘째, 넘길 것
모든 조사 결과를 프롬프트에 복사한다
prompt = f"""Web search findings (all of them):
{web_findings}
Document analysis findings (all of them):
{doc_findings}
Earlier conclusions (second run only):
{earlier_conclusions}
Goal: why are lamps returned so often?
A good answer: three conclusions, each with a source."""
코디네이터가 종합 프롬프트를 만드는 한 가지 방법: 모든 조사 결과를 빠짐없이 넣고, 그다음 목표를 씁니다.

> 노트: 원문 제목: Copy every finding into the prompt (SECOND, WHAT TO PASS). 코드(영문 유지) 의미: 웹 검색 조사 결과(전부), 문서 분석 조사 결과(전부), 이전 결론(2회차에만)을 넣고, 목표 "램프는 왜 그렇게 자주 반품되는가?"와 좋은 답의 기준 "결론 세 개, 각각 출처 포함"을 쓴다. 캡션: One way a coordinator builds the synthesis prompt: every finding in full, then the goal.

### 77. `l64-07`

새로운 문제
문단은 이름과 연도를 잃는다
조사 결과
문단: 주장, 인용, 보고서, 연도
종합
결론으로 다시 씀
결론 하나
한 램프 모델의 고장률이 두 배
출처? 시점?
아무도 알 수 없음

> 노트: 원문 제목: Paragraphs lose names and years (A NEW PROBLEM). Findings (Paragraphs: claim, quote, report, year) → Synthesis (Rewrites them as conclusions) → One conclusion (A lamp model fails twice as often) ⇢ Source? Age? (Nobody can tell).

### 78. `l64-08`

셋째, 형식
조사 결과는 구조화된 레코드가 된다
{
  "content": {"claim": "Model L-200 fails twice as often",
              "evidence": "8 returns per 100 sold, others 4"},
  "metadata": {
    "source": "returns-report.pdf, page 14",
    "date": "2026-03-01",
    "method": "count of 400 support tickets"
  }
}
구조화된 레코드로 만든 조사 결과 하나: 내용과 메타데이터를 분리합니다.

> 노트: 원문 제목: Findings become structured records (THIRD, THE FORM). JSON(영문 유지) 의미: content - 주장 "L-200 모델은 고장이 두 배 잦다", 근거 "판매 100개당 반품 8건, 다른 모델은 4건". metadata - 출처 returns-report.pdf 14쪽, 날짜 2026-03-01, 방법 "지원 티켓 400건 집계". 캡션: One finding as a structured record: content apart from metadata.

### 79. `l64-09`

분리하는 이유
메타데이터는 자기 필드에 남는다
내용
주장과 근거
종합
표현을 다시 씀
결론
주장과 그 메타데이터
메타데이터
출처, 페이지, 날짜, 방법

> 노트: 원문 제목: Metadata stays in its own fields (WHY KEEP THEM APART). Content (Claim and evidence) → Synthesis (Rewrites the wording) → Conclusion (Claim plus its metadata). Metadata (Source, page, date, method) ⇢ Conclusion.

### 80. `l64-10`

상류에서 시작
상류 에이전트가 메타데이터를 붙여야 한다
FINDING_SCHEMA = {
    "type": "object",
    "properties": {
        "claim": {"type": "string"},
        "evidence": {"type": "string"},
        "source": {"type": "string"},
        "date": {"type": "string"},
        "method": {"type": "string"},
    },
    "required": ["claim", "evidence", "source", "date", "method"],
}
상류의 모든 조사 결과가 메타데이터를 갖게 하는 한 가지 방법: 메타데이터가 없는 조사 결과는 불완전합니다.

> 노트: 원문 제목: Upstream agents must add metadata (START UPSTREAM). 코드(영문 유지) 의미: 조사 결과 스키마 - claim, evidence, source, date, method를 모두 문자열 필드로 두고 다섯 개 모두 필수로 지정한다. 캡션: One way to make every upstream finding carry its metadata: a finding without them is incomplete.

### 81. `l64-11`

크기 문제
기사 전문이 예산을 넘치게 한다
“먼저 램프 불만을 검색했고, 그다음 포럼을 열었고…”
웹 검색
기사 전문, 수천 단어
종합
제한된 컨텍스트 예산, 모든 출처를 한 번에

> 노트: 원문 제목: Whole articles flood the budget (A SIZE PROBLEM). 부제: "First I searched for lamp complaints, then I opened a forum..." Web search (Whole articles, thousands of words) → Synthesis (Limited context budget, all sources at once).

### 82. `l64-12`

해결책
추론 과정이 아니라 핵심 사실을 돌려준다
웹 검색
claim, source, score 0.9
문서 분석
claim, page, score 0.8
종합
예산을 사실에 씀
안전하려고 페이지 전체를 넘기지 않습니다.

> 노트: 원문 제목: Return key facts, not reasoning (THE FIX). Web search (claim, source, score 0.9) + Document analysis (claim, page, score 0.8) → Synthesis (Budget spent on facts). 하단: Do not pass whole pages just to be safe.

### 83. `l64-13`

기억할 것
빈 상태로 시작하니, 전부 넘긴다
서브에이전트는 빈 상태로 시작
코디네이터 기록도, 이전 실행의 기억도 없다.
프롬프트가 모든 것을 나른다
이전 에이전트의 조사 결과 전체를 복사해 넣는다.

> 노트: 원문 제목: Start empty, so pass everything (WHAT TO REMEMBER). A subagent starts empty: No coordinator history, no memory of earlier runs. / The prompt carries it all: Complete findings from earlier agents, copied in.

### 84. `l64-14`

기억할 것
레코드로 넘기고, 작게 유지한다
구조화된 레코드
내용과 메타데이터를 분리
메타데이터 필드 넷
출처, 페이지, 날짜, 방법
상류에서 핵심 사실만
긴 글이 아니라 인용과 점수
모든 서브에이전트 프롬프트는 읽는 쪽이 아무것도 모른다고 가정하고 씁니다.

> 노트: 원문 제목: Pass records, keep them small (WHAT TO REMEMBER). Structured record: Content apart from metadata / Four metadata fields: Source, page, date, method / Key facts upstream: Citations and scores, not long text. 하단: Write every subagent prompt as if the reader knows nothing.

## 66강. 에이전트 간 실패 처리 (`l66`)

66강
에이전트 간 실패 처리
슬라이드 12장

> 노트: 원문: LECTURE 66 · Failure Handling Across Agents · 12 slides

### 86. `l66-01`

실패가 중요한 이유
실패 하나는 영역 하나를 잃는다
코디네이터
서브에이전트를 시작
웹 검색
서브에이전트
문서 분석
서브에이전트 - 실패할 수 있음
최종 보고서
최대 한 영역을 잃음

> 노트: 원문 제목: One failure costs one area (WHY FAILURES MATTER). Coordinator (Starts the subagents) → Web search (Subagent) / Document analysis (Subagent - may fail) → Final report (Loses one area at most).

### 87. `l66-02`

예시
아카이브가 응답을 멈춘다
읽음
코디네이터
램프는 왜 반품될까?
웹 검색
웹을 검색
문서 분석
티켓, 공급업체 보고서
[이미지: 서버와 데이터 상자 일러스트]
아카이브 서비스
공급업체 보고서

> 노트: 원문 제목: The archive stops answering (THE EXAMPLE). Coordinator (Why are lamps returned?) → Web search (Searches the web) / Document analysis (Tickets, supplier reports) → reads → Archive service (Supplier reports).

### 88. `l66-03`

코디네이터의 결정
서브에이전트가 고치고, 그다음 보고한다
검색 재시도
다른 쿼리로 다시 시도
다른 출처 시도
같은 사실을 다른 곳에서 찾기
없이 진행
이미 가진 것을 사용
서브에이전트는 고칠 수 있는 것은 고치고, 나머지는 선택에 충분한 세부 정보와 함께 보고합니다.

> 노트: 원문 제목: The subagent fixes, then reports (THE COORDINATOR'S DECISION). Retry the search: Try again with a different query / Try another source: Look for the same facts elsewhere / Go on without it: Use what it already has. 하단: The subagent fixes what it can, then reports the rest with enough detail to choose.

### 89. `l66-04`

첫째: 국소 복구
작은 실패는 그 자리에서 고친다
코디네이터
서브에이전트
아카이브
공급업체 보고서 검색
시간 초과
잠시 후 재시도
보고서
고칠 수 없는 오류만
일시적인 시간 초과는 한두 번 재시도합니다. 코디네이터는 이것을 볼 필요가 없습니다.

> 노트: 원문 제목: Fix small failures locally (FIRST: LOCAL RECOVERY). Subagent → Archive: search supplier reports / Archive → Subagent: timeout / Subagent → Archive: retry after a short wait / Archive → Subagent: reports / Subagent → Coordinator: only an error it cannot fix. 캡션: A temporary timeout is retried once or twice - the coordinator never has to see it.

### 90. `l66-05`

둘째: 실패 보고
모호한 상태는 모든 것을 숨긴다
서브에이전트
아카이브가 여전히 다운
코디네이터
추측만 가능
어떤 검색이 실패했나?
찾은 것이 있었나?
다른 방법이 있나?

> 노트: 원문 제목: A vague status hides everything (SECOND: THE FAILURE REPORT). Subagent (Archive is still down) → Coordinator (Can only guess) ⇢ Which search failed? / Was anything found? / Is there another way?

### 91. `l66-06`

구조화된 오류 컨텍스트
필드 네 개가 쓸모 있는 보고를 만든다
{
  "failure_type": "timeout, supplier archive, after 2 retries",
  "query": "supplier reports about lamp defects, last 2 years",
  "partial_results": [
    "2 of 5 supplier reports loaded",
    "support tickets about loose wiring read"
  ],
  "alternatives": ["retry the archive later", "web search: published reports"]
}
코디네이터가 선택할 수 있도록 실패를 보고하는 한 가지 방법입니다.

> 노트: 원문 제목: Four fields make a useful report (STRUCTURED ERROR CONTEXT). JSON(영문 유지) 의미: failure_type - 시간 초과, 공급업체 아카이브, 재시도 2회 후 / query - 최근 2년 램프 결함 관련 공급업체 보고서 / partial_results - 공급업체 보고서 5건 중 2건 로드, 느슨한 배선 관련 지원 티켓 읽음 / alternatives - 나중에 아카이브 재시도, 웹 검색: 공개 보고서. 캡션: One way to report a failure so the coordinator can choose.

### 92. `l66-07`

보고서를 손에 쥐면
보고가 있으면 결정할 수 있다
코디네이터
실패 보고서를 읽음
부분 결과 유지
보고서 5건 중 2건, 느슨한 배선 티켓
표적 웹 쿼리
공개된 공급업체 품질 보고서
빈틈 기록
공급업체 보고서 3건이 여전히 없음

> 노트: 원문 제목: With the report, it can decide (WITH THE REPORT IN HAND). Coordinator (Reads the failure report) → Keeps partial results (2 of 5 reports, loose-wiring tickets) / Targeted web query (Published supplier quality reports) / Notes the gap (3 supplier reports still missing).

### 93. `l66-08`

안티패턴 1
실패를 숨기면 오도한다
서브에이전트
시간 초과를 삼킴
코디네이터
믿음: 결함 없음, 재시도 없음
최종 보고서
보지 못한 데이터로 낸 결론

> 노트: 원문 제목: Hiding a failure misleads (ANTI-PATTERN 1). Subagent (Catches the timeout) → Coordinator (Believes: no defects, never retries) → Final report (Conclusion from data it never saw).

### 94. `l66-09`

안티패턴 2
전부 멈추면 작업이 낭비된다
timeout
웹 검색
완료
문서 분석
시간 초과
최상위 핸들러
실행 전체를 중단
실행 중단
끝난 작업이 사라짐
실패를 숨기는 것과 전부 멈추는 것은 모두 안티패턴입니다.

> 노트: 원문 제목: Stopping everything wastes work (ANTI-PATTERN 2). Web search (Finished) / Document analysis (Timed out) → timeout → Top-level handler (Stops the whole run) → Run stopped (Finished work lost). 하단: Hiding a failure and stopping everything are both anti-patterns.

### 95. `l66-10`

셋째: 최종 보고서
최종 보고서는 빈틈을 밝힌다
적용 범위 주석
종합 서브에이전트가 각 조사 결과가 얼마나 잘 뒷받침되는지 표시한다.
느슨한 배선: 충분히 뒷받침됨 - 티켓과 공급업체 보고서 2건이 일치
잘못된 제품 사진: 고객 리뷰가 뒷받침
작년 공급업체 결함률: 빈틈 - 아카이브를 쓸 수 없었음

> 노트: 원문 제목: The final report names its gaps (THIRD: THE FINAL REPORT). Coverage annotations: The synthesis subagent marks how well each finding is supported. / Loose wiring: well supported - tickets and 2 supplier reports agree / Wrong product photos: supported by customer reviews / Last year's supplier defect rates: gap - the archive was unavailable.

### 96. `l66-11`

정리
고치고, 보고하고, 절대 숨기지 않는다
국소 재시도
일시적인 실패는 서브에이전트 안에서
나머지는 보고
유형, 쿼리, 부분 결과, 대안
절대 숨기지 않기
모호한 상태도, 빈 성공도 없이
전부 멈추지 않기
좋은 작업을 버리면 안 된다

> 노트: 원문 제목: Fix it, report it, never hide it (RECAP). Retry locally: Temporary failures stay in the subagent / Report the rest: Type, query, partial results, alternatives / Never hide it: No vague status, no empty success / Never stop all: Good work must not be thrown away.

### 97. `l66-12`

적용 범위 주석
모르는 것은 드러내 말한다
충분히 뒷받침됨
여러 출처가 뒷받침하는 조사 결과. 믿어도 된다.
빈틈
출처를 쓸 수 없었다. 나중에 다시 묻는다.
작은 실패는 일어난 곳에서 고치고, 나머지는 빠짐없이 보고하며, 빈틈은 이름을 붙여 밝힙니다.

> 노트: 원문 제목: Say openly what you do not know (COVERAGE ANNOTATIONS). Well supported: Findings backed by several sources - trust them. / A gap: A source was not available - ask again later. 하단: Fix small failures where they happen, report the rest in full, name the gaps.

## 67강. 주장을 출처에 묶어 두기 (`l67`)

67강
주장을 출처에 묶어 두기
슬라이드 13장

> 노트: 원문: LECTURE 67 · Keeping Claims Tied to Sources · 13 slides

### 99. `l67-01`

이번 강의
모든 주장에는 출처가 필요하다
리서치 어시스턴트
질문에 답함
최종 보고서
실패와 빈틈을 밝힘
모든 주장
자기 출처에 묶임

> 노트: 원문 제목: Every claim needs its source (THIS LESSON). Research assistant (Answers the question) → Final report (Failures and gaps named) → Every claim (Tied to its source).

### 100. `l67-02`

상황
아무도 추적할 수 없는 주장
?
리서치 어시스턴트
램프는 왜 반품될까?
새 보고서
반품의 3분의 1: 느슨한 배선
출처
티켓 수도, 문서도, 페이지도 없음
[이미지: 태블릿을 든 관리자 일러스트]
팀
어디서 나온 말이지?

> 노트: 원문 제목: A claim nobody can trace (THE SCENE). Research assistant (Why are lamps returned?) → New report (A third of returns: loose wiring) → The team (Where does it come from?). New report ⇢ ? ⇢ Source (No ticket count, document or page).

### 101. `l67-03`

핵심 개념
주장과 출처는 함께 이동한다
어디서 사라지나
출처가 떨어져 나감
매핑
주장을 근거에 묶음
병합
합치되 출처는 유지
형식
보고서의 배치
주장과 출처는 하나의 레코드로 함께 이동합니다.

> 노트: 원문 제목: Claim and source travel together (THE KEY IDEA). Where it gets lost: The source drops out / The mapping: Claim tied to evidence / The merge: Combine, keep sources / The format: Layout of the report. 하단: A claim and its source travel together, as one record.

### 102. `l67-04`

출처가 사라지는 곳
종합 단계가 출처를 버린다
문서 분석
코디네이터
종합
조사 결과 + 출처
조사 결과들 + 출처들
문장 하나, 출처 없음
수백 개의 조사 결과를 요약하는 단계에서 출처가 떨어져 나갑니다.

> 노트: 원문 제목: Synthesis drops the sources (WHERE THE SOURCE GETS LOST). Document analysis → Coordinator: finding + source / Coordinator → Synthesis: findings + sources / Synthesis → Coordinator: one sentence, no sources. 캡션: Summarizing hundreds of findings is the step where sources fall away.

### 103. `l67-05`

출처가 사라지는 곳
요약은 문장만 남긴다
조사 결과 다섯 개
문서 5개, 페이지 5개
요약
이름과 페이지를 잘라 냄
보고서 안에서
주장은 남고, 연결은 사라짐

> 노트: 원문 제목: A summary keeps only the sentence (WHERE THE SOURCE GETS LOST). Five findings (Five documents, five pages) → Summary (Cuts names and pages) → In the report (Claim stays, link is gone).

### 104. `l67-06`

주장-출처 매핑
매핑은 네 부분으로 이뤄진다
주장
무엇이 사실인가
출처
웹 주소, 또는 문서와 페이지
발췌
그것을 뒷받침하는 정확한 문구
날짜
출처가 발행된 시점
작은 레코드 하나가 주장 하나를 그 근거에 묶습니다.

> 노트: 원문 제목: A mapping has four parts (THE CLAIM-SOURCE MAPPING). The claim: What is true / The source: Web address, or document and page / The excerpt: The exact words that support it / The date: When the source was published. 하단: One small record ties one claim to its evidence.

### 105. `l67-07`

주장-출처 매핑
발췌가 있어야 확인할 수 있다
{
  "claim": "About a third of lamp returns name loose wiring",
  "mappings": [
    {
      "source": "Support ticket report, p. 12",
      "excerpt": "Loose wiring: 412 of 1,236 lamp returns",
      "date": "2026-01-15"
    }
  ]
}
사람이 보고서 전체를 읽지 않고도 몇 초 만에 주장을 확인할 수 있습니다.

> 노트: 원문 제목: The excerpt makes it checkable (THE CLAIM-SOURCE MAPPING). JSON(영문 유지) 의미: 주장 "램프 반품의 약 3분의 1이 느슨한 배선을 이유로 든다". 매핑 - 출처: 지원 티켓 보고서 12쪽, 발췌: "느슨한 배선: 램프 반품 1,236건 중 412건", 날짜: 2026-01-15. 캡션: A person checks the claim in seconds, without reading the whole report.

### 106. `l67-08`

병합
주장은 합치고, 출처는 병합한다
지원 티켓
느슨한 배선 언급
[이미지: 연기가 나는 공장 일러스트]
공급업체 보고서
느슨한 배선 조사 결과
종합
결론 하나를 씀
결론
두 출처를 모두 지님

> 노트: 원문 제목: Combine claims, merge sources (THE MERGE). Support tickets (Loose wiring named) + Supplier report (Loose wiring found) → Synthesis (Writes one conclusion) → Conclusion (Carries both sources).

### 107. `l67-09`

병합
코드가 모든 출처를 확인한다
종합
우리 코드
보고서 에이전트
결론 + 출처
모든 출처가 실제임
확인 실패: 다시
매핑은 끝에 덧붙이지 않고, 처음부터 각 주장에 붙여 둡니다.

> 노트: 원문 제목: Code checks every source (THE MERGE). Synthesis → Our code: conclusions + sources / Our code → Report subagent: every source is real / Our code → Synthesis: a check fails: redo. 캡션: Keep the mapping on each claim from the start - not added at the end.

### 108. `l67-10`

보고서 형식
숫자는 표에 넣는다
종합
다양한 종류의 내용
표
램프 모델별, 월별 환불 비용

> 노트: 원문 제목: Numbers go in a table (THE REPORT FORMAT). Synthesis (Different kinds of content) → Table (Refund cost per lamp model, by month).

### 109. `l67-11`

보고서 형식
뉴스는 산문으로, 조사 결과는 목록으로
종합
종류마다 자기 형식 유지
산문
한 공급업체가 새 공장으로 이전
구조화된 목록
램프 모델, 고장 부품, 고장 방식

> 노트: 원문 제목: News in prose, findings in lists (THE REPORT FORMAT). Synthesis (Each kind keeps its format) → Prose (A supplier moved to a new factory) / Structured list (Lamp model, failing part, how it fails).

### 110. `l67-12`

정리
주장마다 뒤에 출처를 둔다
주장 + 출처
보고서까지 내내 하나의 레코드.
요약은 이름과 페이지부터 버린다
매핑: 주장, 출처, 발췌, 날짜
종합은 합친 주장의 출처를 병합한다
코드가 모든 출처가 실제인지 확인한다

> 노트: 원문 제목: Keep the source behind each claim (RECAP). Claim + source: One record, all the way to the report. / Summaries drop names and pages first / Mapping: claim, source, excerpt, date / Synthesis merges the sources of combined claims / Code checks every source is real.

### 111. `l67-13`

정리
출처는 주장과 함께 들어간다
내용 유형마다
자기 형식을 유지한다.
재무 데이터는 표로
뉴스는 산문으로
기술적 조사 결과는 목록으로

> 노트: 원문 제목: The source goes in with the claim (RECAP). Each content type: Keeps its own format. / Tables for financial data / Prose for news / Lists for technical findings.

## 68강. 출처가 서로 다를 때 (`l68`)

68강
출처가 서로 다를 때
슬라이드 13장

> 노트: 원문: LECTURE 68 · When Sources Disagree · 13 slides

### 113. `l68-01`

왜 중요한가
조용한 선택이 다른 숫자를 숨긴다
[이미지: 태블릿을 든 관리자 일러스트]
스토어 관리자
보고서를 읽음
리서치 어시스턴트
램프는 왜 반품될까?
리서치 보고서
모든 주장이 출처를 유지
질문

> 노트: 원문 제목: A quiet pick hides a second number (WHY IT MATTERS). Store manager (Reads the report) → asks → Research assistant (Why are lamps returned?) → Research report (Every claim keeps its source).

### 114. `l68-02`

상황
믿을 만한 출처 둘, 숫자 둘
[이미지: 연기가 나는 공장 일러스트]
공급업체 품질 보고서
100개 중 2개에 결함
지원 티켓
100개 중 6개가 결함으로 반품
문서 분석
같은 램프 모델, 작년
충돌
100개 중 2개 vs 6개

> 노트: 원문 제목: Two credible sources, two numbers (THE SCENE). Supplier quality report (2 in 100 had a defect) + Support tickets (6 in 100 came back defective) → Document analysis (Same lamp model, last year) → Conflict (2 vs 6 in 100).

### 115. `l68-03`

규칙과 계획
둘 다 남기고, 각각 출처를 붙인다
충돌 보고
분석이 충돌을 표시하는 방식
날짜 읽기
충돌인가, 추세인가?
최종 보고서
확립된 것과 이견이 있는 것
값을 임의로 고르지 않습니다. 두 값을 어떻게 맞출지는 코디네이터가 정합니다.

> 노트: 원문 제목: Keep both, each with its source (THE RULE AND THE PLAN). Report a conflict: How analysis flags it / Read the dates: Conflict or trend? / Final report: Settled vs contested. 하단: Never choose a value arbitrarily - the coordinator decides how both fit together.

### 116. `l68-04`

첫째, 분석
하나를 고르지도, 평균을 내지도 않는다
숫자 하나 고르기
더 최신이거나, 더 크거나, 더 공식적인 것. 다른 출처는 가려집니다.
평균 내기
100개 중 4개는 어느 출처도 보고한 적 없는 숫자입니다.
어느 쪽이든, 누가 살펴보기도 전에 충돌이 사라집니다.

> 노트: 원문 제목: Neither pick nor average (FIRST, THE ANALYSIS). Pick one number: The newer, the bigger or the more official one - the other source is hidden. / Average them: 4 in 100 is a number that no source ever reported. 하단: Either way, the conflict disappears before anyone can look at it.

### 117. `l68-05`

첫째, 분석
레코드는 두 값을 모두 담는다
{
  "claim": "lamp defect rate, last year",
  "conflict": true,
  "values": [
    { "value": "2 in 100", "source": "supplier report",
      "period": "last year", "method": "factory test" },
    { "value": "6 in 100", "source": "support tickets",
      "period": "last year", "method": "customer returns" }
  ]
}
충돌을 기록하는 한 가지 방법입니다. 이 레코드는 종합 단계로 바로 가지 않고 코디네이터에게 갑니다.

> 노트: 원문 제목: The record keeps both values (FIRST, THE ANALYSIS). JSON(영문 유지) 의미: 주장 "작년 램프 결함률", 충돌 true, 값 - ① 100개 중 2개, 출처: 공급업체 보고서, 기간: 작년, 방법: 공장 테스트 ② 100개 중 6개, 출처: 지원 티켓, 기간: 작년, 방법: 고객 반품. 캡션: One way to record a conflict - and it goes to the coordinator, not straight to synthesis.

### 118. `l68-06`

왜 다른가
각 숫자는 다른 것을 센다
공급업체 보고서
공장 테스트에서 불합격한 램프.
지원 티켓
고장으로 반품된 램프. 배송 중 느슨해진 배선도 포함.
두 숫자는 서로 다른 것을 측정합니다.

> 노트: 원문 제목: Each number counts something else (WHY THEY DIFFER). Supplier report: Lamps that fail its factory test. / Support tickets: Lamps returned as broken - including wiring loose in shipping. 하단: The two numbers measure different things.

### 119. `l68-07`

코디네이터
두 값 모두 종합 단계에 도달한다
문서 분석
코디네이터
종합
반품을 몇 건 확인했나?
답변
두 값 + 메모
차이가 설명되더라도 두 값은 각자의 출처와 함께 보고서에 남습니다.

> 노트: 원문 제목: Both values reach synthesis (THE COORDINATOR). Coordinator → Document analysis: How many returns were checked? / Document analysis → Coordinator: Answer / Coordinator → Synthesis: Both values + a note. 캡션: Even when the difference is explained, both values stay in the report, each with its source.

### 120. `l68-08`

둘째, 날짜
날짜가 다르면 추세다
2년 전 보고서
100개 중 8개에 결함
[이미지: 연기가 나는 공장 일러스트]
공급업체
지난봄 새 공장
작년 보고서
100개 중 2개에 결함

> 노트: 원문 제목: Different dates mean a trend (SECOND, THE DATES). Report, two years ago (8 in 100 had a defect) → Supplier (New factory last spring) → Report, last year (2 in 100 had a defect).

### 121. `l68-09`

둘째, 날짜
모든 조사 결과에는 날짜가 필요하다
{
  "properties": {
    "value": { "type": "string" },
    "source": { ... },
    "published": { ... },
    "collected": { ... }
  },
  "required": ["value", "source", "published", "collected"]
}
두 날짜가 없으면, 서로 다른 해의 숫자가 의견 불일치처럼 보입니다.

> 노트: 원문 제목: Every finding needs a date (SECOND, THE DATES). JSON 스키마(영문 유지) 의미: 속성 value(문자열), source, published(발행일), collected(수집일). 네 항목 모두 필수(required). 캡션: Without both dates, numbers from different years look like a disagreement.

### 122. `l68-10`

셋째, 보고서
확립된 것과 이견이 있는 것은 분리된다
최종 보고서
두 개의 별도 섹션
확립됨
느슨한 배선: 티켓과 공급업체가 일치
이견 있음
결함률: 100개 중 2개 vs 6개

> 노트: 원문 제목: Settled and contested stay apart (THIRD, THE REPORT). Final report (Two separate sections) → Well-established (Loose wiring: tickets and supplier agree) / Contested (Defect rate: 2 vs 6 in 100).

### 123. `l68-11`

이견 섹션 안에서
각 출처는 자기 표현을 유지한다
공급업체 보고서
"정상 범위 이내" - 적힌 그대로 인용. 방법: 완제품 램프의 공장 테스트.
지원 티켓
100개 중 6개가 반품됨. 방법: 고객 반품 건수 집계.
이 컨텍스트가 있으면 팀이 직접 숫자를 판단합니다. 보고서가 대신 판단하지 않습니다.

> 노트: 원문 제목: Each source keeps its own words (INSIDE THE CONTESTED SECTION). Supplier report: "Within the normal range" - quoted as written. Method: factory test of finished lamps. / Support tickets: 6 in 100 came back. Method: a count of customer returns. 하단: With this context the team judges the numbers itself - the report does not judge for them.

### 124. `l68-12`

정리
고르지 말고, 평균 내지 말 것
믿을 만한 두 출처가 다를 때
값 하나를 고르지 않습니다. 평균도 내지 않습니다.
분석은 두 값을 모두 담고, 충돌을 표시하고, 출처·기간·방법을 붙인다
코디네이터가 종합 전에 두 값을 조정한다
모든 조사 결과에 날짜를 붙여, 시간에 따른 변화를 추세로 읽는다

> 노트: 원문 제목: Never pick, never average (MAIN POINTS). Two credible sources disagree: Do not choose one value. Do not average them. / Analysis includes both values, marks the conflict, adds source, period and method / The coordinator reconciles them before synthesis / Every finding is dated, so change over time reads as a trend.

### 125. `l68-13`

정리
두 섹션, 각각 컨텍스트와 함께
확립됨
여러 독립 출처가 일치하는 조사 결과.
이견 있음
각 출처가 자기 표현과 방법을 유지.
출처가 서로 다르면 불일치를 그대로 보여 주고, 그 컨텍스트를 유지합니다.

> 노트: 원문 제목: Two sections, each with context (MAIN POINTS). Well-established: Findings that several independent sources agree on. / Contested: Each source keeps its own words and method. 하단: When sources disagree, show the disagreement and keep its context.

## 69강. 리서치 사례: 코디네이터의 판단 (`l69`)

69강
리서치 사례: 코디네이터의 판단
슬라이드 15장

> 노트: 원문: LECTURE 69 · Research Case: Coordinator Calls · 15 slides

### 127. `l69-01`

점검
코디네이터부터 본다
영역 누락
주제 전체가 다뤄지지 않음
출처 상실
문서를 읽을 수 없음
작업 이탈
에이전트가 남의 일을 함
시험의 리서치 시나리오는 각 실패가 어디서 시작되는지를 묻습니다.

> 노트: 원문 제목: Look at the coordinator first (CHECKPOINT). Misses areas: Whole topics never covered / Loses a source: A document cannot be read / Drifts off task: An agent does another's job. 하단: The exam's research scenario asks where each failure starts.

### 128. `l69-02`

리서치 시스템
모든 서브에이전트가 성공했다
[이미지: 노트북 앞에서 회의하는 두 사람 일러스트]
소프트웨어 팀
보고서를 요청
코디네이터
주제를 나눔
웹 검색
성공 - 기사를 찾음
문서 분석
성공 - 논문을 읽음
종합
성공 - 조사 결과를 합침
보고서 생성
성공 - 보고서를 씀

> 노트: 원문 제목: Every subagent succeeded (THE RESEARCH SYSTEM). Software team (Asks for a report) → Coordinator (Splits the topic) → Web search (Success - found articles) / Document analysis (Success - read the papers) / Synthesis (Success - combined findings) / Report generation (Success - wrote the report).

### 129. `l69-03`

첫 번째 증상
그런데 보고서는 한 영역만 다룬다
취약점
유일하게 다뤄진 영역
방치된 패키지
아무도 관리하지 않음
라이선스 위험
언급 없음
가짜 패키지
인기 이름을 베낌
원인을 바로잡는 첫 단계를 찾으세요.

> 노트: 원문 제목: Yet the report covers one area (THE FIRST SYMPTOM). 주제는 소프트웨어 패키지 위험. Vulnerabilities: The only area covered / Abandoned packages: Nobody maintains them / License risks: Not mentioned / Fake packages: Copy popular names. 하단: Look for the first step that fixes the cause.

### 130. `l69-04`

실패하는 해결책
결과를 늘려도 고쳐지지 않는다
코디네이터
시도한 해결책: 10개 대신 결과 50개
JavaScript 패키지
취약점
Python 패키지
취약점
점검 도구
패키지를 점검하는 도구
결과
취약점 기사만 더 늘어남

> 노트: 원문 제목: More results fix nothing (THE FIX THAT FAILS). Coordinator (Fix tried: 50 results, not 10) → JavaScript packages (Vulnerabilities) / Python packages (Vulnerabilities) / Checking tools (Tools that check packages) → Result (More vulnerability articles).

### 131. `l69-05`

최선의 조치
분할을 고친 뒤, 빈틈을 확인한다
코디네이터
검색과 문서
종합
영역마다 작업 하나
결론
질의: 빠진 영역
다시 실행
먼저 영역을 나열하고 영역마다 담당을 하나씩 둡니다. 종합 후에는 비교해서 모든 빈틈을 채웁니다.

> 노트: 원문 제목: Fix the split, then check gaps (THE BEST MOVE). Coordinator → Search and documents: one task per area / Synthesis → Coordinator: conclusions / Coordinator → Search and documents: query: missing area / Coordinator → Synthesis: run again. 캡션: List the areas first, one owner each. After synthesis, compare and fill every gap.

### 132. `l69-06`

두 가지 동작 방식
병렬 호출, 직접 핸드오프
코디네이터
웹 검색
문서 분석
종합
Task call 1
Task call 2
조사 결과
조사 결과
프롬프트에 조사 결과 전체
모든 서브에이전트가 성공했는데 영역이 빠졌다면, 코디네이터의 분할을 고칩니다.

> 노트: 원문 제목: Parallel calls, direct handoff (TWO MECHANICS). Coordinator → Web search: Task call 1 / Coordinator → Document analysis: Task call 2 (한 응답에서 병렬 호출) / 각각 findings 반환 / Coordinator → Synthesis: full findings in prompt (조사 결과 전체를 프롬프트에 직접 전달). 캡션: All subagents succeeded but areas are missing: fix the coordinator's split.

### 133. `l69-07`

두 번째 결정
핵심 출처를 읽을 수 없다
설문 PDF
손상된 파일
문서 분석
오류를 잡고 빈 결과를 반환
코디네이터
읽은 내용: 조사 결과 없음

> 노트: 원문 제목: A key source cannot be read (SECOND DECISION). Survey PDF (Corrupted file) → Document analysis (Error caught, returns empty) → Coordinator (Reads: no findings).

### 134. `l69-08`

두 번째 결정
빈 결과가 실패를 숨긴다
코디네이터
읽은 내용: 조사 결과 없음
종합
빠진 데이터가 사실이 됨
보고서
읽지 않은 파일에서 나온 결론

> 노트: 원문 제목: An empty result hides the failure (SECOND DECISION). Coordinator (Reads: no findings) → Synthesis (Missing data becomes a fact) → Report (Conclusion from an unread file).

### 135. `l69-09`

최선의 조치
한 번 재시도한 뒤, 빠짐없이 보고한다
{
  "failure": "corrupted_file",
  "retries": 1,
  "attempted": {"source": "maintenance-survey.pdf",
              "question": "who still maintains packages?"},
  "partial_results": "pages 1-12 read",
  "alternatives": ["publisher web version",
                  "last year's edition"]
}
손상된 파일을 재시도한 뒤, 실패를 컨텍스트와 함께 보고하는 한 가지 방법입니다.

> 노트: 원문 제목: Retry once, then report in full (THE BEST MOVE). JSON(영문 유지) 의미: 실패 유형 corrupted_file(손상된 파일), 재시도 1회, 시도한 것 - 출처 maintenance-survey.pdf, 질문 "누가 아직 패키지를 관리하나?", 부분 결과 "1~12쪽 읽음", 대안 - "출판사 웹 버전", "작년 판". 캡션: One way to retry a corrupted file, then report the failure with context.

### 136. `l69-10`

두 번째 결정
다음 할 일은 코디네이터가 고른다
문서 분석
코디네이터
웹 검색
종합
실패 컨텍스트
웹 버전 찾기
또는: 부분 결과
빈틈: 설문을 읽을 수 없음
실패한 곳에서 고칠 수 있는 것은 고치고, 나머지는 빈 결과가 아니라 빠짐없이 보고합니다.

> 노트: 원문 제목: The coordinator picks what next (SECOND DECISION). Document analysis → Coordinator: failure context / Coordinator → Web search: find the web version / Coordinator → Synthesis: or: partial results / Synthesis → Coordinator: gap: survey unreadable. 캡션: Fix what you can where it fails, then report the rest in full, never as empty.

### 137. `l69-11`

세 번째 결정
종합이 검색의 일을 하고 있다
종합
역할: 조사 결과를 합침
전체 웹 검색
혹시 몰라서 부여됨
계획 밖 결과
날짜도, 출처도 없음

> 노트: 원문 제목: Synthesis is doing search's job (THIRD DECISION). Synthesis (Role: combine findings) → Full web search (Given just in case) → Off-plan results (No dates, no sources).

### 138. `l69-12`

최선의 조치
요청만 하지 말고, 도구를 제한한다
search_agent = AgentDefinition(
    description="Finds articles on one area",
    prompt="Search the web for the assigned area.",
    tools=["WebSearch"],
)
synthesis = AgentDefinition(
    description="Combines findings into a report",
    prompt="Combine the findings you are given.",
    tools=[],
)
프롬프트 한 줄은 대부분의 경우 안내하는 데 그치고, 도구 목록은 제한합니다.

> 노트: 원문 제목: Restrict tools, don't just ask (THE BEST MOVE). 코드(영문 유지) 의미: search_agent - 설명 "한 영역의 기사를 찾는다", 프롬프트 "배정된 영역을 웹에서 검색하라", 도구 WebSearch만. synthesis - 설명 "조사 결과를 보고서로 합친다", 프롬프트 "받은 조사 결과를 합쳐라", 도구 없음([]). 캡션: A prompt line guides most of the time; a tool list restricts.

### 139. `l69-13`

세 번째 결정
간단한 확인에는 좁은 도구 하나
verify_fact
주장 하나, 출처 하나
종합
검색 도구 없음
코디네이터
복잡한 확인
웹 검색
전체 검증

> 노트: 원문 제목: One narrow tool for simple checks (THIRD DECISION). Synthesis (No search tools) → verify_fact (One claim, one source) / ⇢ Coordinator (Complex checks) → Web search (Full verification). 간단한 확인은 범위가 좁은 도구 verify_fact로, 복잡한 확인은 코디네이터를 거쳐 웹 검색으로.

### 140. `l69-14`

정리
세 가지 결정, 세 가지 해결책
영역 누락
분할을 고친 뒤, 빈틈을 반복해서 채움
출처를 읽을 수 없음
현장에서 재시도한 뒤, 네 부분으로 된 보고
작업 이탈
도구를 빼고, 범위가 좁은 도구 하나를 추가

> 노트: 원문 제목: Three decisions, three fixes (MAIN POINTS). Areas missing: Fix the split, then loop over the gaps / Source unreadable: Local retry, then a four-part report (실패 유형, 시도한 것, 부분 결과, 대안) / Agent off task: Remove tools, add one scoped tool.

### 141. `l69-15`

지원 시나리오
지원 사례에도 같은 규칙
[이미지: 고객 일러스트]
고객
메시지 하나에 문의 세 가지
ShopAssist
메시지를 나누지 않음
3개 중 1개만 답변
문의 두 가지를 건너뜀

> 노트: 원문 제목: Same rule in the support case (THE SUPPORT SCENARIO). Customer (One message, three concerns) → ShopAssist (Message never split) → 1 of 3 answered (Two concerns skipped).

## 70강. 리서치 사례: 출처 인용 (`l70`)

70강
리서치 사례: 출처 인용
슬라이드 13장

> 노트: 원문: LECTURE 70 · Research Case: Citing Sources · 13 slides

### 143. `l70-01`

리서치 사례: 점검 2
풀어야 할 출처 문제 두 가지
인용이 사라짐
주장이 출처 없이 보고서에 도달합니다.
수치가 서로 다름
믿을 만한 출처 둘, 숫자 둘.
출처가 없으면 아무도 보고서를 확인할 수 없고, 믿고 행동할 수도 없습니다.

> 노트: 원문 제목: Two source problems to solve (RESEARCH CASE: CHECKPOINT 2). Citations disappear: Claims reach the report with no source. / Figures disagree: Two credible sources, two numbers. 하단: Without sources, nobody can check a report - or safely act on it.

### 144. `l70-02`

첫 번째 증상
보고서에 출처가 없다
[이미지: 노트북 앞에서 회의하는 두 사람 일러스트]
소프트웨어 팀
보고서를 인용하고 싶음
위험 보고서
패키지의 3분의 1: 관리자 없음

> 노트: 원문 제목: The report gives no source (THE FIRST SYMPTOM). Software team (Wants to quote it) → Risk report (A third of packages: no maintainer). 팀은 이 수치를 인용하려 하지만 출처가 없습니다.

### 145. `l70-03`

출처가 사라지는 곳
종합 단계가 출처를 버린다
웹 검색
기사를 찾음
문서 분석
논문을 읽음
종합
조사 결과를 합침
보고서 생성
최종 텍스트를 씀
종합 단계는 문단을 줄입니다. 이름과 쪽 번호가 가장 먼저 잘립니다.

> 노트: 원문 제목: Synthesis drops the sources (WHERE THE SOURCES ARE LOST). Web search (Finds articles) → Document analysis (Reads papers) → Synthesis (Combines the findings) → Report generation (Writes the final text). 하단: Synthesis shortens paragraphs - names and page numbers are cut first.

### 146. `l70-04`

그럴듯해 보이는 두 해결책
솔깃한 두 해결책 모두 실패한다
프롬프트로 출처를 요청
보고서 생성 단계는 출처를 받은 적이 없어서, 추측하거나 지어냅니다.
기사 전문을 넘김
노이즈가 컨텍스트를 채우고, 요약은 여전히 링크를 버립니다.

> 노트: 원문 제목: Two tempting fixes both fail (TWO FIXES THAT LOOK REASONABLE). Ask for sources in the prompt: Report generation never got them: it guesses or invents one. / Pass the full articles: Noise fills the context, and summaries still drop the link.

### 147. `l70-05`

최선의 조치, 1부
조사 결과는 레코드로 돌아온다
{
  "claim": "A third of popular packages are unmaintained",
  "source": "https://example.org/open-source-study",
  "page": 14,
  "quote": "Nearly a third had no active maintainer",
  "date": "2025-03"
}
서브에이전트의 출력 스키마는 내용과 출처 정보를 별도 필드로 요구합니다.

> 노트: 원문 제목: Findings return as records (THE BEST MOVE, PART ONE). JSON(영문 유지) 의미: 주장 "인기 패키지의 3분의 1이 관리되지 않는다", 출처 https://example.org/open-source-study (예시 주소), 14쪽, 인용 "약 3분의 1에 활동 중인 관리자가 없었다", 날짜 2025-03. 캡션: A subagent's output schema requires content and source details as separate fields.

### 148. `l70-06`

최선의 조치, 2부
종합은 병합하고, 버리지 않는다
서브에이전트
종합
우리 코드
레코드 1: 주장 + 출처
레코드 2: 주장 + 출처
결론 하나, 레코드 둘 다
모든 결론에 출처가 있음
각 출처가 서브에이전트에서 왔음
규칙: 주장과 출처는 하나의 레코드로 함께 최종 보고서까지 갑니다.

> 노트: 원문 제목: Synthesis merges, never drops (THE BEST MOVE, PART TWO). Subagents → Synthesis: record 1: claim + source / record 2: claim + source / Synthesis → Our code: one conclusion, both records / Our code 확인: every conclusion has a source / each source came from a subagent. 캡션: Rule: a claim and its source travel together, as one record, to the final report.

### 149. `l70-07`

두 번째 결정
믿을 만한 두 출처가 서로 다르다
업계 설문
작년: 18%
대학 연구
작년: 31%
최종 보고서
31%만 보여 줌

> 노트: 원문 제목: Two credible sources disagree (SECOND DECISION). Industry survey (Last year: 18%) + University study (Last year: 31%) → Final report (Shows only 31%).

### 150. `l70-08`

그럴듯해 보이는 두 해결책
빈틈을 숨겨도 실패한다
더 최신 출처를 남김
다른 출처가 사라지고, 그런 출처가 있었다는 것조차 아무도 모릅니다.
값을 평균 냄
약 25%. 어느 출처도 보고한 적 없는 숫자입니다.

> 노트: 원문 제목: Hiding the gap fails too (TWO FIXES THAT LOOK REASONABLE). Keep the newer source: The other source disappears, and nobody knows it existed. / Average the values: About 25 percent - no source ever reported that number.

### 151. `l70-09`

최선의 조치는 문서 분석에서 시작
두 값을 남기고, 충돌을 표시한다
{
  "figure": "packages nobody maintains, last year",
  "conflict": true,
  "values": [
    { "value": "18%", "source": "industry survey",
      "method": "owners asked about their own packages" },
    { "value": "31%", "source": "university study",
      "method": "how often each package's code changed" }
  ]
}
예시 레코드 하나: 두 값, 충돌 표시, 각 출처와 그 방법.

> 노트: 원문 제목: Keep both values, flag conflict (THE BEST MOVE STARTS IN DOCUMENT ANALYSIS). JSON(영문 유지) 의미: 수치 "작년 아무도 관리하지 않는 패키지", 충돌 true, 값 - ① 18%, 출처: 업계 설문, 방법: 소유자에게 자기 패키지에 대해 물음 ② 31%, 출처: 대학 연구, 방법: 각 패키지 코드가 얼마나 자주 바뀌었는지. 캡션: One illustrative record: both values, the conflict flag, each source and its method.

### 152. `l70-10`

충돌은 어떻게 되나
이견 있는 조사 결과는 별도 섹션을 얻는다
문서 분석
코디네이터
종합
최종 보고서
두 값 + 충돌
둘 다 유지, 이견 있음
확립된 조사 결과
이견 있는 조사 결과
18%와 31%, 두 출처 모두
각 출처는 자기 표현과 방법을 유지합니다.

> 노트: 원문 제목: Contested findings get a section (WHAT HAPPENS TO THE CONFLICT). Document analysis → Coordinator: both values + conflict / Coordinator → Synthesis: keep both, contested / Synthesis → Final report: established findings / contested findings / 18% and 31%, both sources. 캡션: Each source keeps its own wording and its method.

### 153. `l70-11`

다른 한 쌍
날짜가 다르면 추세가 보인다
3년 전
설문: 12%
작년
설문: 18%
추세
관리되지 않는 비율이 늘고 있음
같은 기간이면 두 값을 모두 남기고, 기간이 다르면 추세로 읽습니다.

> 노트: 원문 제목: Different dates show a trend (A DIFFERENT PAIR). Three years ago (Survey: 12%) → Last year (Survey: 18%) → A trend (The unmaintained share is growing). 하단: Same period: keep both values. Different periods: read a trend.

### 154. `l70-12`

정리
주장과 출처를 함께 둔다
근거는 사실과 함께 이동한다
첫 서브에이전트부터 최종 보고서까지 하나의 레코드.
줄인 조사 결과는 출처를 잃는다
레코드: 주장, 출처, 인용, 날짜
종합은 레코드를 병합하고, 버리지 않는다
마지막에 덧붙인 인용은 추측이다
같은 기간: 두 값 모두, 이견 섹션
날짜가 다르면 추세일 수 있다

> 노트: 원문 제목: Keep claim and source together (MAIN POINTS). Evidence travels with the fact: One record from the first subagent to the final report. / Shortened findings lose their sources / Records: claim, source, quote, date / Synthesis merges records, never drops them / Citations added at the end are guessed / Same period: both values, contested section / Different dates may show a trend.

### 155. `l70-13`

같은 규칙, 다른 시나리오
근거를 남기고, 하나를 고르지 않는다
[이미지: 서류를 든 사람 일러스트]
송장
합계가 품목과 맞지 않음
추출 레코드
stated 480 · calculated 465 · conflict: true

> 노트: 원문 제목: Keep the evidence, never pick one (THE SAME RULE, ANOTHER SCENARIO). Invoice (Total does not match items) → Extraction record (stated 480 · calculated 465 · conflict: true). 송장에 적힌 합계 480과 품목으로 계산한 합계 465를 둘 다 남기고 충돌을 표시합니다.
