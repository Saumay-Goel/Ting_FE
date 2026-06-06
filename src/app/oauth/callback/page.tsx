"use client";

import { useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";

function CallbackInner() {
  const token = useSearchParams().get("token");
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.replace("/login?error=oauth");
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/auth/oauth-set", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });
        if (cancelled) return;
        if (!res.ok) {
          router.replace("/login?error=oauth");
          return;
        }
        router.replace("/dashboard");
      } catch {
        if (!cancelled) router.replace("/login?error=oauth");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [token, router]);

  return (
    <div className="grid min-h-screen place-items-center bg-[#FBF6EC]">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-[3px] border-[#ECE4D5] border-t-[#F5A623]" />
        <p className="text-[15px] font-medium text-[#6B6357]">
          Signing you in…
        </p>
      </div>
    </div>
  );
}

export default function OAuthCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="grid min-h-screen place-items-center bg-[#FBF6EC] text-[#6B6357]">
          Loading…
        </div>
      }
    >
      <CallbackInner />
    </Suspense>
  );
}
