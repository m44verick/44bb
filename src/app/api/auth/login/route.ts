import { NextResponse } from "next/server";
import { setDashboardSession } from "@/lib/auth";

export async function POST(req: Request) {
  const { password } = await req.json();
  if (password !== process.env.DASHBOARD_PASSWORD) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }
  setDashboardSession();
  return NextResponse.json({ ok: true });
}
