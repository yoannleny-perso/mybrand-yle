---
title: "Global Data Ops Scaling Model"
slug: "global-data-ops-scaling-model"
client: "An operating model for a 40-person data team across three regions: pod design, role split, ritual cadence, and a custom internal observability layer for delivery health."
sector: "Global enterprise"
yearStart: 2023
yearEnd: 2025
metrics:
  - { value: "40+", label: "experts orchestrated" }
  - { value: "3", label: "regions" }
  - { value: "4", label: "quarters to steady-state" }
relatedConcepts:
  - "team-topologies"
  - "data-as-a-product"
  - "dataops-maturity"
---

## The problem

The team had grown from twelve to forty people in eighteen months, across Europe, the UK, and a third regional hub. Nothing about how it worked had grown with it. Every request still flowed through the same two senior architects. Delivery slowed as headcount rose — the classic signal that the constraint is the operating model, not the people. Attrition started where it always starts: the strongest engineers, who could feel the friction most precisely.

Leadership's question was whether to hire more. The honest answer was that hiring into a broken topology buys throughput for one quarter and pays it back with interest.

## The architecture

The redesign had three parts: topology, roles, and instrumentation.

**Topology.** The team reorganized into domain pods — five to seven people, each owning a set of data products end to end — plus one platform pod that builds the paved road the domain pods run on. The platform pod has no roadmap of its own; its backlog is whatever slows the other pods down most.

**Roles.** The re-org made the implicit explicit: product-facing analytics engineers, platform engineers, and a small architecture group that reviews designs rather than executing them. The two bottleneck architects moved from "everything flows through us" to "we review, we don't build" — the single hardest change of the engagement, and the most valuable.

**Instrumentation.** You cannot run an operating model you cannot see. We built an internal delivery-health layer: cycle time per pod, review latency, incident load, SLA adherence per data product. Not for surveillance — for the monthly operating review, where pods look at their own trend lines and decide what to fix.

## The operating model

Cadence was designed sparingly: a weekly pod-level planning ritual, a monthly operating review on the delivery-health data, and a quarterly topology review that asks one question — is the pod structure still right for the work? Everything else was deliberately removed. Meetings are a tax on the same people the redesign was meant to unblock.

## The outcome

Steady-state in four quarters: delivery throughput per head recovered to what it had been at half the size, and regional utilization evened out as ownership stopped depending on time zone proximity. The two architects stopped being the bottleneck; one of them told me later the review model gave him his job back. The topology survived the departure of two pod leads — the test that matters, because an operating model that lives in specific people's heads is not a model.

## What I would do differently

I would set the expectation about pod-lead responsibilities earlier and in writing. Two of the initial leads accepted the role thinking it was a promotion in title; it is actually a change in job. Both conversations went fine — but in month four instead of month one, which cost the affected pods a quarter of drift.

## Related concepts

- [Team Topologies for Data Orgs](/concepts/team-topologies)
- [Data as a Product](/concepts/data-as-a-product)
- [DataOps Maturity](/concepts/dataops-maturity)
