---
title: "Change Data Capture (CDC)"
slug: "cdc-change-data-capture"
cluster: "data-engineering"
depth: "core"
definition: "Capturing every insert, update, and delete from an operational database in near real-time, instead of polling for changes on a schedule."
readingTime: "8 min"
lastReviewed: "2026-Q2"
---

## What it is

CDC reads the transaction log of a source database (Postgres WAL, MySQL binlog, SQL Server CT) and emits a stream of every row that changes. Each event includes the operation type (insert / update / delete), the before and after values, a timestamp, and a transaction ID. Downstream systems consume that stream and stay in lockstep with the source.

This is fundamentally different from batch extraction. A nightly job that selects everything modified since yesterday misses deletes, can double-count updates, and creates pressure on the source database. CDC reads the log, which the database is already writing, so it is both more accurate and lighter.

## Why it matters

Three problems CDC actually solves.

Replication latency: a financial dashboard that updates once a day is built on data that is up to 24 hours stale. CDC closes that to seconds. For operational analytics — fraud detection, inventory, supply chain — this is the difference between actionable and decorative.

Source database pressure: nightly extraction on a busy OLTP database is a tax on production. CDC reads from the log without scanning tables, which the database is already doing for crash recovery.

Faithful change history: without CDC, a row that is updated three times in one day looks like one update at extraction time. With CDC you have all three. For audit, regression analysis, and regulatory work, this matters.

## How it works

A CDC connector subscribes to the source database's replication stream — Postgres logical replication slots, MySQL binlog, SQL Server CDC tables, or a managed equivalent. The connector parses each event, normalizes it into a common format (typically Debezium's envelope), and writes it to a streaming platform (Kafka, Kinesis, Pub/Sub) or directly to the destination.

Downstream consumers read the stream and apply changes. The simplest pattern is "upsert into target" — replicating the source as-is. More sophisticated patterns include event-sourcing the changes (every row version preserved), building Type 2 SCDs from the change feed, or driving real-time materialized views in the warehouse.

The two pain points are initial snapshots (you need to copy the existing data once before the stream takes over) and schema evolution (when the source adds a column, the stream needs to handle it without breaking).

## Vendor comparison

| Tool | Best for | Strength | Weakness |
|---|---|---|---|
| **Debezium** (open source) | Self-hosted, highest fidelity | Largest connector library, battle-tested, free | You operate Kafka Connect; nontrivial |
| **Fivetran** | Hands-off SaaS replication | Set up in an hour, broad source coverage including SaaS | Cost based on monthly active rows climbs fast at volume |
| **Airbyte** | Open-source ELT with CDC, mid-scale | Generous open-source posture, good UI, growing connector library | CDC reliability historically behind Debezium and Fivetran |
| **Estuary Flow** | Streaming-first ELT with CDC | True streaming, exactly-once, low latency | Younger product, smaller ecosystem |
| **Snowflake Openflow / Snowpipe Streaming** | Snowflake-centric, push-based ingestion | Native to Snowflake, no separate orchestrator | Snowflake-only |
| **AWS DMS** | AWS-centric replication | Cheap, integrates with AWS targets | Operationally crude, schema evolution painful |

**Debezium** is the technically strongest option and the cheapest at scale, if you have the engineering capacity to operate Kafka Connect. Most managed offerings (Confluent Connect, Red Hat Streams, AWS MSK Connect) are Debezium under the hood.

**Fivetran** is the right answer when speed-to-value matters more than per-row cost. A team of three setting up CDC for fifteen sources in a quarter will get there with Fivetran. Cost becomes a real conversation past 100M MAR/month.

**Airbyte** sits between the two. Self-hostable, lower cost than Fivetran at scale, but historically less reliable for CDC specifically. It has improved meaningfully but I still verify on a per-source basis.

**Estuary Flow** is the most interesting newer entrant. True streaming model, exactly-once semantics, low latency. The right pick for teams with real real-time requirements that are not already running Kafka.

## Yoann's take

*My default for new builds is Fivetran for the first year — it gets value flowing fast and the team can focus on modeling, not connector operations. I move to Debezium when the math turns: typically when a single high-volume source crosses ~50M MAR/month, the savings cover an engineer's time. For genuine real-time operational analytics — sub-second latency, exactly-once — Estuary or a properly run Debezium-on-Kafka stack is the right answer; Fivetran is not designed for that. The mistake I see most: teams choosing Fivetran for SaaS sources (correct) and then also forcing it onto a 500M-row Postgres database where the cost is indefensible.*

*— Yoann*

## Related reading

- [Lambda vs Kappa vs Unified Streaming](/concepts/lambda-vs-kappa-vs-unified-streaming)
- [Data Quality and Observability](/concepts/data-quality-observability)
- [Slowly Changing Dimensions](/concepts/slowly-changing-dimensions)
- [Modern Data Stack](/concepts/modern-data-stack)

## External references

- Debezium documentation
- Fivetran connector catalog
- Estuary Flow architecture
