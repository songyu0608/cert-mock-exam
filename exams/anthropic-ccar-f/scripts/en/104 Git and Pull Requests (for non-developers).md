# 104. Git and Pull Requests (for non-developers)

Say a developer has improved ShopAssist's prompt, and a test set shows that the new prompt scores better.

This lesson is about how that change gets from a developer's computer to real customers. This matters because the lessons about code review and automatic checks use these words all the time.

This is an optional lesson, for people who have not worked with Git and pull requests.

The core idea is simple. Nobody changes ShopAssist directly. A developer proposes a change. Other people read it. Only then is the change accepted.

We follow one change from start to finish. First, we look at where the code lives. Second, we see how a change is made and saved. Third, we see how it is proposed and reviewed.

First, where the code lives. ShopAssist is more than one file. It has the code behind the chat window. It has the tool definitions and the tests. It also has an instructions file with the system prompt. All these files live together in a repository. A repository is the project folder plus its full history. It remembers every change, who made it, and when.

The tool that keeps this history is called Git. GitHub is a website where teams store and share Git repositories.

Second, how a change is made. We should not edit the version that customers use. So we work on a separate copy, called a branch. The main branch holds the approved version of ShopAssist. Our new branch starts as a copy of main, and our work stays there.

Now we add our new line to the instructions file. The line says that a plain question about the policy gets the policy answer. Then we save this change with a short message that says what changed. This saved change is a commit.

A commit is one step in the project's history. A branch can hold several commits. Maybe we also add a test case, and that becomes a second commit.

Third, how a change is proposed and reviewed. When the work is ready, we open a pull request. A pull request is a proposal. It asks the team to merge the changes from our branch into main. To merge means to add them to the main version.

A pull request is a page with several parts, and you can see one on screen. The most important part is the diff. The diff shows only what changed. Removed lines are red, and added lines are green. So a reviewer does not read the whole project. They read the one new line in the instructions file.

Then comes code review. A teammate reads the diff and leaves review comments. Each review comment is attached to a specific line. For example: "Does this rule still send requests for exceptions to a human?" We answer the comment, or we add one more commit with a fix.

When the reviewer is happy with the change, they approve it. Then the branch is merged, and our change becomes part of main. Only after that can it reach customers.

Let's recap. A repository holds ShopAssist's files and their history. Work happens on a branch, so main stays safe. A commit is one saved change. A pull request proposes to merge the branch into main. Reviewers read the diff and leave comments before the merge.

So every change to ShopAssist goes through this path before customers see it. Even one line of a prompt is proposed, read and approved.

Next, we look at the automatic checks that run on every pull request.
