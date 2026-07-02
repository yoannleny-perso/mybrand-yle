---
title: "OLTP vs OLAP vs HTAP"
slug: "oltp-vs-olap-vs-htap"
cluster: "data-architecture"
depth: "intermediate"
definition: "Three database workload patterns — transactional, analytical, and hybrid — each requiring different storage layouts, query patterns, and operational commitments."
readingTime: 6
lastReviewed: "2026-03-15"
---

## What it is

**OLTP** (Online Transaction Processing) systems handle high-volume, low-latency, single-record reads and writes — the database behind your application. **OLAP** (Online Analytical Processing) systems handle large scans across many records to compute aggregates — the warehouse behind your dashboards. **HTAP** (Hybrid Transactional/Analytical Processing) systems attempt both on the same engine.

The differences run deep: OLTP databases use row-oriented storage, B-tree indexes, and ACID transactions optimized for write throughput. OLAP databases use columnar storage, vectorized execution, and query plans optimized for full-table scans.

## Why it matters

Confusing the two is the most common architectural mistake in early-stage companies. Running analytics on the OLTP database (Postgres) works until it doesn't — and when it doesn't, the application slows down because the analytical query is locking rows or starving the buffer cache. Running transactions on the OLAP warehouse is just slow.

The architectural answer is replication: data flows from OLTP to OLAP via CDC or batch ingestion. HTAP promises to remove that need; in practice, HTAP works for specific use cases but rarely replaces a dedicated warehouse.

## How it works

| Property | OLTP | OLAP | HTAP |
|---|---|---|---|
| **Storage layout** | Row-oriented | Columnar | Hybrid (column + row, or in-memory rows over columns) |
| **Typical query** | `SELECT ... WHERE id = ?` | `SELECT ..., COUNT(*) GROUP BY ...` | Both |
| **Latency target** | <10ms | seconds to minutes | mixed |
| **Update pattern** | Frequent, small | Rare, bulk | Both |
| **Indexes** | B-tree, hash | Zone maps, bloom filters, sort orders | Mixed |

## Vendor comparison

| Workload | Common choices |
|---|---|
| **OLTP** | Postgres, MySQL, CockroachDB, Aurora, Spanner, MongoDB, DynamoDB |
| **OLAP** | Snowflake, BigQuery, Databricks SQL, Redshift, ClickHouse |
| **HTAP** | TiDB, SingleStore, Snowflake Unistore (preview), CockroachDB+Materialize |

**The HTAP question in 2026.** Real HTAP — meaning the same engine handling production transactions and analytical queries on live data without replication — is now genuinely viable for a class of applications: real-time personalization, operational analytics on small-to-mid data volumes, and fraud detection where freshness matters more than scale. For warehouse-scale analytics across the whole enterprise, HTAP rarely replaces the dedicated lakehouse or warehouse.

## Yoann's take

> *I treat this as a default architecture question: the OLTP system is for the application, the OLAP system is for analytics, and CDC moves data between them. HTAP is interesting at the edges — operational analytics, real-time personalization — but it is not a substitute for a proper lakehouse for enterprise analytics. When a startup tells me they're "running analytics on Postgres because it's fine," I usually have 6-12 months before that statement stops being true.*
>
> *— Yoann*

---

## Related reading

- [CDC — Change Data Capture](/concepts/cdc-change-data-capture)
- [The Modern Data Stack](/concepts/modern-data-stack)
- [Data Lake vs Data Warehouse vs Lakehouse](/concepts/data-lake-vs-warehouse-vs-lakehouse)
