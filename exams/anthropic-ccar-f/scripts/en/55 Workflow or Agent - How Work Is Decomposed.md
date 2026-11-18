# 55. Workflow or Agent: How Work Is Decomposed

ShopAssist is now one complete agent. It runs on the Agent SDK, with a verification gate, hooks, case facts and structured handoffs.

This lesson is about a choice that comes before we add more agents: does a task need an agent at all? This matters because an agent costs more and is harder to test. Some work gains nothing from that freedom.

The core idea is this. When you can write down the steps before the work starts, run them in a fixed order from your code. When the next step depends on what the last step found, let the plan grow as the work goes. Their common industry labels are on screen, but the exam does not use them. The exam's words are prompt chaining and dynamic adaptive decomposition.

We look at three things. First, the fixed sequence. Second, the plan that grows. Third, how to choose between them.

First, the fixed sequence. Apart from the chat, the store has a return form on its website. Customers fill it in when they want to send an item back. Every form needs the same three steps. First, Claude extracts the fields: the order, the item and the reason. Next, Claude classifies the reason, for example damaged, wrong size or changed mind. Finally, Claude drafts a reply to the customer. Each step is its own request. The output of one step becomes the input of the next. This pattern is called prompt chaining, or a fixed sequential pipeline.

Notice who decides the order. Our code does. Claude does the work inside each step, but it never chooses what comes next. Between the steps, our code can also check the result. For example, it validates the extracted fields before the classify step runs. The path is the same every time, so the pipeline is predictable. We can test each step on its own. When something breaks, we know where to look. The number of calls is fixed, so cost and waiting time stay stable too. Prompt chaining also fits predictable reviews that check several aspects, the same ones in the same order every time.

We should not turn this form into an agent just because Claude is involved. An agent might take a different path on every form, and the store would gain nothing. The steps are known, so code should hold them.

Second, the plan that grows. The ShopAssist team also owns the store's old refund module. It is legacy code, which means old code that is still in use. It was written years ago, and it has almost no tests. The task is the exam's own example: add comprehensive tests to a legacy codebase. Nobody can list the steps in advance, because nobody knows yet what the module contains.

A fixed plan fails here. Suppose we hard-code this: read every file, then write tests for each file in order. The agent reads everything up front and fills its context. It spends as much effort on a logging helper as on the code that moves money. And it cannot change course when it finds something unexpected.

So the work is decomposed in three moves. First, map the structure. Find the entry points, the main functions, and what calls what. Second, identify the high-impact areas. A refund module has three of them. One is where the refund amount is calculated. Another is where the five-hundred-dollar limit is checked. The last is where the return window is counted. Third, create a prioritized plan, with the most important area first.

Then the plan adapts. Say the agent starts testing the refund amount. It discovers that the amount depends on a currency helper in another folder. That helper has no tests either. So the agent adds a new subtask: test the helper first.

This is dynamic adaptive decomposition. The subtasks come from what each step discovers, not from a list written in advance. That is the value of an adaptive plan: it spends effort where the findings point. This is the same model-driven decision-making we saw in the agentic loop. Claude chooses the next step from what it has learned. No fixed sequence chooses it.

Third, how to choose. Ask one question: can the steps be defined reliably before the work starts? If yes, use prompt chaining. If the right next step depends on what the work uncovers, use adaptive decomposition.

Then weigh the cost. An adaptive plan makes a varying number of calls, so its cost and waiting time vary too. It is also harder to debug, because the path changes from run to run. So use that freedom only where it solves a real problem.

One thing does not change with the pattern. A rule that must always hold stays in code. The verification gate and the refund hook work the same way inside a fixed pipeline and inside an adaptive plan.

Let's recap. Prompt chaining runs known steps in a fixed order, and your code controls that order. It fits predictable work, like extract, classify and draft, and reviews that check the same aspects every time. Adaptive decomposition creates subtasks from what each step finds. For an open-ended task, first map the structure. Then find the high-impact areas, and build a prioritized plan that changes as new dependencies appear. Choose by how predictable the work is.

So use exactly as much freedom as the task needs. Next, the store faces an open question so big that one agent is not enough.
