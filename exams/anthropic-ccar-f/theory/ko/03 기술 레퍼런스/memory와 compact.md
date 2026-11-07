---
aliases: ["/memory", "/compact"]
tags: ["ccar-f", "레퍼런스", "도메인3"]
도메인: 3
태스크: ["3.1", "5.4"]
중요도: "중"
---
# memory와 compact

> [!summary] 한 줄 정의
> /memory는 로드된 메모리 파일 확인, /compact는 긴 세션에서 컨텍스트 사용량 줄이기.

**English** /memory and /compact

## 시험 트리거
- "세션마다 동작이 다르다"
- "컨텍스트가 탐색 출력으로 가득 찼다"

## 핵심
- **/memory**: 어떤 CLAUDE.md·메모리 파일이 로드됐는지 확인 → 동작 불일치 진단.
- **/compact**: 장황한 탐색 출력으로 찬 컨텍스트를 압축.

## 관련
- [[CLAUDE.md 계층]] · [[컨텍스트 저하]]

**공식 태스크**: [[3.1 CLAUDE.md 구성]] · [[5.4 대규모 코드베이스 탐색의 컨텍스트 관리]]

## 셀프 체크
> [!question]- 세션마다 Claude Code 동작이 다를 때 로드된 메모리 파일을 확인하는 명령은?
> /memory
