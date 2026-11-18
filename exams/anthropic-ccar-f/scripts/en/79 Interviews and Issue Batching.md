# 79. Interviews and Issue Batching

Examples and tests have just helped Claude Code get a data migration right.

This lesson covers two more refinement habits. The first is about who asks the questions before the work starts. The second is about how many problems go into one message. This matters because both habits decide how many rounds a change takes. They also decide how many surprises appear after customers start using it.

Here is the scene. ShopAssist calls lookup order many times in each conversation. Assume the order service is slow on busy days. So a developer on the team wants to add a cache. A cache is a short-term copy of data, kept close to the code that needs it. The next lookup reads that copy, which is much faster. But this developer has never built a cache before.

The most important thing to remember is this. In an unfamiliar area, let Claude Code ask you questions before it writes any code. Later, send problems that affect each other in one message, and fix independent problems one at a time. We look at these two habits in order.

First, the interview. The developer could simply write: add a cache to lookup order. Claude Code would build one. But the hard parts of a cache are not in that request.

So the developer writes something different: before you implement anything, interview me about this change. Ask me the questions I may not have thought about. This is called the interview pattern.

Claude Code's questions are on screen. Here are three of them. When does an order change, and how fresh must the copy be? When a refund goes through, should the cached order be removed at once? And what should happen if the cache itself is down? The second question is about cache invalidation. That means deciding when a copy is no longer true and must be thrown away. The developer had not thought about it. Without it, a customer gets a refund and asks again a minute later. ShopAssist then reads the old status from the copy. The third question is about failure modes, which are the ways a part can break. The developer's answer: if the cache is down, read from the order service directly, and never stop the conversation.

We should not skip the questions in an area we do not know. If we do, Claude Code fills each gap with a guess. We find those guesses later, after customers do. Answers come before code.

Second, how many problems per message. The cache is built, and a teammate's review finds five problems. Two of them affect each other. The cache key uses only the order ID. Lookup order also checks the customer ID, so one customer could get another customer's cached order. The refund code also clears the cached order, using that same key. So if the key changes, the clearing has to change with it. These are interacting problems: fixing one changes the other.

So they go into one detailed message. It names both problems and says how they connect. It also states the result we want. The key holds both the order and the customer. A refund clears exactly that key.

We should not send these problems one at a time. In the first round, Claude Code would fix the key and leave the refund code clearing the old key. Then the second round would have to repair what the first round broke.

The other three problems are independent. A log message has a typo. A test file is missing an import. One function has the wrong formatting. None of these fixes touches the others. So we fix them one at a time, in small rounds. Each change is short, and we check it before we send the next one. If something fails, we know which fix caused it.

Let's recap. In an unfamiliar area, ask Claude Code to interview you before it implements anything. Its questions bring up things you did not expect, like cache invalidation and failure modes. When fixes interact, describe all of those problems in one detailed message, and say how they connect. When problems are independent, fix them one at a time and check each change.

So before the work starts, let Claude Code ask the questions. After the review, group the problems by whether they affect each other. Next, the work runs over several days, and we decide whether to resume a session or start fresh.
