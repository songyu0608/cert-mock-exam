# CCAR-F 섹션 3. 프롬프트 엔지니어링과 평가 (한국어판)

원본 아티팩트: https://claude.ai/artifact/4mYT54BfMLpJh6uW2dhzFN

슬라이드 HTML(`slides/`)에서 화면 글자와 발표자 노트(`<aside>`, 영어 원문)를 뽑은 텍스트다. 자동 생성 파일이므로 고칠 때는 슬라이드 HTML을 기준으로 한다.

## 표지 (`cover`)

슬라이드
Claude Certified Architect – Foundations:
전체 강좌
섹션 3. 프롬프트 엔지니어링과 평가
18~24강, 슬라이드 72장

> 노트: 원문: Claude Certified Architect Foundations: Complete Course / Section 3. Prompt Engineering and Evaluation / Lectures 18-24, 72 slides.

## 18강. Git과 풀 리퀘스트 (비개발자용) (`l18`)

18강
Git과 풀 리퀘스트 (비개발자용)
슬라이드 8장

> 노트: 원문: LECTURE 18 · Git and Pull Requests (for nondevelopers) · 8 slides

### 3. `l18-01`

현재 위치
노트북에서 실제 고객에게로
제안
승인
[이미지: 책상에서 일하는 개발자 일러스트]
개발자
더 나은 프롬프트가 있음
Git + 풀 리퀘스트
이번 강의에서 다루는 경로
고객
ShopAssist와 채팅

> 노트: 원문 제목: From a laptop to real customers (WHERE WE ARE). Developer (Has a better prompt) —proposed→ Git + pull request (The path this lesson covers) —approved→ Customers (Chat with ShopAssist).

### 4. `l18-02`

핵심 개념
아무도 ShopAssist를 직접 바꾸지 않는다
제안
개발자가 변경을 제안한다
검토
다른 사람들이 리뷰한다
수락
그런 다음에야 머지된다
변경 하나를 따라갑니다: 어디에 있고, 어떻게 저장되고, 어떻게 리뷰되는지.

> 노트: 원문 제목: Nobody changes ShopAssist directly (THE CORE IDEA). Propose: A developer suggests a change → Read: Other people review it → Accept: Only then is it merged. 하단: We follow one change: where it lives, how it is saved, how it is reviewed.

### 5. `l18-03`

1. 코드가 있는 곳
리포지토리는 모든 변경을 보관한다
공유
채팅 창 코드
도구 정의
테스트
지침 파일
시스템 프롬프트
리포지토리
프로젝트 폴더 + 전체 이력. Git이 보관한다.
GitHub
팀이 리포지토리를 공유하는 웹사이트

> 노트: 원문 제목: A repository keeps every change (1. WHERE THE CODE LIVES). Chat window code / Tool definitions / Tests / Instructions file (The system prompt) → Repository (Project folder + full history. Git keeps it.) —shared on→ GitHub (A website where teams share repositories).

### 6. `l18-04`

2. 변경을 만드는 방법
브랜치에서 작업하고, 커밋으로 저장한다
복사
저장
다음
main
승인된 버전, 고객이 사용
새 브랜치
main의 복사본. 우리 작업은 여기에
커밋 1
정책 규칙, 메시지와 함께 저장
커밋 2
테스트 케이스 추가

> 노트: 원문 제목: Work on a branch, save commits (2. HOW A CHANGE IS MADE). main (Approved version, used by customers) —copy→ New branch (Copy of main - our work stays here) —save→ Commit 1 (Policy rule, saved with a message) —next→ Commit 2 (Test case added).

### 7. `l18-05`

3. 변경을 제안하는 방법
풀 리퀘스트는 머지를 제안한다
연다
머지
새 브랜치
우리 커밋
풀 리퀘스트
팀에 보내는 제안
main
승인된 버전

> 노트: 원문 제목: A pull request proposes a merge (3. HOW A CHANGE IS PROPOSED). New branch (Our commits) —opens→ Pull request (A proposal to the team) —merge→ main (Approved version).

### 8. `l18-06`

풀 리퀘스트 페이지
diff는 바뀐 부분만 보여 준다
You are ShopAssist, a support assistant.
  Answer only from the store's policies.
  Be short and friendly.
- Ask the customer to clarify every question.
+ A plain policy question gets the policy answer.
  Hand requests for exceptions to a human.
  Never promise a refund before it is approved.
빨간 줄은 삭제된 줄, 초록 줄은 추가된 줄입니다. 리뷰어는 바뀐 부분만 읽습니다.

> 노트: 원문 제목: The diff shows only what changed (THE PULL REQUEST PAGE). 프롬프트(영문 유지) 의미: 너는 지원 어시스턴트 ShopAssist다. 스토어 정책에 근거해서만 답하라. 짧고 친절하게. (삭제) 모든 질문마다 고객에게 확인 질문을 하라. (추가) 단순한 정책 질문에는 정책으로 답한다. 예외 요청은 사람에게 넘겨라. 승인 전에는 절대 환불을 약속하지 마라. 캡션: Red lines were removed, green lines were added. The reviewer reads only the change.

### 9. `l18-07`

코드 리뷰
리뷰하고, 승인하고, 그다음 머지한다
개발자
리뷰어
main
고객
읽을 diff
특정 줄에 코멘트
답변 또는 수정 커밋
승인
머지
고객에게 반영
코멘트 예: “이 규칙으로도 예외 요청이 여전히 사람에게 넘어가나요?”

> 노트: 원문 제목: Reviewed, approved, then merged (CODE REVIEW). Developer → Reviewer: Diff to read / Reviewer → Developer: Comment on a line / Developer → Reviewer: Answer, or a fix commit / Reviewer → Developer: Approve / Developer → main: Merge / main → Customers: Reaches customers. 캡션: Example comment: "Does this rule still send requests for exceptions to a human?"

### 10. `l18-08`

정리
모든 변경은 이 경로를 거친다
리포지토리
파일과 그 이력
브랜치
main은 안전하게 유지
커밋
저장된 변경 하나
풀 리퀘스트
머지를 제안
리뷰
diff와 코멘트, 그다음 머지
프롬프트 한 줄이라도 제안되고, 읽히고, 승인됩니다.

> 노트: 원문 제목: Every change takes this path (RECAP). Repository: Files and their history → Branch: Main stays safe → Commit: One saved change → Pull request: Proposes the merge → Review: Diff and comments, then merge. 하단: Even one line of a prompt is proposed, read and approved.

## 19강. 풀 리퀘스트의 CI 검사 (비개발자용) (`l19`)

19강
풀 리퀘스트의 CI 검사 (비개발자용)
슬라이드 8장

> 노트: 원문: LECTURE 19 · CI Checks on Pull Requests (for nondevelopers) · 8 slides

### 12. `l19-01`

현재 위치
모든 풀 리퀘스트는 검사를 받는다
브랜치
작업할 복사본
커밋
저장된 단계
풀 리퀘스트
머지 요청
승인됨
팀원이 diff를 읽음
자동 검사
버튼도, 사람도 없음
다음 강의들에서는 이 검사에 Claude를 넣습니다.

> 노트: 원문 제목: Every pull request gets checks (WHERE WE ARE). Branch: A copy to work on → Commits: Saved steps → Pull request: Asks to merge → Approved: A teammate read the diff → Auto checks: No button, no person. 하단: The next lessons put Claude into these checks.

### 13. `l19-02`

핵심 개념
어떤 검사는 머지를 막는다
풀 리퀘스트
머지할 변경
자동 검사
알아서 시작됨
머지를 막음
먼저 통과해야 함
보고만 함
머지는 여전히 가능
세 가지 질문: 무엇이 실행되는가, 무엇이 막는가, 리뷰 봇은 어디에 들어가는가.

> 노트: 원문 제목: Some checks stop the merge (THE CORE IDEA). Pull request (A change to merge) → Automatic checks (Start by themselves) → Blocks the merge (Must pass first) / Only reports (Merge still possible). 하단: Three questions: what runs, what blocks, where a review bot fits.

### 14. `l19-03`

첫째 - 무엇이 실행되는가
CI는 작업 파이프라인을 실행한다
풀 리퀘스트
팀이 연 것
CI 파이프라인
정해진 단계, 매번 같은 순서
작업: 테스트 실행
$500 초과 환불은 사람에게 넘어간다
CI: 모든 변경을 매번 자동으로 검사합니다.

> 노트: 원문 제목: CI runs a pipeline of jobs (FIRST - WHAT RUNS). Pull request (Opened by the team) → CI pipeline (Fixed steps, same order every time) → Job: run tests (Refund over $500 goes to a person). 하단: CI: every change is checked automatically, each time.

### 15. `l19-04`

첫째 - 무엇이 실행되는가
각 작업은 결과를 표시로 알린다
테스트 실행
환불 테스트 통과
린터
스타일 문제, 사용하지 않는 값
풀 리퀘스트 페이지
작업마다 표시 하나
CD(continuous delivery, 지속적 전달)는 승인된 변경을 릴리스하는 단계입니다.

> 노트: 원문 제목: Each job reports back with a mark (FIRST - WHAT RUNS). Run tests (Refund test passes) / Linter (Style problems, unused value) → Pull request page (One mark per job). 하단: CD (continuous delivery) is the step that releases an approved change.

### 16. `l19-05`

둘째 - 차단 검사
차단 검사는 머지를 잠근다
개발자
풀 리퀘스트
CI 검사
필수 검사 실행
필수 테스트 실패
머지 잠김
수정 + 새 커밋
검사 재실행
차단 검사는 풀 리퀘스트를 머지하기 전에 통과해야 합니다.

> 노트: 원문 제목: A blocking check locks the merge (SECOND - BLOCKING CHECKS). Pull request → CI checks: Run required checks / CI checks → Pull request: Required test failed / Pull request → Developer: Merge locked / Developer → Pull request: Fix + new commit / Pull request → CI checks: Checks run again. 캡션: A blocking check must pass before the pull request can be merged.

### 17. `l19-06`

둘째 - 누가 정하는가
무엇으로 막을지는 팀이 정한다
차단
신뢰할 수 있고, 무시하면 위험하다. 예: 실패한 환불 테스트.
비차단
보고만 하며, 팀은 그래도 머지할 수 있다. 예: 스타일 제안.
검사가 신뢰할 수 있고, 무시했을 때의 위험이 클 때만 차단하세요.

> 노트: 원문 제목: The team picks what blocks (SECOND - WHO DECIDES). Blocking: Reliable, and ignoring it is risky. Example: the failing refund test. / Non-blocking: Only reports; the team can still merge. Example: a style suggestion. 하단: Block only when a check is reliable and the risk of ignoring it is high.

### 18. `l19-07`

셋째 - 봇이 들어가는 곳
리뷰 봇은 diff에 코멘트를 단다
풀 리퀘스트
diff
리뷰 봇
CI 작업이 하나 더
[이미지: 책상에서 일하는 개발자 일러스트]
개발자
코멘트를 읽음
대부분의 리뷰 봇은 보고만 합니다. 그리고 개발자가 읽을 때만 도움이 됩니다.

> 노트: 원문 제목: A review bot comments on the diff (THIRD - WHERE A BOT FITS). Pull request (The diff) → Review bot (One more CI job) → Developer (Reads the comments). 하단: Most review bots only report - and they help only if developers read them.

### 19. `l19-08`

정리
모든 검사에 던질 질문 하나
파이프라인
모든 풀 리퀘스트가 작업을 시작시킴
테스트, 린터
동작, 스타일과 실수
차단
머지 전에 통과해야 함
비차단
보고만 함
리뷰 봇
diff에 코멘트를 남김
머지를 막는가, 아니면 보고만 하는가?

> 노트: 원문 제목: One question for every check (RECAP). Pipeline: Every pull request starts jobs / Tests, linters: Behavior; style and mistakes / Blocking: Must pass before the merge / Non-blocking: Only reports / Review bot: Posts comments on the diff. 하단: Does it stop the merge, or does it only report?

## 20강. 오탐을 줄이는 명시적 기준 (`l20`)

20강
오탐을 줄이는 명시적 기준
슬라이드 14장

> 노트: 원문: LECTURE 20 · Explicit Criteria That Reduce False Positives · 14 slides

### 21. `l20-01`

정밀도가 중요한 이유
노이즈가 많은 봇은 무시된다
노이즈가 많은 봇
모든 것에 코멘트
아무도 안 읽음
개발자가 읽기를 멈춤
진짜 문제를 놓침
진짜 코멘트도 건너뜀
목표: 리뷰 봇이 중요한 문제만 보고한다.

> 노트: 원문 제목: A noisy bot gets ignored (WHY PRECISION MATTERS). Noisy bot: Comments on everything → Nobody reads it: Developers stop reading → Real ones missed: True comments are skipped too. 하단: Goal: the review bot reports only the problems that matter.

### 22. `l20-02`

장면
Claude가 봇으로 리뷰에 참여한다
개발자
리뷰 봇 (CI 작업)
Claude
풀 리퀘스트
diff + 프롬프트
지적 사항
변경된 줄에 코멘트
첫 프롬프트: “이 풀 리퀘스트를 리뷰하라. 심각한 문제를 찾아라. 보수적으로 판단하라.”

> 노트: 원문 제목: Claude joins the review as a bot (THE SCENE). Developer → Review bot (CI job): pull request / Review bot → Claude: diff + prompt / Claude → Review bot: findings / Review bot → Developer: comments on changed lines. 캡션: First prompt: "Review this pull request. Find serious issues. Be conservative."

### 23. `l20-03`

2주 뒤
노이즈가 진짜 버그를 가린다
리뷰 봇
모든 PR에 코멘트
[이미지: 책상에서 일하는 개발자 일러스트]
개발자들
더는 읽지 않음

> 노트: 원문 제목: Noise hides the real bug (TWO WEEKS LATER). Review bot (Comments on every PR) → Developers (Stop reading it).

### 24. `l20-04`

핵심 개념
신중함보다 명시적 기준이 낫다
보고할 것과 건너뛸 것
무엇을 문제로 볼 것인가
심각도 수준
각각 코드 예시와 함께
노이즈가 가장 많은 카테고리
고치는 동안 꺼 둔다
정밀도(precision): 보고된 지적 사항 중 실제 문제인 것의 비율.

> 노트: 원문 제목: Explicit criteria beat caution (THE MAIN IDEA). Report and skip: What counts as a problem / Severity levels: Each with a code example / Noisiest category: Switch it off while we fix it. 하단: Precision: the share of reported findings that are real problems.

### 25. `l20-05`

첫째: 보고와 건너뛰기
모호한 말은 Claude가 추측하게 만든다
“보수적으로”
한계가 어디인가?
“확신이 높을 때만”
확실한 지적만
Claude
한계를 추측함
월요일 PR
이름 관련 지적을 표시함
화요일 PR
같은 지적을 건너뜀

> 노트: 원문 제목: Vague words make Claude guess (FIRST: REPORT AND SKIP). Be conservative (Where is the limit?) / High confidence (Only sure findings) → Claude (Guesses the limit) → Monday PR (Flags a naming point) / Tuesday PR (Skips a naming point).

### 26. `l20-06`

첫째: 보고와 건너뛰기
보고할 것과 건너뛸 것을 명시한다
Review this pull request.
<report>
- Bugs that change behavior, such as a wrong amount or a wrong date
- Security problems, such as customer data written to the logs
</report>
<skip>
- Minor style, such as names and formatting
- Local patterns: code written the way this team already writes it
</skip>
명시적 기준: 각 부분이 이름 붙은 자기 섹션을 가집니다.

> 노트: 원문 제목: Name what to report and skip (FIRST: REPORT AND SKIP). 프롬프트(영문 유지) 의미: 이 풀 리퀘스트를 리뷰하라. 동작을 바꾸는 버그(잘못된 금액, 잘못된 날짜 등), 보안 문제(고객 데이터가 로그에 기록되는 것 등) 사소한 스타일(이름, 서식 등), 로컬 패턴: 이 팀이 이미 쓰는 방식으로 작성된 코드 . 캡션: Explicit criteria: each part has its own labeled section.

### 27. `l20-07`

한 카테고리 안에서
구체적인 기준이 모호한 기준보다 낫다
모호한 기준
코드 주석이 정확한지 확인하라. 오래된 단어 하나가 틀렸다면?
구체적인 기준
주석이 주장하는 동작이 코드와 모순될 때만 그 주석을 지적하라.

> 노트: 원문 제목: Specific criteria beat vague ones (INSIDE ONE CATEGORY). Vague: Check that code comments are accurate. Is one old word wrong? / Specific: Flag a code comment only when the behavior it claims contradicts the code.

### 28. `l20-08`

SHOPASSIST 예시
코드와 모순되는 주석을 지적한다
def handle_refund(order, refund_amount):
    # Refunds above $5000 go to a persn
    if refund_amount > 5000:
        send_to_human(order, refund_amount)
        return "A teammate will review this refund."
    issue_refund(order, refund_amount)
    return "Your refund is on its way."
주석은 500이라고 하는데 코드는 5000을 검사합니다: 봇이 보고합니다. 철자 실수만 있다면 건너뜁니다.

> 노트: 원문 제목: Flag comments that contradict code (A SHOPASSIST EXAMPLE). 캡션: The comment says 500, the code checks 5000: the bot reports it. A spelling mistake alone is skipped. 주의: 원본 슬라이드 코드의 주석도 “$5000”으로 적혀 있어 캡션(주석은 500)과 맞지 않습니다. 원본 그대로 옮겼습니다. persn은 의도된 철자 오류입니다.

### 29. `l20-09`

둘째: 심각도
같은 문제에 라벨이 두 가지 붙었다
월요일
높음으로 표시
화요일
낮음으로 표시
“높음”과 “낮음”은 읽는 사람마다 뜻이 다릅니다.

> 노트: 원문 제목: The same problem got two labels (SECOND: SEVERITY). Monday: Marked high / Tuesday: Marked low. 하단: "High" and "low" mean different things to different readers.

### 30. `l20-10`

둘째: 심각도
수준마다 코드 예시를 붙인다
# critical: money or customer data is at risk
amount = customer_message.refund_amount
# major: customers get a wrong result
deadline = order.order_date + timedelta(days=30)
# minor: a rare case, no money at risk
latest_order = orders[0]
정의와 구체적인 예시가 있으면 Claude가 새 코드를 실제 사례와 비교할 수 있습니다.

> 노트: 원문 제목: Each level gets a code example (SECOND: SEVERITY). 주석(영문 유지) 의미: critical = 돈이나 고객 데이터가 위험함 / major = 고객이 잘못된 결과를 받음 / minor = 드문 경우, 돈은 위험하지 않음. 캡션: A definition plus a concrete example lets Claude compare new code with something real.

### 31. `l20-11`

셋째: 노이즈가 가장 많은 카테고리
노이즈가 많은 카테고리 하나가 나머지를 가린다
코드 주석
대부분 틀림
버그 지적
대부분 맞음
보안 지적
대부분 맞음
[이미지: 책상에서 일하는 개발자 일러스트]
개발자들
봇을 덜 신뢰함

> 노트: 원문 제목: One noisy category hides the rest (THIRD: THE NOISIEST CATEGORY). Code comments (Mostly wrong) / Bug findings (Mostly right) / Security findings (Mostly right) → Developers (Trust the bot less).

### 32. `l20-12`

셋째: 노이즈가 가장 많은 카테고리
끄고, 고치고, 다시 켠다
끈다
코드 주석, 당분간
나머지는 유지
버그와 보안은 계속 켜 둠
기준을 고친다
개선하고 테스트
다시 켠다
정밀해지면

> 노트: 원문 제목: Switch off, fix, switch back on (THIRD: THE NOISIEST CATEGORY). Switch it off: Code comments, for now → Keep the rest: Bugs and security stay on → Fix the criteria: Improve them and test → Switch it on: When it is precise.

### 33. `l20-13`

기억할 것
명시적 기준이 정밀도를 만든다
모호한 말은 실패
“보수적으로”는 정밀도를 높이지 못함
보고와 건너뛰기
버그, 보안. 스타일은 아님
심각도 수준
정의와 코드 예시
노이즈가 많은 카테고리
끄고, 고치고, 다시 켠다

> 노트: 원문 제목: Explicit criteria make precision (WHAT TO REMEMBER). Vague words fail: "Be conservative" adds no precision / Report and skip: Bugs, security - not style / Severity levels: A definition and a code example / Noisy category: Switch off, fix, switch on.

### 34. `l20-14`

핵심 메시지
무엇이 문제인지 알려 줘라
이렇게 말고
봇에게 더 신중하라고 요청한다
이렇게
무엇이 문제인지 정확히 알려 준다
다음: 매번 같은 코멘트 형식, 예시 몇 개와 함께.

> 노트: 원문 제목: Tell it what counts as a problem (THE TAKEAWAY). Not this: Ask the bot to be more careful / This: Tell it exactly what counts as a problem. 하단: Next: the same comment format every time, with a few examples.

## 21강. 형식과 판단을 위한 few-shot (`l21`)

21강
형식과 판단을 위한 few-shot
슬라이드 14장

> 노트: 원문: LECTURE 21 · Few-Shot for Format and Judgment · 14 slides

### 36. `l21-01`

오늘의 목표
같은 모양, 같은 판단
같은 모양
모든 코멘트가 같은 레이아웃을 가진다.
같은 판단
같은 종류의 코드는 같은 판정을 받는다.
개발자는 더 빨리 읽고, 마음을 바꾸지 않는 봇을 신뢰합니다.

> 노트: 원문 제목: Same look, same judgment (TODAY'S GOAL). The same look: Every comment has the same layout. / The same judgment: The same kind of code gets the same verdict. 하단: Developers read faster, and trust a bot that does not change its mind.

### 37. `l21-02`

현재 위치
CI 작업이 Claude에게 리뷰를 요청한다
풀 리퀘스트
CI 리뷰 봇
Claude
새 풀 리퀘스트
diff + 프롬프트
지적 사항
코멘트
프롬프트에는 이미 보고할 것, 건너뛸 것, 심각도 수준이 들어 있습니다.

> 노트: 원문 제목: A CI job asks Claude for review (WHERE WE ARE). Pull request → CI review bot: new pull request / CI review bot → Claude: diff + prompt / Claude → CI review bot: findings / CI review bot → Pull request: comments. 캡션: The prompt already lists what to report, what to skip and the severity levels.

### 38. `l21-03`

문제
지침만으로는 들쭉날쭉하다
긴 문단
훑어보기 어려움
줄 번호 없음
문제가 어디인가?
수정안 없음
무엇을 바꿔야 하나?
월요일 vs 화요일
같은 코드, 다른 판정

> 노트: 원문 제목: Instructions alone stay uneven (THE PROBLEM). Long paragraph: Hard to scan / No line number: Where is the problem? / No fix: What should change? / Monday vs Tuesday: Same code, different verdict.

### 39. `l21-04`

해결책
좋은 예시를 2~4개 보여 준다
고정된 형식
완성된 코멘트 하나
불명확한 케이스
이유가 담긴 예시
대조 쌍
괜찮은 코드 vs 진짜 문제
프롬프트에 넣는 예시를 few-shot 예시라고 부릅니다.

> 노트: 원문 제목: Show two to four good examples (THE REMEDY). Fixed format: One complete comment / Unclear cases: An example with the reasoning / Contrasting pairs: Fine code vs a real problem. 하단: Examples placed in the prompt are called few-shot examples.

### 40. `l21-05`

첫째 역할: 형식
완성된 예시 하나가 형식을 고정한다
<example>
Location: refund_rules.py, line 88
Issue: The new refund branch has no test.
Severity: major
Fix: Add a test for refunds above $500.
</example>
Claude는 형식에 대한 설명보다 눈에 보이는 형식을 훨씬 더 안정적으로 따릅니다.

> 노트: 원문 제목: One full example fixes the format (FIRST JOB: THE FORMAT). 예시(영문 유지) 의미: 위치 refund_rules.py 88번 줄 / 문제: 새 환불 분기에 테스트가 없음 / 심각도: major / 수정: $500 초과 환불에 대한 테스트 추가. 캡션: Claude follows a shape it can see far more reliably than a description of it.

### 41. `l21-06`

둘째 역할: 불명확한 케이스
불명확한 케이스에는 이유가 필요하다
우리가 고른 조치
지적 사항을 보고하거나, 침묵한다.
그 이유
왜 이 조치인지, 그리고 역시 괜찮아 보이는 다른 조치는 왜 아닌지.

> 노트: 원문 제목: Unclear cases need the reason (SECOND JOB: UNCLEAR CASES). The action we chose: Report the finding, or stay quiet. / The reason why: Why this action, and not the other one that also looks fine.

### 42. `l21-07`

불명확한 케이스
테스트는 통과한다. 그걸로 충분한가?
<example>
Change: new branch for refunds over $500
Tests: all pass
Decision: report it
Reason: no test runs the new branch
</example>
테스트 통과는 기존 경로가 여전히 동작한다는 것만 증명합니다.

> 노트: 원문 제목: Tests pass - but is that enough? (AN UNCLEAR CASE). 예시(영문 유지) 의미: 변경: $500 초과 환불을 위한 새 분기 / 테스트: 모두 통과 / 결정: 보고한다 / 이유: 새 분기를 실행하는 테스트가 없음. 캡션: Passing tests only prove that the old paths still work.

### 43. `l21-08`

이유가 중요한 이유
이유가 있으면 Claude가 일반화한다
보고
예시 + 이유
$500 초과, 테스트 없음: 보고
다음 주의 변경
30일 반품 분기, 테스트 없음
Claude
단어가 아니라 이유를 배운다
지적 사항
새 분기를 검사하는 테스트가 없음

> 노트: 원문 제목: Reasons let Claude generalize (WHY THE REASONING MATTERS). Example + reason (Over $500, no test: report) / Next week's change (30-day return branch, no test) → Claude (Learns the reason, not the words) —reports→ Finding (No test covers the new branch).

### 44. `l21-09`

ShopAssist에도 같은 아이디어
예시로 도구 선택을 가르칠 수 있다
요청
[이미지: 노트북으로 채팅하는 고객 일러스트]
고객
내 주문 확인
Claude
어떤 도구가 맞는가?
lookup_order_by_id
주문 ID가 필요
get_customer_by_email
이메일이 필요
도구 설명이 너무 짧아서 잘못된 도구를 골랐다면? 설명부터 고치세요.

> 노트: 원문 제목: Examples can choose between tools (THE SAME IDEA FOR SHOPASSIST). Customer (Check my order) —request→ Claude (Which tool fits?) → lookup_order_by_id (Needs an order ID) / get_customer_by_email (Needs an email). 하단: Wrong tool because its description is too short? Fix the description first.

### 45. `l21-10`

셋째 역할: 대조 쌍
닮은 두 경우, 경계 하나
def find_orders(email):
    try:
        orders = search_orders(email)
    except TimeoutError:
        # the order service timed out
        return []
    return orders
결과는 같지만 의미는 다릅니다: 일치하는 항목이 없는 것은 정상이고, 타임아웃은 실패입니다.

> 노트: 원문 제목: Two lookalikes, one boundary (THIRD JOB: CONTRASTING PAIRS). 코드(영문 유지): 주문 서비스 타임아웃 시 빈 목록을 반환. 캡션: Same result, different meaning: no match is normal, a timeout is a failure.

### 46. `l21-11`

쌍이 통하는 이유
각 쪽이 경계 하나를 가르친다
허용되는 쪽
무엇을 지적하지 말아야 하는지 보여 준다. 이것이 오탐을 줄인다.
문제인 쪽
진짜 지적 사항을 남긴다. 둘이 함께 경계를 표시한다.

> 노트: 원문 제목: Each half teaches one boundary (WHY A PAIR WORKS). The acceptable half: Shows what not to flag. This cuts false positives. / The problem half: Keeps the real findings. Together, they mark the boundary.

### 47. `l21-12`

예시는 몇 개?
예시는 2~4개면 충분하다
2~4개, 목표를 정해서
실제로 실패하는 케이스를 고르고, 서로 다르게 만드세요.
20개짜리 예시 모음은 요청마다 토큰을 소비한다
Claude가 파일 이름 같은 겉모습의 세부 사항을 따라 할 수 있다
예시는 유도할 뿐이다. 반드시 지켜져야 하는 규칙에는 코드 검사가 필요하다

> 노트: 원문 제목: Two to four examples are enough (HOW MANY EXAMPLES?). Two to four, targeted: Pick the cases that actually fail, and make them different. / A gallery of twenty costs tokens on every request / Claude may copy surface details, like a file name / Examples steer. A rule that must hold needs a check in code.

### 48. `l21-13`

정리
예시는 형식과 판단을 고정한다
형식
위치, 문제, 심각도, 수정
불명확한 케이스
왜 한 조치가 이기는가
대조 쌍
괜찮은 코드 vs 진짜 문제
이유가 있으면 Claude는 처음 보는 케이스도 처리합니다.

> 노트: 원문 제목: Examples fix format and judgment (RECAP). Format: Location, issue, severity, fix / Unclear case: Why one action wins / Contrasting pair: Fine code vs a real problem. 하단: The reasoning lets Claude handle new cases it has never seen.

### 49. `l21-14`

핵심 메시지
설명하지 말고 보여 줘라
이렇게 말고
지침에 말을 점점 더 덧붙인다.
이렇게
좋은 예시 몇 개와 그 이유.
다음: 같은 아이디어로 버그 리포트에서 값을 뽑아냅니다.

> 노트: 원문 제목: Show it, do not describe it (TAKEAWAY). Not this: More and more words in the instructions. / This: A few good examples, with the reasons. 하단: Next: the same idea pulls values out of bug reports.

## 22강. 추출을 위한 few-shot 예시 (`l22`)

22강
추출을 위한 few-shot 예시
슬라이드 9장

> 노트: 원문: LECTURE 22 · Few-Shot Examples for Extraction · 9 slides

### 51. `l22-01`

FEW-SHOT 예시
같은 아이디어, 다른 일
지난 강의: 리뷰 봇
예시 몇 개가 고정된 형식과 안정된 판단을 주었다.
이번 강의: 추출
같은 아이디어로 문서에서 값을 뽑아낸다.
비어 있거나 추측한 값은 팀의 시스템에 잘못된 데이터를 보낸다.

> 노트: 원문 제목: Same idea, different job (FEW-SHOT EXAMPLES). Last lecture: the review bot / A few examples gave a fixed format and steady judgment. — This lecture: extraction / The same idea pulls values out of documents. 하단: Empty or guessed values send bad data into the team's systems.

### 52. `l22-02`

장면
분류기가 Claude에게 값을 요청한다
[이미지: 체크리스트를 작성하는 테스터 일러스트]
테스터와 지원팀
버그 리포트를 작성
버그 리포트 분류기
새 리포트를 하나씩 보냄
Claude
feature · steps · delay
맞는 대기열
리포트가 해당 팀으로 감

> 노트: 원문 제목: A triage tool asks Claude for values (THE SCENE). Testers and support (Write bug reports) → Bug report triage tool (Sends each new report) → Claude (feature · steps · delay) / triage tool → The right queue (The report reaches its team). feature, steps, delay는 뽑아낼 값(기능, 재현 단계, 지연 시간)의 필드 이름이라 영문 유지.

### 53. `l22-03`

깨지는 곳
평소와 다른 리포트에서 값이 깨진다
빈 값
리포트에 있는데 Claude가 아무것도 반환하지 않는다.
지어낸 값
리포트에 없는데 Claude가 채워 넣는다.
문서가 제각각이면 지침만으로는 부족합니다. Claude에게 올바른 추출 예시를 몇 개 보여 주세요.

> 노트: 원문 제목: Values break on unusual reports (WHERE IT BREAKS). Empty values: The report has it, but Claude returns nothing. / Invented values: The report lacks it, but Claude fills one in. 하단: When documents vary, instructions alone are not enough. Show Claude a few correct extractions.

### 54. `l22-04`

문서 구조
문단 속에 단계가 숨어 있다
Example report (a paragraph):
I opened the chat, asked about a refund,
then clicked the order link.
Example steps:
1. Open the chat
2. Ask about a refund
3. Click the order link
어디를 보라는 설명으로는 모든 레이아웃을 다룰 수 없다 - 예시는 할 수 있다.

> 노트: 원문 제목: Steps hidden in a paragraph (DOCUMENT STRUCTURE). 예시(영문 유지) 의미: 예시 리포트(문단): 채팅을 열고, 환불을 문의한 다음, 주문 링크를 눌렀다. / 예시 단계: 1. 채팅 열기 2. 환불 문의 3. 주문 링크 누르기. 캡션: Describing where to look cannot cover every layout - an example can.

### 55. `l22-05`

시험 버전
논문도 구조가 제각각이다
본문 속 출처
텍스트 안에 이름이 나옴
참고문헌
끝에 모아 둠
방법 섹션
연구를 어떻게 했는지
본문 속 방법
세부 사항이 곳곳에 흩어짐
각 구조와 값의 위치를 보여 주는 예시를 추가하세요.

> 노트: 원문 제목: Papers vary in structure too (THE EXAM VERSION). Inline citations: Names appear in the text / Bibliography: Collected at the end / Methods section: How the study was done / Methods in the text: Details scattered throughout. 하단: Add examples that show each structure and where the values sit.

### 56. `l22-06`

격식 없는 표현
거친 표현은 두 가지로 실패한다
[이미지: 헤드셋을 쓴 지원팀 담당자 일러스트]
지원 담당자
리포트를 작성
Claude
지침만 있고 예시 없음

> 노트: 원문 제목: Rough wording fails in two ways (INFORMAL WORDING). Support agent (Writes the report) → Claude (Instructions only, no examples). 두 가지 실패는 앞 슬라이드의 빈 값과 지어낸 값을 가리키는 것으로 보임(원문 슬라이드에는 도식만 있음).

### 57. `l22-07`

해결책
예시는 거친 표현도 읽어 낸다
# Example 1
report = "The chat froze for about half a minute."
result = {"delay_seconds": 30, "approximate": True}
# Example 2
report = "The chat was really slow."
result = {"delay_seconds": None}
거친 표현은 값이 되거나 - 정직하게 값 없음이 된다.

> 노트: 원문 제목: Examples read rough wording (THE FIX). 예시(영문 유지) 의미: 예시 1: "채팅이 30초쯤 멈췄다" → 지연 30초, 대략값 표시 / 예시 2: "채팅이 정말 느렸다" → 지연 값 없음(None). 캡션: Rough wording becomes a value - or an honest no value.

### 58. `l22-08`

고르는 방법
규칙 말고 올바른 예시를 보여 준다
더 강한 규칙은 안 됨
“모든 값을 항상 채워라”는 추측을 낳는다
예시 2~4개
각각 실패하는 레이아웃이나 표현을 다룬다
서로 다르게
단순한 레이아웃 하나를 복사한 예시는 가르치는 게 없다
그래도 코드로 검사
예시는 유도할 뿐 보장하지 않는다

> 노트: 원문 제목: Show correct examples, not rules (HOW TO CHOOSE). Not a stronger rule: "Always fill every value" invites guesses / Two to four examples: Each covers a layout or wording that fails / Make them differ: Copies of one simple layout teach nothing / Still check in code: Examples steer, they do not guarantee.

### 59. `l22-09`

기억할 것
실패하는 레이아웃을 Claude에게 보여 줘라
규칙보다 예시
지침만으로는 낯선 레이아웃에서 깨진다: 값이 비거나 지어낸 값이 된다.
다른 구조는 값이 어디에 있을 수 있는지 보여 준다
격식 없는 표현은 대략적인 수치를 정직하게 읽는 법을 보여 준다
서로 다른 예시 2~4개면 충분하다
평소와 다른 문서에서 실패한다면? 규칙을 더하지 말고, 올바른 추출 예시 몇 개를 보여 주세요.

> 노트: 원문 제목: Show Claude the layouts that fail (REMEMBER). Examples beat more rules: Instructions alone break on unfamiliar layouts: values come back empty or invented. / Different structures show where values can be / Informal wording shows how to read rough numbers honestly / Two to four different examples are enough. 하단: Unusual documents fail? Do not add rules - show a few correct extractions.

## 23강. 시험 관점: 기준에 관한 결정 (`l23`)

23강
시험 관점: 기준에 관한 결정
슬라이드 10장

> 노트: 원문: LECTURE 23 · Exam Lens: Criteria Decisions · 10 slides

### 61. `l23-01`

시험 관점
시험은 봇에 관한 결정 두 가지를 묻는다
개발자가 봇을 무시한다
대부분의 코멘트가 읽히지도 않고 무시된다.
한 문제, 두 등급
한 파일에서는 critical, 다른 파일에서는 minor.
답안 선택지는 신중하게 들리지만 효과가 없습니다.

> 노트: 원문 제목: The exam tests two bot decisions (EXAM LENS). Developers ignore the bot: Most comments are dismissed without reading. / One problem, two ratings: Critical in one file, minor in the other. 하단: The answer options sound careful but do not work. critical·minor는 앞 강의의 심각도 등급 이름이라 영문 유지.

### 62. `l23-02`

첫째 결정
개발자가 진짜 지적 사항까지 무시한다
풀 리퀘스트
모든 PR이 CI를 시작
리뷰 봇
변경된 줄에 코멘트
[이미지: 책상에서 일하는 개발자 일러스트]
개발자들
코멘트 10개 중 8개를 무시

> 노트: 원문 제목: Developers dismiss real findings (FIRST DECISION). Pull request (Every PR starts CI) → Review bot (Comments on changed lines) → Developers (Dismiss 8 of 10 comments).

### 63. `l23-03`

실패하는 해결책 두 가지
모호한 말로는 노이즈가 줄지 않는다
“보수적으로”
어디까지인지 Claude가 추측해야 하고, 그 추측은 PR마다 달라진다.
“확신이 높을 때만”
Claude는 아무도 신경 쓰지 않는 이름 짓기 문제도 매우 확신할 수 있다.
신뢰도로는 진짜 문제와 노이즈를 구분할 수 없습니다.

> 노트: 원문 제목: Vague words do not fix the noise (TWO FIXES THAT FAIL). "Be conservative": Claude must guess where it ends, and the guess moves between PRs. / "High confidence only": Claude can be very sure about a naming point nobody cares about. 하단: Confidence does not separate real problems from noise.

### 64. `l23-04`

가장 좋은 첫 해결책
보고할 범주와 건너뛸 범주를 명시한다
# prompt criteria for the review bot
report:
  - bugs
  - security problems
skip:
  - minor style
  - local patterns
  - code comments  # noisiest in logs
무엇을 보고하고 무엇을 건너뛸지 명시하세요. 그런 다음 노이즈가 가장 많은 범주를 잠시 끕니다.

> 노트: 원문 제목: Name report and skip categories (THE BEST FIRST FIX). 코드(영문 유지) 의미: 리뷰 봇의 프롬프트 기준 / 보고: 버그, 보안 문제 / 건너뜀: 사소한 스타일, 로컬 패턴, 코드 주석(로그에서 노이즈가 가장 많은 범주). 캡션: Name what to report and what to skip. Then pause the noisiest category.

### 65. `l23-05`

규칙
신뢰를 되찾은 뒤 다시 켠다
신뢰 붕괴
개발자가 봇을 무시
기준을 명시
보고할 것, 건너뛸 것
노이즈가 가장 많은 것을 끈다
한 범주를, 잠시 동안
다시 켠다
기준이 정밀해졌을 때

> 노트: 원문 제목: Rebuild trust, then switch back on (THE RULE). Trust collapses: Developers ignore the bot → Name the criteria: What to report, what to skip → Pause the noisiest: One category, for a while → Switch it back on: When its criteria are precise.

### 66. `l23-06`

둘째 결정
같은 실수, 서로 다른 두 라벨
파일 A
메시지에서 가져온 환불 금액
파일 B
메시지에서 가져온 환불 금액
리뷰 봇
심각도를 매김
[이미지: 책상에서 일하는 개발자 일러스트]
개발자들
어느 라벨이 맞는가?

> 노트: 원문 제목: One mistake, two different labels (SECOND DECISION). File A (Refund amount from the message) / File B (Refund amount from the message) → Review bot (Rates the severity) → Developers (Which label is true?).

### 67. `l23-07`

실패하는 해결책 두 가지
표현 바꾸기도, 더 큰 모델도 실패한다
“일관되게 평가하라”
critical과 minor의 의미가 실행할 때마다 여전히 달라진다.
더 큰 모델
여전히 각 등급에 대한 공통 정의가 없다.

> 노트: 원문 제목: Wording and bigger models fail (TWO FIXES THAT FAIL). "Rate consistently": Critical and minor still mean different things on each run. / A bigger model: It still has no shared definition of each level.

### 68. `l23-08`

가장 좋은 첫 해결책
각 등급을 실제 코드로 정의한다
severity:
  critical:
    means: money or customer data at risk
    example: refund = msg["amount"]
  major:
    means: wrong result, no money at risk
    example: total = price * qty  # tax missing
  minor:
    means: style or naming only
    example: tmp2 = items
일관된 심각도: 정의된 등급, 그리고 실제 코드로 보여 준 각 등급.

> 노트: 원문 제목: Define each level with real code (THE BEST FIRST FIX). 코드(영문 유지) 의미: critical = 돈이나 고객 데이터가 위험함, 예: 메시지의 금액을 그대로 환불 / major = 결과가 틀리지만 돈은 위험하지 않음, 예: 세금이 빠진 합계 / minor = 스타일이나 이름 짓기만, 예: tmp2 = items. 캡션: Consistent severity: defined levels, and each level shown with real code.

### 69. `l23-09`

핵심 정리
모호한 말보다 기준
모호한 말
“보수적으로”는 정밀도를 더하지 않는다
이름 붙인 범주
이것은 보고, 저것은 건너뜀
노이즈가 많은 것은 끈다
노이즈는 나머지에 대한 신뢰까지 깎는다
코드로 보여 준 등급
각각 정의와 예시 하나
더 큰 모델이나 더 강한 표현은 빠진 기준을 대신할 수 없습니다.

> 노트: 원문 제목: Criteria beat vague words (MAIN POINTS). Vague words: "Be conservative" adds no precision / Named categories: Report these, skip those / Pause noisy ones: Noise costs trust in the rest / Levels with code: A definition and an example each. 하단: A bigger model or stronger wording cannot replace a missing criterion.

### 70. `l23-10`

같은 규칙, 다른 곳
같은 규칙으로 버그 리포트를 분류한다
# bug-report sorter prompt
priority:
  high:
    means: users cannot log in or pay
    example: "Checkout fails with an error"
  low:
    means: cosmetic, a workaround exists
    example: "Typo on a button label"
모호한 단어를 이름 붙인 기준과 구체적인 예시로 바꾸세요.

> 노트: 원문 제목: The same rule sorts bug reports (SAME RULE ELSEWHERE). 코드(영문 유지) 의미: 버그 리포트 분류기 프롬프트 / 우선순위 high = 사용자가 로그인하거나 결제할 수 없음, 예: "결제가 오류로 실패함" / low = 겉모습 문제, 우회 방법이 있음, 예: "버튼 라벨의 오타". 캡션: Replace the vague word with a named criterion and a concrete example.

## 24강. 시험 관점: 예시에 관한 결정 (`l24`)

24강
시험 관점: 예시에 관한 결정
슬라이드 9장

> 노트: 원문: LECTURE 24 · Exam Lens: Example Decisions · 9 slides

### 72. `l24-01`

시험 관점: 예시에 관한 결정
결정 둘, 해결책 하나: 예시
들쭉날쭉한 형식
지적 사항이 서로 다른 모양으로 돌아온다.
좋은 코드가 지적됨
허용되는 코드가 계속 지적된다.
더 강한 표현과 더 큰 모델은 그럴듯하게 들립니다. 해결책은 좋은 예시 몇 개입니다.

> 노트: 원문 제목: Two decisions, one fix: examples (EXAM LENS: EXAMPLE DECISIONS). Uneven format: Findings come back in different shapes. / Good code flagged: Acceptable code keeps getting flagged. 하단: Louder wording and a bigger model sound convincing. A few good examples are the fix.

### 73. `l24-02`

결정 1: 들쭉날쭉한 형식
지적 사항 다섯 개 중 하나가 형식을 깬다
리뷰 봇
CI 작업
개발자
풀 리퀘스트 diff
지적 사항
42번 줄에 코멘트
지적 사항: 줄 번호 없음
지적 사항: 긴 문단
지적 사항: 수정안 없음
지적 사항에 줄 번호가 없으면 CI 작업은 올바른 줄에 코멘트를 달 수 없습니다.

> 노트: 원문 제목: One finding in five breaks format (DECISION 1: UNEVEN FORMAT). CI job → Review bot: pull request diff / Review bot → CI job: finding / CI job → Developer: comment on line 42 / Review bot → CI job: finding: no line number / finding: long paragraph / finding: no fix. 캡션: The CI job cannot post a comment on the right line when the finding has no line.

### 74. `l24-03`

결정 1: 실패하는 해결책 두 가지
더 강하게, 더 크게: 둘 다 실패한다
MODEL = "claude-opus-5-5"
PROMPT = """Review the diff.
Report each finding with a location,
an issue, a severity and a suggested fix.
You MUST ALWAYS include the line number.
"""
두 해결책 모두 원인을 그대로 둡니다: Claude에게는 형식에 대한 설명만 있고, 따라 할 모양이 없습니다.

> 노트: 원문 제목: Louder and bigger both fail (DECISION 1: TWO FIXES THAT FAIL). 코드(영문 유지) 의미: 더 큰 모델로 바꾸고, 프롬프트에 "diff를 리뷰하라. 각 지적 사항을 위치, 문제, 심각도, 수정 제안과 함께 보고하라. 반드시 항상 줄 번호를 포함하라."라고 대문자로 강조. 캡션: Both fixes leave the cause in place: Claude has a description of the format, but no shape to copy.

### 75. `l24-04`

결정 1: 가장 좋은 방법
더 많은 설명보다 예시
Example 1
location: line 42, apply_discount()
issue: the discount is applied after tax
severity: high
fix: apply the discount before tax
Example 2
location: line 7, load_cart()
issue: an empty cart raises an error
severity: medium
fix: return an empty cart object
규칙: 자세한 지침에도 형식이 들쭉날쭉하면, 설명을 멈추고 보여 주세요.

> 노트: 원문 제목: Examples beat more description (DECISION 1: THE BEST MOVE). 예시(영문 유지) 의미: 예시 1 - 위치: 42번 줄 apply_discount() / 문제: 할인이 세금 뒤에 적용됨 / 심각도: high / 수정: 세금 전에 할인 적용. 예시 2 - 위치: 7번 줄 load_cart() / 문제: 빈 장바구니에서 오류 발생 / 심각도: medium / 수정: 빈 장바구니 객체 반환. 캡션: Rule: when detailed instructions still give an uneven format, stop describing it and show it.

### 76. `l24-05`

결정 2: 허용되는 코드가 지적됨
정상적인 빈 결과가 지적된다
리뷰됨
코멘트
search_orders
일치 없음: [] 반환
리뷰 봇
오류 처리 누락
[이미지: 책상에서 일하는 개발자 일러스트]
개발자들
코멘트 12개 무시
팀이 의도적으로 정한 동작입니다: 일치하는 항목이 없는 것은 정상적인 성공 결과입니다.

> 노트: 원문 제목: A valid empty result gets flagged (DECISION 2: ACCEPTABLE CODE FLAGGED). search_orders (No match: returns []) —reviewed→ Review bot (Missing error handling) —comment→ Developers (12 comments dismissed). 하단: The team chose this on purpose: no match is a normal, successful result.

### 77. `l24-06`

결정 2: 실패하는 해결책 두 가지
넓은 금지와 목록은 둘 다 실패한다
PROMPT = """Review the diff.
Flag functions with missing error handling.
Report the location, issue, severity and fix.
Allowed to return []: search_orders,
find_customer, list_returns.
"""
넓은 금지는 진짜 실패를 숨기고, 이름 목록은 다음에 새로 생기는 함수를 놓칩니다.

> 노트: 원문 제목: A wide ban and a list both fail (DECISION 2: TWO FIXES THAT FAIL). 코드(영문 유지) 의미: "diff를 리뷰하라. 오류 처리가 빠진 함수를 지적하라. 위치, 문제, 심각도, 수정을 보고하라. []를 반환해도 되는 함수: search_orders, find_customer, list_returns." 캡션: A wide ban hides real failures; a list of names misses the next new function.

### 78. `l24-07`

결정 2: 가장 좋은 방법
쌍을 보여 주고 이유를 말한다
<example verdict="acceptable">
Code: the search finds no match, returns [].
Why: no match is a normal result. Skip it.
</example>
<example verdict="problem">
Code: a timeout is caught, [] is returned.
Why: a failure is hidden as success. Report it.
</example>
규칙: 허용되는 코드를 그와 닮은 진짜 문제 옆에 놓고, 왜 다른지 말하세요.

> 노트: 원문 제목: Show the pair and say why (DECISION 2: THE BEST MOVE). 예시(영문 유지) 의미: 허용 - 코드: 검색 결과가 없어 []를 반환 / 이유: 일치 없음은 정상 결과이므로 건너뜀. 문제 - 코드: 타임아웃을 잡고 []를 반환 / 이유: 실패가 성공으로 숨겨지므로 보고함. 캡션: Rule: show acceptable code next to the real problem it looks like, and say why they differ.

### 79. `l24-08`

핵심 정리
양으로 못 고치는 것을 예시가 고친다
외치지 말고 보여 줘라
반복되는 들쭉날쭉하거나 틀린 출력에는 더 큰 목소리가 아니라 예시가 필요하다.
들쭉날쭉한 형식: 완성된 예시 2~4개
대문자나 더 큰 모델: 원인은 그대로
지적되는 패턴: 이유가 담긴 대조 쌍
넓은 금지나 이름 목록: 문제를 숨기고 새 코드를 놓친다

> 노트: 원문 제목: Examples fix what volume cannot (MAIN POINTS). Show it, don't shout: Repeated uneven or wrong output needs examples, not louder words. / Uneven format: 2-4 complete examples / Capitals or a bigger model: the cause stays / Flagged pattern: a contrasting pair with reasoning / Wide ban or name list: hides problems, misses new code.

### 80. `l24-09`

추출에도 같은 규칙
같은 규칙이 추출을 고친다
읽음
채움
문서
레이아웃이 제각각
추출 프롬프트
“모든 필드를 항상 채워라”
결과
total: 비었거나 추측함
지침을 더 강하게 만들지 마세요. 목표를 정한 예시 2~4개를 이유와 함께 보여 주세요.

> 노트: 원문 제목: The same rule fixes extraction (THE SAME RULE IN EXTRACTION). Documents (Different layouts) —reads→ Extraction prompt ("Always fill every field") —fills→ Result (total: empty or guessed). 하단: Do not make the instructions louder. Show 2-4 targeted examples, with the reasoning. 원문의 문서 일러스트는 해상도가 낮아 아이콘으로 대체.
