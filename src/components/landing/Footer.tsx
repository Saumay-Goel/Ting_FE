import Link from "next/link";

const COLS = [
  {
    heading: "Product",
    links: [
      { label: "How it works", href: "#how" },
      { label: "Features", href: "#features" },
      { label: "Pricing", href: "#" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
  {
    heading: "Account",
    links: [
      { label: "Log in", href: "/login" },
      { label: "Sign up", href: "/signup" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-[#ECE4D5] bg-[#FBF1DC]">
      <div className="mx-auto max-w-[1280px] px-6 pb-10 pt-[60px] md:px-10">
        <div className="flex flex-wrap justify-between gap-10">
          <div>
            <div className="flex items-center gap-[11px] text-[21px] font-extrabold">
              <span className="grid h-[34px] w-[34px] place-items-center rounded-[10px] bg-[#F5A623] shadow-[0_0_0_1px_#1A1714]">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-[18px] w-[18px]"
                >
                  <path
                    d="M12 2.5a1.4 1.4 0 0 1 1.4 1.4v.6a5.6 5.6 0 0 1 4.2 5.4v3.1l1.5 2.3a.9.9 0 0 1-.75 1.4H5.65a.9.9 0 0 1-.75-1.4l1.5-2.3v-3.1a5.6 5.6 0 0 1 4.2-5.4v-.6A1.4 1.4 0 0 1 12 2.5Z"
                    fill="#1A1714"
                  />
                </svg>
              </span>
              Tinglr
            </div>
            <p className="mt-4 max-w-[260px] text-[14.5px] leading-relaxed text-[#6B6357]">
              AI on-call for AWS. Incident diagnosis, delivered to your chat.
            </p>
          </div>

          <div className="flex gap-14">
            {COLS.map((col) => (
              <div key={col.heading}>
                <h4 className="mb-[18px] text-[12.5px] font-bold uppercase tracking-[0.08em] text-[#6B6357]">
                  {col.heading}
                </h4>
                {col.links.map((l) => (
                  <Link
                    key={l.label}
                    href={l.href}
                    className="mb-2.5 block text-[14.5px] text-[#6B6357] hover:text-[#1A1714]"
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-11 border-t border-[#ECE4D5] pt-6 text-[13.5px] text-[#6B6357]">
          © 2026 Tinglr. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
