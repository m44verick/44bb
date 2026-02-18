import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { chatRequestSchema } from "@/lib/schemas";
import { generateAssistantReply } from "@/lib/llm";
import { mapLeadFields, upsertLead } from "@/lib/lead";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = chatRequestSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    const isOptout = /\b(iptal|stop)\b/i.test(parsed.data.message);
    const lead = await upsertLead(parsed.data.lead_id, parsed.data.lead);

    await prisma.message.create({
      data: { leadId: lead.id, role: "user", content: parsed.data.message }
    });

    const modelResult = isOptout
      ? {
          lead_id: lead.id,
          reply: "Talebinizi aldım, bu görüşmeyi durduruyorum. İstediğiniz zaman tekrar yazabilirsiniz.",
          intent: "optout" as const,
          fields_collected: {},
          fields_missing: [],
          notes_for_human: "Kullanıcı iletişimi durdurmak istedi."
        }
      : await generateAssistantReply({
          message: parsed.data.message,
          leadContext: mapLeadFields(parsed.data.lead),
          existingMissing: lead.missingFieldsJson ? JSON.parse(lead.missingFieldsJson) : []
        });

    const finalResponse = { ...modelResult, lead_id: lead.id };

    await prisma.message.create({
      data: {
        leadId: lead.id,
        role: "assistant",
        content: finalResponse.reply,
        notesForHuman: finalResponse.notes_for_human
      }
    });

    await prisma.lead.update({
      where: { id: lead.id },
      data: {
        ...mapLeadFields(parsed.data.lead),
        lastIntent: finalResponse.intent,
        missingFieldsJson: JSON.stringify(finalResponse.fields_missing)
      }
    });

    return NextResponse.json(finalResponse);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        lead_id: "",
        reply: "Şu an teknik bir aksaklık var, temsilcimiz sizinle devam edecek.",
        intent: "handoff",
        fields_collected: {},
        fields_missing: [],
        notes_for_human: "API error fallback"
      },
      { status: 500 }
    );
  }
}
