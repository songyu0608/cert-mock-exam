# 29. Batch Processing: When It Fits

By now, we know which extractions a person must check. This lesson is about work that nobody waits for, and a cheaper way to run it. This matters because the same work can cost half as much, but only when you choose the right jobs.

ShopAssist is the support assistant we are building for an online store. It chats with customers on the store's website, and it reads the documents they attach. Every answer comes from a normal API call while the customer waits.

Now the store wants one more job. Every night, ShopAssist should audit all of the day's closed conversations. An audit here means a second look. Was the policy applied correctly? Should a person check the case?

The most important thing to remember is this: a batch is cheaper but slower. Use it only when nobody is waiting for the answer. We look at three things. First, the price and the waiting time. Second, tools inside a batch.

Third, how often to submit.

First, the price and the waiting time. The Message Batches API takes many requests at once. You send them together, and Claude works on them in the background. Later, your application collects the results. This costs about half the price of normal calls. In return, you wait. A batch can take up to twenty-four hours. Many batches finish much sooner. But there is no guaranteed latency, which means no promise about how fast it finishes.

Now compare two jobs. The nightly audit runs while the store is closed. The support team reads the results the next morning. Nobody waits for them, so the audit fits a batch. Weekly reports and nightly test generation fit for the same reason.

The team's review bot is different. Now suppose the team makes it a blocking check, so a pull request cannot be merged until the bot has reported. A developer is waiting for that result. So the review bot stays on the normal, synchronous API, where the answer comes back in the same call. We should not move a blocking check to batches to save money. "Usually fast" is not a promise, and the merge could wait a whole day.

Second, tools. In a live conversation, Claude asks for lookup order. Our code runs it, and we send the result back in a new request. A batch cannot do that. A batch request can define tools, and Claude can still answer with a tool use request. But nothing runs that tool, and nothing continues inside the request. The answer simply stops there. To go on, you would need a new request.

So our application collects the facts first. For each closed conversation, our code reads the order from the order system. It adds the store's return policy. Then it puts the conversation, the order and the policy into the request. Claude gets everything it needs in one step. Third, how often to submit. The support team now asks for more. They want every audit result within thirty hours of a conversation closing. A promised deadline like this is called an SLA, a service level agreement. The batch itself may take twenty-four hours.

So how often must we submit? A conversation can close right after a submission. It waits for the next submission, and then it may wait twenty-four more hours. So the worst case is the submission interval plus twenty-four hours. That total must fit inside the SLA. With thirty hours, the interval can be six hours at most. If we submit every four hours, the worst case is twenty-eight hours, with two hours to spare. One batch a night would not fit. A conversation that closes just after the nightly batch could wait almost forty-eight hours.

Let's recap. The Message Batches API costs about half, and results arrive within twenty-four hours, with no latency guarantee. Use it for overnight and weekly work, never for a check that someone is waiting for. Nothing runs a tool inside a batch request, so put the facts into each request first. To plan submissions, add twenty-four hours to the interval, and keep the total inside the deadline.

So before you move a job to batches, ask one question: is anyone waiting for this answer?

Next, we run the nightly audit as a batch, without paying twice.
