import { createFileRoute } from "@tanstack/react-router";
import { ImpressumPage } from "@/pages/legal/impressum";

export const Route = createFileRoute("/legal-notice")({
  component: ImpressumPage,
});
