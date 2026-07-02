---
title: "Slowly Changing Dimensions"
slug: "slowly-changing-dimensions"
cluster: "data-architecture"
depth: "intermediate"
definition: "A set of patterns (Type 0 through Type 7) for handling attribute changes in dimension tables — choosing how much history to preserve and how to expose it."
readingTime: 7
lastReviewed: "2026-03-15"
---

## What it is

SCD is the modeling vocabulary for answering one question: *when an attribute of a dimension changes, what should the warehouse remember?* The answer determines whether historical reports stay correct or silently rewrite themselves.

The seven canonical types:

- **Type 0** — never change. The original value is the truth.
- **Type 1** — overwrite. Keep only the current value. History is lost.
- **Type 2** — add a new row with effective-from / effective-to dates. Full history preserved.
- **Type 3** — add a column for the previous value. Limited history.
- **Type 4** — split current and historical into separate tables.
- **Type 6** — combination of 1, 2, and 3 (the "hybrid").
- **Type 7** — dual surrogate keys for current and historical use.

In practice, almost every implementation uses some mix of Type 1 and Type 2.

## Why it matters

The wrong SCD choice silently corrupts historical analysis. If a customer's region changes from EMEA to APAC and you're using Type 1, every old order suddenly attributes to APAC — and the EMEA Q3 report shrinks for no apparent reason. Auditors notice.

The right choice depends on the *consuming question*. If you always want "as of today's truth," Type 1 is fine. If you need "as of the time of the event," you need Type 2.

## How it works

Type 2 is the workhorse. The pattern:

```
| customer_sk | customer_id | region | valid_from   | valid_to     | is_current |
|-------------|-------------|--------|--------------|--------------|------------|
| 1           | C-100       | EMEA   | 2023-01-01   | 2024-06-30   | false      |
| 2           | C-100       | APAC   | 2024-07-01   | 9999-12-31   | true       |
```

Fact tables join on the surrogate key (`customer_sk`), which means each fact row is bound to the dimension state at the time of the event.

## Vendor comparison

| Approach | dbt snapshots | Delta Lake MERGE / Snowflake MERGE | Custom SQL |
|---|---|---|---|
| **Form** | Declarative dbt feature | Imperative DML | Hand-rolled |
| **Best for** | Most modern stacks | Engine-native control | Edge cases |

**dbt snapshots.** The default. Handles Type 2 with a few lines of YAML. Integrates cleanly with the rest of dbt.

**Native MERGE.** When you need fine control over performance — e.g., very large dimensions where dbt's default approach is too slow — falling to native MERGE statements in Snowflake or Databricks is appropriate.

## Yoann's take

> *I default to Type 2 for any dimension where historical fidelity might matter, Type 1 for everything else, and explicit Type 4 only when the historical table volume is large enough that splitting it from the current table genuinely saves on query performance. The seven-type taxonomy is good vocabulary; in practice you live in two of them.*
>
> *— Yoann*

---

## Related reading

- [Star, Snowflake, and Galaxy Schemas](/concepts/star-snowflake-galaxy-schemas)
- [Data Vault Modeling](/concepts/data-vault-modeling)
- [CDC — Change Data Capture](/concepts/cdc-change-data-capture)
