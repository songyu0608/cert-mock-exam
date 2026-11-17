---
lab: true
---

# 51. Trimming Tool Results and Lost in the Middle

A case facts block now keeps the exact amounts and dates of a long case outside the summary.

This lesson is about the rest of the context, which still grows with every tool result. This matters for two reasons. A long context costs more on every request. And the facts that matter can get lost inside it.

Here is the problem. Every time ShopAssist calls lookup order, the whole result goes into the conversation. The order service returns more than forty fields. There are warehouse codes, payment log entries, shipping scans, internal notes and audit timestamps. For a return or a refund, about five of them matter. They are the status, the items, the amounts, the delivery date and the return window.

Alex's case needs three lookups. That puts more than a hundred and twenty fields into the history, and most of them are noise. Our application sends this history again with every request. So we pay for the noise again in every round. The noise also spreads the important facts far apart.

The most important thing to remember is this: keep the context small, and put what matters most where Claude reads best. We look at two habits. First, trim tool results. Second, put the key findings first.

First, trimming. We should not pass the full order record to Claude and hope it finds the right fields. Instead, our code trims each result before it enters the conversation. It keeps only the fields that the next decision needs. The raw result and the trimmed result are on screen. The trimmed one keeps the five return fields and drops the rest.

The post tool use hook from earlier is a good place for this. It already turns timestamps and status codes into plain words. Now it also removes the fields Claude does not need. Trimming does not change any value. It only leaves out what this decision does not use.

Second, position. Models use the beginning and the end of a long input reliably. Facts in the middle are more likely to be missed. This is called the lost in the middle effect. It matters most when our code puts many pieces together into one input.

Take Alex's case. One request carries the case facts block, three order results, two policy pages and the recent messages. Suppose the key fact sits between the second order and the first policy page. Then Claude may answer without it, and the answer can still sound confident. A larger context window does not fix this. It only makes the middle longer.

So we arrange the input on purpose. A short summary of the key findings goes at the beginning. For Alex, it says two things. The jacket was delivered twenty days ago, so it is inside the return window. The headphones were charged twice, with an extra hundred and twenty dollars. Then come the details, each under a clear header, like "Order: jacket", "Order: headphones" and "Return policy". The headers help Claude find a detail when it needs one. The task goes at the end: what Claude should do now. The long material sits in the middle, under headers, and the most important parts sit at the two ends.

Let's recap. Tool results pile up in the history. Each lookup adds forty fields when only about five matter. Trim each result in code, before it enters the conversation. Models read the beginning and the end of a long input best, and they can miss the middle. So put a summary of the key findings first and the details under clear headers. The task goes at the end.

So give Claude less to read, and put the most important facts where it reads best.

Next, before we go on, we look at how the exam asks about our own support agent.
