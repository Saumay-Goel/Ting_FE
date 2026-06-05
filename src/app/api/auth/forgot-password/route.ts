import { NextRequest, NextResponse } from "next/server";
import { API_URL } from "@/lib/backend";

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  const res = await fetch(`${API_URL}/auth/forgot-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok && res.status >= 500) {
    return NextResponse.json(
      { error: data.error ?? "Something went wrong" },
      { status: res.status },
    );
  }

  return NextResponse.json({
    message:
      data.message ?? "If that email exists, a reset link is on its way.",
  });
}
