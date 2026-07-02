---
title: "Data Contracts"
slug: "data-contracts"
cluster: "data-engineering"
depth: "core"
definition: "An explicit, versioned agreement between data producers and consumers — schema, semantics, SLA, ownership — enforced in CI before bad data reaches production."
readingTime: "9 min"
lastReviewed: "2026-Q2"
---

## What it is

A data contract is a written, machine-readable agreement between the team producing data and the teams consuming it. It specifies the schema (columns, types, nullability), the semantics (what each field means and how it is computed), the SLA (freshness, completeness, latency), and the ownership (who is on call when it breaks).

The contract lives in version control. A change to the contract is a pull request, reviewed by both producer and consumer. The contract is enforced — usually in CI on the producer's repository, sometimes at write time in the warehouse.

This is not a metadata document. A data dictionary that nobody reads is the opposite of a contract. The contract is enforced; that is what makes it a contract.

## Why it matters

Three things break in fast-moving data organizations.

First, producers ship a schema change without telling consumers. A column is renamed from `user_id` to `customer_id`, three dashboards turn into red wall, the analytics team finds out Tuesday morning. Contracts catch this in the producer's CI before the change ever lands.

Second, semantics drift silently. A column called `revenue` starts including refunds halfway through Q3 and nobody notices until the board meeting. Contracts make semantics explicit and reviewable.

Third, ownership disappears. When something breaks, the producer says "that is the analytics team's problem" and the analytics team says "we just consume what you publish." Contracts assign ownership before the incident.

The honest version: contracts are organizational technology dressed up as a data engineering pattern. They work when leadership backs them. They do not work when teams treat them as suggestions.

## How it works

A contract is typically a YAML or JSON file in the producer's repository, sometimes generated from a schema registry (Avro, Protobuf, JSON Schema). It contains schema, semantics, SLA, and owner.

In CI, when the producer changes a table or event, the build runs a diff against the previous contract. Breaking changes — a removed column, a narrowed type, a new non-null constraint — fail the build unless the change has been explicitly approved. Non-breaking changes (a new optional column) pass.

Enforcement at write time is harder. Some teams use schema registries with CDC pipelines (Debezium + Schema Registry). Others enforce in the transformation layer (dbt's `contract` block, SQLMesh's column-level checks). The strongest version validates schema at the transactional source — the producer's database — before data even leaves.

## Vendor comparison

There is no single "data contracts vendor." The category is more about practice and tooling glue.

| Approach | Best for | Strength | Weakness |
|---|---|---|---|
| **dbt model contracts** | dbt-centric teams | Native, simple, contracts on warehouse models | Catches issues downstream of source — too late for some classes of break |
| **Schema registries (Confluent, Apicurio)** | Event-driven architectures (Kafka, Pulsar) | Enforces at the event boundary, hard to bypass | Operational overhead, requires cultural buy-in |
| **Gable.ai, Specmesh, DataContract.com** | Greenfield contract platforms | Purpose-built, schema-language agnostic | Young category, integration depth varies |
| **Custom CI checks** | Teams with strong platform engineering | Full control, fits existing toolchain | Requires investment to build well |
| **Soda / Great Expectations** | Quality assertion as adjacent practice | Mature, validates data, not just schema | Not contracts in the strict sense — closer to data quality |

**dbt model contracts** are the most pragmatic starting point for warehouse-centric teams. You get schema enforcement on your downstream consumer-facing tables with one config block per model. It does not solve producer-side contracts but it solves a real problem cheaply.

**Schema registries** are the right answer for event-driven systems. If you are running Kafka or similar at scale, Confluent Schema Registry (or its open alternatives) is essentially mandatory. The contract is the schema, enforced at the producer.

**Purpose-built contract platforms** are worth watching. They are still a young category but the better ones (Gable in particular) are doing real work on bridging the gap between application repositories and data platforms — running contract checks in the producer's CI, not the consumer's.

**Custom CI** is fine for teams that have the engineering capacity. Most do not.

**Soda and Great Expectations** are not contract tools — they are data quality tools. They check that data conforms to expectations after it lands. Useful, complementary, not a substitute.

## Yoann's take

*Data contracts work when three things are true: leadership has explicitly backed the practice, the contract lives in the producer's repository (not the consumer's), and breaking changes fail the producer's build. I have seen teams write thoughtful contract specs that get ignored because none of those three were true. My default sequence is: start with dbt contracts on the consumer-facing layer because the cost is near zero, add a schema registry if there is meaningful event traffic, then push contracts further upstream into producer repositories only after the practice is established. Pushing contracts onto application teams that do not want them is a fast way to make data engineering unpopular and changes nothing.*

*— Yoann*

## Related reading

- [Data as a Product](/concepts/data-as-a-product)
- [Data Quality and Observability](/concepts/data-quality-observability)
- [Schema Evolution and Backwards Compatibility](/concepts/schema-evolution-backwards-compat)
- [Data Mesh](/concepts/data-mesh)

## External references

- "Data Contracts" — Andrew Jones
- dbt model contracts documentation
- Confluent Schema Registry overview
