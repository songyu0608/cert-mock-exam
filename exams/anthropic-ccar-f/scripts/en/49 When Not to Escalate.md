# 49. When Not to Escalate

We now know the real reasons for ShopAssist to hand a case to a person.

This lesson is about signals that look like reasons to escalate, but are not. This matters because every false trigger sends a solvable case to the support team. The store counts each of those cases against its eighty percent target.

Here is where we are. ShopAssist runs on the Agent SDK with its four tools. Its system prompt now lists clear escalation criteria, with a few examples. First-contact resolution goes up. Then the team over-corrects. Someone adds a new line to the prompt: escalate when the customer is angry. Someone else suggests a confidence score. Within a week, simple cases reach the support team again.

The most important thing to remember is this: escalate because of what the case needs. Do not escalate because of how the customer sounds, or how sure Claude says it is. We look at three signals. First, frustration. Second, a confidence score. Third, several customers who match one name. The first two are not triggers at all. The third is a reason to ask a question, not a reason to escalate.

First, frustration. A customer writes: "This is the second time your store has let me down! My headphones arrived with a cracked case. Photo attached." The customer is clearly angry.

But look at the case itself. A damaged item with a photo, inside the return window, is a standard case. The policy covers it. Anger tells us how the customer feels. It does not tell us how hard the case is. A furious customer can have a simple return. A calm, polite customer can ask for a policy exception. So sentiment is a poor measure of complexity. We should not escalate on angry words, and we should not add sentiment analysis that escalates above a threshold. That measures the wrong thing, and the support team gets simple cases.

Instead, ShopAssist acknowledges the frustration in one sentence. Then it offers a resolution: "I'm sorry your headphones arrived damaged. I can arrange a refund for you right now." Maybe the customer accepts. Then ShopAssist verifies the account, finds the order and resolves the case in the first conversation. Or maybe the customer answers: "No. I want to talk to a person." Now the customer has stated a clear preference, so ShopAssist escalates at once, with a full handoff. ShopAssist offers once. If the customer repeats the wish for a person, it hands the case over.

Second, a confidence score. The team's idea is this: before each reply, Claude rates its own confidence from one to ten. Any reply below six goes to a person. This sounds measurable, but the score is only Claude's opinion of itself, and it is poorly calibrated. Remember the competitor price match. ShopAssist promised a discount it had no right to give, and it was confident about it. So on that hard case, the score would have been high. On an easy damaged-item case, the score may come out low, and that case goes to a person for no reason. So the score fails in both directions.

Earlier, we used confidence scores for extraction review. They only helped after we checked them against labeled answers. A raw score in a chat has no such check. The fix stays the same: explicit criteria and examples. The refund amount is not a judgment call either. Above five hundred dollars, our pre tool use hook blocks process refund and sends the case to escalate to human. That happens in code, every time.

Third, several matches. A customer writes: "Hi, I'm Alex. I want to return my jacket." There is no email and no order number. Claude calls get customer with the name, and two customers come back. Our gate keeps the verified customer slot empty, so no order action can run yet.

But what should Claude do next? It could pick the customer with the most recent order. It could pick the first one in the list. Each of these is a guess. A wrong guess opens another person's orders, or sends a refund to the wrong account. So ShopAssist never picks a match by a rule of thumb. Escalation is wrong here too, because the case is simple. It only needs one more fact.

So ShopAssist asks: "I found more than one account with that name. Could you give me your email address or your order number?" The customer gives the email. Get customer now returns exactly one verified customer, and the case continues.

We write this behavior down in two places. The first is the system prompt criteria, with one short example. The second is the get customer description. Both say the same thing. When several customers match, ask for another identifier. That can be an email, a phone number or an order number. Never choose one yourself.

Let's recap. A customer's anger is not a trigger. Acknowledge it, offer a resolution, and escalate if the customer repeats the request for a person. A self-reported confidence score is not a trigger either, because the agent can be confident and wrong. The refund limit is enforced by a hook in code, not by Claude's judgment. When several customers match, ask for another identifier. Never guess, and never escalate just for that.

So before ShopAssist hands a case over, ask one question. Does this case really need a person? Or does it only need one more fact?

Next, we look at long conversations, and how ShopAssist keeps the facts of a case correct.
