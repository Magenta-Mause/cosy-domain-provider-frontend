import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import { UserMenuDropdown } from "./UserMenuDropdown";
import { useUserMenuLogic } from "./useUserMenuLogic";

type UserMenuProps = {
  userName?: string | null;
  isLoggingOut: boolean;
  onLogout: () => Promise<void>;
};

export function UserMenu({ userName, isLoggingOut, onLogout }: UserMenuProps) {
  const { t } = useTranslation();
  const { menuOpen, setMenuOpen, menuRef, initial } =
    useUserMenuLogic(userName);

  return (
    <div ref={menuRef} className="relative">
      <Button
        type="button"
        data-testid="user-menu-toggle-btn"
        variant="secondary"
        size="sm"
        className="gap-2"
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
      </Button>
      {menuOpen ? (
        <UserMenuDropdown
          isLoggingOut={isLoggingOut}
          onClose={() => setMenuOpen(false)}
          onLogout={onLogout}
        />
      ) : null}
    </div>
  );
}
