---
lab: true
---

# 38. Renaming, Splitting and Keyword Triggers

Last time, we wrote better tool descriptions for ShopAssist. The description is the first fix when Claude picks the wrong tool.

This lesson is about what to do when better descriptions are still not enough. This matters because some mix-ups come from somewhere else: the tool's name, the tool's shape, or the system prompt.

The most important thing to remember is this. The name, the description and the system prompt must all point Claude the same way. We look at three fixes. First, rename tools that overlap. Second, split a tool that does too many jobs. Third, check the system prompt for keyword triggers.

For the first two fixes, we use the exam's own example. It is a research agent. A research agent is a program that searches the web and reads documents to answer a question. This agent has two tools, called analyze content and analyze document. Their descriptions are almost identical.

First, renaming. Analyze content works on web search results. But its name says "content", and that word fits a document too. So even with a better description, the general name still leads Claude to the wrong tool. We rename it to extract web results. We also give it a description that is only about the web. It takes the text of search results and returns the facts found on each page, with the page address. Now the name and the description point to one kind of input. A document is clearly not a web result, so the overlap is gone.

Second, splitting. Analyze document has the opposite problem. It is one general tool for several jobs. It can pull out numbers, write a summary, or check a claim. Claude must guess which job each call is for, and the output changes shape every time.

So we split it into three tools. Each one gets a defined input and output contract. A contract here means what goes in and what comes out. Extract data points takes a document and returns a list of values, each with its place in the document. Summarize content takes a document and returns a short summary. Verify claim against source takes one claim and one source. It returns whether the source supports the claim, with the matching part of the text. Now each name says one job. Split a tool when it hides several jobs. But do not cut one job into many tiny tools, because more tools also make the choice harder.

Third, the system prompt. Back to ShopAssist. Its descriptions are good now. Still, Claude sometimes calls lookup order with only an email. The cause is one line in the system prompt: "When the customer mentions an order, use lookup order." Alex writes that he has a question about his order, and he gives his email. The word "order" appears, so Claude follows the instruction. But lookup order needs an order ID and a verified customer ID. The right first step is get customer.

This is a keyword trigger. A keyword trigger is an instruction that ties a tool to a word, not to a situation. It can win over a well-written description. So we read the system prompt and look for words that are tied to tools. Then we rewrite each such line around the situation, or remove it and let the descriptions decide. For example: verify the customer with get customer first, then look up the order once you have its number.

So the order of fixes is this. First, expand the descriptions. If two tools still overlap, rename them, or split a general one. Then check the system prompt for keyword triggers that conflict with your descriptions. None of this is a guarantee. A rule that must always hold, like verifying the customer first, still lives in code.

Here is what to remember. The description is the first fix. When two tools overlap, rename them so the name and the description point to one kind of input. When one tool does several jobs, split it into tools with their own inputs and outputs. A word in the system prompt can pull Claude toward a tool, even against a good description. So review the system prompt for those words.

So when Claude keeps choosing the wrong tool, make the name, the description and the system prompt tell the same story.

Next, the right tool is chosen, and then it fails.
