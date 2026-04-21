import type { CSSProperties, ReactNode } from "react";

import { cn } from "@/lib/utils";

type BadgeColor = "accent" | "green" | "red" | "blue" | "gray" | "yellow";

interface BadgeProps {
  children: ReactNode;
  color?: BadgeColor;
  className?: string;
  style?: CSSProperties;
}

export function Badge({
  children,
  color = "accent",
  className,
  style,
}: BadgeProps) {
  return (
    <span
      className={cn("badge", color !== "accent" && color, className)}
      style={style}
    >
      {children}
    </span>
  );
}
