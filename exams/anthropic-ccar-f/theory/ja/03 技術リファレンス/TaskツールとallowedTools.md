---
aliases: ["Task tool", "allowedTools", "サブエージェントの生成"]
tags: ["ccar-f", "リファレンス", "分野1"]
分野: 1
タスク: ["1.3"]
重要度: "高"
---
# TaskツールとallowedTools

> [!summary] 一行定義
> Agent SDKでサブエージェントを生成する仕組みはTaskツールで、コーディネーターがこれを使うにはallowedToolsに"Task"が必要。

**English** Task tool and allowedTools

## 出題のきっかけ
- 「コーディネーターがサブエージェントを呼べない」

## 要点
- allowedToolsに**"Task"**を含めることが必須。
- 1つの応答で複数のTask呼び出し → 並列実行。→ [[サブエージェントの並列生成]]
- サブエージェントに必要な情報はTask呼び出しのプロンプトに明示的に含める。→ [[サブエージェントへのコンテキスト受け渡し]]

## 関連
- [[AgentDefinition]] · [[ハブアンドスポーク型オーケストレーション]]

**公式タスク**: [[1.3 サブエージェントの呼び出しとコンテキストの受け渡し]]

## セルフチェック
> [!question]- コーディネーターがサブエージェントを呼ぶには、allowedToolsに何が必要？
> "Task"
