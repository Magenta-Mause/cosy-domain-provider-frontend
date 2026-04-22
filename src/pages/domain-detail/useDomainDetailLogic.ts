import { useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import useDataInteractions from "@/hooks/useDataInteractions/useDataInteractions";
import useDataLoading from "@/hooks/useDataLoading/useDataLoading";
import { isValidIpv4, isValidSubdomainLabel } from "@/lib/validators";
import { useAppSelector } from "@/store/hooks";

export function useDomainDetailLogic(domainId: string) {
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
    () => (isCreateMode ? isValidSubdomainLabel(label) : true),
    [isCreateMode, label],
  );
  const ipValid = isValidIpv4(targetIp);
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

  return {
    domain,
    isCreateMode,
    isInitialLoading,
    label,
    setLabel,
    targetIp,
    setTargetIp,
    errorMessage,
    isSubmitting,
    isDeleting,
    hasSubmitted,
    activeTab,
    setActiveTab,
    labelValid,
    ipValid,
    canSubmit,
    createdAt,
    handleSubmit,
    handleDelete,
  };
}
