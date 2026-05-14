"use client";
import Script from "next/script";
import { useEffect, useState } from "react";

declare global {
  interface Window {
    turnstile?: {
      render: (selector: string, options: { sitekey: string; callback: (token: string) => void; "expired-callback": () => void }) => string;
      remove: (widgetId: string) => void;
    };
  }
}

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileReady, setTurnstileReady] = useState(false);
  const [form, setForm] = useState({
    name: "", company: "", tel: "", email: "", type: "", message: "", website: "",
  });
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  useEffect(() => {
    if (!siteKey || !turnstileReady || !window.turnstile || sent) return;

    const widgetId = window.turnstile.render("#turnstile-widget", {
      sitekey: siteKey,
      callback: (token: string) => setTurnstileToken(token),
      "expired-callback": () => setTurnstileToken(""),
    });

    return () => {
      if (window.turnstile) {
        window.turnstile.remove(widgetId);
      }
    };
  }, [siteKey, sent, turnstileReady]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!siteKey) {
      setError("現在フォーム送信の設定が未完了です。管理者にご連絡ください。");
      return;
    }
    if (!turnstileToken) {
      setError("「私はロボットではありません」の認証を完了してください。");
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, turnstileToken }),
      });
      const payload = (await response.json()) as { ok?: boolean; error?: string };
      if (!response.ok || !payload.ok) {
        setError(payload.error ?? "送信に失敗しました。時間をおいて再度お試しください。");
        return;
      }
      setSent(true);
    } catch {
      setError("通信エラーが発生しました。時間をおいて再度お試しください。");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="pt-16 bg-[#f8fcff] text-[#20384f]">
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
        onLoad={() => setTurnstileReady(true)}
      />
      {/* Header */}
      <section className="border-b border-[#d8edf7] px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="mb-5 flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.32em] text-[#8dcce4]">
            <span className="h-px w-8 bg-[#8dcce4]" />
            CONTACT
          </div>
          <h1 className="text-4xl font-black mb-4">お問い合わせ</h1>
          <p className="text-[#466177] text-lg leading-8">
            「何から始めればいいか」という段階からでも、お気軽にどうぞ。
          </p>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-2xl mx-auto">
          {!sent ? (
            <>
              {/* Info boxes */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
                {[
                  { icon: "⚡", title: "無料相談", desc: "初回相談は無料です" },
                  { icon: "📅", title: "オンライン対応", desc: "Zoom等でのご相談も可" },
                  { icon: "💰", title: "補助金サポート", desc: "活用方法もご提案" },
                ].map((item) => (
                  <div key={item.title} className="border border-[#d8edf7] bg-[#eef8fd] p-4 text-center">
                    <div className="text-2xl mb-1">{item.icon}</div>
                    <div className="font-black text-sm">{item.title}</div>
                    <div className="text-xs text-[#466177] mt-0.5">{item.desc}</div>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSubmit} className="bg-white/45 border border-[#d8edf7] p-8 space-y-5">
                <input
                  type="text"
                  name="website"
                  value={form.website}
                  onChange={handleChange}
                  autoComplete="off"
                  tabIndex={-1}
                  className="hidden"
                  aria-hidden="true"
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-black text-[#20384f] mb-1.5">
                      お名前 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text" name="name" required value={form.name} onChange={handleChange}
                      placeholder="山田 太郎"
                      className="w-full px-4 py-2.5 border border-[#d8edf7] bg-white text-sm focus:outline-none focus:border-[#8dcce4] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-black text-[#20384f] mb-1.5">会社名</label>
                    <input
                      type="text" name="company" value={form.company} onChange={handleChange}
                      placeholder="株式会社〇〇"
                      className="w-full px-4 py-2.5 border border-[#d8edf7] bg-white text-sm focus:outline-none focus:border-[#8dcce4] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-black text-[#20384f] mb-1.5">
                      メールアドレス <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email" name="email" required value={form.email} onChange={handleChange}
                      placeholder="info@example.com"
                      className="w-full px-4 py-2.5 border border-[#d8edf7] bg-white text-sm focus:outline-none focus:border-[#8dcce4] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-black text-[#20384f] mb-1.5">電話番号</label>
                    <input
                      type="tel" name="tel" value={form.tel} onChange={handleChange}
                      placeholder="例）0532-12-3456"
                      className="w-full px-4 py-2.5 border border-[#d8edf7] bg-white text-sm focus:outline-none focus:border-[#8dcce4] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-black text-[#20384f] mb-1.5">ご相談の種類</label>
                  <select
                    name="type" value={form.type} onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-[#d8edf7] text-sm focus:outline-none focus:border-[#8dcce4] transition-colors bg-white"
                  >
                    <option value="">選択してください</option>
                    <option>AI活用について相談したい</option>
                    <option>システム開発を依頼したい</option>
                    <option>運用保守の費用を聞きたい</option>
                    <option>補助金の活用方法を知りたい</option>
                    <option>まず話だけ聞きたい</option>
                    <option>その他</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-black text-[#20384f] mb-1.5">
                    お問い合わせ内容 <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="message" required value={form.message} onChange={handleChange}
                    rows={5}
                    placeholder="現在の状況やお困りのこと、ご要望などをご自由にお書きください。"
                    className="w-full px-4 py-2.5 border border-[#d8edf7] bg-white text-sm focus:outline-none focus:border-[#8dcce4] transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting || !siteKey}
                  className="w-full rounded-full bg-[#bfe7f7] py-3.5 text-sm font-black text-[#20384f] transition-all hover:bg-[#aee0f3]"
                >
                  {submitting ? "送信中..." : "送信する"}
                </button>
                {siteKey ? (
                  <div id="turnstile-widget" />
                ) : (
                  <p className="text-xs text-red-600">
                    フォーム認証設定が未完了のため送信できません。
                  </p>
                )}
                {error && (
                  <p className="text-xs text-red-600">{error}</p>
                )}
                <p className="text-xs text-center text-[#6b8397]">
                  通常2営業日以内にご返信いたします。
                </p>
              </form>
            </>
          ) : (
            <div className="bg-white/45 border border-[#d8edf7] p-12 text-center">
              <div className="text-5xl mb-4">✅</div>
              <h2 className="text-2xl font-black mb-3">送信完了しました</h2>
              <p className="text-[#466177] text-sm leading-8">
                お問い合わせありがとうございます。<br />
                通常2営業日以内にご連絡いたします。<br />
                しばらくお待ちください。
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
