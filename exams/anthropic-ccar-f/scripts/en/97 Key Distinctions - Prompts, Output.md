# 97. Key Distinctions: Prompts, Output

Over the last two lessons, we looked back at ShopAssist and at the team's Claude Code setup with the exam's eyes.

This lesson does the same for prompts and output, the exam's fourth domain. It covers the prompt, output and review distinctions that the exam turns into wrong options. This matters because this domain is a fifth of the exam. Its wrong options also sound careful and sensible.

The most important thing to remember is this: wrong options change the volume, the size or the tone. Right options add structure, such as named categories, examples, a schema or a fresh reviewer.

We go through three groups. First, prompts. Second, output. Third, reviews.

First, prompts. The first pair is explicit criteria versus vague caution. Think of the team's review bot, the one that developers stopped reading. "Be conservative" and "only report high-confidence findings" are the wrong options. With them, Claude has to guess where the limit is. It can also be very sure about noise.

The right option names what to report, like bugs and security problems. It also names what to skip, like minor style and local patterns. Each severity level gets a definition and a code example. A noisy category is switched off for a while and fixed.

The second pair is few-shot examples versus louder instructions. Sometimes detailed instructions still give different results from run to run. Capital letters and "you MUST" repeat a rule that Claude already follows only some of the time. A bigger model does not help either.

The right option is two to four targeted examples. One complete example fixes the format. An unclear case shows the reasoning against the other reasonable choice. A contrasting pair puts acceptable code next to the real problem it looks like. For extraction, examples cover different layouts. Then values stop coming back empty or invented.

Second, output. The first pair is a schema versus a request. "Return only valid JSON" works most of the time, not every time. On the exam, the answer is tool use with a JSON schema. In current code, use strict tool use or structured outputs, as the note on screen shows.

Every document may need to produce a tool call. In that case, the exam's answer is tool choice any, or a forced tool for the step that must run first. The current Opus, Sonnet and Fable models reject both with an error. So in your code, use auto with a strict tool and an instruction that names it, or use structured outputs.

A schema guarantees the shape, not the meaning. So your code still compares a calculated total with the stated total.

The second pair is a nullable field versus a required one. When the source may lack a value, a required field invites an invented one. Make that field nullable. Where the source is vague, add "unclear", or "other" with a detail field.

The third pair is a targeted retry versus "try again". A good retry carries the original document, the failed output and the exact validation error. It fixes format and structure. It cannot find information that the source does not contain. When the value lives in a document nobody sent, stop and ask for it.

The fourth pair is a batch versus a normal call that answers right away. The Message Batches API costs half as much. But it can take up to twenty-four hours, with no latency guarantee. It fits overnight audits and weekly reports. It never fits a blocking check that a developer waits for. And nothing runs a tool inside a batch request.

Third, reviews. The first pair is an independent reviewer versus self-review. The session that wrote the code keeps its reasoning, so it rarely questions its own choices. Telling it to be critical does not change that. More thinking by the same instance does not change it either. The exam calls that extended thinking. The right option is a second instance with a fresh context.

The second pair is split passes versus one big pass. A large change reviewed in one pass gets shallow comments that even disagree with each other. Its attention is spread too thin.

Several fixes look reasonable and fail. A bigger model or a larger context window adds space, not attention. Forcing smaller pull requests only moves the work to developers. Keeping only findings that two of three runs agree on drops real bugs.

The right option is one pass per file, then an integration pass across the files. A verification pass can add a confidence score to each finding. That score sends the less certain findings to a person first, and it never drops them.

Here is what to remember. Name what to report and what to skip, instead of asking for caution. Show two to four examples, instead of using louder words. A schema guarantees the shape, and your code checks the meaning. Make missing values nullable, and retry only with the exact error. Use batches only when nobody waits. Give large changes a fresh reviewer and split passes.

So when an option only makes the prompt louder, the model bigger or the tone more careful, it is probably wrong. Choose the option that adds structure.

Next, we put all of this into one routine for reading exam questions.
