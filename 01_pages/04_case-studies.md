# 04 — Case Studies (Work)

The /work page is an editorial gallery of selected production engagements. Each case study has its own detail sub-page; the index page presents them with magazine-grade composition.

## Page structure

1. Header
2. Asymmetric gallery of cards (4 at launch, room for more)
3. Engagement scope filter (capability tags)
4. Closing CTA

---

## SECTION — HEADER

**Eyebrow:** `WORK`

**Display title (display-l):**
> *Selected production work.*
> *Each entry is a system in service.*

**Lede (body-l, max 60ch):**
> A small selection of engagements where the architectural decisions, operating model, and outcomes can be written about openly. Anonymized examples are available on request for engagements under NDA.

---

## SECTION — FILTER ROW

A single horizontal row of filter pills, --t-meta size, no border, with the active pill underlined. Default is `All`.

```
ALL · DATA PLATFORMS · AGENTIC AI · OPERATING MODEL · EXECUTIVE
```

These filter the cards below client-side without page reload.

---

## SECTION — CASE STUDIES GALLERY

Asymmetric grid as defined in the design system. Each card links to `/work/{slug}`.

---

### CARD 1 — Tall, columns 1-5

**Cover image direction:** A still life of a printed agent topology diagram on a desk, captured in monochrome.

**Card metadata:**
- **Year / scope tag:** `2025 · ENTERPRISE CONSULTING · 18 MONTHS`
- **Capabilities:** `AGENTIC AI · OPERATING MODEL`

**Title (--t-headline):** *Multi-Agent Skill Tracker*

**Description (body-s, max 220 chars):**
> A hierarchical agent system maintaining a live skills graph for 40+ consultants — recommending staffing, surfacing gaps, and giving leadership a weekly read on bench health.

**Outcome metrics (small grid):**
| +15% | utilization |
| -22% | bench time |
| 3 | regions |

**CTA:** `→ Read the case study`

---

### CARD 2 — Wide, columns 7-12

**Cover image direction:** A black-and-white architectural photograph (concrete and steel layers) — visual analog for the medallion concept.

**Card metadata:**
- **Year / scope tag:** `2024 · GLOBAL ENTERPRISE · 12 MONTHS`
- **Capabilities:** `DATA PLATFORMS · OPERATING MODEL`

**Title (--t-headline):** *Enterprise Medallion Stack*

**Description (body-s):**
> A bronze–silver–gold lakehouse deployed across three regions with a governed semantic layer on top. Analytics, ML, and agentic workflows now read from one source of truth.

**Outcome metrics:**
| $13M+ | revenue impact |
| 9 mo | to payback |
| 0 | KPI drift incidents |

**CTA:** `→ Read the case study`

---

### CARD 3 — Square, columns 1-4

**Cover image direction:** A clean still life of a single printed page — a metric definition document — under directional light.

**Card metadata:**
- **Year / scope tag:** `2024 · MID-MARKET · 6 MONTHS`
- **Capabilities:** `DATA PLATFORMS · AGENTIC AI`

**Title (--t-headline):** *AI-Ready Semantic Layer*

**Description (body-s):**
> A metric layer redesigned specifically for LLM and agent consumption — eliminating hallucinated KPIs and standardizing how AI reads the business.

**Outcome metrics:**
| 0 | KPI drift incidents |
| 47 | conformed metrics |
| 4 | LLM systems consuming the layer |

**CTA:** `→ Read the case study`

---

### CARD 4 — Tall, columns 6-10

**Cover image direction:** A black-and-white photograph of an organizational whiteboard mid-design.

**Card metadata:**
- **Year / scope tag:** `2023 · GLOBAL ENTERPRISE · 24 MONTHS`
- **Capabilities:** `OPERATING MODEL · EXECUTIVE`

**Title (--t-headline):** *Global Data Ops Scaling Model*

**Description (body-s):**
> An operating model for a 40-person data function across three regions: pod design, role split, ritual cadence, and an internal observability layer for delivery health.

**Outcome metrics:**
| 40+ | experts orchestrated |
| 3 | regions |
| 4 Q | to steady-state |

**CTA:** `→ Read the case study`

---

## SECTION — CLOSING

**Display statement (display-l, weight 300):**
> *Production work is the only proof that matters.*

**CTAs:**
- Primary: `Start a conversation →`
- Ghost: `See my approach`

---

## CASE-STUDY DETAIL PAGE TEMPLATE (used for /work/{slug})

Each individual case-study page follows this anatomy:

1. **Header** — Eyebrow (`WORK · {YEAR}`), large title, one-line subhead
2. **Cover image** — Full-bleed
3. **Brief box** (small grid, --t-meta labels):
   - Client / Sector / Engagement type / Duration / Region(s) / My role
4. **The problem** — 2 paragraphs, no acronyms
5. **The architecture** — Diagram (use the visualizer for an inline architectural diagram) + 3-4 paragraphs
6. **The operating model** — How the team and rituals were designed
7. **The outcome** — Numbers, what changed at the P&L level, qualitative shifts
8. **What I would do differently** — 1 paragraph of honest retrospective
9. **Related concept entries** — 3 internal links into the concept library
10. **Closing CTA**

The "what I would do differently" block is non-negotiable. It is the single section that separates a real practitioner's case study from a marketing brochure.
