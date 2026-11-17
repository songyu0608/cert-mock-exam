# 91. Context for CI Reviews and Tests

This lesson is about the context a CI run needs, so that its reviews and generated tests are useful and never repeated. This matters because a run that cannot see the project gives generic advice. It also posts the same comments again and again, until developers stop reading them.

Here is where we are. The team's review bot now runs Claude Code in CI on every ShopAssist pull request. It uses the print flag, so the job finishes on its own, and a schema, so every finding comes back as JSON. The team also asks the same job to suggest tests for each change.

After one week, the logs show three problems. First, the suggested tests use the wrong test framework, and some of them call the real payment service. Second, many suggested tests already exist. Third, every time a developer pushes a new commit, the review posts the same comments again.

The most important thing to remember is this: a CI run starts with no memory. It sees the repository and its prompt, and nothing else. Nobody's chat history reaches it. So everything the run should know must come from the repository or the prompt.

We look at three sources. First, the project CLAUDE.md. Second, the existing test files.

Third, the earlier findings.

First, the project CLAUDE.md. Claude Code reads this file in CI, just as it does at a developer's desk. The CI machine has no developer's home folder, so a personal file never reaches it. Only what is committed counts.

So the project file carries four kinds of context. The first is testing standards: the test framework, and where test files live.

The second is criteria for valuable tests. For ShopAssist, a valuable test checks behavior that moves money or changes a decision. Examples are the five hundred dollar limit, the thirty-day return window, and an order with no delivery date. A low-value test checks something trivial, such as a function that only returns a stored field.

The third is the available fixtures. A fixture is ready-made test data or a fake service that tests can reuse. Our fixtures include the fake payment service and a sample customer with two orders.

The fourth is review criteria: report bugs and security problems, and skip minor style.

The file is on screen. With this file, the suggested tests use our framework and our fake payment service. They also focus on refund and escalation paths.

We should not write a longer test prompt instead and hope it covers everything. The standards belong in one committed file, and every run reads it.

Second, the existing tests. A pull request adds partial refunds. The job suggests a test that a full refund of one hundred dollars succeeds. That test already exists. Claude did not know, because it never saw the test suite.

So the CI script now gives Claude the test files for the code that changed. The prompt says: these scenarios are already covered, so suggest only scenarios that are missing.

Now the suggestion is different. Two partial refunds of three hundred dollars each go to the same order. Does the limit apply to their total? No existing test answers that, so this test adds real value. Third, the earlier findings. Each review is a new run with a new session. So "don't repeat yourself" means nothing to it, because it cannot see what it said before. We should not add that instruction alone.

The fix is to give the run its earlier findings. The previous lesson already saves each review as JSON. On the next run, the script puts those findings into the prompt, next to the new diff. The instruction says: report only issues that are new, or that are still not fixed. Do not report again an issue that is already fixed.

Here is how that works. Assume the first run finds three issues. The developer fixes two of them and pushes a new commit. Without the earlier findings, the second run posts all three comments again, and maybe one more. With them, the second run reports one issue as still open and one new issue. The two fixed issues stay quiet.

As a second guard, the script can also skip a comment that already sits on the same line.

Remember that all of this is context, not enforcement. It steers what Claude reports and suggests. A test that must always pass still runs as a normal CI check.

Let's recap. A CI run has no memory, so its context must come from the repository and the prompt. The project CLAUDE.md carries the testing standards, the criteria for valuable tests, the fixtures and the review criteria. Test generation gets the existing test files, so it suggests only scenarios that are missing. A re-run after new commits gets the earlier findings, and it reports only issues that are new or still not fixed.

So before Claude Code runs in your pipeline, ask what it cannot see by itself. Then give it the project file, the existing tests and its own earlier findings.

Next, we run Claude Code as a CI reviewer ourselves.
