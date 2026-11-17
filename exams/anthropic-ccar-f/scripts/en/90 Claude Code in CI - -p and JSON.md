# 90. Claude Code in CI: -p and JSON

Last time, we split a large review into one pass for each file and one integration pass. Now that review has to run in CI, where nobody sits at the keyboard. This lesson is about the command-line flags that make Claude Code work inside a pipeline. This matters because a CI job must finish on its own. Its output must also be something a script can read.

Here is the scene. The team's review bot is a CI job that runs on every ShopAssist pull request. Now the team wants Claude Code itself to do the review, because Claude Code can read the whole repository. So the job's script starts Claude Code with a prompt: review this pull request for refund logic, escalation and missing tests.

The first run never ends. Claude Code opens its normal interactive session and waits for someone to type. Nobody does. After an hour, the pipeline stops the job.

The most important thing to remember is this: in CI, Claude Code must run without a person. It must also return output that a program can parse. Two things make that work. First, the print flag. Second, JSON output with a schema.

First, the print flag. Its short form is dash p, and its long form is dash dash print. With this flag, Claude Code takes the prompt and does the work. It writes the result to standard output, and then it exits. Standard output is the text stream that the pipeline captures from a program. No session stays open, so nothing waits for input. The fixed command is on screen.

We should not look for other ways to stop the waiting. Three of them look reasonable, and all three are wrong. A special environment variable that switches off the interactive session does not exist. A batch flag does not exist either. Sending empty input into the command is a Unix trick. It is not the documented way to run Claude Code. On the exam, the answer is dash p.

Second, the output. The job finishes now, but it prints the review as free text. One run gives a list. Another run gives paragraphs. The line numbers sit in a different place each time. But the script must post each finding as a comment on the right line of the pull request. Reading that out of free text is fragile.

So we add two more flags, and both work together with dash p. The first is output format json. With it, Claude Code returns its answer as JSON, together with some details about the run. The second is json schema. Here, we pass a schema, and Claude Code returns structured output that matches it.

Our schema describes a list of findings. Each finding has a file path, a line number and a severity. It also has a category, a message and a suggested fix. The full command and the schema are on screen.

Now the script's job is simple. It reads the JSON and goes through the findings one by one. For each finding, it calls the code hosting site's API. It posts the message as an inline comment, on that file and that line. Nobody has to copy anything by hand.

Remember what a schema does and what it does not do. It guarantees the shape, so every finding parses. It does not guarantee that a finding is correct. A finding can still point to a line that is not part of the diff. So the script checks each line against the diff before it posts the comment.

Let's go over the main points. Interactive Claude Code waits for a person, so a CI job without dash p hangs. Dash p, or print, runs the prompt, writes the result and exits. Output format json returns the answer as JSON that a script can read. Json schema makes that JSON follow your schema. For example, it can be a list of findings, each with a file, a line, a severity and a fix. The script then posts each finding as an inline comment, after it checks the line against the diff.

So in a pipeline, always run Claude Code with dash p, and ask for JSON that follows a schema.

Next, we give each CI run the project context that it cannot see by itself.
