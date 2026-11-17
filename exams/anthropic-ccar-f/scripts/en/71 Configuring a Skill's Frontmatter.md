# 71. Configuring a Skill's Frontmatter

We now know where the team's commands and skills should live.

This lesson is about a skill's frontmatter. These are a few settings at the top of its SKILL.md file. They control how the skill runs. This matters because a skill without these settings can flood the conversation. It can also do more than it should, or start without the input it needs.

Here is the scene. The ShopAssist team has a skill called map flow. It sits in the repository's skills folder, so every developer has it. You give it one part of ShopAssist, for example the refund flow. The skill traces how a support case moves through that code. It finds where the refund amount is checked, where escalation happens, and where the customer's message is written. Then it reports what it found.

In the first week, the team sees three problems. First, the skill prints every file it reads into the chat, so the developer's conversation fills with search output. Second, it once changed a file that it was only supposed to read. Third, when a developer types its name with nothing after it, the skill guesses what to map. Then it walks through the whole repository.

The most important thing to remember is this. The frontmatter decides where a skill runs and what it may use. It also decides what the skill needs to start.

Frontmatter is the short header between two lines of three dashes, at the top of SKILL.md. You met the same kind of header in path-scoped rules. Every skill has a name and a description there. Three more keys fix our three problems: context fork, allowed tools and argument hint. The full header is on screen.

First, context fork. Without it, the skill runs inside the developer's conversation. Every file it reads and every search result stays there. After one run of map flow, the main session holds dozens of files of discovery output. That leaves less room for the developer's real work.

With context set to fork, Claude Code runs the skill in an isolated sub-agent context. That is a separate conversation for a helper agent. The helper reads, searches and explores in its own space. When it finishes, only its result comes back to the main session. Here, that result is a short map of where the refund flow lives and which tests cover it.

Use context fork for skills with verbose output, like codebase analysis. Also use it for exploratory work, like brainstorming three ways to restructure the refund code. The main session needs a short comparison, not every idea along the way. We should not fix the flooding by adding "keep your output short" to the skill's instructions. The searching still happens in the main conversation. Fork moves it somewhere else.

Second, allowed tools. Map flow should only read and search. On the exam, the allowed tools key restricts which tools a skill may use while it runs. So we list three tools: Read, Grep and Glob. Read opens a file. Grep searches inside files, and Glob finds files by name. In the exam's terms, map flow now cannot edit a file or run a command. The exam's own example is a skill that creates files. It is limited to writing files, so it cannot run a destructive command, like deleting a folder. In both cases, the skill gets only the tools its job needs. The current product reads this key differently, and that note is on screen. On the exam, answer that allowed tools restricts the skill.

Third, argument hint. Map flow needs one input: which part of ShopAssist to map. A forked skill starts without the main conversation's history. So it cannot look back in the chat to find out what the developer meant. The argument hint is a short text that tells the developer what to provide. Ours says: the flow to map, such as refund or escalation, or a pull request number. When a developer types the skill's name, Claude Code shows the hint next to it. So someone who calls the skill without arguments sees what is missing. The hint does not check the input. It only makes the required input clear.

One more point about this header. Some tutorials describe a trigger field that tells Claude when to start a skill. That field does not exist. Claude picks a skill by its description. So when a skill starts at the wrong time, or never starts, rewrite its description.

Let's recap. A skill's frontmatter sits at the top of SKILL.md, together with its name and description. Context fork runs the skill in an isolated sub-agent, so verbose output and exploration stay out of the main session. Allowed tools, in the exam's words, restricts the tools a skill may use. Argument hint tells the developer which input to provide. There is no trigger field, because Claude chooses a skill by its description.

So when a skill floods the chat, does too much, or starts without its input, fix its frontmatter. Next, we set all of this up ourselves.
