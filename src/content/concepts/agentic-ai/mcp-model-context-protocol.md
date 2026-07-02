---
title: "MCP: Model Context Protocol"
slug: "mcp-model-context-protocol"
cluster: "agentic-ai"
depth: "core"
definition: "An open protocol that lets LLM-powered systems connect to external tools, data sources, and services through a standardized interface — making integrations portable across models, frameworks, and clients."
readingTime: "8 min"
lastReviewed: "2026-Q2"
---

## What it is

MCP is an open protocol introduced by Anthropic in 2024 that defines how LLM-powered clients communicate with external systems. An MCP server exposes tools, resources, and prompts to any MCP-compliant client. The client can be Claude Desktop, an IDE plugin, an agent framework, or a custom application.

The architectural shift is integration portability. Before MCP, each agent framework had its own tool definition format. A Slack integration written for LangChain didn't work in CrewAI. A database tool written for OpenAI's function calling needed rewriting for Anthropic. MCP makes integrations independent of the client and increasingly of the model.

By 2026 MCP has been adopted broadly enough that it functions as a de facto standard for tool integration in agentic systems. The major providers either support it natively or via adapters. The open-source ecosystem has hundreds of MCP servers for common integrations — GitHub, Slack, Postgres, Notion, web search, file systems, browsers.

## Why it matters

Three structural shifts MCP enables.

**Portability.** A team that builds an MCP server for its internal CRM gets that integration available to every MCP-compliant client. As the team's choice of agent framework evolves, the integration travels.

**Network effects.** Open MCP servers compound. Each new high-quality server makes the ecosystem more valuable for everyone. The catalog of available integrations grows independently of any single vendor.

**Standardization of tool definitions.** Tool descriptions, argument schemas, and resource patterns now have a shared shape. This makes tools easier to share, audit, and reason about across teams.

For organizations, the practical effect is that new integrations should default to MCP. Building a custom tool definition for one framework today creates technical debt that compounds with every framework swap or model migration.

## How it works

An MCP server exposes three things over a standardized JSON-RPC interface:

**Tools.** Functions the agent can call — `query_database`, `send_message`, `read_file`. Each has a name, description, and JSON schema for arguments. Same shape as native function-calling tool definitions.

**Resources.** Data the agent can read — files, database schemas, document metadata. Resources have URIs and content types. The agent can subscribe to resources for change notifications.

**Prompts.** Reusable prompt templates the server provides — a chain-of-thought template, a structured output template. Less commonly used than tools and resources, but available.

The transport layer is typically stdio (server runs as a subprocess of the client) or HTTP/SSE (server runs as a network service). The server is a small program, often a few hundred lines of Python or TypeScript, that wraps a specific integration.

The client is responsible for tool selection — deciding which tools to expose to the model and which to call. The server is responsible for execution — implementing the actual tool behavior, handling auth, returning results.

## Vendor comparison

| Provider / framework | MCP support |
|---|---|
| **Anthropic Claude (API, Claude.ai, Claude Desktop)** | Native MCP client |
| **Claude Code** | Native MCP client |
| **OpenAI** | Adapters via SDKs and community projects |
| **LangChain / LangGraph** | First-class MCP integration |
| **CrewAI** | MCP support via adapters |
| **Cursor / Windsurf / IDE clients** | Native MCP support |
| **Custom clients** | MCP SDKs in Python, TypeScript, Go, others |

The MCP server ecosystem in 2026 includes hundreds of community and vendor-maintained servers. Notable categories:

- **Developer infrastructure**: GitHub, GitLab, Linear, Sentry, PagerDuty
- **Communication**: Slack, Discord, Gmail, Microsoft 365
- **Data and analytics**: Postgres, MySQL, Snowflake, BigQuery, Databricks, dbt
- **Knowledge and content**: Notion, Confluence, Google Drive, Obsidian
- **Web and automation**: web search, browser control, Puppeteer, Playwright

## Yoann's take

*MCP is the most important standard development in agentic AI since function calling itself. My default for any new tool integration in 2026: build it as an MCP server. The portability across clients, the discoverability via the open server registry, the auditable shape of tool definitions — all of it is worth more than minor convenience differences in framework-native tool formats. The pattern I push toward: every internal system that an agent might need to query — the warehouse, the catalog, the ticket tracker, the metric definitions — gets an MCP server, owned by the team that owns the system. Agents become MCP clients of the organization's tool surface. This is operating model as much as technology. It moves data integration into a standardized, ownable, auditable layer instead of growing it inside every agent's prompt or framework. The ones who get this right early will compound.*

*— Yoann*

## Related reading

- [Tool Use and Function Calling](/concepts/tool-use-function-calling)
- [Agentic AI Architecture Patterns](/concepts/agentic-ai-architecture-patterns)
- [Production Patterns for Agentic Systems](/concepts/production-patterns-agentic-systems)
- [AI Governance Frameworks](/concepts/ai-governance-frameworks)

## External references

- Model Context Protocol specification
- Anthropic — MCP introduction
- MCP server registry and ecosystem
