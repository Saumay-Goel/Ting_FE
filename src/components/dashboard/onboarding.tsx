"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";

type Props = {
  awsConnected: boolean;
  telegramConnected: boolean;
  onComplete: () => void;
};

export default function Onboarding({
  awsConnected,
  telegramConnected,
  onComplete,
}: Props) {
  // Start on whichever step isn't done yet
  const [step, setStep] = useState<1 | 2>(awsConnected ? 2 : 1);

  return (
    <div className="mx-auto max-w-[560px] px-6 py-12 md:px-10">
      <div className="mb-8 text-center">
        <h1 className="font-[family-name:var(--font-display)] text-[30px] font-bold tracking-tight">
          Let&apos;s get you set up
        </h1>
        <p className="mt-2 text-[15px] text-[#6B6357]">
          Two quick steps and Tinglr starts watching your AWS.
        </p>
      </div>

      {/* Stepper */}
      <div className="mb-8 flex items-center justify-center gap-3">
        <StepDot
          n={1}
          active={step === 1}
          done={awsConnected}
          label="Connect AWS"
        />
        <div className="h-px w-10 bg-[#D8CEBC]" />
        <StepDot
          n={2}
          active={step === 2}
          done={telegramConnected}
          label="Link Telegram"
        />
      </div>

      {step === 1 ? (
        <AwsStep done={awsConnected} onDone={() => setStep(2)} />
      ) : (
        <TelegramStep done={telegramConnected} onLinked={onComplete} />
      )}
    </div>
  );
}

function StepDot({
  n,
  active,
  done,
  label,
}: {
  n: number;
  active: boolean;
  done: boolean;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <span
        className={`grid h-8 w-8 place-items-center rounded-full text-[14px] font-bold transition ${
          done
            ? "bg-[#3CC66B] text-white"
            : active
              ? "bg-[#F5A623] text-[#1A1714] shadow-[0_0_0_1px_#1A1714]"
              : "bg-[#F3E8D0] text-[#A89E8C]"
        }`}
      >
        {done ? "✓" : n}
      </span>
      <span
        className={`text-[13.5px] font-semibold ${active || done ? "text-[#1A1714]" : "text-[#A89E8C]"}`}
      >
        {label}
      </span>
    </div>
  );
}

/* ---------- STEP 1: AWS ---------- */
function AwsStep({ done, onDone }: { done: boolean; onDone: () => void }) {
  const [connectionId, setConnectionId] = useState("");
  const [launchUrl, setLaunchUrl] = useState("");
  const [roleArn, setRoleArn] = useState("");
  const [loadingLink, setLoadingLink] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function getLink() {
    setError("");
    setLoadingLink(true);
    try {
      const res = await fetch("/api/aws/connect");
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Couldn't start AWS connection.");
        return;
      }
      setConnectionId(data.connectionId);
      setLaunchUrl(data.launchUrl);
      window.open(data.launchUrl, "_blank");
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setLoadingLink(false);
    }
  }

  async function saveArn() {
    setError("");
    if (!roleArn.startsWith("arn:aws:iam::")) {
      setError("That doesn't look like a valid role ARN.");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("/api/aws/role-arn", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ connectionId, roleArn }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Couldn't save the ARN.");
        return;
      }
      onDone();
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setSaving(false);
    }
  }

  if (done) {
    return (
      <div className="rounded-2xl border border-[#C4DCBF] bg-[#EAF4E8] px-6 py-8 text-center">
        <div className="text-[15px] font-semibold text-[#3F7A3A]">
          ✓ AWS connected. On to Telegram →
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-[#ECE4D5] bg-white p-7">
      <h2 className="text-[19px] font-bold">Connect your AWS account</h2>
      <p className="mt-1.5 text-[14px] leading-relaxed text-[#6B6357]">
        Tinglr uses a secure, read-only role — no access keys. One click
        launches a CloudFormation stack that creates it.
      </p>

      <ol className="mt-5 flex flex-col gap-3 text-[14px] text-[#3a352d]">
        <li className="flex gap-3">
          <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#F5A623] text-[11px] font-bold">
            1
          </span>
          Click below — it opens AWS CloudFormation in a new tab. Review and
          create the stack.
        </li>
        <li className="flex gap-3">
          <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#F5A623] text-[11px] font-bold">
            2
          </span>
          When it finishes, open the stack&apos;s <b>Outputs</b> tab, copy the{" "}
          <b>Role ARN</b>, and paste it below.
        </li>
      </ol>

      <button
        onClick={getLink}
        disabled={loadingLink}
        className="btn-amber mt-5 w-full rounded-xl py-3.5 text-[15px] font-bold disabled:opacity-60"
      >
        {loadingLink
          ? "Preparing…"
          : launchUrl
            ? "Re-open CloudFormation"
            : "Launch CloudFormation"}
      </button>

      {launchUrl && (
        <div className="mt-5">
          <label className="mb-2 block text-[13.5px] font-semibold text-[#1A1714]">
            Paste your Role ARN
          </label>
          <input
            value={roleArn}
            onChange={(e) => setRoleArn(e.target.value)}
            placeholder="arn:aws:iam::123456789012:role/ting-..."
            className="w-full rounded-xl border border-[#D8CEBC] bg-white px-4 py-3 font-mono text-[13px] text-[#1A1714] outline-none transition placeholder:text-[#A89E8C] focus:border-[#F5A623] focus:ring-4 focus:ring-[#F5A623]/15"
          />
          <button
            onClick={saveArn}
            disabled={saving}
            className="btn-amber mt-3 w-full rounded-xl py-3.5 text-[15px] font-bold disabled:opacity-60"
          >
            {saving ? "Connecting…" : "Connect AWS"}
          </button>
        </div>
      )}

      {error && (
        <div className="mt-4 rounded-xl border border-[#E8B4A0] bg-[#FBEAE3] px-4 py-3 text-[13.5px] font-medium text-[#B5421F]">
          {error}
        </div>
      )}
    </div>
  );
}

/* ---------- STEP 2: Telegram ---------- */
function TelegramStep({
  done,
  onLinked,
}: {
  done: boolean;
  onLinked: () => void;
}) {
  const [link, setLink] = useState("");
  const [qr, setQr] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch the deep link + generate QR
  useEffect(() => {
    if (done) return;
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/telegram/link");
        const data = await res.json();
        if (cancelled) return;
        if (!res.ok) {
          setError(data.error ?? "Couldn't create Telegram link.");
          return;
        }
        setLink(data.link);
        const dataUrl = await QRCode.toDataURL(data.link, {
          width: 220,
          margin: 1,
          color: { dark: "#1A1714", light: "#FFFFFF" },
        });
        if (!cancelled) setQr(dataUrl);
      } catch {
        if (!cancelled) setError("Something went wrong.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [done]);

  // Poll for linking completion
  useEffect(() => {
    if (done) return;
    const interval = setInterval(async () => {
      try {
        const res = await fetch("/api/auth/me");
        if (!res.ok) return;
        const { user } = await res.json();
        if (user?.telegramChatId) {
          clearInterval(interval);
          onLinked();
        }
      } catch {
        /* keep polling */
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [done, onLinked]);

  return (
    <div className="rounded-2xl border border-[#ECE4D5] bg-white p-7 text-center">
      <h2 className="text-[19px] font-bold">Link Telegram</h2>
      <p className="mt-1.5 text-[14px] leading-relaxed text-[#6B6357]">
        This is where Tinglr sends your alerts. Scan the QR with your phone, or
        tap the button to open Telegram.
      </p>

      <div className="my-6 flex justify-center">
        {loading ? (
          <div className="h-[220px] w-[220px] animate-pulse rounded-xl bg-[#F3E8D0]" />
        ) : qr ? (
          <img
            src={qr}
            alt="Telegram QR code"
            className="rounded-xl border border-[#ECE4D5]"
          />
        ) : null}
      </div>

      {link && (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-amber inline-block w-full rounded-xl py-3.5 text-[15px] font-bold"
        >
          Open in Telegram
        </a>
      )}

      <p className="mt-4 flex items-center justify-center gap-2 text-[13px] text-[#A89E8C]">
        <span className="h-2 w-2 animate-pulse rounded-full bg-[#3CC66B]" />
        Waiting for you to tap Start in Telegram…
      </p>

      {error && (
        <div className="mt-4 rounded-xl border border-[#E8B4A0] bg-[#FBEAE3] px-4 py-3 text-[13.5px] font-medium text-[#B5421F]">
          {error}
        </div>
      )}
    </div>
  );
}
