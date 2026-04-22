import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { AuthPageLayout } from "@/components/auth/auth-page-layout.tsx";
import { ErrorMessage } from "@/components/pixel/error-message.tsx";
import { Button } from "@/components/ui/button.tsx";
import useDataInteractions from "@/hooks/useDataInteractions/useDataInteractions.ts";

const ForgotPasswordPage = () => {
  const { t } = useTranslation();
  const { requestPasswordReset } = useDataInteractions();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    try {
      await requestPasswordReset(email);
      setSuccess(true);
    } catch {
      setError(t("forgotPassword.error"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthPageLayout backButtonLink="/login">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h3>{t("forgotPassword.title")}</h3>
          <p className="text-base opacity-70">
            {t("forgotPassword.description")}
          </p>
        </div>

        {success ? (
          <div className="flex flex-col gap-4">
            <p className="text-base">{t("forgotPassword.success")}</p>
            <Link to="/login" className="pbtn ghost text-center">
              {t("forgotPassword.backToLogin")}
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className="plabel" htmlFor="email">
                {t("forgotPassword.email")}
              </label>
              <input
                id="email"
                data-testid="forgot-password-email-input"
                className="pinput"
                type="email"
                autoComplete="email"
                required
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {error ? <ErrorMessage>{error}</ErrorMessage> : null}
            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={!email || isSubmitting}
              data-testid="forgot-password-submit-btn"
            >
              {isSubmitting
                ? t("forgotPassword.submitting")
                : t("forgotPassword.submit")}
            </Button>
            <p className="text-base text-center opacity-70">
              <Link to="/login" data-testid="forgot-password-back-link">
                {t("forgotPassword.backToLogin")}
              </Link>
            </p>
          </form>
        )}
      </div>
    </AuthPageLayout>
  );
};

export default ForgotPasswordPage;
