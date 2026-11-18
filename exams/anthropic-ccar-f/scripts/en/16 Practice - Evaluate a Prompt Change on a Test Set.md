---
lab: true
---

# 16. Practice: Evaluate a Prompt Change on a Test Set

In this lesson, we measure a prompt change instead of guessing about it. This matters because every prompt edit changes some answers for the better and some for the worse, and reading three replies by eye does not tell you which.

The idea is simple. We write down a few customer questions, and for each one the answer we expect. That is our test set. A small program sends every question to Claude, checks each reply against what we expected, and counts the matches. That count is the score.

We start with an empty file, evaluate dot py, and the top of the file is the setup we always use. So I paste it: we load the key from dot env, create the client, and name the model.

Now the test set. We call it CASES, and it is a list. Each case is a pair: a customer question, and the answer we expect, yes or no. A jacket delivered twenty days ago: yes. Shoes that arrived yesterday: yes. An order from forty-five days ago: no. That is past the thirty days. A gift card: no. Our store does not take gift cards back. Underwear: no. Our store does not take that back either. And twenty-nine days: still yes, just inside the window.

Next, the first version of the system prompt. We call it PROMPT V1. Its first two pieces are the ones from our conversation script, so I copy them: who Claude is, and the thirty-day rule. And it adds one more instruction: begin the answer with yes or no, then one sentence. That first word is what our program will read.

Now two small functions. The first one, answer, takes a system prompt and a question. Inside, I paste the familiar request with one user message, and the loop that returns the text of the reply. Two things are different here. The system prompt is the one we pass in. And max tokens is one hundred, because the reply is one short sentence.

The second function, evaluate, runs the whole test set with one prompt. It takes a name for the printout, and the system prompt. The score starts at zero. Then a loop over the cases: the question, and the answer we expect. We get Claude's reply.

And here is the check. We remove the spaces around the reply, turn it into capital letters, and ask: does it start with the expected word? If it does, ok is true. In Python, true counts as one, so the score goes up.

Then we print one line for each case: pass or fail, the start of the question, and the start of the reply. After the loop, we print the name and the score.

Now we evaluate the first prompt. Let's run it. Six requests go out, one after another, so this takes a few seconds. Each line appears when its answer comes back.

The score is five out of six. So one case failed. It is the underwear. Claude says yes, because our prompt never mentions underwear. The prompt has a gap, and the test found it in seconds.

Now look at the gift card. Our test expects no, and Claude says no. But the prompt never mentions gift cards, so Claude only guessed well. So the new rule should cover both.

So we write a second prompt, PROMPT V2. It is the first one, and with a plus sign we add one more sentence. Gift cards and underwear cannot be returned. It starts with a space, so it joins the first prompt cleanly. And we evaluate it right after the first, with the same cases.

Let's run it again. Now twelve requests go out. First the six cases with the old prompt, then the same six with the new one. The first prompt still scores five out of six. Then comes the second prompt, case by case. The underwear case now passes. Claude says no, and gives the reason. And the score is six out of six.

The change was an improvement, and we have a number that says so, not a feeling.

It is tempting to think a test set this small proves the prompt is good. It does not. Six cases only check the gaps we thought of. The value is in the comparison: the same cases, two prompts, two scores. Over time, the set grows with every real customer question that went wrong.

So here is the whole loop. Write the cases with the answers you expect. Run them with the current prompt, and note the score. Then change the prompt, run the same cases again, and compare the two scores.

So the practical rule: keep a test set with expected answers, and never change a prompt without running it before and after.
