---
aliases: ["settings.json", "managed-settings.json", "permissions", "設定の優先順位", "Claude Code 설정 우선순위"]
tags: ["ccar-p", "リファレンス", "分野7"]
分野: 7
目標: ["7.1", "3.2"]
重要度: "高"
---
# Claude Codeの設定の優先順位

> [!summary] 一行定義
> Claude Codeの設定は、管理対象 > コマンドライン > ローカルプロジェクト > 共有プロジェクト > ユーザーの順に適用される。権限のリストはスコープをまたいで結合される。

**English** Claude Code settings precedence

## 試験のトリガー
- 「組織のポリシーを開発者が上書きできないように」
- 「チームで共有する権限ルール」
- 「個人の設定をこのプロジェクトだけに」

## 要点
- 優先順位（高い順）：管理対象（managed-settings.json・MDM・サーバー管理） → コマンドライン（--settings） → ローカルプロジェクト（.claude/settings.local.json） → 共有プロジェクト（.claude/settings.json） → ユーザー（~/.claude/settings.json）。
- リストの値（例：permissions.allow）は上書きされず、スコープをまたいで結合される。
- 管理対象設定で強制するものの例：permissions.deny（ツール・コマンド・パスのブロック）、sandbox.enabled、env（APIプロバイダーのルーティング）、forceLoginMethod・forceLoginOrgUUID。
- 一部のセキュリティキーは、より厳しい値が下位のスコープにあればそれに従う。

## 紛らわしい概念
| 概念 | 違い |
|---|---|
| [[CLAUDE.mdのスコープ]] | 設定は強制、CLAUDE.mdは指示 |

## 誤答の落とし穴
> [!warning] ユーザー設定が管理対象設定を上書きするという選択肢 → 管理対象が最上位

## 関連
- [[チーム向けClaude Codeの構成]] · [[CLAUDE.mdのスコープ]] · [[Claude Codeのフック]] · [[認証と認可のギャップ]]

**公式目標**: [[7 開発者の生産性と運用支援#目標 7.1|7.1]] · [[3 統合#目標 3.2|3.2]]  
**根拠**: [Claude Code: Settings](https://code.claude.com/docs/en/settings) · [Claude Code: How Claude remembers your project](https://code.claude.com/docs/en/memory)

## セルフチェック
> [!question]- Claude Codeの設定の優先順位（高い順）は？
> 管理対象 > コマンドライン > ローカルプロジェクト > 共有プロジェクト > ユーザー

> [!question]- チームがソース管理で共有する設定ファイルは？
> .claude/settings.json
