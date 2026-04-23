import { useTranslation } from "react-i18next";

import { ErrorMessage } from "@/components/pixel/error-message";

interface TargetIpFieldProps {
  targetIp: string;
  onTargetIpChange: (v: string) => void;
  hasSubmitted: boolean;
  ipValid: boolean;
}

export function TargetIpField({
  targetIp,
  onTargetIpChange,
  hasSubmitted,
  ipValid,
}: TargetIpFieldProps) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-2">
      <label className="plabel" htmlFor="targetIp">
        {t("createSubdomain.targetIp")}
      </label>
      <input
        id="targetIp"
        data-testid="domain-detail-target-ip-input"
        className={`pinput${hasSubmitted && !ipValid ? " invalid" : ""}`}
        required
        value={targetIp}
        onChange={(event) => onTargetIpChange(event.target.value.trim())}
        placeholder="203.0.113.42"
        inputMode="decimal"
      />
      <div className="text-base opacity-[0.65]">
        {t("createSubdomain.targetIpHint")}
      </div>
      {hasSubmitted && !ipValid ? (
        <ErrorMessage>{t("domainDetail.ipInvalid")}</ErrorMessage>
      ) : null}
    </div>
  );
}
