# 03 — Capabilities

A standalone page that expands the five capability rows from the home page. Each capability has its own anchor and detail block. From here, each can also link to a dedicated capability sub-page if depth is needed.

## Page structure

1. Header
2. Five capability blocks (anchored)
3. Engagement model
4. Closing CTA

---

## SECTION — HEADER

**Eyebrow:** `CAPABILITIES`

**Display title (display-l):**
> *Five practices.*
> *One operating logic.*

**Lede (body-l, max 60ch):**
> Each capability below is a system I have architected, built, and run in production. They compose into a single operating model — but each can be engaged independently when the situation demands it.

---

## CAPABILITY 01 — AGENTIC AI ARCHITECTURE

**Eyebrow:** `01 — AGENTIC AI ARCHITECTURE`

**Title (display-m):** *Multi-agent systems with deterministic guardrails.*

**Description (body):**
> I design agentic systems that survive production. That means hierarchical agent graphs with clear authority, deterministic guardrails around probabilistic components, audit trails on every action, and human-in-the-loop checkpoints at the points where stakes are highest. The frameworks evolve every quarter — the architectural principles do not.

**What I deliver in an engagement:**
- Agent topology design (orchestrator, specialists, critics, tool-users)
- Tool catalog and contract design — every tool the agents can call
- Guardrail layer — deterministic validation, output schemas, escape hatches
- Memory architecture — short-term, long-term, episodic, where each lives
- Evaluation harness — how the system is measured before it ships and while it runs
- Cost and latency budget per agent path
- Governance model — who approves a new tool, who owns the prompts, how versions are released

**Where this fits:** Companies with one or two working AI prototypes that need to become a governed production capability, or organizations starting from zero who want to skip the demo phase and build for scale.

**Linked concepts:** [Agentic AI Architecture Patterns](/concepts/agentic-ai/architecture-patterns) · [Deterministic Guardrails](/concepts/agentic-ai/deterministic-guardrails) · [Agent Evaluation Frameworks](/concepts/agentic-ai/evaluation-frameworks)

---

## CAPABILITY 02 — DATA & SEMANTIC PLATFORMS

**Eyebrow:** `02 — DATA & SEMANTIC PLATFORMS`

**Title (display-m):** *Lakehouses with a semantic contract on top.*

**Description (body):**
> Modern data platforms fail at the same point: between the warehouse and the consumer. I design medallion lakehouses with a governed semantic layer above them — so analytics, ML, and AI agents all consume the same definitions of revenue, churn, and utilization, and no one is debating whether last quarter's number was correct.

**What I deliver in an engagement:**
- Architecture decision records for the lakehouse (storage format, compute, governance)
- Bronze / silver / gold zone design with explicit ownership
- Semantic layer — metric definitions, dimensions, conformed hierarchies, access controls
- AI-ready metadata — descriptions and synonyms that LLMs can reason over without hallucinating
- Data contracts on producer interfaces
- Observability — freshness, volume, schema, distribution
- Migration plan from legacy, with parallel-run discipline

**Where this fits:** Mid-market and enterprise with messy or fragmented data estates, or growing companies that have outgrown their first warehouse and need a foundation that will not be re-platformed in two years.

**Linked concepts:** [Medallion Architecture](/concepts/data-architecture/medallion-architecture) · [Semantic Layer](/concepts/data-architecture/semantic-layer) · [Data Contracts](/concepts/data-engineering/data-contracts)

---

## CAPABILITY 03 — STRATEGIC DATA OPERATIONS

**Eyebrow:** `03 — STRATEGIC DATA OPERATIONS`

**Title (display-m):** *Treating data as a product, not a service ticket.*

**Description (body):**
> A data team that operates as a service desk will always be reactive and always be underwater. I install the operating model that turns data into a product line: pods with ownership, SLAs and SLOs on the things that matter, contracts on producer interfaces, deprecation policies, and a roadmap that the rest of the business can read.

**What I deliver in an engagement:**
- Pod and ownership model — who owns what, escalation paths
- Service-level catalog — freshness, accuracy, availability, support hours
- Producer-side data contracts and breaking-change policy
- Intake and prioritization process — replacing ad-hoc Slack with a real queue
- KPIs for the data team itself (delivery, reliability, satisfaction)
- Cost attribution model — who pays for what compute, why
- Quarterly business-review template the data team can present to the executive committee

**Where this fits:** Data teams under 25 people that are growing fast, or established teams that have lost the trust of the business and need to rebuild it on visible, measurable ground.

**Linked concepts:** [Data as a Product](/concepts/data-engineering/data-as-a-product) · [Data Contracts](/concepts/data-engineering/data-contracts) · [DataOps Maturity Model](/concepts/data-engineering/dataops-maturity)

---

## CAPABILITY 04 — TEAM ORCHESTRATION

**Eyebrow:** `04 — TEAM ORCHESTRATION`

**Title (display-m):** *Designing teams that scale beyond 40 experts.*

**Description (body):**
> Past 25 people, a flat data team breaks. Past 40, a generic engineering org structure breaks too. Data and AI teams need a specific operating model — pods with mixed disciplines, an architectural authority outside the pods, and a delivery rhythm that does not collapse under a multi-region calendar. I have designed and run that model across three regions.

**What I deliver in an engagement:**
- Team topology — pods, platform, architecture, enablement
- Role definitions and career paths — separating IC depth from management
- Hiring rubric and interview design for data and AI roles
- Ritual cadence — standups, design reviews, architecture reviews, retros
- Cross-region operating model — handoffs, shared on-call, decision rights
- Capacity planning and utilization model
- Internal observability layer — how leadership sees delivery health

**Where this fits:** Organizations crossing the 25- or 40-person threshold in their data or AI function, or multi-region teams that have lost coherence as they grew.

**Linked concepts:** [Team Topologies for Data Orgs](/concepts/data-engineering/team-topologies) · [Capacity Planning](/concepts/data-engineering/capacity-planning) · [Designing Teams for Agentic Operations](/insights/designing-teams-for-agentic-operations)

---

## CAPABILITY 05 — EXECUTIVE ENABLEMENT

**Eyebrow:** `05 — EXECUTIVE ENABLEMENT`

**Title (display-m):** *Turning leadership questions into operating decisions.*

**Description (body):**
> Data and AI investments fail at the executive surface, not the engineering surface. The dashboards are too many, the metrics conflict, the AI initiatives sound impressive but cannot be governed. I install the executive layer: a small set of decision-grade views, a clear AI governance model, and a quarterly cadence that lets a board or an executive committee actually steer the function.

**What I deliver in an engagement:**
- Executive metric set — fewer than ten numbers that decide everything
- AI portfolio dashboard — what is in production, what is being evaluated, what was sunset
- AI governance charter — risk tiers, approval gates, audit trails, model cards
- Quarterly business-review template for the data and AI function
- Board-grade narratives — not slides, narratives — for the audit and risk committee
- Executive coaching for non-technical leadership on what to ask and what to ignore

**Where this fits:** Boards, CEOs, and CXOs who feel they are paying significantly for data and AI but cannot make a confident decision about it. Often paired with one of the operating capabilities above.

**Linked concepts:** [AI Governance Frameworks](/concepts/agentic-ai/ai-governance) · [Executive Metric Design](/concepts/bi-analytics/executive-metric-design) · [Decision Intelligence](/concepts/bi-analytics/decision-intelligence)

---

## SECTION — ENGAGEMENT MODEL

**Eyebrow:** `ENGAGEMENT`

**Title (display-m):** *How a working relationship begins.*

**Body:**
> Three modes, one bar for quality.

| Mode | Shape | Typical duration | Best for |
|---|---|---|---|
| **Architect-in-residence** | Embedded one or two days a week as the senior architectural authority. | 6–18 months | Companies rebuilding their data and AI foundation. |
| **Executive advisory** | Working with the CEO, CTO, or CDO on a recurring rhythm — strategy, hiring, governance. | 3–12 months | Leaders who need a senior peer to think with. |
| **Diagnostic & rebuild plan** | A focused 6–8 week assessment producing an architecture, operating model, and rebuild roadmap. | 6–8 weeks | Boards and PE operators evaluating an existing function. |

**Below the table, body:**
> I take on a small number of engagements per year. Capacity is announced on the [Now](/now) page. For specific availability and rates, the only path is a direct conversation.

---

## SECTION — CLOSING

**Display statement (display-l, weight 300):**
> *Capability is just potential.*
> *An operating model is what makes it pay.*

**CTA buttons:**
- Primary: `Start a conversation →`
- Ghost: `Read recent work`
