---
aliases: ["ARC", "Actions Runner Controller", "러너 스케일 세트", "Kubernetes 러너"]
tags: ["gh-200", "기능카드", "도메인4"]
도메인: 4
목표: ["4.4", "5.10"]
중요도: "중"
---
# Actions Runner Controller

> [!summary] 한 줄 정의
> ARC는 Kubernetes에서 자체 호스팅 러너를 컨테이너로 실행하고 작업 수에 따라 자동 확장하는 오퍼레이터다.

**English** Actions Runner Controller (ARC)

## 시험 트리거
- "자체 호스팅 러너를 수요에 맞춰 자동 확장"
- "쿠버네티스 클러스터에서 러너 운영"

## 핵심
- 러너 스케일 세트(runner scale set)가 리포·조직·엔터프라이즈의 실행 중 워크플로 수에 맞춰 자동 확장.
- 임시(ephemeral) 컨테이너 러너: 작업이 끝나면 제거.
- Helm 차트로 설치: gha-runner-scale-set-controller(컨트롤러), gha-runner-scale-set(스케일 세트).
- 구성 요소: 컨트롤러 매니저, 스케일 세트별 리스너 파드, AutoscalingRunnerSet, EphemeralRunner, 러너 이미지.
- 작업은 `runs-on`에 스케일 세트 이름(또는 runnerScaleSetLabels 라벨)을 적어 보낸다.

## 관련
- [[자체 호스팅 러너]] · [[워크플로 최적화 전략]]

**공식 목표**: [[4 엔터프라이즈의 GitHub Actions 관리#목표 4.4|4.4]] · [[5 자동화 보안과 최적화#목표 5.10|5.10]]  
**근거**: [Actions Runner Controller](https://docs.github.com/en/actions/concepts/runners/actions-runner-controller)

## 셀프 체크
> [!question]- ARC를 설치하는 도구는?
> Helm 차트

> [!question]- ARC 러너로 작업을 보내는 runs-on 값은?
> 러너 스케일 세트 이름
