# 32. Extraction Case: Types and Review

Earlier, the store's finance team made its invoice fields safe for the accounting system.

This lesson is the second checkpoint on extraction. Now we go back to ShopAssist's own attachments, at full scale.

This matters because two decisions must come before extraction runs on thousands of mixed documents. The first decision is what makes every document produce a tool call. The second is how much people must still check.

First decision. ShopAssist reads the attachments on support emails. These are invoices, return forms and delivery notes. It has one extraction tool for each type, and tool choice is set to auto. Assume about one attachment in forty comes back as a sentence, like "This seems to be a delivery note." There is no tool call. Our code has nothing to save, and the case waits. What does this situation demand? Every document must produce structured fields, so we need a guarantee.

Two fixes look reasonable. The first is an instruction: "Always call one of the extraction tools." That fails, because Claude follows an instruction most of the time, not every time. The second is to force the invoice tool on every request, because invoices are the most common type. That fails as well. A return form is then pushed into the invoice schema, and its values land in the wrong fields.

On the exam, the best move is tool choice any. Claude must call a tool, but it picks the one that matches the document.

Now add one more need. Assume the store wants each document's metadata first: its type, its date and the order it mentions. Only after that does our code add the order details. Here, the exam's answer is to force extract metadata in the first request. The enrichment happens in follow-up requests, where tool choice goes back to auto.

Now the product note, with the details on screen. The current Opus, Sonnet and Fable models reject any and a forced tool with an error. So in your code, use auto with a strict tool and an instruction that names the tool. Or use structured outputs. Then check in code that a tool call really came back.

Here is the rule. When every document must produce fields, the exam's answer makes the tool call required. In your code, use a strict tool, and treat a missing tool call as a failure that your code catches.

Second decision. The extractions now arrive every time. The support team still checks them by hand, and a manager looks at the numbers. Assume the labeled validation set shows ninety-seven percent accuracy. The manager says: "That is good enough. Let's stop human review." What does this demand? We do not need a guarantee here. We need evidence before we remove a safety check.

Two fixes look reasonable here as well. The first is to accept the overall number and stop all review. That fails, because one average can hide a weak spot. Delivery notes are only a small share of the documents. Assume their delivery date is right only seventy percent of the time. That date decides whether a return is inside the thirty-day window. The second fix is to keep review only where Claude says it is unsure. That fails too. Raw confidence is the model's own claim, and the dangerous errors are the confident ones.

The best move has three parts. First, measure accuracy by document type and by field. Reduce review only for the segments that prove reliable. Second, ask for a confidence score on each field. Calibrate those scores against the labeled set, and send fields below the threshold to a person. Third, keep reviewing a stratified random sample from every group, including high-confidence output. That sample shows the real error rate and catches new kinds of errors.

One planning note. Assume these extractions run as a batch, and the team promises results within thirty-six hours. A batch can take up to twenty-four hours. So the team must submit a new batch at least every twelve hours.

Here is the rule. Reduce human review segment by segment, on measured evidence, never on one average.

Here are the main points to remember. For documents of unknown type, the exam's answer is tool choice any. When one extraction must run first, force that tool and do the rest in follow-up requests. In current code, use auto with a strict tool, or structured outputs. Ninety-seven percent overall can hide a weak document type or field. Calibrated field-level confidence routes review, and stratified sampling keeps watching the confident output.

The same rule works in the exam's CI scenario. A review bot can look accurate overall while one category of its findings is mostly wrong. So the team counts dismissed findings per category, not as one total.

Whenever you decide how much to trust Claude's output, measure each segment on its own. Then let that evidence decide where people still look.
