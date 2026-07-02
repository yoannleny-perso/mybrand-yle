---
title: "Fine-tuning vs RAG vs Tool Use"
slug: "fine-tuning-vs-rag-vs-tool-use"
cluster: "agentic-ai"
depth: "core"
definition: "Three ways to make a model good at your specific problem — teach it (fine-tuning), give it the relevant content at runtime (RAG), or let it act (tool use) — each fitting different problem shapes."
readingTime: "9 min"
lastReviewed: "2026-Q2"
---

## What it is

Three patterns for making an LLM work well on a specific problem. They are not mutually exclusive — production systems often use combinations — but each fits a distinct problem shape.

**Fine-tuning** modifies the model's weights using examples of the desired behavior. The model learns patterns it didn't have before. Output style, domain language, format compliance, classification.

**RAG (retrieval-augmented generation)** adds relevant content to the model's context at runtime. The model didn't learn the content; it reads it for each query. Knowledge access, document Q&A, grounded answers.

**Tool use** lets the model take actions through structured function calls. The model decides what to do; the tool executes. Database queries, API calls, file operations, downstream system control.

The choice between them is one of the most common architectural questions in AI engineering, and the answer is often "two of the three" — but knowing which two and in what proportion is the real skill.

## Why it matters

The wrong default produces predictable failure modes.

Fine-tuning when RAG would do: the team spends weeks producing training data, runs an expensive training job, and ends up with a model that knows yesterday's content. The next time the underlying knowledge changes, retraining is required. Operationally fragile.

RAG when fine-tuning would do: the team retrieves the same instructions over and over, paying tokens for content that should have been baked into the model. Quality is mediocre because retrieval was the wrong frame.

Tool use when RAG would do: the team builds a `search_documents` tool the model uses every query, when a clean RAG layer would have produced better results with simpler architecture.

The strategic version: getting this decision right early saves significant rebuild cost. Most teams default to one of the three (often whichever they tried first) and force-fit problems into it.

## How to choose

The decision tree I use:

**The model already knows enough; the problem is style, format, or behavior.**
→ **Fine-tuning** if the style is consistent, your format is non-standard, or the behavior must be reliable. Fine-tuning is excellent at "always produce JSON in this exact shape" or "respond in this voice" or "classify into these categories with this calibration."

**The problem is access to specific content the model was not trained on.**
→ **RAG**. Internal documents, recent information, customer-specific data, anything that changes over time. The model uses its training to read and reason; the content comes from retrieval. Most enterprise AI use cases live here.

**The problem requires acting on the world or pulling structured data from systems.**
→ **Tool use**. Database queries, API calls, file operations, anything where the answer depends on the current state of an external system. RAG doesn't fit because the answer isn't in documents — it's in a database row, an API response, or an action that hasn't happened yet.

**The problem is some combination of the above.**
→ **Combine.** Most production systems do. Tool use for actions and structured data, RAG for unstructured knowledge, fine-tuning for the model's voice and structured output reliability. A customer-support agent might use all three: tool use for ticket lookup, RAG for product documentation, fine-tuning for response tone and structure.

## How they actually work

**Fine-tuning** in 2026 is mostly LoRA-based parameter-efficient tuning rather than full fine-tuning. You produce ~100–10,000 examples of input → desired output, run training (provider-managed or self-hosted), and get a model variant. Costs from low hundreds to high thousands depending on size. Quality depends almost entirely on data quality. Garbage data produces a worse model than no fine-tuning.

**RAG** queries an index at runtime, returns relevant chunks, includes them in the prompt with citation instructions, and the model answers. Quality depends on retrieval (chunking, embedding, reranking, hybrid retrieval) much more than on the model. See the RAG entry for depth.

**Tool use** exposes typed functions to the model, the model emits structured calls, the runtime executes them, results return to the model's context. Quality depends on tool design — narrow scope, vivid descriptions, constrained inputs, compact outputs. See the tool use entry for depth.

## Vendor comparison

| Capability | Where it sits |
|---|---|
| **Fine-tuning APIs** | OpenAI fine-tuning, Anthropic via partners, Cohere, Mistral, self-hosted on Hugging Face |
| **RAG infrastructure** | Vector stores + embedding models + retrieval frameworks (LangChain, LlamaIndex, Haystack) |
| **Tool use / function calling** | Native to all major model APIs; MCP for portable tool definitions |

Fine-tuning has narrowed in importance as frontier models have grown more capable at instruction-following. The cases where fine-tuning beats prompting + RAG have shrunk. It remains relevant for: structured output reliability at high volume, specialized voice or style, classification with calibrated confidence, and domain-specific reasoning where in-context examples are insufficient.

## Yoann's take

*My default order of consideration: tool use first, RAG second, fine-tuning third. Most enterprise problems map to "the model needs to read our content" (RAG) or "the model needs to act on our systems" (tool use). The "model needs to behave differently" cases that justify fine-tuning are real but smaller than they appear in vendor demos. The pattern that fails: jumping to fine-tuning because it sounds substantive. The pattern that succeeds: building a system with strong tools and good retrieval, measuring where it falls short, and only then deciding if fine-tuning would address the gap. Most of the time it would not. The combination I see in production-grade systems: a frontier model, tool use for actions and structured queries, RAG for unstructured content, and fine-tuning reserved for narrow output-format or classification tasks where it earns its keep.*

*— Yoann*

## Related reading

- [RAG: Retrieval-Augmented Generation](/concepts/rag-retrieval-augmented-generation)
- [Tool Use and Function Calling](/concepts/tool-use-function-calling)
- [Vector Stores and Embedding Strategy](/concepts/vector-stores-embedding-strategy)
- [Production Patterns for Agentic Systems](/concepts/production-patterns-agentic-systems)

## External references

- OpenAI fine-tuning guide
- Anthropic — when to fine-tune (essay)
- "Patterns for Building LLM-based Systems" — Eugene Yan
