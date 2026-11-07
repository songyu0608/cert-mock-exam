---
aliases: ["ZDR", "Zero data retention", "HIPAA readiness", "BAA", "データ保持", "데이터 보존(ZDR·HIPAA 준비)"]
tags: ["ccar-p", "リファレンス", "分野5"]
分野: 5
目標: ["5.4"]
重要度: "中"
---
# データ保持（ZDR・HIPAA対応）

> [!summary] 一行定義
> Claude APIはZDR（応答後に保存しない）とHIPAA対応（BAAに基づく保護）の2つのデータ処理方式を提供し、機能ごとに対象かどうかが異なる。

**English** API data retention (ZDR, HIPAA readiness)

## 試験のトリガー
- 「プロンプトを保存してはいけない顧客」
- 「PHIを処理する必要がある」
- 「この機能はZDRの対象か」

## 要点
- ZDR：応答を返した後、プロンプト・応答を保存しない。組織単位で営業チームを通じて有効化し、対象機能にのみ適用される（例：コード実行は対象外）。
- ZDRの組織はブラウザから直接APIを呼び出せない（CORSを拒否） → 自前のバックエンドを経由する。
- HIPAA対応：署名済みのBAA＋HIPAA対応が有効な組織。暗号化・アクセス制御・監査ログでPHIを保護する。PHIを扱う場合、ZDRを別途使う必要はない。
- 対象外：Claude Code、ConsoleでのPHI処理、明示的に対象とされていないベータ機能。
- 保持されたデータは、明示的な許可なくモデルの学習に使われない（公式ドキュメントの原則）。

## 紛らわしい概念
| 概念 | 違い |
|---|---|
| [[規制へのコンプライアンス（GDPR・HIPAA・FedRAMP）]] | 規制の判断全体か、APIの保持方式か |

## 誤答の落とし穴
> [!warning] 誤答になりやすい選択肢
> - ZDRならすべてのAPI機能が保存されないという選択肢 → 機能ごとに対象かどうかを確認する
> - Claude CodeもHIPAA対応の範囲に含まれるという選択肢 → 含まれない

## 関連
- [[規制へのコンプライアンス（GDPR・HIPAA・FedRAMP）]] · [[MCPコネクタ]]

**公式目標**: [[5 ガバナンス、安全性、リスク管理#目標 5.4|5.4]]  
**根拠**: [API and data retention](https://platform.claude.com/docs/en/manage-claude/api-and-data-retention)

## セルフチェック
> [!question]- ZDRの組織がブラウザから直接APIを呼び出せない理由は？
> APIがCORSリクエストを拒否する（バックエンド経由が必要）

> [!question]- HIPAA対応の前提条件は？
> 署名済みのBAAとHIPAA対応が有効な組織
