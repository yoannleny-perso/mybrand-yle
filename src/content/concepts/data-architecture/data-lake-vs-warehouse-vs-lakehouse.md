---
title: "Data Lake vs Data Warehouse vs Lakehouse"
slug: "data-lake-vs-warehouse-vs-lakehouse"
cluster: "data-architecture"
depth: "intermediate"
definition: "Three storage and compute paradigms — schema-on-read, schema-on-write, and the convergent model that combines both — each fit for different organizational profiles."
readingTime: 9
lastReviewed: "2026-03-15"
---

## What it is

A **data warehouse** stores structured data in a tightly governed, schema-on-write format, optimized for SQL analytics. A **data lake** stores any data — structured, semi-structured, unstructured — in its raw form on cheap object storage, applying schema only when read. A **lakehouse** is the architectural attempt to unify both: lake-style cheap storage with warehouse-style transactional guarantees, schema enforcement, and SQL performance.

The distinction is not about file format. It is about whether write-time guarantees, read-time flexibility, and analytical performance can coexist on a single platform.

## Why it matters

For 30 years, organizations had to choose: warehouse ergonomics (with rigidity and cost) or lake flexibility (with chaos and unreliable analytics). Most chose both, ran them in parallel, and paid for the integration tax. The lakehouse erases the choice — but only if implemented with discipline. Implemented poorly, it inherits the worst of both worlds: the governance gaps of a lake and the cost surprises of a warehouse.

Choosing among the three is therefore not a technology question but an *operating model* question. Which layer your team is mature enough to run determines which architecture will hold.

## How it works

### Warehouse (schema-on-write)

Data is loaded through ETL pipelines that enforce structure at write time. Storage is proprietary, columnar, optimized for analytical queries. Compute is tightly coupled to storage in classical warehouses (Teradata, on-prem Oracle), and decoupled in modern cloud warehouses (Snowflake, BigQuery). Queries are SQL. Governance is mature. Cost predictability is good.

### Lake (schema-on-read)

Data lands raw in object storage (S3, GCS, ADLS) in open formats — JSON, CSV, Parquet, Avro. There is no enforced schema at write time. Schema is interpreted at read time by query engines (Presto, Trino, Athena, Spark). Storage is cheap. Compute is flexible. Governance is *up to you* — which historically meant "missing."

### Lakehouse (the convergence)

A lakehouse uses cheap object storage (like a lake) but adds an open transactional table format on top — Delta Lake, Apache Iceberg, or Apache Hudi. These formats provide ACID transactions, schema enforcement, time travel, and indexing on top of plain Parquet files. Compute engines (Spark, Trino, Snowflake, BigQuery, Dremio) all read these formats. The result: warehouse guarantees on lake economics.

The lakehouse is the right default for new architectures in 2026. The warehouse is the right answer when SQL ergonomics dominate every other concern. The pure lake is, in most cases, an artifact you should be migrating *off of* rather than building on.

## Vendor comparison

| Aspect | Pure Warehouse (Snowflake, BigQuery) | Pure Lake (S3 + Athena/Trino) | Lakehouse (Databricks, Snowflake-Iceberg, BigLake) |
|---|---|---|---|
| **Storage cost** | Higher per TB | Lowest | Low (object storage) |
| **Schema** | Enforced at write | Inferred at read | Enforced via table format |
| **ACID** | Yes | Limited | Yes (Delta, Iceberg, Hudi) |
| **Governance maturity** | High | Self-built | High (Unity Catalog, Polaris) |
| **ML/AI fit** | Limited (now improving) | Good (raw access) | Best (single platform) |
| **Cost predictability** | High | Variable | Variable but transparent |
| **Best for** | SQL-first analytics | Cheap raw archival | Modern, AI-aware org |

**Snowflake.** The reference cloud warehouse for SQL-first analytics. Recent Iceberg support pushes it toward lakehouse territory but the platform's center of gravity remains the warehouse. Excellent governance, time travel, and zero-copy cloning. Cost discipline matters at scale.

**BigQuery.** A warehouse that has always behaved partially like a lakehouse — federated queries, external tables, and now BigLake with Iceberg. Serverless economics are unmatched for ad-hoc workloads. Best fit for GCP-native organizations.

**Databricks Lakehouse.** The reference lakehouse implementation. Delta Lake plus Unity Catalog plus Spark plus Photon plus DBSQL covers warehouse and lake use cases under one platform with one governance model. The platform of choice when ML and agentic workloads are first-class citizens.

**Pure-lake (S3 + Athena/Trino) deployments.** Still appropriate for archival, regulatory cold storage, and data-science exploration patterns where governance is owned by the consumer. Rarely the right primary platform for an organization beyond ~25 people without significant engineering tax.

## Yoann's take

> *In 2026, "data lake" should mean "lakehouse" by default. Pure-lake architectures still make sense for cold archival and a handful of niche workloads, but as a primary platform, they belong in the past. The real choice is between a SQL-first warehouse (Snowflake, BigQuery) and a unified lakehouse (Databricks). I default to lakehouse when ML and agentic workloads are in the next 18 months. I default to warehouse when they are not, and the team is more comfortable in SQL than in Spark.*
>
> *— Yoann*

---

## Related reading

- [Medallion Architecture](/concepts/medallion-architecture)
- [Open Table Formats — Iceberg, Delta, Hudi](/concepts/open-table-formats)
- [The Modern Data Stack](/concepts/modern-data-stack)

## External references

- *Lakehouse: A New Generation of Open Platforms that Unify Data Warehousing and Advanced Analytics* — Armbrust et al., CIDR 2021
- *Designing Data-Intensive Applications* — Martin Kleppmann
