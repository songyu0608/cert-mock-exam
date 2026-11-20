---
lab: true
---

# 43. 실습: 주문 조회와 반품 접수를 MCP 서버로 옮기기

지난 노트에서는 Claude Code에서 스토어의 도구를 쓸 수 있게 하려면 무엇을 연결해야 하는지 살펴봤습니다. 이번에는 배송된 지 20일 된 재킷과 45일 된 램프를 다시 꺼내 보겠습니다. 재킷은 언제 도착했는지 묻고, 램프는 반품을 요청해 보세요. 답을 만드는 데 쓴 주문 내역과 반품 규칙은 모두 우리 서버에 있습니다.

## 주문 조회 하나로 연결을 확인하기

[[41 실습 - 주문 조회와 반품 거절을 코드로 구분하기|41번 노트]]의 주문 데이터와 두 함수는 그대로 재사용합니다. 같은 폴더에 `mcp_server.py`를 만듭니다. 아래 예시는 MCP Python SDK 1.30.0의 `FastMCP`를 사용합니다. 실습용 가상 환경에 `python -m pip install mcp==1.30.0`으로 설치할 수 있습니다. `tool_errors.py`에서 두 함수를 가져오므로 그 파일의 실습 실행문은 `if __name__ == "__main__":` 아래에 둡니다. [MCP Python SDK 예제](https://github.com/modelcontextprotocol/python-sdk/tree/v1.30.0)

```python
import json
from pathlib import Path

from mcp.server.fastmcp import FastMCP
from tool_errors import lookup_order as find_order
from tool_errors import start_return as request_return

server = FastMCP("shopassist")
trace_file = Path(__file__).parent / "trace" / "tools.jsonl"


def log_call(tool: str, order_id: str) -> None:
    trace_file.parent.mkdir(exist_ok=True)
    event = {"event": "tool_call", "tool": tool, "order_id": order_id}
    with trace_file.open("a", encoding="utf-8") as trace:
        trace.write(json.dumps(event, ensure_ascii=False) + "\n")


@server.tool()
def lookup_order(order_id: str) -> dict:
    """주문 번호로 스토어 주문을 조회하고 상품과 배송 후 경과 일수를 반환합니다."""
    log_call("lookup_order", order_id)
    return find_order(order_id)


if __name__ == "__main__":
    server.run(transport="stdio")
```

`@server.tool()`이 붙은 함수를 보세요. 함수 이름은 도구 이름이 되고, `order_id: str`은 문자열 입력을 받는다는 정의가 됩니다. 함수 첫 줄의 설명문(docstring)은 Claude가 도구를 고를 때 읽습니다. 도구 정의를 별도로 한 벌 더 작성할 필요가 없습니다.

Claude Code는 서버를 별도 프로세스로 시작합니다. 도구 목록과 호출 요청은 표준 입력으로 보내고, 서버의 응답은 표준 출력에서 읽습니다. 그래서 호출 기록은 별도 파일에 한 줄씩 덧붙입니다. 실습 화면에 표시되는 기록도 이렇게 서버가 남긴 것입니다.

MCP를 설치한 Python 환경에서 실습 폴더를 열고 다음 명령을 실행해 보세요. `--` 뒤에는 Claude Code가 서버를 시작할 때 실행할 명령이 옵니다.

```sh
claude mcp add --scope local shopassist -- python mcp_server.py
claude mcp get shopassist
```

여기서 `local`은 **현재 프로젝트에서 나만 쓰는 설정**을 뜻합니다. 상태가 `Connected`이면 서버가 응답한 것입니다. 이제 아래 명령에서 `JACKET_ID`를 실습 데이터의 재킷 주문 번호로 바꿔 실행합니다.

```sh
claude -p "주문 JACKET_ID의 재킷은 언제 배송됐나요?" --tools "" --allowedTools "mcp__shopassist__lookup_order"
```

`-p`는 답을 출력하고 종료합니다. `--tools ""`로 파일 읽기 같은 내장 도구를 끄고, `--allowedTools`로 이번 조회를 별도 승인 없이 실행할 수 있게 합니다. 전자는 사용할 내장 도구를 정하고 후자는 미리 승인할 도구를 정합니다. 터미널에 “20일 전에 배송됐습니다”라는 답이 나오면 `trace/tools.jsonl`을 열어 보세요. 서버가 기록한 도구 이름과 재킷 주문 번호를 확인할 수 있습니다. [Claude Code CLI 옵션](https://code.claude.com/docs/en/cli-reference)

## 두 번째 도구로 램프 반품을 요청하기

같은 서버 파일에서 `server.run`을 호출하는 조건문 **위에** 다음 함수를 추가합니다. 이번 도구는 주문을 읽는 데서 끝나지 않습니다. 기한 안에 있으면 반품 라벨 번호를 돌려주고, 기한이 지났으면 지난 실습에서 정한 거절 사유를 돌려줍니다.

```python
@server.tool()
def start_return(order_id: str) -> dict:
    """배송 후 30일 이내의 주문에 반품 라벨을 발급하고, 기한이 지나면 사유를 반환합니다."""
    log_call("start_return", order_id)
    return request_return(order_id)
```

서버 등록은 한 번이면 됩니다. 이번에도 `-p`로 새로 실행하므로 Claude Code가 서버를 다시 시작하면서 추가된 도구를 찾습니다. `LAMP_ID`를 램프 주문 번호로 바꾸고 이번 호출에 필요한 반품 도구만 미리 승인합니다.

```sh
claude -p "주문 LAMP_ID의 램프 반품을 접수하고 도구가 반환한 값을 그대로 보여 주세요." --tools "" --allowedTools "mcp__shopassist__start_return"
```

기록에 `start_return`과 램프 주문 번호가 남습니다. 함수가 배송 후 45일이 지났음을 확인했으므로 라벨은 발급되지 않습니다. 반환값에서 `isError`는 `true`, `errorCategory`는 `business`, `isRetryable`은 `false`입니다. 고객용 메시지는 배송 후 30일이 지나 반품 기한을 넘겼다고 안내하고, 개발자용 메시지에는 적용한 기준과 실제 경과 일수가 담깁니다. 이 필드들은 우리 함수가 결과 안에 담은 값입니다.

두 호출을 나란히 떠올려 보세요. 재킷의 배송일을 읽은 곳도, 램프 반품을 거절한 곳도 스토어 서버입니다. Claude Code는 서버의 답을 받아 고객에게 전했습니다. 다음 노트에서는 우리가 직접 작성했던 도구 호출 루프를 Agent SDK에 맡겨 보겠습니다.
