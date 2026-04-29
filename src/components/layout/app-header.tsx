import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";

import { CosyLogo } from "@/components/layout/cosy-logo";
import { LanguageMenu } from "@/components/layout/language-menu";
import { UserMenu } from "@/components/layout/user-menu";
import TierBadge from "@/components/pixel/tier-badge.tsx";
import useAuthInformation from "@/hooks/useAuthInformation/useAuthInformation.ts";
import { useAppHeaderLogic } from "./useAppHeaderLogic";

interface AppHeaderProps {
  rightSlot?: ReactNode;
}

export function AppHeader({ rightSlot }: AppHeaderProps = {}) {
  const { t } = useTranslation();
  const {
    userName,
    isUserLoggedIn,
    isLoggingOut,
    handleLogout,
    handleDelete,
  } = useAppHeaderLogic();

  const { userTier } = useAuthInformation();

  return (
    <header className="px-7 py-4 flex items-center gap-4 relative z-[5]">
      <CosyLogo
        linkTo={isUserLoggedIn ? "/dashboard" : "/"}
        testId="header-logo-link"
      />
      <div className="flex-1" />

      {!rightSlot && <TierBadge tier={userTier ?? "FREE"} />}

      <LanguageMenu />
      {rightSlot ?? (
        isUserLoggedIn ? (
          <UserMenu
            userName={userName}
            isLoggingOut={isLoggingOut}
            onLogout={handleLogout}
            onDelete={handleDelete}
          />
        ) : (
          <Link
            to="/login"
            data-testid="header-login-link"
            className="pbtn sm secondary"
          >
            {t("nav.login")}
          </Link>
        )
      )}
    </header>
  );
}
