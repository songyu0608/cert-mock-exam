---
lab: true
---

# 12. Practice: A Chat UI Talks to Your Script

In this lesson, we put a web page in front of ShopAssist. This matters because customers do not run Python scripts. They type into a chat on a website, and that message has to find its way to Claude and back. So far, our assistant lives in a script, with a list that holds the conversation.

Here is the plan. The browser shows a chat page. When the customer sends a message, the page does not talk to Claude. It talks to our server, a small Python program that waits for requests from the browser. Our server adds the system line and the history, calls Claude, and sends the reply back to the page. So there are three parts: the browser, our server, and the Claude API.

Let's write the server, in a new file, app dot py. It starts with the imports we always use, load dotenv and Anthropic.

Now three new imports. FastAPI is a small Python library for web servers. Static files lets the server hand out ready files, like our chat page. And base model, from a library called pydantic, describes the shape of the data a request carries.

We call load dotenv and create the client, as before. And app equals FastAPI. This is our web server.

The model name and the system line are the same as in conversation dot py, so I copy them from there.

Last, an empty list called history. It lives in the server, so it is still there between two requests from the browser. It is one list for everyone who opens the page. That is fine for this test, but a real site keeps one history per customer.

Now we describe what a message from the browser looks like. We call it chat in, and it is a base model. It has one field, text, and the text is a string.

Then the endpoint. An endpoint is an address the browser can send to. This line says: when a POST request comes to slash chat, run the function below. The function is called chat, and its parameter body holds the data the browser sent, the JSON in the request. FastAPI checks that data against chat in, so body dot text is the customer's message.

Inside, we do what our script did. First, the customer's text goes into the history, with the role user. Then we call Claude. The start of the call is the same as in conversation dot py, so I paste it: the model, max tokens, the effort and the system line. And the messages are the whole history, not only the new text.

Then we take the reply's text with the same loop as before. Claude's reply goes into the history too, with the role assistant.

Then we return two things to the page: the reply, and the number of input tokens Claude read. FastAPI turns this dictionary into JSON, the format browsers and servers use to exchange data.

One last line serves the chat page. Every other address on our server comes from a folder named static. The page is already in place there: a plain HTML file with a message box, the replies, and a small map of the path. HTML equals true means the main address opens the page itself, index dot html. And this line goes last, after the chat endpoint, so slash chat still reaches our function.

Let's run it. Uvicorn is the program that runs FastAPI apps. We tell it where the app is: the file app dot py, and the variable app inside it, on port eight thousand. It says the server is running, and now it waits for the browser.

Let's open the chat page in the browser inside the editor. The page has a box for the message. Under the chat, a small map shows the path: the browser, our server, and the Claude API.

Let's write as a customer: I bought a jacket twenty days ago. The message goes to our server, and our server calls Claude. The reply comes back the same way, through our server, to the page. Claude says there are about ten days left. Under the reply, the page shows the input tokens: sixty nine. In the terminal, the server logs one line for this message: a POST to slash chat, with status two hundred.

Let's ask one more question: can I still return it? On its own, this question does not say what it is about. But the server kept the history, so the jacket and the twenty days go to Claude with it. Claude answers yes. And the input tokens grow to about a hundred and fifty, because every request carries the whole conversation, just like in our script.

Here is the path of one message, step by step. The browser posts the text to slash chat. The server adds the system line and the history, and calls Claude. The reply comes back to the server. The server sends the reply and the token count back as JSON. The page shows the reply.

It is tempting to think the browser could call Claude directly and skip the server. It must not. The API key would have to be inside the page, where anyone can read it. And the system line and the history would live in the customer's browser, where anyone can change them. The server keeps the key, the rules and the conversation on our side.

So the practical rule: the browser talks to your server. Only your server talks to Claude.
