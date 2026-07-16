# Recruiter-First Brand Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Turn the existing portfolio into a recruiter-first proof dossier that establishes Yoann's target role, scope, and evidence within the first screen, then presents five named achievement placeholders without inventing confidential details.

**Architecture:** Keep Astro as the static rendering layer and add a small typed achievement data module shared by the English homepage and work index. Replace the homepage's generic SaaS-style sections with focused Astro sections, while retaining the existing case-study and essay routes as supporting depth. Apply navigation, accessibility, metadata, and responsive typography corrections in shared layout files so every route benefits.

**Tech Stack:** Astro 6, TypeScript, Tailwind CSS 4, React 19 for existing interactive islands, Node's built-in test runner, Playwright for browser verification.

## Global Constraints

- Do not invent client metrics, project dates, confidential implementation details, testimonials, or links.
- Preserve all existing case-study, insight, concept, capability, about, and hire routes.
- Keep English as the recruiter-first canonical experience; do not replace the existing French or Spanish editorial content with untranslated English copy.
- Use semantic HTML and progressive enhancement; no new client-side framework or animation dependency.
- Treat `graphify-out/` as generated audit output and do not include it in implementation commits.
- Verify both desktop and mobile at every visual milestone, with no horizontal overflow, clipping, or element overlap.

---

## Task 1: Add failing content-contract tests

**Files:**

- Create: `tests/brand-content.test.mjs`
- Test: `tests/brand-content.test.mjs`

- [ ] Write a Node test that expects `src/data/achievements.ts` to contain exactly the five approved project names and their approved one-line descriptions.
- [ ] Add assertions that the English homepage references the recruiter proposition, recruiter CTA, achievement data, and the three existing proof figures (`40+`, `3`, `$13M+`).
- [ ] Add assertions that the English work index consumes the shared achievement data and preserves links to existing supporting case studies.
- [ ] Add shared-layout assertions for a skip link, a main landmark target, `aria-current`, and a valid existing default social image path.
- [ ] Run `node --test tests/brand-content.test.mjs` and confirm it fails because the achievement module and new recruiter copy do not exist.
- [ ] Commit the failing contract: `test: define recruiter-first brand content contract`.

## Task 2: Build the typed achievement system and work index

**Files:**

- Create: `src/data/achievements.ts`
- Create: `src/components/sections/AchievementCard.astro`
- Modify: `src/pages/work/index.astro`
- Test: `tests/brand-content.test.mjs`

- [ ] Define an `Achievement` interface with `slug`, `name`, `summary`, `projectType`, `industry`, `location`, `status`, `capabilities`, `accent`, and nullable `href`.
- [ ] Add GroupIQ, Polaris, Lense Studio, Cap Ostrea, and Media Data Studio using only the user-provided descriptions plus neutral taxonomy labels.
- [ ] Implement a semantic card with an indexed project marker, status label `Case study in preparation`, concise summary, capability tags, and non-clickable presentation when `href` is null.
- [ ] Rebuild the English work index so named achievements lead the page and the existing four anonymized case studies appear below as `Supporting case studies`.
- [ ] Ensure the card grid is one column on narrow screens, two columns on medium screens, and never stretches card copy beyond a readable measure.
- [ ] Run `node --test tests/brand-content.test.mjs`; confirm achievement and work-page assertions pass while homepage/layout assertions remain red.
- [ ] Run `npm run build`; expect a successful static build.
- [ ] Commit: `feat: add named achievement portfolio`.

## Task 3: Replace the English homepage with the recruiter proof dossier

**Files:**

- Create: `src/components/sections/RecruiterHero.astro`
- Create: `src/components/sections/ProofStrip.astro`
- Modify: `src/pages/index.astro`
- Test: `tests/brand-content.test.mjs`

- [ ] Build a two-column recruiter hero whose first viewport contains the target role, value proposition, location/scope, current opportunity status, and primary `Discuss a role` CTA.
- [ ] Keep the hero headline to a controlled measure and use responsive type that fits at 320px without wrapping into orphaned one-word lines.
- [ ] Build a proof strip for the existing claims: `40+ experts led`, `3 regions`, and `$13M+ attributed impact`, with an explicit note that the figures summarize published case material.
- [ ] Replace the current homepage sequence with: recruiter hero, proof strip, five selected achievements, capability-to-project map, recruiter fit, supporting thinking, and a compact contact close.
- [ ] Connect each capability cluster to at least one named achievement so the page demonstrates evidence rather than listing abstract skills.
- [ ] Use one cobalt signal colour, warm paper surfaces, black type, thin rules, small radii, and restrained micro-interactions; remove the rainbow pastel card treatment from the English homepage.
- [ ] Preserve existing internal links to `/work`, `/capabilities`, `/about`, `/hire`, and `/insights`.
- [ ] Run `node --test tests/brand-content.test.mjs`; confirm homepage assertions pass.
- [ ] Run `npm run build`; expect all static routes to build successfully.
- [ ] Commit: `feat: make homepage recruiter first`.

## Task 4: Correct shared navigation, accessibility, and metadata

**Files:**

- Modify: `src/layouts/Layout.astro`
- Modify: `src/components/layout/Header.astro`
- Modify: `src/components/layout/Footer.astro`
- Modify: `src/styles/global.css`
- Test: `tests/brand-content.test.mjs`

- [ ] Add a keyboard-visible `Skip to content` link and `id="main-content"` to the main landmark.
- [ ] Limit browser-language auto-redirect to the bare `/` path so direct `/fr/` and `/es/` visits remain in the requested locale.
- [ ] Replace the top-level `Concepts` item with `About`, rename `Insights` to `Thinking`, and change the CTA to `Discuss a role`, with equivalent French and Spanish labels and route prefixes.
- [ ] Add `aria-current="page"` to the active desktop and mobile navigation item based on the current pathname.
- [ ] Replace flag-only language controls with compact text language codes and accessible current-language state.
- [ ] Add mobile-menu Escape handling, focus containment, focus restoration, body-scroll restoration, and correct localized button text after toggling.
- [ ] Point default Open Graph metadata to a real public image and add locale alternate links for matching routes.
- [ ] Ensure focus rings and cobalt-on-paper contrast meet WCAG AA for normal text.
- [ ] Run `node --test tests/brand-content.test.mjs`; confirm the full suite passes.
- [ ] Run `npm run build`; expect success.
- [ ] Commit: `fix: improve navigation and site accessibility`.

## Task 5: Tighten responsive type and route-level alignment

**Files:**

- Modify: `src/styles/tokens.css`
- Modify: `src/styles/global.css`
- Modify: `src/components/ui/Heading.astro`
- Modify: `src/components/ui/Section.astro`
- Modify only where verified necessary: `src/pages/about.astro`, `src/pages/capabilities.astro`, `src/pages/hire.astro`, `src/pages/insights/index.astro`, `src/pages/concepts/index.astro`, `src/pages/work/[slug].astro`, `src/pages/insights/[slug].astro`, `src/pages/concepts/[slug].astro`

- [ ] Reduce shared display-size ceilings so detail-page titles do not consume 600+ vertical pixels on desktop.
- [ ] Standardize page-opening top padding below the fixed header and cap editorial line length consistently.
- [ ] Keep section spacing generous but reduce repeated empty hero space on index and detail templates.
- [ ] Preserve the site's existing diagrams and content hierarchy while removing any route-specific collision or clipping found during inspection.
- [ ] Run `npm run build`; expect success.
- [ ] Start the preview server and visually inspect all 15 unique page patterns at 1440×1000 and 390×844.
- [ ] Check `document.documentElement.scrollWidth === window.innerWidth` and bounding-box intersections for fixed header, headings, actions, grids, and footers.
- [ ] Commit: `style: tighten responsive page hierarchy`.

## Task 6: Add the real social card and repository polish

**Files:**

- Create: `public/og/home.svg`
- Create from verified SVG render: `public/og/home.png`
- Modify: `src/layouts/Layout.astro`
- Modify: `package.json`
- Modify: `README.md`

- [ ] Create a restrained 1200×630 brand card using the same paper, black, and cobalt system, with Yoann's name, role proposition, and site URL.
- [ ] Render the SVG to PNG using an available local renderer and inspect the PNG before wiring it into metadata.
- [ ] Rename the package from the starter placeholder and replace the starter README with concise local development and build instructions.
- [ ] Run `npm run build`; confirm the referenced OG asset exists in `dist/og/home.png`.
- [ ] Commit: `chore: complete brand metadata and project docs`.

## Task 7: Perform full browser verification and leave a test URL running

**Files:**

- Test: generated screenshots outside committed source or under ignored audit output only
- Verify: all route templates and interactive navigation

- [ ] Run `node --test tests/brand-content.test.mjs`; expect all tests green.
- [ ] Run `npm run build`; expect all routes generated without warnings or errors attributable to this work.
- [ ] Start `npm run dev -- --host 127.0.0.1` in a persistent terminal session.
- [ ] Use Playwright to inspect `/`, `/work/`, `/capabilities/`, `/about/`, `/hire/`, `/insights/`, `/concepts/`, one route from each detail template, and representative `/fr/` and `/es/` routes at 1440×1000 and 390×844.
- [ ] Verify no horizontal overflow, no content overlap, no clipped controls, no console errors, and a single visible H1 on every sampled route.
- [ ] Exercise the mobile menu with keyboard input, including Tab containment and Escape close/focus restoration.
- [ ] Verify `/fr/` and `/es/` do not redirect when loaded directly.
- [ ] Inspect final screenshots for spacing, baselines, hierarchy, card alignment, and CTA visibility; correct and re-run if any failure appears.
- [ ] Run `git status --short` and confirm only intended implementation files plus the pre-existing generated `graphify-out/` are present.
- [ ] Report the persistent local URL `http://127.0.0.1:4321/` (or the actual assigned port), the validation commands, and any intentionally deferred content work.
