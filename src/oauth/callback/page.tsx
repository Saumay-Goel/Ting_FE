// src/app/oauth/callback/page.tsx
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
    (async () => {
      await fetch("/api/auth/oauth-set", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      router.replace("/dashboard");
    })();
  }, [token, router]);
  return (
    <div className="grid min-h-screen place-items-center bg-[#FBF6EC] text-[#6B6357]">
      Signing you in…
    </div>
  );
}

export default function OAuthCallbackPage() {
  return (
    <Suspense>
      <CallbackInner />
    </Suspense>
  );
}
