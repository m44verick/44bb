import { LeadStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";

type LeadInput = {
  company_name?: string;
  person_name?: string;
  email?: string;
  phone?: string;
  location?: string;
  product_interest?: string;
};

export async function upsertLead(leadId: string | undefined, payload: LeadInput | undefined) {
  if (leadId) {
    return prisma.lead.update({
      where: { id: leadId },
      data: {
        companyName: payload?.company_name,
        personName: payload?.person_name,
        email: payload?.email,
        phone: payload?.phone,
        location: payload?.location,
        productInterest: payload?.product_interest
      }
    });
  }

  return prisma.lead.create({
    data: {
      companyName: payload?.company_name,
      personName: payload?.person_name,
      email: payload?.email,
      phone: payload?.phone,
      location: payload?.location,
      productInterest: payload?.product_interest,
      status: LeadStatus.NEW
    }
  });
}

export function mapLeadFields(lead: LeadInput | undefined) {
  return {
    companyName: lead?.company_name,
    personName: lead?.person_name,
    email: lead?.email,
    phone: lead?.phone,
    location: lead?.location,
    productInterest: lead?.product_interest
  };
}
