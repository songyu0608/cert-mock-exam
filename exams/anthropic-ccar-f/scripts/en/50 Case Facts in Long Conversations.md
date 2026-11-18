# 50. Case Facts in Long Conversations

By now, ShopAssist knows which signals are not real reasons to escalate.

This lesson is about long conversations, and how ShopAssist keeps the exact facts of a case. This matters because a case that loses one number can refund the wrong amount.

Here is where we are. ShopAssist runs on the Agent SDK with its four tools. Our application keeps the conversation and sends it with every request. Some cases now run for forty messages or more. So when a conversation gets long, our code replaces the older messages with a short summary. Later, it makes a new summary from that summary and the newer messages. Making summaries of summaries, again and again, is called progressive summarization.

Alex's case is one of these long conversations. He was charged twice for his headphones, and the extra charge is a hundred and twenty dollars. He also wants to return his jacket. ShopAssist read the delivery date from the order and confirmed that the return window is still open. Alex said one more thing: he wants his money back on his card, not as store credit. ShopAssist agreed.

Three summaries later, the history says only this. "Customer has a billing problem of about a hundred dollars and wants to return a recent jacket." The exact amount is gone. The delivery date is now just "recent". Alex's wish about his card is gone completely.

The most important thing to remember is this: the conversation is not your database. Exact facts must never live only in a summary. We look at three things. First, why summaries lose facts. Second, the case facts block. Third, one entry for each issue.

First, why summaries lose facts. A summary exists to make text shorter. Exact values are the first thing it drops. Amounts become "about". Percentages become "most". Dates become "recently". What the customer expects becomes "the customer is unhappy". Each round loses a little more, because each summary is built from the one before it.

We should not fix this by asking for a more careful summary. Every summary makes the text shorter. And making it shorter is exactly how the facts get lost.

Second, the case facts block. Our code keeps a structured block of transactional facts: amounts, dates, order numbers and statuses. It also records what the customer asked for and what ShopAssist promised. Amounts, dates and statuses come from tool results. The customer's wishes come from the customer's own words. Our code writes all of them into the block.

The block sits outside the summarized history. Our code adds it to every request, in its own labeled section, and never summarizes it. Now the summary can make the chat as short as it needs. Claude still reads the exact hundred and twenty dollars, the real delivery date, and "refund to card".

Third, one entry for each issue. Alex has two issues. If all the facts sit in one flat list, the amount for the headphones can get mixed up with the jacket. So each issue gets its own entry, with its order, its amount, its status and the next step. Both entries are on screen. When the double charge is refunded, our code marks that entry as refunded and adds the refund ID. The jacket entry stays open.

This gives us two separate layers. The summary keeps the story, and the issue entries keep the facts.

Here is what to remember. Progressive summarization turns exact amounts, percentages, dates and customer expectations into vague words. A better-worded summary does not solve that. Keep the transactional facts in a case facts block, outside the summary, and include it in every request. When a case has several issues, give each issue its own entry with its order, amount and status.

So let the summary keep the story, and let the case facts block keep the numbers. In a support case, those details are not small. They are the case.

Next, we look at the rest of the context, which keeps growing with every tool result.
