"use client";

import { useState } from "react";

export type Alert = {
  id: string;
  alarmName: string;
  state?: string;
  reason?: string;
  awsAccountId?: string;
  region?: string;
  summary?: string;
  severity?: string;
  cause?: string;
  steps?: string[] | null;
  createdAt: string;
};

const SEVERITY_STYLES: Record<string, string> = {
  critical: "bg-[#FBE3DC] text-[#C0341A] border-[#F0BBAD]",
  high: "bg-[#FBE3DC] text-[#C0341A] border-[#F0BBAD]",
  medium: "bg-[#FCEFD0] text-[#9A6B0E] border-[#F0D89A]",
  low: "bg-[#E6F0E4] text-[#3F7A3A] border-[#C4DCBF]",
};

function timeAgo(iso: string): string {
  const d = new Date(iso);
  const diff = Date.now() - d.getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 30) return `${days}d ago`;
  return d.toLocaleDateString();
}

export default function AlertRow({ alert }: { alert: Alert }) {
  const [open, setOpen] = useState(false);
  const sev = (alert.severity ?? "medium").toLowerCase();
  const sevStyle = SEVERITY_STYLES[sev] ?? SEVERITY_STYLES.medium;
  const steps = Array.isArray(alert.steps) ? alert.steps : [];

  return (
    <div className="overflow-hidden rounded-2xl border border-[#ECE4D5] bg-white transition hover:border-[#D8CEBC]">
      {/* Row header */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center gap-4 px-5 py-4 text-left"
      >
        <span
          className={`shrink-0 rounded-full border px-2.5 py-1 text-[11.5px] font-bold uppercase tracking-wide ${sevStyle}`}
        >
          {sev}
        </span>

        <div className="min-w-0 flex-1">
          <div className="truncate text-[15.5px] font-bold text-[#1A1714]">
            {alert.alarmName}
          </div>
          <div className="truncate text-[13.5px] text-[#6B6357]">
            {alert.summary ?? alert.reason ?? "Incident detected"}
          </div>
        </div>

        {alert.region && (
          <span className="hidden shrink-0 rounded-md bg-[#F3E8D0] px-2 py-1 text-[12px] font-semibold text-[#6B6357] sm:block">
            {alert.region}
          </span>
        )}
        <span className="shrink-0 text-[13px] text-[#A89E8C]">
          {timeAgo(alert.createdAt)}
        </span>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className={`h-5 w-5 shrink-0 text-[#A89E8C] transition-transform ${open ? "rotate-180" : ""}`}
        >
          <path
            d="M6 9l6 6 6-6"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Expanded detail */}
      {open && (
        <div className="border-t border-[#ECE4D5] bg-[#FDFBF6] px-5 py-5">
          {alert.cause && (
            <div className="mb-4">
              <div className="mb-1 text-[12px] font-bold uppercase tracking-wider text-[#A89E8C]">
                Root cause
              </div>
              <p className="text-[14.5px] leading-relaxed text-[#3a352d]">
                {alert.cause}
              </p>
            </div>
          )}

          {steps.length > 0 && (
            <div className="mb-2">
              <div className="mb-2 text-[12px] font-bold uppercase tracking-wider text-[#A89E8C]">
                Suggested fix
              </div>
              <ol className="flex flex-col gap-2">
                {steps.map((step, i) => (
                  <li
                    key={i}
                    className="flex gap-3 text-[14.5px] leading-relaxed text-[#3a352d]"
                  >
                    <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#F5A623] text-[11px] font-bold text-[#1A1714]">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          )}

          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1 border-t border-[#ECE4D5] pt-4 text-[12.5px] text-[#6B6357]">
            {alert.state && (
              <span>
                State: <b className="text-[#1A1714]">{alert.state}</b>
              </span>
            )}
            {alert.awsAccountId && (
              <span>
                Account: <b className="text-[#1A1714]">{alert.awsAccountId}</b>
              </span>
            )}
            <span>{new Date(alert.createdAt).toLocaleString()}</span>
          </div>
        </div>
      )}
    </div>
  );
}
