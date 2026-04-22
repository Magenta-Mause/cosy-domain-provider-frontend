import { useState } from "react";
import { useTranslation } from "react-i18next";

import useDataInteractions from "@/hooks/useDataInteractions/useDataInteractions";

export function useForgotPasswordLogic() {
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

  return { email, setEmail, isSubmitting, success, error, handleSubmit };
}
