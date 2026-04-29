import { createFileRoute } from "@tanstack/react-router";
import { requireFullAuth } from "@/lib/require-full-auth";
import { SettingsPage } from "@/pages/settings";

export const Route = createFileRoute("/settings")({
  beforeLoad: requireFullAuth,
  component: SettingsPage,
});
