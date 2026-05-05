---
title: "Embedded vs Standalone Analytics"
slug: "embedded-vs-standalone-analytics"
cluster: "bi-analytics"
depth: "intermediate"
definition: "The choice between analytics inside the application your customer or employee already uses, versus analytics in a separate BI tool — with very different design, governance, and cost implications."
readingTime: "7 min"
lastReviewed: "2026-Q2"
---

# Embedded vs Standalone Analytics

## What it is

Standalone analytics: a dedicated BI tool — Looker, Power BI, Tableau — where users go to view dashboards and explore data. The analytics live in their own product, with their own login.

Embedded analytics: analytics inside the application a user already works in. A SaaS product showing dashboards to its customers inside the product UI. An internal tool showing operational metrics to a sales rep inside the CRM. A finance app showing profitability inside the workflow that produced it.

The two are not mutually exclusive — most organizations have both. The decision is per use case.

## Why it matters

Standalone tools optimize for power users. Analysts, finance leads, executives — people who are willing to learn a tool, who explore data as part of their job, who tolerate a context switch.

Embedded analytics optimizes for adoption. Most operational users will not switch to a BI tool to see one chart. They will see a chart that appears inside the workflow they are already in. The difference between 20% and 80% adoption is often the difference between "we built a Looker dashboard" and "we embedded the chart in the order management screen."

For SaaS companies, embedded analytics is also a product feature. The ability to show customer-facing analytics inside the product is competitive — and the engineering cost to build it from scratch is significant.

## How it works

Embedded analytics has three architectural choices.

**Iframe embed.** The simplest. The BI tool hosts the dashboard, the application renders an iframe pointing to it with a signed URL or token. Looker, Power BI Embedded, Tableau Embedded, Mode all support this. Trade-off: limited customization of look and feel.

**SDK / component embed.** The BI tool provides a JavaScript SDK, the application renders charts as native components with full styling control. Sigma, Hex, Cube + custom front-end all support this. Trade-off: more engineering work.

**Roll-your-own on the semantic layer.** The application queries the semantic layer (Cube, dbt Semantic Layer) directly via API and renders charts using its own visualization library (Recharts, ECharts, Plotly). Maximum control, maximum effort.

The choice depends on how customer-facing the experience is and how much customization matters. Internal-facing embedded analytics: iframe is usually fine. Customer-facing product analytics: SDK or roll-your-own.

## Vendor comparison

| Tool | Embed model | Best for |
|---|---|---|
| **Looker (Embedded)** | Iframe + SDK | Enterprise, multi-tenant SaaS with governance needs |
| **Power BI Embedded** | Iframe + SDK | Microsoft-centric, Azure-deployed apps |
| **Sigma** | Component-based | Embedded analytics with strong spreadsheet ergonomics |
| **Cube + custom UI** | API-driven | Maximum customization, customer-facing products |
| **Hex** | Component embed | Internal-facing embedded notebooks and dashboards |
| **Embeddable.com / GoodData** | Component-first | Pure-play embedded analytics |

**Looker Embedded** is the safe enterprise choice for customer-facing analytics in regulated or multi-tenant SaaS. Strong governance, mature row-level security, defensible at scale.

**Cube + custom UI** is the right answer for product-led companies that want analytics to feel like part of the product, not a bolted-on dashboard. Higher engineering investment, materially better product experience.

**Sigma** is the most interesting newer entrant for embedded. Spreadsheet ergonomics translate well to operational use cases.

## Yoann's take

*My default for customer-facing analytics in a SaaS product is Cube as the semantic layer + a custom front-end built with React and ECharts or Recharts. The product feels native, the metric definitions live in one place, and the analytics scale with the rest of the platform. For internal embedded use cases — a chart inside the CRM, a metric inside the order management screen — I often start with a Looker iframe because the time-to-value is days not weeks. The trap I avoid: rebuilding internal embedded analytics with a custom stack when an iframe would have shipped in a week. Embedded is about adoption; the right tool is the one that gets shipped and used.*

*— Yoann*

## Related reading

- [Modern BI Stack](/concepts/modern-bi-stack)
- [Semantic Layer](/concepts/semantic-layer)
- [Self-Service Analytics](/concepts/self-service-analytics)
- [Reverse ETL and Operational Analytics](/concepts/reverse-etl-operational-analytics)

## External references

- Looker Embedded documentation
- Cube embedded analytics guide
- Sigma embedded patterns
