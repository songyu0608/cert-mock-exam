---
aliases: ["Headless", "-p", "--print", "claude -p", "ヘッドレス", "--bare", "헤드리스 모드(-p)"]
tags: ["ccar-p", "リファレンス", "分野7"]
分野: 7
目標: ["7.2", "3.7"]
重要度: "中"
---
# ヘッドレスモード（-p）

> [!summary] 一行定義
> claude -pでClaude Codeを非対話で実行し、CI・スクリプトで使う方式。

**English** Run Claude Code programmatically (-p)

## 試験のトリガー
- 「CIパイプラインでClaude Codeを実行」
- 「結果をJSONで受け取ってパース」
- 「どのマシンでも同じ結果が必要」

## 要点
- claude -p "タスク" --allowedTools "Read,Edit,Bash"のように、自動承認するツールを指定する。
- --output-format：text、json（total_cost_usdを含む、クライアント側の推定値）、stream-json（リアルタイムの行単位JSON）。
- --bare：フック・スキル・MCPサーバー・CLAUDE.md・自動メモリなどの自動検出をスキップし、どのマシンでも同じ結果を出す。APIキー（ANTHROPIC_API_KEY）が必要。
- --bareなしで-pを使うと、プロジェクトの.claude/settings.jsonのフックと.mcp.jsonのサーバーが信頼確認ダイアログなしで実行される。

## 紛らわしい概念
| 概念 | 違い |
|---|---|
| [[Claude Codeのフック]] | -pは実行方式、フックは実行中の自動動作 |

## 誤答の落とし穴
> [!warning] 信頼していないリポジトリで-pを実行してもプロジェクトのフックは実行されないという選択肢 → --bareなしでは実行される

## 関連
- [[AI支援による開発ワークフロー]] · [[Claude Codeのフック]] · [[統合メカニズムの選択（MCP・API・CLI・A2A）]]

**公式目標**: [[7 開発者の生産性と運用支援#目標 7.2|7.2]] · [[3 統合#目標 3.7|3.7]]  
**根拠**: [Claude Code: Run programmatically](https://code.claude.com/docs/en/headless)

## セルフチェック
> [!question]- CIで毎回同じ結果を出すために自動検出をオフにするフラグは？
> --bare

> [!question]- コスト情報が含まれる出力形式は？
> --output-format json（total_cost_usd）
