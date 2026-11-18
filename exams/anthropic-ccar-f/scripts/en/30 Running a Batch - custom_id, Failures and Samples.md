---
lab: true
---

# 30. Running a Batch: custom_id, Failures and Samples

This lesson is about running a batch without paying twice. A batch costs about half as much as normal calls, but a badly planned run can lose that saving.

Here is where we are. ShopAssist, our support assistant for an online store, now has a nightly job. Every night, it audits the day's closed conversations. Was the policy applied correctly? Should a person check the case? In the previous lesson, we moved this audit to the Message Batches API, because nobody waits for its results. Our code puts the conversation, the order and the store's policy into each request. Assume that about three thousand requests go out each night.

The most important thing to remember is this: every request in a batch has its own label. That label lets you fix only what went wrong. Three habits make a batch cheap. First, match results by their custom ID. Second, fix and resubmit only the failures. Third, test the prompt on a small sample before the full batch.

First, matching. Each request in a batch gets a custom ID. This is a label that you choose, for example a name built from the conversation it audits. A request and its result are on screen. Notice that the result carries the same custom ID.

This matters because results do not come back in the order you sent them. The tenth request may finish first. So we should not match results by their position in the list. That would attach one audit to the wrong conversation. Our code reads the custom ID of each result and saves it to the matching record.

Second, failures. Assume that in the morning, almost every request has succeeded, but a few have failed. Each result says whether it succeeded. Look at one failure. That conversation was very long, and the request went past the context limit. The context limit is the most text Claude can read in one request.

We should not submit the whole batch again. We would pay a second time for thousands of good results. Instead, our code collects the custom IDs of the failed requests. It fixes each one first, because an unchanged request would fail the same way again. The long conversation is split into smaller parts. Each part fits inside the limit. Then only the fixed requests go into a new, small batch. Keep the custom IDs stable, so each result still finds its record.

Third, the sample. A batch that fails loudly is easy to fix. A weak prompt fails quietly. Every request succeeds, and every result has the right shape, but the audits are wrong. Maybe the prompt never says how to count the thirty-day window. A day later, we have paid for three thousand weak answers, and we must run them all again.

So before the first full run, we take a small sample. Assume fifty conversations of different kinds. We run the prompt on them, and a person reads the results. We fix the prompt, the schema and the checks. Then we run the sample again. Only when the sample looks right do we send the full batch. This way, more requests succeed on the first run, and fewer need a second one.

Let's go over the main points. Every batch request carries a custom ID. Results come back in any order, so match them by that ID, never by position. When some requests fail, fix each one first, for example by splitting a long document into smaller parts. Then resubmit only those requests. Before a large batch, refine the prompt on a small sample.

So test on a small sample, label every request, and pay again only for what failed.

Next, before we go on, we look at how the exam asks about extraction.
