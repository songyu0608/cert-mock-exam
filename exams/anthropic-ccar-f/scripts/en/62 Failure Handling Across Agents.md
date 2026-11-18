---
lab: true
---

# 62. Failure Handling Across Agents

So far, the coordinator has learned to start its subagents and to give them complete findings as structured records.

This lesson is about what happens when one of those subagents fails. This matters because one failure should cost the report one area, not the whole run. And the coordinator can only save the rest when it knows what went wrong.

The store's research assistant is still working on one question: why are lamps returned so often? The coordinator has started web search and document analysis in parallel. Document analysis reads the store's own files, such as support tickets and supplier reports. The supplier reports are kept in an archive service. In the middle of the work, that archive stops answering, and the search times out. Now the coordinator has a decision to make. It could try the search again with a different query. It could try another source. Or it could go on with what it already has.

The most important thing to remember is this. The subagent fixes what it can by itself. Then it reports the rest with enough detail for the coordinator to choose. We look at three things. First, local recovery. Second, the failure report. Third, a final report that names its gaps.

First, local recovery. A timeout is a temporary failure, so the same call may work a moment later. The subagent should handle that itself. It waits a short time and retries, once or twice. Often the archive answers, and the coordinator never hears about the problem. That keeps small failures out of the coordinator's context, because it does not need to see them. Only an error that the subagent cannot fix goes up to the coordinator.

Second, the report. Assume the archive is still down after the retries. Now the subagent must report the failure. We should not return a general status like "search unavailable". It is true, but it hides everything the coordinator needs. Which search failed? Was anything found? Is there another way? The coordinator cannot answer these questions, so it can only guess.

A structured error context carries four things. The first is the failure type: a timeout on the supplier archive, after two retries. The second is the query it tried: supplier reports about lamp defects from the last two years. The third is the partial results. Two of the five reports loaded before the timeout, and the support tickets about loose wiring were read. The fourth is possible alternatives: retry the archive later, or ask web search for the suppliers' published quality reports. The full report is on screen.

With this report, the coordinator can decide. It keeps the partial results. It sends a targeted query to web search for the published quality reports. And it notes that three supplier reports are still missing.

Two other reactions look tidy, and both are wrong. The first is to catch the timeout and return an empty list, marked as a success. Then the coordinator believes that no supplier reports mention defects. It never retries. The final report then draws a conclusion from data it never saw. The second reaction is the opposite. The timeout goes straight to a top-level handler that stops the whole research run. But web search had finished, and the support tickets were read. All of that work is lost because one source was down. Hiding a failure and stopping everything are both anti-patterns. A failure should be visible, and it should affect only the part that failed.

So the gap travels all the way to the final report. The synthesis subagent marks how well each finding is supported. These marks are called coverage annotations. Loose wiring is well supported, because hundreds of support tickets and two supplier reports agree. Customer reviews support the complaints about wrong product photos. Last year's supplier defect rates are a gap, because the supplier archive was not available. Now the team knows what the report shows and what it could not check. They can trust the strong findings and ask again about the weak area later.

Let's recap. A subagent retries temporary failures itself and passes up only what it cannot fix. That report carries the failure type, the query it tried, the partial results and possible alternatives. A general status like "search unavailable" hides that context. An empty result marked as success hides the failure itself. Stopping the whole run because of one failure throws away good work. Synthesis marks which findings are well supported, and which areas have gaps because a source was not available.

So fix small failures where they happen. Report the rest in full. And let the final report say openly what it does not know.

Next, we keep every claim in that report tied to its source.
