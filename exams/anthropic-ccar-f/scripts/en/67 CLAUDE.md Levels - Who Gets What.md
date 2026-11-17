# 67. CLAUDE.md Levels: Who Gets What

In the last section, the store's research assistant learned to keep its claims tied to their sources. Now we turn to the team that builds ShopAssist, and to a tool that team uses every day.

This lesson is about CLAUDE.md files, and which of their instructions each person on the team actually gets. This matters because two developers can run the same tool on the same code and get different results.

Here is the scene. Over the last months, ShopAssist's repository has grown. It holds the agent, its tools, its hooks and many tests. We work in it with Claude Code, the coding tool that reads files, edits code and runs commands. You install it with its native installer, and the command is on screen.

This week, a new developer named Leo joins the team. On his first day, Leo asks Claude Code to add a test for the refund limit. The test comes back in the wrong style. It uses a different test framework. It also calls the real payment service instead of our fake one, a stand-in that only pretends to pay. For the rest of us, Claude Code never does that.

The most important thing to remember is this: a CLAUDE.md file reaches only the people whose Claude Code loads it. We look at three things. First, the three levels. Second, why Leo is missing the team's rules. Third, how to check what a session loaded.

First, the levels. A CLAUDE.md file is a plain text file with instructions. Claude Code reads it when a session starts, so you do not have to repeat the same rules in every prompt. The exam calls these files memory files. They can live at three levels, and the exact paths are on screen.

The user level is a file in your home folder, inside a hidden folder called dot claude. It applies to every project you open, but only for you. It is not part of the repository, so version control never shares it with your teammates. Personal preferences belong here, for example a wish for short explanations.

The project level is a CLAUDE.md at the root of the repository, or inside the repository's own dot claude folder. We commit it like any other file. So everyone who clones or pulls the repository gets it. Team conventions belong here: the test framework, the fake payment service, and rules like "refund amounts always come from the order".

The directory level is a CLAUDE.md inside a folder deeper in the repository. Say the refund code has its own folder. A file there holds rules that matter only for that code. Claude Code loads it when it works with files in that folder. Claude Code combines all the files that apply, and the more specific ones add to the general ones.

Second, Leo's problem. We should not guess, so Leo runs the memory command, shown on screen. It lists the memory files that this session loaded, and it can open each one for editing. Leo sees the project file, but our test rules are not in it. Then one of us runs the same command on an older laptop. That list also shows a user-level file, and the test rules are there. When we started the project, we wrote our conventions into that personal file. Claude Code on that laptop always followed them. But the file never reached the repository, so Leo's Claude Code has never seen them.

The fix is to move the team's conventions into the project CLAUDE.md. That change goes through a pull request, like any other change. After the merge, everyone who pulls the repository gets the same rules, including the next new hire. Personal preferences stay in the user-level file. We should not send Leo a copy of the personal file for his home folder. Then two copies slowly drift apart, and the next new developer has the same problem. Team rules belong in version control.

Third, sessions that behave differently. The memory command also helps when Claude Code follows a rule in one session and ignores it in the next. Assume the "amounts come from the order" rule lives only in the refund folder's CLAUDE.md. In one session, we edit refund code, and Claude Code follows the rule. In another session, we work on the checkout code, which also handles refund amounts. There, the rule seems to be gone. The memory command shows that this session never loaded the refund folder's file. A directory file reaches only the work in its own folder. When a rule must apply everywhere, move it up to the project file.

One product note. On the exam, the memory command is the one that checks which memory files are loaded. In current versions, the memory command lists and opens the files. A second command, called context, shows everything that is loaded in the session right now. Both are on screen.

Let's sum up. The user-level file lives in your home folder, and it reaches only you. The project file lives in the repository, and version control shares it with the whole team. A directory file adds rules for one folder, and it loads only when Claude Code works there. When a new teammate is missing the team's instructions, look at the user level first. Then move those instructions into the project file. The memory command shows which files a session actually loaded.

So put each rule where the people who need it will load it. Team rules go in the repository, and only your own habits go in your home folder. Next, the project file grows, and we split it into focused parts.
