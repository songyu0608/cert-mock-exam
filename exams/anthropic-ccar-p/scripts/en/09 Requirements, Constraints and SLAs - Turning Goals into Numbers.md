# 9. Requirements, Constraints and SLAs: Turning Goals into Numbers

We can now read a number honestly, with a percentile, a spread and enough cases. Now we use that skill to write requirements.

The head of support, who runs DemoShop's support team, gives us one demand for ShopAssist. It must answer fast and accurately. That sounds like a requirement, but nobody can test it. How fast is fast? Accurate on which questions?

This lesson turns a goal like that into numbers the team can build to and check. Three steps make this work. First, we separate what the system does from how well it does it. Second, we write each "how well" as a number the team can test. Third, we split hard limits from goals, and we rank the goals.

First, the two kinds of requirement.

A functional requirement says what the system does. ShopAssist finds the customer's order. It answers questions about the return policy. It hands a case to a person with a summary. Each feature is either there or missing.

A non-functional requirement says how well the system does its work. It adds no feature. It sets a level that every feature must meet. These levels fall into three groups. The first group is speed. It covers how long a customer waits for an answer. It also covers how many chats the system can handle at once, and how much of the time it is up. The second group is being right and safe: the share of correct answers, and who can see which data. The third group is cost, like the cost of each resolved case.

Why does the split matter? Assume ShopAssist finds every order correctly, but each answer takes fifteen seconds. Every feature works, and customers still leave the chat. The functional list says what to build. The non-functional requirements decide how to build it.

Second, the number the team can test.

Take the word "fast". A useful number has three parts.

The first part is the percentile. An average hides the slow answers, so we write p95.

The second part is the load: how busy the system is when we measure. One chat on a quiet morning tells us nothing about the busiest hour. Assume DemoShop has about 200 chats open at once at its peak. We measure at that load.

The third part is what the number covers: which channel, and which moment of the answer. In the chat, the reply appears word by word. So the moment that matters is when the first words appear.

Put the three parts together, and "fast" becomes one line. In the website chat, 95 percent of replies show their first words within 3 seconds, with 200 chats open at once. That is our assumption for DemoShop, not yet agreed with the head of support. But now the team can test it. They run 200 chats at once and read the p95.

This line can become an SLA. We said earlier that an SLA, or service level agreement, is a promised level of service, stated as a number. Now we add one more part: missing it has a consequence. The promise is made to DemoShop's customers. Each miss costs DemoShop something.

A number with no consequence is only the team's own target. That target should stay stricter than the promise, say 2 seconds against 3. The gap leaves room, so a small delay does not break the promise.

Third, hard limits and goals.

A hard constraint is a line the system must never cross, whatever it costs in speed or money. At DemoShop, a refund goes only to the verified owner of the order. A refund above the automatic limit of 500 dollars always goes to a person.

Everything else is a goal, like speed or cost. We want more of it, and we can trade it.

Goals conflict. Picture a DemoShop customer who writes in the website chat to return a jacket. Return answers must be correct. So before ShopAssist promises the customer a refund, a tool checks whether the order qualifies. That check adds time. Some return chats would miss the 3-second line.

We do not settle this in the moment. We rank the goals in advance and write the ranking down. For ShopAssist, hard constraints sit above everything. Below them, correct return answers come first, and chat speed second.

Now the conflict has a clear answer. ShopAssist replies quickly that it is checking the order. The answer about the refund follows after the check. Our speed line covers only the first words, so it still holds.

Without a ranking, each engineer settles the conflict alone. One removes the check to hit the speed number. Another adds three more checks. Both believe they followed the requirements.

Let's go over the main points.

Functional requirements say what the system does. Non-functional requirements say how well, in three groups: speed, being right and safe, and cost. Each one becomes a number with a percentile, a load and what it covers. An SLA adds a consequence, and the team's own target stays stricter. Hard constraints are never traded, and goals are ranked before they conflict. On the exam, check every SLA option for those three parts and a consequence.

The practical rule: if you cannot test a requirement at peak load, it is not a requirement yet.

Next, we follow a customer's email through the whole system, and see where feedback comes back in.
