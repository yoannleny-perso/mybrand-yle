# Recruiter-First Personal Brand Redesign

**Date:** 2026-07-16  
**Status:** Approved through user direction: recruiters are the primary audience and the proof-led redesign should be implemented.

## Objective

Turn yoannleny.com from a broad consultancy and knowledge site into a recruiter-first personal brand that proves Yoann Leny can lead, architect, and ship data and AI operating systems. The first visit must answer four questions quickly:

1. What senior role is Yoann suited for?
2. What has he actually built?
3. What scope and outcomes has he owned?
4. Where can a recruiter go next to validate the fit?

The concept library and essays remain valuable evidence, but they support the work rather than competing with it in the primary journey.

## Alternatives considered

### A. Executive proof dossier — selected

The site behaves like a concise executive case file. A compact opening establishes role, availability, and operating thesis. Named achievements appear immediately. Capability claims are connected to project evidence, and secondary material is organized as supporting depth.

**Advantages:** fastest recruiter comprehension, clearest proof hierarchy, least risk of visual gimmickry, and straightforward maintenance as project details are added.

### B. Editorial magazine

The site emphasizes essays, large typography, and a highly curated reading experience. Projects appear as feature stories.

**Trade-off:** distinctive and credible for peers, but slower for recruiters who need role, scope, and outcomes quickly. The current site already leans in this direction.

### C. Operating-system console

The site uses a highly interactive interface metaphor: projects become modules and capabilities become system signals.

**Trade-off:** innovative, but likely to feel like interface theater, impose more JavaScript, and conflict with the brand principle of restraint.

## Experience principles

1. **Proof before taxonomy.** Named work appears before capability categories or long-form thinking.
2. **Recruiter scan first, expert depth second.** The first screen is concise; deeper evidence remains one click away.
3. **One visual system.** Remove the conflict between editorial brand documentation and pastel SaaS presentation. Use warm paper, near-black ink, one accessible cobalt signal, restrained rules, and compact cards.
4. **Measured typography.** Display type creates identity without consuming the whole viewport. Mobile openings must reveal both the proposition and the next action.
5. **Evidence has provenance.** Each achievement distinguishes what Yoann owned, what was produced, what capabilities it proves, and which details are still pending or confidential.
6. **Motion explains hierarchy.** Short reveal transitions are allowed; decorative ambient effects are not.

## Information architecture

### Primary navigation

- Work
- Capabilities
- About
- Thinking
- Recruiter CTA: `Discuss a role`

“Thinking” routes to the insights index and links onward to the concept library. Concepts remain accessible but no longer occupy a top-level recruiter journey slot. The active page is visibly indicated.

### Homepage sequence

1. **Recruiter-first hero**
   - Availability/status marker
   - Target role: VP / Head of Data & AI
   - Concise operating proposition
   - Primary CTA to the hiring page
   - Secondary CTA to achievements
   - Compact identity and location metadata

2. **Executive proof strip**
   - 40+ experts orchestrated
   - 3 regions led
   - $13M+ attributed impact, retained only where Yoann confirms it is publishable
   - Data, AI, and operating-model scope

3. **Selected achievements**
   - Five named projects
   - Each card exposes project type, one-line purpose, capabilities, and `Case study in preparation`
   - Cards do not link to empty routes; they are semantic project summaries until full case studies exist

4. **Leadership capability map**
   - Build data and AI platforms
   - Operationalize agentic systems
   - Design reporting and decision products
   - Scale teams and operating models
   - Each capability cites relevant named achievements

5. **Recruiter fit block**
   - Target mandates
   - Geographic/mobility summary
   - Languages
   - Availability
   - Direct link to the detailed hiring page

6. **Supporting depth**
   - Decision log
   - Selected essays
   - Concept library

7. **Compact contact close**

### Work index

The work page becomes the canonical achievement index. The five named projects replace the anonymized four-card gallery as its leading content. Existing anonymized case studies remain available as supporting deep links until Yoann decides whether to map or retire them.

### Secondary pages

- **About:** retains the personal narrative and track record, with a smaller opening.
- **Capabilities:** remains detailed but receives a compact opening and evidence links.
- **Insights/concepts:** retain their content and search value with quieter article headers.
- **Now/hire/decisions:** remain separate credibility tools but use the shared responsive opening scale.
- **Legal:** uses compact utility-page spacing.

## Achievement content model

The five placeholders are stored as structured data rather than repeated markup.

Required fields:

- `slug`
- `name`
- `summary`
- `projectType`
- `industry`
- `location`
- `status`
- `capabilities`
- `accent`
- `href`, nullable until a case study exists

Initial entries:

1. **GroupIQ** — A centralized reporting portal for the pharmaceutical industry in Australia.
2. **Polaris** — A clearer way to run people operations.
3. **Lense Studio** — An automated way to audit dashboards and propose improvements.
4. **Cap Ostrea** — A mobile marketplace for oyster producers in Arcachon Bay.
5. **Media Data Studio** — A multi-agent system that connects media platforms and builds an AI-ready data architecture.

Each is explicitly labeled `Case study in preparation`; the UI never invents metrics, employers, dates, or ownership details.

## Component architecture

- `src/data/achievements.ts`: typed single source of truth for placeholder projects.
- `src/components/sections/AchievementCard.astro`: reusable evidence card with status and capability tags.
- `src/components/sections/RecruiterHero.astro`: concise, responsive homepage opening.
- `src/components/sections/ProofStrip.astro`: compact track-record summary.
- Existing `Container`, `Section`, `Grid`, `Eyebrow`, and `Heading` primitives remain, but their shared spacing and display scales are corrected.

Components have one purpose and accept content through props. Homepage and work pages import the same achievement data so they cannot drift.

## Visual direction

- Warm off-white background, true black primary text, accessible cobalt accent.
- Remove pastel rainbow surfaces from the recruiter-first path.
- Use thin rules, indexed labels, and subtle project-specific diagram marks to create a dossier/blueprint character.
- Cards use small radii and precise alignment rather than large rounded SaaS tiles.
- Desktop content uses a 12-column grid; mobile uses a strict single-column flow with 24px gutters.
- Homepage H1 caps near 72px desktop and 46px mobile. Article/detail titles cap near 72px desktop and 48px mobile.
- First sections target 520–720px desktop and fit the primary proposition plus action within one 844px mobile viewport.

## Correctness and accessibility

- Explicit `/fr/` and `/es/` homepage visits are preserved; browser-language detection only runs on `/`.
- Add a skip-to-content link and stable `main` target.
- Add `aria-current="page"` to primary navigation.
- Mobile menu closes on Escape, traps focus while open, restores focus to its trigger, and keeps localized labels.
- Replace ambiguous desktop flag-only language controls with text abbreviations.
- Use an accent color with at least 4.5:1 contrast for normal text.
- Ensure all visible controls meet a 44px touch-target floor where practical.
- Add real Open Graph artwork so metadata never references a missing asset.

## Performance

- Replace oversized raw portraits with optimized responsive assets or serve constrained variants.
- Avoid adding new client-side frameworks or decorative JavaScript.
- Keep Astro static rendering and existing content collections.

## Validation

1. Production build completes for all routes.
2. English, French, and Spanish primary routes return the intended locale.
3. Homepage and every unique page template are rendered at 1440×900 and 390×844.
4. No horizontal overflow, heading overlap, clipped text, or console errors.
5. Mobile navigation passes open, Escape-close, and focus-return checks.
6. Homepage contains all five named achievements and recruiter CTAs.
7. Default Open Graph image resolves successfully.
8. Reduced-motion behavior preserves visible content.

## Scope boundary

This implementation creates the recruiter-first system and honest achievement placeholders. It does not invent confidential project details, fabricate metrics, translate the English technical library, or create five full case-study narratives without source material from Yoann.
