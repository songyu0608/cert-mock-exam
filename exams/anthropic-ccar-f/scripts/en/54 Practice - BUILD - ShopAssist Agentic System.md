---
lab: true
title_provisional: true
---

# 54. Practice: BUILD - ShopAssist Agentic System

So far, our tools answer anyone who asks. Give them an order number, and they open the order. Now ShopAssist becomes an agentic system: one loop, a check in our code before every tool call, and a handoff to a person. This matters because a loop that runs any tool at any time will, sooner or later, act for a customer nobody has checked.

Here is the plan. A customer message enters our loop. Before every tool call, a hook runs. It is a small function in our code, and it looks at the case, the facts we have checked so far. Is the customer verified, and was the order looked up? If a check fails, the tool never runs, and Claude gets a structured error instead: what went wrong, and a message for the customer. When a tool refuses and the customer still needs help, Claude calls escalate, and a person takes over. We build it in three steps.

We start from agent dot py, which puts together what we have built so far. At the top, there is one customer and one order: a lamp, delivered forty-five days ago. Below them are four tools. Get customer checks a customer by email. Look up order and start return work with orders, as before. And escalate hands the case to a person, with a short reason. Further down are the functions behind the tools, and the loop we know, inside a function called run. Three of the functions write what they find into a dictionary called case: get customer, look up order, and escalate. The case holds the customer ID, the order ID, and whether the case was escalated. But the case does not exist yet, so the script cannot run as it is.

So the first step is the case, and a test of the script as it is. The case goes right after the tools, with all three facts empty. In this short script, one case serves the whole run. A real system keeps one case per conversation. At the bottom, the first test: a customer asks to return the lamp from this order, and does not say who they are.

Let's run it. Our loop sends the message to Claude, and runs whatever tool Claude asks for. Claude asked for look up order, and our loop ran it. The order came back: the lamp, and even the customer ID of its owner. Then Claude told this customer about the lamp and its delivery date. And the case shows the problem. The order ID is filled in, but the customer ID is still None. Nobody checked who is asking. Our code opened the order for a stranger.

So the second step is the gate: the hook from our picture, a small function that runs before every tool call and can stop it. It goes below the table that maps each tool name to its function. We call it before tool, and it gets the tool name and the input that Claude chose. A short note says what it does: it runs before every tool call, and it can block it.

The first rule is the gate. If the tool is anything except get customer, and the case has no customer ID yet, the call is blocked. Then we return a structured error, with the category permission. And a message for the customer: please give your email first.

The second rule is about orders. Start return may only use the order that was looked up. If it is a different order, we return a validation error. Its message says: look up the order first. When both rules pass, the hook returns None, which means it has nothing against the call.

Now the loop must ask the hook first. We go down to the line that runs the tool function, and select it. In its place, we call the hook: output equals before tool, with the name and the input. If the output is None, the hook has nothing against this call. Only then does the real function run. It is the same call as before, now inside the if. So a blocked tool never runs at all. Claude gets the hook's error as the tool result. The result is marked is error, as in our tool errors script, so Claude knows the call failed.

Let's run it again. The same customer, with the same message. Claude asked for look up order, and the hook blocked it with a permission error: please give your email first. So Claude asks the customer for the email. And the case is still empty: nothing was looked up.

Here is what happened inside the loop. Claude asked for look up order. Before the tool ran, our loop asked the hook. The hook found no customer ID in the case, and returned the permission error. That error went back to Claude as the tool result, and the tool itself never ran.

The third step is the handoff, for a verified customer the policy cannot help. First, the system prompt. We select its last line and type the new rules over it. The new text starts with the tools: use them for customers, orders and returns. The tools check the policy, and they tell Claude what is missing. So Claude lets the tools decide, instead of applying the rules by itself. If a tool refuses and the customer still needs help, Claude hands the case to a person with escalate. And at the end, the old rule again: answer in two sentences.

At the bottom, the second test. The same customer gives their email, and says the lamp arrived broken.

Let's run it with both tests. The two tests run one after the other, and each one is a loop with several calls to Claude. There is a lot of output, so we make the terminal bigger. The first test is blocked again, and Claude asks for the email. In the second test, get customer checked the email, and the case got the customer ID. Look up order found the lamp, delivered forty-five days ago. Start return refused: past the thirty-day window. This time the tool said no, not the hook. The customer still needs help, so Claude called escalate, with a reason that sums up the case. Claude told the customer that a person will take over, and gave the ticket number. And the case at the end shows the customer, the order, and escalated true.

Here is the second test, step by step. First, the email was checked, and the case got the customer ID. Then the order was found, and the case got the order ID. Each of these calls passed the hook first. The return itself was refused, because the window was over. Escalate opened a ticket for a person and set the flag. Then Claude answered the customer with the ticket number.

It is tempting to put the check inside each tool. Then every new tool needs the same check, and one forgotten tool is a hole. The hook sits in the loop, so every tool call passes it, even the tools we add later.

So the practical rule: keep the case facts in your code. Let a hook check every tool call before it runs. And give the loop a handoff tool for the cases the policy cannot settle.
