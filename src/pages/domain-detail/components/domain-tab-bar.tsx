type TabKey = "overview" | "dns" | "danger";

interface DomainTabBarProps {
  activeTab: TabKey;
  onChange: (tab: TabKey) => void;
}

const TABS: Array<[TabKey, string]> = [
  ["overview", "Overview"],
  ["dns", "DNS records"],
  ["danger", "Danger zone"],
];

export function DomainTabBar({ activeTab, onChange }: DomainTabBarProps) {
  return (
    <div style={{ display: "flex", gap: 8, marginBottom: 0 }}>
      {TABS.map(([k, l]) => (
        <button
          key={k}
          type="button"
          data-testid={`domain-detail-tab-${k}-btn`}
          className="pixel"
          onClick={() => onChange(k)}
          style={{
            padding: "10px 16px",
            fontSize: 11,
            background:
              activeTab === k ? "var(--secondary-background)" : "transparent",
            border: "3px solid var(--foreground)",
            borderBottom:
              activeTab === k
                ? "3px solid var(--secondary-background)"
                : "3px solid var(--foreground)",
            borderTopLeftRadius: "var(--radius-sm)",
            borderTopRightRadius: "var(--radius-sm)",
            color: activeTab === k ? "var(--btn-primary)" : "var(--foreground)",
            marginBottom: -3,
            position: "relative",
            zIndex: activeTab === k ? 2 : 1,
            cursor: "pointer",
          }}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
