---
aliases: ["Failure modes", "障害モード", "LLM limitations", "LLMの限界", "리스크"]
tags: ["ccar-p", "개념카드", "도메인5"]
도메인: 5
목표: ["5.2"]
중요도: "상"
---
# LLM 실패 모드

> [!summary] 한 줄 정의
> LLM 시스템에서 반복해서 나타나는 실패 유형을 알고 설계 단계에서 대비한다.

**日本語** LLMシステムのリスク、限界、障害モード　·　**English** Risks, limitations and failure modes of LLM systems

## 시험 트리거
- "같은 입력인데 답이 달라진다"
- "긴 작업 끝에서 앞의 결정을 잊는다"
- "에이전트 오류가 단계마다 쌓인다"

## 핵심
- 할루시네이션: 완화 기법으로 크게 줄지만 완전히 없앨 수는 없다 → [[할루시네이션 완화]].
- 프롬프트 인젝션·탈옥: 외부 콘텐츠·사용자 입력을 통한 공격 → [[프롬프트 인젝션]].
- 비결정성: 에이전트는 같은 프롬프트에도 실행마다 결정이 달라져 디버깅이 어렵다(멀티 에이전트 글).
- 컨텍스트 열화(context rot): 토큰이 늘수록 정확도·회상률이 떨어진다 → [[컨텍스트 윈도우와 토큰 관리]].
- 오류 누적: 에이전트는 자율성 때문에 비용이 높고 오류가 누적될 수 있다. 장시간 에이전트에서는 작은 오류가 크게 번진다.
- 도구 선택 혼동: 도구가 30~50개를 넘거나 기능이 겹치면 잘못된 도구를 고른다.

## 헷갈리는 개념
| 개념 | 차이 |
|---|---|
| [[시스템 문제 진단]] | 실패 유형 목록 vs 발생 후 원인 찾기 |

## 오답 함정
> [!warning] 더 큰 모델을 쓰면 실패 모드가 사라진다는 선택지 → 구조적 대책(검증·권한·모니터링)이 필요

## 관련
- [[할루시네이션 완화]] · [[프롬프트 인젝션]] · [[컨텍스트 윈도우와 토큰 관리]] · [[관측 가능성과 모니터링]] · [[휴먼 인 더 루프]]

**공식 목표**: [[5 거버넌스, 안전, 리스크 관리#목표 5.2|5.2]]  
**근거**: [Reduce hallucinations](https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations) · [Mitigate jailbreaks and prompt injections](https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/mitigate-jailbreaks) · [How we built our multi-agent research system](https://www.anthropic.com/research/multi-agent-research-system) · [Context windows](https://platform.claude.com/docs/en/build-with-claude/context-windows) · [Building effective AI agents](https://www.anthropic.com/research/building-effective-agents) · [Tool search tool](https://platform.claude.com/docs/en/agents-and-tools/tool-use/tool-search-tool)

## 셀프 체크
> [!question]- 에이전트 디버깅이 어려운 이유(멀티 에이전트 글)는?
> 같은 프롬프트에도 실행마다 비결정적으로 다른 결정을 내린다

> [!question]- 토큰이 늘수록 정확도가 떨어지는 실패 모드는?
> context rot(컨텍스트 열화)
