# 02 — About

A long-form profile page. Reads like the *About the author* page in a serious magazine — not a CV in HTML.

## Page structure

1. Header: eyebrow + name + role
2. Editorial portrait, full-bleed, with caption
3. Long-form bio (4-6 paragraphs)
4. Operating principles (5 numbered items)
5. Track record (numbers + scope, not job titles)
6. Stack & tools (single line, restrained)
7. Recognitions / writing index
8. Direct contact CTA

---

## SECTION — HEADER

**Eyebrow:** `ABOUT`

**Display title (display-l):**
> *Yoann Leny.*
> *Operator, architect, builder.*

**One-line subtitle (body-l, --ink-500):**
> Building data and AI operating systems for organizations that want margin, not magic.

---

## SECTION — PORTRAIT

A single full-bleed editorial portrait, 16:9 on desktop, 4:5 on mobile. Caption sits below in --t-meta:

> `BORDEAUX, FRANCE — PORTRAIT BY [PHOTOGRAPHER NAME], 2026`

---

## SECTION — LONG-FORM BIO

**Section eyebrow:** `01 — BIOGRAPHY`

**Body (single column, max 60ch wide, body-l for the lede then body):**

> I have spent the last decade learning the same lesson over and over again: organizations don't underperform because they lack tools — they underperform because the tools never compose into a working system. The dashboards exist. The data exists. The models exist. What is missing is the operating logic that turns them into decisions.
>
> My career has been the practice of installing that operating logic. Early on, I built data warehouses for performance teams who needed answers in minutes, not weeks. I learned the difference between a query that runs and a query that survives. Then I built the platforms underneath those warehouses — medallion lakehouses, semantic layers, contract-driven pipelines — because the brittleness of the old stack made fast answers slow again every six months.
>
> Around the time large language models stopped being a research curiosity and started being a deployable component, I had already been thinking about agents — about workflows that needed to act, not just retrieve. The work shifted toward designing multi-agent systems with deterministic guardrails: hierarchical agent graphs, audit trails, human-in-the-loop checkpoints. The pattern became clear: agentic AI works in production only when it sits on top of the same disciplined data foundation that traditional analytics needs. There is no shortcut.
>
> Most recently, as VP of Data Operations, I have been responsible for the full triangle: the platforms (data and AI), the operating model (40+ experts across three regions), and the executive surface (the visibility layer that turns the system into governable decisions). The triangle is the work. Removing one corner makes the other two collapse within twelve months.
>
> I write what I learn. The concept library on this site is not content marketing — it is a working notebook of how I think about each problem, with vendor comparisons grounded in what I have actually deployed. If something on the site feels useful to you, that is the goal. If you think I am wrong about something, I would prefer to hear it.
>
> I live in Bordeaux. I work with executive teams in France, the UK, and selectively across Europe and North America. I take on a small number of engagements each year — usually one large rebuild and one or two advisory relationships — because the depth that produces real outcomes is incompatible with portfolio thinking.

---

## SECTION — OPERATING PRINCIPLES

**Section eyebrow:** `02 — PRINCIPLES`

**Section title:** *How I work.*

A numbered list, large display, each principle on its own row with a hairline divider between.

| # | Principle | Gloss |
|---|---|---|
| 01 | Make the system legible. | If a CEO cannot see how decisions are made, the system isn't finished yet. |
| 02 | Treat data as a product. | Owners, contracts, SLAs, deprecation. The discipline of shipping software, applied to information. |
| 03 | Constrain agents before you scale them. | Probabilistic systems need deterministic borders. Guardrails are architecture, not afterthought. |
| 04 | Hire for system-thinking, not stack experience. | Tools change every two years. Operating instincts compound. |
| 05 | Remove more than you add. | Most organizations are already drowning. The senior move is restraint. |

---

## SECTION — TRACK RECORD

**Section eyebrow:** `03 — TRACK RECORD`

A clean grid of numbers — the same set used on the home page but with longer captions explaining what each represents.

| Metric | What it means |
|---|---|
| **$13M+** | Cumulative revenue impact across data and AI engagements, measured at the P&L level — not modeled, not estimated. |
| **40+** | Experts directly orchestrated across data engineering, analytics, AI, and adjacent functions. |
| **3** | Regions where I have led data and AI delivery in parallel — Europe, UK, and a third regional hub. |
| **15%** | Sustained utilization uplift on a 40-person consulting team after deploying the agentic skill-tracker system. |
| **9** | Months from kickoff to payback on the most recent enterprise medallion stack rebuild. |
| **0** | KPI drift incidents in production after introducing the AI-ready semantic layer. |

---

## SECTION — STACK & TOOLS

**Section eyebrow:** `04 — STACK`

A single restrained paragraph, body-s, --ink-500. Not a bingo card.

> Daily working tools include the major lakehouse and warehouse platforms (Databricks, Snowflake, BigQuery), orchestration through Airflow and Dagster, transformation in dbt, semantic layers via Cube and Looker's LookML, observability through Monte Carlo and Lightdash, and agentic frameworks including LangGraph, CrewAI, and increasingly bespoke deterministic-graph implementations. Cloud is multi — AWS, GCP, Azure — with no religious preference. Everything else is a means to an end.

---

## SECTION — WRITING & RECOGNITIONS

**Section eyebrow:** `05 — WRITING`

A short list of essays or concept entries linked from elsewhere on the site. Six links maximum.

> - *Why most agent demos collapse in production* (essay)
> - *The medallion architecture, decoded* (concept)
> - *Snowflake vs Databricks vs BigQuery for AI workloads* (concept)
> - *The semantic layer is the new data API* (essay)
> - *Designing teams for agentic operations* (essay)
> - *Lakehouse, warehouse, mesh — what actually changes* (concept)

---

## SECTION — CLOSING / CONTACT

A pared-down version of the home-page footer.

**Display statement (display-l, weight 300):**
> *If your data and AI feel busy but not productive — that is the operating system problem.*
> *Let's talk.*

**Two CTAs:**
- Primary button: `Book a 30-minute introduction →`
- Ghost link: `Or send a direct email`
