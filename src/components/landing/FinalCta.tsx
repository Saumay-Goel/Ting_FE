import Link from "next/link";

export default function FinalCta() {
  return (
    <section className="mx-auto max-w-[1280px] px-6 pb-24 pt-2.5 md:px-10">
      <div className="relative overflow-hidden rounded-[30px] bg-[#1A1714] px-10 py-20 text-center">
        <div className="pointer-events-none absolute -right-20 -top-36 h-[380px] w-[380px] rounded-full bg-[#F5A623] opacity-40 blur-[130px]" />
        <div className="pointer-events-none absolute -bottom-40 -left-16 h-[320px] w-[320px] rounded-full bg-[#E08E10] opacity-25 blur-[130px]" />
        <h2 className="relative mb-[18px] font-[family-name:var(--font-display)] text-[36px] font-bold leading-[1.05] tracking-[-0.03em] text-[#FBF6EC] md:text-[52px]">
          Your AWS just got an on-call engineer.
        </h2>
        <p className="relative mb-9 text-[18.5px] text-[#B5AD9F]">
          Free to start. Set up in minutes. Never get blindsided again.
        </p>
        <Link
          href="/signup"
          className="btn-amber relative inline-block rounded-[13px] px-8 py-[18px] text-[17px] font-bold"
        >
          Get started free
        </Link>
      </div>
    </section>
  );
}
