---
title: "Tool calls are not features. Tools are products."
slug: "tools-are-products"
dek: "Treating tools as products is the difference between a clever demo and a governable system."
cluster: "AGENTIC AI"
tags: ["agentic-ai"]
publishedAt: "December 2025"
readingTime: 9
---

The fastest way to predict whether an agentic system will survive production is to look at how the team talks about its tools. If tools are "the functions we wired up so the agent can do stuff," the system is a demo, whatever its current status. If tools have owners, contracts, versions, and users — if tools are *products* — the system has a chance.

This sounds like semantic fussiness. It is actually the central architectural insight of the last two years of building these systems.

## The tool is the interface between two worlds

An agentic system is a probabilistic reasoner connected to deterministic infrastructure. The tool layer is where those worlds meet — the only place where fuzzy intent becomes concrete action. Everything that makes production agents safe and useful lives at this boundary: validation, permissions, rate limits, audit logs, error semantics.

When you treat a tool as a feature, you write a function signature and move on. When you treat it as a product, you ask product questions, and every one of them turns out to be load-bearing. Who are this tool's users — which agents, in which contexts? What does it guarantee, and what does it explicitly not guarantee? What happens on partial failure? How does it describe itself to a model — is the description honest about limits, or does it oversell like a bad README? Whose pager rings when it breaks?

## Error messages are prompts

Here is the detail that changed how I build. A tool's error message is not diagnostics — it is a *prompt* that steers the model's next action. "Error 500" teaches the model nothing and invites a blind retry loop. "Refund rejected: amount exceeds your $500 limit; amounts above this require the escalate_refund tool" teaches the model the boundary and the recovery path in one sentence.

Well-designed tool errors are the cheapest capability upgrade available in agentic systems. I have seen a week of error-message rewriting outperform a model upgrade. That is what "tools are products" means concretely: someone sat down and designed the failure experience for the tool's actual user — a language model.

## Versioning, or the outage you scheduled

Tools drift. The API underneath changes, someone tightens an argument, a description gets "improved." In feature-world, you edit the function and redeploy. In production, that silently changes the behavior of every agent that uses the tool — and you find out through an incident that looks, maddeningly, like "the model got worse."

Product discipline fixes this the boring way: versioned tool contracts, changelogs, deprecation windows, and regression suites that exercise every tool through the agent before a change ships. The [skill-tracker system](/work/multi-agent-skill-tracker) I ran had a rule I now apply everywhere: a tool change without an eval run is an outage you scheduled but didn't put on the calendar.

## The portfolio effect

The compounding benefit arrives when tools are products with clear contracts: they become *reusable across agents*. The refund tool built for the support agent is safely callable by the finance-close agent, because its limits and semantics are explicit rather than implied by the one prompt it was born inside. Teams that get here stop building agents from scratch and start composing them from a governed tool catalog — which is the point where agentic development starts to look like an operating capability instead of a series of pilots.

Cheap models made reasoning abundant. The scarce, durable asset is a catalog of well-owned, well-described, well-guarded tools. Build that like it is the product — because it is.

*Related: [Tool Use and Function Calling](/concepts/tool-use-function-calling), [MCP: Model Context Protocol](/concepts/mcp-model-context-protocol), [Agent Evaluation Frameworks](/concepts/agent-evaluation-frameworks)*
