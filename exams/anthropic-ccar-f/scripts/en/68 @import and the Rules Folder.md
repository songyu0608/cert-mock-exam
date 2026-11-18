# 68. @import and the Rules Folder

The team has moved its conventions into the project CLAUDE.md, so every developer now loads the same rules.

This lesson is about keeping that file small and easy to read as the project grows. This matters because one huge file is hard to maintain. Also, Claude Code reads all of it in every session.

Here is the scene. A year later, the ShopAssist repository holds several packages. A package is one part of the code base, with its own folder and its own job. There is the refund service. There is the chat window on the store's website. And there is the MCP server with the four store tools. Over that year, every new rule went into the project CLAUDE.md. Now it has six hundred lines. Testing rules sit next to deployment steps. API conventions are mixed with notes about the chat window. Nobody knows which rules are still true, and two sections even say opposite things.

The most important thing to remember is this: split the instructions by topic, and load each piece where it is needed. Two tools do this. First, the rules folder. Second, imports.

First, the rules folder. Inside the repository's dot claude folder, we create a folder called rules. Each file in it covers one topic. Testing dot md holds the test framework, the fake payment service and how we name test files. API conventions dot md says how our endpoints name fields and return errors. Deployment dot md holds the release steps. The folder is on screen. Claude Code reads these files as part of the project's memory. A rule file with no extra settings loads in every session, just like the project CLAUDE.md. We commit the folder, so the whole team gets it.

Now each topic has one place. When the test framework changes, we edit one short file. The pull request shows only the testing rules, so the review is quick. The root CLAUDE.md shrinks to a short overview: what the project is, the main commands, and the most important team rules.

Second, imports. Some standards matter for one package and not for another. Our money-handling standard says that amounts are stored in cents. It also says that refund amounts always come from the order. The refund service needs this standard, but the chat window does not. So each package keeps its own CLAUDE.md, and that file imports the standards it needs. The exam calls this the at import syntax. You write an at sign, followed by the path to a file. On screen, the refund service's CLAUDE.md imports the money-handling standard and the API conventions. The chat window's file imports the frontend standard instead. When Claude Code loads a CLAUDE.md, it also loads the files it imports.

Who chooses the imports? The maintainers of each package, the developers who own that code. They know which standards their code touches. The owner of the refund service knows that the money rules apply there. One central file cannot know this as well as they do.

We should not copy the same standard into every package's CLAUDE.md. Then there are three copies, and they slowly drift apart. With imports, the standard lives in one file, and each package only points to it.

Also remember that these files are context, not enforcement. They guide Claude Code. A rule that must always hold, like the five hundred dollar refund limit, still lives in code and in tests.

Let's go over the main points. One growing CLAUDE.md becomes hard to read, to review and to keep correct. The rules folder inside dot claude holds focused topic files, like testing, API conventions and deployment. A rule file without extra settings loads in every session, like the project file. An at sign followed by a path imports a standards file into a CLAUDE.md. Each package's maintainers import only the standards their code needs. That way, every standard lives in exactly one place.

So give each topic its own file, and let each package import what it needs. Next, we make a rule load only when Claude Code works on the files it applies to.
