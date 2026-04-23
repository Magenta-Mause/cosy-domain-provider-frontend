import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import { LanguageMenu } from "@/components/layout/language-menu";
import { Panel } from "@/components/pixel/panel";
import { Scenery } from "@/components/pixel/scenery";
import type { AppLanguage } from "@/i18n/resources";

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
  const { i18n } = useTranslation();

  async function handleLanguageChange(language: AppLanguage) {
    await i18n.changeLanguage(language);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("cosy-language", language);
    }
  }

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
      <div className="absolute top-6 right-7 z-[5]">
        <LanguageMenu onChangeLanguage={handleLanguageChange} />
      </div>
      <div className="min-h-screen flex items-center justify-center px-5 py-[60px]">
        <Panel className="p-8 w-full" style={{ maxWidth }}>
          {children}
        </Panel>
      </div>
    </Scenery>
  );
}
