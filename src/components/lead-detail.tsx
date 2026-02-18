"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export function LeadDetail({ id }: { id: string }) {
  const [lead, setLead] = useState<any>(null);

  useEffect(() => {
    fetch(`/api/leads/${id}`).then((r) => r.json()).then(setLead);
  }, [id]);

  const summary = useMemo(() => {
    if (!lead) return "";
    return `Lead: ${lead.companyName || "-"} / ${lead.personName || "-"}\nIntent: ${lead.lastIntent || "-"}\nEksik Alanlar: ${lead.missingFieldsJson || "[]"}\nSonraki Adım: Teknik teklif için müşteriyle net adet/ebat doğrulama.`;
  }, [lead]);

  if (!lead) return <p>Loading...</p>;

  return (
    <div className="grid gap-4 lg:grid-cols-[360px_1fr]">
      <Card className="space-y-2 p-4">
        <Input value={lead.companyName || ""} onChange={(e) => setLead({ ...lead, companyName: e.target.value })} placeholder="Company" />
        <Input value={lead.personName || ""} onChange={(e) => setLead({ ...lead, personName: e.target.value })} placeholder="Person" />
        <Input value={lead.email || ""} onChange={(e) => setLead({ ...lead, email: e.target.value })} placeholder="Email" />
        <Input value={lead.phone || ""} onChange={(e) => setLead({ ...lead, phone: e.target.value })} placeholder="Phone" />
        <Input value={lead.location || ""} onChange={(e) => setLead({ ...lead, location: e.target.value })} placeholder="Location" />
        <Input value={lead.productInterest || ""} onChange={(e) => setLead({ ...lead, productInterest: e.target.value })} placeholder="Product Interest" />
        <div className="grid grid-cols-3 gap-2">
          <Button variant="outline" onClick={() => setLead({ ...lead, status: "WON" })}>Won</Button>
          <Button variant="outline" onClick={() => setLead({ ...lead, status: "LOST" })}>Lost</Button>
          <Button variant="outline" onClick={() => setLead({ ...lead, status: "NEEDS_FOLLOW_UP" })}>Follow-up</Button>
        </div>
        <Button
          onClick={async () => {
            await fetch(`/api/leads/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(lead) });
          }}
        >Save</Button>
        <Button variant="outline" onClick={() => navigator.clipboard.writeText(summary)}>Copy Summary</Button>
      </Card>

      <Card className="p-4">
        <h3 className="mb-3 text-lg font-semibold">Conversation Timeline</h3>
        <div className="space-y-2">
          {lead.messages?.map((m: any) => (
            <div key={m.id} className="rounded-xl border border-border p-3">
              <p className="text-xs uppercase tracking-wider text-zinc-500">{m.role}</p>
              <p className="text-sm">{m.content}</p>
              {m.notesForHuman ? <p className="mt-2 text-xs text-zinc-400">Note: {m.notesForHuman}</p> : null}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
