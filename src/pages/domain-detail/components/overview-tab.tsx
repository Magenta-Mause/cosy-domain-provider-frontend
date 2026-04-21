import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import type { SubdomainDto } from "@/api/generated/model";
import { ErrorMessage } from "@/components/pixel/error-message";
import { FlatPanel } from "@/components/pixel/panel";

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
    <form
      onSubmit={onSubmit}
      style={{ display: "flex", flexDirection: "column", gap: 20 }}
    >
      {!isCreateMode ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 16,
            marginBottom: 8,
          }}
        >
          <FlatPanel style={{ padding: 16 }}>
            <div className="pixel" style={{ fontSize: 10, opacity: 0.7 }}>
              {t("domainDetail.domainFqdn")}
            </div>
            <div style={{ fontSize: 18, marginTop: 6 }}>
              {domain?.fqdn ?? "—"}
            </div>
          </FlatPanel>
          <FlatPanel style={{ padding: 16 }}>
            <div className="pixel" style={{ fontSize: 10, opacity: 0.7 }}>
              {t("domainDetail.createdLabel")}
            </div>
            <div style={{ fontSize: 18, marginTop: 6 }}>{createdAt}</div>
          </FlatPanel>
        </div>
      ) : null}

      <fieldset
        style={{
          border: "none",
          padding: 0,
          margin: 0,
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
        disabled={isSubmitting || isDeleting}
      >
        <legend className="sr-only">{t("domainDetail.formLegend")}</legend>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
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
          <div style={{ fontSize: 16, opacity: 0.65 }}>
            {!isCreateMode
              ? t("domainDetail.labelReadonly")
              : t("createSubdomain.labelHint")}
          </div>
          {hasSubmitted && !labelValid ? (
            <ErrorMessage>{t("domainDetail.labelInvalid")}</ErrorMessage>
          ) : null}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
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
          <div style={{ fontSize: 16, opacity: 0.65 }}>
            {t("createSubdomain.targetIpHint")}
          </div>
          {hasSubmitted && !ipValid ? (
            <ErrorMessage>{t("domainDetail.ipInvalid")}</ErrorMessage>
          ) : null}
        </div>
      </fieldset>

      {errorMessage ? <ErrorMessage>{errorMessage}</ErrorMessage> : null}

      <div style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
        <Link
          to="/dashboard"
          data-testid="domain-detail-back-btn"
          className="pbtn ghost"
        >
          ← {t("domainDetail.backToDomains")}
        </Link>
        <button
          type="submit"
          data-testid="domain-detail-submit-btn"
          className="pbtn lg"
          disabled={!canSubmit}
        >
          {isSubmitting
            ? t("domainDetail.saving")
            : isCreateMode
              ? t("domainDetail.createAction")
              : t("domainDetail.saveAction")}
        </button>
      </div>
    </form>
  );
}
