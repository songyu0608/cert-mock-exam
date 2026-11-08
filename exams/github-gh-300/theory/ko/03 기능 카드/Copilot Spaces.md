---
aliases: ["Spaces", "스페이스", "Copilot 공간"]
tags: ["gh-300", "기능카드", "도메인2"]
도메인: 2
목표: ["2.11"]
중요도: "중"
---
# Copilot Spaces

> [!summary] 한 줄 정의
> Copilot이 답할 때 쓸 컨텍스트(리포지토리, 코드, PR, 이슈, 메모, 이미지, 파일)를 한곳에 모아 정리하고 공유하는 기능.

**English** Copilot Spaces

## 시험 트리거
- "특정 프로젝트 문서·코드에 근거해 답하게"
- "신규 입사자가 같은 컨텍스트로 질문"

## 핵심
- 추가 대상: 리포지토리, 코드, PR, 이슈, 자유 메모, 이미지, 파일 업로드.
- GitHub 기반 소스는 바뀌면 자동으로 갱신된다.
- 공유: 조직 소유(구성원에게 admin·editor·viewer 권한) 또는 개인 소유(공개는 보기 전용, 특정 사용자, 비공개). 보는 사람은 자기가 접근 가능한 소스만 본다.
- Copilot Free를 포함해 Copilot 라이선스가 있으면 누구나 만들고 쓸 수 있다.
- GitHub의 Copilot Chat에서 쓰고, IDE에서는 GitHub MCP 서버로 접근. 질문은 채팅 요청으로 계산된다.

## 헷갈리는 개념
| 개념 | 차이 |
|---|---|
| [[사용자 지정 지침]] | 참고 자료 묶음 vs 응답 방식 지침 |
| [[MCP]] | 큐레이션한 컨텍스트 vs 도구·데이터 연결 |

## 오답 함정
> [!warning] Spaces는 Enterprise 전용이라는 선택지 → Free 포함 모든 Copilot 라이선스

## 관련
- [[사용자 지정 지침]] · [[MCP]] · [[GitHub Spark]] · [[PR 요약]]

**공식 목표**: [[2 GitHub Copilot 기능 사용#목표 2.11|2.11]]  
**근거**: [About GitHub Copilot Spaces](https://docs.github.com/en/copilot/concepts/spaces)

## 셀프 체크
> [!question]- Spaces에 추가한 GitHub 파일이 바뀌면?
> 자동으로 갱신된다
