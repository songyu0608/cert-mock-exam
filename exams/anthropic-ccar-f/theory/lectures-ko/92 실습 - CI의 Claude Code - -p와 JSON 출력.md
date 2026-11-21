---
lab: true
---

# 92. 실습: CI의 Claude Code - -p와 JSON 출력

앞에서는 프로젝트 규칙을 `CLAUDE.md`와 도구 코드용 규칙에 적었고, 우리가 지켜보는 동안 Claude Code가 그 규칙을 따랐습니다. CI 파이프라인에서는 아무도 지켜보지 않습니다. **CI**는 모든 변경을 머지하기 전에 검사하는 자동 파이프라인입니다. 이번 노트에서는 Claude Code가 그곳의 리뷰어가 됩니다. 모든 변경을 우리 규칙에 비추어 검사하고, 나쁜 변경은 파이프라인을 멈춥니다.

## 전체 흐름

1. 파이프라인이 변경마다 짧은 스크립트를 실행합니다.
2. 스크립트가 diff, 즉 변경 자체를 받아 print 모드(`-p`)의 Claude Code에 줍니다.
3. Claude Code가 정해진 모양으로 판정을 돌려줍니다. approve(승인) 또는 request changes(변경 요청)입니다.
4. 스크립트가 판정을 읽고 종료 코드로 끝납니다. 0이면 파이프라인이 계속되고, 1이면 멈춥니다.

두 단계로 만듭니다. 먼저 리뷰, 그다음 종료 코드입니다.

아래 코드 블록은 스크립트 설명에 맞춘 예시이며, 강의 화면의 원본 코드와 세부 표현은 다를 수 있습니다.

## 준비: print 모드와 스키마

CI에는 입력할 터미널도, allow를 눌러 줄 사람도 없습니다. 그래서 print 모드를 씁니다. 옵션 두 개가 더해지면 답을 프로그램이 읽기 쉬워집니다.

| 옵션 | 효과 |
| --- | --- |
| `--output-format json` | 답을 JSON 객체 하나로 감쌉니다. |
| `--json-schema` | 우리가 정한 모양으로 답을 요청합니다. |

모양은 이미 스키마 파일에 있습니다. 필드가 두 개인 객체입니다. `verdict`는 문자열이고 approve 또는 request changes만 될 수 있습니다. `reason`도 문자열입니다. 두 필드 모두 필수입니다.

```json
{
  "type": "object",
  "properties": {
    "verdict": { "type": "string", "enum": ["approve", "request_changes"] },
    "reason": { "type": "string" }
  },
  "required": ["verdict", "reason"]
}
```

## 리뷰할 변경 만들기

스크립트 전에 리뷰할 변경이 필요합니다. 일부러 규칙을 어기는 변경을 만듭니다. 백엔드 도구가 있는 MCP 서버 파일을 열고, 서버를 시작하는 부분 위에 새 도구를 추가합니다. 데코레이터, 주문 ID를 받는 `cancel_order` 함수, 짧은 설명입니다. 대괄호로 주문을 조회하고, 그다음 자체 오류를 던집니다.

```python
@mcp.tool()
def cancel_order(order_id: str) -> dict:
    """Cancel an order."""
    order = ORDERS[order_id]
    raise ValueError("Cancelling is not supported yet")
```

이 도구는 일부러 규칙을 어깁니다. 리뷰가 잡아내는지 봅시다.

`git diff`는 아직 git에 추가되지 않은 파일 변경을 보여 줍니다. 대시 두 개와 따옴표 안의 `*.py`는 Python 파일로만 범위를 좁힙니다. 짧은 요약을 위해 `--stat` 옵션으로 터미널에서 실행합니다.

```bash
git diff --stat -- "*.py"
```

파일 하나, 서버가 바뀌었고 새 줄이 일곱 개입니다. 이것이 CI 단계가 리뷰할 변경입니다.

## 1단계: 리뷰

이제 아직 비어 있는 스크립트 `ci_review.sh`입니다. 스크립트의 첫 부분은 리뷰 자체입니다. diff를 받아 Claude Code에 묻습니다.

- 첫 줄은 이 파일을 실행할 프로그램, 셸을 지정합니다. 주석은 이 단계가 하는 일을 적습니다. Claude Code가 프로젝트 규칙에 비추어 변경을 리뷰한다.
- 같은 `git diff`로 이번에는 변경 전체를 받아 `DIFF` 변수에 둡니다. 실제 파이프라인에서는 풀 리퀘스트의 변경입니다.
- `claude -p`와 따옴표 안의 프롬프트: 이 diff를 프로젝트의 도구 규칙에 비추어 리뷰하라. 빈 줄 뒤에 diff 자체가 프롬프트에 들어가고, 거기서 따옴표를 닫습니다. 줄 끝의 기호는 셸에 명령이 계속된다고 알립니다.
- `--output-format json`: Claude Code가 답, 비용, 세션이 담긴 JSON 객체 하나를 출력합니다.
- `--json-schema`와 스키마 파일의 텍스트: `cat`이 파일을 읽고, 달러 기호와 괄호가 그 텍스트를 이 자리에 넣습니다.
- 모든 것을 `review.json` 파일에 저장합니다.

그다음 짧은 Python 프로그램이 그 파일을 읽고 판정을 출력합니다. `python -c`는 따옴표 안에 준 코드를 실행합니다. `json`을 import하고, `review.json`을 불러와 `structured_output` 필드를 꺼냅니다. Claude Code가 스키마 모양의 답을 넣는 곳입니다. 판정, 대시, 이유를 출력하므로, 파이프라인 로그를 읽는 사람이 둘 다 봅니다.

```bash
#!/bin/sh
# Claude Code reviews the change against the project rules
DIFF=$(git diff -- "*.py")

claude -p "Review this diff against the project's tool conventions.

$DIFF" \
  --output-format json \
  --json-schema "$(cat review_schema.json)" > review.json

python -c "
import json
result = json.load(open('review.json'))['structured_output']
print(result['verdict'], '-', result['reason'])
"
```

실행합니다. Claude Code가 여기서 에이전트처럼 일하므로 시간이 조금 걸립니다.

그동안 안에서 일어나는 일은 이렇습니다.

1. 스크립트가 diff가 든 프롬프트와 스키마를 Claude Code에 넘깁니다.
2. Claude Code가 프로젝트 파일과 도구 코드용 규칙을 읽으므로, 규칙을 압니다.
3. 변경을 제자리에서 보려고 서버 파일을 열 수도 있습니다.
4. diff를 규칙과 대조하고, 우리 모양대로 판정과 이유가 담긴 JSON 객체 하나를 돌려줍니다.

판정은 **request changes**입니다. 이유에는 새 도구의 문제가 나열돼 있습니다.

- 오류를 던집니다. 우리 도구는 절대 예외를 던지지 않고, 대신 구조화된 오류를 반환해야 합니다.
- 대괄호 조회는 모르는 주문에서 충돌합니다. 하지만 찾지 못한 것은 오류가 아니라 데이터입니다.
- 도구가 호출을 로그로 남기지 않습니다. 도구 코드용 규칙이 요구하는 일입니다.

모든 지적이 우리 프로젝트 파일이나 규칙에서 나왔습니다. 리뷰는 동작합니다. 하지만 **파이프라인은 이 텍스트를 읽지 않습니다. 단계의 종료 코드를 읽습니다.**

```bash
echo $?
```

`echo $?`는 마지막 명령의 종료 코드를 출력합니다. 0입니다. 0은 성공을 뜻합니다. 단계는 request changes라고 했는데, 파이프라인은 그대로 진행해서 변경을 머지할 것입니다.

## 2단계: 종료 코드

그래서 스크립트의 두 번째 부분이 판정을 종료 코드로 바꿉니다. Python 프로그램 끝, 닫는 따옴표 앞에 두 줄을 추가합니다. 판정이 approve가 아니면 코드 1로 종료합니다. 단계가 실패했다는 뜻이므로 파이프라인이 멈춥니다. 판정이 approve면 프로그램은 그냥 끝나고, 종료 코드는 0으로 남습니다.

```python
if result['verdict'] != 'approve':
    raise SystemExit(1)
```

다시 실행하고, 바로 뒤에 종료 코드를 확인합니다. Claude Code가 같은 변경을 다시 리뷰하므로 조금 기다립니다.

### 리뷰어는 판정만 낸다

기다리는 동안 이런 단계에 관한 규칙 하나를 봅니다. 리뷰어가 코드까지 고치게 하고 싶어지기 쉽습니다. CI에서는 판정과 이유까지만 맡기세요.

- 수정은 개발자가 결정할 일입니다.
- 코드를 고치는 리뷰어에게는 파이프라인에 주고 싶지 않은 권한이 필요합니다.

여기서 Claude Code는 읽기만 합니다.

실제 파이프라인에서 이 리뷰는 테스트, 빌드 같은 여러 단계 중 하나입니다. 각 단계는 종료 코드로 보고하고, 파이프라인은 처음 실패한 단계에서 멈춥니다.

판정은 다시 request changes이고, 같은 종류의 이유가 붙습니다. 이번에는 `echo $?`가 **1**을 출력합니다. 파이프라인에서 이 단계는 실패하고, 변경은 바로 여기서 멈춥니다.

## 정리

- 스크립트가 diff를 print 모드의 Claude Code에, JSON 출력과 우리 스키마와 함께 보냈습니다.
- Claude Code는 변경을 프로젝트 파일과 규칙에 비추어 검사했습니다.
- 이유와 함께 request changes를 돌려줬습니다.
- Python 몇 줄이 판정을 읽었고, 스크립트는 1로 종료했습니다.

실무 원칙은 이렇습니다. CI에서는 Claude Code를 JSON 출력과 스키마를 붙인 print 모드로 실행하세요. 판정은 코드로 읽으세요. 그리고 종료 코드가 결정하게 하세요.
