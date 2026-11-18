# 64. When Sources Disagree

Every claim in the store's research report now keeps its source.

This lesson is about what happens when two good sources give different numbers. This matters because a report that quietly picks one number can send the team the wrong way. Nobody would even know that a second number existed.

Here is the scene. The store's research assistant is still answering one question: why are lamps returned so often? The document analysis subagent reads the store's own files. It finds two numbers for the same lamp model and the same period, last year. The supplier's quality report says that two lamps in a hundred had a defect. The store's support tickets show that six lamps in a hundred came back with a defect. Both sources are credible. They cannot both be the whole truth.

The most important thing to remember is this: never choose one value arbitrarily. Keep both, each with its source, and let the coordinator decide how they fit together. We look at three things. First, how document analysis reports a conflict. Second, how dates separate a real conflict from a trend. Third, how the final report shows what is settled and what is contested.

First, the analysis. Document analysis could simply pick a number. It might take the newer report, or the bigger number, or the one that sounds more official. It could also average them and report four in a hundred. We should not do either. Picking one hides the other source. An average is a number that no source ever reported. Either way, the conflict disappears before anyone can look at it.

So document analysis completes its work with both values included. It marks the conflict explicitly. The record on screen has a conflict flag, both values, and for each value its source, its period and its method. Then the record goes to the coordinator, not straight to synthesis. The coordinator decides how to reconcile the two values before synthesis sees them.

Here, the method explains a lot. The supplier counts lamps that fail its factory test. The tickets count lamps that customers returned as broken, and that includes wiring that came loose in shipping. So the two numbers measure different things. The coordinator might send one targeted query, for example, how many returned lamps were actually checked? Then it passes both values to synthesis, with a note on how they relate. Even when the coordinator can explain the difference, both values stay in the report, side by side, each with its source.

Second, the dates. Now a different pair. A supplier report from two years ago says eight lamps in a hundred had a defect. Last year's report from the same supplier says two in a hundred. Without dates, the two numbers seem to disagree, and synthesis might mark them as contested. But the supplier moved to a new factory last spring. So the two numbers are not fighting. They show a trend: the defect rate went down.

Synthesis can only see that when every finding carries a date. Earlier, our subagents' records got a date field. This is why it matters. So the prompts and output schemas of the subagents require a date for every finding. Ask for the collection date as well as the publication date. A report published this year can describe data collected last year. Without that, two numbers from different years look like two sources disagreeing.

Third, the report. The final report gets two separate sections. The first holds the well-established findings. Several independent sources agree on these. Loose wiring is a main reason for returns, because the support tickets and the supplier report both point to it. The second section holds the contested findings. The defect rate for last year goes there, with both values and both sources.

In the contested section, each source keeps its own wording and its own method. Suppose the supplier calls its rate "within the normal range". The report quotes that phrase. It does not change it to "low", and it does not add "but the tickets prove otherwise". It also says how each number was made: a factory test of finished lamps, or a count of customer returns. With that context, the team can judge the numbers itself. The report does not judge for them.

Here are the main points to remember. When two credible sources disagree, never choose one value, and never average them. Document analysis includes both values, marks the conflict, and attaches each source, period and method. The coordinator decides how to reconcile them before synthesis. Every finding carries a publication or collection date, so a change over time is read as a trend, not a disagreement. The report puts well-established findings and contested findings in separate sections, and each source keeps its own words and method.

So when sources disagree, show the disagreement and keep its context.

Next, we see how the exam asks about a research system like ours.
