import { NextResponse } from "next/server";

const PHONE_RE = /^\+?[0-9\s()\-]{8,25}$/;

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

type ContactPayload = {
  firstName: string;
  lastName: string;
  email: string;
  whatsapp: string;
  message: string;
};

function parseContactBody(body: unknown): ContactPayload | null {
  if (body == null || typeof body !== "object") return null;
  const o = body as Record<string, unknown>;
  if (
    typeof o.firstName !== "string" ||
    typeof o.lastName !== "string" ||
    typeof o.email !== "string" ||
    typeof o.whatsapp !== "string"
  ) {
    return null;
  }
  if (o.message != null && typeof o.message !== "string") {
    return null;
  }
  const message = typeof o.message === "string" ? o.message : "";
  if (o.firstName.length < 2 || o.firstName.length > 80) return null;
  if (o.lastName.length < 2 || o.lastName.length > 80) return null;
  if (o.email.length < 3 || o.email.length > 120) return null;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(o.email)) return null;
  if (o.whatsapp.length < 8 || o.whatsapp.length > 25 || !PHONE_RE.test(o.whatsapp)) return null;
  if (message.length > 2000) return null;
  return { firstName: o.firstName, lastName: o.lastName, email: o.email, whatsapp: o.whatsapp, message };
}

export async function POST(request: Request) {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = parseContactBody(json);
  if (!parsed) {
    return NextResponse.json({ error: "Please check all fields and try again." }, { status: 400 });
  }

  const { firstName, lastName, email, whatsapp, message } = parsed;
  const payload = {
    firstName,
    lastName,
    email,
    whatsapp,
    message,
    submittedAt: new Date().toISOString(),
  };

  const html = `
    <h1>New contact — Sandspire</h1>
    <p><strong>Name:</strong> ${escapeHtml(firstName)} ${escapeHtml(lastName)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>WhatsApp:</strong> ${escapeHtml(whatsapp)}</p>
    <p><strong>Message:</strong> ${message.trim() ? "" : "<em>(none)</em>"}</p>
    ${message.trim() ? `<pre style="white-space:pre-wrap;font-family:inherit;">${escapeHtml(message)}</pre>` : ""}
  `;

  const resendKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL ?? "Sandspire <onboarding@resend.dev>";
  const webhook = process.env.CONTACT_WEBHOOK_URL;

  if (resendKey && to) {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        subject: `Contact: ${firstName} ${lastName}`,
        html,
      }),
    });
    if (!r.ok) {
      const err = await r.text();
      console.error("[contact] Resend error", r.status, err);
      return NextResponse.json({ error: "Could not send email. Please try again later." }, { status: 502 });
    }
  } else if (webhook) {
    const r = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!r.ok) {
      console.error("[contact] Webhook error", r.status);
      return NextResponse.json({ error: "Could not deliver your message. Please try again." }, { status: 502 });
    }
  } else {
    if (process.env.NODE_ENV === "development") {
      console.info("[contact] submission (no RESEND / WEBHOOK configured)", payload);
    }
  }

  return NextResponse.json({ ok: true });
}
