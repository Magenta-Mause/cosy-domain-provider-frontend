import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { FlatPanel } from "@/components/pixel/panel";

export function HeroSection() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [subdomain, setSubdomain] = useState("");

  return (
    <section
      style={{
        padding: "60px 32px 40px",
        maxWidth: 1200,
        margin: "0 auto",
        position: "relative",
        zIndex: 2,
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.1fr 1fr",
          gap: 48,
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            className="signpost"
            style={{
              alignSelf: "flex-start",
              fontSize: 12,
              padding: "8px 14px",
            }}
          >
            {t("hero.badge")}
          </div>
          <h1
            style={{
              fontSize: 48,
              color: "oklch(0.95 0.08 70)",
              lineHeight: 1.3,
              textShadow: "3px 3px 0 oklch(0.25 0.08 30)",
            }}
          >
            {t("hero.titleLine1")}
            <br />
            {t("hero.titleLine2")}
          </h1>
          <p
            style={{
              fontSize: 22,
              color: "oklch(0.92 0.04 60)",
              maxWidth: 480,
              lineHeight: 1.4,
            }}
          >
            {t("hero.description")}
          </p>

          <FlatPanel style={{ padding: 16, maxWidth: 520 }}>
            <label
              htmlFor="subdomain-input"
              className="plabel"
              style={{ marginBottom: 10 }}
            >
              {t("hero.claimLabel")}
            </label>
            <div style={{ display: "flex", gap: 8, alignItems: "stretch" }}>
              <div style={{ position: "relative", flex: 1 }}>
                <input
                  id="subdomain-input"
                  data-testid="home-subdomain-input"
                  className="pinput"
                  value={subdomain}
                  onChange={(e) =>
                    setSubdomain(
                      e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""),
                    )
                  }
                  placeholder="my-castle"
                  style={{ paddingRight: 170 }}
                />
                <span
                  style={{
                    position: "absolute",
                    right: 14,
                    top: "50%",
                    transform: "translateY(-50%)",
                    fontSize: 18,
                    opacity: 0.7,
                    pointerEvents: "none",
                  }}
                >
                  .cosy-hosting.net
                </span>
              </div>
              <button
                type="button"
                data-testid="home-check-btn"
                className="pbtn"
                onClick={() => void navigate({ to: "/register" })}
              >
                {t("hero.checkButton")}
              </button>
            </div>
          </FlatPanel>

          <div
            style={{
              display: "flex",
              gap: 24,
              flexWrap: "wrap",
              color: "oklch(0.92 0.04 60)",
              fontSize: 18,
            }}
          >
            <span>{t("hero.benefit1")}</span>
            <span>{t("hero.benefit2")}</span>
            <span>{t("hero.benefit3")}</span>
          </div>
        </div>

        <div style={{ position: "relative", height: 440 }}>
          <FlatPanel
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "oklch(0.75 0.08 58)",
            }}
          >
            <div
              style={{
                width: "88%",
                height: "88%",
                background:
                  "repeating-linear-gradient(45deg, oklch(0.75 0.08 58) 0 8px, oklch(0.8 0.06 58) 8px 16px)",
                border: "3px dashed var(--foreground)",
                borderRadius: "var(--radius-sm)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                color: "var(--foreground)",
                padding: 12,
                textAlign: "center",
              }}
            >
              <div className="pixel" style={{ fontSize: 12 }}>
                [ hero pixel art ]
              </div>
              <div style={{ fontSize: 18, opacity: 0.8 }}>
                A cosy pixel-art post office with
                <br />
                mailboxes labeled with subdomains.
                <br />
                Cat on the roof is recommended.
              </div>
            </div>
          </FlatPanel>
        </div>
      </div>
    </section>
  );
}
