interface PasswordInputProps {
  id: string;
  autoComplete?: string;
  required?: boolean;
  minLength?: number;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  showPw: boolean;
  onToggleShow: () => void;
  style?: React.CSSProperties;
  testId?: string;
  toggleTestId?: string;
}

export function PasswordInput({
  id,
  autoComplete = "current-password",
  required,
  minLength,
  placeholder = "••••••••",
  value,
  onChange,
  showPw,
  onToggleShow,
  style,
  testId,
  toggleTestId,
}: PasswordInputProps) {
  return (
    <div style={{ position: "relative" }}>
      <input
        id={id}
        data-testid={testId}
        className="pinput"
        type={showPw ? "text" : "password"}
        autoComplete={autoComplete}
        required={required}
        minLength={minLength}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{ paddingRight: 80, ...style }}
      />
      <button
        type="button"
        data-testid={toggleTestId}
        onClick={onToggleShow}
        style={{
          position: "absolute",
          right: 10,
          top: "50%",
          transform: "translateY(-50%)",
          fontSize: 14,
          opacity: 0.7,
        }}
      >
        {showPw ? "[hide]" : "[show]"}
      </button>
    </div>
  );
}
