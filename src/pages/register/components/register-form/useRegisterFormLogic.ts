import { useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import useDataInteractions from "@/hooks/useDataInteractions/useDataInteractions";
import { isValidEmail } from "@/lib/validators";
import { useAppSelector } from "@/store/hooks";

export function useRegisterFormLogic() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { registerUser } = useDataInteractions();
  const authState = useAppSelector((state) => state.auth.state);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const usernameValid =
    username.trim().length >= 3 && username.trim().length <= 20;
  const emailValid = useMemo(() => isValidEmail(email), [email]);
  const passwordValid = password.length >= 8;
  const passwordWeak = password.length > 0 && password.length < 8;
  const confirmValid = password === confirmPassword;
  const submitting = authState === "loading";
  const canSubmit =
    usernameValid &&
    emailValid &&
    passwordValid &&
    confirmValid &&
    agreed &&
    !submitting;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage(null);
    if (!canSubmit) return;
    try {
      await registerUser({
        username: username.trim(),
        email: email.trim(),
        password,
      });
      await navigate({ to: "/dashboard" });
    } catch {
      setErrorMessage(t("register.error"));
    }
  }

  return {
    username,
    setUsername,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    showPw,
    setShowPw,
    agreed,
    setAgreed,
    errorMessage,
    passwordWeak,
    confirmValid,
    canSubmit,
    submitting,
    handleSubmit,
  };
}
