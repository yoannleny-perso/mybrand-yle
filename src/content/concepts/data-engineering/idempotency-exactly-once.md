---
title: "Idempotency and Exactly-Once Semantics"
slug: "idempotency-exactly-once"
cluster: "data-engineering"
depth: "intermediate"
definition: "Designing pipelines so that running the same job twice produces the same result, and so that each input event is reflected in output exactly once — even after retries, failures, and replays."
readingTime: "8 min"
lastReviewed: "2026-Q2"
---

## What it is

Idempotency: running the same operation twice produces the same outcome as running it once. Re-running yesterday's pipeline does not double the row count. Replaying the last hour of events does not duplicate orders.

Exactly-once: every input event is reflected in the final output state exactly once, regardless of retries, partial failures, or system restarts. Achievable in practice only with cooperation from the source, the processing engine, and the sink — and even then with some asterisks.

These two properties are foundational for any pipeline that handles money, inventory, or anything else where double-counting has consequences.

## Why it matters

Most of the worst data incidents I have seen trace back to a violated idempotency assumption. A pipeline retries after a network blip and inserts the same 50K rows twice. A streaming consumer is restarted and reprocesses an hour of events, double-counting purchases. A backfill job runs while production is also running and the union is wrong.

The real cost is rarely the wrong number — it is the audit trail. Once you have double-counted revenue in a published table, you have to find every consumer, correct every report, and explain to leadership how the number changed. Idempotent design eliminates a category of incident entirely.

## How it works

Idempotency in batch pipelines is about deterministic writes:

- **Overwrite, don't append.** A daily aggregation should overwrite yesterday's partition, not append to it. dbt's `incremental` materialization with a unique key handles this; raw SQL inserts often do not.
- **Use natural keys for upserts.** `MERGE` on a unique business key. Never on a row position or surrogate key generated at insert time.
- **Pin the time window.** A pipeline should accept an explicit window parameter and process exactly that window. "Yesterday" computed from `current_date()` at runtime is not idempotent across reruns at different times.

Exactly-once in streaming is harder. The Kafka + Flink combination achieves it through:

- **Producer transactions.** The producer writes events and offset commits atomically.
- **Consumer offset management.** The consumer commits offsets only after successful processing, atomically with output writes.
- **Sink transactions.** The sink supports two-phase commits (Iceberg, Delta, JDBC with XA).

When any of those three is missing, you are in at-least-once territory. At-least-once + idempotent consumers = effectively-once, which is what most production systems actually achieve.

## Vendor comparison

| Pattern | Implementation | Notes |
|---|---|---|
| **Batch upsert (warehouse)** | dbt incremental + unique_key | The default for analytics |
| **Idempotent micro-batch (lakehouse)** | Spark Structured Streaming + Delta MERGE | Reliable when configured correctly |
| **Exactly-once streaming** | Kafka + Flink + Iceberg/Delta sink | True exactly-once with two-phase commit |
| **Effectively-once event consumer** | At-least-once delivery + dedupe table | Most pragmatic; works without upstream cooperation |
| **Source-driven idempotency** | CDC with monotonic LSN/transaction ID | Requires source to expose ordering |

**Flink + Kafka + Iceberg** is the cleanest exactly-once stack available today. The configuration is non-trivial but the guarantees are real.

**Effectively-once via dedupe** is the most common production pattern. You accept at-least-once delivery, write events with a unique ID to a deduplication table or window, and ignore replays. Less elegant, more universally applicable.

## Yoann's take

*My rule: every pipeline that handles money, customer-impacting state, or anything that ends up in a board metric must be idempotent. No exceptions. The pattern I default to in batch is dbt incremental with a unique key and an explicit time window argument. In streaming I default to effectively-once via dedupe, with full exactly-once (Flink + Iceberg sink) only when the latency budget and the regulatory environment justify it. The mistake I see most often is teams who claim exactly-once because they are using Kafka, without understanding that their downstream consumers do not commit transactionally. Names matter; semantics matter more.*

*— Yoann*

## Related reading

- [Lambda vs Kappa vs Unified Streaming](/concepts/lambda-vs-kappa-vs-unified-streaming)
- [Schema Evolution and Backwards Compatibility](/concepts/schema-evolution-backwards-compat)
- [Change Data Capture (CDC)](/concepts/cdc-change-data-capture)
- [Open Table Formats](/concepts/open-table-formats)

## External references

- Apache Flink exactly-once documentation
- Kafka transactions whitepaper
- "Designing Data-Intensive Applications" — Martin Kleppmann
