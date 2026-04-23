import { useTranslation } from "react-i18next";

interface ReadonlyLabelFieldProps {
  label: string;
}

export function ReadonlyLabelField({ label }: ReadonlyLabelFieldProps) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-2">
      <label className="plabel" htmlFor="label">
        {t("createSubdomain.label")}
      </label>
      <input
        id="label"
        data-testid="domain-detail-label-input"
        className="pinput opacity-50 select-none"
        value={label}
        disabled
        readOnly
      />
      <div className="text-base opacity-[0.65]">
        {t("domainDetail.labelReadonly")}
      </div>
    </div>
  );
}
