import { createFileRoute, redirect } from "@tanstack/react-router";
import { LoginPage } from "@/pages/login";
import { store } from "@/store/store";

export const Route = createFileRoute("/login")({
  beforeLoad: () => {
    const { identityToken } = store.getState().auth;
    if (identityToken) {
      throw redirect({ to: "/dashboard" });
    }
  },
  component: LoginPage,
});
