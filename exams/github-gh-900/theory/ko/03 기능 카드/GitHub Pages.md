---
aliases: ["Pages", "정적 사이트", "github.io", "사용자 사이트", "프로젝트 사이트"]
tags: ["gh-900", "기능카드", "도메인3"]
도메인: 3
목표: ["3.4"]
중요도: "상"
---
# GitHub Pages

> [!summary] 한 줄 정의
> 리포지토리의 HTML·CSS·JavaScript를 그대로(또는 빌드해서) 정적 웹사이트로 게시하는 호스팅 서비스.

**English** GitHub Pages

## 시험 트리거
- "프로젝트 문서 사이트를 무료로 호스팅"
- "개인 포트폴리오 사이트"
- "서버 측 코드(PHP 등)를 실행"

## 핵심
- 정적 사이트 전용: HTML·CSS·JS 파일을 리포지토리에서 바로 게시(선택적 빌드 단계).
- 사용자·조직 사이트: <소유자>.github.io 리포지토리, 계정당 1개, 주소 <소유자>.github.io.
- 프로젝트 사이트: 리포지토리마다 1개, 주소 <소유자>.github.io/<리포지토리>.
- 사용자 지정 도메인 가능. 요금제: Free는 공개 리포지토리, Pro·Team·Enterprise는 비공개 리포지토리에서도.
- Free 계정의 리포지토리를 비공개로 바꾸면 게시된 Pages 사이트가 내려간다.

## 헷갈리는 개념
| 개념 | 차이 |
|---|---|
| [[위키]] | 리포지토리 문서 vs 공개 웹사이트 |
| [[GitHub Actions]] | Pages는 호스팅, Actions는 자동화(빌드·배포에 함께 쓰임) |

## 오답 함정
> [!warning] 오답이 되기 쉬운 선택지
> - Pages에서 데이터베이스·서버 측 코드를 실행한다는 선택지 → 정적 사이트만
> - 사용자 사이트를 계정당 여러 개 만든다는 선택지 → 계정당 1개(프로젝트 사이트는 리포지토리마다)

## 관련
- [[위키]] · [[Gist]] · [[문서화 도구 비교]] · [[GitHub 요금제]]

**공식 목표**: [[3 GitHub로 협업하기#목표 3.4|3.4]]  
**근거**: [What is GitHub Pages?](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages) · [Setting repository visibility](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/managing-repository-settings/setting-repository-visibility)

## 셀프 체크
> [!question]- 사용자 사이트 리포지토리 이름은?
> <사용자 이름>.github.io

> [!question]- 프로젝트 사이트 주소 형식은?
> <소유자>.github.io/<리포지토리>
