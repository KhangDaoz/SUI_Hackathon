import type { HTMLAttributes } from "react";
import { cn } from "../../lib/utils";

interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "outline" | "green" | "sui";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors",
        {
          "bg-primary text-primary-foreground": variant === "default",
          "bg-secondary text-secondary-foreground": variant === "secondary",
          "border border-border text-foreground": variant === "outline",
          "bg-green/20 text-green border border-green/30": variant === "green",
          "bg-sui/20 text-sui border border-sui/30": variant === "sui",
        },
        className,
      )}
      {...props}
    />
  );
}

export { Badge };
