# 70. Where Commands and Skills Live

A path-scoped rule now makes Claude Code load the testing rules only for test files.

This lesson is about reusable workflows, which are custom commands and skills, and where each one should live. This matters because the same file can reach the whole team or only you. The folder decides which.

Here is the scene. Maria is a developer on the ShopAssist team. Before every pull request, she types the same long request into Claude Code. The request says: review my changes, and focus on refund logic, escalation and missing tests. She also asks for each finding with its file, its risk level and a suggested fix. Other developers write their own versions of this request, and each version is a little different. So the reviews come out different too.

The most important thing to remember is this: the folder decides who gets the workflow. A folder in the repository reaches the whole team. A folder in your home directory reaches only you. We look at three things. First, commands. Second, skills and their personal variants. Third, how to choose between a skill and CLAUDE.md.

First, commands. A custom slash command is a saved prompt with a name. You type a slash and the name, and Claude Code runs the prompt. The command is a plain text file, and the file name becomes the command name. We turn Maria's request into a file called review dot md. We put it in the commands folder inside the repository's dot claude folder. The path is on screen. Then we commit the file like any other change. Everyone who clones or pulls the repository now gets the slash review command. Leo, the newest developer, gets it on his first day too.

A personal command lives in the same kind of folder, but in your home directory. Version control never sees it, so your teammates never get it. Use it for your own habits, like a command that writes your daily notes.

We should not define the team's command in the project CLAUDE.md, or in a list of commands inside a config file. CLAUDE.md holds instructions, not command definitions. A config file has no commands list at all. A team command is a file in the repository's commands folder.

Second, skills. A skill is a reusable workflow with more structure than a single prompt. Each skill has its own folder inside the skills folder of dot claude. That folder holds a file called SKILL.md. The file starts with a short description, and then come the instructions. Claude Code loads a skill only when it is needed. A developer can call it by name. Claude can also pick it when its description fits the task. So a skill runs on demand. We also turn Maria's review into a skill, with a longer checklist for refund code. The folder rule is the same for skills. A skill in the repository reaches the team, and a skill in your home folder reaches only you.

One product note. Current Claude Code has merged commands into skills, and the commands folder still works. The details are on screen. On the exam, a team command lives in the repository's commands folder.

Now Leo wants a review that checks only security. We should not edit the team's skill, because every teammate would get his change. He also should not copy the skill into his home folder under the same name. Then his copy quietly replaces the team's skill for him. Nobody can see that his reviews no longer follow the team's checklist. Instead, Leo creates a personal variant in his home skills folder, with a different name, like security review. The team's skill stays the same for everyone.

Third, skills or CLAUDE.md. CLAUDE.md is always loaded. It holds universal standards that apply to every task, like the test framework and how amounts are stored. A skill loads on demand, so it fits a workflow for one kind of task, like a review or release notes. Maria's checklist is long, and it matters only before a pull request. In CLAUDE.md, it would take up context in every session, so it becomes a skill. Some conventions must apply every time certain files are edited. Those belong in a path-scoped rule, not a skill, because a skill loads only when someone calls it or Claude picks it.

Let's recap. A team command is a file in the repository's commands folder, shared through version control. A personal command lives in the commands folder in your home directory. No config file has a commands list. Each skill has its own folder with a SKILL.md, and it runs on demand. A personal variant of a team skill goes in your home skills folder, under a different name. CLAUDE.md holds what every task needs, and a skill holds what one task needs.

So before you save a workflow, decide who should get it. Then put it in the folder that reaches exactly those people. Next, we use a skill's frontmatter to control how the skill runs.
