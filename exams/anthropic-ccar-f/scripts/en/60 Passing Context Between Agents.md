# 60. Passing Context Between Agents

Each subagent in the store's research assistant now has only the tools its role needs.

This lesson is about what a subagent is told when it starts. This matters because a subagent knows nothing except its prompt. If a fact is missing from the prompt, the subagent cannot use it.

Here is the scene. The research assistant is trying to answer one question: why are lamps returned so often? Its coordinator has already started web search and document analysis, and both results are back. Now the coordinator starts the synthesis subagent with a Task call. The prompt says: "Combine the findings about lamp returns into a few clear conclusions." The answer comes back in general words. Lamps are often damaged in shipping. Some customers report quality problems. It has no numbers, no sources and no dates. Any article about lamps could have said the same things.

The most important thing to remember is this: a subagent starts empty. It knows only what the coordinator writes into its prompt. We look at three things. First, why the subagent starts empty. Second, what the coordinator must pass. Third, what form that context should take, and how to keep it small.

First, the empty start. The coordinator has a long conversation behind it. That conversation holds the team's question, the coordinator's plan, and the results from both earlier subagents. The synthesis subagent sees none of it. A subagent runs in its own isolated context, so it does not inherit the coordinator's conversation history. Subagents also share no memory between runs.

Say the coordinator finds a gap and runs synthesis a second time. The second run does not remember the first. So "combine the findings" points to findings the subagent never received. With nothing to combine, it writes what sounds likely. We should not assume that a subagent can see what the coordinator saw. That assumption gives exactly this kind of answer. For the subagent, the prompt is the whole world.

Second, what to pass. The findings from web search and document analysis come back to the coordinator as tool results. The coordinator must copy them into the synthesis prompt, all of them. That means every finding from both subagents, not a short note like "search found some wiring problems". If synthesis runs a second time, the prompt carries the earlier conclusions and the new findings together. The prompt also carries the goal: the team's question and what a good answer looks like.

So the team changes the prompt. Now the coordinator copies both results into it. The conclusions get better, but a new problem appears. The findings are paragraphs of text. One paragraph mixes a claim, a quote, a report name and a year. When synthesis turns these paragraphs into conclusions, the names and the years drop out. One conclusion says that one lamp model fails twice as often as the others. Nobody can tell where that came from, or how old it is.

Third, the form. Each finding becomes a structured record, and you can see one on screen. Content and metadata sit in separate fields. The content is the claim and a short piece of the evidence. The metadata says where the claim came from: the source URL or the document name, and the page number. It also holds a date: when the report was published, or when the data was collected. Last comes the method, which says how the finding was made. A count of four hundred support tickets carries much more weight than a single forum post.

Why keep content and metadata apart? Synthesis changes the wording of the content. But the metadata stays in its own fields, attached to each claim. It never sits inside a sentence that synthesis might cut. So we always know where each claim came from. The dates also show synthesis when two reports come from different years. Sources that disagree get their own lesson later in the course.

This format has to start upstream, with the agents that run before synthesis. The coordinator can only pass on metadata it received. So we change the web search and document analysis subagents. Their prompts and their output schemas now require a date, a source location and a method for every finding. A finding without them is incomplete.

The same records also fix a size problem. In the first version, web search returned whole articles. It also returned its own reasoning: "First I searched for lamp complaints, then I opened a forum…" That came to thousands of words. Assume the synthesis subagent has a limited context budget, because it must hold the findings from every source at once. Long text and step-by-step reasoning fill that budget with noise.

So we change the upstream agents to return structured data instead. They return the key facts, the citations, and a relevance score for each finding. Now synthesis spends its budget on facts, not on how another agent found them. We should not pass whole pages just to be safe. More text does not make the context complete. It only leaves less room for the findings that matter.

Here is what to remember. A subagent starts with an empty context. It does not inherit the coordinator's history, and it remembers nothing from earlier runs. The coordinator puts the complete findings from earlier agents directly into the subagent's prompt. Each finding is a structured record. It keeps the content apart from the metadata: the source, the page, the date and the method. Upstream agents return key facts, citations and relevance scores, not long text and reasoning.

So write every subagent prompt as if the reader knows nothing, because it does. Next, we build a coordinator and two subagents in code, and see exactly what each one receives.
