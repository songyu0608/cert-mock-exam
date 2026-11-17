# 89. Multi-Pass Review

In the previous lesson, a second Claude instance with a fresh context reviewed the code that Claude Code wrote. This lesson is about what happens when that change is large. This matters because a review can look complete and still be shallow. Then the bugs it missed reach customers.

Here is the scene. The partial refunds feature has grown. The pull request now changes twenty-four files. They include the refund service and the refund hook. They also include the handoff to the support team, and the tests for all of these.

The independent reviewer reads all twenty-four files in one pass. Its comments on the first few files are detailed. The rest get one line each. It flags a rounding pattern as a problem in one file. Then it approves the same code in another file. It also misses a real bug, which we come back to soon.

The most important thing to remember is this: one pass over many files spreads the model's attention too thin. So we split the review into steps. We look at three passes. First, one pass for each file. Second, an integration pass across the files. Third, a verification pass that routes doubtful findings.

The cause has a name: attention dilution. Each file gets only a small share of attention, so the findings become shallow and sometimes contradict each other. We should not fix this with a bigger model or a larger context window. The files already fit. The problem is attention, not space.

First, the per-file passes. Our CI code sends each changed file to the reviewer on its own. Each request carries the file's diff and the team's review criteria. Each pass looks only for local issues, meaning problems you can see inside that one file. A missing check for an empty date is one example. Each pass returns short, structured findings with the file and the line.

Now every file gets the same depth. The same pattern also gets the same verdict, because every pass uses the same criteria.

Second, the integration pass. Some bugs live between files, and a per-file pass cannot see them.

Here is the bug the single pass missed. The refund service now returns amounts in cents. The handoff code still reads them as dollars. Each file is correct on its own. Together, they tell a person to refund six hundred and twenty dollars as sixty-two thousand.

So the integration pass gets the per-file findings and a short map of what each file passes to the others. It asks one question: does the data keep its meaning when it moves from one file to the next? That question finds the cents bug.

Notice the shape. Our code runs the steps in a fixed order: every file first, then the integration pass. This is prompt chaining, the fixed pipeline you met earlier, used for a review.

We should not run three full reviews and keep only the findings that appear at least twice. A real bug that only one run catches would disappear.

Third, the verification pass. A large review produces many findings, and some of them are doubtful. So a last pass checks each finding against the code and adds a confidence score to it.

The score decides where the finding goes. Findings with high confidence are posted as normal comments. Low-confidence findings go to a person first for a closer look, and none of them is dropped.

Remember that the score is only the model's own claim. So set the threshold with evidence. Compare past scores with findings that developers confirmed or dismissed. Confidence routes the findings. It does not decide which ones are true.

Let's recap. One pass over many files gives shallow and contradictory findings because of attention dilution. Per-file passes catch local issues with the same depth everywhere. An integration pass checks the data that moves between files. Running these steps in a fixed order is prompt chaining. A verification pass adds confidence to each finding and sends the doubtful ones to a person, without dropping any.

So when a change is too big for one careful read, split it. Run one pass per file. Then run one pass across the files.

Next, we make this review run in CI, with nobody at the keyboard.
