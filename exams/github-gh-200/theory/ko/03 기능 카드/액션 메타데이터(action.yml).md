---
aliases: ["action.yml", "Metadata syntax", "branding", "메타데이터 파일"]
tags: ["gh-200", "기능카드", "도메인3"]
도메인: 3
목표: ["3.3"]
중요도: "상"
---
# 액션 메타데이터(action.yml)

> [!summary] 한 줄 정의
> 모든 액션은 루트(또는 액션 디렉터리)에 `action.yml`(또는 action.yaml) 메타데이터 파일이 있어야 한다. 이름, 설명, 입력, 출력, 실행 방식을 정의한다.

**English** Metadata syntax for actions

## 시험 트리거
- "액션에 필수 입력 추가"
- "Marketplace 아이콘과 색"
- "입력 이름을 바꾸며 이전 이름 경고"

## 핵심
- 필수: name, description, runs. 선택: author, inputs, outputs, branding.
- 파일 이름은 action.yml(권장) 또는 action.yaml.
- inputs.<id>: description(필수), required, default, deprecationMessage. `required: true`여도 입력이 없을 때 자동으로 오류가 나지는 않는다.
- 입력은 INPUT_<ID>(대문자, 공백→_) 환경 변수로 전달(JS·Docker). 복합은 inputs 컨텍스트.
- outputs: JS·Docker는 description, 복합은 description + value.
- branding: icon(Feather 아이콘 이름), color(white, black, yellow, blue, green, orange, red, purple, gray-dark).
- 디렉터리 구조〔해석〕: 공개 배포용은 리포지토리 루트에 action.yml, README, 코드(또는 Dockerfile). 같은 리포의 액션은 .github/actions/<이름>/action.yml이 흔한 관례.

## 오답 함정
> [!warning] 오답이 되기 쉬운 선택지
> - required: true면 입력 누락 시 자동 실패한다는 선택지 → 자동 오류 아님
> - action.json도 메타데이터 파일로 인정된다는 선택지 → action.yml 또는 action.yaml

## 관련
- [[사용자 지정 액션 유형]] · [[Marketplace 게시]] · [[JavaScript 액션]] · [[복합 액션]]

**공식 목표**: [[3 액션 작성과 유지 관리#목표 3.3|3.3]]  
**근거**: [Metadata syntax reference](https://docs.github.com/en/actions/reference/workflows-and-actions/metadata-syntax) · [About custom actions](https://docs.github.com/en/actions/concepts/workflows-and-actions/custom-actions)

## 셀프 체크
> [!question]- action.yml 필수 키 3개는?
> name, description, runs

> [!question]- 입력 이름이 my input이면 환경 변수 이름은?
> INPUT_MY_INPUT
