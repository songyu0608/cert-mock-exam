# 100. Not on the Exam: RAG and Grounding Answers in Your Documents

This lesson is about RAG, short for retrieval augmented generation. It is a way for your application to give Claude the right documents before Claude answers. This matters because a real application often has far more knowledge than fits into one request.

This topic is not on the exam. It is background for building real systems.

Months after launch, ShopAssist is busy. The store's help center now has hundreds of articles. They cover return rules, shipping rules, warranty terms and product manuals. A customer asks: "Can I return a damaged lamp after forty-five days?" The answer is somewhere in those articles. But which ones?

The most important thing to remember is this: RAG does not make Claude know your documents. It gives Claude the right pieces of them at the right time.

We look at three things. First, the search that runs before the request. Second, how that search finds the pieces. Third, why you check the search first when an answer is wrong.

First, retrieval before the request. We could send every article with every question. That is slow and expensive. Also, the one important rule gets lost among hundreds of pages.

So RAG adds a step before Claude is called. It works in three steps. One, we prepare the articles in advance. Each article is split into small pieces, and the pieces are stored in a system we can search. Two, when a question arrives, our application searches for the few pieces that fit it best. Three, it puts those pieces into the request, each with a label, together with the question. Claude then answers from them.

For the lamp, the search might return the damaged-item policy, the return window and the escalation rules.

Second, how the search finds the pieces. The simplest way is keyword search. It looks for the same words. It is fast, and it works well for exact terms like an order number or an error code. But a customer may write, "Can I get my money back?" while the article says "refund". Keyword search can miss that.

A second kind of search finds text by meaning instead. It uses embeddings, which turn text into lists of numbers. Texts with similar meaning get similar numbers. These lists are stored in a vector database, which finds the closest ones quickly.

Many systems use hybrid search, which combines both. Keywords catch exact terms, and meaning catches different wording. Here we only name these tools. How they work inside is outside the exam.

Third, check the search before the prompt. Claude can only be as right as the pieces it receives. Suppose the search misses the exception policy. Then Claude answers with confidence, but without the exception.

When a RAG answer is wrong, first look at what was retrieved. If the right piece was not there, a better prompt will not help. Fix the search instead. You can also ask Claude to name the article behind each answer. Then a person can check it.

The main design choices are on screen: the size of each piece, how many pieces to send, ranking the results, and citations.

Notice that this is the idea behind the whole course. Claude knows only what the request carries, and your application decides what goes in. A tool brings one order. A search brings the right policy pages.

Let's go over the main points. RAG searches your documents before the request and sends only the relevant pieces. Claude answers from those pieces. Keyword search finds exact terms, and a search by meaning finds similar ideas. Hybrid search uses both. When an answer is wrong, check what was retrieved before you change the prompt.

So the answer can only be as good as the search behind it. Fix the search first, then the prompt.

Next, another topic beyond the exam: finding the exact step where an application went wrong.
