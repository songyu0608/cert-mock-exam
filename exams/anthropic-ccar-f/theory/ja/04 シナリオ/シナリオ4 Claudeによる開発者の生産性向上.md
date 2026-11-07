---
aliases: ["Scenario 4", "Developer Productivity with Claude", "シナリオ4"]
tags: ["ccar-f", "シナリオ"]
---
# シナリオ4 Claudeによる開発者の生産性向上

**English** Scenario 4: Developer Productivity with Claude

> [!abstract] シナリオ（公式ガイド原文）
> あなたは、Claude Agent SDKを使用して開発者の生産性向上ツールを構築しています。このエージェントは、エンジニアが不慣れなコードベースを探索し、レガシーシステムを理解し、ボイラープレートコードを生成し、反復的なタスクを自動化するのを支援します。組み込みツール（Read、Write、Bash、Grep、Glob）を使用し、Model Context Protocol（MCP）サーバーと統合します。

主な分野: 2 ツール設計とMCP統合, 3 Claude Codeの設定とワークフロー, 1 エージェントアーキテクチャとオーケストレーション

## このシナリオでよく問われる判断
- ツールの選択 → [[組み込みツール]]、[[段階的なコードベース探索]]
- MCPの設定 → [[MCPサーバーのスコープ]]、[[MCPリソース]]
- MCPツールが使われない → [[ツールの説明]]
- オープンエンドなタスクの分解 → [[動的で適応的な分解]]
- セッション → [[セッションの再開とfork_session]]

## 公式サンプル問題
ガイドにはこのシナリオのサンプル問題はない。

← [[0 試験の概要と出題範囲]]
