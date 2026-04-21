import { useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import type { SubdomainDto, SubdomainDtoStatus } from "@/api/generated/model";
import { AppHeader } from "@/components/layout/app-header";
import useDataLoading from "@/hooks/useDataLoading/useDataLoading";
import { useAppSelector } from "@/store/hooks";

import { FilterBar } from "./components/filter-bar";
import { StatsStrip } from "./components/stats-strip";
import { SubdomainList } from "./components/subdomain-list";

export function DashboardPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { loadSubdomains } = useDataLoading();
  const subdomains = useAppSelector(
    (state) => state.subdomains.items,
  ) as SubdomainDto[];
  const isLoading =
    useAppSelector((state) => state.subdomains.state) === "loading";
  const isError =
    useAppSelector((state) => state.subdomains.state) === "failed";
  const [filter, setFilter] = useState<"all" | SubdomainDtoStatus>("all");

  useEffect(() => {
    void loadSubdomains();
  }, [loadSubdomains]);

  const filtered =
    filter === "all"
      ? subdomains
      : subdomains.filter((d) => d.status === filter);

  return (
    <div style={{ minHeight: "100vh", background: "var(--background)" }}>
      <div className="sky-bg overflow-visible">
        <AppHeader />
        <div
          style={{
            padding: "20px 28px 20px",
            maxWidth: 1200,
            margin: "0 auto",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              gap: 16,
              marginBottom: 16,
            }}
          >
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              <div
                className="pixel"
                style={{ fontSize: 11, color: "oklch(0.92 0.05 70)" }}
              >
                {t("dashboard.postOfficeLabel")}
              </div>
              <h1
                style={{
                  color: "oklch(0.95 0.08 70)",
                  textShadow: "3px 3px 0 oklch(0.25 0.08 30)",
                }}
              >
                {t("dashboard.title")}
              </h1>
            </div>
            <button
              type="button"
              data-testid="dashboard-create-new-btn"
              className="pbtn lg"
              onClick={() =>
                void navigate({
                  to: "/domain/$domainId",
                  params: { domainId: "new" },
                })
              }
            >
              + {t("dashboard.createNew")}
            </button>
          </div>
        </div>
      </div>

      <div
        style={{
          padding: "20px 28px 60px",
          maxWidth: 1200,
          margin: "0 auto",
          marginTop: 0,
        }}
      >
        <StatsStrip subdomains={subdomains} />
        <FilterBar filter={filter} onChange={setFilter} />
        <SubdomainList
          subdomains={filtered}
          isLoading={isLoading}
          isError={isError}
          hasActiveFilter={filter !== "all"}
        />
      </div>
    </div>
  );
}
