---
lab: true
---

# 11. Practice: The Conversation Lives in Your Code

In this lesson, we teach ShopAssist to hold a conversation. This matters because the Claude API remembers nothing between requests, and a support chat is a chain of requests.

So far, our script sends one question and prints the answer. Today it answers three questions in a row and remembers what the customer said.

We start with an empty file, conversation dot py, and the top of the file is the setup we always use. So I paste it from our first script: we load the key from dot env, create the client, and name the model.

This time we also give Claude a short instruction that comes with every request, the system prompt. We call it SYSTEM. It says who Claude is: ShopAssist, an online store's support assistant. It states our return rule: returns are accepted within thirty days of delivery. And it asks for short answers, one or two sentences. We close the bracket, and Python joins the pieces into one string.

Now we wrap the request in a small function, so we can call it again and again. Def ask, and it takes a list of messages. Inside, the familiar call: response equals client dot messages dot create, with our model, max tokens of two hundred, and low effort. This time it also gets our system prompt. And the messages that came into the function.

The reply can hold more than one block, and not every block is text. So we go through the blocks: for block in response dot content. If the block type is text, we keep its text in reply. In this short script, we expect one text block in every answer.

Then we print the reply. And we print the number of input tokens, the size of what we sent. Keep an eye on this number. Finally, the function returns the reply, so the code that called it can use it.

Now the conversation. A customer writes: I bought a jacket twenty days ago. We send it with ask, as a list with one user message. Then the customer asks: can I still return it? We send the second question the same way, on its own.

Let's run it. Each question goes out as its own request, one after the other.

The first answer is fine. Claude knows our thirty day rule and offers help with the return. But look at the second answer. Claude says it depends on when the item was delivered, and asks for the date. It has no idea that we are talking about a jacket bought twenty days ago.

It is tempting to think that Claude forgot. Nothing was forgotten, because nothing was kept. The API is stateless. Every request stands alone, and Claude sees only what that request contains. Our second request contained one short question, so that is all Claude knew. Look at the input tokens too: sixty nine, and then sixty two. Each request carried only its own question.

So the memory of the conversation must live in our code. We remove the two separate calls, and in their place we start an empty list called history. The list only stores the messages. A helper will send them.

Then a helper called say. It takes the text the customer typed. First, it adds the customer's message to the history, with the role user. Then it sends the whole history to Claude through our ask function, and keeps the reply. And it adds Claude's reply to the history, with the role assistant. So the next request carries both sides of the conversation.

Now the same conversation, with say. I bought a jacket twenty days ago. Can I still return it? And a third question: and if I lost the receipt?

Let's run it again. Now each call to say sends the whole history, so every request is longer than the one before.

The first answer is the same as before. But now the second answer connects to the first. Claude remembers the jacket from twenty days ago, and says yes. And the third answer stays on the same return. It does not ask again what we bought.

Now look at the input tokens. Sixty nine, then about a hundred and fifty, then more than two hundred. The number grows with every turn, because every turn sends the whole history again. That is the price of memory. A long chat costs more with each turn, and it can reach the context window, the most text one request can hold.

So here is what changed. The first turn sends one message. The second turn sends three: the first question, Claude's answer, and the new question. The third turn sends five. Every request carries the whole conversation, so Claude answers in context, and every request costs a little more than the last.

So the practical rule: keep the conversation in your code. Send it in full with every request. And watch the input tokens grow.
