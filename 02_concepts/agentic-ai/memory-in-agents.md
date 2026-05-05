---
title: "Memory in Agents"
slug: "memory-in-agents"
cluster: "agentic-ai"
depth: "core"
definition: "How agentic systems remember — within a single run (working memory), across runs (long-term memory), and across users (shared knowledge) — and what each layer is good and bad at."
readingTime: "9 min"
lastReviewed: "2026-Q2"
---

# Memory in Agents

## What it is

Memory in agents has three distinct layers. Working memory is what fits in the model's context window during a single run — accumulating tool results, intermediate reasoning, and recent observations. Long-term memory persists across runs — summarized prior conversations, learned user preferences, episodic logs of past behavior. Shared memory is knowledge available to many agents — the document corpus, the metric definitions, the organizational facts.

These layers serve different purposes and have different failure modes. Treating them as one thing — "the agent's memory" — is the most common architectural mistake in agentic system design.

## Why it matters

The quality of an agent's memory determines the ceiling of what it can do. An agent without working memory is a single-step model. An agent without long-term memory cannot improve. An agent without shared memory cannot ground itself in organizational reality.

The opposite is also true. Bloated working memory burns budget and degrades reasoning. Promiscuous long-term memory remembers things it should forget — outdated preferences, stale facts, contradictory user statements. Misaligned shared memory leaks information across users, contexts, or domains.

Memory is also where most regulatory and privacy concerns land. What does the agent remember about a user? Where is it stored? Who can access it? How is it deleted? These are operational questions that have to be answered before deployment.

## How it works

**Working memory.** The model's context window during a run. Holds the goal, the system prompt, tool definitions, accumulated tool results, and intermediate reasoning. Constrained by the model's context limit (200K to 2M tokens depending on model). Strategies: aggressive summarization of older content, structured state instead of conversational logs, strategic truncation that preserves the goal and recent steps.

**Long-term memory.** Persists across runs. Implementation patterns:
- *Conversation summaries* — at end of run, distill key facts into a summary for next run.
- *Vector store of past interactions* — query past runs by semantic similarity to current task.
- *Structured user profile* — name, preferences, history, stored as structured data.
- *Episodic memory* — full logs of past runs, queryable when relevant.

**Shared memory.** Knowledge available to many agents — typically RAG over organizational content, but also semantic layer access for metrics, tool descriptions, and policy documents. Distinct from per-user long-term memory.

The principles that separate production memory from demo memory:

**Forgetting matters as much as remembering.** A user changed their preference last month; the agent should not act on the older preference. Decay, supersession, and explicit deletion need to be designed in from the start.

**Memory is not infinite working memory.** Putting "everything we know about this user" in every prompt is expensive and degrades reasoning. Selective recall — fetching only what is relevant to the current task — is the discipline.

**Memory leakage is a security boundary.** User A's memory should not surface in user B's session. This requires per-user isolation in the storage layer and audit trails for cross-user access (admin, support).

**Memory has a privacy contract.** What is stored, for how long, where, and how to delete it must be explicit. GDPR-style deletion requests are operational, not theoretical.

## Vendor comparison

| Tool / pattern | Layer | Notes |
|---|---|---|
| **LangGraph state** | Working memory | Explicit state with checkpointing |
| **MemGPT / Letta** | Long-term + working | Hierarchical memory management |
| **Mem0** | Long-term per-user memory | Purpose-built memory layer |
| **Pinecone / Qdrant / pgvector** | Long-term episodic | Vector store of past interactions |
| **OpenAI Assistants threads** | Working + thread-scoped | Built-in but provider-locked |
| **Anthropic memory features (Claude.ai, Projects)** | Long-term within product | Increasingly first-class |
| **Custom Postgres + summarization** | All layers | Boring, robust, often the right answer |

The choice depends on stage. For prototypes, LangGraph state plus a simple summary table is usually enough. For production multi-user systems, **Mem0** or a custom memory layer over Postgres is typically the right pattern — purpose-built memory libraries handle the privacy, decay, and supersession concerns better than rolling your own.

## Yoann's take

*My memory architecture decisions follow three rules. First: separate working memory from long-term memory explicitly — they have different lifecycles, different failure modes, and different privacy implications. Second: design forgetting before designing remembering. The default of every memory system should be to forget unless explicitly told otherwise; the opposite is how organizations end up with agents acting on year-old preferences. Third: per-user isolation is a security boundary, not a nice-to-have. I have audited agent systems where prompt engineering accidentally leaked one user's context into another's session. That class of failure is unacceptable. The libraries that take memory seriously — Mem0, Letta, MemGPT — are worth the integration cost. The naive pattern of "throw everything in the prompt" produces agents that work in demos and fail in production.*

*— Yoann*

## Related reading

- [RAG: Retrieval-Augmented Generation](/concepts/rag-retrieval-augmented-generation)
- [Vector Stores and Embedding Strategy](/concepts/vector-stores-embedding-strategy)
- [AI Governance Frameworks](/concepts/ai-governance-frameworks)
- [Production Patterns for Agentic Systems](/concepts/production-patterns-agentic-systems)

## External references

- MemGPT / Letta paper
- Mem0 documentation
- "Long-term Memory for AI Agents" — practitioner essays
