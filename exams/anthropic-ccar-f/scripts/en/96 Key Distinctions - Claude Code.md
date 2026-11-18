# 96. Key Distinctions: Claude Code

Over the last sections, the ShopAssist team set up Claude Code for its own work. Then it moved Claude Code into its CI pipeline.

In the previous lesson, we looked back at the product with the exam's eyes. This lesson does the same for the team's tools. It covers the Claude Code distinctions that the exam turns into wrong options. This matters because those wrong options name real files and real flags. The problem is that they put them in the wrong place, or use them for the wrong task.

The most important thing to remember is this: ask two questions. For a setting, ask who needs it and when it loads. For a task, ask what it says about its size, its context, and who is watching.

We go through two groups. First, configuration. Second, workflows. Together they cover the exam's third domain.

First, configuration. The first pair is the user file versus the project file. A CLAUDE.md in your home folder reaches only you, because version control never shares it. A CLAUDE.md in the repository reaches everyone who clones or pulls the project. So when a new teammate is missing the team's conventions, look at the user level first.

The memory command shows which files a session loaded, and the current product note is on screen. Then move the team rules into the project file. Sending the teammate a copy is the wrong option, because copies drift apart.

The second pair is a path-scoped rule versus a directory file. A directory CLAUDE.md belongs to one folder, so it fits conventions that live in that folder. A rule in the rules folder with a paths field loads for matching files in any folder. So conventions for test files spread across the code base go in a path-scoped rule.

One CLAUDE.md per folder is a wrong option here. So are a section in the root file and a skill. When one file grows too large, split it into topic files in the rules folder. Then let each package import only the standards it needs.

The third pair is a command or skill versus CLAUDE.md. CLAUDE.md is always loaded, so it holds standards that every task needs. A command or a skill runs on demand, for one kind of task. A team command goes in the repository's commands folder, and a personal one goes in your home folder. No config file has a commands list.

A skill with noisy output gets context fork, and an argument hint asks for the input it needs. In the exam's words, allowed tools restricts the skill. The current product reads this key differently, and that note is on screen. A personal variant keeps a different name. And a skill has no trigger field: Claude picks a skill by its description.

Second, workflows. The first pair is plan mode versus direct execution. Read what the task already tells you. Many files, an architectural decision or several valid approaches mean plan mode first. A clear change in one file, like a bug with a clear stack trace, means direct execution.

Starting directly and switching only if it gets hard is a wrong option when the task already states its size. Strong answers often combine the two modes: plan first, then carry out the approved plan directly. The Explore subagent keeps noisy discovery out of the main context.

The second pair has three sides: resume, fork and start fresh. Resume a named session when the old context is still mostly valid, and name the files that changed. Fork once for each approach when you compare two approaches from one shared analysis. Start fresh with a structured summary when most of the old tool results are stale.

Watch for one trap here. A session fork keeps the history, but a skill's context fork starts without it.

The third pair is a CI run versus a session with a person at the keyboard. In CI, nobody is watching. So Claude Code runs with dash p, and output format json with a json schema gives findings that a script can post. A shell timeout, a headless environment variable, a batch flag and empty input are all wrong options.

A CI run also has no memory, and the pipeline's machine has no developer's home folder. So the project CLAUDE.md carries the standards. The prompt carries the existing tests and the earlier findings.

Here is what to remember. Team settings live in the repository, and personal ones live in your home folder. Conventions for files spread across folders go in a path-scoped rule. CLAUDE.md is always loaded, while commands and skills run on demand. The size the task states decides between plan mode and direct execution. Whether you resume, fork or start fresh depends on how much of the old context is still true. In CI, use dash p with JSON output and a schema.

So for every Claude Code option, ask who needs it, when it loads, and what the task says about itself.

Next, we do the same for prompts and structured output.
