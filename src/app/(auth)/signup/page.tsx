"use client";

import { useState } from "react";
import Link from "next/link";
import OAuthButtons from "@/components/auth/OAuthButtons";

function EyeIcon({ open }: { open: boolean }) {
  return open ? (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
      <path
        d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
      <path
        d="M3 3l18 18"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M10.6 5.1A9.8 9.8 0 0 1 12 5c6.5 0 10 7 10 7a17.6 17.6 0 0 1-3.1 4M6.6 6.6A17.6 17.6 0 0 0 2 12s3.5 7 10 7a9.6 9.6 0 0 0 4-.85"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.9 9.9a3 3 0 0 0 4.2 4.2"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  async function handleSubmit() {
    setError("");
    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Signup failed.");
        return;
      }
      setDone(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  // Success state — check your email
  if (done) {
    return (
      <div className="text-center">
        <div className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-[#FCEBC9] text-[28px]">
          ✉️
        </div>
        <h2 className="font-[family-name:var(--font-display)] text-[28px] font-bold tracking-tight text-[#1A1714]">
          Check your email
        </h2>
        <p className="mt-3 text-[15px] leading-relaxed text-[#6B6357]">
          We sent a verification link to{" "}
          <b className="text-[#1A1714]">{email}</b>. Click it to activate your
          account and get started.
        </p>
        <p className="mt-6 text-[14px] text-[#6B6357]">
          Already verified?{" "}
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

  return (
    <div>
      <h2 className="font-[family-name:var(--font-display)] text-[32px] font-bold tracking-tight text-[#1A1714]">
        Create your account
      </h2>
      <p className="mt-2 text-[15px] text-[#6B6357]">
        Start watching your AWS in minutes — free.
      </p>

      {error && (
        <div className="mt-6 rounded-xl border border-[#E8B4A0] bg-[#FBEAE3] px-4 py-3 text-[14px] text-[#B5421F]">
          {error}
        </div>
      )}

      <div className="mt-7 flex flex-col gap-4">
        <div>
          <label className="mb-2 block text-[13.5px] font-semibold text-[#1A1714]">
            Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-xl border border-[#D8CEBC] bg-white px-4 py-3.5 text-[15px] text-[#1A1714] outline-none transition placeholder:text-[#A89E8C] focus:border-[#F5A623] focus:ring-4 focus:ring-[#F5A623]/15"
            placeholder="Your name"
          />
        </div>
        <div>
          <label className="mb-2 block text-[13.5px] font-semibold text-[#1A1714]">
            E-mail address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-[#D8CEBC] bg-white px-4 py-3.5 text-[15px] text-[#1A1714] outline-none transition placeholder:text-[#A89E8C] focus:border-[#F5A623] focus:ring-4 focus:ring-[#F5A623]/15"
            placeholder="you@company.com"
          />
        </div>
        <div>
          <label className="mb-2 block text-[13.5px] font-semibold text-[#1A1714]">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              className="w-full rounded-xl border border-[#D8CEBC] bg-white px-4 py-3.5 pr-12 text-[15px] text-[#1A1714] outline-none transition placeholder:text-[#A89E8C] focus:border-[#F5A623] focus:ring-4 focus:ring-[#F5A623]/15"
              placeholder="At least 8 characters"
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#A89E8C] transition hover:text-[#1A1714]"
            >
              <EyeIcon open={showPassword} />
            </button>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="btn-amber mt-1 rounded-xl py-4 text-[15px] font-bold disabled:opacity-60"
        >
          {loading ? "Creating account…" : "Create account"}
        </button>
      </div>

      <div className="my-6 flex items-center gap-4 text-[13px] text-[#A89E8C]">
        <div className="h-px flex-1 bg-[#E5DBC9]" />
        or
        <div className="h-px flex-1 bg-[#E5DBC9]" />
      </div>

      <OAuthButtons />

      <p className="mt-6 text-center text-[14px] text-[#6B6357]">
        Already have an account?{" "}
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
