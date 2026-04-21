import { Link, Outlet } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinkClass =
  "rounded-md px-3 py-2 text-sm font-medium transition-colors";

export function AppShell() {
  const { i18n, t } = useTranslation();
  const activeLanguage = i18n.resolvedLanguage?.startsWith("fi") ? "fi" : "en";

  return (
    <div className="min-h-screen bg-muted/40">
      <header className="border-b bg-background">
        <div className="container flex h-16 items-center justify-between">
          <div className="shrink-0 flex items-center gap-2 text-sm font-semibold">
            <Sparkles className="h-4 w-4 text-primary" />
            {t("appName")}
          </div>
          <div className="flex items-center gap-2">
            <nav className="flex items-center gap-2">
              <Link
                to="/"
                className={cn(
                  navLinkClass,
                  "text-muted-foreground hover:text-foreground",
                )}
                activeProps={{
                  className: cn(navLinkClass, "bg-secondary text-foreground"),
                }}
              >
                {t("nav.home")}
              </Link>
              <Link
                to="/about"
                className={cn(
                  navLinkClass,
                  "text-muted-foreground hover:text-foreground",
                )}
                activeProps={{
                  className: cn(navLinkClass, "bg-secondary text-foreground"),
                }}
              >
                {t("nav.about")}
              </Link>
            </nav>
            <div className="hidden items-center gap-1 sm:flex">
              <span className="mr-1 text-xs text-muted-foreground">
                {t("language.label")}
              </span>
              <Button
                size="sm"
                variant={activeLanguage === "en" ? "secondary" : "outline"}
                onClick={() => {
                  void i18n.changeLanguage("en");
                }}
              >
                {t("language.en")}
              </Button>
              <Button
                size="sm"
                variant={activeLanguage === "fi" ? "secondary" : "outline"}
                onClick={() => {
                  void i18n.changeLanguage("fi");
                }}
              >
                {t("language.fi")}
              </Button>
            </div>
          </div>
        </div>
      </header>
      <main className="container py-10">
        <Outlet />
      </main>
    </div>
  );
}
