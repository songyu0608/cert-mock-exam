---
aliases: ["--print", "비대화형 모드", "headless"]
tags: ["ccar-f", "레퍼런스", "도메인3"]
도메인: 3
태스크: ["3.6"]
중요도: "상"
---
# -p 플래그

> [!summary] 한 줄 정의
> Claude Code를 비대화형 모드로 실행하는 플래그. CI에서 입력 대기로 멈추지 않게 한다.

**English** -p / --print flag

## 시험 트리거
- "CI 작업이 무한정 멈춘다"
- "대화형 입력을 기다린다"

## 핵심
- `claude -p "..."` → 프롬프트를 처리해 stdout에 출력하고 종료.
- CLAUDE_HEADLESS 환경 변수, --batch 플래그는 **존재하지 않는다**(가이드 샘플 해설).
- stdin을 /dev/null로 돌리는 것은 올바른 방법이 아니다.

## 오답 함정
> [!warning] CLAUDE_HEADLESS=true, --batch 플래그 → 없는 기능

## 관련
- [[--output-format json과 --json-schema]] · [[3.6 CI CD 통합]] · [[공식 샘플 문제 12개]]

**공식 태스크**: [[3.6 CI CD 통합]]

## 셀프 체크
> [!question]- CI에서 Claude Code가 입력을 기다리며 멈출 때 해결책은?
> -p(--print) 플래그로 비대화형 실행
