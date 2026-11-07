---
aliases: ["CLAUDE.md", "CLAUDE.local.md", "CLAUDE.mdの階層", "@import", "CLAUDE.md 범위"]
tags: ["ccar-p", "リファレンス", "分野7"]
分野: 7
目標: ["7.1", "6.4"]
重要度: "高"
---
# CLAUDE.mdのスコープ

> [!summary] 一行定義
> Claude Codeが毎セッション読み込む指示ファイル。管理対象・ユーザー・プロジェクト・ローカルのスコープに分かれ、チーム共有の指示はプロジェクトのCLAUDE.mdに置く。

**English** CLAUDE.md scopes

## 試験のトリガー
- 「チームのコーディングルールをすべてのセッションに適用」
- 「個人のサンドボックスURLは共有したくない」
- 「全社のセキュリティ指示」

## 要点
- 管理対象ポリシー：組織全体（IT部門が配布）。ユーザー：~/.claude/CLAUDE.md（すべてのプロジェクト）。プロジェクト：./CLAUDE.mdまたは./.claude/CLAUDE.md（ソース管理でチーム共有）。ローカル：./CLAUDE.local.md（個人用、.gitignore）。
- @path/to/import構文で他のファイルを取り込める。ただし取り込んだファイルも一緒に読み込まれるため、コンテキストのコストは減らない。
- ファイルあたり200行未満を推奨。一部のコードにだけ必要な指示は、パス指定のルール（.claude/rules/、paths）に移す。
- 管理対象のCLAUDE.mdはclaudeMdExcludesで除外できない。強制が必要なルールは管理対象設定（permissions.denyなど）で行う。
- 自動メモリ（auto memory）はClaudeが自分で書くノートで、セッションごとに最初の200行または25KBを読み込む。

## 紛らわしい概念
| 概念 | 違い |
|---|---|
| [[Claude Codeの設定の優先順位]] | CLAUDE.mdは行動の指示、設定は技術的な強制 |
| [[Agent Skills]] | 毎セッション読み込みか、必要時に読み込みか |

## 誤答の落とし穴
> [!warning] CLAUDE.mdに「rm -rf禁止」と書けば強制されるという選択肢 → 指示にすぎず、強制はpermissions.deny・フック

## 関連
- [[チーム向けClaude Codeの構成]] · [[Claude Codeの設定の優先順位]] · [[Claude Codeのフック]] · [[CLAUDE.md・設定・フックの比較]]

**公式目標**: [[7 開発者の生産性と運用支援#目標 7.1|7.1]] · [[6 ステークホルダーとのコミュニケーションとライフサイクル管理#目標 6.4|6.4]]  
**根拠**: [Claude Code: How Claude remembers your project](https://code.claude.com/docs/en/memory)

## セルフチェック
> [!question]- チームと共有されるCLAUDE.mdの場所は？
> ./CLAUDE.mdまたは./.claude/CLAUDE.md（ソース管理）

> [!question]- CLAUDE.mdの推奨の長さは？
> ファイルあたり200行未満
