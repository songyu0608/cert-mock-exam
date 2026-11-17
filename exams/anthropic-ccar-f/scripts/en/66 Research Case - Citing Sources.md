# 66. Research Case: Citing Sources

In the previous checkpoint, we fixed the research coordinator's decisions.

This second checkpoint uses the same research system. It is about two source problems: citations that disappear, and figures that disagree. This matters because nobody can check a report without sources, and so nobody can safely act on it.

Here is the first symptom. The software team gets a report on the security risks of open-source packages. One sentence says that about a third of popular packages have nobody who still looks after them. The team wants to quote this sentence in a security review, so they ask where it comes from. The report gives no source. Many other claims in it have no source either. As a reminder, web search finds articles, document analysis reads papers, synthesis combines the findings, and report generation writes the final text.

What does this situation need? Nobody asks for a guarantee here. We need the first step at the point where the sources are lost. The subagents return their findings as paragraphs. Synthesis then makes those paragraphs shorter, and document names and page numbers are the first details it cuts.

Two fixes look reasonable. The first is a line in the report generation prompt: "Name the source for every claim." That fails, because report generation never received the sources. It can only guess, or it can make up a source that looks real. The second fix is to pass the full articles and papers to synthesis, so it can look the sources up again. That fails as well. The long text fills synthesis's limited context with noise, and every summary still drops the link between claim and source.

The best move has two parts. First, web search and document analysis return claim-source records. Each record holds the claim and the source URL or document name, with the page. It also holds the exact words quoted from the source, and the date. The content and the source details sit in separate fields, and the subagents' output schemas require them.

Second, synthesis merges findings instead of compressing them. When it combines two claims into one conclusion, that conclusion keeps both records. Then our code checks that every conclusion has at least one source, and that each source came from a subagent.

Here is the rule. A claim and its source travel together as one record, from the first subagent to the final report.

Second decision. Now the sources are visible, and a new problem appears. Two credible sources give different numbers for the same figure. Assume that an industry survey says eighteen percent of popular packages had nobody looking after them last year. A university study says thirty-one percent for the same year. The report shows only thirty-one percent.

What does this need? Again, a first step: the disagreement must stay visible. First, check the dates. Both numbers cover the same year, so this is a real conflict.

Two fixes look reasonable here as well. One is to keep the newer or more official source. That fails, because the other source disappears and nobody knows it existed. The other fix is to average the two values and report about twenty-five percent. That fails too, because no source ever reported that number.

The best move starts in document analysis. It reports both values, marks the conflict, and attaches each source and its method. The survey asked package owners about their own packages. The study measured how often each package's code was changed. The record goes to the coordinator, and the coordinator decides what to do with the two values before synthesis.

The final report then has two sections. One is for well-established findings. The other is for contested findings. This figure goes into the contested section, with both values and both sources. Each source keeps its own wording and its method.

Now a different pair. Assume the same survey's edition from three years ago said twelve percent, and last year's edition says eighteen percent. This is not a conflict. It is a trend: the share of packages that nobody looks after is growing. Synthesis can see that only because every record carries a publication or collection date.

Here is the rule. For the same period, keep both values with their sources and let the coordinator decide. For different periods, read the change as a trend.

Here are the main points to remember. Sources get lost when findings are made shorter without their claim-source records. Subagents return records with the claim, the source, the quoted words and the date. Synthesis merges these records and never drops them. Asking report generation to add citations at the end only produces guessed or invented sources. Two credible values for the same period both stay in the report, attributed, in a contested section, after the coordinator decides how to handle them. Values from different dates may show a trend, not a conflict.

The same rule works in the extraction scenario. An invoice's printed total may not match the sum of its line items. There, the record keeps the stated total, the calculated total and a conflict flag, and it never quietly picks one.

So when a fact reaches a reader, keep its evidence attached, and never let one value quietly replace another.
