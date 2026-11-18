# 82. Keeping Long Explorations Sharp

With a forked session, we compared two approaches that start from one shared analysis.

This lesson is about a long exploration that slowly loses its focus inside one session. This matters because the answers still sound confident. So nobody notices when they stop being about your code.

Here is the scene. We want to add a check to ShopAssist for damaged items that come without a photo. First, we need to understand how refunds and escalations work in the code. So we ask Claude Code to explore. In the first hour, the answers are precise. Claude Code finds that the refund limit is checked in a class called refund policy. It finds that amounts are rounded in the currency helper.

Two hours and about sixty files later, we ask where the new check should go. The answer says that validation logic is typically placed in a service layer. It names no class from our code. A few minutes later, it says that the refund limit is usually checked in the controller. That is the opposite of what it found in the first hour.

The most important thing to remember is this: important findings must not live only in the conversation. We look at three things. First, the symptoms and their cause. Second, a scratchpad file. Third, the compact command, and when to run it.

First, the symptoms. This problem is called context degradation. It has two signs. The answers turn generic. They talk about typical patterns, not about the classes found earlier in this code base. And the answers become inconsistent, so a fact from the first hour changes later.

The cause is the context. Every search result and every file Claude Code read is still in the conversation. The early findings now sit far back, under thousands of lines of discovery output. Facts in the middle of a long input are easy to miss. So Claude Code fills the gap with what code usually looks like. We should not just ask the same question again, or add "be specific". The findings are still buried, so the next answer is generic too.

Second, the scratchpad. A scratchpad file is a plain notes file in the project, outside the conversation. At the start of the exploration, we tell Claude Code to keep one. Each time it finds something important, it adds a short entry. The entry names the class or function, the file, and what it does. Open questions go into the file as well. The scratchpad for our exploration is on screen.

The second half of the instruction matters just as much. Before Claude Code answers a later question about the code, it reads the scratchpad first. Now our question about the new check gets a specific answer. The notes say that refund policy decides eligibility, so the check goes there. The file lives on disk, not in the chat. So it survives context boundaries, like a shortened conversation or a new session. Keep the entries short: names, files and facts, not long explanations.

Third, the compact command. It replaces the conversation history with a short summary. That frees space when the context fills with long discovery output, like search results and full file contents. But a summary makes text shorter. Exact names, paths and numbers are the first things it drops. We should not run compact while the key findings exist only in the chat.

So the order is this. Update the scratchpad, then run compact. After that, Claude Code reads the scratchpad again, and the exact findings come back in a small space. You can also add a short instruction to the compact command that says what the summary must keep. That form is on screen.

On the exam, a scratchpad and compact are good answers for long code explorations. That holds in Claude Code, and also for a developer agent built with the Agent SDK.

Let's review the main points. In a long session, answers drift to typical patterns and disagree with earlier findings. That is context degradation, and asking again does not fix it. A scratchpad file records each key finding outside the conversation. Claude Code reads it before it answers later questions. Compact frees space when discovery output fills the context. Run it only after the scratchpad is up to date.

So write the findings down first, and only then let the conversation get shorter. Next, the work grows too long for one session, and we split it into phases.
