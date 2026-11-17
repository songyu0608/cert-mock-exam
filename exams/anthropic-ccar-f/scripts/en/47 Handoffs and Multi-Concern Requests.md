# 47. Handoffs and Multi-Concern Requests

Last time, a hook stopped a large refund and sent the case to a person.

This lesson is about what that person receives. It is also about messages that carry several problems at once. This matters because in both situations, one part of a case can quietly get lost.

ShopAssist runs on the Agent SDK, with four tools from the store's MCP server. A customer writes about a coffee machine that cost six hundred and twenty dollars. It arrived broken, and the customer sent a photo. The refund is above five hundred dollars, so our hook blocked it. Claude then asked for escalate to human. Now a person on the store's support team takes the case. That person cannot see the chat.

The most important thing to remember is this. If a fact is not in the handoff, it does not exist for the person who receives it. We look at two things. First, what a handoff carries. Second, how one message with several problems becomes one answer.

First, the handoff. Suppose the escalation says only: "Please review this refund." The support agent must find the customer, open the order and work out what happened. Then the customer explains everything again. We should not paste the whole chat into the ticket either. That way, the person reads forty lines to find a few facts.

So escalate to human takes a structured handoff. Its input has four required fields, and the handoff is on screen. The customer ID is the verified ID from get customer, so the person opens the right account. The root cause says what went wrong and what was already checked. The machine arrived broken. The photo shows the damage. The order is inside the return window. The refund amount is six hundred and twenty dollars. The recommended action is to approve the full refund, because it is above the automatic limit.

With these four fields, the person can act at once. The tool returns a ticket ID. ShopAssist then tells the customer that a person will finish the refund. The same idea holds when one agent passes work to another agent, and we come back to that later in the course.

Second, several problems in one message. The customer's message had more in it. It also said: "I was charged twice for my headphones. And where is my jacket?" So there are three concerns in one message. We should not answer only the first one. We should not treat the whole message as one big case either. Then a simple question waits behind an escalation, or the customer has to ask again.

So Claude splits the message into three items. One is the broken coffee machine, one is the double charge, and one is the jacket. The items share context. There is one customer, one verified customer ID and one conversation. So Claude calls get customer once, not three times. Then it looks into the items in parallel. In one response, it asks for lookup order three times, once for each order. Our code runs all three calls, and the results go back together.

Each item now has its own answer. The headphones order shows the same payment taken twice. That extra charge is small, so Claude asks for process refund for it. The jacket order shows that the jacket has shipped, with a delivery date read from the order. The coffee machine goes to a person, as we saw.

Then comes one resolution. Claude writes a single reply that covers all three items. The double charge is refunded. The jacket is on its way. A person will finish the coffee machine refund. The handoff also gets one short note: the other two items are already resolved. So the support agent does not do them again.

Let's review the main points. The person who takes a handoff has no transcript. So the handoff carries the customer ID, the root cause, the refund amount and the recommended action. A message with several problems is split into separate items. The items share one context and are investigated in parallel. Then they come back to the customer as one resolution.

So before ShopAssist answers or hands over a case, check two things. Did every concern get an answer? Does the person have every fact?

Next, we look at when ShopAssist should hand a case over at all.
