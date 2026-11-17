---
lab: true
---

# 33. Practice: BUILD - ShopAssist Extracts Return Requests

In this lesson, we put the extraction to work: a folder of customer emails goes in, and a list of return requests comes out. This matters because one working function is a demo, and a batch with a status for every record is something the support team can use. So far, our code can read one email and give back three checked fields.

Here is the situation. The support inbox saves each email as a text file in a folder called emails. There are five of them, so let's open three. The first one has an order number and a blue jacket, and the jacket is too small. The second is about damaged shoes, with no order number at all. And this one has an order number with only four digits, which is not a valid order ID.

Now the script that reads them all. We start with an empty file. First, we import json. We need it at the end, to save the results as a JSON file. Then Path, from pathlib. It is the usual way in Python to work with files and folders. And from validate, we import the extract function. As you remember, it sends one email to Claude with the schema, checks the answer in our code, and asks again with the error when a check fails. So every email in the batch goes through the same checks.

Next, an empty list called requests. It will collect one record for every email. Then a loop over the folder. Path emails dot glob finds every file that ends in dot t x t, and sorted keeps them in name order, so the output is the same every time. Inside the loop, we read the text of the file and pass it to extract. What comes back is a dictionary with the order ID, the item and the reason.

Then we add two fields of our own. First, the file name, so a person can find the email later. Then a status. It is ok when there is an order ID, and needs review when the order ID is missing. We add the record to the list. And we print one line for every email: the file, the order ID, the item, the reason and the status. We wrap the order ID in str, because it can be None, and None cannot be printed with a column width. Str turns it into the text None. The numbers after the colons just line the columns up.

After the loop, we save the whole list. Json dumps turns it into text, with an indent of two so it is easy to read, and write text puts that text into a file called return requests dot json. At the end, one summary line: how many requests we saved, and how many need review. The sum counts the records whose status is not ok.

Let's run it. Each email is at least one request to Claude, so the lines come one by one. The first email has the order number, the blue jacket, too small, and the status is ok. The shoes have no order number, so their status is needs review. The backpack is complete.

Then comes a line that is not a record. The check rejected the four-digit order number, and extract asked Claude again with the error. After that second try, the headphones have no order ID at all, so they need review too. The lamp is complete too. And the summary: five requests saved, two need review.

The JSON file now holds all five records. Let's make the terminal bigger and print the start of the file. We show its first twelve lines with head. Each record has the three fields from Claude, plus the email and the status. The second record has null as its order ID. Json dumps writes Python None as null, the JSON word for a missing value.

It is tempting to send the two unclear emails back to Claude with more pressure, until it gives an order number. It would give one, and the number would be invented. A missing value is information. It tells the team which emails a person must read.

So here is what the batch did. Five emails went through the same path: read the file, extract with the schema, check, and ask again where needed. Three records came out complete. Two came out with no order ID, and their status sends them to a person. All five were saved to the JSON file.

So the practical rule: run the checked extraction over the whole batch. Keep a status for every record, and never force a value. Send the records with missing values to a person.
