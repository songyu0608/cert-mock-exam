---
lab: true
---

# 72. Practice: Claude Code Hands-On - CLAUDE.md, Rules and a Skill

Earlier, we asked Claude Code questions in print mode, and each prompt had to carry everything Claude Code needed to know. A team cannot repeat its conventions in every prompt. Claude Code has three places where a project writes them down once: a project file, a rule for some of the files, and a skill. Today we write all three.

Here is the plan. Claude Code reads the project file, CLAUDE dot md, at the start of every session. A rule is read only when Claude Code works on a file that matches the rule's paths. And a skill is loaded when a request fits its description, or when we ask for it by name. We write the three files in this order. After each one, we ask Claude Code a question that only the new file can answer.

We start with the project file. It lives at the root of the project. It is open here, and it is still empty. First, a heading with the name of the project. Then one line on what the project is: a support assistant for an online store, built on the Claude API.

Now a section for our conventions. The first convention: tool functions return dictionaries, and they never raise an exception. A failure is the structured error we built before, with its five fields. The second: not found is data, not an error. The tool returns found false, with a message. The third: what an order ID looks like. O R D, a dash, and eight digits. And the last one: how to run scripts. Python, then the file name, from this folder. The virtual environment is already on the path, so a plain python command finds the project's packages.

That is the whole file. It is short, and that is on purpose. Claude Code loads it in every session, so it holds only what every developer should know.

Now the first question. It asks about our project, but it says nothing about our conventions: what must a tool return when the order does not exist? We type claude dash p, the question in quotes, and output format text, so the answer comes back as plain text.

Let's run it. Claude Code starts in this folder, so it reads CLAUDE dot md before it answers. Then it answers in one sentence, as we asked. The answer: an ordinary result with found false and a message, not an error. That is exactly the convention we wrote, and the prompt never mentioned it.

Next, a rule that applies only to some of the files. Rules live in the dot claude folder, in a folder called rules, and we open the file tools dot md there. A rule file can start with a short header between two lines of three dashes. This header is called front matter. Inside it, we write paths. This field says which files the rule is for. Ours is for the MCP server, for the tool scripts such as tool call dot py and tool errors dot py, and for scripts whose names start with agent. Each pattern is an item of a list: a dash, then the pattern in quotes, on its own line. Three dashes close the header.

Then the rule itself, under a heading: tool code. Every tool function logs its call before it does anything else. And the customer message stays free of internal details. Those go into the developer message. Because of the paths, Claude Code loads this rule only when it works on one of those files. When it edits the chat page, the rule costs nothing. When it touches a tool, the rule is there.

So the second question must make Claude Code work on a tool file. Tool errors dot py has our lookup order tool, so we ask Claude Code to read that file and to say which of our conventions the tool breaks.

Let's run it. To answer, Claude Code reads tool errors dot py, and that file matches the paths of our rule. Reading a file takes a few seconds more than a plain question. The answer: lookup order does not log its call first, and that breaks the rule in tools dot md. The logging rule is not in CLAUDE dot md. It lives only in the rule, and Claude Code had it because tool errors dot py matches the rule's paths.

Third, a skill. A skill is a procedure we want Claude Code to repeat the same way every time. Each skill gets its own folder in the skills folder inside dot claude, with a file named SKILL dot md. Ours is called order check. It starts with front matter too. First, the name: order check. Then the description. This line matters most, because Claude Code reads it to decide when the skill applies. Ours says: check whether an order can still be returned, and use it when someone asks about returning a specific order ID.

Then allowed tools. Here we list one: running Python commands. That approves this command in advance, so the skill can run it without asking for permission. Three dashes, and the header is closed.

The body is the procedure, in plain steps. Given an order ID. Step one: run a short Python command from the project folder. Our MCP server has a function, lookup order, that returns the facts of one order. The command imports it and prints what it returns. The words order ID in angle brackets only mark a spot: Claude Code puts the real ID there. Step two: if the order is found, say how many days ago it was delivered, and whether that is inside the thirty-day return window. Step three: if it is not found, say so, ask for the correct ID, and do not guess.

Now the third question. Our MCP server has two test orders, and one of them is a lamp. We ask Claude Code to use the order check skill for the lamp order. This time we also pass allowed tools on the command line: the skill tool, and Python commands.

Let's run it. The skill's header approves Python only once the skill is running. Calling the skill is a tool call too, and in print mode nobody is there to approve it. So we approve the skill tool here, and Python commands as well. We named the skill in the prompt, so Claude Code loads it by name. Without the name, it would pick the skill by its description. Then it follows the steps. It runs the Python command, and reads what lookup order returns. That takes a few seconds. The answer: the lamp was delivered forty-five days ago. That is fifteen days past the thirty-day window, so the lamp cannot be returned. The number comes from our own code, not from a guess.

One note for the exam, about the allowed tools line in the skill's header. The exam guide describes it as a restriction: the skill may use only the tools on that list. That is the answer to give on the exam. In the current product, allowed tools approves the listed tools in advance, and it does not restrict the others. So read the setting as approval in advance in your own projects.

So here is what happened. The project file answered the first question, because Claude Code reads it in every session. The rule answered the second one, because the question took Claude Code to a tool file. And the skill turned a request about one order into a fixed procedure that runs our own code.

So the practical rule: put shared conventions in CLAUDE dot md. Put details for some of the files in a rule with paths. And put a procedure you repeat in a skill with a clear description.
