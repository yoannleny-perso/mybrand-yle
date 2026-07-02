---
title: "The semantic layer is the new data API"
slug: "the-semantic-layer-is-the-new-data-api"
dek: "Why your KPIs need a contract before your agents read them."
cluster: "BI & ANALYTICS"
tags: ["bi-analytics"]
publishedAt: "January 2026"
readingTime: 8
---

For twenty years, the semantic layer was a BI convenience — a friendlier face on the warehouse so analysts didn't have to remember join paths. Nice to have. Rarely funded properly. The first thing cut when the platform migration ran long.

Then organizations started pointing LLMs at their data, and the semantic layer quietly became the most important component in the stack.

## LLMs are interpretation machines. That's the problem.

Give a capable model access to your schemas and ask "what's our churn rate?" and it will do exactly what it is built to do: pick a plausible interpretation. There are four tables with "churn" in the name, three grain choices, and a filter question about trial customers. A human analyst would ask a clarifying question. The model picks — fluently, confidently, and differently on Tuesday than on Thursday.

The model is not hallucinating. Your business simply never wrote down what churn *means* precisely enough for a machine to be told. Every organization has this ambiguity; humans paper over it in hallway conversations. LLMs surface it at scale, in front of executives.

## From convenience to contract

The fix is to change the semantic layer's job description: from convenience to **contract**. A metric definition that is owned, versioned, testable, and machine-readable is an API in every sense that matters — it has consumers, guarantees, and a change process. Your dashboards are one consumer. Your agents are another. Neither should be allowed to invent what "quarterly revenue" means.

Practically, this means agents never query tables. They call tools that resolve metrics through the layer. The model chooses *which* metric answers the question; the layer owns *what the metric means*. In the [AI-ready semantic layer](/work/ai-ready-semantic-layer) I built for a mid-market company, this single boundary took KPI drift incidents from "recurring board embarrassment" to zero — not because the model got smarter, but because the failure mode was removed from the architecture.

## What "API discipline" means for metrics

Treat metric changes the way you treat breaking API changes, because that is what they are. Semantic versioning: a filter change to "active customer" is a major version. A diff and an impact list on every change: which dashboards, which reports, which agents resolve this metric. Deprecation windows instead of silent edits. And regression tests — a suite of business questions with known-correct answers, run whenever the layer changes.

None of this is technically hard. All of it is organizationally hard, because it forces the question companies have deferred for decades: *who owns the definition?* Finance and sales both claim revenue; the layer forces the tie-break. That fight is the actual project. The YAML is a formality afterward.

## The strategic point

Executives keep asking what they should do to be "ready for AI." Most of the honest answers are unglamorous, and this is the most unglamorous of all: write down what your numbers mean, give each definition an owner, and put a contract between your data and everything that reads it.

Companies that do this get compounding returns — every new agent, copilot, and dashboard inherits correct definitions on day one. Companies that skip it will keep experiencing the same incident in new costumes: an AI system that is fluent, fast, plausible, and wrong about the number that matters.

The semantic layer used to be where you cut budget. It is now where your credibility lives.

*Related: [The Semantic Layer](/concepts/semantic-layer), [Executive Metric Design](/concepts/executive-metric-design), [Data Contracts](/concepts/data-contracts)*
