---
title: "Data Vault Modeling"
slug: "data-vault-modeling"
cluster: "data-architecture"
depth: "intermediate"
definition: "An ensemble modeling pattern (hubs, links, satellites) designed for auditability and adaptability in environments with frequent source changes — the right answer for regulated, integration-heavy data warehouses."
readingTime: 8
lastReviewed: "2026-03-15"
---

## What it is

Data Vault is a modeling methodology developed by Dan Linstedt that decomposes the data warehouse into three primitive constructs: **hubs** (business keys), **links** (associations between business keys), and **satellites** (descriptive attributes that can change over time). Each construct has a single responsibility and is loaded with strict insert-only patterns, preserving full audit history.

The pattern lives between raw bronze and consumable gold layers — typically as the silver layer in a medallion architecture for organizations that need its specific properties.

## Why it matters

Data Vault is the answer to two specific problems:

1. **Frequent source change.** Adding a new source system, deprecating one, or absorbing an acquisition requires only adding new satellites — not restructuring existing models.
2. **Regulatory auditability.** Insert-only loading and complete history mean you can reconstruct the state of any business entity at any point in time, which is non-negotiable in banking, insurance, healthcare, and parts of pharma.

Outside those contexts, Data Vault is usually overkill. It costs more to build and consume than star schemas, and the integration complexity it solves is not the problem you have.

## How it works

- **Hubs** — one row per unique business key (customer ID, product SKU). Just the key, a hash, a load timestamp, and a record source. No descriptive attributes.
- **Links** — many-to-many relationships between hubs (a sale links a customer hub to a product hub). Insert-only.
- **Satellites** — descriptive attributes hung off hubs or links. Insert-only with effective-from / effective-to columns. Type-2 historization is built in.

Loading is parallelizable because hubs, links, and satellites have no foreign-key dependencies between them at load time. Consumption is harder — Data Vault is built for engineers, not analysts. Most implementations expose a denormalized "presentation layer" (often star schemas) on top of the Vault for actual querying.

## Vendor comparison

| Aspect | dbtvault (now AutomateDV) | VaultSpeed | WhereScape | Snowflake-native via dbt |
|---|---|---|---|---|
| **Form** | dbt package | SaaS DV automation | Enterprise tooling | Custom dbt models |
| **Best for** | dbt-native teams | Low-code DV at enterprise scale | Established WhereScape shops | Pragmatic, code-first teams |
| **Trade-off** | Code-heavy | Vendor dependence | Heavyweight | Reinventing some patterns |

**AutomateDV (formerly dbtvault).** The default choice for code-first teams already running dbt. Mature, well-documented, used in production widely.

**VaultSpeed.** A good answer for enterprise teams that need DV but don't want to write the mechanical code. Generates the loading patterns automatically.

**WhereScape.** The legacy enterprise option — strong if it's already in place; rarely the right new purchase in 2026.

## Yoann's take

> *Data Vault solves real problems for regulated, integration-heavy organizations. It is the wrong default for almost everyone else. I deploy DV when audit and source-change frequency genuinely warrant it; otherwise I prefer dimensional modeling on the silver layer with strong contracts and SCD Type-2 where needed. The simplest model that meets the requirements wins.*
>
> *— Yoann*

---

## Related reading

- [Star, Snowflake, and Galaxy Schemas](/concepts/star-snowflake-galaxy-schemas)
- [Slowly Changing Dimensions](/concepts/slowly-changing-dimensions)
- [Medallion Architecture](/concepts/medallion-architecture)
