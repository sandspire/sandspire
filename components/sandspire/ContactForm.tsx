"use client";

import { useId, useState } from "react";
import { cn } from "@/lib/utils";

const labelClass = "text-[12px] font-medium tracking-[-0.01em] text-[#d4cdc0]";

const fieldBase =
  "h-[50px] w-full rounded-2xl border border-white/10 bg-[rgba(255,250,240,0.05)] px-4 text-[13px] font-medium text-[#f2ebe0] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] placeholder:text-[#6e6860] outline-none transition-[border-color,background-color,box-shadow,ring] duration-200 focus:border-[#ff5e00]/40 focus:bg-[rgba(255,250,240,0.08)] focus:shadow-[0_0_0_3px_rgba(255,94,0,0.12)]";

const fieldError = "border-rose-500/55 ring-1 ring-rose-500/20";

const hintClass = "text-[10.5px] font-normal leading-snug text-[#7d776c]";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^\+?[0-9\s()\-]{8,25}$/;

type FieldName = "firstName" | "lastName" | "email" | "whatsapp" | "message";

function validateFields(get: (name: string) => string): Partial<Record<FieldName, string>> {
  const e: Partial<Record<FieldName, string>> = {};
  const firstName = get("firstName").trim();
  const lastName = get("lastName").trim();
  const email = get("email").trim();
  const whatsapp = get("whatsapp").trim();
  const message = get("message").trim();

  if (firstName.length < 2 || firstName.length > 80) {
    e.firstName = "First name: 2–80 characters.";
  }
  if (lastName.length < 2 || lastName.length > 80) {
    e.lastName = "Last name: 2–80 characters.";
  }
  if (email.length < 3 || email.length > 120 || !EMAIL_RE.test(email)) {
    e.email = "Enter a valid email (max 120 characters).";
  }
  if (whatsapp.length < 8 || whatsapp.length > 25 || !PHONE_RE.test(whatsapp)) {
    e.whatsapp = "Enter a valid number with country code (8–25 characters, digits and +, spaces, or dashes).";
  }
  if (message.length > 2000) {
    e.message = "Message: max 2,000 characters.";
  }

  return e;
}

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const uid = useId();
  const formNoteId = `${uid}-form-note`;
  const hFirst = `${uid}-h-first`;
  const hLast = `${uid}-h-last`;
  const hWa = `${uid}-h-wa`;
  const hMsg = `${uid}-h-msg`;

  function fieldClass(name: FieldName) {
    return cn(fieldBase, submitAttempted && fieldErrors[name] ? fieldError : null);
  }

  function clearFieldError(name: FieldName) {
    setFieldErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setSubmitAttempted(true);

    const get = (name: string) => (form.elements.namedItem(name) as HTMLInputElement | HTMLTextAreaElement | null)?.value ?? "";
    const v = validateFields(get);
    setFieldErrors(v);
    if (Object.keys(v).length > 0) {
      return;
    }

    setErrorMsg(null);
    setStatus("loading");

    const body = {
      firstName: get("firstName").trim(),
      lastName: get("lastName").trim(),
      email: get("email").trim(),
      whatsapp: get("whatsapp").trim(),
      message: get("message").trim(),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string; ok?: boolean };

      if (!res.ok) {
        setStatus("error");
        setErrorMsg(data.error ?? "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
      setSubmitAttempted(false);
      setFieldErrors({});
      form.reset();
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Check your connection and try again.");
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-5"
      noValidate
      aria-describedby={formNoteId}
    >
      <div
        id={formNoteId}
        className="rounded-xl border border-white/[0.07] bg-[rgba(255,248,240,0.04)] px-3.5 py-2.5 text-[11px] leading-relaxed text-[#a39e92]"
      >
        <span className="font-semibold text-[#c9c2b6]">Name, email, and WhatsApp are required.</span> Use a
        WhatsApp number you check, with country code. Message is optional.
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-4">
        <label className="flex flex-col gap-1.5">
          <span className={labelClass}>
            First name <span className="text-[#ff7a3d]">*</span>
          </span>
          <input
            name="firstName"
            autoComplete="given-name"
            placeholder="Jane"
            minLength={2}
            maxLength={80}
            disabled={status === "loading"}
            className={fieldClass("firstName")}
            onChange={() => clearFieldError("firstName")}
            aria-invalid={submitAttempted && Boolean(fieldErrors.firstName)}
            aria-describedby={hFirst}
          />
          <span className={hintClass} id={hFirst}>
            2–80 characters.
            {fieldErrors.firstName ? (
              <span className="ml-1 text-rose-400/90" role="alert">
                {fieldErrors.firstName}
              </span>
            ) : null}
          </span>
        </label>
        <label className="flex flex-col gap-1.5">
          <span className={labelClass}>
            Last name <span className="text-[#ff7a3d]">*</span>
          </span>
          <input
            name="lastName"
            autoComplete="family-name"
            placeholder="Doe"
            minLength={2}
            maxLength={80}
            disabled={status === "loading"}
            className={fieldClass("lastName")}
            onChange={() => clearFieldError("lastName")}
            aria-invalid={submitAttempted && Boolean(fieldErrors.lastName)}
            aria-describedby={hLast}
          />
          <span className={hintClass} id={hLast}>
            2–80 characters.
            {fieldErrors.lastName ? (
              <span className="ml-1 text-rose-400/90" role="alert">
                {fieldErrors.lastName}
              </span>
            ) : null}
          </span>
        </label>
      </div>

      <div className="flex flex-col gap-4">
        <label className="flex flex-col gap-1.5">
          <span className={labelClass}>
            Email <span className="text-[#ff7a3d]">*</span>
          </span>
          <input
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="jane@example.com"
            maxLength={120}
            disabled={status === "loading"}
            className={fieldClass("email")}
            onChange={() => clearFieldError("email")}
            aria-invalid={submitAttempted && Boolean(fieldErrors.email)}
          />
          {fieldErrors.email ? (
            <span className="text-[10.5px] text-rose-400/90" role="alert">
              {fieldErrors.email}
            </span>
          ) : null}
        </label>

        <label className="flex flex-col gap-1.5">
          <span className={labelClass}>
            WhatsApp number <span className="text-[#ff7a3d]">*</span>
          </span>
          <input
            name="whatsapp"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="+971 56 000 0000"
            minLength={8}
            maxLength={25}
            title="8–25 characters: + and digits, or spaces, parentheses, and hyphens. Include country code."
            disabled={status === "loading"}
            className={fieldClass("whatsapp")}
            onChange={() => clearFieldError("whatsapp")}
            aria-invalid={submitAttempted && Boolean(fieldErrors.whatsapp)}
            aria-describedby={hWa}
          />
          <span className={hintClass} id={hWa}>
            Include country code (e.g. <span className="whitespace-nowrap text-[#b5aea3]">+971 56 198 0747</span>).
            {fieldErrors.whatsapp ? (
              <span className="ml-1 text-rose-400/90" role="alert">
                {fieldErrors.whatsapp}
              </span>
            ) : null}
          </span>
        </label>

        <label className="flex flex-col gap-1.5">
          <span className={labelClass}>Message (optional)</span>
          <textarea
            name="message"
            autoComplete="off"
            placeholder="Project goals, timeline, budget—anything that helps us respond…"
            rows={5}
            maxLength={2000}
            disabled={status === "loading"}
            className={cn("min-h-[128px] resize-y rounded-2xl py-3.5", fieldClass("message"))}
            onChange={() => clearFieldError("message")}
            aria-invalid={submitAttempted && Boolean(fieldErrors.message)}
            aria-describedby={hMsg}
          />
          <span className={hintClass} id={hMsg}>
            Up to 2,000 characters.
            {fieldErrors.message ? (
              <span className="ml-1 text-rose-400/90" role="alert">
                {fieldErrors.message}
              </span>
            ) : null}
          </span>
        </label>

        <button
          type="submit"
          disabled={status === "loading"}
          className="mt-1 flex h-[52px] w-full items-center justify-center gap-2 rounded-2xl bg-[#ff5e00] text-[13px] font-semibold tracking-[-0.02em] text-[#faf3e8] shadow-[0_6px_28px_rgba(255,94,0,0.32)] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[0_10px_36px_rgba(255,94,0,0.42)] active:translate-y-0 active:scale-[0.99] disabled:cursor-not-allowed disabled:translate-y-0 disabled:opacity-70 disabled:shadow-none disabled:hover:brightness-100"
        >
          {status === "loading" ? (
            <>
              <span className="inline-block size-4 animate-spin rounded-full border-2 border-[#faf3e8]/30 border-t-[#faf3e8]" aria-hidden />
              Sending…
            </>
          ) : (
            "Send message"
          )}
        </button>
      </div>

      {status === "success" ? (
        <p
          className="rounded-lg border border-emerald-500/25 bg-emerald-500/10 px-3 py-2.5 text-center text-[13px] leading-snug text-[#b8e8c8]"
          role="status"
          aria-live="polite"
        >
          Thanks — we received your message and will get back to you soon.
        </p>
      ) : null}

      {status === "error" && errorMsg ? (
        <p
          className="rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-2.5 text-center text-[13px] leading-snug text-[#f0b4b4]"
          role="alert"
          aria-live="assertive"
        >
          {errorMsg}
        </p>
      ) : null}
    </form>
  );
}
