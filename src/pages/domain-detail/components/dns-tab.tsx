import { useTranslation } from "react-i18next";

import type { SubdomainDto } from "@/api/generated/model";
import { FlatPanel } from "@/components/pixel/panel";

interface DnsTabProps {
  domain: SubdomainDto | undefined;
}

export function DnsTab({ domain }: DnsTabProps) {
  const { t } = useTranslation();

  const headers = ["Type", "Name", "Value", "TTL"];
  const rows = [
    ["A", domain?.label ?? "—", domain?.targetIp ?? "—", "300"],
    ["CNAME", `www.${domain?.label ?? "—"}`, domain?.fqdn ?? "—", "300"],
  ];

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h3>{t("domainDetail.dnsRecords")}</h3>
        <p className="text-base opacity-75 mt-1.5">
          {t("domainDetail.dnsManagedFor")}{" "}
          <span
            className="pixel"
            style={{ fontSize: 12, color: "var(--btn-primary)" }}
          >
            {domain?.fqdn ?? domain?.label}
          </span>
          . {t("domainDetail.dnsTargetIp")}{" "}
          <span
            className="pixel"
            style={{ fontSize: 12, color: "var(--btn-primary)" }}
          >
            {domain?.targetIp ?? "—"}
          </span>
        </p>
      </div>
      <FlatPanel style={{ padding: 0, overflow: "hidden" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "80px 1.5fr 2fr 80px",
            gap: 0,
          }}
        >
          {headers.map((h) => (
            <div
              key={h}
              className="pixel"
              style={{
                padding: "10px 14px",
                fontSize: 10,
                background: "var(--btn-primary)",
                color: "var(--btn-secondary)",
              }}
            >
              {h}
            </div>
          ))}
          {rows.map((row) =>
            row.map((cell, j) => (
              <div
                key={`${row[0]}-${headers[j]}`}
                className="truncate"
                style={
                  {
                    padding: "12px 14px",
                    fontSize: j === 0 ? 11 : 17,
                    borderTop: "2px solid var(--foreground)",
                    fontFamily:
                      j === 0 ? "'Press Start 2P', monospace" : undefined,
                    color: j === 0 ? "var(--btn-primary)" : undefined,
                  } as React.CSSProperties
                }
              >
                {cell}
              </div>
            )),
          )}
        </div>
      </FlatPanel>
    </div>
  );
}
