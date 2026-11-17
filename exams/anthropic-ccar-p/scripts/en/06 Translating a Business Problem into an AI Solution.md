# 6. Translating a Business Problem into an AI Solution

We know what a model sees in one request, and where Claude can run. Real work starts earlier, with a request from the business. This lesson is about turning that request into a problem an AI solution can really solve.

The head of support, who runs DemoShop's support team, wants a shorter queue and fast first answers. One morning, the head of support comes to us and says: we need an AI chatbot.

That sounds like a clear task. It is not. A chatbot is a solution. The request named the solution before anyone named the problem. It is a sign that something hurts. As architects, we find out what.

Let's see where we are. The orientation is behind us, and this section opens the first exam domain, solution design, 17 percent of the exam. In short, we turn a business request into a design that holds. Design comes first, because every later choice serves it.

Back to the request for a chatbot. Finding what really hurts takes three things. First, we separate the problem, the need and the outcome. Second, we test which parts need a model at all. Third, we write down limits, data, people and numbers before we choose any technology.

First, the three layers.

They sound similar, but they are different things.

The business problem is what hurts the company. At DemoShop, the queue grows at peak times, and customers wait.

The user need is what the customer wants in that moment. A customer of DemoShop wants to know where a jacket is, or how to return it.

The desired outcome is what changes when we succeed. For example, most order questions get a correct answer in seconds, with no person involved.

Each layer asks its own question. What hurts? What does the user want? What will be different? When we mix them up, we build the wrong thing very well.

Second, the AI suitability test.

AI suitability means one thing: does this part of the task really need a language model?

We start with what customers really ask. Assume support handles about 2,000 conversations a day. Assume about 40 percent of them ask one thing: where is my order? That question needs a lookup, not creative writing. The answer already sits in the order backend, DemoShop's order and refund system. The model may read the message and write the reply. But the facts come from the system.

The test sends each part of a task to one of three places. Language and judgment go to the model. Rules with one right answer go to code. Those rules give the same answer every time for the same input. And decisions about large sums and real risk go to a person.

Take the customer's email. It is long and messy. The jacket does not fit, and the customer wants the money back. Reading that message is language work. The model turns it into structured data: the order, the reason, and what the customer wants. Choosing the right tone for the reply is judgment. That is the model's job too.

But is the order still inside the 30-day return window? That is simple counting with two dates. Code counts it, the same way every time. A model would usually count it right. Usually is not enough when money moves.

Now imagine the customer asks to return a laptop for a large amount. Whether that money goes back is a business decision. A person makes it.

One mistake here is to treat the whole request as one AI task. We should not send the return window to the model and hope. That is fragile. The model reads and writes. The code checks and acts. People decide about money and risk.

Third, what we write down before any technology.

There are four things.

The first is constraints: what must never happen. The head of support fears wrong refunds, so a refund to the wrong customer is one.

The second is data: which systems hold the facts, and whether we can reach them. If we cannot read the order backend, no model will answer "where is my order" correctly.

The third is the human role. We saw that large money decisions go to a person. Here we write down exactly which cases those are.

The fourth is success criteria. Success criteria are the numbers that tell us the solution works. We agree on them before we build. One example is the share of order questions answered correctly without a person. Another is how fast the first answer arrives. These numbers stay assumptions until the head of support agrees to them.

Notice that none of these four names a model or a framework. That is the point. They decide the technology. They do not come after it.

The most common wrong approach starts from the technology. Someone says: let's use an agent, a model that picks its own steps. Then the team looks for problems the agent can solve. But the order question needed a lookup. The return window needed code. The large refund needed a person. Starting from the tool hides all three.

Let's go over the main points.

A request for an AI chatbot names a solution, not a problem. We separate the business problem, the user need and the desired outcome. The AI suitability test sends language and judgment to the model. It sends rules with one right answer to code, and large money decisions to a person. We write down constraints, data, the human role and success criteria before choosing any technology.

The practical rule: name the problem and the numbers first, and choose the technology last.

Next, we look at the value this solution must bring: the five business value pillars, and how to measure each one.
