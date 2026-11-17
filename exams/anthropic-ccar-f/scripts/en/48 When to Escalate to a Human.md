# 48. When to Escalate to a Human

ShopAssist can now write a structured handoff that a person can act on at once.

This lesson is about when ShopAssist should send that handoff at all. This matters because mistakes in both directions cost the store. An unneeded handoff counts against the eighty percent target. A missed one lets the agent decide something that only a person may decide.

Here is where we are. ShopAssist runs on the Agent SDK with its four tools, and escalate to human now carries a complete handoff. The team reads a month of logs. Assume that first-contact resolution is only fifty-five percent. ShopAssist sends standard cases to people, like a damaged item with a photo. At the same time, it handles some cases alone that it should never decide. One customer asked the store to match a competitor's price, and ShopAssist promised a discount.

The most important thing to remember is this: escalate for a real reason, not because a case looks hard. Three reasons count. First, the customer asks for a person. Second, the request needs a policy exception, or the policy does not cover it. Third, the agent cannot make progress. After that, we write these reasons into the system prompt, with examples.

First, an explicit request. A customer writes: "I want to talk to a real person." ShopAssist hands the case over right away. It does not look up the order first, and it does not try to solve the problem first. The customer has already decided. More questions only make them wait and repeat themselves. ShopAssist sends a handoff with what it already knows. Then it tells the customer that someone from the support team will take over.

Compare that with a customer who does not ask for a person. Alex writes: "My jacket arrived with a hole in the sleeve. Here is a photo." The policy covers this standard case. So ShopAssist offers to resolve it, and then it does. The difference is in the customer's words. An explicit request means escalate now. A straightforward issue without that request means resolve it.

Second, exceptions and gaps. Take Alex's lamp. It was delivered forty-five days ago, and the store allows returns within thirty days. Alex asks: "Can I still return the lamp?" That is a plain question, and the policy answers it clearly. So ShopAssist explains the thirty-day window and does not escalate. We met the same rule earlier, with a late jacket return.

Now Alex writes: "Please accept the return anyway." That is a request for a policy exception. ShopAssist never grants an exception itself. It escalates, because only a person may bend the rule.

A policy gap is different, because there the policy says nothing about the request. The store adjusts prices only against its own earlier price. A customer writes: "Another shop sells these headphones for thirty dollars less. Can you match that?" Competitor prices are not in the policy at all. ShopAssist should not guess, and it should not invent a discount. It escalates.

Notice what the trigger is: an exception or a gap, not a complicated case. Three orders and a damaged item make a complex case. But if the policy covers every part, ShopAssist resolves it. The five hundred dollar refund limit is a separate matter. A hook in code enforces that limit, so it never depends on Claude's judgment.

Third, no progress. Sometimes ShopAssist cannot move the case forward. The order service times out. Our code retries once, and the service times out again. More rounds will not change the result. They only keep the customer waiting. So when the case is stuck and no meaningful progress is possible, ShopAssist escalates. The handoff says what was tried and what failed.

Now, how do we make Claude follow these triggers? We should not just write "escalate less" or "escalate only serious cases". Claude has to guess where "serious" begins, and the guess changes from case to case.

Instead, we add explicit criteria to the system prompt. They are on screen. Escalate immediately when the customer asks for a person. Escalate when the customer asks for an exception, or when the policy does not cover the request. Escalate when you cannot make meaningful progress. Resolve everything the policy clearly covers, including damaged items with a photo.

Then we add two to four few-shot examples, each with its reasoning. One shows a damaged item with a photo, and ShopAssist resolves it, because the policy covers it. Another shows the competitor price match, and ShopAssist escalates, because the policy is silent. A third pair puts the two lamp messages side by side. The order is the same, but the requests differ, so the actions differ too. The reasoning is what lets Claude handle new cases. Say a customer wants to return a gift without a receipt, and the policy says nothing about gifts. Claude sees the same kind of gap, and it escalates.

We should not start with a separate model that sorts the requests, with a confidence score, or with sentiment analysis. Those are bigger changes, and they miss the cause, which is unclear decision boundaries. Remember also that criteria and examples guide Claude's judgment. They do not guarantee anything. Rules that must always hold stay in code.

Here is what to remember. When a customer asks for a person, escalate immediately, without investigating first. When a straightforward issue comes without that request, offer to resolve it. A plain policy question gets the policy answer. A request for an exception goes to a person, because the agent never grants exceptions itself. When the policy says nothing about the request, or the case cannot move forward, escalate. Write these triggers as explicit criteria, with a few examples that show the reasoning.

So escalate for a real reason, and resolve everything else. Next, we look at signals that look like reasons to escalate, and are not.
