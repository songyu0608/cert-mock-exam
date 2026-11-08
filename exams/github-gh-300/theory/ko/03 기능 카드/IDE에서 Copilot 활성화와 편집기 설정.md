---
aliases: ["Enable Copilot in the IDE", "Copilot 활성화", "편집기 설정", "Editor settings", "github.copilot.enable", "언어별 비활성화"]
tags: ["gh-300", "기능카드", "도메인2"]
도메인: 2
목표: ["2.1", "6.1"]
중요도: "상"
---
# IDE에서 Copilot 활성화와 편집기 설정

> [!summary] 한 줄 정의
> 확장을 설치하고 GitHub 계정으로 로그인해 Copilot을 켜고, 편집기 설정으로 인라인 제안·다음 편집 제안·언어별 사용 여부를 조정한다.

**English** Enabling Copilot and configuring editor settings

## 시험 트리거
- "특정 언어(예: Markdown)에서만 Copilot을 끄고 싶다"
- "인라인 제안을 잠시 끄고 싶다"
- "다음 편집 제안을 켜고 싶다"

## 핵심
- VS Code: 계정 아이콘에서 GitHub로 로그인. 제목 표시줄의 채팅 아이콘 옆 화살표 → Configure Inline Suggestions → Enable/Disable Completions.
- 언어별: settings.json의 `github.copilot.enable`에 언어별 true/false(`"*"`는 기본값).
- 인라인 제안: 설정 → Extensions → Copilot → Inline Suggest: Enable(`editor.inlineSuggest.enabled`).
- 다음 편집 제안: `github.copilot.nextEditSuggestions.enabled`. Business·Enterprise는 조직·엔터프라이즈가 "Editor preview features"를 허용해야 한다.
- 조직에서 Copilot을 받는 경우 조직 정책이 꺼 둔 기능은 IDE에서 쓸 수 없다 → [[조직 Copilot 정책]].
- 설치 절차의 세부(마켓플레이스 확장 이름 등)는 이 볼트에서 공식 문서로 따로 확인하지 않았다.

## 헷갈리는 개념
| 개념 | 차이 |
|---|---|
| [[콘텐츠 제외]] | 내 편집기에서 언어·기능을 끄는 개인 설정 vs 관리자가 파일·리포지토리를 Copilot에서 제외 |

## 오답 함정
> [!warning] 특정 파일을 Copilot에서 제외하려면 편집기 설정에서 언어를 끈다는 선택지 → 파일·경로 단위 제외는 콘텐츠 제외(관리자 설정)

## 관련
- [[인라인 제안과 다음 편집 제안]] · [[콘텐츠 제외]] · [[조직 Copilot 정책]] · [[Copilot 문제 해결]]

**공식 목표**: [[2 GitHub Copilot 기능 사용#목표 2.1|2.1]] · [[6 개인정보 보호, 콘텐츠 제외, 보호 장치 구성#목표 6.1|6.1]]  
**근거**: [Configuring GitHub Copilot in your environment](https://docs.github.com/en/copilot/how-tos/configure-personal-settings/configure-in-ide)

## 셀프 체크
> [!question]- VS Code에서 언어별로 Copilot을 켜고 끄는 설정 키는?
> github.copilot.enable

> [!question]- Business 사용자가 다음 편집 제안을 쓰려면 조직이 허용해야 하는 설정은?
> Editor preview features
