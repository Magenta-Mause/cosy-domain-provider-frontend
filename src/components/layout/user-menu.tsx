import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

type UserMenuProps = {
  userName?: string | null;
  isLoggingOut: boolean;
  onLogout: () => Promise<void>;
};

export function UserMenu({ userName, isLoggingOut, onLogout }: UserMenuProps) {
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const initial = userName?.[0]?.toUpperCase() ?? "?";

  useEffect(() => {
    if (!menuOpen) return;

    const onPointerDown = (event: MouseEvent) => {
      const target = event.target as Node;
      if (!menuRef.current?.contains(target)) {
        setMenuOpen(false);
      }
    };

    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    window.addEventListener("mousedown", onPointerDown);
    window.addEventListener("keydown", onEscape);

    return () => {
      window.removeEventListener("mousedown", onPointerDown);
      window.removeEventListener("keydown", onEscape);
    };
  }, [menuOpen]);

  return (
    <div ref={menuRef} className="relative">
      <button
        type="button"
        data-testid="user-menu-toggle-btn"
        className="pbtn sm secondary gap-2"
        disabled={isLoggingOut}
        onClick={() => setMenuOpen((open) => !open)}
        title={t("nav.userMenu")}
      >
        <span
          className="inline-flex items-center justify-center w-[22px] h-[22px] text-xs"
          style={{
            borderRadius: 2,
            background: "var(--accent)",
            border: "2px solid var(--foreground)",
            color: "var(--btn-primary)",
            fontFamily: "'Press Start 2P', monospace",
          }}
        >
          {initial}
        </span>
        {userName ?? t("nav.userMenu")}
      </button>
      {menuOpen ? (
        <div
          role="menu"
          aria-label={t("nav.userMenu")}
          className="absolute grid gap-1.5 p-2 z-30"
          style={{
            top: "calc(100% + 8px)",
            right: 0,
            minWidth: 220,
            background: "var(--btn-secondary)",
            border: "2px solid var(--foreground)",
            borderRadius: "var(--radius-sm)",
            boxShadow: "4px 4px 0 0 var(--foreground)",
          }}
        >
          <button
            type="button"
            data-testid="user-menu-change-username-btn"
            className="pbtn sm ghost justify-start"
            title={t("nav.notImplemented")}
            onClick={() => setMenuOpen(false)}
            disabled
          >
            {t("nav.changeUsername")}
          </button>
          <button
            type="button"
            data-testid="user-menu-change-password-btn"
            className="pbtn sm ghost justify-start opacity-50 cursor-not-allowed"
            title={t("nav.notImplemented")}
            disabled
          >
            {t("nav.changePassword")}
          </button>
          <button
            type="button"
            data-testid="user-menu-logout-btn"
            className="pbtn sm ghost justify-start"
            disabled={isLoggingOut}
            onClick={async () => {
              try {
                await onLogout();
              } finally {
                setMenuOpen(false);
              }
            }}
          >
            {t("nav.logout")}
          </button>
          <button
            type="button"
            data-testid="user-menu-delete-user-btn"
            className="pbtn sm ghost justify-start"
            style={{ color: "var(--destructive)" }}
            title={t("nav.notImplemented")}
            onClick={() => setMenuOpen(false)}
            disabled
          >
            {t("nav.deleteUser")}
          </button>
        </div>
      ) : null}
    </div>
  );
}
