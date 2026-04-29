import { createFileRoute } from "@tanstack/react-router";
import { requireFullAuth } from "@/lib/require-full-auth";
import { BillingPage } from "@/pages/billing";

export const Route = createFileRoute("/billing")({
  beforeLoad: requireFullAuth,
  component: BillingPage,
});
