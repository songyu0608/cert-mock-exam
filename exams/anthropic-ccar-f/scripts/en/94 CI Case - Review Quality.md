# 94. CI Case: Review Quality

In the previous checkpoint, the team's CI job learned three things. It finishes on its own, it returns its findings as JSON, and it remembers what it said before.

This last checkpoint is about the quality of the review itself. It covers two decisions. First, what to do when developers dismiss the bot's comments. Second, what to do when a large change gets a shallow review. This matters because a review bot only helps when developers trust it and when it reads every file with care.

Here is the first symptom. Assume the logs show that developers dismissed about sixty of the bot's comments in two weeks. Each finding has a file, a line, a severity, a category and a message. But the categories are broad, like "error handling". So nobody can tell which kinds of comments are the noise. The team only knows that trust is falling again.

What does this situation demand? Nobody asks for a guarantee here. We need a first step, and that step is to find the cause.

One fix looks reasonable: add "only report high-confidence findings" to the prompt. That fails. Claude can be very sure about a comment that nobody wants.

Another fix is to ask developers to write a reason each time they dismiss a comment. That fails as well. Free-text reasons are hard to count, and many people skip them. It also adds work for the very people who are losing patience with the bot.

The best move is one more field in each finding, called detected pattern. It names the code construct that triggered the finding. One example is "an optional field read with a default value". Another is "an amount taken from the customer's message". The schema makes this field required, so every finding carries it.

The script already knows which comments developers dismiss. Now it counts those dismissals by pattern. Assume forty of the sixty dismissals share one pattern: an optional field read with a default value. The team writes a clear skip rule for that pattern and adds one contrasting pair. Until the new rule is tested, the bot pauses only that pattern. All other error-handling findings keep running.

Here is the rule. Make every finding name its pattern, so that dismissals become data you can count.

Second decision. ShopAssist gets store credit as a new refund option. Claude Code writes the change, and it touches thirty-one files. Then the same session reviews its own work. The review is detailed for the first few files and gives the rest one line each.

Assume it misses a bug that lives between two files. The refund service now gives store credit a new status. The case-facts code still treats only the old status as a finished refund. So a customer's store credit shows as still pending.

What does this demand? Again, a first step, and this time it is about how the review is built.

One fix looks reasonable: tell the same session to review its changes critically, as if someone else wrote them. That fails. The session keeps the reasoning it had while writing. So it checks the code against its own intentions.

Another fix is more thinking in that same session. The exam calls this extended thinking, and the current setting is on screen. That fails too, because more thinking starts from the same reasoning.

The best move has three parts. First, an independent instance does the review. It is a new Claude Code run with a fresh session. It never resumes or forks the writer's session.

Second, the review runs in passes. One pass per file finds local issues, with the same depth in every file. Then an integration pass follows the data between files. That pass finds the new status that the case-facts code does not know.

Third, a verification pass checks each finding and adds a confidence score. The team set the threshold by comparing past scores with findings that developers confirmed or dismissed. Findings with high confidence are posted as comments. Doubtful findings go to a person first, and none is dropped.

Here is the rule. A large change needs a fresh reviewer, one pass per file and one pass across files. Confidence decides where a finding goes. It never deletes a finding.

With these two changes, the team's review bot changes too. In its first weeks, developers ignored it. Now they read it again.

Here are the main points to remember. When developers dismiss comments, add a detected pattern field and count the dismissals by pattern. Fix or pause the noisy pattern, not the whole bot. The session that wrote the code should not review it, and telling it to be critical does not change that. Split a large review into per-file passes and an integration pass. A verification pass with confidence sends doubtful findings to a person, without dropping any.

The same rule works in the extraction scenario. There, one overall accuracy number can hide a weak document type or field. So the team measures each segment on its own, and calibrated confidence decides where human review goes.

Whenever trust in Claude's output falls, split that output into parts you can measure, and fix the part that fails.
