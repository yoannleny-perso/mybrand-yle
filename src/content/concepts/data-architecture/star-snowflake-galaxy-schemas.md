---
title: "Star, Snowflake, and Galaxy Schemas"
slug: "star-snowflake-galaxy-schemas"
cluster: "data-architecture"
depth: "intermediate"
definition: "Three dimensional modeling patterns that organize fact and dimension tables for analytical consumption — each trading off normalization against query performance and complexity."
readingTime: 7
lastReviewed: "2026-03-15"
---

# Star, Snowflake, and Galaxy Schemas

`DATA ARCHITECTURE · INTERMEDIATE · 7 MIN · LAST REVIEWED MARCH 2026`

> Three dimensional modeling patterns that organize fact and dimension tables for analytical consumption — each trading off normalization against query performance and complexity.

## What it is

Dimensional modeling, formalized by Ralph Kimball, organizes analytical data around **fact tables** (the events or measurements the business cares about) and **dimension tables** (the descriptive context in which those facts occur). Three canonical schema shapes emerge from this pattern:

- **Star schema** — one fact table with denormalized dimensions hanging off it directly.
- **Snowflake schema** — like a star, but dimensions are normalized into multiple related tables.
- **Galaxy (or fact constellation) schema** — multiple fact tables sharing conformed dimensions.

## Why it matters

Dimensional modeling remains the dominant pattern for the gold layer of any modern lakehouse — even when the underlying storage is a lakehouse, even when the consumers include LLMs and agents. Star schemas are easy to query, easy to teach, and easy for query optimizers to handle. Most BI tools assume this shape.

Choosing the wrong shape — usually over-snowflaking when a star would suffice — increases query complexity and slows analyst velocity without measurable benefit.

## How it works

- **Star** — denormalized; fastest for joins; some redundancy in dimension data; the right default for almost all gold-layer modeling.
- **Snowflake** — normalized dimensions reduce storage and update anomalies; trades query simplicity for a marginal storage win that rarely matters in modern columnar warehouses.
- **Galaxy** — multiple stars sharing conformed dimensions; the natural state of a mature warehouse where many business processes are modeled.

The key concept is the **conformed dimension**: a dimension (e.g., `dim_date`, `dim_customer`) that is reused identically across multiple fact tables. Conformed dimensions are what make galaxy schemas tractable.

## Vendor comparison

This is a modeling pattern, not a vendor choice — but the platform you build on matters.

| Aspect | Snowflake / BigQuery (warehouses) | Databricks (lakehouse) | dbt (transformation) |
|---|---|---|---|
| **Star schema fit** | Excellent — columnar storage rewards denormalization | Excellent | Excellent — dbt's `dim_` and `fct_` conventions are built for this |
| **Surrogate key generation** | SQL functions native | SQL functions native | dbt macros (`dbt_utils.generate_surrogate_key`) |
| **SCD support** | Native via MERGE | Delta MERGE | dbt snapshots |

## Yoann's take

> *In 2026, my default for the gold layer is a star schema with conformed dimensions across business processes — implemented in dbt with the standard `dim_` and `fct_` naming conventions. I almost never reach for a snowflake schema; modern columnar storage makes the storage savings irrelevant and the query complexity worse. Galaxy schemas emerge naturally as you model more business processes — they are not designed, they are inherited.*
>
> *— Yoann*

---

## Related reading

- [Slowly Changing Dimensions](/concepts/data-architecture/slowly-changing-dimensions)
- [Medallion Architecture](/concepts/data-architecture/medallion-architecture)
- [Data Transformation with dbt](/concepts/data-engineering/data-transformation-with-dbt)
