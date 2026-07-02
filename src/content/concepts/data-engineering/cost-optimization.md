---
title: "Cost Optimization for Data Platforms"
slug: "cost-optimization"
cluster: "data-engineering"
depth: "core"
definition: "The discipline of producing the same outcomes for materially less money — through better pipeline design, smarter compute selection, and operational discipline most teams skip."
readingTime: "9 min"
lastReviewed: "2026-Q2"
---

## What it is

Cost optimization is what separates a sustainable data platform from a board slide labeled "data spend up 80% YoY." It is not about cutting features or running fewer queries. It is about producing the same outcomes for materially less money by being deliberate about pipeline design, storage layout, compute selection, and operational hygiene.

The unit economics of every modern warehouse are simple — you pay for storage (cheap), compute (expensive), and movement (varies). Most teams overspend on compute because their pipelines are inefficient, their materializations are wrong, and their dashboards run more often than anyone reads them.

## Why it matters

A single quarter of unmanaged growth can double a Snowflake or Databricks bill. Two quarters and the CFO is asking questions the data team cannot answer. Three and the platform itself is on a list of cost-saving targets.

This is not a future problem. In organizations I have worked with, 30-50% of warehouse spend is recoverable without losing any business value. The savings come from a small number of recurring patterns, not from heroic re-architecture.

Cost optimization is also a credibility builder. A data leader who can explain spend, attribute it to specific workloads, and reduce it without breaking anything earns the right to ask for more investment when it actually matters.

## How it works

The patterns that account for most savings, in rough order of impact.

Right-sized warehouses: Snowflake X-Large running for queries that would complete on a Small. Databricks driver clusters that are 4× the necessary size. Auto-suspend set too generously. The tooling to find this is in the platform — Snowflake's query history, Databricks' compute UI — but few teams look.

Materialization discipline: views that should be tables, tables that should be incremental, incremental models that rebuild from scratch every night because the unique key is wrong. Most dbt projects have 5-15% of models that are silently wasting compute.

Dashboard hygiene: scheduled refreshes for dashboards no one views, full-table extracts in BI tools, expensive joins re-running every 15 minutes with no caching. A monthly review of the top 20 most expensive recurring queries usually finds two or three that can be deleted entirely.

Storage tiering: warehouses with 18 months of data that nobody queries past 90 days. Cold storage policies, table archival, and partition pruning recover real money on Databricks and Snowflake.

Concurrency and isolation: production analytics, ad-hoc analyst queries, and ML training all running on the same warehouse. Splitting workloads onto right-sized warehouses reduces contention and lets each scale independently.

## Vendor comparison

The native cost tooling has improved meaningfully since 2023.

| Platform | Native cost tooling | Notable third-party |
|---|---|---|
| **Snowflake** | Account usage views, resource monitors, query history | SELECT.dev, Bluesky, Capital One Slingshot |
| **Databricks** | System tables (billing usage, query history), cluster cost analysis | Sync Computing, GradientFlow |
| **BigQuery** | Information schema, query plan analysis, BI Engine | Native is generally enough |
| **dbt-level** | dbt artifacts + custom tracking | Datafold, Y42, Coalesce.io cost dashboards |

**SELECT.dev** is the tool I reach for first on Snowflake — it surfaces the patterns that account for 80% of recoverable spend with little setup. **Sync Computing** does similar work for Databricks Spark workloads, particularly cluster auto-tuning.

For dbt-centric teams, **Datafold** and **Elementary's** cost analysis features ground attribution back to specific models, which is often where action is taken.

## Yoann's take

*The biggest unlock is not a tool. It is making one person responsible for cost on a recurring basis — a monthly review of the top 20 queries by cost, owner-by-owner. That alone has recovered 20-30% of spend on every platform I have run. After the operating model is in place, SELECT.dev or its equivalent for your stack pays back in a quarter. The pattern I avoid: running a one-time cost project, recovering 25%, declaring victory, and watching it grow back in six months because nothing changed structurally. Cost optimization is a habit, not a project.*

*— Yoann*

## Related reading

- [Modern Data Stack](/concepts/modern-data-stack)
- [Data Transformation with dbt](/concepts/data-transformation-with-dbt)
- [DataOps Maturity](/concepts/dataops-maturity)
- [Cost and Latency Budgeting for AI](/concepts/cost-latency-budgeting)

## External references

- Snowflake Account Usage documentation
- Databricks System Tables guide
- SELECT.dev / Sync Computing case studies
