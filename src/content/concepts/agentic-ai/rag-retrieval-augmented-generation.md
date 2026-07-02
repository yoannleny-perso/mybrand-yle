---
title: "RAG: Retrieval-Augmented Generation"
slug: "rag-retrieval-augmented-generation"
cluster: "agentic-ai"
depth: "core"
definition: "Augmenting LLM context at runtime with relevant documents retrieved from an index — letting models answer questions about content they were never trained on, with citation discipline."
readingTime: "10 min"
lastReviewed: "2026-Q2"
---

## What it is

Retrieval-augmented generation is the pattern of augmenting an LLM's context at query time with relevant documents fetched from an external store. The user asks a question. The system retrieves the top-N most relevant chunks from a document store. Those chunks are passed into the model's context along with the question. The model answers using both its training and the retrieved content.

This is the dominant pattern for grounding LLM answers in proprietary content — internal documentation, customer records, product manuals, knowledge bases, contracts. The model doesn't need to be retrained on the content; the relevant pieces are surfaced at runtime.

The category has matured rapidly. The naive 2023 pattern (chunk text, embed, retrieve top-K, paste into prompt) has been largely superseded by hybrid retrieval, reranking, agentic retrieval, and increasingly by tool-use-based approaches that query structured stores directly.

## Why it matters

RAG is how organizations use LLMs on data the model has never seen. Internal documentation. Customer context. Product specs. Research literature. Without retrieval, the model either fabricates plausible-sounding content or refuses to answer. With retrieval done well, the model becomes a competent reader of the organization's actual content.

The honest assessment: most enterprise RAG deployments underperform what their vendor demos suggest. The failure modes are predictable — chunking strategy is wrong, retrieval misses the relevant content, the model ignores or contradicts what was retrieved, or citations are missing or fabricated. The path from demo to production is mostly about fixing these systematically.

The strategic pressure: retrieval quality is the rate-limiter on most enterprise AI use cases. Better models help, but a 10% improvement in retrieval relevance dwarfs a 10% improvement in model capability for most production RAG systems.

## How it works

The basic flow:

1. **Ingestion.** Documents are chunked (typically 200–1000 tokens per chunk), embedded into vectors using an embedding model, and stored in a vector index alongside metadata.

2. **Query.** The user's question is embedded with the same model, and the index returns the top-K most similar chunks.

3. **Generation.** The retrieved chunks plus the original question are sent to the LLM. The model is instructed to answer using only the retrieved content and to cite sources.

The patterns that separate production RAG from demo RAG:

**Hybrid retrieval.** Pure vector similarity misses keyword matches on specific terms (product names, error codes, IDs). Combining vector retrieval with BM25 or full-text search produces materially better results on most enterprise content.

**Reranking.** Top-K results from initial retrieval are passed through a cross-encoder reranker (Cohere Rerank, BGE-reranker) that reorders them by actual relevance. Cheaper than running the LLM on bad chunks.

**Chunking strategy.** Naive fixed-size chunking destroys document structure. Better strategies: chunk at semantic boundaries (paragraphs, sections), preserve metadata (title, source, date), maintain parent-child relationships for hierarchical documents.

**Query rewriting.** The user's question may not match the document's wording. Query rewriting (HyDE, query decomposition, multi-query expansion) improves recall.

**Citation discipline.** The prompt must instruct the model to cite sources, and the application must verify citations exist in retrieved content. Without verification, models cite plausibly-named-but-fabricated sources.

**Agentic retrieval.** Instead of retrieving once, an agent decides what to retrieve, reads, decides if more is needed, and retrieves again. Higher cost, much higher quality on complex questions.

## Vendor comparison

The RAG stack has multiple layers; each has its own vendor landscape.

| Layer | Tools |
|---|---|
| **Embedding models** | OpenAI text-embedding-3, Cohere Embed, Voyage AI, BGE-M3 (open) |
| **Vector stores** | Pinecone, Weaviate, Qdrant, Chroma, pgvector, OpenSearch, Vespa |
| **Retrieval orchestration** | LangChain, LlamaIndex, Haystack, custom |
| **Reranking** | Cohere Rerank, BGE-reranker, Voyage AI Rerank |
| **Frameworks** | LangChain, LlamaIndex, custom on direct model APIs |
| **Managed RAG** | Azure AI Search, Vertex AI Search, AWS Bedrock Knowledge Bases, Pinecone Assistant |

**For embeddings**: OpenAI's text-embedding-3-large is the strongest general-purpose default. **Voyage AI** has the strongest results in independent benchmarks for many domains. **Cohere Embed** with its multilingual capabilities is the right answer for global content. **BGE-M3** is the strongest open-weights option.

**For vector stores**: **Pinecone** for managed simplicity at scale. **Qdrant** for self-hosted with strong performance. **pgvector** when the volume is modest and you already run Postgres — the "do not buy a vector database yet" answer is often correct. **OpenSearch** when you need vector + lexical hybrid in a battle-tested platform.

**For reranking**: Cohere Rerank is the de facto default. Adding it to a naive RAG system typically improves answer quality measurably with minimal engineering work.

**For managed RAG**: AWS Bedrock Knowledge Bases and Azure AI Search are credible production options when the team prioritizes operational simplicity over peak quality. They underperform a well-tuned custom stack for the hardest use cases.

## Yoann's take

*My RAG playbook in 2026: hybrid retrieval (vector + BM25) by default, Cohere or BGE reranking on top, query rewriting on the input side, agentic retrieval for complex questions. I default to OpenAI text-embedding-3-large or Voyage AI for embeddings, and to pgvector when the corpus is under a few million documents — most teams do not need a dedicated vector database and the operational simplicity of Postgres is worth the slight performance hit. The mistake I see most often: teams shipping naive RAG, getting mediocre results, and concluding "the model is the problem." It is almost never the model. Fix retrieval first. Add reranking. Look at the actual chunks coming back and ask whether a human reading those chunks could answer the question. If not, no model fixes it.*

*— Yoann*

## Related reading

- [Vector Stores and Embedding Strategy](/concepts/vector-stores-embedding-strategy)
- [Memory in Agents](/concepts/memory-in-agents)
- [Fine-tuning vs RAG vs Tool Use](/concepts/fine-tuning-vs-rag-vs-tool-use)
- [Agent Evaluation Frameworks](/concepts/agent-evaluation-frameworks)

## External references

- "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks" — Lewis et al., original RAG paper
- Anthropic — "Contextual Retrieval"
- LlamaIndex documentation on advanced RAG
