---
aliases: ["Failure modes", "障害モード", "LLM limitations", "LLMの限界", "LLM 실패 모드"]
tags: ["ccar-p", "概念カード", "分野5"]
分野: 5
目標: ["5.2"]
重要度: "高"
---
# LLMの障害モード

> [!summary] 一行定義
> LLMシステムで繰り返し現れる失敗の類型を知り、設計段階で備える。

**English** Risks, limitations and failure modes of LLM systems

## 試験のトリガー
- 「同じ入力なのに答えが変わる」
- 「長い作業の終盤で前の決定を忘れる」
- 「エージェントの誤りがステップごとに積み重なる」

## 要点
- ハルシネーション：軽減手法で大きく減らせるが、完全にはなくせない → [[ハルシネーションの低減]]。
- プロンプトインジェクション・ジェイルブレイク：外部コンテンツやユーザー入力を通じた攻撃 → [[プロンプトインジェクション]]。
- 非決定性：エージェントは同じプロンプトでも実行ごとに決定が変わり、デバッグが難しい（マルチエージェントの記事）。
- コンテキストの劣化（context rot）：トークンが増えるほど精度・想起率が下がる → [[コンテキストウィンドウとトークン管理]]。
- 誤りの累積：エージェントは自律性ゆえにコストが高く、誤りが累積しうる。長時間のエージェントでは小さな誤りが大きく波及する。
- ツール選択の混乱：ツールが30〜50個を超えたり機能が重複したりすると、誤ったツールを選ぶ。

## 紛らわしい概念
| 概念 | 違い |
|---|---|
| [[システムの問題の診断]] | 失敗類型の一覧か、発生後の原因究明か |

## 誤答の落とし穴
> [!warning] 大きいモデルを使えば障害モードがなくなるという選択肢 → 構造的な対策（検証・権限・モニタリング）が必要

## 関連
- [[ハルシネーションの低減]] · [[プロンプトインジェクション]] · [[コンテキストウィンドウとトークン管理]] · [[オブザーバビリティとモニタリング]] · [[ヒューマン・イン・ザ・ループ]]

**公式目標**: [[5 ガバナンス、安全性、リスク管理#目標 5.2|5.2]]  
**根拠**: [Reduce hallucinations](https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations) · [Mitigate jailbreaks and prompt injections](https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/mitigate-jailbreaks) · [How we built our multi-agent research system](https://www.anthropic.com/research/multi-agent-research-system) · [Context windows](https://platform.claude.com/docs/en/build-with-claude/context-windows) · [Building effective AI agents](https://www.anthropic.com/research/building-effective-agents) · [Tool search tool](https://platform.claude.com/docs/en/agents-and-tools/tool-use/tool-search-tool)

## セルフチェック
> [!question]- エージェントのデバッグが難しい理由（マルチエージェントの記事）は？
> 同じプロンプトでも実行ごとに非決定的に異なる決定を下す

> [!question]- トークンが増えるほど精度が下がる障害モードは？
> context rot（コンテキストの劣化）
