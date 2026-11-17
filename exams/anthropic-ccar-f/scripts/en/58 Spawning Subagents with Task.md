# 58. Spawning Subagents with Task

The coordinator can now split the lamp question into parts that cover the whole topic.

This lesson is about how the coordinator actually starts its subagents, and how it runs several of them at once. This matters because a good plan does nothing until the work starts. Also, the way the helpers start decides how long the team waits for its report.

Here is where we are. The store's team built a research assistant on the Agent SDK. It answers one big question: why are lamps returned so often? It has a coordinator in the middle and four subagents around it. They are web search, document analysis, synthesis and report. The coordinator's plan is ready, and every area of the topic has an owner. Now the coordinator must start its helpers.

The most important thing to remember is this: the coordinator starts a subagent by calling a tool. We look at three things. First, the Task tool. Second, the agent definitions. Third, running subagents in parallel.

First, the Task tool. To the coordinator, a subagent looks like a tool. When the coordinator wants help, it asks for the Task tool. ShopAssist asks for lookup order in exactly the same way. The input names the subagent to start, and it gives that subagent a prompt with its job. The SDK then starts the subagent. The subagent works in its own loop, with its own tools. When it finishes, its final answer comes back to the coordinator as a tool result.

Task is the exam's name for this tool. Current releases of the SDK call it Agent. Both names are on screen. On the exam, answer Task.

You met the allowed tools option earlier. It lists the tools an agent may use. For the coordinator, that list must include Task. We should not leave it out. Without Task, the coordinator can still plan, and it can even write that it hands work to a helper. But it cannot start a single subagent. The coordinator's configuration is on screen. Notice Task in its list of allowed tools.

Second, the agent definitions. Each type of subagent gets its own agent definition. That is the exam's name for this configuration. It has three main parts. The description says what this subagent does and when to use it. The coordinator reads it to choose the right helper, just as Claude reads a tool description. The system prompt gives the subagent its role and its rules. For document analysis, it says: read the store's support tickets and supplier reports, and give every finding its source and its date. The tools field limits which tools this subagent may use. We decide what goes into that list in the next lesson.

The definitions for web search and document analysis are on screen. The description and the prompt are required. The tools and the model are optional. So the coordinator has one definition for each helper, and it starts them all through one tool.

Third, parallel subagents. Web search and document analysis do not depend on each other. One reads the web. The other reads the store's own files. So the coordinator puts two Task calls in one response. The SDK runs both subagents at the same time. Both results come back together, in the next message to the coordinator. ShopAssist did the same thing when it called lookup order twice in one response. Here it happens one level higher.

Now compare that with separate turns. The coordinator asks for web search and waits for the result. Only then does it ask for document analysis. Assume each subagent needs several minutes. Then the waiting times add up, and the report comes much later. We should not start independent subagents one turn at a time. Put their Task calls in a single response.

Synthesis is different. It needs the findings from both searches. So the coordinator starts it in a later turn, after both results are back. The report subagent comes after synthesis, for the same reason. Only independent work runs in parallel. Work that needs earlier results waits for them.

Each Task call also carries its own prompt. What goes into that prompt is a separate topic, and we come back to it soon.

Let's review the main points. The coordinator starts a subagent by calling the Task tool, which current releases call Agent. The coordinator's allowed tools must include Task, or it cannot start any subagent. Each type of subagent has an agent definition with a description, a system prompt and its tool restrictions. Several Task calls in one response run in parallel. Task calls in separate turns run one after another.

So define each helper once, give the coordinator Task, and start independent helpers together in one response.

Next, we decide which tools each helper gets.
