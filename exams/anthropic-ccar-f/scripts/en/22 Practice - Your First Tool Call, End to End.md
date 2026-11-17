---
lab: true
---

# 22. Practice: Your First Tool Call, End to End

So far, ShopAssist answers from its system prompt alone. It knows the return rule, but it cannot see a single order. Today we give it its first tool, a function that looks up an order, and we follow one tool call from start to finish. A support assistant that cannot look at an order can only talk about policy.

Here is the round trip we build. Our script sends the customer's question to Claude, together with a description of the tool. Claude does not answer yet. It stops and asks for the tool, with an order ID. Our script runs the function and sends the result back. Only then does Claude answer the customer. We build it from our side first: the tool, then the request, then the way back.

We start with an empty file, tool call dot py. First, we import json. We do not need it right away. Later, it turns a Python result into text for Claude. The rest is the setup we always use, the same as in our conversation script, so I copy it from there. We load the key from dot env, create the client, and name the model. The system prompt comes from there too: ShopAssist, the thirty-day return rule, and short answers.

A tool is two things: a function in our code, and a description that Claude reads. We start with the function, and with the order it looks up. A real shop would ask its database. For us, a small dictionary is enough. We call it ORDERS. The key is the order ID. And the value holds the facts about this order. The item is a jacket. Its status is delivered. And it was delivered twenty days ago.

Now the function. It is plain Python. We call it lookup order, and it takes the order ID. It returns ORDERS dot get, with the order ID. If the order exists, we get its facts. If it does not, we get a small dictionary with an error: order not found. So even a wrong ID gives Claude an answer it can read.

Before Claude gets involved, let's check the function on its own. We print lookup order with our order ID. And once more with an ID that does not exist. Let's run it. The first line shows the jacket, delivered twenty days ago. The second line shows the error. The function works, and Claude was not part of it. It is just our code. We do not need these two test lines anymore, so let's remove them.

Now the other half of the tool, the description. Here is the key idea. Claude never sees our Python function. It only sees a description of it. So the description is data, in a list we call TOOLS, right after the orders.

Our list holds one tool. First, the name: lookup order. When Claude wants the tool, it asks for it by this name. Then the description. Claude reads this sentence to decide when the tool is useful, so we write it with care. The tool looks up an order by its ID. And we say what comes back: the item, the status, and how many days ago it was delivered.

The last part is the input schema. It tells Claude what to send when it asks for the tool. The input is a set of named fields. Then we list the fields. We need only one, the order ID. It is a string. And its description gives an example, so Claude knows what an order ID looks like. And we say that the order ID must always be there. And we close the schema, the tool, and the list.

That is the whole definition. It is not code that runs. Claude reads it the way a developer reads documentation.

Now the first step of the round trip: the question goes to Claude, with the tool. Under the function, we keep the conversation in a list called messages. It holds one user message, the customer's question: can I still return the jacket from this order, with the order ID at the end.

Now we send it. Response equals client dot messages dot create. It gets the parameters we know: the model, max tokens of three hundred, low effort, and our system prompt. And now the new line: tools equals TOOLS. This is how Claude learns that the tool exists. Without this line, it could never ask for it. Then the messages, the conversation so far. After the call, we print the stop reason.

Let's run it again. The question goes to Claude, together with the tool. The stop reason is tool use. It is tempting to think the order has been looked up. But nothing has run yet. Claude has stopped, and it is asking us to run the tool.

So the next step of the round trip is ours: we read Claude's request and run the function. Claude's reply is a list of blocks, so we go through it in a loop: for block in response dot content. If the block type is tool use, this block is Claude's request. First, we print what Claude asks for: the tool name, and the input it chose. Then we call our function. Result equals lookup order, with a double star and block dot input. The input is a dictionary, and the double star turns it into named arguments. So the order ID that Claude chose goes straight into our function. And we print what our code returns.

Let's run it once more. Again, the question goes to Claude first, and Claude stops with tool use. Claude asks for lookup order, with our order ID. And our function returns the jacket, delivered twenty days ago. So our script has run the tool. But Claude has not seen the result yet. That is the last step.

Now the result goes back to Claude. That takes two new messages in the conversation, and one more call. We are still inside the loop. Messages dot append adds a message to the end of the list. The first one is Claude's own reply, exactly as it came: role assistant, content response dot content. We do not change it.

The second message is ours, with the role user. Its content is a list with one block. The block type is tool result. This is how a result goes back to Claude. It carries the ID of Claude's request, block dot id, so Claude knows which request this result answers. That is also why Claude's reply goes in unchanged. The API checks that every tool result answers a tool use in the message just before it. And the content is the result, turned into text with json dot dumps. That is why we imported json at the start.

And now the call that sends it all back. Final equals client dot messages dot create. It takes the same parameters as the first call, so I paste them: the model, the limit, the effort, the system prompt and the tools. Only the messages are different. The list now holds three messages: the question, Claude's request, and our result. Then we print the stop reason of this second reply. And we print its text, with the loop we know from our conversation script.

Let's run it one last time. This time, the script makes two requests to Claude, one after the other. First come the lines we know: tool use, Claude's request, and our result. Then the second reply. The stop reason is end turn, so Claude has finished. And its answer uses the real data: delivered twenty days ago, so there are about ten days left to return it.

So here is the whole round trip. Request one carries the question and the tool. Claude stops with tool use, and asks for lookup order. Our code runs the function and gets the record. Request two carries the same conversation, plus Claude's request and our result. Claude stops with end turn and answers the customer.

So the practical rule: a tool call is a round trip. Claude asks with a tool use block. Your code runs the function and answers with a tool result. Only then does Claude answer the customer.
