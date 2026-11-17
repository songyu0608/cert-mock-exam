# 8. Six Official Production Scenarios

The Claude Certified Architect Foundations exam builds its questions around six production scenarios. Each scenario describes a system that a team is building with Claude. A set of questions follows each one.

On exam day, you get four of the six, picked at random. You cannot know which four in advance, so prepare for all six.

The six scenarios fall into three groups. Three are agents built with the Claude Agent SDK. Two are about Claude Code. The last one is a pipeline for documents.

The first agent scenario is the Customer Support Resolution Agent. It handles unclear requests, such as returns, billing disputes and account issues. It reaches the company's backend through custom tools. These tools use the Model Context Protocol, or MCP. They are get customer, lookup order, process refund, and escalate to human.

The target is to resolve at least eighty percent of cases on first contact. The tension is knowing when to escalate. If the agent escalates too often, it misses the target. If it escalates too rarely, it handles cases it should not touch. The support assistant we are building sits very close to this scenario.

The second agent scenario is the Multi-Agent Research System. A coordinator agent hands out work to specialized subagents. One searches the web, and another analyzes documents. A third combines the findings, and a fourth writes a report with citations.

The tensions here are coverage and trust. If the coordinator splits the topic too narrowly, whole areas go missing. Every claim in the report must still point back to its source.

The third agent scenario is Developer Productivity with Claude. Here, an agent helps engineers explore unfamiliar codebases and understand legacy systems. It also generates boilerplate code and automates repetitive tasks. It uses built-in tools for reading, writing and searching files and for running commands. It also connects to MCP servers.

The tension is understanding a large codebase without drowning in it. Good answers build understanding step by step. They do not read every file up front.

Claude Code is the setting for the second group.

In Code Generation with Claude Code, a team uses Claude Code every day. They generate code, refactor, debug and write documentation with it. The questions center on configuration and workflow. Shared instructions live in CLAUDE.md files. Custom slash commands give the whole team the same shortcuts.

The team also chooses between plan mode and direct execution. A large architectural change deserves a plan first. A small, clear fix does not.

This scenario is easy to confuse with Developer Productivity. In Developer Productivity, you build your own agent with the Agent SDK. In Code Generation, the team uses Claude Code itself and configures it.

The second Claude Code scenario is Claude Code for CI/CD. That stands for continuous integration and continuous deployment: automated checks that run whenever code changes. Here, Claude Code reviews pull requests, generates test cases and posts feedback.

Nobody is at the keyboard. So Claude Code must run without waiting for input. Its output must be something a script can read. And the review prompts must keep false alarms low. If they don't, developers stop trusting the comments.

The last scenario is Structured Data Extraction. The system pulls specific fields out of unstructured documents. It checks each result against a JSON schema, which is a formal description of what a valid record looks like. The records then feed other systems.

The main tension is that a record can match the schema and still be wrong. A total can add up incorrectly. When a document lacks a field, the system should say so rather than invent a value.

No scenario maps to a single exam domain. The support agent combines agent design, tool design and reliability. The CI/CD scenario combines Claude Code configuration with prompt engineering. So when you study a domain, ask where it shows up in each scenario.

When a question opens, first name its scenario. Then find the constraint that scenario cares about most. The best answer respects that constraint.
