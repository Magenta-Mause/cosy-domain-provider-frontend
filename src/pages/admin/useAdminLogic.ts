import { useCallback, useEffect, useState } from "react";
import { ADMIN_KEY_STORAGE } from "./lib";

export function useAdminLogic() {
  const [key, setKey] = useState<string>(
    () => sessionStorage.getItem(ADMIN_KEY_STORAGE) ?? "",
  );
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginError, setLoginError] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(ADMIN_KEY_STORAGE)) setIsAuthenticated(true);
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
  }, []);

  return { key, isAuthenticated, loginError, login, logout };
}
