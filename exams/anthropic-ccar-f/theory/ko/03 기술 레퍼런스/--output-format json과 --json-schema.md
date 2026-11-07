---
aliases: ["output-format json", "json-schema", "CLI 구조화 출력"]
tags: ["ccar-f", "레퍼런스", "도메인3"]
도메인: 3
태스크: ["3.6"]
중요도: "중"
---
# --output-format json과 --json-schema

> [!summary] 한 줄 정의
> CI에서 Claude Code 결과를 기계가 파싱할 수 있는 구조화된 형식으로 강제하는 CLI 플래그.

**English** --output-format json / --json-schema

## 시험 트리거
- "리뷰 결과를 PR 인라인 코멘트로 자동 게시"

## 핵심
- --output-format json + --json-schema → 파싱 가능한 결과 → PR 인라인 코멘트 자동 게시.

## 헷갈리는 개념
| 개념 | 차이 |
|---|---|
| [[tool_use 구조화된 출력]] | API 수준의 구조화 출력 |

## 관련
- [[-p 플래그]] · [[CI 리뷰 중복 방지]]

**공식 태스크**: [[3.6 CI CD 통합]]

## 셀프 체크
> [!question]- CI에서 결과를 기계가 파싱할 수 있게 하는 CLI 플래그 2개는?
> --output-format json, --json-schema
