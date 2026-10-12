# AI Agents 101

*Written on Aug 29, 2026*

Everything I learnt building agents for 2 years.

I worked at multiple projects, MVPs, production deployments and learnt a lot of things. Really happy for the work that I got to work on.

I have decided to write a detailed series on AI Agents, teaching everything that I know.

I have been writing a book on AI Agents since Early 2025, Its coming later this year (production work going on). Stay tuned for that, as I am extremely proud of the work we put in it.

In my last post, I talked about the anatomy of an AI Agent, sort of trying to cement the mental model behind them.

```
AI Agent = LLM + Prompt + Tools + Memory
AI Agent = LLM + Harness
```

This is where we begin. AI Agents are llms that do the real work for you. Early chatgpt wouldnt be able to tell the weather in your location (even the latest version cant), but an ai agent can do that.

The difference is that Chatgpt is a wrapper around an llm. This wrapper is meant to only act as a chatbot.

Agent is also a wrapper around an llm, but this wrapper allows the llm with information such as your location and the weather in this particular location.

This logic is all you need to understand before going deep.

## Prompt

This is probably something you might have heard of already. Prompt engineering was a thing in 2023. An llm is something that has only one job: predict the next word of a sentence. It gets a sentence, its supposed to give the next word. And it does this a lot of times until it wants to stop.

You dont really need to understand an llm, but just know that it is a Stochastic Parrot (like birds that repeat words they hear without understanding the meaning). Really good at predicting the next word.

This is why, giving really good prompts is important. A good prompt is something that sets the tone, role, goal, scope and behaviour for an llm (or an agent, basically the same thing in this context).

- **System Prompt:** Tone, Role, Goal, Scope.
- **Instruction Prompt:** What and How you should carry out the work.

Treat prompts like a job description. Be as descriptive as you can.

## Tools (Function Calling)

One of my favorite concepts that I first found out in 2023, this allows an llm to do an actual "action". Like finding the weather in your city, or find a file in folder which matches your description. Tools are basically code scripts (.py files generally), that take an input and give an output.

Example:

- Input: Location
- Output: Weather in Degrees Celcius.

The underlying concept is simple: (Explained in a very simply manner) LLMs are told in the prompt that they have access to some python functions, along with the input and output schema, and it has to simply tell that it needs to use this function if it wants to (calling a function). Then an executor executes the function with the input that the llm gave.

This is how modern chatgpt or claude can search internet for you. This is how an AI Agent can write code (create files and folders with some content).

An extended version of this concept is MCP, where you standardize your tools and expose them on servers so anyone can use this mcp by connecting to their agents.

Although we stopped using mcps altogether now. Skills are what I use if i want to give a functionality to my agents. But the fundamental idea is same as what I mentioned.

## Memory and Context

Your llm now has a goal, and it also has tools which allow it to do what it wants in order to achieve this goal.

```
LLM = Brain
Prompts = Personality
Tools = Limbs
```

There is one thing we need to fix, which will make our llm actually agentic. Memory. Currently the llm is stateless. It does have a state tho, its called a context window, but lets come to that later.

The point is that our llm doesnt have long term memory. It cant remember experiences (which form patterns, which makes a lot of difference, think junior dev vs senior dev). We now need to store the traces of this llm. These traces can be later looked into, and rich patterns can be extracted (failure modes is one great example).

How do we do that?

- Store it in json/md files. Works well but will not scale after a few days
- RAG is a popular concept that people use to fix this issue. Advanced methods are great and it is genuinely useful
- LLM Wiki style Knowledgebase is what I currently use. Combine this with git versioning, we have a very strong memory system.

The ultimate goal is simple:

- Store stuff
- Retrieve when needed

None of the solutions are permanent, but are pretty useful for the time being.

## Harness

Harness is becoming quite popular this year. Popular word. But what exactly is it? If you read the article till this point, you will sort of understand what harness means.

```
AI Agent = LLM + Prompt + Tools + Memory
AI Agent = LLM + Harness
```

If we simplify this a bit and dumb it down:

```
Harness = Prompts + Tools + Memory
```

Basically a wrapper around an llm.

So, to give you a better understanding, Claude code is a wrapper. Codex is a wrapper. Even chatgpt.com is a wrapper.

Wrapper around an llm which you can use to do some thing.

Now, you can build {Prompts + Tools + Memory} yourself and then use the agent, or use an existing wrapper like opencode for your agentic systems.

This is all you need to know about AI Agents to begin with.

...

But what about the code? But what about multi agent setups?

I will discuss them in my upcoming blogs. This is part 1 of AI Agent Series.

thanks for reading.
