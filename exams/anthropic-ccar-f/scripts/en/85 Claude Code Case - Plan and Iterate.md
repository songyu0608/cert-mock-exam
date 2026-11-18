# 85. Claude Code Case: Plan and Iterate

In the previous checkpoint, we fixed a Claude Code setup that worked for only one developer.

This second checkpoint covers two more decisions. First, how the team chooses a working mode. Second, how it fixes a change that Claude Code keeps getting wrong. This matters because the exam's code generation scenario asks both questions. Some wrong answers sound fast, others sound careful, and both kinds can cost days.

Here is the first symptom. The billing module still calls an old payment library that nobody maintains. Assume a search shows that library in about forty-five files. On the same morning, a bug report arrives. The billing module crashes when an invoice has no discount value. The stack trace points to one line in one function.

What does this situation demand? Nobody asks for a guarantee here. We need the right first step for each task.

The first fix that looks reasonable is to plan everything, to be safe. That fails on the bug. The plan only repeats what the stack trace already says, and a one-line fix waits for nothing.

The second fix is to start both tasks directly and switch to plan mode only if the migration gets hard. That fails on the migration. The task already says it is hard, because it touches forty-five files. Hidden links between parts of the code show up late, and then we have to remove half-finished edits.

The best move uses a different mode for each task. The migration goes to plan mode, where Claude Code explores and proposes changes without editing any file. Discovery across forty-five files is noisy, so the Explore subagent does the searching in its own context. Only its summary comes back. The plan proposes an order. The shared payment code comes first, then the billing service, then the tests. We approve it, and then we switch to direct execution for the planned steps. The null check goes straight to direct execution, because the file, the line and the cause are known.

Here is the rule. Read the task before you choose a mode. Wide work, or work with several valid approaches, gets a plan first. Small, clear work gets made directly.

Second decision. The migration runs, and a new problem shows up. The old library returned null for a refund that has not settled yet. The new code fills that empty date with today's date. So pending refunds now look paid. Assume about one billing record in fifty is affected. The developer has explained the rule twice: "handle missing values correctly." Each time, a different path comes back wrong.

What does this demand? Again, a first step, and this time it is in how we describe the change.

One fix looks reasonable: write a longer, more detailed description. That fails. "Correctly" can still mean today's date, a default date, or skipping the record. More words leave the same gaps.

Another fix is to reply: "It's still wrong, please fix it." That fails too. Claude Code cannot see which case failed, so it may change code that was already correct.

The best move starts with one specific failing case. Its input is a pending refund record with a null settled date. Its expected output is the same record, with the date still null and the status still pending. An example like this cannot be read two ways.

Then we write the tests before the next attempt. They cover expected behavior and edge cases, such as a null date, a zero amount and an unknown status code. Claude Code runs them with Bash. For each failure, we share the input, the expected output and the actual output. Each round, fewer tests fail, and the tests tell us when the work is done.

Here is the rule. When a description is read in different ways, show the exact input and expected output, and check every case with tests.

Here are the main points to remember. When the task states its size, choose the mode right away. A forty-five-file migration gets plan mode, with Explore for discovery. A one-line fix with a clear stack trace gets direct execution. When a change keeps coming back wrong, stop describing it. Give a failing case with its expected output, then iterate on test failures.

The same rule works in the exam's extraction scenario. An extraction keeps leaving one field empty on unusual documents. Stronger instructions do not help there either.

So in every scenario, let the task's stated size choose the working mode. Fix repeated mistakes with exact examples and failing tests, not with longer descriptions.
