import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cn("h-10 w-full rounded-lg border border-border bg-zinc-950/70 px-3 text-sm text-white outline-none ring-offset-background placeholder:text-zinc-400 focus:ring-2 focus:ring-zinc-600", className)}
    {...props}
  />
));
Input.displayName = "Input";
