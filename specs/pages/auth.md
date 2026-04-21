# Auth Pages Spec

**Routes:** `/login`, `/register`, `/forgot`, `/verify`
**Auth:** Public (login/register redirect to `/dashboard` if already logged in)
**Status:** Login and register are implemented; forgot + verify are not yet built

---

## Shared layout

All auth pages use the `<Scenery>` component (`.sky-bg` night background with moon + cloud decorations) and center a single `.panel` card vertically and horizontally.

```tsx
<Scenery>
  <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px 20px' }}>
    <Panel withRibbon style={{ padding: 32, width: '100%', maxWidth: 440 }}>
      {/* page content */}
    </Panel>
  </div>
</Scenery>
```

---

## OAuth button component

Planned (not yet built). Needed for login and register pages.

```tsx
<OAuthBtn provider="google" onClick={() => ...} />
```

Renders a full-width `.pbtn.secondary` with provider-specific background color, a square glyph badge, and "Continue with {Provider}".

| Provider | Background | Text color | Glyph |
|---|---|---|---|
| Google | cream | foreground | G |
| GitHub | dark gray | white | ⌘ |
| Discord | indigo | white | Ⅾ |
| Microsoft | blue | white | ▢ |
| Apple | near-black | white | ✿ |

Divider between OAuth and email sections: thin horizontal rule with `OR` (Press Start 2P 10px) centered.

---

## Register page (`/register`)

**Heading:** "Stake your mailbox"
**Subtext:** "Already moved in? [Log in](#)"

1. OAuth buttons (5 providers) — planned
2. `OR` divider — planned
3. Email field (`.pinput`, type email)
4. Password field with show/hide toggle `[show]` / `[hide]`
   - Password strength meter: 4 horizontal bars below input
     - Bars fill progressively based on password length
     - `< 8 chars` → red bars + error "Needs at least 8 characters"
     - `8–11 chars` → orange/accent bars
     - `≥ 12 chars` → green (`--accent-2`) bars
5. Terms checkbox: `I accept the [terms] & [privacy policy]`
6. Submit button (`.pbtn.lg`, full width): "Create account →"
   - Disabled until: email filled + password ≥ 8 chars + terms checked
   - While submitting: `<span class="dotloader">` replaces text

**On success:** navigate to `/verify` with email passed as state (email verification flow).

**Prefill:** If navigated from landing page with `?subdomain=my-castle`, the subdomain value is preserved for use during the create-domain wizard after registration.

---

## Login page (`/login`)

**Heading:** "Welcome back"
**Subtext:** "New here? [Sign up](#)"

1. OAuth buttons (5 providers) — planned
2. `OR` divider — planned
3. Email field
4. Password field with show/hide toggle
5. Row: "Remember me" checkbox (left) + "Forgot?" link (right, → `/forgot`)
6. Error state: red error text below password field (e.g. "That key does not fit this mailbox.")
7. Submit button (`.pbtn.lg`, full width): "Unlock mailbox →"
   - Disabled until email + password filled

**On success:** `loginUser(credentials)` → navigate to `/dashboard`.

**Error handling:** Display inline error from API response below the password field.

---

## Forgot password page (`/forgot`)

**Heading:** "Lost your key?"
**Status:** Not yet built

**Step 1 — Request:**
- Subtext: "Enter your email and we'll send you a spare — good for 30 minutes."
- Email field
- Submit: "Send a spare key" button (`.pbtn.lg`, full width), disabled until email filled
- Back link: "← Back to log in"

**Step 2 — Confirmation (after submit):**
- Illustration slot: pixel envelope flying away animation placeholder
- Text: "Spare key sent to **{email}**. Check your mailbox (and your spam shed)."
- Sub-text: "Didn't get it? [Try again]" (resets to step 1)
- Secondary button: "← Back to log in"

**Backend requirement:** Password reset endpoint (not yet built). Needs to send reset email with time-limited token.

---

## Email verification page (`/verify`)

**Heading:** "Check your mailbox"
**Status:** Not yet built

Shown after registration to verify email address.

**Subtext:** "We sent a 6-digit stamp to **{email}**. Paste it below to move in."

**6-digit code input:**
- 6 individual `<input class="pinput">` boxes, `width: 52px; height: 64px`
- Font: Press Start 2P, 28px, centered
- Auto-advance: focus next input on digit entry
- Auto-backspace: focus previous input on backspace when current is empty
- Auto-submit: when all 6 digits filled, validate automatically after 600ms debounce

**States:**
- Loading: "Checking●●●" with `.dotloader`
- Error: `⚠ {message}` in `var(--destructive)` (e.g. "That code is not valid or has expired.")
- Success: navigate to `/dashboard`

**Footer links:** "Didn't arrive? [Resend]" · "Wrong email? [→ register]"

**Backend requirement:** Email verification endpoint (not yet built).

---

## Copy reference

| Moment | Copy |
|---|---|
| Register heading | "Stake your mailbox" |
| Login heading | "Welcome back" |
| Login submit | "Unlock mailbox →" |
| Register submit | "Create account →" |
| Wrong password error | "That key does not fit this mailbox." |
| Forgot heading | "Lost your key?" |
| Forgot submit | "Send a spare key" |
| Forgot confirmation | "Spare key sent to {email}. Check your mailbox (and your spam shed)." |
| Verify heading | "Check your mailbox" |
| Verify subtext | "We sent a 6-digit stamp to {email}. Paste it below to move in." |
| Invalid code | "That code is not valid or has expired." |
