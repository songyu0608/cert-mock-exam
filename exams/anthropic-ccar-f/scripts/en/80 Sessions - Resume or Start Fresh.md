# 80. Sessions: Resume or Start Fresh

Earlier, Claude Code asked us questions before a change. We also grouped review problems by whether they affect each other.

This lesson is about work that runs over several days. When you come back to earlier work, should you continue the old session or start a new one? This matters because an old session can hold facts that are no longer true.

Here is the scene. On Friday, a developer on the ShopAssist team asks Claude Code to analyze the refund flow. Claude Code searches the code, reads about twenty files and runs the tests. By evening, it knows where refund amounts are calculated and where the five hundred dollar limit is checked. It also knows which tests cover each path.

All of this lives in one session. A session is one conversation with Claude Code, with every message and every tool result in it. Claude Code saves sessions as you work, so you can come back to them. On Monday, the developer wants to continue.

The most important thing to remember is this: resume when the old context is still mostly true. Start fresh when the old tool results are stale. We look at three things. First, resuming a named session. Second, telling that session what changed. Third, starting fresh with a summary.

First, resuming by name. On Friday, the developer gave the session a readable name: refund analysis. A name is much easier to remember than a long session ID. On Monday, the developer starts Claude Code with the resume flag, followed by that name. The command is on screen. Claude Code opens exactly that conversation, with all of Friday's findings. Maybe the developer worked on other things in between. That does not matter, because the name points to one specific investigation.

Current versions can also resume by session ID, and the details are on screen. On the exam, the answer is the resume flag with the session name.

Second, telling it what changed. Over the weekend, a teammate merged a pull request. It changed two files that Claude Code read on Friday: the currency helper and one refund test. The resumed session does not know this. Its tool results still show the old versions of those files. So Claude Code may reason about code that no longer exists.

That is why the developer's first message names the changes. It says: since Friday, the currency helper and the refund amount test have changed. Read those two files again before you continue. Claude Code re-reads only those two files. The rest of Friday's analysis is still valid, so it stays.

We should not ask Claude Code to explore the whole refund flow again. That throws away a day of valid work. Staying silent and hoping it notices is no better. Name the changed files, and let Claude Code check just those.

Third, starting fresh. Now imagine a different Monday. Over the weekend, the team moved the refund code into its own service. Most of the files from Friday have moved or changed. So most of the old tool results are stale. Stale means they describe code that is no longer there. A resumed session still holds all of them. Claude Code could mix the old picture with the new one, and naming two files will not help when almost everything changed.

So the developer starts a new session and puts a structured summary at the start. You can see it on screen. It holds the goal, the findings that are still true, and the decisions made so far. It also lists the open questions and the next step. It holds no old file contents. Claude Code reads the current code with fresh eyes, and the summary guides it. A short, correct summary is more reliable than a long history full of old results.

Here is what to remember. Give important sessions a name, and resume them with the resume flag and that name. Resume when the earlier context is still mostly valid. Then name the files that changed, so Claude Code re-reads only those. When most earlier tool results are stale, start a new session. Give it a structured summary with the goal, the findings, the decisions and the next step.

So before you continue old work, ask how much of the code has changed since then. If only a little changed, resume and name the changes. If a lot changed, start fresh with a summary.

Next, the analysis is done, and we compare two approaches that start from the same shared analysis.
