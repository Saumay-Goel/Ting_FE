"use client";

import { useState } from "react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit() {
    setError("");
    if (!email) {
      setError("Please enter your email address.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Something went wrong.");
        return;
      }
      setSent(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (sent) {
    return (
      <div className="text-center">
        <div className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-[#FCEBC9] text-[28px]">
          ✉️
        </div>
        <h2 className="font-[family-name:var(--font-display)] text-[28px] font-bold tracking-tight text-[#1A1714]">
          Check your email
        </h2>
        <p className="mt-3 text-[15px] leading-relaxed text-[#6B6357]">
          If an account exists for <b className="text-[#1A1714]">{email}</b>,
          we&apos;ve sent a link to reset your password.
        </p>
        <Link
          href="/login"
          className="mt-7 inline-block font-bold text-[#1A1714] hover:text-[#E08E10]"
        >
          Back to login
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h2 className="font-[family-name:var(--font-display)] text-[34px] font-bold leading-tight tracking-tight text-[#1A1714]">
          Reset your password
        </h2>
        <p className="mt-2 text-[15px] text-[#6B6357]">
          Enter your email and we&apos;ll send you a reset link.
        </p>
      </div>

      {error && (
        <div className="mb-5 rounded-xl border border-[#E8B4A0] bg-[#FBEAE3] px-4 py-3 text-[14px] font-medium text-[#B5421F]">
          {error}
        </div>
      )}

      <div className="flex flex-col gap-5">
        <div>
          <label className="mb-2 block text-[13.5px] font-semibold text-[#1A1714]">
            E-mail address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            className="w-full rounded-xl border border-[#D8CEBC] bg-white px-4 py-3.5 text-[15px] text-[#1A1714] outline-none transition placeholder:text-[#A89E8C] focus:border-[#F5A623] focus:ring-4 focus:ring-[#F5A623]/15"
            placeholder="you@company.com"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="btn-amber mt-1 rounded-xl py-4 text-[15px] font-bold disabled:opacity-60"
        >
          {loading ? "Sending…" : "Send reset link"}
        </button>
      </div>

      <p className="mt-8 text-center text-[14.5px] text-[#6B6357]">
        Remembered it?{" "}
        <Link
          href="/login"
          className="font-bold text-[#1A1714] hover:text-[#E08E10]"
        >
          Log in
        </Link>
      </p>
    </div>
  );
}
