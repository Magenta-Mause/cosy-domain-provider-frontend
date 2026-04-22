import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { AuthPageLayout } from "@/components/auth/auth-page-layout.tsx";
import { PasswordInput } from "@/components/auth/password-input.tsx";
import { ErrorMessage } from "@/components/pixel/error-message.tsx";
import { Button } from "@/components/ui/button.tsx";
import useDataInteractions from "@/hooks/useDataInteractions/useDataInteractions.ts";
import { Route } from "@/routes/reset-password.tsx";

const ResetPasswordPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { token } = Route.useSearch();
  const { confirmPasswordReset } = useDataInteractions();
  const [newPassword, setNewPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!token) {
    return (
      <AuthPageLayout backButtonLink="/login">
        <div className="flex flex-col gap-6">
          <h3>{t("resetPassword.title")}</h3>
          <ErrorMessage>{t("resetPassword.invalidToken")}</ErrorMessage>
          <Link to="/forgot-password" className="pbtn ghost text-center">
            {t("resetPassword.requestNew")}
          </Link>
        </div>
      </AuthPageLayout>
    );
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    try {
      await confirmPasswordReset(token, newPassword);
      setSuccess(true);
      setTimeout(() => void navigate({ to: "/login" }), 2000);
    } catch {
      setError(t("resetPassword.error"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthPageLayout backButtonLink="/login">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h3>{t("resetPassword.title")}</h3>
          <p className="text-base opacity-70">
            {t("resetPassword.description")}
          </p>
        </div>

        {success ? (
          <div className="flex flex-col gap-4">
            <p className="text-base">{t("resetPassword.success")}</p>
            <Link to="/login" className="pbtn ghost text-center">
              {t("resetPassword.backToLogin")}
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className="plabel" htmlFor="new-password">
                {t("resetPassword.newPassword")}
              </label>
              <PasswordInput
                id="new-password"
                autoComplete="new-password"
                required
                minLength={8}
                value={newPassword}
                onChange={setNewPassword}
                showPw={showPw}
                onToggleShow={() => setShowPw(!showPw)}
                testId="reset-password-input"
              />
            </div>
            {error ? <ErrorMessage>{error}</ErrorMessage> : null}
            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={newPassword.length < 8 || isSubmitting}
              data-testid="reset-password-submit-btn"
            >
              {isSubmitting
                ? t("resetPassword.submitting")
                : t("resetPassword.submit")}
            </Button>
            <p className="text-base text-center opacity-70">
              <Link to="/login" data-testid="reset-password-back-link">
                {t("resetPassword.backToLogin")}
              </Link>
            </p>
          </form>
        )}
      </div>
    </AuthPageLayout>
  );
};

export default ResetPasswordPage;
