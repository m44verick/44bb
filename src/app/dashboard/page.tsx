import { redirect } from "next/navigation";
import { isDashboardAuthenticated } from "@/lib/auth";
import { DashboardTable } from "@/components/dashboard-table";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  if (!isDashboardAuthenticated()) redirect("/dashboard/login");

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold">Operator CRM</h1>
        <form action="/api/auth/logout" method="post">
          <Button variant="outline" type="submit">Logout</Button>
        </form>
      </div>
      <DashboardTable />
    </div>
  );
}
