# 75. Built-in Tools: Grep, Glob, Read, Write and Edit

Last time, we chose between plan mode and direct execution. In either mode, Claude Code does its work through a small set of built-in tools.

This lesson is about which tool fits which job. This matters because the wrong tool wastes rounds, misses code, or changes the wrong line. The same tools exist in agents built with the Agent SDK. The exam's developer productivity scenario uses them too.

Here is the task. A developer on the ShopAssist team sees that refund amounts are rounded in different ways. ShopAssist has a shared function that rounds an amount to whole cents. Some code calls that function, and other code rounds the amount by itself. The developer asks Claude Code to make every refund use the shared function and to check the tests.

The most important thing to remember is this: Grep searches inside files, and Glob finds files by their names. We look at three groups. First, the tools that find. Second, the tools that change a file. Third, the tool that runs commands.

First, finding. Grep searches the contents of files for a pattern. The pattern can be a function name, an error message or an import statement. Claude Code needs every place that calls the shared rounding function. So it runs Grep with the function's name. Grep returns each file and line where that name appears.

An error message from the logs works the same way. Say a customer saw "refund amount mismatch". Grep finds the one line in the code that writes that message.

Glob never looks inside a file. It matches file paths, so it finds files by name or by extension. The chat window keeps a test file next to each of its components. To list all of them, Claude Code uses Glob with the pattern on screen. It means any file that ends in dot test dot tsx, in any folder.

We should not mix these two up. Grep cannot list files by their names, and Glob cannot find a function call. Ask yourself one question: am I looking for text inside files, or for the files themselves?

Second, changing a file. Read loads the full contents of one file. Write creates a new file, or replaces a whole file with new content. Edit changes one targeted spot.

Edit takes two pieces of text: the old text to find and the new text to put there. The old text is called the anchor. It must appear exactly once in the file. Then Edit knows where to change, and the rest of the file stays as it was. So for a small change, use Edit. We should not rewrite a whole file with Write just to change one line. Any part that was not copied correctly is lost.

Now the case where Edit fails. In the refund file, the line that rounds the amount appears twice, in two different functions. Both lines have exactly the same text. Claude Code asks Edit to change that line, and Edit refuses. The anchor is not unique, so Edit cannot know which line is meant.

On the exam, the answer is Read plus Write. Claude Code reads the full file and makes the change in the right function. Then it writes the whole file back. Current Claude Code also has other fixes for a repeated anchor, and they are on screen. On the exam, answer Read, then Write.

Third, running commands. Bash runs shell commands, so after the change, Claude Code uses it to run the tests and see if they pass.

Let's recap. Grep searches file contents, such as function names, error messages and imports. Glob finds files by a name pattern, such as every test file in any folder. Read loads a whole file, and Write creates or replaces one. Edit changes one spot, and its anchor must appear exactly once. When Edit cannot find a unique anchor, the exam's fallback is Read, then Write. Bash runs commands such as tests.

So before Claude Code acts, decide what it needs: text inside files, files by name, one small change or a whole file. Then pick the tool for that job. Next, Claude Code explores a code base it has never seen, one step at a time.
