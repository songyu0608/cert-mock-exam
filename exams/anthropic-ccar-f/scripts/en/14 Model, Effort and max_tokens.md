---
lab: true
---

# 14. Model, Effort and max_tokens

This lesson is about three settings your application chooses for every request it sends to Claude. They are the model, the effort and the max tokens limit. This matters because the wrong settings can make a step slow and expensive. They can also cut a reply off in the middle of a sentence.

Let's start with where ShopAssist is now. ShopAssist is the support assistant we are building for an online store. So far, it talks with customers in a chat on the store's website. Our code keeps the whole conversation. Our code also checks the hard rules.

Now imagine the store switches ShopAssist on for real customers. After the first week, the team reads the logs and finds two problems.

The first problem is quiet. Every closed conversation gets a short summary of two lines for the logs. That summary runs on the most capable model, like every other step. So a simple job is slow and costly for what it is.

The second problem is easy to see. Alex, one of the store's customers, asked about two orders at once. The reply stopped in the middle of a sentence, and Alex saw it.

The most important thing to remember is this: your application chooses the settings for each step. It also checks how every reply ended.

We look at three settings. First, the model family. Second, the effort. Third, the max tokens limit, and the check that goes with it.

First, the model family.

Think in roles, not model names. Opus is for the hardest reasoning and agentic work. Sonnet is the balanced default for most production work. Haiku is for fast, inexpensive steps that run many times. Fable is the premium top tier, Anthropic's most capable model.

Pick the family by three things: how hard the step is, how fast it must be, and how often it runs. We should not send every step to the most capable model out of habit.

The log summary is easy, and it runs after every conversation. So it goes to Haiku. The conversation with the customer needs judgment, so it stays on Sonnet.

In code, the exact model ID is set only once, as a constant. When a new model comes out, we change one line.

Second, the effort.

The current Opus, Sonnet and Fable models decide for themselves when to think before they answer, and for how long. This is called adaptive thinking.

Your application sets the effort level, from low up to max. Effort changes the whole response, not only the thinking. Higher effort gives more careful work. Lower effort gives faster, shorter replies and fewer tool calls.

Say a customer has three orders, and their dates overlap. On the Sonnet conversation step, that case deserves a higher effort. A plain answer that an order has shipped needs much less. To spend less, lower the effort.

Third, max tokens.

A token is a small piece of text. Max tokens is a ceiling, not a target. Claude does not try to reach it. But if the reply hits the ceiling, the API stops the reply right there.

You met the stop reason in the first request. It is the field that says why the reply ended. A normal finish is end turn. When the stop reason is max tokens, the reply was cut off. That is what happened to Alex.

So your application must check the stop reason before anything reaches the customer. When the reply was cut off, you have three options. You can raise the ceiling. You can ask Claude for a shorter answer. Or you can send the request again.

You can also set a stop sequence: a text marker that makes Claude stop when it writes it.

One short note. Older code and tutorials still set temperature, top p or top k, or write the start of Claude's reply for it. The current Opus, Sonnet and Fable models reject these settings, and the exam does not test them, so leave them out.

Now back to the two problems. The summaries run on Haiku. The conversation runs on Sonnet, with effort set to fit the case. And the stop reason check catches a cut-off reply before Alex sees it.

Let's recap.

Your application chooses the model family for each step. Opus is for the hardest work, Sonnet is the default, Haiku is for fast, frequent steps, and Fable is the premium tier. Effort sets how carefully the model works. Max tokens is a ceiling, and a cut-off reply shows up as the stop reason max tokens.

So pick the family by the step's difficulty, speed and volume. Set the effort to match. And always check the stop reason before a reply reaches the customer.
