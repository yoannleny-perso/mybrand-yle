---
title: "The case for deterministic guardrails"
slug: "the-case-for-deterministic-guardrails"
dek: "The boring half of agent design that decides whether the magical half ever ships."
cluster: "AGENTIC AI"
tags: ["agentic-ai"]
publishedAt: "March 2026"
readingTime: 9
---

There is a moment in every agentic project where someone proposes solving a safety problem with a better prompt. "We'll tell it not to do that." I have learned to treat that sentence as a smoke alarm.

Prompts are suggestions. Guardrails are physics. The difference decides whether your system is deployable in an organization that has auditors, regulators, or simply a low tolerance for surprises — which is to say, every organization worth deploying in.

## What I mean by deterministic

A deterministic guardrail is a constraint enforced *outside* the model, in code that does not care how persuasive the model's output is. The agent can want to issue a refund of any size; the payment tool it calls caps refunds at a threshold and routes anything above it to a human. The agent can draft any email; the send action only works for recipients on an allowlist. The model proposes. The boundary disposes.

This is an old idea — it is how we have always handled powerful-but-fallible actors, including humans. New hires can draft the contract; they cannot sign it. Nobody considers that an insult to the new hire.

## The three layers that matter

In production systems I build three layers of determinism, in this order of importance.

**Action boundaries.** The complete set of tools an agent can invoke, with per-tool permissions, argument validation, and rate limits. This is the layer that turns "the model went rogue" from an existential risk into a log entry. If you build only one layer, build this one.

**State checkpoints.** Irreversible actions — sending, paying, deleting, publishing — get a checkpoint: either a human approval for high-stakes paths or a delay window with cancellation for medium ones. Reversible actions can be autonomous; irreversibility is earned, not assumed.

**Budget enforcement.** Tokens, dollars, wall-clock time, and step counts, enforced per task and per tenant. Runaway loops stop being an incident and become a capped cost of doing business.

Notice what is absent: nothing here limits what the model can *think*. Guardrails that try to constrain reasoning ("never consider X") are prompts wearing a security costume. Constrain actions, not thoughts.

## The objection, answered

The standard objection is that guardrails cripple the agent — that the value is in autonomy, and every checkpoint is friction. This gets the economics backwards.

An agent with clear boundaries can be granted *more* autonomy inside them, precisely because the blast radius is known. My most autonomous production systems are the most constrained ones: the agent operates freely within a space where the worst case is priced and acceptable. Meanwhile the "fully autonomous" prototypes stay in pilots forever, because no one can write down what the worst case is — and someone in risk or legal eventually asks.

Autonomy is not the absence of constraints. It is the presence of trusted ones. Nobody gives car keys to someone by removing the brakes.

## Where to start

If you inherit an agentic system without guardrails, the sequencing that works: enumerate every action the system can take and mark the irreversible ones — that list is usually shorter and scarier than expected. Wrap the irreversible ones in checkpoints first. Add budget caps second, action allowlists third. Only then start relaxing constraints, deliberately, one at a time, with an evaluation suite watching.

The magical half of agentic AI gets the conference talks. The boring half gets systems into production. Choose boring first; the magic ships sooner, not later.

*Related: [Deterministic Guardrails](/concepts/deterministic-guardrails), [Cost and Latency Budgeting](/concepts/cost-latency-budgeting), [AI Governance Frameworks](/concepts/ai-governance-frameworks)*
