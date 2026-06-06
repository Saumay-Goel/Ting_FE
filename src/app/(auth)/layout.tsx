import { redirect } from "next/navigation";
import Link from "next/link";
import { backendFetch } from "@/lib/backend";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const res = await backendFetch("/auth/me");
  if (res.ok) {
    const data = await res.json().catch(() => ({}));
    if (data?.user) {
      redirect("/dashboard");
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#1A1714] lg:flex-row">
      {/* LEFT — brand panel with oversized rotated wordmark */}
      <div className="relative hidden flex-1 overflow-hidden bg-[#1A1714] lg:block">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/wordmark.svg"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute left-[-10%] top-1/2 w-[135%] max-w-none -translate-y-1/2 -rotate-[30deg] select-none"
        />

        {/* corner logo */}
        <Link href="/" className="absolute left-8 top-8 z-10 block">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/Tinglr_white.svg" alt="Tinglr" className="h-9 w-auto" />
        </Link>

        {/* tagline */}
        <div className="absolute bottom-8 left-8 z-10 flex gap-3 text-[14px] font-medium text-[#8A8275]">
          <span>Detect</span>
          <span className="text-[#F5A623]">·</span>
          <span>Diagnose</span>
          <span className="text-[#F5A623]">·</span>
          <span>Deliver</span>
        </div>
      </div>

      {/* RIGHT — form */}
      <div className="flex flex-1 items-center justify-center bg-[#FBF6EC] p-6 lg:p-12">
        <div className="w-full max-w-[420px]">{children}</div>
      </div>
    </div>
  );
}
