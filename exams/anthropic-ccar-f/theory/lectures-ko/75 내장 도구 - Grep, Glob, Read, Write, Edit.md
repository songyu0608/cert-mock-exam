# 75. 내장 도구: Grep, Glob, Read, Write, Edit

지난 노트에서는 플랜 모드와 직접 실행 중에서 골랐습니다. 어느 모드에서든 Claude Code는 몇 가지 내장 도구로 일합니다.

이번 노트에서는 어떤 도구가 어떤 일에 맞는지 살펴봅니다. 잘못된 도구는 라운드를 낭비하거나, 코드를 놓치거나, 엉뚱한 줄을 바꿉니다. 같은 도구가 Agent SDK로 만든 에이전트에도 있고, 시험의 개발자 생산성 시나리오에서도 쓰입니다.

## 환불이 함수 하나를 쓰게 한다

ShopAssist 팀의 한 개발자가 환불 금액이 여러 방식으로 반올림된다는 것을 발견합니다. ShopAssist에는 금액을 센트 단위로 반올림하는 공유 함수 `round_to_cents()`가 있습니다. 어떤 코드는 이 함수를 부르고, 어떤 코드는 금액을 직접 반올림합니다. 개발자는 Claude Code에 모든 환불이 공유 함수를 쓰게 하고 테스트를 확인해 달라고 합니다.

가장 중요한 원칙은 **Grep은 파일 안을 검색하고, Glob은 이름으로 파일을 찾는다**는 것입니다.

| 그룹 | 도구 |
| --- | --- |
| 찾기 | Grep, Glob |
| 파일 바꾸기 | Read, Write, Edit |
| 명령 실행 | Bash |

## 1. 찾기

**Grep**은 파일 내용에서 패턴을 검색합니다. 패턴은 함수 이름, 오류 메시지, import 문일 수 있습니다. Claude Code에는 공유 반올림 함수를 부르는 곳이 모두 필요합니다. 그래서 함수 이름 `"round_to_cents"`로 Grep을 실행합니다. Grep은 그 이름이 나오는 파일과 줄을 하나하나 돌려줍니다.

로그의 오류 메시지도 같은 방식입니다. 고객이 `"refund amount mismatch"`를 봤다면, Grep은 코드에서 그 메시지를 쓰는 한 줄을 찾습니다.

**Glob**은 파일 안을 보지 않습니다. 파일 경로를 일치시키므로, 이름이나 확장자로 파일을 찾습니다. 채팅 창은 컴포넌트마다 옆에 테스트 파일을 둡니다. 이 파일을 모두 나열하려고 Claude Code는 다음 패턴으로 Glob을 씁니다. 어느 폴더에 있든 `.test.tsx`로 끝나는 모든 파일이라는 뜻입니다.

```text
**/*.test.tsx
```

두 도구를 헷갈리면 안 됩니다. Grep은 이름으로 파일을 나열할 수 없고, Glob은 함수 호출을 찾을 수 없습니다.

| 도구 | 찾는 것 |
| --- | --- |
| Grep | 파일 안의 텍스트: 함수 호출, 오류 메시지, import |
| Glob | 파일 자체: 이름이나 확장자. 내용으로는 찾지 않음 |

스스로 물어보세요. **파일 안의 텍스트를 찾는가, 파일 자체를 찾는가?**

## 2. 파일 바꾸기

- **Read**는 파일 하나의 전체 내용을 로드합니다.
- **Write**는 새 파일을 만들거나, 파일 전체를 새 내용으로 바꿉니다.
- **Edit**는 한 곳만 골라 바꿉니다.

```python
Read("refunds.py")                # load the whole file
Write("refunds.py", new_content)   # create it, or replace all of it
Edit("refunds.py",                # change one spot only
     old_text="total = round(amount, 2)",   # the anchor: appears exactly once
     new_text="total = round_to_cents(amount)")
```

Edit는 두 텍스트를 받습니다. 찾을 기존 텍스트와 그 자리에 넣을 새 텍스트입니다. 기존 텍스트를 **기준점**(anchor)이라고 합니다. 기준점은 파일에 **정확히 한 번** 나와야 합니다. 그래야 Edit가 어디를 바꿀지 알고, 나머지 부분은 그대로 둡니다.

그래서 작은 변경에는 Edit를 씁니다. 한 줄을 바꾸려고 Write로 파일 전체를 다시 쓰면 안 됩니다. 제대로 옮겨 적지 않은 부분은 사라집니다.

### Edit가 실패할 때

환불 파일에서 금액을 반올림하는 줄이 서로 다른 두 함수에 두 번 나옵니다. 두 줄의 텍스트가 완전히 같습니다.

```python
def refund_item(amount):
    total = round(amount, 2)
    return total
def refund_order(amount):
    total = round(amount, 2)
    return total
```

```text
Edit(old_text="total = round(amount, 2)")
Error: anchor found 2 times - not unique
```

Claude Code가 Edit에 이 줄을 바꾸라고 하면, Edit는 거부합니다. 기준점이 고유하지 않으므로 어느 줄을 뜻하는지 알 수 없습니다.

**시험의 답은 Read 후 Write입니다.**

1. Read: 파일 전체를 읽습니다.
2. 변경: 맞는 함수에서 고칩니다.
3. Write: 파일 전체를 다시 씁니다.

> 제품 참고: 현재 Claude Code에는 반복된 기준점에 대한 다른 해결책도 있습니다. 주변 줄을 포함한 더 긴 기준점을 쓰거나, 일치하는 곳을 모두 바꾸는 것입니다(강의 슬라이드 기준). 시험에서는 Read 후 Write로 답합니다.

## 3. 명령 실행

**Bash**는 셸 명령을 실행합니다. 변경 후 Claude Code는 Bash로 테스트를 실행하고 통과하는지 봅니다. 예를 들어 `npm test`를 실행하면, Bash가 출력과 종료 코드를 돌려줍니다.

## 정리

| 도구 | 역할 |
| --- | --- |
| Grep | 파일 내용 검색: 함수 이름, 오류 메시지, import |
| Glob | 이름 패턴으로 파일 찾기: 어느 폴더에 있든 모든 테스트 파일 |
| Read | 파일 전체를 로드 |
| Write | 파일을 만들거나 교체 |
| Edit | 한 곳을 바꿈. 기준점은 정확히 한 번 나와야 함 |
| Bash | 테스트 같은 명령 실행 |

- Edit가 고유한 기준점을 찾지 못하면, 시험의 대안은 Read 후 Write입니다.

Claude Code가 움직이기 전에 무엇이 필요한지 정하세요. 파일 안의 텍스트인지, 이름으로 찾는 파일인지, 작은 변경 하나인지, 파일 전체인지입니다. 그다음 그 일에 맞는 도구를 고르세요. 다음 노트에서는 Claude Code가 처음 보는 코드베이스를 한 단계씩 탐색합니다.
