## Why most AI Agent frameworks would fail
> This mini essay was written on twitter originally, Check it out here: https://x.com/yashwanthsai29/status/1880139209463460048

*Written on Jan 17, 2025*

Slightly opinionated take. But I firmly believe in this. Most of the people have asked me what framework to use. 

I mentioned crewai for getting started (and probably sticking to it until you face problems). But there are people who are not exactly beginners, who are intermediate like me. They have this roadblock on which to choose. 

There Pydantic's new framework, langchain's langgraph, llamaindex has its own agents which you can build. Openai has swarm which is good. There's AgentScript which I am currently playing around with (Detailed post on this is needed, very interesting framework, a very different approach). 

Then there's Atlas - which is a framework I built on top of Openai's assistant api, which is what I currently use at my work at Vuhosi (will be launching it soon, a very detailed post will be up).

The point is, a lot of these frameworks are abstractions on top of llm calls. At the end of the day, Agents are basically llm calls, each framework having something different to offer (Most of them run on the same ReAct principle tho).

If this is the case, what should you do? 
Well, you should be someone who can work with any framework. Quickly adapt to any framework, since almost all are similar in style. 

But the main question - Is a framework really needed? Probably not. 

I faced this similar dilemma back in august last year. 

My agents (built using crewai) were not working as expected. This was kind of a new challenge. And after a lot of research, I realized, the best way to build AI Agent systems is by building agents without any framework (Last month, claude released a blog on AI agents which was talking about this same thing)

Hence, I started building agents using Openai's assistant framework. Soon, I built a small reusable abstraction, which I kept on improving, and 6 months later I still use it, works much better. 

The problem with AI agent frameworks is that they might:
-Hallucinate a lot when performing function/tool calling.
-They might go into an endless "Thought-Action-Observation" loop.
-Cost would be high.

And most importantly, AI Agent frameworks which orchestrate a multi agent system is overkill for most business problems. If you cant define/engineer a clear cut pipeline, then you should go back to a rough paper and think again, instead of delegating it to AI Agents. 

I did the same thing, took me time to realize, but it was worth it. 

An AI Engineer is not someone who writes prompts to agents and sits back thinking the agents will take care of it, but someone who can engineer an entire pipeline, make sure the error margin is zero, and there are no edge cases. As I said, opinionated take. But I hope you get my point. 

I will be releasing Atlas soon. Atlas is more like a side project at Vuhosi.
That's not our main product, but if it can help anyone, that would be great. Again it is an abstraction on top of assistants api, but it works fine for me, when deploying our agents to production.