# 106. Functions, JSON and Schemas (for non-developers)

This lesson is about how programs describe data and actions, so that Claude and our application agree on them.

This matters because ShopAssist does more than talk. To act on an order, it needs data that a program can read, and actions it can ask for.

This is an optional lesson, for people who do not write code.

The most important thing to remember is this: a schema is a contract. It tells both sides what the data must look like.

We look at three things. First, JSON, the format for the data. Second, schemas, the rules for that data. Third, functions and tools, the actions.

First, JSON. Alex, one of the store's customers, writes: "I want to return the jacket from my last order. One button is broken."

A person understands this sentence at once. A program does not. It needs each piece of information in its own labeled place. That is called structured data. JSON is the most common format for it. The letters stand for JavaScript Object Notation, but you do not need to know JavaScript to read it.

On screen is Alex's request as JSON. The brackets around the fields mark an object. Think of it as a group of fields. Each field has a name and a value. The field called reason has the value "broken button". The field called refund requested has the value true.

Values have types. A string is text, written in quotes. A number is written without quotes, like the price of the jacket. A boolean is true or false, and nothing else. An array is a list inside square brackets. Maybe Alex reports two problems: a broken button and a missing belt. Both go into one array of strings.

Now one detail that surprises many people. The order number looks like a number, but we store it as a string. It has letters and a dash. Nobody does math with order numbers. And a real number would lose a zero at the start. So identifiers, like order numbers and customer IDs, are strings.

Second, the schema. JSON holds the real values. A schema describes the rules for those values. It says which fields exist and which type each field has. It also says which fields are required. A required field must always be present. For example, a return request must always have a reason. An optional field may be missing, like an extra comment from the customer. The schema contains no customer data at all. It describes the shape that every request must have.

Why does this help? Imagine Claude answers with a sentence: "I think the customer probably wants a refund." Our application must now guess what to store. With a schema, the application knows where each value is. It can check the result in code. Are all required fields present? Is the price really a number? Is refund requested really true or false? If something is wrong, the application catches it before anything happens.

As we said earlier, the API can make Claude's output follow a schema. But a schema checks the shape of the data, not whether the facts are right.

Third, functions and tools. A function is a named action in a program. It takes inputs, does some work, and returns an output. Take lookup order. Its name says what it does. Its inputs are the order number and a verified customer ID. Its output is the order: the items, the status and the delivery date.

A tool is a function that our application describes to Claude. The description has three parts. First comes the name. Then a short text that says what the tool does and when to use it. Last comes an input schema, the same kind of contract, this time for the tool's inputs. For lookup order, the input schema says that the order number is a required string.

Claude reads this description. It never sees the code behind it. Claude can then ask for a tool call. Our application runs the function and sends the result back. Claude decides what it needs, and the application does the work.

Let's go over the main points. JSON stores data as fields with names and values. Values can be strings, numbers, true or false, or arrays. Identifiers like order numbers are strings. A schema is the contract: which fields, which types, and which are required. A tool is a function described to Claude with a name, a description and an input schema.

So when Claude and your application must agree, write the agreement down as a schema.

In the course, the first practice with tools follows one tool call from start to finish.
