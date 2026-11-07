---
aliases: ["Hooks", "PreToolUse", "PostToolUse", "フック", "Claude Code 훅"]
tags: ["ccar-p", "リファレンス", "分野7"]
分野: 7
目標: ["7.2", "5.1"]
重要度: "中"
---
# Claude Codeのフック

> [!summary] 一行定義
> Claude Codeのライフサイクルの特定の時点（ツール実行の前後、通知など）でシェルコマンドを自動実行する機能。指示ではなく決定的に実行される。

**English** Claude Code hooks

## 試験のトリガー
- 「ファイルを編集するたびにフォーマッターを実行」
- 「.envファイルの編集を防ぎたい」
- 「Claudeが入力を待っているときに通知」

## 要点
- PreToolUse：ツール実行前。ブロックできる（終了コード2 → ブロック、stderrのメッセージがClaudeへのフィードバックとして渡される）。
- PostToolUse：ツールの成功後。例：Edit|Writeマッチャーで編集後にPrettierを実行。
- 複数のフックのPreToolUseの権限判定は、最も制限的な回答が適用される（deny > defer > ask > allow）。
- 設定ファイル（例：.claude/settings.json）のhooksブロックで定義する。
- -p実行ではプロジェクトのフックが実行されるが、--bareモードではフックを読み込まない → [[ヘッドレスモード（-p）]]。

## 紛らわしい概念
| 概念 | 違い |
|---|---|
| [[CLAUDE.mdのスコープ]] | モデルが従うかもしれない指示か、常に実行されるコードか |

## 誤答の落とし穴
> [!warning] 保護ファイルのブロックをCLAUDE.mdの指示だけで行う選択肢 → 確実なブロックはPreToolUseフック（終了コード2）や権限ルール

## 関連
- [[AI支援による開発ワークフロー]] · [[CLAUDE.mdのスコープ]] · [[Claude Codeの設定の優先順位]] · [[CLAUDE.md・設定・フックの比較]]

**公式目標**: [[7 開発者の生産性と運用支援#目標 7.2|7.2]] · [[5 ガバナンス、安全性、リスク管理#目標 5.1|5.1]]  
**根拠**: [Claude Code: Hooks guide](https://code.claude.com/docs/en/hooks-guide) · [Claude Code: Run programmatically](https://code.claude.com/docs/en/headless)

## セルフチェック
> [!question]- PreToolUseフックがツール実行をブロックする終了コードは？
> 2

> [!question]- 複数のPreToolUseフックの判定が異なるときは？
> 最も制限的な判定（deny > defer > ask > allow）
