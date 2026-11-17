# 95. Key Distinctions: Agents, Tools and Context

ShopAssist is now complete, and so is the review bot its team built. Now we look back at all of it with the exam's eyes.

This lesson is about the distinctions in agents, tools and context that the exam turns into wrong options. This matters because those wrong options are rarely silly. Each one names a real technique, used at the wrong layer or for the wrong job.

The most important thing to remember is this: in each pair, one option looks careful, and the other one fixes the cause.

We go through three groups. First, the loop and its rules. Second, the tools. Third, escalation and context. Together they cover the exam's first, second and fifth domains.

First, the loop and its rules. The first pair is the stop signal versus a round counter. The loop continues while the stop reason is tool use. It finishes on end turn. Wrong options stop the loop on Claude's words, on any text in the response, or after a fixed number of rounds. A cap on rounds is only a safety net. When it fires, something broke, so the case goes to a person.

The second pair has three sides: a prompt, a gate and a hook. A prompt guides Claude, but it fails sometimes. So a rule that must always hold goes into code. A prerequisite gate fixes the order of steps, for example a verified customer before any order action. Another kind of hook catches a single tool call before it runs. For example, it blocks a refund above five hundred dollars and redirects the case to escalate to human. A post tool use hook fixes the shape of data, like timestamps and status codes.

Watch for one more wrong option here. Limiting which tools exist changes what is available. It does not change the order of the calls.

The third pair is routing through the coordinator versus direct calls between subagents. In a multi-agent system, every message between subagents goes through the coordinator. That way, you can see every step. Errors are handled the same way everywhere, and you control which information moves where. A subagent that calls its own narrow tool, like verify fact, does not go around the coordinator. But a synthesis agent with every search tool has too many tools, and it starts doing another agent's job. Subagents also start empty. So the coordinator passes complete findings in each prompt.

Second, the tools. The first pair is a better description versus a bigger change. When Claude picks the wrong tool, the first fix is the descriptions. Each one says what the tool does and what it returns. It names the input, the edge cases, and when to use the neighboring tool. As a first step, few-shot examples, a routing layer or a merged tool are the wrong answers.

When descriptions are not enough, rename overlapping tools and split a general one. Then check the system prompt for keyword triggers. And when an agent prefers Grep over a better MCP tool, improve that tool's description. Keep Grep.

The second pair is an empty result versus a failure. A search that finds nothing has succeeded. Its answer is simply empty. A timeout is an access failure. It carries the is error flag, a category and the is retryable flag. Wrong options hide a failure as an empty success, or send back a bare "operation failed".

Only a transient error is worth a retry. A business error gets a customer-safe explanation, not another attempt. Across agents, a failure report carries the failure type, the query, the partial results and possible alternatives. The work continues, and the final report names its gaps.

Third, escalation and context. The first pair is a real trigger versus a signal that only looks like one. Escalate immediately when the customer asks for a person. Escalate on a request for a policy exception, on a policy gap, and when no progress is possible. Do not escalate on anger, on a self-reported confidence score, or because a case looks complex.

Several matching customers mean ShopAssist asks for another identifier. When escalation is off in either direction, the fix is explicit criteria with a few examples. A separate model trained to sort cases, or sentiment analysis, is the wrong answer.

The second pair is a case-facts block versus a summary. Summaries turn exact amounts, dates and promises into vague words. A more careful summary does not change that. Exact facts live in a block outside the summary, with one entry per issue. Tool results are trimmed to the fields that matter. Key findings go at the start of a long input.

The third pair is claims with sources versus compressed findings. Subagents return claim-source records, and synthesis merges them instead of dropping them. When two credible sources disagree, both values stay, each with its source and date. The coordinator decides how to handle the difference. Dates also show when a difference is a trend, not a conflict.

Here is what to remember. The stop reason ends the loop, and a cap only catches bugs. Prompts guide, while gates and hooks enforce. Every message between subagents goes through the coordinator. Wrong tool choices start with the descriptions, and a failure must never look like an empty result. Escalate for real triggers, and keep facts and sources exact, outside any summary.

So for every option, ask two questions: which layer failed, and does this option fix that layer?

Next, we do the same for the team's Claude Code setup.
