# spec-summary.md

## 1. 目的
- 既存WordPress公開中のドメインを維持しつつ、Next.jsサイトをVercelで公開。
- お問い合わせフォームを `info@sp-jp.com` 宛に実送信可能にする。
- スパム/ボット送信を減らすため、人間確認（Cloudflare Turnstile）を導入。

## 2. 今回の変更内容（コード）

### 2.1 表示テキスト修正
- ヒーロー実績表示を `42 Years of Trust` に修正。
- 対象:
  - `src/app/ai-philosophy/page.tsx`

### 2.2 ヘッダーロゴ差し替え
- テキストロゴ `SPE / Towards the future` を画像ロゴに置換。
- 参照画像: `/public/spe-logo.png`
- サイズを縮小調整済み（compact/通常で別サイズ）。
- 対象:
  - `src/components/BrandLogo.tsx`
  - `public/spe-logo.png`

### 2.3 お問い合わせフォーム実装
- 送信先メール: `info@sp-jp.com`
- クライアントから `POST /api/contact` で送信。
- Cloudflare Turnstileトークン必須化。
- サーバー側で以下を実装:
  - 必須項目バリデーション
  - Turnstile検証
  - ハニーポット
  - 簡易レート制限（1分5回/IP）
  - Resend APIでメール送信
- 対象:
  - `src/app/contact/page.tsx`
  - `src/app/api/contact/route.ts`

### 2.4 環境変数テンプレート
- `.env.example` を追加。
- `.gitignore` に `!.env.example` を追加して追跡対象化。
- 対象:
  - `.env.example`
  - `.gitignore`

## 3. 公開基盤（本番）

### 3.1 リポジトリ
- GitHub: `Kanayama-T/spe_app_hp`
- ブランチ: `main`

### 3.2 ホスティング
- Vercelプロジェクト: `spe-app-hp`
- 本番ドメイン:
  - `www.sp-jp.com`（Production）
  - `sp-jp.com`（`www.sp-jp.com` へ307リダイレクト）

### 3.3 DNS（さくら側）
- `www.sp-jp.com`:
  - `CNAME` → Vercel指定値
- `sp-jp.com`:
  - `A` → Vercel指定値
- 現在Vercel表示は `Valid Configuration` 確認済み。

## 4. 必須環境変数（Vercel）

以下を `Production and Preview` に設定済み想定:

1. `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
2. `TURNSTILE_SECRET_KEY`
3. `RESEND_API_KEY`
4. `CONTACT_TO_EMAIL=info@sp-jp.com`
5. `CONTACT_FROM_EMAIL=SPE Web <onboarding@resend.dev>`（暫定）

## 5. 外部サービス設定

### 5.1 Cloudflare Turnstile
- 設定画面URL（例）:
  - `https://dash.cloudflare.com/f2fc77c72ba07dfab383a0ed4007789b/turnstile/add`
- Widget名: `sp-jp-contact`
- Hostname:
  - `www.sp-jp.com`
  - `sp-jp.com`
- Mode: `Managed`
- 発行キー:
  - Site Key → `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
  - Secret Key → `TURNSTILE_SECRET_KEY`
- なぜ必要か:
  - フォーム送信前に「人間による操作」を検証し、ボットの自動送信やスパム投稿を減らすため。
  - サーバー側でSecret Key検証を行うことで、不正トークン送信を遮断するため。

### 5.2 Resend
- オンボーディングURL:
  - `https://resend.com/onboarding`
- APIキー発行済み（`re_...`）。
- `RESEND_API_KEY` に設定。
- 今後の推奨:
  - Resendで `sp-jp.com` をドメイン認証
  - `CONTACT_FROM_EMAIL` を `SPE Web <noreply@sp-jp.com>` に切り替え
- なぜ必要か:
  - サイトからの問い合わせ内容を `info@sp-jp.com` へメール配信するための送信基盤が必要なため。
  - APIキーでサーバーから安全に送信認証を行うため。
  - 独自ドメイン認証（SPF/DKIM）により、迷惑メール判定を下げて到達率を上げるため。

## 6. デプロイ運用手順（再現用）

1. ローカルで変更
2. `git add .`
3. `git commit -m "update:YYYYMMDD_HHMM"`
4. `git push origin main`
5. Vercelで自動デプロイ確認
6. 環境変数変更時は `Redeploy` 実行

## 7. 動作確認チェックリスト

1. `https://www.sp-jp.com` が表示される
2. ロゴが画像表示になっている
3. `42 Years of Trust` が反映されている
4. `/contact` でTurnstileが表示される
5. 必須入力 + Turnstile完了で送信成功
6. `info@sp-jp.com` へメール到達する

## 8. 既知事項
- この作業環境ではネイティブ依存不足によりローカル `next build` 検証が失敗するケースあり。
- Vercel上でのビルド/公開を正として運用。

## 9. 次にやるべきこと（推奨）

1. Resendドメイン認証（`sp-jp.com`）
2. `CONTACT_FROM_EMAIL` を独自ドメイン送信元へ変更
3. お問い合わせフォーム実送信テスト（本番）
4. 受信メールの迷惑メール判定を確認（SPF/DKIM/DMARC）
