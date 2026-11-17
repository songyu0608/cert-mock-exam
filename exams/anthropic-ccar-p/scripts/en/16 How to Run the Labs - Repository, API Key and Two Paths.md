# 16. How to Run the Labs: Repository, API Key and Two Paths

The practice lessons run real code from one public repository. Before the first one, that code has to run on your machine.

Here is what we have: an empty folder in VS Code, with Python and git installed. Here is what we want: the practice repository on your machine, an API key that stays out of the code, and one check run that answers.

Here is the plan. There are two paths. The first one is by hand, on your own machine. We clone the repository and create a Python environment. Then we put the key in a dot env file and run the check. That is the path we take now.

The second path needs nothing on your machine: a ready workspace in your browser, with no install and no key. There, the model's answers come from fixed rules, not from the real API. It teaches the same code, but only your own machine shows the real model at work.

First, we clone the repository from GitHub. We go into the shopassist folder, where the scripts live.

Python must be version three point ten or newer. Here it is three point thirteen.

We create a virtual environment: a private folder for this project's packages, so they never mix with other projects. We turn it on. And we install what the scripts need, from requirements dot txt: the Anthropic SDK and a few other packages. The list ends with the installed packages, the Anthropic SDK among them, version two point eight.

Now the key. The scripts read it from a file called dot env, and the repository gives us an example to copy.

Here is dot env. It holds one line, and for now the value is only an example, not a real key. Your key goes here, and nowhere in the code.

Git ignores this file, so the key never reaches the repository. Check ignore, a git command, shows which rule makes git skip the file.

The check run is first request dot py. It loads dot env and creates the client, the SDK object that sends our requests to the Claude API, with no key in the code. Then it asks Claude one test question.

Let's run it with the example value still in place, to see what a wrong key looks like. The answer is an error: four oh one, authentication error. The request reached the API, and the API refused the key. So when you see four oh one, check the key first: is it in dot env, is it complete, and is it still active?

Now I add my real key off screen, so it never appears in the video. You paste yours into dot env.

In a new terminal, we go back into the folder and turn the environment on again. The same check run. Claude answers the test question about a jacket, and the script prints the stop reason, end turn, and the token usage. The setup works.

Before the next exercise, a word on money. What does this cost? In our own runs, one pass through every exercise came to about four dollars of API usage. Most of that is one exercise that runs seventy two conversations. If you run things twice, plan for more.

The Claude Code lessons use your Claude Code sign-in instead of this key. Max, Ultra and Team plans include monthly API credits, from twenty to two hundred dollars, depending on the plan and the seat. They pay for Claude API calls like ours, but not for Claude Code. And they expire at the end of each billing cycle.

So here is what happened. We cloned the repository, created an environment and installed the packages. The key lives in dot env, which git ignores, and never in the code. With the example value, the check run failed with four oh one. With a real key, Claude answered.

For the platform team, this is the same habit as in production. The key lives outside the code, in one place you can change or turn off.

Your task: pass the check run on your own machine, and see end turn and the token usage in your terminal. If you cannot use a paid key, take the browser path.

The practical rule: one environment per project, the key in dot env and never in the code, and when you see four oh one, check the key first.
