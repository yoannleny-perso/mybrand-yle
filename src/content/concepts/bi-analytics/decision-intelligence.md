---
title: "Decision Intelligence"
slug: "decision-intelligence"
cluster: "bi-analytics"
depth: "intermediate"
definition: "Designing analytics around the decision being made — including the action, the decision-maker, and the feedback loop — rather than around the data being available."
readingTime: "8 min"
lastReviewed: "2026-Q2"
---

## What it is

Decision intelligence is the practice of designing analytics around the decision they support. It starts from a question — "should we extend this campaign?" — and works backward to the data, the visualization, the threshold, and the workflow that operationalizes the answer.

This contrasts with the more common pattern: data is available, dashboards are built, decisions are hopefully made. The decision-intelligence framing inverts this. Decision first. Data in service of the decision.

The term has multiple origins (Cassie Kozyrkov's writing at Google, Lorien Pratt's book, more recently a category of vendors). The core idea is consistent across them.

## Why it matters

The single biggest failure mode of analytics teams is producing dashboards that are read but not acted on. The number is shown. The dashboard is open. Nothing changes.

Decision intelligence forces a different conversation. Who makes this decision? On what cadence? What threshold triggers action? What action follows? Where is the result of that action measured?

When these questions are answered up front, the analytics work is sharper and the value chain is shorter. When they are skipped, the team produces analysis that lives in a slack channel and dies.

## How it works

The framework I use, in roughly this order.

**Identify the decision.** Specific. Not "understand churn" but "decide whether to invest in the customer success motion next quarter." A decision has a decision-maker, a timeline, and an action.

**Define the action set.** What are the possible outcomes of the decision? "Invest more / invest the same / invest less / pause" is an action set. "Understand the data" is not.

**Identify the threshold.** What signal would move the decision from one action to another? "If churn rises above 6%" or "if NRR falls below 105%." Without thresholds, decisions become vibes.

**Build the analysis to support the threshold.** Not a 12-chart dashboard. A clear answer to "are we above or below the threshold, and by how much, and is it changing?"

**Close the feedback loop.** After the decision is made and the action is taken, measure the outcome. This is the loop that turns analysis into intelligence.

The honest version: most "decision intelligence" deployments fail because the upstream conversation — what is the decision, who makes it, what is the action — never happened. The framework is more about discipline than tooling.

## Vendor comparison

There is no dominant DI vendor; the category is fragmented.

| Tool | Approach |
|---|---|
| **Quantive (Gtmhub)** | OKR + metric tracking + decision logs |
| **Pyrra / Hightouch / Census** | Operationalize metrics by triggering actions in target tools |
| **Hex / Mode** | Analyst-driven decision support, narrative analytics |
| **AI agents (custom)** | Increasingly used for decision support — recommend actions based on metric movements |
| **Native warehouse alerts** | Snowflake alerts, BigQuery scheduled queries with action triggers |

The most interesting development in 2026 is agentic decision support: an agent watches metrics, detects threshold crossings, contextualizes the change against historical patterns, and recommends an action. Built well, this collapses the analyst-to-decision-maker loop. Built poorly, it produces noise.

## Yoann's take

*My approach to decision intelligence is simpler than the literature implies. Before the dashboard is built, I write a one-page brief: the decision, the decision-maker, the action set, the threshold, the feedback loop. The brief is reviewed with the decision-maker. If they cannot tell me what action would follow from the analysis, I do not build the analysis — there is no decision being made, just curiosity. After every quarterly review, I ask: which decisions did we actually make differently because of analytics? The number is usually smaller than people claim. That gap is the work. Decision intelligence is less a category of tools and more a habit of being honest about what analytics is for.*

*— Yoann*

## Related reading

- [Executive Metric Design](/concepts/executive-metric-design)
- [Reverse ETL and Operational Analytics](/concepts/reverse-etl-operational-analytics)
- [Anomaly Detection and Forecasting](/concepts/anomaly-detection-forecasting)
- [Self-Service Analytics](/concepts/self-service-analytics)

## External references

- Cassie Kozyrkov — "Decision Intelligence" Medium series
- Lorien Pratt — "Link: How Decision Intelligence Connects Data, Actions, and Outcomes"
