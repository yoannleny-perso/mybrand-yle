---
title: "Data Federation and Virtualization"
slug: "data-federation-virtualization"
cluster: "data-architecture"
depth: "intermediate"
definition: "Querying data where it lives across multiple systems through a unified virtual layer, instead of physically copying it into a central warehouse."
readingTime: "8 min"
lastReviewed: "2026-Q2"
---

## What it is

Data federation means a query engine can read from multiple physical sources — a Postgres database, a Snowflake warehouse, an S3 bucket of Parquet files, a SaaS API — and return a single result set. The data never moves. The engine pushes filters down to each source, joins the partial results in memory, and returns a unified table.

Data virtualization is the broader discipline. It includes federation but also covers semantic abstraction, caching, and access control over heterogeneous sources. Trino, Starburst, Dremio, Denodo, and Snowflake's external tables all sit somewhere on this spectrum.

This is not the same as ELT or replication. Replication copies data into a destination on a schedule. Federation queries data in place at read time.

## Why it matters

Three real situations make federation valuable.

The first is regulated data that cannot leave its source — patient records that must stay in a hospital VPC, EU customer data that cannot cross to a US warehouse, M&A data sitting in an acquired company's stack you do not yet control. Federation lets analysts query without breaking residency constraints.

The second is fast prototyping. Before committing to a full pipeline, you let analysts explore federated joins, validate that a metric is meaningful, then promote the winning queries into materialized pipelines. This shortens the loop from question to evidence.

The third is the long tail. Dozens of small SaaS tools generate data that is occasionally useful but rarely worth a full ELT pipeline. Federation gives you read access at low operational cost.

The trap is treating federation as a substitute for a proper warehouse. It is not. Federated joins across remote sources are slow, expensive, and fragile under load. Anyone who has tried to build an executive dashboard on top of three federated APIs has learned this the hard way.

## How it works

A federation engine exposes a SQL interface and a catalog of connectors. When a query arrives, the engine parses it, identifies which tables live in which source, and decomposes the query into source-specific subqueries. It pushes down predicates the source can handle natively — filters, simple aggregations, joins within the same source — and pulls back only the rows it needs to combine.

Performance depends almost entirely on predicate pushdown and on how much data must cross the network. A query that filters 1 billion rows down to 10,000 inside Postgres before joining to Snowflake will be fast. A query that pulls 1 billion rows out of Postgres to join in memory will hang.

Caching layers (Dremio's reflections, Starburst's cached views, Trino with a result cache) materialize hot paths to make repeat queries fast. This is where virtualization starts to blur into a lakehouse — at some point you have copied enough data that you might as well have built a proper pipeline.

## Vendor comparison

| Engine | Best for | Strength | Weakness |
|---|---|---|---|
| **Trino** (open source) | Self-hosted federation across many sources | 50+ connectors, strong community, no vendor lock | Operating it yourself is a real job |
| **Starburst** | Enterprise federation with governance and SLA | Trino-based but managed, role-based access, query insights | Cost climbs fast at scale |
| **Dremio** | Lakehouse-flavored federation with reflections (caching) | Iceberg-native, semantic layer built in | Smaller connector library than Trino |
| **Denodo** | Heavy governance, regulated industries | Mature data catalog and lineage | Enterprise-y, slow to iterate, expensive |
| **Snowflake External Tables / Iceberg Tables** | Federation tightly coupled to Snowflake | No new system to operate, governed by Snowflake | Limited to what Snowflake can read |

**Trino** is the default open-source answer. Most managed offerings (Starburst, AWS Athena, Google BigLake) are Trino or Presto under the hood. If you have engineering capacity, self-hosted Trino on Kubernetes is a credible choice.

**Starburst** wraps Trino with the operational layer most teams need — caching, governance, query routing, support. The right pick if you want federation without operating a query cluster.

**Dremio** leans further toward lakehouse — its reflections (semantic + materialized) are powerful for BI workloads. Strong choice if your federation use case is mostly Iceberg + a few external sources.

**Denodo** is the legacy enterprise choice. If you are in a Fortune 500 with strict governance requirements and a long procurement process, it is on every shortlist. Otherwise it tends to feel heavy.

**Snowflake external tables and Iceberg tables** are not a federation engine but they cover a meaningful slice of use cases — read S3, read Iceberg in a foreign catalog — without leaving Snowflake. For Snowflake-centric shops, this is often enough.

## Yoann's take

*I treat federation as a tactical tool, not a strategy. It is excellent for residency-constrained data, for the long tail of small sources, and for early prototyping. It is poor as the foundation of an analytics platform. Every team I have seen try to run an executive dashboard on top of live federated queries has eventually rebuilt the pipeline. My default: start with Snowflake or Databricks external table support, layer Trino or Starburst on top only if I genuinely need to query 5+ sources at read time, and never let a critical metric depend on federation alone — materialize it.*

*— Yoann*

## Related reading

- [Modern Data Stack](/concepts/modern-data-stack)
- [Open Table Formats](/concepts/open-table-formats)
- [Data Mesh](/concepts/data-mesh)
- [Multi-Region Data Architectures](/concepts/multi-region-data-architectures)

## External references

- Trino documentation — `trino.io/docs`
- Starburst architecture overview
- Dremio reflections whitepaper
