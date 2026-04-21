# Create Domain Page Spec

**Route:** `/domain/new`
**Auth:** Required
**Status:** Partially implemented (basic form exists; needs wizard UI)

---

## Purpose

3-step wizard for claiming a new subdomain. Free users get an auto-generated name; Cosy+ users can pick a custom name. Ends with a connection token the user pastes into their Cosy instance.

---

## Wizard steps

```
[ 1. Plan ] → [ 2. Pick address ] → [ 3. Connect ] → [ ✓ Success ]
```

A step indicator at the top shows the current step (filled circle) and remaining steps (outline circles), connected by a horizontal line.

---

## Step 1 — Choose plan

**Shown only if user has not already chosen (or can change their plan).**

Two option cards side by side:

**Free option (`.panel-flat`):**
- Badge: `.badge.gray` "Free"
- `h3`: "Random mailbox"
- Price: `€0 / forever`
- Description: "Get an auto-generated address like `cosy-castle-42.cosy-hosting.net`"
- Feature bullet: ✓ Automatic TLS
- Select button: `.pbtn.secondary` "Pick a random name"

**Cosy+ option (`.panel` with `.ribbon`):**
- Badge: `.badge` "Cosy+"
- `h3`: "Custom name"
- Price: `€3 / month`
- Description: "Choose exactly what your address will be"
- Feature bullets: ✓ Your chosen name · ✓ Up to 5 domains · ✓ Bring your own domain
- Select button: `.pbtn` "Choose my name"
- If user is already on Cosy+: skip this step entirely and go straight to Step 2 (custom picker)
- If user selects Cosy+ but isn't subscribed: show billing upgrade flow (planned)

---

## Step 2 — Pick address

### Free tier path

**Heading:** "Pick your address"
**Subtext:** "Choose from these available names — yours to keep."

Pre-generated suggestions list (from backend or client-side word list):
- Each suggestion shown as a `.panel-flat` button row: subdomain label + `.cosy-hosting.net` suffix + a `.pbtn.secondary.sm` "Pick this" button
- Clicking a suggestion selects it (highlight with accent border)
- "Refresh suggestions" link generates a new set

Target IP field:
- Label: "Your Cosy instance IP"
- `.pinput` with `placeholder="192.0.2.1"`
- IPv4 format validation

Next button: `.pbtn` "Reserve this address →" — disabled until name + IP selected.

### Cosy+ path

**Heading:** "Choose your address"
**Subtext:** "Type the exact name you want."

Input row:
```
[ my-castle         ].cosy-hosting.net  [Check →]
```
- `.pinput` for subdomain label (lowercase alphanumeric + hyphens, max 63 chars)
- Availability indicator appears after typing stops (300ms debounce):
  - Checking: spinner
  - Available: `.badge.green` "✓ Available"
  - Taken: `.badge.red` "✗ Taken — try another"
  - Reserved: `.badge.gray` "✗ Reserved"

Target IP field (same as free path).

Next button: `.pbtn` "Reserve this address →" — disabled until available + IP filled.

---

## Step 3 — Connect to Cosy

**Heading:** "Almost home!"
**Subtext:** "Paste this token into your Cosy instance to link it to your new address."

**Connection token panel** (`.panel-flat`):
- Label: "Your connection token"
- Monospace token string
- "Copy" button (`.pbtn.secondary.sm`) — copies to clipboard, changes to "Copied ✓" briefly
- Alternative: expandable "Manual DNS setup" section showing the A record details for users who manage DNS themselves

**Status indicators:**
- DNS propagation: "DNS record created · usually propagates in 1–5 minutes"
- TLS: "Certificate pending · will be issued after DNS propagates"

Next button: `.pbtn` "I've connected it →" — navigates to success screen.

---

## Success screen

Shown after completing step 3.

Centered panel with:
- Large animated mailbox illustration placeholder
- `h2`: "You've got a mailbox!"
- Full FQDN in Press Start 2P: `your-name.cosy-hosting.net`
- TLS status badge: `.badge.gray` "⌛ TLS Pending"
- Text: "Your DNS record is live. TLS certificate will be issued automatically in the next few minutes."
- Two actions:
  - `.pbtn` "Go to my mailbox" → `/domain/:uuid`
  - `.pbtn.secondary` "← Back to dashboard" → `/dashboard`

---

## Data

**Step 2 (availability check, Cosy+ only):**
```ts
// Not yet implemented — needs new backend endpoint
GET /api/v1/subdomain/check?label=my-castle
→ { available: boolean, reason?: 'taken' | 'reserved' | 'invalid' }
```

**Step 3 (create):**
```ts
const { createSubdomain } = useDataInteractions();
await createSubdomain({ label: 'my-castle', targetIp: '192.0.2.1' });
// → POST /api/v1/subdomain
// → dispatches upsertSubdomain, returns SubdomainDto with uuid
```

**Redux state:**
- On success: `upsertSubdomain(created)` — domain appears in dashboard list immediately

---

## Validation rules (matching backend)

- Label: 1–63 chars, `/^[a-z0-9][a-z0-9-]*[a-z0-9]$|^[a-z0-9]$/`
- Label: not in reserved list (check on backend; surface as "Reserved" in UI)
- Target IP: valid IPv4 format
- Max 5 subdomains per user (show quota warning if at 4, block if at 5)

---

## Notes

- The subdomain suggestion list for free users can be generated client-side from a word list (adjective + noun + number pattern matching the backend's auto-generation logic), then verified against the backend.
- The connection token is currently the same as the user's JWT identity token. A dedicated per-subdomain token should be issued in a future iteration.
- The wizard step state is local (React `useState`) — no Redux needed until the subdomain is actually created.
