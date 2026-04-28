import { createFileRoute, redirect } from "@tanstack/react-router";
import MfaSetupPage from "@/pages/mfa-setup";
import { store } from "@/store/store.ts";

export const Route = createFileRoute("/mfa-setup")({
  beforeLoad: () => {
    const { identityToken } = store.getState().auth;
    if (!identityToken) {
      throw redirect({ to: "/login" });
    }
  },
  component: MfaSetupPage,
});
