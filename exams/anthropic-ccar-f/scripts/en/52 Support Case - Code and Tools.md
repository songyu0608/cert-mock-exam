# 52. Support Case: Code and Tools

Our support agent can now verify customers and call its tools in a loop. It also enforces rules in code and keeps the facts of a long case.

Before we go on, here is how the exam asks about what we just built. The exam's first scenario, the Customer Support Resolution Agent, is ShopAssist.

This lesson goes through three failures from the production logs. For each failure we ask one question: does the fix belong in code, or in a tool description? This matters because the exam's wrong answers often put the right fix in the wrong layer.

First decision. Assume the logs show a problem in about one conversation in fifteen. The agent answers questions about an order that belongs to another account. A customer types an order number in the first message. The agent calls lookup order with that number before it calls get customer. The customer ID in that call did not come from any identity check.

One business rule matters in all three decisions: refunds above five hundred dollars must go to a person.

What does this situation need? Customer data and money are at risk, so the rule must hold every time. We need a guarantee, not a first step.

One fix looks reasonable: a stronger line in the system prompt. "You MUST call get customer before any order action." That fails. Prompt instructions have a non-zero failure rate. Claude follows them most of the time, and "most of the time" is what produced these logs.

The best move is a prerequisite gate in code. The gate blocks lookup order and process refund until get customer has returned a verified customer ID. The ID in each later call must be that same ID. A blocked call goes back to Claude as an error result. The result tells Claude to verify the customer first. The prompt can still explain the order of the steps, and the gate makes sure it happens.

Here is the rule. When the order of steps protects data or money, the prompt guides and the code enforces.

Second decision. The gate holds now, but the logs show a new pattern. A customer asks: "Can I still return the lamp?" To find out, the agent calls process refund. Assume this happens with about one question in twenty about whether an order can still be returned. For the lamp, the backend refuses, because the lamp is outside the return window. For an order inside the window, the same call would start a real refund that nobody asked for. Both tool descriptions are one line long. One says "Handles refunds." The other says "Gets order details."

What does this need? Claude picked the wrong tool. Claude chooses tools mainly from their descriptions, so the first step belongs at the description layer.

One fix looks reasonable: add few-shot examples of the right call to the system prompt. As a first step, that fails. The examples add tokens to every request, and the cause stays in place. The descriptions still do not say which tool does what.

The best move is to expand both descriptions. Process refund sends money to the customer. It is never a status check. It runs only when the customer has asked for a refund and the order qualifies. Lookup order returns the order's status, items, amounts and return window. Use it for any question about whether an order can still be returned or refunded. Each description names its neighbor and says when to use it instead.

Then we read the system prompt for keyword triggers. Assume it says: "When the customer mentions a refund, use process refund." That single word can pull Claude toward the wrong tool, even against a good description. So we rewrite that line around the situation, not the word.

Here is the rule. When Claude picks the wrong tool, fix the descriptions first. Then check the prompt for words that point the other way.

Third decision. A customer returns a speaker and a pair of headphones, bought together for six hundred and forty dollars. The order qualifies for a refund, so the agent calls process refund with the full amount. That is above the five hundred dollar limit.

What does this need? It is a store rule about money, so we need a guarantee.

One fix looks reasonable: a prompt rule that says never refund more than five hundred dollars. It fails for the same reason as in the first decision. It works most of the time, but not every time.

The best move is a tool call interception hook. In the Agent SDK, this is the pre tool use hook. It sees every process refund call before the call runs. It reads the amount, blocks this call, and tells Claude to escalate. Claude then calls escalate to human with a structured handoff. The handoff has four fields: the customer ID, the root cause, the refund amount and the recommended action. The person who takes the case cannot see the chat, so these four fields are everything they have. The store's backend also refuses the refund, as a second line of defense.

Here is the rule. A limit on a single tool call belongs in a hook, and the blocked call becomes a handoff.

Here are the main points to remember. When the order of steps protects data or money, use a prerequisite gate, not stronger wording. A wrong tool choice starts with the descriptions. Each one says what the tool does, what it returns and when to use its neighbor. After that, check the system prompt for keyword triggers. A limit on one tool call goes into a pre tool use hook. The hook blocks the call and sends the case to escalate to human. Few-shot examples and louder instructions leave the cause in place.

The same split works in the exam's developer productivity scenario. There, an agent uses Grep, the built-in search tool, instead of a more capable MCP tool. The first fix is the MCP tool's description, and Grep stays.

So sort every failure by layer. A rule that must always hold goes into code. A wrong tool choice goes to the descriptions first.
