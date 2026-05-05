---
title: "Data as a Product"
slug: "data-as-a-product"
cluster: "data-engineering"
depth: "intermediate"
definition: "Treating each data asset like a product — with an owner, a contract, a roadmap, an SLA, and consumers who can give it the equivalent of an NPS rating."
readingTime: "7 min"
lastReviewed: "2026-Q2"
---

# Data as a Product

## What it is

Data as a product is an operating model, not a technology. It treats each data asset — a table, a metric, a dataset, a model — as a product with an owner, a defined consumer, a contract, an SLA, a roadmap, and a feedback loop.

The shift is from "we ship pipelines" to "we ship products." A product has a name, a version, documentation, a way to report bugs, and someone whose job it is to make it better. A pipeline is a means to an end. A product has an end.

The phrase comes from data mesh, but the practice is independent of mesh. Centralized teams can — and should — adopt the product mindset without committing to full domain decentralization.

## Why it matters

Three failure modes the product model addresses.

The lineage of unowned tables: in any data platform older than three years, there are tables nobody owns, dashboards nobody maintains, and metrics whose definition is in someone's head who left two years ago. The product model assigns ownership before the asset is born.

The "ask the data team" anti-pattern: when every consumer asks the data team for help, the data team becomes a bottleneck and quality suffers. Products with documentation, examples, and quality guarantees let consumers serve themselves.

Investment direction: without product thinking, the data team builds what the loudest stakeholder asked for last week. With product thinking, you have a roadmap, prioritization, and the ability to say "not now" with grounded reasoning.

## How it works

A data product has, at minimum:
- A name and an owner
- A contract (schema, semantics, SLA, freshness)
- Documentation, including examples
- A clear consumer or consumer segment
- Quality assertions enforced in CI
- A way for consumers to flag issues

The harder pieces are organizational. Who is the owner — a domain analyst, an analytics engineer, a product manager? How is the work prioritized — quarterly OKRs, intake from consumers, a strategic roadmap? Who pays — the producing team, the consuming team, central platform?

The teams that succeed at this typically have a small platform team that owns infrastructure and standards, and embedded analytics engineers in domain teams who own the products. Pure centralization tends to produce service-desk dynamics. Pure decentralization tends to produce duplicated effort and inconsistent quality.

## Vendor comparison

There is no "data product" vendor — the practice spans tools.

| Capability | Tools |
|---|---|
| Catalog and discovery | Atlan, Alation, Secoda, DataHub, Unity Catalog |
| Contract enforcement | dbt model contracts, Schema Registry, Gable |
| Quality | dbt tests + Elementary, Monte Carlo, Soda |
| Documentation | dbt docs, Atlan, Notion, custom |
| Consumer feedback | Slack channels, JIRA queues, Atlan annotations |

The catalog is the closest thing to a "product hub" today. **Atlan** and **Unity Catalog** are the two I see most often as the front door — Atlan when you want a polished cross-platform experience, Unity Catalog when you are committed to Databricks and want a single governance plane.

## Yoann's take

*Data as a product is real and worth doing. Data mesh is one way to organize it; not the only way and not always the right way. I have seen centralized data teams adopt the product model with great results — published catalogs, named owners, contracts, SLAs — without paying the coordination tax of full decentralization. My rule: start with three or four flagship products and run them well, with everything a real product has. Demonstrate the operating model on those before scaling it to the rest of the platform. Trying to convert 200 tables into 200 products on day one is how good ideas die.*

*— Yoann*

## Related reading

- [Data Mesh](/concepts/data-mesh)
- [Data Contracts](/concepts/data-contracts)
- [DataOps Maturity](/concepts/dataops-maturity)
- [Team Topologies](/concepts/team-topologies)

## External references

- Zhamak Dehghani — "Data Mesh"
- Atlan blog — data product playbooks
- Unity Catalog product overview
