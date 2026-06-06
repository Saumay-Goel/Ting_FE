import { NextResponse } from "next/server";
import { backendFetch } from "@/lib/backend";

export async function GET() {
  const res = await backendFetch("/aws/connect");
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    return NextResponse.json(
      { error: data.error ?? "Couldn't create AWS connection link" },
      { status: res.status },
    );
  }
  return NextResponse.json(data);
}
