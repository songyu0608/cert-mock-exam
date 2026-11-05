# 문제 데이터 형식

시험 1개 = `exams/<시험 id>/` 폴더 1개. 폴더 안에 `exam.json`(시험 설정)과 `questions.json`(문항 목록)을 둔다.
형식의 기준은 [`src/data/schema.ts`](../src/data/schema.ts)이고, `pnpm validate`(빌드에 포함)가 모든 시험을 검사한다. 틀리면 빌드가 실패한다.

```
exams/
  aws-aib-c01/
    exam.json
    questions.json
```

## exam.json

| 필드           | 필수   | 의미                                                                                                                                |
| -------------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------- |
| `id`           | 예     | 폴더 이름과 같아야 함. 소문자·숫자·하이픈                                                                                           |
| `vendor`       | 예     | 목록에서 묶는 기준(`aws`, `github`, `anthropic` 등)                                                                                 |
| `code`, `name` | 예     | 시험 코드와 이름                                                                                                                    |
| `level`        | 아니요 | 예: `Foundational`                                                                                                                  |
| `domains[]`    | 예     | `{ id: "1", name, weight }`. `weight`는 실전 모드 출제 비율(%)                                                                      |
| `mock`         | 예     | `{ questions, minutes, passPercent, questionChoices }`. `questionChoices`(예: `[50, 65, 85]`)가 있으면 문항 수를 고르고 시간은 비례 |
| `types`        | 예     | 이 시험에서 허용하는 문항 유형. 목록에 없는 유형이 있으면 검사 실패                                                                 |
| `scoring`      | 아니요 | `all-or-nothing`(기본) 또는 `partial`                                                                                               |
| `facts[]`      | 아니요 | 시험 홈 상단 요약 `{ value, label }`                                                                                                |
| `sources[]`    | 아니요 | 시험 형식 출처 `{ label, url, checked }`                                                                                            |
| `notes`        | 아니요 | 시험 홈 설명                                                                                                                        |

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

## 채점

- `all-or-nothing`: 문항의 모든 부분이 맞아야 1점(AWS 공식 규칙과 같음).
- `partial`: 맞힌 비율만큼 점수. 복수 선택은 오답을 하나라도 고르면 0점.
- 사례 연구는 하위 문항마다, 문제-해결 세트는 해결책마다 1문항으로 센다.

## 기존 아티팩트 옮기기

```
pnpm convert <아티팩트.html> <시험 id> <문항 id 접두어> [vendor]
pnpm convert ~/Downloads/aif-c01.html aws-aif-c01 aif aws
```

아티팩트의 `<script id="cfg">`와 `<script id="data">`를 읽어 `exams/<시험 id>/`에 쓴다. 정답 규칙은 아티팩트 채점 코드와 같다(단일은 첫 보기, 복수는 앞에서 `k`개, 순서는 원래 순서, 연결은 `pr[i]`의 답이 `o[i]`).
