import { useTranslation } from "react-i18next";

export function PageFooter() {
  const { t } = useTranslation();

  return (
    <footer
      style={{
        padding: "32px",
        textAlign: "center",
        fontSize: 16,
        opacity: 0.7,
        background: "var(--background)",
      }}
    >
      {t("footer.text")}
    </footer>
  );
}
