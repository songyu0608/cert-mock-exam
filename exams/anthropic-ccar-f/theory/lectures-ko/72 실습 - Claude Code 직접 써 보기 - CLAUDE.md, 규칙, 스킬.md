---
lab: true
---

# 72. 실습: Claude Code 직접 써 보기 - CLAUDE.md, 규칙, 스킬

앞에서는 Claude Code에 print 모드로 질문했고, 프롬프트마다 Claude Code가 알아야 할 내용을 전부 담아야 했습니다. 팀이 규칙을 프롬프트마다 반복할 수는 없습니다. Claude Code에는 프로젝트가 규칙을 한 번만 적어 두는 곳이 세 군데 있습니다. 프로젝트 파일, 일부 파일에만 적용되는 규칙, 스킬입니다. 이번 노트에서는 세 가지를 모두 작성합니다.

## 전체 흐름

| 파일 | Claude Code가 읽는 때 |
| --- | --- |
| 프로젝트 파일 `CLAUDE.md` | 모든 세션이 시작될 때 |
| 규칙 | 규칙의 paths와 일치하는 파일로 작업할 때만 |
| 스킬 | 요청이 설명(description)과 맞을 때, 또는 이름으로 부를 때 |

세 파일을 이 순서로 작성합니다. 하나를 쓸 때마다, 새 파일만 답할 수 있는 질문을 Claude Code에 던집니다.

아래 코드 블록은 스크립트 설명에 맞춘 예시이며, 강의 화면의 원본 코드와 세부 표현은 다를 수 있습니다.

## 1. 프로젝트 파일: CLAUDE.md

프로젝트 파일은 프로젝트 루트에 있습니다. 지금은 비어 있습니다.

먼저 프로젝트 이름으로 제목을 달고, 프로젝트가 무엇인지 한 줄로 적습니다. Claude API로 만든 온라인 상점용 지원 어시스턴트입니다. 그다음 규칙 섹션을 만듭니다.

1. 도구 함수는 딕셔너리를 반환하고, 절대 예외를 던지지 않습니다. 실패는 앞에서 만든, 필드 다섯 개짜리 구조화된 오류입니다.
2. 찾지 못한 것은 오류가 아니라 데이터입니다. 도구는 `found`를 false로, 메시지와 함께 반환합니다.
3. 주문 ID의 모양: `ORD`, 대시, 숫자 여덟 자리입니다.
4. 스크립트 실행 방법: 이 폴더에서 `python` 뒤에 파일 이름을 씁니다. 가상 환경이 이미 경로에 있으므로, 평범한 `python` 명령으로 프로젝트 패키지를 찾습니다.

```markdown
# ShopAssist

A support assistant for an online store, built on the Claude API.

## Conventions

- Tool functions return dictionaries and never raise an exception.
  A failure is the structured error with its five fields.
- Not found is data, not an error: return found false with a message.
- Order IDs look like ORD-12345678 (ORD, a dash, eight digits).
- Run scripts with `python <file>` from this folder.
```

파일은 이것이 전부입니다. 일부러 짧게 썼습니다. Claude Code는 모든 세션에서 이 파일을 로드하므로, 모든 개발자가 알아야 할 것만 담습니다.

### 첫 번째 질문

프로젝트에 관해 묻지만, 규칙은 전혀 언급하지 않는 질문입니다. "주문이 존재하지 않으면 도구는 무엇을 반환해야 하나?" `claude -p`, 따옴표 안의 질문, 그리고 답을 일반 텍스트로 받도록 output format text를 씁니다.

```bash
claude -p "What must a tool return when the order does not exist? Answer in one sentence." --output-format text
```

Claude Code는 이 폴더에서 시작하므로, 답하기 전에 `CLAUDE.md`를 읽습니다. 그리고 요청대로 한 문장으로 답합니다. 오류가 아니라 `found`가 false이고 메시지가 있는 평범한 결과라는 답입니다. 프롬프트는 이 규칙을 한 번도 말하지 않았지만, 우리가 적은 규칙 그대로입니다.

## 2. 일부 파일에만 적용되는 규칙

규칙은 `.claude` 폴더 안의 `rules` 폴더에 있습니다. 거기서 `tools.md` 파일을 엽니다.

규칙 파일은 대시 세 개로 된 두 줄 사이의 짧은 헤더로 시작할 수 있습니다. 이 헤더를 **frontmatter**라고 합니다. 그 안에 `paths`를 적습니다. 이 필드는 규칙이 어떤 파일을 위한 것인지 정합니다. 우리 규칙은 MCP 서버, `tool_call.py`와 `tool_errors.py` 같은 도구 스크립트, 이름이 `agent`로 시작하는 스크립트를 위한 것입니다. 패턴은 각각 목록의 한 항목입니다. 한 줄에 대시 하나, 그리고 따옴표 안의 패턴입니다. 대시 세 개로 헤더를 닫습니다.

그다음 "tool code"라는 제목 아래 규칙 자체를 적습니다.

- 모든 도구 함수는 다른 일을 하기 전에 먼저 호출을 로그로 남깁니다.
- 고객 메시지에는 내부 세부 정보를 넣지 않습니다. 그런 정보는 개발자 메시지로 갑니다.

```markdown
---
paths:
  - "mcp_server.py"
  - "tool_call.py"
  - "tool_errors.py"
  - "agent*.py"
---
# Tool code
- Every tool function logs its call before it does anything else.
- The customer message stays free of internal details.
  Those go into the developer message.
```

`mcp_server.py`는 MCP 서버 파일을 가리키는 예시 이름입니다. paths 덕분에 Claude Code는 이 파일들 중 하나로 작업할 때만 이 규칙을 로드합니다. 채팅 페이지를 고칠 때는 규칙이 아무 비용도 들지 않고, 도구를 건드릴 때는 규칙이 있습니다.

### 두 번째 질문

그래서 두 번째 질문은 Claude Code가 도구 파일로 작업하게 만들어야 합니다. `tool_errors.py`에 주문 조회 도구가 있으므로, 그 파일을 읽고 도구가 우리 규칙 중 무엇을 어기는지 말해 달라고 합니다.

```bash
claude -p "Read tool_errors.py and say which of our conventions the lookup_order tool breaks." --output-format text
```

답하기 위해 Claude Code는 `tool_errors.py`를 읽고, 그 파일은 규칙의 paths와 일치합니다. 파일을 읽으므로 단순한 질문보다 몇 초 더 걸립니다. 답은 `lookup_order`가 호출을 먼저 로그로 남기지 않아서 `tools.md`의 규칙을 어긴다는 것입니다. 로그 규칙은 `CLAUDE.md`에 없고, 규칙 파일에만 있습니다. Claude Code가 그 규칙을 알았던 것은 `tool_errors.py`가 규칙의 paths와 일치했기 때문입니다.

## 3. 스킬

스킬은 Claude Code가 매번 같은 방식으로 반복하길 바라는 절차입니다. 스킬마다 `.claude` 안의 `skills` 폴더에 자기 폴더가 있고, 그 안에 `SKILL.md` 파일이 있습니다. 우리 스킬의 이름은 `order-check`입니다. 이 파일도 frontmatter로 시작합니다.

- **name**: `order-check`
- **description**: 가장 중요한 줄입니다. Claude Code는 이 줄을 읽고 스킬이 언제 적용되는지 정합니다. 우리 설명은 "주문을 아직 반품할 수 있는지 확인한다. 누군가 특정 주문 ID의 반품을 물을 때 사용한다"입니다.
- **allowed-tools**: Python 명령 실행 하나만 적습니다. 이 명령을 미리 승인하므로, 스킬은 권한을 묻지 않고 실행할 수 있습니다.

대시 세 개로 헤더를 닫습니다.

본문은 절차를 평범한 단계로 적습니다. 주문 ID가 주어졌을 때:

1. 프로젝트 폴더에서 짧은 Python 명령을 실행합니다. MCP 서버에는 한 주문의 사실을 반환하는 함수 `lookup_order`가 있습니다. 명령은 그 함수를 import하고 반환값을 출력합니다. 꺾쇠괄호 안의 order ID는 자리 표시일 뿐이고, Claude Code가 실제 ID를 넣습니다.
2. 주문을 찾으면 며칠 전에 배송됐는지, 그것이 30일 반품 기간 안인지 말합니다.
3. 찾지 못하면 그렇다고 말하고, 올바른 ID를 묻고, 추측하지 않습니다.

```markdown
---
name: order-check
description: Check whether an order can still be returned. Use it when someone asks about returning a specific order ID.
allowed-tools: Bash(python:*)
---
Given an order ID:

1. Run from the project folder:
   python -c "from mcp_server import lookup_order; print(lookup_order('<order ID>'))"
2. If the order is found, say how many days ago it was delivered,
   and whether that is inside the 30-day return window.
3. If it is not found, say so, ask for the correct ID, and do not guess.
```

### 세 번째 질문

MCP 서버에는 테스트 주문이 두 개 있고, 그중 하나가 램프입니다. Claude Code에 램프 주문에 order-check 스킬을 쓰라고 합니다. 이번에는 명령줄에서 허용 도구도 함께 넘깁니다. 스킬 도구와 Python 명령입니다.

```bash
claude -p "Use the order-check skill for the lamp order." --output-format text --allowedTools "Skill" "Bash(python:*)"
```

스킬 헤더는 스킬이 실행 중일 때만 Python을 승인합니다. 스킬을 부르는 것도 도구 호출인데, print 모드에서는 그것을 승인할 사람이 없습니다. 그래서 여기서 스킬 도구를 승인하고, Python 명령도 함께 승인합니다.

프롬프트에서 스킬 이름을 불렀으므로 Claude Code는 이름으로 스킬을 로드합니다. 이름이 없었다면 설명을 보고 스킬을 골랐을 것입니다. 그다음 단계를 따릅니다. Python 명령을 실행하고 `lookup_order`가 반환한 값을 읽습니다. 몇 초 걸립니다.

답은 램프가 45일 전에 배송됐다는 것입니다. 30일 기간을 15일 넘었으므로 반품할 수 없습니다. 이 숫자는 추측이 아니라 우리 코드에서 나왔습니다.

## 시험 참고: allowed-tools

스킬 헤더의 allowed-tools 줄에 관한 참고입니다.

| 기준 | 해석 |
| --- | --- |
| 시험 가이드 | 제한: 스킬은 목록에 있는 도구만 쓸 수 있습니다. 시험에서는 이렇게 답합니다. |
| 현재 제품 | 나열한 도구를 미리 승인하고, 다른 도구를 제한하지는 않습니다. |

그러니 자기 프로젝트에서는 이 설정을 미리 승인으로 읽으세요.

## 정리

- 프로젝트 파일은 첫 번째 질문에 답했습니다. Claude Code는 모든 세션에서 이 파일을 읽습니다.
- 규칙은 두 번째 질문에 답했습니다. 질문이 Claude Code를 도구 파일로 데려갔기 때문입니다.
- 스킬은 한 주문에 관한 요청을, 우리 코드를 실행하는 고정된 절차로 바꿨습니다.

실무 원칙은 이렇습니다. 공유 규칙은 `CLAUDE.md`에, 일부 파일에만 필요한 세부 사항은 paths가 있는 규칙에, 반복하는 절차는 설명이 분명한 스킬에 두세요.
