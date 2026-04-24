import { useState } from "react";
import { FlatPanel } from "@/components/pixel/panel";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form-field";
import { type AdminSubdomain, type AdminUserDetail, adminApi } from "../../lib";

interface UserDetailProps {
  detail: AdminUserDetail;
  adminKey: string;
  onBack: () => void;
  onUpdate: (updated: AdminUserDetail) => void;
}

export function UserDetail({
  detail,
  adminKey,
  onBack,
  onUpdate,
}: UserDetailProps) {
  const [overrideInput, setOverrideInput] = useState(
    detail.maxSubdomainCountOverride !== null
      ? String(detail.maxSubdomainCountOverride)
      : "",
  );
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const handleSaveOverride = async () => {
    setIsSaving(true);
    setSaveError(null);
    try {
      const value = overrideInput.trim() === "" ? null : Number(overrideInput);
      await adminApi.setMaxSubdomainOverride(adminKey, detail.uuid, value);
      const updated = await adminApi.getUserDetail(adminKey, detail.uuid);
      onUpdate(updated);
    } catch {
      setSaveError("Failed to save override.");
    } finally {
      setIsSaving(false);
    }
  };

  const StatusBadge = ({ status }: { status: AdminSubdomain["status"] }) => {
    const color =
      status === "ACTIVE"
        ? "text-green-400"
        : status === "FAILED"
          ? "text-destructive"
          : "text-yellow-400";
    return <span className={`text-sm ${color}`}>{status}</span>;
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onBack}
          className="pbtn sm secondary"
        >
          ← Back
        </button>
        <h2 className="text-lg font-bold">{detail.email}</h2>
      </div>

      <FlatPanel className="px-5 py-4 grid grid-cols-2 gap-x-8 gap-y-3">
        <div className="flex flex-col gap-0.5">
          <div className="text-[10px] opacity-50 uppercase tracking-wide">
            User ID
          </div>
          <div className="text-xs font-mono">{detail.uuid}</div>
        </div>
        <div className="flex flex-col gap-0.5">
          <div className="text-[10px] opacity-50 uppercase tracking-wide">
            Email
          </div>
          <div className="text-sm">{detail.email}</div>
        </div>
        <div className="flex flex-col gap-0.5">
          <div className="text-[10px] opacity-50 uppercase tracking-wide">
            Username
          </div>
          <div className="text-sm">{detail.username}</div>
        </div>
        <div className="flex flex-col gap-0.5">
          <div className="text-[10px] opacity-50 uppercase tracking-wide">
            Verified
          </div>
          <div className="text-sm">{detail.verified ? "Yes" : "No"}</div>
        </div>
        <div className="flex flex-col gap-0.5">
          <div className="text-[10px] opacity-50 uppercase tracking-wide">
            Tier
          </div>
          <div className="text-sm font-semibold">{detail.tier}</div>
        </div>
        <div className="flex flex-col gap-0.5">
          <div className="text-[10px] opacity-50 uppercase tracking-wide">
            Plan expires
          </div>
          <div className="text-sm">
            {detail.planExpiresAt
              ? new Date(detail.planExpiresAt).toLocaleDateString()
              : "—"}
          </div>
        </div>
        <div className="flex flex-col gap-0.5">
          <div className="text-[10px] opacity-50 uppercase tracking-wide">
            Joined
          </div>
          <div className="text-sm">
            {detail.createdAt
              ? new Date(detail.createdAt).toLocaleDateString()
              : "—"}
          </div>
        </div>
        <div className="flex flex-col gap-0.5">
          <div className="text-[10px] opacity-50 uppercase tracking-wide">
            Max subdomains
          </div>
          <div className="text-sm">
            {detail.maxSubdomainCount}
            {detail.maxSubdomainCountOverride !== null && (
              <span className="ml-1 opacity-50">
                (override: {detail.maxSubdomainCountOverride})
              </span>
            )}
          </div>
        </div>
      </FlatPanel>

      <FlatPanel className="px-5 py-4 flex items-end gap-3">
        <div className="flex-1 max-w-[200px]">
          <FormField
            id="max-override"
            label="Max subdomain override"
            type="number"
            value={overrideInput}
            onChange={setOverrideInput}
            placeholder="Leave empty to clear"
            error={saveError}
          />
        </div>
        <Button
          type="button"
          size="sm"
          onClick={handleSaveOverride}
          disabled={isSaving}
        >
          {isSaving ? "Saving..." : "Save"}
        </Button>
      </FlatPanel>

      <div>
        <h3 className="text-sm font-semibold mb-2">
          Subdomains ({detail.subdomains.length})
        </h3>
        <FlatPanel className="p-0 overflow-hidden">
          <div
            className="grid text-sm"
            style={{ gridTemplateColumns: "2fr 2.5fr 1fr 1fr 1fr 1fr" }}
          >
            {["Label", "FQDN", "Status", "Mode", "Target IP", "Created"].map(
              (h) => (
                <div
                  key={h}
                  className="px-3 py-2 bg-btn-primary text-btn-secondary font-bold"
                >
                  {h}
                </div>
              ),
            )}
            {detail.subdomains.length === 0 && (
              <div className="col-span-6 px-3 py-4 opacity-50 text-center">
                No subdomains
              </div>
            )}
            {detail.subdomains.map((s) => [
              <div
                key={`${s.uuid}-label`}
                className="px-3 py-2.5 border-t border-foreground/10 font-mono truncate"
              >
                {s.label}
              </div>,
              <div
                key={`${s.uuid}-fqdn`}
                className="px-3 py-2.5 border-t border-foreground/10 truncate opacity-70"
              >
                {s.fqdn ?? "—"}
              </div>,
              <div
                key={`${s.uuid}-status`}
                className="px-3 py-2.5 border-t border-foreground/10"
              >
                <StatusBadge status={s.status} />
              </div>,
              <div
                key={`${s.uuid}-mode`}
                className="px-3 py-2.5 border-t border-foreground/10 opacity-70"
              >
                {s.labelMode}
              </div>,
              <div
                key={`${s.uuid}-ip`}
                className="px-3 py-2.5 border-t border-foreground/10 truncate opacity-70"
              >
                {s.targetIp ?? "—"}
              </div>,
              <div
                key={`${s.uuid}-date`}
                className="px-3 py-2.5 border-t border-foreground/10 opacity-70"
              >
                {new Date(s.createdAt).toLocaleDateString()}
              </div>,
            ])}
          </div>
        </FlatPanel>
      </div>
    </div>
  );
}
