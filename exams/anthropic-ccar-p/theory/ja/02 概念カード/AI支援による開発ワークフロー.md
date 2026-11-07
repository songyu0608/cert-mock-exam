---
aliases: ["AI-assisted developer workflow", "AI支援ツール", "Developer productivity", "開発者の生産性", "AI 보조 개발 워크플로"]
tags: ["ccar-p", "概念カード", "分野7"]
分野: 7
目標: ["7.2"]
重要度: "中"
---
# AI支援による開発ワークフロー

> [!summary] 一行定義
> Claude Codeを対話的な作業だけでなく、CI・スクリプト（-p）、フック（自動フォーマット・ブロック）、スキル・サブエージェントとしてチームの反復作業につなげる。

**English** Improving developer workflows with AI-assisted tooling

## 試験のトリガー
- 「PRごとに自動レビューを実行したい」
- 「編集後は常にフォーマッターを実行」
- 「繰り返されるチームの手順を再利用」

## 要点
- 非対話実行：claude -p "..." --allowedTools "Read,Edit,Bash" → CI・スクリプトで使用 → [[ヘッドレスモード（-p）]]。
- --output-format json/stream-jsonで結果をパースする。json出力にはtotal_cost_usdが含まれる（クライアント側の推定値）。
- フック：PostToolUse（Edit|Write）で編集後にPrettierを実行、PreToolUseで終了コード2により保護ファイルの編集をブロック → [[Claude Codeのフック]]。
- スキル：繰り返しの手順をSKILL.mdにまとめ、必要なときだけ読み込む → [[Agent Skills]]。
- 〔解釈〕人間がレビューするポイント（PRの承認など）は残し、反復作業を自動化する。

## 紛らわしい概念
| 概念 | 違い |
|---|---|
| [[チーム向けClaude Codeの構成]] | 環境の構成か、ワークフローの自動化か |

## 誤答の落とし穴
> [!warning] CIで対話セッションを起動する選択肢 → 非対話の-pモードを使う

## 関連
- [[ヘッドレスモード（-p）]] · [[Claude Codeのフック]] · [[Agent Skills]] · [[チーム向けClaude Codeの構成]] · [[デバッグと運用上の問題解決の支援]]

**公式目標**: [[7 開発者の生産性と運用支援#目標 7.2|7.2]]  
**根拠**: [Claude Code: Run programmatically](https://code.claude.com/docs/en/headless) · [Claude Code: Hooks guide](https://code.claude.com/docs/en/hooks-guide) · [Agent Skills](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview)

## セルフチェック
> [!question]- Claude Codeを非対話で実行するフラグは？
> -p（--print）

> [!question]- 編集後にフォーマッターを自動実行するフックイベントは？
> PostToolUse（Edit|Writeマッチャー）
