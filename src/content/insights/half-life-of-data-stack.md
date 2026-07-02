---
title: "The half-life of a data stack is shorter than you think"
slug: "half-life-of-data-stack"
dek: "Architecture decisions made today have a four-year horizon, not ten."
cluster: "DATA ENGINEERING"
tags: ["data-engineering"]
publishedAt: "December 2025"
readingTime: 10
---

There is a spreadsheet somewhere in your finance department that amortizes your data platform over ten years. It is fiction. Not because the vendor will disappear, but because the *assumptions* the architecture encodes will stop being true long before the depreciation schedule runs out.

Having now built or rebuilt data platforms across three distinct eras — warehouse-centric, lake-centric, and whatever we are calling the current agentic turn — my working number is four years. That is roughly how long an architecture's core assumptions survive contact with the industry. Plan on ten and you will spend years six through nine paying interest on assumptions everyone can see are dead.

## Why four years

Look at the actual history. Hadoop-era assumptions (storage is expensive, move compute to data, batch is the norm) had roughly a 2010–2015 run before cloud warehouses inverted them. The modern-data-stack assumptions (warehouse at the center, ELT everything, BI is the consumer) ran roughly 2016–2021 before open table formats and ML workloads pulled the center of gravity back out of the warehouse. The current assumption set — lakehouse substrate, semantic governance, humans as primary consumers — is already being stressed by its successor: systems where *agents* are the highest-volume consumers of data, and where "can an LLM safely read this?" is an architectural requirement rather than a curiosity.

None of these transitions destroyed the previous stack overnight. Half-life is the right metaphor: the old assumptions decay, workload by workload, until maintaining them costs more than migrating.

## What this changes about decisions

The four-year horizon does not mean "don't invest." It means invest in the parts that survive transitions and rent the parts that don't.

Three things have survived every transition I have lived through. **Open formats** — data in Parquet/Iceberg-style storage crossed eras intact; data locked in proprietary engines paid an exit tax each time. **Semantic definitions** — what "revenue" means outlives every engine that computes it; definitions written as portable code moved, definitions embedded in a BI tool died with it. **Contracts and lineage** — the discipline of knowing who produces what for whom transfers completely, because it is organizational knowledge wearing technical clothes.

What does *not* survive: engine choices, orchestration frameworks, and whatever sits in the "reverse ETL / activation / observability" aisle this year. Choose them for present value, keep them replaceable, and feel no loyalty.

This is also the honest frame for the agentic wave. I cannot tell you which agent framework wins; nobody can, and the ones who claim to are selling one. I can tell you that agent-readable data — governed definitions, explicit permissions, clean lineage — will be valuable under every possible winner. Build the durable layer; hold the framework loosely.

## The uncomfortable budgeting implication

If the half-life is four years, then a data platform is not a capital project with a maintenance tail. It is a *continuous* engineering commitment of roughly 15–20% of platform capacity, permanently, for evolution — not for keeping the lights on, but for retiring dead assumptions before they compound.

Organizations that budget this way migrate in increments and barely notice the transitions. Organizations that don't budget it do the same work anyway — they just do it all at once, every five or six years, under a program with the word "transformation" in it, at triple the cost and with a leadership change in the middle.

The stack you build this year is temporary. The definitions, contracts, and formats underneath it do not have to be. Spend accordingly.

*Related: [Open Table Formats](/concepts/open-table-formats), [The Modern Data Stack](/concepts/modern-data-stack), [Schema Evolution and Backwards Compatibility](/concepts/schema-evolution-backwards-compat)*
