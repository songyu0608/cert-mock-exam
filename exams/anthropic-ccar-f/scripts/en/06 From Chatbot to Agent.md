# 6. From Chatbot to Agent

We have just met five Claude products and asked who does the work in each one. This lesson is about what turns a program that only answers questions into one that does real work, like looking up an order. This matters because every later lesson builds on this picture.

The core idea is simple. A chatbot answers. An agent works toward a goal, and it uses tools to get things done, step by step. The most important thing to remember is this: the model proposes, and the application decides and executes.

We get there in three steps. First, a plain chatbot. Second, a chatbot with one tool. Third, a loop of several tools.

First, the plain chatbot.

A customer of an online store asks: "What is your return policy?" Claude reads the message and writes an answer. If our application also sends the store's return policy in the request, the answer gets better. But it is still question and answer. The customer asks, and Claude replies. Nothing changes in the store.

Second, one tool.

Now the customer asks: "Where is my order?" Claude cannot know that. The real order lives in the store's systems. So instead of guessing, Claude asks for a tool. Here, the tool is a function that looks up the order. Our application runs that function and sends the result back to Claude. Then Claude answers with the real status.

Notice what changed. Claude did more than write text. It decided that it needed information from another system.

Third, the loop.

Now the customer writes: "My order arrived damaged. I want a refund." One tool call is not enough here. The system must find the customer and then find the order. It must also check the store's refund rules. Then it either makes the refund or hands the case to a person.

After each result, Claude looks at what it has. Maybe something is still missing, so it asks for another tool. Maybe it already has enough to finish the case. This repeating cycle is the loop. It continues until the task is done, or until the case goes to a human.

So here is a useful picture of an agent. It has five parts. The model understands language and reasons. The instructions give it a role and rules. The context gives it the facts for this task. The tools let it reach other systems. And the loop lets it keep working across several steps. A chatbot is mostly the first three parts. An agent adds tools and the loop.

Now the important split.

An agent does not give the model unlimited freedom. Claude proposes the next step. Your application decides whether that step is allowed, and then it executes it. For example, Claude may ask for a refund. Your code can still block that refund when it breaks a store rule.

Your application also chooses which tools Claude gets at all. It checks the input of every tool call. And it can ask a person to approve a sensitive action.

We should not keep a rule that must always hold only in the instructions. Claude follows instructions most of the time, not every time. A rule like that belongs in code.

Let's recap.

A chatbot answers questions. An agent works toward a goal through tools, step by step. An agent has five parts: a model, instructions, context, tools and a loop. Claude proposes each step. Your application decides what is allowed, and it runs the tools.

So whenever an agent does something in this course, ask two questions: what did Claude propose, and what did the code allow?

Next, we meet ShopAssist, with its tools and its rules.
