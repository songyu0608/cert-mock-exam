# 46. Hooks: Intercepting Tool Calls

A prerequisite gate in our code now stops order and refund calls until the customer is verified.

This lesson is about hooks. A hook can change a tool call before it runs. It can also change a tool result before Claude reads it. This matters because two more of ShopAssist's rules need code around every single tool call.

ShopAssist runs on the Agent SDK, with four tools from the store's MCP server. The gate holds, so no order action runs before get customer returns a verified customer ID. Two problems are still open. The first one is a store rule: refunds above five hundred dollars must go to a person. The second one is about data. Different tools return dates and statuses in different formats, and Claude sometimes reads them wrong.

The most important thing to remember is this: a hook is your code. It runs at a fixed point in the loop, every time. A prompt instruction works most of the time. A hook works every time. We look at two kinds of hook. First, a hook that runs before a tool call. Second, a hook that runs after it.

First, the hook before the call. When Claude asks for a tool, the SDK does not run it right away. It first passes the request to our hook. The hook sees the tool name and the input. Then it can allow the call, block it, or change its input. The exam calls this tool call interception. In the Agent SDK, this kind of hook is called pre tool use.

Here is a case. A customer bought a coffee machine for six hundred and twenty dollars, and it arrived broken. The customer sent a photo. Claude reads the case, finds the order, and asks for process refund with the full amount. Our hook receives that request before anything runs. It reads the amount and compares it with the limit. Six hundred and twenty is above five hundred, so the hook blocks the call. No money moves. The hook also sends a reason back to Claude: refunds above five hundred dollars need a person, so escalate the case. Claude reads that reason and asks for escalate to human instead. That is the redirect: the blocked action becomes a handoff to the support team.

The hook configuration is on screen. Notice that it is attached only to process refund. The other tools never pass through it. The store's backend also refuses such a refund, as a second line of defence.

We should not keep this rule only in the system prompt. "Never refund more than five hundred dollars" works most of the time, not every time. When money is at stake, most of the time is not enough. So when a business rule needs guaranteed compliance, choose a hook, not a prompt rule. The prompt can still explain the rule, so Claude escalates on its own most of the time. The hook makes sure it always happens.

Second, the hook after the call. This one runs when a tool has finished, before its result goes back to Claude. It can rewrite the result. In the Agent SDK, this kind is called post tool use.

Here is why we need it. ShopAssist's data comes from two different services. The order service gives the delivery date as a Unix timestamp. That is one long number that counts the seconds since 1970. It also gives the status as a number, like four. The shipping service writes its dates as text in a standard format called ISO 8601: year, month, day and time. So Claude gets the same kind of fact in three different shapes. Then it must decide if an item is still inside the thirty-day return window. A long number is easy to read wrong, and nobody can see what status four means.

So our post tool use hook makes the data the same every time. It turns every timestamp into a plain date, in one format. It turns every status code into a word, so four becomes "delivered". The trace on screen shows the raw result and the rewritten result side by side. Claude only ever sees the rewritten one.

We could explain every format in the prompt instead. But then Claude does the conversion itself, in every conversation, and sometimes it gets it wrong. The hook converts once, in code, the same way every time.

Notice what hooks do not do. They do not choose tools, and they do not write answers. Claude still decides each next step. Hooks only check and change what passes through them.

Let's go over the main points. A hook is your code at a fixed point in the agent loop. A pre tool use hook sees a tool call before it runs, and it can block the call or redirect it. Our hook blocks refunds above five hundred dollars and sends the case to escalate to human. A post tool use hook rewrites a tool result before Claude reads it. Ours turns timestamps, mixed date formats and status codes into one clear format. Prompts guide Claude most of the time, and hooks enforce every time.

So put a rule in a hook when it must always hold for a single tool call. Do the same when data must always arrive in one shape.

Next, we look at what the person receives when a case is handed over.
