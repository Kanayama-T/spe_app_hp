import { NextRequest, NextResponse } from "next/server";

type ContactPayload = {
  name?: string;
  company?: string;
  tel?: string;
  email?: string;
  type?: string;
  message?: string;
  website?: string;
  turnstileToken?: string;
};

const rateLimitStore = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;

function checkRateLimit(ip: string) {
  const now = Date.now();
  const item = rateLimitStore.get(ip);
  if (!item || now > item.resetAt) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }
  if (item.count >= RATE_LIMIT_MAX) {
    return false;
  }
  item.count += 1;
  rateLimitStore.set(ip, item);
  return true;
}

async function verifyTurnstile(token: string, ip: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return false;

  const body = new URLSearchParams({
    secret,
    response: token,
    remoteip: ip,
  });

  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
  if (!response.ok) return false;

  const result = (await response.json()) as { success?: boolean };
  return Boolean(result.success);
}

async function sendByResend(payload: Required<Omit<ContactPayload, "website" | "turnstileToken">>) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured.");
  }

  const to = process.env.CONTACT_TO_EMAIL || "info@sp-jp.com";
  const from = process.env.CONTACT_FROM_EMAIL || "SPE Web <onboarding@resend.dev>";

  const text = [
    "Webサイトからお問い合わせが届きました。",
    "",
    `お名前: ${payload.name}`,
    `会社名: ${payload.company || "(未入力)"}`,
    `メール: ${payload.email}`,
    `電話番号: ${payload.tel || "(未入力)"}`,
    `ご相談の種類: ${payload.type || "(未選択)"}`,
    "",
    "お問い合わせ内容:",
    payload.message,
  ].join("\n");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: payload.email,
      subject: "【SPE】お問い合わせが届きました",
      text,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to send email.");
  }
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { ok: false, error: "短時間に送信が集中しています。少し時間をおいて再送してください。" },
      { status: 429 },
    );
  }

  const data = (await request.json()) as ContactPayload;
  const name = data.name?.trim() || "";
  const email = data.email?.trim() || "";
  const message = data.message?.trim() || "";
  const company = data.company?.trim() || "";
  const tel = data.tel?.trim() || "";
  const type = data.type?.trim() || "";
  const website = data.website?.trim() || "";
  const token = data.turnstileToken?.trim() || "";

  if (website) {
    return NextResponse.json({ ok: true });
  }

  if (!name || !email || !message) {
    return NextResponse.json({ ok: false, error: "必須項目を入力してください。" }, { status: 400 });
  }
  if (!token) {
    return NextResponse.json({ ok: false, error: "認証に失敗しました。再度お試しください。" }, { status: 400 });
  }

  const verified = await verifyTurnstile(token, ip);
  if (!verified) {
    return NextResponse.json({ ok: false, error: "ロボット認証に失敗しました。再度お試しください。" }, { status: 400 });
  }

  try {
    await sendByResend({ name, company, tel, email, type, message });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ ok: false, error: "送信処理でエラーが発生しました。" }, { status: 500 });
  }
}
