import { createFileRoute } from "@tanstack/react-router";
import { SubdomainDetail } from "@/pages/admin/components/subdomains-tab/subdomain-detail";
import { ADMIN_KEY_STORAGE, adminApi } from "@/pages/admin/lib";

export const Route = createFileRoute("/admin/subdomains/$subdomainUuid")({
  loader: ({ params }) => {
    const key = sessionStorage.getItem(ADMIN_KEY_STORAGE) ?? "";
    return adminApi.getSubdomain(key, params.subdomainUuid);
  },
  component: RouteComponent,
});

function RouteComponent() {
  const subdomain = Route.useLoaderData();
  return <SubdomainDetail subdomain={subdomain} />;
}
