import { z } from "zod";

export const leadInputSchema = z.object({
  company_name: z.string().optional(),
  person_name: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
  location: z.string().optional(),
  product_interest: z.string().optional()
});

export const chatRequestSchema = z.object({
  lead_id: z.string().optional(),
  message: z.string().min(1),
  lead: leadInputSchema.optional()
});

export const assistantResponseSchema = z.object({
  lead_id: z.string(),
  reply: z.string(),
  intent: z.enum(["qualify_lead", "request_info", "offer", "handoff", "smalltalk", "optout"]),
  fields_collected: z.record(z.string(), z.string()).default({}),
  fields_missing: z.array(z.string()).default([]),
  notes_for_human: z.string()
});

export type ChatRequest = z.infer<typeof chatRequestSchema>;
export type AssistantResponse = z.infer<typeof assistantResponseSchema>;
