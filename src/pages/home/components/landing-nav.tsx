import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import cosyIcon from "@/assets/cosy-logo.webp";
import useAuthInformation from "@/hooks/useAuthInformation/useAuthInformation";

export function LandingNav() {
  const { t } = useTranslation();
  const { isUserLoggedIn } = useAuthInformation();

  return (
    <header
      style={{
        padding: "20px 32px",
        display: "flex",
        alignItems: "center",
        gap: 16,
        position: "relative",
        zIndex: 3,
      }}
    >
      <Link
        to="/dashboard"
        data-testid="home-logo-link"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          textDecoration: "none",
        }}
      >
        <img src={cosyIcon} alt="Cosy" className="h-12" />
        <div style={{ textAlign: "left", paddingTop: "3px" }}>
          <div
            className="pixel"
            style={{ fontSize: 16, color: "oklch(0.95 0.05 70)" }}
          >
            COSY
          </div>
          <div
            style={{
              fontSize: 14,
              marginTop: 2,
              color: "oklch(0.92 0.04 60)",
              opacity: 0.85,
            }}
          >
            Domain Provider
          </div>
        </div>
      </Link>

      <div style={{ flex: 1 }} />

      <nav style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <a
          href="#features"
          data-testid="home-features-link"
          style={{ color: "oklch(0.95 0.05 70)", fontSize: 18 }}
        >
          {t("landingNav.features")}
        </a>
        <a
          href="#pricing"
          data-testid="home-pricing-link"
          style={{ color: "oklch(0.95 0.05 70)", fontSize: 18, marginLeft: 12 }}
        >
          {t("landingNav.pricing")}
        </a>
      </nav>

      {isUserLoggedIn ? (
        <Link
          to="/dashboard"
          data-testid="home-dashboard-link"
          className="pbtn sm"
        >
          {t("landingNav.myDashboard")}
        </Link>
      ) : (
        <>
          <Link
            to="/login"
            data-testid="home-login-link"
            className="pbtn sm secondary"
          >
            {t("nav.login")}
          </Link>
          <Link
            to="/register"
            data-testid="home-signup-link"
            className="pbtn sm"
          >
            {t("landingNav.signUp")}
          </Link>
        </>
      )}
    </header>
  );
}
