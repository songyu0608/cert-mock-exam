---
lab: true
---

# 25. Practice: Validate, Then Retry with the Error

Earlier, we made Claude answer in a fixed shape, with a schema. The shape is now always right, but a value inside it can still be wrong, and nobody notices it until it is stored. Today our code checks the values, and when one is wrong, Claude gets the exact error and one more try.

So far, our script pulls return requests out of customer emails, in the shape our schema sets. Here is the plan for today. A customer email goes to Claude, and Claude returns JSON. Our code checks the values. If they are fine, we use the data. If not, we send Claude its answer and the error, and Claude tries again. We get there in three small steps.

We start from our extraction script, saved as validate dot py. Here is the schema with the three fields. The extract function sends one email to Claude and turns the reply into a dictionary. And at the bottom, two test emails. We add a third one: headphones, from an order number with only four digits. A real order number has eight digits after the dash.

Before we run it, one small change at the bottom. We put the test under if name equals main. This is the usual Python way to say: run this part only when we start this file, not when another script imports extract from it.

Let's run it. Three emails, one after the other, and each one is a request to Claude. The jacket is fine: a real order number, the item, and the reason. The shoes email has no order number, but Claude still filled the order ID, with the word unknown. And the headphones got the number with four digits. For our schema, both answers are fine, because both are strings. But both are wrong, and both would be stored. So we have two problems: a value that is missing, and a value that is not valid. We fix them one at a time.

First, the missing value. Claude wrote unknown because our schema leaves no other choice: the order ID must be a string. So we write the order ID over several lines, to make room for two settings. Its type is a list: a string, or null, and null means there is no value. And a description tells Claude when to use it: null if there is no order number.

Let's run it again. The same three emails go to Claude. The shoes now have no order ID. It says None, which is Python's word for null. That is the honest answer. But the headphones still have the four digits. A schema checks only the shape, so the value check belongs in our code.

So the second step is a check in our code. Under the extract function, we write a function called is valid. It takes an order ID and answers true or false. If there is no order ID, that is allowed now, so the answer is true. If it starts with O R D and a dash, and it has twelve characters in total, it has the right form. True again. Anything else is false. At the bottom, we try it on each answer: if the order ID is not valid, we print rejected, and the value.

Let's run it with the check. Three requests to Claude, as before. Under the headphones, there is a new line: rejected, and the number with four digits. Our code sees the mistake now. But it only prints it. The wrong value is still in the data.

Here is the idea for the third step. Our code asks Claude with the conversation so far. Then it reads the JSON and checks it. If the check passes, we return the data. If it fails, our code sends the conversation back to Claude: the email, Claude's own answer, and the exact error. Then Claude tries again. We stop after three attempts, so a hard case cannot go on forever.

In the picture, the first box is ask Claude, with the conversation so far. Right now, our extract function builds one message from one email, inside the request. So we turn it into that box. We rename it to ask Claude, and it takes the messages. The message we built here goes away. The request now sends the messages it gets: messages equals messages. And it returns Claude's text as it is, because we may need to send that text back to Claude.

Now the new extract function, under is valid. It takes one email and runs the loop from the picture. First, the request text, the same as before, with the email after it. The conversation starts with one user message: that request. Then the loop: for attempt in one, two, three.

Each attempt has two halves. The first half asks, reads and checks. We ask Claude, with the conversation so far. We turn the text into a dictionary with json dot loads, and we take out the order ID. If it is valid, we return the data, and the loop ends.

The second half runs only when the check fails. We write the error: the value, and that it is not a valid order ID. We print it, with the number of the attempt, so each rejection shows up in the output. Then Claude's own answer goes into the conversation, with the role assistant. Then our feedback: the error, and a short request to fix it, or use null. It goes in as a user message. Now the conversation holds the email, the wrong answer, and exactly what was wrong with it.

If all three attempts fail, we return None. The check now happens inside extract, so we remove the test lines at the bottom.

Let's run it one more time. Each email is a request to Claude, and the headphones need two of them. The jacket and the shoes pass on the first attempt. The headphones are rejected once, with the same error. Claude got that error and tried again. This time the order ID is None, because the email has no valid order number. That answer passes our check.

Here is what happened with the headphones. Attempt one: Claude returned the number with four digits. Our check rejected it. Our code sent Claude its answer and the error. Attempt two: Claude returned null, and the check let it through.

It is tempting to retry by sending the same request again and hoping for a better answer. That is a coin flip. Sending the exact error turns the retry into a correction: Claude sees what was wrong, and fixes that.

So the practical rule: let the schema shape the answer, let your code check the values, and when a check fails, send the exact error back and retry a few times at most.
