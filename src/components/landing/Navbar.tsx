import Link from "next/link";
import Image from "next/image";
function BellMark() {
  return (
    <span className="grid h-[38px] w-[38px] place-items-center rounded-[11px] bg-[#F5A623] shadow-[0_0_0_1px_#1A1714,2px_2px_0_#1A1714]">
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
        <path
          d="M12 2.5a1.4 1.4 0 0 1 1.4 1.4v.6a5.6 5.6 0 0 1 4.2 5.4v3.1l1.5 2.3a.9.9 0 0 1-.75 1.4H5.65a.9.9 0 0 1-.75-1.4l1.5-2.3v-3.1a5.6 5.6 0 0 1 4.2-5.4v-.6A1.4 1.4 0 0 1 12 2.5Z"
          fill="#1A1714"
        />
        <path
          d="M9.7 19a2.4 2.4 0 0 0 4.6 0"
          stroke="#1A1714"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

function Chevron() {
  return (
    <svg viewBox="0 0 12 12" fill="none" className="h-3 w-3 opacity-60">
      <path
        d="M3 4.5 6 7.5 9 4.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#ECE4D5] bg-[#FBF6EC]/90 backdrop-blur-md">
      <nav className="mx-auto flex h-[88px] max-w-[1280px] items-center gap-10 px-6 md:px-10">
        <Link
          href="/"
          className="flex items-center gap-[11px] font-[family-name:var(--font-display)] text-[24px] font-bold tracking-tight"
        >
          <Image src="/Tinglr.svg" width={100} height={70} alt="Tinglr" />
        </Link>

        <div className="mx-auto hidden items-center gap-9 text-[15.5px] font-semibold text-[#3a352d] md:flex">
          <a
            href="#features"
            className="flex items-center gap-1.5 hover:text-[#E08E10]"
          >
            Features <Chevron />
          </a>
          <a
            href="#how"
            className="flex items-center gap-1.5 hover:text-[#E08E10]"
          >
            How it works <Chevron />
          </a>
          <a href="#" className="hover:text-[#E08E10]">
            Pricing
          </a>
          <a href="#" className="hover:text-[#E08E10]">
            Docs
          </a>
        </div>

        <div className="flex items-center gap-7">
          <Link href="/login" className="text-[15.5px] font-bold">
            Log in
          </Link>
          <Link
            href="/signup"
            className="btn-amber rounded-xl px-[26px] py-[14px] text-[15px] font-bold"
          >
            Get started
          </Link>
        </div>
      </nav>
    </header>
  );
}
