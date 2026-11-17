# 103. What Claude Sees in a Request (for non-developers)

Claude predicts likely text. Its answers are probable, never proven.

This lesson is about what Claude actually knows when it answers a customer. This matters because the facts Claude receives decide a lot about the answer. This is an optional lesson, for people who have not built an application with a language model yet.

The most important thing to remember is this: Claude knows only what your application sends in one request. It knows nothing else about the customer or the store.

We will look at three things. First, the path of one request. Second, what Claude does not see. Third, the three kinds of information a good request carries.

First, the path. ShopAssist is the support assistant we are building for an online store. Alex is one of the store's customers. Alex opens the chat on the store's website and types: "Where is my order?"

It may look like Alex is talking to Claude directly. That is not what happens. Alex talks to our application, the program behind the chat window. Our application takes the message and sends it to Claude through the Claude API.

An API is a controlled connection between two programs. One program sends a request. The other does the work and sends back a response. Every request also carries an API key. An API key is a secret value that proves the request comes from our account. Treat it like a password, and keep it out of your code.

Claude reads the request and writes an answer. The response goes back to our application. Then our application decides what Alex sees.

Second, what Claude does not see. Look at Alex's question from Claude's side. Claude does not know who Alex is. It does not know what Alex ordered, or where the package is now. It also remembers nothing from earlier requests. If Alex asked something yesterday, Claude does not know it today, unless our application sends it again.

Claude cannot open the store's order database either. That changes only when our application gives Claude a tool. A tool is a function our application offers. Claude can ask for it. Our application runs it and sends back the result. Without the real order, Claude can only guess. And ShopAssist must never guess a delivery date.

Third, the three kinds of information. A good request has instructions, context and input.

Instructions tell Claude what to do. For example: you are ShopAssist, and you answer questions about orders. You never state a delivery date that you did not read from the order.

Context is the facts Claude needs for the task. Here, that is Alex's order with its status and delivery date, plus the store's shipping policy.

Input is what the user wrote: "Where is my order?" The instructions define the task. The context gives the facts. The input is the question. Claude's answer can only be as good as these three pieces together.

Then why not send everything the store has? The store has thousands of pages: policies, warehouse manuals, marketing plans. We should not send all of that with every question. It makes the request slower and more expensive. Worse, the one important fact gets lost among the rest.

For Alex's question, Claude needs the order, the shipping policy, and maybe the last few messages. Put each part in a clear place with a label, so Claude can find it. Relevant, well-placed facts work better than a large pile of text.

Let's recap. The customer talks to our application, not to Claude. Our application calls the API with a secret key. Claude knows only what that one request carries. It has no memory of earlier requests and no access to our systems, unless a tool gives it. A good request has instructions, context and input, with only the facts the question needs.

So when Claude gets an answer wrong, first check what your application sent it.
