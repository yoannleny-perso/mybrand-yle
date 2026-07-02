---
title: "Data as a product, three years on"
slug: "data-as-a-product-three-years-on"
dek: "What worked, what didn't, what the literature still gets wrong."
cluster: "OPERATING MODEL"
tags: ["operating-model"]
publishedAt: "November 2025"
readingTime: 12
---

Three years ago I started running data teams on the "data as a product" model — owners, contracts, SLAs, deprecation policies, the whole catechism. I have now seen it through multiple annual cycles, a team that doubled, and one genuine reorganization. Time to write down what the experience actually taught, including the parts that contradict the literature.

## What worked better than promised

**Ownership changed behavior more than any tool.** The single highest-leverage move was putting a name — one name, not a team alias — next to every data product. Quality arguments that used to escalate through three managers became a Slack message to the owner. The mechanism is not accountability theater; it is that ambiguity, not malice, causes most data quality failure, and a name deletes the ambiguity.

**Deprecation policies paid for themselves instantly.** The unglamorous twin of ownership. Before: two hundred tables, nobody deletes anything, every migration drags the corpse pile along. After: products have lifecycles, sunset dates are announced like API deprecations, and — this was the surprise — *consumers barely objected*. Most zombie tables had zero actual readers. We were maintaining them out of fear, not demand.

**Contracts made incidents boring.** When a producing team breaks a schema, the contract turns a whodunit into a diff. Mean time to *blamelessness* — how fast the conversation moves from "whose fault" to "what changed" — dropped dramatically. In the [40-person scaling model](/work/global-data-ops-scaling-model) I ran, that cultural shift outlasted the tooling that produced it.

## What did not survive contact

**Full product management ceremony per data product.** The literature implies each data product deserves roadmaps, user interviews, and NPS. At forty products, that is a bureaucracy, not a practice. What survives is a two-tier model: the five to eight products that move the P&L get real product management; the rest get an owner, a contract, and quarterly review. Pretending all products are equal is how the important ones get average attention.

**Internal chargeback.** We tried pricing data products to their consuming domains. In theory it disciplines demand; in practice it generated accounting overhead and turf disputes while changing zero consumption decisions. Visibility of cost — a monthly note saying what each product costs to run — achieved the discipline without the theater.

**"Domains will self-serve everything."** Some will. Finance built excellent products. Two other domains never developed the muscle and were never going to; pretending otherwise just delayed their products by a year. A small central bench that builds *for* weak domains, on the same contracts as everyone else, is not a failure of the model. It is the model, adapted to the organization you actually have.

## What the literature still gets wrong

The framing error is treating data-as-a-product as an *architecture*, when it is a *management system*. Companies keep buying catalogs and mesh platforms expecting the operating model to emerge from the tooling. It goes the other way. Ownership, contracts, and lifecycle discipline can run on a shared drive if they must; no platform can supply them if the management system is absent.

And the newest reason to get this right was not in the original literature at all: **agents are now consumers.** An LLM reading your data inherits every ambiguity in it, at scale, in front of executives. Products with owners, contracts, and honest documentation are the difference between agents that answer and agents that improvise. Data as a product was good hygiene in 2022. In the agentic era it is a precondition.

Three years in, I would not run a data function any other way. I would just run it with fewer ceremonies and more names next to things.

*Related: [Data as a Product](/concepts/data-as-a-product), [Data Contracts](/concepts/data-contracts), [DataOps Maturity](/concepts/dataops-maturity)*
