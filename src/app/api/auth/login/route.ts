import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { API_URL } from "@/lib/backend";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    return NextResponse.json(
      { error: data.error ?? "Login failed" },
      { status: res.status },
    );
  }

  if (data.token) {
    const cookieStore = await cookies();
    cookieStore.set("token", data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });
  }

  return NextResponse.json({ user: data.user ?? null });
}
