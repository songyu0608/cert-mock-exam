---
aliases: ["MCP", "Model Context Protocol", "モデルコンテキストプロトコル", "MCP(모델 컨텍스트 프로토콜)"]
tags: ["ccar-p", "リファレンス", "分野3"]
分野: 3
目標: ["3.7"]
重要度: "高"
---
# MCP（モデルコンテキストプロトコル）

> [!summary] 一行定義
> AIエージェントを外部システム（ツール・データ）に接続するオープン標準。一度実装すれば、複数のサーバー・クライアントと接続できる。

**English** Model Context Protocol (MCP)

## 試験のトリガー
- 「複数の社内システムを複数のAIアプリに接続」
- 「統合ごとに個別コードを書いていて重複が多い」

## 要点
- 公式記事：エージェントとツールの組み合わせごとに個別の統合を作っていた断片化を減らす汎用プロトコルである。
- Building effective agents：MCPは拡張LLMを実装する方法の一つで、サードパーティのツールエコシステムと簡単なクライアント実装で接続する。
- 接続方法：Messages APIのMCPコネクタ（リモートHTTPサーバー）、Claude CodeのMCP設定（ローカルstdio・リモートサーバー） → [[MCPコネクタ]] · [[Claude CodeのMCPスコープ]]。
- ツールが増えるとツール定義がコンテキストを占める → [[ツール検索ツール]] · [[コード実行とMCP]]。

## 紛らわしい概念
| 概念 | 違い |
|---|---|
| [[統合メカニズムの選択（MCP・API・CLI・A2A）]] | MCPは選択肢の一つ |

## 誤答の落とし穴
> [!warning] MCP接続自体が権限の統制を提供するという選択肢 → 認可・ツールの範囲は別途設計する

## 関連
- [[統合メカニズムの選択（MCP・API・CLI・A2A）]] · [[MCPコネクタ]] · [[Claude CodeのMCPスコープ]] · [[拡張LLM]]

**公式目標**: [[3 統合#目標 3.7|3.7]]  
**根拠**: [Code execution with MCP](https://www.anthropic.com/research/code-execution-with-mcp) · [Building effective AI agents](https://www.anthropic.com/research/building-effective-agents)

## セルフチェック
> [!question]- MCPの一行定義（公式記事）は？
> AIエージェントを外部システムに接続するオープン標準
