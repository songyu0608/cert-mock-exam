# 63. Keeping Claims Tied to Sources

The store's research assistant now reports its failures and names its gaps in the final report.

This lesson is about keeping every claim in that report tied to its source. This matters because nobody can check a claim that has no source. The team cannot act on it, and it cannot defend it.

Here is the scene. The research assistant answers one question: why are lamps returned so often? Its new report has one strong sentence: about a third of lamp returns are caused by loose wiring. The team wants to show this number to the lamp supplier. So they ask where it comes from. Nobody can tell. The report gives no ticket count, no document and no page.

The most important thing to remember is this: a claim and its source travel together, as one record, through every step. We look at three things. First, where the source gets lost. Second, the claim-source mapping that subagents return. Third, how synthesis combines claims without dropping their sources. At the end, we look at the format of the final report.

First, where the source gets lost. Earlier, the subagents learned to return each finding as a structured record, with the content kept apart from the source. So each finding left document analysis with its source attached.

Then the coordinator passed the findings on to the synthesis subagent. Its job is to turn hundreds of findings into a few conclusions, so it summarizes. Five findings about wiring become one sentence: loose wiring is a major reason for returns. The meaning survives, but the five sources do not. A summary keeps what a sentence says. It treats document names and page numbers as details it can cut. After one or two summaries, the claim is still in the report, but nothing links it to the evidence. That is how attribution gets lost. The findings are compressed, and the link between each claim and its source is not kept.

Second, the mapping. A claim-source mapping is a small record that ties one claim to its evidence. It has four parts. The claim says what is true. The source is the web address, or the document name with the page. The excerpt holds the exact words in the source that support the claim. And the date says when the source was published.

One mapping is on screen. Assume document analysis counted last year's lamp returns in the store's support tickets. Its claim says that about a third of them name loose wiring. The source is the ticket report, with the page. The excerpt is the line with the count.

The excerpt is the part that saves time. A person can check the claim in seconds, without reading the whole report. So the subagents' prompts and output schemas require at least one mapping for every claim.

Third, the merge. Synthesis still has to combine findings, because that is its job. The rule is simple: combine the claims, and merge their sources. Suppose the support tickets and a supplier's quality report both point to loose wiring. Synthesis writes one conclusion, and that conclusion carries both mappings. It does not carry just one, or none. So when claims are combined, their lists of sources are joined.

The synthesis output schema has a sources field on every conclusion. Then our code checks two things before the report subagent runs. Every conclusion has at least one source. And every source it names really came from a subagent. A conclusion that fails either check goes back to synthesis.

We should not ask synthesis to write the conclusions first and add the sources at the end. By then, it has to guess which source supports which sentence. It may attach the wrong one, or invent one that looks real. Keep the mapping on each claim from the start.

Finally, the format. Synthesis combines different kinds of content. We should not turn all of it into the same kind of paragraph. Financial data goes in a table. One example is the refund cost for each lamp model, month by month. In a table, the team can compare the numbers quickly. News goes in prose. Say a news site reported that one supplier moved to a new factory last spring. That is a story with a cause and an effect, so a few sentences explain it best. Technical findings go in a structured list: the lamp model, the part that fails, and how it fails. In every format, each item still carries its source.

Let's recap. Summaries drop document names and pages first, so a claim can lose its source on the way to the report. Subagents return claim-source mappings with the claim, the source, the exact excerpt and the date. Synthesis combines claims but keeps every source behind each conclusion. Our code checks that every conclusion has a real source. Each kind of content keeps its own format: tables for financial data, prose for news, and lists for technical findings.

So when a claim goes into the report, its source must go in with it. Next, two reliable sources give different numbers, and we keep both.
