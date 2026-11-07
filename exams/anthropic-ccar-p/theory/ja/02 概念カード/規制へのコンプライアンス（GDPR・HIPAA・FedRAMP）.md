---
aliases: ["Compliance", "コンプライアンス", "GDPR", "HIPAA", "FedRAMP", "규제 준수(GDPR·HIPAA·FedRAMP)"]
tags: ["ccar-p", "概念カード", "分野5"]
分野: 5
目標: ["5.4"]
重要度: "高"
---
# 規制へのコンプライアンス（GDPR・HIPAA・FedRAMP）

> [!summary] 一行定義
> データの種類と規制に合ったデプロイ経路・保持方式・機能を選ぶ。機能ごとに適用範囲が異なるため、機能単位で確認する。

**English** Regulatory compliance (GDPR, HIPAA, FedRAMP)

## 試験のトリガー
- 「PHI（保護対象の医療情報）を処理する」
- 「政府機関向けのFedRAMP環境が必要」
- 「EUの個人情報を扱う」

## 要点
- HIPAA：署名済みのBAAとHIPAA対応が有効な組織が必要。ベータ機能は明示的に対象とされていなければBAAの対象外で、Claude CodeはHIPAA対応の範囲に含まれない。
- PHIはメッセージの内容にだけ置き、JSONスキーマの定義（プロパティ名、enumなど）には入れない（スキーマは別途キャッシュされる）。
- ZDR：承認された組織では、応答後にプロンプト・応答を保存しない。機能ごとに対象かどうかが異なる → [[データ保持（ZDR・HIPAA対応）]]。
- FedRAMP：公共部門FAQ（2026-11確認）によると、Anthropicの直接のClaude APIはFedRAMP認可ではないため、FedRAMP環境が必要ならAmazon Bedrock（GovCloud）またはGoogle Vertex（Assured Workloads）を使う（変動情報）。
- 〔解釈〕GDPR：データ最小化、目的の限定、保持期間・削除要求への対応、処理場所を設計に反映する。AnthropicのGDPRの詳細条項は今回確認できていない。

## 紛らわしい概念
| 概念 | 違い |
|---|---|
| [[データ保持（ZDR・HIPAA対応）]] | 規制の判断か、保持機能の詳細か |

## 誤答の落とし穴
> [!warning] 誤答になりやすい選択肢
> - HIPAA対象のデータをベータ機能で処理してもBAAが適用されるという選択肢 → 明示された対象機能のみ
> - FedRAMPが必要なのに直接APIをそのまま使う選択肢 → FedRAMP認可済みのクラウド経路を使う必要がある（2026-11時点）

## 関連
- [[データ保持（ZDR・HIPAA対応）]] · [[バイアス・公平性・透明性]] · [[認証と認可のギャップ]]

**公式目標**: [[5 ガバナンス、安全性、リスク管理#目標 5.4|5.4]]  
**根拠**: [API and data retention](https://platform.claude.com/docs/en/manage-claude/api-and-data-retention) · [Public sector FAQs](https://support.claude.com/en/articles/13756069-public-sector-faqs)

## セルフチェック
> [!question]- PHIを入れてはいけない場所（公式ドキュメント）は？
> JSONスキーマの定義（プロパティ名、enum、const、pattern）

> [!question]- FedRAMP環境が必要なときの経路（2026-11の公共部門FAQ）は？
> Amazon Bedrock（GovCloud）またはGoogle Vertex（Assured Workloads）
