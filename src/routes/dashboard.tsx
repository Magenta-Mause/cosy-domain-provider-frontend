import { createFileRoute, redirect } from "@tanstack/react-router";
import { DashboardPage } from "@/pages/dashboard";
import { store } from "@/store/store";

export const Route = createFileRoute("/dashboard")({
  beforeLoad: () => {
    const { identityToken } = store.getState().auth;
    if (!identityToken) {
      throw redirect({ to: "/login" });
    }
  },
  component: DashboardPage,
});
