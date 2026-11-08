---
aliases: ["Personal Copilot settings", "Copilot settings", "모델 학습 옵트아웃", "Bing 검색", "개인 정책"]
tags: ["gh-300", "기능카드", "도메인6"]
도메인: 6
목표: ["6.1", "6.3", "3.1"]
중요도: "중"
---
# 개인 Copilot 설정

> [!summary] 한 줄 정의
> 개인 구독자가 프로필 사진 → Copilot settings에서 공개 코드 일치, 데이터의 AI 모델 학습 사용, Bing 웹 검색 등을 정하는 설정.

**English** Managing Copilot policies as an individual subscriber

## 시험 트리거
- "내 데이터가 모델 학습에 쓰이지 않게"
- "채팅에서 웹 검색 사용"
- "공개 코드 일치 제안 차단"

## 핵심
- 위치: GitHub 프로필 사진 → Copilot settings.
- Suggestions matching public code: Allow/Block. 대상 Free·Pro·Pro+·Max. GHEC 조직 좌석 사용자는 상속.
- Allow GitHub to use my data for AI model training: 2026-04-24부터 Free·Pro·Pro+·Max 상호 작용을 학습에 쓸 수 있으며 Disabled로 거부. Business·Enterprise 계정에는 표시되지 않는다(변동 정보).
- Copilot access to Bing: 채팅 웹 검색, 기본 꺼짐.
- 클라우드 에이전트 리포지토리 접근: 없음·모두·선택한 리포지토리.

## 헷갈리는 개념
| 개념 | 차이 |
|---|---|
| [[조직 Copilot 정책]] | 개인 선택 vs 조직 강제 |

## 오답 함정
> [!warning] Business 사용자가 개인 설정에서 모델 학습 사용을 끈다는 선택지 → Business·Enterprise에는 그 설정이 없다

## 관련
- [[공개 코드 일치 필터와 코드 참조]] · [[데이터 사용·보존]] · [[조직 Copilot 정책]]

**공식 목표**: [[6 개인정보 보호, 콘텐츠 제외, 보호 장치 구성#목표 6.1|6.1]] · [[6 개인정보 보호, 콘텐츠 제외, 보호 장치 구성#목표 6.3|6.3]] · [[3 GitHub Copilot 데이터와 아키텍처 이해#목표 3.1|3.1]]  
**근거**: [Managing Copilot policies as an individual subscriber](https://docs.github.com/en/copilot/how-tos/manage-your-account/manage-policies)

## 셀프 체크
> [!question]- 개인 Copilot 설정에 들어가는 경로는?
> 프로필 사진 → Copilot settings

> [!question]- Copilot Chat의 Bing 웹 검색 기본값은?
> 꺼짐
