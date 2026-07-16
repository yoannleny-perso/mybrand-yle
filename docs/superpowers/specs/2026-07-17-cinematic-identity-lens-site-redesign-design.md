# Cinematic Identity-Lens Full-Site Redesign

**Date:** 2026-07-17

**Status:** Visual direction approved; full-site implementation requested

**Branch:** `feat/recruiter-first`

## Objective

Apply the approved cinematic identity-lens design to every public page on yoannleny.com while preserving the recruiter-first information hierarchy, English/French/Spanish parity, static rendering, accessibility, and content integrity.

The redesign must feel personal and authored rather than like a standard résumé, SaaS template, or generic AI portfolio. It should make Yoann memorable in the opening seconds, then let recruiters validate role fit, work, capabilities, leadership scope, and thinking without visual friction.

## Approved Direction

The approved design is the final **Cinematic Identity Lens** iteration:

- predominantly white background;
- vibrant black and anthracite as the primary information colors;
- semantic secondary palette:
  - purple `#9151F6` for AI, intelligence, and the main expressive brand moment;
  - coral `#E7615F` for leadership, people, and transformation;
  - dark green `#087A55` for products, outcomes, availability, and progress;
- Yoann's full-color portrait shown prominently on the landing page;
- circular identity-lens framing with black orbit typography;
- monumental but fluid opening typography;
- softened large-scale geometry and generous white space;
- cinematic scene pacing followed by disciplined recruiter evidence;
- no sweeping color ribbons;
- no purple, coral, or green arc fragments around the portrait;
- no gradients, glass effects, glowing orbs, fake product interfaces, stock AI iconography, or invented evidence.

The portrait, lens, and title composition are the single high-expression moment. The rest of the site must be quieter.

## Experience Principles

1. **Recognition before explanation.** The landing frame should make Yoann visually memorable before presenting detailed evidence.
2. **Proof immediately follows personality.** The cinematic opening cuts directly into named missions and supported evidence.
3. **One expressive signature.** The identity lens is the brand device. Secondary pages reuse its visual grammar, not the complete hero composition.
4. **Color communicates.** Purple, coral, and green always retain their semantic roles; they do not become arbitrary decoration.
5. **Structure is shared across languages.** English, French, and Spanish use the same components, order, spacing, and interaction behavior. Only localized copy and URLs change.
6. **Motion is orchestrated.** The homepage gets one composed opening sequence. Remaining motion is quiet and functional.
7. **Evidence remains honest.** Existing achievements, case material, and metrics remain the only factual claims. The redesign does not invent outcomes, employers, dates, or testimonials.

## Design System

### Color tokens

Replace the current mixed cobalt and pastel surface system with explicit semantic tokens:

| Token role | Value | Usage |
| --- | --- | --- |
| `ink-primary` | `#050505` | Primary type, buttons, dark surfaces |
| `ink-secondary` | `#24262B` | Body copy, secondary dark surfaces |
| `paper` | `#FFFFFF` | Dominant page background |
| `paper-soft` | `#F3F3F1` | Section transitions and quiet grouped content |
| `signal-intelligence` | `#9151F6` | AI/intelligence, expressive display type, focus graphics |
| `signal-change` | `#E7615F` | Leadership, transformation, people operations |
| `signal-outcome` | `#087A55` | Products, outcomes, status, availability |
| `rule` | `#DEDFDF` | Low-contrast separators |

Accent use must stay controlled. Most paragraphs, navigation, long-form content, and structural headings remain black or anthracite.

Accessibility constraints:

- Purple on white is reserved for large text and non-text graphics; it is not used for small normal-weight body text because its contrast sits just below the 4.5:1 normal-text threshold.
- Black text is used on purple and coral filled surfaces.
- White text is permitted on the dark green and black/anthracite surfaces.
- Primary CTA text remains white on black rather than relying on accent fills.

### Typography

- **Display:** Archivo Variable, used for the cinematic title system and page-family headings.
- **Body:** Inter Variable, retained for readable paragraphs, navigation, and long-form content.
- **Utility/data:** Azeret Mono for scene labels, metadata, evidence provenance, and language controls.

Display typography uses variable width deliberately: narrower and heavier for the homepage thesis; slightly wider and calmer for secondary-page titles. Utility type remains sparse and must not turn every label into production-themed decoration.

### Geometry and surfaces

- White remains the continuous canvas.
- Major cinematic surfaces may use 28–48px radii on desktop and 22–32px on mobile.
- Small content elements do not all become pills or rounded cards.
- Mission lists use open rows or softly grouped surfaces rather than isolated SaaS tiles.
- Shadows are soft and low-opacity; hard offset shadows are removed.
- Rules are used only where they clarify reading order.

### Motion

Homepage opening sequence:

1. role and availability cues appear;
2. the title rises into place using a soft masked reveal;
3. the portrait opens through an iris-style reveal;
4. the black identity-lens typography settles into position;
5. the page becomes still enough to read.

Secondary pages use short section and row reveals only. Content remains visible without JavaScript. `prefers-reduced-motion: reduce` disables transforms, clipping animations, count-ups, and continuous orbit motion while preserving final visual state.

## Component Architecture

The graph traversal confirms that `Heading.astro` already feeds About, Capabilities, Contact, Home/index, Now, Insights, Concepts, and Work routes, while `Prose.astro` feeds Now and long-form detail routes. The redesign therefore begins at shared tokens and primitives rather than route-specific styling.

### Global shell

Update:

- `src/styles/tokens.css`
- `src/styles/global.css`
- `src/layouts/Layout.astro`
- `src/components/layout/Header.astro`
- `src/components/layout/Footer.astro`
- `src/components/layout/Container.astro`
- `src/components/layout/Section.astro`

Responsibilities:

- define the approved colors, typography, radii, spacing, focus, and motion tokens;
- use a white base canvas;
- create a smoother floating/scrolled header state without glass-heavy styling;
- preserve active navigation, language switching, keyboard menu behavior, and localized labels;
- align the footer with the new soft geometry and semantic accent system;
- keep one skip link and one `main` landmark on every route.

### Shared brand primitives

Create or refactor the following bounded components:

- `IdentityLens.astro`: full-color responsive portrait, black orbit text, accessible image fallback, and reduced-motion behavior. Used only where identity is the page's primary subject.
- `CinematicIntro.astro`: shared title/eyebrow/summary/action composition with `home`, `index`, `detail`, and `utility` variants.
- `DecisionTrace.astro`: the direction → system → adoption operating principle with localized labels.
- `SceneHeading.astro`: section label and fluid display heading used across index and landing pages.
- `EvidencePanel.astro`: supported metrics and provenance in a grouped dark surface.
- `MissionRow.astro`: open evidence row for the five named achievements.
- `ArticleFrame.astro` or equivalent shared detail wrapper: calmer cinematic header, article metadata, and consistent reading width.

Refactor rather than duplicate existing `RecruiterHero`, `AchievementCard`, `ProofStrip`, `Heading`, `Eyebrow`, and `Prose` responsibilities. Each visual role should have one owner.

### Data and localization flow

- `src/data/localized-site.ts` remains the typed source for shared page copy.
- `src/data/achievements.ts` remains the typed source for the five named missions.
- Route files pass `locale`; shared renderers select copy and localized paths.
- Shared components receive already-localized strings and do not know where translations are stored.
- English, French, and Spanish route wrappers may set metadata but must not own separate visual compositions.
- Proper project names remain unchanged across languages.

## Page-Family Rollout

### 1. Home: `/`, `/fr/`, `/es/`

Use the full approved composition:

1. cinematic identity-lens opening with full-color portrait;
2. decision trace;
3. five named mission rows;
4. grouped published-proof panel;
5. capability-to-evidence mapping;
6. recruiter-fit scene;
7. selected thinking;
8. cinematic closing CTA.

The homepage is the only page that uses the complete identity-lens title composition.

### 2. Work index: `/work`, `/fr/work`, `/es/work`

- compact cinematic index intro without portrait orbit;
- the five named achievements as the primary mission register;
- semantic color attached to mission meaning, not list position;
- supporting anonymized cases retained below;
- no empty links for unpublished named case studies.

### 3. Work details: `/work/[slug]` and localized equivalents

- cinematic detail intro with project metadata and one semantic accent;
- existing diagrams and metrics restyled through shared tokens;
- consistent challenge → decisions → system → outcomes reading flow;
- no decorative hero image when no real artifact exists.

### 4. About, Capabilities, Hire, Contact, and Now

- use compact `CinematicIntro` variants;
- About may reuse a restrained portrait treatment, but not the homepage orbit composition;
- Capabilities connect claims directly to named missions;
- Hire and Contact prioritize the next action and maintain large, obvious controls;
- Now uses the same scene heading and article rhythm as other personal narrative pages.

### 5. Insights and Concepts indexes

- replace mixed card styles with open editorial rows or softly grouped indexes;
- preserve taxonomy, search value, and fast scanning;
- use semantic accent markers sparingly;
- keep translated index structures identical.

### 6. Insights and Concepts details

- use the shared article frame and revised `Prose` system;
- preserve one readable content column, clear metadata, pull quotes, tables, code, and related links;
- avoid applying the oversized homepage title scale to long article titles;
- maintain reading-progress and reduced-motion behavior.

### 7. Decisions

- retain its English-only status;
- adopt the article/index typography, surfaces, navigation, and footer;
- do not create untranslated route equivalents.

### 8. Privacy and Imprint

- use a compact utility intro and revised Prose styles;
- minimize motion and decoration;
- preserve localized legal content and links.

## Responsive Behavior

The design must be validated at minimum at 320, 390, 768, 1024, and 1440 CSS pixels.

- The identity lens moves above the title on narrow screens and retains a useful crop that shows Yoann's face and distinctive attire.
- Orbit text scales or becomes a static curved label; it never clips viewport edges.
- Display type scales down without colliding with the portrait, navigation, or actions.
- Mission rows collapse into a clear single-column reading order.
- Translated CTAs wrap naturally without reducing touch targets.
- No fixed-width decorative element may create horizontal overflow.
- All interactive controls remain at least 44px high/wide where practical.

## Image Handling

Production uses the existing optimized `public/images/portrait-960.webp` with `public/images/portrait.jpeg` as fallback through `<picture>`.

- explicit width and height prevent layout shift;
- homepage portrait loads eagerly with high fetch priority;
- repeated secondary-page portraits load lazily where below the fold;
- face-aware `object-position` preserves the approved crop;
- descriptive localized alt text remains concise;
- the visual-companion-only `portrait-preview.jpg` is not production source material and is not committed.

## Accessibility and Interaction

- one H1 and one main landmark per page;
- visible keyboard focus on every control;
- current navigation uses `aria-current="page"`;
- mobile navigation retains focus trapping, Escape close, scroll locking, and focus restoration;
- identity-lens orbit is decorative and hidden from assistive technology;
- text is not embedded in images;
- content is fully visible without JavaScript;
- reduced-motion users receive the final static composition immediately;
- color is never the only indicator of project type, state, or link affordance;
- article tables and code remain keyboard/viewport accessible.

## Error and Fallback Behavior

- Portrait failure leaves reserved geometry and meaningful alt text without collapsing the hero.
- Unsupported browser animation features fall back to a static final state.
- No `IntersectionObserver` support reveals all content immediately.
- Storage failure in language selection retains the current browser-language fallback.
- Missing optional achievement links render non-interactive evidence rows with the existing `case study in preparation` status.
- A missing optional diagram never removes the textual case explanation.

## Performance

- retain Astro static rendering and content collections;
- do not introduce autoplay video, canvas animation, or a new client framework;
- implement the lens and motion with semantic HTML, CSS, and lightweight SVG;
- load only the font weights/styles used by the site;
- keep above-the-fold image transfer constrained to the optimized portrait;
- avoid per-page duplicated CSS and client scripts;
- preserve view transitions only where they do not delay first content.

## Verification and Final UI/UX Audit

### Automated contracts

Extend `tests/brand-content.test.mjs` to cover:

- exact approved color values and semantic tokens;
- all three home routes delegating to one renderer;
- all three work routes delegating to one renderer;
- shared intro/article primitives used by every page family;
- the homepage portrait `<picture>` and eager priority;
- absence of the rejected colored hero ribbons and colored portrait arc fragments;
- identical `data-page-section` sequences across localized page equivalents;
- all five achievements remaining available in EN/FR/ES;
- reduced-motion and no-JS visibility safeguards.

### Build and route checks

- `npm test`
- `npm run build`
- all existing 223 routes continue to build;
- representative EN/FR/ES routes and portrait assets return HTTP 200;
- no route is removed or silently redirected except the approved bare-root browser-language selection.

### Browser audit

Inspect every unique page template at mobile and desktop widths, then sample all localized equivalents. Verify:

- no horizontal overflow;
- no overlapping title, portrait, orbit, navigation, CTA, card, table, or footer content;
- no clipped translated labels;
- no cumulative layout shift from the portrait or fonts;
- correct hover, focus, active, menu, and language-switch states;
- logical heading hierarchy and landmark structure;
- readable line lengths and sufficient contrast;
- reduced-motion rendering;
- zero console and page errors;
- internal links preserve the active locale;
- the photo appears correctly on the landing page;
- the final visual system remains consistent across every page family.

Any visual defect found during this audit is part of the implementation scope and must be corrected before merge.

## Scope Boundary

This redesign changes presentation, shared components, motion, and responsive behavior across the existing site. It does not:

- invent confidential project facts or unsupported metrics;
- publish the five full named case studies without source material;
- translate currently English-only long-form content where no translation exists;
- add a CMS, database, authentication layer, or runtime localization service;
- add video backgrounds or heavyweight cinematic effects;
- merge to `main` until Yoann has reviewed the implemented site and explicitly approves the merge.
