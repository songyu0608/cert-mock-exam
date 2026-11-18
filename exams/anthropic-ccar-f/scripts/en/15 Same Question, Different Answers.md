# 15. Same Question, Different Answers

A customer asks if a jacket delivered five weeks ago can still be returned. On Monday, ShopAssist explains the thirty-day window and says no. On Tuesday, the same question gets a different reply. ShopAssist offers to pass the case to a human agent. The question, the store and the model are all the same, but the answers are different.

This lesson is about why the same question can get two different answers, and what makes the behavior reliable. This matters because customers stop trusting a store that gives a different answer each day.

ShopAssist is the support assistant we are building for an online store. It talks with customers in a chat on the store's website. Its instructions are in the system prompt, and they include the thirty-day return rule. So what is the real cause of the two answers?

The most important thing to remember is this: different answers usually point to an unclear rule, not to bad luck.

We look at three things. First, the real cause. Second, the two layers of reliability. Third, three fixes that look right but are not.

First, the cause.

Claude predicts likely text. So small changes in wording are normal. But here the decision itself changes, and that usually means the prompt allows two readings.

Our prompt says that returns are allowed within thirty days. It also says that ShopAssist should offer a human agent when a case is difficult. Is a late return a simple policy question? Or is it a difficult case? The words fit both readings. So on Monday Claude chose one reading, and on Tuesday the other.

The fix is to state the criterion. A criterion is a clear test that decides between the two readings. A plain question about the policy gets the policy answer. A request for an exception goes to a human. And ShopAssist never grants an exception itself.

Now the jacket case has only one reading. The customer only asked a question, so ShopAssist explains the thirty-day window. Maybe the customer then asks the store to accept the return anyway. That is a request for an exception, so it goes to a person.

Second, the two layers.

The prompt steers. Clear instructions, explicit criteria and a few examples of the hard cases make the right answer much more likely. With our new criterion, the jacket question gets the policy answer almost every time. But a prompt cannot promise it.

The application guarantees. A schema is a fixed list of the fields an answer must have, with the type of each field. The API can make Claude's output follow a schema every time. We build this later, in the section on structured output.

But a schema guarantees the shape of the answer, not its facts. Claude can still put a wrong date into a correct field. So your code checks the facts. For the jacket, the delivery date comes from the order, not from the chat. Our code counts the days and checks if the window is still open. Claude explains, and the code confirms.

Third, the fixes the exam rejects.

A bigger model does not help, because it still sees two readings of an unclear rule. A larger context window does not help either, because it adds more text around the same gap.

Louder instructions also fail. Say we write the rule in capital letters and add the word mandatory. Claude follows it more often, but still not every time.

So diagnose first. Is this a judgment problem? Then give Claude a clearer criterion or a better example. The jacket question was one: two readings, and a criterion fixed it. Must the rule hold every time? Then add a check in code. The thirty-day count is one: our code checks the date on every request.

Let's recap.

When the same question gets different answers, look for an unclear rule in the prompt. State the criterion that decides between the two readings. The prompt steers with instructions, criteria and examples. The application guarantees: a schema fixes the shape, and a check in code verifies the facts. A bigger model, a larger context window or louder words cannot fix an unclear rule.

So first ask if this is a judgment problem or a rule that must hold every time. Then fix the prompt, or add the check in code.

Next, we measure if a prompt change really made the answers better.
