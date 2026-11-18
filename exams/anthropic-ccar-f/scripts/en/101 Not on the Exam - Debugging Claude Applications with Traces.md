# 101. Not on the Exam: Debugging Claude Applications with Traces

ShopAssist can now search the store's help center before it answers. This lesson is about debugging, which means finding the exact step where a Claude application went wrong. This matters because the obvious fix is often in the wrong place.

This topic is not on the exam. It is background for running real systems.

Here is the scene. ShopAssist has been live for months. It runs on the Agent SDK, with its four tools from the store's MCP server. A customer writes in. She returned a jacket last week, and she asks about her refund. ShopAssist tells her that the refund is still pending. But the store's payment records show that it was paid three days ago. Now she is confused, and she contacts the store again.

The first idea is to change the prompt, maybe with a new line about refund statuses. That may fix nothing. Maybe Claude picked the wrong tool. Maybe the tool returned wrong data. Or maybe the data was right, and our own code read it wrong. These are different problems, and each one needs a different fix.

The most important thing to remember is this: find the first step where the actual behavior differs from what you expected. Then fix that layer.

We look at three things. First, the trace. Second, the layers where a failure can start. Third, recovery, which depends on the type of failure.

First, the trace. A trace is the record of every step that produced the final answer. For an agent, it follows the loop you already know. Our code sends a request, and Claude responds. Claude asks for a tool, and our code runs it. The result goes back, and Claude responds again.

The trace for this case is on screen. We read it in order, from the top, and we stop at the first step that looks wrong.

Start with the request. Did it succeed? Did it use the model we intended, the system prompt and the full conversation? Here, the answer is yes.

Next, Claude's response. Claude asked for get customer, and then for lookup order with the right order. Those were the right tools, with valid inputs.

Then the tool's execution. The order service received the right order and the verified customer, and it answered.

Now the tool result. In the raw result, the refund status is a number, and that number means refunded. But Claude never saw the raw result. Our post tool use hook turns status codes into words before Claude reads them. The hook's table of codes is out of date. It does not know the code for refunded, so it uses "pending" as a default. Claude then answered correctly from what it was given.

So the first wrong step is the hook, in our own code. The fix is to update its table and add a test for every status code. An unknown code should become an error, not a guess. A prompt change could not repair this. Worse, it might hide the symptom in a few cases and leave the bug in place.

Second, the layers. The same reading works for every failure, and the trace tells you which layer to look at.

Some failures start in the integration. The API returned an error, such as a bad key, a rate limit, an invalid request or a server problem. Then Claude never answered, so the model is not the problem.

Other failures start in our tools and code. A database query broke, a permission was missing, or our code read the wrong field of a correct answer.

Some failures start in the context. Claude receives an old tool result, or facts left over from an earlier task. The request succeeds and the tools work. But Claude reasons from the wrong picture.

And some failures really are in the prompt or a tool description. The instruction is unclear, a rule is missing, or an example points the wrong way. Suppose Claude picked the wrong tool while the tools and the context were right. Then look there. So prompt changes are fine, but only when the trace shows that the prompt caused the failure.

All of this needs good logs. For each case, record what your application sent and what Claude returned. Also record which tools ran and what they returned. Without that record, debugging is only guessing. But requests and tool results can hold customer data. So log enough to find the failure, and mask the rest. A customer's email, a card number or an API key should never appear in full in the logs.

Third, recovery. The right reaction depends on the type of failure. A temporary failure, like a rate limit or a server that is too busy, may go away by itself. Wait as long as the API's retry-after header says, then try again. An invalid request fails again if you send it unchanged, so fix the request. A permission failure needs authorization or a person, not a retry.

The other types need a change on your side. A bug in parsing or in a hook needs a code fix and a test. Out-of-date context needs fresh data. Look the order up again, or start from a clean state. A prompt problem needs a prompt change. Then run your test set again, so the fix does not break other cases.

Let's review the main points. A trace records every step from the request to the final answer. Read it in order, and stop at the first step that differs from what you expected. That step names the layer: the integration, a tool or our code, the context, or the prompt. Log enough to diagnose the failure, and mask customer data and secrets. Retry only temporary failures, and fix everything else in the layer that caused it.

So when your application gets something wrong, don't start by rewriting the prompt. Read the trace, find the first wrong step, and fix that layer.

Next, another topic beyond the exam: an instruction hidden inside the content Claude reads.
