---
aliases: ["Scenario 5", "Claude Code for Continuous Integration", "シナリオ5"]
tags: ["ccar-f", "시나리오"]
---
# 시나리오 5 CI용 Claude Code

**English** Scenario 5: Claude Code for Continuous Integration

> [!abstract] 시나리오 (공식 가이드 번역)
> Claude Code를 CI/CD 파이프라인에 통합한다. 시스템은 자동 코드 리뷰를 하고, 테스트 케이스를 만들고, 풀 리퀘스트에 피드백을 준다. 실행 가능한 피드백을 주고 거짓 양성을 최소화하는 프롬프트를 설계해야 한다.

주요 도메인: 3 Claude Code 구성과 워크플로, 4 프롬프트 엔지니어링과 구조화된 출력

## 이 시나리오에서 자주 나오는 판단
- 멈춤 → [[-p 플래그]]
- 구조화 결과 → [[--output-format json과 --json-schema]]
- 중복 코멘트 → [[CI 리뷰 중복 방지]]
- 거짓 양성 → [[명시적 리뷰 기준]], [[거짓 양성과 개발자 신뢰]]
- 큰 PR → [[다중 패스 리뷰]], [[독립 리뷰 인스턴스]]
- 비용 → [[배치 처리 적합성]]

## 공식 샘플 문제
- [[공식 샘플 문제 12개#문제 10]]
- [[공식 샘플 문제 12개#문제 11]]
- [[공식 샘플 문제 12개#문제 12]]

← [[0 시험 개요와 출제 범위]]
