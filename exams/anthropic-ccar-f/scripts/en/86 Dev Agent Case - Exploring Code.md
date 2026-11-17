# 86. Dev Agent Case: Exploring Code

In the previous checkpoints, a developer was at the keyboard in every Claude Code session.

This third checkpoint uses the exam's developer productivity scenario. In that scenario, an agent built on the Agent SDK explores code and changes it with the built-in tools.

This lesson covers two decisions. First, how does that agent learn a large legacy module without running out of context? Second, how does it change many files without breaking them? This matters because both failures look like progress until the results come back wrong.

The ShopAssist team has built an agent like this for its own work. It is a program on the Agent SDK. It takes a developer's task. Then it reads, searches and edits the repository with Read, Write, Edit, Bash, Grep and Glob. Its first big job is the old billing module.

First decision. A developer asks the agent how invoice totals are calculated. Assume the billing module has about three hundred files. The agent starts by reading them one by one. After about eighty files, its context is nearly full. Then its answers turn generic. It says that totals are usually calculated in a service layer, and it names no class from our code. In the first hour, it found the real class. Now its answers no longer match that finding.

What does this situation demand? Nobody asks for a guarantee here. We need the first step that keeps the context from filling up and keeps the findings from getting lost.

One fix looks reasonable: use a larger context window, so all three hundred files fit. That fails. More text only makes the middle longer, and facts in the middle are the ones that get missed.

Another fix is to ask the question again and add "be specific about our code". That fails too. The early findings are still buried under the same discovery output.

The best move has three parts. First, explore step by step. Grep finds the entry point. Read follows the imports, one file at a time. One payment module only passes calls on to an outside library, so it gets special care. The agent lists every name it exports, then searches for each name.

Second, write the findings down. The agent keeps a scratchpad file with class names, files and facts. It reads that file before it answers later questions. At the end of each phase, it writes a short summary that the next phase starts from.

Third, keep discovery out of the main context. The Explore subagent does the noisy searching in its own context and returns a short summary. When the context still fills up, the agent first updates the scratchpad and then runs the compact command. Another option is to start a fresh session with the summary injected. The Agent SDK runs the same engine as Claude Code, so Explore and compact work there too. The details are on screen.

Here is the rule. Search before you read, keep findings on disk, and let a subagent carry the noise.

Second decision. The analysis is done. Now the team wants the same boilerplate in every event handler of the billing module. Boilerplate is code that repeats with almost no change. An event handler is a function that receives a message from the payment provider. Each handler must log a request ID as its first step. Assume there are about forty handlers. Their files all end in "handler", and they sit in many different folders.

What does this demand? A complete change that breaks nothing, and proof that it worked.

One fix looks reasonable: let the agent rewrite each handler file with Write. That fails. Write replaces the whole file, so any part that is not copied correctly is lost.

The second fix is to skip any file where Edit refuses the change, and report the rest as done. That fails as well. The change is incomplete, and nobody knows which handlers are missing it.

The best move uses each tool for its own job. Glob finds the files by their name pattern, in every folder. Then the agent uses Edit on each file, with the handler's first line as the anchor. Assume three files hold two handlers that start with exactly the same line. In those files, the anchor is not unique, so Edit refuses. The exam's answer for this case is Read, then Write: read the whole file, make both changes, and write it back. The current product also offers a longer anchor or a replace-all option, as the note on screen shows.

Finally, Bash runs the tests. Each failure goes back to the agent with its input, its expected output and its actual output.

Here is the rule. Find files by name with Glob, and change them with Edit. Use Read and Write only when the anchor is not unique. Let the tests decide when you are done.

One more point. The team may see two possible approaches: a log line in each handler, or one shared function that every handler calls. In that case, fork the session once for each approach, so both start from the same analysis.

Here are the main points to remember. When an agent drifts to typical patterns, the fix is not a bigger context window. Grep finds the entry point, Read follows the imports, and every exported name of the payment module gets its own search. The scratchpad file and the phase summaries keep the findings on disk. Explore, compact or a fresh session with a summary keep the noise out of the main context. For bulk changes, Glob finds the files and Edit changes each one. Read and Write are the backup when Edit refuses. Bash runs the tests.

The same rule works in the exam's research scenario. There, the synthesis agent has a limited context budget. It gets structured key facts from the search agents, not whole pages.

So the rule is the same for code and for sources. Keep the noise out of the agent's context, and write the findings down. Check every change before you call it done.
