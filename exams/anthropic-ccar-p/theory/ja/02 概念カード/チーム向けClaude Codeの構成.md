---
aliases: ["Claude Code for teams", "チーム向けにClaudeのツールと環境を構成", "Claude Code 設定", "팀용 Claude Code 구성"]
tags: ["ccar-p", "概念カード", "分野7"]
分野: 7
目標: ["7.1"]
重要度: "高"
---
# チーム向けClaude Codeの構成

> [!summary] 一行定義
> チーム共有の指示（CLAUDE.md）、設定・権限（settings）、MCPサーバー、認証をスコープ別に分けて配布し、組織のポリシーは管理対象設定で強制する。

**English** Configuring Claude tools and environments for teams (e.g., Claude Code)

## 試験のトリガー
- 「すべての開発者に同じルールを適用」
- 「特定のコマンドを組織全体で禁止」
- 「チームが同じMCPサーバーを使えるように」

## 要点
- 指示：管理対象 → ユーザー（~/.claude/CLAUDE.md） → プロジェクト（./CLAUDE.md、チーム共有） → ローカル（CLAUDE.local.md） → [[CLAUDE.mdのスコープ]]。
- 公式ドキュメント：技術的な強制は設定（例：permissions.deny、sandbox.enabled、forceLoginMethod）、行動の指示はCLAUDE.mdに分ける。
- 設定の優先順位：管理対象 > コマンドライン > ローカルプロジェクト > 共有プロジェクト > ユーザー → [[Claude Codeの設定の優先順位]]。
- MCP：プロジェクトスコープ（.mcp.json）はバージョン管理でチームと共有される → [[Claude CodeのMCPスコープ]]。
- 認証：ほとんどのチームにはClaude for Teams/Enterpriseを推奨。その他にConsole、Bedrock・Vertex・Foundryなどのクラウドプロバイダー。

## 紛らわしい概念
| 概念 | 違い |
|---|---|
| [[AI支援による開発ワークフロー]] | 環境の構成か、日常のワークフロー改善か |

## 誤答の落とし穴
> [!warning] セキュリティルールをCLAUDE.mdの指示だけに置く選択肢 → 強制が必要なら管理対象設定（permissions.denyなど）

## 関連
- [[CLAUDE.mdのスコープ]] · [[Claude Codeの設定の優先順位]] · [[Claude CodeのMCPスコープ]] · [[Claude Codeのフック]] · [[CLAUDE.md・設定・フックの比較]]

**公式目標**: [[7 開発者の生産性と運用支援#目標 7.1|7.1]]  
**根拠**: [Claude Code: How Claude remembers your project](https://code.claude.com/docs/en/memory) · [Claude Code: Settings](https://code.claude.com/docs/en/settings) · [Claude Code: MCP](https://code.claude.com/docs/en/mcp) · [Claude Code: Authentication](https://code.claude.com/docs/en/iam)

## セルフチェック
> [!question]- 組織全体で特定のツール・コマンドをブロックする場所（公式ドキュメント）は？
> 管理対象設定のpermissions.deny

> [!question]- 技術的な強制と行動の指示は、それぞれどこに置くか？
> 強制は設定（settings）、指示はCLAUDE.md
