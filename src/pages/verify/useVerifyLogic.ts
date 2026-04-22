import { useCallback, useEffect, useState } from "react";

import useAuthInformation from "@/hooks/useAuthInformation/useAuthInformation";
import useDataInteractions from "@/hooks/useDataInteractions/useDataInteractions";
import { Route } from "@/routes/verify";

export function useVerifyLogic() {
  const { userEmail, isVerified } = useAuthInformation();
  const { token: urlToken } = Route.useSearch();
  const { verifyAccount, resendVerificationCode } = useDataInteractions();

  const [verificationToken, setVerificationToken] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [resendSent, setResendSent] = useState(false);
  const [verifyError, setVerifyError] = useState<string | null>(null);
  const [resendError, setResendError] = useState<string | null>(null);

  const triggerVerification = useCallback(
    async (token: string) => {
      setIsVerifying(true);
      setVerifyError(null);
      try {
        await verifyAccount(token);
      } catch {
        setVerifyError("That code didn't match. Double-check and try again.");
        setVerificationToken("");
      } finally {
        setIsVerifying(false);
      }
    },
    [verifyAccount],
  );

  useEffect(() => {
    if (urlToken && urlToken.length === 6) {
      setVerificationToken(urlToken.toUpperCase());
      void triggerVerification(urlToken);
    }
  }, [urlToken, triggerVerification]);

  const triggerResend = async () => {
    setIsResending(true);
    setResendSent(false);
    setResendError(null);
    try {
      await resendVerificationCode();
      setResendSent(true);
    } catch {
      setResendError("Couldn't send a new code. Please try again later.");
    } finally {
      setIsResending(false);
    }
  };

  return {
    userEmail,
    isVerified,
    verificationToken,
    setVerificationToken,
    isVerifying,
    isResending,
    resendSent,
    verifyError,
    setVerifyError,
    resendError,
    isBusy: isVerifying || isResending,
    triggerVerification,
    triggerResend,
  };
}
