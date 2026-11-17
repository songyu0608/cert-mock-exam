---
lab: true
---

# 17. Practice: A Model Scorecard - Haiku vs Sonnet at Two Effort Levels

Every request ShopAssist sends goes to a model, at an effort level. A bigger model, or more effort, costs more. So which one is enough for each job?

Here is what we have: twelve labeled cases from ShopAssist's support chat. Labeled means each case comes with its right answer, written down in advance. Six are customer messages that a router sorts into a category. Six are policy questions, and the customer reads the answer.

Here is what we want: one scorecard that shows which model and which effort get each kind of case right, how fast, and at what price.

Here is the plan. Each case goes to Claude in four setups: Haiku and Sonnet, each at low and at medium effort. A grader in code checks every reply. Then one line per setup shows the correct answers, the typical time, the slow tail, which is the p ninety-five time, and the price of a thousand requests. We build it in three steps: one case, then the grader, then the whole table.

The file already holds the setup and the cases. At the top, load dot env reads the API key from the dot env file, so the key never sits in the code. Anthropic creates the client, which sends our requests. Models and efforts list what we compare. Prices is a dictionary with each model's dollars per million tokens, in and out.

Then two system prompts. The router replies with one word, a category. The answer prompt says: answer from the policy in one short sentence, and start with yes or no. The whole policy follows it.

And the twelve cases. Each has its kind, the customer's message, and the words a correct reply must contain. Some are easy. Others sit on a border, like a swimsuit that still has its hygiene strip.

First, one case, from the message to the result.

One case takes the model, the effort and the case. It splits the case into its kind, the message, and the words we expect. We note the time before the call.

Now the key part, the call to Claude. The model and the effort come in from outside, so one function serves all four setups. The system prompt is picked by the kind of case, and the customer's message is the one user message.

Seconds is the time now, minus the start. The content of a response is a list of blocks, such as thinking or text. The reply is the text in the last block.

Then the cost. We take this model's two prices from our dictionary, and the usage, which counts the tokens in and out. The tokens times their prices, divided by a million, give the cost of this one request in dollars.

For now, the function gives back the reply itself, with the seconds and the cost. At the bottom, a quick test: the swimsuit question, on Haiku at low effort.

Let's run it. One request, to Haiku. The reply starts with no. But then it explains that a swimsuit with the strip still on may be returned. So a customer who reads only the first word gets the wrong answer.

Second, the grader.

It is plain code, not a model, so it gives the same verdict every time. That is called a code grader.

Is correct takes the reply and the words it must contain. It turns dots, commas, question marks and the stars of bold text into spaces, and splits the reply, in lower case, into single words. So no is not found inside know. If any expected word is missing, the reply is not correct. If every word is there, it is correct.

Now one case gives back the grader's verdict, instead of the reply.

Let's run it again. The same question, to Haiku at low effort. This time we see the verdict: false. The grader expects the word yes, and the reply does not have it.

Third, the whole table.

One case is not enough, and one run is not enough either. So score runs every case three times, for one setup. Thirty-six requests, one after another, would take a while. So a thread pool sends up to twelve of them at the same time.

For each case, three times over, the pool starts one case. It gives back a job, a handle to a request that is still running. We keep each case with its job. The pool is used inside a with block, the lines that sit under it. When that block ends, the pool waits until all the requests are back.

Then we collect the results. The times, the total cost and the missed messages start empty. For each job, result gives the verdict, the seconds and the cost. The seconds go into the list, and the cost into the total. A wrong reply puts its message on the missed list. Correct is all the jobs, minus the missed ones.

Then the two times. P fifty is the median: half the replies came faster. P ninety-five is the slow tail: ninety-five of a hundred replies came faster. Quantiles is a Python function that cuts the sorted times into equal parts. With twenty parts, the last cut is p ninety-five.

And the price of a thousand requests: the total cost, per request, times a thousand. Score gives back all five: the correct count, the two times, the price, and the missed list.

At the bottom, the quick test goes away. Instead, two loops: every model, at every effort. For each pair, we score that setup, and keep the five numbers it gives back. Then we print one line: the correct answers out of thirty-six, the two times, and the dollars per thousand requests. Below it, each missed message once, with how many of the three runs missed it.

Let's run it one more time. Haiku at low effort comes first, with thirty-six requests, twelve at a time. Then the same cases at medium effort, and then Sonnet, at both levels.

Here is Haiku at low effort. All its misses are policy answers, never a routing case. The swimsuit question we tried first is on the missed list again. At medium effort, Haiku gets all thirty-six right. Sonnet gets all thirty-six right, at both levels.

The typical times are close, about a second. The slow tail changes from run to run, so this table does not rank the models on speed. The prices are not close. Haiku costs fifteen cents or less per thousand requests, and Sonnet about two dollars forty.

So the numbers decide. Routing goes to Haiku at low effort: right in every run, at the lowest price. Policy answers go to Haiku too, but at medium effort. Low effort failed on the border cases, and medium fixed them for a little more money. Sonnet was right as well, but here it bought nothing, for about sixteen times the price. It stays for the jobs where a scorecard shows that it is needed.

This table is not a verdict about the models. It is a verdict about these twelve cases. A real scorecard has a hundred cases or more, and it runs again before every model or prompt change.

Here is what happened. Twelve labeled cases went to four setups, three times each. A grader in code checked every reply, and one line per setup showed the correct answers, the times and the price.

For the COO, who pays for every request, this is the cost of each answer: the cheapest setup that passes, not the biggest model.

Your task: add a border case of your own, with the words a correct reply must contain, and run the scorecard again.

The practical rule: choose the model and the effort for each kind of job with a scorecard on your own cases, and pick the cheapest setup that is right in every run.
