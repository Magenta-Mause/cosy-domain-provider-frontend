export function ErrorMessage({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-base" style={{ color: "var(--destructive)" }}>
      ⚠ {children}
    </div>
  );
}
