---
title: "Cost and Latency Budgeting for AI"
slug: "cost-latency-budgeting"
cluster: "agentic-ai"
depth: "core"
definition: "The discipline of designing AI systems within explicit cost-per-run, latency-per-step, and total-budget envelopes — and the architectural choices that make those envelopes hold under real traffic."
readingTime: "9 min"
lastReviewed: "2026-Q2"
---

## What it is

Cost and latency budgeting is the discipline of designing AI systems within explicit limits — cost per run, latency per step, total monthly budget — rather than building first and discovering the bill later. It includes model selection, context management, caching, batching, and the architectural choices that make those limits hold even under unexpected traffic.

For deterministic systems, cost and latency are predictable. For agentic systems they are not. A single goal can result in five model calls or fifty, with context that grows and tool calls that vary. Without explicit budgeting, the cost variance per run can be 100×, the tail latency can be minutes, and the monthly bill can surprise even a careful team.

## Why it matters

Cost and latency are existential for AI systems at scale. A consumer-facing AI feature whose median latency is 8 seconds will be abandoned. An internal agentic system whose monthly cost grows 2× quarter-over-quarter will be defunded.

The teams that ship sustainable AI systems treat cost and latency as design constraints from day one — not as items on a "we'll optimize later" list. Architectural decisions made early (model choice, context strategy, caching layout) compound. Decisions made late are hard to reverse.

The strategic version: per-unit AI economics determine which use cases are viable. A use case that costs $0.02 per query is broadly deployable; one that costs $2.00 per query is an executive feature. The architecture decisions are the difference.

## How it works

Cost decomposes into model calls (tokens × per-token price), tool calls (sometimes paid, often free but with latency cost), retrieval and embedding (per-call pricing or self-hosted), and infrastructure (vector stores, agent runtime, observability).

Latency decomposes into model time-to-first-token (TTFT), generation time (output tokens × per-token speed), tool execution latency, retrieval latency, and orchestration overhead.

The high-leverage levers, in rough order of impact:

**Model routing.** Use the cheapest model that meets quality bar. Most production agentic systems benefit from a tiered approach: a fast cheap model for routing and simple steps (Haiku, GPT-4o-mini, Gemini Flash), a strong model for hard reasoning steps (Opus, GPT-4 / GPT-5, Gemini Pro). The cost difference between tiers is 10–30×; the quality difference is much smaller for many sub-tasks.

**Context management.** Long contexts are expensive and slow. Aggressive truncation, summarization of older steps, and structured state instead of conversational logs cut both cost and latency. The agent should not carry yesterday's tool outputs into today's reasoning.

**Caching.** Prompt prefix caching (provider-supported on most major APIs) cuts cost and latency on repeated prefixes. Semantic response caching catches near-identical queries. Both are configuration changes, not redesigns.

**Batching.** For non-interactive use cases, batched calls are dramatically cheaper than streaming calls. OpenAI Batch API and equivalents offer 50% discounts for tasks that can wait hours.

**Streaming.** For user-facing systems, streaming TTFT is what users experience as latency, not total generation time. Designing for streaming changes the perceived speed even when total tokens are unchanged.

**Hard ceilings.** Maximum tokens per request, maximum iterations per agent run, maximum dollars per run. Failing closed when ceilings are hit prevents runaway loops.

## Vendor comparison

The pricing landscape changes constantly. As of 2026:

| Tier | Models | Use case |
|---|---|---|
| **Frontier reasoning** | Claude Opus 4.7, GPT-5, Gemini 2.5 Pro | Hard reasoning, complex agentic decisions |
| **Strong general** | Claude Sonnet, GPT-5 mini, Gemini Pro | Most production work |
| **Fast cheap** | Claude Haiku, GPT-4o mini, Gemini Flash | Routing, classification, structured extraction |
| **Open-weights** | Llama 3.x, Qwen, Mistral | Self-hosted, regulated, cost-constrained |

The strongest cost optimization in 2026 is not buying a cheaper model — it is using the right model for the right step within a single agentic system. Routing simple steps to fast models and hard reasoning to strong models routinely cuts total cost 60–80%.

Self-hosting open-weights models is increasingly viable for high-volume use cases. The math works around 1M+ tokens per minute sustained — below that, managed APIs are usually cheaper after accounting for engineering and infrastructure overhead.

## Yoann's take

*My budgeting discipline starts before code is written. Every agentic system I architect has explicit per-run cost and latency budgets in its design doc, with the model routing, context strategy, and caching layout that supports those budgets. I track per-run cost from day one — not just total spend, but distributions, p99s, and runaway runs. The architectural pattern that compounds: tiered model routing inside a single agent, fast model for the loop's decisions and the strong model only for genuinely hard sub-steps. The pattern that fails: using the strongest model for every step because "it's the most capable." The cost is real and the quality difference on routing decisions is small. Cost and latency are not afterthoughts; they are the constraints that determine whether a use case is deployable. The teams who treat them that way ship systems that scale. The teams who don't end up explaining a budget overrun to the CFO.*

*— Yoann*

## Related reading

- [Production Patterns for Agentic Systems](/concepts/production-patterns-agentic-systems)
- [Cost Optimization for Data Platforms](/concepts/cost-optimization)
- [Agent Evaluation Frameworks](/concepts/agent-evaluation-frameworks)
- [Multi-Agent Orchestration](/concepts/multi-agent-orchestration)

## External references

- Anthropic — prompt caching documentation
- OpenAI — batch API documentation
- Provider pricing pages (current as of access date)
