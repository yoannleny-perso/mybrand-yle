---
title: "AI-Ready Semantic Layer"
slug: "ai-ready-semantic-layer"
client: "A metric definition layer designed specifically for LLM and agent consumption, eliminating hallucinated KPIs and standardizing how AI tools query the business."
sector: "Mid-market"
yearStart: 2024
yearEnd: 2024
metrics:
  - { value: "0", label: "KPI drift incidents in production" }
  - { value: "47", label: "conformed metrics" }
  - { value: "4", label: "LLM systems consuming the layer" }
relatedConcepts:
  - "semantic-layer"
  - "executive-metric-design"
  - "data-contracts"
  - "tool-use-function-calling"
---

## The problem

The company had shipped an internal AI assistant that could answer questions about the business. It was popular for exactly three weeks — until the CFO noticed it reported a churn rate that did not match the board deck. The assistant was not broken. It was doing what every LLM does over raw schemas: choosing one of several plausible interpretations of an ambiguous question. "Churn" existed in four tables with three definitions, and the assistant had picked one.

The instinct was to fix the prompt. The actual problem was that the business had never decided what "churn" meant precisely enough for a machine to be told.

## The architecture

The engagement produced a semantic layer designed for machine consumption first, human consumption second.

Forty-seven metrics were conformed: each has a name, an owner, a versioned definition in code, explicit grain and filters, and — the part built specifically for AI — a **machine-readable contract** describing when the metric applies, its allowed dimensions, and worked examples of correct and incorrect usage. LLM systems do not query tables; they call tools that resolve metrics through the layer. The model chooses *which* metric to use. It is never allowed to decide *what the metric means*.

The four consuming systems — the reporting assistant, two internal copilots, and a scheduled narrative generator — were migrated from schema access to layer access. A regression suite of a few hundred metric questions runs on every layer change, comparing answers against the governed definitions.

## The operating model

Metric ownership moved to the domains: finance owns the finance metrics, not the data team. Changes flow through a review process with a diff against the previous definition and an impact list of every consumer — human dashboard or AI tool — that resolves the metric. The layer is treated as an API with semantic versioning, because that is what it is.

## The outcome

Zero KPI drift incidents in production since launch — not because the models improved, but because the failure mode was removed. Adoption of the assistant recovered within a quarter of the relaunch; trust, once lost to one wrong churn number, took longer. The unplanned benefit: the layer became the onboarding document for new analysts, because it is the only place the business's definitions are written down and true.

## What I would do differently

I would run the metric-definition workshops before writing any code, and I would budget twice as long for them. Getting finance, sales, and product to agree on forty-seven definitions was the actual project; the layer is just where the agreement is stored. Technically, I would also version the natural-language descriptions with the same rigor as the SQL — an ambiguous description misleads an LLM as effectively as a wrong formula.

## Related concepts

- [The Semantic Layer](/concepts/semantic-layer)
- [Executive Metric Design](/concepts/executive-metric-design)
- [Data Contracts](/concepts/data-contracts)
- [Tool Use and Function Calling](/concepts/tool-use-function-calling)
