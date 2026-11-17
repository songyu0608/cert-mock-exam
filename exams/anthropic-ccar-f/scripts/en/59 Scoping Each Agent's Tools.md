# 59. Scoping Each Agent's Tools

In the previous lesson, the coordinator started its subagents with the Task tool. Each subagent got an agent definition, and one field in it was left open: the tools field.

This lesson is about what goes into that field. This matters because an agent with the wrong tools picks badly. It also starts doing work that belongs to another agent.

Here is the scene. The store's research assistant answers one question: why are lamps returned so often? It has a coordinator and four subagents. They are web search, document analysis, synthesis and report. In the first version, the team chose the quick and easy way. Every subagent got every tool in the system, eighteen tools in total.

Then the team reads the logs. The synthesis subagent should only combine the findings it receives. Instead, it runs web searches of its own. Its new results are not part of the coordinator's plan. Some of them repeat what web search already found.

The most important thing to remember is this: each agent gets only the tools its role needs. We look at three things. First, how many tools, and which ones. Second, narrow tools instead of general ones. Third, one small tool that crosses roles.

First, how many. Each time an agent acts, Claude reads all of its tool descriptions and picks one. With four or five tools, that choice is easy. With eighteen, many tools look alike, and every choice is harder. So the agent picks the wrong tool more often. That is the first problem: too many tools make tool selection less reliable.

The second problem is the one in our logs. When an agent has tools outside its specialty, it tends to use them. The synthesis subagent sees a search tool, so it searches. But searching is another agent's job.

So we limit each subagent's tools to its role. The four lists are on screen. Web search gets the tools that search and load documents. Document analysis gets the tools that read the store's support tickets and supplier reports. Synthesis gets no search tools at all. The report subagent gets the tool that writes the report. Each list has four or five tools at most. That number is the exam's example, not a strict limit. The rule is simple: tools for the role, and nothing more.

We should not leave all eighteen tools on every agent "just in case". Each extra tool makes every choice harder. It also invites work outside the role.

Second, narrow tools. The web search subagent had a tool called fetch URL. It downloads whatever is at any web address. That is very general. The subagent can open a random page, a shopping page, or a page with nothing about lamps.

So we replace it with a constrained tool called load document. A constrained tool does one job and limits what it accepts. Load document accepts only addresses that point to real documents, like a supplier report or a published review. It checks the address first and refuses anything else. So the check lives inside the tool, and it runs on every call. Prefer a tool that can only do the right thing over a tool that can do anything.

Third, the tool that crosses roles. Synthesis now has no search tools. But while it combines findings, it often needs to check a small fact. Maybe it needs the date of a supplier report, or a defect rate. So it hands control back to the coordinator. The coordinator starts web search, waits, and then starts synthesis again. Assume that adds two or three round trips per report, and the team waits forty percent longer. Assume also that about eighty-five checks in a hundred are simple: a date, a name or a number. The rest need real investigation.

One fix sounds fast: give synthesis all the web search tools again. That brings back both problems. Synthesis has too many tools, and it starts researching on its own.

The best move is one scoped tool, called verify fact. It takes one claim and checks it against a source. It returns whether the source supports the claim, and which source it used. Synthesis uses it for the frequent, simple checks. Complex checks still go back through the coordinator, which sends them to web search. The hub and spoke shape stays the same. Synthesis calls its own narrow tool. It never talks to another agent directly.

One more point. A tool list controls which tools an agent can reach. It does not control the order of the steps. And the SDK enforces the list in code: an agent cannot call a tool it was never given.

Let's go over the main points again. Give each agent four or five tools for its role, not every tool in the system. Too many tools make selection less reliable. Tools outside a role get misused, like synthesis running web searches. Replace general tools with constrained ones, like load document instead of fetch URL. For a frequent, simple need, add one narrow tool from another role, like verify fact. Send the complex cases through the coordinator.

So when an agent does work that is not its job, look at its tool list first.

Next, we look at what each helper is told when it starts.
