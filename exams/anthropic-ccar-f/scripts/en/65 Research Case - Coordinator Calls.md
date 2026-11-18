# 65. Research Case: Coordinator Calls

This checkpoint is about the research coordinator's decisions when a research system misses areas, loses a source or drifts off its task. This matters because the exam's research scenario asks where each failure starts. Very often, the answer is the coordinator.

This time we use the exam's own research system. It works for a software team. It writes reports on technical topics, and each report names its sources.

Here is the first symptom. The team asks for a report on the security risks of open-source packages. The report comes back clear and well sourced. Every subagent reported success. The web search subagent found articles. The document analysis subagent read the papers correctly. The synthesis subagent combined the findings, and the report generation subagent wrote it up. But the report covers only one area: known security bugs in a package, called vulnerabilities. It says nothing about packages that nobody maintains anymore. It says nothing about license risks. And it misses fake packages that copy the names of popular ones.

What does this situation demand? Nobody asks for a guarantee here. We need the first step that fixes the cause.

One fix looks reasonable: raise each subagent's result limit, so web search returns fifty results instead of ten. That fails. The coordinator's log shows three smaller tasks: vulnerabilities in JavaScript packages, vulnerabilities in Python packages, and tools that check packages for vulnerabilities. More results inside those three tasks only bring more articles about vulnerabilities. The subagents did exactly what they were asked to do. The problem is what they were asked.

The best move has two parts. First, fix the coordinator's decomposition. It lists the main areas of the topic before it delegates anything. Each area gets exactly one owner. Second, add a gap check. After synthesis, the coordinator compares the conclusions with its list of areas. For each missing area, it sends a targeted query to search and document analysis. Then it runs synthesis again until every area has findings with sources.

Two mechanics still apply here. Web search and document analysis do not depend on each other. So the coordinator puts two Task calls in one response. Then they run in parallel. And the complete findings from both go directly into the synthesis prompt, because synthesis does not see the coordinator's history.

Here is the rule. When every subagent succeeds and whole areas are missing, fix the coordinator's split.

Second decision. A key source is an industry survey on package maintenance, stored as a PDF. The document analysis subagent cannot open it, because the file is corrupted.

What does this demand? The run should continue, and the coordinator needs enough information to choose what happens next.

The fix that looks reasonable is to catch the error and return an empty result, so the run continues. That fails, because a failure is now hidden as a success. The coordinator reads "no findings in this survey". Synthesis then treats missing data as a fact, and the report draws a conclusion from a document nobody read.

The best move starts with local recovery. Maybe the download was cut off, so the subagent loads the file once more. Assume it fails again. Now the subagent returns structured failure context, in four parts. The failure type says that the file is corrupted, and it still failed after one retry. The second part is what was attempted: the survey and the question asked of it. Then come the partial results. Assume twelve pages were read before the error. The last part lists alternatives, such as the publisher's web version or last year's edition.

With this, the coordinator decides. It can send web search for the web version, or go on with the partial results. Synthesis then marks that area as a gap, because the survey could not be read.

Here is the rule. Fix what you can where it fails, then report the rest in full, never as empty.

Third decision. When the team set up the system, they gave the synthesis subagent the full web search tool, just in case. Now synthesis runs its own searches. It pulls in articles about general software quality that the plan never asked for. Some of its new findings have no dates and no sources.

What does this demand? A first step at the configuration, because the agent is doing another agent's job.

One fix looks reasonable: keep the tool, and tell synthesis in its prompt to search only when necessary. That fails. The tool is still in its list, so it still invites work outside the role. A prompt line guides Claude most of the time, not every time.

The best move is to restrict each subagent's tools to its role. Synthesis gets no search tools. But assume the logs show that most of its searches were simple checks, such as a release date or a download count. For that frequent, simple need, synthesis gets one scoped tool, verify fact. It checks one claim against one source. Complex verification still goes back through the coordinator to web search.

Here is the rule. Give each agent the tools its role needs, plus one narrow tool for a frequent simple check.

Here are the main points to remember. Missing areas with successful subagents mean the decomposition was too narrow. Fix the split, then loop over the gaps. A source that cannot be read gets a local retry, then a four-part failure report. The coordinator decides, and synthesis marks the gap. An agent that drifts off its task usually has tools outside its role. Remove them, and add one scoped tool for the simple checks.

The same rule works in the support scenario. When ShopAssist answers only one of three concerns, its tools are not the problem. The message was never split into separate items.

So a system may skip work or do the wrong work. Then first fix how the work was split, and what each agent was given.
