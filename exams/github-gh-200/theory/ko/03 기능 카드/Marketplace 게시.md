---
aliases: ["Publishing to GitHub Marketplace", "GitHub Marketplace", "마켓플레이스"]
tags: ["gh-200", "기능카드", "도메인3"]
도메인: 3
목표: ["3.6"]
중요도: "상"
---
# Marketplace 게시

> [!summary] 한 줄 정의
> 공개 리포지토리의 액션을 릴리스할 때 "Publish this Action to the GitHub Marketplace"를 선택해 Marketplace에 등재한다.

**English** Publishing actions in GitHub Marketplace

## 시험 트리거
- "만든 액션을 Marketplace 검색에 노출"
- "게시 체크박스가 비활성"
- "하위 폴더 액션이 등재되지 않는다"

## 핵심
- 리포지토리는 공개여야 한다.
- 루트에 단일 메타데이터 파일(action.yml/action.yaml). 하위 폴더 메타데이터는 자동 등재되지 않는다.
- name은 고유: 기존 Marketplace 액션, 다른 사용자·조직 이름(본인 제외), 카테고리 이름, 예약된 GitHub 기능 이름과 겹치면 안 된다.
- 리포 소유자(또는 조직 소유자)가 GitHub Marketplace Developer Agreement를 수락해야 체크박스가 활성화된다.
- 2단계 인증(2FA) 필수. 주 카테고리 필수, 보조 카테고리 선택.
- 리포에는 액션에 필요한 파일만 두는 것이 권장된다.
- 검증된 작성자(verified creator) 배지는 게시 요건이 아니며 partnerships@github.com으로 요청. 리포를 이전하면 배지가 사라질 수 있다.

## 오답 함정
> [!warning] Marketplace 게시에 GitHub의 코드 심사 승인이 필요하다는 선택지 → 요건(공개, 단일 action.yml, 고유 이름, 약관, 2FA)을 충족하고 릴리스로 게시〔해석: 심사 절차는 문서에 없음〕

## 관련
- [[액션 메타데이터(action.yml)]] · [[액션 배포 모델]] · [[신뢰할 수 있는 Marketplace 액션]] · [[액션 버전 관리와 릴리스]]

**공식 목표**: [[3 액션 작성과 유지 관리#목표 3.6|3.6]]  
**근거**: [Publishing actions in GitHub Marketplace](https://docs.github.com/en/actions/how-tos/create-and-publish-actions/publish-in-github-marketplace)

## 셀프 체크
> [!question]- Marketplace 게시에 필요한 인증 조건은?
> 2단계 인증(2FA)

> [!question]- Marketplace 게시용 메타데이터 파일 위치는?
> 리포지토리 루트에 하나
