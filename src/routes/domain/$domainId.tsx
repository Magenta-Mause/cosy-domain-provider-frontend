import { createFileRoute } from "@tanstack/react-router";
import { requireFullAuth } from "@/lib/require-full-auth";
import { DomainDetailPage } from "@/pages/domain-detail";

export const Route = createFileRoute("/domain/$domainId")({
  beforeLoad: requireFullAuth,
  component: RouteComponent,
});

function RouteComponent() {
  const { domainId } = Route.useParams();
  return <DomainDetailPage domainId={domainId} />;
}
