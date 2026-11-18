# 76. Exploring a Codebase Step by Step

This lesson is about how Claude Code learns a code base it has never seen, without reading every file. This matters because reading everything first is slow. It also fills the context with code that has nothing to do with the question.

In the previous lesson, we met the built-in tools. Grep searches inside files. Glob finds files by name. Read loads one whole file.

Now a developer on the ShopAssist team has a question. Some refunds come out a few cents higher than the order total. Where does a refund amount actually come from? The repository has about two thousand files. The developer asks Claude Code to find out.

The most important thing to remember is this: explore step by step. Search first, then read only what the search points to. We look at two techniques. First, following the flow from an entry point. Second, tracing names through a wrapper module.

First, the flow. We should not read all two thousand files before we start. That takes many rounds. It also fills the context, and the important lines get lost in it.

Instead, Claude Code starts with Grep and looks for an entry point. An entry point is the place where a flow begins. Here, it is the code that handles the process refund tool call. Grep finds it in one file, so Claude Code reads that one file.

At the top of the file are its imports. An import is a line that brings in code from another file. The handler imports a module that calculates the amount, so Claude Code reads that module next. This module imports a currency helper, and Claude Code reads the helper too. There it finds the cause: the helper rounds every amount up.

Claude Code followed the flow from the tool call to the final number. It read about five files, not two thousand, and each file had a reason to be opened. The trace is on screen.

Second, the wrapper. The amount code does not call the payment provider directly. It goes through a wrapper module. A wrapper is a small module that hides another library behind its own functions. Ours exports three functions: a full refund, a partial refund and a cancelled charge. To export a function means to make it available to other files.

Now the developer asks a second question: which code sends money back to customers? Suppose Claude Code searches only for the full refund function. It finds some callers. But code that makes partial refunds or cancels charges never shows up. The result looks complete, and it is not.

So the right order has two steps. First, read the wrapper and list every name it exports. Second, run Grep for each of those names across the whole code base. Now every caller appears, whichever function it uses.

Let's recap. Never read a whole code base before you start. Start with Grep to find the entry point. Then use Read to follow the imports and trace the flow, one file at a time. For a wrapper module, first list every name it exports. Then search for each name across the code base.

So let each search decide what to read next. Next, the search output still piles up in the conversation, and the Explore subagent moves it into its own context.
