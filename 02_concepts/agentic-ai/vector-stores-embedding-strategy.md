---
title: "Vector Stores and Embedding Strategy"
slug: "vector-stores-embedding-strategy"
cluster: "agentic-ai"
depth: "core"
definition: "The storage and retrieval layer for embedding-based search — and the design choices around embedding models, chunking, hybrid retrieval, and operational scale that determine whether RAG works in production."
readingTime: "9 min"
lastReviewed: "2026-Q2"
---

# Vector Stores and Embedding Strategy

## What it is

A vector store holds high-dimensional numerical representations of text, images, or other content, alongside metadata. It supports efficient nearest-neighbor search — given a query vector, return the K closest stored vectors. This is the substrate of retrieval-augmented generation, semantic search, recommendation systems, and any application that needs to find "similar" content quickly.

Embedding strategy is the broader question: which embedding model, which chunking approach, what metadata, how to handle hybrid retrieval (vector + keyword), how to scale ingestion and refresh. The vector store is one piece of this. The strategy is the whole.

## Why it matters

The vector store choice gets disproportionate attention in vendor pitches and disproportionately less attention in real architectural reviews. The store is largely a commodity at most scales — Pinecone, Qdrant, Weaviate, pgvector, OpenSearch all work for the use cases most teams have. The differentiator is rarely the store; it is the embedding strategy and the retrieval pipeline around it.

What actually determines retrieval quality: the embedding model (10× variance between models on domain-specific content), the chunking strategy (5× variance on documents with structure), the use of reranking (2–3× quality improvement on top of vector search), and the use of hybrid retrieval (often the difference between "good enough" and production-grade).

## How it works

The pieces that matter, in rough order of impact on quality.

**Embedding model.** The model that produces vectors. Domain matters — a general-purpose model trained on web text underperforms on specialized domains (legal, medical, code). Dimensionality matters less than quality on relevant content; bigger embeddings are not always better. Multilingual embeddings are worth the cost when content spans languages.

**Chunking strategy.** How documents are split into chunks before embedding. Naive fixed-size chunking ignores structure. Better strategies: split at semantic boundaries (paragraphs, sections, sentences), preserve hierarchical metadata (title → section → paragraph), use overlapping windows for context preservation, and consider parent-child chunking where small chunks point to larger context.

**Metadata.** Each chunk carries metadata: source document, section, date, author, access permissions. Filterable at query time. Often the difference between retrieving the right chunk and retrieving a similar but wrong one — "the version of this policy from after January 2026, not the older one."

**Hybrid retrieval.** Combine vector similarity with BM25 or keyword search. Naive vector search misses exact-match queries (product names, error codes, IDs) that BM25 nails. Score-fusion (RRF, weighted sum) combines them. Production-grade RAG almost always uses hybrid.

**Reranking.** After initial retrieval, a cross-encoder reranker reorders the top results by actual relevance to the query. Adds latency but cuts errors substantially. Cohere Rerank, Voyage Rerank, and BGE-reranker are the common choices.

**Refresh and reindexing.** Documents change. Embeddings need to be regenerated when content changes or when the embedding model is upgraded. Designing for incremental updates from day one saves expensive reindexing later.

## Vendor comparison

| Vector store | Best for | Notes |
|---|---|---|
| **Pinecone** | Managed simplicity, high QPS | Mature, good ergonomics, premium pricing |
| **Qdrant** | Self-hosted, strong performance | Open source, fast, growing ecosystem |
| **Weaviate** | Self-hosted with built-in modules | Open source, hybrid retrieval native |
| **pgvector** | Postgres-already-running shops | Operationally trivial; scales further than people expect |
| **OpenSearch / Elasticsearch** | Hybrid search at scale | Battle-tested, vector + lexical in one system |
| **Vespa** | Highest-scale, complex retrieval | Yahoo / Vespa.ai pedigree, demanding to operate |
| **Chroma** | Prototyping, embedded scenarios | Easy to start, less mature for production |
| **MongoDB Atlas Vector Search / Cosmos DB** | Database-native | If you are already on these, the integration matters |

| Embedding model | Strength |
|---|---|
| **OpenAI text-embedding-3-large** | Strong general default, large scale |
| **Voyage AI embed-3** | Often the strongest in independent benchmarks |
| **Cohere Embed v3** | Strong multilingual support |
| **BGE-M3 (open weights)** | Best open-weights option |
| **Sentence Transformers (open)** | Specialized variants for many domains |

**For most teams under 10M embeddings**, **pgvector** on Postgres is the right answer. Operationally trivial, performance is fine, no new system to learn or fund. The "do not buy a vector database yet" advice is usually correct for early-stage RAG.

**For production systems past 10M embeddings or with serious QPS requirements**, **Pinecone** for managed simplicity, **Qdrant** for self-hosted with the strongest performance-per-cost.

**For hybrid retrieval at scale**, **OpenSearch** or **Vespa** when you need vector + full-text search in one system.

For embeddings, **Voyage AI** has become my default for new builds when the cost is acceptable. **OpenAI text-embedding-3-large** is the safe institutional choice. **BGE-M3** for self-hosting or regulated contexts.

## Yoann's take

*My architectural rule: do not over-engineer the vector store before you have measured retrieval quality. Most teams I see have spent weeks evaluating Pinecone vs Qdrant vs Weaviate while running naive chunking and a generic embedding model. The investment was misallocated. My order of work: pick the simplest store that fits today's volume (pgvector under 10M chunks), invest in chunking and embedding model selection, add hybrid retrieval, add reranking, measure relevance with a real eval set. Only then revisit the store choice if QPS or scale genuinely demand it. The biggest single quality lift I have seen on enterprise RAG: switching from naive chunking + a generic embedding to semantic chunking + Voyage embeddings + Cohere reranking. The store was unchanged. The system became materially better.*

*— Yoann*

## Related reading

- [RAG: Retrieval-Augmented Generation](/concepts/rag-retrieval-augmented-generation)
- [Memory in Agents](/concepts/memory-in-agents)
- [Fine-tuning vs RAG vs Tool Use](/concepts/fine-tuning-vs-rag-vs-tool-use)
- [Production Patterns for Agentic Systems](/concepts/production-patterns-agentic-systems)

## External references

- MTEB (Massive Text Embedding Benchmark) leaderboard
- Pinecone, Qdrant, Weaviate documentation
- Cohere, Voyage AI rerank documentation
