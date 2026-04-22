import { Link } from "@tanstack/react-router";

import { Panel } from "@/components/pixel/panel";
import { Scenery } from "@/components/pixel/scenery";

interface AuthPageLayoutProps {
  children: React.ReactNode;
  maxWidth?: number;
  backButtonLink?: string;
}

export function AuthPageLayout({
  children,
  backButtonLink = "/",
  maxWidth = 420,
}: AuthPageLayoutProps) {
  return (
    <Scenery>
      <Link
        to={backButtonLink}
        data-testid="auth-back-link"
        className="pbtn ghost absolute top-6 left-7 z-[5]"
        style={{ color: "oklch(0.95 0.08 70)" }}
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
