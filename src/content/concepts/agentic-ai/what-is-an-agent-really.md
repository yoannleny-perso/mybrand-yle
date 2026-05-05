---
title: "What Is an Agent, Really"
slug: "what-is-an-agent-really"
cluster: "agentic-ai"
depth: "core"
definition: "An LLM-powered system that decides what to do next based on its goal, takes actions through tools, observes the results, and continues until the goal is met or the budget is exhausted."
readingTime: "9 min"
lastReviewed: "2026-Q2"
---

# What Is an Agent, Really

## What it is

An agent is a system where an LLM decides, in a loop, what to do next based on its goal, takes an action through tools, observes the result, and continues. The LLM is the controller; tools are how it acts on the world; memory is how it carries context across steps; the loop is how it makes progress.

This is different from prompting. A prompt produces an answer. An agent produces a sequence of actions and a final state. The difference is the loop and the autonomy of the choice within each step.

The label "agent" is overloaded. Vendor marketing has stretched it to cover anything from a single function-calling chat completion to a fully autonomous research system. The useful definition is the loop: if there is no loop where the model decides the next step, it is not an agent — it is a prompt with steps.

## Why it matters

The strategic significance of agents is not that they are smarter than prompts. It is that they handle work that does not have a known structure in advance.

A pipeline knows what to do at each step. An agent figures out what to do at each step. This makes agents the right tool for problems where the path is variable — research, multi-system coordination, customer support that requires lookups across systems, code review with context-gathering, operational triage.

For organizations, this changes the unit of automation. The previous era automated tasks with known structure (invoice processing, ticket routing, ETL). The agentic era automates tasks where the structure emerges at runtime. The implications for headcount, throughput, and competitive position are significant — and most organizations are not yet structured to capture them.

## How it works

The minimal agent loop:

1. **Goal received.** "Investigate why dashboard X showed wrong numbers this morning."
2. **Plan / next-step decision.** The LLM, given the goal and current state, decides the next action.
3. **Tool call.** The LLM emits a structured tool call — `query_warehouse(sql="...")` or `read_dbt_artifact(path="...")`.
4. **Tool execution.** The runtime executes the tool and returns the result.
5. **Observation.** The result is added to the context.
6. **Loop.** Back to step 2 until the goal is met, the budget is exhausted, or the agent declares it cannot proceed.

The four components that need to be designed deliberately:

**Tools.** What can the agent do? Tools should be precise, safe, and well-described. Bad tool descriptions are the largest single source of agent failure.

**Memory.** What does the agent remember across steps and across runs? Working memory (context window) plus longer-term memory (vector store, structured store, episodic logs).

**Guardrails.** What can the agent never do? Hard-coded checks before destructive tool calls. Allowed-list of tools per goal. Maximum iteration count. Cost ceiling.

**Evaluation.** How do you know the agent worked? Output evaluation, trace evaluation, regression suites — the discipline that makes agents production-grade.

## Vendor comparison

The frameworks for building agents fall into a few categories.

| Framework | Best for | Strength | Weakness |
|---|---|---|---|
| **LangGraph** (LangChain) | Production graph-based agents | Mature, explicit state machine, good observability | LangChain's history of churn worth weighing |
| **CrewAI** | Multi-agent collaboration patterns | Role-based, easy to start | Less mature for production at scale |
| **AutoGen** (Microsoft) | Research, multi-agent conversation | Strong patterns, growing ecosystem | Microsoft-centric integrations |
| **OpenAI Agents SDK** | OpenAI-centric production agents | First-party, clean API | Tied to OpenAI |
| **Anthropic Computer Use / agents** | Claude-centric agents | Strong reasoning, tool use, MCP-native | Tied to Claude |
| **Semantic Kernel** (Microsoft) | .NET / enterprise integrations | Strong typing, plug-in model | Less common outside Microsoft shops |
| **Custom on top of model API** | Full control | No framework lock-in, exact behavior | All the framework concerns become your concerns |

For production work in 2026, my default starting point is **LangGraph** or a custom layer over the model API. The choice depends on whether the team values framework support over absolute control. **OpenAI Agents SDK** and **Anthropic's MCP-based agent patterns** are the two strongest first-party options when committing to a single model provider.

## Yoann's take

*My definition for any production conversation: an agent is a system where an LLM decides what to do next, in a loop, until a goal is met. Anything else is marketing. The discipline that separates production agents from demos is in the four components — tools, memory, guardrails, evaluation. I have walked into more than one organization where "we have agents in production" meant "we have a chat completion with three function calls" and the actual loop, memory, and evaluation were absent. The next two years will sort serious agentic systems from theatre. The companies that get the operating model right — clear ownership, deployment discipline, evaluation harnesses, explicit budgets — will pull away from the ones running impressive demos.*

*— Yoann*

## Related reading

- [LLM vs Agentic: The Difference](/concepts/llm-vs-agentic-difference)
- [Agentic AI Architecture Patterns](/concepts/agentic-ai-architecture-patterns)
- [Tool Use and Function Calling](/concepts/tool-use-function-calling)
- [Production Patterns for Agentic Systems](/concepts/production-patterns-agentic-systems)

## External references

- Anthropic — "Building effective agents"
- OpenAI Agents SDK documentation
- LangGraph documentation
