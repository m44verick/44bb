import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search") || "";
  const status = searchParams.get("status") || undefined;
  const intent = searchParams.get("intent") || undefined;

  const leads = await prisma.lead.findMany({
    where: {
      AND: [
        search
          ? {
              OR: [
                { companyName: { contains: search } },
                { personName: { contains: search } },
                { productInterest: { contains: search } }
              ]
            }
          : {},
        status ? { status: status as any } : {},
        intent ? { lastIntent: intent } : {}
      ]
    },
    orderBy: { updatedAt: "desc" }
  });

  return NextResponse.json(leads);
}
