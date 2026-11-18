# 78. Refinement: Examples and Tests

We have just seen the Explore subagent keep noisy searches out of the main conversation.

This lesson is about what to do when Claude Code keeps understanding a change you describe in the wrong way. This matters because each new description costs another round. The next answer can also be wrong in a new way.

Here is the scene. ShopAssist stores every refund as a record in the store's database. The old records use an old format, and the team is moving them to a new one. A developer asks Claude Code to write the migration script. A migration script is a program that converts stored data from one format to another. The request says: store amounts in cents, write dates as year, month and day, and turn status codes into words. The script comes back wrong. The developer explains again, with more detail. It comes back wrong a second time, and then a third. Each time, a different part is wrong.

The most important thing to remember is this: when your description is read in different ways, stop describing and start showing. We look at three tools. First, input and output examples. Second, tests written before the code. Third, one exact test case for an edge case.

First, examples. Look at what went wrong. Old dates are written as two numbers, like the one on screen. Is that March ninth, or the third of September? The words "year, month and day" do not say. An old amount of twelve dollars is stored as just "12". Claude Code turned it into twelve cents. The description was clear to us, but it allowed two readings.

So we stop adding sentences. Instead, we give two or three concrete examples. Each one shows an old record and the exact new record it must become. They are on screen. One example shows the date as the third of September, so the order of day and month is fixed. Another shows "12" becoming twelve hundred cents. A third shows status code seven becoming the word "refunded".

An example cannot be read two ways. You saw the same idea with few-shot examples in a prompt. Here, it fixes a code change. On the exam, concrete input and output examples are the most effective fix when a written description gives inconsistent results. We should not write a fourth, longer description. More words leave the same gaps, and they can add new ones.

Second, tests first. Examples show the main cases. Tests check every case, every time. So before Claude Code writes the script, we write a test suite. A test suite is a set of tests that run together. Ours covers three things. The first is expected behavior, and our examples become tests. The second is edge cases, which are unusual records, such as a zero amount or an unknown status code. The third is performance. Assume the real table holds two million records. So one test converts a sample of ten thousand, and it must finish within a few seconds.

Then Claude Code writes the script and runs the tests with Bash. Now we iterate. Some tests fail. We share each failure exactly as the test reports it: the input, the expected output and the actual output. Claude Code fixes those cases and runs the suite again. Each round, fewer tests fail. So the tests tell us when the work is done, and we do not judge it by eye.

We should not just reply: "It's still wrong, please fix it." Claude Code cannot see which case failed, so it may change code that was already correct. An exact failure gives it an exact target.

Third, one exact case for an edge case. After a few rounds, one problem is left. Some old refunds were paid before the item was delivered. Their delivery date is empty, a value called null. The script fills it with today's date. That breaks a ShopAssist rule: ShopAssist never states a delivery date that it did not read from an order. With a made-up date, the thirty-day return window would start on the wrong day.

A note like "handle missing dates properly" is vague again. "Properly" could mean today, a default date, or skipping the record. So we add one specific test case. Its input is an old record with a null delivery date. Its expected output is a new record that also has a null delivery date, with every other field converted as usual. Claude Code runs the test and sees exactly where its output differs. Then it fixes that one path. The test stays in the suite, so the bug cannot quietly come back.

Let's review what we learned. When Claude Code reads a written description in different ways, give two or three concrete input and output examples. Write the tests before the code. They cover expected behavior, edge cases and performance. Then improve the code round by round, and share each failure with its input, expected output and actual output. For an edge case like a null value, add one specific test case with the exact input and the exact expected output.

So when Claude Code understands a change in the wrong way, don't describe it again. Show it with examples, and check it with tests. Next, we let Claude Code ask us questions before the work starts.
