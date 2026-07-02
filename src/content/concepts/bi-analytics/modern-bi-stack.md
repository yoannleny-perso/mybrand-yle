---
title: "The Modern BI Stack"
slug: "modern-bi-stack"
cluster: "bi-analytics"
depth: "core"
definition: "The architectural pattern of warehouse + semantic layer + BI tool, replacing the monolithic BI platforms of the previous decade."
readingTime: "8 min"
lastReviewed: "2026-Q2"
---

## What it is

The modern BI stack separates concerns. The warehouse stores and processes data. The transformation layer (dbt, SQLMesh) models it. The semantic layer (Cube, dbt Semantic Layer, Snowflake Semantic Views) defines metrics. The BI tool renders them.

This contrasts with the monolithic BI platforms of the 2000s and 2010s — Cognos, MicroStrategy, classic Tableau, classic Power BI — that bundled storage, modeling, semantics, and visualization into one stack with one vendor.

The unbundling happened because the cloud warehouse became too good. Once Snowflake and BigQuery could handle the modeling and the compute, BI tools that brought their own engine started to look like tax.

## Why it matters

The unbundled stack is faster to ship, easier to govern, and cheaper to change. A team that has dbt models, a semantic layer, and Looker can swap Looker for Lightdash or Hex without rewriting the metric definitions. A team on classic Tableau with logic embedded in TWB files cannot.

The other shift: AI consumption. Agentic systems need a place to ask "what was revenue last quarter" and get the same answer as the dashboard. The semantic layer is that place. Stacks without one will be rebuilt.

## How it works

Four layers, each with a specific job.

**Warehouse / lakehouse:** Snowflake, BigQuery, Databricks. Stores data, runs queries.

**Transformation:** dbt or SQLMesh. Compiles SQL into modeled tables in the warehouse.

**Semantic layer:** Cube, dbt Semantic Layer, Snowflake Semantic Views. Defines metrics, dimensions, and aggregations once. Exposes them via SQL, REST, GraphQL, or MDX.

**BI / consumption:** Looker, Power BI, Tableau, Hex, Mode, Lightdash, Metabase, ThoughtSpot, plus AI consumers — agents and chat interfaces.

The semantic layer is the keystone. Without it, every BI tool implements its own version of "active customer," metrics drift, and AI consumers get different numbers from different places. With it, definitions live in one place and consumers — human or machine — get consistent answers.

## Vendor comparison

| BI tool | Best for | Strength | Weakness |
|---|---|---|---|
| **Looker** | Enterprise, governance, embedded | LookML, mature governance, strong embedded story | Per-seat cost, slower to iterate |
| **Power BI** | Microsoft-centric organizations | Tight Microsoft 365 integration, low cost in Office bundles | Best when fully invested in Fabric |
| **Tableau** | Visualization-heavy, exploratory analysis | Best-in-class visualizations | Less modern in semantic / governance story |
| **Hex** | Data-team-led, notebook + dashboard hybrid | Python + SQL + viz in one place, strong AI features | Less suited to broad business consumption |
| **Mode** | Analyst-driven SQL + dashboards | SQL-first workflow, fast to ship | Acquired by ThoughtSpot, future direction watching |
| **Lightdash** | dbt-native open-source BI | Open source, dbt-native semantics, low cost | Smaller ecosystem |
| **Metabase** | Self-serve, broad consumption, low cost | Open source, easy for non-technical users | Limited at enterprise scale |
| **ThoughtSpot** | Search-driven analytics | Search interface, embedded use cases | Niche; works best with clean semantic layer |

**Looker** remains the right answer for governance-heavy enterprises, particularly when LookML is already in place and the embedded analytics use case matters.

**Power BI** is the right answer when the organization is already deep in Microsoft 365 — the bundled cost and integration usually wins. Fabric makes this case stronger if you want all-in-one.

**Hex and Mode** are the right answer when the data team is the primary consumer and Python + SQL + viz in one workflow is more productive than a traditional BI tool.

**Lightdash and Metabase** are the right answers when budget matters or when you want open source. Lightdash specifically is a strong fit for dbt-native shops that do not want Looker pricing.

## Yoann's take

*My default for new builds in 2026: dbt + a semantic layer (Cube unless dbt-native is sufficient) + Lightdash or Power BI for consumption + Hex for the data team's own analysis. Looker is still the right answer for organizations with serious embedded analytics requirements or where LookML is already deeply embedded; I do not move people off Looker without a clear reason. The bigger structural call is the semantic layer — once you have one, the choice of BI tool becomes lower-stakes and reversible. Without one, you are committing to whichever BI tool you pick, because the metric logic lives there.*

*— Yoann*

## Related reading

- [Semantic Layer](/concepts/semantic-layer)
- [Dashboard Design Principles](/concepts/dashboard-design-principles)
- [Self-Service Analytics](/concepts/self-service-analytics)
- [Embedded vs Standalone Analytics](/concepts/embedded-vs-standalone-analytics)

## External references

- Looker LookML reference
- Power BI semantic models documentation
- Cube product overview
