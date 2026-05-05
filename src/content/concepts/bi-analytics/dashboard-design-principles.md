---
title: "Dashboard Design Principles"
slug: "dashboard-design-principles"
cluster: "bi-analytics"
depth: "core"
definition: "The visual and structural choices that make a dashboard usable: clear hierarchy, deliberate metric selection, restraint in chart types, and an explicit answer to the question 'what decision does this support?'"
readingTime: "7 min"
lastReviewed: "2026-Q2"
---

# Dashboard Design Principles

## What it is

Dashboard design is the discipline of communicating a data story in a way that supports decisions. It includes metric selection, layout hierarchy, chart-type choice, color use, and editorial restraint.

It is also where most data teams underinvest. Engineering effort goes into pipelines, modeling, and semantics. The dashboard gets thrown together at the end, with eight charts on a screen, three of them the same data in different formats, and no clear answer to "what should I do with this?"

The dashboard is the surface where the data team's work meets the rest of the company. It is worth the investment.

## Why it matters

A dashboard that nobody opens has zero value, regardless of pipeline quality. A dashboard that is opened but not understood is worse — it produces wrong decisions confidently.

Three signals that a dashboard is failing: it has more than 15 metrics on one screen, the most prominent chart is the prettiest one not the most important one, and nobody can articulate what action it supports. Those three together describe most enterprise dashboards.

Good dashboard design earns trust. Trust earns reuse. Reuse compounds the team's leverage.

## How it works

Principles that compound, in rough order of impact.

**One question per dashboard.** Every dashboard should answer one explicit question — "How is sales pacing this quarter?" — and only that question. Dashboards that try to answer five questions answer none of them well.

**Hierarchy through size and position.** The most important number goes top-left and is the largest. Supporting metrics are smaller. Diagnostic detail is below the fold. The layout itself should communicate priority before the user reads any text.

**Restraint in chart types.** Bar charts, line charts, and big numbers handle 90% of cases. Pie charts, gauges, radar charts, and 3D anything handle 0% of cases. Reach for the boring chart.

**Deliberate metric count.** A dashboard with 30 metrics is not richer; it is unreadable. Five core metrics with one or two diagnostic charts is almost always better than 15 metrics fighting for attention.

**Explicit benchmarks.** A number on its own is meaningless. "$2.4M" tells me nothing. "$2.4M, +12% YoY, on track to plan" tells me the story. Every number should have a comparison.

**Editorial captions.** Charts with text annotations that say what the chart shows ("Q3 churn was elevated due to the Acme migration") outperform charts without, every time.

**Clear titles.** "Revenue" is a noun. "Revenue is pacing 6% below plan" is a finding. Use findings as titles where the story is stable.

## Vendor comparison

The principles are tool-agnostic but the affordances differ.

| Tool | Strength for design | Watch out |
|---|---|---|
| **Tableau** | Best-in-class visualizations, fine-grained control | Easy to over-design; many builders use too many chart types |
| **Power BI** | Strong with Microsoft fonts, brand-consistent | Default themes are dated; invest in a theme file |
| **Looker** | Discipline through LookML; dashboards are templated | Less visual flexibility |
| **Hex** | Notebook + dashboard hybrid; great for storytelling | Less suited to permanent corporate dashboards |
| **Lightdash** | dbt-native, opinionated layouts | Small but growing capability set |
| **Metabase** | Friendly defaults, low ceiling | Limited customization |

The tool matters less than the discipline. I have seen ugly Power BI dashboards drive better decisions than beautifully built Tableau ones, because the Power BI ones answered a clear question and the Tableau ones tried to do everything.

## Yoann's take

*I treat every dashboard like an editorial product. One question. Five core metrics. Hierarchy through size. Comparisons on everything. Editorial captions. Restraint in chart types. The biggest single improvement I have made on existing dashboards is deletion — taking a 30-metric dashboard down to 8 and watching usage triple. The other lever is the title: findings as titles change the relationship between dashboard and reader. The reader sees the answer first and the chart confirms it, which is how senior leaders actually read. Dashboards built for analysts to admire fail in front of executives. Build for the executive read.*

*— Yoann*

## Related reading

- [Executive Metric Design](/concepts/executive-metric-design)
- [Self-Service Analytics](/concepts/self-service-analytics)
- [Semantic Layer](/concepts/semantic-layer)
- [Modern BI Stack](/concepts/modern-bi-stack)

## External references

- Edward Tufte — "The Visual Display of Quantitative Information"
- Cole Nussbaumer Knaflic — "Storytelling with Data"
- Stephen Few — "Information Dashboard Design"
