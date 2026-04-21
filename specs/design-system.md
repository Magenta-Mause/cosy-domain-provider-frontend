# Design System — Cosy Domain Provider

Pixel-art / retro aesthetic matching the main Cosy application. Built on Tailwind CSS 3 with a custom CSS layer in `src/index.css`. The design metaphor is a **post office / mailbox** — users "claim an address" on cosy-hosting.net.

---

## Design tokens (CSS custom properties)

All properties defined in `:root` in `src/index.css`.

### Colors (OKLch color space)

| Variable | Light value | Usage |
|---|---|---|
| `--background` | `oklch(79.6% 0.113 58.2)` | Warm sand page background |
| `--secondary-background` | `oklch(88.3% 0.076 58.8)` | Cream panel background |
| `--foreground` | `oklch(37.8% 0.101 23.2)` | Deep ui brown — text, borders |
| `--outline` | `oklab(29.7% 0.084 0.039)` | Focus outlines |
| `--alarm` | `oklch(55.8% 0.209 17.1)` | Alert red |
| `--accent` | `oklch(73.0% 0.132 56.2)` | Wood orange — primary accent |
| `--accent-2` | `oklch(0.65 0.20 135)` | Spring green |
| `--accent-3` | `oklch(0.65 0.10 240)` | Winter blue |
| `--accent-4` | `oklch(0.6 0.22 340)` | Fruit purple |
| `--destructive` | `oklch(0.55 0.22 25)` | Error / delete red |
| `--success` | `oklch(0.58 0.17 150)` | Success green |
| `--link` | `oklch(0.432 0.207 291.8)` | Link blue |
| `--btn-primary` | `oklch(0.378 0.101 23.3)` | Button fill (same as foreground) |
| `--btn-secondary` | `oklch(0.883 0.076 58.8)` | Secondary button fill (cream) |
| `--btn-border` | `oklch(0.378 0.101 23.3)` | Button border |
| `--input-bg` | `oklch(0.883 0.076 58.8)` | Input field background |
| `--input-shadow` | `rgba(132, 66, 57, 0.4)` | Input inset shadow |
| `--shadow` | `oklch(29.9% 0.113 316.8 / 55%)` | Drop shadow |
| `--white` | `oklch(95.0% 0.011 63.1)` | Near-white |

### Dark mode (`.dark` class)

Activates night-sky palette. Applied by the tweaks panel toggle.

| Variable override | Value |
|---|---|
| `--background` | `oklch(0.2 0.08 275)` — night indigo |
| `--secondary-background` | `oklch(0.25 0.1 275)` — dark panel |
| `--foreground` | `oklch(0.92 0.02 280)` — light text |
| `--accent` | `oklch(0.75 0.18 75)` — warm yellow |

---

## Typography

| Font | Class | Usage | Size |
|---|---|---|---|
| VT323 | `.mono` (default body) | All body text, inputs, labels | 20px base |
| Press Start 2P | `.pixel` | Headings, badges, pixel UI labels | varies |

**Heading scale:**
- `h1`: 36px
- `h2`: 26px
- `h3`: 18px
- `h4`: 14px

All headings use `color: var(--btn-primary)` with `text-shadow: 2px 2px 0 rgba(0,0,0,0.08)`.

---

## Component classes

### Panel

```html
<div class="panel">...</div>        <!-- double-border dialogue box -->
<div class="panel-flat">...</div>   <!-- single border, lighter shadow -->
```

`.panel` — double border effect: `border: 3px solid var(--foreground)` + `box-shadow: 0 0 0 3px var(--background), 0 0 0 6px var(--foreground), 8px 8px 0 0 var(--shadow)`. Cream background.

`.panel-flat` — simpler: `border: 3px solid var(--foreground)` + `box-shadow: 4px 4px 0 0 var(--shadow)`.

### Button (`.pbtn`)

```html
<button class="pbtn">Primary</button>
<button class="pbtn secondary">Secondary</button>
<button class="pbtn ghost">Ghost</button>
<button class="pbtn destructive">Delete</button>

<button class="pbtn sm">Small</button>
<button class="pbtn lg">Large</button>
```

Press animation: `:active` translates `(2px, 2px)` and reduces shadow.
Hover: translates `(-1px, -1px)` and increases shadow.

### Input (`.pinput` + `.plabel`)

```html
<label class="plabel">Email</label>
<input class="pinput" type="email" placeholder="you@example.net" />
```

`.pinput`: cream background, 3px border, inset shadow, focus ring using `--accent`.

### Badge (`.badge`)

```html
<span class="badge">Cosy+</span>
<span class="badge green">TLS · 72d</span>
<span class="badge red">Expired</span>
<span class="badge blue">Renewing</span>
<span class="badge gray">Pending</span>
```

Uses Press Start 2P font at 14px. Default fill is `--accent`.

### Ribbon (`.ribbon`)

Corner flag decoration. Absolute-positioned, typically `top: -6px; left: 24px`. Red by default (`var(--destructive)`). Used on featured/highlighted panels.

### Checkbox (`.pcheck`)

```html
<span class="pcheck checked"></span>  <!-- checked state -->
<span class="pcheck"></span>          <!-- unchecked -->
```

20×20px pixel checkbox. `.checked` fills with `--accent-2` and shows `✓`.

---

## Background layers

### `.sky-bg`

Night-sky gradient background with dot stars. Used for auth pages and landing page hero.

```html
<div class="sky-bg">
  <!-- Moon and cloud decorations added manually as absolute divs -->
</div>
```

Gradient: dark indigo (top) → medium blue (bottom). Pseudo-element adds 8 white star dots.

### `.grass-bg`

Green gradient section background. Used for the features strip on the landing page.

---

## Layout utilities

| Class | CSS |
|---|---|
| `.row` | `display:flex; gap:12px; align-items:center` |
| `.col` | `display:flex; flex-direction:column; gap:12px` |
| `.stack-sm` | flex column, 8px gap |
| `.stack-md` | flex column, 16px gap |
| `.stack-lg` | flex column, 24px gap |
| `.grow` | `flex:1` |
| `.center` | `display:flex; align-items:center; justify-content:center` |
| `.muted` | `opacity:0.75` |

---

## Interactive states

`.hover-lift` — on hover: `transform: translate(-2px, -2px)`. Used on cards/panels to indicate clickability.

`.dotloader` — animated 3-dot bounce loader for async states:
```html
<span class="dotloader"><span/><span/><span/></span>
```

---

## Pixel components (React)

Located in `src/components/pixel/`.

### `<Panel>` / `<FlatPanel>`

Wrapper divs applying `.panel` / `.panel-flat`. Accept `children`, `style`, `className`.

`<Panel withRibbon>` adds a `.ribbon` element inside.

### `<Badge color="green|red|blue|gray">`

Renders a `<span class="badge {color}">`.

### `<StatusDot status="online|pending|offline">`

Colored circle with label. Colors:
- online: green `oklch(0.7 0.2 145)`
- pending: amber `oklch(0.75 0.15 70)`
- offline: `var(--destructive)`

### `<Mailbox size={44}>`

CSS-only pixel mailbox icon (body + flag + post). Sized via `width/height`.

### `<Scenery>`

Full-viewport night-sky background with absolute-positioned moon and cloud decorations. Wraps auth and landing pages.

---

## Design metaphor reference

Copy patterns used throughout the UI:

| Context | Copy |
|---|---|
| Hero headline | "Pick a home on the internet." |
| Sign up CTA | "Stake your mailbox" |
| Log in CTA | "Unlock mailbox →" |
| Forgot password | "Lost your key?" |
| Password reset email | "Spare key sent to {email}" |
| Email verification | "Check your mailbox" |
| Subdomain label | "Claim your address" |
| Domain suffix | `.cosy-hosting.net` |
| Free plan name | "Random mailbox" |
| Cosy+ plan name | "Custom names" |
| Feature stops | "Claim an address", "Verify & connect", "Ride the wire" |
| Signpost label | "✦ Free for every Cosy homestead" |

Pixel-art illustration slots (to be filled by art team):
- Hero: pixel-art post office with labeled mailboxes and a cat on the roof (~720×720 webp)
- Auth: pixel envelope / mailbox animations
