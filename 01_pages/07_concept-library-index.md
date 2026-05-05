# 07 — Concept Library Index

The /concepts page is the entry point to the largest content asset on the site: a 50+ entry library of architecture and engineering concepts, each with its own page. The index page must make this volume *legible* without overwhelming.

## Page structure

1. Header
2. Cluster overview (4 cards, one per cluster)
3. Search + filter
4. Index by cluster
5. Footer note on contribution

---

## SECTION — HEADER

**Eyebrow:** `CONCEPT LIBRARY`

**Display title (display-l):**
> *A working notebook of how I think about each problem.*

**Lede (body-l, max 60ch):**
> 50+ entries across data architecture, data engineering, BI and analytics, and agentic AI. Each entry follows the same structure: what it is, why it matters, how it works, vendor comparisons grounded in what I have actually deployed, and a short signed take.

---

## SECTION — CLUSTER OVERVIEW (4 large cards)

A 2x2 grid of large cards on desktop, stacked on mobile. Each card has: an eyebrow tag, a cluster name in display-m, a count, a one-line description, and a `→ Browse cluster` link.

### Cluster 1 — Data Architecture

**Eyebrow:** `01`

**Title:** *Data Architecture*

**Count:** `14 entries`

**Description:**
> The shapes data takes when it has to serve multiple consumers reliably — lakes, warehouses, lakehouses, mesh, semantic layers, and the contracts that hold them together.

`→ Browse cluster`

### Cluster 2 — Data Engineering

**Eyebrow:** `02`

**Title:** *Data Engineering*

**Count:** `12 entries`

**Description:**
> The disciplines that make data move reliably at scale — orchestration, transformation, contracts, observability, cost, and the operating model that holds the function together.

`→ Browse cluster`

### Cluster 3 — BI & Analytics

**Eyebrow:** `03`

**Title:** *BI & Analytics*

**Count:** `8 entries`

**Description:**
> The layer that turns data into decisions — semantic models, dashboards, decision intelligence, and the editorial discipline of designing metrics for executive use.

`→ Browse cluster`

### Cluster 4 — Agentic AI

**Eyebrow:** `04`

**Title:** *Agentic AI*

**Count:** `16 entries`

**Description:**
> Building AI systems that do, not just answer — agent topologies, guardrails, evaluation, governance, and the architectural patterns that make agentic systems survive production.

`→ Browse cluster`

---

## SECTION — SEARCH + FILTER

A persistent search bar (sticky on scroll) with placeholder `Search 50+ concepts…`. To the right, a filter row of pills:

```
ALL CLUSTERS · ARCHITECTURE · ENGINEERING · BI · AGENTIC AI
```

And a second row for content depth:

```
ANY DEPTH · FOUNDATIONAL · INTERMEDIATE · ADVANCED
```

---

## SECTION — INDEX BY CLUSTER

Each cluster has its own H2 followed by a clean two-column list of all entries in that cluster. Each entry shows: eyebrow (depth tag), title, one-line definition, last-reviewed date.

### 01 — DATA ARCHITECTURE (14 entries)

```
FOUNDATIONAL · The Modern Data Stack
INTERMEDIATE · Medallion Architecture
INTERMEDIATE · Data Lake vs Data Warehouse vs Lakehouse
INTERMEDIATE · The Semantic Layer
INTERMEDIATE · Data Mesh
INTERMEDIATE · Data Vault Modeling
INTERMEDIATE · Star, Snowflake, and Galaxy Schemas
INTERMEDIATE · Slowly Changing Dimensions
INTERMEDIATE · OLTP vs OLAP vs HTAP
ADVANCED · Open Table Formats — Iceberg, Delta, Hudi
ADVANCED · Lambda vs Kappa vs Unified Streaming
ADVANCED · Reverse ETL and Operational Analytics
ADVANCED · Multi-Region Data Architectures
ADVANCED · Data Federation and Virtualization
```

### 02 — DATA ENGINEERING (12 entries)

```
FOUNDATIONAL · Batch vs Streaming vs Micro-Batch
INTERMEDIATE · Orchestration Frameworks
INTERMEDIATE · Data Transformation with dbt
INTERMEDIATE · Data Contracts
INTERMEDIATE · Data as a Product
INTERMEDIATE · CDC — Change Data Capture
INTERMEDIATE · Data Quality and Observability
INTERMEDIATE · Cost Optimization for Data Platforms
INTERMEDIATE · DataOps Maturity Model
ADVANCED · Schema Evolution and Backwards Compatibility
ADVANCED · Idempotency and Exactly-Once Semantics
ADVANCED · Team Topologies for Data Orgs
```

### 03 — BI & ANALYTICS (8 entries)

```
FOUNDATIONAL · The Modern BI Stack
INTERMEDIATE · Dashboard Design Principles
INTERMEDIATE · Executive Metric Design
INTERMEDIATE · Embedded vs Standalone Analytics
INTERMEDIATE · Self-Service Analytics
ADVANCED · Decision Intelligence
ADVANCED · Reverse ETL for Analytics Activation
ADVANCED · Anomaly Detection and Forecasting in BI
```

### 04 — AGENTIC AI (16 entries)

```
FOUNDATIONAL · What is an Agent (Really)
FOUNDATIONAL · LLM-Powered vs Agentic — The Difference
INTERMEDIATE · Agentic AI Architecture Patterns
INTERMEDIATE · Tool Use and Function Calling
INTERMEDIATE · RAG — Retrieval Augmented Generation
INTERMEDIATE · Memory in Agents — Short-Term vs Long-Term
INTERMEDIATE · Multi-Agent Orchestration
INTERMEDIATE · Deterministic Guardrails
INTERMEDIATE · Prompt Engineering vs Prompt Architecture
INTERMEDIATE · MCP — Model Context Protocol
ADVANCED · Agent Evaluation Frameworks
ADVANCED · Cost and Latency Budgeting for Agentic Systems
ADVANCED · AI Governance Frameworks
ADVANCED · Vector Stores and Embedding Strategy
ADVANCED · Fine-Tuning vs RAG vs Tool Use — The Decision Tree
ADVANCED · Production Patterns for Agentic Systems
```

---

## SECTION — CONTRIBUTION NOTE

A short final block, separated by a hairline.

**Eyebrow:** `LIVING DOCUMENT`

**Body (body-s, --ink-500):**
> The library is reviewed quarterly. If a vendor comparison is out of date or a definition has aged, [send me a note](/contact) and I'll update the entry — with credit if you'd like.

---

## CONCEPT PAGE TEMPLATE (used for every entry)

This is the canonical template. All concept pages render from this shape.

### Top metadata strip
```
[CLUSTER NAME] · [DEPTH] · [READING TIME] · LAST REVIEWED [DATE]
```

### Title block
- Title — display-l
- One-sentence definition — body-l, --ink-500

### Section 1 — What it is
2 paragraphs maximum. Define from first principles. No acronyms left undefined.

### Section 2 — Why it matters
1-2 paragraphs. Business framing. What breaks if this is missing or wrong.

### Section 3 — How it works
3-6 paragraphs. Technical depth. Inline diagrams via the visualizer when they help. Sub-headings allowed here.

### Section 4 — Vendor comparison
A clean table with 3-5 columns (one per vendor evaluated). Rows include: Storage model, Compute model, Pricing model, Best for, Watch out for, Yoann's experience level.

Below the table, **one short paragraph per vendor** — direct, opinionated, grounded in what was actually deployed.

### Section 5 — Yoann's take
A short signed block, typographically distinct (italic, --ink-700, hairline above).

> *In production, my default is X for these three reasons. I would only choose Y when the situation has these two specific characteristics.*
>
> *— Yoann*

### Appendix
- **Related reading** — 3 internal links to other concept pages
- **External references** — 3-5 links to authoritative sources

---

## TEMPLATE FRONT-MATTER (MDX)

Every concept page MDX file should carry this front-matter so the index can be auto-generated:

```yaml
---
title: "Medallion Architecture"
slug: "medallion-architecture"
cluster: "data-architecture"
depth: "intermediate"
definition: "A three-zone data architecture (bronze, silver, gold) that separates raw, refined, and business-ready data within a single lakehouse."
readingTime: 11
lastReviewed: "2026-03-15"
relatedConcepts:
  - "data-lake-vs-warehouse-vs-lakehouse"
  - "open-table-formats"
  - "data-as-a-product"
relatedWork:
  - "enterprise-medallion-stack"
externalReferences:
  - title: "Databricks: What is a Medallion Architecture"
    url: "https://www.databricks.com/glossary/medallion-architecture"
---
```
