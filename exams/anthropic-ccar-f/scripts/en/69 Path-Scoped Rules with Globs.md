# 69. Path-Scoped Rules with Globs

Last time, we split ShopAssist's large CLAUDE.md into topic files in the rules folder. Each package now imports the standards it needs. A rule file with no extra settings loads in every session.

This lesson is about making a rule load only when Claude Code works on the files that rule applies to. This matters for two reasons. First, every loaded rule uses context and tokens. Second, a rule that loads everywhere sits next to work it has nothing to do with.

Here is the scene. Our testing rules live in one file, testing dot md. But ShopAssist's test files are not in one folder. They sit next to the code they test. The refund service has its tests, and so does the MCP server. The chat window keeps a test file beside each of its components. So test files are spread across the whole repository. Right now, the testing rules load in every session. That includes a session where a developer only changes the release steps.

The most important thing to remember is this: a rule file can say which files it applies to. Claude Code then loads that rule only for those files. We look at three things. First, the paths field. Second, glob patterns. Third, choosing between a path-scoped rule and a CLAUDE.md file in a folder.

First, the paths field. A rule file can start with a short header called YAML frontmatter. YAML is a simple format for settings. The header sits between two lines of three dashes, at the top of the file. Inside it, we add one field. It is called paths, and it holds a list of file patterns. So the frontmatter says: paths, followed by a list of patterns. The testing rule is on screen, with its header and the rules below it.

Now Claude Code does not load this file in every session. It loads it when it works on a file that matches one of the patterns, for example when it edits a test. In a session about the release steps, the testing rules stay out of the context. The rule does not use tokens there, and it does not get mixed up with the work.

Second, glob patterns. A glob is a short pattern that matches file paths. A single star matches any part of a file name. Two stars in a row match any folder, at any depth. So the pattern on screen means: any file whose name ends in dot test dot tsx, in any folder of the repository. That covers every test file in the chat window, wherever it sits. The pattern matches files by type, not by location. A developer can add a new folder with new tests next week. Those tests match too, and nobody has to update anything.

A pattern can also cover one folder and everything under it. The team describes its servers in a folder called terraform. Terraform is a tool that sets up servers from configuration files. A deployment rule can use the pattern terraform, then two stars, then one star. That rule loads only when Claude Code edits files in that folder. Both examples are on screen.

Third, the choice. The team had two other options for the test conventions. The first was a testing section in the root CLAUDE.md. That section loads in every session. Claude Code would also have to work out by itself which section fits the file it is editing. The second option was a CLAUDE.md in every folder that holds tests. A directory file belongs to one folder. So the same test rules would exist in many copies, and those copies drift apart over time. Every new folder would also need its own copy.

So here is the rule for choosing. When a convention belongs to one directory, use a CLAUDE.md in that directory. The refund folder's own rules are an example. Some conventions follow a type of file spread across the code base, like all test files. For those, use a path-scoped rule in the rules folder.

Remember that these rules are context, not enforcement. They guide Claude Code. A test that must always pass still runs in CI.

Let's recap. A rule file in the rules folder can start with YAML frontmatter that has a paths field. That field lists glob patterns. The rule loads only when Claude Code works on a matching file, so other sessions do not spend context on it. Two stars match any folder, so one pattern can cover every test file wherever it sits. Use a directory CLAUDE.md for rules that belong to one folder. Use a path-scoped rule for files spread across many folders.

So describe where a convention applies, and let Claude Code load it only there. Next, we decide where the team's custom commands and skills should live.
