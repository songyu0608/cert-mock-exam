---
lab: true
---

# 36. Practice: The Agentic Loop in Code

Earlier, our script made one tool call: Claude asked for lookup order, our code ran it, and Claude answered. But many requests need more than one tool.

Today the customer writes: I want to return the jacket from this order. ShopAssist must look up the order first, check the date, and only then start the return. The code that lets Claude use tools in a row until the job is done is called the agentic loop. This matters because most real requests take more than one step, and the exam expects you to read this loop.

Here is the plan. Our code sends the conversation and the tools to Claude, and the reply comes back with a stop reason. If the stop reason is tool use, our code runs the tools Claude asked for. Then it sends the results back, and asks Claude again. When the stop reason is end turn, the loop ends, and the customer gets the answer. We build it in three steps: the tools, then the first half of the loop, then the second half.

We start with an empty file, agent loop dot py. The top is the same as in our tool call script, so I paste it. It has the setup, the model name, and the start of the system prompt: who Claude is, and the return rule. One line is new. It tells Claude to use the tools to look up orders and to start returns. So Claude knows it is expected to act, not only to talk. And the answers stay short. The order database is the same small dictionary as before, so I paste it too: one jacket, delivered twenty days ago.

Now the tools. This time there are two, so the list called TOOLS gets two dictionaries. The first one is the tool we already know, lookup order, so I paste it. Only its schema is shorter now, with the order ID on one line.

The second tool is new. Its name is start return. Its description says when the tool may be used: for a delivered order that is inside the thirty-day window. And it says what comes back: the return label number. The input is the same as for the first tool, so I copy it: one required order ID. Then we close the second tool, and the list.

Now the functions behind the tools. Lookup order is the same as before. Start return is new, and it is just as short. In a real shop, it would create the return in a database. Here it just gives back a label number and the order ID. Then a small map from tool names to functions, called tool functions. Claude asks for a tool by its name, and this map turns the name into our function. The name lookup order points to our lookup order function, and start return points to start return.

Before Claude gets involved, let's check the map. We take lookup order from it by its name, call it with our order ID, and print the result. And the same for start return, with the same order ID, so we can see the label it gives back.

Let's run it. The first line is the jacket, delivered twenty days ago. The second line is the return label. So our code can run either tool when it knows only the name. That is exactly what the loop will need. We do not need these two lines anymore, so let's remove them. So now we have the prompt, the order, two tools and their functions.

Next, the customer's message and the first half of the loop. The conversation starts with one user message, as before: the customer's return request, with the order ID at the end. Now the first box of the picture, ask Claude, inside a loop. First, a counter, so we can see which turn we are on. Then while true. This loop runs again and again, until we break out of it. Each turn, the counter goes up by one. Then we call Claude, the same call as before. Only max tokens changes: five hundred, a bit more room than before. The rest goes in as usual: the effort, the system prompt, the tools, and the whole conversation so far. We print the turn number and the stop reason, so we can follow the loop in the terminal.

Now the most important line. If the stop reason is anything other than tool use, Claude is not asking for a tool. So we break out of the loop. Here we expect end turn, which means Claude has finished. A real system also handles the other stop reasons, for example max tokens, when a reply was cut off. When Claude does ask for tools, we go through the blocks of its reply. For each tool use block, we print the word run, the tool's name and its input. The part that runs the tools comes next. For now, we stop after the first turn.

Let's run it again. Our script sends the question and both tools to Claude. Turn one: the stop reason is tool use. And Claude asks for lookup order, with our order ID. Our print puts the word run in front of that line, but nothing has run yet. Our code only printed what Claude asked for, and then stopped. Without a result, Claude cannot go on.

Now the second half, the part of the picture that runs the tools. First, Claude's reply goes into the conversation. Then our code runs every tool Claude asked for, and collects the results. All the results go back in one user message. Then the loop starts the next turn, and Claude sees everything so far.

Right under the check of the stop reason, Claude's reply goes into the conversation, exactly as it came. Then we start an empty list for the results. One reply can ask for more than one tool, so we collect them all. Inside the loop over the blocks, after the print, we run the tool. We find the function by the tool's name in our map. Then we call it with a double star and block dot input, as in our tool call script. We add a tool result to the list, with the tool use ID and the output, just like in our tool call script. And instead of stopping, the results go back to Claude in one user message. Then the while loop starts the next turn. When the loop ends, we print the text of the last reply, as before. That is the answer for the customer.

Let's run it one more time. This time the loop can go round several times, so let's make the terminal bigger. Turn one: tool use, as before. Claude asks to look up the order. This time our loop runs it, and sends the record back. Turn two: tool use again. Now Claude knows the jacket was delivered twenty days ago, inside the window. So it asks to start the return. Turn three: end turn. Claude has finished. Its answer tells the customer that the return is started, and gives the label number.

Here is what just happened. Turn one: our script sent the question with the tools, and Claude asked for lookup order. Our loop ran it and sent the record back. Turn two: Claude asked for start return. Our loop ran it and sent the label back. Turn three: Claude answered with end turn, and the script printed the reply.

It is tempting to think Claude ran the two tools. It did not. Claude decided which tool to call, and in what order. Our loop ran them, and our loop decided when to stop, by reading the stop reason. If the loop forgot to send the results back, Claude would never see them.

So the practical rule: send the conversation with the tools, read the stop reason, run every tool use block, return every result with its ID, and repeat until the stop reason is end turn.
