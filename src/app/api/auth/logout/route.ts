import { NextResponse } from "next/server";
import { clearDashboardSession } from "@/lib/auth";

export async function POST() {
  clearDashboardSession();
  return NextResponse.json({ ok: true });
}
