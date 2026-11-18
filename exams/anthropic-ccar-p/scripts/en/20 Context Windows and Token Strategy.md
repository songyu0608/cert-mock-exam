# 20. Context Windows and Token Strategy

A prompt that teaches the task well is only one part of a request. Every request carries much more. This lesson asks one question: what should go into the context window, and what should stay out?

Here is the core idea. The context window is one shared budget. Everything in it costs money and time. Too much of it also spreads Claude's attention thin. So each request gets only what it needs.

Three things make this work. First, the window as a budget. Second, the history that grows on its own. Third, search for large text, and the order of what goes in.

First, the budget.

We already know that Claude remembers nothing between requests. ShopAssist sends everything again, every time.

A context budget is the plan for how much of the window each part may use. Four kinds of content share it. The instructions are the system prompt, with its rules and the return policy. The history is every earlier message in the conversation. Documents are text the application adds, such as sections of the support handbook. And tool results are what the tools return, for example the order details.

Each part has three costs. Every token in the window is paid for on every request. More tokens also mean a longer wait before the first words. The third cost is easy to miss. Anthropic describes context as a limited resource. The more text the window holds, the less attention each line gets. One important line can get lost among many lines that do not matter.

This leads to a common mistake. The current models have a window of about a million tokens. So someone says: there is room, put everything in. The request still fits. But each answer costs more and comes slower. And the one fact that matters competes with thousands that do not. Room in the window is not a reason to fill it.

Second, the history.

Remember the customer who wrote about three orders. One item was missing, and a gift arrived damaged. The chat goes on. The customer adds details and asks about a refund. Say that after 40 turns, the history is the largest part of every request. Nobody decided that. It grew by itself, one message at a time.

There are three ways to control it.

The simplest is to drop the oldest turns and keep the last few. It is cheap. But in the third turn, the customer named the order with the missing item. Drop that turn, and the fact is gone.

The second way is summarization. Code asks a model to replace the old turns with a short summary. The recent turns stay as they are. This keeps the main story, but it loses details. An exact amount can change. Which item belongs to which order can get mixed up.

So the facts that must stay exact never go into a summary. Code keeps them in a fixed note: the order numbers, the amounts, and what ShopAssist has promised. Code fills that note from tool results, so no model changes it.

The third way is compaction. Compaction is summarization that runs by itself when the conversation gets close to a limit. The work then goes on from the summary. Some Claude tools and the API can run it for you. The same rule holds: exact facts stay in the note.

History is not the only part that grows by itself. Every tool result also becomes part of the history. If the order tool returns every field it has, each lookup adds lines nobody reads. So each step asks only for the fields it needs.

Third, search and order.

Earlier we decided that the short return policy goes whole into the prompt. The support handbook is bigger, with 46 sections. A typical question needs one or two of them. So a search step finds the matching sections, and only those go in. A later section builds this search.

Order matters as well. In each request, long documents and data come first. The question comes last. Anthropic reports that this order gives up to 30 percent better answers on long inputs with several documents.

For ShopAssist, the system prompt and the policy stay at the top. After them come the found handbook sections and the fixed note. The customer's newest message comes at the end.

Let's go over the main points.

The context window is one budget for instructions, history, documents and tool results. Every extra token costs money, time and attention. History grows by itself, so we drop old turns, summarize them, or let compaction run. Exact facts live in a note that code fills, outside any summary. Large text comes in through search, with documents first and the question last.

The practical rule: give each request only what it needs, and keep the facts that must stay exact outside any summary.

Next, we reuse the parts that stay the same on every request: prompt caching, prompts built from parts, and Skills.
