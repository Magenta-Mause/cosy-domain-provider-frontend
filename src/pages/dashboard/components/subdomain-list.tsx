import { useNavigate } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import type { SubdomainDto } from "@/api/generated/model";
import { SubdomainDtoStatus } from "@/api/generated/model";
import { DotLoader } from "@/components/pixel/dot-loader";
import { Mailbox } from "@/components/pixel/mailbox";
import { FlatPanel } from "@/components/pixel/panel.tsx";
import { StatusDot } from "@/components/pixel/status-dot";
import { SubdomainStatusBadge } from "@/components/pixel/subdomain-status-badge";

interface SubdomainListProps {
  subdomains: SubdomainDto[];
  isLoading: boolean;
  isError: boolean;
  isVerified: boolean;
}

function SubdomainListItem({ domain }: { domain: SubdomainDto }) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <button
      type="button"
      data-testid={`dashboard-domain-item-${domain.uuid}`}
      className="panel-flat hover-lift p-[18px] cursor-pointer w-full text-left"
      onClick={() =>
        void navigate({
          to: "/domain/$domainId",
          params: { domainId: domain.uuid as string },
        })
      }
    >
      <div className="flex gap-5 items-center">
        <Mailbox
          size={48}
          flag={
            domain.status === SubdomainDtoStatus.ACTIVE
              ? "oklch(0.65 0.2 145)"
              : "var(--destructive)"
          }
        />
        <div className="flex-1 flex flex-col gap-1">
          <div className="flex gap-2.5 items-center">
            <div
              className="pixel text-base"
              style={{ color: "var(--btn-primary)" }}
            >
              {domain.fqdn ?? domain.label}
            </div>
          </div>
          <div className="flex gap-3.5 text-base opacity-[0.85] items-center">
            {domain.status ? <StatusDot status={domain.status} /> : null}
            {domain.targetIp ? (
              <span>→ {domain.targetIp}</span>
            ) : (
              <span className="opacity-70">{t("dashboard.notConnected")}</span>
            )}
          </div>
        </div>
        {domain.status ? <SubdomainStatusBadge status={domain.status} /> : null}
        <span className="text-[22px] opacity-60">→</span>
      </div>
    </button>
  );
}

export function SubdomainList({
  subdomains,
  isLoading,
  isError,
  isVerified,
}: SubdomainListProps) {
  const { t } = useTranslation();

  if (isLoading) {
    return (
      <FlatPanel className={"p-10 text-center text-lg"}>
        <DotLoader />
      </FlatPanel>
    );
  }

  if (isError) {
    return (
      <FlatPanel
        className="p-6 text-center"
        style={{ color: "var(--destructive)" }}
      >
        ⚠ {t("dashboard.loadError")}
      </FlatPanel>
    );
  }

  if (subdomains.length === 0) {
    return (
      <FlatPanel className="p-6 text-center text-lg">
        {isVerified ? t("dashboard.empty") : t("dashboard.emptyUnverified")}
      </FlatPanel>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {subdomains.map((d) => (
        <SubdomainListItem key={d.uuid} domain={d} />
      ))}
    </div>
  );
}
