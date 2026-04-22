import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import useDataInteractions from "@/hooks/useDataInteractions/useDataInteractions";

type OAuthVariant = "login" | "register";

export function OAuthButtons({ variant }: { variant: OAuthVariant }) {
  const { t } = useTranslation();
  const { initiateOAuth } = useDataInteractions();

  const ns = variant === "login" ? "login" : "register";

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3 my-1">
        <div
          className="flex-1 h-[3px] opacity-40"
          style={{ background: "var(--foreground)" }}
        />
        <span className="pixel text-[10px] opacity-70">
          {t(`${ns}.oauthDivider`)}
        </span>
        <div
          className="flex-1 h-[3px] opacity-40"
          style={{ background: "var(--foreground)" }}
        />
      </div>
      <div className="flex gap-2">
        <Button
          type="button"
          variant="secondary"
          className="flex-1"
          data-testid={`${variant}-oauth-google-btn`}
          onClick={() => initiateOAuth("google")}
        >
          {t(`${ns}.oauthGoogle`)}
        </Button>
        <Button
          type="button"
          variant="secondary"
          className="flex-1"
          data-testid={`${variant}-oauth-github-btn`}
          onClick={() => initiateOAuth("github")}
        >
          {t(`${ns}.oauthGithub`)}
        </Button>
        <Button
          type="button"
          variant="secondary"
          className="flex-1"
          data-testid={`${variant}-oauth-discord-btn`}
          onClick={() => initiateOAuth("discord")}
        >
          {t(`${ns}.oauthDiscord`)}
        </Button>
      </div>
    </div>
  );
}
