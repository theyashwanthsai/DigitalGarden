How I save API costs while building AI Agents

> This mini essay was written on twitter originally, Check it out here: https://x.com/yashwanthsai29/status/1886285416250437943

*Written on Feb 03, 2025*



My lessons on how to build agents for cheap

So, building agents is very costly. Simply because agents go on multiple "thought action observation" loops under the hood, and this can cause some serious issues. 

While we were building out our platform at Vuhosi, only while testing some changes, we were burning 60usd/day in openai credits. This is not too much compared to big labs and their burn rate, but this is just for "testing" a new feature and some improvements. 

Turns out our agents were spending their sweet time hallucinating and were in some sort of infinite loop trying to search something using ExaAI tool. 

Not only did we expend our monthly openai credits, we also spent our exa api credits. This led to me going behind the root cause of the issue (it happened multiple times), and found out the root problem: 
The agent was given instructions on what to do, but not "how" to do. 

This might be a pure prompt engineering problem, or it can also be the fact that, for some of the tasks, the "methods" can be dynamic and not rule based. But honestly, if your problem cant be put in a series of step with possible branching (this eventually can be told to the agent in prompts), then its better to go back to whiteboard and design the solution and pipeline.

We were using gpt-4o as our main llm. 
Let me show you the prices (per 1M tokens, or roughly 750k words):

- gpt-4o: - Input: $5.00, Output : $15.00
- claude sonnet 3.5 new: Input: $3.00, Output : $15.00
- deepseek r1: Input: $0.55 , Output: $2.19
- gpt-4o-mini: Input: $0.15, Output: $0.60
- deepseek v3: Input: $0.14,  Output: $0.28

A lot of benchmarks and ppl on reddit say that v3 and claude are almost same, with claude being slightly better. v3 > 4o
4o-mini being the least intelligent model here.
r1 is said to crush claude and 4o, being on par with o1, while still being cheaper than all of them. 

The cheapest model is v3, while it is said to crush gpt-4o (costliest model here). No brainer to use v3 or r1 (reasoning model plus cheaper than 4o, r1 is almost 90% cheaper than 4o)

Note: I haven't looked up into google's gemini lineup (Will do that, Have heard good things about it)

Previously, I made a switch from 4o to 4omini, since the whole AI Agents were built on a framework built by me, I had a better control on everything. 

This made it possible to design pipelines suited for "not-so" intelligent models. This made my agents to work with both 4o and 4omini. I noticed 4omini was faster. In terms of quality of output? not much difference (thanks to prompt engineering, shocking findings). Maybe this can be shown in another post - how to design agents with less intelligent models

This worked for one product, but failed on another so I had to go back to 4o. 

And now we are also using agents built on crewai, so I have to be more careful.

But the lessons are clear:
- Keep in mind that agents are dumb and then design the pipeline
- Keep it simple and stupid
- Mixture of llms. Based on task at hand, assign the models (Cheaper, Costlier).
- Prompt engineering is a very crucial aspect in building agents. I will make a post on it very soon.
- To avoid hallucination, Try to implement Least Privilege Principle (Give only the required amount of responsibilites which are needed for that particular agent's task. Dont overload with tools)

But DeepSeek really killed it. They literally made the cost of intelligence fall down. Imagine how openai will react to this. Competition is way too beneficial for end users.

I haven't used r1 or v3 yet, I am waiting with all my eyes. Not able to sign up for their api :(

Now the final step for me is for me to integrate an eval/observability layer like AgentOps to my small custom built framework. This will change everything

![pic](/articleimages/costs.png)