# 37. How Claude Chooses a Tool

Our support assistant already works in a loop, with the stop reason telling our code when to continue.

This lesson is about how Claude picks one tool when it has several. This matters because a loop that calls the wrong tool wastes rounds and confuses the customer.

ShopAssist now has four tools in its loop: get customer, lookup order, process refund and escalate to human. Most cases run well. But the team reads the logs and finds a pattern. Claude often mixes up get customer and lookup order.

The most important thing to remember is this: Claude chooses a tool mainly from its description. So when Claude picks the wrong tool, fix the description first. We look at three things. First, what Claude sees when it chooses. Second, why similar descriptions lead to wrong choices. Third, what a good description contains.

First, what Claude sees. Claude never sees the code behind a tool. It sees the conversation and three parts of each tool definition: the name, the input schema and the description. The name is short. The schema lists the input fields and their types. Only the description says what the tool is for and when to use it. So the description is the main input to the choice.

Second, why similar descriptions fail. Our two descriptions are on screen. Get customer says: "Retrieves customer information." Lookup order says: "Retrieves order details." Each is one line. Both tools accept a text value. To Claude, they sound almost the same.

Now look at two cases from the logs. Alex is already verified in the chat, and he asks about an order by its number. Claude calls get customer with that order number. A new customer gives only an email and asks about an order. Claude calls lookup order with the email. Both calls fail. Neither description said where one tool ends and the other begins.

When Claude sends a request to the wrong tool like this, we call it misrouting. Short or overlapping descriptions cause it. The exam uses its own example: two tools called analyze content and analyze document, with nearly identical descriptions.

Third, a good description. We expand both descriptions. A good description answers four questions. What does the tool do, and what does it return? What input does it take, with an example query or two? What happens in unusual cases, the edge cases? And when should Claude use the neighboring tool instead?

Here is get customer, rewritten. It finds a customer by email, phone number or full name. It returns a verified customer ID. Use it at the start of a case, or whenever the customer is not verified yet. A typical query is a customer who gives an email and asks about a refund. If several customers match, the tool returns all of them, and ShopAssist asks for another identifier instead of guessing. No match is an empty result, not an error. And the boundary: this tool does not accept order numbers. For an order, use lookup order.

Now lookup order. It returns one order, with its status, items, amounts, delivery date and return window. It needs two inputs. The first is an order ID in the store's format, with the format and an example on screen. The second is the verified customer ID from get customer. A typical query is: "Where is my jacket?" with the order number given. If the order belongs to another customer, the tool rejects it. If the customer gives no order number, ShopAssist asks for it. And the boundary: this tool does not search by email or name. For that, use get customer first.

Notice the last sentence of each description. Each one names its neighbor and says when to switch. That boundary is what stops the mix-up.

We should not fix this with a long set of few-shot examples in the system prompt. They add tokens to every request, and they leave the real cause in place. We should not start with a routing layer, or by merging both tools into one, either. Those are bigger changes, so they do not fit a first step. Also remember that a description guides Claude's choice but guarantees nothing. A rule that must always hold, like verifying the customer first, still belongs in code.

Let's recap. Claude chooses a tool mainly from its description, not from the code. Short or overlapping descriptions make similar tools look the same, and Claude misroutes. A good description says what the tool does and returns. It names the input formats, with example queries. It covers the edge cases. And it says when to use the neighboring tool instead.

So when Claude picks the wrong tool, start with the descriptions. Rewrite them until each tool's job and limits are clear.

Next, we look at what to do when better descriptions are still not enough.
