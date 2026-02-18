import OpenAI from "openai";
import { assistantResponseSchema } from "@/lib/schemas";
import { getCatalogSnippet } from "@/lib/catalog";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

function basePrompt(systemPrompt: string) {
  return `${systemPrompt}\n\nKurallar:\n- Türkçe günlük iş dili kullan.\n- Lead qualification sorularını eksik alanlara göre sor: ürün tipi, materyal, ebat(mm), adet, renk, kullanım alanı, termin, teslimat şehir/ülke.\n- Kullanıcı 'iptal' veya 'stop' derse intent=optout yap.\n- Proaktif iletişim yaptığını asla iddia etme.\n- Cevap SADECE JSON olsun.`;
}

export async function generateAssistantReply(input: {
  message: string;
  leadContext: Record<string, string | null | undefined>;
  existingMissing: string[];
}) {
  const model = process.env.MODEL_NAME || "gpt-4o-mini";
  const maxTokens = Number(process.env.MAX_OUTPUT_TOKENS || 400);
  const systemPrompt = process.env.SYSTEM_PROMPT || "Sen bir B2B satış asistanısın.";

  const payload = {
    lead_context: input.leadContext,
    existing_missing: input.existingMissing,
    user_message: input.message,
    catalog: getCatalogSnippet(),
    output_schema: {
      reply: "string",
      intent: "qualify_lead|request_info|offer|handoff|smalltalk|optout",
      fields_collected: { key: "value" },
      fields_missing: ["field"],
      notes_for_human: "string"
    }
  };

  const completion = await client.chat.completions.create({
    model,
    max_tokens: maxTokens,
    temperature: 0.3,
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: basePrompt(systemPrompt) },
      { role: "user", content: JSON.stringify(payload) }
    ]
  });

  const raw = completion.choices[0]?.message?.content || "";
  console.log("OpenAI raw response:", raw);

  const parsed = safeParse(raw);
  if (parsed) return parsed;

  const fixCompletion = await client.chat.completions.create({
    model,
    max_tokens: maxTokens,
    temperature: 0,
    response_format: { type: "json_object" },
    messages: [{ role: "user", content: `Fix JSON only:\n${raw}` }]
  });

  const fixedRaw = fixCompletion.choices[0]?.message?.content || "";
  console.log("OpenAI fixed response:", fixedRaw);
  const fixed = safeParse(fixedRaw);

  return (
    fixed || {
      lead_id: "",
      reply: "Detayları satış temsilcimize aktarıyorum. Kısa süre içinde sizinle devam edelim.",
      intent: "handoff" as const,
      fields_collected: {},
      fields_missing: ["product_type", "quantity"],
      notes_for_human: "Model JSON üretiminde hata verdi; manuel takip gerekli."
    }
  );
}

function safeParse(raw: string) {
  try {
    const json = JSON.parse(raw);
    const parsed = assistantResponseSchema.safeParse({
      lead_id: "temp",
      ...json
    });
    return parsed.success ? parsed.data : null;
  } catch {
    return null;
  }
}
