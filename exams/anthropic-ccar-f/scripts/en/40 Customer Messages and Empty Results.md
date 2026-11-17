# 40. Customer Messages and Empty Results

In the previous lesson, a failed tool result learned to say what went wrong. It now carries three things: the is error flag, a category, and the is retryable flag.

This lesson is about two more parts of a tool result, and both shape what the customer hears. This matters because the customer sees only Claude's answer. That answer can only be as true as the tool result behind it.

The most important thing to remember is this: "nothing found" and "could not look" are different results. A tool must never mix them up. We look at two things. First, the messages inside a business error. Second, the line between an empty result and a failure.

First, the messages. Alex asks for a refund on the lamp. It was delivered forty-five days ago, outside the thirty-day window. So process refund refuses. Is error is true, the category is business, and is retryable is false. Tomorrow the lamp will still be outside the window, so trying again cannot help. But Claude still has to tell Alex something.

So the result carries two messages, and you can see both on screen. The first is a customer-safe message. It is written for Alex, in plain words. It says that this order was delivered more than thirty days ago. So it is outside our return window. Claude can pass it on directly. Claude does not have to invent a reason, because the message already states the store's real rule.

The second message is for the logs. It names the rule, the dates and the service that refused. Developers need these details when they look into a case. Our code writes this message to the store's logs. It is not text for the customer, and Alex never sees it.

With these fields, Claude knows how to respond. It does not retry. It explains the rule to Alex. If Alex then asks the store to make an exception, that is a reason to escalate.

Second, empty results and failures. Alex gives an order number, and lookup order searches for it. Two very different things can happen. Maybe the search works but finds no order with that number. That is not an error. The tool did its job, and its answer is "no match". So is error is false, and the result is simply empty. Claude asks Alex to check the number.

Or maybe the order service does not answer in time. That is an access failure, because the tool could not look at all. Is error is true, the category is transient, and is retryable is true. Now someone must decide whether to try again. Our code can retry once. If the service is still down, Claude tells Alex that it cannot check the order right now.

We should not catch the timeout and return an empty list as a success. That hides the failure. Claude reads "no order found" and tells Alex that the order does not exist. Every step after that rests on false information. This is the same pattern that the team's review bot learned to flag in code.

This rule matters even more later in the course. There, a coordinator gives work to other agents and reads their reports. A coordinator is an agent that splits a task and collects the results. Suppose one of its helpers reports a failure as an empty result. Then the coordinator believes the data does not exist. It never retries, and it never tries another way. So every report must make clear which one it was: an empty answer, or no answer at all.

Let's recap. A business error is not retryable, and it carries two messages. The customer-safe message explains the rule to the customer in plain words. The log message keeps the details for developers, and the customer never sees it. A search with no match is a successful empty result. A timeout is an access failure, and someone has to decide whether to retry.

So make every tool result say clearly which case it is: we looked and found nothing, or we could not look.

Next, we build both cases in code.
