import { useTranslation } from "react-i18next";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function AboutPage() {
  const { t } = useTranslation();

  return (
    <Card className="mx-auto max-w-xl">
      <CardHeader>
        <CardTitle>{t("about.title")}</CardTitle>
        <CardDescription>{t("about.description")}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3 text-sm text-muted-foreground">
        <p>{t("about.points.ui")}</p>
        <p>{t("about.points.routing")}</p>
        <p>{t("about.points.state")}</p>
        <p>{t("about.points.styling")}</p>
      </CardContent>
    </Card>
  );
}
