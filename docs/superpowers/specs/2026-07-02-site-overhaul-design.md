# Site Overhaul — UI/UX Repair, Motion System, Content Fill, Job-Search Positioning

**Date:** 2026-07-02
**Status:** Approved (fixes A–D + quick-win features: /hire, /decisions)

## Context

Full visual audit (desktop 1440 + mobile 390, all pages, EN/FR/ES) found the site
undermined by broken links, invisible-by-default content, and layout overflow.
The user is actively job-hunting for VP/Head-of-Data & AI roles; the site must
serve recruiters and CTOs first.

Decisions made with Yoann:

1. **Missing content** → write it (4 case studies + 9 essays) from the
   `01_pages/` specs, in the documented brand voice. Yoann reviews after.
2. **Positioning** → keep operator brand, but signal openness to senior
   full-time roles on /now and /contact. Remove "fully booked" copy.
3. **Hero** → typographic hero leading with the master tagline
   "Building AI-Enabled Operating Systems for Modern Organizations."
   Photo and background watermarks removed until professional photography exists.
4. **Features** → best-mix ranking; this session builds the two quick wins
   (`/hire`, `/decisions`); Decision Engine, OS Map, Cost Calculator stay specced.

## A — Repairs

| # | Problem | Fix |
|---|---------|-----|
| 1 | Two competing scroll-reveal systems; site blank without JS; `.scroll-reveal` outside `Section.astro` permanently invisible | Single reveal utility. Content visible by default; hidden only when `<html class="js">` is set pre-paint. Remove dead `is-visible` CSS from global.css. |
| 2 | AsymmetricCard clips text (fixed aspect ratio + absolute inset content); empty gray "image" placeholders | Rebuild as flowing flex column with min-heights; per-capability generative monochrome cover replaces the gray void; metrics become a small grid per the case-studies spec. |
| 3 | Fixed transparent header overlaps content on scroll | Scrolled state: backdrop-blur surface + hairline. |
| 4 | Hero: master tagline prop never rendered; watermarks half-hidden behind photo; hard crop edges | Typographic hero, staggered line mask reveal; remove photo/watermarks. |
| 5 | Insights grid: oversized titles, ragged heights | Normalize title scale, equal-height cards. |
| 6 | Contact: LinkedIn URL breaks mid-word; empty avatar circle | Label the link; remove placeholder circle. |
| 7 | About: empty gray portrait + literal `[PHOTOGRAPHER NAME]` | Replace with quiet editorial block until real photography. |
| 8 | Concept detail: definition duplicated; empty "Appendix"; cramped vendor table | Dedupe, remove Appendix, spacing pass. |
| 9 | Footer 404s: /lab, /privacy, /imprint; "Calendar booking link" → /contact | Create minimal /privacy + /imprint; /lab appears when a lab tool ships; relabel calendar link. |
| 10 | All case-study and essay links 404 | Filled by section C. |

All repairs apply to EN, FR, ES.

## B — Motion system (restraint-compliant)

- Astro `<ClientRouter />` view transitions (soft cross-page fade).
- One reveal primitive: IntersectionObserver + CSS custom-property stagger.
- Metric count-up on first view, once.
- Magnetic primary CTA (subtle translation, spring ease).
- Hairline reading-progress bar on essay/concept detail pages.
- FLIP-style filter transitions on work/insights grids.
- Everything respects `prefers-reduced-motion`; nothing loops/pulses/autoplays.

## C — Content

- 4 case studies per `01_pages/04_case-studies.md` template, including the
  mandatory "What I would do differently" section, cross-linked to concepts.
- 9 essays per `01_pages/05_insights-index.md` (featured + 8), ~700–900 words,
  first-person, signed voice, cross-linked.

## D — Positioning

- `/now`: availability block → exploring VP / Head of Data & AI roles;
  advisory copy demoted. Update date surfaced.
- `/contact`: recruiter/hiring-team path added as a first-class option.

## E — Features

Build now:

1. **`/hire` — recruiter fast path.** Target roles, location/remote, languages,
   downloadable one-page CV, interactive "first 90 days" plan.
2. **`/decisions` — decision log.** Dated timeline of real technical bets with
   honest outcome grades.

Specced for later: Architecture Decision Engine (`/lab`), Operating System Map,
Agentic-AI Cost Calculator (`/lab`). See `03_killer-ideas/01_five-killer-ideas.md`.

## Testing

- `npm run build` must pass (static generation catches dead getStaticPaths).
- Playwright screenshot sweep (all pages × desktop/mobile) after implementation;
  verify no clipped text, no 404 links (crawl internal hrefs), content visible
  with JS disabled.
