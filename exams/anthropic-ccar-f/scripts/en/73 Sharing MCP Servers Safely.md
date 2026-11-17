# 73. Sharing MCP Servers Safely

So far, the team has put its CLAUDE.md, its rules and a skill into the repository. MCP servers follow the same rule as those files. A file in the repository reaches the whole team, and a file in your home folder reaches only you.

This lesson is about where to configure an MCP server so the team can share it safely. This matters because many servers need a secret, and a secret must never reach the repository.

Here is the scene. The team works on ShopAssist with Claude Code, and several MCP servers help with that work. Two of them matter here. The first is ShopAssist's own backend server, with the four store tools. The developers use it with a test copy of the store. The second is a community server for GitHub, where the team keeps its repository. It lets Claude Code read pull requests and issues. Every developer needs both servers. The GitHub server also needs an access token. An access token is a secret value that proves who is calling.

The most important thing to remember is this: share the server's settings, but never its secret. We look at three things. First, the project file for team servers. Second, variables for secrets. Third, the user file for personal servers.

First, the project file. Team servers go in a file called dot mcp dot json, at the root of the repository. The file is on screen. It lists each server by name, with the command that starts it. We commit this file like any other change. So everyone who clones or pulls the repository gets the same servers. Leo, the newest developer, gets them on his first day. Nobody has to send him a list of servers.

Second, the secret. We should not paste the real token into dot mcp dot json. The file is committed, so the token goes into the repository's history. Anyone who can read the repository can read the token. Deleting the line later does not remove it from the history, so the token has to be replaced.

Instead, the file names an environment variable. An environment variable is a named value that lives on each developer's own computer, outside the repository. In the file, we write a dollar sign, then the variable's name in curly braces. The exam's example is a variable called GitHub token. When Claude Code starts the server, it puts the value from the developer's own environment in place of that name. This is called environment variable expansion. Each developer sets the variable once, with their own token. The file holds only the name, so it is safe to commit. The backend server's key works the same way.

Third, personal servers. Say Leo wants to try a new community server that draws diagrams from code. Nobody knows yet if it helps. We should not add it to the project file, because then every teammate would start it. Personal and experimental servers go in a file called dot claude dot json, in your home folder. Version control never sees that file. Leo's server runs only for him, next to the team's servers. If the experiment works, he moves it into dot mcp dot json with a pull request. Then the whole team gets it.

One product note. Today, the command that adds a server also offers a third scope, and the details are on screen. On the exam, answer with the two scopes. The project file is for the team, and the file in your home folder is for personal servers.

Let's recap. Team MCP servers go in dot mcp dot json, inside the repository, and version control shares them. Personal and experimental servers go in dot claude dot json, in your home folder, and they reach only you. A secret never goes into the project file. The file names an environment variable. Claude Code fills in each developer's own value when it starts the server.

So commit the server settings, and keep every secret on each developer's own computer. Next, the setup is done, real tasks arrive, and we decide when Claude Code should plan before it acts.
