---
lab: true
---

# 17. Explicit Criteria That Reduce False Positives

Every change to ShopAssist's code goes through a pull request, and automatic checks run on it. One of those checks is a review bot. If pull requests and CI checks are new to you, two short lessons at the end of the course explain them.

This lesson is about making that review bot report only the problems that matter. This matters because developers stop reading a bot that comments on everything. When that happens, they also miss the comments that are real.

Here is the scene. ShopAssist is the support assistant we are building for an online store. A team of developers changes its code every day. Every change goes through a pull request, where a teammate reads the diff. Now we add one more reviewer, and that reviewer is Claude.

The review bot is a small CI job. It sends the diff of each pull request to Claude, then posts Claude's findings as comments on the changed lines. Its first prompt says: "Review this pull request. Find serious issues. Be conservative."

Within two weeks, the developers stop reading it. Most of its comments are about names, formatting, and code comments with slightly old wording. A comment that flags something that is not really a problem is called a false positive. Then one day, the bot finds a real bug in the refund code. Nobody reads that comment either.

The most important thing to remember is this: a precise reviewer comes from explicit criteria, not from asking Claude to be careful. Precision means how many of the reported findings are real problems.

We look at three things. First, what to report and what to skip. Second, severity levels with code examples. Third, what to do with the noisiest category while we fix it.

First, what to report and what to skip.

Look at the first prompt again. "Be conservative" sounds sensible, but what does it mean? Conservative about naming? About security? Claude has to guess where the limit is, and the guess changes from one pull request to the next.

"Only report high-confidence findings" fails in the same way. Claude can be very sure about a style point that nobody cares about. So confidence does not separate real problems from noise. Clear categories do.

So we write explicit criteria. They name what to report and what to skip. We report bugs that change behavior, such as a wrong amount or a wrong date. We also report security problems, such as customer data written to the logs. We skip minor style, like names and formatting. And we skip local patterns. A local pattern is code written the way this team already writes it, even if another way exists. The full prompt is on screen, with each part in its own labeled section.

Specific beats vague inside one category too. The first prompt asked Claude to check that code comments are accurate. That is vague. Is one old word in a comment wrong? A better criterion says this: flag a code comment only when the behavior it claims contradicts what the code actually does.

Here is a ShopAssist example. A comment says that refunds above five hundred dollars go to a person. The code below it checks for five thousand. The comment and the code disagree, so the bot reports it. A comment with a spelling mistake does not disagree with the code, so the bot skips it.

Second, severity.

The bot also gives each finding a severity level. In the first week, the same kind of problem was marked high on Monday and low on Tuesday. Words like "high" and "low" mean different things to different readers.

So we define each level, and we give a short code example for each one. They are on screen now. Critical means money or customer data is at risk. The example is refund code that takes the amount from the customer's message instead of from the order. Major means customers get a wrong result. The example is a return window counted from the order date, not the delivery date. Minor means a problem in a rare case, with no money at risk. The example is a missing check for an empty list of orders.

With an example next to each level, Claude can compare new code with something concrete. So the labels stay the same from run to run.

Third, the noisiest category.

False positives do not stay inside their own category. When most of the code-comment findings are wrong, developers stop trusting the whole bot. They dismiss the bug findings and the security findings too, even when those are right. That is what happened with the refund bug.

We should not keep every category switched on just because each one sometimes finds something. One noisy category costs the trust of all the others.

So we switch off the noisiest category for now. In our logs, that is the code-comment category. The bot keeps reporting bugs and security problems, and those findings are mostly right. Developers start reading it again. Meanwhile, we improve the criteria for code comments and test them. When that category is precise, we switch it back on.

Here is what to remember.

Vague words like "be conservative" or "only high-confidence findings" do not make a reviewer more precise. Explicit criteria name what to report, such as bugs and security problems. They also name what to skip, such as minor style and local patterns. Each severity level gets a definition and a concrete code example. One noisy category can make developers ignore every comment. So switch that category off for a while, fix its criteria, then switch it back on.

So when a review bot is noisy, do not ask it to be more careful. Tell it exactly what counts as a problem.

Next, we make its comments look the same every time, with a few well-chosen examples.
