"use client";

import { useState } from "react";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitted">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // No backend in this starter project; just mimic a “sent” state.
    setStatus("submitted");
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <label className="space-y-2">
          <span className="text-[10px] font-medium uppercase tracking-[0.08em] text-[#444444]">
            First Name
          </span>
          <input
            name="firstName"
            placeholder="First Name"
            className="h-11 w-full rounded-[18px] border border-transparent bg-[#777777]/20 px-5 text-sm text-[#E6DDD0] placeholder:text-[#777777] outline-none focus:border-white/20"
          />
        </label>

        <label className="space-y-2">
          <span className="text-[10px] font-medium uppercase tracking-[0.08em] text-[#444444]">
            Last Name
          </span>
          <input
            name="lastName"
            placeholder="Last Name"
            className="h-11 w-full rounded-[18px] border border-transparent bg-[#777777]/20 px-5 text-sm text-[#E6DDD0] placeholder:text-[#777777] outline-none focus:border-white/20"
          />
        </label>
      </div>

      <label className="space-y-2">
        <span className="text-[10px] font-medium uppercase tracking-[0.08em] text-[#444444]">Email</span>
        <input
          name="email"
          type="email"
          placeholder="johndoe@gmail.com"
          className="h-11 w-full rounded-[18px] border border-transparent bg-[#777777]/20 px-5 text-sm text-[#E6DDD0] placeholder:text-[#777777] outline-none focus:border-white/20"
        />
      </label>

      <label className="space-y-2">
        <span className="text-[10px] font-medium uppercase tracking-[0.08em] text-[#444444]">
          Message
        </span>
        <textarea
          name="message"
          placeholder="Type your message here"
          rows={5}
          className="min-h-[104px] w-full resize-none rounded-[18px] border border-transparent bg-[#777777]/20 px-5 py-3.5 text-sm text-[#E6DDD0] placeholder:text-[#777777] outline-none focus:border-white/20"
        />
      </label>

      <button
        type="submit"
        className="inline-flex h-11 w-full items-center justify-center rounded-[18px] bg-[var(--accent)] px-6 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#FAF3E8] transition-opacity hover:opacity-90 disabled:opacity-60"
        disabled={status === "submitted"}
      >
        Submit
      </button>

      {status === "submitted" ? (
        <p className="pt-1 text-center text-sm text-[#E6DDD0]/80">
          Thanks! Your message is ready to send.
        </p>
      ) : null}
    </form>
  );
}

