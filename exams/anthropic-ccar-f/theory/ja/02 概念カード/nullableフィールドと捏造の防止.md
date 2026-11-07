---
aliases: ["optional field", "nullable", "null許容", "任意フィールド"]
tags: ["ccar-f", "概念カード", "分野4"]
分野: 4
タスク: ["4.3"]
重要度: "高"
---
# nullableフィールドと捏造の防止

> [!summary] 一行定義
> ソースにない可能性のある情報を必須フィールドにすると、モデルは値を捏造する。任意（nullable）フィールドにしてnullを許容する。

**English** Nullable fields to prevent fabrication

## 出題のきっかけ
- 「ソースにない値が埋まっている」
- 「必須フィールドを満たすために捏造する」

## 要点
- ないかもしれない情報 → **optional / nullable**。
- 曖昧なケース → enumに**"unclear"**。
- 拡張可能な分類 → enumの**"other"＋詳細文字列**フィールド。

## 関連
- [[JSONスキーマ設計]] · [[tool_useによる構造化出力]]

**公式タスク**: [[4.3 ツール使用とJSONスキーマ]]

## セルフチェック
> [!question]- ソースにない値をモデルが捏造するのを防ぐスキーマ設計は？
> そのフィールドを任意（nullable）にする

> [!question]- 拡張可能なカテゴリをenumで表すパターンは？
> "other"＋詳細文字列フィールド
