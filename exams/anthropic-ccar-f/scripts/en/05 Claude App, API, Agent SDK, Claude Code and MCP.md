# 5. Claude App, API, Agent SDK, Claude Code and MCP

Claude knows only what one request carries. If that idea is new to you, the optional lesson "What Claude Sees in a Request", at the end of the course, explains it. Now let's look at the different ways a request can reach Claude.

This lesson is about five Claude products and what each one is for. This matters because the exam names these products in every scenario. The rest of this course names them too.

The simplest way to tell them apart is one question: who does the work? A person chatting with Claude uses the Claude app. Your program uses the Claude API. A program that runs an agent uses the Agent SDK. A developer working on code uses Claude Code. And MCP connects Claude to other systems.

We look at each one in turn. Then we put all five on one picture of ShopAssist.

First, the Claude app.

People use this product directly, in a browser, on a desktop or on a phone. You type a message, and Claude answers in the chat.

The app also has Projects. A Project is a place in the app that keeps instructions and files together for one topic. You can upload files to it. You can also link the app to other services you use. For example, it can work with a shared drive or an email account.

The app is good for people doing their own work: writing, analysis and research. But none of your own code runs behind it. So the app is not the place where ShopAssist runs. Alex never opens the Claude app. Alex opens the store's website.

Second, the Claude API.

This is how a program talks to Claude. Your code sends a request with instructions, the conversation, and sometimes tool definitions. Claude sends back a response. That response can be text, structured data, or a request to use a tool.

ShopAssist is built on the API. Our application, the program behind the store's chat window, sends every request. It also keeps everything that Claude does not keep: the conversation history, the customer's account, the checks and the rules. The API gives you Claude. Everything around Claude is still your code.

Third, the Agent SDK.

An SDK is a library, a ready package of code that you add to your own program.

A real support case often needs several steps. Claude asks for a tool. Our code runs it and sends back the result. Then Claude decides the next step. This repeats until the task is done. This repeating cycle is called the agent loop. With the plain API, you write this loop yourself.

The Claude Agent SDK runs it for your code. It comes with built-in tools, for example for reading files or running commands. It lets one agent start helper agents, called subagents. It gives you hooks. A hook is your own code that runs before or after a tool call, so you can check or change that call. The SDK also keeps sessions, so a conversation can continue later. And it connects to MCP servers.

Later in the course, ShopAssist moves onto the Agent SDK.

Fourth, Claude Code.

Claude Code is an agentic coding tool, which means it does coding work by itself, step by step. It works inside a code base. It reads files, edits code, and runs tests and commands. Developers use it in the terminal and in their code editor, also called an IDE.

Claude Code can also run in CI. CI is the set of automatic checks that run on every code change. Nobody sits at the keyboard there, so Claude Code runs non-interactively. It gets one task, does it, prints the result and stops.

Claude Code runs on the same kind of agent loop as the Agent SDK. The difference is who it serves. The Agent SDK is for agents inside your product. Claude Code is for the people who build the product.

So Claude Code is not where ShopAssist runs. It is the tool the ShopAssist team uses to write and review ShopAssist's code.

Fifth, MCP.

The letters stand for Model Context Protocol. In software, a protocol is a shared set of rules for how two programs talk. MCP is the standard way to connect tools and data sources to Claude.

A system offers its tools once, through an MCP server. Then any program that speaks MCP can use them: the Claude app, Claude Code, or an agent built with the Agent SDK.

So MCP is not a separate place where Claude runs. It is the connection between Claude and your systems. We look at what an MCP server offers later in the course.

Now let's put the picture together.

Alex types a question on the store's website. Our backend sends it to Claude through the API. When a case needs several steps, the Agent SDK runs the loop. The store's tools, like get customer and lookup order, are served through an MCP server. And the developers who build all this use Claude Code, at their desks and in CI.

That is five products in one system, and each has its own job.

The exam uses the same vocabulary. Its six scenarios are on screen now. The support agent is built on the Agent SDK, with its tools served through MCP. The code generation scenario is a team using Claude Code. The research system is built on the Agent SDK. The developer productivity tool uses the Agent SDK too, with built-in tools and MCP servers. The CI scenario runs Claude Code in a pipeline. And the extraction scenario calls Claude through the API.

Let's go over the main points again.

People use the Claude app. Programs use the Claude API. The Agent SDK runs the agent loop for your code, with tools, subagents, hooks and sessions. Claude Code is the coding tool for developers, and it also runs in CI. MCP connects tools and data to all of them.

So when a question names a product, ask who does the work.

Next, we look at what turns a program that only answers into one that acts.
