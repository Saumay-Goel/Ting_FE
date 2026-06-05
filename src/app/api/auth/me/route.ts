import { NextResponse } from "next/server";
import { backendFetch } from "@/lib/backend";

export async function GET() {
  const res = await backendFetch("/auth/me");
  if (!res.ok) {
    return NextResponse.json({ user: null }, { status: 401 });
  }
  const data = await res.json();
  return NextResponse.json(data);
}
