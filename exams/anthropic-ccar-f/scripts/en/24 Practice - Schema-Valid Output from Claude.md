---
lab: true
---

# 24. Practice: Schema-Valid Output from Claude

In this lesson, we make Claude answer in a fixed shape, so that our code can read the answer without guessing. This matters because a support system does not want prose. It wants fields it can store.

Customers send emails about returns, and we want three fields from each one: the order ID, the item, and the reason.

We start with an empty file, extract dot py, and the top of the file is the setup we always use, so I paste it. We import json, load the key from dot env, create the client, and name the model.

Now the shape we want. We describe it as a JSON schema. A schema is a description of the data: which fields there are, and what kind of value each one holds. We call it SCHEMA. The answer is an object, so a set of named fields. Then we list the fields. The order ID is a string, so text. The item is a string too. The reason is also a string, but only four values are allowed: too small, too big, damaged, or other. A fixed list like this is called an enum. Claude cannot invent a fifth reason. Then we say that all three fields are required. And additional properties false means that no other fields are allowed. The answer has exactly these three.

Next, a function that sends one email to Claude. We call it extract, and it takes the text of the email. Inside, the usual call: response equals client dot messages dot create, with the model and max tokens, three hundred. Then the output config. This time it holds two things. The effort, low, as usual. And the format: type JSON schema, with our schema. This is the line that matters. It tells the API that the reply must match our shape. Then the messages, with one user message. The content asks Claude to extract the return request from this customer email. Then come two new lines, and the email itself. And we close the call.

Now we read the reply. As before, we go through the blocks, and when the type is text, we return json dot loads of that text. Json loads turns the JSON text into a Python dictionary. Because the format is fixed, we do not search the reply for the data. We parse it directly. If no text block came back, the function would return nothing, so a real system checks for that too.

Now two test emails, in a list called EMAILS. The first one names the order. I want to return the blue jacket from this order, and it is too small. The second one says the shoes are damaged. And it never mentions an order number.

Finally, a loop over the emails. For each email, we call extract, and we print what comes back.

Let's run it. Each email is a separate request to Claude, so the answers come one after the other. The first email gives three correct fields: the order ID, the blue jacket, and the reason, too small. The second email also gives three fields. The item is shoes, the reason is damaged, and the order ID is the word unknown. The schema was satisfied. It asked for a string, and a string came back. But the value is useless. If we stored it, we would have a return request that points at no order.

It is tempting to think a schema makes the answer correct. It makes the answer well formed. Correct values are a separate problem, and our code must check them.

One note for the exam. The exam guide teaches another way to force structured output. You define a tool whose input schema is your shape, and you set tool choice to any, or to that tool by name, so Claude must call it. That is the answer to give on the exam. The current Opus, Sonnet and Fable models reject those two tool choice settings. In current code, you use the output format we wrote here, or a tool marked strict, with tool choice set to auto.

So here is what happened. We described the shape once, with a schema. Claude filled that shape for both emails, and our code read the replies without guessing. The first reply was complete. The second was well formed, but one of its values was a placeholder.

So the practical rule: use a schema so the reply always has the right shape, and still check the values before you trust them.
