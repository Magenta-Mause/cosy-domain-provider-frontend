import { useTranslation } from "react-i18next";

import type { SubdomainDto } from "@/api/generated/model";
import { SubdomainDtoStatus } from "@/api/generated/model";
import { FlatPanel } from "@/components/pixel/panel";

interface StatsStripProps {
  subdomains: SubdomainDto[];
}

export function StatsStrip({ subdomains }: StatsStripProps) {
  const { t } = useTranslation();

  const onlineCount = subdomains.filter(
    (d) => d.status === SubdomainDtoStatus.ACTIVE,
  ).length;
  const pendingCount = subdomains.filter(
    (d) => d.status === SubdomainDtoStatus.PENDING,
  ).length;

  const stats = [
    {
      label: t("dashboard.statsMailboxes"),
      value: String(subdomains.length),
      sub: t("dashboard.statsDomainsRegistered"),
    },
    {
      label: t("status.active"),
      value: String(onlineCount),
      sub:
        onlineCount === subdomains.length && subdomains.length > 0
          ? t("dashboard.statsAllActive")
          : t("dashboard.statsOnline"),
    },
    {
      label: t("status.pending"),
      value: String(pendingCount),
      sub: t("dashboard.statsAwaitingVerification"),
    },
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 16,
        marginBottom: 28,
      }}
    >
      {stats.map((s) => (
        <FlatPanel key={s.label} style={{ padding: 16 }}>
          <div className="pixel" style={{ fontSize: 10, opacity: 0.7 }}>
            {s.label.toUpperCase()}
          </div>
          <div
            className="pixel"
            style={{ fontSize: 22, color: "var(--btn-primary)", marginTop: 8 }}
          >
            {s.value}
          </div>
          <div style={{ fontSize: 15, marginTop: 4, opacity: 0.75 }}>
            {s.sub}
          </div>
        </FlatPanel>
      ))}
    </div>
  );
}
