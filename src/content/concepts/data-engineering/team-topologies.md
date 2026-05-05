---
title: "Team Topologies for Data and AI"
slug: "team-topologies"
cluster: "data-engineering"
depth: "intermediate"
definition: "How to organize people around data and AI work — central platform team, embedded analytics engineers, domain ownership, agentic system squads — so the org structure matches the work."
readingTime: "9 min"
lastReviewed: "2026-Q2"
---

# Team Topologies for Data and AI

## What it is

Team topology is the shape of how people are organized around the work. The "Team Topologies" framework (Skelton & Pais) defines four team types — stream-aligned, platform, enabling, complicated-subsystem — and the interaction patterns between them.

Applied to data and AI, the question is: who owns the platform, who owns the products, who owns the agentic systems, and how do they collaborate? The wrong topology produces bottlenecks, duplicated work, and a data team that nobody likes working with. The right one compounds.

## Why it matters

Data leaders are hired or fired on results. Results are produced by teams. The team structure determines what kind of results are possible.

A fully centralized team of ten serving a 500-person company will be a bottleneck regardless of talent. A fully decentralized model with no platform team will produce inconsistent quality and duplicated infrastructure. A hub-and-spoke with embedded analytics engineers and a small platform team is the model that scales for most organizations between 200 and 5,000 people.

Agentic AI changes the calculus again. Agentic systems span data, ML, and software engineering. A pure data org cannot ship them. A pure ML org does not have the data. The teams that ship agentic systems in production typically have a small interdisciplinary squad with explicit ownership.

## How it works

Four common topologies, each fitting a different stage and scale.

**Centralized data team (stage 0–2):**
A single team — analysts, engineers, leader — serves the whole company. Works at <100 people. Falls over by 200 because the queue gets too long.

**Hub-and-spoke (stage 2–3):**
Central platform team owns infrastructure (warehouse, orchestrator, BI tool, governance). Embedded analytics engineers sit in domain teams (Sales, Finance, Product) and own their domain's data products. Central team handles standards, the embedded engineers handle delivery. The most common stable topology between 200 and 2,000 people.

**Mesh-style domain ownership (stage 3–4):**
Domains own their data products end-to-end, including pipelines and quality. Central platform team is reduced to infrastructure, governance, and standards. Works only when domain teams have real engineering capacity and leadership backing. Demanding to set up; powerful when it works.

**Agentic squad (overlay model):**
Small squad with a tech lead, an ML engineer, an analytics engineer, a product manager, and a domain SME. Operates somewhat outside the regular topology, owning a specific agentic system end-to-end. The right model for production agentic AI: skills span boundaries.

The platform team is non-negotiable past 50 people. It owns: the warehouse, the orchestrator, dbt project standards, the catalog, observability, governance policies, cost tracking. Without it, every team rebuilds the same thing.

## Vendor comparison

There is no vendor here — the choices are organizational. The supporting tooling that makes each topology workable:

| Topology | Enabling tools |
|---|---|
| Centralized | Any modern stack |
| Hub-and-spoke | Catalog (Atlan, Unity), shared dbt project, RBAC, semantic layer |
| Mesh | Strong catalog, contracts, federated computational governance, Unity Catalog |
| Agentic squad | Vector store, agent framework (LangGraph, AutoGen), evaluation harness, dedicated cost tracking |

## Yoann's take

*My default for organizations between 200 and 2,000 people is hub-and-spoke. Central platform team of three to six people owning infrastructure and standards. Embedded analytics engineers in domain teams owning data products. This works because it gives both consistency (central team enforces standards) and velocity (embedded engineers ship without crossing team boundaries). I move toward mesh only when domain teams have demonstrated they can own engineering work — typically once they have a senior analytics engineer and explicit leadership backing. For agentic systems I use squad overlays: small interdisciplinary teams operating with their own runtime, own evaluation, own roadmap. The mistake to avoid: declaring a mesh on a slide and calling it done. Topology is operating model. It only exists if you live it.*

*— Yoann*

## Related reading

- [Data Mesh](/concepts/data-mesh)
- [Data as a Product](/concepts/data-as-a-product)
- [DataOps Maturity](/concepts/dataops-maturity)
- [Multi-Agent Orchestration](/concepts/multi-agent-orchestration)

## External references

- "Team Topologies" — Skelton & Pais
- Spotify model retrospectives
- DPG Media data org case studies
