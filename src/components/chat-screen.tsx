"use client";

import { useState } from "react";
import { ChevronDown, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";

type Msg = { role: "user" | "assistant"; content: string; notes?: string };

const emptyLead = {
  company_name: "",
  person_name: "",
  email: "",
  phone: "",
  location: "",
  product_interest: ""
};

export function ChatScreen() {
  const [lead, setLead] = useState(emptyLead);
  const [leadId, setLeadId] = useState<string | undefined>();
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [notes, setNotes] = useState("");
  const [openNotes, setOpenNotes] = useState(true);
  const [loading, setLoading] = useState(false);

  const send = async () => {
    if (!input.trim() || loading) return;
    const text = input;
    setInput("");
    setMessages((m) => [...m, { role: "user", content: text }]);
    setLoading(true);

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lead_id: leadId, message: text, lead })
    });
    const data = await res.json();
    setLeadId(data.lead_id);
    setMessages((m) => [...m, { role: "assistant", content: data.reply, notes: data.notes_for_human }]);
    setNotes(data.notes_for_human || "");
    setLoading(false);
  };

  return (
    <div className="grid gap-4 lg:grid-cols-[340px_1fr]">
      <Card className="p-4">
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-zinc-300">Lead Details</h3>
        <div className="space-y-2">
          {Object.entries(lead).map(([key, value]) => (
            <Input key={key} placeholder={key.replaceAll("_", " ")} value={value} onChange={(e) => setLead((l) => ({ ...l, [key]: e.target.value }))} />
          ))}
        </div>
      </Card>

      <Card className="flex h-[80vh] flex-col p-4">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Sales Chat</h2>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setLead(emptyLead);
              setLeadId(undefined);
              setMessages([]);
              setNotes("");
            }}
          >
            <Plus className="mr-2 h-4 w-4" /> New Lead
          </Button>
        </div>

        <div className="flex-1 space-y-3 overflow-y-auto pr-1">
          {messages.map((m, i) => (
            <div key={i} className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${m.role === "user" ? "ml-auto bg-white text-black" : "bg-muted text-white"}`}>
              {m.content}
            </div>
          ))}
        </div>

        <div className="mt-3 rounded-xl border border-border bg-black/40 p-3">
          <button className="flex w-full items-center justify-between text-sm text-zinc-300" onClick={() => setOpenNotes((o) => !o)}>
            Notes for Human <ChevronDown className={`h-4 w-4 transition ${openNotes ? "rotate-180" : ""}`} />
          </button>
          {openNotes && <p className="mt-2 text-sm text-zinc-400">{notes || "Henüz not yok."}</p>}
        </div>

        <div className="mt-3 flex gap-2">
          <Textarea className="min-h-12" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Mesajınızı yazın..." />
          <Button onClick={send} disabled={loading}>{loading ? "..." : "Gönder"}</Button>
        </div>
      </Card>
    </div>
  );
}
