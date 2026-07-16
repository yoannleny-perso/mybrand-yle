# Localized Recruiter Experience Parity

**Date:** 2026-07-16
**Status:** Approved direction, implementation pending
**Scope:** English, French, and Spanish Home and Work experiences; shared browser-language selection; recruiter-hero portrait

## Objective

Every visitor should see the same recruiter-first information architecture and visual system regardless of language. English, French, and Spanish must differ only in translated copy, locale-aware links, and conventional number formatting. A recruiter entering `yoannleny.com` should receive the best supported language automatically and should see Yoann's portrait on the landing page.

## Current Problem

The English Home and Work pages use the new evidence-dossier design, while the French and Spanish routes still render the earlier portfolio design. The three route files own separate markup, so visual parity depends on manually repeating future changes. The shared layout already has browser-language detection, but the behavior needs explicit browser-level verification. The new recruiter hero does not currently show a portrait.

The existing code graph confirms that the three locale home routes are independent page files sharing lower-level layout and hero dependencies (`src/pages/index.astro`, `src/pages/fr/index.astro`, `src/pages/es/index.astro`, and `src/layouts/Layout.astro`). The solution is to move page composition above the route wrappers rather than duplicate the redesigned markup again.

## Selected Architecture

### Shared page renderers

Create two shared Astro page components:

- `src/components/pages/RecruiterHome.astro`
- `src/components/pages/WorkIndex.astro`

The six public route files become thin wrappers that pass a typed locale:

- `src/pages/index.astro` → `locale="en"`
- `src/pages/fr/index.astro` → `locale="fr"`
- `src/pages/es/index.astro` → `locale="es"`
- `src/pages/work/index.astro` → `locale="en"`
- `src/pages/fr/work/index.astro` → `locale="fr"`
- `src/pages/es/work/index.astro` → `locale="es"`

All markup, section order, responsive classes, image treatment, and interaction behavior live in the shared renderers. Route wrappers may set locale-specific metadata but may not contain page-section markup.

### Typed localized content

Add a typed locale module, `src/data/localized-site.ts`, with:

- `Locale = 'en' | 'fr' | 'es'`
- shared path helpers
- Home-page copy for every label, heading, paragraph, CTA, capability row, recruiter-fit item, and thinking entry
- Work-page copy for headings, supporting-case labels, and closing CTA
- metadata titles and descriptions for Home and Work

Update `src/data/achievements.ts` so project identity and structural fields remain shared while summaries, taxonomy labels, context labels, and capability tags are provided for all three locales. Proper project names—GroupIQ, Polaris, Lense Studio, Cap Ostrea, and Media Data Studio—do not change.

The content API returns a locale-specific view model to `AchievementCard.astro`. The card component remains unaware of translation storage and only renders the supplied strings.

### Parity invariant

The shared Home renderer always outputs this section order:

1. Recruiter hero with portrait
2. Published proof strip
3. Five named achievements
4. Capability-to-evidence map
5. Recruiter-fit block
6. Supporting thinking
7. Contact close

The shared Work renderer always outputs:

1. Work introduction
2. Five named achievement dossiers
3. Four supporting case studies
4. Recruiter CTA

Each top-level section receives a stable `data-page-section` identifier. Browser tests compare the identifiers and their order across English, French, and Spanish so future drift becomes a failing test.

## Portrait Treatment

Use the existing `public/images/portrait.jpeg`, which is already the canonical portrait on About, Hire, Contact, and article-author areas. Generate a smaller optimized derivative for the landing experience while retaining the JPEG as a fallback.

The portrait sits at the top of the recruiter brief in `RecruiterHero.astro`:

- desktop: a restrained landscape crop above the role/scope/reach dossier
- mobile: the same image remains first within the recruiter brief, immediately after the hero proposition and actions
- grayscale treatment with the existing cobalt rule, preserving the evidence-dossier visual language
- explicit width and height, `object-fit: cover`, and a face-aware object position to prevent layout shift or poor cropping
- `loading="eager"`, `fetchpriority="high"`, and descriptive alt text `Yoann Leny`

The photo is identity evidence, not decoration. It should remain visually secondary to the proposition but clearly visible on the landing page.

## Browser-Language Selection

Language selection remains a static-site redirect at the bare root path only.

On a visit to `/`:

1. Read a valid explicit language preference previously stored by the language switcher.
2. If none exists, inspect `navigator.languages` in order, falling back to `navigator.language`.
3. Normalize regional variants such as `fr-FR`, `fr-CA`, and `es-MX` to `fr` or `es`.
4. Redirect supported non-English languages to `/fr/` or `/es/` using `location.replace`.
5. Keep English and unsupported languages on `/`.

Direct visits to `/fr/`, `/es/`, or any deeper localized route are never redirected. An explicit visitor selection overrides later browser-language inference, ensuring that switching from French to English does not bounce back to French at `/`.

## Localization Rules

- Translate interface copy naturally; do not translate proper project names or technology names.
- Preserve meaning and evidence strength across languages rather than forcing identical sentence lengths.
- Prefix all internal links with the active locale except English and deliberately English-only routes.
- Use `$13M+`, `40+`, and `3` consistently as proof values; localize their labels, not the underlying claim.
- Do not invent new metrics, confidential detail, testimonials, availability dates, or project outcomes.
- French and Spanish Work placeholders carry the same `case study in preparation` status as English.

## Existing Localized Pages

About, Capabilities, Hire, Contact, Insights, Concepts, legal pages, and localized detail routes already use corresponding page structures and passed the previous responsive template audit. This change does not rewrite their content. Shared navigation, typography, accessibility, and footer behavior remain global through the existing layout components.

## Accessibility and Performance

- Maintain one H1 and one main landmark per route.
- Keep the portrait alt text concise and do not duplicate it in adjacent visible text.
- Preserve keyboard navigation, active-page semantics, skip navigation, reduced-motion behavior, and mobile-menu focus containment.
- Use explicit image dimensions and an optimized derivative to avoid layout shift and transferring the original multi-megabyte portrait above the fold.
- Keep every CTA at least 44px high and verify translated labels do not clip or overlap.

## Verification

### Contract tests

Extend `tests/brand-content.test.mjs` to fail unless:

- all three Home route files delegate to `RecruiterHome.astro`
- all three Work route files delegate to `WorkIndex.astro`
- all five achievements have English, French, and Spanish copy
- `RecruiterHero.astro` renders the optimized portrait with eager priority and explicit dimensions
- the root language script evaluates `navigator.languages` and only redirects from `/`

### Build verification

- `npm test`
- `npm run build`
- confirm all 223 existing routes still build, with no route removed

### Browser verification

At 1440×1000 and 390×844, render English, French, and Spanish Home and Work pages and verify:

- identical `data-page-section` sequences per page type
- one visible H1
- no horizontal overflow
- no clipped headings, buttons, tags, or controls
- no interactive-element overlap or fixed-header collision
- portrait visible, correctly cropped, and not causing layout shift
- zero console or page errors

Create fresh browser contexts to verify:

- `en-US` → `/`
- `fr-FR` and `fr-CA` → `/fr/`
- `es-ES` and `es-MX` → `/es/`
- unsupported language → `/`
- direct `/fr/` and `/es/` remain unchanged
- stored explicit preference overrides browser language

## Non-Goals

- Rewriting every translated essay or concept entry
- Translating English-only Decision Log content
- Adding a CMS or runtime localization dependency
- Geo-IP language detection
- Publishing full detail pages for the five named achievements
- Replacing the approved evidence-dossier visual system
