import type { CSSProperties, ReactNode } from "react";

import { cn } from "@/lib/utils";

type BadgeColor = "accent" | "green" | "red" | "blue" | "gray" | "yellow";

interface BadgeProps {
  children: ReactNode;
  color?: BadgeColor;
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
}

export function Badge({
  children,
  color = "accent",
  className,
  onClick,
  style,
}: BadgeProps) {
  if (onClick !== undefined) {
    return (
      <button
        className={cn("badge", color !== "accent" && color, className)}
        onClick={onClick}
        type={"button"}
      >
        {children}
      </button>
    );
  }

  return (
    <span
      className={cn("badge", color !== "accent" && color, className)}
      style={style}
    >
      {children}
    </span>
  );
}
