export function ErrorMessage({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontSize: 16, color: "var(--destructive)" }}>
      ⚠ {children}
    </div>
  );
}
