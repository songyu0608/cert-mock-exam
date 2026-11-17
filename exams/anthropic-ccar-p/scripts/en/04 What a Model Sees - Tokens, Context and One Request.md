# 4. What a Model Sees: Tokens, Context and One Request (for non-developers)

Before we design anything, we need a clear picture of what the model receives and what it does with it.

This lesson is marked for non-developers. If you already know tokens, context windows and system prompts, you can skip it.

Here is the core idea in plain words. The model writes likely text for what it was sent. And it knows only what our application sends it at that moment.

Three things follow from this. Answers are likely, not guaranteed. The model knows nothing we did not send. And everything we send is counted and paid for in small pieces called tokens.

First, likely text.

The model reads the text it gets and guesses the next small piece of text. Then it adds that piece and guesses again. Piece by piece, it builds a whole answer. Each guess is a likely next piece, given everything before it. It is not always the same piece. So the same request can get a different answer. A good answer is very likely, but never certain.

This matters for every rule we give the model. Say our instructions for ShopAssist say: never refund more than 500 dollars without a person. Most of the time, the model follows that. But an instruction only makes a mistake rarer. It does not make the mistake impossible. So a rule that must always hold needs a check in code. Remember it this way: the prompt guides, the code guarantees.

Second, what the model sees.

Each time our application asks the model something, it sends one package of text. One answer comes back. This package is called a request. The model sees only what is inside it. It does not see the order backend, DemoShop's order system. It does not see the customer's account.

Let's see what ShopAssist puts into the package. A customer writes in the chat: "Can I return the jacket I bought?" The request carries four kinds of content.

First, the system prompt. That is DemoShop's fixed instruction: who the assistant is, what it may do, and how it answers. It goes with every request.

Second, the conversation so far, with the customer's new message at the end.

Third, the tools. A tool is an action our application can run, such as looking up an order. The request lists each tool by its name and a short description. The model cannot run a tool itself. It can only reply with a short note: use this tool, for this order. Our application runs the lookup. Then it sends the result to the model in the next request. So even a tool's answer reaches the model as text we send.

Fourth, the data, for example the return policy and the order details. Here the order shows a jacket for 120 dollars, delivered within the return window.

With all four, the model can give a clear, specific answer. Without the order details, it can only ask which order the customer means.

A common belief is that the model remembers past conversations. It does not. Between requests, the model keeps nothing. Our application stores the conversation. With each new request, the application sends the history again. If yesterday's chat is not in today's request, the model has never seen it. So what the model seems to remember is a choice our application makes.

Third, tokens.

The model does not count words. It counts tokens. A token is a small piece of text. It can be a short word, or part of a longer word. A period or a question mark is a token too. Everything in the request is counted this way: the system prompt, the history, the tools and the data. The answer is counted in tokens too.

The context window is the largest number of tokens one request can hold, answer included. On current models, it is about a million tokens. That sounds like a lot. But it is one shared budget. The instructions, the history, the documents and the answer all have to fit inside it together.

Tokens also mean money and time. Anthropic charges per token. It charges for what we send and for what comes back. A longer request costs more, and the model takes longer to read it. A longer answer takes longer to write.

Picture the return policy, about two thousand tokens, sent with every chat. Now assume DemoShop has about two thousand conversations a day, in the chat and by email together. That policy alone is millions of tokens every day.

Later in the course, we decide what goes into the window and what stays out.

Let's sum up.

The model writes likely text, so its answers are likely, not guaranteed. It knows only what the application sends in one request: the system prompt, the history, the tools and the data. It never runs a tool itself; it asks, and our application runs it. It does not remember past conversations, so the application sends the history again each time. Everything is counted in tokens, and the context window is one shared budget. Every token costs money and time.

The practical rule: if the model needs to know something, put it in the request. If a rule must always hold, put it in code.

Next, we draw a map of the Claude platform. We look at the model families, where an agent runs, and where Claude Code and MCP fit.
