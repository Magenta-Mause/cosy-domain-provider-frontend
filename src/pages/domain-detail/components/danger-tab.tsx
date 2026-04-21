import { useTranslation } from "react-i18next";

import { ErrorMessage } from "@/components/pixel/error-message";
import { Panel } from "@/components/pixel/panel";

interface DangerTabProps {
  errorMessage: string | null;
  isDeleting: boolean;
  onDelete: () => void;
}

export function DangerTab({
  errorMessage,
  isDeleting,
  onDelete,
}: DangerTabProps) {
  const { t } = useTranslation();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <h3 style={{ color: "var(--destructive)" }}>
        {t("domainDetail.dangerZone")}
      </h3>
      {errorMessage ? <ErrorMessage>{errorMessage}</ErrorMessage> : null}
      <Panel style={{ padding: 18, borderColor: "var(--destructive)" }}>
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: 6,
            }}
          >
            <div
              className="pixel"
              style={{ fontSize: 13, color: "var(--destructive)" }}
            >
              {t("domainDetail.dangerZone")}
            </div>
            <div style={{ fontSize: 16, opacity: 0.8 }}>
              {t("domainDetail.deleteDescription")}
            </div>
          </div>
          <button
            type="button"
            data-testid="domain-detail-delete-btn"
            className="pbtn destructive"
            disabled={isDeleting}
            onClick={onDelete}
          >
            {isDeleting ? t("dashboard.deleting") : t("dashboard.delete")}
          </button>
        </div>
      </Panel>
    </div>
  );
}
