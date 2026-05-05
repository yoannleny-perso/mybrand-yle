---
title: "AI Governance Frameworks"
slug: "ai-governance-frameworks"
cluster: "agentic-ai"
depth: "intermediate"
definition: "The policies, processes, and roles that govern how AI systems are built, deployed, and monitored — covering risk classification, approval gates, ongoing monitoring, audit trails, and incident response."
readingTime: "9 min"
lastReviewed: "2026-Q2"
---

# AI Governance Frameworks

## What it is

AI governance is the operating model that decides how AI systems are built, deployed, monitored, and retired. It includes risk classification (what category of risk does this use case carry?), approval gates (who needs to sign off?), data and access policy (what can the model see?), monitoring and incident response (what happens when it goes wrong?), and audit trails (can we reconstruct what happened?).

It is distinct from technical safety. Technical safety is what the system does. Governance is the process around what the system is allowed to do, who decided that, and what happens when it is wrong.

The category has changed significantly between 2023 and 2026. Early AI governance was about "should we build this?" Modern AI governance is about "how do we operate dozens of AI systems at scale, each with different risk profiles, regulatory requirements, and stakeholder concerns?"

## Why it matters

For organizations deploying AI at scale, governance is increasingly the rate-limiter on velocity. Without it, every deployment becomes a bespoke negotiation between engineering, security, legal, and the business. With it, low-risk use cases ship fast and high-risk ones get the scrutiny they need.

The regulatory pressure is real. The EU AI Act, NYC Local Law 144, evolving state regulations in the US, and sector-specific requirements (HIPAA for healthcare AI, financial services regulators) all create concrete obligations. Organizations without governance frameworks meet these obligations through fire drills.

The competitive version: organizations with mature AI governance ship more AI faster than organizations without. The discipline is a moat, not overhead.

## How it works

A working AI governance framework has six components.

**Risk classification.** Every AI use case is classified by risk level. Low risk: internal-only, non-customer-facing, no regulated data, reversible decisions. Medium risk: internal but high-impact, semi-automated decisions, sensitive data. High risk: customer-facing, automated decisions affecting people, regulated data, irreversible actions. The class determines the approval and monitoring requirements.

**Approval gates.** Each risk class has gates. Low risk: team leader signs off. Medium risk: cross-functional review (engineering, security, legal, business owner). High risk: senior governance committee, possibly external review.

**Data and access policy.** What data can the model see? What systems can it write to? Per use case, with explicit boundaries. PII handling, data residency, retention — all explicit.

**Monitoring and observability.** Production systems are monitored for output quality, drift, cost, latency, and incident patterns. High-risk systems have stricter alerting and human-in-the-loop checks.

**Audit trail.** Every model call, tool invocation, and decision is logged with enough detail to reconstruct what happened. Logs are retained for the period the regulatory environment requires.

**Incident response.** A defined playbook for when things go wrong — escalation paths, rollback procedures, communication templates, post-mortem requirements.

## Vendor comparison

| Tool / framework | Layer |
|---|---|
| **Credo AI / Holistic AI / Calypso AI** | End-to-end AI governance platforms |
| **Microsoft Responsible AI Toolbox** | Governance for Microsoft-centric AI deployments |
| **NIST AI Risk Management Framework** | Open methodology, often adopted as basis |
| **EU AI Act compliance tools (multiple vendors)** | Regulatory compliance for EU-deployed systems |
| **Internal governance built on existing tools** | JIRA workflows + risk classification spreadsheet + observability platform |

Most organizations I work with build governance from existing tools rather than buying a dedicated platform. A risk classification spreadsheet, a JIRA workflow with approval gates, observability through Langfuse or Braintrust, and an incident response playbook is enough for most stages. Dedicated AI governance platforms are valuable when the use case count crosses ~30 deployed systems and the organization is regulated.

The **NIST AI RMF** is the most useful open framework as a basis. It is not prescriptive; it is structural. Most internal frameworks I have seen are some adaptation of NIST or ISO 42001.

## Yoann's take

*My approach: governance frameworks should make it easy to ship low-risk things fast and harder to ship high-risk things without scrutiny — not slow everything down equally. The pattern I avoid: blanket approval processes that treat a customer-facing claims-decision agent the same as an internal documentation summarizer. Both deserve review; neither deserves the same review. The architectural pattern that works: explicit risk classes, with clear criteria, and approval workflows that match the class. Documented data and access policy per use case, before any code is written. Observability and incident response defined before launch, not added after the first incident. Most importantly: a governance committee that meets regularly, reviews production systems, and has the authority to require changes or pull deployments. Without that body, governance is a slide deck. With it, it is operating model. The teams that get this right ship faster, not slower, because the friction is allocated to the use cases that warrant it.*

*— Yoann*

## Related reading

- [Deterministic Guardrails](/concepts/deterministic-guardrails)
- [Production Patterns for Agentic Systems](/concepts/production-patterns-agentic-systems)
- [Memory in Agents](/concepts/memory-in-agents)
- [Agent Evaluation Frameworks](/concepts/agent-evaluation-frameworks)

## External references

- NIST AI Risk Management Framework
- EU AI Act overview
- ISO 42001 — AI management system standard
