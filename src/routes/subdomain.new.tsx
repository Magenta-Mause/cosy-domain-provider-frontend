import { createFileRoute, redirect } from "@tanstack/react-router";
import { CreateSubdomainPage } from "@/pages/create-subdomain-page";
import { store } from "@/store/store";

export const Route = createFileRoute("/subdomain/new")({
  beforeLoad: () => {
    const { identityToken } = store.getState().auth;
    if (!identityToken) {
      throw redirect({ to: "/login" });
    }
  },
  component: CreateSubdomainPage,
});
