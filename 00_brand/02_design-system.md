# 02 — Design System

## Design philosophy

The site should feel like a magazine that happens to be a website — not a website that happens to look editorial. That distinction shapes every decision below.

Three principles, ranked:
1. **Whitespace is the primary design element.** When in doubt, add space, do not add ornament.
2. **Typography carries the brand.** Imagery supports it, color stays out of the way.
3. **Motion serves comprehension, never decoration.** If an animation does not help the reader understand the page, remove it.

## Color tokens

```css
:root {
  /* Core monochrome */
  --ink-1000:  #0A0A0A;   /* near-black, body on light */
  --ink-900:   #141414;   /* dark surface backgrounds */
  --ink-700:   #2E2E2E;   /* secondary text on light */
  --ink-500:   #6B6B6B;   /* metadata text, captions */
  --ink-300:   #B5B5B5;   /* hairline borders on dark */
  --ink-100:   #E5E5E5;   /* hairline borders on light */
  --paper-50:  #F7F6F3;   /* warm off-white, dominant background */
  --paper-0:   #FFFFFF;   /* card surface, image plates */

  /* Single restrained accent — used <5 times per page */
  --signal:    #9DA5A1;   /* muted neutral-green metallic */

  /* Functional */
  --focus:     #0A0A0A;   /* keyboard focus ring on light */
  --focus-on-dark: #F7F6F3;
}
```

Rules:
- Default light theme uses `--paper-50` background and `--ink-1000` text.
- Dark surfaces (footer, hero overlays) use `--ink-1000` with `--paper-50` text.
- The `--signal` accent appears on **at most one element per section** — usually a tiny live-status dot or an active filter pill. Never on body copy.
- No gradients. No glow effects. No shadows except a single elevation token below.

## Elevation

```css
--shadow-card: 0 1px 0 rgba(10, 10, 10, 0.04), 0 12px 32px -16px rgba(10, 10, 10, 0.12);
```

That's the only shadow on the site. Hover states deepen it slightly; nothing else creates depth.

## Typography system

Two type families. Both available on Google Fonts with no licensing friction.

```css
--font-display: 'Fraunces', 'Times New Roman', serif;   /* editorial display */
--font-body:    'Inter Tight', 'Inter', system-ui, sans-serif;  /* body & UI */
--font-mono:    'JetBrains Mono', 'IBM Plex Mono', monospace;   /* code, metadata labels */
```

Why this pairing: Fraunces gives the site its high-fashion editorial signature without the cliché of using Playfair. Inter Tight handles long-form reading and UI without competing. JetBrains Mono signals technical credibility on metadata.

### Type scale (desktop)

| Token | Size | Line | Letter | Weight | Family | Use |
|---|---|---|---|---|---|---|
| `--t-display-xl` | clamp(80px, 12vw, 220px) | 0.92 | -0.04em | 300 | Fraunces | Hero headline only |
| `--t-display-l` | clamp(56px, 7vw, 120px) | 0.96 | -0.03em | 300 | Fraunces | Section openers |
| `--t-display-m` | clamp(40px, 4.5vw, 72px) | 1.04 | -0.02em | 400 | Fraunces | Concept page titles |
| `--t-headline` | 32px | 1.15 | -0.01em | 500 | Fraunces | Card titles |
| `--t-body-l` | 22px | 1.5 | -0.005em | 400 | Inter Tight | Lede paragraphs |
| `--t-body` | 17px | 1.6 | 0 | 400 | Inter Tight | Default body |
| `--t-body-s` | 14px | 1.55 | 0 | 400 | Inter Tight | Secondary text |
| `--t-meta` | 11px | 1.2 | 0.12em uppercase | 500 | JetBrains Mono | Labels, eyebrows |

### Mobile scale rules
- Hero display caps at 14vw — never lets words break awkwardly.
- All `clamp()` floors are tested at 360px viewport.
- Body never goes below 16px (16px = the legal minimum for senior readers).

### Editorial typography rules
- Hero headline ALWAYS breaks across multiple lines on purpose. Manual line breaks via `<br>` are encouraged.
- Use ligatures and contextual alternates (`font-feature-settings: 'ss01', 'liga', 'calt'`).
- Use real em dashes (—), real curly quotes ("), real ellipses (…). Never two hyphens.
- Hanging punctuation on pull quotes (`hanging-punctuation: first last`).

## Grid system

### Desktop (≥1024px)
- 12 columns, 32px gutter, 96px outer margin (or fluid: `max(96px, 8vw)`)
- Max content width: 1440px centered

### Tablet (640–1023px)
- 8 columns, 24px gutter, 48px outer margin

### Mobile (<640px)
- 4 columns, 16px gutter, 24px outer margin

### Vertical rhythm
- Section padding: `clamp(96px, 14vh, 200px)` top and bottom — generous and consistent
- Sub-section spacing: `64px` desktop, `40px` mobile
- Between paragraph and next heading: `32px`

## Component primitives

### Hairline divider
```css
.hairline { height: 1px; background: var(--ink-100); }
.hairline--dark { background: var(--ink-700); }
```
Used aggressively — between every section, between metadata blocks, around capability rows.

### Eyebrow label
```html
<div class="eyebrow">01 / Capabilities</div>
```
```css
.eyebrow {
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--ink-500);
}
```
Every section opens with one. They are how the editorial rhythm is sustained.

### Big number block
```html
<div class="metric">
  <div class="metric__value">$13M+</div>
  <div class="metric__label">Revenue impact</div>
</div>
```
- Value uses `--t-display-m`, weight 300, monospace tabular figures (`font-variant-numeric: tabular-nums`).
- Label uses `--t-meta`.

### Capability row (interactive list)
A horizontal full-width row, 1px hairline below, 96px tall on desktop. On hover the row darkens, the inactive rows fade to 40% opacity, and a preview image fades in from the right edge.

### Project card (asymmetric)
Three card shapes used randomly to break grid uniformity:
- **Tall**: 5 cols × 720px, image is portrait
- **Wide**: 8 cols × 480px, image is landscape
- **Square**: 4 cols × 480px, image is square

Cards never sit in a perfect 3-col row. There is always intentional offset.

### Quote / pull statement
Display-size text on its own with no card, no quotation marks rendered as decoration — only the typographic curly quotes within the text. A single thin rule above and below.

## Motion system

### Timing tokens
```css
--ease-out: cubic-bezier(0.16, 1, 0.3, 1);   /* default — feels premium */
--ease-io:  cubic-bezier(0.65, 0, 0.35, 1);  /* for reversible transitions */

--dur-micro:  120ms;   /* color, opacity */
--dur-hover:  240ms;   /* hover-state shifts */
--dur-reveal: 640ms;   /* scroll reveals, fade-ins */
--dur-hero:   800ms;   /* hero load sequence beats */
```

### Hero load sequence (total ~1400ms)
| Beat | Element | What | Start | Duration |
|---|---|---|---|---|
| 1 | Background image | scale(1.06)→scale(1) + opacity 0→1 | 0ms | 800ms |
| 2 | Foreground crop | translateY(20px)→0 + opacity 0→1 | 200ms | 700ms |
| 3 | Headline line 1 | translateY(40px)→0 + opacity | 320ms | 720ms |
| 4 | Headline line 2 | translateY(40px)→0 + opacity | 440ms | 720ms |
| 5 | Headline line 3 | translateY(40px)→0 + opacity | 560ms | 720ms |
| 6 | Subheadline | translateY(20px)→0 + opacity | 720ms | 600ms |
| 7 | Metadata labels | opacity 0→1, staggered 80ms each | 880ms | 480ms |

All beats use `--ease-out`.

### Scroll reveal pattern
Single rule for every section:
```
opacity: 0 → 1
translateY(20px) → 0
duration: var(--dur-reveal)
easing: var(--ease-out)
trigger: 15% of element in viewport
runs once
```

Use IntersectionObserver, not a heavy library. Disable entirely when `prefers-reduced-motion: reduce`.

### Capability row hover
- 240ms ease-out on row background and text color
- 320ms on inactive rows fading to opacity 0.4
- 320ms on preview image opacity + 16px translate-X from the right

### Project card hover
- Image: `transform: scale(1.03)` over 400ms
- Card shadow: `--shadow-card` lifts ~30% deeper
- Caption: translateY(-4px)

### Reduced motion
Always respect:
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation: none !important; transition: none !important; }
}
```

## Imagery direction

### Style
- Editorial portrait photography — natural light, neutral backgrounds, thoughtful composition.
- Conceptual still life when a portrait isn't right (architectural details, paper documents on linen, silver hardware).
- Black and white or extremely desaturated. Never full color saturation.
- Generous negative space inside the photo itself.

### Treatment
- All images get a subtle 4% noise overlay to feel like print.
- All images sit inside a 1px `--ink-100` frame on light sections, no frame on dark sections.
- Aspect ratios used: 4:5 (portrait), 16:9 (landscape), 1:1 (square). Nothing else.

### Banned imagery
- Glowing brain
- Blue circuit board grid
- Stock business handshakes
- 3D rendered isometric servers
- Anyone smiling at a laptop
- Hexagonal honeycomb anything

## Iconography

Use **Phosphor Icons** at weight `regular` only. 24px standard, 16px for inline. Stroke-only. No filled variants. No emoji on the site.

## Accessibility floors

- Body text contrast ≥ 7:1 on background (AAA)
- Display text contrast ≥ 4.5:1
- Focus ring visible on every interactive element — 2px solid `--focus` with 3px outline-offset
- All animations under 5s and pausable
- Skip-to-content link in hero
- Semantic HTML5 throughout (`<article>`, `<section>`, `<nav>`, `<aside>`)
- All images have meaningful alt text or empty alt when decorative

## Don'ts (one-page list)

- No carousels except the testimonial section, and only crossfade
- No hover effects on touch devices
- No parallax on body content (only the hero background image)
- No autoplay video
- No ambient music (obviously)
- No newsletter modal
- No exit-intent popup
- No chatbot widget
- No "100% AI-built" badge anywhere
- No glassmorphism, no neon, no gradient text, no glow
