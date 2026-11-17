# 12. Architecture Decisions and Trade-Off Analysis

We can now choose who owns each step: the code or the model. ShopAssist needs many more choices like that one.

As its architect, we make these choices. The architect answers for the whole system, from the business problem to how it runs in production. So each choice has to fit the whole system, not only one part of it. We also have to explain them, months later, to people who were not in the room.

This lesson answers one question: how do we choose between real design options, and keep the reason?

Three things make this work. First, we rank the requirements and list two or three options we could really build. Second, we compare the options on the same five measures every time. Third, we write the decision down, with the condition that would change it.

We carry one decision through the whole lesson. How does the text of the return policy reach Claude?

First, requirements before options.

We already ranked them for ShopAssist. Hard constraints sit above everything. Below them, correct return answers come first, and chat speed second. Cost per resolved case is a goal we watch. When two options disagree, this ranking decides which one wins.

Then we list the options. Each one must be something the team could really build and run. For the policy, there are two. In the first, the whole policy goes into the prompt of every request. In the second, we split the policy into small parts and store them. For each question, a search step finds the few parts that match. Only those parts go to the model.

One common mistake is to compare our favorite against options nobody would build. That only hides a choice we already made. Two or three honest options are enough.

Second, the same five measures, every time.

They fall into three groups. The first group is money and time. Cost is the money for each resolved case. Latency is how long the customer waits for the first words. The second group is the system over its life. Reliability means the answer is right and the system keeps working. Ease of change is how simply the team can update and fix it. The third group is risk. Security asks who can see which data, and what can go wrong.

Now we compare our two options. Assume the policy is a few pages long, in 16 sections. Assume it changes a few times a year.

Money and time come first. The whole policy in every prompt means more input tokens on every request. But that text is the same each time. So the API can keep this unchanged start of the prompt for a few minutes. It keeps it in a short-term store, called a cache. Later requests read it from the cache, at a tenth of the input price or less. At this size, the saving is money, not waiting time. This is prompt caching, and a later lesson shows how to set it up. Search sends fewer tokens, but it adds a search step before the model.

Then the system over its life. With the whole text, Claude sees every section. So no search step can leave the right section out, although Claude can still overlook part of a long text. With search, a wrong or old part can come back, and then the answer is wrong. Also, when the policy changes, someone must update the stored parts. With the whole text, the team changes one file.

Last, risk. The policy is public text, so both options are equal here. A tie is a fine result.

So the whole policy in the prompt wins, for now. Notice what decided it: the size of the text and how fast it grows. A small text that rarely changes fits in the prompt. A large or fast-growing set of documents needs search.

Before we write this decision down, one more mistake. It goes back to the first step. There, we ranked the requirements: hard constraints, then correct answers, then chat speed. This mistake skips that ranking altogether. It decides on one measure, such as fewer tokens. Or it decides by taste, because search sounds more modern. Neither one is analysis.

Third, the written decision.

A decision record is a short note that keeps one decision and why we made it. It names the options we compared, the one we chose, and the reason. It also names the price we accept. Here, we pay for the policy tokens on every request.

The last line is the reversal condition. That is a clear event that tells us to open the decision again. We write two of them. If the policy grows past about 50,000 tokens, we compare again. That number is an assumption for DemoShop. And if answers start to miss sections of the long text, we compare again too.

Now picture the record at work. DemoShop also has a support handbook, a guide for its support staff. Months later, ShopAssist may need that handbook too. With the record, the team does not argue from the start. It checks one line: has the condition happened? If it has, the team compares again, on the same five measures.

Let's go over the main points.

We rank the requirements first, then list two or three options we could really build. We compare them on the same five measures, in three groups: money and time, the system over its life, and risk. For the return policy, size and growth decided, so a small, stable text goes whole into the prompt. A decision record keeps the choice, the reason, the price and the reversal condition. On the exam, be careful with an answer that decides on one measure, or gives no reason beyond preference.

The practical rule: rank first, compare on the same measures, and write down what would make you change your mind.

Next, we use these ideas on exam-style questions about solution design. They cover workflow or agent, model or code, and which value pillar supports a project.
