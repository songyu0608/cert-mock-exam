# 35. When the Agentic Loop Stops

ShopAssist can now keep working, tool after tool, and the stop reason tells our loop when to continue.

This lesson is about how that loop should stop, and three ways it stops wrong. This matters because a loop that stops too early leaves the customer with half an answer. A loop that stops too late wastes requests, or never ends at all.

The most important thing to remember is this: the only reliable stop signal is the stop reason. End turn means Claude has finished. Tool use means it has not. We look at three wrong approaches. First, reading Claude's words. Second, treating any text as the answer. Third, counting rounds.

First, the words. Suppose our loop searches Claude's text for phrases like "I'm done" or "here is your final answer". When it finds one, it stops. This is fragile. Claude writes natural language for the customer, not signals for our code. Its wording changes from case to case. A final answer to Alex may never say "done". And a message in the middle of the work may say "I'm done checking your account", while Claude still needs the order. Natural language is not a control signal, but the stop reason is.

Second, any text. A response can contain text and tool use blocks together. Claude often says what it is about to do. For example: "Let me look up your jacket order." Right after that sentence comes a tool use block for lookup order.

Suppose our loop treats any text as the final answer. Then Alex sees "Let me look up your jacket order", and nothing happens after that. The tool never runs. So text in a response does not mean the work is done. Read the stop reason instead. Here it is tool use, so the loop continues.

Third, the counter. Suppose we stop after a fixed number of rounds, for example three. Alex's case from the previous lesson needed four. Claude verified the account, found both orders, made the refund, and then answered. With a cap of three, the loop stops while Claude is still asking for the refund. Alex gets no answer. A simple case may need one round, and a messy case may need six. No fixed number fits every case. So an iteration cap is not a stopping rule.

But a cap is still useful as a safety net. A tool may keep failing. A bug may make Claude ask for the same lookup again and again. So we set a high limit, for example twenty rounds, far above any normal case. In normal work, end turn always comes first. If the loop ever reaches the cap, something went wrong. We should not show Claude's last partial text to the customer as an answer. Our code logs the case and hands it to a person. The cap protects against bugs. The task itself ends with end turn.

The exam names two stop reasons, tool use and end turn. Production loops also handle a few more, such as max tokens, pause turn and refusal. They are on screen, with what each one means.

Let's recap. Claude's wording is not a control signal, so never search it for "done". Text next to a tool use block is not an answer, so never stop just because text is present. A round counter is only a safety net, set well above normal cases. When the cap fires, treat it as a failure, not as an answer. The stop reason decides: continue on tool use, finish on end turn.

So let the API tell your loop when to stop, and keep the cap for the day something breaks.

Next, we write this loop in code.
