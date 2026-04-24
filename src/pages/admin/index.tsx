import { useState } from "react";
import { PageHeader } from "@/components/layout/page-header";
import { FlatPanel } from "@/components/pixel/panel";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form-field";
import { SubdomainsTab } from "./components/subdomains-tab";
import { UsersTab } from "./components/users-tab";
import { useAdminLogic } from "./useAdminLogic";

export function AdminPage() {
  const {
    key,
    isAuthenticated,
    loginError,
    login,
    logout,
    activeTab,
    setActiveTab,
  } = useAdminLogic();

  const [inputKey, setInputKey] = useState("");
  const [isLogging, setIsLogging] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLogging(true);
    await login(inputKey);
    setIsLogging(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="w-full max-w-sm flex flex-col gap-5">
          <div>
            <div className="pixel text-[11px] mb-1" style={{ color: "oklch(0.92 0.05 70)" }}>
              ADMIN
            </div>
            <h1 style={{ color: "oklch(0.95 0.08 70)", textShadow: "3px 3px 0 oklch(0.25 0.08 30)" }}>
              Admin Dashboard
            </h1>
          </div>
          <FlatPanel className="px-5 py-5">
            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              <FormField
                id="admin-key"
                label="Admin Key"
                type="password"
                value={inputKey}
                onChange={setInputKey}
                placeholder="Enter admin key"
                autoComplete="off"
                error={loginError ? "Invalid admin key." : null}
              />
              <Button type="submit" disabled={isLogging || !inputKey}>
                {isLogging ? "Verifying..." : "Sign in"}
              </Button>
            </form>
          </FlatPanel>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <PageHeader maxWidth={1200}>
        <div className="flex items-end gap-4 mb-4">
          <div className="flex-1 flex flex-col gap-2">
            <div className="pixel text-[11px]" style={{ color: "oklch(0.92 0.05 70)" }}>
              ADMIN
            </div>
            <h1 style={{ color: "oklch(0.95 0.08 70)", textShadow: "3px 3px 0 oklch(0.25 0.08 30)" }}>
              Admin Dashboard
            </h1>
          </div>
          <button
            type="button"
            onClick={logout}
            className="pbtn sm secondary shrink-0"
          >
            Sign out
          </button>
        </div>

        <div className="flex gap-1" style={{ borderBottom: "2px solid oklch(0.95 0.05 70 / 30%)" }}>
          {(["subdomains", "users"] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              style={
                activeTab === tab
                  ? { color: "oklch(0.97 0.05 70)", borderBottom: "2px solid oklch(0.97 0.05 70)" }
                  : { color: "oklch(0.97 0.05 70 / 55%)", borderBottom: "2px solid transparent" }
              }
              className="px-5 py-2.5 text-sm font-semibold capitalize transition-colors -mb-[2px] hover:opacity-100"
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </PageHeader>

      <div className="max-w-[1200px] mx-auto px-6 py-6 flex flex-col gap-5">
        {activeTab === "subdomains" && <SubdomainsTab adminKey={key} />}
        {activeTab === "users" && <UsersTab adminKey={key} />}
      </div>
    </div>
  );
}
