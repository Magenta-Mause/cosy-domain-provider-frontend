import { useEffect, useState } from "react";
import { FlatPanel } from "@/components/pixel/panel";
import { type AdminUser, type AdminUserDetail, adminApi } from "../../lib";
import { UserDetail } from "./user-detail";

interface UsersTabProps {
  adminKey: string;
}

export function UsersTab({ adminKey }: UsersTabProps) {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<AdminUserDetail | null>(
    null,
  );
  const [loadingUserId, setLoadingUserId] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    adminApi
      .getUsers(adminKey)
      .then(setUsers)
      .catch(() => setError("Failed to load users."))
      .finally(() => setIsLoading(false));
  }, [adminKey]);

  const handleUserClick = async (uuid: string) => {
    setLoadingUserId(uuid);
    try {
      const detail = await adminApi.getUserDetail(adminKey, uuid);
      setSelectedUser(detail);
    } catch {
      // ignore
    } finally {
      setLoadingUserId(null);
    }
  };

  if (selectedUser) {
    return (
      <UserDetail
        detail={selectedUser}
        adminKey={adminKey}
        onBack={() => setSelectedUser(null)}
        onUpdate={setSelectedUser}
      />
    );
  }

  if (isLoading) return <p className="text-sm opacity-60 py-4">Loading...</p>;
  if (error) return <p className="text-sm text-destructive py-4">{error}</p>;

  return (
    <FlatPanel className="p-0 overflow-hidden">
      <div
        className="grid text-sm"
        style={{ gridTemplateColumns: "2fr 2fr 1fr 1fr 1fr 1.5fr" }}
      >
        {[
          "Email",
          "UUID",
          "Tier",
          "Subdomains",
          "Verified",
          "Plan expires",
        ].map((h) => (
          <div
            key={h}
            className="px-3 py-2 bg-btn-primary text-btn-secondary font-bold"
          >
            {h}
          </div>
        ))}
        {users.map((u) => (
          <button
            key={u.uuid}
            type="button"
            className="contents group cursor-pointer"
            disabled={loadingUserId === u.uuid}
            onClick={() => handleUserClick(u.uuid)}
          >
            {[
              <div
                key="email"
                className="px-3 py-2.5 border-t border-foreground/10 truncate group-hover:bg-foreground/5 transition-colors"
              >
                {u.email}
              </div>,
              <div
                key="uuid"
                className="px-3 py-2.5 border-t border-foreground/10 font-mono text-xs truncate opacity-60 group-hover:bg-foreground/5 transition-colors"
              >
                {u.uuid}
              </div>,
              <div
                key="tier"
                className={`px-3 py-2.5 border-t border-foreground/10 font-semibold group-hover:bg-foreground/5 transition-colors ${u.tier === "PLUS" ? "text-btn-primary" : "opacity-70"}`}
              >
                {u.tier}
              </div>,
              <div
                key="count"
                className="px-3 py-2.5 border-t border-foreground/10 group-hover:bg-foreground/5 transition-colors"
              >
                {u.subdomainCount}/{u.maxSubdomainCount}
                {u.maxSubdomainCountOverride !== null && (
                  <span className="ml-1 text-xs opacity-50">*</span>
                )}
              </div>,
              <div
                key="verified"
                className={`px-3 py-2.5 border-t border-foreground/10 group-hover:bg-foreground/5 transition-colors ${u.verified ? "text-green-400" : "opacity-40"}`}
              >
                {u.verified ? "Yes" : "No"}
              </div>,
              <div
                key="expires"
                className="px-3 py-2.5 border-t border-foreground/10 opacity-60 group-hover:bg-foreground/5 transition-colors"
              >
                {u.planExpiresAt
                  ? new Date(u.planExpiresAt).toLocaleDateString()
                  : "—"}
              </div>,
            ]}
          </button>
        ))}
      </div>
    </FlatPanel>
  );
}
