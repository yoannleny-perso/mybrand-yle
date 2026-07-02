---
title: "Enterprise Medallion Stack"
slug: "enterprise-medallion-stack"
client: "A bronze–silver–gold lakehouse deployed across three regions, with a governed semantic layer feeding analytics, ML, and agent workflows from a single source of truth."
sector: "Global enterprise"
yearStart: 2024
yearEnd: 2025
metrics:
  - { value: "$13M+", label: "revenue impact" }
  - { value: "9 mo", label: "to payback" }
  - { value: "0", label: "KPI drift incidents" }
relatedConcepts:
  - "medallion-architecture"
  - "semantic-layer"
  - "open-table-formats"
  - "multi-region-data-architectures"
---

## The problem

Three regions, three warehouses, three versions of "revenue." Every quarterly review began with twenty minutes of reconciling numbers before anyone could discuss what the numbers meant. Machine learning teams were rebuilding the same features from raw extracts because nothing downstream of the warehouses could be trusted. And the first agentic pilots were about to make it worse — pointing LLMs at three inconsistent sources produces confidently wrong answers at scale.

The organization did not need a new tool. It needed one source of truth with a contract on top.

## The architecture

A medallion lakehouse on open table formats, deployed once and operated in three regions.

**Bronze** lands raw data immutably, per region, with capture metadata — the layer you never argue with because it makes no claims. **Silver** conforms entities across regions: one customer model, one order model, schema evolution handled by contract rather than by breakage. **Gold** serves consumption: analytics marts, ML feature sets, and — deliberately from day one — agent-readable views.

The piece that made the difference was not the medallion itself but the **governed semantic layer** above gold. Every executive metric is defined once, versioned, owned, and documented with its lineage. BI tools, notebooks, and agent workflows all resolve "quarterly revenue" through the same definition. That is why the KPI drift count is zero: drift is not caught, it is structurally impossible.

Regional replication is asymmetric on purpose: conformed silver replicates globally; bronze stays local for residency and cost. Federation is used where regulation requires it, not as a default.

## The operating model

The build ran as one central pod plus a named data steward per region — not a committee. Every silver table has an owner, an SLA, and a deprecation policy. The semantic layer has a change process modeled on code review: metric changes are proposed, diffed against history, and approved by the owning domain. Nothing about this is glamorous, and all of it is why the platform survived contact with its second year.

## The outcome

$13M+ in attributed revenue impact, primarily from pricing and mix decisions that had been impossible when regional numbers disagreed, with payback in nine months. ML feature delivery went from weeks to days because features now start from silver, not from raw extracts. The agent workflows that followed — including reporting assistants used by executives — read the same gold the dashboards read, which is the only reason they were approved for production.

## What I would do differently

I would start the semantic layer in month one, not month seven. We sequenced it after the medallion build because it felt like a finishing touch; it is actually the part executives experience. Six months of "the platform is coming along" would have been six months of "look, the numbers finally match."

## Related concepts

- [Medallion Architecture](/concepts/medallion-architecture)
- [The Semantic Layer](/concepts/semantic-layer)
- [Open Table Formats](/concepts/open-table-formats)
- [Multi-Region Data Architectures](/concepts/multi-region-data-architectures)
