# 34. The Agentic Loop on stop_reason

So far, ShopAssist can ask for one tool, use the result, and turn a customer's email into a checked return request.

This lesson is about how an application keeps Claude working, tool after tool, until the task is done. This matters because a real support case almost never ends after one tool call.

Here is the case. Alex, one of the store's customers, writes: "My jacket arrived damaged. I want a refund. And can I still return the lamp?" ShopAssist has four tools: get customer, lookup order, process refund and escalate to human. To help Alex, ShopAssist must first verify the account. Then it must find both orders. Only then can it decide about the refund. That makes several tool calls in a row, and each one depends on the result before it.

The most important thing to remember is this: Claude does not run tools. Claude asks for a tool. Your application runs it and sends the result back. Then Claude decides what to do next. Three things make this work. First, the signal that says whether to continue. Second, the history that carries every result. Third, the choice of the next step.

First, the signal. Every response from the API has a stop reason. It says why Claude stopped writing. Two values drive the loop. Tool use means Claude is asking for a tool and is not finished. End turn means Claude has written its final answer for this turn.

So the loop has four steps. One, send the conversation to Claude. Two, read the stop reason. Three, if it is tool use, run the requested tools, add the results to the conversation, and go back to step one. Four, if it is end turn, show the answer to the customer.

Now let's follow Alex's case. The trace is on screen. In the first round, Claude asks for get customer with Alex's email. The stop reason is tool use. Our code runs the tool and gets a verified customer ID. In the second round, Claude asks for lookup order twice in one response. One call is for the jacket, and one is for the lamp. The stop reason is tool use again. In the third round, Claude has both orders. The jacket is inside the thirty-day window, so Claude asks for process refund. In the fourth round, Claude has the refund ID. It writes the answer: the refund is on its way, and the lamp is outside the return window. The stop reason is end turn, so the loop ends.

Second, the history. The API remembers nothing between requests. So every round sends the whole conversation again, and the order of the messages matters. After a tool use response, we add two messages. The first is Claude's own response, as an assistant message. The second is a user message with the tool results.

Here is a detail that breaks many loops. A response can contain text and tool use blocks. A tool use block carries the tool name, its input and a tool use ID. We should not save only the text of Claude's response. Then the tool use blocks disappear, and the next request carries results that match no request. The API rejects that request. Add the full content of the response, exactly as it came back. Each tool result carries the same tool use ID as the request it answers. That is how Claude matches every result to its request.

Now look at the second round again. Claude asked for two lookups in one response. We run both. Then we return both results together, in one user message. We should not send them as two separate messages. One response with two requests gets one message with two results.

Third, the choice of the next step. Notice that our code never decided the order of the tools. Claude chose each next step from the conversation and the latest result. This is called model-driven decision-making. The other approach is a pre-configured decision tree, or a fixed tool sequence: always get customer, then lookup order, then process refund. That works for simple cases. But real messages are messy. Maybe Alex already gave an order number. Maybe the order is not found, and Claude must ask a question. Maybe the case needs escalate to human instead of a refund. A fixed sequence cannot adapt to these cases. The loop can, because Claude looks at each new result before it chooses.

Model-driven does not mean the model can do anything. Claude proposes each tool call. Your code runs it, and your code can still refuse a call that breaks a store rule.

Let's recap. Claude asks for tools, and your application runs them. On tool use, run the tools, add Claude's full response and then the results, and call Claude again. On end turn, the task is done. When one response asks for several tools, all the results go back in one user message, matched by tool use ID. Claude chooses each next tool from what it has learned so far.

So the loop is simple: send, read the stop reason, run, add, repeat. Next, we look at how the loop should stop, and the ways it stops wrong.
