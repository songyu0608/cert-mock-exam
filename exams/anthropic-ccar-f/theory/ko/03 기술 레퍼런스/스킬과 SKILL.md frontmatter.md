---
aliases: [".claude/skills", "SKILL.md", "context: fork", "allowed-tools", "argument-hint"]
tags: ["ccar-f", "레퍼런스", "도메인3"]
도메인: 3
태스크: ["3.2"]
중요도: "상"
---
# 스킬과 SKILL.md frontmatter

> [!summary] 한 줄 정의
> .claude/skills/의 SKILL.md로 정의하는 작업별 워크플로. frontmatter로 격리 실행·도구 제한·인자 안내를 설정한다.

**English** Skills and SKILL.md frontmatter

## 시험 트리거
- "분석 출력이 메인 대화를 어지럽힌다"
- "스킬 실행 중 파괴적 작업 금지"
- "인자 없이 호출하면 안내"

## 핵심

| frontmatter | 역할 |
|---|---|
| context: fork | 격리된 서브에이전트 컨텍스트에서 실행 → 출력이 메인 대화를 오염시키지 않음 |
| allowed-tools | 스킬 실행 중 쓸 수 있는 도구 제한 |
| argument-hint | 인자 없이 호출했을 때 필요한 매개변수 안내 |

- 출력이 많은 분석, 탐색성 브레인스토밍 → **context: fork**.
- 개인 변형은 팀에 영향이 없도록 **~/.claude/skills/에 다른 이름**으로.

## 관련
- [[스킬 vs CLAUDE.md]] · [[사용자 지정 슬래시 명령]] · [[3.2 슬래시 명령과 스킬]]

**공식 태스크**: [[3.2 슬래시 명령과 스킬]]

## 셀프 체크
> [!question]- 스킬 출력이 메인 대화를 오염시키지 않게 하는 frontmatter는?
> context: fork

> [!question]- 스킬 실행 중 도구를 제한하는 frontmatter는?
> allowed-tools

> [!question]- 인자 없이 호출했을 때 필요한 값을 안내하는 frontmatter는?
> argument-hint
