# Account Settings Page Spec

**Route:** `/account`
**Auth:** Required
**Status:** Not yet built

---

## Purpose

Allows users to manage their profile, change their password, view active sessions, manage billing (Cosy+), and delete their account.

---

## Layout

Tab-based layout. Vertical sidebar on desktop (left column), scrollable content on right.

**Tabs:**
1. Profile
2. Security
3. Notifications
4. Billing
5. Danger

Tab sidebar uses `.panel-flat` styling. Active tab has accent left border. Clicking navigates to a sub-route or scrolls to section (single-page design is fine for now).

---

## Tab 1 — Profile

**Heading:** "Your mailbox details"

Fields:
- **Username** — `.pinput`, pre-filled from `store.auth.user.username`; validate alphanumeric + hyphens
- **Email address** — `.pinput` type email, pre-filled from `store.auth.user.email`
  - Note: changing email should trigger re-verification (planned)
- **Avatar** — placeholder slot for future avatar upload (show initials avatar for now)

Save button: `.pbtn` "Save changes" — disabled until a field changes.

---

## Tab 2 — Security

### Change password

**Heading:** "Change your key"

Fields:
- Current password (`.pinput` type password)
- New password (`.pinput` type password + strength meter bars, same as register page)
- Confirm new password (`.pinput` type password + match validation)

Submit: `.pbtn` "Update password" — disabled until all fields filled and new passwords match.

Error states: "Current password is incorrect" · "Passwords do not match"

### Active sessions

**Heading:** "Active sessions" (`.stack-md`)

List of active login sessions (planned — requires backend session tracking):
- Each row: browser/device info · location · last active timestamp · "Revoke" (`.pbtn.destructive.sm`)
- "Revoke all other sessions" button at bottom

**Current implementation:** Not available — session data is not tracked. Show placeholder: "Session management coming soon."

---

## Tab 3 — Notifications

**Heading:** "Notifications"

Toggle list (`.pcheck` style):
- Email me when a TLS certificate is about to expire (3 days before)
- Email me when a TLS certificate fails to renew
- Email me when my target IP changes from the registered IP (suspicious change alert)
- Product updates and announcements from the Cosy team

Save button: `.pbtn` "Save preferences"

**Current implementation:** Not available — no notification preferences exist in the backend. Show placeholder panel with coming-soon message.

---

## Tab 4 — Billing

**Heading:** "Your plan"

**Current plan card:**
- Free: `.badge.gray` "Free" · "Random mailbox · €0/forever" · Upgrade CTA
- Cosy+: `.badge` "Cosy+" · "Custom names · €3/month" · Next billing date · Cancel option

**Upgrade flow (Free → Cosy+):**
- `.pbtn` "Upgrade to Cosy+" → Stripe checkout (planned)
- Cosy+ benefits reminder (same as landing page pricing table)

**Cosy+ active state:**
- Next billing date
- Payment method (last 4 digits of card)
- "Update payment method" link
- "Cancel subscription" → confirmation dialog, downgrades at period end

**♥ Support copy:** "Your Cosy+ subscription directly supports the core team building the Cosy platform. Thank you!"

**Current implementation:** Not available — no billing system exists. Show "Billing coming soon" placeholder with a brief description of what Cosy+ unlocks.

---

## Tab 5 — Danger

**Heading:** "Danger Zone"

**Delete account:**
- Warning text: "Permanently deletes your account and all associated mailboxes. DNS records will be removed. This cannot be undone."
- "I understand, delete my account" button (`.pbtn.destructive`)
- Confirmation dialog:
  - "Type your username to confirm:"
  - `.pinput` — must exactly match `store.auth.user.username`
  - "Delete account forever" (`.pbtn.destructive`, disabled until text matches)
  - "Cancel" (`.pbtn.secondary`)

On confirmed delete: logout, navigate to landing page, show brief confirmation message.

---

## Data

**Profile save:**
```ts
// Requires new backend endpoint: PATCH /api/v1/user (planned)
await updateProfile({ username, email });
```

**Password change:**
```ts
// Requires new backend endpoint: POST /api/v1/auth/change-password (planned)
await changePassword({ currentPassword, newPassword });
```

**Account delete:**
```ts
// Requires new backend endpoint: DELETE /api/v1/user (planned)
await deleteAccount();
```

All backend endpoints for this page are planned but not yet built.

---

## Notes

- Since most functionality here is planned, initially render the tab shell with content stubs so the navigation structure is in place for incremental implementation.
- The profile tab (username/email display) can be implemented immediately using `store.auth.user` data even without a save API.
- On mobile, collapse the tab sidebar into a dropdown or horizontal scroll.
