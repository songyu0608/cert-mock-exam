---
aliases: ["output-format json", "json-schema", "CLIの構造化出力"]
tags: ["ccar-f", "リファレンス", "分野3"]
分野: 3
タスク: ["3.6"]
重要度: "中"
---
# --output-format jsonと--json-schema

> [!summary] 一行定義
> CIでClaude Codeの結果を機械が解析できる構造化された形式に強制するCLIフラグ。

**English** --output-format json / --json-schema

## 出題のきっかけ
- 「レビュー結果をPRのインラインコメントとして自動投稿」

## 要点
- --output-format json＋--json-schema → 解析可能な結果 → PRのインラインコメントに自動投稿。

## 混同しやすい概念
| 概念 | 違い |
|---|---|
| [[tool_useによる構造化出力]] | APIレベルの構造化出力 |

## 関連
- [[-pフラグ]] · [[CIレビューの重複防止]]

**公式タスク**: [[3.6 CI CDへの統合]]

## セルフチェック
> [!question]- CIで結果を機械が解析できるようにするCLIフラグ2つは？
> --output-format json、--json-schema
