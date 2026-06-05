"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    setError("");
    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Login failed. Check your credentials.");
        return;
      }
      router.push("/dashboard");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="mb-8">
        <h2 className="font-[family-name:var(--font-display)] text-[34px] font-bold leading-tight tracking-tight text-[#1A1714]">
          Welcome back
        </h2>
        <p className="mt-2 text-[15px] text-[#6B6357]">
          Log in to your Tinglr dashboard.
        </p>
      </div>
      {error && (
        <div className="mb-5 rounded-xl border border-[#E8B4A0] bg-[#FBEAE3] px-4 py-3 text-[14px] font-medium text-[#B5421F]">
          {error}
        </div>
      )}

      <OAuthButtons />

      <div className="my-7 flex items-center gap-4 text-[13px] font-medium text-[#A89E8C]">
        <div className="h-px flex-1 bg-[#E5DBC9]" />
        or continue with email
        <div className="h-px flex-1 bg-[#E5DBC9]" />
      </div>

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

        <div>
          <div className="mb-2 flex items-center justify-between">
            <label className="text-[13.5px] font-semibold text-[#1A1714]">
              Password
            </label>
            <Link
              href="/forgot-password"
              className="text-[13px] font-semibold text-[#6B6357] hover:text-[#E08E10]"
            >
              Forgot?
            </Link>
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              className="w-full rounded-xl border border-[#D8CEBC] bg-white px-4 py-3.5 pr-12 text-[15px] text-[#1A1714] outline-none transition placeholder:text-[#A89E8C] focus:border-[#F5A623] focus:ring-4 focus:ring-[#F5A623]/15"
              placeholder="Enter your password"
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
          {loading ? "Logging in…" : "Log in"}
        </button>
      </div>

      <p className="mt-8 text-center text-[14.5px] text-[#6B6357]">
        Don&apos;t have an account?{" "}
        <Link
          href="/signup"
          className="font-bold text-[#1A1714] hover:text-[#E08E10]"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
}
