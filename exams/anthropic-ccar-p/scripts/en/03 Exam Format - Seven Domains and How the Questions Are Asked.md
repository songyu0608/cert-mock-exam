# 3. Exam Format: Seven Domains and How the Questions Are Asked

The course follows the exam's seven domains, so let's look at the exam itself.

This lesson covers three things. First, what each domain asks. Second, how exam day works. Third, how to read a question.

In short, the exam asks you to choose a design that fits one situation. So careful reading matters as much as knowledge.

First, the seven domains.

The exam guide describes what Anthropic expects from an architect who builds Claude systems. Its tasks are written as decisions. You select a pattern, weigh a trade-off or find the cause of a failure. So learning parameter names and API fields is the wrong focus. A question gives you a situation and asks what to do.

Each domain has a weight. The weight is the share of questions that comes from that domain. The seven domains fall into three groups.

The first group is design and models.

Solution design is 17 percent. It asks how you turn a business request into a design, which pattern fits, and what value it brings.

Models, prompts and context is 13 percent. It asks which model fits a task and how to write instructions for it. It also asks how to send the model less text and use the same parts again.

The second group is integration and evaluation.

Integration is the largest domain, at 19 percent. It asks how Claude connects to tools, data and other systems, and who may do what. Search over company documents belongs here too. So do speed against accuracy, and watching a large system at work.

Evaluation, testing and optimization is 16 percent. It asks how you measure quality, find the cause of a failure, and lower cost and waiting time.

The third group is risk, people and the team.

Governance, safety and risk is 14 percent. It asks how you control risk with safety checks, human review, laws such as privacy rules, and fairness.

Stakeholder communication is also 14 percent. It asks how you learn what the business needs and explain your choices. It also covers the life of the system, from the first conversation to running it.

Developer productivity is the smallest domain, at 7 percent. It asks how you set up Claude Code, Anthropic's agent for developers, for a team, and how you help developers fix problems.

Each of the three groups is about a third of the exam.

Second, exam day.

There are 63 questions and 120 minutes. That is a little under two minutes per question.

Some questions have one correct answer. Others are multiple response. You choose more than one answer, and the question tells you how many. The guide names only these two kinds. Candidates also report sets of yes-or-no statements and items to sort into groups. The guide does not name these, so treat them as possible, not certain.

Pearson VUE, a testing company, delivers the exam. You take it online or at a test center. Either way, a person watches you the whole time, so you work with no notes and no help. The exam is in English or Japanese. It is open only to people at companies in the Claude Partner Network. You register with your work email at that company.

Your result is a scaled score, on a fixed scale from 100 to 1,000. You pass at 720. The guide does not turn 720 into a number of correct answers. You are measured against a fixed standard, not against other candidates. The score report also shows your percent correct in each domain. It helps you find weak areas, but it does not decide the pass.

The fee, the wait before a second try and the renewal rules are on the screen, with the pages they come from.

Third, how to read a question.

With about two minutes each, you have time to read slowly. Many options look reasonable. Usually one detail in the situation rules most of them out. We call that detail the binding constraint. It is the requirement that decides the answer. It may be a word like "never", a deadline, a budget or a rule about data. So find that detail before you look at the options.

A few words come back often, and later sections teach each one. A compensating control watches a risk or makes it smaller, but does not remove it. A log, an alert and a confirmation step are examples. Least privilege means each role gets only the tools it needs. Minimum necessary means the model gets only the data the task needs. A system boundary is the line around what your system includes.

Let's try a question in the style of the exam.

ShopAssist answers customers who ask where their order is. The order backend, DemoShop's order system, returns the correct delivery date. In a few chats, ShopAssist still told a customer a date that is not in the order. DemoShop requires that the assistant never states a date it did not read from the order. Which change best meets DemoShop's requirement?

First, find the binding constraint. It is the word "never". A rule that must hold every time needs something that works every time.

Look at the options on the screen. Two of them, A and D, ask the model to behave better. One repeats the rule in the prompt, the other asks Claude to list the order's dates first. Both can make wrong dates rarer, but neither makes them impossible.

B reviews a sample of replies each week. That is a compensating control. It finds a wrong date after the customer has already read it.

C is the answer. Code compares each date in the reply with the date in the order, before the reply goes out.

So when a situation says always or never, look for the option that enforces it in code.

Let's sum up.

The exam has seven domains, and its tasks are decisions, not API details. You get 63 questions in 120 minutes, and you pass at a scaled score of 720. Read each situation slowly and find the binding constraint. When the risk can be removed or blocked in code, a compensating control is the weaker answer.

The practical rule: before you read the options, name the one detail that decides the answer.

Next, we look at what a model really sees in one request: tokens and context.
