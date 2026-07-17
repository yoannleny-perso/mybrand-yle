# Concepts Index Layout Repair

**Date:** 2026-07-17

**Status:** Approved

**Branch:** `feat/recruiter-first`

## Objective

Repair the concepts index layout and close the browser-audit gap that let it ship. The page currently renders every concept title at zero width, parks its filter toolbar underneath the fixed header, and hides six French filter labels inside horizontal scroll containers.

## Observed Defects

Measured on `/fr/concepts` at 1440 CSS pixels against the running dev server.

1. **Every concept title computes to 0px wide — 100 zero-width elements per page** (50 titles, 50 arrows). `.concept-item a` declares `grid-template-columns: minmax(0, 1fr) auto` but holds three children (`h3`, `span`, `i`). The definition lands in the `auto` column and takes its 859px max-content width, starving the title's `minmax(0, 1fr)` track to zero. The title text then overflows its own zero-width box and paints across the definition. Computed value: `linkGridColumns: "0px 859.219px"`.

2. **The sticky toolbar overlaps the fixed header by 80px.** `.concept-tools` uses `top: 0` while the header is `position: fixed` occupying the first 80px. Stacking order is already correct — header `z-50`, toolbar `z-20` — so the fault is the offset alone, not the paint order.

3. **Six French filter labels are cut off.** "Ingénierie", "BI & Décisionnel", "IA Agentique", "Essentiel", "Intermédiaire", "Avancé" extend past their containers; `#cluster-filters` needs 662px and receives 364px. `overflow-x: auto` hides them behind a scroll instead of overflowing the document.

A site-wide scan of 34 routes at 390px and 1440px found zero-width text on the concepts index only, in all three locales. No other route is affected.

## Root Cause of the Audit Gap

`tests/ui-audit.spec.ts` passes 110/110 on this page. It asserts document-level horizontal overflow, broken images, control size, small purple text, and runtime errors. It never asserts element-level geometry.

A conventional bounding-box overlap test would also miss defect 1: the title's box is zero-wide, so it never formally intersects the definition's box. The overflowing *text* is what collides. The reliable signal is a text-bearing element computing to under 1px wide.

## Approved Direction

**Row presentation — stacked.** The definition sits beneath the title; the title takes the full column.

**Toolbar — labelled groups.** The toolbar parks below the header, filter chips wrap instead of scrolling, and each group carries a visible label naming its dimension.

## Design

### Row structure

Wrap the title and definition in a single element inside `.concept-item a`, so the grid's two children match its two columns:

- column 1 (`minmax(0, 1fr)`): title stacked above definition;
- column 2 (`auto`): the arrow.

The depth label stays in the outer `9rem` column of `.concept-item`. This is structural: the title's width no longer depends on the definition's content length, so no width tuning is required.

### Toolbar

- Add a `--header-height` token to `src/styles/tokens.css`. The header measures 88px at rest and 80px once scrolled, consistently at 320, 390, 768, 1024, and 1440 pixels. The sticky offset is only exercised while scrolled, so the token carries the scrolled height.
- `.concept-tools` sticks to `top: var(--header-height)`.
- Filter groups use `flex-wrap: wrap` instead of `overflow-x: auto`, so no label is ever hidden.
- Each group gets a visible label: `Cluster` / `Depth` (EN), `Pôle` / `Niveau` (FR), `Pilar` / `Nivel` (ES). These reuse vocabulary already present in the filter copy ("Tous les pôles", "Todos los pilares") rather than introducing new terminology.

### Accessibility

The two button sets currently carry no group label; assistive technology announces ten unrelated toggles. Each group becomes `role="group"` with `aria-labelledby` referencing its visible label, so the dimension is announced. Existing `aria-pressed` behaviour is unchanged.

### Anchor offset

`.cluster-section` uses `scroll-margin-top: 12rem`. A wrapped two-row toolbar plus the header exceeds that, which would land "Browse cluster" anchors underneath the toolbar. The offset is re-derived from the header and toolbar heights rather than left at its current value.

### Localization

Filter group labels join the existing `copy` object in `ConceptsIndex.astro` for all three locales. Structure, order, and interaction stay identical across locales; only the strings differ.

## Verification

Extend `tests/ui-audit.spec.ts` with two checks that fail against current code and pass after the repair:

- **Zero-width text guard**, across every audited template: no visible element owning direct text may compute to under 1px wide. This is the signal that catches this defect class.
- **Sticky/header collision guard**: when scrolled, `.concept-tools` must not intersect the fixed header.

Extend `tests/brand-content.test.mjs` to assert the filter group labels exist for EN, FR, and ES and are wired to `aria-labelledby`.

Existing gates must stay green: `npm test`, `npm run build` at 223 routes, and the full Playwright suite.

## Scope Boundary

Touches `src/components/pages/ConceptsIndex.astro`, `src/styles/tokens.css`, and the two test files.

Does not restyle the cluster overview, concept map, or contribution sections; they render correctly and are not part of the fault. Does not change concept content, taxonomy, search behaviour, or routes.
