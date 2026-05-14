# spec-summary.md

## 1. この仕様書の目的
この文書は、`spe_app_hp` の公開サイトにおける「会社案内更新」と「お問い合わせ送信基盤（Cloudflare + Resend + Vercel + さくらDNS）」の最終仕様を、非エンジニアでも追える形でまとめたものです。

---

## 2. 今回の最終成果（結論）
1. 会社案内ページにチラシ内容を反映済み（大幅な構成変更なし）
2. 沿革をチラシ準拠に更新済み
3. トップの `42 Years of Trust` を `創業42年` デザインに変更済み
4. お問い合わせフォームは Turnstile 認証 + Resend 送信で動作
5. 送信先メールは `info@sp-jp.com`（要件どおり）
6. Resend ドメイン認証（`sp-jp.com`）は `Verified` 済み
7. さくらDNSの受信MXは復旧済み（受信確認済み）

---

## 3. 「cloudflare.com」「resend.com」で何をしているか

### 3.1 Cloudflare Turnstile（https://dash.cloudflare.com/）
目的: 問い合わせ送信が「人間操作かどうか」を検証する。

実装上の役割:
- フロントで Turnstile ウィジェットを表示
- ユーザーが通過するとトークン発行
- サーバー側で Secret Key を使ってトークン検証

この仕組みがないと:
- Bot の自動投稿やスパム送信を受けやすくなる

今回対応したポイント:
- ウィジェット表示が出ない問題を修正（スクリプト読込完了後に render）
- 認証失敗時ログを追加（例: `timeout-or-duplicate`）

### 3.2 Resend（https://resend.com/）
目的: サイトの問い合わせ内容をメールとして `info@sp-jp.com` に届ける。

実装上の役割:
- `/api/contact` から Resend API に送信リクエスト
- Resend が実際にメール配送

この仕組みがないと:
- フォーム送信してもメール通知が飛ばない

今回対応したポイント:
- `sp-jp.com` を Resend でドメイン認証（SPF/DKIM）
- `CONTACT_FROM_EMAIL` を `SPE Web <info@sp-jp.com>` に設定
- 403エラー原因切り分けのため、送信失敗ログを強化

---

## 4. コード変更（確定版）

### 4.1 会社案内更新
対象: `src/app/company/page.tsx`

変更内容:
1. 沿革をチラシ準拠に差し替え
- 1983年 創業
- 1980年代後半 業務システム開発開始
- 2000年代 Web・オープン系システムに対応
- 2020年以降 AWS導入・インフラ構築支援
- 2024年以降 AI・OCR活用サービス開始
- 現在 DX推進・業務改善をトータルで支援

2. チラシ掲載サービスを追加
- 「チラシ掲載の主な対応領域」セクションを追加

3. 沿革の年表示の折返しを解消
- 年カラムを `nowrap` 化、幅調整

### 4.2 トップの実績バッジ更新
対象: `src/app/ai-philosophy/page.tsx`

変更内容:
1. `42 Years of Trust` を `創業 42 年` に変更
2. 角を斜めにカットした意匠へ変更
3. ガラス調は要望により撤回、ソリッドデザインへ調整

### 4.3 お問い合わせフォームの認証安定化
対象: `src/app/contact/page.tsx`

変更内容:
1. Turnstile スクリプト `onLoad` 後に描画するよう修正
2. `turnstileReady` state を追加して描画タイミングを安定化

### 4.4 お問い合わせAPIの運用ログ強化
対象: `src/app/api/contact/route.ts`

変更内容:
1. Turnstile 検証結果の `error-codes` をログ化
2. Resend 失敗時に `status` と `body` をログ化
3. 実行中設定の確認用ログ追加
- `from`
- `to`
- `apiKeyPrefix`（先頭8文字のみ）

注記:
- 3 のログは原因特定のための運用ログ。不要になれば削除してよい。

---

## 5. 環境変数の最終仕様（Vercel）

必須:
1. `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
2. `TURNSTILE_SECRET_KEY`
3. `RESEND_API_KEY`
4. `CONTACT_TO_EMAIL=info@sp-jp.com`
5. `CONTACT_FROM_EMAIL=SPE Web <info@sp-jp.com>`

設定先:
- `Production`（必要に応じて `Preview` も）

注意:
- 変更後は必ず `Save` → `Redeploy`。
- 保存だけでは現在の本番デプロイに反映されない。

---

## 6. 外部設定の最終仕様

### 6.1 Turnstile Widget
- Hostname:
  - `www.sp-jp.com`
  - `sp-jp.com`
- Mode: `Managed`

### 6.2 Resend Domain
- Domain: `sp-jp.com`
- Status: `Verified`

### 6.3 さくらDNS（Resend送信用）
Resend用に追加したレコード:
1. `resend._domainkey` TXT（DKIM）
2. `send` MX（`10 feedback-smtp....amazonses.com.`）
3. `send` TXT（SPF）

重要:
- 受信メール用の `@` MX は別管理。
- `send` サブドメインの設定と混同しない。

---

## 7. 障害履歴と解決内容

### 7.1 Turnstileが表示されず送信不可
症状:
- 「私はロボットではありませんの認証を完了してください」

原因:
- スクリプト読込後に render が再実行されないタイミング不整合

対応:
- `onLoad` と `turnstileReady` による再描画制御で解決

### 7.2 Resend 403（testing emails only）
症状:
- `status=403 validation_error`

原因:
- `from` が `onboarding@resend.dev` のまま実行されていた
- 本番環境変数の反映漏れ/再デプロイ漏れ

対応:
- `CONTACT_FROM_EMAIL` を `SPE Web <info@sp-jp.com>` に設定
- Resend ドメイン `Verified` を確認
- ログで実行時 `from` を確認しながら修正

### 7.3 独自ドメインメール受信停止
症状:
- 送信できるが受信できない

原因:
- `@` のMX設定が一時的に不正化

対応:
- `sp-jp.com` のMXを正規値に修正
- `nslookup -type=mx sp-jp.com` で確認
- 受信復旧を確認済み

---

## 8. 現在の動作確認チェックリスト
1. `https://www.sp-jp.com/contact` で Turnstile が表示される
2. フォーム送信で「送信完了しました」が表示される
3. `info@sp-jp.com` に着信する
4. Vercel Logs で `/api/contact` が 200 系

---

## 9. 運用手順（今後）
1. コード変更
2. `git add .`
3. `git commit -m "update:YYYYMMDD_HHMM"`
4. `git push origin main`
5. Vercel 自動デプロイ確認
6. 環境変数変更時は必ず `Redeploy`

---

## 10. 追加メモ（業務向け）
1. DNS変更は「送信系（sendサブドメイン）」と「受信系（@のMX）」を分けて考える
2. 問い合わせ不達時は、まず `/api/contact` ログの `from/to/status/body` を見る
3. Turnstile の `timeout-or-duplicate` は再認証で解消する
