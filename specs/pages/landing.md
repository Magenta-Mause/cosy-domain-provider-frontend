# Landing Page Spec

**Route:** `/`
**Auth:** Public (redirects to `/dashboard` if already logged in)
**Status:** Not yet built

## Purpose

Marketing page that explains what Cosy Domain Provider is, lets visitors claim a subdomain immediately, and converts them to sign up. First impression of the post-office metaphor.

---

## Layout

### Nav bar

Sticky top bar on `.sky-bg`:
- Left: Mailbox icon + "COSY" (Press Start 2P) + "domain provider" (VT323) wordmark
- Center: `Features` · `Pricing` · `FAQ` anchor links
- Right: `Log in` (`.pbtn.secondary.sm`) + `Sign up` (`.pbtn.sm`) buttons

### Hero section

Two-column grid (`1.1fr 1fr`), centered, `max-width: 1200px`.

**Left column:**
- Signpost pill (`.signpost`): `✦ Free for every Cosy homestead`
- `h1` (48px): "Pick a home on the internet." — warm cream color, pixel text shadow
- Subtext paragraph (22px): "Cosy Domain Provider gives your self-hosted Cosy server a friendly address on **cosy-hosting.net** — with automatic TLS, so the little green padlock stays happy."
- **Inline subdomain claim panel** (`.panel-flat`):
  - Label: "Claim your address"
  - Input: `.pinput` with `placeholder="my-castle"` and `.cosy-hosting.net` suffix (absolute-positioned inside input)
  - Lowercase alphanumeric + hyphens only (sanitize on change)
  - `Check →` button → navigates to `/register` with subdomain prefilled
- Reassurance row: `✓ Free tier: 1 random address` · `✓ Custom names on Cosy+` · `✓ Auto TLS renewal`

**Right column:**
- Illustration placeholder (to be replaced by art team):
  - ~440px tall, `.panel-flat` with warm background
  - Placeholder label: "A cosy pixel-art post office with mailboxes labeled with subdomains. Cat on the roof is recommended. ~720×720 · webp"

### Features strip (`#features`)

`.grass-bg` background section. Centered header:
- `h2`: "Three stops at the post office"
- Subtext: "Everything you need to mail packets to your home server."

3-column grid of `.panel-flat.hover-lift` cards:

| Stop | Title | Body |
|---|---|---|
| STOP 01 | Claim an address | Pick a free subdomain on cosy-hosting.net or bring a custom one with Cosy+. |
| STOP 02 | Verify & connect | One-time token pasted into your Cosy instance. We handle the DNS. |
| STOP 03 | Ride the wire | Automatic Let's Encrypt TLS, renewed while you sleep. |

Stop number in Press Start 2P 14px, colored with `var(--btn-primary)`.

### Pricing section (`#pricing`)

Standard `var(--background)` background. Centered header:
- `h2`: "Two ways to move in"
- Subtext: "Every Cosy user gets a free mailbox. Upgrade to pick the name on it."

2-column grid:

**Free tier panel** (`.panel`):
- Badge: `.badge.gray` "Free"
- `h3`: "Random mailbox"
- Price: Press Start 2P 26px `€0 / forever`
- Feature list:
  - ✓ One auto-generated subdomain (e.g. cosy-castle-42)
  - ✓ Automatic TLS certificates
  - ✓ Unlimited renewals
  - ✗ Cannot choose the name (muted)
- CTA: `.pbtn.secondary` "Get a random address" → `/register`

**Cosy+ panel** (`.panel` with `.ribbon` and accent border):
- Badge: `.badge` "Cosy+"
- `h3`: "Custom names"
- Price: Press Start 2P 26px `€3 / month`
- Feature list:
  - ✓ Pick your exact subdomain
  - ✓ Up to 5 domains per account
  - ✓ Bring your own domain (CNAME)
  - ✓ Priority TLS renewal queue
  - **♥ Your subscription supports the Cosy core team** (colored `--accent-4`, bold)
- CTA: `.pbtn` "Upgrade to Cosy+" → `/register?plan=plus`

### Footer

Centered, muted: `Made with ♥ by Medalheads · cosy-hosting.net`

---

## Data

No API calls on this page. The subdomain availability check happens after navigating to `/register`.

---

## Interactions

- Subdomain input: sanitize to `[a-z0-9-]` on each keystroke
- "Check →" button: navigate to `/register` passing subdomain value as route/search param
- Nav links: smooth-scroll to `#features`, `#pricing`, `#faq` anchors
- "Log in" / "Sign up": navigate to `/login` / `/register`

---

## Notes

- This page does **not** exist in the current implementation (the app starts at a demo counter page). It needs to be built as a full marketing page.
- The `.sky-bg` night gradient is used for the nav + hero; `.grass-bg` for features; plain `--background` for pricing.
- The hero illustration slot should degrade gracefully without the pixel art asset.
