# 19. Few-Shot Examples for Extraction

A few examples have given the team's review bot a fixed format and steady judgment. This lesson uses the same idea for a different job: pulling values out of documents. This matters because an extraction that leaves values empty, or fills them with guesses, sends wrong data into the team's systems.

Here is the scene. ShopAssist's testers and the support team write bug reports. A bug report is a short note that describes a problem in the software. The team built a small program called the bug-report sorter. It sends each new report to Claude, and Claude pulls out a few values. These are the affected feature, the steps to reproduce the problem, and how long a delay lasted. Then the sorter puts the report in the right queue. The value names are on screen.

The prompt describes each value carefully. On most reports, this works. But unusual reports fail in two ways. Some values come back empty, even though the report contains them. Other values are invented, even though the report never states them.

The most important thing to remember is this: when documents vary, instructions are not enough. Show Claude a few correct extractions from different layouts.

We look at two kinds of examples. First, examples for different document structures. Second, examples for informal wording.

First, document structure.

Most reports have a heading called Steps, with a numbered list under it. Our instructions say to take the steps from the report. That works for those reports.

But one tester writes a single long paragraph. The steps are there, inside the story: "I opened the chat, asked about a refund, then clicked the order link." Claude looks for a list, finds none, and returns nothing.

A description of where to look cannot cover every layout, but an example can. So we add a short report written as a paragraph, together with the steps we pulled out of it. Now Claude sees that steps can sit inside normal text.

The exam shows the same idea with research papers. One paper names its sources inline, inside the text. Another collects them in a bibliography at the end. One paper has a methodology section, the part that explains how the study was done. In another paper, those details are spread through the text. The fix is the same: add examples that show each structure and where the values sit.

Second, informal wording.

People rarely write exact numbers. A support agent writes: "The chat froze for about half a minute." With only instructions, Claude may leave the delay empty, because it sees no number.

Another report just says: "The chat was really slow." Here Claude may invent a number, like five seconds, because the instructions ask for a delay. Both answers are wrong.

So we add examples that read informal wording honestly. "About half a minute" becomes thirty seconds, marked as approximate. "Really slow" gives no number, so the example records no number either. Claude learns two things. It learns how to turn rough wording into a value, and when not to invent one.

We should not answer these failures with stronger instructions, like "always fill in every value". That pushes Claude to guess even more. Show correct extractions instead.

Two to four examples are enough. Each one should cover a layout or a kind of wording that actually fails. Make the examples different from each other, because more copies of the same simple layout teach nothing new.

Remember that examples steer Claude but do not guarantee anything. A value that must be right still needs a check in code.

Here is what to remember.

Instructions alone break on unfamiliar layouts. Values come back empty, or they are invented. Examples from different document structures show Claude where the values can be. Examples with informal wording show how to read rough numbers honestly. Two to four different examples are enough.

So when extraction fails on unusual documents, do not add more rules. Show Claude a few correct extractions from the layouts that fail.

Next, we see how the exam asks about the fixes from this section.
