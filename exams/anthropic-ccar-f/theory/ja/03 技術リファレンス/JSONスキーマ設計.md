---
aliases: ["JSON Schema", "required", "enum", "strict mode"]
tags: ["ccar-f", "リファレンス", "分野4"]
分野: 4
タスク: ["4.3"]
重要度: "中"
---
# JSONスキーマ設計

> [!summary] 一行定義
> 抽出スキーマの設計要素：必須と任意のフィールド、nullable、enum、"other"＋詳細文字列、strictモード。

**English** JSON Schema design

## 出題のきっかけ
- 「抽出スキーマをどう設計するか」

## 要点
- 必須と任意：ソースにない可能性があれば**任意（nullable）**。→ [[nullableフィールドと捏造の防止]]
- enum：曖昧なら**"unclear"**、拡張可能なら**"other"＋詳細**。
- strictモードは構文エラーをなくす。意味的なエラーは別途検証。

## 関連
- [[tool_useによる構造化出力]] · [[Pydanticによる検証]]

**公式タスク**: [[4.3 ツール使用とJSONスキーマ]]

## セルフチェック
> [!question]- 曖昧な値を表すenum値の例は？
> "unclear"
