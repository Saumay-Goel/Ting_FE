import { NextRequest, NextResponse } from "next/server";
import { backendFetch } from "@/lib/backend";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const res = await backendFetch("/aws/role-arn", {
    method: "POST",
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    return NextResponse.json(
      { error: data.error ?? "Couldn't save role ARN" },
      { status: res.status },
    );
  }
  return NextResponse.json(data);
}
