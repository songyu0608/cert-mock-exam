# 77. The Explore Subagent

In the previous lesson, Claude Code explored ShopAssist's code one step at a time. It searched first, and then it read only the files that the search pointed to.

This lesson is about where all that searching happens. This matters because every search result stays in the conversation, and so does every file that Claude Code reads. On a long task, that output can push out the work that matters.

Here is the scene. The team wants to change how ShopAssist handles damaged items. This task has several phases. First comes discovery, which means finding the right code. Next comes design, where we decide what to change. Last comes the change itself. As you remember, plan mode lets Claude Code explore the code before it changes anything.

But discovery is noisy. Claude Code must find where refund eligibility is decided and where the customer's reply is written. It must also find which tests cover damaged items. That takes dozens of searches and twenty or thirty files. All of it lands in the main conversation. The context window is the amount of text Claude can hold in one conversation. By the time design starts, search output fills most of it. Little room is left for the decisions, and early details start to get lost.

The most important thing to remember is this: send noisy discovery to the Explore subagent. Keep only its summary in the main conversation.

Here is how it works. Explore is a subagent that comes built into Claude Code. A subagent is a helper agent with its own separate context. The work has three steps. One, the main conversation gives Explore a clear question. Two, Explore searches and reads in its own context. It only reads, and it never changes a file. Three, it sends back a short summary. Its search output never enters the main conversation. Claude Code can hand discovery to Explore by itself, and you can also ask for it directly.

For our task, we ask Explore one question with three parts. Where is refund eligibility calculated? Where are customer replies generated? And which tests cover damaged items?

Explore may read thirty files. The main conversation gets back a few lines, and they are on screen. Refund eligibility is decided in one module. Replies are built in another module. Two tests cover damaged items. One case has no test: a damaged item without a photo. That is everything the design phase needs.

We should not run a long discovery in the main conversation and hope the important parts survive. The noise stays there for the rest of the task, and every new phase starts with less room. Explore keeps the raw output in its own context and sends back only the findings.

So use Explore for the noisy discovery phases of a long task, like mapping a module or tracing a flow. A small change in one known file does not need it, because the main conversation can simply read that file.

Let's recap. Discovery runs many searches and reads many files, and that output fills the main context. The Explore subagent does this work in its own context and sends back a summary. That way, the main conversation keeps room for design decisions and edits. Use Explore for the noisy discovery phases of long tasks, so the context window does not run out.

So let Explore do the searching, and keep the main conversation for the decisions. Next, Claude Code keeps misreading a change, and we fix that with examples and tests.
