# 39. Structured Tool Errors

By now, we have made sure Claude picks the right tool.

This lesson is about what that tool should send back when it fails. This matters because an agent can only recover from a failure that it understands.

ShopAssist is the support assistant we are building for an online store. Its four tools come from the store's backend through MCP, the Model Context Protocol. MCP is the standard way that outside tools reach an agent. Most tool calls work. But when a call fails, the backend sends back one short text: "Operation failed."

Look at that from Claude's side. Should it try again? Should it ask Alex for a different order number? Should it explain a store rule? Or should it hand the case to a person? "Operation failed" answers none of these questions, so Claude has to guess. Maybe it asks for a refund that a store rule does not allow, round after round. Maybe it tells Alex that his order does not exist. When every failure looks the same, Claude cannot choose the right recovery.

The most important thing to remember is this: a failed tool call must say what kind of failure happened. It must also say whether trying again can help. We look at three parts. First, the error flag. Second, the error category. Third, the retry flag.

First, the flag. Every MCP tool result can carry a field called is error. When it is true, the tool call failed, and Claude knows the result is not normal data. This flag is part of the MCP protocol itself. But on its own, it only says that something went wrong.

Second, the category. On top of the flag, the store's tools return a small contract of their own, and the exam uses the same one. This contract is not part of MCP. It is an agreement between our tools and our agent. Its first field is the error category, and the category has four values.

All four are on one slide now. A transient error is a temporary problem, like a timeout or a service that is down for a moment. For example, the order service did not answer in time. A validation error means the input was wrong. Alex typed his order number with a digit missing, so it does not match the store's format. A business error means the input was fine, but a store rule says no. Alex asks for a refund on the lamp. It was delivered forty-five days ago, outside the thirty-day window. A permission error means this customer may not see the data. Lookup order rejects the order because it belongs to a different customer.

Each category points to a different next move. After a transient error, waiting and trying again can work. After a validation error, the input must change, so Claude asks Alex for the right number. After a business error, Claude explains the rule, or escalates if Alex asks for an exception. After a permission error, Claude shows no data from that order.

Third, the retry flag. This field is called is retryable. It is true only when the same call, unchanged, may succeed later. That fits the timeout. The business error is not retryable, because the lamp will still be outside the window tomorrow. The validation error is not retryable either. The same wrong number fails again, and only new input can work. So the error's message says exactly what to correct.

We should not retry every failed call a few times just in case. A retry helps only a transient error. Trying again after a store rule or a bad input changes nothing. It only wastes requests. It can even keep the loop running until it hits its safety cap. With is retryable in the result, Claude and our code both know at once whether another attempt makes sense.

The last part is a description written for people, which says what went wrong in plain words. Here is the lamp refund as it comes back, and the trace is on screen. Notice that is error is true. The category is business, and is retryable is false. The message gives the reason: the order is outside the thirty-day return window. Now Claude has everything it needs. It does not retry. It explains the policy to Alex.

Here is what to remember. MCP marks a failed tool call by setting is error to true. The store's contract adds an error category: transient, validation, business or permission. Is retryable is true only when the same unchanged call may succeed later. A clear description tells Claude what went wrong and what to fix. A bare "Operation failed" leaves Claude to guess.

So when a tool fails, tell the agent what kind of failure happened and whether trying again can help.

Next, we look at what the customer hears about an error, and why "nothing found" is not an error at all.
