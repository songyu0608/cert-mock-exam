# 10. Designing the End-to-End AI System: Input to Validated Output

Our requirements now have numbers. Next, we design the system that has to meet them. We follow one email through ShopAssist, from arrival to a checked reply. Then we follow it back, as a lesson for the next version.

Here is the core idea. An AI system is a chain of stages, not a model with a prompt. Every promise we make has one stage that keeps it. We go through four parts: the chain, the stage behind each promise, failures, and feedback.

First, the chain.

It has three groups of stages. Before the model come the input and preprocessing. In the middle is the model, with its knowledge and tools. After the model come the output, a validation stage, and monitoring.

Let's follow an email from a DemoShop customer. It says: the jacket I ordered doesn't fit, please give me my money back.

The input is the email: its text and the sender's address.

Preprocessing is the work done on a message before the main step. It needs the order backend, DemoShop's order and refund system. Here preprocessing does two things. Code asks the order backend which customer owns this email address. It gets back a verified customer ID. Then a model labels the kind of request: a return.

Then comes the middle of the chain. Code runs the model calls and the tools in the right order. This code is called orchestration. Here, it first calls a tool that looks up the order. The tool uses the customer ID from preprocessing, never an ID that Claude writes. Another tool checks whether the order can be returned. A third tool, the refund tool, asks the order backend to pay the money back. It runs only after the checks at the end of the chain. And it pays automatically only up to 500 dollars, the automatic refund limit.

The model also gets its knowledge: the return policy, DemoShop's written rules for returns. Claude takes the words for its reply from that policy.

The output is a draft reply and a refund request: the order, the amount, and the reason.

Then the validation stage checks the output in code, before anything leaves. Is the amount no more than the customer paid? Does the reply name only dates it read from the order? Only then is the refund paid and the reply sent.

Monitoring records what happened.

Second, the stage behind each promise.

Take three promises ShopAssist makes. The customer is verified: preprocessing keeps that promise. A refund above 500 dollars goes to a person: the refund tool's own code keeps it. The tool refuses the larger amount, whatever Claude asks for. No invented delivery date: the validation stage keeps that one.

For each promise, you ask one question. Which stage keeps it? If the answer is "the prompt", no stage keeps it yet.

The usual mistake is to see the architecture as the model plus the prompt. A prompt makes a mistake less likely. It does not stop one.

Third, failures.

A stage can stop working, or it can give a wrong result. In both cases, we decide what the customer sees.

Maybe the order backend does not answer. Then ShopAssist must not guess a status. The customer hears that a person will check the order and reply soon.

Maybe the validation stage finds a date that is not in the order. Then the draft is not sent. It is written again, or handed to a person.

A wrong result is harder to notice. The label in preprocessing comes from a model, so it makes its own mistakes. Imagine the customer writes: the jacket doesn't fit, and my last parcel came late too. The label might say "where is my order", and the return is lost.

So we measure this label on its own. And we plan a way out. Claude still reads the whole email. When the email and the label do not match, the case goes to a person.

You write down, for every stage, how it can fail and what the customer sees. The customer should never get silence or a guess.

Fourth, feedback.

A feedback signal is any information, after the reply, that shows whether the system did well. ShopAssist has four sources. Customers rate the replies, for example with a thumbs up. The validation stage counts its failed checks. People decide the cases handed to them. And the system measures its own time, errors and cost.

Another mistake is to treat a thumbs up as proof of quality. A customer who got a refund by mistake is happy too. The rating is one signal of four.

Each signal is saved with two labels. One is the ID of the conversation, so we can open the exact case. The other is the version of the prompt that produced the reply. Without these labels, a signal says that something went wrong, but not where.

Then failures go into the evaluation set. An evaluation set is a fixed collection of real cases, each with its correct result. We run the whole set after every change. A later lesson builds it.

Back to the customer's email about the jacket and the late parcel. ShopAssist handed it to the support desk, where DemoShop's people work such cases. A person decides that this is a return. That decision and the email become a new case. The next prompt change runs on the whole set, this case included. Only a measured improvement goes live.

Let's go over the main points.

An AI system is a chain: input and preprocessing, the model with knowledge and tools, then output, validation and monitoring. Every promise has a stage that keeps it, and a prompt alone is not a stage. A stage can stop working or give a wrong result, and we decide what the customer sees. Feedback comes from four signals, saved with the conversation and the prompt version. Each failure becomes a case in the evaluation set. On the exam, be careful with options that keep a promise with a prompt alone, or judge quality by customer ratings alone.

The practical rule: for every promise, name the stage that keeps it, and for every failure, the case it becomes.

Next, we look at who decides the steps in the middle of the chain: code, in advance, or the model itself.
