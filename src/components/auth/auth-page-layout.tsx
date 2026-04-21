import { Link } from "@tanstack/react-router";

import { Panel } from "@/components/pixel/panel";
import { Scenery } from "@/components/pixel/scenery";

interface AuthPageLayoutProps {
  children: React.ReactNode;
  maxWidth?: number;
}

export function AuthPageLayout({
  children,
  maxWidth = 420,
}: AuthPageLayoutProps) {
  return (
    <Scenery>
      <Link
        to="/"
        data-testid="auth-back-link"
        className="absolute top-6 left-7 text-base no-underline z-[5]"
        style={{
          color: "oklch(0.95 0.08 70)",
          border: "black thin solid",
        }}
      >
        ← Back
      </Link>
      <div className="min-h-screen flex items-center justify-center px-5 py-[60px]">
        <Panel className="p-8 w-full" style={{ maxWidth }}>
          {children}
        </Panel>
      </div>
    </Scenery>
  );
}
