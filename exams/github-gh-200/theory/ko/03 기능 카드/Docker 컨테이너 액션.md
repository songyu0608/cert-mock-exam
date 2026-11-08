---
aliases: ["Docker container action", "Dockerfile 액션", "docker://"]
tags: ["gh-200", "기능카드", "도메인3"]
도메인: 3
목표: ["3.1", "3.2"]
중요도: "중"
---
# Docker 컨테이너 액션

> [!summary] 한 줄 정의
> 액션 코드와 실행 환경을 Docker 이미지로 묶은 액션이다. `runs.using: docker`, `image`로 정의한다.

**English** Docker container actions

## 시험 트리거
- "특정 Linux 도구 버전이 꼭 필요"
- "Docker 액션이 Windows 러너에서 실패"
- "Docker 액션이 느리다"

## 핵심
- runs: using docker, image(필수: Dockerfile, 공개 레지스트리 이미지, docker:// 참조), args, env, entrypoint, pre-entrypoint, post-entrypoint.
- 입력은 args로 컨테이너에 전달해야 한다.
- Linux 러너에서만. 자체 호스팅이면 Docker 설치 필요.
- GitHub는 /github 경로를 예약하고 /github/home, /github/workspace, /github/workflow를 마운트한다. Dockerfile에서 USER를 지정하지 않는다(기본 root).
- 워크플로에서 Docker Hub 이미지를 `uses: docker://image:tag`로 바로 쓸 수도 있다. 이미지 무결성 확인 권장.

## 오답 함정
> [!warning] Dockerfile에 USER를 지정해 비루트로 실행하는 것을 권장한다는 선택지 → 문서는 USER 지시어를 쓰지 말라고 한다

## 관련
- [[사용자 지정 액션 유형]] · [[서비스 컨테이너]] · [[액션 문제 해결]]

**공식 목표**: [[3 액션 작성과 유지 관리#목표 3.1|3.1]] · [[3 액션 작성과 유지 관리#목표 3.2|3.2]]  
**근거**: [Metadata syntax reference](https://docs.github.com/en/actions/reference/workflows-and-actions/metadata-syntax) · [About custom actions](https://docs.github.com/en/actions/concepts/workflows-and-actions/custom-actions) · [GitHub-hosted runners reference](https://docs.github.com/en/actions/reference/runners/github-hosted-runners) · [Finding and customizing actions](https://docs.github.com/en/actions/how-tos/write-workflows/choose-what-workflows-do/find-and-customize-actions)

## 셀프 체크
> [!question]- Docker 액션에 입력을 전달하는 방법은?
> runs.args

> [!question]- Docker 액션 Dockerfile에서 피해야 할 지시어는?
> USER
