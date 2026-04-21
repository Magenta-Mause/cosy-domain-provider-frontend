import { Minus, Plus, RotateCcw } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { decrement, increment, reset } from "@/store/counter-slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export function HomePage() {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  return (
    <Card className="mx-auto max-w-xl">
      <CardHeader>
        <CardTitle>{t("home.title")}</CardTitle>
        <CardDescription>{t("home.description")}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="rounded-lg border bg-muted/50 p-6 text-center">
          <p className="text-sm text-muted-foreground">
            {t("home.counterLabel")}
          </p>
          <p className="mt-2 text-4xl font-bold">{count}</p>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          <Button onClick={() => dispatch(increment())}>
            <Plus className="mr-2 h-4 w-4" />
            {t("home.increment")}
          </Button>
          <Button variant="secondary" onClick={() => dispatch(decrement())}>
            <Minus className="mr-2 h-4 w-4" />
            {t("home.decrement")}
          </Button>
          <Button variant="outline" onClick={() => dispatch(reset())}>
            <RotateCcw className="mr-2 h-4 w-4" />
            {t("home.reset")}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
