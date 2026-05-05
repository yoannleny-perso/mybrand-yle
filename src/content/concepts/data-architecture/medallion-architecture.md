---
title: "Medallion Architecture"
slug: "medallion-architecture"
cluster: "data-architecture"
depth: "intermediate"
definition: "A three-zone data architecture — bronze, silver, gold — that separates raw, refined, and business-ready data within a single lakehouse."
readingTime: 11
lastReviewed: "2026-03-15"
---

# Medallion Architecture

`DATA ARCHITECTURE · INTERMEDIATE · 11 MIN · LAST REVIEWED MARCH 2026`

> A three-zone data architecture — bronze, silver, gold — that separates raw, refined, and business-ready data within a single lakehouse.

## What it is

The medallion architecture is a way of organizing data inside a lakehouse so that the same physical platform can serve raw ingestion, cleaned refinement, and business-ready analytics — without those three concerns colliding into each other. The metaphor of bronze, silver, and gold is borrowed from precious-metal classification: each zone refines what the previous one delivered.

The pattern was popularized by Databricks but the underlying idea predates the name. It is essentially the lakehouse-era reformulation of the older landing → staging → mart pattern from traditional warehousing — adapted to a world where storage is decoupled from compute and where the same data is consumed by SQL analysts, machine learning pipelines, and increasingly AI agents.

## Why it matters

Most lakehouse implementations fail not because the technology is wrong but because there is no architectural discipline about *where data lives in its lifecycle*. Without zones, raw data, half-cleaned data, and trusted KPIs all sit in the same flat namespace, and consumers cannot tell which is which. Trust collapses. Costs rise. Re-processing becomes a nightmare because nobody knows what is safe to drop.

The medallion architecture solves this with three guarantees:

1. **Bronze is reproducible** — you can always rebuild downstream from raw.
2. **Silver is trusted** — schemas are enforced, quality is checked, history is preserved.
3. **Gold is consumable** — it speaks the language of the business, not the language of the source systems.

For an executive, the value is simpler still: it gives you one clear question to ask any team — *which zone is this data in?* — and an answer that tells you what you can rely on.

## How it works

### Bronze — the immutable raw layer

Bronze stores the raw output of source systems exactly as it arrived, with minimal transformation. The two acceptable transformations are *technical* — for example, converting JSON to Parquet for storage efficiency — and *audit* — adding ingestion timestamps, source identifiers, and run IDs. Schema is permissive (often schema-on-read). Bronze is append-only and treated as the contractual record of what the source system said and when.

The discipline here is restraint. Resist the temptation to deduplicate, type-cast, or filter at this stage — every shortcut taken in bronze will cost you reproducibility later when a downstream issue requires reconstruction.

### Silver — the cleaned and conformed layer

Silver is where data becomes trustworthy. Schemas are enforced. Types are correct. Foreign keys resolve. Quality checks run on every load. Soft business logic — joins between sources, slowly changing dimensions, conformed dimensions — happens here. The CDC patterns and SCD types you choose are silver-layer decisions.

This is also where the data becomes navigable. Silver tables are named by business entity (customers, orders, employees, contracts) rather than by source system (salesforce_account, hr_employees_v2). The semantic shift from *technical artifact* to *business object* happens at the bronze→silver boundary.

### Gold — the consumption layer

Gold is shaped for use. Star schemas for BI. Wide denormalized tables for ML feature stores. Aggregated fact tables for reporting. Materialized views for low-latency dashboards. The transformations from silver to gold are aligned to *use cases*, which means there are typically many gold tables built from the same silver foundation.

Gold should be cheap to recompute and easy to deprecate. If a stakeholder requests a new view, you build it in gold; if they stop using it, you drop it without disturbing silver. This is what makes gold elastic and silver stable.

### Crossing zones — the orchestration layer

The pattern only works if movement between zones is automated, observable, and idempotent. Each table at each zone has an explicit owner, a freshness SLO, a quality contract, and lineage that tracks back to bronze. Without these, the medallion is decorative.

## Vendor comparison

The medallion pattern is implementable on any modern lakehouse. The differences are in storage format, compute model, governance integration, and how the gold layer connects to consumption tools.

| Aspect | Databricks | Snowflake | BigQuery |
|---|---|---|---|
| **Storage model** | Delta Lake (open) on cloud object storage | Proprietary FDN format on cloud object storage; Iceberg tables in preview/GA | BigLake on GCS, with native BigQuery storage; supports Iceberg |
| **Compute model** | Spark-based clusters; serverless SQL warehouses; Photon engine | Auto-scaling virtual warehouses; serverless and dedicated | Fully serverless; slot-based billing or on-demand |
| **Pricing posture** | DBU consumption + cloud infra | Credit consumption (compute) + storage | On-demand bytes scanned or flat-rate slots |
| **Best for** | Heavy ML/AI workloads, data engineering teams comfortable with code | Analytics teams that prize SQL ergonomics and zero-ops | Teams already on GCP, ad-hoc analytics, ML through Vertex |
| **Watch out for** | Cluster management overhead; ML/SQL split if not careful | Egress and storage cost on very large bronze layers | Slot contention under concurrent load; pricing surprises |
| **My experience** | Primary platform on most engagements | Used as the warehouse layer in hybrid stacks | Used in GCP-native organizations |

**Databricks.** The cleanest fit for the medallion pattern as originally articulated, because the Delta Lake format and the Unity Catalog governance model were designed for exactly this. Spark and Photon handle the heavy bronze→silver transformations efficiently, and serverless SQL warehouses cover the gold-layer consumption side without forcing teams to manage clusters. The trap is teams treating Databricks as Spark-first and BI-second; with the right discipline (and now with Lakehouse Federation and DBSQL), it works as both.

**Snowflake.** Conceptually a warehouse rather than a lakehouse, but with Iceberg tables and external tables it does the medallion job credibly — especially for organizations whose center of gravity is SQL rather than code. Silver and gold are easy. Bronze can become expensive at very high volumes if you don't carefully manage storage tiering and external table strategies. Time travel, zero-copy clones, and the governance UX are best-in-class for analytical use.

**BigQuery.** The serverless economics make it attractive for organizations that don't want to think about clusters, and BigLake plus Iceberg support means you can implement the medallion pattern cleanly. The gold-to-consumption story is excellent through Looker, and the integration with Vertex AI for ML workloads is tight. The pricing model rewards disciplined query design and punishes sloppy ad-hoc exploration — a feature, not a bug, but it requires data engineering maturity.

## Yoann's take

> *My default is Databricks for medallion implementations where ML and agentic workloads are part of the picture from day one — which is now most of them. I switch to Snowflake when the organization is SQL-native, governance and ergonomics matter more than ML throughput, and the team is small enough that Snowflake's zero-ops model is a real advantage. I would choose BigQuery when the company is already a GCP shop and the data team is small. The pattern is universal; the platform follows the team you have.*
>
> *— Yoann*

---

## Related reading

- [Data Lake vs Data Warehouse vs Lakehouse](/concepts/data-architecture/data-lake-vs-warehouse-vs-lakehouse)
- [Open Table Formats — Iceberg, Delta, Hudi](/concepts/data-architecture/open-table-formats)
- [Data as a Product](/concepts/data-engineering/data-as-a-product)

## Related work

- [Enterprise Medallion Stack](/work/enterprise-medallion-stack) — how this pattern was deployed across three regions

## External references

- *Databricks: What is a Medallion Architecture* — databricks.com/glossary/medallion-architecture
- *Building the Lakehouse* by Bill Inmon and Mary Levins
- *The Data Engineering Cookbook* by Andreas Kretz
