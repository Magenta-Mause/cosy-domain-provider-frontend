import axios from "axios";
import { useEffect, useState } from "react";

const stagingAxios = axios.create({ baseURL: "/", withCredentials: true });

export function useStagingAuthProviderLogic() {
  const [authenticated, setAuthenticated] = useState(false);
  const [checking, setChecking] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    stagingAxios
      .get("/api/v1/staging-auth")
      .then(() => setAuthenticated(true))
      .catch(() => setAuthenticated(false))
      .finally(() => setChecking(false));
  }, []);

  async function login() {
    setSubmitting(true);
    setError(null);
    try {
      const token = btoa(`${username}:${password}`);
      await stagingAxios.post(
        "/api/v1/staging-auth",
        {},
        { headers: { Authorization: `Basic ${token}` } },
      );
      setAuthenticated(true);
    } catch {
      setError("error");
    } finally {
      setSubmitting(false);
    }
  }

  return {
    authenticated,
    checking,
    username,
    setUsername,
    password,
    setPassword,
    error,
    submitting,
    login,
  };
}
