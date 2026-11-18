# 18. Few-Shot for Format and Judgment

The team's review bot now has explicit criteria, so it reports the right kinds of problems. This lesson is about making its comments look the same, and judge the same way, on every run. This matters because developers read a comment faster when they know where each part is. They also trust a bot more when it does not change its mind.

Here is where we are. The review bot is a small CI job. It sends the diff of every ShopAssist pull request to Claude. Then it posts Claude's findings as comments. Its prompt already lists what to report, what to skip, and the severity levels. The prompt even describes the comment layout in detail.

Still, no two comments look alike. One comment is a long paragraph. Another is a list with no line number. A third names the problem but suggests no fix. And on unclear code, the bot reports a finding on Monday and skips the same kind of code on Tuesday.

The most important thing to remember is this: when detailed instructions still give uneven results, show Claude two to four good examples. Examples placed in the prompt like this are called few-shot examples.

We use them for three jobs. First, a fixed format. Second, unclear cases, with the reasoning. Third, contrasting pairs that separate fine code from a real problem.

First, the format.

We do not describe the layout again. Instead, we add one complete comment as an example. It is on screen now, and it has four parts. The location is the file and the line. The issue says what is wrong in one sentence. The severity uses one of our defined levels. The suggested fix says what to change.

When Claude can see the shape, it follows it very reliably. A description of the shape works much less reliably. So with an example like this in the prompt, every comment has the same four parts, in the same order. Developers can scan them quickly. The CI job can also post each part in its place.

Second, the unclear cases.

Here, the example must show the reasoning. It explains why we chose this action, and not the other one that also looks reasonable.

Here is one case. A pull request adds a new branch to the refund code. Refunds above five hundred dollars now go to a person. The tests still pass. So should the bot stay quiet?

Staying quiet looks reasonable, but it is wrong. Our example says: report it, because no test runs the new branch. Passing tests only prove that the old paths still work. The new behavior is not checked at all.

The reasoning is what makes the example useful. Without it, Claude takes one case from the example: refund code and five hundred dollars. With it, Claude takes the rule behind the case.

Next week, a change adds a branch for the thirty-day return window. Again, no test covers it. That case is not in the prompt, but Claude still reports it, because the example gave it the reason, not only the words.

Nothing is stored between requests. The examples sit in the prompt, and Claude reads them again every time. This is how examples help Claude generalize to new patterns.

The same idea works for ShopAssist itself. Some customer requests could fit two of its tools. An example with the reasoning shows which tool to use, and why. But check the tool descriptions first. When Claude picks the wrong tool because that tool's description is too short, fix the description.

Third, contrasting pairs.

A pair shows two pieces of code that look alike. One is fine, and the other is a real problem.

Here is a pair. In the first piece, the order search finds no match and returns an empty list. That is fine. No match is a normal result, so the bot skips it.

In the second piece, the order service times out, and the code also returns an empty list. That is a real problem. A failure now looks like "no order found", and the customer hears the wrong thing. So the bot reports it.

Each half of the pair carries one sentence of reasoning. The acceptable half shows Claude what not to flag, and that cuts false positives. The problem half keeps the real findings. Together, they show where the boundary is.

Now, how many examples? Two to four targeted ones. We should not build a long gallery of twenty examples. It costs tokens on every request. Claude may also start copying their surface details, like a file name or a phrase. Pick examples for the cases that actually fail, and make them different from each other.

And remember that examples steer Claude. They do not guarantee anything. A rule that must always hold still needs a check in code. Refunds above five hundred dollars must go to a person every time, so the code checks the amount.

Let's recap.

When detailed instructions still give uneven results, add two to four few-shot examples. One complete example fixes the format: location, issue, severity and suggested fix. For an unclear case, the example explains why one action wins over the other reasonable choice. That reasoning lets Claude handle new cases it has never seen. Contrasting pairs separate acceptable code from real problems, and they cut false positives.

So when the bot is inconsistent, stop adding words to the instructions. Show it a few good examples, with the reasons.

Next, the team uses the same idea for a different job: pulling values out of bug reports.
