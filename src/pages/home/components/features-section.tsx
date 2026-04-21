import { useTranslation } from "react-i18next";

import { FlatPanel } from "@/components/pixel/panel";

function GrassSection({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        background:
          "linear-gradient(180deg, oklch(0.55 0.14 145) 0%, oklch(0.5 0.14 150) 100%)",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "repeating-linear-gradient(90deg, rgba(0,0,0,0.04) 0 2px, transparent 2px 6px)",
          pointerEvents: "none",
        }}
      />
      {children}
    </div>
  );
}

export function FeaturesSection() {
  const { t } = useTranslation();

  const stops = [
    {
      label: "STOP 01",
      title: t("features.stop1Title"),
      body: t("features.stop1Body"),
    },
    {
      label: "STOP 02",
      title: t("features.stop2Title"),
      body: t("features.stop2Body"),
    },
    {
      label: "STOP 03",
      title: t("features.stop3Title"),
      body: t("features.stop3Body"),
    },
  ];

  return (
    <GrassSection>
      <section
        id="features"
        style={{ padding: "48px 32px 80px", position: "relative", zIndex: 1 }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div
            style={{
              marginBottom: 32,
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            <h2 style={{ color: "oklch(0.95 0.08 70)" }}>
              {t("features.title")}
            </h2>
            <p style={{ color: "oklch(0.95 0.04 60)", fontSize: 20 }}>
              {t("features.subtitle")}
            </p>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 20,
            }}
          >
            {stops.map((f) => (
              <FlatPanel
                key={f.label}
                className="hover-lift"
                style={{ padding: 20 }}
              >
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 8 }}
                >
                  <div
                    className="pixel"
                    style={{ fontSize: 14, color: "var(--btn-primary)" }}
                  >
                    {f.label}
                  </div>
                  <h3>{f.title}</h3>
                  <p style={{ fontSize: 18, lineHeight: 1.4 }}>{f.body}</p>
                </div>
              </FlatPanel>
            ))}
          </div>
        </div>
      </section>
    </GrassSection>
  );
}
