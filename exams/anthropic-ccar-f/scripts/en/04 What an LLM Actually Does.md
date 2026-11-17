# 4. What an LLM Actually Does

In this lesson, we look at the one thing every Claude application is built on: what the model actually does when it receives a message. This matters because every design decision later in the course, from prompts to tools to agents, follows from this one mechanism.

As you remember, ShopAssist is the support assistant we are building. Today we look only at the model itself. No tools, no agents.

A customer opens the chat and types: I want to return my order. To us, that is a sentence. Claude does not work with sentences the way we do.

The first step is called tokenization. Claude cuts the text into small pieces called tokens. A token can be a whole word, a part of a word, a punctuation mark, or even a space. To keep the picture simple, we show each word as one token. Real tokenizers cut words in other places, and the exact cuts do not matter for this lesson.

But tokens are still text, and the model works with numbers. So each token gets an id, and then it is turned into an embedding. An embedding is a long list of numbers. Here we show only the first four.

Think of it as the token's address on a giant map of meaning. It is not a dictionary definition. It is a position. On that map, tokens about shopping, orders, refunds and shipping sit close together. Tokens about cooking sit in another area, and tokens about weather in a third. So the numbers for the token order place it in the shopping area.

But there is a problem. A word does not have one fixed meaning. Order can mean a customer purchase. It can mean a command. In a restaurant, it means food. In a court, it means an official instruction. So the starting position is not enough.

Claude looks at the tokens around it and adjusts the numbers of every token. This is what we call using the context. Look at our sentence. With return and my next to it, the token order moves into the purchase area. In another sentence, the same word would move somewhere else. The word on the screen is the same. Inside, the numbers changed, because its role changed.

The token is the label. The embedding is the starting meaning. The context gives the final meaning.

Now ShopAssist can read the message. I is the customer. Want signals intent. Return points to a return request, and my order points to a purchase. Together, they mean one thing: this customer probably wants help returning something they bought.

Only now does generation begin. Claude looks at all the tokens it has and asks one question: what is the most likely next token? After: I want to return my order and get a, a likely next token is refund. Replacement is possible. Label is possible. Discount is less likely. These percentages are only an illustration, because the API does not show them to us.

Claude chooses one token, and it is added to the text. Then the whole process runs again with the longer text. Predict, choose, add. Predict, choose, add. After many small steps, a full answer appears: Sure, I can help with that. From the outside, it looks like Claude wrote a sentence. Inside, it was built one token at a time.

One detail matters for your design. Choosing among likely tokens involves some randomness, so the same request can give slightly different answers. On the current Claude models, you cannot tune that randomness with a temperature setting, because the API rejects it. Consistency comes from clear instructions, good context, structured outputs, and checks in your code. And the current models may write a short stretch of reasoning tokens before the answer. It is the same mechanism, token after token.

This is why context is so important. Same model, same customer message, two different contexts. If Claude receives only: I want a refund, the best answer is: Sure, can you give me your order number?

Now add facts. The customer is verified. The order was delivered yesterday. The product is eligible. The policy allows refunds within thirty days. Now Claude can say: your order is eligible, and I can start the return for you. Same model, same request, different context, different answer.

So what does Claude not know? It does not know your database, your customer, or the status of an order. It does not remember old conversations, unless your application sends them again.

When a customer writes: I want to return my order, Claude understands that this is probably a return request. But it does not know which order, whether the customer is verified, whether the order is eligible, or whether a refund was already paid. Your application has to provide all of that.

That is why production architecture matters. The model generates language. The application provides context. The backend connects to real systems. Tools fetch real data. Code enforces the business rules.

So the practical rule: Claude takes your text, turns it into tokens, then into numbers, reads the context, predicts the next token, adds it, and repeats until the answer is complete. Everything else in this course builds on that. Prompts, history, documents and tool results are all context. Control the context, and put every rule that must hold into code.
