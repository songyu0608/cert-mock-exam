---
aliases: ["MCP connector", "mcp_servers", "MCP 커넥터"]
tags: ["ccar-p", "リファレンス", "分野3"]
分野: 3
目標: ["3.7", "3.2"]
重要度: "中"
---
# MCPコネクタ

> [!summary] 一行定義
> MCPクライアントを自前で実装せず、Messages APIのリクエストからリモートMCPサーバーに接続するベータ機能。

**English** MCP connector (Messages API)

## 試験のトリガー
- 「APIリクエストから直接リモートMCPサーバーのツールを使いたい」
- 「特定のMCPツールだけを許可したい」

## 要点
- リクエストにmcp_serversと、それに対応するmcp_toolset（tools内）を入れる。ベータヘッダーが必要（2026-11時点でベータ）。
- ツール全体の許可、許可リスト（allowlist）、拒否リスト（denylist）、ツールごとの設定が可能。OAuth Bearerトークン認証をサポートする。
- 制限：MCP仕様のうちツール呼び出しのみサポート。サーバーはHTTP（Streamable HTTP・SSE）で公開されている必要があり、ローカルのSTDIOサーバーには直接接続できない。
- ZDRの対象ではない（標準の保持ポリシーが適用される）。

## 紛らわしい概念
| 概念 | 違い |
|---|---|
| [[Claude CodeのMCPスコープ]] | APIの機能か、Claude Codeの設定か |

## 誤答の落とし穴
> [!warning] ローカルのSTDIOサーバーをMCPコネクタで直接接続する選択肢 → 不可

## 関連
- [[MCP（モデルコンテキストプロトコル）]] · [[統合メカニズムの選択（MCP・API・CLI・A2A）]] · [[認証と認可のギャップ]] · [[データ保持（ZDR・HIPAA対応）]]

**公式目標**: [[3 統合#目標 3.7|3.7]] · [[3 統合#目標 3.2|3.2]]  
**根拠**: [MCP connector](https://platform.claude.com/docs/en/agents-and-tools/mcp-connector)

## セルフチェック
> [!question]- MCPコネクタがサポートするMCPの機能は？
> ツール呼び出しのみ

> [!question]- MCPコネクタはZDRの対象か？
> 対象ではない（標準の保持ポリシー）
