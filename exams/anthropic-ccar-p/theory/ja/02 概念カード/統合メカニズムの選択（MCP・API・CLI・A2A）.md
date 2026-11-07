---
aliases: ["Integration mechanism", "統合メカニズム", "MCP vs API", "Agent-to-agent", "エージェント間", "A2A", "통합 메커니즘 선택(MCP·API·CLI·A2A)"]
tags: ["ccar-p", "概念カード", "分野3"]
分野: 3
目標: ["3.7"]
重要度: "高"
---
# 統合メカニズムの選択（MCP・API・CLI・A2A）

> [!summary] 一行定義
> 外部システムをClaudeにつなぐときに、再利用・標準化（MCP）、直接制御（API/CLIのツール）、エージェント間の委任（A2A）から要件に合うものを選ぶ。

**English** Selecting the integration mechanism (MCP, API/CLI, agent-to-agent)

## 試験のトリガー
- 「複数のエージェントやアプリで同じ社内システムを使う」
- 「単発のスクリプトでAPIを一つだけ呼ぶ」
- 「別チームのエージェントに作業を渡す」

## 要点
- MCP：AIエージェントを外部システムにつなぐオープン標準。一度実装すれば複数のクライアント・サーバーとつながり、組み合わせごとの個別統合が減る。
- Messages APIのMCPコネクタは公開HTTP（Streamable HTTP・SSE）サーバーのみ接続でき、MCPの機能のうちツール呼び出しだけをサポートする。ローカルのSTDIOサーバーは直接接続できない → [[MCPコネクタ]]。
- API/CLI：アプリのコードが直接APIを呼ぶか、ユーザー定義ツールで包む。呼び出しごとに検証やゲートをコードで入れやすい。Claude Codeでは-pでCLIを自動化 → [[ヘッドレスモード（-p）]]。
- 〔解釈〕エージェント間（A2A）：別のエージェントに作業を委任する。信頼の境界・認証・結果の検証を設計する必要がある。A2Aの詳細はAnthropicの公式ドキュメントで今回確認できなかった。
- 〔解釈〕判断の軸：再利用の範囲、配置場所（リモート/ローカル）、セキュリティの境界、運用負担、必要なMCP機能（ツール以外のリソース・プロンプトが必要か）。

## 紛らわしい概念
| 概念 | 違い |
|---|---|
| [[MCP（モデルコンテキストプロトコル）]] | プロトコル自体か、メカニズム選択の判断か |

## 誤答の落とし穴
> [!warning] 誤答になりやすい選択肢
> - ローカルのSTDIO MCPサーバーをMessages APIのMCPコネクタに直接つなぐという選択肢 → 公開HTTPサーバーのみ
> - 「MCPを使えば認可の設計は不要」→ 接続の標準にすぎず、権限の範囲は別に設計する

## 関連
- [[MCP（モデルコンテキストプロトコル）]] · [[MCPコネクタ]] · [[Claude CodeのMCPスコープ]] · [[ヘッドレスモード（-p）]] · [[MCP・API直接呼び出し・エージェント間の比較]]

**公式目標**: [[3 統合#目標 3.7|3.7]]  
**根拠**: [Code execution with MCP](https://www.anthropic.com/research/code-execution-with-mcp) · [MCP connector](https://platform.claude.com/docs/en/agents-and-tools/mcp-connector) · [Claude Code: Run programmatically](https://code.claude.com/docs/en/headless)

## セルフチェック
> [!question]- Messages APIのMCPコネクタの2つの制限は？
> MCPの機能のうちツール呼び出しのみ、公開HTTPサーバーのみ接続（ローカルSTDIO不可）
