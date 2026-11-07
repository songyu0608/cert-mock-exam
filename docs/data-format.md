# 문제 데이터 형식

시험 1개 = `exams/<시험 id>/` 폴더 1개. 폴더 안에 `exam.json`(시험 설정)과 `questions.json`(문항 목록)을 둔다.
형식의 기준은 [`src/data/schema.ts`](../src/data/schema.ts)이고, `pnpm validate`(빌드에 포함)가 모든 시험을 검사한다. 틀리면 빌드가 실패한다.

```
exams/
  aws-aib-c01/
    exam.json
    questions.json
  anthropic-ccar-f/
    exam.json
    questions.json
    guides/official-guide.html   # 선택: 읽기 자료
    theory/ko/01 이론/1.1 ….md   # 선택: 이론 노트(Obsidian 보관함, 보관함 id별 폴더)
  anthropic-ccar-p/
    exam.json                    # questions.json 없음: 읽기 자료만 있는 시험
    theory/ko/…, theory/ja/…
```

`questions.json`이 없는 시험은 읽기 자료(가이드·이론)만 있는 시험으로 본다. `guides`나 `theories`가 하나는 있어야 하고, 모의고사 목록에는 나오지 않으며 시험 주소(`/exam/<id>`)로 들어오면 읽기 자료로 안내한다. `exam.json`의 다른 필드(도메인, `mock` 등)는 그대로 채워 둔다.

## exam.json

| 필드           | 필수   | 의미                                                                                                                                                                                                                                                                                                  |
| -------------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`           | 예     | 폴더 이름과 같아야 함. 소문자·숫자·하이픈                                                                                                                                                                                                                                                             |
| `vendor`       | 예     | 목록에서 묶는 기준(`aws`, `github`, `anthropic` 등)                                                                                                                                                                                                                                                   |
| `code`, `name` | 예     | 시험 코드와 이름                                                                                                                                                                                                                                                                                      |
| `level`        | 아니요 | 예: `Foundational`                                                                                                                                                                                                                                                                                    |
| `domains[]`    | 예     | `{ id: "1", name, weight }`. `weight`는 실전 모드 출제 비율(%)                                                                                                                                                                                                                                        |
| `mock`         | 예     | `{ questions, minutes, passPercent, questionChoices, scenarios? }`. `questionChoices`(예: `[50, 65, 85]`)가 있으면 문항 수를 고르고 시간은 비례                                                                                                                                                       |
| `types`        | 예     | 이 시험에서 허용하는 문항 유형. 목록에 없는 유형이 있으면 검사 실패                                                                                                                                                                                                                                   |
| `scoring`      | 아니요 | `all-or-nothing`(기본) 또는 `partial`                                                                                                                                                                                                                                                                 |
| `facts[]`      | 아니요 | 시험 홈 상단 요약 `{ value, label }`                                                                                                                                                                                                                                                                  |
| `sources[]`    | 아니요 | 시험 형식 출처 `{ label, url, checked }`                                                                                                                                                                                                                                                              |
| `notes`        | 아니요 | 시험 홈 설명                                                                                                                                                                                                                                                                                          |
| `scenarios[]`  | 아니요 | 문항이 딸린 공통 지문 `{ id: "1", name, description }`. 문항의 `scenarioId`가 가리킨다                                                                                                                                                                                                                |
| `sets[]`       | 아니요 | 회차 `{ id: "1", name, scenarios? }`. 실전 모드는 회차를 골라 시작한다. `scenarios`(시나리오 id 목록)가 없으면 무작위로 고른다                                                                                                                                                                        |
| `guides[]`     | 아니요 | 읽기 자료 `{ id, title, description? }`. 파일은 `guides/<id>.html`(완결된 HTML 한 장). 첫 화면 "가이드" 탭과 시험 홈에 링크가 생긴다                                                                                                                                                                  |
| `theories[]`   | 아니요 | 이론 노트 보관함 `{ id, title, description?, home, lang? }`. 파일은 `theory/<id>/<폴더>/<노트>.md`(Obsidian 보관함 그대로), `home`은 첫 화면 노트 이름, `lang`(`ko` 기본, `ja`, `en`)은 본문 언어. 한 시험에 여러 개(예: 한국어판·일본어판)를 둘 수 있다. 첫 화면 "이론" 탭과 시험 홈에 링크가 생긴다 |

## questions.json

모든 문항의 공통 필드:

| 필드          | 필수   | 의미                                                                                                    |
| ------------- | ------ | ------------------------------------------------------------------------------------------------------- |
| `id`          | 예     | 바뀌지 않는 문항 번호(예: `aif-0142`). 기록·오답 목록이 이 번호로 연결되므로 한 번 정하면 바꾸지 않는다 |
| `domain`      | 예     | 세부 도메인(예: `1.3`). 첫 숫자가 `exam.json`의 도메인 id                                               |
| `type`        | 예     | 아래 7가지 중 하나                                                                                      |
| `stem`        | 예     | 문제 본문(마크다운)                                                                                     |
| `explanation` | 아니요 | 문항 전체 해설(마크다운)                                                                                |
| `origin`      | 예     | `claude` 또는 `user`                                                                                    |
| `note`        | 아니요 | 참고(예: "수치는 연습용 가상 값")                                                                       |
| `scenarioId`  | 아니요 | `exam.json` `scenarios`의 id. 문항 위에 시나리오 지문을 보여 준다                                       |
| `set`         | 아니요 | `exam.json` `sets`의 id. `sets`가 있는 시험은 모든 문항에 필요                                          |

유형별 답 부분:

| `type`             | 필드                                                                      | 메모                                                              |
| ------------------ | ------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| `single`           | `options[]`: `{ text, correct, why? }`, `shuffle?`                        | 정답 정확히 1개                                                   |
| `multi`            | `options[]` 같음, `shuffle?`                                              | 정답 2개 이상. "N개를 고르십시오"는 자동 표시                     |
| `ordering`         | `items[]`(정답 순서), `distractors[]?`                                    | 오답 항목이 없으면 위/아래로 옮기기, 있으면 자리마다 고르기       |
| `matching`         | `prompts[]`: `{ text, answer }`, `responses[]`: `{ key, text }`, `reuse?` | `answer`는 `responses`의 `key`. 답이 없는 `responses`는 함정 보기 |
| `yesno`            | `statements[]`: `{ text, answer, why? }`                                  | Microsoft 예/아니요 표                                            |
| `case`             | `scenario`, `questions[]`                                                 | 하위 문항은 위 5가지 유형. 하위 문항마다 채점                     |
| `problem-solution` | `scenario`, `goal`, `solutions[]`: `{ text, meetsGoal, why? }`            | 해결책마다 채점. 실전 모드에서 답하고 넘어가면 돌아갈 수 없음     |

`shuffle`은 기본 `true`. "모두 해당" 같은 보기가 있으면 `false`로 둔다.

## 이론 노트

`theory/` 아래 마크다운은 Obsidian 보관함을 그대로 넣는다(Prettier도 건드리지 않는다). 화면에 그릴 때만 다음을 바꾼다. 코드는 `src/lib/theory.ts`.

- 머리말(`aliases`, `tags` 등) → 본문 위 속성 줄. `aliases`는 노트 찾기에도 쓴다
- `[[노트]]`, `[[노트|보일 글자]]` → 사이트 안 링크(`/theory/<시험 id>/<보관함 id>/<노트>`). 노트 이름은 한 보관함 안에서 폴더와 상관없이 겹치면 안 된다(`pnpm validate`가 검사). 예전 주소 `/theory/<시험 id>/<노트>`는 첫 보관함의 노트로 연다
- `[[노트#제목]]` → 그 노트의 제목 위치로 가는 링크. 제목 id는 제목 글자의 공백을 `-`로 바꾼 것
- `> [!type]` callout → 상자, `> [!type]-`는 접는 상자
- `질문::답` 한 줄(Spaced Repetition 플래시카드) → 눌러서 답을 보는 카드
- 문단 안 줄바꿈 → 줄바꿈 그대로(Obsidian 기본값)

## 시나리오형 시험

`mock.scenarios`가 있으면 실전 모드는 도메인 비중 대신 시나리오로 출제한다(예: CCAR-F는 6개 중 4개 × 15문항).

- 시나리오마다 `mock.questions / mock.scenarios`개를 고르고, 시나리오 순서대로 묶어 낸다. 묶음 안의 순서는 섞는다.
- `sets`가 있으면 회차를 골라 시작하고, 그 회차의 문항만 쓴다. 회차의 `scenarios`가 있으면 그 시나리오로 고정, 없으면 무작위로 고른다.
- 연습 모드는 회차와 도메인으로 고른다.
- `pnpm validate`는 시나리오·회차 id와, 고를 수 있는 시나리오마다 문항이 충분한지 검사한다.

## 채점

- `all-or-nothing`: 문항의 모든 부분이 맞아야 1점(AWS 공식 규칙과 같음).
- `partial`: 맞힌 비율만큼 점수. 복수 선택은 오답을 하나라도 고르면 0점.
- 사례 연구는 하위 문항마다, 문제-해결 세트는 해결책마다 1문항으로 센다.

## 기존 아티팩트 옮기기

```
pnpm convert <아티팩트.html> <시험 id> <문항 id 접두어> [vendor] [lang]
pnpm convert ~/Downloads/aif-c01.html aws-aif-c01 aif aws
```

아티팩트의 `<script id="cfg">`와 `<script id="data">`를 읽어 `exams/<시험 id>/`에 쓴다. 정답 규칙은 아티팩트 채점 코드와 같다(단일은 첫 보기, 복수는 앞에서 `k`개, 순서는 원래 순서, 연결은 `pr[i]`의 답이 `o[i]`).
시나리오형 아티팩트는 `cfg.scenarios`·`cfg.sets`·`examScen`·`perScen`과 문항의 `sc`·`set`을 시나리오·회차로 옮긴다.
