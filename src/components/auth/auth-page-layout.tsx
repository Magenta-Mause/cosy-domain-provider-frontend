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
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px 20px",
        }}
      >
        <Panel withRibbon style={{ padding: 32, width: "100%", maxWidth }}>
          {children}
        </Panel>
      </div>
    </Scenery>
  );
}
