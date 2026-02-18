import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="flex min-h-[85vh] flex-col items-center justify-center">
      <section className="surface w-full max-w-4xl p-10 text-center md:p-16">
        <p className="mb-3 text-sm uppercase tracking-[0.3em] text-accent">Premium Workflow</p>
        <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">B2B Sales Assistant</h1>
        <p className="mx-auto mt-6 max-w-2xl text-base text-zinc-300 md:text-lg">
          Türkçe satış görüşmelerini yönetin, lead bilgilerini otomatik toplayın ve CRM ekranından tek bakışta yönetin.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/chat">Start Chat</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/dashboard">Open Dashboard</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
