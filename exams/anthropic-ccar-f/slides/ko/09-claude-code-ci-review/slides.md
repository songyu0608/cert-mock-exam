# CCAR-F 섹션 9. CI와 리뷰 아키텍처의 Claude Code (한국어판)

원본 아티팩트: https://claude.ai/artifact/Q4qwgSLEJ2ZoVHQsJRgJAJ

슬라이드 HTML(`slides/`)에서 화면 글자와 발표자 노트(`<aside>`, 영어 원문)를 뽑은 텍스트다. 자동 생성 파일이므로 고칠 때는 슬라이드 HTML을 기준으로 한다.

## 표지 (`cover`)

슬라이드
Claude Certified Architect – Foundations:
전체 강좌
섹션 9. CI와 리뷰 아키텍처의 Claude Code
92~98강, 슬라이드 66장

> 노트: 원문: Claude Certified Architect Foundations: Complete Course / Section 9. Claude Code in CI and Review Architectures / Lectures 92-98, 66 slides. (원본에 96강 없음)

## 92강. 독립적인 리뷰 (`l92`)

92강
독립적인 리뷰
슬라이드 9장

> 노트: 원문: LECTURE 92 · Independent Review · 9 slides

### 3. `l92-01`

새로운 질문
Claude의 코드는 누가 리뷰하나?
Claude Code
코드를 작성
팀 파이프라인
아무도 지켜보지 않음
리뷰어?
같은 생각, 같은 놓침

> 노트: 원문 제목: Who reviews Claude's code? (A NEW QUESTION). Claude Code (Writes the code) → Team pipeline (Nobody watches) → Reviewer? (Same thinking, same misses).

### 4. `l92-02`

상황
Claude가 쓴 것을 봇이 리뷰한다
Claude Code
더 많은 코드를 작성
풀 리퀘스트
diff 하나
리뷰 봇
CI 작업
코멘트
지적 사항

> 노트: 원문 제목: A bot reviews what Claude writes (THE SCENE). Claude Code (Writes more code) → Pull request (A diff) → Review bot (A CI job) → Comments (The findings).

### 5. `l92-03`

부분 환불
자기 리뷰가 실제 버그를 놓쳤다
LIMIT = 500
def partial_refund(order, amount):
    if amount > LIMIT:
        raise ValueError("over limit")
    order.refund(amount)
partial_refund(order, 300)
partial_refund(order, 300)
한도는 주문 합계가 아니라 환불 한 건마다 확인됩니다. 600이 돌려지는데 아무도 보지 못합니다.

> 노트: 원문 제목: The self-review missed a real bug (PARTIAL REFUNDS). 코드(영문 유지) 의미: 한도 500. partial_refund는 이번 환불 금액만 한도와 비교하므로 300을 두 번 환불하면 둘 다 통과해 합계 600이 환불됨. 캡션: The limit is checked on each refund, not on the order total: 600 goes back and no person sees it.

### 6. `l92-04`

핵심 아이디어
리뷰어는 따로 생각해야 한다
자기 리뷰
왜 버그를 놓치나
약한 해결책 둘
왜 도움이 안 되나
독립적인 리뷰
새 인스턴스
리뷰어는 작성자의 추론을 공유해서는 안 됩니다.

> 노트: 원문 제목: A reviewer must think separately (THE KEY IDEA). Self-review: Why it misses the bug / Two weak fixes: Why they do not help / Independent review: A fresh instance. 하단: The reviewer must not share the writer's reasoning.

### 7. `l92-05`

첫째: 자기 리뷰
같은 세션, 같은 사각지대
코드 작성
결정: 훅이 한도를 처리한다
같은 세션의 리뷰
그 결정을 거쳐 코드를 읽음
맞아 보임
의도는 한 번도 의심받지 않음
시험은 이를 자기 리뷰의 한계라고 부릅니다. 모델이 자기 추론 컨텍스트를 그대로 갖고 있기 때문입니다.

> 노트: 원문 제목: Same session, same blind spot (FIRST: SELF-REVIEW). Writing the code (Decides: the hook handles the limit) → Same-session review (Reads code through that decision) → Looks correct (The intention is never questioned). 하단: The exam calls this a self-review limitation: the model keeps its reasoning context.

### 8. `l92-06`

둘째: 옳아 보이는 해결책
어느 해결책도 추론을 지우지 못한다
더 강한 지침
"다른 사람이 쓴 것처럼 리뷰해 줘." 세션은 여전히 이유를 기억합니다.
더 오래 생각하기
같은 인스턴스는 같은 추론에서 출발해 그것을 더 따라갈 뿐입니다.
시험에서는 extended thinking이라고 합니다. 현재 모델에서는 더 높은 effort 설정입니다.

> 노트: 원문 제목: Neither fix removes the reasoning (SECOND: FIXES THAT LOOK RIGHT). A stronger instruction: "Review it as if someone else wrote it." The session still remembers why. / More thinking: The same instance starts from the same reasoning and only follows it further. 하단: The exam says extended thinking. On current models: a higher effort setting. (현재 모델에 대한 설명은 원문 그대로이며 확인하지 않았습니다.)

### 9. `l92-07`

셋째: 독립적인 인스턴스
새 인스턴스는 코드를 본다
전달 안 됨
diff
무엇이 바뀌었나
프로젝트 표준
규칙
작성자의 대화
대화 기록
두 번째 인스턴스
새 컨텍스트, 의도 모름
지적 사항
부분 환불 2건, 주문 1건: 600 환불
평범한 질문을 던지고, 지침이나 extended thinking이 놓친 것을 잡아냅니다.

> 노트: 원문 제목: A fresh instance sees the code (THIRD: THE INDEPENDENT INSTANCE). The diff (What changed) / Project standards (The rules) → Second instance (Fresh context, no intent) → Finding (2 partial refunds, 1 order: 600 back). Writer's chat (Conversation history) - - not passed. 캡션: It asks a plain question and catches what instructions and extended thinking miss.

### 10. `l92-08`

Claude Code에서
새 세션에서 리뷰한다
# Run 1: writes the code (session A)
claude -p "Add partial refunds"
# Run 2: reviews it in a new session (session B)
git diff main | claude -p "Review this diff"
# Never resume session A to review:
#   claude --resume <session-A> ...
# Never fork it - a fork copies the history:
#   claude --resume <session-A> --fork-session
한 인스턴스가 쓰고, 두 번째 인스턴스가 확인합니다. 같은 모델이어도 됩니다. 독립성은 컨텍스트에서 나옵니다.

> 노트: 원문 제목: Review in a new session (IN CLAUDE CODE). 코드(영문 유지) 의미: 1회차 실행은 세션 A에서 코드를 작성. 2회차는 git diff main 결과를 새 세션 B의 claude -p에 넘겨 리뷰. 리뷰하려고 세션 A를 resume하지 말 것. 포크도 하지 말 것(포크는 기록을 복사함). 캡션: One instance writes, a second checks. The same model is fine - independence comes from the context.

### 11. `l92-09`

정리
깨끗한 컨텍스트로 리뷰한다
자기 리뷰
자기 추론을 유지함
비판적으로 보라는 지침
아무것도 바꾸지 못함
더 오래 생각하기
같은 출발점
새 인스턴스
미묘한 버그를 잡음
한 Claude가 코드를 쓰고, 다른 Claude가 자기 세션에서 리뷰합니다.

> 노트: 원문 제목: Review with a clean context (RECAP). Self-review: Keeps its reasoning / Be critical: Changes nothing / More thinking: Same starting point / Fresh instance: Catches subtle bugs. 하단: One Claude writes the code, another reviews it in its own session.

## 93강. 다중 패스 리뷰 (`l93`)

93강
다중 패스 리뷰
슬라이드 10장

> 노트: 원문: LECTURE 93 · Multi-Pass Review · 10 slides

### 13. `l93-01`

큰 변경
큰 변경은 얕은 리뷰를 받는다
새 리뷰어
두 번째 Claude 인스턴스
얕은 리뷰
완전해 보임
[이미지: 고객 일러스트]
고객
놓친 버그를 만남

> 노트: 원문 제목: Big changes get shallow reviews (A BIG CHANGE). Fresh reviewer (A second Claude instance) → Shallow review (Looks complete) → Customers (Meet the missed bugs).

### 14. `l93-02`

상황
파일 24개를 한 번에 보면 잘못된다
풀 리퀘스트
파일 24개: 서비스, 훅, 핸드오프, 테스트
한 번의 패스
리뷰어가 24개를 한꺼번에 읽음
고르지 않은 리뷰
앞은 자세히, 뒤는 한 줄짜리

> 노트: 원문 제목: One pass over 24 files goes wrong (THE SCENE). Pull request (24 files: service, hook, handoff, tests) → One pass (The reviewer reads all 24 at once) → Uneven review (Detail first, one-liners later).

### 15. `l93-03`

해결책
리뷰를 세 패스로 나눈다
파일별 패스
각 파일의 국소적 문제
통합 패스
파일 사이를 오가는 데이터
검증 패스
의심스러운 지적 사항을 라우팅
주의력 희석: 파일은 컨텍스트에 다 들어가지만 주의는 얇아집니다.

> 노트: 원문 제목: Split the review into three passes (THE FIX). Per-file pass: Local issues in each file → Integration pass: Data moving between files → Verification pass: Routes doubtful findings. 하단: Attention dilution: the files fit, but the attention is thin.

### 16. `l93-04`

1회차 패스
파일마다 자기 패스를 받는다
환불 서비스
diff
환불 훅
diff
핸드오프
diff
리뷰어
파일 하나 + 팀 기준
지적 사항
짧고, 깊이는 같음

> 노트: 원문 제목: Each file gets its own pass (PASS 1). Refund service (Diff) / Refund hook (Diff) / Handoff (Diff) → Reviewer (One file + team criteria) → Findings (Short, same depth). 파일마다 따로 리뷰하므로 모든 파일이 같은 깊이로 검토됩니다.

### 17. `l93-05`

2회차 패스
파일 사이에 사는 버그
환불 서비스
핸드오프 코드
지원 담당자
amount: 62000 (cents)
환불 $62,000
각 파일은 그 자체로는 맞습니다. 하지만 합쳐지면 $620가 $62,000이 됩니다.

> 노트: 원문 제목: A bug that lives between files (PASS 2). Refund service → Handoff code: amount: 62000 (cents) / Handoff code → Support person: Refund $62,000. 서비스는 센트 단위로 넘기는데 핸드오프 코드는 달러로 읽음. 캡션: Each file is correct on its own - together, $620 becomes $62,000.

### 18. `l93-06`

2회차 패스
데이터가 의미를 유지하나?
파일별 지적 사항
1회차 패스에서
짧은 지도
파일마다 무엇을 넘기나
통합 패스
다음 파일에서도 같은 의미인가?
센트 버그 발견
센트를 달러로 읽음

> 노트: 원문 제목: Does the data keep its meaning? (PASS 2). Per-file findings (From pass 1) / Short map (What each file passes on) → Integration pass (Same meaning in the next file?) → Cents bug found (Cents read as dollars).

### 19. `l93-07`

형태 유지하기
전체 실행 세 번이 아니라 정해진 순서로
프롬프트 체이닝
모든 파일을 먼저, 그다음 통합 패스.
전체 리뷰 세 번은 아님
두 번 나온 지적 사항만 남기면, 한 번만 찾은 실제 버그를 버리게 됩니다.

> 노트: 원문 제목: Fixed order, not three full runs (KEEP THE SHAPE). Prompt chaining: Every file first, then the integration pass. / Not three full reviews: Keeping findings seen twice would drop a real bug found once.

### 20. `l93-08`

3회차 패스
신뢰도가 누가 볼지를 정한다
지적 사항
많고, 일부는 의심스러움
검증 패스
코드를 확인하고 점수를 매김
높은 신뢰도
일반 코멘트
[이미지: 책상에서 일하는 개발자 일러스트]
낮은 신뢰도
사람이 먼저 봄

> 노트: 원문 제목: Confidence decides who sees it (PASS 3). Findings (Many, some doubtful) → Verification pass (Checks the code, adds a score) → High confidence (Normal comments) / Low confidence (A person looks first).

### 21. `l93-09`

3회차 패스
임계값은 증거로 정한다
과거 점수
모델 스스로의 주장
개발자 판정
확인됨 또는 기각됨
임계값
증거에서 정함
비교
결정
신뢰도는 지적 사항을 라우팅할 뿐, 무엇이 사실인지 정하지는 않습니다.

> 노트: 원문 제목: Set the threshold with evidence (PASS 3). Past scores (The model's own claim) → compare → Developer verdicts (Confirmed or dismissed) → sets → Threshold (Set from the evidence). 하단: Confidence routes the findings. It does not decide which ones are true.

### 22. `l93-10`

정리
큰 리뷰는 패스로 나눈다
한 번의 패스
얕고 앞뒤가 안 맞음
파일별
국소적 문제, 같은 깊이
통합
파일 사이의 데이터
검증
라우팅하고, 버리는 것은 없음
한 번에 꼼꼼히 읽기에 너무 크면, 파일마다 한 패스, 그다음 파일 전체를 가로지르는 한 패스.

> 노트: 원문 제목: Split big reviews into passes (RECAP). One pass: Shallow, contradictory / Per-file: Local issues, same depth / Integration: Data between files / Verification: Routes, drops none. 하단: Too big for one careful read? One pass per file, then one across the files.

## 94강. CI의 Claude Code: -p와 JSON (`l94`)

94강
CI의 Claude Code: -p와 JSON
슬라이드 10장

> 노트: 원문: LECTURE 94 · Claude Code in CI: -p and JSON · 10 slides

### 24. `l94-01`

CI의 Claude Code
CI에는 키보드 앞에 아무도 없다
스스로 끝난다
입력하거나 클릭할 사람이 없습니다.
스크립트가 읽을 수 있는 출력
사람을 위해 쓴 텍스트가 아닙니다.

> 노트: 원문 제목: CI has nobody at the keyboard (CLAUDE CODE IN CI). It finishes on its own: No person to type or click. / Output a script can read: Not text written for people.

### 25. `l94-02`

리뷰 봇
첫 CI 실행이 끝나지 않는다
풀 리퀘스트
ShopAssist의 모든 PR
CI 리뷰 작업
스크립트를 실행
Claude Code
입력을 기다림
시작
프롬프트

> 노트: 원문 제목: The first CI run never ends (THE REVIEW BOT). Pull request (Every ShopAssist PR) → starts → CI review job (Runs the script) → prompt → Claude Code (Waits for typing). 대화형 모드로 실행돼 사람의 입력을 기다리므로 작업이 끝나지 않습니다.

### 26. `l94-03`

첫 번째 해결: print 플래그
-p: 프롬프트를 넣고, 결과를 내고, 종료한다
CI 작업
스크립트를 실행
claude -p
작업한 뒤 종료
표준 출력
파이프라인이 받아 감
프롬프트
결과

> 노트: 원문 제목: -p: prompt in, result out, exit (FIX ONE: THE PRINT FLAG). CI job (Runs the script) → prompt → claude -p (Does the work, then exits) → result → Standard output (Captured by the pipeline).

### 27. `l94-04`

그럴듯하지만 틀린 답
기다림을 멈추는 것은 -p뿐이다
claude -p
고친 명령: print 모드는 기다리지 않습니다.
세션을 끄는 환경 변수: 존재하지 않음
batch 플래그: 존재하지 않음
빈 입력을 파이프로 넣기: Unix 요령일 뿐, 문서에 없음
시험에서 정답은 -p입니다.

> 노트: 원문 제목: Only -p stops the waiting (TEMPTING BUT WRONG). claude -p: The fixed command: print mode never waits. / An environment variable that turns off the session - does not exist / A batch flag - does not exist / Empty input piped in - a Unix trick, not documented. 하단: On the exam, the answer is -p.

### 28. `l94-05`

두 번째 해결: 출력
자유 텍스트는 파싱하기 불안정하다
Claude Code
자유 텍스트를 출력
CI 스크립트
파일과 줄이 필요
풀 리퀘스트
인라인 코멘트가 필요
리뷰
코멘트

> 노트: 원문 제목: Free text is fragile to parse (FIX TWO: THE OUTPUT). Claude Code (Prints free text) → review → CI script (Needs file and line) → comments → Pull request (Needs inline comments).

### 29. `l94-06`

플래그 두 개 더
스키마를 따르는 JSON 출력
{ "type": "object",
  "required": ["findings"],
  "properties": { "findings": { "type": "array", "items": {
    "type": "object",
    "properties": {
      "file": {"type": "string"},  "line": {"type": "integer"},
      "severity": {"type": "string"},  "category": {"type": "string"},
      "message": {"type": "string"},  "fix": {"type": "string"}
    } } } } }
스크립트가 파싱할 수 있는 지적 사항을 얻는 한 가지 방법: 내 스키마에 맞는 JSON.

> 노트: 원문 제목: JSON output that follows a schema (TWO MORE FLAGS). 스키마(영문 유지) 의미: findings 배열이 필수이고, 각 항목은 file(문자열), line(정수), severity, category, message, fix(문자열)를 가짐. 캡션: One way to get findings a script can parse: JSON that matches your schema.

### 30. `l94-07`

스크립트가 하는 일
스크립트가 지적 사항을 하나씩 올린다
Claude Code
CI 스크립트
코드 호스팅 API
지적 사항 JSON
지적 사항마다 API 호출
file:line에 인라인 코멘트
코멘트 게시됨
아무도 손으로 옮겨 적을 필요가 없습니다.

> 노트: 원문 제목: A script posts each finding (WHAT THE SCRIPT DOES). Claude Code → CI script: Findings JSON / CI script → Code hosting API: Call API per finding / Inline comment on file:line / Code hosting API → CI script: Comment posted. 캡션: Nobody has to copy anything by hand.

### 31. `l94-08`

스키마가 주는 것
스키마는 형태를 고정할 뿐, 진실은 보장하지 않는다
형태를 보장한다
모든 지적 사항이 파싱됩니다.
진실은 보장하지 못한다
줄 번호가 diff 밖일 수도 있습니다.
그래서 스크립트는 게시하기 전에 각 줄 번호를 diff와 대조합니다.

> 노트: 원문 제목: A schema fixes shape, not truth (WHAT A SCHEMA GIVES). It guarantees the shape: Every finding parses. / It cannot guarantee truth: A line may be outside the diff. 하단: So the script checks each line against the diff before it posts.

### 32. `l94-09`

핵심 정리
-p, JSON, 스키마를 쓴다
-p가 없으면 멈춤
대화형 모드는 사람을 기다림
-p / --print
프롬프트를 실행하고, 출력하고, 종료
output-format json
스크립트가 읽는 JSON 답
--json-schema
내 스키마를 따르는 JSON

> 노트: 원문 제목: Use -p, JSON and a schema (MAIN POINTS). No -p: it hangs: Interactive mode waits for a person / -p / --print: Runs the prompt, prints, exits / Output format json: The answer as JSON a script reads / --json-schema: JSON that follows your schema. 플래그 이름(--output-format json, --json-schema)은 원문 그대로이며 확인하지 않았습니다.

### 33. `l94-10`

파이프라인의 규칙
CI에서는 항상 -p와 스키마를 쓴다
항상 -p로 실행
사람도 없고, 기다림도 없습니다.
스키마에 맞춘 JSON 요청
스크립트가 파싱할 수 있습니다.
다음: CI 실행이 스스로는 볼 수 없는 프로젝트 컨텍스트.

> 노트: 원문 제목: In CI, always use -p and a schema (THE RULE FOR A PIPELINE). Always run with -p: No person, no waiting. / Ask for JSON on a schema: A script can parse it. 하단: Next: the project context each CI run cannot see by itself.

## 95강. CI 리뷰와 테스트를 위한 컨텍스트 (`l95`)

95강
CI 리뷰와 테스트를 위한 컨텍스트
슬라이드 13장

> 노트: 원문: LECTURE 95 · Context for CI Reviews and Tests · 13 slides

### 35. `l95-01`

CI에서 컨텍스트가 중요한 이유
눈먼 CI 리뷰는 무시당한다
눈먼 실행
프로젝트를 볼 수 없으니 조언이 일반론에 그칩니다.
반복하는 실행
같은 코멘트를 또 올려서, 결국 개발자들이 읽지 않게 됩니다.

> 노트: 원문 제목: Blind CI reviews get ignored (WHY CONTEXT MATTERS IN CI). A run that is blind: It cannot see the project, so its advice is generic. / A run that repeats: It posts the same comments again, until developers stop reading them.

### 36. `l95-02`

현재 위치
봇이 모든 풀 리퀘스트를 리뷰한다
[이미지: 책상에서 일하는 개발자 일러스트]
개발자
ShopAssist 풀 리퀘스트를 엶
리뷰 작업
-p로 실행한 Claude Code, 스스로 종료
지적 사항
스키마를 따르는 JSON
제안된 테스트
변경마다

> 노트: 원문 제목: A bot reviews every pull request (WHERE WE ARE). Developer (Opens a ShopAssist pull request) → Review job (Claude Code with -p, ends on its own) → Findings (JSON, from a schema) / Suggested tests (For each change).

### 37. `l95-03`

일주일 뒤의 로그
일주일 뒤, 세 가지 문제가 드러난다
틀린 프레임워크
일부 테스트가 실제 결제 서비스를 호출
중복 테스트
제안된 테스트 상당수가 이미 존재
반복되는 코멘트
push할 때마다 같은 리뷰

> 노트: 원문 제목: After a week, three problems show (THE LOGS AFTER ONE WEEK). Wrong framework: Some tests call the real payment service / Duplicate tests: Many suggested tests already exist / Repeated comments: The same review on every push.

### 38. `l95-04`

핵심 사실
CI 실행은 기억 없이 시작한다
차단
리포지토리
커밋된 파일
프롬프트
스크립트가 보내는 텍스트
CI 실행
이 두 가지만 봄
대화 기록
누구의 대화도 실행에 닿지 않음

> 노트: 원문 제목: A CI run starts with no memory (THE KEY FACT). Repository (The committed files) / Prompt (The text the script sends) → CI run (Sees two things only). Chat history (Nobody's chat reaches the run) - - blocked.

### 39. `l95-05`

출처 1/3: 프로젝트 CLAUDE.md
커밋된 파일만 CI에 닿는다
커밋
[이미지: 책상에서 일하는 개발자 일러스트]
개발자
노트북에서 작업
프로젝트 CLAUDE.md
리포지토리에 커밋됨
개인 파일
홈 폴더에 남음
CI 실행
홈 폴더가 없음

> 노트: 원문 제목: Only committed files reach CI (SOURCE 1 OF 3: THE PROJECT CLAUDE.MD). Developer (Works on a laptop) → commit → Project CLAUDE.md (Committed to the repository) → CI run (Has no home folder). Developer → Personal file (Stays in the home folder) - - → CI run: 닿지 않음.

### 40. `l95-06`

프로젝트 파일 안
파일 하나에 네 종류가 담긴다
# Testing standards
- Framework: pytest; test files in a tests folder
# Valuable tests
- Check behavior that moves money or changes a decision:
  $500 limit, 30-day return window, no delivery date
- Skip trivial tests, such as returning a stored field
CI 작업을 위한 테스트 표준과 리뷰 기준을 쓰는 한 가지 방법.

> 노트: 원문 제목: One file carries four kinds (INSIDE THE PROJECT FILE). 내용(영문 유지) 의미: 테스트 표준 - 프레임워크는 pytest, 테스트 파일은 tests 폴더에 / 가치 있는 테스트 - 돈이 오가거나 결정을 바꾸는 동작을 확인($500 한도, 30일 반품 기간, 배송일 없음) / 저장된 필드를 반환하는 것 같은 사소한 테스트는 건너뜀. 캡션: One way to write testing standards and review criteria for a CI job.

### 41. `l95-07`

프로젝트 파일 안
모든 실행이 같은 파일을 읽는다
# Testing standards
- Framework: pytest; test files in a tests folder
# Valuable tests
- Check behavior that moves money or changes a decision:
  $500 limit, 30-day return window, no delivery date
- Skip trivial tests, such as returning a stored field
# Fixtures
- fake payment service
- sample customer with two orders
# Review criteria
- Report bugs and security problems; skip minor style
표준은 더 긴 테스트 프롬프트가 아니라 커밋된 파일 하나에 둡니다.

> 노트: 원문 제목: Every run reads the same file (INSIDE THE PROJECT FILE). 내용(영문 유지) 의미: 앞 슬라이드의 테스트 표준과 가치 있는 테스트에 더해, 픽스처(가짜 결제 서비스, 주문이 두 개인 샘플 고객)와 리뷰 기준(버그와 보안 문제를 보고하고 사소한 스타일은 건너뜀). 캡션: The standards live in one committed file, not in a longer test prompt.

### 42. `l95-08`

출처 2/3: 기존 테스트
이미 있는 테스트를 Claude에게 보여 준다
테스트 스위트
CI 스크립트
Claude
diff: 부분 환불
테스트: 전액 환불 $100
변경된 코드의 테스트
이미 다룸 - 건너뛰기
새 테스트: $300 환불 2건
$500 한도가 합계에도 적용되나? 이 질문에 답하는 기존 테스트가 없으므로, 새 테스트가 가치를 더합니다.

> 노트: 원문 제목: Show Claude the tests that exist (SOURCE 2 OF 3: THE EXISTING TESTS). CI script → Claude: diff: partial refunds / Claude → CI script: test: full refund $100 / Test suite → CI script: tests for changed code / CI script → Claude: already covered - skip / Claude → CI script: new: 2 refunds of $300. 캡션: Does the $500 limit apply to the total? No existing test answers that, so it adds value.

### 43. `l95-09`

출처 3/3: 이전 지적 사항
실행에 이전 지적 사항을 준다
저장된 지적 사항
CI 스크립트
Claude
같은 말 반복하지 마
1회차 실행을 볼 수 없음
저장된 리뷰 JSON
지적 사항 + 새 diff
새것이나 아직 열린 것만
리뷰마다 새 세션입니다. 지침만으로는 통하지 않습니다.

> 노트: 원문 제목: Give the run its earlier findings (SOURCE 3 OF 3: THE EARLIER FINDINGS). CI script → Claude: don't repeat yourself / Claude → CI script: cannot see run 1 / Saved findings → CI script: saved review JSON / CI script → Claude: findings + new diff / only new or still open. 캡션: Each review is a new session: an instruction alone cannot work.

### 44. `l95-10`

풀 리퀘스트 하나, push 두 번
고친 이슈는 조용히 남는다
1회차 실행
이슈 A, B, C 발견
[이미지: 책상에서 일하는 개발자 일러스트]
개발자
A와 B를 고치고 push
2회차, 기록 없음
A, B, C 다시, 어쩌면 D
2회차, 지적 사항 포함
C는 아직 열림, D는 새로

> 노트: 원문 제목: Fixed issues stay quiet (ONE PULL REQUEST, TWO PUSHES). Run 1 (Finds issues A, B and C) → Developer (Fixes A and B, pushes) - - → Run 2, no history (A, B, C again, maybe D) / → Run 2, with findings (C still open, D is new).

### 45. `l95-11`

보호 장치와 한계
컨텍스트는 방향을 잡고, CI 검사는 강제한다
두 번째 보호 장치
같은 줄에 이미 있는 코멘트는 스크립트가 건너뜁니다.
강제가 아닌 컨텍스트
반드시 통과해야 하는 테스트는 여전히 일반 CI 검사로 실행합니다.

> 노트: 원문 제목: Context steers, CI checks enforce (A GUARD AND A LIMIT). A second guard: The script skips a comment that already sits on the same line. / Context, not enforcement: A test that must always pass still runs as a normal CI check.

### 46. `l95-12`

정리
실행이 볼 수 없는 것을 준다
기억 없음
컨텍스트는 리포지토리와 프롬프트에서 옴
프로젝트 CLAUDE.md
표준, 픽스처, 기준
기존 테스트
빠진 시나리오만 제안
이전 지적 사항
새것이나 열린 이슈만 보고

> 노트: 원문 제목: Give the run what it cannot see (RECAP). No memory: Context comes from repo and prompt / Project CLAUDE.md: Standards, fixtures, criteria / Existing tests: Suggest only missing scenarios / Earlier findings: Report only new or open issues.

### 47. `l95-13`

파이프라인을 돌리기 전에
Claude가 볼 수 없는 것을 묻는다
먼저 묻기
실행이 스스로 볼 수 없는 것은 무엇인가?
프로젝트 CLAUDE.md
기존 테스트
자신의 이전 지적 사항

> 노트: 원문 제목: Ask what Claude cannot see (BEFORE YOUR PIPELINE RUNS). Ask first: What can the run not see by itself? / The project CLAUDE.md / The existing tests / Its own earlier findings.

## 97강. CI 사례: 파이프라인과 컨텍스트 (`l97`)

97강
CI 사례: 파이프라인과 컨텍스트
슬라이드 12장

> 노트: 원문: LECTURE 97 · CI Case: Pipeline and Context · 12 slides

### 49. `l97-01`

시험 점검: CI의 Claude Code
두 가지 결정이 모든 CI 실행을 좌우한다
풀 리퀘스트
개발자가 엶
[이미지: 서버와 데이터 상자 일러스트]
CI 작업
모든 풀 리퀘스트에서 실행
Claude Code
리뷰하고 테스트를 제안
결정 1: 작업이 어떻게 실행되나. 결정 2: 실행마다 어떤 컨텍스트를 받나.

> 노트: 원문 제목: Two decisions shape every CI run (EXAM CHECKPOINT: CLAUDE CODE IN CI). Pull request (Opened by a developer) → CI job (Runs on every pull request) → Claude Code (Reviews and suggests tests). 하단: Decision 1: how the job runs. Decision 2: what context each run gets.

### 50. `l97-02`

증상 1
사람이 없으면 작업이 멈춘다
CI 작업
Claude Code
게시 스크립트
리뷰 프롬프트
1시간 기다리다 강제 종료
산문 한 문단
코멘트 0개
원인은 프롬프트의 표현이 아니라 작업이 실행되는 방식입니다.

> 노트: 원문 제목: Without a person, the job hangs (SYMPTOM 1). CI job → Claude Code: review prompt / waits 1 h, then killed / Claude Code → Posting script: a paragraph of prose / Posting script: 0 comments. 캡션: The cause is how the job runs, not how the prompt is worded.

### 51. `l97-03`

상황이 요구하는 것
해결책은 표현이 아니라 보장이다
작업이 스스로 끝난다
매번, 답할 사람이 없어도.
스크립트가 모든 결과를 읽는다
산문이 아니라 프로그램이 파싱할 수 있는 출력.
더 나은 단어 선택이 아니라, 작업이 실행되는 방식에서 나오는 보장.

> 노트: 원문 제목: The fix is a guarantee, not words (WHAT THE SITUATION DEMANDS). The job finishes by itself: Every time, with no person to answer. / The script reads every result: Output a program can parse, not prose. 하단: A guarantee in how the job runs - not a better choice of words.

### 52. `l97-04`

그럴듯해 보이는 두 가지 해결책
타임아웃도, 프롬프트 한 줄도 실패한다
# Fix 2: ask for JSON in the prompt
claude "Review this pull request. Answer in JSON."
# Most runs: JSON
# One run: a prose paragraph
#   the script cannot parse it
어느 해결책도 작업이 실행되는 방식을 바꾸지 못합니다. 기다림이 짧아질 뿐이고, JSON은 요청이지 보장이 아닙니다.

> 노트: 원문 제목: A timeout or a prompt line fails (TWO FIXES THAT LOOK REASONABLE). 코드(영문 유지) 의미: 해결책 2는 프롬프트에서 JSON으로 답하라고 요청하는 것. 대부분은 JSON이 오지만 한 번은 산문 문단이 와서 스크립트가 파싱하지 못함. (해결책 1은 타임아웃을 거는 것.) 캡션: Neither fix changes how the job runs: a wait only gets shorter, and JSON is a request, not a guarantee.

### 53. `l97-05`

최선의 수
-p와 스키마가 해결한다
{ "type": "object", "properties": { "findings": {
  "type": "array", "items": { "type": "object",
    "properties": {
      "file": { "type": "string" },
      "line": { "type": "integer" },
      "severity": { "type": "string" },
      "message": { "type": "string" },
      "fix": { "type": "string" } } } } } }
모든 결과가 파싱됩니다. 스크립트는 그 줄이 diff 안에 있는지 확인한 뒤 각 지적 사항을 해당 줄에 게시합니다.

> 노트: 원문 제목: Dash p and a schema fix it (THE BEST MOVE). 스키마(영문 유지) 의미: findings 배열, 각 항목에 file, line(정수), severity, message, fix. 캡션: Every result parses. The script posts each finding on its line - after checking that the line is in the diff.

### 54. `l97-06`

두 번째 수: 재실행
재실행이 같은 코멘트를 반복한다
1회차 실행
이슈 4개 발견
[이미지: 책상에서 일하는 개발자 일러스트]
개발자
3개를 고치고 커밋 push
2회차 실행
4개를 모두 다시 게시
"이전 코멘트를 반복하지 마"
실패: 실행마다 새 세션

> 노트: 원문 제목: Re-runs repeat the same comments (THE SECOND MOVE: RE-RUNS). Run 1 (Finds 4 issues) → Developer (Fixes 3, pushes a commit) → Run 2 (Posts all 4 again). "Do not repeat earlier comments" (Fails: each run is a new session).

### 55. `l97-07`

실행에 기억을 준다
실행마다 이전 지적 사항을 준다
1회차 지적 사항
JSON으로 저장
2회차 프롬프트
새 diff + 이전 지적 사항
Claude Code
새것이나 아직 열린 것만 보고
2회차 결과
열린 이슈 1개, 3개는 조용히
-p는 작업을 끝내고, 스키마는 출력을 읽을 수 있게 하고, 이전 지적 사항은 반복을 막습니다.

> 노트: 원문 제목: Give each run earlier findings (GIVE THE RUN ITS MEMORY). Run 1 findings (Saved as JSON) → Run 2 prompt (New diff + earlier findings) → Claude Code (Report only new or still open) → Run 2 result (1 open issue; 3 stay quiet). 하단: -p ends the job, the schema makes output readable, earlier findings stop repeats.

### 56. `l97-08`

작업 실행 방식에 대해 하나 더
배치는 아무도 기다리지 않는 작업에 맞다
주간 코드 감사
적합: 비용은 절반이고, 아무도 기다리지 않습니다.
머지를 막는 리뷰
부적합: 개발자가 기다리는데, 배치는 최대 24시간이 걸릴 수 있습니다.
Message Batches: 비용은 절반, 최대 24시간, 지연 시간 보장 없음.

> 노트: 원문 제목: Batches suit work nobody waits on (ONE MORE POINT ABOUT HOW THE JOB RUNS). Weekly code audit: Fits: half the price, and nobody is waiting. / Blocking review: Never: a developer waits, and a batch can take up to 24 hours. 하단: Message Batches: half the cost, up to 24 hours, no latency guarantee.

### 57. `l97-09`

두 번째 결정: 컨텍스트
Claude는 보지 못한 테스트를 확인할 수 없다
더 긴 프롬프트
기존 테스트를 확인하고, 절대 중복하지 마
Claude Code
diff만 봄
테스트 제안
중복, 틀린 프레임워크, 실제 결제
테스트 파일
실행에 주어진 적 없음

> 노트: 원문 제목: Claude cannot check unseen tests (SECOND DECISION: CONTEXT). Longer prompt (Check existing tests, never duplicate) → Claude Code (Sees only the diff) → Test suggestions (Duplicates, wrong framework, real payments). Test files (Never given to the run) - - → Claude Code.

### 58. `l97-10`

최선의 수는 두 부분
실행에 테스트와 규칙을 보여 준다
기존 테스트
커밋된 파일
CI 스크립트
변경된 코드의 테스트를 추가
CLAUDE.md
프레임워크, 픽스처, 가치 있는 테스트의 기준
Claude Code
빠진 시나리오만 제안

> 노트: 원문 제목: Show the run its tests and rules (THE BEST MOVE HAS TWO PARTS). CI script (Adds the tests for the changed code) → existing tests → Claude Code (Suggests only missing scenarios). CLAUDE.md (Framework, fixtures, what makes a test valuable) → committed file → Claude Code.

### 59. `l97-11`

기억할 요점
기억할 다섯 가지
-p 사용
사람을 기다리지 않음
JSON 스키마
지적 사항을 줄마다 게시
이전 지적 사항
새것이나 열린 이슈만
기존 테스트
CLAUDE.md 표준과 함께
배치
아무도 기다리지 않는 작업만
중복 테스트를 막으려면: 실행에 기존 테스트를 보여 주고, 팀 표준은 리포지토리에 두세요.

> 노트: 원문 제목: Five points to remember (MAIN POINTS TO REMEMBER). Use -p: No waiting for a person / JSON schema: Findings posted line by line / Earlier findings: Only new or open issues / Existing tests: Plus CLAUDE.md standards / Batches: Only work nobody waits for. 하단: To stop duplicate tests: show the run the tests that exist, and keep the team's standards in the repository.

### 60. `l97-12`

리서치 시나리오에서도 같은 규칙
서브에이전트는 CI처럼 빈 상태로 시작한다
코디네이터
모든 조사 결과를 쥠
서브에이전트
기록 없이 시작
실행이 스스로 끝나게 하고, 프로그램이 읽을 수 있는 출력을 요청하고, 볼 수 없는 것은 컨텍스트로 주세요.

> 노트: 원문 제목: A subagent starts blank, like CI (THE SAME RULE IN THE RESEARCH SCENARIO). Coordinator (Holds all the findings) → Subagent (Starts with no history). 하단: Make the run finish by itself, ask for output a program can read, and give it in context what it cannot see.

## 98강. CI 사례: 리뷰 품질 (`l98`)

98강
CI 사례: 리뷰 품질
슬라이드 12장

> 노트: 원문: LECTURE 98 · CI Case: Review Quality · 12 slides

### 62. `l98-01`

마지막 점검: 리뷰 품질
신뢰와 깊이가 봇을 쓸모 있게 만든다
지금까지: 작업은 스스로 끝나고, JSON을 돌려주고, 자기가 한 말을 기억합니다.
개발자가 신뢰한다
첫 번째 결정: 개발자들이 봇의 코멘트를 기각할 때 무엇을 할까.
꼼꼼하게 읽는다
두 번째 결정: 큰 변경이 얕은 리뷰를 받을 때 무엇을 할까.
리뷰 봇은 개발자가 신뢰하고, 봇이 모든 파일을 꼼꼼히 읽을 때만 도움이 됩니다.

> 노트: 원문 제목: Trust and depth make a bot useful (LAST CHECKPOINT: REVIEW QUALITY). 부제: Before: the job finishes on its own, returns JSON and remembers what it said. Developers trust it: First decision: what to do when developers dismiss the bot's comments. / It reads with care: Second decision: what to do when a large change gets a shallow review. 하단: A review bot only helps when developers trust it and it reads every file with care.

### 63. `l98-02`

첫 번째 증상
넓은 범주는 노이즈를 가린다
{
  "file": "refund.py",
  "line": 42,
  "severity": "medium",
  "category": "error handling",
  "message": "Default hides a missing value"
}
2주 동안 코멘트 약 60개가 기각됐습니다. 하지만 "error handling"만으로는 어떤 종류가 노이즈인지 알 수 없습니다.

> 노트: 원문 제목: Broad categories hide the noise (FIRST SYMPTOM). 지적 사항(영문 유지) 의미: refund.py 42행, 심각도 medium, 범주 error handling, 메시지 "기본값이 빠진 값을 가림". 캡션: About sixty comments dismissed in two weeks - but "error handling" does not say which kind is noise.

### 64. `l98-03`

실패하는 두 가지 해결책
솔깃한 두 해결책 모두 실패한다
확실한 지적 사항만
Claude는 아무도 원하지 않는 코멘트에 대해서도 매우 확신할 수 있습니다.
이유를 묻기
자유 텍스트는 세기 어렵고, 많은 사람이 건너뛰며, 지친 개발자에게 일을 더합니다.
여기서는 누구도 보장을 요구하지 않습니다. 첫 단계는 원인을 찾는 것입니다.

> 노트: 원문 제목: Two tempting fixes both fail (TWO FIXES THAT FAIL). Only sure findings: Claude can be very sure about a comment that nobody wants. / Ask for a reason: Free text is hard to count, many people skip it, and it adds work for tired developers. 하단: Nobody asks for a guarantee here. The first step is to find the cause.

### 65. `l98-04`

최선의 수
필드 하나를 더한다: detected_pattern
{
  "file": "refund.py",
  "line": 42,
  "severity": "medium",
  "category": "error handling",
  "detected_pattern": "amount taken from the customer's message",
  "message": "Default hides a missing value"
}
스키마가 이 필드를 필수로 만들어, 모든 지적 사항이 자신을 촉발한 코드 구조를 밝힙니다.

> 노트: 원문 제목: Add one field: detected pattern (THE BEST MOVE). 지적 사항(영문 유지) 의미: 앞의 필드에 detected_pattern "고객 메시지에서 가져온 금액"을 추가. 캡션: The schema makes the field required, so every finding names the code construct that triggered it.

### 66. `l98-05`

기각이 데이터가 된다
봇이 아니라 패턴을 멈춘다
[이미지: 책상에서 일하는 개발자 일러스트]
개발자들
코멘트 60개를 기각
세기
60개 중 40개가 같은 패턴
건너뛰기 규칙
대조 쌍 하나와 함께
멈춤
그 패턴만
모든 지적 사항이 자기 패턴을 밝히게 하면, 기각이 셀 수 있는 데이터가 됩니다.

> 노트: 원문 제목: Pause the pattern, not the bot (DISMISSALS BECOME DATA). Developers (Dismiss 60 comments) → Count (40 of 60 share one pattern) → Skip rule (Plus one contrast pair) → Pause (Only that pattern). 하단: Make every finding name its pattern, so that dismissals become data you can count.

### 67. `l98-06`

두 번째 결정
큰 변경이 얕은 리뷰를 받는다
Claude Code
store credit 환불을 추가
파일 31개 변경
새 환불 옵션 하나
같은 세션
자기 작업을 리뷰
작성
리뷰
처음 몇 파일은 자세히, 나머지는 파일마다 한 줄.

> 노트: 원문 제목: A big change gets a shallow review (SECOND DECISION). Claude Code (Adds store credit refunds) → writes → 31 files changed (One new refund option) → reviews → Same session (Reviews its own work). 하단: Detailed for the first few files, one line each for the rest.

### 68. `l98-07`

리뷰가 놓치는 것
버그는 두 파일 사이에 숨는다
상태
표시
환불 서비스
새 상태: store_credit
케이스 정보 코드
옛 상태만 완료로 셈
[이미지: 고객 일러스트]
고객
크레딧이 대기 중으로 표시됨

> 노트: 원문 제목: The bug hides between two files (WHAT THE REVIEW MISSES). Refund service (New status: store_credit) → status → Case-facts code (Only the old status counts as done) → shows → Customer (Credit shows as pending).

### 69. `l98-08`

실패하는 두 가지 해결책
같은 세션, 같은 사각지대
비판적으로 리뷰하기
다른 사람인 척하라고 해도, 세션은 작성할 때의 추론을 유지하고 코드를 자기 의도에 비춰 확인합니다.
더 많이 생각하기
시험은 extended thinking이라고 부릅니다. 지금은 effort 설정이 있는 adaptive thinking입니다. 같은 추론에서 출발합니다.
이번에도 첫 단계이고, 리뷰를 어떻게 구성하느냐의 문제입니다.

> 노트: 원문 제목: Same session, same blind spots (TWO FIXES THAT FAIL). Review critically: Asked to act as someone else, the session still keeps its writing reasoning and checks code against its own intentions. / Think more: The exam calls it extended thinking. Today it is adaptive thinking with an effort setting. It starts from the same reasoning. 하단: Again a first step - and it is about how the review is built. (현재 모델의 사고 방식 설명은 원문 그대로이며 확인하지 않았습니다.)

### 70. `l98-09`

최선의 수, 1부와 2부
새 리뷰어가 두 패스로 본다
작성자
파일 31개를 작성
새 리뷰어
새 실행, 새 세션
파일별
어디서나 같은 깊이
파일 간
상태를 따라감
작성자의 세션을 resume하거나 포크하지 않습니다. 통합 패스가 케이스 정보 코드가 모르는 상태를 찾아냅니다.

> 노트: 원문 제목: A fresh reviewer, in two passes (THE BEST MOVE, PARTS ONE AND TWO). Writer (Wrote the 31 files) - - → Fresh reviewer (New run, new session) → Per file (Same depth everywhere) → Across files (Follows the status). 캡션: It never resumes or forks the writer's session. The integration pass finds the status that the case-facts code does not know.

### 71. `l98-10`

최선의 수, 3부
신뢰도가 어디로 갈지를 정한다
높음
의심
모든 지적 사항
두 패스에서 나옴
검증 패스
지적 사항마다 확인하고 신뢰도를 붙임
코멘트로 게시
높은 신뢰도
사람이 먼저
의심스러움, 버리는 것은 없음
새 리뷰어, 파일마다 한 패스, 파일 간 한 패스. 신뢰도는 지적 사항을 라우팅할 뿐 지우지 않습니다.

> 노트: 원문 제목: Confidence decides where it goes (THE BEST MOVE, PART THREE). All findings (From both passes) → Verification pass (Checks each finding, adds confidence) → high → Posted as comments (High confidence) / doubtful → A person first (Doubtful, none dropped). 하단: Fresh reviewer, a pass per file, a pass across files. Confidence routes findings, never deletes them.

### 72. `l98-11`

기억할 것
두 가지 해결책이 신뢰를 되찾았다
기각 세기
detected pattern을 추가하고, 노이즈가 많은 것만 멈춤
새 리뷰어
작성자는 리뷰하지 않음, "비판적으로"는 효과 없음
두 종류의 패스
파일마다 하나, 파일 간 하나
신뢰도로 라우팅
의심스러운 것은 사람에게, 버리는 것 없음
처음 몇 주 동안 개발자들은 봇을 무시했습니다. 이제 다시 읽습니다.

> 노트: 원문 제목: Two fixes brought trust back (REMEMBER). Count dismissals: Add detected pattern, pause only the noisy one / Fresh reviewer: The writer should not review; "be critical" changes nothing / Two kinds of pass: One per file, one across files / Confidence routes: Doubtful findings go to a person, none dropped. 하단: In its first weeks, developers ignored the bot. Now they read it again.

### 73. `l98-12`

추출에서도 같은 규칙
각 부분을 따로 측정한다
정확도 수치 하나
약한 부분을 가림
부분별로
문서 유형, 필드
캘리브레이션된 신뢰도
사람이 리뷰할 곳을 정함
분할
라우팅
Claude 출력에 대한 신뢰가 떨어지면, 측정할 수 있는 부분으로 나누고 실패하는 부분을 고치세요.

> 노트: 원문 제목: Measure each part on its own (THE SAME RULE IN EXTRACTION). One accuracy number (Hides a weak segment) → split → Each segment (Document type, field) → route → Calibrated confidence (Decides where humans review). 하단: When trust in Claude's output falls, split it into parts you can measure and fix the part that fails.
