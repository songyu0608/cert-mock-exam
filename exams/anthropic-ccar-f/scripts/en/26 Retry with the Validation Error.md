# 26. Retry with the Validation Error

Our code now checks ShopAssist's extractions and sends a failed one back to Claude with its error. This lesson is about why that retry works, and when it cannot work at all. This matters because every retry is one more request. A retry that cannot succeed wastes money. It can also push Claude to invent a value.

Here is where ShopAssist stands. Customers attach return forms to their support emails. ShopAssist reads each form and fills an extraction tool. The fields are on screen: the order number, the item, the order date, the delivery date and the reason. Our code checks every field before anything is saved. Most forms pass. When a form fails, the retry usually fixes it. But a few forms fail on every retry, with the same error each time.

The most important thing to remember is this: a retry can fix how Claude wrote the data. It cannot find data that the source does not contain. We look at three things. First, the two kinds of error. Second, what a good retry request carries. Third, where retry stops working.

First, the two kinds of error. A schema error is about shape. A required field is missing. A number arrives as text. Or a value is not in the list of allowed values. On the exam, tool use with a JSON schema removes these errors. In the current API, the guarantee comes from strict tool use or from structured outputs. Without strict mode, the tool input usually follows the schema, but not always. The details are on screen.

A semantic error is about meaning. The JSON has the right shape, but a value is wrong. Maybe the numbers do not add up. Maybe the right value sits in the wrong field. The schema cannot see this, because every field still has a valid type. So your code checks the meaning, field by field.

Here is an example. Alex returns a jacket, and the return form shows two dates. One is the order date, and the other is the delivery date. Claude puts each date into the other's field. Both are real dates, so the schema accepts them. But our code has a rule: the delivery date cannot come before the order date. That check fails. A second check finds a different problem. One date is written as "Sept 3rd". Our code expects the year, the month and the day as numbers. The date does not match the expected format.

Second, the retry request. We should not just send "try again". Claude does not know what went wrong, so it may make the same mistake. The API also remembers nothing between requests. So the follow-up request must carry everything Claude needs. It carries three things. The original document, so Claude can read the form again. The failed extraction, so Claude sees what it wrote. And the specific validation error, so Claude knows exactly what to correct. The error message is on screen. It names the field, says what is wrong, and says what a correct value looks like. With that message, Claude goes back to the form and reads the labels. It puts each date in the right field. It writes the date again in the expected format. The problem was never missing data. Claude had the data and wrote it wrong, so feedback fixes it. Keep the retry bounded, one or two attempts, as in the previous lesson.

Third, the limit. Now look at the forms that fail every time. On these forms, the order number field is empty. The customer wrote: "The order number is in my confirmation email." That email was never sent to ShopAssist. We can retry ten times, and the number still is not on the form. Claude cannot read what it never received. Worse, a retry that demands a value can push Claude to make one up. A made-up order number looks valid. It can pass every format check. We should not keep trying again until the field is filled. A filled field is not a correct field.

So before any retry, ask one question: is the information in the source? If it is, and Claude put it in the wrong shape or the wrong field, retry with the error. If it is not, stop. Leave the field null, mark it as missing, and get it from a real source. Here, ShopAssist asks Alex for the order number.

So a retry succeeds on format problems, structural errors and values in the wrong field. A retry fails when the information is absent. The classic case is a value that exists only in another document, one that nobody provided.

Let's review the main points. Schema errors are about shape, and tool use with a schema removes them. Semantic errors are about meaning, and your code catches them field by field. A good retry carries the original document, the failed extraction and the specific error. Retries fix format and structure. They never recover information that the source does not contain.

So when validation fails, first ask where the missing piece lives. If it is in the document, retry with the error. If it is not, stop the retries and ask for it.

Next, we design fields that expose the errors our checks cannot see yet.
