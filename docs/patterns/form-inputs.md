# Form Inputs

## Target: `FormField` component

All form fields should use a single `FormField` component. It does not exist yet — this is the spec for when it gets built.

```typescript
interface FormFieldProps {
  id: string
  label: string
  placeholder?: string
  value: string
  onChange: (value: string) => void
  validate?: (value: string) => string | null  // returns error string or null
  showError?: boolean      // flip to true on first submit attempt
  endDecorator?: React.ReactNode  // e.g. password toggle button
  type?: string
  required?: boolean
  disabled?: boolean
  testId?: string
}
```

## Rules

- **No raw `<input>` with manual label/error wiring** — use `FormField`.
- **Validation logic lives in `validate` prop**, not scattered across component state. Return a string on error, `null` when valid.
- **`showError` is controlled by the parent.** Set it to `true` on the first submit attempt, not on every keystroke.
- **`endDecorator`** is the slot for things like a password visibility toggle. Replaces the current `PasswordInput` ad-hoc pattern.
- Error messages render via `ErrorMessage` (`src/components/pixel/error-message.tsx`).
- Internally `FormField` uses the existing `.pinput` / `.plabel` CSS classes.

## Current state (before FormField exists)

Existing forms use raw `<input>` elements with manual `useState` validation. They are inconsistent but functional. Refactor them to `FormField` when touching a form, not proactively.

The `PasswordInput` component (`src/components/auth/password-input.tsx`) will become `FormField` with an `endDecorator` toggle button when refactored.

The `Input` component at `src/components/ui/input.tsx` is dead code — do not use it.
