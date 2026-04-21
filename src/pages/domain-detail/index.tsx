import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { AppHeader } from "@/components/layout/app-header";
import { DotLoader } from "@/components/pixel/dot-loader";
import { Mailbox } from "@/components/pixel/mailbox";
import { FlatPanel } from "@/components/pixel/panel";
import { StatusDot } from "@/components/pixel/status-dot";
import { SubdomainStatusBadge } from "@/components/pixel/subdomain-status-badge";
import useDataInteractions from "@/hooks/useDataInteractions/useDataInteractions";
import useDataLoading from "@/hooks/useDataLoading/useDataLoading";
import { useAppSelector } from "@/store/hooks";

import { DangerTab } from "./components/danger-tab";
import { DnsTab } from "./components/dns-tab";
import { DomainTabBar } from "./components/domain-tab-bar";
import { OverviewTab } from "./components/overview-tab";

const LABEL_PATTERN = /^[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?$/;
const IPV4_PATTERN =
  /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

export function DomainDetailPage({ domainId }: { domainId: string }) {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const isCreateMode = domainId === "new";
  const { createSubdomain, updateSubdomain, deleteSubdomain } =
    useDataInteractions();
  const { loadSubdomainByUuid } = useDataLoading();
  const cachedSubdomain = useAppSelector((state) =>
    state.subdomains.items.find((item) => item.uuid === domainId),
  );
  const [loadedSubdomain, setLoadedSubdomain] =
    useState<typeof cachedSubdomain>(undefined);
  const [isInitialLoading, setIsInitialLoading] = useState(false);
  const [label, setLabel] = useState("");
  const [targetIp, setTargetIp] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "dns" | "danger">(
    "overview",
  );

  useEffect(() => {
    if (isCreateMode) return;

    if (cachedSubdomain?.uuid) {
      setLoadedSubdomain(cachedSubdomain);
      setLabel(cachedSubdomain.label ?? "");
      setTargetIp(cachedSubdomain.targetIp ?? "");
      return;
    }

    let active = true;
    setIsInitialLoading(true);
    void (async () => {
      const loaded = await loadSubdomainByUuid(domainId);
      if (!active) return;
      setIsInitialLoading(false);
      if (!loaded) {
        setErrorMessage(t("domainDetail.loadError"));
        return;
      }
      setLoadedSubdomain(loaded);
      setLabel(loaded.label ?? "");
      setTargetIp(loaded.targetIp ?? "");
    })();

    return () => {
      active = false;
    };
  }, [cachedSubdomain, domainId, isCreateMode, loadSubdomainByUuid, t]);

  const domain = cachedSubdomain ?? loadedSubdomain;

  const labelValid = useMemo(
    () => (isCreateMode ? LABEL_PATTERN.test(label) : true),
    [isCreateMode, label],
  );
  const ipValid = IPV4_PATTERN.test(targetIp);
  const canSubmit = labelValid && ipValid && !isSubmitting;

  const locale = i18n.language.toLowerCase().startsWith("de")
    ? "de-DE"
    : "en-US";
  const createdAt = domain?.createdAt
    ? new Intl.DateTimeFormat(locale, {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(new Date(domain.createdAt))
    : t("domainDetail.unknownValue");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setHasSubmitted(true);
    setErrorMessage(null);
    if (!labelValid || !ipValid) return;

    setIsSubmitting(true);
    try {
      if (isCreateMode) {
        const created = await createSubdomain({ label, targetIp });
        if (created.uuid) {
          await navigate({
            to: "/domain/$domainId",
            params: { domainId: created.uuid },
          });
        } else {
          await navigate({ to: "/dashboard" });
        }
      } else {
        await updateSubdomain(domainId, { targetIp });
      }
    } catch {
      setErrorMessage(
        isCreateMode
          ? t("createSubdomain.error")
          : t("domainDetail.updateError"),
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDelete() {
    if (isCreateMode) return;
    const shouldDelete = window.confirm(t("domainDetail.deleteConfirm"));
    if (!shouldDelete) return;

    setIsDeleting(true);
    setErrorMessage(null);
    try {
      await deleteSubdomain(domainId);
      await navigate({ to: "/dashboard" });
    } catch {
      setErrorMessage(t("domainDetail.deleteError"));
    } finally {
      setIsDeleting(false);
    }
  }

  if (isInitialLoading) {
    return (
      <div style={{ minHeight: "100vh", background: "var(--background)" }}>
        <div className="sky-bg">
          <AppHeader />
        </div>
        <div style={{ padding: 40, textAlign: "center", fontSize: 18 }}>
          <DotLoader />
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--background)" }}>
      <div className="sky-bg">
        <AppHeader />
        <div style={{ padding: "20px 28px", maxWidth: 1100, margin: "0 auto" }}>
          <Link
            to="/dashboard"
            data-testid="domain-detail-back-link"
            style={{
              color: "oklch(0.95 0.08 70)",
              fontSize: 16,
              display: "block",
              marginBottom: 12,
            }}
          >
            ← {t("domainDetail.backToDomains")}
          </Link>
          <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
            <Mailbox size={64} />
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              <h1
                style={{
                  color: "oklch(0.95 0.08 70)",
                  textShadow: "3px 3px 0 oklch(0.25 0.08 30)",
                  fontSize: 28,
                }}
              >
                {isCreateMode
                  ? t("domainDetail.createTitle")
                  : (domain?.fqdn ?? domain?.label ?? t("domainDetail.title"))}
              </h1>
              {!isCreateMode && domain?.status ? (
                <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                  <StatusDot status={domain.status} />
                  <SubdomainStatusBadge
                    status={domain.status}
                    variant="detail"
                  />
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          padding: "0 28px 80px",
          maxWidth: 1100,
          margin: "0 auto",
          marginTop: 35,
        }}
      >
        {!isCreateMode ? (
          <DomainTabBar activeTab={activeTab} onChange={setActiveTab} />
        ) : null}

        <FlatPanel
          style={{
            padding: 28,
            borderTopLeftRadius: activeTab === "overview" ? 0 : undefined,
          }}
        >
          {isCreateMode || activeTab === "overview" ? (
            <OverviewTab
              domain={domain}
              isCreateMode={isCreateMode}
              label={label}
              onLabelChange={setLabel}
              targetIp={targetIp}
              onTargetIpChange={setTargetIp}
              errorMessage={activeTab === "overview" ? errorMessage : null}
              isSubmitting={isSubmitting}
              isDeleting={isDeleting}
              hasSubmitted={hasSubmitted}
              labelValid={labelValid}
              ipValid={ipValid}
              canSubmit={canSubmit}
              createdAt={createdAt}
              onSubmit={handleSubmit}
            />
          ) : null}

          {!isCreateMode && activeTab === "dns" ? (
            <DnsTab domain={domain} />
          ) : null}

          {!isCreateMode && activeTab === "danger" ? (
            <DangerTab
              errorMessage={activeTab === "danger" ? errorMessage : null}
              isDeleting={isDeleting}
              onDelete={handleDelete}
            />
          ) : null}
        </FlatPanel>
      </div>
    </div>
  );
}
