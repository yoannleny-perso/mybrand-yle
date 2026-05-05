# 05 — Insights Index

The /insights page is the home for long-form essays — opinion-driven writing that is *not* in the concept library (which is reference material). This is where Yoann argues, takes positions, and publishes thinking that shows judgment.

## Page structure

1. Header
2. Featured essay (full-width)
3. Essay grid (3-column)
4. Topic filter
5. Closing CTA + concept library cross-link

---

## SECTION — HEADER

**Eyebrow:** `INSIGHTS`

**Display title (display-l):**
> *Writing is how I think.*

**Lede (body-l, max 60ch):**
> Essays on the questions that decide whether data and AI deliver — operating models, architectural choices, and the soft systems that hold both together. For reference material on specific concepts, see the [concept library](/concepts).

---

## SECTION — FEATURED ESSAY

A single full-bleed editorial card. Cover image, eyebrow, large title, two-line dek, metadata.

**Eyebrow:** `FEATURED · AGENTIC AI`

**Title (display-m):** *Why most agent demos collapse in production.*

**Dek (body-l, 2 lines):** Probabilistic systems can be built in a weekend. Governable ones take a year. The gap between the two is where most AI initiatives quietly fail.

**Metadata row (--t-meta):**
`14 MIN READ · LAST REVIEWED MARCH 2026`

**CTA:** `→ Read the essay`

---

## SECTION — ESSAY GRID

A 3-column grid (4-col on widest desktop). Each card has a small monogrammed cluster tag, a display-m title, a one-line dek, and a metadata row.

### Initial essays (write 8 to launch, publish 1-2 per quarter)

1. **AGENTIC AI** · *The case for deterministic guardrails*
   The boring half of agent design that decides whether the magical half ever ships.
   `9 MIN · MARCH 2026`

2. **DATA ARCHITECTURE** · *Lakehouse, warehouse, mesh — what actually changes for the business*
   A short decision tree, not a religious debate.
   `11 MIN · FEBRUARY 2026`

3. **OPERATING MODEL** · *Designing teams for agentic operations*
   When agents handle execution, your org chart is wrong by default.
   `13 MIN · FEBRUARY 2026`

4. **BI & ANALYTICS** · *The semantic layer is the new data API*
   Why your KPIs need a contract before your agents read them.
   `8 MIN · JANUARY 2026`

5. **EXECUTIVE** · *Ten numbers that should be on every CEO's data dashboard*
   And the forty that should not.
   `7 MIN · JANUARY 2026`

6. **DATA ENGINEERING** · *The half-life of a data stack is shorter than you think*
   Architecture decisions made today have a four-year horizon, not ten.
   `10 MIN · DECEMBER 2025`

7. **AGENTIC AI** · *Tool calls are not features. Tools are products.*
   Treating tools as products is the difference between a clever demo and a governable system.
   `9 MIN · DECEMBER 2025`

8. **OPERATING MODEL** · *Data as a product, three years on*
   What worked, what didn't, what the literature still gets wrong.
   `12 MIN · NOVEMBER 2025`

---

## SECTION — TOPIC FILTER

A horizontal pill row above the grid:

```
ALL · AGENTIC AI · DATA ARCHITECTURE · DATA ENGINEERING · BI & ANALYTICS · OPERATING MODEL · EXECUTIVE
```

Filters the grid client-side.

---

## SECTION — CONCEPT LIBRARY CROSS-LINK

A single editorial block at the bottom of the page, separated by a hairline.

**Eyebrow:** `REFERENCE`

**Title (display-m):** *Need a definition, not an opinion?*

**Body:**
> The [concept library](/concepts) is where I put the reference material — definitions, vendor comparisons, and architectural patterns. Currently 50+ entries across data architecture, data engineering, BI and analytics, and agentic AI.

**CTA:** `→ Browse the concept library`

---

## SECTION — CLOSING

**Display statement (display-l, weight 300):**
> *If something here is useful — say so.*
> *If something here is wrong — say that too.*

**CTAs:**
- Primary: `Send a direct email →`
- Ghost: `Subscribe to new essays`

---

## ESSAY DETAIL PAGE TEMPLATE (used for /insights/{slug})

Each individual essay page is built for reading, not for SEO theater.

1. **Top metadata strip** — Cluster · Reading time · Last reviewed
2. **Title** — display-l, single column, max 18ch wide so it breaks naturally
3. **Dek** — body-l, single sentence, --ink-500
4. **Optional cover image** — only when the image earns the space
5. **Body** — Single column, max 64ch wide, generous paragraph spacing
   - Pull quotes for emphasis (use the design system pull-quote component)
   - Inline diagrams via the visualizer when they aid understanding
   - Footnotes at the bottom rather than inline parentheticals
6. **Author signature block** — Small portrait + 3-line bio + LinkedIn link
7. **Related reading** — 3 entries, mix of essays and concept pages
8. **Comment policy** — One sentence: "I don't host comments. Email or LinkedIn welcome."
