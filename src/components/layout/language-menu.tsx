import { Languages } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import type { AppLanguage } from "@/i18n/resources";

type LanguageMenuProps = {
  onChangeLanguage: (language: AppLanguage) => Promise<void> | void;
};

export function LanguageMenu({ onChangeLanguage }: LanguageMenuProps) {
  const { t, i18n } = useTranslation();
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const languageMenuRef = useRef<HTMLDivElement | null>(null);

  const languageCode = i18n.language.toLowerCase().startsWith("de")
    ? "DE"
    : "EN";

  useEffect(() => {
    if (!languageMenuOpen) return;

    const onPointerDown = (event: MouseEvent) => {
      const target = event.target as Node;
      if (!languageMenuRef.current?.contains(target)) {
        setLanguageMenuOpen(false);
      }
    };

    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setLanguageMenuOpen(false);
      }
    };

    window.addEventListener("mousedown", onPointerDown);
    window.addEventListener("keydown", onEscape);

    return () => {
      window.removeEventListener("mousedown", onPointerDown);
      window.removeEventListener("keydown", onEscape);
    };
  }, [languageMenuOpen]);

  async function handleLanguageChange(language: AppLanguage) {
    await onChangeLanguage(language);
    setLanguageMenuOpen(false);
  }

  return (
    <div ref={languageMenuRef} className="relative">
      <button
        type="button"
        data-testid="language-menu-toggle-btn"
        className="pbtn sm gap-1.5"
        onClick={() => setLanguageMenuOpen((open) => !open)}
        title={t("language.label")}
      >
        <Languages size={14} />
        {languageCode}
      </button>
      {languageMenuOpen ? (
        <div
          role="menu"
          aria-label={t("language.label")}
          className="absolute grid gap-1.5 p-2 z-[35]"
          style={{
            top: "calc(100% + 8px)",
            right: 0,
            minWidth: 180,
            background: "var(--btn-secondary)",
            border: "2px solid var(--foreground)",
            borderRadius: "var(--radius-sm)",
            boxShadow: "4px 4px 0 0 var(--foreground)",
          }}
        >
          <button
            type="button"
            data-testid="language-menu-en-btn"
            className="pbtn sm ghost justify-start"
            onClick={() => {
              void handleLanguageChange("en");
            }}
          >
            {t("language.en")}
          </button>
          <button
            type="button"
            data-testid="language-menu-de-btn"
            className="pbtn sm ghost justify-start"
            onClick={() => {
              void handleLanguageChange("de");
            }}
          >
            {t("language.de")}
          </button>
        </div>
      ) : null}
    </div>
  );
}
