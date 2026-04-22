import { createFileRoute, redirect } from "@tanstack/react-router";
import { z } from "zod";
import VerifyPage from "@/pages/verify";
import { store } from "@/store/store.ts";

export const Route = createFileRoute("/verify")({
  validateSearch: z.object({
    token: z.string().optional(),
  }),
  beforeLoad: () => {
    const { identityToken } = store.getState().auth;
    if (!identityToken) {
      throw redirect({ to: "/login" });
    }
  },
  component: VerifyPage,
});
