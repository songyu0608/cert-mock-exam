# 84. Claude Code Case: Team Setup

Over this section, the ShopAssist team set up Claude Code for its own work, with CLAUDE.md files, rules, commands and skills.

Before we go on, here is how the exam asks about that kind of setup.

This checkpoint is about a Claude Code setup that works for one developer and fails for everyone else. This matters because the exam's code generation scenario is a team like ours. Its wrong answers often put the right setting in the wrong file.

Here is the first symptom. The repository has an old billing module. It is legacy code, and nobody on the team fully understands it anymore. Leo, the newest developer, must add tests to it before anyone changes it. He asks Claude Code to do it. The tests come back with the wrong test framework. They also call the real payment service instead of the team's fake one. For Maria, who has worked on the project for years, Claude Code never does this.

What does this situation demand? Nobody asks for a guarantee here. We need the first step, and that step is to find out where the conventions live.

One fix looks reasonable: Maria sends Leo a copy of her conventions for his own home folder. That fails. The two copies slowly drift apart, and the next new developer has the same problem.

The best move starts with the memory command. It lists the memory files that a session loaded. Leo's list shows the project CLAUDE.md, but the test conventions are not in it. Maria's list shows one more file, at user level, in her home folder. The conventions are in that file. A user-level file reaches only its owner, and version control never shares it. So we move the team's conventions into the project CLAUDE.md through a pull request. After the merge, Leo runs the memory command again and sees them loaded. The product note on screen shows the context command too.

This decision has a second move. Test files sit next to their code in many folders: billing, refunds and the chat window. Assume they are spread across about forty folders.

One fix looks reasonable: put a CLAUDE.md with the test rules in each of those folders. That fails. A directory file belongs to one folder. So we get forty copies, and every new folder needs one more.

The best move is one rule file in the rules folder, with a paths field. Its glob pattern matches every test file in any folder. The rule loads only when Claude Code works on a matching file. One more detail: the billing module's own CLAUDE.md imports the shared money-handling standard with an at sign and a path. That way, the standard lives in one file.

Here is the rule. Team conventions go in the project's files. A convention for one type of file that is spread across folders goes in a path-scoped rule.

Second decision. Maria also wrote a release notes command. It reads the merged pull requests and drafts the notes for each release. The command file sits in the commands folder in her home directory. When Maria is away, nobody can run it. Teammates type their own requests, and the notes come out in a different shape each time.

She also has a log analysis skill. It reads the billing module's error logs and explains what failed. Assume one run prints about two thousand log lines into the chat. After that, the conversation has little room left for the real work. And when someone calls the skill without an input, it guesses which logs to read.

What does this demand? Again, a first step, and this time it is in the configuration.

For the command, one fix looks reasonable: each developer copies the file into their own home folder. That fails, because version control never sees those copies, and they drift apart.

The best move is to put the command file in the commands folder inside the repository's dot claude folder, and commit it. Everyone who clones or pulls the repository then gets the same command. Maria may want her own version. Then she keeps it in her home folder under a different name, so it does not replace the team's command for her.

For the skill, one fix looks reasonable: add "keep your output short" to its instructions. That fails, because the reading still happens in the main conversation.

The best move is in the skill's frontmatter. Context fork runs the skill as an isolated sub-agent, so only its short result comes back. Argument hint tells the developer which input to give, such as the date range of the logs. In the exam's words, allowed tools restricts the skill to tools that only read, like Read and Grep. The current product reads this key differently, and that note is on screen. On the exam, answer that allowed tools restricts the skill.

Here is the rule. A shared workflow lives in the repository, and a noisy skill runs in a fork.

Here are the main points to remember. When a new teammate is missing the team's conventions, check the user level with the memory command. Then move those conventions into the project CLAUDE.md. Conventions for files spread across folders go in a rule with a paths glob, not in one CLAUDE.md per folder. Imports keep each shared standard in one file. A team command goes in the repository's commands folder, and a personal variant keeps a different name. A skill with long output gets context fork and an argument hint.

The same rule works in the exam's CI scenario. There, Claude Code runs in a pipeline with the p flag, short for print, and nobody sits at the keyboard. The pipeline's machine has no developer's home folder, so it loads only what is in the repository.

So put every shared instruction, command and skill in the repository, and keep only your personal habits in your home folder.
