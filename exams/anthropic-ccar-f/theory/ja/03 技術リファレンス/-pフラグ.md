---
aliases: ["--print", "非対話モード", "headless"]
tags: ["ccar-f", "リファレンス", "分野3"]
分野: 3
タスク: ["3.6"]
重要度: "高"
---
# -pフラグ

> [!summary] 一行定義
> Claude Codeを非対話モードで実行するフラグ。CIで入力待ちにより止まらないようにする。

**English** -p / --print flag

## 出題のきっかけ
- 「CIのジョブがいつまでも止まっている」
- 「対話的な入力を待っている」

## 要点
- `claude -p "..."` → プロンプトを処理してstdoutに出力し、終了する。
- CLAUDE_HEADLESS環境変数、--batchフラグは**存在しない**（ガイドのサンプル問題の解説）。
- stdinを/dev/nullからリダイレクトするのは正しい方法ではない。

## 誤答の落とし穴
> [!warning] CLAUDE_HEADLESS=true、--batchフラグ → 存在しない機能

## 関連
- [[--output-format jsonと--json-schema]] · [[3.6 CI CDへの統合]] · [[公式サンプル問題12問]]

**公式タスク**: [[3.6 CI CDへの統合]]

## セルフチェック
> [!question]- CIでClaude Codeが入力待ちで止まるときの解決策は？
> -p（--print）フラグで非対話モードで実行
