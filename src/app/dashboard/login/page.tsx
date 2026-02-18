"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function DashboardLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  return (
    <div className="flex min-h-[80vh] items-center justify-center">
      <Card className="w-full max-w-md p-6">
        <h1 className="mb-4 text-2xl font-semibold">Dashboard Login</h1>
        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        {error ? <p className="mt-2 text-sm text-red-400">{error}</p> : null}
        <Button
          className="mt-4 w-full"
          onClick={async () => {
            const res = await fetch("/api/auth/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password }) });
            if (!res.ok) return setError("Hatalı şifre");
            router.push("/dashboard");
            router.refresh();
          }}
        >
          Login
        </Button>
      </Card>
    </div>
  );
}
