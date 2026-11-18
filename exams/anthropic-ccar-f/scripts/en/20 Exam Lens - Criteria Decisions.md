# 20. Exam Lens: Criteria Decisions

In this section, we gave the team's review bot criteria and examples. We also pulled values out of bug reports with the same tools. Before we leave prompts, this lesson shows how the exam asks about criteria.

This matters because the exam's CI scenario has a team like ours, with a review bot like ours. Its questions offer fixes that sound careful but do not work.

We go through two decisions. First, developers ignore the bot. Second, the bot rates the same problem in two different ways.

First decision.

A review bot runs in CI on every pull request. It posts its findings as comments on the changed lines. Assume the logs show that developers dismiss about eight of every ten comments without reading them. Last week, the bot found a real security problem. That comment was dismissed too.

What does this situation demand? Nobody asks for a guarantee here. The question is about the first fix, so look at the prompt first.

Two fixes sound reasonable. The first is to add "be conservative" to the prompt. That fails, because Claude has to guess where conservative ends. The guess moves from one pull request to the next.

The second is to add "only report high-confidence findings". That fails too. Claude can be very sure about a naming point that nobody cares about. Confidence does not separate real problems from noise.

The best move has two parts. The first part is explicit categories. The prompt names what to report, such as bugs and security problems. It also names what to skip, such as minor style and local patterns.

The second part is to find the noisiest category in the dismissal logs and switch it off for a while. Assume it is the category for code comments. Why switch it off? False positives in one category make developers stop trusting the accurate categories too. When the criteria for that category are precise again, switch it back on.

Here is the rule. When trust collapses, name what to report and what to skip. Then pause the noisiest category.

Second decision.

The bot is quieter now, and developers read it again. Then a pull request changes two files with the same mistake. In both places, the refund amount comes from the customer's message, not from the order. The bot marks the problem critical in one file and minor in the other. Developers ask which label is true.

Again, the question asks for a first fix, not a guarantee.

One fix that sounds reasonable is to add the words "rate severity carefully and consistently". That fails, because critical and minor still mean different things on different runs.

Another fix is to move the bot to a bigger model. That fails as well. A stronger model still has no shared definition of each level.

The best move is severity criteria with a concrete code example for each level. Critical means money or customer data is at risk. Its example is exactly this kind of refund code. Major and minor each get their own definition and their own example. Now Claude compares new code with something concrete. So the same issue gets the same level in every file.

Here is the rule. Consistent severity comes from defined levels, and each level is shown with real code.

Here are the main points to remember.

Vague words like "be conservative" or "high confidence only" do not make a reviewer more precise. Named report and skip categories do. Switch off a noisy category while you fix its criteria, because it costs the trust of all the others. Severity stays the same across files when every level has a definition and a code example. A bigger model or stronger wording cannot replace a missing criterion.

The same rule works outside code review. The team's bug-report sorter also gives each report a priority. An instruction like "mark urgent reports as high" gives different labels to the same kind of report. Define each priority level and show one sample report for it, and the labels stay the same.

So when Claude must judge the same way every time, replace the vague word with a named criterion and a concrete example.
