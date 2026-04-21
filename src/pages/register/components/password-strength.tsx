interface PasswordStrengthProps {
  password: string;
}

export function PasswordStrength({ password }: PasswordStrengthProps) {
  if (password.length === 0) return null;

  const isWeak = password.length < 8;
  const isStrong = password.length >= 12;

  const strengthColor = isStrong
    ? "var(--accent-2)"
    : isWeak
      ? "var(--destructive)"
      : "var(--accent)";

  return (
    <div style={{ display: "flex", gap: 4 }}>
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          style={{
            flex: 1,
            height: 8,
            border: "2px solid var(--foreground)",
            background:
              password.length > i * 3 ? strengthColor : "var(--input-bg)",
          }}
        />
      ))}
    </div>
  );
}
