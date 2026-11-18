---
lab: true
---

# 61. Practice: Coordinator and Subagents in Code

A customer writes that they were charged twice for an order. Two kinds of work are mixed in that one message: checking the order, and fixing the billing. Earlier, we built one agent with a loop and a few tools. One agent with every tool and every instruction grows confused and expensive, so today we split the work between a coordinator and two small agents.

Here is the plan. The customer's message goes to the coordinator. The coordinator has no data tools, so the only thing it can do is delegate. It asks the order agent to check the order, and gets back a short report. Then it asks the billing agent to fix the charges, and passes that report along. The billing agent reports what it did, and the coordinator answers the customer. We build it from the bottom up: the code that runs an agent, then the order agent, the billing agent, and the coordinator last.

We start with an empty file, coordinator dot py, and I paste the setup we always use: json, the key from dot env, the client, and the model name. All three agents use the same model. One more line: an empty dictionary called FUNCTIONS. Like the map in our loop script, it connects tool names to our Python functions. Each agent's part of the file will add its own functions to it.

Our agents need five tools in total, and each tool definition takes several lines. So first, a small helper that builds one. Def make tool, with a name, a description, and the fields of the input. It returns the shape we know from our tool definitions: the name and the description, and the input schema. The input is an object, and its properties are the fields we pass in. And every field is required. List of fields gives us the names of the fields.

Let's check the helper before we use it. We print the tool it builds for lookup order, with one field, the order ID. Let's run it. It prints the familiar shape: the name, the description, and the input schema. And the order ID is in the required list, because every field we pass is required. That is exactly what Claude expects, so we remove the test lines.

Now the part every agent runs on: def run agent, with a name, a system prompt, a list of tools, and a task. In the picture, each agent is this one function with different arguments. The conversation starts with the task, as one user message. This matters: every agent starts with an empty conversation, and it knows only this task. The rest is the loop we built before, so I paste it. The only difference is that it sends this agent's own system prompt and tools. One line is new, right after the tool has run: we print the agent's name in square brackets, then the tool and its input. So we can see which agent does what. I paste the end of the loop too: the results go back to Claude, and the loop goes round again. When the loop ends, we return the text of the last reply, with the familiar loop over the blocks.

Now the first agent of the picture, the order agent. Its data is a dictionary called ORDERS. It holds one order: a lamp, delivered forty-five days ago, that cost sixty dollars. Lookup order returns the order, or an error when there is no such order. We add it to our map, under its name.

Then the order agent's tools, built with our helper. It gets only one: lookup order, with the order ID as a string. And the order agent itself. It is just run agent, with its own arguments. Its name is order. Its system prompt says: you check orders, and you report the item, the status and the delivery age in one sentence. It gets only the order tools, and its task is one line: check this order.

Before we go on, let's try this agent on its own. We print what it reports for our order. Let's run it again. Our script gives the order agent its task, and the agent asks Claude what to do. The order agent called lookup order, and the line starts with its name in square brackets. Then its report, in one sentence: a lamp, delivered forty-five days ago. The first agent works on its own. We do not need the test line any more, so let's remove it.

Now the billing agent. Its data is a second dictionary, CHARGES, with the payments for each order. Our lamp has two charges, both sixty dollars, both on day one. That is the double charge. List charges returns the charges of an order, or an empty list. Refund charge takes an order ID and an amount. It only pretends, and returns what it refunded. A real shop would call its payment system here. Both functions go into our map, each under its own name, so the loop can find them when Claude asks for them.

The billing agent gets two tools, built with the same helper. First, list charges, with an order ID. Then refund charge, with an order ID and an amount, which is a number. Notice that the order agent cannot refund anything. It simply does not have that tool.

The billing agent itself takes more: the order ID, and the facts it should know. Its name is billing. Its system prompt says: you fix billing problems, refund only a duplicate charge, and report what you did in one sentence. It gets the billing tools. And its task starts with the facts, then asks it to check the charges of this order and fix any duplicate.

Let's try this agent on its own too, with two short facts: a lamp, sixty dollars. Let's run it with the billing agent. The billing agent gets the facts and the task, and starts its own loop. It listed the charges of the order, and it refunded one of them, sixty dollars. Its report says that it found two identical charges and refunded one of them.

It is tempting to think a subagent can see what the other agents know. It cannot. It starts empty, with only the task text it was given. Here, the facts came from our test line. In the real flow, the coordinator must pass them. So we remove the second test line too.

Now the last part of the picture, the coordinator. Here is the trick. To the coordinator, each agent is just a tool. When Claude asks for the tool called billing agent, our loop runs the billing agent function, and that function runs a whole agent. Its report comes back to the coordinator as the tool result. So first, both agent functions go into our map, like any other tool function.

Then the coordinator's tools. The first is the order agent: check an order, with an order ID. The second is the billing agent. Its description says: check and fix the charges of an order, and pass the order facts you already have. This sentence tells the coordinator to hand over what it knows. Its input has two fields: the order ID, and the facts as text.

One note for the exam. We built this delegation by hand, with plain tools, and the Claude Agent SDK has such a tool built in. The Exam Guide calls it Task, current releases call it Agent, and on the exam you use the guide's name.

And finally, the coordinator itself. It is the same run agent function. Its name is coordinator. Its system prompt says it has no data tools, so it delegates to the two agents, passes each one what it needs, and answers the customer in two sentences. Its tools are the two agents. And its task is the customer's message: I was charged twice for this order, please fix it. We print the answer, with the name ShopAssist in front.

Let's run it one more time, the whole system. Several agents will print here, so let's give the terminal more room. The coordinator starts with the customer's message. It has no data tools, so the only thing it can do is delegate. The first line comes from the order agent. It looked up the order. Only then comes the coordinator's line: it called the order agent.

Why this order? Our loop prints a line after the tool has run, and here the tool is a whole agent. So the order agent finished its work first. Then the billing agent lists the charges, and refunds one of them, sixty dollars. And here is the coordinator's call to the billing agent. Look at the facts it passed: the lamp, and the forty-five days since delivery. The billing agent knew this only because the coordinator wrote it into the call. Finally, ShopAssist answers the customer: it found two identical charges and refunded the extra one.

Here is what just happened. The coordinator delegated to the order agent, which looked up the order and reported a lamp delivered forty-five days ago. The coordinator passed those facts to the billing agent, which listed two identical charges, refunded one, and reported back. And the coordinator answered the customer from the two reports.

So the practical rule: give each subagent a narrow job and only the tools for it, pass the context it needs in its task, and let the coordinator own the customer.
