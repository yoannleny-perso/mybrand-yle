# Five Killer Ideas

> Differentiators that turn yoannleny.com from "another consultant's site" into a credential serious recruiters and CTOs cannot ignore.

These are not nice-to-haves. They are the five ideas that make the difference between a polished site and a site that gets shared in DMs. Each is described with what it is, why it works, what it requires to build, and where it lives in the site.

The unifying logic across all five: stop talking about credibility, prove it. Every idea below is a working artifact someone can interact with — not a claim on a slide.

---

## 1. The Architecture Decision Engine

**Where it lives:** `/lab/architecture-decision-engine`

### What it is

An interactive tool that asks the visitor 8–10 questions about their data and AI situation — team size, current stack, regulated data, cost sensitivity, team maturity, agentic AI ambitions — and returns a recommended stack with reasoning, alternatives, and links to the relevant concept-library entries.

The questions surface the genuinely consequential decisions: warehouse vs lakehouse, federation vs replication, semantic layer choice, agentic framework, evaluation strategy, governance model. The output is not a generic "modern data stack" — it is a specific, opinionated recommendation that says "for your situation, build X, avoid Y, watch out for Z."

### Why it works

It puts Yoann's judgment in the visitor's hands. A recruiter, CTO, or board member can run their actual context through the engine in three minutes and see the kind of decisions Yoann would make for them. This is dramatically more credible than a list of capabilities — it is judgment under constraint.

It also creates a short, sharable interaction that converts visitors into evaluators. Someone who has run their company's situation through the engine has invested attention. The transition to "let's talk" is shorter from there than from a generic about page.

The engine is also link-bait of the right kind. A CDO who finds the recommendation insightful will share it with peers. The traffic this generates is high-intent.

### What it requires

A small React component with branching logic — not a full agent. The decision tree has roughly 50 leaf nodes (combinations of answers that lead to a specific stack recommendation). Each leaf renders a paragraph of recommendation, links to 3–5 concept pages, and a "discuss this with Yoann" CTA.

Built with React state, no backend. The decision logic is in code, version-controlled, and can be improved over time. Total build: 1–2 weeks of careful work. Total maintenance: quarterly review to update recommendations as the landscape evolves.

### Risk and mitigation

The risk: oversimplified recommendations that look prescriptive in cases where Yoann would actually advise more nuance. Mitigation: every recommendation explicitly names alternatives and conditions ("recommended unless you have these constraints"). The framing is "first-pass architecture, not final answer."

---

## 2. The Cost-of-Agentic-AI Calculator

**Where it lives:** `/lab/cost-of-agentic-ai`

### What it is

A calculator that takes inputs about an agentic system — number of users per month, average requests per user, average steps per request, tier of model used, retrieval volume, governance overhead — and outputs a credible estimate of monthly cost, p95 latency, and the architectural changes that would shift the numbers materially.

It includes the levers Yoann actually pulls in production: tiered model routing, prompt caching, batching, evaluation overhead, observability cost, vector store cost. It is grounded in current 2026 pricing for Claude, GPT-5, Gemini, and the major infrastructure providers. It updates as those prices shift.

### Why it works

This is the calculation every CFO is asking their CTO to produce, and most CTOs cannot. A live calculator that produces credible numbers — with the caveats and assumptions exposed — solves a real, urgent problem for buyers and sellers of agentic systems.

It demonstrates Yoann's depth in the operational economics of agentic AI. Most architects can talk about agents. Few can produce defensible cost models. The calculator is evidence of operating-level depth that no slide can convey.

It is also evergreen content marketing of the highest quality. Search traffic for "agentic AI cost" and similar queries is significant and growing. A calculator is the kind of resource people bookmark and return to.

### What it requires

A multi-input form that runs calculations client-side in JavaScript. The model is a parametric estimate with explicit assumptions surfaced. Pricing tables for the major providers, kept current via a quarterly review.

Built with React or Vue, no backend. Total build: 2–3 weeks for first version, including the careful work of deriving credible cost models from real production experience. Quarterly updates as pricing changes.

### Risk and mitigation

The risk: numbers that turn out to be materially wrong for someone's specific case, embarrassing if shared. Mitigation: every output is explicitly framed as a directional estimate, every assumption is shown, the page itself notes that variance in real systems is wide and the calculator is for first-pass planning.

---

## 3. The Living Concept Library as Flagship Credential

**Where it lives:** `/concepts` and integrated throughout

### What it is

The concept library — fifty entries at launch, growing to eighty across data architecture, data engineering, BI/analytics, and agentic AI — treated not as supporting content but as the flagship credential of the site.

Each entry follows a consistent template: definition, why it matters, how it works, vendor comparison with named opinions, and Yoann's take signed and dated. Cross-linked to related entries and to relevant case studies. Updated quarterly with a `lastReviewed` field exposed in the metadata.

### Why it works

A consultant's site usually leads with services and case studies. Those signal "I have done work" but they are easy to fake and hard to verify. A concept library of fifty deeply-thought entries with named vendor opinions is much harder to fake and conveys depth no service page can.

The library is also the SEO asset that compounds. Each entry is targeted at decision-stage queries — "lakehouse vs warehouse," "best agentic framework," "Snowflake vs Databricks for ML." These are queries with high commercial intent that mid-funnel content captures. Over time the library becomes the entry point through which most visitors discover Yoann.

The cross-linking pattern is the structural innovation: every concept page links to at least three other concepts and at least one case study. The visitor enters on one entry and ends up reading five. The session quality is dramatically higher than a typical service-page-driven site.

### What it requires

The fifty entries are written. The work to make them flagship-quality is consistent template, consistent voice, consistent depth, and consistent maintenance. Quarterly review cadence: 8 entries reviewed and updated per quarter, plus 2 net-new entries per quarter. Annual: ~30 entries net-new or substantially refreshed.

The technical infrastructure is MDX or markdown content in a static site (Astro or Next.js), with structured front-matter that powers cluster pages, cross-linking, and search. Build effort is moderate; maintenance is the real investment.

### Risk and mitigation

The risk: the library goes stale and becomes a liability rather than an asset. An entry that recommends a deprecated tool or stale pricing damages credibility more than the entry's existence helps. Mitigation: the `lastReviewed` field is visible. Quarterly review cadence is operationally enforced. Stale entries are explicitly marked or removed.

---

## 4. The Agentic Org Simulator

**Where it lives:** `/lab/agentic-org-simulator`

### What it is

An interactive simulation that lets a CEO or CTO model how agentic systems reshape their organization. The visitor inputs current org composition (function counts, span of control, average task durations) and toggles which functions adopt which agentic capabilities. The simulator outputs how throughput, cost, and headcount profile shift over a 24-month horizon.

The simulation is grounded — not science fiction. It models specific functions where agentic AI has demonstrated production impact (customer support, sales operations, finance close, internal IT, legal review) with realistic adoption curves and realistic limits. It surfaces the second-order effects: which roles change, which roles emerge, where the bottlenecks move.

### Why it works

This is the question every executive is asking and very few practitioners can answer credibly. "What does my org look like in 24 months if we deploy agentic AI seriously?" The simulator gives a concrete, defensible answer for the visitor's specific situation.

It positions Yoann as someone who has thought rigorously about the operational and organizational implications of agentic AI — not just the technical patterns. This is the rare combination that distinguishes architects from engineers: technical depth plus organizational fluency.

The output is also a conversation starter. A CEO who has run their organization through the simulator has questions. The CTA "discuss the model with Yoann" is a high-intent path that converts well.

### What it requires

A more substantial build than the other lab tools. Roughly 4–6 weeks for a credible first version. The hard work is the model itself — the assumptions about adoption rates, cost curves, role changes, and second-order effects. This is the part that benefits from Yoann's actual experience and is hardest to fake.

The interface is a React app with sliders, toggles, and a charting layer (Recharts or similar). State lives client-side. The model parameters are versioned and updated over time.

### Risk and mitigation

The risk: the model is wrong in cases where it matters, producing recommendations that backfire when stakeholders test them against reality. Mitigation: the model is explicitly framed as a planning tool, not a forecast. Assumptions are exposed. Sensitivity to inputs is shown so the visitor sees how uncertain the conclusions are. The page surfaces "what to validate before acting on these numbers."

---

## 5. Radical Availability Transparency

**Where it lives:** `/now` and contact page

### What it is

A `/now` page (in the Derek Sivers tradition) that says exactly what Yoann is working on this month, what engagements have capacity, and what is fully booked. Plus a transparent rate card or engagement model on the contact page — three explicit modes (Architect-in-residence, Executive advisory, Diagnostic & rebuild plan), each with timing, deliverables, and a price range or starting point.

The radical part: this is updated. The page reflects reality, not aspiration. If Yoann has zero capacity for advisory work this quarter, the page says so. If a specific date is open in March, the page says so.

### Why it works

The default consultant site says nothing about availability or rates. The visitor either guesses, asks awkwardly, or moves on. Radical transparency removes friction for serious buyers and discourages tire-kickers.

It is also a credibility signal. A consultant who is full has a different kind of authority than one who claims to be available for everything. "Booked through Q3" is a stronger signal than any list of past clients.

The three-mode engagement model on the contact page does similar work — it tells the visitor that Yoann has thought about how he sells, that the engagements are productized and thoughtful, and that there is a path that fits their situation without requiring a discovery call to figure it out.

### What it requires

Almost no engineering. A markdown file (or a CMS field) for the `/now` page. A static contact page with the three modes. The hard part is the discipline of keeping `/now` updated — once a month minimum, ideally weekly during active engagement transitions.

The harder part is committing to the transparency. Most consultants resist publishing rates or availability because it constrains negotiation. The argument the other direction: it filters for serious buyers and signals confidence. Both are competitive advantages.

### Risk and mitigation

The risk: a stale `/now` page is worse than no `/now` page. Mitigation: the page itself shows a `lastUpdated` date prominently. If it is more than 30 days old, it surfaces a "this page may be out of date" notice. The discipline of updating becomes a forcing function for the operating model.

The other risk: published rates that are higher than what specific clients want to pay. The framing addresses this — rates are starting points, scoped engagements are individual, the explicit invitation is to discuss specifics.

---

## How the five compound

These are not five independent ideas. They are five facets of one strategic choice: to build a site that demonstrates credibility through working artifacts, not through claims.

The Architecture Decision Engine and the Cost Calculator demonstrate operational judgment. The Concept Library demonstrates depth. The Org Simulator demonstrates organizational fluency. The Availability Transparency demonstrates the confidence to be specific about what is offered and when.

Together they make the site impossible to dismiss as marketing. Recruiters who land on it know within five minutes whether Yoann fits the role. CTOs who land on it can sample Yoann's thinking on their actual situation before any conversation. Boards who land on it see a candidate who has thought about agentic AI as an organizational, not just technical, problem.

The operating cost is real but bounded: 1–2 weeks for the Decision Engine, 2–3 weeks for the Cost Calculator, 4–6 weeks for the Org Simulator, ongoing for the Library and `/now`. Total first-year build excluding the Library itself: 8–12 weeks of focused work.

The return is the difference between a site that is read and a site that is shared.
