---
title: "Tool Use and Function Calling"
slug: "tool-use-function-calling"
cluster: "agentic-ai"
depth: "core"
definition: "The mechanism that lets an LLM emit structured calls to external functions — query a database, send an email, call an API — turning a text generator into something that can act on the world."
readingTime: "9 min"
lastReviewed: "2026-Q2"
---

# Tool Use and Function Calling

## What it is

Tool use is the mechanism by which an LLM emits a structured call to an external function. Instead of returning free-text, the model returns a JSON object naming a tool and its arguments. The runtime executes the tool and returns the result. The model continues with the result in context.

This is what turns a text generator into something that can act. Without tool use, an LLM can only describe what it would do. With tool use, it can do it — query a warehouse, call an API, write a file, send a message.

The major model providers have converged on similar patterns. OpenAI calls them functions and now tools. Anthropic calls them tools. Google calls them functions or extensions. Mechanically they are the same: a structured schema describing each tool, the model decides when and how to call them, the runtime executes, the result returns.

## Why it matters

Tool use is the substrate of agentic systems. Every architectural pattern — single-agent, orchestrator-worker, graph state machine — is ultimately some arrangement of tool calls and reasoning steps. The quality of the tools determines the ceiling of the agent.

This means tool design is the single most underrated skill in agentic engineering. Most agent failures I diagnose trace to bad tools, not to bad models. Tools that do too much, tool descriptions that are vague, tool outputs that are too verbose — each one degrades agent performance more than swapping a model would.

The flip side: a small set of well-designed tools makes a mediocre model into a capable agent. Investing in tool quality pays back across every model upgrade, every framework migration, every architectural change.

## How it works

Each tool has three pieces: a name, a description, and a JSON schema for arguments. The model receives all available tools as part of its context. When it decides to call one, it emits a structured call. The runtime validates against the schema, executes, and returns the result.

The patterns that separate good tools from bad:

**Single responsibility.** A tool does one thing. `query_warehouse` runs a SQL query. `format_results_for_user` renders output. Not one tool that does both. Models reason better about tools with narrow scopes.

**Self-describing.** The tool's description is the model's only guide for when to use it. Vague descriptions ("get data") fail. Specific descriptions ("query the production warehouse for read-only analytics SQL; returns up to 1000 rows") succeed.

**Constrained inputs.** Use enums, ranges, and required fields aggressively. Free-form strings invite the model to hallucinate plausible-but-wrong arguments. Type-strict inputs cut entire classes of errors.

**Compact outputs.** Tool outputs go into the model's context and consume tokens for the rest of the run. A tool that returns 50K tokens of JSON when 500 would do is a tax on every subsequent decision. Truncate, summarize, or paginate at the tool layer.

**Idempotent and safe by default.** Tools that mutate state should be explicit and constrained. Read-only tools should be read-only. The dangerous tools (send email, create ticket, deploy code) need explicit authorization steps in the agent loop, not just in the tool implementation.

## Vendor comparison

| Provider | Tool format | Notable |
|---|---|---|
| **Anthropic (Claude)** | `tools` parameter, JSON schema | Strong tool-use reasoning; multi-tool parallel calls; native MCP support |
| **OpenAI** | `tools` (replaces deprecated `functions`); JSON schema | Mature, widely adopted, strong streaming |
| **Google (Gemini)** | Function declarations | Function-calling improving each release |
| **Open source models (Llama 3.x, Qwen, Mistral)** | Provider-specific or templated | Quality varies; serious agentic work still favors frontier models |
| **MCP (Model Context Protocol)** | Standard protocol for tool servers | Growing standard for portable tool definitions across models and frameworks |

**Anthropic's Claude** is my default for tool-use-heavy agentic work — the model's reasoning about when and how to call tools, and its ability to call multiple tools in parallel where appropriate, is the strongest in the market in 2026. **OpenAI's GPT-4 and GPT-5 families** are similarly capable and have the largest ecosystem. **Gemini** has improved meaningfully but still lags slightly on multi-step tool use.

**MCP** is the most important development in tool standardization. Defining tools as MCP servers makes them portable across Claude, increasingly across other clients, and across frameworks. New tool implementations should default to MCP unless there is a specific reason not to.

## Yoann's take

*Tool design is where I spend the most time on any agentic system, and it is where most teams underinvest. My checklist for every tool: single responsibility, vivid description with examples, constrained inputs, compact output, explicit safety classification (read / write / dangerous). I treat tools as products of the platform — they have owners, tests, versions, and a deprecation policy. The pattern that makes the difference: build a small set of excellent tools first, prove the agent works on them, expand cautiously. The pattern that fails: bolting fifty tools onto an agent on day one, watching it pick the wrong tool half the time, blaming the model. The model is rarely the problem.*

*— Yoann*

## Related reading

- [What Is an Agent, Really](/concepts/what-is-an-agent-really)
- [MCP — Model Context Protocol](/concepts/mcp-model-context-protocol)
- [Agentic AI Architecture Patterns](/concepts/agentic-ai-architecture-patterns)
- [Deterministic Guardrails](/concepts/deterministic-guardrails)

## External references

- Anthropic — Tool use documentation
- OpenAI — Function calling guide
- MCP specification
