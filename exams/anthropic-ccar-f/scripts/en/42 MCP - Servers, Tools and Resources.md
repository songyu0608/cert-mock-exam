# 42. MCP: Servers, Tools and Resources

ShopAssist's tools can already describe their job and fail clearly.

This lesson is about MCP servers: what they give an agent, and how to make sure their tools actually get used. This matters because a tool that sits on a server but never gets chosen gives the agent no help.

So far, ShopAssist's four tools live inside our own program. Our code defines get customer, lookup order, process refund and escalate to human, and our code runs them. Now the team wants two more things. First, other programs should use the same tools. One example is Claude Code, the coding tool the developers use every day. Second, ShopAssist should be able to read the store's policy documents.

The most important thing to remember is this: MCP makes tools available, but the description decides whether they get used. We look at four things. First, what a server is. Second, tools and resources. Third, several servers at once. Fourth, which servers to build yourself.

First, the server. You met MCP earlier. It is the Model Context Protocol, the standard way to connect tools and data to Claude. Here is why it exists. Without a standard, every system needs its own custom integration. The order system needs one, and the customer database needs another. The policy documents need a third. Each has its own format and its own setup, and the work grows with every new system. MCP replaces all of that with one standard connection.

A system offers its capabilities through an MCP server. A program that uses them is called an MCP client. Claude Code, the Claude app and an agent built with the Agent SDK can all be clients. When a client connects, the server describes what it offers. The client passes that list to Claude. Claude still only requests a tool, and the server runs it. The server also offers only what it chooses. Our server offers lookup order, but no tool that deletes an order.

Second, tools and resources. A server can offer both, and they are different. A tool does something. It takes input, runs an operation and returns a result. Lookup order and the other three store functions are tools. A resource gives content that the agent can read. Often, a resource is a catalog, which is a list of what exists.

Take the store's policy documents. There are pages for returns, shipping, price adjustments and damaged items. Suppose we offer only a search tool. Then the agent must explore. It searches for "returns", then for "refund rules", opens a page, and tries again. Each of these exploratory calls costs a round trip and tokens. Now suppose we offer the list of policy documents as a resource. The agent sees at once which documents exist and what each one covers. Then it opens the right one. The exam's examples of catalogs are issue summaries, documentation hierarchies and database schemas. So remember: tools do things, and resources show what is there.

Third, several servers. The team connects two servers to Claude Code. One is ShopAssist's backend. The other belongs to the team's issue tracker, the system where the developers track bugs. When Claude Code starts, it connects to every configured server. It asks each one what it offers. All tools from all servers are discovered at that moment. They are available together, next to Claude Code's built-in tools. Nobody has to switch between servers. We cover where these servers are configured later, with Claude Code.

Now a developer asks Claude Code why the refund for Alex's lamp was refused. Claude Code does not call lookup order. It uses Grep instead. Grep is a built-in tool that searches the text inside files. It searches the repository and finds an old test file with a made-up lamp order. Then Claude Code guesses an answer from that file. The cause is the description. Lookup order says only: "Gets order details." Grep's purpose is familiar and clear, so Claude picks it.

The fix is a better description for the MCP tool. It explains what the tool can do and what it returns. The tool reads live data from the store's order system. It returns the status, the items, the amounts, the delivery date and the return window. Use it for any question about a real customer order. The description also says that files in the repository hold only code and test data. Now Claude Code has a clear reason to choose lookup order.

We should not remove Grep to force that choice. Grep is still the right tool for searching code, and the developers need it. Removing it hides the real cause and breaks other work. Improve the description of the tool that lost.

Fourth, community or custom. The team's issue tracker is Jira, a common product that many companies use. A community MCP server for Jira already exists, so the team uses it. We should not write our own server for a standard system like this. Then we spend time building and maintaining something that others already keep up to date.

A custom server is the right choice for the team's own workflows. ShopAssist's backend is one example. Its tools follow the store's own rules: a verified customer first, the five hundred dollar limit, and our error contract. No community server knows those rules, so we build this server ourselves.

Let's go over the main points. MCP gives one standard connection instead of a custom integration for every system. A server offers tools, which perform actions, and resources, which provide content such as catalogs. A catalog offered as a resource saves the agent from exploratory calls. Tools from all configured servers are discovered at connection and are available together. When the agent prefers a built-in tool like Grep, improve the MCP tool's description, and keep Grep. Use community servers for standard systems, and custom servers for your own workflows.

So when Claude does not use an MCP tool, do not take other tools away. Make its description say what it can do and what it returns.

Next, we move ShopAssist's four tools behind a server of our own.
