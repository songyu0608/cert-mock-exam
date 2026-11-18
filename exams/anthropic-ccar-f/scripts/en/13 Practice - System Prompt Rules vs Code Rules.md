---
lab: true
---

# 13. Practice: System Prompt Rules vs Code Rules

In this lesson, we look at what a system prompt is for, and where its power ends. This matters because teams put rules into the prompt and believe the rules now hold. Some do. Some must live in code.

We start from our conversation script, saved as rules dot py. At the top, we have the client and the model name, as usual. Below them is our system prompt, SYSTEM: it has a role, a return rule, and a rule about short answers. Further down are our ask and say functions, the same as before.

Let's make it a real system prompt. Right after the role, we add the scope: help only with orders, returns and refunds. And we say what to do with anything else: say politely that you cannot help with it. Now the prompt has a role, a scope, a rule, and a style.

Let's test the scope. At the bottom of the file, the customer writes: write me a short poem about jackets. We send it with say.

Let's run it. The request goes to Claude with our system prompt. Claude declines, in a friendly way, and offers help with orders instead.

This is what a system prompt does well: it shapes behavior. Tone, role, scope, the style of an answer: these follow the prompt reliably.

Now a different kind of rule. Our store must never discuss a refund before the customer confirms the email of the order.

It is tempting to add this as one more line in the system prompt. But a prompt is a request, not a guarantee. A customer who insists, or who claims the check was already done, may talk the model into it. A rule that must always hold belongs in code, where no conversation can change it.

Here is the shape of the gate. The customer's message reaches our code first. If it asks for a refund and the customer is not verified, our code answers by itself, and the request never leaves. Otherwise the message goes to Claude as usual.

So we add a flag named verified, right under the system prompt. It starts as false, because we do not know this customer yet.

Now the gate itself, at the top of the say function, before anything reaches Claude. We check two things: does the word refund appear in the message, and is the customer still not verified. We make the text lower case first, so Refund with a capital letter counts too.

A keyword is a simple test, enough for this example. A real system would use a clearer signal, such as the type of request the customer chose.

If both are true, our code prints a fixed answer: please confirm the email of your order first. And then return. The function stops here. The lines below it, which add the message to the history and send it to Claude, never run.

Let's try it. At the bottom, the customer asks: I want a refund for the jacket I bought twenty days ago.

Let's run it. The whole script runs from the top, so the poem goes to Claude first. Claude declines the poem again. Then comes the refund question, and the gate answers: please confirm the email of your order first.

Look at the trace on the right. It lists every request our script sends to Claude. One request went to Claude, for the poem. For the refund, there is no request at all. Our code decided alone.

Then the customer confirms the email. In a real system, the application would check it against the order. Here we simply set verified to true. And the customer asks again, with the same words.

Let's run it again. The script now asks three things in order: the poem, the refund before the flag changes, and the same refund after it. The poem goes to Claude, and the first refund question stops at the gate, as before. The flag changes only after that, so the second question passes the gate. Claude sees it this time, and it answers with the thirty-day window from our system prompt.

Here is what happened in the three cases. The poem request went to Claude, and the system prompt declined it. The first refund request stopped at the gate. The second one passed the gate, because the customer was verified, and reached Claude.

So the practical rule: put role, tone and scope in the system prompt, and put every rule that must always hold in code, before the request leaves your application.
