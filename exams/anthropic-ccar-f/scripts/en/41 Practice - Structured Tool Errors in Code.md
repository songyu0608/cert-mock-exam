---
lab: true
---

# 41. Practice: Structured Tool Errors in Code

Earlier, we built the agentic loop: Claude asks for tools, and our loop runs them. So far, every tool call in it has worked.

Real tools fail. A customer gives an order ID that does not exist, or asks for a return that the policy does not allow. Today we decide what a tool returns in both cases, so that neither Claude nor the customer is left without an answer.

Here is the plan. When the order ID does not exist, lookup order answers found false. That is a normal answer, not an error, and Claude asks the customer for the right ID. When the policy says no, start return refuses with a structured error: that the call failed, why, and whether to try again. Claude reads it and tells the customer.

We start from the loop script, saved as tool errors dot py. It has the two tools, the Python functions behind them, and at the bottom, the loop that runs for one fixed message.

First, the policy moves into the tool. A prompt is advice, but a tool is code that runs every time. So the line about the thirty-day window goes away. Instead, the prompt now says that the start return tool checks the return policy, and that Claude must not judge it by itself. Then, as before, answer in one or two sentences.

Next, an order that breaks the policy. We add a second order ID. The item is a lamp. Its status is delivered, and it was delivered forty-five days ago, which is past the thirty-day window.

Now the loop at the bottom. It handles one fixed message, and we want to try two cases. So the loop becomes a function, and first we remove the old loop and its message. Def handle, with the customer's text. The conversation starts with that text, as a user message. The loop inside is the one we built before, so I paste it: the same request, the same check of the stop reason, and the same run of each tool. After each tool runs, we print its name and what it returned, so we can see every call. The tool result block is the same as before, so I paste it too. And we close it. Then the results go back into the conversation, and the loop goes round again. When the loop ends, we print Claude's text, with the name ShopAssist in front.

At the bottom, this line runs the cases only when we start the file directly. The first case is an order ID that does not exist. The second case is the lamp.

Before we change any tool, let's see what the tools do today. Let's run it. The first case goes to Claude, together with the two tools. The answers are long, so let's make the terminal bigger. For the unknown order, lookup order returns a dictionary with an error key: order not found. Claude asks the customer to check the ID.

Now the lamp. Claude may look the order up first, but then it calls start return. And our tool simply starts the return. Claude gives the customer the label number, for a lamp delivered forty-five days ago.

Nothing in our code checked the window. That is the real problem. The second one is quieter: the lookup calls a missing order an error, but nothing went wrong. The order simply does not exist.

So we start with the quiet one. Not found is not an error. It is a normal answer, just an empty one. So we write the body of lookup order again. First, we take the order from the dictionary. If there is no such order, we return found false, and a short message: no order with this ID. Otherwise we return found true, and the order itself.

Let's run it again. The same two cases go to Claude. The unknown order now gives found false, with our message. Claude still asks the customer to check the ID, and nothing in the result says that something broke. But the lamp still gets a return label. That is the next step.

A refusal is different. Here the tool must say no, and say it in a way Claude can use. Our answer will tell Claude three things: that the call failed, why it failed, and whether trying again helps. And it carries two messages: one that is safe to show the customer, and one for the developer.

The start return function is right below lookup order. Before it starts anything, it looks up the order. To keep this short, we assume the order exists. A real tool would answer a missing order here the same way lookup order does. If it was delivered more than thirty days ago, the tool returns a structured error. It is a dictionary with five fields. Is error, true. The call failed. Error category, business. The policy said no, and nothing is broken. Is retryable, false. Asking again will not help. A customer message, which is safe to show: this order is past the thirty-day return window. And a developer message for the logs, with the real number of days, so a developer can see exactly why the tool said no. Then we close the dictionary. Inside the window, the return starts as before.

One more field goes down in the loop, in the tool result: is error. Our dictionary is what Claude reads. This flag is how the API itself marks a failed tool call, so we set it to true when our output says the call failed.

Let's run it one more time. Both cases go to Claude again. The unknown order gives found false, as before. For the lamp, start return refused. Look at the fields. The category is business, and it is not retryable. Claude told the customer that the return window has passed, as the customer message says.

One more thing to know. Claude reads the whole tool result, the developer message too, not just the part meant for the customer. So anything in a tool result can reach the customer. Keep secrets out of it.

Let's bring the editor back. Here is what happened with the lamp. Claude asked for start return with the lamp's order ID. The tool checked the date and refused with a structured error: category business, not retryable. Claude read the result and answered the customer.

It is tempting to raise an exception in the tool and let the loop crash, or to return a short text like failed. A structured error tells Claude three things at once: that the call failed, why it failed, and whether trying again makes sense.

So the practical rule: not found is data, not an error. A real failure is a structured error, with a flag, a category, a retryable flag, and two messages: one for the customer, and one for the developer.
