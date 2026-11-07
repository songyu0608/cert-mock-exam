---
aliases: [".claude/skills", "SKILL.md", "context: fork", "allowed-tools", "argument-hint"]
tags: ["ccar-f", "リファレンス", "分野3"]
分野: 3
タスク: ["3.2"]
重要度: "高"
---
# スキルとSKILL.mdフロントマター

> [!summary] 一行定義
> .claude/skills/のSKILL.mdで定義するタスク別のワークフロー。フロントマターで分離実行・ツール制限・引数の案内を設定する。

**English** Skills and SKILL.md frontmatter

## 出題のきっかけ
- 「分析の出力がメインの会話を散らかす」
- 「スキル実行中の破壊的な操作を禁止」
- 「引数なしで呼ばれたら案内」

## 要点

| フロントマター | 役割 |
|---|---|
| context: fork | 分離されたサブエージェントのコンテキストで実行 → 出力がメインの会話を汚さない |
| allowed-tools | スキル実行中に使えるツールを制限 |
| argument-hint | 引数なしで呼ばれたときに必要なパラメーターを案内 |

- 出力の多い分析、探索的なブレインストーミング → **context: fork**。
- 個人用のバリエーションは、チームに影響しないよう**~/.claude/skills/に別名で**作る。

## 関連
- [[スキルとCLAUDE.mdの使い分け]] · [[カスタムスラッシュコマンド]] · [[3.2 スラッシュコマンドとスキル]]

**公式タスク**: [[3.2 スラッシュコマンドとスキル]]

## セルフチェック
> [!question]- スキルの出力がメインの会話を汚さないようにするフロントマターは？
> context: fork

> [!question]- スキル実行中のツールを制限するフロントマターは？
> allowed-tools

> [!question]- 引数なしで呼ばれたときに必要な値を案内するフロントマターは？
> argument-hint
