---
aliases: ["YAML anchors", "YAML aliases", "앵커", "병합 키"]
tags: ["gh-200", "기능카드", "도메인1"]
도메인: 1
목표: ["1.9", "2.3"]
중요도: "중"
---
# YAML 앵커와 별칭

> [!summary] 한 줄 정의
> 한 워크플로 파일 안에서 `&이름`으로 표시한 내용을 `*이름`으로 다시 써서 반복되는 매핑·단계를 줄인다.

**English** YAML anchors and aliases

## 시험 트리거
- "여러 작업에 같은 env 블록을 반복"
- "별칭이 들어간 워크플로가 실제로 어떻게 펼쳐지는지 해석"

## 핵심
- GitHub Actions는 2025-09-18부터 YAML 앵커를 지원한다(변경 로그). 모든 사용자·리포지토리에 자동 적용.
- 앵커 `&`가 내용을 표시하고, 별칭 `*`이 그 내용을 그대로 반복한다. env, 단계, 작업 전체 등에 쓸 수 있다.
- 문서 예시는 한 파일 안에서만 쓴다. 파일 간 재사용은 재사용 워크플로·복합 액션의 몫.
- 분석할 때는 별칭 자리에 앵커 내용을 그대로 복사해 넣은 것처럼 읽는다.
- 병합 키 `<<`: 학습 가이드는 언급하지만, GitHub 문서·변경 로그에서 지원 여부를 확인하지 못했다. 2025-09 제3자 글은 미지원이라고 했다(변동 정보).

## 헷갈리는 개념
| 개념 | 차이 |
|---|---|
| [[재사용 워크플로]] | 파일 간·리포지토리 간 재사용 vs 한 파일 안의 반복 제거 |

## 오답 함정
> [!warning] YAML 앵커로 다른 워크플로 파일의 내용을 가져온다는 선택지 → 한 파일 안에서만〔해석: 문서 예시 기준〕

## 관련
- [[재사용 워크플로]] · [[시작 워크플로 vs 재사용 워크플로 vs 복합 액션]]

**공식 목표**: [[1 워크플로 작성과 관리#목표 1.9|1.9]] · [[2 워크플로 사용과 문제 해결#목표 2.3|2.3]]  
**근거**: [Reusing workflow configurations (reference)](https://docs.github.com/en/actions/reference/workflows-and-actions/reusing-workflow-configurations) · [Changelog: YAML anchors and non-public workflow templates (2025-09-18)](https://github.blog/changelog/2025-09-18-actions-yaml-anchors-and-non-public-workflow-templates/) · [제3자 글: GitHub Actions YAML anchors(merge keys) — 참고용](https://frenck.dev/github-actions-yaml-anchors-aliases-merge-keys/)

## 셀프 체크
> [!question]- YAML에서 내용을 표시하는 기호와 반복하는 기호는?
> 앵커 &, 별칭 *
