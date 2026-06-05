import { NextRequest, NextResponse } from "next/server";
import { API_URL } from "@/lib/backend";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    return NextResponse.json(
      { error: data.error ?? "Signup failed" },
      { status: res.status },
    );
  }

  return NextResponse.json({
    message: data.message ?? "Account created. Check your email to verify.",
  });
}
