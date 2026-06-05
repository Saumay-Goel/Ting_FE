"use client";

import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

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

function ResetInner() {
  const params = useSearchParams();
  const router = useRouter();
  const token = params.get("token");

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  async function handleSubmit() {
    setError("");
    if (!token) {
      setError("This reset link is invalid or missing its token.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords don't match.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Reset failed. The link may have expired.");
        return;
      }
      setDone(true);
      setTimeout(() => router.push("/login"), 2000);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <div className="text-center">
        <div className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-[#DEF2E0] text-[28px]">
          ✅
        </div>
        <h2 className="font-[family-name:var(--font-display)] text-[28px] font-bold tracking-tight text-[#1A1714]">
          Password updated
        </h2>
        <p className="mt-3 text-[15px] text-[#6B6357]">
          Redirecting you to login…
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h2 className="font-[family-name:var(--font-display)] text-[34px] font-bold leading-tight tracking-tight text-[#1A1714]">
          Set a new password
        </h2>
        <p className="mt-2 text-[15px] text-[#6B6357]">
          Choose a strong password for your account.
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
            New password
          </label>
          <div className="relative">
            <input
              type={show ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-[#D8CEBC] bg-white px-4 py-3.5 pr-12 text-[15px] text-[#1A1714] outline-none transition placeholder:text-[#A89E8C] focus:border-[#F5A623] focus:ring-4 focus:ring-[#F5A623]/15"
              placeholder="At least 8 characters"
            />
            <button
              type="button"
              onClick={() => setShow((s) => !s)}
              aria-label={show ? "Hide password" : "Show password"}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#A89E8C] transition hover:text-[#1A1714]"
            >
              <EyeIcon open={show} />
            </button>
          </div>
        </div>

        <div>
          <label className="mb-2 block text-[13.5px] font-semibold text-[#1A1714]">
            Confirm password
          </label>
          <input
            type={show ? "text" : "password"}
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            className="w-full rounded-xl border border-[#D8CEBC] bg-white px-4 py-3.5 text-[15px] text-[#1A1714] outline-none transition placeholder:text-[#A89E8C] focus:border-[#F5A623] focus:ring-4 focus:ring-[#F5A623]/15"
            placeholder="Re-enter password"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="btn-amber mt-1 rounded-xl py-4 text-[15px] font-bold disabled:opacity-60"
        >
          {loading ? "Updating…" : "Update password"}
        </button>
      </div>

      <p className="mt-8 text-center text-[14.5px] text-[#6B6357]">
        <Link
          href="/login"
          className="font-bold text-[#1A1714] hover:text-[#E08E10]"
        >
          Back to login
        </Link>
      </p>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={<div className="text-center text-[#6B6357]">Loading…</div>}
    >
      <ResetInner />
    </Suspense>
  );
}
