import { useTranslation } from "react-i18next";

import { PasswordInput } from "@/components/auth/password-input";
import { ErrorMessage } from "@/components/pixel/error-message";
import { Button } from "@/components/ui/button";

interface SetPasswordViewProps {
  password: string;
  confirmPassword: string;
  passwordError: string | null;
  isSettingPassword: boolean;
  onPasswordChange: (value: string) => void;
  onConfirmChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function SetPasswordView({
  password,
  confirmPassword,
  passwordError,
  isSettingPassword,
  onPasswordChange,
  onConfirmChange,
  onSubmit,
}: SetPasswordViewProps) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-5">
        <h3>{t("passwordSetup.title")}</h3>
        <div>{t("passwordSetup.descriptionOauth")}</div>
      </div>
      <form onSubmit={onSubmit} className="flex flex-col gap-3">
        <div className="flex flex-col gap-2">
          <label className="plabel" htmlFor="verify-password">
            {t("passwordSetup.password")}
          </label>
          <PasswordInput
            id="verify-password"
            autoComplete="new-password"
            required
            minLength={8}
            value={password}
            onChange={onPasswordChange}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="plabel" htmlFor="verify-confirm">
            {t("passwordSetup.confirm")}
          </label>
          <PasswordInput
            id="verify-confirm"
            autoComplete="new-password"
            required
            value={confirmPassword}
            onChange={onConfirmChange}
          />
        </div>
        {passwordError ? <ErrorMessage>{passwordError}</ErrorMessage> : null}
        <Button
          type="submit"
          size="lg"
          className="w-full"
          disabled={!password || !confirmPassword || isSettingPassword}
        >
          {isSettingPassword
            ? t("passwordSetup.submitting")
            : t("passwordSetup.submitContinue")}
        </Button>
      </form>
    </div>
  );
}
