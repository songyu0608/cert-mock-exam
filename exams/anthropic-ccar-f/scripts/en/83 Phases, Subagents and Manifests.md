# 83. Phases, Subagents and Manifests

A scratchpad file and the compact command have kept one long exploration sharp.

This lesson is about work that is too big for one context and too long for one run. We split that work across subagents and phases. Then we make sure the findings survive a phase change, and even a crash. This matters because a large change can take days. If a day of findings is lost, you pay for that day twice.

Here is the task. The team is moving refund handling out of the main ShopAssist code and into its own service. That change touches hundreds of files. The work has three phases. Discovery maps the refund code. Design decides where the new service begins and ends. Migration moves the code, one part at a time.

A main agent runs the whole job, and we call it the coordinator. It can be the main Claude Code session, or the main agent of a developer tool built with the Agent SDK. The coordinator starts subagents for the detailed work.

The most important thing to remember is this: the coordinator keeps the big picture. Every finding that must survive is written down outside the conversation. We look at three things. First, focused questions for subagents. Second, a summary that carries each phase into the next one. Third, saved state and a manifest for crash recovery.

First, focused questions. We should not let the coordinator read every refund file itself. After an hour, its context is full of search output, and the big picture gets lost. We should not send one subagent a vague task like "understand the refund code" either. That subagent comes back with a long, general report.

Instead, the coordinator asks specific questions, one question per subagent. One subagent gets: find all test files that cover refunds. Another gets: trace the dependencies of the refund flow. That means the modules the refund code calls, and the modules that call it. Each subagent reads dozens of files in its own context. Then it returns a short, structured answer with names, files and facts. The raw output never reaches the coordinator. The coordinator keeps only the high-level picture: which parts exist, how they connect, and what comes next. The Explore subagent you met earlier follows the same idea.

Second, the phase summary. Discovery ends, and design begins. The design subagents are new. As you remember, a subagent knows only its prompt. So before it starts them, the coordinator writes a summary of the key findings from discovery. You can see it on screen. It lists the refund modules and their dependencies. It also lists the test files, the risks and the open questions. For example, the five hundred dollar limit is checked in two places, and only one of them has a test.

Every design subagent gets this summary in its initial context, at the start of its prompt. So it starts from the findings, not from zero. We should not pass the full discovery transcripts instead. They are long and noisy, and they bury the facts that matter in the middle.

Third, crashes. On the second day of migration, the run stops. Maybe the machine restarts, or the session ends. Three of the five parts are already moved. Without saved state, the job starts again from the beginning. Worse, it may repeat a step that has already changed files.

So each agent exports its state to a known location. That is a fixed folder in the project, with one file per agent. Each file holds the agent's task, its status, its findings, the files it changed and its next step. The agent updates its file after every step, not only when it finishes.

The coordinator also keeps a manifest. A manifest is one short file that lists every agent, the path to its state file, and its status. The status is done, in progress or not started. The manifest and one state file are on screen.

When the job resumes, the coordinator loads the manifest first. Parts that are done stay done. For the part that was interrupted, the coordinator reads that agent's state file. Then it injects the contents into the prompt of a new subagent: what was done, which files changed, and the next step. The work continues from the last recorded step.

We should not try to rebuild the job from the old conversation. A crash can cut the conversation off, and a long transcript forces the coordinator to guess. The state files on disk say exactly what is done.

Let's recap. The coordinator keeps the high-level picture and sends specific questions to subagents. Each subagent does the noisy reading in its own context and returns short findings. At the end of a phase, the coordinator summarizes the key findings. That summary goes into the first prompt of every subagent in the next phase. Each agent saves its state to a known location after every step. On resume, the coordinator loads the manifest and injects the saved state into the agents it restarts.

So when work runs over several phases and several days, keep the findings on disk, not only in a conversation.

Next, before we go on, we look at how the exam asks about the team's Claude Code setup.
