import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="mx-auto grid max-w-[1280px] items-center gap-12 px-6 py-24 md:grid-cols-[1fr_1.1fr] md:px-10 md:py-32">
      <div>
        <p className="mb-8 text-[15px] font-semibold text-[#6B6357]">
          AI on-call for AWS
        </p>

        <h1 className="mb-8 font-[family-name:var(--font-display)] text-[52px] font-bold leading-[1.04] tracking-[-0.03em] md:text-[72px]">
          Know what broke.
          <br />
          And how to <span className="text-[#E08E10]">fix it.</span>
        </h1>

        <p className="mb-11 max-w-[470px] text-[19px] leading-[1.65] text-[#6B6357]">
          When an alarm fires in your AWS, Tinglr reads the logs, finds the root
          cause, and sends the fix straight to your chat — so you&apos;re never
          stuck digging through dashboards.
        </p>

        <div className="mb-9 flex items-center gap-8">
          <Link
            href="/signup"
            className="btn-amber rounded-[14px] px-9 py-[19px] text-[17px] font-bold"
          >
            Get started free
          </Link>
          <a
            href="#how"
            className="group flex items-center gap-2 text-[16.5px] font-bold"
          >
            See how it works
            <span className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </a>
        </div>

        <div className="flex flex-wrap items-center gap-3.5 text-[14.5px] font-medium text-[#6B6357]">
          <span>No credit card</span>
          <span className="h-1 w-1 rounded-full bg-[#F5A623]" />
          <span>1-click AWS setup</span>
          <span className="h-1 w-1 rounded-full bg-[#F5A623]" />
          <span>Free tier forever</span>
        </div>
      </div>

      {/* Right: illustration (bleeds large) */}
      <div className="relative md:scale-[1.08]">
        <Image
          src="/hero.png"
          alt="Tinglr detects an AWS incident, diagnoses it, and delivers the fix"
          width={1024}
          height={900}
          className="h-auto w-full"
          priority
        />
      </div>
    </section>
  );
}
