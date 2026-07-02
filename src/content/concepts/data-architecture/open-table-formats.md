---
title: "Open Table Formats — Iceberg, Delta, Hudi"
slug: "open-table-formats"
cluster: "data-architecture"
depth: "advanced"
definition: "Open metadata layers built on top of Parquet that bring transactional guarantees, schema evolution, time travel, and indexing to lakehouse storage."
readingTime: 12
lastReviewed: "2026-03-15"
---

## What it is

A modern lakehouse stores data physically as Parquet files in object storage. On its own, that is just a collection of files — no transactions, no schema evolution, no concurrent writes, no time travel. An open table format is a metadata layer that turns that collection of files into a *table* with database-grade guarantees.

The three formats that matter in 2026 are Apache Iceberg, Delta Lake, and Apache Hudi. They solve overlapping problems with meaningfully different trade-offs.

## Why it matters

The choice of table format is the single most important architectural decision in a lakehouse build. It determines:

- Which compute engines can read and write your tables
- How expensive metadata operations become at scale
- How freely you can switch vendors later
- Whether streaming and batch can share the same tables
- How auditability and time travel work in practice

A wrong choice here is recoverable but expensive — typically a 6-12 month migration if the organization grows past the format's sweet spot.

## How it works

All three formats follow the same broad pattern: alongside the Parquet data files, they maintain metadata files that record which data files belong to which version of the table. Readers consult the metadata; writers commit new metadata atomically. The mechanisms differ.

### Apache Iceberg

Iceberg uses a hierarchical metadata model: a catalog points to the current metadata file, which points to a manifest list, which points to manifest files, which point to data files. Snapshots are first-class. Schema evolution is robust. Partition evolution is uniquely supported — you can change a table's partitioning without rewriting data.

Compute engine support is the broadest of the three: Spark, Trino, Flink, Snowflake, BigQuery, Redshift, Dremio, Presto, ClickHouse, and increasingly DuckDB.

### Delta Lake

Delta uses a transaction log (`_delta_log`) — an append-only sequence of JSON files that record every commit, with periodic checkpoints in Parquet. The format originated inside Databricks and was later open-sourced. Writes go through the log; readers reconstruct the table state from log replay.

Schema enforcement and evolution are mature. Time travel is straightforward. Performance optimizations (Z-ordering, liquid clustering, photon vectorization on Databricks) are best-in-class within the Databricks ecosystem.

### Apache Hudi

Hudi was designed at Uber for a specific use case: incremental ingestion with frequent updates and deletes. It supports two table types — Copy-on-Write (rewrites files on update) and Merge-on-Read (writes deltas, merges at read time). Hudi was the first format to take CDC and upserts seriously and remains the strongest fit for high-frequency mutation workloads.

## Vendor comparison

| Aspect | Apache Iceberg | Delta Lake | Apache Hudi |
|---|---|---|---|
| **Origin** | Netflix (now ASF) | Databricks (now Linux Foundation) | Uber (ASF) |
| **Governance** | Vendor-neutral, broad catalog support | Originally Databricks-led; OSS reference + Databricks-enhanced | ASF, but adoption concentrated |
| **Compute engine support** | Broadest — Spark, Trino, Flink, Snowflake, BigQuery, Redshift, Dremio, ClickHouse | Strong on Databricks; growing externally via Delta UniForm | Strong with Spark/Flink; less elsewhere |
| **Catalog options** | REST Catalog, Nessie, Polaris, AWS Glue, Hive | Unity Catalog, Hive Metastore, Glue | Hive Metastore, AWS Glue |
| **Schema evolution** | Full (add, drop, rename, reorder, type widening) | Strong (add, drop, type widening; rename via UniForm) | Strong with caveats |
| **Partition evolution** | Yes — unique strength | No (liquid clustering offers similar functionality) | Limited |
| **Time travel** | Yes | Yes | Yes |
| **CDC/Upsert ergonomics** | Good, improving | Excellent on Databricks (MERGE) | Best — designed for it |
| **Streaming + batch unification** | Strong via Flink + Spark | Strongest within Databricks | Strong (designed for it) |
| **Future trajectory** | Industry-default open standard | Catching up via UniForm interop | Specialized — high-mutation workloads |

**Iceberg.** The clearest winner of the open-format war as of 2026, by virtue of broadest engine support and vendor neutrality. Both Snowflake and Databricks have publicly committed to first-class Iceberg support; AWS, GCP, and most independent vendors already provide it. The bet has narrowed: choosing Iceberg in 2026 is the lowest-regret decision for new builds.

**Delta Lake.** Still the right answer if you are committed to the Databricks platform — performance, tooling, and Unity Catalog integration are tightest there. Delta UniForm (which exposes Delta tables as Iceberg-compatible) softens the lock-in concern significantly. For any non-Databricks centric build in 2026, Iceberg is the safer choice.

**Hudi.** Specialized but excellent at what it specializes in. The right answer when your dominant workload is high-frequency CDC ingestion with millisecond-to-minute SLAs on update propagation. Outside that profile, the broader ecosystem support of Iceberg or Delta usually wins.

## Yoann's take

> *In 2026, my default for new lakehouse builds is Iceberg with a REST Catalog (Polaris or Nessie) — even when the primary compute engine is Databricks. Delta UniForm has made this nearly free from the Databricks side, and the optionality preserved on the catalog and engine side is worth the small operational tax. I will use Delta as primary only when the engagement is Databricks-only and the team prefers the Databricks-native developer experience. I reach for Hudi only on the specific profile it was designed for: high-frequency upserts at scale.*
>
> *— Yoann*

---

## Related reading

- [Medallion Architecture](/concepts/medallion-architecture)
- [Data Lake vs Data Warehouse vs Lakehouse](/concepts/data-lake-vs-warehouse-vs-lakehouse)
- [CDC — Change Data Capture](/concepts/cdc-change-data-capture)

## External references

- *Apache Iceberg specification* — iceberg.apache.org
- *Delta Lake whitepaper* — Armbrust et al., VLDB 2020
- *Apache Hudi documentation* — hudi.apache.org
