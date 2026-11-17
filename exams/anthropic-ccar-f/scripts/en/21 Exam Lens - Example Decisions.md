# 21. Exam Lens: Example Decisions

We have just seen how the exam asks about criteria for the team's review bot. This lesson covers the other half: decisions where the fix is a few good examples, not stronger wording. This matters because the exam offers louder instructions and bigger models as answers, and they sound convincing.

We go through two decisions. First, findings that come back in different formats. Second, acceptable code that keeps getting flagged.

First decision.

The review bot runs in CI on every pull request. A CI job takes each finding and posts it as a comment on the right line. Assume that about one finding in five looks different from the rest, and developers lose time hunting for the line and the fix. One finding has no line number. Another is a long paragraph, with the fix hidden in the middle. A third finding has no suggested fix at all. The prompt already describes the layout in detail.

What does this situation demand? The question asks for the fix that makes the output consistent. Nothing here asks for a guarantee, so look at the prompt first.

Two fixes sound reasonable. The first is to repeat the format rules in capital letters: you MUST always include the line number. That fails, because the instruction was already clear. Louder words only repeat a description that Claude already follows unevenly.

The second fix is to move the bot to a bigger model. That fails too. A stronger model reads the same description, and it still has no shape to copy.

The best move is two to four complete example comments in the exact format. Each one has a location, an issue, a severity and a suggested fix. Claude copies a shape it can see much more reliably than it follows a description of that shape.

Here is the rule. When detailed instructions still give an uneven format, stop describing the format and show it.

Second decision.

ShopAssist's order search returns an empty list when no order matches. The team chose this on purpose, because no match is a normal, successful result. But the bot flags every function like this as missing error handling. Assume developers dismiss twelve of these comments in one week.

Again, the question asks for a first fix, not a guarantee.

Two fixes sound reasonable here as well. The first is a strong instruction: never flag functions that return an empty list. That fails, because the rule is too wide. Now the bot also skips a real problem. Some code catches a timeout and returns an empty list. Then a failure looks like "no order found", and the customer hears the wrong thing.

The second fix is to list every function where the pattern is allowed. That fails in a different way. The bot learns only the listed names, so it flags the next new function again.

The best move is a contrasting pair, with one sentence of reasoning for each half. In the acceptable half, the search finds no match and returns an empty list. The bot skips it, because no match is a normal result. In the problem half, a timeout is caught and an empty list comes back. The bot reports it, because a failure is hidden as success.

The reasoning shows where the boundary is. So Claude can judge new code it has never seen, not only the cases in the prompt.

Here is the rule. When acceptable code keeps getting flagged, show it next to the real problem it looks like, and say why they differ.

Here are the main points to remember.

Uneven formats come from a missing model answer, not from quiet wording. Two to four complete examples of the exact format fix them. Capital letters and a bigger model leave the cause in place. A legitimate pattern that keeps getting flagged needs a contrasting pair with reasoning. A wide ban or a list of names either hides real problems or misses new code.

The same rule works in the exam's extraction scenario. Documents arrive in different layouts, and a field comes back empty or filled with a guess. Stronger wording, like "always fill every field", only makes the guessing worse.

So when Claude's output is uneven or wrong in a repeated way, do not make the instructions louder. Show two to four targeted examples, with the reasoning.

Next, ShopAssist gets its first tool. If JSON and schemas are new to you, watch the optional lesson "Functions, JSON and Schemas", at the end of the course, first.
