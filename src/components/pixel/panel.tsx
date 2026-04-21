import type { CSSProperties, ReactNode } from "react";

import { cn } from "@/lib/utils";

interface PanelProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  withRibbon?: boolean;
}

export function Panel({ children, className, style, withRibbon }: PanelProps) {
  return (
    <div className={cn("panel", className)} style={style}>
      {withRibbon ? <div className="ribbon" /> : null}
      {children}
    </div>
  );
}

export function FlatPanel({
  children,
  className,
  style,
}: Omit<PanelProps, "withRibbon">) {
  return (
    <div className={cn("panel-flat", className)} style={style}>
      {children}
    </div>
  );
}
