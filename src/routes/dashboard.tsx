import { createFileRoute } from "@tanstack/react-router";
import { requireFullAuth } from "@/lib/require-full-auth";
import { DashboardPage } from "@/pages/dashboard";

export const Route = createFileRoute("/dashboard")({
  beforeLoad: requireFullAuth,
  component: DashboardPage,
});
