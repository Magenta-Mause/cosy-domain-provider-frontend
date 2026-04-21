# Dashboard Page Spec

**Route:** `/dashboard`
**Auth:** Required (redirects to `/login` if not authenticated)
**Status:** Partially implemented (basic table exists; needs design upgrade)

---

## Purpose

The user's home screen after login. Shows all their claimed subdomains as a list of "mailboxes", each with TLS status, target IP, and quick actions. Entry point for creating new domains and editing existing ones.

---

## Layout

### Header strip

Row across the top:
- Left: `h2` "My Mailboxes" (or "My Addresses")
- Right: `.pbtn` "✉ Claim new address" → navigate to `/domain/new`

### Stats strip

Horizontal row of 3 stat tiles (`.panel-flat`):
- **Total domains** — count of `store.subdomains.items`
- **Active** — count with `status === 'ACTIVE'`
- **TLS healthy** — count with `tls.status === 'valid'` (when TLS tracking is implemented)

Each tile: small muted label + large number in Press Start 2P.

### Domain list

One card per subdomain, rendered as `.panel-flat.hover-lift`. Cards are a vertical list (not a grid).

**Each domain card contains:**

Left side:
- `<StatusDot status="online|pending|offline">` — derived from `SubdomainDto.status` (ACTIVE → online, PENDING → pending, FAILED → offline)
- Subdomain label in Press Start 2P (large, e.g. "castle")
- Full FQDN in VT323 muted (e.g. "castle.cosy-hosting.net")
- Target IP address (VT323 small, muted)

Right side:
- TLS badge (`.badge` with color):
  - ACTIVE + cert valid → `.badge.green` "🔒 TLS · {days}d left"
  - ACTIVE + cert renewing → `.badge.blue` "↻ Renewing · {days}d left"
  - PENDING → `.badge.gray` "⌛ Awaiting verify"
  - ACTIVE + cert expired → `.badge.red` "⚠ Expired"
  - No cert data → `.badge.gray` "no cert"
- Plan badge: `.badge` "Cosy+" or `.badge.gray` "Free"
- "Last check: {time ago}" — muted VT323 text
- Action buttons:
  - `.pbtn.secondary.sm` "Edit" → navigate to `/domain/:uuid`
  - `.pbtn.destructive.sm` "Delete" → inline confirmation or modal

### Empty state

When `store.subdomains.items.length === 0`:

Centered `.panel` with:
- Mailbox illustration placeholder
- `h3`: "No mailboxes yet"
- Text: "Claim your first address on cosy-hosting.net"
- `.pbtn` "Claim an address →" → `/domain/new`

### Loading state

While `store.subdomains.state === 'loading'`: show 3 skeleton cards (`.panel-flat` with gray shimmer blocks).

---

## Data

**On mount:**
```ts
const { loadSubdomains } = useDataLoading();
useEffect(() => { loadSubdomains(); }, []);
```

**Redux state consumed:**
```ts
const { items, state } = useAppSelector(s => s.subdomains);
```

**Delete action:**
```ts
const { deleteSubdomain } = useDataInteractions();
await deleteSubdomain(uuid); // dispatches removeSubdomain on success
```

---

## Interactions

- **Card click** (anywhere except action buttons): navigate to `/domain/:uuid`
- **Edit button**: navigate to `/domain/:uuid`
- **Delete button**: show inline confirmation text ("Are you sure? This removes the DNS record.") with "Confirm delete" (`.pbtn.destructive.sm`) and "Cancel" (`.pbtn.ghost.sm`)
- **"Claim new address"**: navigate to `/domain/new`

---

## TLS status derivation

TLS certificate state is not currently tracked in the backend (`SubdomainDto` has `status` but no cert fields). The spec anticipates a future `tls` object on `SubdomainDto`:

```ts
tls?: {
  status: 'valid' | 'renewing' | 'pending' | 'expired'
  expiresDays: number
  issuer: string
}
```

Until this is available, show `.badge.gray` "TLS pending" for all ACTIVE domains and `.badge.gray` "⌛ Awaiting verify" for PENDING.

---

## Notes

- The current implementation shows a plain HTML table. Replace with the card layout described above.
- Domain cards should load immediately from Redux store on subsequent visits (no re-fetch unless explicitly refreshed).
- The "Claim new address" button should be prominently placed — it is the primary action on this page.
