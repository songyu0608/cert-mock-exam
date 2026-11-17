# 15. Effort, Batches and Fast Mode: Tuning Accuracy, Latency and Cost

We can now choose a model for each kind of work in ShopAssist. But the model we chose still has settings. They change how deeply it works, how long we wait, and what we pay. This lesson covers three of these settings, and the kind of work each one fits.

Here is the core idea. Effort sets how hard the model works on each request. Message Batches cost half the price, but we wait longer for the results. Fast mode costs more, and in return Claude writes faster.

We go through them in that order, and we test each one on two ShopAssist jobs.

The first job is the website chat. Our assumption is that 95 percent of replies must show their first words within 3 seconds. That holds with 200 chats open at once.

The second job is a nightly quality check. Assume a model reads about 2,000 finished conversations each night. It marks each reply as right or wrong against the policy. Nobody waits for it. The results must be ready by morning.

First, effort.

Before Claude writes an answer, it can think. It works through the problem in steps, and then it writes the reply. The customer sees only the reply.

On the current models, this thinking is adaptive. Adaptive thinking means the model decides for itself how much to think on each request. A greeting gets almost no thinking. A refund case at the edge of the policy gets more.

We guide that decision with one setting, called effort. Effort has five levels, from low up to max. It tells Claude how hard to try. It is not an exact count of tokens. And it shapes the whole response, not only the thinking. At lower effort, Claude thinks less and writes less. It also makes fewer and shorter tool calls. So lower effort means a lower price and a faster reply. Higher effort means more care on hard cases, with more cost and more waiting.

Back to ShopAssist. The router only puts a label on each message, so low effort is likely enough. The policy answer has edge cases, so it may need medium or higher. As with the model, we confirm the level on our own labeled cases. Anthropic says that changing effort often helps more than changing models. So try a different effort before you change the model.

One common mistake is to save money by switching thinking off. On the current Opus, Sonnet and Fable models, thinking cannot be switched off. A request that tries is rejected with an error. The cheaper setting is a lower effort.

Older code may also set temperature, which once changed how random the answers were. The current API rejects any request that still sends it, so an option that tunes temperature is out of date.

Second, batches.

Some work has no customer waiting. Message Batches let us send many requests together, as one batch. Each request carries its own ID, so we can match every result to its request.

The price is half the normal price. What we pay with is time. Results come back within up to 24 hours. Most batches finish much sooner, but there is no promise.

The nightly quality check fits well. We send the 2,000 conversations in the evening, and we read the results in the morning. Same model, same effort, half the bill.

The chat does not fit. A customer who asks about a jacket cannot wait an hour for the first words. So batches are for work that can wait, never for a live conversation.

Third, fast mode.

Fast mode is an option on the current Opus and Fable models. It runs the same model in a faster way. Claude then writes its output up to two and a half times faster. The model, the thinking and the quality stay the same. But it costs twice the normal price. And it does not work together with batches.

Here is the detail that matters. Fast mode speeds up the writing after the first words appear. It does not make the first words appear sooner.

Picture a disputed case on Opus that needs a long reply. With fast mode, the long text arrives sooner, and the customer reaches the end earlier. But our chat promise measures the first words. Fast mode does not move that number. To bring the first words sooner, we look elsewhere, such as a smaller model or a lower effort on that step.

Another wrong belief is that fast mode thinks less, or that it is the cheap option. It is the opposite: the same reasoning, at a higher price. For a quick, cheap label, the answer is Haiku or a lower effort, not fast mode.

On the exam, settings like these are trade-offs between accuracy, speed and cost: what each one gives you, and what it costs.

Let's go over the main points.

Effort sets how hard the model works, and it shapes thinking, text and tool calls together. You spend less by lowering effort, not by switching thinking off. Message Batches cost half, but results arrive within a day, so they fit the nightly check, not the chat. Fast mode writes faster at twice the price, but the first words come no sooner. It never makes the model think less.

The practical rule: choose each setting by who is waiting. Use effort for depth. Use batches when nobody waits. Use fast mode only when long output is too slow, and only when the budget allows it.
