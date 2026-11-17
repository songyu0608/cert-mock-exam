# 7. Meet ShopAssist: Tools and Rules

In the previous lesson, we saw that an agent works through tools in a loop. The model proposes, and the application decides. This lesson is about ShopAssist, the assistant we build in this course. This matters because almost every later lesson adds one piece to it.

The core idea fits in two lists. The first list says what ShopAssist must do. Those are judgment calls, and Claude makes them. The second list says what ShopAssist must never do. Each of those rules is a check in our code.

We look at three things. First, the job and the tools. Second, the two lists. Third, the target that tells us whether ShopAssist works.

First, the job.

ShopAssist is a customer support assistant for an online store. The store sells clothes, home goods and electronics. A customer opens the support chat and writes: "I want to return my order and get a refund."

A polite reply is easy, but a real support assistant must do more. It must find out who the customer is. It must find the order and know the store's policy. Then it either resolves the case or hands it to a person on the store's support team.

We build ShopAssist with the Claude Agent SDK. The SDK runs the agent loop for our code. On the exam, this system is the first scenario, the Customer Support Resolution Agent.

ShopAssist reaches the store's systems through four tools. The store's backend offers them through an MCP server. Get customer finds a customer by email, phone or name. It returns a verified customer ID. Lookup order returns the details of one order for that verified customer. Process refund sends money back for an order. Escalate to human creates a ticket for the support team.

These four are only function names in our backend. But learn them, because the exam uses exactly these names.

Second, the two lists.

The must-do list is about judgment. ShopAssist must understand what the customer wants. It must choose the next tool. It must explain the policy in plain words. And it must decide whether to resolve the case or escalate it.

Take Alex, one of the store's customers. Alex bought a jacket that was delivered twenty days ago. Returns are allowed within thirty days, so ShopAssist can start that return. Alex also bought a lamp that was delivered forty-five days ago. That is outside the window. The policy answers this clearly, so ShopAssist explains it. A damaged item with a photo is a standard case too, and ShopAssist handles it by itself. Claude makes these calls, because they depend on what the customer actually wrote.

The must-never list is different. These rules must hold every time. ShopAssist never touches an order or a refund before the customer is verified. It never pays a refund above five hundred dollars on its own. That case goes to a person. It never hands a case over without a structured summary. The summary gives the customer, the root cause, the amount and the recommended action. This matters because the person who takes the case cannot see the chat. And ShopAssist never states a delivery date that it did not read from the order.

Where do these rules live? We should not keep them only in the instructions. Claude follows instructions most of the time, not every time. So each must-never rule is a check in our code. Claude can still ask for a large refund. Our code sees the amount and sends the case to a person instead. Claude decides what to try. The code decides what is allowed.

Third, the target.

The store wants ShopAssist to resolve at least eighty percent of cases in the first conversation. This number is called first-contact resolution. So escalation is not a safe default. Suppose ShopAssist hands every unclear case to a person. Then it misses the target, and the support team gets simple tickets it should never see. A good agent resolves the standard cases. It escalates only when there is a real reason. We look at those reasons later in the course.

The course has a GitHub repository, and we build ShopAssist there step by step. We start with one API call. Then come tools, the loop, checks in code and, later, several agents. ShopAssist grows from a simple chat into a production-style system. That way, you see why each exam concept exists and where it fits.

Let's recap.

ShopAssist is a support agent for an online store, built with the Agent SDK. It has four tools: get customer, lookup order, process refund and escalate to human. The must-do list is judgment, and Claude makes those calls. The must-never list is checks in our code. The target is eighty percent first-contact resolution, so escalating too often is a failure too.

So for every rule in this course, ask one question: is this a judgment call, or a rule that must always hold?

Next, we see how the exam builds its questions around this kind of system, and around five others.
