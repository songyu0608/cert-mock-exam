---
aliases: ["CLAUDE.md vs settings vs hooks", "CLAUDE.md vs 설정 vs 훅"]
tags: ["ccar-p", "比較", "分野7"]
---
# CLAUDE.md・設定・フックの比較

| | [[CLAUDE.mdのスコープ\|CLAUDE.md]] | [[Claude Codeの設定の優先順位\|設定（settings）]] | [[Claude Codeのフック\|フック]] |
|---|---|---|---|
| 性格 | 行動の指示（モデルが読む） | 技術的な強制（権限・環境） | 特定の時点で自動実行されるコード |
| 例 | コーディングルール、アーキテクチャの説明 | permissions.deny、sandbox.enabled | 編集後のフォーマッター、保護ファイルのブロック |
| 強制力 | 弱い | 強い | 強い（終了コード2でブロック） |
| チーム共有 | ./CLAUDE.md | .claude/settings.json | 設定ファイルのhooksブロック |

**判別の順序**：① 必ず防ぐ必要があるか？ → 設定（deny）またはPreToolUseフック ② 特定の時点で常に実行？ → フック ③ モデルが知るべき背景・ルール？ → CLAUDE.md

> [!question]- 組織全体で本番DBへの接続コマンドを禁止したい。
> 管理対象設定のpermissions.deny。CLAUDE.mdは指示なので強制ではない。

根拠：Claude Codeの公式ドキュメント（memory、settings、hooks）

← [[比較ノート一覧]]
