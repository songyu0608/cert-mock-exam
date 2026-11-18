# CCAR-F 슬라이드 한국어판

CCAR-F 강의 슬라이드(섹션 1~11)를 한국어로 옮긴 claude.ai 슬라이드 아티팩트의 사본이다. 다른 작업(이론 노트, 스크립트 번역, 요약 노트)에서 참고 자료로 쓰려고 리포지토리에 둔다. 사이트에는 나오지 않는다(사이트는 `theory/`와 `guides/`만 읽는다).

## 구조

```
slides/ko/
  NN-<slug>/
    slides.md     # 화면 글자 + 발표자 노트를 뽑은 텍스트 (자동 생성, 읽기용)
    deck.json     # 아티팩트 원본 그대로 (순서 order, 강의 구분 sections, 글꼴 faces)
    slides/<id>.html  # 슬라이드 1장 = <section> 1개 (1920×1080, 인라인 스타일)
    assets/       # 슬라이드 이미지. 원래 /_blob/<id> 주소를 ../assets/<id>.<확장자>로 바꿨다
```

- 다른 작업에서 내용을 참고할 때는 `slides.md`를 읽는다. 슬라이드 순서는 `deck.json`의 `order`를 따른다.
- 슬라이드 HTML은 아티팩트 형식을 그대로 두었다. `<x-icon>`, `<x-connector>`는 claude.ai 슬라이드 뷰어의 요소라서 브라우저에서 HTML 파일을 직접 열면 아이콘과 화살표가 보이지 않는다. 화면을 보려면 원본 아티팩트 링크를 연다.
- 발표자 노트(`<aside>`)에는 영어 원문이 들어 있다.
- 원본 아티팩트를 고친 뒤에는 이 폴더도 다시 내려받아 맞춘다. `slides.md`만 손으로 고치지 않는다.

## 섹션

| 섹션 | 폴더 | 이름 | 강의 | 슬라이드 | 원본 |
| --- | --- | --- | --- | --- | --- |
| 1 | [`01-foundations/`](01-foundations/slides.md) | 섹션 1. 기초 | 1~9 | 116 | [링크](https://claude.ai/artifact/Me8jggBtyokjDG34K4mfb9) |
| 2 | [`02-claude-api/`](02-claude-api/slides.md) | 섹션 2. Claude API 활용 | 15~16 | 25 | [링크](https://claude.ai/artifact/UizUJtBEtyVnfsrvmbMKtn) |
| 3 | [`03-prompt-engineering/`](03-prompt-engineering/slides.md) | 섹션 3. 프롬프트 엔지니어링과 평가 | 18~24 | 80 | [링크](https://claude.ai/artifact/4mYT54BfMLpJh6uW2dhzFN) |
| 4 | [`04-structured-output/`](04-structured-output/slides.md) | 섹션 4. 구조화된 출력과 추출 | 25~36 | 119 | [링크](https://claude.ai/artifact/P69huibgrQ8LnZD9fE2am3) |
| 5 | [`05-tools-mcp-agentic-loop/`](05-tools-mcp-agentic-loop/slides.md) | 섹션 5. 도구, MCP, 에이전트 루프 | 38~46 | 88 | [링크](https://claude.ai/artifact/Qan1cM7ncgxwEP5NXr7pLK) |
| 6 | [`06-support-agent/`](06-support-agent/slides.md) | 섹션 6. 지원 에이전트 | 48~57 | 133 | [링크](https://claude.ai/artifact/PvSY19JVrX4aAh87RN79kH) |
| 7 | [`07-multi-agent/`](07-multi-agent/slides.md) | 섹션 7. 멀티 에이전트 시스템 | 59~70 | 155 | [링크](https://claude.ai/artifact/NCJyFPtL7eJ72vnbvss1rz) |
| 8 | [`08-claude-code-config/`](08-claude-code-config/slides.md) | 섹션 8. Claude Code 설정과 워크플로 | 71~91 | 248 | [링크](https://claude.ai/artifact/WJ8Zu1JByuvdYitAcnZEad) |
| 9 | [`09-claude-code-ci-review/`](09-claude-code-ci-review/slides.md) | 섹션 9. CI와 리뷰 아키텍처의 Claude Code | 92~98 | 73 | [링크](https://claude.ai/artifact/Q4qwgSLEJ2ZoVHQsJRgJAJ) |
| 10 | [`10-exam-readiness/`](10-exam-readiness/slides.md) | 섹션 10. 시험 준비 (전 도메인) | 99~101 | 45 | [링크](https://claude.ai/artifact/JkHnpgveSYsBKsuqkUTSAR) |
| 11 | [`11-beyond-the-exam/`](11-beyond-the-exam/slides.md) | 섹션 11. 시험 너머 | 103~106 | 54 | [링크](https://claude.ai/artifact/154q3ChW5FPfmfKdzjvL1b) |

- 슬라이드 수는 표지와 강의 구분 슬라이드를 포함한 장수다. 표지에 적힌 장수는 이 둘을 뺀 수다.
- 강의 번호는 슬라이드 원본 PDF의 번호다. [`scripts/README.md`](../../scripts/README.md)의 Udemy 강의 번호와 다르다(예: Udemy 섹션 1은 3~8강, 슬라이드 섹션 1은 1~9강).

## 빠진 강의 번호

1~106 중 다음 번호는 어느 덱에도 없다.

- 표지 노트에 "원본에 없음"으로 적힌 번호: 2, 26, 28, 29, 40, 45, 65, 76, 96, 102
- 표지 노트에 언급이 없는 번호(덱 사이 경계): 10~14, 17, 37, 47, 58. 원본 PDF에 원래 없는지, 슬라이드가 없는 실습 강의인지는 확인하지 않았다.
