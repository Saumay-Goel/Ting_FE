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
      {/* LEFT — brand panel */}
      <div className="relative hidden flex-1 flex-col justify-between overflow-hidden p-12 lg:flex">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 30%, #F5A623 0, transparent 40%), radial-gradient(circle at 80% 70%, #E08E10 0, transparent 40%)",
          }}
        />
        <Link
          href="/"
          className="relative flex items-center gap-2.5 font-[family-name:var(--font-display)] text-[22px] font-bold text-[#FBF6EC]"
        >
          <span className="grid h-9 w-9 place-items-center rounded-[10px] bg-[#F5A623]">
            <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
              <path
                d="M12 2.5a1.4 1.4 0 0 1 1.4 1.4v.6a5.6 5.6 0 0 1 4.2 5.4v3.1l1.5 2.3a.9.9 0 0 1-.75 1.4H5.65a.9.9 0 0 1-.75-1.4l1.5-2.3v-3.1a5.6 5.6 0 0 1 4.2-5.4v-.6A1.4 1.4 0 0 1 12 2.5Z"
                fill="#1A1714"
              />
            </svg>
          </span>
          Tinglr
        </Link>

        <div className="relative">
          <h1 className="font-[family-name:var(--font-display)] text-[64px] font-bold leading-[1.02] tracking-[-0.03em] text-[#F5A623]">
            AI on-call
            <br />
            for your AWS.
          </h1>
          <p className="mt-6 max-w-[420px] text-[18px] leading-relaxed text-[#B5AD9F]">
            Tinglr reads your logs, finds the root cause, and sends the fix
            straight to your chat — so you&apos;re never stuck digging through
            dashboards.
          </p>
        </div>

        <div className="relative flex gap-3 text-[14px] text-[#8A8275]">
          <span>Detect</span>
          <span className="text-[#F5A623]">·</span>
          <span>Diagnose</span>
          <span className="text-[#F5A623]">·</span>
          <span>Deliver</span>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center bg-[#FBF6EC] p-6 lg:p-12">
        <div className="w-full max-w-[420px]">{children}</div>
      </div>
    </div>
  );
}
