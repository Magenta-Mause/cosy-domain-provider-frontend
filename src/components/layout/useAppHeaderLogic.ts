import { useState } from "react";
import { useTranslation } from "react-i18next";

import useAuthInformation from "@/hooks/useAuthInformation/useAuthInformation";
import { useLanguageChange } from "@/hooks/useLanguageChange/useLanguageChange";
import { router } from "@/router";

export function useAppHeaderLogic() {
  const { t } = useTranslation();
  const { logoutUser, deleteUser, userName, isUserLoggedIn, userTier } =
    useAuthInformation();
  const { handleLanguageChange } = useLanguageChange();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logoutUser();
      await router.navigate({ to: "/login" });
    } finally {
      setIsLoggingOut(false);
    }
  };

  const handleDelete = async () => {
    if (confirm(t("nav.userDeletionConfirm"))) {
      await deleteUser();
      await router.navigate({ to: "/login" });
    }
  };

  return {
    userName,
    isUserLoggedIn,
    userTier,
    isLoggingOut,
    handleLanguageChange,
    handleLogout,
    handleDelete,
  };
}
