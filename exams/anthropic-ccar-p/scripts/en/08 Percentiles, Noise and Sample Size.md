# 8. Percentiles, Noise and Sample Size (for non-developers)

If you already work with percentiles and sample sizes, you can skip this lesson.

Each part of ShopAssist now has one number that shows its value. But a number can mislead us if we read it the wrong way. This lesson shows three common ways that happens and what to do about each.

Here is the core idea. An average hides the slow answers. One run hides how much results change from run to run. And a small set of cases hides noise. Three things fix this: percentiles, repeated runs, and enough cases.

First, percentiles.

Assume we measure how long ShopAssist takes to give its first answer in 100 chats. The average is 2 seconds. That sounds good. But look closer. Most chats got an answer in about one second. A few chats waited nine seconds or longer. The average mixes them together, and the slow chats disappear inside it.

A percentile shows them. We take the 100 waiting times and sort them from fastest to slowest. Then we read the time at a chosen place in that order. The p50 is the time in the middle. Half the chats are faster, and half are slower. The p95 is the time that 95 out of 100 chats beat. Only 5 out of 100 are slower.

In our example, the p50 is about one second. The p95 is 9 seconds.

So who waits 9 seconds? Real customers do. Assume DemoShop has about 2,000 conversations a day. Five percent of them is about 100 customers every day. For each of those customers, an average of 2 seconds means nothing. They wait 9 seconds, and some of them leave the chat.

The slowest answers, at the end of that sorted order, are called the tail. A percentile like p95 keeps the tail in view.

This is why a service promise is written with a percentile. An SLA does not say "the average answer is fast". It says something like "95 percent of first answers arrive within a few seconds".

Second, repeated runs.

Send ShopAssist the same message twice, and you may get two different results. The time changes, because the load on the system changes. One reply may also be longer than another. The text changes too. We already know that a model writes likely text, so its answer is likely, not fixed.

Take a customer's question about returning a jacket. We send it three times. Two replies say that the jacket can be returned. The third reply asks the customer for the order number first. Two runs take about the same time. The third is much slower.

So you run each case at least three times. Then you report two numbers: the average and the spread. The spread is how far the results are from each other. A small spread means the result is stable. A large spread means one run tells you very little.

A common mistake is to trust one good run. Someone tries a new prompt once, and the answer is perfect. They call it proven. But that run may have been lucky. The next customer may get the third reply, not the first one.

Third, sample size.

Now we compare two prompt versions. Assume we test both on the same 12 cases. Version A answers 9 correctly. Version B answers 10. Is B better?

Maybe not. The difference is one case. With 12 cases, one case is about 8 percent. Run both versions again, and B may get 9 while A gets 10. A difference that comes from chance, not from a real change, is called noise.

Sample size is how many cases we measured. It decides what we can honestly claim. With 12 cases, we can trust a large difference, for example 4 correct against 11. We cannot trust a difference of one case. To claim a small improvement, we need many more cases, and repeated runs on each one.

The company that makes Claude published research on measuring models. It gives the same advice. Repeat the questions, and report how much the results can move, not only one score.

So before anyone says "version B is better", we ask two questions. How many cases did we measure? And would the difference survive another run?

Let's go over the main points.

An average hides the slow answers, so we read the p50 and the p95. Service promises are written as percentiles, because real customers wait in the tail. The same request can give a different time and a different answer. So we run each case at least three times and report the average and the spread. A small difference on a few cases may be noise, and sample size decides what we can claim.

The practical rule: never trust one number from one run; ask for the percentile, the spread and the sample size.

Next, we turn goals like "fast and accurate" into requirements with exact numbers, and see where SLAs fit.
