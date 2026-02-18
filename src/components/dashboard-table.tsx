"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

type Lead = {
  id: string;
  companyName: string | null;
  personName: string | null;
  status: string;
  lastIntent: string | null;
  missingFieldsJson: string | null;
  updatedAt: string;
};

export function DashboardTable() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [intent, setIntent] = useState("");

  useEffect(() => {
    const qs = new URLSearchParams({ search, status, intent }).toString();
    fetch(`/api/leads?${qs}`).then((r) => r.json()).then(setLeads);
  }, [search, status, intent]);

  return (
    <Card className="p-4">
      <div className="mb-4 grid gap-2 md:grid-cols-3">
        <Input placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
        <Input placeholder="Filter status" value={status} onChange={(e) => setStatus(e.target.value)} />
        <Input placeholder="Filter intent" value={intent} onChange={(e) => setIntent(e.target.value)} />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="text-zinc-400">
            <tr>
              <th className="p-2">Company / Person</th><th className="p-2">Last message</th><th className="p-2">Status</th><th className="p-2">Intent</th><th className="p-2">Missing fields</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead.id} className="border-t border-border hover:bg-muted/60">
                <td className="p-2"><Link className="underline" href={`/dashboard/leads/${lead.id}`}>{lead.companyName || "-"} / {lead.personName || "-"}</Link></td>
                <td className="p-2">{new Date(lead.updatedAt).toLocaleString("tr-TR")}</td>
                <td className="p-2">{lead.status}</td>
                <td className="p-2">{lead.lastIntent || "-"}</td>
                <td className="p-2">{lead.missingFieldsJson || "[]"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
