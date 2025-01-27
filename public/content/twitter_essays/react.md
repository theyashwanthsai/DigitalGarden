## What are AI Agents and How do they work internally?
> This mini essay was written on twitter originally, Check it out here: https://x.com/yashwanthsai29/status/1877239627624624179

*Written on Jan 9, 2025*

I have seen a lot of confusion on my timeline. I hope this is a good post which sums up what AI Agents are

AI/LLM Agents: Basically LLM with the ability to interact with the real world + also go on a chain of thought (series of thoughts, basically llms are "thinking"). This is one definition of AI Agents. 

Another way I like to define AI Agents: Think of an AI Agent as a Human. 
Human can think, take input (ears), give output (mouth) and also do some actions using limbs. Same way, Agent can think (Chain of thought), they can take input, give output and most importantly, they can use something called tools (kind of like limbs) to get things done. 

Well now that we know what AI Agents are, lets look into how they work internally. 

Why do we need to know whats happening inside? That will give us some more understanding of how and when to use an Agent. This decision is what differentiates an experienced dev/engineer and a newbie (I am not an experienced engineer but I am not a newbie either).

ReAct - Reasoning and Action. This is one popular pattern, where a llm is given a role (Agent profile), given a task and is said to think in a chain of reasoning steps (Chain of thought) before reaching out to final answer/conclusion. Also the llm is equipped with some tools (External functions, which the llm can tell along with parameters, and then these functions are executed by sending the said parameter). Crewai works in a similar manner.

Components of an AI Agent:
-Brain: LLM acts the brain for AI Agents. You also give the ability to "think/reason"
-Limbs: Tools act as limbs. Agents can interact with the real world and perform some actions using these Tools. 
-Memory: Agents can have memory, where you could store some interaction/some important data. You can use some "retrieval tool" to retrieve whenever needed. More on memory in another essay.

So yes, AI Agents are just LLM with the ability to do function calling, and the ability to go over a few steps of COT. 
Yes, things are "hyped" up. But we are severely underestimating what multiple AI Agents when communicating with each other can achieve. The limit is our creativity.

-----------------------------------------------

This was a very short essay on how AI Agents work. Please follow me if you find it interesting. I will be posting more and more such essays on AI Agents.

The image below is taken from the ReAct paper. Will leave a link below.