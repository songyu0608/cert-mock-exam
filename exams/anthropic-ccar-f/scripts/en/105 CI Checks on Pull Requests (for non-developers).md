# 105. CI Checks on Pull Requests (for non-developers)

We have just followed one change to ShopAssist through a branch, commits and a pull request. A teammate read the diff and approved it.

This lesson is about the checks that run on every pull request by themselves, with nobody pressing a button. This matters because the course puts Claude into these checks.

This is an optional lesson, for people who have not worked with CI pipelines.

The core idea is simple. Every pull request starts a set of automatic checks. Some of them can stop the merge. Others only report what they found.

We look at three things. First, what runs. Second, blocking and non-blocking checks. Third, where a review bot fits.

First, what runs. The name for this is CI, short for continuous integration. It means that every change joins the shared code often, and the change is checked automatically each time.

When we open a pull request, the CI system starts a pipeline. A pipeline is a fixed list of steps that runs in the same order every time. Each step is called a job.

For ShopAssist, one job runs the tests. A test is a small program that checks one piece of behavior. For example, a test can check that a refund above five hundred dollars goes to a person. Another job runs a linter. A linter is a program that reads code and reports style problems and simple mistakes, like a value that is never used.

The results appear on the pull request page. A check shows a green mark when it passes and a red mark when it fails.

CI often comes together with CD, the step that releases an approved change. Its short definition is on screen.

Second, blocking and non-blocking checks. A blocking check must pass before the pull request can be merged. If one required test fails, the merge stays locked. The developer fixes the problem and adds a new commit. Then the checks run again.

A non-blocking check only reports. Its findings are visible, but the team can still merge.

The team decides which checks block. A check should block only when it is reliable and the risk of ignoring it is high. So the failing refund test blocks the merge. A style suggestion only reports.

Third, the review bot. A review bot is one more CI job. It reads the diff and posts comments on specific lines, like a human reviewer does. Most review bots report and do not block.

But a review bot helps only when developers read its comments, and they stop reading a bot that comments on everything.

Let's recap. Every pull request starts a pipeline of automatic jobs. Tests check behavior, and linters check style and simple mistakes. A blocking check must pass before the merge. A non-blocking check only reports. A review bot is a job that posts comments on the diff.

So for every check, ask one question: does it stop the merge, or does it only report?

In the course, the team adds one more reviewer to every pull request, and that reviewer is Claude.
