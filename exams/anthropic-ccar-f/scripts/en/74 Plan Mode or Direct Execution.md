# 74. Plan Mode or Direct Execution

By now, the team has set up Claude Code for ShopAssist. That setup includes the CLAUDE.md files, the rules, a skill and the shared MCP servers.

This lesson is about how Claude Code should start a real task: plan first, or make the change right away. This matters because the wrong choice wastes time either way. A plan for a one-line fix wastes minutes. Starting a wide change without a plan can waste days.

Here is the scene. Two tasks arrive on the same morning. The first is a bug report. Some customers who ask about a return see an error. The report includes a stack trace, which is the list of function calls that led to the error. It points to one function in one file: the code that counts the thirty-day return window. When an order has no delivery date yet, that function crashes.

The second task is bigger. ShopAssist uses an old library for dates and times. Nobody maintains this library anymore, so the team wants to replace it with a newer one. A quick search shows the old library in about fifty files.

The most important thing to remember is this: the task usually tells you which mode it needs before you start. Wide work, or work with several possible approaches, gets a plan first. A clear, small change gets made directly. We look at three things. First, what plan mode does. Second, how to choose a mode. Third, how the two modes work together.

First, plan mode. In plan mode, Claude Code reads and searches the code, but it does not change any file. It explores, and then it writes a plan. The plan says which files will change, in what order, and what could go wrong. You read the plan. You can ask questions or change it. Claude Code starts editing only after you approve it. How to switch into plan mode is shown on screen.

Why does this help? A mistake in a plan is cheap to fix. Changing a plan takes a few sentences. Fixing wrong edits in thirty files takes much longer. So plan mode lets Claude Code explore safely and design the approach before it changes anything. That prevents costly rework.

Second, how to choose. Plan mode is designed for complex tasks. Four signals point to it. The change is large. It touches many files. It involves an architectural decision. Or there are several valid ways to do it. Our library migration is one example. Another is splitting one large application into many small, separate services. A third is choosing between two ways to connect to a partner system when each way needs different infrastructure. For example, the shipping partner could send us tracking updates as they happen. That needs a new web address on our side and a queue to hold the updates. Or our code could ask the partner's system for updates every hour. Claude Code should explore both options before it writes any code.

Direct execution is for simple, well-scoped changes. A bug fix in one file with a clear stack trace is one case. Adding one validation check to one function is another, for example a check that the delivery date is not in the future. This morning's bug fits here. We know the file, the function and the cause. A plan would only repeat what the stack trace already says.

Now the mistakes. We should not start the migration directly and let the code show us the right approach. Hidden links between parts of the code show up late. Then we must remove half-finished edits. We should not start directly and switch to plan mode only "if it gets hard", either. The task already says it is hard: fifty files. When the complexity is clear from the start, plan right away. Long, detailed instructions in direct mode do not solve this. They assume you already know the right structure, without exploring the code.

Third, the two modes together. They are not rivals. For the migration, we start in plan mode. Claude Code finds every place that uses the old library and groups those uses by kind. Then it proposes an order. The shared date helper comes first, then the refund service, then the tests. We approve the plan. Then we switch to direct execution, and Claude Code carries out the approved plan step by step. Planning covers the investigation, and direct execution covers the work.

Here is what to remember. Plan mode is for large changes across many files, for architectural decisions, and for tasks with several valid approaches. In plan mode, Claude Code explores and proposes changes without editing anything, so rework stays small. Direct execution is for clear, scoped changes, like a one-file bug fix with a clear stack trace. When the task already says it is complex, plan now and don't wait for problems. A strong workflow plans the investigation and then executes the approved plan directly.

So read the task before you choose a mode. If it is wide or open, plan first. If it is small and clear, just make the change. Next, we look at the built-in tools that Claude Code uses to find and change code.
