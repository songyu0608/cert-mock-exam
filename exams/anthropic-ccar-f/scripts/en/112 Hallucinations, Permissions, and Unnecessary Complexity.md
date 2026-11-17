# 112. Hallucinations, Permissions, and Unnecessary Complexity

As I remember, a lot of questions in the exam, they are associated with hallucinations about how to manage them. So how should an architect think about hallucinations in a production system? Is the goal to eliminate them or to design around them?

You should design your system around them because LLM can produce some incorrect answers. And even if you have a great prompt, you cannot rely on LLM response. And you have to be ready to handle incorrect responses. And it's very important to limit permissions. So you shouldn't allow some risky operations like refunds, some transactions before you 100% sure that it's allowed in this case. And of course, human review.

But what point does adding more AI actually make a system worse?

You know, good question. Because if deterministic software solves the problem, use it. So there's no need to use AI everywhere. And orchestration. It's a big mistake. Yeah. Genetic approach. So you can replace that difficult multi-agent system just with one function and several requests to LLM do this. So it should be as simple as possible.

That was my next question. Are companies currently over-engineering AI agents? I see that yes, but you are deeper in this topic. So you have your experience. Sometimes. Sometimes.

Sometimes people want, you know, to learn something, then they want to apply their knowledge even in places that it's not necessary. And I saw some systems like multi-agent systems that can be replaced just by one function. Yeah, but it is this.

If you could ban one AI architecture that companies are blindly adopting in 2026, what it would be?

Multi-agent systems for everything. So yeah, and I'm not anti-agent, no, I'm anti-unnecessary complexity. Yeah.
