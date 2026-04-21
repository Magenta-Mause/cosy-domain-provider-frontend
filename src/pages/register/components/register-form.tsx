import { Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { PasswordInput } from "@/components/auth/password-input";
import { ErrorMessage } from "@/components/pixel/error-message";
import useDataInteractions from "@/hooks/useDataInteractions/useDataInteractions";
import { useAppSelector } from "@/store/hooks";

import { PasswordStrength } from "./password-strength";

function OrDivider() {
  const { t } = useTranslation();
  return (
    <div className="flex items-center gap-3 my-1">
      <div
        className="flex-1 h-[3px] opacity-40"
        style={{ background: "var(--foreground)" }}
      />
      <span className="pixel text-[10px] opacity-70">
        {t("register.orUseEmail")}
      </span>
      <div
        className="flex-1 h-[3px] opacity-40"
        style={{ background: "var(--foreground)" }}
      />
    </div>
  );
}

export function RegisterForm() {
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
  const emailValid = useMemo(
    () => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
    [email],
  );
  const passwordValid = password.length >= 8;
  const passwordWeak = password.length > 0 && password.length < 8;
  const confirmValid = password === confirmPassword;
  const canSubmit =
    usernameValid &&
    emailValid &&
    passwordValid &&
    confirmValid &&
    agreed &&
    authState !== "loading";

  const submitting = authState === "loading";

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

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h2 className="text-[22px]">{t("register.stakeTitle")}</h2>
      </div>

      <OrDivider />

      <div className="flex flex-col gap-2">
        <label className="plabel" htmlFor="username">
          {t("register.username")}
        </label>
        <input
          id="username"
          data-testid="register-username-input"
          className="pinput"
          type="text"
          autoComplete="username"
          required
          minLength={3}
          maxLength={20}
          placeholder="your-username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="plabel" htmlFor="email">
          {t("register.email")}
        </label>
        <input
          id="email"
          data-testid="register-email-input"
          className="pinput"
          type="email"
          autoComplete="email"
          required
          placeholder="janne@example.net"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="plabel" htmlFor="password">
          {t("register.password")}
        </label>
        <PasswordInput
          id="password"
          autoComplete="new-password"
          required
          minLength={8}
          value={password}
          onChange={setPassword}
          showPw={showPw}
          onToggleShow={() => setShowPw(!showPw)}
          testId="register-password-input"
          toggleTestId="register-toggle-password-btn"
        />
        <PasswordStrength password={password} />
        {passwordWeak ? (
          <ErrorMessage>{t("register.passwordTooShort")}</ErrorMessage>
        ) : null}
      </div>

      <div className="flex flex-col gap-2">
        <label className="plabel" htmlFor="confirmPassword">
          {t("register.confirmPassword")}
        </label>
        <PasswordInput
          id="confirmPassword"
          autoComplete="new-password"
          required
          value={confirmPassword}
          onChange={setConfirmPassword}
          showPw={showPw}
          onToggleShow={() => setShowPw(!showPw)}
          testId="register-confirm-password-input"
        />
        {!confirmValid && confirmPassword.length > 0 ? (
          <ErrorMessage>{t("register.passwordMismatch")}</ErrorMessage>
        ) : null}
      </div>

      <label className="flex items-center gap-2.5 text-base cursor-pointer">
        <input
          type="checkbox"
          data-testid="register-terms-checkbox"
          className={agreed ? "pcheck checked" : "pcheck"}
          checked={agreed}
          onChange={() => setAgreed(!agreed)}
        />
        {t("register.termsPrefix")}{" "}
        <button
          type="button"
          className="bg-transparent border-none p-0 cursor-pointer underline"
          style={{ color: "inherit", fontSize: "inherit" }}
        >
          {t("register.termsLink")}
        </button>{" "}
        &{" "}
        <button
          type="button"
          className="bg-transparent border-none p-0 cursor-pointer underline"
          style={{ color: "inherit", fontSize: "inherit" }}
        >
          {t("register.privacyPolicyLink")}
        </button>
      </label>

      {errorMessage ? <ErrorMessage>{errorMessage}</ErrorMessage> : null}

      <button
        type="submit"
        data-testid="register-submit-btn"
        className="pbtn lg w-full"
        disabled={!canSubmit}
      >
        {submitting ? t("register.submitting") : t("register.submitButton")}
      </button>
      <p className="text-lg text-center">
        {t("register.alreadyMovedIn")}{" "}
        <Link to="/login" data-testid="register-login-link">
          {t("register.loginLink")}
        </Link>
      </p>
    </form>
  );
}
