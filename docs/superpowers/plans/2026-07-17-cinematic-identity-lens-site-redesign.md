# Cinematic Identity-Lens Site Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

## Status — reconciled 2026-07-17

All ten tasks are implemented on `feat/recruiter-first`. The checkboxes below were
reconciled against the commit history after the fact; each task maps to the commits
listed here.

| Task | Commits |
| --- | --- |
| 1. Token and typography foundation | `ed8c72f`, `b9c0a71` |
| 2. Shared cinematic brand primitives | `e587bbc`, `6a31e51` |
| 3. Global shell and shared primitives | `c574147`, `6718b16` |
| 4. Recruiter homepage in three locales | `6278bdc`, `944ac23` |
| 5. Work indexes and details | `d658472`, `19e2e3f` |
| 6. Personal and recruiter-action pages | `a6d0471`, `70336e8`, `37fc507` |
| 7. Knowledge indexes, details, Decision Log | `2890f3f` |
| 8. Legal pages and static locale contracts | `36fd296` |
| 9. Browser audits and visual defect fixes | `0e09795`, `81d8fd4` |
| 10. Final verification and handoff | `3725879`, `1ab035b`, `19f6f9c`, `710b90e` |

Verification at `710b90e`, from a clean build: 51/51 contract tests pass, 223 routes
build, 110/110 Playwright audits pass across desktop and mobile, and all 17
representative EN/FR/ES routes and assets return HTTP 200.

Task 10 additionally removed nine components left without consumers and dropped the
unused React runtime, `framer-motion`, the icon set, and three never-loaded font
families. `@astrojs/mdx` was deliberately retained: the content globs still admit
`.mdx` sources.

**Merge remains blocked** on Yoann's explicit approval, per the plan's constraint.

**Goal:** Apply the approved cinematic identity-lens design consistently to every existing page and locale while preserving recruiter-first content, static rendering, accessibility, and route parity.

**Architecture:** Introduce the design at the token and shared-component layers, then migrate each route family to a shared renderer that accepts `locale`. The homepage alone receives the full portrait lens; secondary pages share cinematic intros, scene headings, evidence rows, and article framing. Contract and browser tests enforce the palette, rejected-element exclusions, locale parity, responsive safety, and route coverage.

**Tech Stack:** Astro 6, TypeScript, Tailwind CSS 4, CSS custom properties, lightweight SVG, Node test runner, Playwright browser tests, `@fontsource-variable/archivo`, `@fontsource-variable/inter`, and `@fontsource/azeret-mono`.

## Global Constraints

- Dominant background: `#FFFFFF`; quiet surface: `#F3F3F1`.
- Primary information colors: `#050505` and `#24262B`.
- Secondary colors are exact: purple `#9151F6`, coral `#E7615F`, dark green `#087A55`.
- Purple is not used for small normal-weight text on white; primary CTAs remain white on black.
- The homepage shows the optimized full-color portrait through `<picture>` with explicit `960 × 1280` dimensions and a JPEG fallback.
- Keep the black orbit typography; do not add sweeping color ribbons or colored portrait arc fragments.
- English, French, and Spanish equivalents share one renderer and differ only in localized copy and URLs.
- Do not invent project facts, dates, employers, metrics, testimonials, or unpublished case-study content.
- Preserve Astro static rendering; do not add autoplay video, canvas animation, a CMS, or a runtime localization service.
- All content is visible without JavaScript and `prefers-reduced-motion: reduce` yields the final static state.
- Preserve root-only browser-language selection and explicit saved-language preference.
- Preserve all existing routes; the production build must continue to generate 223 routes.
- Do not merge to `main` without Yoann's explicit approval after the implementation review.

---

## File Structure

### Create

- `src/components/brand/IdentityLens.astro` — portrait lens and black orbit typography.
- `src/components/brand/CinematicIntro.astro` — shared secondary-page intro variants.
- `src/components/brand/DecisionTrace.astro` — direction/system/adoption strip.
- `src/components/brand/SceneHeading.astro` — cinematic section heading.
- `src/components/brand/EvidencePanel.astro` — grouped supported metrics.
- `src/components/brand/MissionRow.astro` — named achievement evidence row.
- `src/components/brand/ArticleFrame.astro` — shared long-form header and reading column.
- `src/components/pages/AboutPage.astro`
- `src/components/pages/CapabilitiesPage.astro`
- `src/components/pages/ContactPage.astro`
- `src/components/pages/HirePage.astro`
- `src/components/pages/NowPage.astro`
- `src/components/pages/InsightsIndex.astro`
- `src/components/pages/ConceptsIndex.astro`
- `src/components/pages/LegalPage.astro`
- `src/components/pages/DecisionIndex.astro`
- `src/components/pages/WorkDetail.astro`
- `src/components/pages/InsightDetail.astro`
- `src/components/pages/ConceptDetail.astro`
- `playwright.config.ts`
- `tests/ui-audit.spec.ts`

### Modify

- `package.json`
- `src/styles/tokens.css`
- `src/styles/global.css`
- `src/layouts/Layout.astro`
- `src/components/layout/Header.astro`
- `src/components/layout/Footer.astro`
- `src/components/layout/Container.astro`
- `src/components/layout/Section.astro`
- `src/components/primitives/Heading.astro`
- `src/components/primitives/Eyebrow.astro`
- `src/components/primitives/Prose.astro`
- `src/components/primitives/MetricBlock.astro`
- `src/components/pages/RecruiterHome.astro`
- `src/components/pages/WorkIndex.astro`
- `src/components/sections/RecruiterHero.astro`
- `src/components/sections/AchievementCard.astro`
- `src/components/sections/ProofStrip.astro`
- `src/components/visuals/CaseDiagram.astro`
- `src/data/localized-site.ts`
- `src/data/achievements.ts`
- all route wrappers listed in Tasks 6–8
- `tests/brand-content.test.mjs`

### Remove after consumers migrate

- No public route is removed.
- Remove obsolete component implementations only when `rg` confirms zero imports; likely candidates are the old internal markup in `RecruiterHero.astro`, `AchievementCard.astro`, and `ProofStrip.astro`, which may become thin compatibility wrappers during migration.

---

### Task 1: Establish the cinematic token and typography foundation

**Files:**
- Modify: `tests/brand-content.test.mjs`
- Modify: `package.json`
- Modify: `src/layouts/Layout.astro`
- Modify: `src/styles/tokens.css`
- Modify: `src/styles/global.css`

**Interfaces:**
- Produces CSS variables `--ink-1000`, `--ink-900`, `--paper-0`, `--paper-50`, `--signal-intelligence`, `--signal-change`, `--signal-outcome`, `--font-display`, `--font-body`, and `--font-mono`.
- Later tasks consume these tokens only; they must not hardcode alternative cobalt, indigo, cyan, rose, or pastel surface values.

- [x] **Step 1: Add the failing token contract**

Append this test to `tests/brand-content.test.mjs`:

```js
test('defines the approved cinematic identity-lens tokens', () => {
  const tokens = read('src/styles/tokens.css');
  const layout = read('src/layouts/Layout.astro');

  for (const declaration of [
    '--ink-1000: #050505',
    '--ink-900: #24262B',
    '--paper-0: #FFFFFF',
    '--paper-50: #F3F3F1',
    '--signal-intelligence: #9151F6',
    '--signal-change: #E7615F',
    '--signal-outcome: #087A55',
  ]) assert.ok(tokens.includes(declaration), `missing ${declaration}`);

  assert.ok(tokens.includes("--font-display: 'Archivo Variable'"));
  assert.ok(tokens.includes("--font-mono: 'Azeret Mono'"));
  assert.ok(layout.includes("@fontsource-variable/archivo"));
  assert.ok(layout.includes("@fontsource/azeret-mono"));
  assert.doesNotMatch(tokens, /--signal:\s*#2446FF/i);
});
```

- [x] **Step 2: Run the test and confirm the expected failure**

Run: `npm test`

Expected: FAIL in `defines the approved cinematic identity-lens tokens` because the new variables and font imports do not exist.

- [x] **Step 3: Install fonts and replace the root tokens**

Run:

```bash
npm install @fontsource-variable/archivo @fontsource/azeret-mono
```

Replace the core portions of `src/styles/tokens.css` with:

```css
:root {
  --ink-1000: #050505;
  --ink-900: #24262B;
  --ink-700: #45484E;
  --ink-500: #676970;
  --ink-300: #B9BBC0;
  --ink-100: #DEDFDF;
  --paper-50: #F3F3F1;
  --paper-0: #FFFFFF;

  --signal-intelligence: #9151F6;
  --signal-change: #E7615F;
  --signal-outcome: #087A55;
  --signal: var(--signal-intelligence);
  --signal-glow: #F0E9FE;
  --signal-success: var(--signal-outcome);

  --focus: var(--signal-intelligence);
  --focus-on-dark: #FFFFFF;

  --font-display: 'Archivo Variable', 'Inter Tight Variable', sans-serif;
  --font-body: 'Inter Variable', sans-serif;
  --font-mono: 'Azeret Mono', 'JetBrains Mono', monospace;

  --radius-scene: clamp(1.75rem, 3vw, 3rem);
  --radius-group: clamp(1.375rem, 2vw, 2.125rem);
  --radius-control: 999px;
  --shadow-scene: 0 30px 80px rgba(5, 5, 5, 0.13);
  --ease-cinematic: cubic-bezier(0.16, 1, 0.3, 1);
}
```

Import the fonts at the top of `src/layouts/Layout.astro`:

```astro
import '@fontsource-variable/archivo';
import '@fontsource-variable/inter';
import '@fontsource/azeret-mono';
import '@fontsource/azeret-mono/600.css';
```

Update `src/styles/global.css` so the body uses `var(--paper-0)`, map all three semantic colors in `@theme`, and add:

```css
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
  }
}

.scene-surface {
  border-radius: var(--radius-scene);
  background: var(--paper-50);
}

.cinematic-reveal {
  opacity: 1;
  transform: none;
}

html.js .cinematic-reveal:not(.is-revealed) {
  opacity: 0;
  transform: translateY(2rem);
}
```

- [x] **Step 4: Verify the foundation**

Run: `npm test && npm run build`

Expected: all current contract tests PASS and the build still reports 223 generated pages.

- [x] **Step 5: Commit**

```bash
git add package.json package-lock.json tests/brand-content.test.mjs src/layouts/Layout.astro src/styles/tokens.css src/styles/global.css
git commit -m "feat: establish cinematic brand tokens"
```

---

### Task 2: Build the shared cinematic brand primitives

**Files:**
- Create: `src/components/brand/IdentityLens.astro`
- Create: `src/components/brand/CinematicIntro.astro`
- Create: `src/components/brand/DecisionTrace.astro`
- Create: `src/components/brand/SceneHeading.astro`
- Create: `src/components/brand/EvidencePanel.astro`
- Create: `src/components/brand/MissionRow.astro`
- Create: `src/components/brand/ArticleFrame.astro`
- Modify: `tests/brand-content.test.mjs`

**Interfaces:**
- `IdentityLens`: `{ alt: string; orbitLabel: string; eager?: boolean }`.
- `CinematicIntro`: `{ eyebrow: string; title: string; summary?: string; variant?: 'index' | 'detail' | 'utility'; accent?: 'intelligence' | 'change' | 'outcome' }` plus default slot for actions.
- `DecisionTrace`: `{ label: string; principle: string; steps: Array<{ label: string; title: string; signal: 'change' | 'intelligence' | 'outcome' }> }` and exactly three steps.
- `SceneHeading`: `{ eyebrow: string; title: string; summary?: string; accent?: 'intelligence' | 'change' | 'outcome'; tone?: 'light' | 'dark' }`.
- `EvidencePanel`: `{ label: string; note: string; metrics: Array<{ value: string; label: string; description?: string; signal: 'change' | 'intelligence' | 'outcome' }> }`.
- `MissionRow`: `{ achievement: Achievement; labels: AchievementLabels; index: number }`.
- `ArticleFrame`: `{ eyebrow: string; title: string; dek?: string; metadata?: string[] }` plus default slot.

- [x] **Step 1: Add failing component contracts**

Append:

```js
test('provides bounded cinematic brand primitives', () => {
  const expected = [
    'IdentityLens', 'CinematicIntro', 'DecisionTrace', 'SceneHeading',
    'EvidencePanel', 'MissionRow', 'ArticleFrame',
  ];
  for (const name of expected) {
    const path = `src/components/brand/${name}.astro`;
    assert.ok(existsSync(path), `missing ${path}`);
  }

  const lens = read('src/components/brand/IdentityLens.astro');
  assert.ok(lens.includes('/images/portrait-960.webp'));
  assert.ok(lens.includes('/images/portrait.jpeg'));
  assert.ok(lens.includes('identity-orbit'));
  assert.doesNotMatch(lens, /#9151F6|#E7615F|#087A55|lens-ring|ribbon/i);
});
```

- [x] **Step 2: Run and confirm failure**

Run: `npm test`

Expected: FAIL because `src/components/brand/IdentityLens.astro` and its sibling primitives do not exist.

- [x] **Step 3: Implement `IdentityLens.astro`**

Create:

```astro
---
interface Props { alt: string; orbitLabel: string; eager?: boolean; }
const { alt, orbitLabel, eager = false } = Astro.props;
---

<figure class="identity-lens" data-identity-lens>
  <div class="identity-lens__portrait">
    <picture>
      <source srcset="/images/portrait-960.webp" type="image/webp" />
      <img
        src="/images/portrait.jpeg"
        alt={alt}
        width="960"
        height="1280"
        loading={eager ? 'eager' : 'lazy'}
        fetchpriority={eager ? 'high' : 'auto'}
        decoding="async"
      />
    </picture>
  </div>
  <svg class="identity-lens__orbit" viewBox="0 0 600 600" aria-hidden="true">
    <defs><path id="identity-orbit" d="M300,300 m-286,0 a286,286 0 1,1 572,0 a286,286 0 1,1 -572,0" /></defs>
    <text><textPath href="#identity-orbit">{orbitLabel}</textPath></text>
  </svg>
</figure>

<style>
  .identity-lens { position: relative; aspect-ratio: 1; margin: 0; }
  .identity-lens__portrait {
    position: absolute; inset: 11%; overflow: hidden; border-radius: 50%;
    background: var(--paper-50); box-shadow: var(--shadow-scene);
  }
  .identity-lens__portrait picture, .identity-lens__portrait img { display: block; width: 100%; height: 100%; }
  .identity-lens__portrait img { object-fit: cover; object-position: center 24%; }
  .identity-lens__orbit { position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; }
  .identity-lens__orbit text {
    fill: var(--ink-1000); font-family: var(--font-mono); font-size: 13px;
    font-weight: 700; letter-spacing: 4px; text-transform: uppercase;
  }
  html.js .identity-lens__portrait { animation: iris-open 1.05s var(--ease-cinematic) both 180ms; }
  @keyframes iris-open {
    from { opacity: 0; clip-path: circle(0 at 50% 50%); transform: scale(.92); }
    to { opacity: 1; clip-path: circle(72% at 50% 50%); transform: none; }
  }
  @media (prefers-reduced-motion: reduce) { .identity-lens__portrait { animation: none; } }
</style>
```

- [x] **Step 4: Implement the remaining primitives using the declared interfaces**

Use semantic markup and token-only colors. The core structure for `CinematicIntro.astro` is:

```astro
---
interface Props {
  eyebrow: string;
  title: string;
  summary?: string;
  variant?: 'index' | 'detail' | 'utility';
  accent?: 'intelligence' | 'change' | 'outcome';
}
const { eyebrow, title, summary, variant = 'index', accent = 'intelligence' } = Astro.props;
---
<header class:list={['cinematic-intro', `cinematic-intro--${variant}`]} data-accent={accent}>
  <p class="cinematic-intro__eyebrow">{eyebrow}</p>
  <h1>{title}</h1>
  {summary && <p class="cinematic-intro__summary">{summary}</p>}
  <div class="cinematic-intro__actions"><slot /></div>
</header>
```

`DecisionTrace.astro` must reject any non-three-step payload at build time:

```astro
---
interface Step { label: string; title: string; signal: 'change' | 'intelligence' | 'outcome'; }
interface Props { label: string; principle: string; steps: [Step, Step, Step]; }
const { label, principle, steps } = Astro.props;
---
<section class="decision-trace" aria-label={label}>
  <div class="decision-trace__intro"><span>{label}</span><strong>{principle}</strong></div>
  {steps.map((step) => <div class="decision-trace__step" data-signal={step.signal}><b>{step.title}</b><span>{step.label}</span></div>)}
</section>
```

Implement `SceneHeading`, `EvidencePanel`, `MissionRow`, and `ArticleFrame` with the interfaces above, one H1 only in `CinematicIntro`/`ArticleFrame`, headings below that at H2/H3, and no hardcoded copy.

- [x] **Step 5: Verify and commit**

Run: `npm test && npm run build`

Expected: PASS, 223 pages, no component import error.

```bash
git add src/components/brand tests/brand-content.test.mjs
git commit -m "feat: add cinematic brand primitives"
```

---

### Task 3: Redesign the global shell and shared primitives

**Files:**
- Modify: `src/components/layout/Header.astro`
- Modify: `src/components/layout/Footer.astro`
- Modify: `src/components/layout/Container.astro`
- Modify: `src/components/layout/Section.astro`
- Modify: `src/components/primitives/Heading.astro`
- Modify: `src/components/primitives/Eyebrow.astro`
- Modify: `src/components/primitives/Prose.astro`
- Modify: `src/components/primitives/MetricBlock.astro`
- Modify: `src/layouts/Layout.astro`
- Modify: `tests/brand-content.test.mjs`

**Interfaces:**
- Header continues to derive `lang` from `Astro.currentLocale`, keeps `data-lang-switch`, and preserves the current focus-trap API.
- `Heading.astro` and `Prose.astro` remain backwards compatible with current call sites.
- Layout continues to expose its default slot inside `#main-content`.

- [x] **Step 1: Extend shell contracts**

Add assertions:

```js
test('keeps the cinematic shell accessible and locale aware', () => {
  const header = read('src/components/layout/Header.astro');
  const footer = read('src/components/layout/Footer.astro');
  const layout = read('src/layouts/Layout.astro');
  const prose = read('src/components/primitives/Prose.astro');
  assert.ok(header.includes('aria-current'));
  assert.ok(header.includes("event.key === 'Escape'"));
  assert.ok(header.includes('data-lang-switch'));
  assert.ok(header.includes('preferred-lang'));
  assert.ok(footer.includes("Astro.currentLocale"));
  assert.ok(layout.includes("if (path !== '/') return"));
  assert.ok(layout.includes('navigator.languages'));
  assert.ok(layout.includes("localStorage.getItem('preferred-lang')"));
  assert.ok(layout.includes('window.location.replace(homeFor(targetLang))'));
  assert.ok(prose.includes('max-width'));
  assert.doesNotMatch(header + footer, /#2446FF|surface-indigo|surface-purple/i);
});
```

- [x] **Step 2: Confirm the shell test fails before styling migration**

Run: `npm test`

Expected: FAIL because legacy cobalt/pastel references are still present.

- [x] **Step 3: Update the shell**

Keep the current interaction script byte-for-byte. Change only presentation and token references on these existing elements:

| Existing element | Required presentation |
|---|---|
| `#global-header` | Fixed shell with `px-4 py-4 sm:px-8 lg:px-[max(72px,6vw)]` and no decorative border lines |
| Direct inner wrapper | `max-w-[1440px]`, minimum 56px height, white at 95% opacity, fully rounded, subtle black shadow |
| Logo link | Black wordmark, purple dot, visible keyboard focus |
| Desktop navigation | Anthracite labels, black current item, purple current marker, unchanged localized hrefs |
| `[data-lang-switch]` controls | Same labels and storage behavior, 44px practical target, black active state |
| Recruiter CTA | White-on-black pill; no accent fill |
| Mobile menu trigger and `#mobile-menu-overlay` | Black controls on white, unchanged ARIA and Escape behavior, no pastel/glass panel |

The wrapper's target classes are `mx-auto flex min-h-14 max-w-[1440px] items-center justify-between rounded-full bg-paper-0/95 px-5 shadow-[0_10px_32px_rgba(5,5,5,.08)]`.

Use black for the primary CTA, `var(--signal-intelligence)` for the logo dot and focus/active graphics, and `var(--paper-0)` for the menu. Do not add colored portrait arcs, glass cards, or multiple accent lines.

Update `Footer.astro` to one anthracite scene with `border-radius: var(--radius-scene) var(--radius-scene) 0 0`, existing localized links, and no new copy.

Update `Prose.astro` to use `max-width: 72ch`, black headings, anthracite body text, quiet rules, horizontally scrollable tables, and accent links that also use underlines.

- [x] **Step 4: Verify keyboard and build contracts**

Run: `npm test && npm run build`

Expected: PASS and 223 pages.

- [x] **Step 5: Commit**

```bash
git add src/layouts/Layout.astro src/components/layout src/components/primitives tests/brand-content.test.mjs
git commit -m "feat: apply cinematic global shell"
```

---

### Task 4: Implement the approved recruiter homepage in all three locales

**Files:**
- Modify: `src/data/localized-site.ts`
- Modify: `src/components/sections/RecruiterHero.astro`
- Modify: `src/components/sections/AchievementCard.astro`
- Modify: `src/components/sections/ProofStrip.astro`
- Modify: `src/components/pages/RecruiterHome.astro`
- Modify: `src/pages/index.astro`
- Modify: `src/pages/fr/index.astro`
- Modify: `src/pages/es/index.astro`
- Modify: `tests/brand-content.test.mjs`

**Interfaces:**
- `RecruiterHome({ locale: Locale })` remains the only home renderer.
- `RecruiterHero` consumes localized `RecruiterHeroCopy`, `primaryHref`, and `secondaryHref` and composes `IdentityLens`.
- Home section order remains `hero`, `decision-trace`, `achievements`, `proof`, `capabilities`, `recruiter-fit`, `thinking`, `contact-close` in every locale.

- [x] **Step 1: Change the parity contract to the approved structure**

Replace the home section list in the existing parity test with:

```js
const expectedHomeSections = [
  'hero', 'decision-trace', 'achievements', 'proof',
  'capabilities', 'recruiter-fit', 'thinking', 'contact-close',
];
for (const section of expectedHomeSections) {
  assert.ok(home.includes(`data-page-section="${section}"`), `missing shared home section ${section}`);
}
assert.ok(home.includes('IdentityLens'));
assert.ok(home.includes('DecisionTrace'));
assert.ok(home.includes('MissionRow'));
assert.ok(home.includes('EvidencePanel'));
assert.doesNotMatch(home + read('src/components/sections/RecruiterHero.astro'), /ribbon|lens-ring|stroke="#(?:9151F6|E7615F|087A55)"/i);
```

- [x] **Step 2: Run and confirm failure**

Run: `npm test`

Expected: FAIL on the missing `decision-trace` section and missing brand primitives.

- [x] **Step 3: Extend the localized home copy**

Add these typed fields to each locale's hero model, translating only the values and preserving the tuple shape:

```ts
decisionTrace: {
  label: string;
  principle: string;
  steps: [
    { label: string; title: string; signal: 'change' },
    { label: string; title: string; signal: 'intelligence' },
    { label: string; title: string; signal: 'outcome' },
  ];
};
orbitLabel: string;
```

English values:

```ts
orbitLabel: 'YOANN LENY · DATA & AI LEADERSHIP · STRATEGY · SYSTEMS · ADOPTION · ',
decisionTrace: {
  label: 'The decision trace',
  principle: 'Strategy is only real when a team can run it on Monday.',
  steps: [
    { label: '01 / Direction', title: 'Frame the real decision', signal: 'change' },
    { label: '02 / System', title: 'Build what enables it', signal: 'intelligence' },
    { label: '03 / Adoption', title: 'Make the change visible', signal: 'outcome' },
  ],
},
```

French and Spanish use natural translations of those exact meanings, not shortened structural variants.

- [x] **Step 4: Compose the shared homepage**

Define the derived values before the template:

```ts
const achievementHeading = {
  eyebrow: copy.home.achievements.eyebrow,
  title: copy.home.achievements.heading,
  summary: copy.home.achievements.summary,
};
const proofSignals = ['change', 'intelligence', 'outcome'] as const;
const proofMetrics = copy.home.proof.metrics.map((metric, index) => ({
  ...metric,
  signal: proofSignals[index] || 'intelligence',
}));
```

The top-level structure in `RecruiterHome.astro` must be:

```astro
<Layout title={copy.home.title} description={copy.home.description}>
  <div data-page-section="hero"><RecruiterHero copy={copy.home.hero} primaryHref={pathFor('/hire')} secondaryHref={pathFor('/work')} /></div>
  <div data-page-section="decision-trace"><DecisionTrace {...copy.home.hero.decisionTrace} /></div>
  <section data-page-section="achievements"><SceneHeading {...achievementHeading} />{achievements.map((achievement, index) => <MissionRow achievement={achievement} labels={copy.achievementLabels} index={index} />)}</section>
  <div data-page-section="proof"><EvidencePanel label={copy.home.proof.title} note={copy.home.proof.note} metrics={proofMetrics} /></div>
  <section data-page-section="capabilities">
    <SceneHeading eyebrow={copy.home.capabilities.eyebrow} title={copy.home.capabilities.heading} summary={copy.home.capabilities.summary} />
    <div class="cinematic-list">
      {copy.home.capabilities.items.map((item, index) => (
        <article class="cinematic-row">
          <span>{String(index + 1).padStart(2, '0')}</span>
          <h3>{item.mandate}</h3>
          <div><p>{item.practice}</p><p>{copy.home.capabilities.evidenceLabel}: {item.evidence.join(' · ')}</p></div>
        </article>
      ))}
    </div>
    <a href={pathFor('/capabilities')}>{copy.home.capabilities.linkLabel}</a>
  </section>
  <section data-page-section="recruiter-fit" class="scene-dark">
    <SceneHeading eyebrow={copy.home.fit.eyebrow} title={copy.home.fit.heading} summary={copy.home.fit.summary} tone="dark" />
    <ol>{copy.home.fit.items.map((item) => <li>{item}</li>)}</ol>
    <a href={pathFor('/hire')}>{copy.home.fit.primaryLabel}</a>
    <a href={pathFor('/about')}>{copy.home.fit.secondaryLabel}</a>
  </section>
  <section data-page-section="thinking">
    <SceneHeading eyebrow={copy.home.thinking.eyebrow} title={copy.home.thinking.heading} />
    <div class="cinematic-list">
      {copy.home.thinking.items.map((item, index) => (
        <a class="cinematic-row" href={pathFor(`/insights/${item.slug}`)}>
          <span>{String(index + 1).padStart(2, '0')}</span><span>{item.label}</span><h3>{item.title}</h3><span>{copy.home.thinking.readLabel}</span>
        </a>
      ))}
    </div>
    <a href={pathFor('/insights')}>{copy.home.thinking.linkLabel}</a>
  </section>
  <section data-page-section="contact-close">
    <SceneHeading eyebrow={copy.home.close.eyebrow} title={copy.home.close.heading} />
    <a href={pathFor('/hire')}>{copy.home.close.cta}</a>
  </section>
</Layout>
```

Wrap each scene in the existing `Container`/`Section` primitives or equivalent semantic section padding. Apply the approved classes from Tasks 1–3; do not change the localized copy or links shown above.

`RecruiterHero.astro` places title content and `<IdentityLens alt={copy.portraitAlt} orbitLabel={copy.orbitLabel} eager />` in a responsive two-column composition, with the lens first on mobile and the title first in DOM order for screen readers.

- [x] **Step 5: Verify the three home routes**

Run: `npm test && npm run build`

Expected: PASS, 223 pages, and shared renderer assertions for EN/FR/ES.

- [x] **Step 6: Commit**

```bash
git add src/data/localized-site.ts src/components/pages/RecruiterHome.astro src/components/sections/RecruiterHero.astro src/components/sections/AchievementCard.astro src/components/sections/ProofStrip.astro src/pages/index.astro src/pages/fr/index.astro src/pages/es/index.astro tests/brand-content.test.mjs
git commit -m "feat: launch cinematic recruiter homepage"
```

---

### Task 5: Migrate Work indexes and details to shared cinematic renderers

**Files:**
- Create: `src/components/pages/WorkDetail.astro`
- Modify: `src/components/pages/WorkIndex.astro`
- Modify: `src/pages/work/index.astro`
- Modify: `src/pages/fr/work/index.astro`
- Modify: `src/pages/es/work/index.astro`
- Modify: `src/pages/work/[slug].astro`
- Modify: `src/pages/[lang]/work/[slug].astro`
- Modify: `src/components/visuals/CaseDiagram.astro`
- Modify: `tests/brand-content.test.mjs`

**Interfaces:**
- `WorkIndex({ locale: Locale })` remains the shared index renderer.
- `WorkDetail({ locale: Locale; entry: CollectionEntry<'case-studies'> })` owns detail composition and renders the resolved entry internally.
- Work index sections remain `work-intro`, `achievement-register`, `supporting-cases`, `work-close`.

- [x] **Step 1: Add failing shared-detail assertions**

```js
test('shares cinematic work indexes and detail composition', () => {
  const index = read('src/components/pages/WorkIndex.astro');
  assert.ok(existsSync('src/components/pages/WorkDetail.astro'));
  const detail = read('src/components/pages/WorkDetail.astro');
  assert.ok(index.includes('CinematicIntro'));
  assert.ok(index.includes('MissionRow'));
  assert.ok(detail.includes('ArticleFrame'));
  assert.ok(read('src/pages/work/[slug].astro').includes('WorkDetail'));
  assert.ok(read('src/pages/[lang]/work/[slug].astro').includes('WorkDetail'));
});
```

- [x] **Step 2: Run and confirm failure**

Run: `npm test`

Expected: FAIL because `WorkDetail.astro` does not exist and the index uses legacy components.

- [x] **Step 3: Implement the shared index and detail**

`WorkDetail.astro` receives the already-resolved entry, calls `const { Content } = await render(entry)`, and renders:

```astro
<Layout title={`${entry.data.title} — ${detailLabel} — Yoann Leny`} description={entry.data.client}>
  <ArticleFrame eyebrow={`${achievementLabel} · ${entry.data.yearStart || entry.data.yearEnd || '2026'}`} title={entry.data.title} dek={entry.data.client} metadata={metadata}>
    {diagram && <CaseDiagram variant={diagram.variant} locale={locale} />}
    <Prose><Content /></Prose>
  </ArticleFrame>
</Layout>
```

Keep collection lookup and `getStaticPaths()` in route files. Route files do not render content; they pass only `entry` and `locale` to `WorkDetail`.

Restyle `CaseDiagram.astro` using token variables only; preserve all current variants and localized labels.

- [x] **Step 4: Verify and commit**

Run: `npm test && npm run build`

Expected: PASS; all work slugs and locale variants build.

```bash
git add src/components/pages/WorkIndex.astro src/components/pages/WorkDetail.astro src/components/visuals/CaseDiagram.astro src/pages/work src/pages/fr/work src/pages/es/work 'src/pages/[lang]/work' tests/brand-content.test.mjs
git commit -m "feat: unify cinematic work experiences"
```

---

### Task 6: Migrate personal and recruiter-action pages to shared renderers

**Files:**
- Create: `src/components/pages/AboutPage.astro`
- Create: `src/components/pages/CapabilitiesPage.astro`
- Create: `src/components/pages/ContactPage.astro`
- Create: `src/components/pages/HirePage.astro`
- Create: `src/components/pages/NowPage.astro`
- Modify: `src/data/localized-site.ts`
- Modify: `src/pages/about.astro`
- Modify: `src/pages/fr/about.astro`
- Modify: `src/pages/es/about.astro`
- Modify: `src/pages/capabilities.astro`
- Modify: `src/pages/fr/capabilities.astro`
- Modify: `src/pages/es/capabilities.astro`
- Modify: `src/pages/contact.astro`
- Modify: `src/pages/fr/contact.astro`
- Modify: `src/pages/es/contact.astro`
- Modify: `src/pages/hire.astro`
- Modify: `src/pages/fr/hire.astro`
- Modify: `src/pages/es/hire.astro`
- Modify: `src/pages/now.astro`
- Modify: `src/pages/fr/now.astro`
- Modify: `src/pages/es/now.astro`
- Modify: `tests/brand-content.test.mjs`

**Interfaces:**
- Each renderer receives `{ locale: Locale }` and resolves typed copy from `localizedSite`.
- Each route wrapper contains only an import plus `<Page locale="en|fr|es" />`.
- About may use `<IdentityLens eager={false}>`; no other page in this task uses the full lens.

- [x] **Step 1: Add the failing route-delegation matrix**

```js
test('delegates personal and recruiter pages to locale-shared renderers', () => {
  const matrix = [
    ['about', 'AboutPage'], ['capabilities', 'CapabilitiesPage'],
    ['contact', 'ContactPage'], ['hire', 'HirePage'], ['now', 'NowPage'],
  ];
  for (const [route, component] of matrix) {
    for (const [prefix, locale] of [['', 'en'], ['fr/', 'fr'], ['es/', 'es']]) {
      const source = read(`src/pages/${prefix}${route}.astro`);
      assert.ok(source.includes(component), `${prefix}${route} missing ${component}`);
      assert.ok(source.includes(`locale="${locale}"`), `${prefix}${route} missing ${locale}`);
    }
    assert.ok(existsSync(`src/components/pages/${component}.astro`));
  }
});
```

- [x] **Step 2: Run and confirm failure**

Run: `npm test`

Expected: FAIL on the first missing shared page renderer.

- [x] **Step 3: Move copy into the typed localized model**

For each family, add an `en`, `fr`, and `es` object under `localizedSite` containing the current route's title, description, intro, section labels, body blocks, CTA labels, and links. Preserve the existing wording exactly. Define:

```ts
interface LocalizedPersonalPage {
  title: string;
  description: string;
  intro: { eyebrow: string; title: string; summary?: string };
  sections: Array<{ id: string; eyebrow: string; title?: string; body: string[] }>;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
}
```

Capabilities may extend this with its existing structured pillars and evidence arrays; Contact and Hire may extend it with current action/contact data. Do not collapse structured lists into HTML strings.

- [x] **Step 4: Build the renderers and thin wrappers**

The base renderer pattern is concrete and safe for the linear body sections used by About and Now:

```astro
---
import CinematicIntro from '../brand/CinematicIntro.astro';
import SceneHeading from '../brand/SceneHeading.astro';
import Prose from '../primitives/Prose.astro';
import Layout from '../../layouts/Layout.astro';
import { localizedSite, type Locale } from '../../data/localized-site';
interface Props { locale: Locale; }
const { locale } = Astro.props;
const copy = localizedSite[locale].about;
---
<Layout title={copy.title} description={copy.description}>
  <CinematicIntro {...copy.intro} />
  {copy.sections.map((section) => (
    <section data-page-section={section.id}>
      <SceneHeading eyebrow={section.eyebrow} title={section.title || section.eyebrow} />
      <Prose>{section.body.map((paragraph) => <p>{paragraph}</p>)}</Prose>
    </section>
  ))}
</Layout>
```

Capabilities, Contact, and Hire use their typed structured arrays with `SceneHeading`, `EvidencePanel`, semantic lists, and real `<a>` elements. They must not flatten structured data into strings.

Each wrapper is generated from this exact route matrix; its import path, component, and literal locale must match the row:

| Route file | Import | Renderer | Locale |
|---|---|---|---|
| `src/pages/about.astro` | `../components/pages/AboutPage.astro` | `AboutPage` | `en` |
| `src/pages/fr/about.astro` | `../../components/pages/AboutPage.astro` | `AboutPage` | `fr` |
| `src/pages/es/about.astro` | `../../components/pages/AboutPage.astro` | `AboutPage` | `es` |
| `src/pages/capabilities.astro` | `../components/pages/CapabilitiesPage.astro` | `CapabilitiesPage` | `en` |
| `src/pages/fr/capabilities.astro` | `../../components/pages/CapabilitiesPage.astro` | `CapabilitiesPage` | `fr` |
| `src/pages/es/capabilities.astro` | `../../components/pages/CapabilitiesPage.astro` | `CapabilitiesPage` | `es` |
| `src/pages/contact.astro` | `../components/pages/ContactPage.astro` | `ContactPage` | `en` |
| `src/pages/fr/contact.astro` | `../../components/pages/ContactPage.astro` | `ContactPage` | `fr` |
| `src/pages/es/contact.astro` | `../../components/pages/ContactPage.astro` | `ContactPage` | `es` |
| `src/pages/hire.astro` | `../components/pages/HirePage.astro` | `HirePage` | `en` |
| `src/pages/fr/hire.astro` | `../../components/pages/HirePage.astro` | `HirePage` | `fr` |
| `src/pages/es/hire.astro` | `../../components/pages/HirePage.astro` | `HirePage` | `es` |
| `src/pages/now.astro` | `../components/pages/NowPage.astro` | `NowPage` | `en` |
| `src/pages/fr/now.astro` | `../../components/pages/NowPage.astro` | `NowPage` | `fr` |
| `src/pages/es/now.astro` | `../../components/pages/NowPage.astro` | `NowPage` | `es` |

For example, the English About wrapper is exactly:

```astro
---
import AboutPage from '../components/pages/AboutPage.astro';
---
<AboutPage locale="en" />
```

- [x] **Step 5: Verify parity and commit**

Run: `npm test && npm run build`

Expected: PASS and all 15 routes delegate to five shared renderers.

```bash
git add src/data/localized-site.ts src/components/pages/AboutPage.astro src/components/pages/CapabilitiesPage.astro src/components/pages/ContactPage.astro src/components/pages/HirePage.astro src/components/pages/NowPage.astro src/pages/about.astro src/pages/fr/about.astro src/pages/es/about.astro src/pages/capabilities.astro src/pages/fr/capabilities.astro src/pages/es/capabilities.astro src/pages/contact.astro src/pages/fr/contact.astro src/pages/es/contact.astro src/pages/hire.astro src/pages/fr/hire.astro src/pages/es/hire.astro src/pages/now.astro src/pages/fr/now.astro src/pages/es/now.astro tests/brand-content.test.mjs
git commit -m "feat: unify cinematic personal pages"
```

---

### Task 7: Migrate knowledge indexes, details, and Decision Log

**Files:**
- Create: `src/components/pages/InsightsIndex.astro`
- Create: `src/components/pages/ConceptsIndex.astro`
- Create: `src/components/pages/InsightDetail.astro`
- Create: `src/components/pages/ConceptDetail.astro`
- Create: `src/components/pages/DecisionIndex.astro`
- Modify: `src/pages/insights/index.astro`
- Modify: `src/pages/fr/insights/index.astro`
- Modify: `src/pages/es/insights/index.astro`
- Modify: `src/pages/insights/[slug].astro`
- Modify: `src/pages/[lang]/insights/[slug].astro`
- Modify: `src/pages/concepts/index.astro`
- Modify: `src/pages/fr/concepts/index.astro`
- Modify: `src/pages/es/concepts/index.astro`
- Modify: `src/pages/concepts/[slug].astro`
- Modify: `src/pages/[lang]/concepts/[slug].astro`
- Modify: `src/pages/decisions.astro`
- Modify: `tests/brand-content.test.mjs`

**Interfaces:**
- `InsightsIndex` receives `{ locale: Locale; entries: CollectionEntry<'insights'>[] }`; `ConceptsIndex` receives `{ locale: Locale; entries: CollectionEntry<'concepts'>[] }`.
- `InsightDetail` receives `{ locale: Locale; entry: CollectionEntry<'insights'> }`; `ConceptDetail` receives `{ locale: Locale; entry: CollectionEntry<'concepts'> }`. Each detail renderer calls `await render(entry)` internally.
- DecisionIndex is `{ locale: 'en'; decisions: Decision[] }`; no localized Decision routes are created.

- [x] **Step 1: Add failing knowledge-family contracts**

```js
test('uses shared cinematic knowledge renderers', () => {
  for (const component of ['InsightsIndex', 'ConceptsIndex', 'InsightDetail', 'ConceptDetail', 'DecisionIndex']) {
    assert.ok(existsSync(`src/components/pages/${component}.astro`), `missing ${component}`);
  }
  assert.ok(read('src/pages/insights/index.astro').includes('InsightsIndex'));
  assert.ok(read('src/pages/[lang]/insights/[slug].astro').includes('InsightDetail'));
  assert.ok(read('src/pages/concepts/index.astro').includes('ConceptsIndex'));
  assert.ok(read('src/pages/[lang]/concepts/[slug].astro').includes('ConceptDetail'));
  assert.ok(read('src/pages/decisions.astro').includes('DecisionIndex'));
});
```

- [x] **Step 2: Run and confirm failure**

Run: `npm test`

Expected: FAIL because the page-family components do not exist.

- [x] **Step 3: Implement the shared indexes and details**

Keep `getCollection`, filtering, and `getStaticPaths()` in the route files. Pass resolved entries to renderers. The detail skeleton is:

```astro
<Layout title={`${entry.data.title} — Yoann Leny`} description={entry.data.dek || entry.data.definition || entry.data.title}>
  <ArticleFrame eyebrow={localizedLabel} title={entry.data.title} dek={entry.data.dek || entry.data.definition} metadata={metadata}>
    <Prose><Content /></Prose>
  </ArticleFrame>
</Layout>
```

Indexes use `CinematicIntro`, retain current client-side search/filter behavior, replace pastel cards with open rows, and keep filter controls at least 44px high.

Move the existing `decisions` array and `Grade` type into `DecisionIndex.astro`. Map grades to semantic tokens:

```ts
const gradeStyles = {
  'aged-well': { label: 'Aged well', signal: 'outcome' },
  'mixed': { label: 'Mixed', signal: 'change' },
  'wrong': { label: 'Wrong', signal: 'intelligence' },
} as const;
```

- [x] **Step 4: Verify content routes and commit**

Run: `npm test && npm run build`

Expected: PASS; all insight/concept dynamic paths and Decision Log build.

```bash
git add src/components/pages/InsightsIndex.astro src/components/pages/ConceptsIndex.astro src/components/pages/InsightDetail.astro src/components/pages/ConceptDetail.astro src/components/pages/DecisionIndex.astro src/pages/insights src/pages/fr/insights src/pages/es/insights 'src/pages/[lang]/insights' src/pages/concepts src/pages/fr/concepts src/pages/es/concepts 'src/pages/[lang]/concepts' src/pages/decisions.astro tests/brand-content.test.mjs
git commit -m "feat: unify cinematic knowledge pages"
```

---

### Task 8: Unify legal pages and complete static locale contracts

**Files:**
- Create: `src/components/pages/LegalPage.astro`
- Modify: `src/data/localized-site.ts`
- Modify: `src/pages/privacy.astro`
- Modify: `src/pages/fr/privacy.astro`
- Modify: `src/pages/es/privacy.astro`
- Modify: `src/pages/imprint.astro`
- Modify: `src/pages/fr/imprint.astro`
- Modify: `src/pages/es/imprint.astro`
- Modify: `tests/brand-content.test.mjs`

**Interfaces:**
- `LegalPage({ locale: Locale; kind: 'privacy' | 'imprint' })`.
- All legal copy remains structured paragraphs and inline links; no raw HTML strings.

- [x] **Step 1: Add failing legal route contracts**

```js
test('shares compact legal composition across locales', () => {
  for (const kind of ['privacy', 'imprint']) {
    for (const [prefix, locale] of [['', 'en'], ['fr/', 'fr'], ['es/', 'es']]) {
      const source = read(`src/pages/${prefix}${kind}.astro`);
      assert.ok(source.includes('LegalPage'));
      assert.ok(source.includes(`locale="${locale}"`));
      assert.ok(source.includes(`kind="${kind}"`));
    }
  }
});
```

- [x] **Step 2: Run and confirm failure**

Run: `npm test`

Expected: FAIL because legal routes still own their markup.

- [x] **Step 3: Implement `LegalPage` and route wrappers**

Model each paragraph as typed segments so localization strings never become executable markup:

```ts
type LegalSegment = { text: string; strong?: boolean; href?: string };
type LegalParagraph = LegalSegment[];
```

Use this complete renderer shape:

```astro
---
import CinematicIntro from '../brand/CinematicIntro.astro';
import Container from '../layout/Container.astro';
import Prose from '../primitives/Prose.astro';
import Layout from '../../layouts/Layout.astro';
import { localizedSite, type Locale } from '../../data/localized-site';

interface Props { locale: Locale; kind: 'privacy' | 'imprint'; }
const { locale, kind } = Astro.props;
const copy = localizedSite[locale].legal[kind];
---
<Layout title={copy.title} description={copy.description}>
  <Container size="narrow">
    <CinematicIntro eyebrow={copy.eyebrow} title={copy.heading} variant="utility" />
    <Prose>
      {copy.paragraphs.map((paragraph) => (
        <p>
          {paragraph.map((segment) => (
            segment.href
              ? <a href={segment.href}>{segment.text}</a>
              : segment.strong
                ? <strong>{segment.text}</strong>
                : segment.text
          ))}
        </p>
      ))}
    </Prose>
  </Container>
</Layout>
```

- [x] **Step 4: Run the complete static suite and commit**

Run: `npm test && npm run build`

Expected: PASS, 223 pages.

```bash
git add src/components/pages/LegalPage.astro src/data/localized-site.ts src/pages/privacy.astro src/pages/fr/privacy.astro src/pages/es/privacy.astro src/pages/imprint.astro src/pages/fr/imprint.astro src/pages/es/imprint.astro tests/brand-content.test.mjs
git commit -m "feat: unify cinematic legal pages"
```

---

### Task 9: Add repeatable browser audits and fix every visual defect

**Files:**
- Modify: `package.json`
- Create: `playwright.config.ts`
- Create: `tests/ui-audit.spec.ts`
- Modify: any source file implicated by a failing audit; keep each fix scoped to its owning component.

**Interfaces:**
- `npm run test:ui` starts the Astro dev server through Playwright and runs Chromium at desktop and mobile widths.
- Audit route records are `{ path: string; template: string }`.

- [x] **Step 1: Install Playwright and add scripts**

Run:

```bash
npm install --save-dev @playwright/test
npx playwright install chromium
```

Add to `package.json`:

```json
{
  "scripts": {
    "test": "node --test tests/brand-content.test.mjs",
    "test:ui": "playwright test",
    "test:all": "npm test && npm run build && npm run test:ui"
  }
}
```

- [x] **Step 2: Configure the browser test server**

Create `playwright.config.ts`:

```ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  testMatch: 'ui-audit.spec.ts',
  fullyParallel: false,
  use: { baseURL: 'http://127.0.0.1:4322', trace: 'retain-on-failure' },
  webServer: {
    command: 'npm run dev -- --host 127.0.0.1 --port 4322',
    url: 'http://127.0.0.1:4322',
    reuseExistingServer: false,
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 1000 } } },
    { name: 'mobile', use: { ...devices['iPhone 13'], viewport: { width: 390, height: 844 } } },
  ],
});
```

- [x] **Step 3: Write the browser audit**

Create `tests/ui-audit.spec.ts`:

```ts
import { expect, test } from '@playwright/test';

const templateRoutes = [
  ['/', 'home-en'], ['/fr/', 'home-fr'], ['/es/', 'home-es'],
  ['/work', 'work-index-en'], ['/fr/work', 'work-index-fr'], ['/es/work', 'work-index-es'],
  ['/work/enterprise-medallion-stack', 'work-detail-en'],
  ['/fr/work/enterprise-medallion-stack', 'work-detail-fr'],
  ['/es/work/enterprise-medallion-stack', 'work-detail-es'],
  ['/about', 'about-en'], ['/fr/about', 'about-fr'], ['/es/about', 'about-es'],
  ['/capabilities', 'capabilities-en'], ['/fr/capabilities', 'capabilities-fr'], ['/es/capabilities', 'capabilities-es'],
  ['/contact', 'contact-en'], ['/fr/contact', 'contact-fr'], ['/es/contact', 'contact-es'],
  ['/hire', 'hire-en'], ['/fr/hire', 'hire-fr'], ['/es/hire', 'hire-es'],
  ['/now', 'now-en'], ['/fr/now', 'now-fr'], ['/es/now', 'now-es'],
  ['/insights', 'insights-index-en'],
  ['/fr/insights', 'insights-index-fr'], ['/es/insights', 'insights-index-es'],
  ['/insights/why-most-agent-demos-collapse-in-production', 'insight-detail-en'],
  ['/fr/insights/why-most-agent-demos-collapse-in-production', 'insight-detail-fr'],
  ['/es/insights/why-most-agent-demos-collapse-in-production', 'insight-detail-es'],
  ['/concepts', 'concepts-index-en'], ['/fr/concepts', 'concepts-index-fr'], ['/es/concepts', 'concepts-index-es'],
  ['/concepts/medallion-architecture', 'concept-detail-en'],
  ['/fr/concepts/medallion-architecture', 'concept-detail-fr'],
  ['/es/concepts/medallion-architecture', 'concept-detail-es'], ['/decisions', 'decisions'],
  ['/privacy', 'privacy-en'], ['/fr/privacy', 'privacy-fr'], ['/es/privacy', 'privacy-es'],
  ['/imprint', 'imprint-en'], ['/fr/imprint', 'imprint-fr'], ['/es/imprint', 'imprint-es'],
] as const;

for (const [path, template] of templateRoutes) {
  test(`${template} has no overflow, overlap, image, or console failure`, async ({ page }) => {
    const errors: string[] = [];
    page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()); });
    page.on('pageerror', (error) => errors.push(error.message));
    const response = await page.goto(path, { waitUntil: 'networkidle' });
    expect(response?.status()).toBe(200);
    await expect(page.locator('main#main-content')).toBeVisible();
    await expect(page.locator('h1')).toHaveCount(1);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBe(true);
    expect(errors).toEqual([]);

    for (const image of await page.locator('img:visible').all()) {
      expect(await image.evaluate((node: HTMLImageElement) => node.complete && node.naturalWidth > 0)).toBe(true);
    }

    const controls = page.locator('a:visible, button:visible, input:visible');
    for (let index = 0; index < await controls.count(); index += 1) {
      const box = await controls.nth(index).boundingBox();
      if (box) expect(box.width >= 24 && box.height >= 24).toBe(true);
    }
  });
}

test('localized home pages keep identical section order', async ({ page }) => {
  const sequences: string[][] = [];
  for (const path of ['/', '/fr/', '/es/']) {
    await page.goto(path);
    sequences.push(await page.locator('[data-page-section]').evaluateAll((nodes) => nodes.map((node) => node.getAttribute('data-page-section') || '')));
  }
  expect(sequences[1]).toEqual(sequences[0]);
  expect(sequences[2]).toEqual(sequences[0]);
});

test('root selects the browser language while explicit choices win', async ({ browser }) => {
  const french = await browser.newContext({ locale: 'fr-FR' });
  const frenchPage = await french.newPage();
  await frenchPage.goto('/');
  await frenchPage.waitForURL('**/fr/');
  await french.close();

  const savedSpanish = await browser.newContext({ locale: 'fr-FR' });
  await savedSpanish.addInitScript(() => localStorage.setItem('preferred-lang', 'es'));
  const spanishPage = await savedSpanish.newPage();
  await spanishPage.goto('/');
  await spanishPage.waitForURL('**/es/');
  await savedSpanish.close();

  const deepLink = await browser.newContext({ locale: 'fr-FR' });
  const deepLinkPage = await deepLink.newPage();
  await deepLinkPage.goto('/work');
  expect(new URL(deepLinkPage.url()).pathname).toBe('/work');
  await deepLink.close();
});

test('reduced motion exposes the final homepage state', async ({ browser }) => {
  const context = await browser.newContext({ reducedMotion: 'reduce', viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  await page.goto('/');
  await expect(page.locator('[data-identity-lens] img')).toBeVisible();
  await expect(page.locator('h1')).toBeVisible();
  await context.close();
});
```

- [x] **Step 4: Run the full suite and capture defects**

Run: `npm run test:all`

Expected on the first run: any remaining overflow, broken image, contrast-adjacent styling, missing route, or console problem fails with a named route and viewport.

- [x] **Step 5: Fix failures one owning component at a time**

For each failure:

1. reproduce the single failing Playwright test with `npx playwright test -g "<template>" --project=<desktop|mobile>`;
2. identify the first component whose box or state is incorrect;
3. patch only that component;
4. rerun the single test;
5. rerun `npm run test:all` after the local test passes.

Do not weaken assertions to make a failure disappear. If a 24px inline text link is intentionally smaller than the 44px preferred target, retain the 24px audit floor and verify surrounding spacing manually.

- [x] **Step 6: Perform the manual UI/UX review**

At 320, 390, 768, 1024, and 1440 pixels, inspect every unique template and sample FR/ES equivalents for:

- title/portrait/orbit overlap;
- translated CTA clipping;
- header and mobile-menu collision;
- line length, hierarchy, and section rhythm;
- keyboard focus order and visibility;
- hover/active consistency;
- tables, code, diagrams, and long unbroken text;
- image crop and layout shift;
- color semantics and normal-text contrast;
- footer alignment;
- absence of colored hero ribbons and portrait arc fragments.

Fix every defect and rerun `npm run test:all`.

- [x] **Step 7: Commit the audit harness and fixes**

```bash
git add package.json package-lock.json playwright.config.ts tests/ui-audit.spec.ts src
git commit -m "test: audit cinematic UI across routes"
```

---

### Task 10: Final verification and merge-ready handoff

**Files:**
- Review only: all files changed since `8b132cb`.
- Modify only if verification exposes a defect.

**Interfaces:**
- Final branch remains `feat/recruiter-first`.
- `main` is not changed.

- [x] **Step 1: Verify repository scope**

Run:

```bash
git status --short
git diff --stat 8b132cb..HEAD
git diff --check 8b132cb..HEAD
```

Expected: no tracked unstaged changes, no whitespace errors, and `.superpowers/` remains untracked and excluded from commits.

- [x] **Step 2: Run fresh verification**

Run:

```bash
npm run test:all
```

Expected: contract tests PASS, 223 routes build, Playwright desktop/mobile audits PASS.

- [x] **Step 3: Confirm representative production assets and routes**

With the dev server running on port 4322, run:

```bash
for path in / /fr/ /es/ /work /fr/work /es/work /about /capabilities /contact /hire /insights /concepts /decisions /privacy /imprint /images/portrait-960.webp; do
  curl -fsS -o /dev/null -w "%{http_code} $path\n" "http://127.0.0.1:4322$path"
done
```

Expected: every line starts with `200`.

- [x] **Step 4: Prepare the user handoff without merging**

Report:

- the local review URL;
- the final test/build/browser-audit results;
- the exact branch and latest commit;
- the unmerged status;
- any remaining content inputs needed for the five full case studies.

Do not merge to `main`. Wait for Yoann's explicit implementation approval.
