---
title: "Multi-Agent Skill Tracker"
slug: "multi-agent-skill-tracker"
client: "A hierarchical agentic system that maintains a live skills graph for 40+ consultants, recommends staffing, and surfaces hiring gaps to leadership weekly."
sector: "Enterprise consulting"
yearStart: 2025
yearEnd: 2026
metrics:
  - { value: "+15%", label: "utilization" }
  - { value: "-22%", label: "bench time" }
  - { value: "3", label: "regions covered" }
relatedConcepts:
  - "multi-agent-orchestration"
  - "agent-evaluation-frameworks"
  - "deterministic-guardrails"
---

## The problem

A consulting organization with more than forty senior experts across three regions could not answer a simple question: who knows what, right now, and who should staff the next engagement?

The information existed — in CVs, project debriefs, staffing spreadsheets, and the heads of three regional managers. But it was stale the moment it was written down. Staffing decisions were made on memory and proximity: the person the manager remembered got the project, and the person two time zones away stayed on the bench. Bench time was the visible cost. The invisible cost was worse — proposals went out understating capabilities the firm actually had, and hiring plans were built on anecdote.

## The architecture

The system is a hierarchy of agents with deterministic guardrails, not a single chatbot.

At the bottom, **extraction agents** read the artifacts the organization already produces — project summaries, debrief notes, proposal appendices — and propose skill assertions ("X delivered a dbt migration for a retail client, advanced level"). Every assertion carries its source and a confidence score. Nothing enters the graph without provenance.

In the middle, a **reconciliation layer** merges assertions into a governed skills graph. This layer is deliberately boring: deterministic rules, versioned taxonomies, human-in-the-loop checkpoints for low-confidence merges. Agents propose; the rules dispose.

At the top, **staffing and gap agents** query the graph. One recommends candidate teams for incoming work, with reasoning the manager can inspect and override. The other compares the graph against the pipeline of upcoming work and writes a weekly one-page brief for leadership: skills we are short on, skills we are long on, and what that implies for hiring.

Every agent action is logged, evaluable, and reversible. When an agent is wrong, we can say precisely why — which assertion, from which source, merged under which rule.

## The operating model

The system would have died as a side project. It lived because it got an owner, an SLA, and a ritual: the weekly gap brief is on the leadership agenda, and regional managers review their pods' graph accuracy monthly. Accuracy review takes a manager roughly twenty minutes a month — the price of never again filling in a skills spreadsheet.

## The outcome

Utilization rose 15% within three quarters, and average bench time fell 22% — mostly by making cross-regional staffing normal instead of exceptional. Two hiring decisions were reversed because the gap brief showed the capability already existed in another region. Leadership stopped debating what the team could do and started debating what it should do.

## What I would do differently

I over-invested in extraction quality early and under-invested in the override experience. Managers trusted the system only after they saw their corrections stick and propagate — that feedback loop should have shipped in month one, not month five. The lesson: in agentic systems, the human correction path is not an edge case. It is the product.

## Related concepts

- [Multi-Agent Orchestration](/concepts/multi-agent-orchestration)
- [Agent Evaluation Frameworks](/concepts/agent-evaluation-frameworks)
- [Deterministic Guardrails](/concepts/deterministic-guardrails)
