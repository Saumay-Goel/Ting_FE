import { NextRequest, NextResponse } from "next/server";
import { API_URL } from "@/lib/backend";

export async function POST(req: NextRequest) {
  const { token, password } = await req.json();

  const res = await fetch(`${API_URL}/auth/reset-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token, password }),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    return NextResponse.json(
      { error: data.error ?? "Reset failed" },
      { status: res.status },
    );
  }

  return NextResponse.json({ message: data.message ?? "Password updated" });
}
