---
title: "Batch vs Streaming vs Micro-Batch"
slug: "batch-vs-streaming-vs-micro-batch"
cluster: "data-engineering"
depth: "core"
definition: "Three processing modes — periodic batches, continuous streams, or small frequent batches — each with different latency, cost, and complexity profiles."
readingTime: "7 min"
lastReviewed: "2026-Q2"
---

# Batch vs Streaming vs Micro-Batch

## What it is

Batch processing reads a bounded set of data — yesterday's events, last hour's orders — and produces a result. Runs on a schedule. Simple, well-understood, cheap.

Streaming processing reads an unbounded continuous flow of events and updates state as each arrives. Latency is measured in seconds or milliseconds. Complexity is measured in incident severity at 3am.

Micro-batch is the pragmatic middle ground. Small batches every minute or two. You get most of the latency benefit of streaming with much of the operational simplicity of batch. Most "streaming" pipelines in production are actually micro-batch.

## Why it matters

The default mistake is choosing streaming for the wrong reason — because it sounds modern, because a vendor demo was impressive, because the requirement was "real-time" without anyone defining what that meant.

True streaming is justified when latency below 30 seconds creates measurable business value: fraud detection, real-time bidding, operational alerting, hot-path personalization. For analytics — even fast analytics — micro-batch or short-interval batch is almost always the right answer.

The cost difference is real. A streaming pipeline costs 3-10× more to operate than the equivalent batch pipeline. That is engineer time, infrastructure, and incident overhead. Choose streaming when the business case clears that bar, not before.

## How it works

Batch: orchestrator triggers a job, job reads source data within a time window, job runs transformations, job writes output, job ends. Failure means the next run picks up where this one stopped or replays the window.

Streaming: a long-running process consumes from a message queue or change stream, maintains state in memory or in a state store (RocksDB, Flink state, Kafka Streams), processes each event, emits results downstream. Failure means restoring from checkpoint and replaying since the last savepoint.

Micro-batch: a streaming engine that internally batches small windows — Spark Structured Streaming default, Snowpipe Streaming. From the user's perspective it looks like streaming. Operationally it has more in common with batch.

## Vendor comparison

| Engine | Mode | Best for | Notes |
|---|---|---|---|
| **Apache Flink** | True streaming | Complex stateful streaming, sub-second latency | Operational gold standard; learning curve real |
| **Spark Structured Streaming** | Micro-batch (continuous mode exists, rarely used) | Teams already on Databricks or Spark | "Streaming" in name, micro-batch in practice |
| **Kafka Streams** | True streaming | Java/Scala teams, lightweight stateful streaming | Library, not a platform; deploys with the app |
| **Apache Beam** (Dataflow on GCP) | Both | Unified batch + stream programming model | Strong on GCP; less common elsewhere |
| **Snowpipe Streaming** | Micro-batch | Snowflake-centric ingestion | Snowflake-only |
| **dbt + scheduled batch** | Batch | Most analytics work | Default for warehouse transformations |

**Flink** is the right answer for genuine streaming workloads with state and sub-second SLAs. Confluent's managed Flink, AWS Managed Flink, and Ververica all make it operable.

**Spark Structured Streaming** is the right answer for teams already on Databricks. Calling it streaming is generous — it is excellent micro-batch. For most analytics use cases, that is enough.

**Snowpipe Streaming** is the right answer when Snowflake is the destination and the goal is low-latency ingestion, not complex stream processing.

## Yoann's take

*I default to batch for analytics, micro-batch for ingestion when freshness matters, and true streaming only when there is a documented business case for sub-30-second latency. The number of "we need real-time" requirements that turn out to mean "we need fresh by 8am" is high. When real streaming is justified, Flink is the technical default and Databricks Spark Structured Streaming is the right answer if Databricks is already the platform. The mistake to avoid: treating streaming as a status symbol. The pipelines that survive are the ones with the lowest necessary complexity, not the highest possible.*

*— Yoann*

## Related reading

- [Lambda vs Kappa vs Unified Streaming](/concepts/lambda-vs-kappa-vs-unified-streaming)
- [Change Data Capture (CDC)](/concepts/cdc-change-data-capture)
- [Idempotency and Exactly-Once](/concepts/idempotency-exactly-once)
- [Cost Optimization](/concepts/cost-optimization)

## External references

- Apache Flink documentation
- Spark Structured Streaming guide
- Snowpipe Streaming overview
