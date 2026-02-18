import * as React from "react";
import { cn } from "@/lib/utils";

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn("w-full rounded-lg border border-border bg-zinc-950/70 px-3 py-2 text-sm text-white outline-none placeholder:text-zinc-400 focus:ring-2 focus:ring-zinc-600", className)}
    {...props}
  />
));
Textarea.displayName = "Textarea";
