# 13. Exam Lens: Solution Design Decisions

Solution design comes down to a few decisions. We split a task between the model, code and people. We name a value pillar, write requirements as numbers, and choose a pattern. This lesson practices those decisions the way the exam asks about them: on short situations where every answer sounds reasonable.

Here is the core idea. In each situation, one detail decides the answer. We call it the binding constraint. It is the condition that rules out the other options.

First, we see how to find it. Then we use it on two kinds of ShopAssist decisions: who owns a step, and which value pillar justifies the project.

First, how to find the binding constraint.

Read the situation before you read the options. Ask what must be true, whatever else happens. Maybe a rule must give the same result every time. Maybe a promise costs money when it is missed. That one line usually picks the answer.

Three small habits help after that. An absolute word, such as always or never, is a reason to check an option twice, not to reject it. Some options try to fix a design problem by changing the product we use, such as a larger model. Then look for the option that fixes the design itself. And ask whether the situation needs a guarantee or only a first step. A guarantee comes from code or a person. A change to the prompt can be a good first step, but it guarantees nothing.

Second, who owns a step.

Simple returns, such as a jacket that does not fit, always take the same few steps. They go from checking the customer to writing the confirmation.

The platform team lead heads the team that builds and runs ShopAssist. The lead wants every release tested on the same path. That is the binding constraint.

A team member proposes one agent with every tool, for every kind of message. But an agent may change the order of the steps, so no release is tested on one path. "Every" is an absolute word, and here it fails. And a list of the steps in the prompt looks careful, but it is no guarantee.

We can draw these steps, so code runs them, and Claude writes the reply. The rule: when you can draw the steps, code owns them.

The same principle covers rules, not only steps. A customer writes that a lamp arrived broken. The policy replaces a damaged item when the customer reports it in time and sends a photo. Someone proposes that Claude reads the policy and decides each case.

Here the binding constraint is fairness. The same case must always get the same answer. Checking a report date against a time limit, and checking for a photo, each has one right answer. So code checks both, and Claude writes the reply to the customer.

A larger model only changes the product we use, not the design. And a person who checks every case brings the long queue back.

So steps and rules follow one principle. What you can draw or count, code owns. The model does the language.

Third, the value pillar.

DemoShop's chief operating officer, or COO, is the sponsor who decides whether ShopAssist gets its budget.

Let's try a question in the style of the exam. Assume DemoShop promises chat customers a first reply within a set time. Every miss costs money. At peak, about 200 chats are open at once. People at the support desk cannot keep the promise then. ShopAssist would answer order questions at once, so fewer chats wait for a person. Which pillar and which number should justify the project to the COO?

The binding constraint is the promise that is missed at peak.

Look at the options on the screen. A and D reach past it. A, transformation, sounds bigger, but no new way of working is the problem here. D gives all five pillars their own targets. That makes the argument weak: moving one pillar can push another down. C uses an average, which hides the slow chats at peak.

B is the answer: performance SLAs. Its number has a percentile and a load, just like the promise. The COO needs that one number.

The rule: choose the pillar the situation names, with a number shaped like the promise.

Let's go over the main points.

Find the binding constraint before you read the options. An absolute word is a reason to check, and a bigger model is rarely the fix. Steps you can draw and rules you can count go to code. The model explains the result. The value pillar is the one the situation names, measured by a number that matches the promise.

The practical rule: read the situation for its one deciding detail. Let that detail pick the answer, not the most impressive option.

Next, we choose which Claude model handles each kind of work in ShopAssist, and how we prove that choice with measurements.
