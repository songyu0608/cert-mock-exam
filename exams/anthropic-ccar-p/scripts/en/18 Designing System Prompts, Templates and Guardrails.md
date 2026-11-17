# 18. Designing System Prompts, Templates and Guardrails

ShopAssist now has a model and an effort level for each kind of work. Every one of those requests starts with the same text: the system prompt. This is the instruction the application sends before the conversation, on every request.

This lesson answers one question. How do we design that text so the team can change it safely? And what can it never promise?

Here is the core idea. A system prompt is a part of the software, not a note. It has versions and slots for data. It guides Claude, but it guarantees nothing.

We go through it in three parts. First, the system prompt as a versioned component. Second, the template with slots for data. Third, guardrails, and where the guarantee really lives.

First, the system prompt as a component.

ShopAssist's system prompt has three parts. The role says who Claude is here: DemoShop's support assistant for orders and returns. The rules say what it does and what it never does. For example, it names the policy section it used. It never states a delivery date that it did not read from the order. The format says how the reply looks: short and plain, the right shape for a chat.

Each part also has a fixed place. Stable text goes at the top. The order details and the current time change with each request, so they go at the bottom. A later lesson shows how this place saves money.

This text decides how ShopAssist behaves, so we treat it like code. Each change gets a new number. That numbered state of the text is called a prompt version. It lives in the team repository, the shared place where the team keeps ShopAssist's code. A change goes through review, and it runs on the evaluation set before release.

Each conversation is saved with the version that answered it. So when more conversations are suddenly handed to people, we can see which version started it. And we can go back to the version before.

We should not edit the prompt directly in production, with no version. It feels fast. But then nobody knows which text gave which answer.

Second, the template.

A prompt template is the fixed text of a prompt with named slots. Code fills each slot for each request.

Picture ShopAssist's template. At the top are the role, the rules, the format and the return policy. At the bottom is a slot for the order. The customer asks about returning the jacket. Code looks up the order and fills the slot: the item, the status, the delivery date and the amount. Claude never writes these values. Code copies them from the order backend.

Each slot sits inside a marked area. One label shows where the order data starts. A matching label shows where it ends. This helps Claude tell instructions from data. The rules say what to do. The text inside the order area is only facts to read.

A template also gives us one place to fix things. Change a rule once, and every conversation gets the fix in the next version.

Third, guardrails.

A guardrail is a rule that keeps the assistant inside safe limits. ShopAssist's prompt has one. Never promise a refund above the automatic limit of 500 dollars, and hand those cases to a person.

Claude follows clear rules well, so this line works most of the time. But Claude writes likely text, not certain text. A long chat or an unusual case can still lead to a promise it should not make.

Some teams write the rule in capital letters, add the word "must", and call it done. A stronger word may lower how often the rule breaks. It does not stop it. A guardrail in the prompt lowers the rate. A check in code gives the guarantee.

At ShopAssist, that check sits in the refund tool. Say the customer wants a refund for a laptop that cost 640 dollars. Claude may ask the tool to pay it. The tool's own code compares the amount with the limit, and it refuses. The case goes to a person. Whatever Claude wrote, no money moves.

We keep both. The prompt rule means Claude rarely tries, and the customer hears a calm explanation, not an error. The code check means a rare failure costs nothing.

On the exam, watch for one kind of option. It protects a rule that must always hold with stronger prompt words only. That option is usually wrong, even when it looks careful.

Let's go over the main points.

The system prompt is a component with a role, rules and a format. Every change is a numbered prompt version, tested on the evaluation set and saved with each conversation. A template has slots that code fills, inside marked areas that keep data apart from instructions. A guardrail in the prompt lowers how often a rule breaks. Code gives the guarantee.

The practical rule: write the rule in the prompt so Claude rarely breaks it. Then check it in code, so a break costs nothing.

Next, we choose how a prompt teaches a task: zero-shot, few-shot, or reasoning.
