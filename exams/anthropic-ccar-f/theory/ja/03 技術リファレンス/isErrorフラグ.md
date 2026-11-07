---
aliases: ["isError", "MCP error"]
tags: ["ccar-f", "リファレンス", "分野2"]
分野: 2
タスク: ["2.2"]
重要度: "中"
---
# isErrorフラグ

> [!summary] 一行定義
> MCPツールがエージェントに失敗を伝えるフラグのパターン。

**English** MCP isError flag

## 出題のきっかけ
- 「ツールの失敗をエージェントに伝えるには」

## 要点
- 失敗した結果にisErrorを付け、合わせて**errorCategory・isRetryable・説明**を返す。→ [[エラーカテゴリとリトライ可否]]

## 関連
- [[エラーカテゴリとリトライ可否]]

**公式タスク**: [[2.2 MCPツールの構造化されたエラーレスポンス]]

## セルフチェック
> [!question]- MCPツールが失敗をエージェントに伝えるフラグは？
> isError
