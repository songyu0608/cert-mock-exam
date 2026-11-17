# 27. Fields That Expose Errors

We have just retried failed extractions, sending the exact validation error back to Claude. But some data passes every check and is still wrong. This lesson is about extra output fields that make these hidden errors visible to our code. This matters because a wrong value that looks valid goes straight into the store's systems.

Here is where we are. ShopAssist reads the documents that customers attach to support emails, such as invoices and return forms. It fills an extraction tool, and our code validates every field before anything is saved. The shape is right, and the types are right. Still, a few extractions are wrong, and no check notices.

The most important thing to remember is this: ask Claude for the evidence of a problem, not only for the answer. Then your code compares. We look at three fields. First, a calculated total next to the stated total. Second, a conflict flag. Third, a detected pattern on each review finding.

First, the totals. Alex attaches an invoice to a refund request. It lists three items and a total at the bottom. Assume the printed total is ten dollars higher than the items add up to. Maybe a line item is missing from the extraction. Maybe the invoice itself is wrong. If our schema has only one total field, Claude must choose a number. It may copy the printed total, or it may quietly correct it. Either way, the difference disappears, and nobody sees it.

So we add two fields. Stated total is the number printed on the document. Calculated total is the sum of the line items, which Claude adds up itself. Our code compares the two. If they differ, the extraction is flagged instead of saved. Notice that both values pass the schema. Only the comparison shows the error. Second, the conflict flag. Sometimes a source disagrees with itself. On Alex's return form, the refund box is ticked. But in the comment line, Alex writes: "Please just send me a new one." So does Alex want a refund or a replacement? We should not let Claude silently pick one value. A clean answer hides a real question. So the schema gets a true or false field called conflict detected, plus a short field that names the values that disagree. Here, conflict detected is true. The note says that the form asks for a refund, while the comment asks for a replacement. Our code sees the flag and does not start a refund. Instead, ShopAssist asks Alex which one is right. Third, the detected pattern. This field is for the team's review bot. The review bot is a CI job that posts Claude's findings as comments on every pull request. Developers dismiss some of these findings. But a dismissed finding alone tells us little. Was the finding wrong, or just not important? So each finding gets one more field, detected pattern. It names the code construct that triggered the finding. One example is "a search that returns an empty list". Another is "an amount read from the customer's message".

Now the team can count dismissed findings by pattern. Assume the logs show forty dismissed findings in one month. Thirty of them have the same pattern: a search that returns an empty list. That gives the team a clear target. It fixes the criteria for that one pattern and leaves the rest of the bot alone. Without the field, those thirty findings are just thirty separate comments in free text.

One limit applies to all three fields. They do not make Claude correct. They make errors visible, so that your code can catch them every time. Claude extracts, and your code checks.

Here is what to remember. Stated total is what the document says. Calculated total is what the items actually add up to. When the two differ, your code flags the extraction. Conflict detected marks a source that disagrees with itself, so nothing gets chosen silently. Detected pattern names the code construct behind each finding, so you can study dismissed findings by pattern.

So when an error can hide inside valid data, add a field that exposes it, and let your code do the comparing.

Next, we decide which extractions people should check, because nobody can check them all.
