import { NextRequest, NextResponse } from "next/server";
import { API_URL } from "@/lib/backend";

export async function POST(req: NextRequest) {
  const { token } = await req.json();

  const res = await fetch(`${API_URL}/auth/verify-email`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token }),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    return NextResponse.json(
      { error: data.error ?? "Verification failed" },
      { status: res.status },
    );
  }

  return NextResponse.json({ message: data.message ?? "Email verified" });
}
