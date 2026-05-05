---
title: "Deterministic Guardrails"
slug: "deterministic-guardrails"
cluster: "agentic-ai"
depth: "core"
definition: "The non-LLM checks — input validation, output validation, allowlists, budget caps, content filtering — that constrain what an agentic system can do regardless of what the model decides."
readingTime: "8 min"
lastReviewed: "2026-Q2"
---

# Deterministic Guardrails

## What it is

Deterministic guardrails are the non-LLM checks that constrain what an agent can do. They are code, not prompts. They run on every input and every output. They fail closed — if the guardrail can't evaluate, the action is blocked.

Examples: input validation rejecting prompt injection patterns, output validation ensuring responses don't contain PII, allowlists restricting which tools an agent can call given which goal, hard cost ceilings stopping a run that has spent more than $X, content filters blocking offensive output, schema validation on every tool call.

Guardrails are distinct from prompt-based safety. A prompt that says "do not share customer SSNs" is a soft constraint. A regex that strips SSN-shaped strings from outputs is a hard constraint. Production agentic systems need both, but only the deterministic ones are reliable under adversarial conditions.

## Why it matters

Models can be wrong, manipulated, or unlucky. Production systems cannot rely on the model alone for safety. The agent might be prompt-injected by content it retrieved. It might hallucinate a destructive tool call with confident-looking arguments. It might burn through budget on a runaway loop.

Each of these failure modes has a deterministic solution that doesn't depend on the model behaving correctly. Allowlists prevent unknown tool calls. Budget ceilings stop runaway loops. Output filters catch leaked secrets. Input sanitization blunts injection.

The honest take: every production agentic system I have audited has had at least one class of failure mode that better guardrails would have prevented. The teams that ship reliable agents are the ones that treat guardrails as first-class infrastructure, not afterthoughts.

## How it works

Guardrails operate at four points in the agent loop.

**Input guardrails.** Run on incoming user input and on retrieved content. Block prompt injection patterns, jailbreak attempts, harmful queries. Tools: Lakera Guard, Prompt Armor, NeMo Guardrails, Rebuff, custom regex / classifier pipelines.

**Tool-call guardrails.** Run on every tool call before execution. Validate the model's chosen tool against the allowed list for the current goal. Validate arguments against schema, ranges, and policy. Approve or block destructive calls (send email, deploy code, modify production data) explicitly.

**Output guardrails.** Run on every model output before it is returned. Strip PII, redact secrets, block content categories (violence, illegal advice). Verify citations match retrieved content. Validate output structure (JSON schema for structured output).

**Run-level guardrails.** Run across the whole agent loop. Maximum iterations. Maximum cost. Maximum latency. Halt and escalate if the agent appears stuck.

The architecture pattern: guardrails are middleware. They run between the model and the world. They fail closed. They log every block for audit and tuning.

## Vendor comparison

| Tool | Layer | Best for |
|---|---|---|
| **Lakera Guard** | Input + output | Production guardrail platform with strong injection detection |
| **NeMo Guardrails** (NVIDIA) | Input + output + dialog flow | Open source, programmable, declarative policy language |
| **Prompt Armor / Lasso / similar** | Input | Specialized prompt-injection defense |
| **Rebuff** | Input | Open-source injection detection |
| **Pydantic / instructor** | Output schema | Structured output validation |
| **Custom code** | All layers | Full control; required for domain-specific policy |
| **Anthropic / OpenAI native moderation** | Content filters | Baseline for harmful content; not sufficient alone |

**Lakera Guard** is the most polished commercial guardrail platform in 2026. Strong injection detection, content filtering, and a programmable policy layer. Good operational telemetry.

**NeMo Guardrails** is the open-source default. Declarative policies, support for dialogue-flow rules, integrates with most LLM providers. Operationally requires more investment than commercial platforms.

**Custom code** is non-negotiable for the domain-specific parts. No vendor will know that your tool `delete_customer_data` should never be called by an agent in a sales context. That logic is yours to write.

The provider-native moderation endpoints (OpenAI moderation, Anthropic constitutional AI features) are a useful baseline for harmful-content filtering but should not be treated as a complete guardrail layer.

## Yoann's take

*My rule: guardrails are infrastructure, not afterthoughts. Every agentic system I architect has explicit guardrail layers at all four points — input, tool call, output, run-level — with deterministic enforcement and full audit logging. The line I draw: the agent's behavior is constrained by code, not by hope. Prompts are advisory; allowlists are enforcement. The pattern that produces incidents: shipping an agent into production with prompt-based safety only, then watching a single prompt injection escalate into a real-world action you didn't authorize. The pattern that produces reliable systems: every dangerous tool requires explicit run-time approval; every output is filtered before it leaves; every run has hard cost and iteration ceilings. None of this is exciting work. All of it is the difference between a demo and a system you can put your name on.*

*— Yoann*

## Related reading

- [Tool Use and Function Calling](/concepts/tool-use-function-calling)
- [Production Patterns for Agentic Systems](/concepts/production-patterns-agentic-systems)
- [AI Governance Frameworks](/concepts/ai-governance-frameworks)
- [Agent Evaluation Frameworks](/concepts/agent-evaluation-frameworks)

## External references

- Lakera Guard documentation
- NeMo Guardrails GitHub and docs
- OWASP Top 10 for LLM Applications
