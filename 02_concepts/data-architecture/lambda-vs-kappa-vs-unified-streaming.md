---
title: "Lambda vs Kappa vs Unified Streaming"
slug: "lambda-vs-kappa-vs-unified-streaming"
cluster: "data-architecture"
depth: "advanced"
definition: "Three architectural patterns for processing batch and streaming data — preserving them as separate paths, collapsing them into one streaming-only path, or unifying them on a single engine."
readingTime: 8
lastReviewed: "2026-03-15"
---

# Lambda vs Kappa vs Unified Streaming

`DATA ARCHITECTURE · ADVANCED · 8 MIN · LAST REVIEWED MARCH 2026`

> Three architectural patterns for processing batch and streaming data — preserving them as separate paths, collapsing them into one streaming-only path, or unifying them on a single engine.

## What it is

The **Lambda architecture** (Nathan Marz, 2011) maintains two parallel pipelines: a *batch layer* for historical accuracy and a *speed layer* for low-latency views. Consumers query a *serving layer* that merges the two. The **Kappa architecture** (Jay Kreps, 2014) argues this is unnecessary complexity: run everything as a stream and replay history when needed. The **unified streaming** pattern (the dominant 2026 approach) uses a single engine that handles both batch and streaming on the same code, with the same semantics.

## Why it matters

The choice determines how much code you maintain twice, how much operational complexity you carry, and how confidently you can answer the question *"is the dashboard correct right now?"*

Lambda was a pragmatic answer when batch tools and streaming tools had nothing in common. Kappa was a brave bet that streaming-only would be enough. Unified streaming is what happens when the engines (Flink, Spark Structured Streaming, Beam) finally treat batch as a special case of streaming — which is now the case.

## How it works

**Lambda:**
- Batch layer (Spark, MapReduce historically) recomputes views from scratch every N hours.
- Speed layer (Storm, Spark Streaming) maintains real-time views.
- Serving layer merges; queries handle both.
- *Cost:* two codebases for the same logic.

**Kappa:**
- One streaming engine (Kafka + a stream processor).
- Replay from the log to rebuild state.
- *Cost:* must keep enough log retention to replay; debugging streaming-only is harder.

**Unified streaming:**
- One engine, one codebase. Batch is a bounded stream.
- Apache Beam, Apache Flink, Spark Structured Streaming.
- *Cost:* engine maturity is recent (post-2020 for production patterns).

## Vendor comparison

| Aspect | Apache Flink | Spark Structured Streaming | Apache Beam (multi-runner) | Materialize / RisingWave |
|---|---|---|---|---|
| **Best for** | Low-latency, high-throughput streaming | Mixed batch + streaming on same Spark cluster | Engine-portable code | Streaming SQL on incrementally maintained materialized views |
| **Latency profile** | sub-second | seconds to minutes | depends on runner | sub-second |
| **State management** | Strong (RocksDB, savepoints) | Strong (Delta + Spark) | Depends on runner | Built-in |
| **Watermarks / late data** | Best-in-class | Good | Good | Different model (incremental) |
| **Cloud-managed** | Confluent Flink, AWS MSF, Ververica | Databricks, EMR | Google Dataflow | Materialize Cloud, RisingWave Cloud |

**Flink.** The reference open-source streaming engine. Excellent state management, watermarks, and exactly-once guarantees. The Confluent acquisition of the Flink team has made managed Flink a credible enterprise option.

**Spark Structured Streaming.** Pragmatic for organizations already running Spark. Latency is typically seconds, not sub-second — fine for most analytical use cases, not enough for true real-time applications.

**Apache Beam.** The portability play. Write once, run on Dataflow, Flink, or Spark. Compelling on Google Cloud via Dataflow; less obviously valuable elsewhere.

**Materialize / RisingWave.** A different category — streaming SQL via incrementally maintained materialized views. The right answer when the consumption pattern is "always-fresh dashboard" rather than "stream of events to react to."

## Yoann's take

> *In 2026, I default to unified streaming on Flink for genuine streaming workloads, and to Spark Structured Streaming when the same Databricks platform is already serving batch analytics. I treat Lambda as legacy — if I find it in a brownfield engagement, the modernization plan retires it. Kappa was directionally right but bet on tooling that took another decade to mature; the unified-streaming successors are the practical Kappa we always wanted.*
>
> *— Yoann*

---

## Related reading

- [Batch vs Streaming vs Micro-Batch](/concepts/data-engineering/batch-vs-streaming-vs-micro-batch)
- [Idempotency and Exactly-Once Semantics](/concepts/data-engineering/idempotency-exactly-once)
- [Open Table Formats — Iceberg, Delta, Hudi](/concepts/data-architecture/open-table-formats)
