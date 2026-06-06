import { NextResponse } from "next/server";
import { backendFetch } from "@/lib/backend";

export async function GET() {
  const res = await backendFetch("/alert/alerts");
  if (!res.ok) {
    return NextResponse.json({ alerts: [] }, { status: res.status });
  }
  const data = await res.json();
  return NextResponse.json(data);
}
