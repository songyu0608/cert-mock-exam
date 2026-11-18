# 81. Forking a Session

We have just resumed a named session to continue one line of work.

This lesson is about forking a session. Forking means making two independent copies of one conversation, so we can try two approaches from the same starting point. This matters because a fair comparison needs both approaches to start from the same facts.

Here is the scene. The refund analysis is finished. Claude Code has read the refund flow and found where amounts are calculated. It has also listed the tests that cover each path. That took most of a day.

Now the team sees two ways to change how the code is organized. The first approach keeps the refund calculation in its current module and adds the missing checks there. The second approach moves the calculation into a new, separate module that every refund path calls. The team wants to see both before it chooses.

The most important thing to remember is this: a fork copies the conversation up to now. Then each copy continues on its own. We look at three things. First, why we fork. Second, how to fork. Third, two different features that are both called fork.

First, why. We could try the first approach in the analysis session, and then the second approach in that same session. But then the second attempt is not fair. Claude Code still remembers the first design, with its problems and its arguments. Those ideas leak into the second design. Starting two new sessions is no better, because each one must repeat the whole day of analysis.

A fork avoids both problems. The shared analysis is the baseline. Each branch starts from that baseline, and neither branch sees the other.

Second, how. In Claude Code, you resume the named session, refund analysis, and add the fork session flag. The command is on screen. Claude Code opens a new session with a new session ID, and it holds the full history. The original session stays as it was. Inside an active session, the branch command does the same thing. We fork twice, once for each approach. In the first branch, we ask for the smaller change. In the second branch, we ask for the separate module.

In the Agent SDK, you resume a session by its ID and set fork session to true. The exam uses this name.

One detail matters here. A fork copies the conversation, not the files on disk. Both branches work in the same folder. So first ask each branch to plan, not to edit. Each branch returns the files it would change, the risks and the tests to run. We compare the two answers side by side. Then we choose one approach and build only that one.

Third, the two forks. A skill can also set context to fork in its frontmatter. That runs the skill in a subagent that starts without the conversation history. A session fork is the opposite, because it keeps the whole history. So a skill fork keeps noisy work out of the main conversation. A session fork starts from work that is already done.

Let's go over the main points. Resume continues one session. A fork copies a session's history into a new, independent branch. Fork once for each approach. Then every branch starts from the same analysis, and no branch sees the others. In Claude Code, use the resume flag with the fork session flag, or the branch command. In the SDK, resume by session ID and set fork session. A skill's context fork starts without history, and a session fork keeps it.

So when you have two good options, fork the analysis, compare the plans, and build only the one you choose. Next, a long exploration starts to give vague answers, and we keep it sharp.
