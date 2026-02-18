import { redirect } from "next/navigation";
import { isDashboardAuthenticated } from "@/lib/auth";
import { LeadDetail } from "@/components/lead-detail";

export default function LeadPage({ params }: { params: { id: string } }) {
  if (!isDashboardAuthenticated()) redirect("/dashboard/login");
  return <LeadDetail id={params.id} />;
}
