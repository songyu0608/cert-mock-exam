---
lab: true
---

# 53. Support Case: Escalation Calls

In the previous checkpoint, we decided which of ShopAssist's failures belong in code and which belong in tool descriptions.

This second checkpoint is about judgment calls. Which cases does ShopAssist resolve? Which go to a person? And how does a long case keep its facts? This matters because the wrong answers here sound careful, and they cost the store its target.

Assume the support team reads the logs from one afternoon. Escalate to human was called for a customer who only needed a delivery date. In the same afternoon, another customer got a discount that no store policy allows. The store's target is eighty percent or more first-contact resolution, while knowing when to escalate. So both cases count as failures.

First decision. Look at the two cases. The first customer is angry: "This is the third time I've asked! My coffee machine was due on Monday." Assume lookup order shows that the machine has shipped, and the order holds a new delivery date from the carrier. The second customer is calm and polite: "Another shop sells these headphones for thirty dollars less. Could you match that price?"

What does this situation demand? Nobody asks for a guarantee here. These are judgment calls, so the fix is in how the agent decides.

The first wrong approach is what the logs show: escalate the angry customer and resolve the calm one. It fails because anger shows how a customer feels, not how hard the case is. The late delivery is fully covered, because the date is in the order. The store's policy does not mention the price match at all, because the store adjusts prices only against its own earlier price.

The second wrong approach is to escalate both cases to be safe. That fails too. Every unneeded handoff counts against the eighty percent target. It also gives the support team tickets it should never see.

The best move splits the two cases. For the coffee machine, ShopAssist acknowledges the frustration in one sentence. Then it gives the delivery date it read from the order. If the customer repeats that they want a person, ShopAssist escalates at that point. For the headphones, the policy says nothing, so this is a policy gap. ShopAssist escalates with a structured handoff, and it never promises a discount itself.

Two more cases came in that afternoon. One customer wrote: "I want to talk to a person." ShopAssist hands that case over at once, without looking anything up first. Another customer wrote: "Hi, I'm Alex Kim." Get customer returned two customers with that name. Escalation is wrong here, and so is a guess. ShopAssist asks for an email or an order number.

Here is the rule. Escalate for what the case needs, not for how the customer sounds.

Second decision, first move. Later that afternoon, Alex writes one message with two concerns. His jacket is the wrong size, and he wants a refund. He also wants to return the lamp. Claude splits the message into two items, calls get customer once, and looks up both orders in one response. The jacket refund goes through. For the lamp, process refund returns a structured error. Is error is true, the category is business, and is retryable is false. The result also carries a customer-safe message: the lamp was delivered more than thirty days ago.

What does this demand? The tool has already said what happened, so the agent must act on it correctly.

One wrong approach is to try the refund again. That fails, because a store rule said no. The lamp will still be outside the window tomorrow. Each retry wastes a call and pushes the loop toward its safety cap. Another wrong approach is to escalate the lamp right away. That fails as well. Alex asked a question that the policy clearly answers. He did not ask for an exception.

The best move is to answer without retrying. ShopAssist writes one reply for both items. The jacket refund is on its way. The lamp is outside the return window, and the reason comes from the customer-safe message. If Alex then asks the store to accept the lamp anyway, that request for an exception goes to a person.

Here is the rule. A business error gets an answer, not a retry.

Second move. The conversation goes on for twenty more messages. Then Alex asks if the jacket refund goes back to his card. Earlier, he said he wanted his card, not store credit. Assume the refund was eighty-nine dollars. But after several summaries, the history says only "a refund of about ninety dollars for clothing". The card is gone.

What does this demand? Exact facts in every request, so this needs a guarantee in code. The wrong approach is to ask for a more careful summary. Every summary makes the text shorter, and the exact values are the first thing it drops.

The best move is a case-facts block outside the summary. Our code writes it from tool results and from Alex's own words. Each issue gets its own entry. The jacket entry holds the amount, the refund ID, the status and "refund to card". The lamp entry says that the refund was refused, outside the window, and that Alex was told. Our code adds this block to every request.

Here is the rule. The summary keeps the story, and the case-facts block keeps the numbers.

Here are the main points to remember. Escalate on an explicit request, a policy gap or an exception, never on anger. When a straightforward issue comes with frustration, acknowledge it, resolve it, and escalate if the customer asks for a person again. Several matching customers mean you ask for another identifier. A business error that is not retryable gets a clear answer, not another attempt. Exact amounts, dates and promises live in a case-facts block, with one entry per issue.

The same rule works in the exam's multi-agent research scenario. There, a search that times out is not the same as a search that finds nothing. The coordinator needs the failure type and any partial results. It passes exact findings, with their sources and dates, in structured form.

So in every scenario, let the real facts of the case decide the next step, and keep those facts exact in code.
