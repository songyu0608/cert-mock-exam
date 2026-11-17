---
lab: true
---

# 10. Practice: First Request in Code

In this lesson, we send our first request to Claude from code, and we read what comes back. This matters because every feature of a Claude application starts with this one call.

As you remember, ShopAssist is the support assistant we are building. Today it is a small Python project, and we write its first script.

Before the first line of code, we need the API key. The key works like a password: it lets our script use the Claude API. It lives in a file named dot env, next to our scripts, and never in the code itself. The file has one line: the name, anthropic API key, and then the key. Your file holds your own key. Never share it, and never paste it into your code.

Now the script. We close it and open a new, empty file: first request dot py.

First, we import load dotenv. It reads the dot env file, so the key becomes available to our program. Then we import Anthropic. This is the client from the official Python library, the object that talks to Claude for us.

Now we use them. We call load dotenv, with empty brackets. Then we create the client: client equals Anthropic. We do not pass the key here. The library looks for a key with exactly that name, anthropic API key, and finds it by itself.

Next, we name the model. We keep it in one constant, MODEL, so a later change touches one line. Here we use Sonnet, the balanced default for most production work.

Now the request itself. It is one method call: response equals client dot messages dot create. Whatever comes back is stored in response.

The first thing we pass is the model, our constant. Then max tokens, three hundred. This is the most tokens Claude may write in its reply. We will come back to this number at the end.

Then the effort, inside output config, set to low. Effort tells Claude how thorough to be: how much it thinks, and how long its answer is. A simple question like this one does not need much.

And then messages. This is a list with the conversation so far. Our list holds one message. Its role is user, because the question comes from our side. The content is the question. A customer asks: can I return a jacket after twenty days? Then the text goes on with our policy. We add our return policy, returns within thirty days, and we ask for an answer in two sentences. We write this text in short pieces, one per line, and Python joins them into one string. Then we close the message, the list, and the call.

For the first run, we print everything that comes back. The response is a Python object, and model dump JSON turns it into text. The indent of two makes it easy to read, and exclude none leaves out the empty fields.

Let's run it. The script loads the key, sends the request to the Claude API, and waits. The answer is written on Anthropic's servers, and then it comes back to us.

Now let's read the response. It is a message, with several fields. Content is a list of blocks, the pieces of the reply. For a plain answer, there is one piece, a text block, and its text field is the reply we want to show the customer. The role is assistant, because Claude wrote it. Stop reason says why Claude stopped writing. Here it is end turn: Claude finished its answer on its own. And usage counts the tokens. Input tokens: fifty-three, the tokens we sent. Output tokens: the tokens Claude wrote.

We do not need all of this every time. Let's bring the editor back. We change the big print into three small ones. First the text: response dot content, the first block, dot text. This is the reply itself. Then the stop reason. And the usage: the input tokens and the output tokens.

Let's run it again. The request goes out once more, and Claude writes a new answer. First the reply. It reads well, and the words can be a little different on every run. Then the stop reason: end turn. And the usage: fifty-three tokens in, and about seventy-five out.

It is tempting to think of max tokens as the length we want. It is not. Max tokens is a ceiling, and Claude stops the moment it reaches it, even in the middle of a sentence.

Let's see this. We change max tokens from three hundred to twenty. Let's run it once more. The same question, with a much lower ceiling. The answer breaks off after a few words. And the stop reason is now max tokens. The output tokens are exactly twenty, the ceiling we set.

Nothing failed. The API did exactly what we asked. But if ShopAssist showed this text to a customer, the customer would see half a sentence.

Here is what we did. We kept the key in dot env, outside the code. We created a client, and we sent one request with a model, a limit, an effort and one message. Then we read three things in the reply: the text, the stop reason and the usage.

So the practical rule: check the stop reason before you use the reply. End turn means the answer is complete. Max tokens means it was cut, and the application should raise the limit or handle the cut, instead of showing the fragment.
