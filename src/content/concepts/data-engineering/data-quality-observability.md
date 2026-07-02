---
title: "Data Quality and Observability"
slug: "data-quality-observability"
cluster: "data-engineering"
depth: "core"
definition: "The practice of catching bad data before it reaches a dashboard or a model — through assertions, anomaly detection, and end-to-end lineage."
readingTime: "8 min"
lastReviewed: "2026-Q2"
---

## What it is

Data quality is the discipline of catching bad data: nulls where they should not be, duplicates, schema drift, distributions that suddenly look wrong, freshness violations. Observability is the broader version — knowing the state of your data platform at any moment, including which pipelines ran, what they produced, who is consuming it, and whether anything looks anomalous.

The two practices have converged. A modern data quality stack does scheduled assertions (this column should never be null), anomaly detection (this row count usually sits at 1M ± 5%, today it is 200K), and lineage (when something breaks, what depends on it).

## Why it matters

Data quality issues are almost always discovered by the consumer, not the producer. A CFO finds a number on the board deck that does not match the number in the email from yesterday. The cost is not the wrong number — it is the trust deficit that follows.

A real observability layer changes who finds problems and when. Producers find issues before consumers do. Pipelines fail loudly, not silently. The business gets a freshness expectation it can plan against.

The honest take: most data quality programs fail not because the tools are bad but because nobody owns the alerts. A wall of red on a Monte Carlo dashboard that nobody reads is worse than no dashboard at all.

## How it works

Three layers, roughly in order of investment.

Assertions: explicit rules — column X is unique, column Y is never null, table Z always has between 100K and 500K rows per day. dbt tests, Great Expectations, Soda, and Elementary all express this. Cheap, fast, catches the obvious.

Anomaly detection: statistical or ML-based detection of changes — row counts trending wrong, unusual null rates, a numeric distribution shifting. Monte Carlo, Bigeye, and Anomalo specialize in this. Catches the things assertions cannot, at the cost of false positives that need triage.

Lineage and impact analysis: when an upstream table breaks, the system tells you exactly which dashboards, models, and downstream consumers are affected. This shifts incident response from archaeology to triage.

The mature version combines all three with on-call rotations and a clear escalation process. The technology is not the limit. The operating model is.

## Vendor comparison

| Tool | Best for | Strength | Weakness |
|---|---|---|---|
| **dbt tests + Elementary** | dbt-centric teams, low cost | Native to dbt, free for assertions, Elementary adds anomaly detection on top | Limited to what dbt can see |
| **Great Expectations** | Python-heavy teams, custom assertions | Open source, expressive, integrates with most tools | Operationally heavy, UI lacking |
| **Soda** | Cross-source assertions with code-first config | YAML-driven, multi-source, good for governance teams | Less ML-driven anomaly detection |
| **Monte Carlo** | Enterprise observability, broad coverage | ML anomaly detection, lineage, incident workflow | Premium pricing, can be noisy without tuning |
| **Bigeye** | Anomaly-first observability | Strong anomaly detection, good UI | Smaller ecosystem than Monte Carlo |
| **Anomalo** | Snowflake / Databricks heavy ML approach | Sophisticated detection, low false positive rate | Snowflake/Databricks-centric |

**dbt tests + Elementary** is where I start every team. Free, native, catches 70% of issues. If you are not at this baseline, no premium tool will save you.

**Monte Carlo** is the dominant enterprise option and a credible default for organizations past ~50 critical tables with cross-source pipelines. Worth the price when the cost of one missed incident exceeds annual licensing — true at most $1B+ companies.

**Anomalo** is my pick when the data is heavily Snowflake or Databricks and the team values low false-positive rates over breadth.

**Soda** is a strong fit for governance-led organizations that want assertions as code with first-class multi-source support — particularly regulated industries.

## Yoann's take

*My order of operations: get to dbt tests + Elementary first, instrument freshness on every consumer-facing table, define an SLA per critical asset, set up an on-call rotation, and only then evaluate a premium observability platform. Buying Monte Carlo before the operating model exists is buying a more expensive wall of red. The biggest unlock is not the tool, it is making one person own each critical table — name on a page, owner of incidents, owner of fixes. After that, the right premium tool is an accelerator.*

*— Yoann*

## Related reading

- [Data Contracts](/concepts/data-contracts)
- [DataOps Maturity](/concepts/dataops-maturity)
- [Data as a Product](/concepts/data-as-a-product)
- [Anomaly Detection and Forecasting](/concepts/anomaly-detection-forecasting)

## External references

- Monte Carlo documentation
- Elementary open source
- Great Expectations docs
