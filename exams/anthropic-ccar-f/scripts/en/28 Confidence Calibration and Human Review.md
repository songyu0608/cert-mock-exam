---
lab: true
---

# 28. Confidence Calibration and Human Review

In the previous lesson, we added fields that expose hidden errors, like a conflict flag and a calculated total. This lesson is about deciding which extractions a person must check. This matters because people have little time. Also, the model's own opinion of its work is not proof.

Here is the situation. ShopAssist reads the documents that customers attach to support emails. These are invoices, return forms and delivery notes. It fills an extraction tool, and our code validates the fields. Assume it handles about eight hundred documents a day. The support team takes the cases that ShopAssist hands over. Assume this team can spend one hour a day checking extractions. That is about forty documents. So we must choose which forty, and we must choose with evidence.

The most important thing to remember is this: Claude's confidence is only a claim. Labeled data turns it into evidence. We look at three things. First, confidence for each field, checked against known answers. Second, accuracy for each group of documents, before we automate anything. Third, random samples that keep measuring after launch.

First, confidence for each field. We ask Claude to give a confidence score for every field, not one score for the whole document. On one return form, the order number may be printed clearly, while the reason is vague. One score for the whole form would hide that difference. A score for each field shows where the doubt is.

But we should not trust these scores as they are. A model can be confidently wrong. A score of nine out of ten is only Claude's own estimate. So we check the scores against a labeled validation set. This is a set of real documents where a person has already written down the correct value for every field. We run ShopAssist on these documents and compare its answers with the known values. Then we ask a simple question. Of all the fields that Claude rated high, how many were actually right? This check is called calibration. We compare the scores with measured accuracy, and then we set a threshold.

A threshold is a cut-off score. Fields below it go to a person. Assume Claude's high scores on order numbers are right ninety-nine times in a hundred. Then we can save a high-confidence order number without a check. Now assume its high scores on the return reason are right only eighty-five times in a hundred. Then the reason needs a stricter threshold, or a person checks it. So each field can get its own threshold. Confidence decides where the review goes. It does not decide what is correct.

With thresholds checked this way, we can plan the team's hour. First come extractions with a conflict flag, because the source disagrees with itself. Next come low-confidence fields that involve money or identity, like the refund amount and the order number. Smaller doubts wait in a queue for later. This way, the reviewers spend their limited time where an error costs the most.

Second, accuracy for each group. Assume our validation set shows ninety-seven percent accuracy overall. That sounds ready to automate. But one overall number can hide a weak spot. Most of our documents are return forms, and those are almost always right. Delivery notes are only one document in twenty. They come from several shipping partners, and each partner uses a different layout. Assume the delivery date on these notes is right only seventy percent of the time. The overall number hardly changes, because there are so few delivery notes. But the delivery date decides whether a return is inside the thirty-day window.

So before we reduce human review, we measure accuracy for each document type and for each field. One such group is called a segment, for example "the delivery date on delivery notes". We automate only the segments that prove reliable. A weak segment keeps human review while we improve it. For example, we can add few-shot examples of the layouts that fail.

Third, random samples. After launch, high-confidence extractions go straight into the store's systems, and nobody looks at them. So we would not notice if they started to go wrong. We should not review only the low-confidence items. Then we only see the errors that Claude already doubts. The dangerous errors are the confident ones.

So every day, we review a small random sample from every group. We group the extractions by document type and by confidence level: high, medium and low. Every extraction falls into exactly one group. Taking a random sample from each group is called stratified random sampling. Assume five of the team's forty daily checks are high-confidence extractions, picked at random. This sample gives us two things. First, a real error rate for the output that nobody else checks. Second, an early warning about new kinds of errors. Maybe a shipping partner changes the layout of its delivery notes next month. Claude still reports high confidence, but the dates start to come out wrong. The sample catches this before thousands of wrong records are saved.

Here is what to remember. Ask Claude for a confidence score on each field, not one score for each document. Check those scores against a labeled validation set, and set a threshold for each field. Send conflicts and low-confidence fields about money or identity to a person first. Measure accuracy by document type and by field, because ninety-seven percent overall can hide a weak segment. Keep reviewing random samples from every group, including high-confidence ones, to measure the real error rate and catch new errors.

So let evidence decide where your reviewers spend their time, not the model's opinion of its own work.

Next, we look at work that nobody waits for, and when a batch is the right way to run it.
