---
lab: true
---

# 43. Practice: BUILD - Backend Tools and an MCP Server

Earlier, we gave our tools clear answers for failures: not found is data, and a refusal says why. But both tools still live inside one script, and only that script can use them.

Today we move them into an MCP server, and Claude Code uses them. Behind a server that speaks the Model Context Protocol, or MCP, the same tools serve any client: Claude Code, the Claude app, or our own agent.

Here is the plan. Claude Code starts our server as a separate program, and talks to it over standard input and output. It asks for the list of tools. The server answers with their names, descriptions and inputs. When Claude decides to use one, Claude Code sends the call to the server. The server runs the function, and the result goes back. We build it in two steps. First a server with one tool, connected to Claude Code. Then the second tool.

We start with an empty file, MCP server dot py. First, we import json. We need it for a small log. Then, from the MCP library, we import the server class, MCP server. In older examples, the same class is called Fast MCP. We create our server, and we give it a name: shopassist. This is the name the server reports about itself.

Now the orders, the same two as before: the jacket and the lamp. I copy them from our tool errors script. We also keep a tiny log, so we can watch the server work. Def log takes the tool name and the order ID. It opens a file in the trace folder, and adds to the end of it. The line is a small piece of JSON: the event, the tool, and the order ID. The trace page on the right reads this file, so every tool call shows up there.

Now the first tool. In this library, a tool is a plain Python function with a decorator. The line with the at sign, server dot tool, turns the function below it into a tool. The function is lookup order. It takes the order ID, a string, and returns a dictionary. The docstring says what the tool does, and what comes back, in plain words, the way we wrote tool descriptions before. First, the tool writes a line to our log. The rest is the lookup order body from our tool errors script, so I paste it.

The last two lines start the server when the file is run. Server dot run, with standard input and output as the transport. That is how Claude Code talks to a server on the same computer. So now we have a server with one tool.

Next, we connect it to Claude Code. In the terminal, claude mcp add registers the server for this project: the name shopassist, two dashes, and the command that starts it. Claude Code says it added a server to the local config. Local means it is private to you, in this project. Next, we check it with claude mcp get, and the name of our server. The status is connected. Claude Code started our file, and the server answered.

Now a question for Claude Code in print mode. We type claude dash p, a question about the jacket's order, and two flags that we look at in a moment. Claude Code starts our server, and asks it for its tools. Claude sees lookup order, and calls it with the order ID. Watch the trace on the right: one call, with the order ID. Print mode shows only the final answer, so we wait for Claude to finish. And the answer: the jacket was delivered twenty days ago. That came from our server. Claude Code asked it, and our function answered.

Notice that we never wrote a tool definition for this server. The library made it from the function. The tool's name comes from the function name. Its input comes from the type hint. And its description comes from the docstring. That is the text Claude reads to decide when to use the tool.

Two flags made this run safe. Tools, with an empty list, switched off Claude Code's own tools, like reading files. Only the tools of our server were left. And allowed tools approved lookup order in advance. In print mode, nobody is there to say yes, so a tool must be allowed before the run.

Now the second tool, start return. It goes under lookup order, above the lines that start the server. Again the decorator, and a function that takes the order ID and returns a dictionary. Its description says it starts a return inside the thirty-day window, and returns the label number. It logs the call. The rest is our start return body from before, with its structured error, so I paste it too. Its fields, is error, the category, whether a retry helps, and the two messages, are our own contract with Claude, inside the result the tool returns.

We do not register the server again. In print mode, Claude Code starts it fresh for every run, so it finds the new tool by itself.

Now the lamp. We ask Claude to call start return for it, and to show us exactly what the tool answered. This time we allow only that one tool, the one this task needs. Claude Code starts the server again, and Claude calls start return with the order ID. Our tool checks the delivery date. Forty-five days is past the window, so it refuses. The trace on the right shows the new call. Each line there comes from our log function, written by the server itself. This answer takes a little longer, because Claude also explains the result.

Here is the answer. Claude shows us exactly what the tool returned. Is error is true. The category is business, and retry is false. And the message for the customer: this order is past the thirty-day return window. So the store's rule lives in our server. Claude Code only passed on what the tool said.

Here is what happened for the lamp. Claude Code asked our server to start the return for the lamp's order. Our function checked the date, forty-five days, and refused with the structured error. And Claude Code turned that reply into its answer.

It is tempting to think MCP is only for other people's services, like a database or a ticket system that someone else runs. It is also the cleanest way to share your own tools: one server, one contract, and every Claude client can use it.

So the practical rule: put your tools behind an MCP server, with clear names, typed inputs and good descriptions. Register the server with the client. And allow exactly the tools the task needs.
