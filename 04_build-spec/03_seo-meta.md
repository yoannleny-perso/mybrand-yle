# SEO and Meta Specification

> The metadata, structured data, and SEO patterns for yoannleny.com. Designed to position Yoann for the queries that matter — decision-stage terms in data architecture, agentic AI, and senior data leadership.

## Strategy

The site has two distinct SEO postures, each suited to its content type.

**Concept library and insights**: target decision-stage queries with high commercial intent. "Lakehouse vs warehouse," "best agentic AI framework," "Snowflake vs Databricks for ML," "data mesh vs data fabric." These are queries asked by the people who hire architects.

**Brand and capability pages** (home, about, capabilities, contact, case studies): not optimized for generic terms. These pages serve people who already know about Yoann or who arrive via concept-library entry points. Optimization is for branded queries ("Yoann Leny," "yoannleny.com") and for clarity once a visitor lands.

The strategy is intentional: rather than competing for top-of-funnel "data consultant" queries, the site dominates mid-funnel decision queries and converts the visitors those queries deliver. This is a smaller addressable audience but a higher-value one.

## Per-page metadata templates

### Home (`/`)

```html
<title>Yoann Leny — Data Operations and Agentic AI Architect</title>
<meta name="description" content="Yoann Leny architects AI-enabled operating systems for modern organizations. VP-level data and agentic AI work across three regions, $13M+ in revenue impact, fifty published architectural takes.">
```

### About (`/about`)

```html
<title>About — Yoann Leny</title>
<meta name="description" content="Operator-architect with VP-level experience leading data operations and agentic AI at scale. Background, principles, and how I work.">
```

### Capabilities (`/capabilities`)

```html
<title>Capabilities — Yoann Leny</title>
<meta name="description" content="Five pillars: agentic AI architecture, data and semantic platforms, strategic data operations, team orchestration, executive enablement. Three engagement modes: architect-in-residence, executive advisory, diagnostic and rebuild plan.">
```

### Case Studies (`/case-studies`)

```html
<title>Case Studies — Yoann Leny</title>
<meta name="description" content="Selected work: multi-agent skill tracker, enterprise medallion stack, AI-ready semantic layer, global data ops scaling model. Outcomes, decisions, and what I would do differently.">
```

### Insights index (`/insights`)

```html
<title>Insights — Yoann Leny</title>
<meta name="description" content="Essays on data architecture, agentic AI, and the operating model behind both. Updated regularly.">
```

### Insights detail (`/insights/[slug]`)

Title and description per essay, written manually. Pattern:

```html
<title>{essay.title} — Yoann Leny</title>
<meta name="description" content="{essay.description}">
```

### Concept library hub (`/concepts`)

```html
<title>Concept Library — Yoann Leny</title>
<meta name="description" content="Fifty deep takes on data architecture, data engineering, BI and analytics, and agentic AI. Each entry: what it is, why it matters, how it works, vendor comparison, and my take.">
```

### Concept detail (`/concepts/[slug]`)

Generated from front-matter:

```html
<title>{concept.title} — Yoann Leny</title>
<meta name="description" content="{concept.definition} {Cluster context} {Last reviewed: {concept.lastReviewed}}.">
```

### Lab pages (`/lab/*`)

Each tool gets a manual title and description:

```html
<!-- Architecture Decision Engine -->
<title>Architecture Decision Engine — Yoann Leny</title>
<meta name="description" content="Answer ten questions about your data and AI situation. Get an opinionated stack recommendation with reasoning, alternatives, and links to the relevant concepts.">

<!-- Cost of Agentic AI Calculator -->
<title>Cost of Agentic AI Calculator — Yoann Leny</title>
<meta name="description" content="Estimate the monthly cost and p95 latency of an agentic system from your inputs. Grounded in current 2026 pricing, with the architectural levers that shift the numbers materially.">

<!-- Agentic Org Simulator -->
<title>Agentic Org Simulator — Yoann Leny</title>
<meta name="description" content="Model how agentic systems reshape your organization over 24 months. Throughput, cost, and headcount profile across functions, with second-order effects.">
```

### Contact (`/contact`)

```html
<title>Contact — Yoann Leny</title>
<meta name="description" content="Three ways to engage: architect-in-residence, executive advisory, diagnostic and rebuild plan. Direct contact and current availability.">
```

### Now (`/now`)

```html
<title>Now — Yoann Leny</title>
<meta name="description" content="What I am working on this month, what engagements have capacity, and what is fully booked. Updated regularly.">
```

## Open Graph and Twitter Card

Every page has Open Graph and Twitter Card tags. The OG image is generated dynamically using a template-based approach.

### OG image template

A single image template per page-type, parameterized at build time with the page-specific content:

- **Home**: `/og/home.png` — static image with the tagline rendered in Fraunces
- **Concept**: `/og/concept/[slug].png` — generated per concept; layout is title in Fraunces, cluster name in JetBrains Mono, "yoannleny.com" branding bottom-right
- **Insight**: `/og/insight/[slug].png` — similar pattern with the essay title
- **Lab tool**: `/og/lab/[slug].png` — title plus a short description
- **Case study**: `/og/case-study/[slug].png` — title, sector, primary metric

OG images are generated at build time using `@vercel/og` or equivalent. Dimensions: 1200×630. Format: PNG. File size budget: under 200KB.

### Open Graph tags pattern

```html
<meta property="og:title" content="{page.title}">
<meta property="og:description" content="{page.description}">
<meta property="og:image" content="{ogImageUrl}">
<meta property="og:url" content="{canonicalUrl}">
<meta property="og:type" content="{website | article}">
<meta property="og:site_name" content="Yoann Leny">

<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="{page.title}">
<meta name="twitter:description" content="{page.description}">
<meta name="twitter:image" content="{ogImageUrl}">
```

## Structured data (Schema.org)

### Site-wide Person schema

In the home page `<head>`:

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Yoann Leny",
  "url": "https://yoannleny.com",
  "jobTitle": "VP Data Operations and Agentic AI Architect",
  "worksFor": {
    "@type": "Organization",
    "name": "Independent / yoannleny.com"
  },
  "sameAs": [
    "https://www.linkedin.com/in/yoannleny",
    "https://github.com/yoannleny"
  ],
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Bordeaux",
    "addressCountry": "FR"
  }
}
```

### Article schema for concept pages and insights

Each concept page and insight emits Article schema:

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "{title}",
  "description": "{definition or description}",
  "author": {
    "@type": "Person",
    "name": "Yoann Leny",
    "url": "https://yoannleny.com"
  },
  "datePublished": "{publishedAt}",
  "dateModified": "{lastReviewed or modifiedAt}",
  "publisher": {
    "@type": "Person",
    "name": "Yoann Leny"
  },
  "mainEntityOfPage": "{canonicalUrl}",
  "articleSection": "{cluster name}",
  "keywords": "{tags joined}"
}
```

### Breadcrumb schema for nested pages

Concept pages, case study pages, and insight pages emit BreadcrumbList:

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://yoannleny.com" },
    { "@type": "ListItem", "position": 2, "name": "Concepts", "item": "https://yoannleny.com/concepts" },
    { "@type": "ListItem", "position": 3, "name": "{concept.title}", "item": "https://yoannleny.com/concepts/{slug}" }
  ]
}
```

## Sitemap and robots

### `sitemap.xml`

Generated at build time. Includes every static and dynamic page. Updated on every deploy.

Priority hints (relative):
- Home, Concepts hub, Capabilities: 1.0
- Concept detail pages: 0.9
- Case studies, About, Contact: 0.8
- Insights: 0.7
- Lab pages: 0.7
- Now: 0.5

### `robots.txt`

```
User-agent: *
Allow: /
Disallow: /api/

Sitemap: https://yoannleny.com/sitemap.xml
```

## Canonical URLs

Every page declares its canonical URL explicitly:

```html
<link rel="canonical" href="https://yoannleny.com{path}">
```

URLs are kebab-case, no trailing slashes, no query parameters in canonicals. Trailing slashes redirect to non-trailing-slash via Vercel rewrite rules.

## Performance signals

Core Web Vitals are part of the SEO posture. The performance budget in the tech-stack document drives the SEO outcome:

- **LCP** under 1.5s on 4G
- **CLS** under 0.05
- **INP** (Interaction to Next Paint) under 200ms
- **First Input Delay** below 100ms

These are not aspirational. They are achievable with the static-first Astro architecture and disciplined component implementation.

## Internal linking strategy

Concept pages link to other concept pages. Case studies link to relevant concepts. Insights link to concepts and case studies. The home page links to top-priority pages directly; navigation surfaces the rest.

The pattern that compounds: every concept page has at least three outbound internal links (related concepts) and at least one to a case study. This creates a dense internal graph that helps search engines understand the site structure and helps visitors navigate by interest.

External links are used judiciously — primary references, vendor documentation, foundational papers. Each is `target="_blank" rel="noopener"`.

## Local and language signals

Yoann is based in Bordeaux, France. The site is primarily in English (the audience is international). French-language SEO is not a priority for v1. If a French-language section is added later, it lives at `/fr/*` with `hreflang` tags.

`<html lang="en">` for all current pages.

## Analytics and measurement

- **Vercel Analytics** for Web Vitals and traffic
- **Plausible Analytics** for privacy-respecting page-level analytics
- **Google Search Console** verified, monitoring impressions and clicks
- **No third-party trackers** (no Google Analytics, no Facebook Pixel, no marketing automation pixels)

The privacy posture is part of the brand positioning. Tracking aggressively contradicts the editorial restraint of the rest of the site.
