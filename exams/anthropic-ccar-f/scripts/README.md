# CCAR-F 강의 스크립트

슬라이드 강의 내레이션 원문과 한국어 번역을 보관한다. 이론 노트(`theory/`)를 만들기 위한 원자료라서 사이트에는 나오지 않는다(사이트는 `theory/`와 `guides/`만 읽는다).

## 구조

```
scripts/
  en/<번호> <영어 제목>.md   # 원문
  ko/<번호> <한국어 제목>.md # 번역 (같은 번호끼리 짝)
```

- 번호는 강의 번호를 두 자리로 쓴다(`03`, `04` …). 정렬과 원문·번역 짝 맞추기용이다.
- 파일 이름은 강의 제목을 그대로 쓰되, 파일 이름에 쓸 수 없는 `:`는 ` - `로 바꾼다. 첫 줄 `#` 제목에는 원래 제목을 그대로 둔다.
- 실습 강의(제목이 `Practice:`로 시작, 코드를 따라 치는 강의)는 파일 맨 위에 `lab: true` frontmatter를 붙인다.
  - 예외: 제목이 `Practice:`로 시작하지 않아도 원문을 받을 때 실습으로 지정된 강의(14, 17, 28, 30, 38, 51, 53, 62강)도 `lab: true`다. 코드를 따라 치는 단계가 없는 판단 연습(예: 53강 에스컬레이션 판단)도 여기에 포함한다.
- 제목 캡처가 없어 임시 제목을 붙인 파일은 `title_provisional: true` frontmatter로 표시하고, 실제 제목을 받으면 파일 이름과 함께 고친다.
- 원문은 단어를 바꾸지 않는다. 자막처럼 끊긴 줄만 문장·문단으로 이어 붙인다.
- 번역 용어는 [`docs/translation-glossary.md`](../../../docs/translation-glossary.md)를 참고하되 자연스러운 한국어를 우선한다.

## 섹션

Udemy 강의의 섹션 이름과 강의 번호 범위.

| 섹션 | 강의 | 이름 |
| --- | --- | --- |
| 1 | 3~8 | Foundations |
| 2 | 9~15 | Working with the Claude API |
| 3 | 16~21 | Prompt Engineering and Evaluation |
| 4 | 22~33 | Structured Output and Extraction |
| 5 | 34~43 | Tools, MCP, and Agentic Loop |
| 6 | 44~54 | The Support Agent |
| 7 | 55~66 | Multi-Agent Systems |
| 8 | 67~87 | Claude Code Configuration and Workflows |
| 9 | 88~94 | Claude Code in CI and Review Architectures |
| 10 | 95~98 | Exam Readiness (All Domains) |
| 11 | 99~102 | Beyond the Exam (Bonus, not on the Exam) |
| 12 | 103~106 | Basics for Non-Developers |
| 13 | 107~117 | Instructor Interview: From Exam Prep to Production Practice |

- 98강은 강의가 아니라 자료 안내(CCAR-F Quick Reference PDF)다.
- 99강(How Exam Questions Reason)은 내용상 97강에서 바로 이어지고 시험 대비 내용이지만, 받은 섹션 범위대로 11에 둔다.
