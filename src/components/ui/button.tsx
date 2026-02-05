import type { ButtonHTMLAttributes } from "react";
import { cn } from "../../lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "outline" | "ghost" | "destructive" | "green";
  size?: "default" | "sm" | "lg" | "icon";
}

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
        {
          "bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-lg":
            variant === "default",
          "bg-secondary text-secondary-foreground hover:bg-secondary/80":
            variant === "secondary",
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground":
            variant === "outline",
          "hover:bg-accent hover:text-accent-foreground": variant === "ghost",
          "bg-destructive text-destructive-foreground hover:bg-destructive/90":
            variant === "destructive",
          "bg-green text-primary-foreground hover:bg-green-dark shadow-md hover:shadow-lg":
            variant === "green",
        },
        {
          "h-10 px-4 py-2": size === "default",
          "h-9 px-3 text-sm": size === "sm",
          "h-12 px-6 text-lg": size === "lg",
          "h-10 w-10": size === "icon",
        },
        className,
      )}
      {...props}
    />
  );
}

export { Button };
