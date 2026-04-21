# Domain Detail Page Spec

**Route:** `/domain/:domainId`
**Auth:** Required
**Status:** Partially implemented (basic edit form exists; needs full design)

---

## Purpose

Shows full details for a single subdomain: TLS certificate health, DNS record, connection instructions, and management actions. Primary place to update the target IP or delete the domain.

---

## Layout

### TLS hero section

Large centered panel at the top of the page — the most prominent element.

**TLS valid state:**
- Big green padlock icon (64×64px, SVG or pixel art)
- `h2` in green: "TLS Active"
- Cert details row: issuer name · expiry date · days remaining
- Progress bar: visual timeline of cert lifetime (issued → expires), current position shown as a dot
- `.badge.green` "🔒 Let's Encrypt · {N}d left"

**TLS renewing state:**
- Blue refresh icon
- `h2` in blue: "Certificate Renewing"
- `.badge.blue` "↻ Auto-renewing · {N}d left"
- Text: "Your certificate is being renewed automatically. No action required."

**TLS pending state (new domain):**
- Gray clock icon
- `h2`: "Awaiting Verification"
- `.badge.gray` "⌛ DNS propagating..."
- Text: "TLS certificate will be issued automatically once DNS propagates (usually 1–5 minutes)."

**TLS expired state:**
- Red warning icon
- `h2` in red: "Certificate Expired"
- `.badge.red` "⚠ Expired {N} days ago"
- Text: "Attempting renewal... If this persists, check that your Cosy instance is reachable."

**TLS not available (FAILED domain):**
- Show inline error state with retry button.

---

## DNS records section

`.panel-flat` section with heading "DNS Record".

| Field | Value |
|---|---|
| Type | A |
| Name | `{label}.cosy-hosting.net` |
| Value | `{targetIp}` |
| TTL | 300s |

**Edit target IP inline:**
- "Edit IP" button (`.pbtn.secondary.sm`) opens an inline edit row
- `.pinput` with current IP pre-filled
- "Save" (`.pbtn.sm`) + "Cancel" (`.pbtn.ghost.sm`)
- On save: `updateSubdomain(uuid, { targetIp })` → backend re-syncs Route53 → status resets to PENDING briefly

**Status badge** for the subdomain itself (ACTIVE / PENDING / FAILED):
- ACTIVE: `.badge.green` "Active"
- PENDING: `.badge.gray` "Updating..."
- FAILED: `.badge.red` "DNS Error"

---

## Connect to Cosy section

`.panel-flat` section with heading "Connect to Cosy".

Subtext: "Use this token to link your Cosy instance to this address. Run the setup wizard in your Cosy admin panel and paste it when prompted."

Connection token display:
- Monospace box with token value
- "Copy" button (`.pbtn.secondary.sm`) → copies, shows "Copied ✓" for 2 seconds
- "Regenerate token" link (`.pbtn.ghost.sm`) — planned feature

Instructions accordion (collapsed by default):
- "How to connect manually" → expands step-by-step DNS/proxy instructions

---

## Domain info section

Small metadata panel:
- Created: `{createdAt}` formatted date
- Last updated: `{updatedAt}` formatted date
- Owner: `{username}`
- Plan: Free / Cosy+

---

## Danger zone section

`.panel` with red left border or heading.

**Heading:** "Danger Zone" (Press Start 2P, destructive color)

**Delete domain:**
- Text: "Permanently removes this address and its DNS record. This cannot be undone."
- `.pbtn.destructive` "Delete this mailbox"
- On click: confirmation dialog (`.panel`) with:
  - "Are you sure? Type the subdomain name to confirm:"
  - `.pinput` — must match the subdomain label exactly
  - "Confirm delete" (`.pbtn.destructive`, disabled until text matches)
  - "Cancel" (`.pbtn.secondary`)

---

## Data

**On mount:**
```ts
const { loadSubdomainByUuid } = useDataLoading();
useEffect(() => { loadSubdomainByUuid(domainId); }, [domainId]);
```

**Read from Redux:**
```ts
const domain = useAppSelector(s => s.subdomains.items.find(d => d.uuid === domainId));
```

**Update IP:**
```ts
const { updateSubdomain } = useDataInteractions();
await updateSubdomain(domainId, { targetIp: newIp });
```

**Delete:**
```ts
const { deleteSubdomain } = useDataInteractions();
await deleteSubdomain(domainId);
// On success: dispatches removeSubdomain, navigates to /dashboard
```

---

## Notes

- TLS certificate data (`tls` object on `SubdomainDto`) is planned but not yet in the backend. Until available, show the "Awaiting Verification" state for all ACTIVE domains.
- The connection token is currently the user's identity token. A dedicated per-subdomain token is planned.
- The page should handle the case where `domainId` is not in the Redux store (navigate back or show a 404 panel).
