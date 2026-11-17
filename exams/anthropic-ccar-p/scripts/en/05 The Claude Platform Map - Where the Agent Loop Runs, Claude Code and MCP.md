# 5. The Claude Platform Map: Where the Agent Loop Runs, Claude Code and MCP

We now know what goes into one request to Claude. But a real assistant needs more than one request. Think of a customer who wants to return a jacket. The assistant looks up the order, then starts the return, then answers. Something has to run those requests in order.

This lesson answers one question: what does it take to turn a Claude model into a working assistant? The answer is a map of the Claude platform, and the rest of the course comes back to it.

The map has four parts. First, the model families. Second, the loop that turns a model into an agent. Third, the three places where that loop can run. Fourth, two building blocks that connect tools and instructions to it.

First, the models.

Claude comes in four families, and each one has a role. Haiku is the fast, low-cost family. It handles simple steps, such as sorting messages by topic. Sonnet balances speed and intelligence. It fits most everyday production work. Opus is for hard reasoning and long agent work. Fable is the most capable family, at a premium price.

Choosing between them is a topic of its own, later in the course. For now, keep one fact in mind. All four are models. None of them is an agent by itself.

Second, the loop.

Earlier we saw that the model cannot run a tool. It can only ask for one, and our application runs it.

Now let's follow the customer with the jacket. The model asks to look up the order. Our code runs the lookup and sends the result back. The model reads the result and asks to start the return. Our code runs that step too. Then the model writes its answer to the customer, and the cycle stops.

This cycle is called the agentic loop. The model asks, the code acts, and the result goes back. Then the model decides the next step. The loop repeats until the model says it is done.

So an agent is not a special model. It is an ordinary model inside this loop, with tools it can ask for. Some people believe agents need their own kind of model. That is wrong. The same Sonnet model can answer one question or drive a long loop. What changes is the code around it.

Third, where the loop runs.

Someone has to write that loop and run it on a computer. There are three choices.

The first choice is our own code that calls the Claude API directly. One request goes in, and one answer comes out. We write the loop around those calls ourselves. We decide every step, every tool and every check. That gives us full control. It also gives us all the work. ShopAssist, DemoShop's support assistant, is built this way. DemoShop's own code sends each request, runs the order tools and enforces the rules.

The second choice is the Agent SDK. SDK stands for software development kit: ready-made code that we add to our own program. The Agent SDK gives us a finished loop. It comes with ready tools, for example for reading files and running commands. It runs inside our program, on our own servers. We write less code, but we still run it and own it.

The third choice is Managed Agents. Here Anthropic runs the loop for us, on its own servers. Each session gets a closed space there. In that space, the agent can run code and keep files. We send the task and read the result. Managed Agents is a beta product.

So when would DemoShop pick it? Let's assume the platform team, which builds and runs ShopAssist, gets a new kind of task. It is a long job that reads many files and runs scripts for an hour. The team does not want to build and run servers for that. Then Managed Agents could fit.

But the head of security, who is responsible for privacy at DemoShop, will first ask where the data is kept. The answer is on Anthropic's side. The sessions stay there until we delete them. So the head of security has to agree before that job touches any customer data.

That example shows the general trade-off of the three choices. The further down the list we go, the less code we write and run ourselves. We also control less, such as where the data sits and how each step works.

Notice one thing that stays the same. The model can be the same in all three places. Only the home of the loop changes.

Fourth, the building blocks.

The first one is MCP, the Model Context Protocol. It is the standard way to connect tools and data to any program where Claude works. A team builds a tool once in this standard form. Then every program that supports MCP can use it, and there is no second copy to keep in sync.

One such program is Claude Code, Anthropic's agent for developers. It works in the terminal, the window where developers type commands, or in the code editor. DemoShop's developers use it to change the ShopAssist code, and customers never see it. Claude Code runs the same kind of loop. It asks for a tool, such as reading a file, and its own code runs it.

The second building block is Skills: packages of instructions that Claude loads only when a task matches their short description.

For the exam, the guide recommends studying the official documentation for the Claude API, the models, prompt engineering, MCP and Skills. This map shows where each of them sits.

Let's sum up.

Haiku, Sonnet, Opus and Fable are model families with different roles, and none of them is an agent by itself. An agent is an ordinary model inside a loop. The model asks, the code acts, and the result goes back. That loop runs in our own code on the Claude API, in the Agent SDK, or in Managed Agents on Anthropic's servers. The further down that list, the less code we write and the less we control. MCP connects a tool once for many programs. Skills load their instructions only when a task needs them.

The practical rule: when you hear "agent", do not ask which special model it uses. Ask where its loop runs and who owns that code.

Next, we start the design itself: we turn a request for an AI chatbot into a business problem we can solve.
