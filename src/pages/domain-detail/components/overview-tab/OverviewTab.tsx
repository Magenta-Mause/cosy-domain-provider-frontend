import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import type { SubdomainDto } from "@/api/generated/model";
import { ErrorMessage } from "@/components/pixel/error-message";
import { Button } from "@/components/ui/button";

import { DomainMetaCards } from "./components/DomainMetaCards";

interface OverviewTabProps {
  domain: SubdomainDto | undefined;
  isCreateMode: boolean;
  label: string;
  onLabelChange: (v: string) => void;
  targetIp: string;
  onTargetIpChange: (v: string) => void;
  errorMessage: string | null;
  isSubmitting: boolean;
  isDeleting: boolean;
  hasSubmitted: boolean;
  labelValid: boolean;
  ipValid: boolean;
  canSubmit: boolean;
  createdAt: string;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export function OverviewTab({
  domain,
  isCreateMode,
  label,
  onLabelChange,
  targetIp,
  onTargetIpChange,
  errorMessage,
  isSubmitting,
  isDeleting,
  hasSubmitted,
  labelValid,
  ipValid,
  canSubmit,
  createdAt,
  onSubmit,
}: OverviewTabProps) {
  const { t } = useTranslation();

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5">
      {!isCreateMode ? (
        <DomainMetaCards domain={domain} createdAt={createdAt} />
      ) : null}

      <fieldset
        className="border-none p-0 m-0 flex flex-col gap-4"
        disabled={isSubmitting || isDeleting}
      >
        <legend className="sr-only">{t("domainDetail.formLegend")}</legend>

        <div className="flex flex-col gap-2">
          <label className="plabel" htmlFor="label">
            {t("createSubdomain.label")}
          </label>
          <input
            id="label"
            data-testid="domain-detail-label-input"
            className={`pinput${hasSubmitted && !labelValid ? " invalid" : ""}`}
            required
            value={label}
            onChange={(e) => onLabelChange(e.target.value.toLowerCase().trim())}
            placeholder="my-castle"
            readOnly={!isCreateMode}
          />
          <div className="text-base opacity-[0.65]">
            {!isCreateMode
              ? t("domainDetail.labelReadonly")
              : t("createSubdomain.labelHint")}
          </div>
          {hasSubmitted && !labelValid ? (
            <ErrorMessage>{t("domainDetail.labelInvalid")}</ErrorMessage>
          ) : null}
        </div>

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
            onChange={(e) => onTargetIpChange(e.target.value.trim())}
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
      </fieldset>

      {errorMessage ? <ErrorMessage>{errorMessage}</ErrorMessage> : null}

      <div className="flex gap-3 justify-end">
        <Link
          to="/dashboard"
          data-testid="domain-detail-back-btn"
          className="pbtn ghost"
        >
          ← {t("domainDetail.backToDomains")}
        </Link>
        <Button
          type="submit"
          data-testid="domain-detail-submit-btn"
          size="lg"
          disabled={!canSubmit}
        >
          {isSubmitting
            ? t("domainDetail.saving")
            : isCreateMode
              ? t("domainDetail.createAction")
              : t("domainDetail.saveAction")}
        </Button>
      </div>
    </form>
  );
}
