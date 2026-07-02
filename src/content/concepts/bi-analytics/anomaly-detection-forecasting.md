---
title: "Anomaly Detection and Forecasting"
slug: "anomaly-detection-forecasting"
cluster: "bi-analytics"
depth: "intermediate"
definition: "Statistical and ML techniques for spotting metric movements that warrant attention, and projecting where metrics are likely to land — applied carefully so that signals do not become noise."
readingTime: "8 min"
lastReviewed: "2026-Q2"
---

## What it is

Anomaly detection identifies metric movements outside expected behavior — a sudden drop in conversion, a spike in support tickets, a flat line where there should be growth. Forecasting projects where a metric is likely to land based on historical patterns, seasonality, and known drivers.

Both are mature statistical disciplines (ARIMA, Prophet, exponential smoothing, isolation forests, deep learning approaches) and both are increasingly bundled into BI and observability platforms.

The challenge is rarely the model. It is calibration: catching real changes while not drowning the team in false positives, and producing forecasts confident enough to plan against without being misleadingly precise.

## Why it matters

Three real problems these techniques address.

**Catching the unexpected.** A 2% drop in conversion that lasts three days might cost a six-figure sum if undetected. Anomaly detection on the right metrics catches it Monday morning, not at end-of-month review.

**Sharpening forecasts.** Quarterly forecasts produced by spreadsheet are usually anchored on last quarter plus optimism. ML-augmented forecasts ground the projection in seasonality and trend, with explicit confidence intervals.

**Operationalizing watchfulness.** A metric you watch is a metric you protect. Automated detection makes "watching" scale beyond what a team can do manually, particularly across dozens or hundreds of segment-level metrics.

The trap: false positives. An anomaly detection system that fires three times a week and is right twice a month produces alert fatigue. Within a quarter, alerts are muted and the system might as well not exist.

## How it works

Anomaly detection methods, in rough order of complexity:

**Threshold-based.** Static rules — "alert if daily revenue drops below $X." Cheap, brittle, useful for hard floors.

**Statistical baselines.** Z-score against rolling mean, percentile bands, seasonal-adjusted thresholds. Robust for stable metrics with predictable seasonality.

**Time-series decomposition.** Decompose into trend + seasonality + residual; alert on residual outside expected variance. Prophet, STL.

**ML-based.** Isolation forests, autoencoders, deep learning. Powerful for high-cardinality monitoring; harder to explain.

Forecasting methods follow a similar progression:

**Naive baselines.** Last value, last value × growth rate. Surprisingly hard to beat short-term.

**Statistical models.** ARIMA, exponential smoothing, Prophet. Good for medium-horizon forecasts with clear seasonality.

**ML models.** XGBoost on lagged features, deep learning. Useful when many drivers (campaigns, weather, holidays) influence the metric.

**Causal models.** Bayesian structural time series, synthetic controls. The right choice when you need to attribute change to specific interventions.

## Vendor comparison

| Tool | Approach | Best for |
|---|---|---|
| **Anomalo** | ML-driven anomaly detection on warehouse data | Production data quality monitoring |
| **Monte Carlo** | Mixed (rules + ML) anomaly + lineage | Enterprise observability |
| **Bigeye** | Statistical anomaly detection | Mid-size data ops teams |
| **Prophet (Meta, OSS)** | Time-series forecasting library | DIY forecasts in Python |
| **Pyro / NumPyro** | Bayesian forecasting | Custom causal work |
| **Native BI tool features** | Power BI smart narratives, Tableau anomaly detection, Looker forecasting | Built-in, lower setup cost |

For data quality anomaly detection (row counts, distributions, freshness): **Anomalo** or **Monte Carlo** if budget allows; **Elementary** + **dbt tests** as the open baseline.

For business metric forecasting: **Prophet** for most cases — fast, explainable, works well for monthly and weekly metrics with clear seasonality. **XGBoost on lagged features** when there are many drivers. Custom Bayesian work for high-stakes causal questions.

## Yoann's take

*My approach: cheap and explainable first, expensive and ML-driven only when justified. For metric anomaly detection I start with statistical baselines on a small set of carefully chosen metrics — usually executive metrics plus a handful of operational ones. False positives are the real cost, so I tune toward fewer alerts and accept missing some smaller events. For forecasting I default to Prophet for medium-horizon, explainable work and only escalate to ML or Bayesian methods when the question genuinely needs them. The pattern that fails: throwing ML anomaly detection at every metric in the warehouse and watching the team mute the alerts within a month. Watchfulness is a finite organizational resource. Spend it on the few signals that matter.*

*— Yoann*

## Related reading

- [Data Quality and Observability](/concepts/data-quality-observability)
- [Decision Intelligence](/concepts/decision-intelligence)
- [Executive Metric Design](/concepts/executive-metric-design)

## External references

- Prophet documentation (Meta)
- Anomalo / Monte Carlo product overviews
- "Forecasting: Principles and Practice" — Hyndman & Athanasopoulos
