# Tech Stack and Build Spec

> The recommended technology stack for yoannleny.com. Optimized for editorial polish, content velocity, and the lab tools described in the killer ideas document.

## Recommendation: Astro + MDX + Tailwind + Vercel

**Astro** for the framework. Static-first with islands of interactivity where needed. MDX support for the concept library. Excellent Lighthouse scores out of the box. Component model that works for both static pages and the lab tools without forcing a single-page-app architecture.

**MDX** for the concept library. Every concept page is a markdown file with structured front-matter. The 50 entries written in this package drop in directly. Cross-linking, related-reading sidebars, and cluster pages are computed from the front-matter at build time.

**Tailwind CSS** for styling, configured to expose the design tokens from `00_brand/02_design-system.md` as CSS custom properties. No tailwind component library — everything is built from utilities to preserve the editorial aesthetic. The `clamp()` typography scale lives in the Tailwind config.

**Framer Motion** for the constrained set of motion primitives — the hero load sequence, the scroll-reveal pattern, the testimonial crossfade. Configured to respect `prefers-reduced-motion` automatically.

**Vercel** for deployment. Edge network, automatic preview deployments per PR, analytics. Custom domain configured for `yoannleny.com`.

## Why not the alternatives

**Next.js**. Strong choice and a credible alternative — App Router and server components handle the same shape of work. Astro wins for this specific site because the bulk of the content is static-first and Astro's architecture rewards that pattern more directly. Choose Next.js if the lab tools require server-side computation that goes beyond what client-side state plus serverless functions can handle.

**Gatsby**. Mature MDX support but the ecosystem has stagnated. Not recommended for new builds in 2026.

**Hugo / Jekyll / 11ty**. Excellent for static content but the lab tools require interactive React components. Mixing static generators with React adds friction Astro avoids.

**WordPress / Webflow**. Wrong for this site. The aesthetic and the lab tools require the level of design control that only a code-first stack provides.

## Folder structure

```
yoannleny-site/
├── src/
│   ├── pages/                  # Routes
│   │   ├── index.astro         # Home
│   │   ├── about.astro
│   │   ├── capabilities.astro
│   │   ├── case-studies/       # Index + dynamic pages per study
│   │   ├── insights/           # Index + dynamic per essay
│   │   ├── concepts/           # Hub + dynamic per concept
│   │   ├── lab/                # Killer-idea tools
│   │   │   ├── architecture-decision-engine.astro
│   │   │   ├── cost-of-agentic-ai.astro
│   │   │   └── agentic-org-simulator.astro
│   │   ├── now.astro
│   │   └── contact.astro
│   ├── content/                # Content collections (MDX + frontmatter)
│   │   ├── concepts/
│   │   ├── case-studies/
│   │   └── insights/
│   ├── components/
│   │   ├── layout/             # Header, Footer, Container
│   │   ├── primitives/         # Eyebrow, MetricBlock, PullQuote
│   │   ├── sections/           # Hero, CapabilityRow, Testimonials
│   │   ├── concept/            # ConceptPage, RelatedReading, VendorTable
│   │   └── lab/                # DecisionEngine, CostCalculator, OrgSim
│   ├── styles/
│   │   ├── tokens.css          # CSS variables from design system
│   │   └── global.css
│   └── lib/                    # Utility functions
├── public/
│   ├── images/                 # B&W editorial photography
│   ├── fonts/                  # Self-hosted Fraunces, Inter Tight, JetBrains Mono
│   └── og/                     # OG image templates
├── astro.config.mjs
├── tailwind.config.mjs
└── package.json
```

## Content collections

Two collections, both MDX:

**`concepts`** — front-matter schema:
```yaml
title: string
slug: string
cluster: "data-architecture" | "data-engineering" | "bi-analytics" | "agentic-ai"
depth: "core" | "intermediate" | "advanced"
definition: string
readingTime: string
lastReviewed: string  # e.g. "2026-Q2"
relatedConcepts: string[]  # slugs
relatedCaseStudies: string[]  # slugs
```

**`case-studies`** — front-matter schema:
```yaml
title: string
slug: string
client: string  # may be anonymized
sector: string
yearStart: number
yearEnd: number
metrics: { label: string, value: string }[]
relatedConcepts: string[]
heroImage: string
```

**`insights`** — front-matter schema:
```yaml
title: string
slug: string
publishedAt: string
readingTime: string
tags: string[]
heroImage: string
```

## Fonts

Self-hosted via `@fontsource` packages or direct WOFF2 files in `/public/fonts`. No Google Fonts CDN — the privacy and performance trade-off favors self-hosting in 2026.

- **Fraunces** (variable, optical-size + weight + slant axes)
- **Inter Tight** (variable, weight axis)
- **JetBrains Mono** (regular and medium weights)

Preloaded in the document head. `font-display: swap`. Subsetting to Latin-extended is sufficient given Yoann's audience and content language (English primary, French secondary).

## Animations

Framer Motion only where the design system specifies motion. Three primitives:

1. **HeroSequence** — staged reveal of eyebrow, headline, body, metric strip on initial load
2. **ScrollReveal** — fade-and-translate on scroll, IntersectionObserver-driven
3. **TestimonialCrossfade** — opacity-based transition between testimonials, paused on hover

All wrapped in a `useReducedMotion()` check that disables motion entirely when the user has set the preference.

## Deployment

- **Vercel** for hosting; Git-based deploys from `main` for production, preview deploys per PR
- **GitHub Actions** for any additional CI checks (link checks, content validation)
- **Custom domain** `yoannleny.com` configured in Vercel; DNS at the registrar
- **HTTPS** automatic via Vercel
- **Analytics**: Vercel Analytics for traffic, Plausible for privacy-respecting page-level analytics
- **Forms**: Contact form via Formspree or simple `mailto:` — no marketing-automation tooling

## Performance budget

- **Lighthouse score**: 95+ on Performance, Accessibility, Best Practices, SEO
- **Largest Contentful Paint**: under 1.5s on 4G
- **Cumulative Layout Shift**: under 0.05
- **Total bundle size** (initial route): under 100KB gzipped excluding fonts

The lab tools are exempt from the bundle size budget but should lazy-load — they are not on the critical path of any other page.

## Maintenance cadence

- **Weekly**: Vercel deploy logs review, broken-link check
- **Monthly**: `/now` page update, top-of-funnel content review
- **Quarterly**: 8 concept entries reviewed and `lastReviewed` field updated, 2 net-new concepts added; vendor pricing in cost calculator refreshed; insights review
- **Annually**: Full design system review, dependency upgrade pass, accessibility audit
