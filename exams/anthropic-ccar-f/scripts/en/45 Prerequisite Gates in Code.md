# 45. Prerequisite Gates in Code

We left ShopAssist with the Agent SDK running its loop. The allowed tools option set which tools the agent may use.

This lesson is about the first rule on ShopAssist's must-never list: no order or refund action before the customer is verified. This matters because a skipped check can give one customer's data to another person. It can also send one customer's money to the wrong account.

ShopAssist now runs on the Agent SDK, with four tools from the store's MCP server. They are get customer, lookup order, process refund and escalate to human. Its system prompt says to always verify the customer with get customer before any order action. Most of the time, Claude follows that instruction.

But the team reads a week of logs and finds a problem. Assume that in about one case in ten, Claude skips get customer. A customer writes: "Hi, I'm Alex. Where is my jacket order?" Claude calls lookup order straight away, with the order number and a customer ID from the chat. That ID did not come from get customer. A few times, this finds the wrong account. Once, a refund goes to the wrong customer.

The most important thing to remember is this: a prompt guides the order of steps, but only code can enforce it. We look at three things. First, why the prompt is not enough. Second, how a prerequisite gate works. Third, a fix that looks right but controls the wrong thing.

First, the prompt. An instruction in the prompt is guidance. Claude follows it very often, but not every time. The exam calls this a non-zero failure rate. That means it fails sometimes, even if rarely. For many things, that is fine. But checking who the customer is before any money moves is different. It must hold in every conversation. The exam calls this deterministic compliance: the same correct result every time.

We should not fix this by writing "MANDATORY" in capital letters, or by adding examples that always call get customer first. Both still depend on Claude choosing to follow them. So the rule moves into code.

Second, the gate. A prerequisite gate is a check in our code. It blocks some tool calls until an earlier step has finished.

Here is the simple picture. At the start of a conversation, our code keeps one empty slot for the verified customer ID. When get customer returns exactly one verified customer, our code saves that ID in the slot. If it returns several matches, the slot stays empty, and ShopAssist asks for another identifier. Before lookup order or process refund runs, the gate checks the slot. If the slot is empty, the tool does not run.

The trace is on screen. Claude asks for lookup order with the jacket's order number and a customer ID that no tool has verified. The gate checks the slot and finds it empty. So our code blocks the call and sends back an error result to Claude. Is error is true, and the message says: verify the customer with get customer first. Claude reads that result and asks for get customer with Alex's email. The tool returns one verified customer ID, and our code saves it. Claude asks for lookup order again. This time the gate finds the ID, and the order lookup runs. The gate also checks one more thing: the customer ID in the call must be the one get customer returned. So Claude cannot pass a different customer's ID.

Notice what the gate does not do. It does not choose tools. Claude still decides each next step. The gate only refuses a step that comes too early. It lives in our tool code, so it runs on every call, whatever the prompt says. The SDK also offers hooks, code that intercepts a tool call before it runs, and we use them in the next lesson.

Third, the fix that looks right. One idea is a routing classifier that reads each request and turns on only the tools it needs. But for an order question, ShopAssist needs both get customer and lookup order. Both are on, so Claude can still call them in the wrong order. Restricting which tools exist changes availability, not ordering. Only a gate controls the order.

Let's recap. Prompt instructions guide Claude, and they fail sometimes. A rule that must always hold, like identity before money, belongs in code. A prerequisite gate blocks lookup order and process refund until get customer has returned a verified customer ID. A blocked call goes back to Claude as an error result that says what to do first. Limiting the tool set controls which tools exist, not the order of the calls.

So when the order of steps protects money or customer data, do not ask Claude more firmly. Put a gate in code.

Next, we use hooks to check single tool calls, such as refunds above five hundred dollars.
