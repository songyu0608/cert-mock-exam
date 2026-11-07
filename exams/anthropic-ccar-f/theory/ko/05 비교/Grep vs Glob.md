---
aliases: ["내장 도구 비교"]
tags: ["ccar-f", "비교", "도메인2"]
---
# Grep vs Glob

| 도구 | 찾는 대상 | 예 |
|---|---|---|
| Grep | 파일 **내용** | 함수 호출자, 오류 메시지, import 문 |
| Glob | 파일 **경로·이름** | **/*.test.tsx |
| Read + Write | 파일 전체 | Edit이 고유 텍스트를 못 찾을 때 대안 |
| Edit | 고유 텍스트 기준 부분 수정 | |

자세히: [[내장 도구]]

> [!question]- "processPayment를 호출하는 곳을 모두 찾아라"
> Grep.

← [[비교 노트 목록]]
