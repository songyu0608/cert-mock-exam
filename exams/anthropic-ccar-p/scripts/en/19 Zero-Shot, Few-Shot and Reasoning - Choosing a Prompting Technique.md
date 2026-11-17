# 19. Zero-Shot, Few-Shot and Reasoning: Choosing a Prompting Technique

Our system prompt has a role, rules, a format and slots for data. But rules alone do not teach some tasks well. So this lesson asks one question: how should a prompt teach Claude a task? With an instruction only, with examples, or with reasoning first?

Here is the core idea. Start with a clear instruction. Add examples when the format or the border between two answers is unclear. Add reasoning when the task needs several steps of thought. Each step up costs tokens. So you add it only when your cases show the need, and you prove it on those cases.

We carry one task through the lesson. ShopAssist's router puts one label on each message, such as status or return. Two of its labels sit close together. Return means the customer wants to send an item back. Damaged means an item arrived broken, torn or wrong, whatever the customer asks for.

First, zero-shot.

Zero-shot means the prompt gives an instruction and no examples. For many tasks, that is enough.

Take this message: where is my jacket, it was due on Monday. Claude needs no example to label it status. The message clearly fits the label.

A zero-shot prompt is the cheapest, and the easiest to read and change. So it is where you start.

Second, few-shot.

Few-shot means the prompt also holds a few worked examples: a message, and the right answer for it.

Examples help in two places. The first is format. When the answer needs an exact shape, one example shows it better than a paragraph. The second is the border between two close answers.

Here is a border message. I ordered a red lamp, and a blue one came, can I send it back? Is that a return or damaged? The customer uses the words of a return. But a wrong item counts as damaged, whatever the customer asks for. With the instruction alone, Claude may label it one way today and the other way tomorrow.

Now a second message. The lamp is fine, but it is too bright for my room, can I send it back? That one is a return.

We put both messages in the prompt, with their labels. Together they show where the line runs.

Good examples look like real messages, short and messy. And they differ from each other. Some fall on each side of the line, and some sit right on it. Then Claude learns the line, not one sentence.

Examples have a price. They sit in the prompt, so every request pays for them as input tokens.

That leads to a common mistake: more examples are always better. They are not. Forty similar examples cost far more on every call. They also teach a narrow pattern, so an unusual message can get the wrong label. A few examples, chosen to show the border, do more.

Third, reasoning.

Some tasks need several steps of thought before the answer. Remember the customer who wrote about three orders. One item was missing, and a gift arrived damaged. Claude must sort the orders and match each problem to a policy section. Only then can it write the reply.

The exam calls this technique chain-of-thought. Chain-of-thought means the model works through the problem step by step before it answers. In older prompts, you asked for it in words, such as "think step by step".

The current models do this on their own: their thinking is adaptive. Earlier we met the effort setting, which tells Claude how hard to work on a request. Effort sets how deep the thinking goes.

So here are the two lanes. On the exam, when a task needs several steps of judgment, choose chain-of-thought. In what you build, you raise the effort for that one step.

Reasoning has its own price. Thinking is paid for as output tokens, and output tokens cost more than input tokens. It also adds time before the first words. So reasoning goes where the steps are real, not on every label.

And reasoning cannot fix a border that the prompt leaves unclear. Claude can think for a long time about the blue lamp and still guess.

Fourth, testing the change.

Another mistake is to trust one message. Say we add the two lamp examples and try the blue lamp message once. It works. But the new examples may move another border, say between return and refund.

So every prompt change runs on the evaluation set, our fixed set of labeled cases. Each case runs more than once. The change ships only if the whole set holds.

Let's go over the main points.

Zero-shot means an instruction alone, and it is where you start. Few-shot adds examples for format and for border decisions. Good examples look real and differ from each other, and each one costs input tokens on every request. The exam calls reasoning chain-of-thought. On current models, effort sets its depth, and it costs output tokens and time. Every prompt change is tested on the evaluation set, not on one message.

The practical rule: add the cheapest technique that fixes the failure your cases show, then prove it on the whole set.

Next, we treat the context window as a budget, and see how to keep it under control as a conversation grows.
