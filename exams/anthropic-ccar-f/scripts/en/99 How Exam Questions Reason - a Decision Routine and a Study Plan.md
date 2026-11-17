# 99. How Exam Questions Reason: a Decision Routine and a Study Plan

In the last three lessons, we looked back at ShopAssist, the team's Claude Code setup and its prompts. We saw them the way the exam does.

This lesson puts all of that into one routine for any scenario question. This matters because the wrong options on the exam name real techniques. Knowing the techniques is not enough. You also need a way to choose between them.

The most important thing to remember is this: decide what the stem demands before you read the options. The stem is the part of the question that describes the situation.

The routine has six steps, in two groups. The first three steps read the situation. You find the constraint, the observed failure and the layer that failed. The last three steps choose the answer. You ask whether the stem demands a guarantee or a first step. Then you pick the smallest fix that is enough. Finally, you say why each other option loses.

After the routine, we look at questions with more than one correct answer, and then at a study plan.

Here is the situation, and the question is on screen. ShopAssist's logs show a pattern. Some customers ask to return an item outside the thirty-day window anyway. Assume that in about one of these cases in ten, ShopAssist approves the return itself. The question asks for the most effective first step.

There are four options. The first is a stronger prompt line, in capital letters, that says never grant exceptions. The second is explicit escalation criteria, with a few examples that send exception requests to a person. The third is a separate model, trained to sort cases into escalate or resolve. The fourth is a confidence score from Claude, with an escalation below a threshold.

Step one, the constraint. The store's target is eighty percent first-contact resolution, while knowing when to escalate. So escalating too much is a failure, and so is escalating too little.

Step two, the observed failure. Look at what the logs actually say. ShopAssist found the right customer and the right order. Its tool calls were correct. It made the wrong decision about who may grant an exception.

Step three, the layer. This is a judgment call, so the failed layer is the prompt. ShopAssist had no clear boundary between a policy question and a request for an exception.

Step four, a guarantee or a first step. The stem says "first step", and nothing in it demands that the rule hold every time. So a fix at the prompt layer is allowed.

Step five, the smallest fix that is enough. That is the second option: explicit criteria with a few examples that show the reasoning.

Step six, why the others lose. Capital letters repeat a rule that Claude already follows only some of the time. A separately trained model is new infrastructure before the prompt has been fixed. And a confidence score is Claude's own claim. ShopAssist was already confident when it granted these exceptions.

Now change one sentence in the stem. Assume it says: the store's legal team requires that the agent never approves a return outside the window.

Steps one to three stay the same. Step four changes. "Never" is a demand for a guarantee, and prompts fail sometimes. So the answer moves into code. A check before process refund runs compares the delivery date from the order with the return window. Then it blocks the call. The failure is the same, but the stem is different, and so is the answer. That is why step four comes before you look at the options.

Next, multiple-response items. Each one says how many answers to select. We should not search for a pair of options that look good together. Judge each option on its own, with the routine. Does it fix the layer that failed? Does it meet what the stem demands?

Take the guarantee version again, with "choose two". The code check is right, because it enforces the rule. The criteria with examples are right too. They make Claude escalate exception requests on its own, so blocked calls become rare. The capital letters and the confidence score both fail, each for its own reason. Count your answers last, not first.

Here is a short summary. Read the constraint and the observed failure before you read the options. Name the layer that failed: code, a tool description, the prompt, or the context Claude received. Decide whether the stem demands a guarantee or a first step. A guarantee goes into code, and a first step usually starts at the prompt or the description. Pick the smallest fix that is enough, and give each other option its reason to lose. On a multiple-response item, judge every option on its own.

Now the study plan for your last weeks. The exam has five domains, and their weights are on screen. Agentic Architecture and Orchestration is the largest, at twenty-seven percent. Claude Code Configuration and Workflows, and Prompt Engineering and Structured Output, are twenty percent each. Tool Design and MCP Integration is eighteen percent. Context Management and Reliability is fifteen percent. That is the smallest share, but reliability shows up inside many scenario questions.

So split your time by these weights. Out of every ten hours, give about three to agentic architecture. Give about two each to Claude Code, prompts and tools, and about one and a half to context and reliability. Spend part of every session on scenario questions, and run the six steps every time.

The exam has sixty items in one hundred and twenty minutes, so you have about two minutes for each question. The routine has to feel automatic by exam day. So study by the weights, practice on scenarios, and on every question, decide what the stem demands before you choose an answer.
