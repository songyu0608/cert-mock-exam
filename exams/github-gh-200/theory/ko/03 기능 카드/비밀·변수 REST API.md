---
aliases: ["Secrets REST API", "LibSodium", "public-key", "Variables REST API"]
tags: ["gh-200", "기능카드", "도메인4"]
도메인: 4
목표: ["4.9"]
중요도: "중"
---
# 비밀·변수 REST API

> [!summary] 한 줄 정의
> REST API로 비밀·변수를 만들고 바꾼다. 비밀은 먼저 공개 키를 받아 LibSodium으로 암호화한 값을 보낸다.

**English** Managing secrets and variables with the REST API

## 시험 트리거
- "수백 개 리포에 같은 비밀을 스크립트로 등록"
- "API로 비밀 값을 읽고 싶다"

## 핵심
- 절차: `GET /repos/{owner}/{repo}/actions/secrets/public-key`(key_id, key) → LibSodium 암호화 → `PUT /repos/{owner}/{repo}/actions/secrets/{secret_name}`(encrypted_value, key_id). 생성 201, 갱신 204.
- 조직: `PUT /orgs/{org}/actions/secrets/{name}` + visibility(all, private, selected), selected일 때 selected_repository_ids.
- 목록·조회는 이름·날짜만 반환하고 값은 절대 돌려주지 않는다.
- 권한: 클래식 PAT은 리포 `repo`, 조직 `admin:org`. 세분화 토큰은 Secrets(쓰기), 환경은 Environments(쓰기).
- 변수는 암호화 없이 평문으로 생성·조회할 수 있다〔해석: 변수 REST 세부는 이 볼트에서 원문 확인 안 함〕.

## 오답 함정
> [!warning] 오답이 되기 쉬운 선택지
> - REST API로 저장된 비밀 값을 읽을 수 있다는 선택지 → 값은 반환되지 않는다
> - 비밀을 평문으로 PUT한다는 선택지 → 공개 키로 LibSodium 암호화

## 관련
- [[비밀(secrets)]] · [[구성 변수(vars)]] · [[Actions REST API(로그·아티팩트·캐시)]]

**공식 목표**: [[4 엔터프라이즈의 GitHub Actions 관리#목표 4.9|4.9]]  
**근거**: [REST API endpoints for GitHub Actions secrets](https://docs.github.com/en/rest/actions/secrets)

## 셀프 체크
> [!question]- 비밀 생성 전 먼저 호출하는 엔드포인트는?
> .../actions/secrets/public-key

> [!question]- 비밀 암호화 라이브러리는?
> LibSodium
