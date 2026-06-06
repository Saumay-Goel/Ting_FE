import { NextResponse } from "next/server";
import { backendFetch } from "@/lib/backend";

export async function GET() {
  const res = await backendFetch("/telegram/link");
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    return NextResponse.json(
      { error: data.error ?? "Couldn't create Telegram link" },
      { status: res.status },
    );
  }
  return NextResponse.json(data);
}
