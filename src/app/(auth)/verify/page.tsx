"use client";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function VerifyInner() {
  const status = useSearchParams().get("status");
  const ok = status === "success";
  return (
    <div className="text-center">
      <div
        className={`mx-auto mb-5 grid h-14 w-14 place-items-center rounded-2xl text-[28px] ${ok ? "bg-[#DEF2E0]" : "bg-[#FBEAE3]"}`}
      >
        {ok ? "✅" : "⚠️"}
      </div>
      <h2 className="font-[family-name:var(--font-display)] text-[28px] font-bold tracking-tight text-[#1A1714]">
        {ok ? "Email verified!" : "Verification failed"}
      </h2>
      <p className="mt-3 text-[15px] leading-relaxed text-[#6B6357]">
        {ok
          ? "Your account is active. You can log in and start watching your AWS."
          : "This link is invalid or has expired. Try requesting a new one."}
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

export default function VerifyPage() {
  return (
    <Suspense
      fallback={<div className="text-center text-[#6B6357]">Loading…</div>}
    >
      <VerifyInner />
    </Suspense>
  );
}
