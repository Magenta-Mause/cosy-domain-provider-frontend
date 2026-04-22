import { Link } from "@tanstack/react-router";
import { RotateCw } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { AuthPageLayout } from "@/components/auth/auth-page-layout.tsx";
import { ErrorMessage } from "@/components/pixel/error-message.tsx";
import { Mailbox } from "@/components/pixel/mailbox.tsx";
import { Button } from "@/components/ui/button.tsx";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp.tsx";
import useAuthInformation from "@/hooks/useAuthInformation/useAuthInformation.ts";
import useDataInteractions from "@/hooks/useDataInteractions/useDataInteractions.ts";
import { Route } from "@/routes/verify.tsx";

const VerifyPage = () => {
  const { userEmail, isVerified } = useAuthInformation();
  const { token: urlToken } = Route.useSearch();
  const [verificationToken, setVerificationToken] = useState<string>("");
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [isResending, setIsResending] = useState<boolean>(false);
  const [resendSent, setResendSent] = useState<boolean>(false);
  const [verifyError, setVerifyError] = useState<string | null>(null);
  const [resendError, setResendError] = useState<string | null>(null);
  const { verifyAccount, resendVerificationCode } = useDataInteractions();

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

  const isBusy = isVerifying || isResending;

  if (isVerified) {
    return (
      <AuthPageLayout backButtonLink={"/dashboard"}>
        <div className="flex flex-col items-center gap-6 py-4 text-center">
          <Mailbox size={64} flag="oklch(0.65 0.2 145)" />
          <div className="flex flex-col gap-2">
            <h3>You're verified!</h3>
            <div className="text-base opacity-80">
              Your mailbox is confirmed. Welcome home.
            </div>
          </div>
          <Link to="/dashboard" className="pbtn lg">
            Go to dashboard →
          </Link>
        </div>
      </AuthPageLayout>
    );
  }

  return (
    <AuthPageLayout backButtonLink={"/dashboard"}>
      <div className={"flex flex-col gap-10"}>
        <div className={"flex flex-col gap-5"}>
          <h3>Check your mailbox</h3>
          <div>
            We sent a 6-letter code to {userEmail}. Paste it below to move in.
          </div>
        </div>
        <div className={"w-full text-center justify-center flex"}>
          <div className={"w-fit"}>
            <InputOTP
              value={verificationToken}
              maxLength={6}
              onChange={(code) => {
                setVerificationToken(code.toUpperCase());
                setVerifyError(null);
              }}
              disabled={isBusy}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>
        </div>
        <div className={"flex flex-col gap-3"}>
          {verifyError ? <ErrorMessage>{verifyError}</ErrorMessage> : null}
          <Button
            onClick={() => triggerVerification(verificationToken)}
            disabled={verificationToken.length !== 6 || isBusy}
          >
            {isVerifying ? "Verifying…" : "Verify"}
          </Button>
          {resendError ? <ErrorMessage>{resendError}</ErrorMessage> : null}
          <Button
            variant={"ghost"}
            className={"flex gap-3"}
            disabled={isBusy}
            onClick={() => void triggerResend()}
          >
            <RotateCw size={"18px"} />
            <span>
              {isResending
                ? "Sending…"
                : resendSent
                  ? "Code sent!"
                  : "Resend Verification Code"}
            </span>
          </Button>
        </div>
      </div>
    </AuthPageLayout>
  );
};

export default VerifyPage;
