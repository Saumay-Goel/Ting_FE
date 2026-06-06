"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

type NavItem = { label: string; href: string; icon: React.ReactNode };

function Icon({ d }: { d: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 shrink-0">
      <path
        d={d}
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const NAV: NavItem[] = [
  {
    label: "Alerts",
    href: "/dashboard",
    icon: (
      <Icon d="M12 3a6 6 0 0 0-6 6v3l-1.5 3h15L18 12V9a6 6 0 0 0-6-6ZM9.5 18a2.5 2.5 0 0 0 5 0" />
    ),
  },
  {
    label: "Connections",
    href: "/connections",
    icon: (
      <Icon d="M9 12a3 3 0 0 1 3-3h3a3 3 0 0 1 0 6M15 12a3 3 0 0 1-3 3H9a3 3 0 0 1 0-6" />
    ),
  },
  {
    label: "Settings",
    href: "/settings",
    icon: (
      <Icon d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" />
    ),
  },
];

export default function Sidebar({
  user,
}: {
  user: { name?: string; email: string };
}) {
  const [open, setOpen] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  }

  return (
    <aside
      className={`sticky top-0 flex h-screen shrink-0 flex-col border-r border-[#ECE4D5] bg-[#FBF1DC] transition-all duration-200 ${
        open ? "w-[250px]" : "w-[76px]"
      }`}
    >
      {/* Logo + toggle */}
      <div className="flex h-[72px] items-center gap-2.5 border-b border-[#ECE4D5] px-4">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-[10px] bg-[#F5A623] shadow-[0_0_0_1px_#1A1714]">
          <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
            <path
              d="M12 2.5a1.4 1.4 0 0 1 1.4 1.4v.6a5.6 5.6 0 0 1 4.2 5.4v3.1l1.5 2.3a.9.9 0 0 1-.75 1.4H5.65a.9.9 0 0 1-.75-1.4l1.5-2.3v-3.1a5.6 5.6 0 0 1 4.2-5.4v-.6A1.4 1.4 0 0 1 12 2.5Z"
              fill="#1A1714"
            />
          </svg>
        </span>
        {open && (
          <span className="font-[family-name:var(--font-display)] text-[20px] font-bold tracking-tight">
            Tinglr
          </span>
        )}
        <button
          onClick={() => setOpen((o) => !o)}
          className="ml-auto grid h-8 w-8 place-items-center rounded-lg text-[#6B6357] transition hover:bg-[#F3E8D0]"
          aria-label="Toggle sidebar"
        >
          <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
            <path
              d={open ? "M15 6l-6 6 6 6" : "M9 6l6 6-6 6"}
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* Nav */}
      <nav className="flex flex-1 flex-col gap-1 p-3">
        {NAV.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-[15px] font-semibold transition ${
                active
                  ? "bg-[#F5A623] text-[#1A1714] shadow-[0_0_0_1px_#1A1714]"
                  : "text-[#5A534A] hover:bg-[#F3E8D0]"
              } ${!open && "justify-center"}`}
              title={!open ? item.label : undefined}
            >
              {item.icon}
              {open && item.label}
            </Link>
          );
        })}
      </nav>

      {/* User + logout */}
      <div className="border-t border-[#ECE4D5] p-3">
        <div className={`flex items-center gap-3 ${!open && "justify-center"}`}>
          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#1A1714] text-[14px] font-bold text-[#FBF6EC]">
            {(user.name?.[0] ?? user.email[0]).toUpperCase()}
          </div>
          {open && (
            <div className="min-w-0 flex-1">
              <div className="truncate text-[14px] font-semibold text-[#1A1714]">
                {user.name ?? "Account"}
              </div>
              <div className="truncate text-[12.5px] text-[#6B6357]">
                {user.email}
              </div>
            </div>
          )}
        </div>
        {open && (
          <button
            onClick={logout}
            className="mt-3 w-full rounded-lg border border-[#ECE4D5] bg-white py-2 text-[13.5px] font-semibold text-[#5A534A] transition hover:border-[#1A1714] hover:text-[#1A1714]"
          >
            Log out
          </button>
        )}
      </div>
    </aside>
  );
}
