---
title: "Executive Metric Design"
slug: "executive-metric-design"
cluster: "bi-analytics"
depth: "intermediate"
definition: "Selecting, defining, and operationalizing the small set of metrics that drive executive decisions — distinct from the operational metrics teams use day-to-day."
readingTime: "8 min"
lastReviewed: "2026-Q2"
---

# Executive Metric Design

## What it is

Executive metrics are the small set of numbers that the CEO, CFO, board, and operating committee use to run the business. They are different from the operational metrics product managers and team leads use day-to-day.

Executive metrics share three properties: they map directly to a strategic objective, they are stable enough to track over time, and they are unambiguous in definition. A KPI that means three different things to three different VPs is not an executive metric — it is a meeting topic.

Executive metric design is the discipline of selecting, defining, and operationalizing this set. It is one of the highest-leverage things a senior data leader does.

## Why it matters

Most board-level data debates are not about the number — they are about the definition. "Revenue" can mean booked, billed, recognized, or net of refunds. "Active customer" can mean signed-in, transacted, or paying. When the definition is ambiguous, every meeting starts with reconciliation instead of decision.

A well-designed executive metric set eliminates this. Every executive sees the same number. Every dashboard shows the same definition. Every quarterly review starts from the same baseline. The conversation moves from "what does this mean" to "what should we do."

This is also where data leadership earns credibility with the C-suite. A data leader who shows up to a board meeting with disputed numbers gets fewer board meetings. One who shows up with clean, defended, comparable metrics is invited back.

## How it works

The structure I use, in roughly this order.

**Map metrics to objectives.** Every executive metric should support a specific strategic objective. If a metric does not, it is operational, not executive. Cut it from the executive set.

**Define each metric in one paragraph.** Plain English. Explicit inclusions and exclusions. Refresh frequency. Source of truth. Owner. Versioned in the catalog.

**Build the calculation in the semantic layer.** Once. Used everywhere. Not in a spreadsheet, not in a PowerPoint formula, not in a BI tool's local logic. The semantic layer is the source of truth for the calculation.

**Limit the executive set.** Five to ten metrics for the company. Three to five per business unit. A 40-metric scorecard is not richer; it is unread.

**Pair every metric with a benchmark.** Plan, prior period, peer set. A number with no benchmark is decoration.

**Define the change-management process.** Metrics change. New ones are added; old ones are deprecated. Have a process — quarterly review, formal proposal, named approval. Otherwise the set drifts.

## Vendor comparison

The tools that support this are catalog and semantic-layer products.

| Tool | Role |
|---|---|
| **Cube / dbt Semantic Layer** | Calculation source of truth |
| **Atlan / Unity Catalog** | Metric catalog with definitions and owners |
| **Looker (LookML)** | Combined semantic + governance for organizations on Looker |
| **Power BI semantic models** | Equivalent for Microsoft-centric stacks |

For organizations without a semantic layer, the practical fallback is a curated dbt project layer (`marts/finance/`, `marts/exec/`) with one model per executive metric, owned by the analytics engineering team and exposed to BI tools as a single source of truth. This is less elegant but workable.

## Yoann's take

*The executive metric set is the most political artifact a data leader produces. Every metric has stakeholders who want it defined the way that flatters their team. The job is to define them in service of the business, not in service of comfort. My approach: start with a written proposal — every metric, one paragraph definition, owner, source of truth, refresh cadence. Get explicit signoff from CEO, CFO, and each business unit lead. Publish in the catalog. Never debate definitions in a board meeting again. The before-state I have walked into more than once: 60+ metrics across decks, four versions of "ARR," nobody owning the canonical set. The after-state takes a quarter to build and pays back for years.*

*— Yoann*

## Related reading

- [Dashboard Design Principles](/concepts/dashboard-design-principles)
- [Semantic Layer](/concepts/semantic-layer)
- [Decision Intelligence](/concepts/decision-intelligence)
- [Data as a Product](/concepts/data-as-a-product)

## External references

- Andy Grove — "High Output Management"
- John Doerr — "Measure What Matters"
