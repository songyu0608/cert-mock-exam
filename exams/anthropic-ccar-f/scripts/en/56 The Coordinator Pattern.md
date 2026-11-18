# 56. The Coordinator Pattern

Last time, we chose between a fixed sequence of steps and a plan that grows as the work goes.

This lesson is about the coordinator pattern: one agent in the middle that runs several helper agents. This matters because the exam's multi-agent questions start from this picture.

Here is where we are. ShopAssist is now a complete support agent, and it handles one customer case at a time. But the store's team has a bigger question: why are lamps returned so often? No single case can answer that. The answer is spread across support tickets, customer reviews, supplier reports and the web. So the team builds a research assistant on the Agent SDK. The research assistant is a separate program. It collects facts from many sources and writes a report for the team.

The research assistant has five agents. Four of them are helpers, called subagents. Each subagent does one kind of work. The web search subagent finds articles, forums and public reviews. The document analysis subagent reads the store's own files, like tickets and supplier reports. The synthesis subagent combines all the findings into a few clear conclusions. The report subagent writes the final report. The fifth agent is the coordinator. You met that word earlier: a coordinator is an agent that splits a task and collects the results.

The most important thing to remember is this: subagents never talk to each other. Every message goes through the coordinator. We look at three things. First, why everything passes through the coordinator. Second, what the coordinator decides. Third, how it briefs a subagent.

First, the routing. Picture a wheel. The coordinator is the hub in the center, and the subagents are the spokes. Each spoke connects only to the hub. This shape is called hub and spoke. The web search subagent sends its findings to the coordinator. Then the coordinator decides what goes to synthesis. We should not let the search subagent send its results straight to synthesis. It looks faster, but it removes the one place that sees the whole system.

The exam names three reasons for the hub. The first is observability. Every message passes one point, so we can log it. When the report contains a strange claim, we can trace which subagent produced it, and what it received. The second is consistent error handling. Suppose a search times out. The coordinator decides what happens next, and it decides the same way for every subagent. We look at failures in detail later. The third is controlled information flow. The coordinator decides what each subagent receives. So the report subagent gets the conclusions, not two hundred raw web pages.

Second, the decisions. The coordinator has four jobs. It selects which subagents a question needs. It decomposes the question into parts. It delegates each part to a subagent. And it aggregates the results into one answer. For the lamp question, the coordinator needs all four subagents. Web search and document analysis collect the facts. Synthesis turns them into conclusions, and the report subagent writes them up.

But now a team member asks something smaller: how many lamps were returned last month? That number sits in the store's own data. So the coordinator sends one request to document analysis and returns the answer. It searches nothing on the web, and it writes no report. We should not run the full pipeline for every question. A fixed path through all four subagents wastes calls and time on simple questions. Extra steps can also add noise, like web opinions mixed into a plain count.

So the coordinator first analyzes the query. How complex is it? Which sources can answer it? Then it picks only the subagents it needs. This is the same model-driven choice we saw in the agentic loop, one level higher.

Third, the brief. The coordinator writes a prompt for each subagent, and there are two ways to write it. The first way is a procedure. Search for "lamp broken". Open the first five results. Copy the star ratings. This is fragile. Maybe the first five results are adverts. Maybe the real pattern is in a forum the procedure never mentions. The subagent follows the steps and misses what matters.

The second way is a goal with quality criteria. The goal is to find out why customers return our lamps. The criteria say what a good result looks like. Use sources from the last two years. Give each finding its source and its date. Prefer reports with numbers over single complaints. And say clearly what you could not find. Both briefs are on screen.

Now the subagent can adapt. Say many reviews mention loose wiring in one model. The subagent can follow that lead, because it knows the goal. So the exam's answer is to give subagents goals and quality criteria, not step-by-step instructions. The brief must also carry the facts the subagent needs, and we come back to that later.

One more point. More agents do not make a system better by themselves. Each agent adds coordination, and each handoff is a place where information can get lost. ShopAssist's support chat still runs as one agent. Split the work only when the parts need different skills or different sources.

Let's recap. In hub and spoke, every message between subagents goes through the coordinator. That gives you observability, consistent error handling and controlled information flow. The coordinator decomposes the task, delegates the parts and aggregates the results. It selects only the subagents each question needs, instead of running the full pipeline. It briefs each subagent with a goal and quality criteria, not a list of steps.

So keep the coordinator in the middle, and let it decide who works on each question. Next, the lamp report looks complete, and it is not.
