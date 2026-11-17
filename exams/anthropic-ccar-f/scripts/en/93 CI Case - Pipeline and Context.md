# 93. CI Case: Pipeline and Context

Over the last lessons, the team's review bot moved into CI. Claude Code now reviews every ShopAssist pull request and suggests tests for it.

Before we go on, here is how the exam asks about running Claude Code in a pipeline. This checkpoint covers two decisions. The first is how the job runs. The second is what context each run gets. This matters because the exam's CI scenario is our bot's story. Its wrong answers often treat the symptom and leave the cause in place.

Here is the first symptom. A new pipeline job starts Claude Code with a review prompt for each pull request. Assume the job runs for an hour on every pull request, until the pipeline kills it. Sometimes a teammate runs the same command by hand, and then the posting script gets a paragraph of prose. The script cannot find a file or a line in it, so it posts no comments.

What does this situation demand? The job must finish by itself every time. The script must also be able to read every result. So we need a guarantee in how the job runs, not a better choice of words.

Two fixes look reasonable. The first is a shell timeout that stops Claude Code after ten minutes. That fails. The job now ends, but it ends as a failure, with no review at all. Claude Code was waiting for input, and the timeout only makes that wait shorter.

The second fix is to add "answer in JSON" to the prompt. That fails too. Claude follows an instruction most of the time, not every time. A single prose answer breaks the script.

The best move is the print flag, dash p. It runs the prompt, writes the result and exits. Next to it go two more flags: output format json, and json schema. The schema describes a list of findings. Each finding has a file, a line, a severity, a message and a suggested fix. Now every result parses. The script posts each finding as a comment on its line of code, after it checks that the line is part of the diff.

This decision has a second move. The job finishes now, but a developer pushes a new commit, and the review posts the same comments again. Assume the first run found four issues, and the developer fixed three of them. The second run posts all four again.

One fix looks reasonable: add "do not repeat earlier comments" to the prompt. That fails, because each run is a new session. It cannot see what it said before.

The best move is to give it what it said before. The script saves each run's findings as JSON. On the next run, it puts them into the prompt, next to the new diff. The instruction says to report only issues that are new or still not fixed. Now the second run reports one open issue, and the three fixed issues stay quiet.

Here is the rule. Dash p makes the job end, the schema gives output a program can read, and earlier findings keep re-runs from repeating themselves.

One more point about how the job runs. The Message Batches API costs half as much, but it can take up to twenty-four hours, with no latency guarantee. So it fits only the team's weekly code audit, never the blocking review a developer waits for.

Second decision. The same job suggests tests for each change. Assume about half of its suggestions already exist in the test suite. Others use the wrong test framework, or call the real payment service.

What does this demand? Nobody asks for a guarantee here. We need a first step, and it belongs in the context.

One fix looks reasonable: a longer prompt that says "check the existing tests and never suggest duplicates". That fails. Claude cannot check test files that it was never given. The instruction asks for something the run cannot see.

The best move has two parts. First, the script gives Claude the existing test files for the code that changed. The prompt says to suggest only the scenarios that are missing.

Second, the project CLAUDE.md holds the testing standards. These are the framework, the fixtures, such as the fake payment service, and what makes a test valuable. For ShopAssist, a valuable test covers the five hundred dollar limit or the thirty-day window, not a field that is only returned. The CI machine has no developer's home folder, so only the committed file reaches the run.

Here is the rule. To stop duplicate tests, show the run the tests that exist, and put the team's standards in the repository.

Here are the main points to remember. Without dash p, Claude Code waits for a person, and the CI job hangs. Output format json with a json schema gives the script findings it can post line by line. Re-runs get the earlier findings, so they report only issues that are new or still not fixed. Test generation gets the existing test files, and CLAUDE.md carries the standards and fixtures. Batches fit only the work nobody waits for.

The same rule works in the exam's research scenario. A subagent starts with no history, just like a CI run. So the coordinator passes complete findings in its prompt, in structured form.

When Claude runs without a person, make the run finish by itself and ask for output a program can read. Then give it in context everything it cannot see by itself.
