# 31. Extraction Case: Valid Fields

Up to now, we have checked ShopAssist's extractions, retried the failed ones and run them in batches. Before we go on, let's see how the exam asks about extraction.

This lesson goes through three decisions that make extracted fields safe for other software. This matters because the exam's extraction scenario needs three things. Fields must parse every time. They must never be invented. And they must share one format.

The exam's scenario is a system that pulls data out of documents and sends it to other systems. Our store has the same kind of job. The store's finance team pays the suppliers who send it jackets, lamps and headphones. Every night, a small import program reads the day's supplier invoices. It sends each invoice to Claude, gets the fields back, and loads them into the accounting system. That system is strict. When a record cannot be read, the whole import stops.

First decision. Some mornings, the import has stopped. Assume about two invoices in a hundred come back as text that the program cannot parse. One answer starts with a friendly sentence before the JSON. Another one is missing a closing bracket. The prompt simply says: return the fields as JSON. What does this situation demand? The accounting system must read every record, so we need a guarantee, not a first step.

Two fixes look reasonable. The first is louder wording: "Return only valid JSON, nothing else." That fails, because Claude follows an instruction most of the time, not every time. The second is to retry whenever parsing fails. That only catches the error after it happens. We pay for a second call, and the next invoice can break in the same way.

The best move is tool use with a JSON schema. We define an extraction tool, and its input schema is the invoice record. Claude fills that schema. This is the exam's answer. In the current API, the guarantee comes from strict tool use. That means strict is set to true on the tool. Structured outputs give the same guarantee. The details are on screen. Now every record parses.

This decision has a second move, because a record can be schema-valid and still wrong. Assume one invoice lists three items that add up to four hundred and ten dollars. The printed total says four hundred and twenty. The schema accepts both values, because both are numbers. So the record carries two fields. Stated total is the number printed on the invoice. Calculated total is the sum of the items. Our code compares the two and holds any record where they differ.

Here is the rule. The schema guarantees the shape, and your code checks the meaning.

Second decision. The import runs cleanly now. But the finance team finds purchase order numbers that the store never issued. A purchase order number is the store's own reference for one order to a supplier. Some small suppliers never print it. On their invoices, Claude still returns a number that looks real. Why? In the schema, this field is required. So Claude must put something there, and it fills the gap.

This time, the question asks for the first fix, and the fix belongs in the schema and the prompt. The fix that looks reasonable is to keep the field required and retry until it is filled. That fails in two ways. A retry cannot find information that the invoice does not contain. And a retry that demands a value pushes Claude to invent one. A filled field is not a correct field.

The best move has three parts. First, make the field nullable. Then null is a valid answer when the invoice has no number. Second, look at the fields where the document can be vague. Take the expense category: an enum gets a value called "unclear", next to "other" with a detail field. Third, add two to four few-shot examples, each with a different invoice layout. One of them is an invoice without a purchase order number, and its correct answer is null.

Here is the rule. When the source is empty, the field stays empty.

Third decision. Suppliers write dates in many ways. One uses numbers with slashes. Another writes the month as a word. A third writes the year first. The accounting system expects one format: year, month and day, as numbers. Assume about one invoice in thirty fails the date check. What does this demand? One format for every record, with as few retries as possible.

The fix that looks reasonable is to send each failed record back with "try again". That fails, because Claude does not know what went wrong, so it can repeat the same mistake.

The best move is a normalization rule in the prompt, next to the strict schema. The rule says: write every date as year, month and day. It also shows one converted example. Now most dates arrive in the right format on the first try. Some will still fail, so the fallback is a retry with the specific error. That request carries the original invoice, the failed record and the exact validation message. It names the field and the format we expect. A retry like this fixes format and structure. It never recovers information that the invoice does not contain.

Here are the main points to remember. "Return JSON" is a request, but a schema on a tool or on the output is a guarantee. Schema-valid is not correct, so compare a calculated total with the stated total in code. A required field invites invented values, so make it nullable, add "unclear" where the source can be vague, and show varied layouts. A normalization rule handles predictable format differences. A retry with the specific error handles the rest.

The same rule works in the exam's CI scenario. There, the review bot runs Claude Code with JSON output and a schema, so every finding parses. But a finding can still point to a line that is not in the diff. So the CI job checks that line before it posts a comment.

In every scenario, let the schema guarantee the shape. Let your code check the meaning. And leave a field empty when the source is empty.
