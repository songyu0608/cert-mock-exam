# 14. Selecting Claude Models for Production Workloads

ShopAssist now has a design on paper, with stages, promises and a pattern for each step. Now we choose what runs inside those stages, and we start with the model.

Picture the first version in production. Every message goes to the largest Claude model. A greeting, a question about order status and a disputed refund all go to the same place. The answers are good. But the monthly bill keeps growing, and the chat feels slow at peak.

The COO, who sponsors ShopAssist, asks a fair question. Do we need the biggest model for all of this?

This question opens a new section. Behind us is the design: what ShopAssist does and why. This section serves exam Domain 2, about 13 percent of the exam. In short, we decide what each stage runs: the model, the prompt and the context.

Here is the core idea. You choose a model for each kind of work, not one model for the whole application. Then you prove each choice on your own cases.

Three things make this work. First, the four Claude models and their roles. Second, a model for each kind of work in ShopAssist. Third, the measurement that confirms the choice.

First, the four models.

Anthropic, the company that makes Claude, offers its models under four names. New versions arrive, but each name keeps its role. So we talk about the names, not version numbers.

Haiku is the fastest and least expensive. It fits simple steps that happen very often. One example is putting a label on a message.

Sonnet is the balanced middle. Anthropic describes it as the best combination of speed and intelligence.

Opus is for hard work. That means complex reasoning, and long agent tasks with many steps.

Fable is the top tier, the most capable and the most expensive. It is for the hardest reasoning, when Opus still falls short on your cases.

So each step up gives more ability. Each step up also costs more, and usually answers more slowly. That is the whole trade.

Second, a model for each kind of work.

ShopAssist does several kinds of work. Each kind has its own volume, risk and difficulty. Let's take three.

The first is the router. It reads every message and puts one label on it, such as order status or return. Then code sends the message to the right next step. Assume about 2,000 conversations a day, so the router runs thousands of times. A label is short, and code can check it. This is Haiku's kind of work.

The second is the policy answer. The customer wants to return a jacket and asks whether the return window still applies. Claude reads the return policy and writes the reply. The reply names the policy section it used. Some cases sit right at the edge of the policy. As a starting assumption, this is Sonnet's kind of work.

The third is the disputed case. Earlier we met a customer who writes about three orders at once. One item is missing, and a gift arrived damaged. That case needs an agent, with many tool calls and decisions in a row. Such cases are rare. As a starting assumption, this is where Opus may pay off.

Notice the shape. The cheap model takes the high volume. The expensive model takes the rare, hard cases. And our hard rules do not move with the model. The refund limit and the return check stay in the code of the tools.

So one model for everything is the wrong design. The largest model by default pays a high price for a one-word label. Every customer also waits longer. The bill grows with volume, not with difficulty.

Third, measure the choice.

A model choice is a claim, so we test it like any claim. We take real ShopAssist cases, each labeled with its correct result. We run each candidate model on them. One run proves little, because answers vary from run to run. So each case runs at least three times. Then we compare three numbers: the share of correct answers, the p95 time, and the cost of each thousand requests. Code checks the answers where it can, for example whether the router's label is right.

Measuring also stops the opposite mistake. Someone moves every step to Haiku to cut the bill, and checks nothing. Most answers still look fine. But policy edge cases start to fail. Nobody notices until a customer gets a wrong answer about a refund. Both mistakes have one cause: a choice made without measuring.

You can start from either end. Anthropic's guidance names both ways. Start with Haiku, and move up only where your cases show a gap. Or start with Opus to see the best quality, then move down while quality holds.

The result is a decision for each kind of work. It names the model and the numbers behind it. A new model version is a good reason to measure again.

On the exam, model choice is about trade-offs. The options compare quality, speed and cost for a task, not version numbers.

Let's go over the main points.

Claude offers four models with stable roles, from fast Haiku to top-tier Fable. Each step up costs more and is usually slower. A production system chooses a model for each kind of work, by its volume, risk and difficulty. The largest model by default wastes money, and cutting blindly breaks edge cases. Every choice is confirmed on your own cases, with accuracy, p95 and cost.

The practical rule: match the model to each kind of work, and let your own measurements make the final call.

Next, we tune the same model in three more ways: effort, batches for work that can wait, and fast mode.
