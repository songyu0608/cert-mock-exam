---
aliases: ["import構文", "CLAUDE.mdのモジュール化"]
tags: ["ccar-f", "リファレンス", "分野3"]
分野: 3
タスク: ["3.1"]
重要度: "中"
---
# @import

> [!summary] 一行定義
> CLAUDE.mdから外部ファイルを参照してモジュール化を保つ構文。

**English** @import in CLAUDE.md

## 出題のきっかけ
- 「パッケージごとに必要な標準だけを含めたい」

## 要点
- パッケージごとのCLAUDE.mdに**関連する標準ファイルだけ**を@import。
- 1つにまとまったCLAUDE.mdの代わりは[[パス固有のルールと.claude rules]]のトピック別ファイル。

## 関連
- [[CLAUDE.mdの階層]]

**公式タスク**: [[3.1 CLAUDE.mdの設定]]

## セルフチェック
> [!question]- CLAUDE.mdでパッケージごとに必要な標準ファイルだけを含める構文は？
> @import
