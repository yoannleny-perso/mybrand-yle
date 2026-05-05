# 03 — Information Architecture

## Sitemap

```
/                                       Home (single-page narrative)
├─ /about                               Long-form profile
├─ /capabilities                        Five pillars detailed
│   ├─ /capabilities/agentic-ai-architecture
│   ├─ /capabilities/data-platforms
│   ├─ /capabilities/strategic-data-ops
│   ├─ /capabilities/team-orchestration
│   └─ /capabilities/executive-enablement
├─ /work                                Case study gallery
│   ├─ /work/multi-agent-skill-tracker
│   ├─ /work/enterprise-medallion-stack
│   ├─ /work/ai-ready-semantic-layer
│   └─ /work/global-data-ops-scaling-model
├─ /concepts                            CONCEPT LIBRARY hub
│   ├─ /concepts/data-architecture/...  14 entries
│   ├─ /concepts/data-engineering/...   12 entries
│   ├─ /concepts/bi-analytics/...        8 entries
│   └─ /concepts/agentic-ai/...         16 entries
├─ /insights                            Editorial writing
├─ /lab                                 Live demos (the killer ideas)
│   ├─ /lab/agentic-org-simulator
│   ├─ /lab/architecture-decision-engine
│   └─ /lab/cost-of-ai-calculator
├─ /now                                 What I'm working on right now
└─ /contact                             Direct contact path
```

## URL conventions

- All lowercase, hyphens not underscores
- No trailing slashes
- Concept URLs use the pattern `/concepts/{cluster}/{kebab-case-name}`
- Case studies under `/work/{slug}` (not `/case-studies` — too long, less editorial)

## Navigation model

### Primary nav (sticky, top)
Six items maximum. Always:
```
Yoann Leny    Work · Capabilities · Concepts · Insights · Lab · Contact
```
The wordmark is the home link. The nav items are spaced wide; they are not crowded into the right side.

### On scroll
After 80vh of scroll, the nav background transitions from transparent to `var(--paper-50)` with a 1px bottom hairline. The wordmark shrinks from full to compact. 240ms transition.

### Mobile nav
Hamburger reveals a full-screen overlay with the same six items, each on its own row at `--t-headline` size. Background is `--ink-1000`, text is `--paper-50`. No animation theatrics — straight fade with stagger.

### Footer nav
Three columns:
1. **Sitemap** — Work, Capabilities, Concepts, Insights, Lab
2. **Direct** — Email, LinkedIn, Calendar booking link
3. **Meta** — Now, Privacy, Imprint

## Content depth and content velocity

The concept library is the engine of credibility. Targets:

| Cluster | Initial entries | Add per quarter |
|---|---|---|
| Data Architecture | 14 | +2 |
| Data Engineering | 12 | +2 |
| BI & Analytics | 8 | +1 |
| Agentic AI | 16 | +3 |

Total at launch: **50 concept pages**. At month 12: ~80. This volume is what makes the library credible as a body of thought rather than a token gesture.

## Concept page anatomy (templated)

Every concept page renders from the same template with five blocks:

1. **Header** — Eyebrow (cluster name) · Title · One-sentence definition · Reading time · Last reviewed date
2. **What it is** — 2 paragraphs, no jargon, define from first principles
3. **Why it matters** — Business framing, who cares, what breaks without it
4. **How it works** — Technical depth, diagrams welcome (use the diagram tool)
5. **Vendor comparison** — A 3-column comparison table of the major options Yoann has used or evaluated, followed by 1 paragraph of commentary per vendor
6. **Yoann's take** — One short signed paragraph with a clear opinion

Optional appendix: *Related reading* (3 internal links) · *External references* (3-5 authoritative sources)

## Cross-linking strategy

Every concept page must link to **at least three** other concept pages (related reading) and **at least one** case study (where Yoann applied this concept in production). This is what creates the dense, expert-feeling internal graph.

The home page deep-links into the concept library by topic — every capability pillar lists its 3 most important concept pages directly in the section.

## SEO posture

The concept library is the SEO play. Each page targets a specific query like *"medallion architecture vs lakehouse"* or *"snowflake vs databricks for ai workloads"*. The site does not chase volume; it chases **decision-stage queries** that senior buyers run.

Write each title tag as the literal question or comparison being decided. Skip clickbait. Skip "ultimate guide." Skip 2024/2025 in titles (dates them too fast).
