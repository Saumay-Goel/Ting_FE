"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

type Status = "verifying" | "success" | "error";

function VerifyInner() {
  const params = useSearchParams();
  const token = params.get("token");

  // Derive the missing-token case during render — no setState needed for it.
  const [status, setStatus] = useState<Status>(token ? "verifying" : "error");
  const [message, setMessage] = useState(
    token ? "" : "This verification link is missing its token.",
  );

  useEffect(() => {
    if (!token) return; // nothing to verify; render already shows the error

    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/auth/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });
        const data = await res.json();
        if (cancelled) return;
        if (!res.ok) {
          setStatus("error");
          setMessage(data.error ?? "This link is invalid or has expired.");
          return;
        }
        setStatus("success");
      } catch {
        if (cancelled) return;
        setStatus("error");
        setMessage("Something went wrong. Please try again.");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [token]);

  if (status === "verifying") {
    return (
      <div className="text-center">
        <div className="mx-auto mb-5 h-12 w-12 animate-spin rounded-full border-4 border-[#F5A623]/30 border-t-[#F5A623]" />
        <h2 className="font-[family-name:var(--font-display)] text-[28px] font-bold tracking-tight text-[#1A1714]">
          Verifying your email…
        </h2>
        <p className="mt-2 text-[15px] text-[#6B6357]">Just a moment.</p>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="text-center">
        <div className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-[#DEF2E0] text-[28px]">
          ✅
        </div>
        <h2 className="font-[family-name:var(--font-display)] text-[28px] font-bold tracking-tight text-[#1A1714]">
          Email verified!
        </h2>
        <p className="mt-3 text-[15px] leading-relaxed text-[#6B6357]">
          Your account is now active. You can log in and start watching your
          AWS.
        </p>
        <Link
          href="/login"
          className="btn-amber mt-7 inline-block rounded-xl px-8 py-3.5 text-[15px] font-bold"
        >
          Go to login
        </Link>
      </div>
    );
  }

  return (
    <div className="text-center">
      <div className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-[#FBEAE3] text-[28px]">
        ⚠️
      </div>
      <h2 className="font-[family-name:var(--font-display)] text-[28px] font-bold tracking-tight text-[#1A1714]">
        Verification failed
      </h2>
      <p className="mt-3 text-[15px] leading-relaxed text-[#6B6357]">
        {message}
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

export default function VerifyPage() {
  return (
    <Suspense
      fallback={<div className="text-center text-[#6B6357]">Loading…</div>}
    >
      <VerifyInner />
    </Suspense>
  );
}
