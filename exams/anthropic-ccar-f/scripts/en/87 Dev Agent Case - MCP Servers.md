# 87. Dev Agent Case: MCP Servers

In the previous checkpoint, the team's developer agent worked through the old billing module step by step and changed its request code safely. This last checkpoint on the developer productivity scenario is about MCP servers. It covers two decisions. First, why the agent ignores a better tool that a server offers. Second, how the team adds an integration that everyone shares. This matters because a server that is installed but never used gives no help. A server that is shared the wrong way can leak a secret.

Here is the first symptom. The team connected its own code-search MCP server to the agent. Its tool finds every place that calls a function. It understands the structure of the code, so it also finds calls made under a different name, and it skips comments. Its description says only: "Searches code."

Assume the logs show that in nine runs out of ten, the agent uses Grep instead. Grep matches text, so it misses the calls made under another name. The agent then reports an incomplete list of the places that call the function.

What does this situation demand? Nobody asks for a guarantee here. We need the first step, at the layer where the agent makes its choice.

One fix looks reasonable: remove Grep from the agent's tools, so the agent has no other choice. That fails. Grep is still the right tool for plain text, like an error message from the logs. Removing it breaks that work, and it hides the real cause.

The best move is a better description for the MCP tool. The agent chooses tools mainly from their descriptions, and "Searches code" tells it almost nothing. The new description says what the tool can do and what it returns. It finds every place that calls a function or class, including calls under another name. It skips comments. It returns each file, line and calling function. Use it to find who calls a name, and use Grep for plain text. Now the agent has a clear reason to pick it.

This decision has a second move. Assume the agent also spends about a dozen calls at the start of every task just to learn which module does what. It lists folders, opens the files that describe each folder, and searches for names.

So the server also offers the module catalog as a resource. A tool performs an action, while a resource gives content to read. The catalog lists each module, what it owns and where its entry point is. The agent reads it once and goes straight to the billing module.

Here is the rule. When the agent ignores a better MCP tool, improve that tool's description and keep the built-in tools. When the agent explores just to learn what exists, offer a catalog as a resource.

Second decision. The team tracks its bugs in Jira, a common issue tracker. Now the agent should read the ticket behind each task, and so should every developer's Claude Code. One developer has started to write a custom Jira server. Another has a working setup on his own laptop, with his token pasted into the settings.

What does this demand? A shared setup that every developer gets, with no secret in the repository.

Two fixes look reasonable. The first is to finish the custom server, so the team controls it. That fails. A community server for Jira already exists, and other people keep it up to date. A custom server makes sense for the team's own workflows, like ShopAssist's backend with the store's rules.

The second fix is to commit the working settings as they are. That fails too. The token goes into the repository's history, and anyone who can read the repository can read it.

The best move is the community Jira server, set up in the project file, dot mcp dot json, and committed. Where the settings need the token, the file names an environment variable instead. It is written with a dollar sign and brackets around the name, as shown on screen. Each developer sets that variable once on their own computer.

Claude Code reads this file for every developer. The agent reads it too, once its settings tell it to load the project's settings. Tools from all the servers in the settings are discovered at connection, so the Jira tools sit next to the code-search tool.

A developer who wants to try an experimental server puts it in dot claude dot json, in their home folder. There, it reaches only them. The current command for adding servers also offers a third scope, and that note is on screen.

Here is the rule. Use community servers for standard systems. Share them in the project file, and keep every secret in an environment variable.

Here are the main points to remember. An agent that prefers Grep over a better MCP tool needs a better description of that tool, not fewer tools. A catalog offered as a resource saves the agent many calls made only to look around. Standard systems get community servers, and the team's own workflows get custom ones. Team servers go in dot mcp dot json, with secrets written as environment variable names. Personal experiments go in dot claude dot json.

The same rule works in the support scenario. When ShopAssist calls get customer for a question about an order, the first fix is the tool descriptions. A routing layer or a merged tool comes later, if at all.

So when an agent picks the wrong tool, improve the description of the tool it should have picked. Don't take its other tools away.
