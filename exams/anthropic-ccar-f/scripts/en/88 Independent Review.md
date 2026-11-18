# 88. Independent Review

So far, the ShopAssist team has used Claude Code with a person at the keyboard. Now the same tool moves into the team's pipeline, where nobody watches it. This lesson is about a question that comes first: who should review code that Claude wrote? This matters because a reviewer that shares the writer's thinking also misses the writer's mistakes.

Here is the scene. Remember the review bot the team added to its pull requests. It is a CI job that sends each diff to Claude and posts the findings as comments.

Now Claude Code writes more and more of the code that this bot reviews. This week, we ask Claude Code to add partial refunds to ShopAssist. A partial refund sends back only part of an order's amount. Claude Code writes the change and the tests. Then, in the same session, we ask it to review its own work. It says the change looks correct.

But the change has a bug. The new code checks the five hundred dollar limit on each refund, not on the total for the order. So two partial refunds of three hundred dollars each send back six hundred dollars, and no person ever sees the case.

The most important thing to remember is this: the reviewer must not share the writer's reasoning.

We look at three things. First, why self-review misses this bug. Second, two fixes that do not help. Third, an independent review instance.

First, self-review. The session that wrote the code still holds everything it thought along the way. While writing, it decided that the refund hook already handles the limit. So when it reviews, it reads the code through that decision. It checks that the code does what it intended. It is much less likely to question the intention itself. The exam calls this a self-review limitation. The model keeps its reasoning context from generation, so it rarely doubts its own choices in the same session.

Second, the fixes that look right. One is a stronger instruction: "Review this code critically, as if someone else wrote it." That fails, because an instruction does not remove the earlier reasoning. The session still remembers why every line is there.

The other fix is more thinking. The exam calls it extended thinking. On current models, you get more thinking with a higher effort setting, and that note is on screen. This fails too. More thinking by the same instance starts from the same reasoning. It only follows that reasoning further.

Third, the independent instance. We start a second Claude instance with a fresh context. It gets the diff and the project's standards, but not the conversation that produced the code. It does not know what the writer intended. It sees only what the code does. So it asks a plain question: what happens when one order gets two partial refunds? That question finds the bug. An independent instance like this catches subtle issues that self-review instructions and extended thinking miss.

In Claude Code, this is session context isolation. The review is a separate Claude Code run with a new session. It never resumes the session that wrote the code, and it never forks it, because a fork copies the writer's whole history. The reviewer can still be the same model. Independence comes from the context, not from a different model. So writing the code first and then reviewing it with an independent instance is a valid pattern. One instance writes, and a second one checks.

Let's recap. The session that wrote the code keeps its reasoning, so it rarely questions its own decisions. Telling it to be critical does not change that. More thinking by the same instance does not change it either. An independent instance with a fresh context catches the subtle bugs. In Claude Code, the review runs in its own session, never in the session that wrote the code. So let one Claude write the code, and let another Claude review it with a clean context.

Next, we look at changes that are too big for one review pass.
