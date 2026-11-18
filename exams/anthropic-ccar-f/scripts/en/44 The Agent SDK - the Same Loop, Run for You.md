# 44. The Agent SDK: the Same Loop, Run for You

So far, ShopAssist's four tools sit behind the store's MCP server, and our own code runs the agentic loop.

This lesson is about the Claude Agent SDK, a library that runs that loop for us. This matters because the exam's support agent, its research system and its developer tool are all built on the Agent SDK.

Let's start with where ShopAssist is now. ShopAssist is the support assistant we are building for an online store. Until now, we wrote the loop by hand. Our code sends the conversation and reads the stop reason. It runs the requested tools, adds the results and calls Claude again. That code works. But every agent needs the same code, and it also needs a place for the store's rules. Before ShopAssist meets real customers, we hand the loop to the SDK.

The most important thing to remember is this: the SDK runs the loop. But your code still decides what the agent may use and which rules hold. We look at three things. First, the loop. Second, the tools. Third, hooks. At the end, two more parts of the SDK get a short mention.

First, the loop. In the SDK, you start the agent with one function, called query. You pass it the customer's message and a set of options. Then query does the work our loop did. It sends the request to Claude. When the stop reason is tool use, it calls the requested tools and sends the results back. It keeps the full history between rounds. When the stop reason is end turn, it gives us the final answer. Along the way, it also hands each step to our code as a message, so we can log the whole case.

On screen, the same ShopAssist agent is written both ways. Notice how much of the hand-written loop is gone. One thing has not changed. Claude still decides which tool to call next. The SDK does not choose for Claude. It only does the work around each choice.

Second, the tools. The SDK comes with built-in tools. They read and write files, search text and run shell commands. A developer's agent needs them. ShopAssist does not. The agent can also connect to MCP servers, so we connect it to the store's server with our four tools.

Then we set one more option, called allowed tools. It is the list of tools this agent may use. Python writes the same option with an underscore, and both forms are on screen. For ShopAssist, the list holds only get customer, lookup order, process refund and escalate to human. We should not give a support agent every tool the SDK has. A shell command has no place in a refund conversation. Each extra tool also makes Claude's choice harder. So give the agent the tools its job needs, and nothing more.

Third, hooks. A hook is your own function. The SDK calls it at a fixed point in the loop. One kind runs before a tool call. It can allow the call, block it or change its input. Another kind runs after a tool call. It can change the result before Claude sees it. Their exact names are on screen.

Why does this matter? Take the store's rule that refunds above five hundred dollars go to a person. We could write that rule in the system prompt. But a prompt is text, and Claude follows text most of the time, not every time. A hook is code. It sees every process refund call before the call runs, and it does this every time. So the prompt guides Claude, and the hook enforces the rule.

Now the two other parts. A subagent is a helper agent. The main agent starts it for one part of a bigger task. Each subagent is defined with a description and a prompt. The SDK also keeps sessions. A session holds an agent's conversation, so the work can continue later or split into a separate copy. Their exact names are on screen.

Let's recap. The query function runs the same stop reason loop for you. Claude still decides each next tool. You choose the built-in tools and the MCP servers, and allowed tools sets what the agent may use. Hooks are code that runs before and after each tool call, so they enforce rules that a prompt can only suggest. Subagents and sessions come with the SDK too.

So let the SDK run the loop. Put your effort into the two things it does not decide for you. Those are the tools the agent may use and the rules it must follow.
