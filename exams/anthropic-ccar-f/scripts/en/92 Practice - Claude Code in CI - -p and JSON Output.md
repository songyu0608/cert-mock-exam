---
lab: true
---

# 92. Practice: Claude Code in CI - -p and JSON Output

Earlier, we wrote our project's conventions into CLAUDE dot md and a rule for tool code, and Claude Code followed them while we watched. In a CI pipeline, nobody is watching. CI is the automatic pipeline that checks every change before it is merged. Today Claude Code becomes a reviewer there: every change is checked against our conventions, and a bad change stops the pipeline.

Here is the plan. The pipeline runs a short script for every change. The script takes the diff, the change itself, and gives it to Claude Code in print mode, dash p. Claude Code returns a verdict in a fixed shape: approve, or request changes. Then our script reads the verdict and ends with an exit code. Zero means the pipeline goes on. One means it stops.

We build it in two steps: first the review, then the exit code.

In CI there is no terminal to type into, and nobody to click allow. That is why we use print mode. Two more options make its answer easy for a program to read. Output format json wraps the answer in one JSON object. And json schema asks for the answer in a shape we define.

The shape is already in a schema file, so let's look at it. It describes an object with two fields. The verdict is a string, and it can only be approve or request changes. The reason is a string too, and both fields are required. We close it.

Before the script, we need a change to review, and we make one that breaks the rules. We open the MCP server, the file with our backend tools. We add a new tool above the part that starts the server: the decorator, a function called cancel order that takes an order ID, and a short description. It looks the order up with square brackets. And then it raises an error of its own.

This tool breaks our conventions on purpose. Let's see whether the review catches it.

Git diff shows the changes in our files that are not added to git yet. Two dashes and star dot p y in quotes keep it to our Python files. Let's run it in the terminal, with the stat option for a short summary. One file changed, the server, with seven new lines. This is the change our CI step will review.

Now our script, ci review dot sh, which is still empty. The first part of the script is the review itself: take the diff, and ask Claude Code about it.

We start with the line that says which program runs this file: the shell. A comment says what the step does: Claude Code reviews the change against the project rules.

Then we take the change itself, with the same git diff, this time in full. We keep it in a variable called DIFF. In a real pipeline, this would be the change in the pull request.

Now the call. Claude, dash p, and the prompt in quotes: review this diff against the project's tool conventions. After an empty line, the diff itself goes into the prompt, and the quotes close there. The sign at the end of the line tells the shell that the command goes on.

Output format json: Claude Code prints one JSON object, with the answer, the cost, and the session. Then json schema, with the text of our schema file. Cat reads the file, and the dollar sign with brackets puts its text right here. And we save everything into a file named review dot json.

Then a short Python program reads that file and prints the verdict. Python, dash c, runs the code we give it in quotes. It imports json. It loads review dot json and takes the field called structured output. That is where Claude Code puts the answer in the shape of our schema. It prints the verdict, a dash, and the reason, so a person reading the pipeline log sees both. And we close the quotes.

Let's run it. This takes a little while, because Claude Code works like an agent here. So we make the terminal bigger for the answer.

While it works, here is what happens inside. Our script hands Claude Code the prompt with the diff, and the schema. Claude Code reads our project file and the rule for tool code, so it knows the conventions. It may also open the server file, to see the change in its place. Then it checks the diff against the conventions, and it returns one JSON object, with the verdict and the reason in our shape.

Here is the verdict: request changes. And the reason lists what is wrong with the new tool. It raises an error, but our tools must never raise. They return a structured error instead. Square brackets crash on an unknown order, but not found is data, not an error. And the tool does not log its call, which the rule for tool code asks for.

Every point comes from our project file or our rule. So the review works. But the pipeline does not read this text. It reads the exit code of the step.

Echo, dollar, question mark prints the exit code of the last command. It is zero, and zero means success. Our step said request changes, and the pipeline would still go on and merge the change.

So the second part of the script turns the verdict into the exit code. We go back to our script, and add two lines at the end of the Python program, before its closing quotes. If the verdict is not approve, we exit with code one, which means the step failed, so the pipeline stops. When the verdict is approve, the program simply ends, and the exit code stays zero.

Let's run it again, and check the exit code right after it. Claude Code reviews the same change again, so we wait a little.

While we wait, one rule for a step like this. It is tempting to let the reviewer fix the code as well. In CI, keep it to a verdict and a reason. The fix is a developer's decision. And a reviewer that edits code needs permissions you do not want in a pipeline. Here, Claude Code only reads.

In a real pipeline, this review is one step among others, like the tests and the build. Each step reports with its exit code, and the pipeline stops at the first step that fails.

The verdict is request changes again, with the same kind of reason. Now the exit code, with echo, dollar, question mark, as before. It is one. In a pipeline, this step would fail, and the change would stop right here.

So here is what happened. Our script sent the diff to Claude Code in print mode, with JSON output and our schema. Claude Code checked the change against the project file and the rule. It returned request changes, with a reason. Our Python lines read the verdict, and the script exited with one.

So the practical rule: in CI, run Claude Code in print mode with JSON output and a schema. Read the verdict in code. And let the exit code decide.
