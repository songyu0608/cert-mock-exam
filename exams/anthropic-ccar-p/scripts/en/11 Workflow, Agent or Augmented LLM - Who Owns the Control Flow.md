# 11. Workflow, Agent or Augmented LLM: Who Owns the Control Flow

ShopAssist's work is a series of steps: find the customer, find the order, write the answer. Something has to decide which step comes next.

This lesson answers one question: who decides that, the code or the model? The rule we arrive at: choose the least autonomous pattern that meets the requirement. Autonomous means that the model decides more on its own.

Four things make this work. First, the patterns, from one call to an agent. Second, the one question that picks between them. Third, the price we pay when the model decides. Fourth, the common shapes of a workflow, and who decides inside each one.

First, the patterns.

The simplest is one call to the model. Code sends one request, and the model answers from what is in it. Say ShopAssist hands a case to a person and needs a short summary of the chat. Everything the model needs is already in the request.

The next pattern is the augmented LLM. LLM stands for large language model, a model like Claude. Augmented means the model gets extra abilities. It can search documents. It can use tools that read real systems. It can get memory: facts the application saved and sends back later. It is still one model answering one customer question. But now it can ask for a tool along the way, and code sends the result back.

Order status fits here. A DemoShop customer bought a jacket and asks where the order is. Claude asks for the order lookup tool. The tool returns the status and the delivery date. Claude writes the answer from them. One tool, one answer.

The third pattern is a workflow. A workflow uses several model calls and tools. Code sets the steps in advance. The code is the map. The model does the language work at each stop.

Take a simple return, like the customer's jacket. Code checks who the customer is. Then it looks up the order. Then a tool checks whether the order can be returned. Then the model writes the confirmation, or the case goes to a person. The path is the same every time.

The fourth pattern is an agent. An agent is a model that picks its own steps. Code gives it a goal and some tools. Claude asks for a tool. Code runs it and sends back the result. Then Claude decides again, until the task is done.

Here is a case that needs an agent. Another customer writes about three orders. One item is missing. A gift arrived damaged. The customer asks what can come back for all of it. Which order comes first? Should ShopAssist ask the customer a question? Each answer depends on what the last tool returned.

Second, the question that picks the pattern.

Can you draw the steps before the message arrives? If one call with one tool covers the task, use an augmented LLM. If you can draw several steps in advance, use a workflow. If the path depends on what the model finds along the way, consider an agent.

Branches do not change the answer. Maybe the order is delivered. Maybe it is still on the way. Code can draw both branches in advance. So a branch is a reason for a check in the code, not a reason for an agent.

Third, the price of autonomy.

When the model owns the path, we pay in four ways. The first is that we lose a path we know in advance. When code decides, the same message takes the same path every time. When the model decides, it may take a different path tomorrow. The second is latency, the time the customer waits. Each turn of the loop is another model call. The third is cost, because more calls mean more tokens. The fourth is debugging. After a bad answer, we must work out why the model chose that path.

Our hard rules do not move into the model. In an agent, the tools still check who owns each order and the refund limit.

A common mistake is to believe an agent is always better. It is the same model in all four patterns. An agent is a way of running the model, not a smarter model. Give an agent the fixed steps of a simple return, and it is slower and costs more.

Anthropic, the company that makes Claude, gives the same advice in its article on building agents. Find the simplest solution first, and add complexity only when you need it.

Fourth, the shapes of a workflow.

The same article describes five common ones. In all of them, code owns the overall path. What changes is how much the model decides at each stop. We take them in three groups.

In the first group, code decides everything. In one shape, fixed steps run in a row, and each step uses the output of the last. Read the email, pull out the claim, write the reply. In the other, independent parts run at the same time, like reading the policy and the order at once.

In the second group, the model makes one small decision. It puts a label on the message, and code sends the message to the step built for that kind. This is called routing. It also saves money, because simple questions can go to a smaller, faster model like Haiku.

In the third group, the model decides more. In one shape, a model call splits a task into parts that nobody could list in advance. It hands each part to a worker call, then puts the results together. In the other, one call writes and another call checks the result against clear criteria. The checker sends the draft back to improve. Without clear criteria, the checker only has an opinion, and the extra rounds add time and cost, not quality.

Let's go over the main points.

One call answers from the request alone. An augmented LLM adds search, tools and memory. In a workflow, code sets the steps. In an agent, the model chooses them. The deciding question is whether you can draw the steps in advance. Autonomy costs a known path, latency, money and easy debugging. On the exam, watch for options that add an agent to steps you could draw in advance.

The practical rule: use the least autonomous pattern that meets the requirement. Let the model own the path only when nobody can draw it.

Next, we compare real design options, and write each decision down.
