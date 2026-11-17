# 57. Decomposing Research Without Gaps

We have just built the store's research assistant. It has a coordinator in the middle and four subagents around it.

This lesson is about why a research report can miss whole areas, even when every subagent does its job well. This matters because a report with a gap looks just as finished as a complete one, so nobody notices what is missing.

Here is the scene. The team asked the research assistant why lamps are returned so often. The report came back clear and well written. It says that lamps are damaged in shipping, and it gives numbers and sources. Every subagent reported success.

But the support team knows more. Many customers return lamps because the wiring is loose. Others say that the lamp looked different from the photo on the website. Neither reason appears anywhere in the report.

The most important thing to remember is this. When every subagent succeeds and the report still has gaps, look at how the coordinator split the topic. We look at three things. First, how to find the cause. Second, how to split a topic so the parts cover all of it. Third, how the coordinator checks for gaps and fills them.

First, the cause. We open the coordinator's log. It split the question into three subtasks: damage in transit, packaging quality and complaints about the carrier. All three are about shipping. The web search subagent found articles about shipping. The document analysis subagent read the shipping reports correctly. The synthesis subagent combined these findings well. Each subagent did exactly what it was asked to do. The problem is what they were asked.

Splitting a task into parts is called decomposition, and this decomposition was too narrow. It never covered the whole topic.

We should not blame the search subagent for weak queries, or the analysis subagent for strict filters. Both worked correctly inside the scope they were given. The root cause is the coordinator's decomposition.

Second, the split. Before it delegates anything, the coordinator lists the main areas of the topic. For lamp returns, those areas are the reasons a lamp can come back. Some lamps are damaged in shipping. Others have manufacturing defects, like loose wiring. Some do not match the product photo. And some customers simply change their mind.

Then the coordinator gives each subagent its own part of the scope. It can split by reason, with one search task for each one. It can also split by source type. Web search takes public reviews and forums, and document analysis takes support tickets and supplier reports.

Distinct parts prevent duplication. Two subagents never read the same reviews, and the same complaint is not counted twice. Together, the parts still cover everything.

So check every plan with two questions. Does every area of the topic have an owner? And does any area have two owners?

Third, the gap check. Even a good plan can miss something. So the coordinator does not stop after the first synthesis. The loop has four steps. One, the synthesis subagent returns its conclusions. Two, the coordinator compares them with the areas in its plan and looks for gaps. Three, for each gap, it sends a targeted query back to search and document analysis. For example: find support tickets from the last year that mention loose wiring or a light that keeps turning on and off. Four, it runs synthesis again, with the old findings and the new ones together. Then it checks again.

We should not run the whole research again when one area is missing. That repeats work that is already done, and it costs calls and time. A targeted query names one gap and asks only about that gap.

When does the loop end? It ends when the coverage is enough. That means every area in the plan has findings with sources. In our case, the second round adds the wiring complaints and the photo complaints. The third check finds no new gap, so the report subagent writes the report. Like the agentic loop, this loop gets a limit on rounds as a safety net.

Let's review what we learned. A report can miss whole areas while every subagent succeeds, because the subtasks never covered the whole topic. The fix starts at the coordinator, not at the subagents. Partition the scope by part of the topic or by source type, so that every area has exactly one owner. After synthesis, the coordinator checks the result against its plan for gaps. It sends targeted queries to search and analysis, then runs synthesis again until the coverage is enough.

So when a report looks complete, check it against the full topic, not against the plan that produced it.

Next, we look at how the coordinator actually starts its subagents.
