"use client";

import { useEffect, useState } from "react";
import AlertRow, { type Alert } from "@/components/dashboard/AlertRow";
import Onboarding from "@/components/dashboard/onboarding";

type ConnState = {
  awsConnected: boolean;
  telegramConnected: boolean;
} | null;

async function fetchStatus(): Promise<ConnState> {
  const res = await fetch("/api/auth/me");
  if (!res.ok) return null;
  const { user } = await res.json();
  return {
    awsConnected: !!user?.awsConnections?.[0]?.roleArn,
    telegramConnected: !!user?.telegramChatId,
  };
}

async function fetchAlerts(): Promise<Alert[]> {
  const res = await fetch("/api/alerts");
  const data = await res.json();
  if (!res.ok) throw new Error();
  return data.alerts ?? [];
}

export default function DashboardPage() {
  const [conn, setConn] = useState<ConnState>(null);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  // bump this to trigger a reload (e.g. after onboarding completes)
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const status = await fetchStatus();
        if (cancelled) return;
        setConn(status);

        if (status?.awsConnected && status?.telegramConnected) {
          const list = await fetchAlerts();
          if (cancelled) return;
          setAlerts(list);
        }
        if (!cancelled) setError("");
      } catch {
        if (!cancelled) setError("Couldn't load your dashboard.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [reloadKey]);

  function handleOnboardingComplete() {
    setLoading(true);
    setReloadKey((k) => k + 1);
  }

  if (loading) {
    return (
      <div className="mx-auto max-w-[920px] px-6 py-10 md:px-10">
        <div className="flex flex-col gap-3">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-[76px] animate-pulse rounded-2xl border border-[#ECE4D5] bg-white"
            />
          ))}
        </div>
      </div>
    );
  }

  if (conn && (!conn.awsConnected || !conn.telegramConnected)) {
    return (
      <Onboarding
        awsConnected={conn.awsConnected}
        telegramConnected={conn.telegramConnected}
        onComplete={handleOnboardingComplete}
      />
    );
  }

  return (
    <div className="mx-auto max-w-[920px] px-6 py-10 md:px-10">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h1 className="font-[family-name:var(--font-display)] text-[32px] font-bold tracking-tight">
            Alerts
          </h1>
          <p className="mt-1 text-[15px] text-[#6B6357]">
            Every incident Tinglr has caught and diagnosed.
          </p>
        </div>
        {alerts.length > 0 && (
          <span className="rounded-full bg-[#F3E8D0] px-3 py-1.5 text-[13px] font-semibold text-[#6B6357]">
            {alerts.length} total
          </span>
        )}
      </div>

      {error && (
        <div className="rounded-2xl border border-[#E8B4A0] bg-[#FBEAE3] px-5 py-4 text-[14.5px] font-medium text-[#B5421F]">
          {error}
        </div>
      )}

      {!error && alerts.length === 0 && (
        <div className="rounded-2xl border border-dashed border-[#D8CEBC] bg-white px-6 py-16 text-center">
          <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-[#FCEBC9] text-[28px]">
            🔔
          </div>
          <h3 className="text-[19px] font-bold text-[#1A1714]">All quiet</h3>
          <p className="mx-auto mt-2 max-w-[380px] text-[14.5px] leading-relaxed text-[#6B6357]">
            You&apos;re all set up. When an alarm fires in your AWS, the
            diagnosed incident will appear here.
          </p>
        </div>
      )}

      {!error && alerts.length > 0 && (
        <div className="flex flex-col gap-3">
          {alerts.map((a) => (
            <AlertRow key={a.id} alert={a} />
          ))}
        </div>
      )}
    </div>
  );
}
