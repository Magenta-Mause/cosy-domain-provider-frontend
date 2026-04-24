import { useCallback, useEffect, useState } from "react";
import { ADMIN_KEY_STORAGE, type AdminUserDetail } from "./lib";

export type AdminView = "dashboard" | "user-detail";

export function useAdminLogic() {
  const [key, setKey] = useState<string>(
    () => sessionStorage.getItem(ADMIN_KEY_STORAGE) ?? "",
  );
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [activeTab, setActiveTab] = useState<"subdomains" | "users">(
    "subdomains",
  );
  const [view, setView] = useState<AdminView>("dashboard");
  const [selectedUserDetail, setSelectedUserDetail] =
    useState<AdminUserDetail | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem(ADMIN_KEY_STORAGE);
    if (stored) setIsAuthenticated(true);
  }, []);

  const login = useCallback(async (inputKey: string) => {
    try {
      const res = await fetch("/api/v1/admin/users", {
        headers: { "X-Admin-Key": inputKey },
      });
      if (res.status === 401) {
        setLoginError(true);
        return;
      }
      sessionStorage.setItem(ADMIN_KEY_STORAGE, inputKey);
      setKey(inputKey);
      setIsAuthenticated(true);
      setLoginError(false);
    } catch {
      setLoginError(true);
    }
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem(ADMIN_KEY_STORAGE);
    setKey("");
    setIsAuthenticated(false);
    setView("dashboard");
    setSelectedUserDetail(null);
  }, []);

  const openUserDetail = useCallback((detail: AdminUserDetail) => {
    setSelectedUserDetail(detail);
    setView("user-detail");
  }, []);

  const backToDashboard = useCallback(() => {
    setView("dashboard");
    setSelectedUserDetail(null);
  }, []);

  return {
    key,
    isAuthenticated,
    loginError,
    login,
    logout,
    activeTab,
    setActiveTab,
    view,
    selectedUserDetail,
    setSelectedUserDetail,
    openUserDetail,
    backToDashboard,
  };
}
